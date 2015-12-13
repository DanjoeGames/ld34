import onLoad from './util/on-load';
import tiles from './models/tiles';
import tiletypes from './constants/tiles';

import status from './ui/status';
import menu from './ui/menu';

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
  const fg = makeRenderingContext(width, height);
  const bg = makeRenderingContext(width, height);

  // contain the canvases inside a container div
  const container = document.createElement('div');
  container.appendChild(bg.canvas);
  container.appendChild(fg.canvas);

  container.appendChild(status.create());
  // menu isn't working
  //container.appendChild(menu.create());

  container.style.position = 'relative';
  bg.canvas.style.backgroundImage = 'url(assets/background.png)';

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

    return function(c, x, y) {
      const dx = x * ts;
      const dy = y * ts;

      c.drawImage(spritesheet,
          sx, sy, ts, ts,
          dx, dy, ts, ts);
    };
  }

  function drawPlaceholderSprite(c, x, y, fillStyle) {
    const ts = tilesize;
    c.fillStyle = fillStyle;
    c.fillRect(x * ts, y * ts, ts/3, ts/3);
  }

  // all foreground rendering lives here
  function foreground(state) {
    const c = fg.context;
    const ts = tilesize;

    c.clearRect(0, 0, width, height);

    for(var i=0; i<state.entities.length; i++) {
      state.entities[i].animation.update();
    }

    state.entities.forEach(entity => {

      var animPos = {
        x: entity.x,
        y: entity.y
      };

      if(!entity.drowned) {
        animPos = entity.animation.displaceSprite(entity.x, entity.y);
      }

      drawSprite(entity.sprite.x, entity.sprite.y)
        (c, animPos.x, animPos.y);

      if('item' in entity) {
        drawSprite(entity.item.sprite.x, entity.item.sprite.y)
          (c, animPos.x + 0.3, animPos.y - 0.3);
      }
    });

    state.texts.forEach(text => {
      if(text.dead) return;

      c.font = `${text.size}px Purisa`;
      c.textAlign = 'center';
      c.lineColor = 'black';
      c.fillStyle = text.color;
      c.fillText(text.text, text.x * ts, (text.y * ts) - (10 - text.age));
      c.strokeText(text.text, text.x * ts, (text.y * ts) - (10 - text.age));
      text.age -= 1;

      if(text.age <= 0) {
        text.dead = true;
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
  }

  // the main render function - should only be extended if we
  // introduce more layers or more complex rules for when certain
  // layers need to be re-rendered
  return function(state) {
    background(state);
    foreground(state);
    status.update(state);
  };
}

