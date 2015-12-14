import Improvise from 'improvise';

const grammar = Improvise.grammar({
  noun: ['bridge', 'zombie'],
  adjectives: ['wonderful', 'great', 'super'],
  difficulty: ['easy', 'tough', 'really difficult'],
  snow: [
    'You know nothing, Jon {{noun}}',
    'I am the watcher on the {{noun}}',
    'The nights watch is {{adjective}}',
    'It is {{difficulty}} being a bastard'
  ],
  jules: [
    'Does he look like a {{noun}} to you?',
    'This was divine intervention!',
    'English, motherfucker. Do you speak it?',
    'I\'ve had it with these {{nouns}} on this {{bridge]}!'
  ],
  jesus: [
    'My side hurts.',
    'Holy {{noun}}s!',
    'Look busy bro!'
  ],
  gandalf: [
    'Fly you fools!',
    'A wizard is never late.',
    'Fool of a {{noun}}!'
  ],
  jones: [
    'I hate snakes!',
    'Why\'d it have to be {{noun}}s?',
    '{{noun}}s belongs in a museum!'
  ]
});

// I hae literally no idea why this works
export default (name) => () => grammar.eval('{{'+name+'}}');

