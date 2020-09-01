import PositionComponent from '../components/positionalComponent';
import entityManager from '../dataStructures/entityManager';
import ISystem from './iSystem';
//import Debug from '../debug';

export default class PhysicsSystem implements ISystem {
  update() {
    let entities = entityManager.getEntitiesByComponents(PositionComponent);

    for (let entity of entities) {
      let [positionComp] = entity;

      positionComp.velocity.mulMut(1 - positionComp.breakingForcePercentage)

      positionComp.position.x += positionComp.velocity.x;
      positionComp.position.y += positionComp.velocity.y;

      //Debug.drawLine(positionComp.velocity.mul(6).add(positionComp.position), positionComp.position);
    }
  }
};