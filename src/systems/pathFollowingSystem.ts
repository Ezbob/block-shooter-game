import PathComponent from '../components/PathComponent';
import PositionComponent from '../components/positionalComponent';
import entityManager from '../dataStructures/entityManager';
import ISystem from './ISystem';

export default class PathFollowingSystem implements ISystem {
  hasReachedNextPoint(distance: number) {
    return distance <= 15;  // using some lower bound on closeness
  }

  update() {
    let entities =
        entityManager.getEntitiesByComponents(PositionComponent, PathComponent);

    for (let [posComponent, pathComponent] of entities) {

      let path = pathComponent.path;
      let position = posComponent.position;

      if (pathComponent.nextWayPoint == null && path.hasNext()) {
        pathComponent.nextWayPoint = path.next();
      }

      let nextWayPoint = pathComponent.nextWayPoint;

      if (nextWayPoint) {
        let displ = nextWayPoint.sub(position);
        let distance = displ.magnitude();
        displ.normMut();

        if (this.hasReachedNextPoint(distance)) {
          pathComponent.nextWayPoint = path.next();
        } else {
          posComponent.velocity =
              displ.mulMembers(pathComponent.followingVelocity)
        }
      }
    }
  }
};