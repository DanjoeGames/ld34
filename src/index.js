import tiletypes from './constants/tiles';
import controls from './constants/controls';
import tiles from './models/tiles';
import map from './models/map';
import Renderer from './renderer';
import Human from './entities/human';
import Zombie from './entities/zombie';
import Spawner from './spawner';
import Entity from './entities';
import Bridge from './bridge';
import { FloatingText } from './text';
import KeyboardState from './input';

const tilesize = 50;
const width = map.length * tilesize;
const height = map[0].length * tilesize;

var humansSaved = 0;

var zombiesTaken = 0;

var points = 0;

var currentLevel = 0;

const initialZombieLimit = 20;
const intialHumanTarget = 30;

const render = Renderer(width, height, tilesize, () => {
  return document.getElementById('game');
});

// creates a function which can be used to check whether a given key
// is down.
const keyIsDown = KeyboardState();

// not using the extends properties as the bridges are not currently
// extendable, but might add it again, so I'll leave them here
const leftBridge = Bridge(4, 7, 5, { extends: 'left' });
const rightBridge = Bridge(4, 16, 5, { extends: 'right' });

// Keep all game data in a single state container so that we can just
// pass one thing to render
const state = {
  entities: [],
  bridges: [leftBridge, rightBridge],
  texts: [],
  map,
  points: 0,
  currentLevel: 0
};

const leftSpawn = Spawner({
  generateEntity: Entity.oneOf(Human, Zombie),
  x: 25,
  y: 4,
  i: -1
}, 1000, 0.9, entity => {
  state.entities.push(entity);
}).forever();

const rightSpawn = Spawner({
  generateEntity: Entity.oneOf(Human, Zombie),
  x: 1,
  y: 4,
  i: 1
}, 1000, 0.9, entity => {
  state.entities.push(entity);
}).forever();

function update() {

  if(zombiesTaken >= initialZombieLimit - (state.currentLevel * 2)) {
    //show level failure dialogue
  } else if(humansSaved >= intialHumanTarget + (state.currentLevel * 5)) {
    //show next level dialogue when we get here
    state.currentLevel ++;
    state.entities = [];
    state.points = 0;
  }

  // update bridge state based on controls
  if(keyIsDown(controls.LEFT_BRIDGE)) {
    leftBridge.extend();
  } else {
    leftBridge.retract();
  }

  if(keyIsDown(controls.RIGHT_BRIDGE)) {
    rightBridge.extend();
  } else {
    rightBridge.retract();
  }

  // allow bridges to hack themselves into the map
  state.bridges.forEach(bridge => {
    state.map = bridge.render(state.map);
  });

  // update entities in the world
  state.entities.forEach(entity => {
    const tx = Math.round(entity.x);
    const ty = Math.round(entity.y);

    const tileBehind = tiles[map[tx][ty]];

    if(tileBehind.isLiquid && !entity.drowned) {
      const negativePoints = - entity.points;

      // show the score for drowning this entity
      if(negativePoints >= 0) {
        state.texts.push(FloatingText('+' + negativePoints,
              entity.x, entity.y, 30, 'green'));
      } else {
        state.texts.push(FloatingText(negativePoints,
              entity.x, entity.y, 30, 'red'));
      }

      entity.drowned = true;
      // kill movement in both directions to prevent horizontal
      // landing on the wall bugs
      entity.j = 0;
      entity.i = 0;
    }

    if(tileBehind.isLadder && !entity.isSafe) {
      if(entity.name != 'zombie') {
        humansSaved += 1;
      } else{
        zombiesTaken += 1;
      }

      entity.isSafe = true;

      entity.item.apply(entity, state);

      state.points += entity.points;
      state.texts.push(FloatingText('+' + entity.points,
              entity.x, entity.y, 30, 'green'));
    }

    const tileBelow = tiles[map[tx][ty + 1]];
    if(tileBelow.solid) {
      entity.j = 0;
    } else {
      entity.j += 0.1;
      entity.i = 0;
    }

    // apply movement - could be moved t prototype
    entity.x += entity.speed * entity.i;
    entity.y += entity.j;
  });
}

function animate() {
  setTimeout(animate, 50);
  update();
  render(state);
}

animate();

