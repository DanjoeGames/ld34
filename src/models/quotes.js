import Improvise from 'improvise';

const grammar = Improvise.grammar({
  noun: ['bridge', 'zombie'],
  adjective: ['wonder', 'great', 'super', 'extra'],
  very: ['very', 'quite', 'slightly'],
  bad: ['cheap', 'shit', 'naff', 'lame', 'crap', 'horrible'],
  super: ['super', 'mega', 'wonder', 'macho', 'grand', 'GNU / ', 'fucking', 'bloody'],
  alcohol: ['WKD', 'Vodka', 'Jager', 'Absinthe'],
  number: ['five', 'six', 'three', 'two'],
  difficulty: ['easy', 'tough', 'really difficult'],
  mate: ['friend', 'mate', 'dude', 'guys', 'bro'],
  L: ['Lonely', 'Larry', 'Llama', 'Lite', 'Little'],
  megainsult: '{{adjective}}{{insult}}',
  doubleinsult: '{{insult}}{{insult}}',
  insult: ['{{megainsult}}', 'muppet', 'knob', 'spanner', 'cretin',
           'pancake', 'bitch', 'twat', 'dick', 'idiot'],
  snow: [
    'You know nothing, Jon Snow',
    'I am the watcher on the {{noun}}'
  ],
  jules: [
    'Does he look like a {{insult}} to you?',
    'This was divine intervention!',
    'English, {{doubleinsult}}. Do you speak it?',
    'I\'ve had it with these {{noun}}s on this {{noun}}!',
    'Samuel \'{{L}}\' Jackson',
    'The L stands for {{L}}',
    'The path of the righteous man is beset on all sides'
  ],
  jesus: [
    'My side hurts.',
    'The romans are {{insult}}s',
    'Look busy {{mate}}!',
    'I do {{difficulty}} miracles, {{insult}}',
    'I\'m literally {{super}} Jesus',
    'I turn water into {{alcohol}}!',
    'Judas is a {{insult}}',
    'He\'s not the messiah!'
  ],
  gandalf: [
    'Fly you fools!',
    'Fly you {{insult}}s!',
    'A wizard is never late.',
    'Fool of a {{noun}}!',
    'Peregrin Took, you {{insult}}!',
    'Throw yourself in next time, you {{insult}}',
    'I\'m not a conjurer of {{bad}} tricks!'
  ],
  jones: [
    'I hate snakes!',
    'It belongs in a museum you {{insult}}!',
    'Why\'d it have to be {{noun}}s?',
    '{{noun}}s belongs in a museum!',
    'All my quotes are {{bad}}'
  ]
});

// I hae literally no idea why this works
export default (name) => () => grammar.eval('{{'+name+'}}');

