import {AjvValidator} from './jsonValidators/AjvValidator';
import * as LevelSchema from './jsonValidators/LevelSchema.json';
import { LazyLevelEvents } from './LazyLevelEvents';

export class LevelLoader {
  private levelValidator = AjvValidator.compile(LevelSchema);

  async loadFromJson(filename: string) {
    let data =
        await fetch(filename).then(response => response.json(), reason => {
          console.error(`Could not fetch level ${filename}: ${reason}`);
        });

    if (!this.levelValidator(data)) {
      for (let err of this.levelValidator.errors) {
        console.error(err);
      }
      return;
    } else {
      console.log(`Level file '${filename}' OK`)
    }

    return new LazyLevelEvents(data.events as Array<PlayerJson | EnemyJson | ConditionJson>);
  }
};