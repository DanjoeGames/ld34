import Container from './container';
import Dialogue from './dialogue';
import Element from '../util/element';

const div = Element.partial('div');
const span = Element.partial('span');
const h2 = Element.partial('h2');
const button = Element.partial('button');
const p = Element.partial('p');
const img = Element.partial('img');

export default Container(function() {
  const start = button({ class: 'dialogue__button' }, 'Start >');
  const skip = button({ class: 'dialogue__button' }, 'Skip >');

  const dialogue = Dialogue(
    div({ class: 'menu' }, [
      h2({}, 'Instructions'),
      skip,
      p({}, `Help the humans get over the bridges and try to make sure
             that the zombies aren't allowed down the ladder!`),
      img({ src: 'assets/instructions.png' }),
      p({}, `Use the F and J keys to extend the bridges on either side of
             the island.`),
      p({}, `Some of the humans will be carrying items which may help
             or hinder your progress. They will only activate if you
             get them to the ladder.`),
      img({ src: 'assets/status.png' }),
      p({}, `The status bar shows the current level, your money, the number
             of humans you need to save before advancing, the number of
             zombies you can let in before game over and your current score
             multiplier.`),
      img({ src: 'assets/secret.png' }),
      p({}, `Watch out for the elusive secret characters, saving them results
             in large rewards!`),
      p({}, 'To get you started, there are no zombies in the first level. Good luck!'),
      start
    ])
  );

  return {
    create() {
      return dialogue;
    },
    update(state) {
      skip.on('click', () => {
        state.showIntro = false;
        state.paused = false;
      });
      start.on('click', () => {
        state.showIntro = false;
        state.paused = false;
      });

      if(state.showIntro) {
        dialogue.style.display = 'block';
      } else {
        dialogue.style.display = 'none';
      }
    }
  };
});

