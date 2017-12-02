"use strict";

var BOXED_GAME = {};
BOXED_GAME.utils = {};

BOXED_GAME.utils.randomBetween = function(low, max) {
	return low + Math.floor((Math.random() * max));
};

BOXED_GAME.utils.randomFloatBetween = function(low, max) {
		return Math.random() * (max - low) + low;
};

BOXED_GAME.utils.intersectingRectangles = function(rectA, rectB) {
	var ALeft = rectA.position.getX(); // x1
	var ARight = ALeft + rectA.dimension.width; // x1 + w1
	var ATop = rectA.position.getY(); // y1 
	var ABottom = ATop + rectA.dimension.height; // y1 + h1 

	var BLeft = rectB.position.getX(); // x2
	var BRight = BLeft + rectB.dimension.width; // x2 + w2
	var BTop = rectB.position.getY(); // y2
	var BBottom = BTop + rectB.dimension.height; // y2 + h2

	return !(ARight < BLeft || BRight < ALeft || ABottom < BTop || BBottom < ATop);
};

BOXED_GAME.utils.stringJoin = function(delimiter) {
	if ( arguments.length < 2 || arguments[1].length === 0 ) {
		return "";
	}
  var array = arguments[1];
	var res = "" + array[0];
	for (var i = 1; i < array.length; i++) {
		 res += delimiter + array[i];
	}
	return res;
};

// polyfilla for requestAnimationFrame
var requestAniFrame = window.requestAnimationFrame || 
		window.webkitRequestAnimationFrame             || 
		window.mozRequestAnimationFrame                || 
		window.oRequestAnimationFrame                  || 
		window.msRequestAnimationFrame                 || 
		function(callback) {
			window.setTimeout(callback, 1000 / BOXED_GAME.constants.FPS_LIMIT);
		};

var puts = function() {
	// converts objects to string representation and prints out to console
	// useful for debugging objects with custom toString
	var strings = Array.prototype.map.call(arguments, function(obj) {
		return '' + obj;
	});
	console.log.apply(console, strings);
};
