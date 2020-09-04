import CollisionComponent from '../components/CanvasCollisionComponent';
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


      if (collisionComp.canvasPaddingX.x > positionComp.position.x) {
        positionComp.position.x = collisionComp.canvasPaddingX.x;
        positionComp.velocity.x = 0;
      }
      if (positionComp.position.x + dimensionalComp.dimension.x >
          SharedConstants.CANVAS_WIDTH - collisionComp.canvasPaddingX.y) {
        positionComp.position.x =
            (SharedConstants.CANVAS_WIDTH - dimensionalComp.dimension.x -
             collisionComp.canvasPaddingX.y);
        positionComp.velocity.x = 0;
      }
      if (collisionComp.canvasPaddingY.x > positionComp.position.y) {
        positionComp.position.y = collisionComp.canvasPaddingY.x;
        positionComp.velocity.y = 0;
      }

      if (positionComp.position.y + dimensionalComp.dimension.y >
          SharedConstants.CANVAS_HEIGHT - collisionComp.canvasPaddingY.y) {
        positionComp.position.y =
            (SharedConstants.CANVAS_HEIGHT - dimensionalComp.dimension.y -
             collisionComp.canvasPaddingY.y);
        positionComp.velocity.y = 0;
      }
    }
  }
};