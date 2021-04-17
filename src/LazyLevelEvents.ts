import { PlayerArchetype } from "./archetypes/PlayerArchetype";
import { WeakEnemyArchetype } from "./archetypes/WeakEnemyArchetype";
import { SpawnComponent } from "./components/SpawnComponent";
import { TimerComponent } from "./components/TimerComponent";
import { CircularBuffer } from "./dataStructures/CircularBuffer";
import { Entity } from "./dataStructures/Entity";
import { EntityManager } from "./dataStructures/EntityManager";
import { IPathBuffer } from "./dataStructures/IPathBuffer";
import { SinglePassBuffer } from "./dataStructures/SinglePassBuffer";


export class LazyLevelEvents {

  constructor(
      private events: Array<PlayerJson | EnemyJson | ConditionJson>
  ) {
  }

  public instantiateNext(spawn: SpawnComponent): Entity | null {
    let next = this.events.shift();
    if (!next) {
      return null;
    }

    switch(next.event_type) {
      case 'weak':
        return this.instantiateEnemy(next as EnemyJson);
      case 'player':
        return this.instantiatePlayer(next as PlayerJson);
      case 'timeout':
      case 'enemies_defeated':
        return this.instantiateCondition(next as ConditionJson, spawn);
    }

    return null;
  }

  private instantiateCondition(next: ConditionJson, spawn: SpawnComponent): Entity | null {
      switch(next.event_type) {
        case 'timeout':
          spawn.shouldSpawn = false
          return EntityManager.createNewEntity(new TimerComponent('spawnTimeout', next.argument, [spawn]))
        case 'enemies_defeated':
          break;
      }
      return null
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
  }): IPathBuffer<MathVector2d> {

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