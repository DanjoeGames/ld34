window.addEventListener('load', Game);

function Game() {
  var bridges = [
    Bridge(2, 8, 4, 2, false),
    Bridge(6, 8, 4, 2, false),
    Bridge(10, 8, 4, 2, false),
    Bridge(14, 8, 4, 2, true),
    Bridge(18, 8, 4, 2, false),
    Bridge(22, 8, 4, 2, false)
  ];

  var bridgeSelector = 0;

  var score = 0;

  var entities = new Set();

  var render = Renderer(document.getElementById('game'));

  window.addEventListener('keydown', function(e) {
    console.log(e.keyCode);
    if(e.keyCode === 32) {
      toggleBridge();
    }
    if(e.keyCode === 16) {
      switchBridge();
    }
  });

  var switchBridge = debounce(function switchBridge() {
    bridges[bridgeSelector].selected = false;
    bridgeSelector = (bridgeSelector + 1) % bridges.length;
    bridges[bridgeSelector].selected = true;
  }, 200);

  var toggleBridge = debounce(function toggleBridge() {
    var bridge = bridges[bridgeSelector];
    bridge.toggle();
  }, 100);

  EntitySource(Human, 1000, 0.8, function(human) {
    human.x = Math.floor(Math.random() * 20);
    human.y = 0;
    entities.add(human);
  });

  EntitySource(Zombie, 1000, 0.6, function(zombie) {
    zombie.x = Math.floor(Math.random() * 20);
    zombie.y = 0;
    entities.add(zombie);
  });

  function update() {
    entities.forEach(function(entity) {
      if(!entity.drowned) {
        entity.y += entity.speed;
      }

      var rx = Math.floor(entity.x);
      var ry = Math.floor(entity.y);
      if((map[rx][ry] < 1) && !(onBridge(bridges, rx, ry))) {
        // drown in the water
        entity.drowned = true;
      }

      if(ry > 15) {
        entities.delete(entity);
        score += entity.score
      }
    });

    render(map, entities, bridges, score);
  }

  setInterval(update, 100);
};

function onBridge(bridges, x, y) {
  for(var i = 0; i < bridges.length; i++) {
    var b = bridges[i];
    if(b.raised) continue;

    if((x >= b.x && x < b.x + b.width) &&
      (y >= b.y && y < b.y + b.height)) {
      return true;
    }
  }
  return false;
}

function Human() {
  var human = Object.create(Entity);
  human.score = Math.floor(Math.random() * 10);
  human.type = 'human';
  human.speed = 0.2;
  var versions = Object.keys(types.humans);
  human.version = types.humans[versions[Math.floor(Math.random() * 11)]];
  return human;
};

function Zombie() {
  var zombie = Object.create(Entity);
  zombie.score = -10;
  zombie.speed = 0.1;
  zombie.type = 'zombie';
  zombie.version = types.zombies.regular;
  return zombie;
};

var Entity = {

};

function Bridge(x, y, height, width, initialState) {
  var bridge = {};

  bridge.x = x;
  bridge.y = y;
  bridge.raised = initialState;

  bridge.toggle = function() {
    bridge.raised = !bridge.raised;
  };

  bridge.height = height;
  bridge.width = width;

  return bridge;
}

function EntitySource(generateEntity, frequency, probability, callback) {
  setInterval(function() {
    if(Math.random() < probability) {
      callback(generateEntity());
    }
  }, frequency);
};

function debounce(func, cooldown) {
  var lastCall = 0;

  return function() {
    var callTime = Date.now();
    if(callTime - lastCall > cooldown) {
      func.apply(null, arguments);
      lastCall = callTime;
    }
  };
}

