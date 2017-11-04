"use strict";

var BOXED_GAME = (function init() {
	var game = {};

	game.constants = { 	
		CANVAS_HTML_ID: "playground",		
		CANVAS_WIDTH: 900,
		DIRECTION: 1, // if negative reverse the controls, if zero no controls, else normal
		BASE_VELOCITY: {x: 2, y: 2},
		TRAVEL_VELOCITY: 0.45,
		FPS_LIMIT: 140,
		NUMBER_OF_CLOUDS: 30,
		KEYS: { left: 37, up: 38, right: 39, down: 40, z: 90, x: 88, space: 32 }
	};

	game.dataStructures = {
		CircularBuffer: function(size, FillPrototype) {
			var me = this;
			me.buffer = [];
			me.size = size || 15;
			me.next_index = 0;
			me.length = 0;

			if ( !(typeof FillPrototype == "undefined" || FillPrototype == null ) ) {
				for (var i = 0; i < me.size; ++i) {
					me.push(new FillPrototype(arguments.slice(2)));
				}
			}

			me.push = function(element) {
				if ( me.buffer.length < me.size ) {
					me.buffer.push(element);
					me.length++;
					return true;
				} else {
					return false;
				}
			};

			me.next = function() {
				var res = me.buffer[me.next_index];
				me.next_index = (me.next_index + 1) % me.size;
				return res;
			}

			me.reset = function() {
				me.next_index = 0;
			}

			me.forEach = function(mappingFunction) {
				for (var i = 0; i < me.buffer.length; ++i) {
					mappingFunction(me.next(), i);
				} 
			}
		}
	};

	game.variables = {
		lastUpdate: 0,
		now: 0,
		dt: 0,
		clouds: new game.dataStructures.CircularBuffer(game.constants.NUMBER_OF_CLOUDS),
		keyMap: []
	};

	var consts = game.constants;
	consts.CANVAS_HEIGHT = consts.CANVAS_WIDTH / 12 * 9;
	consts.CANVAS = document.getElementById(consts.CANVAS_HTML_ID);
	consts.CONTEXT2D = consts.CANVAS.getContext('2d');
	consts.CANVAS.setAttribute("width", consts.CANVAS_WIDTH);
	consts.CANVAS.setAttribute("height", consts.CANVAS_HEIGHT);

	return game;
}(BOXED_GAME));

