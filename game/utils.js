"use strict";

BOXED_GAME.utils = (function(game) {
	function randomBetween(low,max) {
		return low + Math.floor((Math.random() * max));
	}

	function checkIntersectingRectangles (rectA, rectB) {
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

	return {randomBetween: randomBetween, intersectingRectangles: checkIntersectingRectangles};
}(BOXED_GAME));
