export function FloatingText(text, x, y, size, color) {
  const container = {};

  container.text = text;
  container.age = 40;
  container.size = size;
  container.x = x + Math.random();
  container.y = y + Math.random();
  container.color = color;

  return container;
}
