"use strict";

BOXED_GAME.gameLoop = (function(game) {

	var requestAniFrame = (function() {
		return  window.requestAnimationFrame       || 
				window.webkitRequestAnimationFrame || 
				window.mozRequestAnimationFrame    || 
				window.oRequestAnimationFrame      || 
				window.msRequestAnimationFrame     || 
				function(callback) {
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

		game.actors.health_bar.draw();

		game.draw.drawShots();
		game.draw.drawClouds();
	}

	requestAniFrame(tick);

}(BOXED_GAME));
