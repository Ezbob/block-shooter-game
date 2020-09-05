import DimensionalComponent from '../components/DimensionalComponent';
import DrawableComponent from '../components/DrawableComponent';
import PositionComponent from '../components/PositionalComponent';
import EntityManager from '../dataStructures/EntityManager';
import Variables from '../SharedVariables'

import ISystem from './ISystem';

export default class DrawingSystem implements ISystem {
  update(): void {
    let entities = EntityManager.getEntitiesByComponents(
        DimensionalComponent, DrawableComponent, PositionComponent);

    entities.sort((a, b) => {
      return a[1].priority - b[1].priority;
    });

    let ctx = Variables.canvasManager.getCanvasContext();
    for (let d of entities) {
      let drawComp = d[1] as DrawableComponent;
      let dimenComp = d[0] as DimensionalComponent;
      let posComp = d[2] as PositionComponent;

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