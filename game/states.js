"use strict";


BOXED_GAME.gameStates = (function(game) {

	var splashScreen = new GameState(game.constants.STATE_TYPES.get('intro'))

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

    var winScreen = new GameState(game.constants.STATE_TYPES.get('intro'));

    winScreen.load = function() {
        var consts = game.constants;
        this.resources = {};
        this.resources.gameWinFont = {
            font: "Helvetica",
			position: new BOXED_GAME.dataStructures.Vector(consts.CANVAS_WIDTH >> 1, consts.CANVAS_HEIGHT >> 1),
            color: "darkgreen",
            text: "YOU'RE A WINNER!"
        }
    };

    winScreen.draw = function() {
        var resources = this.resources;
        var ctx = game.constants.CONTEXT2D;
        var utils = game.utils;

		ctx.font = "32px " + resources.gameWinFont.font;
		ctx.fillStyle = resources.gameWinFont.color;
		ctx.textAlign = "center";
        ctx.fillText(resources.gameWinFont.text, 
            resources.gameWinFont.position.getX() + utils.randomBetween(-10, 10), 
            resources.gameWinFont.position.getY() + utils.randomBetween(-10, 10))
    };

	var pauseScreen = new GameState();

	pauseScreen.load = function() {
		var consts = game.constants;
		this.resources = {
			font: "Helvetica",
			pausedTitle: {
				text: "Game Paused",
				position: new BOXED_GAME.dataStructures.Vector(consts.CANVAS_WIDTH >> 1, consts.CANVAS_HEIGHT / 2.4)
			},
			resumeText: { 
				text: "Resume",
				position: new BOXED_GAME.dataStructures.Vector(consts.CANVAS_WIDTH >> 1, (consts.CANVAS_HEIGHT / 2.5)  + 62)
			},
			restartText:  {
				text: "Restart",
				position: new BOXED_GAME.dataStructures.Vector(consts.CANVAS_WIDTH >> 1, (consts.CANVAS_HEIGHT / 2.5) + 115)
			},
			cursor: {
				position: new BOXED_GAME.dataStructures.Vector(consts.CANVAS_WIDTH / 2, consts.CANVAS_HEIGHT / 2.5 + 62),
				dimension: new BOXED_GAME.dataStructures.Vector(16, 16),
				color: "black",
				choices: new BOXED_GAME.dataStructures.ReversableEnum('resume', 'restart'),
				pointingAt: null
			}
		};
		this.resources.cursor.pointingAt = this.resources.cursor.choices.get('resume');
	}

	pauseScreen.draw = function() {
		var consts = game.constants;
		var ctx = consts.CONTEXT2D;
		var resources = this.resources;

		ctx.font = "32px " + resources.font;
		ctx.fillStyle = "black";
		ctx.textAlign = "center";
		ctx.fillText(resources.pausedTitle.text, resources.pausedTitle.position.getX(), resources.pausedTitle.position.getY());
		
		ctx.font = "24px " + resources.font;
		ctx.fillText(resources.resumeText.text, resources.resumeText.position.getX(), resources.resumeText.position.getY());

		ctx.font = "24px " + resources.font;
		ctx.fillText(resources.restartText.text, resources.restartText.position.getX(), resources.restartText.position.getY());

		var textWidth;
		if (resources.cursor.pointingAt === resources.cursor.choices.get("resume")) {
			textWidth = ctx.measureText(resources.resumeText.text).width;
		} else {
			textWidth = ctx.measureText(resources.restartText.text).width;
		}

		ctx.fillStyle = resources.cursor.color;
		ctx.fillRect(
			resources.cursor.position.getX() + ( textWidth >> 1 ) + 15, 
			resources.cursor.position.getY() - resources.cursor.dimension.getY() + 2, 
			resources.cursor.dimension.getX(), resources.cursor.dimension.getY()
		);
	}

	pauseScreen.update = function() {
		var resources = this.resources;
		var cursor = resources.cursor;
		if (cursor.pointingAt === cursor.choices.get("resume")) {
			cursor.position = resources.resumeText.position;
		} else {
			cursor.position = resources.restartText.position;
		}
	}

	pauseScreen.control = function() {
		var keyMap = game.variables.keyMap;
		var keyCodes = game.constants.KEYS;
		var resources = this.resources;
		var cursor = resources.cursor

		if ( keyMap[keyCodes.enter] ) {

			if ( cursor.pointingAt === cursor.choices.get("resume") ) {		
				game.variables.isPaused = false;
				game.variables.stateStack.pop();
			} else {
				location.reload();
			} 
		} else {
			if ( keyMap[keyCodes.down] && cursor.pointingAt === cursor.choices.get("resume") ) {
				cursor.pointingAt = cursor.choices.get("restart");
			}
			if ( keyMap[keyCodes.up] && cursor.pointingAt === cursor.choices.get("restart") ) {
				cursor.pointingAt = cursor.choices.get("resume");
			}
		}
	}

	game.variables.stateStack.push(winScreen);
	game.variables.stateStack.push(firstStage);
	game.variables.stateStack.push(splashScreen);

	game.variables.getCurrentGameState = function() {
		// if stateStack is empty then we get a generic gamestate that has the isPlaying flag set to false
		// so this gamestate automatically stops the stack machinery
		return game.variables.stateStack.length > 0 ? game.variables.stateStack[game.variables.stateStack.length - 1] : new GameState(false);
	} 

	return {
		firstStage: firstStage,
		splashScreen: splashScreen,
		pauseScreen: pauseScreen,
		GameState: GameState,
		winScreen: winScreen
	}
})(BOXED_GAME);

