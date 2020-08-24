import Entity from '../dataStructures/entity.js';
import Vector from '../dataStructures/vector.js';
import Constants from '../sharedConstants.js';
import Variables from '../sharedVariables.js';

export default class HealthBar extends Entity {

  constructor(player) {
    super(Constants.ENTITY_TYPES.get('uiProp'));
    this.player = player;
    this.position = new Vector(
        20, Constants.CANVAS_HEIGHT - (Constants.CANVAS_HEIGHT >> 4));
    this.dimension = {width: 150, height: 20};

    var maxBeads = 8;
    this.beads = {
      max: maxBeads,
      number: Math.ceil(
          this.player.health.current /
          Math.floor(this.player.health.max / maxBeads)),
      dimension: {
        width: this.dimension.width / maxBeads,
        height: this.dimension.height - 2
      }
    };

    this.colors = {
      ok: 'rgb(103, 229, 25)',
      warning: 'rgb(255, 203, 33)',  //'rgb(239, 228, 9)',
      critical: 'rgb(219, 6, 6)',
      border: 'rgb(19, 25, 53)'
    };
  }

  update() {
    this.beads.number = Math.ceil(
        this.player.health.current /
        Math.floor(this.player.health.max / this.beads.max))
  };

  draw() {
    var ctx = Variables.canvasManager.getCanvasContext();
    var startPosition = this.position.getX() + 3;

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
    ctx.strokeStyle = this.colors.border;
    ctx.strokeRect(
        this.position.getX(), this.position.getY(), this.dimension.width,
        this.dimension.height);

    var old = ctx.fillStyle;
    var oldFont = ctx.font;
    var color = getColor(this.colors, this.beads.number, this.beads.max);
    ctx.fillStyle = color;

    for (var i = 1; i <= this.beads.number; ++i) {
      ctx.fillRect(
          startPosition, this.position.getY() + 2,
          this.beads.dimension.width - 5, this.beads.dimension.height - 2);
      startPosition += this.beads.dimension.width;
    }

    ctx.font = '14px Helvetica';
    ctx.textAlign = 'start';
    ctx.fillText('power', this.position.getX(), this.position.getY() - 8);

    ctx.fillStyle = old;
    ctx.strokeStyle = oldstroke;
    ctx.font = oldFont;
  };
};