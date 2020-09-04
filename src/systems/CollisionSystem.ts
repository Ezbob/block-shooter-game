import CollisionComponent from '../components/CollisionComponent';
import DimensionalComponent from '../components/DimensionalComponent';
import PositionalComponent from '../components/PositionalComponent';
import EntityManager from '../dataStructures/EntityManager';
import SharedConstants from '../SharedConstants';
import ISystem from './ISystem';


export default class CollisionSystem implements ISystem {
  update(): void {
    let entities = EntityManager.getEntitiesByComponents(
        PositionalComponent, DimensionalComponent, CollisionComponent);

    for (let e of entities) {
      let positionComp = e[0] as PositionalComponent;
      let dimensionalComp = e[1] as DimensionalComponent;
      let collisionComp = e[2] as CollisionComponent;

      if (collisionComp.isConstraintByCanvas) {
        if (collisionComp.canvasPadding.x > positionComp.position.x) {
          positionComp.position.x = collisionComp.canvasPadding.x;
          positionComp.velocity.x = 0;
        }
        if (positionComp.position.x + dimensionalComp.dimension.x >
            SharedConstants.CANVAS_WIDTH - collisionComp.canvasPadding.x) {
          positionComp.position.x =
              (SharedConstants.CANVAS_WIDTH - dimensionalComp.dimension.x -
               collisionComp.canvasPadding.x);
          positionComp.velocity.x = 0;
        }
        if (collisionComp.canvasPadding.y > positionComp.position.y) {
          positionComp.position.y = collisionComp.canvasPadding.y;
          positionComp.velocity.y = 0;
        }

        if (positionComp.position.y + dimensionalComp.dimension.y >
            SharedConstants.CANVAS_HEIGHT - collisionComp.canvasPadding.y) {
          positionComp.position.y =
              (SharedConstants.CANVAS_HEIGHT - dimensionalComp.dimension.y -
               collisionComp.canvasPadding.y);
          positionComp.velocity.y = 0;
        }
      }
    }
  }
};