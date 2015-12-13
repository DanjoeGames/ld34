import tiletypes from './constants/tiles';
import tiles from './models/tiles';
import map from './models/map';
import Renderer from './renderer';
import Human from './entities/human';
import Zombie from './entities/zombie';
import Spawner from './spawner';
import Entity from './entities';

const tilesize = 50;
const width = map.length * tilesize;
const height = map[0].length * tilesize;

const render = Renderer(width, height, tilesize, () => {
  return document.getElementById('game');
});

const state = {
  entities: [],
  map
};

const leftSpawn = Spawner({
  generateEntity: Entity.oneOf(Human, Zombie),
  x: 0,
  y: 4,
  i: 0.1
}, 500, 0.9, entity => {
  state.entities.push(entity);
}).forever();

const rightSpawn = Spawner({
  generateEntity: Entity.oneOf(Human, Zombie),
  x: 20,
  y: 3,
  i: -0.1
}, 500, 0.9, entity => {
  state.entities.push(entity);
}).forever();


function update() {
  state.entities.forEach(entity => {
    const tx = Math.floor(entity.x);
    const ty = Math.floor(entity.y);


    const tileBehind = tiles[map[tx][ty]];
    if(typeof tileBehind === 'undefined') {
      console.log(entity.x, entity.y, tx, ty, map[tx][ty]);
      throw error;
    }
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
    entity.x += entity.i;
    entity.y += entity.j;
  });
}

function animate() {
  setTimeout(animate, 50);
  update();
  render(state);
}

animate();

