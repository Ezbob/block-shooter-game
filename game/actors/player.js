import Entity from '../dataStructures/entity.js';
import Vector from '../dataStructures/vector.js';
import Constants from '../sharedConstants.js';
import Variables from '../sharedVariables.js';
import utils from '../utils.js';
import ShotCollection from './shotCollection.js';

export default class Player extends Entity {
  constructor() {
    super(Constants.ENTITY_TYPES.get('player'));

    this.BASE_VELOCITY = {x: 2, y: 2};
    this.shots = new ShotCollection(50);

    this.health = {current: 400, max: 400};
    this.color = 'rgb(0,8,255)';
    this.velocity = new Vector(this.BASE_VELOCITY.x, this.BASE_VELOCITY.y);
    this.acceleration = new Vector(0.5, 0.5);
    this.velocityLimit = 0.55;
    this.dimension = {width: 32, height: 32};
    this.position = new Vector(
        Constants.CANVAS_WIDTH / 2 - 32,
        Constants.CANVAS_HEIGHT - (Constants.CANVAS_HEIGHT / 6));
    this.gun =
        {limit: 50, velocity: 1.22, timeInBetween: 100, previous_time: 0};
  }

  isEnabled() {
    return this.health.current > 0;
  };

  draw() {
    this.shots.draw();
    var ctx = Variables.canvasManager.getCanvasContext();
    if (this.isEnabled()) {
      var old = ctx.fillStyle;
      ctx.fillStyle = this.color;
      ctx.fillRect(
          this.position.x, this.position.y, this.dimension.width,
          this.dimension.height);
      ctx.fillStyle = old;
    }
  };

  move(directX, directY) {
    var dt = Variables.frameClock.dt;
    var x = this.position.x, y = this.position.y;
    var xVel = this.velocity.x, yVel = this.velocity.y;

    var oldV = this.velocity.x;
    this.velocity.x =
        (Math.min(oldV + this.acceleration.x * dt, this.velocityLimit));
    var nextPosition = x + directX * dt * (oldV + xVel) / 2;
    var myLeft = nextPosition + this.dimension.width;
    if (nextPosition > 0 && myLeft <= Constants.CANVAS_WIDTH) {
      this.position.x = (nextPosition);
    } else if (myLeft > Constants.CANVAS_WIDTH) {
      this.position.x = (Constants.CANVAS_WIDTH - this.dimension.width);
    } else {
      this.position.x = (0)
    }

    var oldV = this.velocity.y;
    this.velocity.y =
        (Math.min(oldV + this.acceleration.y * dt, this.velocityLimit));
    var nextPosition = y + directY * dt * (oldV + yVel) / 2;
    var myBottom = nextPosition + this.dimension.height;
    if (nextPosition > 0 && myBottom <= Constants.CANVAS_HEIGHT) {
      this.position.y = (nextPosition);
    } else if (myBottom > Constants.CANVAS_HEIGHT) {
      this.position.y = (Constants.CANVAS_HEIGHT - this.dimension.height);
    } else {
      this.position.y = (0);
    }
  };

  shoot() {
    if ((Variables.frameClock.now - this.gun.previous_time) >=
        this.gun.timeInBetween) {
      this.gun.previous_time = Variables.frameClock.now;
      this.shots.fire_next(this);
    }
  };

  update() {
    this.shots.update()

    /*
    var shots = this.shots;
    for (var i = 0; i < shots.size; ++i) {
      var shot = shots.next();
      if (shot.isEnabled() && utils.intersectingRectangles(this, shot)) {
        this.health.current -= shot.damage;
        shot.reset();
      }
    }
    */
  };
};