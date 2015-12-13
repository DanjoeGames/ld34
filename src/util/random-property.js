// Picks a random property from an object or array
// randomProperty({ a: 1, b: 2, c: 3 }); // might be 3
export default function randomProperty(object) {
  const keys = Object.keys(object);
  const randomKey = keys[Math.floor(Math.random() * keys.length)];
  return object[randomKey];
}

