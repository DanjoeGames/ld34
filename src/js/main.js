var input = require('./input');
var bridge = require('./bridge');
var entity = require('./entity');
var spawner = require('./spawner');

var groundHeight = 100;

var canvas = document.getElementById('canvas');
var context = canvas.getContext('2d');

//magic numbers for bridge X axis placement
var rightBridge = bridge.createBridge(550, canvas.height - groundHeight);
var leftBridge = bridge.createBridge(40, canvas.height - groundHeight);

// and for spawner x axis placement
var leftSpawner = new spawner.Spawner(10, canvas.height - groundHeight - 10, 'right', 2);
var rightSpawner = new spawner.Spawner(590, canvas.height - groundHeight - 10, 'left', 2);

var update = function() {
	if(input.keys_down['left']) {
		leftBridge.raised = false;
		leftBridge.distanceRetracted = 0;
	} else {
		leftBridge.raised = true;
	}

	if(input.keys_down['right']) {
		rightBridge.raised = false;
		rightBridge.distanceRetracted = 0;
	} else {
		rightBridge.raised = true;
	}

	if(rightBridge.raised && rightBridge.distanceRetracted < rightBridge.width) {
		rightBridge.distanceRetracted += 0.5;
	}

	if(leftBridge.raised && leftBridge.distanceRetracted < leftBridge.width) {
		leftBridge.distanceRetracted += 0.5;
	}

	leftSpawner.update(canvas.height - groundHeight, rightBridge, leftBridge);
	rightSpawner.update(canvas.height - groundHeight, rightBridge, leftBridge);

};

var render = function(timestamp) {
	context.fillStyle = 'black';
	context.fillRect(0, 0, canvas.width, canvas.height);

	//draw ground
	context.fillStyle = 'rgb(0, 100, 0)';
	context.fillRect(0, canvas.height - groundHeight, canvas.width, canvas.height);

	context.fillStyle = 'brown';

	context.fillRect(
		rightBridge.x - rightBridge.distanceRetracted,
		rightBridge.y,
		rightBridge.width,
		rightBridge.height);

	context.fillRect(
		leftBridge.x + leftBridge.distanceRetracted,
		leftBridge.y,
		leftBridge.width,
		leftBridge.height);

	context.fillStyle = 'white';

	for(var i=0; i<leftSpawner.entities.length; i++) {
		var e = leftSpawner.entities[i];
		context.fillRect(e.x, e.y, 10, 10);
	}

	for(var i=0; i<rightSpawner.entities.length; i++) {
		var e = rightSpawner.entities[i];
		context.fillRect(e.x, e.y, 10, 10);
	}

	requestAnimationFrame(render);

};

requestAnimationFrame(render);

setInterval(update, 1000 / 60);
