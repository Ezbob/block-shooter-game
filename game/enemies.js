"use strict";

BOXED_GAME.actors.paths = (function(game) {

	function SinePath(startPoint, endPoint, amplitude, numberOfPoints, numberOfWaves) {
		var me = this;
		var Vector = game.dataStructures.Vector;
		me.points = new game.dataStructures.CircularBuffer(numberOfPoints);
		me.end = endPoint;
		me.start = startPoint;

		/*
			Calculate the path using simple linear algebra, and buffer the results
		*/
		me.next = function() {
			if ( me.points.buffer.length === me.points.size ) {
				// buffer is full, just cycle through it
				return me.points.next();
			} else if ( me.points.buffer.length === 0 ) {
				// we start at starting point
				me.points.push(me.start);
				//console.log("FIRST ", me.points.);
				return me.start;
			}

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

			var index = me.points.length; // index of the point we want to compute now
			var previousPoint = me.points.buffer[index - 1]; // previous point
			
			// the sine value (vertical component)
			var sineValue = amplitude * Math.sin(index * sineScale);

			// move on the horizontal component (along the line)
			var nextOnLine = previousPoint.add(parallel.mul(distanceScale));
			// move by sine on the vectical component
			var nextPoint = nextOnLine.add(perpendicular.mul(sineValue));

			me.points.push(nextPoint);
			return nextPoint;
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
		}

		me.shoot = function() {
			game.variables.shots.next().fire(me);	
		}

		me.path = function() {
			var dt = game.variables.dt;
			var aplitude = 0.25;
			var player = game.actors.player;
			var x = me.position.getX(), y = me.position.getY();
			var velX = me.velocity.getX(), velY = me.velocity.getY();

			if ( x <= 20 && me.goingLeft ) {
				me.goingLeft = false;
			}

			if ( x >= consts.CANVAS_WIDTH - (me.dimension.width + 20) && !me.goingLeft ) {
				me.goingLeft = true;
			}
		
			if ( me.goingLeft ) {
				me.counter += 0.1;
				me.position.addme(new Vector(-velX * dt, Math.sin(me.counter) * aplitude * dt));
			}

			if ( !me.goingLeft ) {
				me.counter += 0.1;
				me.position.addme(new Vector(velX * dt, Math.sin(me.counter) * aplitude * dt));
			}

			if ( x >= player.position.getX() && x <= (player.position.getX() + player.dimension.width) && player.isEnabled() ) {
				me.shoot()
			}
		}

		me.update = function() {
			var dt = game.variables.dt;
			var player = game.actors.player;

			me.path();

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

