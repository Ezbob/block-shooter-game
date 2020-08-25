import Entity from '../dataStructures/entity.js';
import Vector from '../dataStructures/vector.js';
import Constants from '../sharedConstants.js';
import Variables from '../sharedVariables.js';

export default class Shot extends Entity {
  constructor() {
    super(Constants.ENTITY_TYPES.get('shot'));
    this.shooter = null;
    this.color = '#FF5800';
    this.isFired = false;
    this.dimension = {width: 6, height: 10};
    this.position = new Vector(0, 0);
    this.velocity = 0.7;
    this.direction = -1;
    this.damage = 10;
    this.translater = new Vector(0, 0);
  }

  fire(shooter) {
    this.shooter = shooter;
    var sX = this.shooter.position.x, sY = this.shooter.position.y;
    var sW = this.shooter.dimension.width, sH = this.shooter.dimension.height;
    var meW = this.dimension.width, meH = this.dimension.height;
    this.position.x = (sX + (sW >> 1) - (meW >> 1));

    if (shooter.type === Constants.ENTITY_TYPES.get('enemy')) {
      this.position.y = (sY + sH + meH);
      this.velocity = Math.max(this.velocity, this.velocity * -1);
      this.direction = 1;
    } else {
      this.position.y = ((sY - sH));
      this.velocity = Math.min(this.velocity, this.velocity * -1);
      this.direction = -1;
    }

    this.isFired = true;
  };

  isEnabled() {
    return (this.position.y > -5 ||
            this.position.y < Constants.CANVAS_HEIGHT - 10) &&
        this.isFired;
  };

  draw() {
    let ctx = Variables.canvasManager.getCanvasContext();
    var old = ctx.fillStyle
    ctx.fillStyle = this.color;
    var translated = this.position.add(this.translater);
    ctx.fillRect(
        translated.x, translated.y, this.dimension.width,
        this.dimension.height);
    ctx.fillStyle = old;
  };

  update() {
    var dt = Variables.frameClock.dt;
    this.position.addMutScalars(
        this.shooter.velocity.x, this.velocity * dt);
  };

  reset() {
    this.position = new Vector(0, 0);
    this.isFired = false;
    this.shooter = null;
  };
};