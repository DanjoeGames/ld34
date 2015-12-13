const alwaysTrue = () => true;

export default function Spawner(generateEntity, frequency, probabilty, callback) {
  function spawn(predicate=alwaysTrue) {
    if(predicate()) {
      setTimeout(spawn.bind(null, predicate), frequency);
    }

    if(Math.random() < probabilty) {
      callback(generateEntity());
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

