"use strict";

BOXED_GAME.draw = (function(game) {
	var player = game.actors.player;
	var utils = game.utils;

	function updateClouds() {
		var size = game.variables.clouds.size;

		for ( var i = 0; i < size; i += 6 ) {
			var current1 = game.variables.clouds.next();
			if ( current1.isEnabled() ) {
				current1.move();
			} else {
				current1.reset();
			}
			var current2 = game.variables.clouds.next();
			if ( current2.isEnabled() ) {
				current2.move();
			} else {
				current2.reset();
			}
			var current3 = game.variables.clouds.next();
			if ( current3.isEnabled() ) {
				current3.move();
			} else {
				current3.reset();
			}
			var current4 = game.variables.clouds.next();
			if ( current4.isEnabled() ) {
				current4.move();
			} else {
				current4.reset();
			}
			var current5 = game.variables.clouds.next();
			if ( current5.isEnabled() ) {
				current5.move();
			} else {
				current5.reset();
			}
			var current6 = game.variables.clouds.next();
			if ( current6.isEnabled() ) {
				current6.move();
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
		var size = game.actors.player.gun.shots.size;

		for ( var i = 0; i < size; i += 2 ) {
			var current1 = game.actors.player.gun.shots.next();
			if ( current1.isEnabled() ) {
				current1.draw()
			} 
			var current2 = game.actors.player.gun.shots.next();
			if ( current2.isEnabled() ) {
				current2.draw()
			}
		}
	}

	function updateShots() {
		var size = game.actors.player.gun.shots.size;
		for ( var i = 0; i < size; i += 2 ) {
			var current1 = game.actors.player.gun.shots.next();
			if ( current1.isEnabled() ) {
				current1.move()
			} else {
				current1.reset()
			}
			var current2 = game.actors.player.gun.shots.next();
			if ( current2.isEnabled() ) {
				current2.move()
			} else {
				current1.reset()
			}
		}
	}

	return { 
		drawClouds: drawClouds,
		drawShots: drawShots,
		updateClouds: updateClouds,
		updateShots: updateShots
	};
}(BOXED_GAME));