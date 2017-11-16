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
			var ALeft = rectA.position.getX(); // x1
			var ARight = ALeft + rectA.dimension.width; // x1 + w1
			var ATop = rectA.position.getY(); // y1 
			var ABottom = ATop + rectA.dimension.height; // y1 + h1 

			var BLeft = rectB.position.getX(); // x2
			var BRight = BLeft + rectB.dimension.width; // x2 + w2
			var BTop = rectB.position.getY(); // y2
			var BBottom = BTop + rectB.dimension.height; // y2 + h2

			var isSeparate = (ARight < BLeft || BRight < ALeft || 
				ABottom < BTop || BBottom < ATop);

			return !isSeparate;
		}
	}

	game.dataStructures = {

		Vector: function() { 
			var me = this; 
			me.scalars = [];

			for (var i = 0; i < arguments.length; ++i) {
				me.scalars[i] = arguments[i];
			}

			me.getX = function() {
				return me.scalars[0];
			}

			me.getY = function() {
				return me.scalars[1];
			}

			me.getZ = function() {
				return me.scalars[2];
			}

			me.setX = function(x) {
				me.scalars[0] = x;
			}

			me.setY = function(y) {
				me.scalars[1] = y;
			}

			me.setZ = function(z) {
				me.scalars[2] = z;
			}

			me.magnitude = function() {
				var sum = 0;
				for (var i = 0; i < me.scalars.length; ++i) {
					sum += (me.scalars[i] * me.scalars[i]);
				}
				return Math.sqrt(sum);
			}

			me.add = function(other) { 
				var res = new game.dataStructures.Vector(); 
				for (var i = 0; i < me.scalars.length; ++i) { 
					res.scalars[i] = me.scalars[i] + other.scalars[i]; 
				}
				return res; 
			}

			me.addme = function(other) {  
				for (var i = 0; i < me.scalars.length; ++i) { 
					me.scalars[i] = me.scalars[i] + other.scalars[i]; 
				}
				return me; 
			}

			me.sub = function(other) {
				var res = new game.dataStructures.Vector(); 
				for (var i = 0; i < me.scalars.length; ++i) { 
					res.scalars[i] = me.scalars[i] - other.scalars[i]; 
				}
				return res; 
			}

			me.subme = function(other) { 
				for (var i = 0; i < me.scalars.length; ++i) { 
					me.scalars[i] = me.scalars[i] - other.scalars[i]; 
				}
				return me; 
			}

			me.rotateme2d90 = function() {
				me.scalars[0] = me.scalars[1]
				me.scalars[1] = -me.scalars[0]
			}

			me.rotate2d = function() {
				return new game.dataStructures.Vector(me.scalars[1], -me.scalars[0])
			}

			me.mul = function(scalar) {
				var res = new game.dataStructures.Vector();
				for (var i = 0; i < me.scalars.length; ++i) { 
					res.scalars[i] = me.scalars[i] * scalar; 
				}
				return res; 
			}

			me.mulme = function(scalar) {
				for (var i = 0; i < me.scalars.length; ++i) { 
					me.scalars[i] = me.scalars[i] * scalar; 
				}
				return me;
			}

			me.mulmembers = function(other) {
				var res = new game.dataStructures.Vector();
				for (var i = 0; i < me.scalars.length; ++i) {
					res.scalars[i] = me.scalars[i] * other.scalars[i];
				}
				return res;
			}

			me.norm = function() {
				return me.mul(1 / me.magnitude())
			}

			me.dot = function(other) {
				var res = 0;
				for ( var i = 0; i < me.scalars.length; ++i ) {
					res += me.scalars[i] * other.scalars[i];
				}
				return res;
			}

			me.equals = function(other) {
				if ( me.scalars.length !== other.scalars.length ) {
					return false;
				}

				for ( var i = 0; i < me.scalars.length; ++i ) {
					if ( me.scalars[i] !== other.scalars[i] ) {
						return false;
					}
				}
				return true;
			}
		},

		ReversableEnum: function() {
			var me = this;
			me.map = {};
			me.reverseMap = {};

			for (var i = 0; i < arguments.length; ++i) {
				var curr = arguments[i];
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

			me.length = function() {
				return me.buffer.length;
			};

			me.push = function(element) {
				if ( me.buffer.length < me.size ) {
					me.buffer.push(element);
					return true;
				} else {
					return false;
				}
			};

			me.next = function() {
				var res = me.buffer[me.next_index];
				me.next_index = (me.next_index + 1) % me.buffer.length;
				return res;
			};

			me.prev = function() {
				var res = me.buffer[me.next_index];
				var nexti = (me.next_index - 1) % me.buffer.length;
				me.next_index = nexti < 0 ? me.buffer.length - 1 : nexti;
				return res;
			};

			me.hasNext = function() {
				return me.buffer.length > 0;
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
	};

	game.dataStructures.CircularBuffer.prototype.toString = function vectorToString() {
		var me = this;
		var stringRepr = "CircularBuffer(";

		for (var i = 0; i < me.buffer.length - 1; ++i) {
			stringRepr += me.buffer[i] + ", ";
		}
		stringRepr += me.buffer[me.buffer.length - 1];

		return stringRepr + ")"; 
	}

	game.dataStructures.Entity = function(type, position, dimension, velocity) {
		var me = this;
		var x;
		me.type = typeof type == "number" && (x = Math.floor(type)) === type ? x : -1;
		me.position = position || new game.dataStructures.Vector(0,0);
		me.dimension = dimension || { width: 0, height: 0 };
		me.velocity = velocity || new game.dataStructures.Vector(0,0);

		me.draw = function() { console.log("Draw not implemented"); }
		me.update = function() { console.log("Update not implemented"); }
		me.isEnabled = function() { console.log("isEnabled not implemented"); return false; }
	}

	game.dataStructures.Vector.fromArray = function(array) {
		var res = new game.dataStructures.Vector();
		res.scalars = array;
		return res;
	}

	game.dataStructures.Vector.v = game.dataStructures.Vector.fromArray;

	game.dataStructures.Vector.prototype.toString = function vectorToString() {
		var me = this;
		var stringRepr = "Vector(";

		for (var i = 0; i < me.scalars.length - 1; ++i) {
			stringRepr += me.scalars[i] + ", ";
		}
		stringRepr += me.scalars[me.scalars.length - 1];

		return stringRepr + ")"; 
	}

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
		KEYS: { left: 37, up: 38, right: 39, down: 40, z: 90, x: 88, space: 32, enter: 13, control: 17, alt: 18 },
		ENTITY_TYPES: new game.dataStructures.ReversableEnum('enemy', 'cloud', 'shot', 'player', 'uiProp'),
		SCENARIO_TYPES: new game.dataStructures.ReversableEnum('destroyall', 'timeout')
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
		currentScenario: null,
		isPaused: false
	};


	var consts = game.constants;
	consts.CANVAS_HEIGHT = consts.CANVAS_WIDTH / 12 * 9;
	consts.CANVAS = document.getElementById(consts.CANVAS_HTML_ID);
	consts.CONTEXT2D = consts.CANVAS.getContext('2d');
	consts.CANVAS.setAttribute("width", consts.CANVAS_WIDTH);
	consts.CANVAS.setAttribute("height", consts.CANVAS_HEIGHT);

	return game;
}(BOXED_GAME));


