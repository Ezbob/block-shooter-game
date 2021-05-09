import { DimensionComponent } from '../components/DimensionComponent';
import {DrawableComponent} from '../components/DrawableComponent';
import {PathComponent} from '../components/PathComponent';
import {PositionalComponent} from '../components/PositionalComponent';
import { ShakeComponent } from '../components/ShakeComponent';
import { VelocityComponent } from '../components/VelocityComponent';
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
    gctx.entityManager.data.sort((aEntity, bEntity) => {
      let aDrawComp = aEntity.getComponent(DrawableComponent);
      let bDrawComp = bEntity.getComponent(DrawableComponent);

      if (aDrawComp && bDrawComp) {
        return aDrawComp.priority - bDrawComp.priority;
      }
      return 0;
    });

    for (let entity of gctx.entityManager) {
      let shake = entity.getComponent(ShakeComponent)

      if (shake) {
        let dt = gctx.frameClock.now - shake.startTime

        if (dt > shake.duration) {
          entity.removeComponent(ShakeComponent)
          break
        }

        let easingCoef = dt / shake.duration;
        let easing = Math.pow(easingCoef - 1, 3) + 1;

        let dx = easing * (Math.cos(dt * 0.1 ) + Math.cos(dt * 0.3115)) * 15;
        let dy = easing * (Math.sin(dt * 0.05) + Math.sin(dt * 0.057113)) * 15;

        ctx.setTransform(
          1,  0,  0,
          1, dx, dy,
        //0,  0,  1,
        )
      }
    }

    for (let entity of gctx.entityManager) {
      let drawComp = entity.getComponent(DrawableComponent);
      let posComp = entity.getComponent(PositionalComponent);
      let pathComp = entity.getComponent(PathComponent);
      let dimensionComp = entity.getComponent(DimensionComponent)
      let velocityComp = entity.getComponent(VelocityComponent)

      if (posComp && drawComp && dimensionComp) {
        if (drawComp.isFilled) {
          ctx.fillStyle = drawComp.color;
          ctx.fillRect(posComp.x, posComp.y, dimensionComp.x, dimensionComp.y);
        } else {
          ctx.strokeStyle = drawComp.color;
          ctx.strokeRect(posComp.x, posComp.y, dimensionComp.x, dimensionComp.y);
        }
      }

      if (posComp && velocityComp) {
        gctx.debugging.drawLineBetween(
            gctx.canvasManager,
            posComp,
            Vec2dAdd(posComp, Vec2dMul(velocityComp, 0.1))
        );
      }

      if (pathComp) {
        for (let p of pathComp.path) {
          gctx.debugging.drawPoint(gctx.canvasManager, p);
          gctx.debugging.drawCircle(gctx.canvasManager, p, 5);
        }
      }
    }

    ctx.setTransform(1, 0, 0, 1, 0, 0)
  }
};