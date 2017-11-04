"use strict";

BOXED_GAME.actors = (function(game) {
  var consts = game.constants;
  var ctx = consts.CONTEXT2D;
  var utils = game.utils;

  function Shot(shooter, velocity) {
    var me = this;

    me.shooter = shooter;
    me.color = "red";
    me.dimension = { width: 4, height: 16 };
    me.position = { x: 0, y: 0 };
    me.velocity = velocity;
    me.isFired = false;

    me.fire = function() {
      var sX = me.shooter.position.x, sY = me.shooter.position.y;
      var sW = me.shooter.dimension.width, sH = me.shooter.dimension.height;
      var meW = me.dimension.width, meH = me.dimension.height;
      me.position.x = sX + ( sW >> 1 ) - ( meW >> 1 ); 
      me.position.y = sY - sH;
      me.isFired = true;
    }

    me.isEnabled = function() {
      return (me.position.y > -5) && me.isFired;
    };

    me.draw = function() {
      var old = ctx.fillStyle
      ctx.fillStyle = me.color;
      ctx.fillRect(me.position.x, me.position.y, me.dimension.width, me.dimension.height);
      ctx.fillStyle = old;
    };

    me.move = function() {
      me.position.y -= me.velocity * game.variables.dt;  
    };

    me.reset = function() {
      me.position = {x: 0, y: 0}
      me.isFired = false;
    };
  };

  function Cloud(dimension, position) {
    var me = this;
    me.dimension = dimension;
    me.position = position;
    me.draw = function() {

      var oldlinewidth = ctx.lineWidth;
      ctx.lineWidth = 0.40;
      ctx.strokeRect(position.x, position.y, dimension.width, dimension.height);
      ctx.lineWidth = oldlinewidth;
    };

    me.move = function() {
      me.position.y += game.constants.TRAVEL_VELOCITY * game.variables.dt;
    }

    me.isOut = function() { 
      return me.position.y > game.constants.CANVAS_HEIGHT; 
    };

    me.reset = function() {
      me.position.x = utils.randomBetween(1, consts.CANVAS_WIDTH - 1)
      me.position.y = utils.randomBetween(-15, 15)
    };
  }

  // the player object
  function Player() {
    var me = this;

    me.health = { damage: 0, maxDamage: 400, isDead: false };
    me.color = 'rgb(0,8,255)';
    me.velocity = (function(){ return {x: consts.BASE_VELOCITY.x, y: consts.BASE_VELOCITY.y} }());
    me.dimension = {width: 32, height: 32};
    me.acceleration = {x: 0.0002, y: 0.0002};
    me.velocityLimit = 0.55;
    me.position = {x: consts.CANVAS_WIDTH/2 - 32, y: consts.CANVAS_HEIGHT-(consts.CANVAS_HEIGHT/6)};

    me.gun = (function() {
      var lim = 50, velocity = 1.22;
      var buffer = new game.dataStructures.CircularBuffer(lim);
      return {
        shots: buffer, 
        limit: lim, 
        velocity: velocity
      } 
    })();

    me.draw = function() {
      if (!this.health.isDead) {
        var old = ctx.fillStyle;
        ctx.fillStyle = this.color;
        ctx.fillRect(this.position.x, this.position.y, this.dimension.width, this.dimension.height);
        ctx.fillStyle = old;
      }
    };

    me.toggleHide = function() {
      this.health.isDead = !this.health.isDead;
      if ( this.health.isDead ) {
        ctx.clearRect(this.position.x, this.position.y, this.dimension.width, this.dimension.height);  
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
      this.gun.shots.next().fire();
    };

    me.checkDamage = function() {
      if (this.health.damage >= this.health.maxDamage) {
        this.toggleHide();
        ctx.font = "42px Helvetica";
        ctx.fillStyle = "red";
        ctx.textAlign = "center";
        ctx.fillText("YOU DIED!", game.constants.CANVAS_WIDTH / 2, game.constants.CANVAS_HEIGHT / 2);
      }
    };

    me.checkPlayerHit = function() {
      var player = this;
      for (var i = 0; i < this.gun.shots.size; ++i) {
        var shot = player.gun.shots.next();
        if ( shot && shot.isEnabled() && game.utils.intersectingRectangles(player, shot) ) {
          player.health.damage++;
        }
      }
    };

    me.load = function() {
      for ( var i = 0; i < me.gun.shots.size; ++i ) {
        me.gun.shots.push(new Shot(me, me.gun.velocity));
      }
    }
  };

  function HealthBar(player) {
    this.position = { 
      x: 20, 
      y: consts.CANVAS_HEIGHT - (consts.CANVAS_HEIGHT / 16) 
    };
    this.dimension = { width: 150, height: 20 };

    var maxBeads = 8;
    this.bead = {
      max: maxBeads,
      dimension: { width: this.dimension.width / maxBeads, height: this.dimension.height - 2 }
    }

    this.colors = {
      ok: 'rgb(103, 229, 25)',
      warning:  'rgb(255, 203, 33)',//'rgb(239, 228, 9)',
      critical: 'rgb(219, 6, 6)',
      border: 'rgb(19, 25, 53)'
    };
    this.draw = function() {

      var startPosition = this.position.x + 3;
      var limit = player.health.maxDamage;
      var playerDamage = player.health.damage;

      var numberOfBeads = Math.ceil( (limit - playerDamage) / Math.floor( (limit / this.bead.max) ) )

      function getColor(colors, numberOfBeads, maxBeads) {
        var mid = Math.floor(maxBeads * 0.5);
        var lower = Math.floor(8 * 0.25);
        if ( numberOfBeads > mid ) {
          return colors.ok;
        } else if ( numberOfBeads <= mid && numberOfBeads > lower ) {
          return colors.warning;
        } else {
          return colors.critical;
        }
      }

      var oldstroke = ctx.strokeStyle;
      ctx.strokeStyle = this.colors.border;
      ctx.strokeRect(this.position.x, this.position.y, this.dimension.width, this.dimension.height);
      

      var old = ctx.fillStyle;
      var oldFont = ctx.font;
      var color = getColor(this.colors, numberOfBeads, this.bead.max);
      ctx.fillStyle = color;

      for (var i = 1; i <= numberOfBeads; ++i ) {
        ctx.fillRect(startPosition, this.position.y + 2, this.bead.dimension.width - 5, this.bead.dimension.height - 2);
        startPosition += this.bead.dimension.width;
      }

      ctx.font = "14px Arial bold";
      ctx.fillText("power", this.position.x, this.position.y - 8);
      
      ctx.fillStyle = old;
      ctx.strokeStyle = oldstroke;
      ctx.font = oldFont;

    }

  }

  var p = new Player();
  return {shot: Shot, cloud: Cloud, player: p, health_bar: new HealthBar(p) };

}(BOXED_GAME));

BOXED_GAME.backDrops = (function(game) {
  var consts = game.constants;
  var utils = game.utils;
  var variables = game.variables;


  function addClouds() {
    
    for (var i = 0; i < game.constants.NUMBER_OF_CLOUDS; ++i ) {
        game.variables.clouds.push(
          new game.actors.cloud(
            { width: 20, height: 20 }, 
            { x: utils.randomBetween(1, consts.CANVAS_WIDTH - 1), y: utils.randomBetween(-15, 15) }
            )
        );
    }
  }
  return {addClouds: addClouds};
}(BOXED_GAME));