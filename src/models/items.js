import defineSprite from '../util/define-sprite';
import humans from '../models/humans';

export default {

  creditCard: {
    sprite: defineSprite(0, 2),
    name: 'Credit Card',
    description: '2x multiplier',
    apply: function(player, state) {
      state.scoreMultipliers.apply(2, 10000);
    }
  },
  redbull: {
    sprite: defineSprite(1, 2),
    name: 'Energy Drink',
    description: 'Speed humans up!',
    apply: function(player, state) {
      state.entities.forEach(entity => {
        if(entity.name != 'Zombie') {
          entity.speed += 0.1;
        }
      });
    }
  },
  phone: {
    sprite: defineSprite(2, 2),
    name: 'Mobile Phone',
    description: 'x10 score',
    apply: function(player, state) {
      // increase this player's score by 10x
      player.score *= 10;
    }
  },
  jackpot: {
    sprite: defineSprite(3, 2),
    name: 'Jackpot',
    description: 'What fine fellows!',
    apply: function(player, state) {
      state.entities.forEach(entity => {
        // turn all entities into gentlemen
        Object.assign(entity, humans.gentleman);
      });
    }
  },
  burger: {
    sprite: defineSprite(4, 2),
    name: 'Burger',
    description: 'Does burger all.',
    apply: function(player, state) {
    }
  },
  icecream: {
    sprite: defineSprite(5, 2),
    name: 'Brainfreeze',
    description: 'Slows all zombies',
    apply: function(player, state) {
      state.entities.forEach(entity => {
        // slow all zombies
        if(entity.name == 'Zombie') {
          entity.speed *= 0.5;
        }
      });
    }
  }
}

