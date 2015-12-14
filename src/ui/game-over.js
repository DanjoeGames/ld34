import Container from './container';
import Dialogue from './dialogue';
import Element from '../util/element';
import Level from '../level';

const div = Element.partial('div');
const span = Element.partial('span');
const h2 = Element.partial('h2');
const button = Element.partial('button');
const p = Element.partial('p');

export default Container(function() {
  const retry = button({ class: 'dialogue__button' }, 'Retry >');

  const dialogue = Dialogue(
    div({ class: 'menu' }, [
      h2({}, ['Game Over']),
      p({}, 'You let in too many zombies!'),
      retry
    ])
  );

  return {
    create() {
      dialogue.style.display = 'none';
      return dialogue;
    },
    update(state) {
      retry.on('click', () => {
        state.gameOver = false;
        state.level = Level(1);
        state.paused = false;
        state.zombiesTaken = 0;
        state.humansSaved = 0;
        state.entities.clear();
        state.points = 0;
      });

      if(state.gameOver) {
        dialogue.style.display = 'block';
      } else {
        dialogue.style.display = 'none';
      }
    }
  };
});

