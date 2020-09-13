import PathComponent from '../components/PathComponent';
import PositionalComponent from '../components/PositionalComponent';
import EntityManager from '../dataStructures/EntityManager';
import Debug from '../Debug';
import ISystem from './ISystem';

export default class PathFollowingSystem implements ISystem {
  hasReachedNextPoint(distance: number) {
    return distance <= 15;  // using some lower bound on closeness
  }

  update() {
    let entities = EntityManager.filterEntitiesByComponentTypes(
        PositionalComponent, PathComponent);

    for (let e of entities) {
      let pathComponent = e.getComponentByType(PathComponent);
      let posComponent = e.getComponentByType(PositionalComponent);

      let path = pathComponent.path;
      let position = posComponent.position;

      let nextWayPoint = pathComponent.nextWayPoint;

      if (nextWayPoint) {
        let displacement = nextWayPoint.sub(position);
        let distance = displacement.magnitude();
        displacement.normMut();

        if (this.hasReachedNextPoint(distance)) {
          pathComponent.nextWayPoint = path.next();
        } else {
          posComponent.velocity =
              displacement.mulMembers(pathComponent.followingVelocity)
        }
      }

      for (let c of pathComponent.path) {
        Debug.drawPoint(c);
      }
    }
  }
};