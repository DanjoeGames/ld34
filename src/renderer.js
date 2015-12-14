import onLoad from './util/on-load';
import tiles from './models/tiles';
import tiletypes from './constants/tiles';

import status from './ui/status';
import menu from './ui/menu';
import stats from './ui/stats';
import instructions from './ui/instructions';
import gameOver from './ui/game-over';

const spritesheet = new Image();
spritesheet.src = 'assets/sprites.png';

// Creates a canvas ready for rendering
export function makeRenderingContext(width, height) {
  const canvas = document.createElement('canvas');

  canvas.width = width;
  canvas.height = height;

  canvas.style.position = 'absolute';
  canvas.style.top = 0;
  canvas.style.left = 0;

  const context = canvas.getContext('2d');

  return { canvas, context };
}

export default function Renderer(width, height, tilesize, getElement) {
  const water = makeRenderingContext(width, height);
  const fg = makeRenderingContext(width, height);
  const drowned = makeRenderingContext(width, height);
  const bg = makeRenderingContext(width, height);

  // contain the canvases inside a container div
  const container = document.createElement('div');
  container.appendChild(drowned.canvas);
  container.appendChild(fg.canvas);
  container.appendChild(water.canvas);
  container.appendChild(bg.canvas);

  container.appendChild(status.create());
  container.appendChild(stats.create());
  container.appendChild(menu.create());
  container.appendChild(instructions.create());
  container.appendChild(gameOver.create());

  container.style.position = 'relative';
  drowned.canvas.style.backgroundImage = 'url(assets/background.png)';

  // use the onload util method to prevent race conditions
  onLoad(() => {
    getElement().appendChild(container);
  });

  // helper method for drawing sprites - curried inner function allows
  // the outer function to be called early, then cached.
  function drawSprite(x, y) {
    const ts = tilesize;
    const sx = x * ts;
    const sy = y * ts;

    return function(c, x, y, rotation) {
      const dx = x * ts;
      const dy = y * ts;

      c.save();

      c.translate(dx, dy);
      c.rotate(rotation);

      c.drawImage(spritesheet,
          sx, sy, ts, ts,
          0, 0, ts, ts);

      c.restore();
    };
  }

  function drawPlaceholderSprite(c, x, y, fillStyle) {
    const ts = tilesize;
    c.fillStyle = fillStyle;
    c.fillRect(x * ts, y * ts, ts/3, ts/3);
  }

  // all foreground rendering lives here
  function foreground(state) {
    let c = fg.context;
    const ts = tilesize;

    c.clearRect(0, 0, width, height);

    for(var i=0; i<state.entities.length; i++) {
      state.entities[i].animation.update();
    }

    state.entities.forEach(entity => {
      let ctx = c;

      var animPos = {
        x: entity.x,
        y: entity.y
      };

      if(!entity.drowned) {
        animPos = entity.animation.displaceSprite(entity.x, entity.y);
      } else {
        // draw on drowned canvas
        state.entities.delete(entity);
        ctx = drowned.context;
      }

      drawSprite(entity.sprite.x, entity.sprite.y)
        (ctx, animPos.x, animPos.y, entity.rotation);

      if('item' in entity) {
        drawSprite(entity.item.sprite.x, entity.item.sprite.y)
          (ctx, animPos.x + 0.3, animPos.y - 0.3, entity.rotation);
      }
    });
  }

  // all background rendering lives here
  function background(state) {
    const c = bg.context;
    const ts = tilesize;

    c.clearRect(0, 0, width, height);

    state.map.forEach((row, x) => {
      row.forEach((type, y) => {
        const tile = tiles[type];

        drawSprite(tile.sprite.x, tile.sprite.y)(c, x, y);
      });
    });

    state.texts.forEach(text => {
      c.font = `${text.size}px Purisa`;
      c.textAlign = 'center';
      c.lineColor = 'black';
      c.fillStyle = text.color;
      c.fillText(text.text, text.x * ts, (text.y * ts) - (10 - text.age));
      c.strokeText(text.text, text.x * ts, (text.y * ts) - (10 - text.age));
      text.age -= 1;

      if(text.age <= 0) {
        state.texts.delete(text);
      }
    });

    state.bridges.forEach(bridge => {
      c.font = `40px Purisa`;
      c.textAlign = 'center';
      if(bridge.extended) {
        c.fillStyle = 'white';
      } else {
        c.fillStyle = 'grey';
      }

      const x = (bridge.x + bridge.length / 2) * ts;
      const y = (bridge.y - 2) * ts;

      c.fillText(String.fromCharCode(bridge.key), x, y);
      c.font = `60px Purisa`;
      c.fillText('▢', x, y);
    });
  }

  let ticks = 0;
  function waves() {
    ticks += 1;
    const c = water.context;
    c.clearRect(0, 0, width, height);
    c.fillStyle = 'rgba(44, 113, 160, 0.6)';
    c.beginPath();
    c.moveTo(0, 500)
    for(var i = 0; i < width; i++) {
      c.lineTo(i, 500 + (Math.sin((i + ticks) / 10) * 10));
    }
    c.lineTo(width, height);
    c.lineTo(0, height);
    c.fill();
    c.stroke();
  }

  // the main render function - should only be extended if we
  // introduce more layers or more complex rules for when certain
  // layers need to be re-rendered
  return function(state) {
    background(state);
    foreground(state);
    waves();
    status.update(state);
    stats.update(state);
    menu.update(state);
    instructions.update(state);
    gameOver.update(state);
  };
}

