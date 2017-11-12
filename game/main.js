"use strict";

BOXED_GAME.gameLoop = (function(game) {
	var GameState = game.gameStates.GameState;
	var stack = game.gameStates.stack;

	function updateTimeStep() {
		game.variables.now = performance.now();
		game.variables.dt = game.variables.now - (game.variables.lastUpdate || game.variables.now);
		game.variables.lastUpdate = game.variables.now;
	}

	var currentState = game.variables.getCurrentGameState();
	if ( currentState !== null ) {
		currentState.load();
		// "Game loop" this is where the continous function goes 
		function tick() {
			updateTimeStep();
			game.constants.CONTEXT2D.clearRect(0, 0, game.constants.CANVAS_WIDTH, game.constants.CANVAS_HEIGHT);

			currentState.control();
			currentState.update();
			currentState.draw();
			if ( !currentState.isPlaying ) {
				game.constants.CONTEXT2D.clearRect(0, 0, game.constants.CANVAS_WIDTH, game.constants.CANVAS_HEIGHT);

				if ( game.variables.stateStack.length > 0 ) {
					game.variables.stateStack.pop();
					currentState = game.variables.getCurrentGameState();
					currentState.load();
				} else {
					return;
				}
			}
			requestAniFrame(tick);
		}
		requestAniFrame(tick);
	}
			
}(BOXED_GAME));
