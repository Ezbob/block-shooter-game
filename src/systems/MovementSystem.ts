import {CanvasBoundaryComponent} from '../components/CanvasBoundaryComponent';
import {FrictionComponent} from '../components/FrictionComponent';
import {DynamicPositionalComponent} from '../components/DynamicPositionalComponent';
import {GameContext} from '../GameContext';
import {Vec2dAdd, Vec2dMul, Vec2dMulMut} from '../VectorOperations';

import {ISystem} from './ISystem';

export class MovementSystem implements ISystem {
  update(gtx: GameContext) {
    for (let e of gtx.entityManager) {
      let positionComp = e.getComponent(DynamicPositionalComponent);
      let collisionComp = e.getComponent(CanvasBoundaryComponent);
      let frictionComp = e.getComponent(FrictionComponent);

      const canvasWidth = gtx.canvasManager.canvasWidth;
      const canvasHeight = gtx.canvasManager.canvasHeight;

      if (positionComp && collisionComp) {

        let nextPos = Vec2dAdd(positionComp.position, Vec2dMul(positionComp.velocity, 1 - positionComp.breakingForcePercentage ) );

        if (collisionComp.canvasPaddingX.x > nextPos.x) {
          positionComp.position.x = collisionComp.canvasPaddingX.x;
          positionComp.velocity.x = 0;
        }
        if (nextPos.x + positionComp.dimension.x >
          canvasWidth - collisionComp.canvasPaddingX.y) {
          positionComp.position.x =
              (canvasWidth - positionComp.dimension.x -
               collisionComp.canvasPaddingX.y);
          positionComp.velocity.x = 0;
        }

        if (collisionComp.canvasPaddingY.x > nextPos.y) {
          positionComp.position.y = collisionComp.canvasPaddingY.x;
          positionComp.velocity.y = 0;
        }
        if (nextPos.y + positionComp.dimension.y > canvasHeight - collisionComp.canvasPaddingY.y) {
          positionComp.position.y = (canvasHeight - positionComp.dimension.y - collisionComp.canvasPaddingY.y);
          positionComp.velocity.y = 0;
        }
      }

      if (frictionComp && positionComp) {
        Vec2dMulMut(positionComp.velocity, 1 - frictionComp.frictionBreakingForce);
      }

      if (positionComp) {
        positionComp.position.x = (positionComp.position.x + positionComp.velocity.x);
        positionComp.position.y = (positionComp.position.y + positionComp.velocity.y);
      }
    }
  }
};