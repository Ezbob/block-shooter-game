import Entity from '../dataStructures/entity.js';
import SinePath from '../dataStructures/sinePath.js';
import Vector from '../dataStructures/vector.js';
import Debug from '../debug.js';
import Constants from '../sharedConstants.js';
import Variables from '../sharedVariables.js';
import Utils from '../utils.js';

export default class Weako extends Entity {
  constructor(player, shots) {
    super(Constants.ENTITY_TYPES.get('enemy'));
    this.player = player;
    this.shots = shots;
    this.dimension = {width: 32, height: 32};
    this.position =
        new Vector(Constants.CANVAS_WIDTH - this.dimension.width, 40);
    this.color = 'red';
    this.health = {current: 200, max: 200};
    this.velocity = new Vector(0.2, 0.1);
    this.reverse = false;

    this.gun = {limit: 5};

    this.path = new SinePath(
        this.position.add(new Vector(1, 1)), new Vector(2, 40), 30, 20, 4);
    this.next_waypoint = this.path.next();
  }

  hasReachedNextPoint(closeness) {
    if (this.next_waypoint !== null) {
      return closeness <= 15;  // using some lower bound on closeness
    }
    return false;
  };

  isEnabled() {
    return this.health.current > 0;
  };

  draw() {
    var ctx = Variables.canvasManager.getCanvasContext();
    var old = ctx.fillStyle;
    ctx.fillStyle = this.color;
    ctx.fillRect(
        this.position.getX(), this.position.getY(), this.dimension.width,
        this.dimension.height);
    ctx.fillStyle = old;

    Debug.drawPath(this.path.points.buffer)
    Debug.drawLine(this.position, this.next_waypoint, 'green');
  };

  shoot() {
    this.shots.next().fire(this);
  };

  travel(dt) {
    var displacement = this.next_waypoint.sub(this.position);
    var distance = displacement.magnitude();
    var unitDisplacement = displacement.norm();

    this.position.addMut(unitDisplacement.mulMembers(this.velocity.mul(dt)));

    if (this.path.points.next_index === (this.path.points.length() - 1) &&
        !this.reverse) {
      this.reverse = true;
    }

    if (this.path.points.next_index === 0 && this.reverse) {
      this.reverse = false;
    }

    if (this.hasReachedNextPoint(distance) && !this.reverse) {
      this.next_waypoint = this.path.next();
    }

    if (this.hasReachedNextPoint(distance) && this.reverse) {
      this.next_waypoint = this.path.prev();
    }
  };

  update() {
    var dt = Variables.frameClock.dt
    var player = this.player;
    var x = this.position.getX();

    this.travel(dt);

    if (x >= player.position.getX() - 10 &&
        x <= (player.position.getX() + player.dimension.width) + 10 &&
        player.isEnabled()) {
      this.shoot();
    }

    var shots = this.shots;
    for (var i = 0; i < shots.size; ++i) {
      var shot = shots.next();
      if (shot.isEnabled() && Utils.intersectingRectangles(this, shot)) {
        this.health.current -= shot.damage;
        shot.reset();
      }
    }
  };
}