import CanvasBoundaryComponent from '../components/CanvasBoundaryComponent';
import FrictionComponent from '../components/FrictionComponent';
import PositionalComponent from '../components/PositionalComponent';
import EntityManager from '../dataStructures/EntityManager';
import SharedConstants from '../SharedConstants';

import ISystem from './ISystem';

export default class MovementSystem implements ISystem {
  update() {

    for (let e of EntityManager) {
      let positionComp = e.getComponentByType(PositionalComponent);
      let collisionComp = e.getComponentByType(CanvasBoundaryComponent);
      let frictionComp = e.getComponentByType(FrictionComponent);

      if (positionComp && collisionComp) {
        let nextPos = positionComp.position.add(positionComp.velocity.mul(
            1 - positionComp.breakingForcePercentage));

        if (collisionComp.canvasPaddingX.x > nextPos.x) {
          positionComp.position.x = collisionComp.canvasPaddingX.x;
          positionComp.velocity.x = 0;
        }
        if (nextPos.x + positionComp.dimension.x >
            SharedConstants.CANVAS_WIDTH - collisionComp.canvasPaddingX.y) {
          positionComp.position.x =
              (SharedConstants.CANVAS_WIDTH - positionComp.dimension.x -
               collisionComp.canvasPaddingX.y);
          positionComp.velocity.x = 0;
        }

        if (collisionComp.canvasPaddingY.x > nextPos.y) {
          positionComp.position.y = collisionComp.canvasPaddingY.x;
          positionComp.velocity.y = 0;
        }
        if (nextPos.y + positionComp.dimension.y >
            SharedConstants.CANVAS_HEIGHT - collisionComp.canvasPaddingY.y) {
          positionComp.position.y =
              (SharedConstants.CANVAS_HEIGHT - positionComp.dimension.y -
               collisionComp.canvasPaddingY.y);
          positionComp.velocity.y = 0;
        }
      }

      if (frictionComp && positionComp) {
        positionComp.velocity.mulMut(1 - frictionComp.frictionBreakingForce)
      }

      if (positionComp) {
        positionComp.position.x += positionComp.velocity.x;
        positionComp.position.y += positionComp.velocity.y;
      }
    }
  }
};