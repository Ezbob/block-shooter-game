import DimensionalComponent from '../components/DimensionalComponent';
import DrawableComponent from '../components/DrawableComponent';
import PositionComponent from '../components/PositionalComponent';
import EntityManager from '../dataStructures/EntityManager';
import Variables from '../SharedVariables'

import ISystem from './ISystem';

export default class DrawingSystem implements ISystem {
  update(): void {
    let entities = EntityManager.filterEntitiesByComponentTypes(
        DimensionalComponent, DrawableComponent, PositionComponent);

    entities.sort((a, b) => {
      let aDrawComp = a.getComponentByType(DrawableComponent);
      let bDrawComp = b.getComponentByType(DrawableComponent);
      return aDrawComp.priority - bDrawComp.priority;
    });

    let ctx = Variables.canvasManager.getCanvasContext();
    for (let entity of entities) {
      let drawComp = entity.getComponentByType(DrawableComponent);
      let dimenComp = entity.getComponentByType(DimensionalComponent);
      let posComp = entity.getComponentByType(PositionComponent);

      if (drawComp.isFilled) {
        let old = ctx.fillStyle;
        ctx.fillStyle = drawComp.color;
        ctx.fillRect(
            posComp.position.x, posComp.position.y, dimenComp.dimension.x,
            dimenComp.dimension.y);
        ctx.fillStyle = old;
      } else {
        let old = ctx.strokeStyle;
        ctx.strokeStyle = drawComp.color;
        ctx.strokeRect(
            posComp.position.x, posComp.position.y, dimenComp.dimension.x,
            dimenComp.dimension.y);
        ctx.strokeStyle = old;
      }
    }
  }
};