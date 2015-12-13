import constants from '../constants/tiles';

const {
  AIR, GRASS, GRASS_LEFT, GRASS_RIGHT, WATER, STONE, BRIDGE, LADDER,
  STONE_LEFT, STONE_RIGHT
} = constants;

// use computed properties to build the tile dictionary.

export default {
  [AIR]: {
    solid: false,
    sprite: { x: 10, y: 0 }
  },
  [GRASS]: {
    solid: true,
    sprite: { x: 7, y: 1 }
  },
  [WATER]: {
    solid: false,
    isLiquid: true,
    sprite: { x: 6, y: 1 }
  },
  [STONE]: {
    solid: true,
    sprite: { x: 7, y: 0 }
  },
  [BRIDGE]: {
    solid: true,
    sprite: { x: 6, y: 0 }
  },
  [LADDER]: {
    solid: false,
    isLadder: true,
    sprite: { x: 8, y: 0 }
  },
  [GRASS_LEFT]: {
    solid: true,
    sprite: { x: 8, y: 1 }
  },
  [GRASS_RIGHT]: {
    solid: true,
    sprite: { x: 9, y: 1 }
  },
  [STONE_LEFT]: {
    solid: true,
    sprite: { x: 8, y: 0 }
  },
  [STONE_RIGHT]: {
    solid: true,
    sprite: { x: 9, y: 0 }
  }
}

