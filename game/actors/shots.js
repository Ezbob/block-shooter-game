import sharedData from './sharedData.js'

export default function Shot() {
  let consts = sharedData.constants;
  var me = this;
  me.__proto__ = new Entity(consts.ENTITY_TYPES.get('shot'));

  me.shooter = null;
  me.color = '#FF5800';
  me.isFired = false;
  me.dimension = {width: 6, height: 10};
  me.position = new Vector(0, 0);
  me.velocity = 0.7;
  me.direction = -1;
  me.damage = 10;
  me.translater = new Vector(0, 0);


  me.fire = function(shooter) {
    me.shooter = shooter;
    var sX = me.shooter.position.getX(), sY = me.shooter.position.getY();
    var sW = me.shooter.dimension.width, sH = me.shooter.dimension.height;
    var meW = me.dimension.width, meH = me.dimension.height;
    me.position.setX(sX + (sW >> 1) - (meW >> 1));

    if (shooter.type === consts.ENTITY_TYPES.get('enemy')) {
      me.position.setY(sY + sH + meH);
      me.velocity = Math.max(me.velocity, me.velocity * -1);
      me.direction = 1;
    } else {
      me.position.setY((sY - sH));
      me.velocity = Math.min(me.velocity, me.velocity * -1);
      me.direction = -1;
    }

    me.isFired = true;
  };

  me.isEnabled = function() {
    return (me.position.getY() > -5 ||
            me.position.getY() < consts.CANVAS_HEIGHT - 10) &&
        me.isFired;
  };

  me.draw = function() {
    var old = ctx.fillStyle
    ctx.fillStyle = me.color;
    var translated = me.position.add(me.translater);
    ctx.fillRect(
        translated.getX(), translated.getY(), me.dimension.width,
        me.dimension.height);
    ctx.fillStyle = old;
  };

  me.update = function() {
    me.position.addme(new Vector(
        me.shooter.velocity.getX(), me.velocity * game.variables.dt));
  };

  me.reset = function() {
    me.position = new Vector(0, 0);
    me.isFired = false;
    me.shooter = null;
  };
};