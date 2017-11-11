"use strict";

BOXED_GAME.gameLoop = (function(game) {
	var GameState = game.gameStates.GameState;
	var stack = game.gameStates.stack;

	// the timestemp needed in the Verlet integration (calculation of velocity and acceleration)
	function updateTimeStep() {
		game.variables.now = performance.now();
		game.variables.dt = game.variables.now - (game.variables.lastUpdate || game.variables.now);
		game.variables.lastUpdate = game.variables.now;
	}

	var firstStage = new GameState()

	firstStage.load = function() {
		game.backDrops.loadClouds();
		game.draw.loadShots();
		game.variables.currentScenario = game.scenario.scenarioStack.pop();
	} 

	firstStage.update =	function() {
		game.variables.currentScenario.start();
		game.keyboardInput.keyboardListner(); 

		game.actors.player.update();
		game.actors.health_bar.update();
		game.draw.updateClouds();
		game.draw.updateShots();
		game.draw.updateEnemies();		

		if ( !game.variables.currentScenario.isPlaying() && game.scenario.scenarioStack.length > 0 ) {
			game.variables.currentScenario = game.scenario.scenarioStack.pop();
		}
	}

	firstStage.draw =	function() {
		game.actors.player.draw();
		game.actors.health_bar.draw();
		game.draw.drawClouds();
		game.draw.drawShots();
		game.draw.drawEnemies();
	}

	var introStage = new GameState()

	introStage.load = function() {
		introStage.resources = { 
			titleFontSize: '28pt',
			subTitleFontSize: '18pt', 
			font: 'Helvetica',
			introTitle: "Block Shooter Game",
			introSubtitle: "By Anders Busch"
		}
		setTimeout(introStage.stop, 4000);
	}

	introStage.update = function() {

	}

	introStage.draw = function() {
		var consts = game.constants;
		var ctx = consts.CONTEXT2D;
		var resources = introStage.resources;
		ctx.font = resources.titleFontSize + " " + resources.font;
		ctx.textAlign = "center"; 
		ctx.fillText(resources.introTitle, consts.CANVAS_WIDTH / 2, consts.CANVAS_HEIGHT / 2);
		ctx.font = resources.subTitleFontSize + " " + resources.font;
		ctx.fillText(resources.introSubtitle, consts.CANVAS_WIDTH / 2, consts.CANVAS_HEIGHT / 2 + 26);
	}

	stack.push(firstStage);
	stack.push(introStage);

	game.variables.currentGameState = stack.pop();
	game.variables.currentGameState.load();
		
	// "Game loop" this is where the continous function goes 
	function tick() {
		updateTimeStep();
		game.constants.CONTEXT2D.clearRect(0, 0, game.constants.CANVAS_WIDTH, game.constants.CANVAS_HEIGHT);

		game.variables.currentGameState.update();
		game.variables.currentGameState.draw();
		if ( !game.variables.currentGameState.isPlaying ) {
			game.constants.CONTEXT2D.clearRect(0, 0, game.constants.CANVAS_WIDTH, game.constants.CANVAS_HEIGHT);

			if (stack.length > 0) {
				game.variables.currentGameState = stack.pop();
				game.variables.currentGameState.load();
			} else {
				return;
			}
		}
		requestAniFrame(tick);
	}
	requestAniFrame(tick);
	
}(BOXED_GAME));
