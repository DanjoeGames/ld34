import defineSprite from '../util/define-sprite';

export default {
  lawyer:     { rarity:  1, sprite: defineSprite(0, 0), points: 10, type: 'lawyer',     name: 'Lawyer' },
  teenager:   { rarity:  1, sprite: defineSprite(1, 0), points: 5,  type: 'teenager',   name: 'Teenager' },
  programmer: { rarity: .9, sprite: defineSprite(2, 0), points: 6,  type: 'programmer', name: 'Programmer' },
  clown:      { rarity: .9, sprite: defineSprite(3, 0), points: 3,  type: 'clown',      name: 'Clown' },
  gentleman:  { rarity: .1, sprite: defineSprite(4, 0), points: 50, type: 'gentleman',  name: 'Gentleman' },
  builder:    { rarity: .8, sprite: defineSprite(5, 0), points: 4,  type: 'builder',    name: 'Builder' },
  policeman:  { rarity: .5, sprite: defineSprite(0, 1), points: 8,  type: 'policeman',  name: 'Policeman' },
  chef:       { rarity: .5, sprite: defineSprite(1, 1), points: 9,  type: 'chef',       name: 'Chef' },
  artist:     { rarity: .9, sprite: defineSprite(2, 1), points: 4,  type: 'artist',     name: 'Artist' },
  streaker:   { rarity: .1, sprite: defineSprite(3, 1), points: 0,  type: 'streaker',   name: 'Streaker' },
  baby:       { rarity: .1, sprite: defineSprite(4, 1), points: 6,  type: 'baby',       name: 'Baby' },
  priest:     { rarity:   0,  sprite: defineSprite(5, 2), points: -100,   type: 'priest',  secret: true, name: 'Priest' },
  snow:       { rarity: .05,  sprite: defineSprite(0, 2), points: 10000,  type: 'snow',    secret: true, name: 'Snow' },
  jesus:      { rarity: .01,  sprite: defineSprite(1, 2), points: 20000,  type: 'jesus',   secret: true, name: 'Jesus' },
  jones:      { rarity: .05,  sprite: defineSprite(2, 2), points: 5000,   type: 'jones',   secret: true, name: 'Jones' },
  gandalf:    { rarity: .03,  sprite: defineSprite(3, 2), points: 15000,  type: 'gandalf', secret: true, name: 'Gandalf' },
  jules:      { rarity: .03,  sprite: defineSprite(4, 2), points: 15000,  type: 'jules',   secret: true, name: 'Jules' }
}
