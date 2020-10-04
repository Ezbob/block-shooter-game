import {PlayerArchetype} from './archetypes/PlayerArchetype';
import {WeakEnemyArchetype} from './archetypes/WeakEnemyArchetype';
import {CircularBuffer} from './dataStructures/CircularBuffer';
import {Vector2D} from './dataStructures/Vector2D';
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
          let path = this.instantiatePath(entity.path.waypoints);
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
      archetype: string, startingPoint: {x: number, y: number},
      velocity: {x: number, y: number}, path: CircularBuffer<Vector2D>) {
    switch (archetype) {
      case 'weak':
        return WeakEnemyArchetype.createNew(
            new Vector2D(startingPoint.x, startingPoint.y),
            new Vector2D(velocity.x, velocity.y), path)
    }
  }

  private instantiatePlayer(
      startingPoint: {x: number, y: number}, velocity: {x: number, y: number}) {
    return PlayerArchetype.createNew(
        new Vector2D(startingPoint.x, startingPoint.y),
        new Vector2D(velocity.x, velocity.y),
    )
  }

  private instantiatePath(waypoints: [{x: number, y: number}]):
      CircularBuffer<Vector2D> {
    let res = [];
    for (let w of waypoints) {
      res.push(new Vector2D(w.x, w.y));
    }
    return new CircularBuffer<Vector2D>(...res);
  }
};