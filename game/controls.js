"use strict";

BOXED_GAME.keyboardInput = (function(game) {
	var keyMap = game.variables.keyMap; // maps wheither a key is pressed down, keycode -> boolean
	var keyCodes = game.constants.KEYS;
	var player = game.actors.player;
	var consts = game.constants;

	// sets the event listner to check if key is pressed down
	onkeydown = onkeyup = function (event) { 
		game.variables.keyMap[event.keyCode] = event.type == "keydown";
	}

	// registres actions to keyMap bindings
	function keyboardRegistry() {
		if ( !player.health.isDead ) {
			if ( keyMap[keyCodes.z] ) {
				player.shoot();
			}
			if ( keyMap[keyCodes.right] ) {
				player.move(consts.DIRECTION, 0);
			}  
			if ( keyMap[keyCodes.left] ) {
				player.move(-consts.DIRECTION, 0);
			}
			if ( keyMap[keyCodes.up] ) {
				player.move(0, -consts.DIRECTION);
			}  
			if ( keyMap[keyCodes.down] ) {
				player.move(0, consts.DIRECTION);
			}
			if (!(keyMap[keyCodes.right] || keyMap[keyCodes.left])) {
				player.velocity.x = Math.min(consts.BASE_VELOCITY.x, player.velocity.x);
			}
			if (!(keyMap[keyCodes.up] || keyMap[keyCodes.down])) {
				player.velocity.y = Math.min(consts.BASE_VELOCITY.y, player.velocity.y);
			}
		}
	}

	return {keyboardListner: keyboardRegistry};
}(BOXED_GAME));