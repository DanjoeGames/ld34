const LOADED_STATE = 'complete';

export default function onLoad(callback, state=LOADED_STATE) {
  if(document.readyState === state) {
    callback();
  } else {
    window.addEventListener('load', callback);
  }
}

