import Entity from '../dataStructures/entity.js';
import Vector from '../dataStructures/vector.js';
import Constants from '../sharedConstants.js';
import Variables from '../sharedVariables.js';
import Utils from '../utils.js';

import SinePath from '../dataStructures/sinePath.js';

export default function Weako(player, shots) {
  var me = this;
  me.player = player;
  me.shots = shots;

  let consts = Constants;

  me.__proto__ = new Entity(consts.ENTITY_TYPES.get('enemy'));
  me.dimension = {width: 32, height: 32};
  me.position = new Vector(consts.CANVAS_WIDTH - me.dimension.width, 40);
  me.color = 'red';
  me.health = {current: 200, max: 200};
  me.velocity = new Vector(0.2, 0.1);
  me.reverse = false;

  me.gun = {limit: 5};

  me.path = new SinePath(
      me.position.add(new Vector(1, 1)), new Vector(2, 40), 30, 20, 4);
  me.next_waypoint = me.path.next();

  me.hasReachedNextPoint = function(closeness) {
    if (me.next_waypoint !== null) {
      return closeness <= 15;  // using some lower bound on closeness
    }
    return false;
  };

  me.isEnabled = function() {
    return me.health.current > 0;
  };

  me.draw = function() {
    var ctx = Constants.CONTEXT2D;
    var old = ctx.fillStyle;
    ctx.fillStyle = me.color;
    ctx.fillRect(
        me.position.getX(), me.position.getY(), me.dimension.width,
        me.dimension.height);
    ctx.fillStyle = old;

    //game.debug.drawPath(me.path.points.buffer)
    //game.debug.drawLine(me.position, me.next_waypoint, 'green');
  };

  me.shoot = function() {
    me.shots.next().fire(me);
  };

  me.travel = function() {
    var me = this;
    var dt = Variables.dt;

    var displacement = me.next_waypoint.sub(me.position);
    var distance = displacement.magnitude();
    var unitDisplacement = displacement.norm();

    me.position.addme(unitDisplacement.mulmembers(me.velocity.mul(dt)));

    if (me.path.points.next_index === (me.path.points.length() - 1) &&
        !me.reverse) {
      me.reverse = true;
    }

    if (me.path.points.next_index === 0 && me.reverse) {
      me.reverse = false;
    }

    if (me.hasReachedNextPoint(distance) && !me.reverse) {
      me.next_waypoint = me.path.next();
    }

    if (me.hasReachedNextPoint(distance) && me.reverse) {
      me.next_waypoint = me.path.prev();
    }
  };

  me.update = function() {
    var player = me.player;
    var x = me.position.getX();

    me.travel();

    if (x >= player.position.getX() - 10 &&
        x <= (player.position.getX() + player.dimension.width) + 10 &&
        player.isEnabled()) {
      me.shoot();
    }

    var shots = me.shots;
    for (var i = 0; i < shots.size; ++i) {
      var shot = shots.next();
      if (shot.isEnabled() && Utils.intersectingRectangles(me, shot)) {
        me.health.current -= shot.damage;
        shot.reset();
      }
    }
  };
}