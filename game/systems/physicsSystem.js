import entityManager from "../dataStructures/entityManager";
import PositionComponent from "../components/positionalComponent";

export default class PhysicsSystem {

    update() {
        let entities = entityManager.getEntitiesByComponents(
            PositionComponent
        );

        for (let entity of entities) {
            let [positionComp] = entity;
            positionComp.velocity.mulMut(0.9)
            
            positionComp.position.addMut(positionComp.velocity);
        }
    }
};