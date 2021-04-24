import {DrawableComponent} from '../components/DrawableComponent';
import {PathComponent} from '../components/PathComponent';
import {PositionalComponent} from '../components/PositionalComponent';
import {EntityManager} from '../dataStructures/EntityManager';
import {GameContext} from '../GameContext';
import {Vec2dAdd, Vec2dMul} from '../VectorOperations';
import {ISystem} from './ISystem';

export class DrawingSystem implements ISystem {
  update(gctx: GameContext): void {
    let ctx = gctx.canvasManager.getCanvasContext();

    ctx.clearRect(
        0, 0, gctx.canvasManager.canvasWidth, gctx.canvasManager.canvasHeight);

    /**
     * Painter's algorithm
     * Sort the the drawable component by priority to order the drawing
     */
    EntityManager.sort((aEntity, bEntity) => {
      let aDrawComp = aEntity.getComponentByType(DrawableComponent);
      let bDrawComp = bEntity.getComponentByType(DrawableComponent);

      if (aDrawComp && bDrawComp) {
        return aDrawComp.priority - bDrawComp.priority;
      }
      return 0;
    });

    for (let entity of EntityManager) {
      let drawComp = entity.getComponentByType(DrawableComponent);
      let posComp = entity.getComponentByType(PositionalComponent);
      let pathComp = entity.getComponentByType(PathComponent);

      if (posComp && drawComp) {
        if (drawComp.isFilled) {
          ctx.fillStyle = drawComp.color;
          ctx.fillRect(
              posComp.position.x, posComp.position.y, posComp.dimension.x,
              posComp.dimension.y);
        } else {
          ctx.strokeStyle = drawComp.color;
          ctx.strokeRect(
              posComp.position.x, posComp.position.y, posComp.dimension.x,
              posComp.dimension.y);
        }
      }

      if (posComp) {
        gctx.debugging.drawLineBetween(
            gctx.canvasManager,
            posComp.position,
            Vec2dAdd(posComp.position, Vec2dMul(posComp.velocity, 4))
        );
      }

      if (pathComp) {
        for (let p of pathComp.path) {
          gctx.debugging.drawPoint(gctx.canvasManager, p);
          gctx.debugging.drawCircle(gctx.canvasManager, p, 5);
        }
      }
    }
  }
};