"use strict";

var BOXED_GAME = (function init() {
	var game = {};
	game.constants = { 	
			CANVAS_HTML_ID: "playground",		
			CANVAS_WIDTH: 800,
			DIRECTION: 1, // if negative reverse the controls, if zero no controls, else normal
			BASE_VELOCITY: {x: 2, y: 2},
			TRAVEL_VELOCITY: 0.45,
			FPS_LIMIT: 140,
			NUMBER_OF_CLOUDS: 6,
			KEYS: { left: 37, up: 38, right: 39, down: 40, z: 90, x: 88 }
		};

	game.variables = {
		lastUpdate: 0,
		now: 0,
		dt: 0,
		clouds: [],
		keyMap: []
	};

	var consts = game.constants;
	consts.CANVAS_HEIGHT = consts.CANVAS_WIDTH / 12 * 9;
	consts.CANVAS = document.getElementById(consts.CANVAS_HTML_ID);
	consts.CONTEXT2D = consts.CANVAS.getContext('2d');
	consts.CANVAS.setAttribute("width", consts.CANVAS_WIDTH);
	consts.CANVAS.setAttribute("height", consts.CANVAS_HEIGHT);

	return game;
}(BOXED_GAME));

BOXED_GAME.utils = (function(game) {
	function randomBetween(low,max) {
		return low + Math.floor((Math.random() * max));
	}

	function checkIntersectingRectangles (rectA, rectB) {
		var ALeft = rectA.position.x; // x1
		var ARight = rectA.position.x + rectA.dimension.width; // x1 + w1
		var ATop = rectA.position.y; // y1 
		var ABottom = rectA.position.y + rectA.dimension.height; // y1 + h1 

		var BLeft = rectB.position.x; // x2
		var BRight = rectB.position.x + rectB.dimension.width; // x2 + w2
		var BTop = rectB.position.y; // y2
		var BBottom = rectB.position.y + rectB.dimension.height; // y2 + h2

		var isSeparate = (ARight < BLeft || BRight < ALeft || 
			ABottom < BTop || BBottom < ATop);

		return !isSeparate;
	}

	return {randomBetween: randomBetween, intersectingRectangles: checkIntersectingRectangles};
}(BOXED_GAME));

BOXED_GAME.actors = (function(game) {
	var consts = game.constants;
	var ctx = consts.CONTEXT2D;

	function Shot(shooter, velocity) {
		this.shooter = shooter;
		this.color = "red";
		this.dimension = {width: 4, height: 16};
		this.position = {x: shooter.position.x + (shooter.dimension.width / 2) - 
			(this.dimension.width / 2), y: shooter.position.y - shooter.dimension.height};
		this.velocity = velocity;
		this.draw = function () {
			ctx.fillStyle = this.color;
			ctx.fillRect(this.position.x, this.position.y, this.dimension.width, this.dimension.height);
			this.position.y -= this.velocity * game.variables.dt;
		};
	};

	function Cloud(dimension, position) {
		this.dimension = dimension;
		this.position = position;
		this.draw = function () {
			ctx.lineWidth = 0.40;
			ctx.strokeRect(position.x, position.y, dimension.width, dimension.height);
			this.position.y += game.constants.TRAVEL_VELOCITY * game.variables.dt;
		};
	}

	// the player object
	function Player() {
		this.gun = {shots: [], limit: 50, velocity: 0.32 };
		this.health = { damage: 0, maxDamage: 400, isDead: false };
		this.color = 'rgb(0,8,255)';
		this.velocity = (function(){ return {x: consts.BASE_VELOCITY.x, y: consts.BASE_VELOCITY.y} }());
		this.dimension = {width: 32, height: 32};
		this.acceleration = {x: 0.0002, y: 0.0002};
		this.velocityLimit = 0.55;
		this.position = {x: consts.CANVAS_WIDTH/2 - 32, y: consts.CANVAS_HEIGHT-(consts.CANVAS_HEIGHT/6)};
		this.draw = function() {
			if (!this.health.isDead) {
				ctx.fillStyle = this.color;
				ctx.fillRect(this.position.x, this.position.y, this.dimension.width, this.dimension.height);
			}
		};
		this.hide = function() {
			ctx.clearRect(this.position.x, this.position.y, this.dimension.width, this.dimension.height);
		};
		this.move = function(directX, directY) {
			if ( directX != 0 ) {
				var oldV = this.velocity.x;
				this.velocity.x = Math.min(this.velocity.x + this.acceleration.x * game.variables.dt, 
					this.velocityLimit);
				if ( directX > 0 ) {
					var nextPosition = this.position.x + game.variables.dt * ( oldV + this.velocity.x ) / 2;
					if ( nextPosition + this.dimension.width <= consts.CANVAS_WIDTH ) {
						this.position.x = nextPosition;	
					} else {
						this.position.x = consts.CANVAS_WIDTH - this.dimension.width;
					}
				} else if ( directX < 0 ) {
					var nextPosition = this.position.x - game.variables.dt * ( oldV + this.velocity.x ) / 2;
					if ( nextPosition > 0 ) { // is the next step within the bounds of the canvas??
						this.position.x = nextPosition;	
					} else {
						this.position.x = 0;
					}
				}
			}
			if ( directY != 0 ) {
				var oldV = this.velocity.y;
				this.velocity.y = Math.min(this.velocity.y + this.acceleration.y * game.variables.dt, 
					this.velocityLimit);
				if ( directY > 0 ) {
					var nextPosition = this.position.y + game.variables.dt * ( oldV + this.velocity.y ) / 2;
					if ( nextPosition + this.dimension.height <= consts.CANVAS_HEIGHT ) {
						this.position.y = nextPosition;	
					} else {
						this.position.y = consts.CANVAS_HEIGHT - this.dimension.height;
					}
				} else if ( directY < 0 ) {
					var nextPosition = this.position.y - game.variables.dt * ( oldV + this.velocity.y ) / 2;
					if ( nextPosition > 0 ) {
						this.position.y = nextPosition;
					} else {
						this.position.y = 0;
					}
					
				}
			}
		};
		this.shoot = function () {
			if (this.gun.shots.length < this.gun.limit ) {
				this.gun.shots.push(new Shot(this, this.gun.velocity));	
			}
		};
		this.checkDamage = function() {
			if (this.health.damage >= this.health.maxDamage) {
				ctx.font = "42px Helvetica";
				ctx.fillStyle = "red";
				ctx.textAlign = "center";
				ctx.fillText("YOU DIED!", game.constants.CANVAS_WIDTH / 2, game.constants.CANVAS_HEIGHT / 2);
				this.health.isDead = true;
				this.hide();
			}
		};
		this.checkPlayerHit = function() {
			var player = this;
			this.gun.shots.forEach(function(element) {
				if ( game.utils.intersectingRectangles(player, element) ) {
					player.health.damage++;
				}
			});
		};
	}; 

	return {shot: Shot, cloud: Cloud, player: new Player() };

}(BOXED_GAME));

