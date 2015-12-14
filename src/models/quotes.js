import Improvise from 'improvise';

const grammar = Improvise.grammar({
  noun: ['bridge', 'zombie'],
  adjective: ['wonder', 'great', 'super', 'extra'],
  very: ['very', 'quite', 'a bit'],
  super: ['super', 'mega', 'wonder', 'macho', 'grand', 'GNU / ', 'fucking', 'bloody'],
  difficulty: ['easy', 'tough', 'really difficult'],
  mate: ['friend', 'mate', 'dude', 'guys', 'bro'],
  L: ['Lonely', 'Larry', 'Llama', 'Lite', 'Little'],
  megainsult: '{{adjective}}{{insult}}',
  doubleinsult: '{{insult}}{{insult}}',
  insult: ['{{megainsult}}', '{{doubleinsult}}', 'muppet', 'twonk', 'spanner',
           'pancake', 'bitch', 'twat', 'dick', 'piglet', 'simple', 'idiot',
           'boffin', 'sellout'],
  snow: [
    'You know nothing, Jon {{noun}}',
    'I am the watcher on the {{noun}}'
  ],
  jules: [
    'Does he look like a {{insult}} to you?',
    'This was divine intervention!',
    'English, {{doubleinsult}}. Do you speak it?',
    'I\'ve had it with these {{noun}} on this {{noun}}!',
    'Samuel {{L}} Jackson',
    'The L stands for {{L}}'
  ],
  jesus: [
    'My side hurts.',
    'The romans are {{megainsult}}s',
    'Holy {{noun}}s!',
    'Look busy {{mate}}!',
    'I do {{very}} {{difficulty}} miracles {{insult}}',
    'I\'m literally {{super}} Jesus',
    'God is {{adjective}}'
  ],
  gandalf: [
    'Fly you fools!',
    'Fly you {{insult}}s!',
    'A wizard is never late.',
    'Fool of a {{noun}}!',
    'I\'m a tired developer',
    'Peregrin Took, you {{insult}}!',
    'Throw yourself in next time, you {{insult}}',
    'I\'m not a conjurer of cheap tricks!'
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

