import Container from './container';
import Dialogue from './dialogue';
import Element from '../util/element';

const div = Element.partial('div');
const span = Element.partial('span');
const h2 = Element.partial('h2');
const button = Element.partial('button');

export default Container(function() {
  function makeMenuItem(title) {
    return div({ class: 'menu__item' }, [
      button({ class: 'menu__item__button' }, [title])
    ]);
  }

  const play = makeMenuItem('Play');
  const help = makeMenuItem('Help');
  const achievements = makeMenuItem('Achievements');

  play.on('click', () => {
    console.log('Play');
  });

  help.on('click', () => {
    console.log('HElp');
  });

  return {
    create() {
      return Dialogue(
        div({ class: 'menu' }, [
          h2({}, ['Zombridge']),
          play,
          help,
          achievements
        ])
      );
    },
    update(state) {
    }
  };
});

