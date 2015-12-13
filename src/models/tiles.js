import constants from '../constants/tiles';

const { AIR, GRASS, WATER, STONE, BRIDGE, LADDER } = constants;

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
    sprite: { x: 8, y: 0 }
  },
}

