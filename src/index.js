import tiletypes from './constants/tiles';
import controls from './constants/controls';
import tiles from './models/tiles';
import map from './models/map';
import Renderer from './renderer';
import Human from './entities/human';
import Zombie from './entities/zombie';
import Spawner from './spawner';
import Entity from './entities';
import KeyboardState from './input';

const tilesize = 50;
const width = map.length * tilesize;
const height = map[0].length * tilesize;

const render = Renderer(width, height, tilesize, () => {
  return document.getElementById('game');
});

const keyIsDown = KeyboardState();

const state = {
  entities: [],
  map
};

const leftSpawn = Spawner({
  generateEntity: Entity.oneOf(Human, Zombie),
  x: 25,
  y: 4,
  i: -1
}, 500, 0.9, entity => {
  state.entities.push(entity);
}).forever();

const rightSpawn = Spawner({
  generateEntity: Entity.oneOf(Human, Zombie),
  x: 1,
  y: 4,
  i: 1
}, 500, 0.9, entity => {
  state.entities.push(entity);
}).forever();


function update() {
  state.entities.forEach(entity => {
    const tx = Math.round(entity.x);
    const ty = Math.round(entity.y);

    if(keyIsDown(controls.LEFT_BRIDGE)) {
      // extend
    } else {
      // retract
    }

    if(keyIsDown(controls.RIGHT_BRIDGE)) {
      // extend
    } else {
      // retract
    }

    const tileBehind = tiles[map[tx][ty]];

    if(tileBehind.isLiquid) {
      entity.drowned = true;
      entity.j = 0;
      entity.i = 0;
    }

    const tileBelow = tiles[map[tx][ty + 1]];
    if(tileBelow.solid) {
      entity.j = 0;
    } else {
      entity.j += 0.1;
    }

    // apply movement
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

