import Entity from './';
import zombies from '../models/zombies';
import randomProperty from '../util/random-property';

export default function(x, y, i=0, j=0) {
  const zombie = Object.create(Entity);

  // use a random type of zombie
  Object.assign(zombie, randomProperty(zombies));

  zombie.x = x;
  zombie.y = y;
  zombie.i = i;
  zombie.j = j;
  zombie.speed = 0.05;
  zombie.itemName = "NoItem"

  return zombie;
};
