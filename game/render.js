"use strict";

BOXED_GAME.draw = (function(game) {
	var player = game.actors.player;
	var utils = game.utils;

	function updateClouds() {
		var size = game.variables.clouds.size;
		for ( var i = 0; i < size; i += 6 ) {
			var current1 = game.variables.clouds.next();
			if ( current1.isEnabled() ) {
				current1.update();
			} else {
				current1.reset();
			}
			var current2 = game.variables.clouds.next();
			if ( current2.isEnabled() ) {
				current2.update();
			} else {
				current2.reset();
			}
			var current3 = game.variables.clouds.next();
			if ( current3.isEnabled() ) {
				current3.update();
			} else {
				current3.reset();
			}
			var current4 = game.variables.clouds.next();
			if ( current4.isEnabled() ) {
				current4.update();
			} else {
				current4.reset();
			}
			var current5 = game.variables.clouds.next();
			if ( current5.isEnabled() ) {
				current5.update();
			} else {
				current5.reset();
			}
			var current6 = game.variables.clouds.next();
			if ( current6.isEnabled() ) {
				current6.update();
			} else {
				current6.reset();
			}
		}
	}

	function drawClouds() {
		var size = game.variables.clouds.size;
		for ( var i = 0; i < size; i += 2 ) {
			var current1 = game.variables.clouds.buffer[i];

			if ( current1.isEnabled() ) {
				current1.draw();
			} 
			var current2 = game.variables.clouds.buffer[i + 1];
			if ( current2.isEnabled() ) {
				current2.draw();
			} 
		}
	}

	function drawShots() {
		var size = game.variables.shots.buffer.length;

		for ( var i = 0; i < size; i += 2 ) {
			var current1 = game.variables.shots.next();
			if ( current1.isEnabled() ) {
				current1.draw()
			} 
		}
	}

	function loadShots() {
		var size = game.variables.shots.size;
		var Shot = game.actors.shot;

		for ( var i = 0; i < size; ++i ) {
			game.variables.shots.push(new Shot());
		}
	}

	function updateShots() {
		var size = game.variables.shots.buffer.length;
		for ( var i = 0; i < size; ++i ) {
			var current1 = game.variables.shots.next();
			if ( current1.isEnabled() ) {
				current1.update()
			} else if ( !current1.isFired ) {
				current1.reset()
			}
		}
	}

	function updateEnemies() {
		var scenario = game.variables.currentScenario;
		var enemies = scenario.currentEnemies;

		for ( var i = 0; i < enemies.length; ++i ) {
			var current = enemies[i];
			if ( current.isEnabled() ) {
				current.update();	
			}
		}
	}

	function drawEnemies() {
		var scenario = game.variables.currentScenario;
		var enemies = scenario.currentEnemies;

		for ( var i = 0; i < enemies.length; ++i ) {
			var current = enemies[i];
			if ( current.isEnabled() ) {
				current.draw();	
			}
		}
	}

	return { 
		drawClouds: drawClouds,
		drawShots: drawShots,
		updateClouds: updateClouds,
		updateShots: updateShots,
		updateEnemies: updateEnemies,
		drawEnemies: drawEnemies,
		loadShots: loadShots
	};
}(BOXED_GAME));