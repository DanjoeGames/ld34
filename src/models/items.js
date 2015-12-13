import defineSprite from '../util/define-sprite';

export default {
  //Speeds up humans
  Jet: { itemSprite: defineSprite(1, 2), itemName: 'Jet' },

  //slows down zombies
  BrainFreeze: { itemSprite: defineSprite(5, 2), itemName: 'BrainFreeze' },

  //no item
  NoItem: { itemName: 'NoItem' }
}
