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

    for (let entity of data.players) {
      this.instantiatePlayer(entity.movement.startAt, entity.movement.velocity)
    }

    for (let entity of data.enemies) {
      switch (entity.archetype) {
        case 'weak': {
          let path = this.instantiatePath(entity.path.type, entity.path.waypoints);
          this.instantiateEnemy(
              entity.archetype, entity.movement.startAt,
              entity.movement.velocity, path);
          break;
        }
      }
    }

    return data;
  }

  private instantiateEnemy(
      archetype: string, startingPoint: MathVector2d,
      velocity: MathVector2d, path: IPathBuffer<MathVector2d>) {
    switch (archetype) {
      case 'weak':
        return WeakEnemyArchetype.createNew(startingPoint, velocity, path);
    }
  }

  private instantiatePlayer(
      startingPoint: MathVector2d, velocity: MathVector2d) {
    return PlayerArchetype.createNew(startingPoint, velocity);
  }

  private instantiatePath(type: string, waypoints: [MathVector2d]):
      IPathBuffer<MathVector2d> {

    let buffer: null | IPathBuffer<MathVector2d> = null;
    switch (type) {
      case "single_pass":
        buffer = new SinglePassBuffer(...waypoints);
        break;
      case "circular":
        buffer = new CircularBuffer(...waypoints);
        break;
      default:
        buffer = new SinglePassBuffer(...waypoints);
        break;
    }
    return buffer;
  }
};