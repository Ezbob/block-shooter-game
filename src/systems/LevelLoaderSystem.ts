import {AjvValidator} from '../jsonValidators/AjvValidator';
import LevelSchema from '../jsonValidators/LevelSchema.json';
import { LevelLoadComponent } from '../components/LevelLoadComponent';
import {EntityManager} from '../dataStructures/EntityManager';
import {ISystem} from './ISystem';
import { SpawnComponent } from '../components/SpawnComponent';
import { GameContext } from '../GameContext';

export class LevelLoaderSystem implements ISystem {
    private levelValidator = AjvValidator.compile(LevelSchema);

    update(_ctx: GameContext) {
        for (let e of EntityManager) {
            const eventLoadComp = e.getComponentByType(LevelLoadComponent)
            if (eventLoadComp) {
                this.loadFromJson(eventLoadComp.filename)
                    .then((levelEvents) => {
                        EntityManager.createNewEntity(new SpawnComponent(levelEvents))
                    })
                    .catch((reason) => {
                        console.error(`Error in loading events: ${reason}`)
                    })
                EntityManager.deleteEntity(e.id)
            }
        }
    }

    async loadFromJson(filename: string) {
        let data = await fetch(filename).then(response => response.json()).catch(reason => {
            console.error(`Could not fetch level ${filename}: ${reason}`);
        });

        if ( !this.levelValidator(data) ) {
            for (let err of this.levelValidator.errors) {
                console.error(`Level Validation Error: ${err}`);
            }
            return null;
        } else {
            console.log(`Level file '${filename}' OK`)
        }

        return (data.events as Array<PlayerJson | EnemyJson | ConditionJson>);
    }
};