import Improvise from 'improvise';

const grammar = Improvise.grammar({
  noun: ['bridge', 'zombie'],
  adjectives: ['wonderful', 'great', 'super'],
  super: ['Super', 'Mega', 'Wonder', 'Cheese', 'Grand', 'GNU / '],
  difficulty: ['easy', 'tough', 'really difficult'],
  mate: ['friend', 'mate', 'dude', 'guys', 'bro'],
  L: ['Lonely', 'Lovely', 'Llama', 'Lite'],
  insult: ['muppet', 'twonk', 'spanner', 'pancake', 'bitch'],
  snow: [
    'You know nothing, Jon {{noun}}',
    'I am the watcher on the {{noun}}'
  ],
  jules: [
    'Does he look like a {{insult}} to you?',
    'This was divine intervention!',
    'English, motherf*cker. Do you speak it?',
    'I\'ve had it with these {{noun}} on this {{noun}}!',
    'That\'s Samuel {{L}} Jackson, to you!'
  ],
  jesus: [
    'My side hurts.',
    'Holy {{noun}}s!',
    'Look busy {{mate}}!',
    'I\'m literally {{super}} Jesus',
  ],
  gandalf: [
    'Fly you fools!',
    'A wizard is never late.',
    'Fool of a {{noun}}!',
    'I\'m a tired developer',
    'Peregrin Took, you {{insult}}!'
  ],
  jones: [
    'I hate snakes!',
    'It belongs in a museum you {{insult}}!',
    'Why\'d it have to be {{noun}}s?',
    '{{noun}}s belongs in a museum!',
    'Thinking up quotes is hard'
  ]
});

// I hae literally no idea why this works
export default (name) => () => grammar.eval('{{'+name+'}}');

