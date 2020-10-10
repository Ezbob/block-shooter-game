import {PathComponent} from '../components/PathComponent';
import {PositionalComponent} from '../components/PositionalComponent';
import {EntityManager} from '../dataStructures/EntityManager';
import {SharedVariables} from '../SharedVariables';
import {ISystem} from './ISystem';

export class PathFollowingSystem implements ISystem {
  hasReachedNextPoint(distance: number) {
    return distance <= 5;  // using some lower bound on closeness
  }

  update() {
    for (let event of SharedVariables.timedEventQueue) {
      if (event.name == 'nextPath') {
        console.log(event)
      }
    }

    for (let e of EntityManager) {
      let pathComponent = e.getComponentByType(PathComponent);
      let posComponent = e.getComponentByType(PositionalComponent);

      if (pathComponent && posComponent) {
        let path = pathComponent.path;
        let position = posComponent.position;

        if (pathComponent.nextWayPoint) {
          let displacement = pathComponent.nextWayPoint.sub(position);
          let distance = displacement.magnitude();
          displacement.normMut();

          if (this.hasReachedNextPoint(distance)) {
            pathComponent.nextWayPoint = path.next();

            if (pathComponent.nextWayPoint == null) {
              EntityManager.deleteEntity(e.id);
            }
          } else {
            posComponent.velocity =
                displacement.mulMembers(pathComponent.followingVelocity)
          }
        }
      }
    }
  }
};