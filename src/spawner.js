import debounce from './util/debounce';

const alwaysTrue = () => true;

export default function Spawner(config, frequency, probabilty, callback) {
  return {
    spawn: debounce(function() {
      if(Math.random() < probabilty) {
        callback(config.generateEntity(config.x, config.y, config.i));
      }
    }, frequency)
  }
}

