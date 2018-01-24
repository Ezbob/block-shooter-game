"use strict";

BOXED_GAME.scenario = (function(game) {
	// scenarios are thought as a substate of gamestates
	var Entity = game.dataStructures.Entity;
	var utils = game.utils;
	var consts = game.constants;
	var enemies = game.actors.enemies;
	var scenarioStack = [];

	function Scenario() {
		// default Prototype
		var me = this;
		me.type = consts.SCENARIO_TYPES.get('destroyall');
		me.currentEnemies = [];
		me.isStarted = false;

		me.addEnemy = function(enemy) {
			me.currentEnemies.push(enemy);
		}

		me.load = function() {}

		me.isPlaying = function() {
			return me.currentEnemies.length > 0 && me.isStarted;
		}

		me.update = function() {
			for ( var i = me.currentEnemies.length - 1; i >= 0; --i ) {
				if ( !me.currentEnemies[i].isEnabled() ) {
					me.currentEnemies.splice(i, 1);
				}
			}
		}

		me.start = function() {
			me.isStarted = true;
		}

		me.stop = function() {
			me.isStarted = false;
		}
	}

	return {
		Scenario: Scenario
	};
})(BOXED_GAME);


BOXED_GAME.gameStates = (function(game) {
	
	function GameState(type) {
		var me = this;

		// main boolean that determines the activation state of this game state
		me.isPlaying =  true;

		me.type = type || game.constants.STATE_TYPES.get('action');

		// single time loading procedure
		me.load = function() {}

		// per loop update function; calculate positions for the elements of the frame / collision detection
		me.update = function() {} 

		// per loop drawing function; do the actual drawing of the frame
		me.draw = function() {}

		// per loop control checker; define the control scheme for this state
		me.control = function() {}

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

	function ScenarioBasedState() {
		var me = this;
		var Scenario = game.scenario.Scenario;

		me.__proto__ = new GameState(game.constants.STATE_TYPES.get('action'));
		me.scenarioStack = [];

		me.getCurrentScenario = function() {
			return me.scenarioStack.length > 0 ?  me.scenarioStack[me.scenarioStack.length - 1] : new Scenario()
		};
	}

	var firstStage = new ScenarioBasedState()

	firstStage.load = function() {

		game.backDrops.loadClouds();
		game.draw.loadShots();

		var secondEncounter = new game.scenario.Scenario();
		secondEncounter.addEnemy(new BOXED_GAME.actors.enemies.Weako());
		firstStage.scenarioStack.push(secondEncounter);
		
		var firstEncounter = new game.scenario.Scenario();
		firstEncounter.addEnemy(new BOXED_GAME.actors.enemies.Weako());
		firstStage.scenarioStack.push(firstEncounter);
		firstStage.getCurrentScenario().start();
	} 

	firstStage.update =	function() {
		game.variables.scheduler.update();
		game.actors.player.update();
		game.actors.health_bar.update();
		game.draw.updateClouds();
		game.draw.updateShots();
		game.draw.updateEnemies();

		var currentScenario = firstStage.getCurrentScenario();
		currentScenario.update();

		if ( !currentScenario.isPlaying() && 
			firstStage.scenarioStack.length > 0 ) {
			firstStage.scenarioStack.pop();
			firstStage.getCurrentScenario().start();
		}

		if ( firstStage.scenarioStack.length === 0 ) {
			firstStage.isPlaying = false;
		}
	}

	firstStage.draw = function() {
		var ctx = game.constants.CONTEXT2D;
		game.actors.player.draw();
		game.actors.health_bar.draw();
		game.draw.drawClouds();
		game.draw.drawShots();
		game.draw.drawEnemies();

		if ( !game.actors.player.isEnabled() ) {
      var oldFont = ctx.font;
      ctx.font = "42px Helvetica";
      ctx.fillStyle = "red";
      ctx.textAlign = "center";
      ctx.fillText("YOU DIED!", game.constants.CANVAS_WIDTH / 2, game.constants.CANVAS_HEIGHT / 2);
      ctx.font = oldFont;
    }
	}

	firstStage.control = function() {
		var keyCodes = game.constants.KEYS;
		var player = game.actors.player;
		var consts = game.constants;
		var keyMap = game.variables.keyMap;

		if ( keyMap[keyCodes.escape] ) {
			var pauseScreen = game.gameStates.pauseScreen;

			if ( !game.variables.isPaused ) {
				pauseScreen.load();
				game.variables.isPaused = true;
				game.variables.stateStack.push(pauseScreen);
			}
		}

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

