import CircularBuffer from '../dataStructures/circularBuffer.js';
import Entity from '../dataStructures/entity.js';
import Vector2D from '../dataStructures/vector2D.js';
import Constants from '../sharedConstants.js';
import Variables from '../sharedVariables.js';

class Shot extends Entity {
  constructor(options) {
    super(Constants.ENTITY_TYPES.get('shot'));
    this.shooter = null;
    this.color = options.color || '#FF5800';
    this.isFired = false;
    this.dimension = options.dimension || {width: 6, height: 10};
    this.position = new Vector2D(0, 0);
    this.velocity = options.velocity || 0.5;
    this.direction = options.direction || -1;
    this.damage = 10;
    this.translator = new Vector2D(0, 0);
  }

  fire(shooter) {
    this.shooter = shooter;
    var sX = this.shooter.position.x, sY = this.shooter.position.y;
    var sW = this.shooter.dimension.width, sH = this.shooter.dimension.height;
    var meW = this.dimension.width, meH = this.dimension.height;
    this.position.x = (sX + (sW >> 1) - (meW >> 1));

    if (this.direction === 1) {
      this.position.y = (sY + sH + meH);
      this.velocity = Math.max(this.velocity, this.velocity * -1);
    } else {
      this.position.y = ((sY - sH));
      this.velocity = Math.min(this.velocity, this.velocity * -1);
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
    var translated = this.position.add(this.translator);
    ctx.fillRect(
        translated.x, translated.y, this.dimension.width,
        this.dimension.height);
    ctx.fillStyle = old;
  };

  update() {
    var dt = Variables.frameClock.dt;
    this.position.addMutScalars(this.shooter.velocity.x, this.velocity);
  };

  reset() {
    this.position = new Vector2D(0, 0);
    this.isFired = false;
    this.shooter = null;
  };
};


export default class ShotCollection {
  constructor(maxShots, direction) {
    this.maxShots = maxShots;
    this.buffer = new CircularBuffer(maxShots);
    for (var i = 0; i < this.maxShots; ++i) {
      this.buffer.push(new Shot({direction}));
    }
  }

  fire_next(shooter) {
    this.buffer.next().fire(shooter);
  }

  update() {
    var size = this.buffer.size;
    for (var i = 0; i < size; i++) {
      var current1 = this.buffer.next();
      if (current1.isEnabled()) {
        current1.update();
      } else {
        current1.reset();
      }
    }
  };

  draw() {
    for (let current of this.buffer) {
      if (current.isEnabled()) {
        current.draw();
      }
    }
  };
};