BOXED_GAME.backDrops = (function(game) {
	var consts = game.constants;
	var utils = game.utils;
	function addClouds(maxClouds) {
		if (game.variables.clouds.length < maxClouds) {
			game.variables.clouds.push(new game.actors.cloud({width: 20, height: 20}, 
				{x: utils.randomBetween(1, consts.CANVAS_WIDTH - 1), y: utils.randomBetween(-15, 15)}));
		}
	}
	return {addClouds: addClouds};
}(BOXED_GAME));

BOXED_GAME.draw = (function(game) {
	var player = game.actors.player;
	function drawShots() {
		player.gun.shots.forEach(function(element, index) { element.draw(); });

		player.gun.shots = player.gun.shots.filter(function(element) { return element.position.y >= -5 });
	}

	function drawClouds() {
		game.variables.clouds.forEach(function(element, index) {element.draw()});
		game.variables.clouds = game.variables.clouds.filter(function(element) { 
			return element.position.y < game.constants.CANVAS_HEIGHT });
	}

	return {drawClouds: drawClouds, drawShots: drawShots};
}(BOXED_GAME));

BOXED_GAME.keyboardInput = (function(game) {
	var keyMap = game.variables.keyMap; // maps wheither a key is pressed down, keycode -> boolean
	var keyCodes = game.constants.KEYS;
	var player = game.actors.player;
	var consts = game.constants;

	// sets the event listner to check if key is pressed down
	onkeydown = onkeyup = function (event) { 
		game.variables.keyMap[event.keyCode] = event.type == "keydown";
	}

	// registres actions to keyMap bindings
	function keyboardRegistry() {
		if ( !player.health.isDead ) {
			if ( keyMap[keyCodes.z] ) {
				player.shoot();
			}
			if ( keyMap[keyCodes.right] ) {
				player.move(consts.DIRECTION, 0);
			}  
			if ( keyMap[keyCodes.left] ) {
				player.move(-consts.DIRECTION, 0);
			}
			if ( keyMap[keyCodes.up] ) {
				player.move(0, -consts.DIRECTION);
			}  
			if ( keyMap[keyCodes.down] ) {
				player.move(0, consts.DIRECTION);
			}
			if (!(keyMap[keyCodes.right] || keyMap[keyCodes.left])) {
				player.velocity.x = Math.min(consts.BASE_VELOCITY.x, player.velocity.x);
			}
			if (!(keyMap[keyCodes.up] || keyMap[keyCodes.down])) {
				player.velocity.y = Math.min(consts.BASE_VELOCITY.y, player.velocity.y);
			}
		}
	}

	return {keyboardListner: keyboardRegistry};
}(BOXED_GAME));

BOXED_GAME.gameLoop = (function(game) {

	var requestAniFrame = (function() {
		return  window.requestAnimationFrame       || 
				window.webkitRequestAnimationFrame || 
				window.mozRequestAnimationFrame    || 
				window.oRequestAnimationFrame      || 
				window.msRequestAnimationFrame     || 
				function(/* function */ callback, /* DOMElement */ element) {
					window.setTimeout(callback, 1000 / game.dataConstants.FPS_LIMIT);
				};
	})();

	// the timestemp needed in the Verlet integration (calculation of velocity and acceleration)
	function updateTimeStep() {
		game.variables.now = performance.now();
		game.variables.dt = game.variables.now - (game.variables.lastUpdate || game.variables.now);
		game.variables.lastUpdate = game.variables.now;
	}

	// "Game loop" this is where the continous function goes 
	function tick() {
		setTimeout(function() {
			requestAniFrame(tick);
			updateTimeStep();
		}, 1000 / game.constants.FPS_LIMIT);

		game.constants.CONTEXT2D.clearRect(0, 0, game.constants.CANVAS_WIDTH, game.constants.CANVAS_HEIGHT);
		game.keyboardInput.keyboardListner(); // tied to clock ticking of the main game loop

		game.backDrops.addClouds(game.constants.NUMBER_OF_CLOUDS);

		game.actors.player.checkPlayerHit();
		game.actors.player.checkDamage();
		game.actors.player.draw();
		game.draw.drawShots();
		game.draw.drawClouds();
	}

	requestAniFrame(tick);

}(BOXED_GAME));
