import Entity from '../dataStructures/entity.js';
import Constants from '../sharedConstants.js';
import Variables from '../sharedVariables.js';
import Utils from '../utils.js';

export default function Cloud(dimension, position) {
  var me = this;
  me.velocityOffset = Utils.randomFloatBetween(0, 0.6);
  me.TRAVEL_VELOCITY = 0.45;

  var calculatedDimensions = (function() {
    var w = dimension.width * (me.velocityOffset + 0.6),
        h = dimension.height * (me.velocityOffset + 0.6);
    return {
      width: w, height: h
    }
  })()

  me.__proto__ = new Entity(
      Constants.ENTITY_TYPES.get('cloud'), position, calculatedDimensions);

  me.draw = function() {
    var ctx = Constants.CONTEXT2D;
    ctx.lineWidth = 0.40;
    ctx.strokeStyle = 'black';
    ctx.strokeRect(
        me.position.getX(), me.position.getY(), me.dimension.width,
        me.dimension.height);
  };

  me.isEnabled = function() {
    return me.position.getY() < (Constants.CANVAS_HEIGHT + me.dimension.height);
  };

  me.update = function() {
    var dt = Variables.frameClock.dt
    me.position.setY(
        me.position.getY() + (me.TRAVEL_VELOCITY + me.velocityOffset) * dt);
  };

  me.reset = function() {
    var ctx = Constants.CONTEXT2D;
    me.position.setX(Utils.randomBetween(1, Constants.CANVAS_WIDTH - 1));
    me.position.setY(-me.dimension.height);
    ctx.clearRect(
        me.position.getX(), me.position.getY(), me.dimension.width,
        me.dimension.height)
  };
}
