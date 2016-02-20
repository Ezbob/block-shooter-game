"use strict";

(function(){
	
	var keyMap = [];
	var CANVAS_WIDTH = 800;
	var CANVAS_HEIGHT = 600;
	var DIRECTION = 1;
	var BASE_VELOCITY = {x: 0.1, y: 0.1}

	var lastUpdate = performance.now();
	var FPS = 30;
	var dt = 0.001;

	var arrows = { left: 37, up: 38, right: 39, down: 40 };
	var canvas = document.getElementById('playground');
	canvas.setAttribute("width", CANVAS_WIDTH);
	canvas.setAttribute("height", CANVAS_HEIGHT);
	var ctx = canvas.getContext('2d');

	var player = {
		color: "#00A",
		velocity: (function(){ return {x: BASE_VELOCITY.x, y: BASE_VELOCITY.y} })(),
		acceleration: {x: 0.0018, y: 0.0018},
		velocityLimit: 0.55,
		position: {x: 0, y: 0},
		width: 32,
		height: 32,
		draw: function() {
			ctx.fillStyle = this.color;
			ctx.fillRect(this.position.x, this.position.y, this.width, this.height);
		},
		move: function(x, y) {
			var xUBound = this.position.x + this.width;
			var yUBound = this.position.y + this.height;

			if ( x != 0 ) {
				var oldXV = this.velocity.x;
				this.velocity.x = Math.min(this.velocity.x + this.acceleration.x * dt, this.velocityLimit);
				if ( x > 0 && xUBound <= CANVAS_WIDTH ) {
					this.position.x += dt * ( oldXV + this.velocity.x ) / 2;	
				} else if ( x < 0 && this.position.x > 0 ) {
					this.position.x -= dt * ( oldXV + this.velocity.x ) / 2;
				}
			}
			
			if ( y != 0 ) {
				var oldYV = this.velocity.y;
				this.velocity.y = Math.min(this.velocity.y + this.acceleration.y * dt, this.velocityLimit);
				if ( y > 0 && yUBound <= CANVAS_HEIGHT ) {
					this.position.y += dt * ( oldYV + this.velocity.y ) / 2;	
				} else if ( y < 0 && this.position.y > 0 ) {
					this.position.y -= dt * ( oldYV + this.velocity.y ) / 2;
				}
			}
		}
	}; 
	
	onkeydown = onkeyup = function (event) {
		keyMap[event.keyCode] = event.type == "keydown";
	}

	function keyboardRegistry() {
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

	function tick() {
		ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

		var now = performance.now();
		dt = now - lastUpdate;
		lastUpdate = now;

		keyboardRegistry(); // tied to clock ticking of the main game loop
		player.draw();
	}

	setInterval(tick, 1000 / FPS);

})();
