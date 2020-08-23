import Constants from '../sharedConstants.js';
import Variables from '../sharedVariables.js';
import Vector from '../dataStructures/vector.js';
import utils from '../utils.js';
import Entity from '../dataStructures/entity.js';

export default function Player(shots) {
  var consts = Constants;
  var me = this;

  me.BASE_VELOCITY = {x: 2, y: 2};
  me.shots = shots;
  me.__proto__ = new Entity(consts.ENTITY_TYPES.get('player'));

  me.health = {current: 400, max: 400};
  me.color = 'rgb(0,8,255)';
  me.velocity = new Vector(me.BASE_VELOCITY.x, me.BASE_VELOCITY.y);
  me.acceleration = new Vector(0.5, 0.5);
  me.velocityLimit = 0.55;
  me.dimension = {width: 32, height: 32};
  me.position = new Vector(
      consts.CANVAS_WIDTH / 2 - 32,
      consts.CANVAS_HEIGHT - (consts.CANVAS_HEIGHT / 6));
  me.gun = (function() {
    var lim = 50, velocity = 1.22;
    return {
      limit: lim, velocity: velocity
    }
  })();

  me.isEnabled = function() {
    return me.health.current > 0;
  };

  me.draw = function() {
    var ctx = Constants.CONTEXT2D;
    if (me.isEnabled()) {
      var old = ctx.fillStyle;
      ctx.fillStyle = this.color;
      ctx.fillRect(
          this.position.getX(), this.position.getY(), this.dimension.width,
          this.dimension.height);
      ctx.fillStyle = old;
    }
  };

  me.move = function(directX, directY) {
    var dt = Variables.frameClock.dt;
    var x = me.position.getX(), y = me.position.getY();
    var xVel = me.velocity.getX(), yVel = me.velocity.getY();

    var oldV = me.velocity.getX();
    me.velocity.setX(Math.min(
        oldV + me.acceleration.getX() * dt, me.velocityLimit));
    var nextPosition = x + directX * dt * (oldV + xVel) / 2;
    var myLeft = nextPosition + me.dimension.width;
    if (nextPosition > 0 && myLeft <= consts.CANVAS_WIDTH) {
      me.position.setX(nextPosition);
    } else if (myLeft > consts.CANVAS_WIDTH) {
      me.position.setX(consts.CANVAS_WIDTH - me.dimension.width);
    } else {
      me.position.setX(0)
    }

    var oldV = me.velocity.getY();
    me.velocity.setY(Math.min(
        oldV + me.acceleration.getY() * dt, me.velocityLimit));
    var nextPosition = y + directY * dt * (oldV + yVel) / 2;
    var myBottom = nextPosition + me.dimension.height;
    if (nextPosition > 0 && myBottom <= consts.CANVAS_HEIGHT) {
      me.position.setY(nextPosition);
    } else if (myBottom > consts.CANVAS_HEIGHT) {
      me.position.setY(consts.CANVAS_HEIGHT - me.dimension.height);
    } else {
      me.position.setY(0);
    }
  };

  me.shoot = function() {
    me.shots.next().fire(me);
  };

  me.update = function() {
    var shots = me.shots;
    for (var i = 0; i < shots.size; ++i) {
      var shot = shots.next();
      if (shot.isEnabled() && utils.intersectingRectangles(me, shot)) {
        me.health.current -= shot.damage;
        shot.reset();
      }
    }
  };
};