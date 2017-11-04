"use strict";

BOXED_GAME.draw = (function(game) {
	var player = game.actors.player;
	var utils = game.utils;

	function drawClouds() {
		var size = game.variables.clouds.size;

		for ( var i = 0; i < size; i += 6 ) {
			var current1 = game.variables.clouds.next();
			if ( current1.isOut() ) {
				current1.reset();
			} else {
				current1.draw();
				current1.move();
			}
			var current2 = game.variables.clouds.next();
			if ( current2.isOut() ) {
				current2.reset();
			} else {
				current2.draw();
				current2.move();
			}
			var current3 = game.variables.clouds.next();
			if ( current3.isOut() ) {
				current3.reset();
			} else {
				current3.draw();
				current3.move();
			}
			var current4 = game.variables.clouds.next();
			if ( current4.isOut() ) {
				current4.reset();
			} else {
				current4.draw();
				current4.move();
			}
			var current5 = game.variables.clouds.next();
			if ( current5.isOut() ) {
				current5.reset();
			} else {
				current5.draw();
				current5.move();
			}
			var current6 = game.variables.clouds.next();
			if ( current6.isOut() ) {
				current6.reset();
			} else {
				current6.draw();
				current6.move();
			}
		}
	}

	function drawShots() {
		var size = game.actors.player.gun.shots.size;

		for ( var i = 0; i < size; i += 2 ) {
			var current1 = game.actors.player.gun.shots.next();
			if ( current1.isEnabled() ) {
				current1.draw()
				current1.move()
			} else {
				current1.reset()
			}
			var current2 = game.actors.player.gun.shots.next();
			if ( current2.isEnabled() ) {
				current2.draw()
				current2.move()
			} else {
				current1.reset()
			}
		}

	}

	return { 
		drawClouds: drawClouds,
		drawShots: drawShots
	};
}(BOXED_GAME));