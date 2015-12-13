export default function Bridge(length, x, y) {
  const bridge = Object.create(Bridge.prototype);

  bridge.expanded = true;
  bridge.length = length;
  bridge.x = x;
  bridge.y = y;

  return bridge;
}

Bridge.prototype = {
  expand: () => this.expanded = true,
  retract: () => this.expanded = false
};

