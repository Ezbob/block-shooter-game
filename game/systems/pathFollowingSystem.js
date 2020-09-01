import PathComponent from '../components/pathComponent';
import PositionComponent from '../components/positionalComponent';
import entityManager from '../dataStructures/entityManager';

export default class PathFollowingSystem {
  hasReachedNextPoint(distance) {
    return distance <= 15;  // using some lower bound on closeness
  }

  update() {
    let entities =
        entityManager.getEntitiesByComponents(PositionComponent, PathComponent);

    for (let e of entities) {
      let [posComponent, pathComponent] = e;

      let path = pathComponent.path;
      let position = posComponent.position;

      if (pathComponent.nextWayPoint == null && path.hasNext()) {
        pathComponent.nextWayPoint = path.next();
      }

      let nextWayPoint = pathComponent.nextWayPoint;

      if (nextWayPoint) {
        let displ = nextWayPoint.sub(position);
        let unitDispl = displ.norm();
        let distance = displ.magnitude();
        let shouldReverse = false;

        if (!this.hasReachedNextPoint(distance)) {
          posComponent.velocity.x = unitDispl.x * 5
          posComponent.velocity.y = unitDispl.y * 5
        }

        if (path.next_index === (path.length - 1) && pathComponent.reverseWhenDone) {
          shouldReverse = true;
        }

        if (path.next_index === 0 && pathComponent.reverseWhenDone) {
          shouldReverse = false;
        }

        if (this.hasReachedNextPoint(distance) && !shouldReverse) {
          pathComponent.nextWayPoint = path.next();
        }

        if (this.hasReachedNextPoint(distance) && shouldReverse) {
          pathComponent.nextWayPoint = path.prev();
        }

      }
    }
  }
};