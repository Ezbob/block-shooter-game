import Entity from '../dataStructures/entity.js';
import SinePath from '../dataStructures/sinePath.js';
import Vector from '../dataStructures/vector.js';
import Debug from '../debug.js';
import Constants from '../sharedConstants.js';
import Variables from '../sharedVariables.js';
import Utils from '../utils.js';
import ShotCollection from './shotCollection.js';

export default class Weako extends Entity {
  constructor(player) {
    super(Constants.ENTITY_TYPES.get('enemy'));
    this.player = player;

    this.gun = {limit: 6, velocity: 1.22, timeInBetween: 400, previous_time: 0};

    this.shots = new ShotCollection(this.gun.limit, 1);
    this.dimension = {width: 32, height: 32};
    this.position =
        new Vector(Constants.CANVAS_WIDTH - this.dimension.width, 40);
    this.color = 'red';
    this.health = {current: 200, max: 200};
    this.velocity = new Vector(0.2, 0.1);
    this.reverse = false;

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
    this.shots.draw();
    var ctx = Variables.canvasManager.getCanvasContext();
    var old = ctx.fillStyle;
    ctx.fillStyle = this.color;
    ctx.fillRect(
        this.position.x, this.position.y, this.dimension.width,
        this.dimension.height);
    ctx.fillStyle = old;

    Debug.drawPath(this.path.points)
    Debug.drawLine(this.position, this.next_waypoint, 'green');
  };

  shoot() {
    if ( (Variables.frameClock.now - this.gun.previous_time) >= this.gun.timeInBetween ) {
      this.gun.previous_time = Variables.frameClock.now;
      this.shots.fire_next(this);
    }
  };

  travel(dt) {
    var displacement = this.next_waypoint.sub(this.position);
    var distance = displacement.magnitude();
    var unitDisplacement = displacement.norm();

    this.position.addMut(unitDisplacement.mulMembers(this.velocity.mul(dt)));

    if (this.path.points.next_index === (this.path.points.length - 1) &&
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
    this.travel(dt);
    
    this.shots.update()

    if (/*x >= player.position.x - 10 &&
        x <= (player.position.x + player.dimension.width) + 10 && */
        player.isEnabled()) {
      this.shoot();
    }

    var shots = this.shots.buffer;
    for (var i = 0; i < shots.size; ++i) {
      var shot = shots.next();
      if (shot.isEnabled() && Utils.intersectingRectangles(player, shot)) {
        player.health.current -= shot.damage;
        shot.reset();
      }
    }
    
  };
}