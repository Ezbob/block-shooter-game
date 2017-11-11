"use strict";

BOXED_GAME.actors = (function(game) {
  var consts = game.constants;
  var ctx = consts.CONTEXT2D;
  var utils = game.utils;
  var Entity = game.dataStructures.Entity;
  var Vector = game.dataStructures.Vector;

  function Shot() {
    var me = this;
    me.__proto__ = new Entity(consts.ENTITY_TYPES.get('shot'));

    me.shooter = null;
    me.color = "#FF5800";
    me.isFired = false;
    me.dimension = { width: 4, height: 16 };
    me.position = new Vector(0, 0);
    me.velocity = 1.25;
    me.direction = -1;
    me.damage = 10;

    me.fire = function(shooter) {

      me.shooter = shooter;
      var sX = me.shooter.position.x, sY = me.shooter.position.y;
      var sW = me.shooter.dimension.width, sH = me.shooter.dimension.height;
      var meW = me.dimension.width, meH = me.dimension.height;
      me.position.x = sX + ( sW >> 1 ) - ( meW >> 1 ); 
      
      if ( shooter.type === consts.ENTITY_TYPES.get('enemy')) {
        me.position.y = sY + sH + meH;
        me.direction = 1;
      } else {
        me.position.y = sY - sH;
        me.direction = -1;
      }

      me.isFired = true;
    };

    me.isEnabled = function() {
      return ( me.position.y > -5 || me.position.y < consts.CANVAS_HEIGHT - 10 ) && me.isFired;
    };

    me.draw = function() {
      var old = ctx.fillStyle
      ctx.fillStyle = me.color;
      ctx.fillRect(me.position.x, me.position.y, me.dimension.width, me.dimension.height);
      ctx.fillStyle = old;
    };

    me.update = function() {
      me.position.y += me.direction * (me.velocity * game.variables.dt);
    };

    me.reset = function() {
      me.position = { x: 0, y: 0 }
      me.isFired = false;
      me.shooter = null;
    };
  };

  function Cloud(dimension, position) {
    var me = this;
    me.velocityOffset = utils.randomFloatBetween(0, 0.6);

    var calculatedDimensions = (function(){
      var w = dimension.width * ( me.velocityOffset + 0.6 ), h = dimension.height * ( me.velocityOffset + 0.6 ); 
      return {width: w, height: h}
    })()

    me.__proto__ = new Entity(consts.ENTITY_TYPES.get('cloud'), position, calculatedDimensions);

    me.draw = function() {
      ctx.lineWidth = 0.40;
      ctx.strokeStyle = "black";
      ctx.strokeRect(me.position.x, me.position.y, me.dimension.width, me.dimension.height);
    };

    me.isEnabled = function() { 
      return me.position.y < (game.constants.CANVAS_HEIGHT + me.dimension.height); 
    };

    me.update = function() {
      me.position.y += (game.constants.TRAVEL_VELOCITY + me.velocityOffset) * game.variables.dt;
    };

    me.reset = function() {
      me.position.x = utils.randomBetween(1, consts.CANVAS_WIDTH - 1)
      me.position.y = -me.dimension.height;
      ctx.clearRect(me.position.x, me.position.y, me.dimension.width, me.dimension.height)
    };
  }

  // the player object
  function Player() {
    var me = this;
    me.__proto__ = new Entity(consts.ENTITY_TYPES.get('player'));

    me.health = { current: 400, max: 400 };
    me.color = 'rgb(0,8,255)';
    me.velocity = (function(){ return {x: consts.BASE_VELOCITY.x, y: consts.BASE_VELOCITY.y} }());
    me.acceleration = { x: 0.0002, y: 0.0002 };
    me.velocityLimit = 0.55;
    me.dimension = { width: 32, height: 32 };
    me.position = { x: consts.CANVAS_WIDTH / 2 - 32, y: consts.CANVAS_HEIGHT - ( consts.CANVAS_HEIGHT / 6 ) }
    me.gun = (function() {
      var lim = 50, velocity = 1.22;
      return { 
        limit: lim, 
        velocity: velocity
      } 
    })();

    me.isEnabled = function() {
      return me.health.current > 0;
    }

    me.draw = function() {
      if ( me.isEnabled() ) {
        var old = ctx.fillStyle;
        ctx.fillStyle = this.color;
        ctx.fillRect(this.position.x, this.position.y, this.dimension.width, this.dimension.height);
        ctx.fillStyle = old;
      }
    };

    me.move = function(directX, directY) {
      if ( directX != 0 ) {
        var oldV = this.velocity.x;
        this.velocity.x = Math.min(this.velocity.x + this.acceleration.x * game.variables.dt, 
          this.velocityLimit);
        if ( directX > 0 ) {
          var nextPosition = this.position.x + game.variables.dt * ( oldV + this.velocity.x ) / 2;
          if ( nextPosition + this.dimension.width <= consts.CANVAS_WIDTH ) {
            this.position.x = nextPosition; 
          } else {
            this.position.x = consts.CANVAS_WIDTH - this.dimension.width;
          }
        } else if ( directX < 0 ) {
          var nextPosition = this.position.x - game.variables.dt * ( oldV + this.velocity.x ) / 2;
          if ( nextPosition > 0 ) { // is the next step within the bounds of the canvas??
            this.position.x = nextPosition; 
          } else {
            this.position.x = 0;
          }
        }
      }
      if ( directY != 0 ) {
        var oldV = this.velocity.y;
        this.velocity.y = Math.min(this.velocity.y + this.acceleration.y * game.variables.dt, 
          this.velocityLimit);
        if ( directY > 0 ) {
          var nextPosition = this.position.y + game.variables.dt * ( oldV + this.velocity.y ) / 2;
          if ( nextPosition + this.dimension.height <= consts.CANVAS_HEIGHT ) {
            this.position.y = nextPosition; 
          } else {
            this.position.y = consts.CANVAS_HEIGHT - this.dimension.height;
          }
        } else if ( directY < 0 ) {
          var nextPosition = this.position.y - game.variables.dt * ( oldV + this.velocity.y ) / 2;
          if ( nextPosition > 0 ) {
            this.position.y = nextPosition;
          } else {
            this.position.y = 0;
          }
          
        }
      }
    };

    me.shoot = function () {
      var shot = game.variables.shots.next();
      shot.fire(me);
    };

    me.update = function() {

      var shots = game.variables.shots;
      for (var i = 0; i < shots.size; ++i) {
        var shot = shots.next();
        if ( shot.isEnabled() && game.utils.intersectingRectangles(me, shot) ) {
          me.health.current -= shot.damage;
          shot.reset();
        }
      }
        
      if ( !me.isEnabled() ) {
        var oldFont = ctx.font;
        ctx.font = "42px Helvetica";
        ctx.fillStyle = "red";
        ctx.textAlign = "center";
        ctx.fillText("YOU DIED!", game.constants.CANVAS_WIDTH / 2, game.constants.CANVAS_HEIGHT / 2);
        ctx.font = oldFont;
      }
    }
  };

  function HealthBar(player) {
    var me = this;
    me.__proto__ = new Entity(consts.ENTITY_TYPES.get('uiProp'));
    
    me.position = { 
      x: 20, 
      y: consts.CANVAS_HEIGHT - (consts.CANVAS_HEIGHT >> 4) 
    };
    me.dimension = { width: 150, height: 20 };

    me.beads = (function() {
      var maxBeads = 8;
    
      return {
        max: maxBeads,
        number: Math.ceil( player.health.current / Math.floor( player.health.max / maxBeads ) ),
        dimension: { width: me.dimension.width / maxBeads, height: me.dimension.height - 2 }
      };
    })();
    
    me.colors = {
      ok: 'rgb(103, 229, 25)',
      warning:  'rgb(255, 203, 33)',//'rgb(239, 228, 9)',
      critical: 'rgb(219, 6, 6)',
      border: 'rgb(19, 25, 53)'
    };

    me.update = function() {
      me.beads.number = Math.ceil( player.health.current / Math.floor( player.health.max / me.beads.max ) )
    }

    me.draw = function() {
      var startPosition = me.position.x + 3;

      function getColor(colors, numberOfBeads, maxBeads) {
        var mid = Math.floor(maxBeads * 0.5);
        var lower = Math.floor(maxBeads * 0.25);
        if ( numberOfBeads > mid ) {
          return colors.ok;
        } else if ( numberOfBeads <= mid && numberOfBeads > lower ) {
          return colors.warning;
        } else {
          return colors.critical;
        }
      }

      var oldstroke = ctx.strokeStyle;
      ctx.strokeStyle = me.colors.border;
      ctx.strokeRect(me.position.x, me.position.y, me.dimension.width, me.dimension.height);
      
      var old = ctx.fillStyle;
      var oldFont = ctx.font;
      var color = getColor(me.colors, me.beads.number, me.beads.max);
      ctx.fillStyle = color;

      for ( var i = 1; i <= me.beads.number; ++i ) {
        ctx.fillRect(startPosition, me.position.y + 2, me.beads.dimension.width - 5, me.beads.dimension.height - 2);
        startPosition += me.beads.dimension.width;
      }

      ctx.font = "14px Helvetica";
      ctx.fillText("power", me.position.x, me.position.y - 8);
      
      ctx.fillStyle = old;
      ctx.strokeStyle = oldstroke;
      ctx.font = oldFont;
    }

  }

  var p = new Player();
  return { 
    shot: Shot, 
    cloud: Cloud, 
    player: p, 
    health_bar: new HealthBar(p) 
  };

}(BOXED_GAME));

BOXED_GAME.backDrops = (function(game) {
  var consts = game.constants;
  var utils = game.utils;
  var variables = game.variables;
  var clouds = game.variables.clouds;

  function loadClouds() {
    
    for (var i = 0; i < game.constants.NUMBER_OF_CLOUDS; ++i ) {
        clouds.push(
          new game.actors.cloud(
            { width: 20, height: 20 }, 
            { x: utils.randomBetween(1, consts.CANVAS_WIDTH - 1), y: utils.randomBetween(-15, consts.CANVAS_HEIGHT >> 1) }
            )
        );
    }
  }
  
  return {loadClouds: loadClouds};
}(BOXED_GAME));