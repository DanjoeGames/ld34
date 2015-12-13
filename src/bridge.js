import tiles from './constants/tiles';

export default function Bridge(length, x, y, config) {
  const bridge = {};

  bridge.extended = true;
  bridge.length = length;
  bridge.x = x;
  bridge.y = y;
  bridge.extended = true;

  bridge.currentLength = 0;

  bridge.extend = () => bridge.extended = true;
  bridge.retract = () => bridge.extended = false;

  bridge.render = (map) => {
    console.log(bridge.extended);
    if(bridge.extended) {
      for(var i = 0; i < bridge.length; i++) {
        map[bridge.x + i][bridge.y] = tiles.BRIDGE;
      }
    } else {
      for(var i = 0; i < bridge.length; i++) {
        map[bridge.x + i][bridge.y] = tiles.AIR;
      }
    }

    return map;
  };

  return bridge;
}

