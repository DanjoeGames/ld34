import onLoad from './util/on-load';
import tiles from './models/tiles';
import tiletypes from './constants/tiles';

const spritesheet = new Image();
spritesheet.src = 'assets/sprites.png';

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

  const container = document.createElement('div');
  container.appendChild(bg.canvas);
  container.appendChild(fg.canvas);

  container.style.position = 'relative';

  onLoad(() => {
    getElement().appendChild(container);
  });

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

  function foreground(state) {
    const c = fg.context;
    const ts = tilesize;

    c.clearRect(0, 0, width, height);

    state.entities.forEach(entity => {
      drawSprite(entity.sprite.x, entity.sprite.y)
        (c, entity.x, entity.y);
    });
  }

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

  return function(state) {
    background(state);
    foreground(state);
  };
}

