"use strict";

var BOXED_GAME = (function init() {
	var game = {};

	game.utils = {
		randomBetween: function(low, max) {
			return low + Math.floor((Math.random() * max));
		},
		randomFloatBetween: function(low, max) {
  			return Math.random() * (max - low) + low;
		},
		intersectingRectangles: function(rectA, rectB) {
			var ALeft = rectA.position.x; // x1
			var ARight = rectA.position.x + rectA.dimension.width; // x1 + w1
			var ATop = rectA.position.y; // y1 
			var ABottom = rectA.position.y + rectA.dimension.height; // y1 + h1 

			var BLeft = rectB.position.x; // x2
			var BRight = rectB.position.x + rectB.dimension.width; // x2 + w2
			var BTop = rectB.position.y; // y2
			var BBottom = rectB.position.y + rectB.dimension.height; // y2 + h2

			var isSeparate = (ARight < BLeft || BRight < ALeft || 
				ABottom < BTop || BBottom < ATop);

			return !isSeparate;
		}
	}

	game.dataStructures = {

		ReversableEnum: function(items) {
			var me = this;
			me.map = {};
			me.reverseMap = {};

			for (var i = 0; i < items.length; ++i) {
				var curr = items[i];
				me.map[curr] = i;
			}

			me.map['unknown'] = -1;

			var keys = Object.keys(me.map);

			for (var i = 0; i < keys.length; ++i) {
				var currkey = keys[i];
				me.reverseMap[me.map[currkey]] = currkey;
			}

			me.get = function(key) {
				return me.map[key] || -1;
			}

			me.getReverse = function(value) {
				return me.reverseMap[value] || 'unknown';
			}
		},

		CircularBuffer: function(size, FillPrototype) {
			var me = this;
			var utils = game.utils;
			me.buffer = [];
			me.size = size || 15;
			me.next_index =  0;

			if ( !(typeof FillPrototype == "undefined" || FillPrototype == null ) ) {
				for (var i = 0; i < me.size; ++i) {
					me.push(new FillPrototype(arguments.slice(2)));
				}
			}

			me.push = function(element) {
				if ( me.buffer.length < me.size ) {
					me.buffer.push(element);
					return true;
				} else {
					return false;
				}
			};

			me.next = function() {
				var res = me.buffer[me.next_index] || null;
				me.next_index = (me.next_index + 1) % (me.size - (me.size - me.buffer.length));
				return res;
			};

			me.hasNext = function() {
				return (me.size - (me.size - me.buffer.length)) > 0;
			};

			me.reset = function() {
				me.next_index = 0;
			};

			me.forEach = function(mappingFunction) {
				for (var i = 0; i < me.buffer.length; ++i) {
					mappingFunction(me.next(), i);
				} 
			};
		},

		Entity: function(type, position, dimension, velocity) {
			var me = this;
			var x;
			me.type = typeof type == "number" && (x = Math.floor(type)) === type ? x : -1;
			me.position = position || { x: 0, y: 0 };
			me.dimension = dimension || { width: 0, height: 0 };
			me.velocity = velocity || { x: 0, y: 0 };

			me.draw = function() { console.log("Draw not implemented"); }
			me.update = function() { console.log("Update not implemented"); }
			me.isEnabled = function() { console.log("isEnabled not implemented"); return true; }
		}
	};

	game.constants = { 	
		CANVAS_HTML_ID: "playground",		
		CANVAS_WIDTH: 900,
		MAX_SHOTS: 300,
		MAX_ENEMIES: 25,
		DIRECTION: 1, // if negative reverse the controls, if zero no controls, else normal
		BASE_VELOCITY: {x: 2, y: 2},
		TRAVEL_VELOCITY: 0.45,
		FPS_LIMIT: 140,
		NUMBER_OF_CLOUDS: 30,
		KEYS: { left: 37, up: 38, right: 39, down: 40, z: 90, x: 88, space: 32 },
		ENTITY_TYPES: new game.dataStructures.ReversableEnum(['enemy', 'cloud', 'shot', 'player', 'uiProp']),
		SCENARIO_TYPES: new game.dataStructures.ReversableEnum(['destroyall', 'timeout'])
	};

	game.variables = {
		lastUpdate: 0,
		now: 0,
		dt: 0,
		clouds: new game.dataStructures.CircularBuffer(game.constants.NUMBER_OF_CLOUDS),
		shots: new game.dataStructures.CircularBuffer(game.constants.MAX_SHOTS),
		scenarios: [],
		keyMap: [],
		currentScenario: null
	};

	var consts = game.constants;
	consts.CANVAS_HEIGHT = consts.CANVAS_WIDTH / 12 * 9;
	consts.CANVAS = document.getElementById(consts.CANVAS_HTML_ID);
	consts.CONTEXT2D = consts.CANVAS.getContext('2d');
	consts.CANVAS.setAttribute("width", consts.CANVAS_WIDTH);
	consts.CANVAS.setAttribute("height", consts.CANVAS_HEIGHT);

	return game;
}(BOXED_GAME));

