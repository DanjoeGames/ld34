export default function Bridge(length, x, y) {
  const bridge = {};

  bridge.extended = true;
  bridge.length = length;
  bridge.x = x;
  bridge.y = y;

  bridge.extend = () => bridge.extended = true;
  bridge.retract = () => bridge.extended = false;

  return bridge;
}

