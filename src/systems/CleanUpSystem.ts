import ISystem from "./ISystem";
import EntityManager from "../dataStructures/EntityManager";
import PositionalComponent from "../components/PositionalComponent";
import CleanUpComponent from "../components/CleanUpComponent";


export default class CleanUpSystem implements ISystem {

    update(): void {
        let entities = EntityManager.getEntitiesByComponentIds(PositionalComponent.cid, CleanUpComponent.cid);

        for (let e of entities) {
            let posComp = e.getComponentById(PositionalComponent.cid) as PositionalComponent;
            let cleanup = e.getComponentById(CleanUpComponent.cid) as CleanUpComponent;

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