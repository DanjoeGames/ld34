import defineSprite from '../util/define-sprite';
import humans from '../models/humans';

export default {

  creditCard: {
    sprite: defineSprite(0, 3),
    name: 'Credit Card',
    color: '#0678c5',
    description: '2x multiplier',
    apply: function(player, state) {
      state.scoreMultipliers.apply(2, 10000);
    }
  },
  redbull: {
    sprite: defineSprite(1, 3),
    name: 'Energy Drink',
    color: '#a9d3ef',
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
    sprite: defineSprite(2, 3),
    name: 'Mobile Phone',
    color: '#3c3c3c',
    description: 'x10 score',
    apply: function(player, state) {
      // increase this player's score by 10x
      player.score *= 10;
    }
  },
  jackpot: {
    sprite: defineSprite(3, 3),
    name: 'Jackpot',
    color: '#972828',
    description: 'What fine fellows!',
    apply: function(player, state) {
      state.entities.forEach(entity => {
        // turn all entities into gentlemen
        Object.assign(entity, humans.gentleman);
      });
    }
  },
  burger: {
    sprite: defineSprite(4, 3),
    name: 'Burger',
    color: '#c9a45d',
    description: 'Does burger all.',
    apply: function(player, state) {
    }
  },
  icecream: {
    sprite: defineSprite(5, 3),
    name: 'Brainfreeze',
    color: '#47e57f',
    description: 'Slows all zombies',
    apply: function(player, state) {
      state.entities.forEach(entity => {
        // slow all zombies
        if(entity.name == 'Zombie') {
          entity.speed *= 0.5;
        }
      });
    }
  },
  briefcase: {
    sprite: defineSprite(0, 4),
    name: 'Briefcase',
    color: '#444',
    description: 'Not a long case!',
    apply: function(player, state) {
      state.entities.forEach(entity => {
      });
    }
  },
  scratchcard: {
    sprite: defineSprite(1, 4),
    name: 'Scratchcard',
    color: 'cyan',
    description: 'Did you win?',
    apply: function(player, state) {
      player.points = Math.floor(Math.random() * 10000);
    }
  },
  sword: {
    sprite: defineSprite(2, 4),
    name: 'Sword',
    color: 'grey',
    description: 'Instakill Zombies',
    apply: function(player, state) {
    }
  },
  die: {
    sprite: defineSprite(3, 4),
    name: 'Die',
    color: 'white',
    description: '',
    apply: function(player, state) {
    }
  },
  airstrike: {
    sprite: defineSprite(4, 4),
    name: 'Airstrike',
    color: 'red',
    description: 'Instakill all zombies!',
    apply: function(player, state) {
      state.entities.forEach(entity => {
        if(entity.name === 'Zombie') {
          state.entities.delete(entity);
        }
      });
    }
  }
}

