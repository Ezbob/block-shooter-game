import DimensionalComponent from '../components/DimensionalComponent';
import DrawableComponent from '../components/DrawableComponent';
import PositionComponent from '../components/PositionalComponent';
import entityManager from '../dataStructures/EntityManager';
import Variables from '../sharedVariables'
import ISystem from './ISystem';

export default class DrawingSystem implements ISystem {
  update(): void {
    let entities = entityManager.getEntitiesByComponents(
        DimensionalComponent, DrawableComponent, PositionComponent);
    var ctx = Variables.canvasManager.getCanvasContext();


    for (let [dimensionalComponent, drawComponent, positionComponent] of
             entities) {
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