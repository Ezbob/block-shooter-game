"use strict";

(function(game) {
	// sets the event listner to check if key is pressed down
	window.onkeydown = window.onkeyup = function (event) { 
		game.variables.keyMap[event.keyCode] = event.type == "keydown";
	}

}(BOXED_GAME));