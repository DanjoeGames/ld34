import Entity from './';
import humans from '../models/humans';
import randomProperty from '../util/random-property';

export default function(x, y, i=0, j=0) {
}

export default function(x, y, i, j) {
  const human = Object.create(Entity);

  Object.assign(human, randomProperty(humans));

  human.x = x;
  human.y = y;
  human.i = i;
  human.j = j;
  human.speed = 0.1;

  return human;
};
