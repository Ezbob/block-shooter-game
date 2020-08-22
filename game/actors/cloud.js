
export default function Cloud(dimension, position) {
  var me = this;
  me.velocityOffset = utils.randomFloatBetween(0, 0.6);

  var calculatedDimensions = (function() {
    var w = dimension.width * (me.velocityOffset + 0.6),
        h = dimension.height * (me.velocityOffset + 0.6);
    return {
      width: w, height: h
    }
  })()

  me.__proto__ = new Entity(
      consts.ENTITY_TYPES.get('cloud'), position, calculatedDimensions);

  me.draw = function() {
    ctx.lineWidth = 0.40;
    ctx.strokeStyle = 'black';
    ctx.strokeRect(
        me.position.getX(), me.position.getY(), me.dimension.width,
        me.dimension.height);
  };

  me.isEnabled = function() {
    return me.position.getY() <
        (game.constants.CANVAS_HEIGHT + me.dimension.height);
  };

  me.update = function() {
    me.position.setY(
        me.position.getY() +
        (game.constants.TRAVEL_VELOCITY + me.velocityOffset) *
            game.variables.dt);
  };

  me.reset = function() {
    me.position.setX(utils.randomBetween(1, consts.CANVAS_WIDTH - 1));
    me.position.setY(-me.dimension.height);
    ctx.clearRect(
        me.position.getX(), me.position.getY(), me.dimension.width,
        me.dimension.height)
  };
}
