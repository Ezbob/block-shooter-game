import Constants from '../sharedConstants.js';
import Vector from '../dataStructures/vector.js';
import Entity from '../dataStructures/entity.js';

export default function HealthBar(player) {
  var consts = Constants;
  var me = this;
  me.__proto__ = new Entity(consts.ENTITY_TYPES.get('uiProp'));

  me.position =
      new Vector(20, consts.CANVAS_HEIGHT - (consts.CANVAS_HEIGHT >> 4));
  me.dimension = {width: 150, height: 20};

  me.beads = (function() {
    var maxBeads = 8;

    return {
      max: maxBeads,
      number: Math.ceil(
          player.health.current / Math.floor(player.health.max / maxBeads)),
      dimension: {
        width: me.dimension.width / maxBeads,
        height: me.dimension.height - 2
      }
    };
  })();

  me.colors = {
    ok: 'rgb(103, 229, 25)',
    warning: 'rgb(255, 203, 33)',  //'rgb(239, 228, 9)',
    critical: 'rgb(219, 6, 6)',
    border: 'rgb(19, 25, 53)'
  };

  me.update = function() {
    me.beads.number = Math.ceil(
        player.health.current / Math.floor(player.health.max / me.beads.max))
  };

  me.draw = function() {
    var ctx = Constants.CONTEXT2D;
    var startPosition = me.position.getX() + 3;

    function getColor(colors, numberOfBeads, maxBeads) {
      var mid = Math.floor(maxBeads * 0.5);
      var lower = Math.floor(maxBeads * 0.25);
      if (numberOfBeads > mid) {
        return colors.ok;
      } else if (numberOfBeads <= mid && numberOfBeads > lower) {
        return colors.warning;
      } else {
        return colors.critical;
      }
    }

    var oldstroke = ctx.strokeStyle;
    ctx.strokeStyle = me.colors.border;
    ctx.strokeRect(
        me.position.getX(), me.position.getY(), me.dimension.width,
        me.dimension.height);

    var old = ctx.fillStyle;
    var oldFont = ctx.font;
    var color = getColor(me.colors, me.beads.number, me.beads.max);
    ctx.fillStyle = color;

    for (var i = 1; i <= me.beads.number; ++i) {
      ctx.fillRect(
          startPosition, me.position.getY() + 2, me.beads.dimension.width - 5,
          me.beads.dimension.height - 2);
      startPosition += me.beads.dimension.width;
    }

    ctx.font = '14px Helvetica';
    ctx.textAlign = 'start';
    ctx.fillText('power', me.position.getX(), me.position.getY() - 8);

    ctx.fillStyle = old;
    ctx.strokeStyle = oldstroke;
    ctx.font = oldFont;
  };
};