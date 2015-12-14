import Container from './container';
import Element from '../util/element';

const div = Element.partial('div');
const span = Element.partial('span');
const img = Element.partial('img');

export default Container(function() {
  const level = span({ class: 'status-bar__value' });
  const money = span({ class: 'status-bar__value' });
  const humans = span({ class: 'status-bar__value' });
  const zombies = span({ class: 'status-bar__value' });
  const multiplier = img({ src: 'assets/x1.png' });

  function makeItem(imgSrc, valueElement) {
    return div({ class: 'status-bar__item' }, [
      img({ src: imgSrc }),
      valueElement
    ]);
  }

  return {
    create() {
      return div({ class: 'status-bar' }, [
        makeItem('assets/level.png', level),
        makeItem('assets/money.png', money),
        makeItem('assets/humans.png', humans),
        makeItem('assets/zombies.png', zombies),
        div({ class: 'status-bar__item' }, [
          multiplier
        ])
      ]);
    },
    update(state) {
      level.innerText = state.level.number;
      money.innerText = state.points;
      humans.innerText = `${state.humansSaved} / ${state.level.humanTarget}`;
      zombies.innerText = state.zombiesTaken;
      multiplier.src = `assets/x${state.scoreMultipliers.multiplier()}.png`;
    }
  };
});

