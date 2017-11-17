"use strict";

BOXED_GAME.actors.paths = (function(game) {

	function Path(startPoint, endPoint) {
		var me = this;
		me.end = endPoint;
		me.start = startPoint;

		me.next = function() { return null; }
		me.prev = function() { return null; }

	}

	function SinePath(startPoint, endPoint, amplitude, numberOfPoints, numberOfWaves) {
		var me = this;
		me.__proto__ = new Path(startPoint, endPoint);
		var Vector = game.dataStructures.Vector;
		me.points = new game.dataStructures.CircularBuffer(numberOfPoints);

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
		SinePath: SinePath,
		Path: Path
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
		me.position = new Vector(consts.CANVAS_WIDTH - me.dimension.width, 40);
		me.color = "red";
		me.health = { current: 200, max: 200 };
		me.velocity = new Vector( 0.2, 0.1 );
		me.reverse = false;

		me.gun = {
			limit: 5
		}

		me.path = new BOXED_GAME.actors.paths.SinePath(me.position.add(new Vector(1, 1)), new Vector(2, 40), 30, 20, 4);
		me.next_waypoint = me.path.next();

		me.hasReachedNextPoint = function(closeness) {
			if ( me.next_waypoint !== null ) {
				return closeness <= 15; // using some lower bound on closeness
			}
			return false;
		}
		
		me.isEnabled = function() {
			return me.health.current > 0;
		}

		me.draw = function() {
			var old = ctx.fillStyle;
			ctx.fillStyle = me.color;
			ctx.fillRect(me.position.getX(), me.position.getY(), me.dimension.width, me.dimension.height);
			ctx.fillStyle = old;

			game.debug.drawPath(me.path.points.buffer)
			game.debug.drawLine(me.position, me.next_waypoint, "green");
		}

		me.shoot = function() {
			game.variables.shots.next().fire(me);	
		}

		me.travel = function() {
			var me = this;
			var dt = game.variables.dt;
			var aplitude = 0.25;
			var player = game.actors.player;

			var displacement = me.next_waypoint.sub(me.position);
			var distance = displacement.magnitude();
			var unitDisplacement = displacement.norm();

			me.position.addme(unitDisplacement.mulmembers(me.velocity.mul(dt)));

			if (  me.path.points.next_index === (me.path.points.length() - 1) && !me.reverse ) {
				me.reverse = true;
			}

			if ( me.path.points.next_index === 0 && me.reverse ) {
				me.reverse = false;
			}
		
			if ( me.hasReachedNextPoint(distance) && !me.reverse ) {
				me.next_waypoint = me.path.next();
			}

			if ( me.hasReachedNextPoint(distance) && me.reverse ) {
				me.next_waypoint = me.path.prev();
			}
		}

		me.update = function() {
			var dt = game.variables.dt;
			var player = game.actors.player;
			var x = me.position.getX(), y = me.position.getY();

			me.travel();

			if ( x >= player.position.getX() && x <= (player.position.getX() + player.dimension.width) && player.isEnabled() ) {
				me.shoot();
			}

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

