"use strict";

BOXED_GAME.actors.paths = (function(game) {

	function SinePath(startPoint, endPoint, amplitude, numberOfPoints, numberOfWaves) {
		var me = this;
		var Vector = game.dataStructures.Vector;
		me.points = new game.dataStructures.CircularBuffer(numberOfPoints);
		me.end = endPoint;
		me.start = startPoint;


		// vector going from start to end point
		var displacement = me.end.sub(me.start);
		// the length of the sucker
		var displacementLength = displacement.magnitude();
		// incremental vector used as a stepping stone for calculating the curve
		var normDisplacement = displacement.norm();

		// the 90 ( or PI / 2 ) rotated normalized vector 
		var perpendicular = normDisplacement.rotate2d();

		// scales the components
		var distanceScale = displacementLength / (numberOfPoints - 1);
		var sineScale = 2 * Math.PI * (numberOfWaves / numberOfPoints);

		for ( var i = 0; i < numberOfPoints; ++i) {
			// the sine value (vertical component)
			var sineValue = amplitude * Math.sin(i * sineScale);

			// move on the horizontal component (along the line)
			var nextOnLine = startPoint.add(normDisplacement.mul(i * distanceScale));

			// move by sine on the vectical component
			var nextPoint = nextOnLine.add(perpendicular.mul(sineValue));

			me.points.push(nextPoint);
		}

		/*
			Calculate the path using simple linear algebra, and buffer the results
		*/
		me.next = function() {
			return me.points.next();
		}

		me.prev = function() {
			return me.points.prev();
		}
	}

	return {
		SinePath: SinePath
	}
})(BOXED_GAME);


BOXED_GAME.actors.enemies = (function(game) {
	var Entity = game.dataStructures.Entity;
	var utils = game.utils;
	var consts = game.constants;
	var ctx = consts.CONTEXT2D;
	var Vector = game.dataStructures.Vector;

	function Weako() {
		var me = this;
		me.__proto__ = new Entity(consts.ENTITY_TYPES.get('enemy'));
		me.dimension = { width: 32, height: 32 }
		me.position = new Vector(consts.CANVAS_WIDTH - 60, 40);
		me.color = "red";
		me.health = { current: 200, max: 200 };
		me.velocity = new Vector( 0.2, 0.1 );
		me.counter = 0;
		me.goingLeft = true;

		me.gun = {
			limit: 5
		}

		me.path = new BOXED_GAME.actors.paths.SinePath(me.position, new Vector(20, 40), 30, 30, 4);
		
		me.isEnabled = function() {
			return me.health.current > 0;
		}

		me.draw = function() {
			if ( me.isEnabled() ) {
				var old = ctx.fillStyle;
				ctx.fillStyle = me.color;
				ctx.fillRect(me.position.getX(), me.position.getY(), me.dimension.width, me.dimension.height);
				ctx.fillStyle = old;
			}

			game.debug.drawPath(me.path.points.buffer)
		}

		me.shoot = function() {
			game.variables.shots.next().fire(me);	
		}

		me.travel = function() {
			var dt = game.variables.dt;
			var aplitude = 0.25;
			var player = game.actors.player;
			var x = me.position.getX(), y = me.position.getY();
			var velX = me.velocity.getX(), velY = me.velocity.getY();

			if ( me.path.points.next_index === (me.path.points.size - 1) && me.goingLeft ) {
				me.goingLeft = false;
			}

			if ( me.path.points.next_index === 0 && !me.goingLeft ) {
				me.goingLeft = true;
			}
		
			if ( me.goingLeft ) {
				me.position = me.path.next();
			}

			if ( !me.goingLeft ) {
				me.position = me.path.prev();
			}

			if ( x >= player.position.getX() && x <= (player.position.getX() + player.dimension.width) && player.isEnabled() ) {
				me.shoot()
			}
		}

		me.update = function() {
			var dt = game.variables.dt;
			var player = game.actors.player;

			me.travel();

			var shots = game.variables.shots;
			for ( var i = 0; i < shots.size; ++i ) {
				var shot = shots.next();
				if ( shot.isEnabled() && game.utils.intersectingRectangles(me, shot) ) {
					me.health.current -= shot.damage;
					shot.reset();
				}
			}
		}
	}

	return {
		Weako: Weako
	};

})(BOXED_GAME);

BOXED_GAME.scenario = (function(game) {
	var Entity = game.dataStructures.Entity;
	var utils = game.utils;
	var consts = game.constants;
	var enemies = game.actors.enemies;
	var scenarioStack = [];

	function Scenarios() {
		// default Prototype
		var me = this;
		me.type = consts.SCENARIO_TYPES.get('destroyall');
		me.currentEnemies = [];
		me.isStarted = false;

		me.isPlaying = function() {
			return me.currentEnemies > 0 && me.isStarted;
		}

		me.start = function() {
			me.isStarted = true;
		}

		me.stop = function() {
			me.isStarted = false;
		}
	}

	function FirstEncounter() {
		var me = this;
		me.__proto__ = new Scenarios()
		var firstEnemy = new BOXED_GAME.actors.enemies.Weako();
		me.currentEnemies.push(firstEnemy);
	}

	scenarioStack.push(new FirstEncounter());

	return {
		defaultPrototype: Scenarios,
		scenarioStack: scenarioStack
	};
})(BOXED_GAME);

