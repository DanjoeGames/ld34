import defineSprite from '../util/define-sprite';

export default {
  creditCard: {
    sprite: defineSprite(2, 1),
    name: 'Credit Card'
    apply: function(player, state) {
      state.scoreMultipliers.push({ value: 2 });
    }
  },
  redbull: {
    sprite: defineSprite(2, 2),
    name: 'Energy Drink'
    apply: function(player, state) {
      state.entities.forEach(entity => {
        // speed all humans up
      });
    }
  },
  phone: {
    sprite: defineSprite(2, 2),
    name: 'Mobile Phone'
    apply: function(player, state) {
      player.score *= 10;
    }
  },
  jackpot: {
    sprite: defineSprite(2, 3),
    name: 'Jackpot'
    apply: function(player, state) {
      state.entities.forEach(entity => {
        // turn all entities into gentlemen
      });
    }
  },
  burger: {
    sprite: defineSprite(2, 4),
    name: 'Burger'
    apply: function(player, state) {
      state.entities.forEach(entity => {
        // spawn slow & fat people
      });
    }
  },
  icecream: {
    sprite: defineSprite(2, 5),
    name: 'Brainfreeze'
    apply: function(player, state) {
      state.entities.forEach(entity => {
        // slow all zombies
      });
    }
  }
}

