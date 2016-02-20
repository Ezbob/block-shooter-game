"use strict";

(function() {
	
	var keyMap = []; // maps wheither a key is pressed down, keycode -> boolean
	var CANVAS_WIDTH = 800;
	var CANVAS_HEIGHT = 600;
	var DIRECTION = 1; // if negative reverse the controls, if zero no controls, else normal
	var BASE_VELOCITY = {x: 0.1, y: 0.1}
	var TRAVEL_VELOCITY = 11;

	var lastUpdate = performance.now();
	var FPS = 30;
	var dt = 0.001;

	// props
	var NUMBER_OF_CLOUDS = 6;
	var shots = [];
	var clouds = [];

	var arrows = { left: 37, up: 38, right: 39, down: 40, z: 90, x: 88 };
	var canvas = document.getElementById('playground');
	canvas.setAttribute("width", CANVAS_WIDTH);
	canvas.setAttribute("height", CANVAS_HEIGHT);
	var ctx = canvas.getContext('2d');


	function randomBetween(low,max) {
		return low + Math.floor((Math.random() * max));
	}

	function Shot(shooter, velocity) {
		this.shooter = shooter;
		this.color = "red";
		this.dimension = {width: 4, height: 16};
		this.position = {x: shooter.position.x + (shooter.dimension.width / 2) - (this.dimension.width / 2), 
			y: shooter.position.y - shooter.dimension.height};
		this.velocity = velocity;
		this.draw = function () {
			ctx.fillRect(this.position.x, this.position.y, this.dimension.width, this.dimension.height);
			ctx.fillStyle = this.color;
			this.position.y -= velocity;
		};
	};

	function Cloud(dimension, position) {
		this.dimension = dimension;
		this.position = position;
		this.draw = function () {
			ctx.lineWidth = "0.2";
			ctx.strokeRect(position.x, position.y, dimension.width, dimension.height);
			this.position.y += TRAVEL_VELOCITY;
		};
	}

	// the player object
	var player = {
		color: "#00A",
		velocity: (function(){ return {x: BASE_VELOCITY.x, y: BASE_VELOCITY.y} })(),
		dimension: {width: 32, height: 32},
		acceleration: {x: 0.0018, y: 0.0018},
		velocityLimit: 0.55,
		position: {x: CANVAS_WIDTH/2 - 32, y: CANVAS_HEIGHT-(CANVAS_HEIGHT/6)},
		draw: function() {
			ctx.fillStyle = this.color;
			ctx.fillRect(this.position.x, this.position.y, this.dimension.width, this.dimension.height);
		},
		move: function(directX, directY) {

			if ( directX != 0 ) {
				var oldV = this.velocity.x;
				this.velocity.x = Math.min(this.velocity.x + this.acceleration.x * dt, this.velocityLimit);
				if ( directX > 0 ) {
					var nextPosition = this.position.x + dt * ( oldV + this.velocity.x ) / 2;
					if ( nextPosition + this.dimension.width <= CANVAS_WIDTH ) {
						this.position.x = nextPosition;	
					} else {
						this.position.x = CANVAS_WIDTH - this.dimension.width;
					}
				} else if ( directX < 0 ) {
					var nextPosition = this.position.x - dt * ( oldV + this.velocity.x ) / 2;
					if ( nextPosition > 0 ) { // is the next step within the bounds of the canvas??
						this.position.x = nextPosition;	
					} else {
						this.position.x = 0;
					}
				}
			}
			
			if ( directY != 0 ) {
				var oldV = this.velocity.y;
				this.velocity.y = Math.min(this.velocity.y + this.acceleration.y * dt, this.velocityLimit);
				if ( directY > 0 ) {
					var nextPosition = this.position.y + dt * ( oldV + this.velocity.y ) / 2;
					if ( nextPosition + this.dimension.height <= CANVAS_HEIGHT ) {
						this.position.y = nextPosition;	
					} else {
						this.position.y = CANVAS_HEIGHT - this.dimension.height;
					}
				} else if ( directY < 0 ) {
					var nextPosition = this.position.y - dt * ( oldV + this.velocity.y ) / 2;
					if ( nextPosition > 0 ) {
						this.position.y = nextPosition;
					} else {
						this.position.y = 0;
					}
					
				}
			}
		},
		shoot: function () {
			shots.push(new Shot(this, 6));
		}
	}; 

	// sets the event listner to check if key is pressed down
	onkeydown = onkeyup = function (event) { 
		keyMap[event.keyCode] = event.type == "keydown";
	}

	// registres actions to keyMap bindings
	function keyboardRegistry() {

		if ( keyMap[arrows.z] ) {
			player.shoot();
		}
		if ( keyMap[arrows.right] ) {
			player.move(DIRECTION, 0);
		}  
		if ( keyMap[arrows.left] ) {
			player.move(-DIRECTION, 0);
		}
		if ( keyMap[arrows.up] ) {
			player.move(0, -DIRECTION);
		}  
		if ( keyMap[arrows.down] ) {
			player.move(0, DIRECTION);
		}
		if (!(keyMap[arrows.right] || keyMap[arrows.left])) {
			player.velocity.x = Math.min(BASE_VELOCITY.x, player.velocity.x);
		}
		if (!(keyMap[arrows.up] || keyMap[arrows.down])) {
			player.velocity.y = Math.min(BASE_VELOCITY.y, player.velocity.y);
		}
	}

	// the timestemp needed in the Verlet integration (calculation of velocity and acceleration)
	function updateTimeStep() {
		var now = performance.now();
		dt = now - lastUpdate;
		lastUpdate = now;	
	}

	function drawShots() {
		shots.forEach(function(element, index) {element.draw()});	
	}

	function drawClouds() {
		clouds.forEach(function(element, index) {element.draw()});
		if (clouds.every(function(element) { return element.position.y > CANVAS_HEIGHT })) {
			clouds = [];
		}	
	}

	function addClouds(maxClouds) {
		if (clouds.length < maxClouds) {
			clouds.push(new Cloud({width: 20, height: 20}, {x: randomBetween(1, CANVAS_WIDTH - 1), y: 1}));
		}
	}

	// "Game loop" this is where the continous function goes 
	function tick() {
		ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
		updateTimeStep();
		keyboardRegistry(); // tied to clock ticking of the main game loop

		addClouds(NUMBER_OF_CLOUDS);

		player.draw();
		drawShots();
		drawClouds();
	}

	setInterval(tick, 1000 / FPS);

})();
