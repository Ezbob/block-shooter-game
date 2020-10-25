import { SpawnComponent } from "../components/SpawnComponent";
import { EntityManager } from "../dataStructures/EntityManager";
import { SharedVariables } from "../SharedVariables";
import { ISystem } from "./ISystem";

export class SpawnSystem implements ISystem {

    update(): void {
        for (let e of EntityManager) {
            let spawnComponent = e.getComponentByType(SpawnComponent);

            if (spawnComponent) {

                if (!spawnComponent.spawningSet && spawnComponent.filename) {
                    SharedVariables.levelLoader.loadFromJson(spawnComponent.filename)
                     .then((value) => {
                        spawnComponent.spawningSet = value;
                    }, (reason) => {
                        console.log("level load of {} rejected: ", reason)
                    }
                    );
                    spawnComponent.filename = null
                } else if (spawnComponent.spawningSet) {
                    while (spawnComponent.spawningSet.instantiateNext());
                }
            }
        }
    }
}