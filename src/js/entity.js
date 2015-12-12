var Entity = function(x, y, xVel, yVel) {
	this.x = x;
	this.y = y;
	this.xVel = xVel;
	this.yVel = yVel;
	this.xacc = 0;
	this.yacc = 0;
};

Entity.prototype.applyForce = function(x, y) {
	this.xacc += x;
	this.yacc += y;
};

Entity.prototype.update = function() {
	this.xVel += this.xacc;
	this.yVel += this.yacc;

	this.xacc = 0;
	this.yacc = 0;

	this.x += this.xVel;
	this.y += this.yVel;
};

module.exports = {
	Entity: Entity
};
