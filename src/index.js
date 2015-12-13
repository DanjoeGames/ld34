import tiletypes from './constants/tiles';
import tiledict from './models/tiles';
import map from './models/map';
import Renderer from './renderer';

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

function update() {

}

function animate() {
  setTimeout(animate, 100);
  render(state);
}

animate();

