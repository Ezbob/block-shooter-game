import { SpawnComponent } from "../components/SpawnComponent";
import { TimerComponent } from "../components/TimerComponent";
import { EntityManager } from "../dataStructures/EntityManager";
import { SharedVariables } from "../SharedVariables";
import { ISystem } from "./ISystem";

export class SpawnSystem implements ISystem {

    update(): void {
        for (let event of SharedVariables.timedEventQueue) {
            if (event.name == 'spawnTimeout') {
                console.log("spawntimeout")
                let spawnComponent = event.args[0]
                spawnComponent.shouldSpawn = true;
            }
        }
        for (let e of EntityManager) {
            let spawnComponent = e.getComponentByType(SpawnComponent);

            if (spawnComponent && spawnComponent.shouldSpawn) {

                if (!spawnComponent.spawningSet && spawnComponent.filename) {
                    SharedVariables.levelLoader.loadFromJson(spawnComponent.filename)
                     .then((value) => {
                            spawnComponent.spawningSet = value;
                        }, (reason) => {
                            console.log("level load of {} rejected: ", reason)
                        });
                    spawnComponent.filename = null
                } else if (spawnComponent.spawningSet) {
                    let entity = null
                    while (entity = spawnComponent.spawningSet.instantiateNext(spawnComponent)) {
                        if ( entity.getComponentByType(TimerComponent) ) {
                            break;
                        }
                    }
                }
            }

        }
    }
}