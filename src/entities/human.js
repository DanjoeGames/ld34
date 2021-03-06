import Entity from './';
import humans from '../models/humans';
import items from '../models/items';
import randomProperty from '../util/random-property';
import {state} from '../';

export default function(x, y, i, j) {
  const human = Object.create(Entity);

  const rarity = Math.random();
  const types = Object.keys(humans).map(type => humans[type]);
  const availableTypes = types
    .filter(type => type.rarity >= rarity);

  // sets to human to be a random type of human
  Object.assign(human, randomProperty(availableTypes));

  human.x = x;
  human.y = y;
  human.i = i;
  human.j = j;
  human.speed = 0.1;
  human.rotation = 0;

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


  if(Math.random() > 0.8) {
    human.item = randomProperty(get_possible_items(state.level));
    // human.item = randomProperty(items);
  }

  return human;
};

var get_possible_items = function(level) {
  var pool = {};

  Object.keys(items).forEach(key => {

    var item = items[key];
    if(item.level <= level.number) {
      pool[key] = item;
      // Object.assign(pool[key], item);
    }
  });
  return pool;
}