BOXED_GAME.debug = (function(game) {
	var consts = game.constants;
	var ctx = consts.CONTEXT2D;
	var exportObj = {};

	function drawLine(start, end, color) {
		if ( consts.DEBUG_ON ) {
			ctx.beginPath();
			ctx.strokeStyle = color ? color : "black";
			ctx.moveTo(start.getX(), start.getY());
			ctx.lineTo(end.getX(), end.getY());
			ctx.stroke();
			ctx.closePath();	
		}
	}

	function drawPath(points, color) {
		var length = typeof points.length === "function" ? points.length() : points.length;
		if ( consts.DEBUG_ON && length >= 2 ) {
			ctx.beginPath();
			ctx.strokeStyle = color ? color : "black";

			var start = points[0];
			ctx.moveTo(start.getX(), start.getY());
			for ( var i = 1; i < length; ++i ) {
				var curPoint = points[i];
				ctx.lineTo(curPoint.getX(), curPoint.getY());
			}
			ctx.stroke();
			ctx.closePath();
		}
	}

	exportObj['drawLine'] = drawLine;
	exportObj['drawPath'] = drawPath;

	return exportObj;

})(BOXED_GAME);



// polyfilla for requestAnimationFrame
var requestAniFrame = window.requestAnimationFrame || 
		window.webkitRequestAnimationFrame || 
		window.mozRequestAnimationFrame    || 
		window.oRequestAnimationFrame      || 
		window.msRequestAnimationFrame     || 
		function(callback) {
			window.setTimeout(callback, 1000 / BOXED_GAME.constants.FPS_LIMIT);
		};

var puts = function() {
	// converts objects to string representation and prints out to console
	// useful for debugging objects with custom toString
  var strings = Array.prototype.map.call(arguments, function(obj){
      return '' + obj;
  });
  console.log.apply(console, strings);
};
