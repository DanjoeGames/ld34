const LOADED_STATE = 'complete';

// If the startup time for the game is slow and the client calls
// window.addEventListener('load') after the DOM is ready, then
// the callback will never be triggered - race condition. This is
// a util wrapper around this behaviour which checks whether the
// DOM has loaded before creating the event listener.

export default function onLoad(callback, state=LOADED_STATE) {
  if(document.readyState === state) {
    callback();
  } else {
    window.addEventListener('load', callback);
  }
}

