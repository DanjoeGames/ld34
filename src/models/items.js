import defineSprite from '../util/define-sprite';
import randomProperty from '../util/random-property';
import humans from './humans';

const items = {
  creditCard: {
    sprite: defineSprite(0, 3),
    name: 'Credit Card',
    color: '#0678c5',
    description: '2x multiplier',
    level: 1,
    apply: function(player, state) {
      state.scoreMultipliers.apply(2, 60000);
    }
  },
  redbull: {
    sprite: defineSprite(1, 3),
    name: 'Energy Drink',
    color: '#a9d3ef',
    description: 'Speed humans up!',
    level: 1,
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
    name: 'Phone',
    color: '#3c3c3c',
    description: 'This guy\'s rich!',
    level: 1,
    apply: function(player, state) {
      // increase this player's score by 10x
      player.score *= 10;
    }
  },
  jackpot: {
    sprite: defineSprite(3, 3),
    name: 'Jackpot',
    color: '#972828',
    level: 3,
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
    level: 1,
    description: 'Does burger all.',
    apply: function(player, state) {
    }
  },
  icecream: {
    sprite: defineSprite(5, 3),
    name: 'Brainfreeze',
    color: '#47e57f',
    description: 'Slows all zombies',
    level: 2,
    apply: function(player, state) {
      state.entities.forEach(entity => {
        // slow all zombies
        if(entity.name == 'Zombie') {
          entity.speed *= 0.5;
        }
      });
    }
  },
  illuminati: {
    sprite: defineSprite(0, 4),
    name: 'Illuminati',
    color: '#38782d',
    description: 'Confirmed!',
    level: 3,
    apply: function(player, state) {
      state.entities.forEach(entity => {
        Object.assign(entity, humans.priest);
        entity.item = items.illuminati;
      });
    }
  },
  scratchcard: {
    sprite: defineSprite(1, 4),
    name: 'Scratchcard',
    color: 'cyan',
    description: 'Did you win?',
    level: 2,
    apply: function(player, state) {
      player.points = Math.floor(Math.random() * 10000);
    }
  },
  sword: {
    sprite: defineSprite(2, 4),
    name: 'Sword',
    color: 'grey',
    level: 0,
    description: 'But why?',
    apply: function(player, state) {
    }
  },
  die: {
    sprite: defineSprite(3, 4),
    name: 'Luck',
    color: 'white',
    description: 'Items for everyone!',
    level: 4,
    apply: function(player, state) {
      state.entities.forEach(function(entity) {
        if(entity.name !== 'Zombie' && !entity.item) {
          entity.item = randomProperty(items);
        }
      });
    }
  },
  airstrike: {
    sprite: defineSprite(4, 4),
    name: 'Airstrike',
    color: 'red',
    level: 4,
    description: 'Instakill all zombies!',
    apply: function(player, state) {
      state.entities.forEach(entity => {
        if(entity.name === 'Zombie') {
          state.entities.delete(entity);
        }
      });
    }
  },
  jetpack: {
    sprite: defineSprite(5, 4),
    name: 'Jetpack',
    color: 'green',
    level: 0,
    description: 'Flying humans!',
    apply: function(player, state) {
      state.entities.forEach(entity => {
        if(entity.name !== 'Zombie') {
          entity.flying = true;
        }
      });
    }
  }
}

export default items;
