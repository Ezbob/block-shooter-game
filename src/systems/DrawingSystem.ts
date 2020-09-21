import DimensionalComponent from '../components/DimensionalComponent';
import DrawableComponent from '../components/DrawableComponent';
import PathComponent from '../components/PathComponent';
import PositionComponent from '../components/PositionalComponent';
import EntityManager from '../dataStructures/EntityManager';
import Debug from '../Debug';
import SharedConstants from '../SharedConstants';
import Variables from '../SharedVariables'

import ISystem from './ISystem';

export default class DrawingSystem implements ISystem {
  update(): void {
    let ctx = Variables.canvasManager.getCanvasContext();

    ctx.clearRect(
        0, 0, SharedConstants.CANVAS_WIDTH, SharedConstants.CANVAS_HEIGHT);

    EntityManager.sort((a, b) => {
      let aDrawComp = a.getComponentByType(DrawableComponent);
      let bDrawComp = b.getComponentByType(DrawableComponent);

      if (!(aDrawComp && bDrawComp)) {
        return 0;
      } else if (!aDrawComp || !bDrawComp) {
        if (aDrawComp) {
          return -1;
        } else {
          return 1;
        }
      }

      return aDrawComp.priority - bDrawComp.priority;
    });

    for (let entity of EntityManager) {
      let drawComp = entity.getComponentByType(DrawableComponent);
      let dimenComp = entity.getComponentByType(DimensionalComponent);
      let posComp = entity.getComponentByType(PositionComponent);
      let pathComp = entity.getComponentByType(PathComponent);

      if (posComp && drawComp && dimenComp) {
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

      if (posComp) {
        Debug.drawLineBetween(
            posComp.position, posComp.position.add(posComp.velocity.mul(4)));
      }

      if (pathComp) {
        for (let p of pathComp.path) {
          Debug.drawPoint(p);
        }
      }
    }
  }
};