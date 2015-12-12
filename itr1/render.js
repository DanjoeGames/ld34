var tiles = [
  'blue',
  'green'
];

var TILE_SIZE = 50;
function makeSprite(type) {
  return {
    x: type.sprite.x * TILE_SIZE,
    y: type.sprite.y * TILE_SIZE,
    w: TILE_SIZE,
    h: TILE_SIZE
  };
}

function Renderer(element) {
  var spritesheet = new Image();
  spritesheet.src = 'img/sprites.png';

  var canvas = document.createElement('canvas');
  var context = canvas.getContext('2d');

  canvas.width = element.offsetWidth;
  canvas.height = element.offsetHeight;

  element.appendChild(canvas);

  return function(map, entities, bridges, score) {
    var c = context;
    var ts = TILE_SIZE;

    map.forEach(function(row, x) {
      row.forEach(function(tile, y) {
        var sprite = makeSprite(types.tiles[tile]);
        c.drawImage(spritesheet, sprite.x, sprite.y, sprite.w, sprite.h,
          x * ts, y * ts, ts, ts);
        });
    });

    bridges.forEach(function(bridge) {
      var x, y;

      if(!bridge.raised) {
        c.fillStyle = 'grey';
        var sprite = makeSprite(types.tiles[2]);

        for(x = 0; x < bridge.width; x++) {
          for(y = 0; y < bridge.height; y++) {
            var rx = (bridge.x + x) * ts;
            var ry = (bridge.y + y) * ts;
            c.drawImage(spritesheet, sprite.x, sprite.y, sprite.w, sprite.h,
                rx, ry, ts, ts);
          }
        }
      }

      if(bridge.selected) {
        c.fillStyle = 'rgba(255, 255, 255, 0.3)';

        for(x = 0; x < bridge.width; x++) {
          for(y = 0; y < bridge.height; y++) {

            c.fillRect((bridge.x + x) * ts, (bridge.y + y) * ts, ts, ts);
          }
        }
      }
    });

    entities.forEach(function(entity) {
      switch(entity.type) {
        case 'human': c.fillStyle = 'white'; break;
        case 'zombie': c.fillStyle = 'red'; break;
      }

      var sprite = makeSprite(entity.version);
      c.drawImage(spritesheet, sprite.x, sprite.y, sprite.w, sprite.h,
          entity.x * ts, entity.y * ts, ts, ts);

      if(entity.drowned) {
        c.fillStyle = 'rgba(0, 0, 255, 0.5)';
        c.fillRect(entity.x * ts, entity.y * ts, ts, ts);
      } else {
        c.fillText(entity.version.name, entity.x * ts, entity.y * ts - ts / 2);
      }
    });

    c.fillStyle = '#000';
    c.fillText('Score: ' + score, 0, ts);
  };
}

