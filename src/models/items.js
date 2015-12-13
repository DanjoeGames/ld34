import defineSprite from '../util/define-sprite';
import humans from '../models/humans';

export default {

  creditCard: {
    sprite: defineSprite(0, 2),
    name: 'Credit Card',
    apply: function(player, state) {
      state.scoreMultipliers.push({ value: 2 });
    }
  },
  redbull: {
    sprite: defineSprite(1, 2),
    name: 'Energy Drink',
    apply: function(player, state) {
      state.entities.forEach(entity => {
        // speed all humans up
        if(entity.name != 'Zombie') {
          entity.speed += 0.1;
        }
      });
    }
  },
  phone: {
    sprite: defineSprite(2, 2),
    name: 'Mobile Phone',
    apply: function(player, state) {
      // increase this player's score by 10x
      player.score *= 10;
    }
  },
  jackpot: {
    sprite: defineSprite(3, 2),
    name: 'Jackpot',
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
    apply: function(player, state) {
    }
  },
  icecream: {
    sprite: defineSprite(5, 2),
    name: 'Brainfreeze',
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

