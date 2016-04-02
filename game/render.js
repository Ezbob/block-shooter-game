"use strict";

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