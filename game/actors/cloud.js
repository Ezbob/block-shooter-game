import Entity from '../dataStructures/entity.js';
import Constants from '../sharedConstants.js';
import Variables from '../sharedVariables.js';
import Utils from '../utils.js';

export default class Cloud extends Entity {
  constructor(dimension, position) {
    let velocityOffset = Utils.randomFloatBetween(0, 0.6);
    super(Constants.ENTITY_TYPES.get('cloud'), position, {
      width: dimension.width * (velocityOffset + 0.6),
      height: dimension.height * (velocityOffset + 0.6)
    });
    this.dimension = dimension;
    this.position = position;
    this.velocityOffset = velocityOffset;
    this.TRAVEL_VELOCITY = 0.45;
  }

  draw() {
    var ctx = Variables.canvasManager.getCanvasContext();
    ctx.lineWidth = 0.40;
    ctx.strokeStyle = 'black';
    ctx.strokeRect(
        this.position.x, this.position.y, this.dimension.width,
        this.dimension.height);
  }

  isEnabled() {
    return this.position.y < (Constants.CANVAS_HEIGHT + this.dimension.height);
  }

  update() {
    var dt = Variables.frameClock.dt;
    this.position.y =
        (this.position.y + (this.TRAVEL_VELOCITY + this.velocityOffset) * dt);
  }

  reset() {
    var ctx = Variables.canvasManager.getCanvasContext();
    this.position.x = (Utils.randomBetween(1, Constants.CANVAS_WIDTH - 1));
    this.position.y = (-this.dimension.height);
    ctx.clearRect(
        this.position.x, this.position.y, this.dimension.width,
        this.dimension.height)
  }
}
