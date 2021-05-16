import {AjvValidator} from '../jsonValidators/AjvValidator';
import LevelSchema from '../jsonValidators/LevelSchema.json';
import { LevelLoadComponent } from '../components/LevelLoadComponent';
import {ISystem} from './ISystem';
import { SpawnComponent } from '../components/SpawnComponent';
import { GameContext } from '../GameContext';

export class LevelLoaderSystem implements ISystem {
    private levelValidator = AjvValidator.compile(LevelSchema);

    update(ctx: GameContext) {
        for (let e of ctx.entityManager) {
            const eventLoadComp = e.getComponent(LevelLoadComponent)
            if (eventLoadComp) {
                this.loadFromJson(eventLoadComp.filename)
                    .then(levelEvents => ctx.entityManager.createEntity(new SpawnComponent(levelEvents)))
                    .catch(reason => console.error(`Error in loading events: ${reason}`))

                ctx.entityManager.deleteEntity(e)
            }
        }
    }

    async loadFromJson(filename: string) {
        let data = await fetch(filename)
            .then(response => response.json())
            .catch(reason => console.error(`Could not fetch level ${filename}: ${reason}`));

        if ( !this.levelValidator(data) ) {
            for (let err of this.levelValidator.errors) {
                console.error(`Level Validation Error: ${err}`);
            }
            return null;
        } else {
            console.log(`Level file '${filename}' OK`)
        }

        return (data as LevelJson).events;
    }
};