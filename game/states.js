"use strict";

BOXED_GAME.gameStates = (function(game) {
	
	function GameState(isPlaying, load, update, draw, control) {
		var me = this;

		// main boolean that determines the activation state of this game state
		me.isPlaying = typeof isPlaying === "undefined" || isPlaying === null ? true : isPlaying;

		// single time loading procedure
		me.load = load || function() {}

		// per loop update function; calculate positions for the elements of the frame / collision detection
		me.update = update || function() {} 

		// per loop drawing function; do the actual drawing of the frame
		me.draw = draw || function() {}

		// per loop control checker; define the control scheme for this state
		me.control = control || function() {}

		// convience function for stopping the GameState. This will trigger a pop of the gamestate so that 
		// the next game state will begin
		me.stop = function() {
			me.isPlaying = false;
		}
		// opposite functionality of the stop function, but calling this does not reseat the state on the gamestate stack
		me.start = function() {
			me.isPlaying = true;
		}
	}

	var firstStage = new GameState()

	firstStage.load = function() {
		game.backDrops.loadClouds();
		game.draw.loadShots();
		game.variables.currentScenario = game.scenario.scenarioStack.pop();
	} 

	firstStage.update =	function() {
		game.actors.player.update();
		game.actors.health_bar.update();
		game.draw.updateClouds();
		game.draw.updateShots();
		game.draw.updateEnemies();		

		if ( !game.variables.currentScenario.isPlaying() && game.scenario.scenarioStack.length > 0 ) {
			game.variables.currentScenario = game.scenario.scenarioStack.pop();
		}
	}

	firstStage.draw = function() {
		game.actors.player.draw();
		game.actors.health_bar.draw();
		game.draw.drawClouds();
		game.draw.drawShots();
		game.draw.drawEnemies();
	}

	firstStage.control = function() {
		var keyCodes = game.constants.KEYS;
		var player = game.actors.player;
		var consts = game.constants;
		var keyMap = game.variables.keyMap;
		if ( player.isEnabled() ) {
			if ( keyMap[keyCodes.space] ) {
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
				player.velocity.setX(Math.min(consts.BASE_VELOCITY.x, player.velocity.getX()));
			}
			if (!(keyMap[keyCodes.up] || keyMap[keyCodes.down])) {
				player.velocity.setY(Math.min(consts.BASE_VELOCITY.y, player.velocity.getY()));
			}
		}
	}

	var splashScreen = new GameState()

	splashScreen.load = function() {
		splashScreen.resources = { 
			titleFontSize: '28pt',
			subTitleFontSize: '18pt', 
			font: 'Helvetica',
			introTitle: "Block Shooter Game",
			introSubtitle: "By Anders Busch",
			instructionsText: "Press Enter to Start",
			drawInstructions: false
		}
		setInterval(function() {
			splashScreen.resources.drawInstructions = !splashScreen.resources.drawInstructions;	
		}, 800)
	}

	splashScreen.draw = function() {
		var consts = game.constants;
		var ctx = consts.CONTEXT2D;
		var resources = splashScreen.resources;
		ctx.font = resources.titleFontSize + " " + resources.font;
		ctx.textAlign = "center"; 
		ctx.fillText(resources.introTitle, consts.CANVAS_WIDTH / 2, consts.CANVAS_HEIGHT / 2.2);
		ctx.font = resources.subTitleFontSize + " " + resources.font;
		ctx.fillText(resources.introSubtitle, consts.CANVAS_WIDTH / 2, consts.CANVAS_HEIGHT / 2.2 + 26);
		if ( resources.drawInstructions ) {
			ctx.fillText(resources.instructionsText, consts.CANVAS_WIDTH / 2, consts.CANVAS_HEIGHT - (consts.CANVAS_HEIGHT / 3) );	
		}
	}

	splashScreen.control = function() {
		var keyMap = game.variables.keyMap;
		var keyCodes = game.constants.KEYS;

		if ( keyMap[keyCodes.enter] ) {
			game.variables.getCurrentGameState().stop();
		}
	}

	var pauseScreen = new GameState();

	pauseScreen.load = function() {
		this.resources = {
			font: "Helvetica",
			pausedTitle: "Game Paused",
			actionsText: "Press Enter to resume"
		};
	}

	pauseScreen.draw = function() {
		var consts = game.constants;
		var ctx = consts.CONTEXT2D;
		var resources = this.resources;

		ctx.font = "28pt " + resources.font;
		ctx.textAlign = "center";
		ctx.fillText(resources.pausedTitle, consts.CANVAS_WIDTH / 2, consts.CANVAS_HEIGHT / 2);
		ctx.font = "18pt " + resources.font;
		ctx.fillText(resources.actionsText, consts.CANVAS_WIDTH / 2, consts.CANVAS_HEIGHT / 2.2 + 62);
	}

	pauseScreen.control = function() {
		var keyMap = game.variables.keyMap;
		var keyCodes = game.constants.KEYS;
		
		if ( keyMap[keyCodes.enter] ) {
			game.variables.isPaused = false;
			game.variables.stateStack.pop();
		}
	}

	game.variables.stateStack.push(firstStage);
	game.variables.stateStack.push(splashScreen);
	game.variables.getCurrentGameState = function() {
		return game.variables.stateStack.length > 0 ? game.variables.stateStack[game.variables.stateStack.length - 1] : new GameState(false);
	} 

	return {
		firstStage: firstStage,
		splashScreen: splashScreen,
		pauseScreen: pauseScreen,
		GameState: GameState,
	}
})(BOXED_GAME);

