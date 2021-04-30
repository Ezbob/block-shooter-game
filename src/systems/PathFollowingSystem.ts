import {PathComponent} from '../components/PathComponent';
import {DynamicPositionalComponent} from '../components/DynamicPositionalComponent';
import {GameContext} from '../GameContext';
import { Vec2dLength, Vec2dNormalizeMut, Vec2dSub } from '../VectorOperations';
import {ISystem} from './ISystem';

export class PathFollowingSystem implements ISystem {
  hasReachedNextPoint(distance: number) {
    return distance <= 5;  // using some lower bound on closeness
  }

  update(gtx: GameContext) {

    for (let e of gtx.entityManager) {
      let pathComponent = e.getComponent(PathComponent);
      let posComponent = e.getComponent(DynamicPositionalComponent);

      if (pathComponent && posComponent) {
        let path = pathComponent.path;
        let position = posComponent.position;

        if (pathComponent.nextWayPoint) {
          let displacement = Vec2dSub(pathComponent.nextWayPoint, position);
          let distance = Vec2dLength(displacement);

          Vec2dNormalizeMut(displacement);

          if (this.hasReachedNextPoint(distance)) {
            pathComponent.nextWayPoint = path.next();

            if (pathComponent.nextWayPoint == null) {
              gtx.entityManager.deleteEntity(e);
            }
          } else {
            posComponent.velocity = {
              x: displacement.x * pathComponent.followingVelocity.x,
              y: displacement.y * pathComponent.followingVelocity.y
            };
          }
        }
      }
    }
  }
};