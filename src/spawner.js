const alwaysTrue = () => true;

export default function Spawner(config, frequency, probabilty, callback) {
  function spawn(predicate=alwaysTrue) {
    if(predicate()) {
      setTimeout(spawn.bind(null, predicate), frequency);
    }

    if(Math.random() < probabilty) {
      callback(config.generateEntity(config.x, config.y, config.i));
    }
  }

  return {
    forever: function() {
      spawn();
    },
    until: function(predicate) {
      spawn(predicate);
    }
  }
}

