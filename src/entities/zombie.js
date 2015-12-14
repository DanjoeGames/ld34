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
  zombie.rotation = 0;

  zombie.animation = {
    cycleFrames: 5,
    counter: 0,
    yPos: 0,

    update: function() {
      if(this.counter < this.cycleFrames) {
        this.yPos -= 0.01;
      } else {
        this.yPos = 0;
        this.counter = 0;
      }

      this.counter ++;
    },

    displaceSprite: function(x, y) {
      return {
        y: y + this.yPos,
        x: x
      };
    }
  };

  return zombie;
};
