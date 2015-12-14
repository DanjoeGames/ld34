export default function(probability) {
  const chance = {};

  const random = Math.random();

  return random < probability;
}

