import {CanvasBoundaryComponent} from '../components/CanvasBoundaryComponent';
import { DimensionComponent } from '../components/DimensionComponent';
import {FrictionComponent} from '../components/FrictionComponent';
import {PositionalComponent} from '../components/PositionalComponent';
import { VelocityComponent } from '../components/VelocityComponent';
import {GameContext} from '../GameContext';
import {Vec2dAdd, Vec2dMul, Vec2dMulMut} from '../VectorOperations';

import {ISystem} from './ISystem';

export class MovementSystem implements ISystem {
  update(gtx: GameContext) {
    for (let e of gtx.entityManager) {
      let positionComp = e.getComponent(PositionalComponent);
      let velocityComp = e.getComponent(VelocityComponent)
      let collisionComp = e.getComponent(CanvasBoundaryComponent);
      let frictionComp = e.getComponent(FrictionComponent);
      let dimensionComp = e.getComponent(DimensionComponent)

      const canvasWidth = gtx.canvasManager.canvasWidth;
      const canvasHeight = gtx.canvasManager.canvasHeight;

      if (positionComp && collisionComp && velocityComp && frictionComp) {

        let nextPos = Vec2dAdd(positionComp, Vec2dMul(velocityComp, 1 - frictionComp.frictionBreakingForce) );

        if (collisionComp.canvasPaddingX.x > nextPos.x) {
          positionComp.x = collisionComp.canvasPaddingX.x;
          velocityComp.x = 0;
        }
        if (nextPos.x + dimensionComp.x > canvasWidth - collisionComp.canvasPaddingX.y) {
          positionComp.x = (canvasWidth - dimensionComp.x - collisionComp.canvasPaddingX.y);
          velocityComp.x = 0;
        }

        if (collisionComp.canvasPaddingY.x > nextPos.y) {
          positionComp.y = collisionComp.canvasPaddingY.x;
          velocityComp.y = 0;
        }
        if (nextPos.y + dimensionComp.y > canvasHeight - collisionComp.canvasPaddingY.y) {
          positionComp.y = (canvasHeight - dimensionComp.y - collisionComp.canvasPaddingY.y);
          velocityComp.y = 0;
        }
      }

      if (frictionComp && positionComp) {
        Vec2dMulMut(velocityComp, 1 - frictionComp.frictionBreakingForce);
      }

      if (positionComp && velocityComp) {
        positionComp.x += velocityComp.x;
        positionComp.y += velocityComp.y;
      }
    }
  }
};