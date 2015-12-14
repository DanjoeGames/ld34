export default function debounce(func, time) {
  let lastCall = 0;
  return function debounced() {
    let callTime = Date.now();

    if(callTime - lastCall > time) {
      func.apply(null, arguments);
      lastCall = callTime;
    }
  };
}

