const HARDCODED_LEVELS = [
  { humanTarget: 20, zombieLimit: 0 }
];

const initialHumanTarget = 20;
const initialZombieLimit = 10;

export default function Level(n) {
  const level = {};

  if(n in HARDCODED_LEVELS) {
    Object.assign(level, HARDCODED_LEVELS[n]);
  } else {
    level.humanTarget = initialHumanTarget + (n * 20);
    level.zombieLimit = initialZombieLimit + (n * 5);
  }

  level.number = n;
  level.next = () => Level(n + 1);
  return level;
}
