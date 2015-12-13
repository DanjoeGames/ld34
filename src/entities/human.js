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

  human.falling = false;

  human.isSafe = false;

  human.animation = {
    cycleFrames: 3,
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

  human.item = randomProperty(items);

  return human;
};

