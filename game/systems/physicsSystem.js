import PositionComponent from '../components/positionalComponent';
import entityManager from '../dataStructures/entityManager';
import Variables from '../sharedVariables.js';

export default class PhysicsSystem {
  update() {
    let entities = entityManager.getEntitiesByComponents(PositionComponent);

    for (let entity of entities) {
      let [positionComp] = entity;

      positionComp.velocity.mulMut(1 - positionComp.breakingForcePercentage)

      positionComp.position.x += positionComp.velocity.x;
      positionComp.position.y += positionComp.velocity.y;
    }
  }
};