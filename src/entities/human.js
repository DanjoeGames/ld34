import Entity from './';
import humans from '../models/humans';
import items from '../models/items';
import randomProperty from '../util/random-property';

export default function(x, y, i, j) {
  const human = Object.create(Entity);

  // sets to human to be a random type of human
  Object.assign(human, randomProperty(humans));

  human.x = x;
  human.y = y;
  human.i = i;
  human.j = j;
  human.speed = 0.1;

  human.isSafe = false;

  Object.assign(human, randomProperty(items));

  return human;
};

