import tiletypes from './constants/tiles';
import tiles from './models/tiles';
import map from './models/map';
import Renderer from './renderer';
import Human from './entities/human';
import Zombie from './entities/zombie';

const tilesize = 50;
const width = map.length * tilesize;
const height = map[0].length * tilesize;

const render = Renderer(width, height, tilesize, () => {
  return document.getElementById('game');
});

const state = {
  entities: [Human(5, 2, 0.1), Human(6, 2), Zombie(4, 2), Zombie(3, 2)],
  map
};

function update() {
  state.entities.forEach(entity => {
    const tx = Math.floor(entity.x);
    const ty = Math.floor(entity.y);

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
    entity.x += entity.i;
    entity.y += entity.j;
  });
}

function animate() {
  setTimeout(animate, 100);
  update();
  render(state);
}

animate();

