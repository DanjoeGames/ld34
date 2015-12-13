const alwaysTrue = () => true;

export default function Spawner(config, frequency, probabilty, callback) {
  function spawn(predicate) {
    if(predicate()) {
      setTimeout(spawn.bind(null, predicate), frequency);
    }

    // might want to remove this when we add levels
    if(Math.random() < probabilty) {
      callback(config.generateEntity(config.x, config.y, config.i));
    }
  }

  return {
    // spawn with a predicate function that only returns true, this
    // will continue indefinitely.
    forever: function() {
      spawn(alwaysTrue);
    },
    // this will come into player later, allowing us to spawn a fixed
    // number of entities. Each level will dictate how many we need.
    until: function(predicate) {
      spawn(predicate);
    }
  }
}

