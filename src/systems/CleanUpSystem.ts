import ISystem from "./ISystem";
import EntityManager from "../dataStructures/EntityManager";
import PositionalComponent from "../components/PositionalComponent";
import CleanUpComponent from "../components/CleanUpComponent";

export default class CleanUpSystem implements ISystem {

    update(): void {
        let entities = EntityManager.getEntitiesByComponents(PositionalComponent, CleanUpComponent);

        for (let e of entities) {
            let posComp = e[0] as PositionalComponent;
            let cleanup = e[1] as CleanUpComponent;

            if (posComp.position.y < cleanup.limitUpper) {
                EntityManager.deleteEntity(e.id);
                continue;
            }

            if (posComp.position.y > cleanup.limitLower) {
                EntityManager.deleteEntity(e.id);
                continue;
            }

            if (posComp.position.x < cleanup.limitXLeft) {
                EntityManager.deleteEntity(e.id);
                continue;
            }

            if (posComp.position.x > cleanup.limitXRight) {
                EntityManager.deleteEntity(e.id);
                continue;
            }
        }
    }

};