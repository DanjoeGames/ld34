import defineSprite from '../util/define-sprite';

export default {
  //Speeds up humans
  Jet:     { itemSprite: defineSprite(0, 0), itemName: 'Jet' },

  //slows down zombies
  BrainFreeze: { itemSprite: defineSprite(0, 0), itemName: 'BrainFreeze' },

  //no item
  NoItem: { itemName: 'NoItem' }
}
