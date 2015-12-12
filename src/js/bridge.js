var Bridge = {};

var createBridge = function(x, y) {
	var bridge = Object.create(Bridge);
	bridge.raised = false;
	bridge.x = x;
	bridge.y = y;
	bridge.width = 50;
	bridge.height = 15;
	bridge.distanceRetracted = 0;
	return bridge;
};

module.exports = {
	createBridge: createBridge
};