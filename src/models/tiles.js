import constants from '../constants/tiles';

const { AIR, GRASS, WATER, STONE, BRIDGE };

export default {
  [AIR]: {
    solid: false,
    sprite: null
  },
  [GRASS]: {
    solid: true,
    sprite: { x: 6, y: 1 }
  },
  [WATER]: {
    solid: false,
    sprite: { x: 6, y: 1 }
  },
  [STONE]: {
    solid: true,
    sprite: { x: 6, y: 1 }
  },
  [BRIDGE]: {
    solid: true,
    sprite: { x: 6, y: 1 }
  }
}

