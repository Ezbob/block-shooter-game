"use strict";

(function(game) {
	// sets the event listner to check if key is pressed down
	window.onkeydown = window.onkeyup = function (event) { 
		game.variables.keyMap[event.keyCode] = event.type == "keydown";
	}

	window.onblur = function() {
		var game = BOXED_GAME;
		var pauseScreen = game.gameStates.pauseScreen;
		var currentState = game.variables.getCurrentGameState();

		if ( !game.variables.isPaused && game.constants.STATE_TYPES.get('action') === currentState.type ) {
			pauseScreen.load();
			game.variables.isPaused = true;
			game.variables.stateStack.push(pauseScreen);	
		}
	}

}(BOXED_GAME));