import CanvasCollisionComponent from '../components/CanvasCollisionComponent';
import DimensionalComponent from '../components/DimensionalComponent';
import PositionalComponent from '../components/PositionalComponent';
import EntityManager from '../dataStructures/EntityManager';
import Debug from '../Debug';
import SharedConstants from '../SharedConstants';

import ISystem from './ISystem';
import FrictionComponent from '../components/FrictionComponent';

export default class MovementSystem implements ISystem {
  update() {
    let entities = EntityManager.getEntitiesByComponents(
        PositionalComponent, DimensionalComponent, CanvasCollisionComponent);

    for (let e of entities) {
      let positionComp = e[0] as PositionalComponent;
      let dimensionalComp = e[1] as DimensionalComponent;
      let collisionComp = e[2] as CanvasCollisionComponent;

      let breaked =
          positionComp.velocity.mul(1 - positionComp.breakingForcePercentage)

      let nextPos = positionComp.position.add(breaked);

      if (collisionComp.canvasPaddingX.x > nextPos.x) {
        positionComp.position.x = collisionComp.canvasPaddingX.x;
        positionComp.velocity.x = 0;
      }
      if (nextPos.x + dimensionalComp.dimension.x >
          SharedConstants.CANVAS_WIDTH - collisionComp.canvasPaddingX.y) {
        positionComp.position.x =
            (SharedConstants.CANVAS_WIDTH - dimensionalComp.dimension.x -
             collisionComp.canvasPaddingX.y);
        positionComp.velocity.x = 0;
      }

      if (collisionComp.canvasPaddingY.x > nextPos.y) {
        positionComp.position.y = collisionComp.canvasPaddingY.x;
        positionComp.velocity.y = 0;
      }
      if (nextPos.y + dimensionalComp.dimension.y >
          SharedConstants.CANVAS_HEIGHT - collisionComp.canvasPaddingY.y) {
        positionComp.position.y =
            (SharedConstants.CANVAS_HEIGHT - dimensionalComp.dimension.y -
             collisionComp.canvasPaddingY.y);
        positionComp.velocity.y = 0;
      }
    }

    entities = EntityManager.getEntitiesByComponents(PositionalComponent, FrictionComponent);

    for (let e of entities) {
      let positionComp = e[0] as PositionalComponent;
      let frictionComp = e[1] as FrictionComponent;
      positionComp.velocity.mulMut(1 - frictionComp.frictionBreakingForce);
    }

    entities = EntityManager.getEntitiesByComponents(PositionalComponent);

    for (let [positionComp] of entities) {
      //positionComp.velocity.mulMut(1 - positionComp.breakingForcePercentage)

      positionComp.position.x += positionComp.velocity.x;
      positionComp.position.y += positionComp.velocity.y;

      Debug.drawLine(
          positionComp.velocity.mul(6).add(positionComp.position),
          positionComp.position);
    }

  }
};