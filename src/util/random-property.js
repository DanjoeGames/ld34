export default function randomProperty(object) {
  const keys = Object.keys(object);
  const randomKey = keys[Math.floor(Math.random() * keys.length)];
  return object[randomKey];
}
