export default function KeyboardState() {
  const state = {};

  function setState(isDown) {
    return function(event) {
      state[event.keyCode] = isDown;
    };
  }

  window.addEventListener('keydown', setState(true));
  window.addEventListener('keyup', setState(false));

  return function(keycode) {
    return state[keycode] || false;
  };
}

