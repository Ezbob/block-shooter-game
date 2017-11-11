BOXED_GAME.gameStates = (function(game) {

	function GameState(load, update, draw) {
		var me = this;

		me.isPlaying = true;

		me.load = load || function() {}
		me.update = update || function() {} 
		me.draw = draw || function() {}

		me.stop = function() {
			me.isPlaying = false;
		}
		me.start = function() {
			me.isPlaying = true;
		}
	}

	return {
		stack: [],
		GameState: GameState
	}
})(BOXED_GAME);