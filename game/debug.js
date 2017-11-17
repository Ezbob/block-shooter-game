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