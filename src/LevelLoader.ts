import PlayerArchetype from './archetypes/PlayerArchetype';
import WeakEnemyArchetype from './archetypes/WeakEnemyArchetype';
import CircularBuffer from './dataStructures/CircularBuffer';
import Vector2D from './dataStructures/Vector2D';
import AjvValidator from './jsonValidators/AjvValidator';
import LevelSchema from './jsonValidators/LevelSchema.json';

export default class LevelLoader {
  private levelValidator = AjvValidator.compile(LevelSchema);

  async loadFromJson(filename: string) {
    let data = await fetch(filename).then(response => response.json());
    if (!this.levelValidator(data)) {
      for (let err of this.levelValidator.errors) {
        console.error(err);
      }
      return;
    }

    for (let enemy of data.enemies) {
      let path = this.instantiatePath(enemy.path.waypoints);
      this.instantiateEnemy(
          enemy.archetype, enemy.movement.startAt, enemy.movement.velocity,
          path);
    }

    for (let player of data.players) {
      this.instantiatePlayer(
          player.archetype, player.movement.startAt, player.movement.velocity)
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
      archetype: string, startingPoint: {x: number, y: number},
      velocity: {x: number, y: number}) {
    switch (archetype) {
      case 'player':
        return PlayerArchetype.createNew(
                new Vector2D(startingPoint.x, startingPoint.y),
                new Vector2D(velocity.x, velocity.y),
        )
    }
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