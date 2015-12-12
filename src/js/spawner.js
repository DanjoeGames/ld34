var entity = require('./entity')

var Spawner = function(x, y, direction, rate) {
	this.x = x;
	this.y = y;
	this.entities = [];
	this.direction = direction;
	this.rate = rate; // chance out of 100
};

Spawner.prototype.update = function(groundHeight, bridge1, bridge2) {

	for(i=0; i<this.entities.length; i++) {

		// if(isFalling(this.entities[i], bridge1, bridge2)) {
		// 	this.entities[i].applyForce(0, 0.1);
		// }

		this.entities[i].update();
	}

	this.maybeSpawn();
};

Spawner.prototype.maybeSpawn = function() {
	if(Math.random() / 0.01 < this.rate) {
		var speed = Math.random() * 3
		if(this.direction == 'left') {
			this.entities.push(new entity.Entity(this.x, this.y, -0.1 * speed, 0));
		} else {
			this.entities.push(new entity.Entity(this.x, this.y, 0.1 * speed, 0));
		}
	}

};

// var isFalling = function(entity, bridge1, bridge2) {

// 	if(!(entity.x < bridge1.x + bridge1.width
// 			&& entity.x > bridge1.x
// 			&& entity.y <= bridge1.y) && (entity.x < bridge2.x + bridge2.width
// 		&& entity.x > bridge2.x
// 		&& entity.y <= bridge2.y)) {
// 		return false;
// 	}

// 	if(entity.x < bridge1.x + bridge1.distanceRetracted + bridge1.width
// 		&& entity.x > bridge1.x
// 		&& entity.y <= bridge1.y) {

// 		return false;
// 	} else if(entity.x < bridge2.x + bridge2.distanceRetracted + bridge2.width
// 		&& entity.x > bridge2.x
// 		&& entity.y <= bridge2.y) {

// 		return false;
// 	} else {
// 		return true;
// 	}
// }

module.exports = {
	Spawner: Spawner
};
