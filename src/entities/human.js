import Entity from './';
import humans from '../models/humans';
import randomProperty from '../util/random-property';

export default function(x, y, i=0, j=0) {
  const human = Object.create(Entity);

  Object.assign(human, randomProperty(humans));

  human.x = x;
  human.y = y;
  human.i = i;
  human.j = j;

  return human;
}
