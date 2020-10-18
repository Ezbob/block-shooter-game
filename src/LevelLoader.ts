import {PlayerArchetype} from './archetypes/PlayerArchetype';
import {WeakEnemyArchetype} from './archetypes/WeakEnemyArchetype';
import {CircularBuffer} from './dataStructures/CircularBuffer';
import {IPathBuffer} from './dataStructures/IPathBuffer';
import {SinglePassBuffer} from './dataStructures/SinglePassBuffer';
import {AjvValidator} from './jsonValidators/AjvValidator';
import * as LevelSchema from './jsonValidators/LevelSchema.json';

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

      for (let event of data.events) {
        switch(event.event_type) {
          case 'weak':
            this.instantiateEnemy(event);
            break;
          case 'player':
            this.instantiatePlayer(event);
            break;
        }
      }

    return data;
  }

  private instantiateEnemy(enemy: EnemyJson) {
    switch (enemy.event_type) {
      case 'weak':
        let path = this.instantiatePath(enemy.path);
        return WeakEnemyArchetype.createNew(enemy.movement.startAt, enemy.movement.velocity, path);
    }
  }

  private instantiatePlayer(player: PlayerJson) {
    return PlayerArchetype.createNew(player.movement.startAt, player.movement.velocity);
  }

  private instantiatePath(rawPath: {
    waypoints: [MathVector2d],
    type: string
  }):
      IPathBuffer<MathVector2d> {

    let buffer: null | IPathBuffer<MathVector2d> = null;
    switch (rawPath.type) {
      case "single_pass":
        buffer = new SinglePassBuffer(...rawPath.waypoints);
        break;
      case "circular":
        buffer = new CircularBuffer(...rawPath.waypoints);
        break;
      default:
        buffer = new SinglePassBuffer(...rawPath.waypoints);
        break;
    }
    return buffer;
  }
};