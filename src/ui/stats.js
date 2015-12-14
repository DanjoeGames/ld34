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
  function makeButton(text, onclick) {
    const btn = button({ class: 'dialogue__button' }, text);
    btn.on('click', onclick);

    return div({ class: 'menu__item' }, btn);
  }

  const nextButton = makeButton('Next >', () => {});

  const humanTypes = Object.keys(humans);

  const survivorValues = humanTypes.reduce((stats, type) => {
    stats[type] = span({ class: 'stat__value' }, 0);
    return stats;
  }, {});

  const survivorStats = humanTypes.map(type => {
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

  return {
    create() {
      return Dialogue(
        div({ class: 'menu' }, [
          h2({}, 'Level Complete'),
          div({ class: 'stats' }, survivorStats),
          div({}, nextButton)
        ])
      );
    },
    update(state) {
      const stats = state.statistics.saved.value();

      stats.forEach((value, type) => {
        survivorValues[type].innerText = value;
      });
    }
  };
});

