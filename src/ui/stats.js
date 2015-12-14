import Container from './container';
import Dialogue from './dialogue';
import Element from '../util/element';
import humans from '../models/humans';

const div = Element.partial('div');
const span = Element.partial('span');
const h2 = Element.partial('h2');
const button = Element.partial('button');
const img = Element.partial('button');

export default Container(function() {
  function makeButton(text) {
    const btn = button({ class: 'dialogue__button' }, text);

    return div({ class: 'menu__item' }, btn);
  }

  function isSecretCharacter(type) {
    return humans[type].secret;
  }

  function isRegularCharacter(type) {
    return !isSecretCharacter(type);
  }

  // button that advances the screen
  const nextButton = makeButton('Next >');

  const humanTypes = Object.keys(humans);

  const survivorValues = humanTypes
    // don't show secret characters!!!
    .filter(isRegularCharacter)
    .reduce((stats, type) => {
      stats[type] = span({ class: 'stat__value' }, 0);
      return stats;
    }, {});

  const survivorStats = humanTypes
    .filter(isRegularCharacter)
    .map(type => {
      const human = humans[type];
      const spriteSize = 50;
      const sprite = div({ class: 'sprite' });

      // CSS background position moves the image rather than moving
      // the origin, so we need to use negative values to account
      // for that.
      Element.createStyles({
        backgroundImage: `url(assets/sprites.png)`,
        backgroundPositionX: -human.sprite.x * spriteSize + 'px',
        backgroundPositionY: -human.sprite.y * spriteSize + 'px',
        height: spriteSize + 'px',
        width: spriteSize + 'px'
      })(sprite);

      return div({ class: 'stat' }, [
        sprite,
        survivorValues[type]
      ]);
    });

  const dialogue =  Dialogue(
    div({ class: 'menu' }, [
      h2({}, 'Level Complete'),
      div({ class: 'stats' }, survivorStats),
      div({}, nextButton)
    ])
  );

  return {
    create() {
      dialogue.style.display = 'none';
      return dialogue;
    },
    update(state) {
      const stats = state.statistics.saved.value();

      nextButton.on('click', () => {
        state.paused = false;
        state.showStats = false;
      });

      stats.forEach((value, type) => {
        if(!humans[type].secret) {
          survivorValues[type].innerText = value;
        }
      });

      if(state.showStats) {
        dialogue.style.display = 'block';
      } else {
        dialogue.style.display = 'none';
      }
    }
  };
});

