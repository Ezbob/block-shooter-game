"use strict";

BOXED_GAME.actors.enemies = (function(game) {
	var Entity = game.dataStructures.Entity;
	var utils = game.utils;
	var consts = game.constants;
	var ctx = consts.CONTEXT2D;

	function Weako() {
		var me = this;
		me.__proto__ = new Entity(consts.ENTITY_TYPES.get('enemy'));
		me.dimension = { width: 32, height: 32 }
		me.position = { x: consts.CANVAS_WIDTH - 60, y: 40 };
		me.color = "red";
		me.health = { current: 200, max: 200 };
		me.velocity = { x: 0.2, y: 0.1 };
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
				ctx.fillRect(me.position.x, me.position.y, me.dimension.width, me.dimension.height);
				ctx.fillStyle = old;
			}
		}

		me.shoot = function() {
			var shot = game.variables.shots.next();
			shot.fire(me);	
		}

		me.update = function() {
			var dt = game.variables.dt;
			var aplitude = 0.15;
			var player = game.actors.player;

			if ( me.position.x <= 20 && me.goingLeft ) {
				me.goingLeft = false;
			}

			if ( me.position.x >= consts.CANVAS_WIDTH - (me.dimension.width + 20) && !me.goingLeft ) {
				me.goingLeft = true;
			}
		
			if ( me.goingLeft ) {
				me.counter += me.velocity.y;
				me.position.x -= me.velocity.x * dt;
				//me.position.y += me.velocity.y * dt;		
				me.position.y += (Math.cos(me.counter) * aplitude) * dt;
			}

			if ( !me.goingLeft ) {
				me.counter += me.velocity.y;
				me.position.x += me.velocity.x * dt;
				//me.position.y += me.velocity.y * dt;				
				me.position.y += (Math.cos(me.counter) * aplitude) * dt;
			}

			if ( me.position.x >= player.position.x && me.position.x <= (player.position.x + player.dimension.width) ) {
				me.shoot()
			}

			var shots = game.variables.shots;
      for (var i = 0; i < shots.size; ++i) {
        var shot = shots.next();
        if ( shot.isEnabled() && game.utils.intersectingRectangles(me, shot) ) {
          me.health.current -= shot.damage;
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

