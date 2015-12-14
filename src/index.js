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
import chance from './util/chance';
import Multiplier from './multiplier';
import Statistics from './statistics';
import Level from './level';

const tilesize = 50;
const width = map.length * tilesize;
const height = map[0].length * tilesize;

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
  paused: false,
  entities: new Set(),
  bridges: [leftBridge, rightBridge],
  texts: new Set(),
  scoreMultipliers: Multiplier(),
  statistics: Statistics(),
  showStats: false,
  map,
  points: 0,
  level: Level(0),
  humansSaved: 0,
  zombiesTaken: 0
};

const leftSpawn = Spawner({
  generateEntity: Entity.oneOf(Human, Zombie),
  x: 26,
  y: 4,
  i: -1
}, 1000, 0.9, entity => {
  state.entities.add(entity);
});

const rightSpawn = Spawner({
  generateEntity: Entity.oneOf(Human, Zombie),
  x: 0,
  y: 4,
  i: 1
}, 1000, 0.9, entity => {
  state.entities.add(entity);
});

function update() {
  leftSpawn.spawn();
  rightSpawn.spawn();

  if(state.zombiesTaken >= state.level.zombieLimit) {
    //show level failure dialogue
    state.level = Level(0);
  }
  if(state.humansSaved >= state.level.humanTarget) {
    //show next level dialogue when we get here
    //

    // reset all entities
    state.entities.clear();

    // reset stats
    state.statistics = Statistics();

    // advance to next level
    state.level = state.level.next();

    state.showStats = true;
    state.paused = true;

    // reset goals
    state.humansSaved = 0;
    state.zombiesTaken = 0;
  }

  if(keyIsDown(controls.MAIN_MENU)) {
    state.showMenu = true;
    state.paused = true;
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

    if(tileBehind.isLiquid) {
      // move to drowned canvas
      //state.entities.delete(entity);
      entity.drowned = true;
      // kill movement in both directions to prevent horizontal
      // landing on the wall bugs
      entity.j = 0;
      entity.i = 0;

      state.statistics.died.inc(entity.type);
    }

    if(tileBehind.isLadder && !entity.isSafe) {
      state.statistics.saved.inc(entity.type);

      if(entity.name != 'Zombie') {
        state.humansSaved += 1;

        if('item' in entity) {
          entity.item.apply(entity, state);
          state.texts.add(FloatingText(entity.item.name,
              entity.x, 2, 70, entity.item.color || 'cyan'));
          state.texts.add(FloatingText(entity.item.description,
              entity.x, 3.5, 30, 'white'));
        }
      } else{
        state.zombiesTaken += 1;
      }

      // remove entity from game
      state.entities.delete(entity);

      // apply score taking multipliers into account
      const points = entity.points * state.scoreMultipliers.multiplier();
      state.points += points;

      // show some text to represent the score
      const color = points >= 0 ? '#c6db06' : 'red';
      const num = Math.abs(points);
      const sign = points >= 0 ? '+' : '-';
      state.texts.add(FloatingText(`${sign}$${num}`, entity.x, entity.y, 50, color));
    }

    const tileBelow = tiles[map[tx][ty + 1]];

    if(tileBelow.solid) {
      entity.j = 0;
    } else {
      // add an initial fall rotation
      if(entity.rotation === 0) {
        entity.rotation = chance(0.5) ? Math.random() / 10 : -Math.random() / 10;
      }

      entity.j += 0.1;
      entity.i = 0;
      entity.rotation *= 1.3;
    }

    // apply movement - could be moved t prototype
    entity.x += entity.speed * entity.i;
    entity.y += entity.j;
  });
}

function animate() {
  setTimeout(animate, 50);
  if(!state.paused) {
    update();
    render(state);
  }
}

animate();

