import defineSprite from '../util/define-sprite';

export default {
  lawyer:     { sprite: defineSprite(0, 0), points: 10, type: 'lawyer',     name: 'Lawyer' },
  teenager:   { sprite: defineSprite(1, 0), points: 5,  type: 'teenager',   name: 'Teenager' },
  programmer: { sprite: defineSprite(2, 0), points: 6,  type: 'programmer', name: 'Programmer' },
  clown:      { sprite: defineSprite(3, 0), points: 3,  type: 'clown',      name: 'Clown' },
  gentleman:  { sprite: defineSprite(4, 0), points: 50, type: 'gentleman',  name: 'Gentleman' },
  builder:    { sprite: defineSprite(5, 0), points: 4,  type: 'builder',    name: 'Builder' },
  policeman:  { sprite: defineSprite(0, 1), points: 8,  type: 'policeman',  name: 'Policeman' },
  chef:       { sprite: defineSprite(1, 1), points: 9,  type: 'chef',       name: 'Chef' },
  artist:     { sprite: defineSprite(2, 1), points: 4,  type: 'artist',     name: 'Artist' },
  streaker:   { sprite: defineSprite(3, 1), points: 0,  type: 'streaker',   name: 'Streaker' },
  baby:       { sprite: defineSprite(4, 1), points: 6,  type: 'baby',       name: 'Baby' }
}

