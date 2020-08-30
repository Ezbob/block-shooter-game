import DimensionalComponent from '../components/dimensionalComponent.js';
import DrawableComponent from '../components/drawableComponent.js';
import PositionComponent from '../components/positionalComponent.js';
import entityManager from '../dataStructures/entityManager.js';
import Variables from '../sharedVariables.js'

export default class DrawingSystem {
  update() {
    let entities = entityManager.getEntitiesByComponents(
        DimensionalComponent, DrawableComponent, PositionComponent);
    var ctx = Variables.canvasManager.getCanvasContext();


    for (let entity of entities) {
      let [dimensionalComponent, drawComponent, positionComponent] = entity;

      if (drawComponent.isFilled) {
        let old = ctx.fillStyle;
        ctx.fillStyle = drawComponent.color;
        ctx.fillRect(
            positionComponent.position.x, positionComponent.position.y,
            dimensionalComponent.dimension.x, dimensionalComponent.dimension.y);
        ctx.fillStyle = old;
      } else {
        let old = ctx.strokeStyle;
        ctx.strokeStyle = drawComponent.color;
        ctx.strokeRect(
            positionComponent.position.x, positionComponent.position.y,
            dimensionalComponent.dimension.x, dimensionalComponent.dimension.y);
        ctx.strokeStyle = old;
      }
    }
  }
};