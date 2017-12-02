(function(game) {

	game.constants = { 	
		CANVAS_HTML_ID: "playground",
		DEBUG_ON: false,
		CANVAS_WIDTH: 1080,
		MAX_SHOTS: 300,
		MAX_ENEMIES: 25,
		DIRECTION: 1, // if negative reverse the controls, if zero no controls, else normal
		BASE_VELOCITY: {x: 2, y: 2},
		TRAVEL_VELOCITY: 0.45,
		FPS_LIMIT: 140,
		NUMBER_OF_CLOUDS: 30,
		KEYS: { left: 37, up: 38, right: 39, down: 40, z: 90, x: 88, space: 32, enter: 13, control: 17, alt: 18, escape: 27 },
		ENTITY_TYPES: new game.dataStructures.ReversableEnum('enemy', 'cloud', 'shot', 'player', 'uiProp'),
		SCENARIO_TYPES: new game.dataStructures.ReversableEnum('destroyall', 'timeout'),
		STATE_TYPES: new game.dataStructures.ReversableEnum('pause', 'action', 'intro')
	};

	game.variables = {
		lastUpdate: 0,
		now: 0,
		dt: 0,
		clouds: new game.dataStructures.CircularBuffer(game.constants.NUMBER_OF_CLOUDS),
		shots: new game.dataStructures.CircularBuffer(game.constants.MAX_SHOTS),
		scenarios: [],
		stateStack: [],
		keyMap: [],
		isPaused: false,
		scheduler: new game.dataStructures.Scheduler()
	};

	var consts = game.constants;
	consts.CANVAS_HEIGHT = consts.CANVAS_WIDTH / 12 * 9;
	consts.CANVAS = document.getElementById(consts.CANVAS_HTML_ID);
	consts.CONTEXT2D = consts.CANVAS.getContext('2d');
	consts.CANVAS.setAttribute("width", consts.CANVAS_WIDTH);
	consts.CANVAS.setAttribute("height", consts.CANVAS_HEIGHT);

})(BOXED_GAME);
