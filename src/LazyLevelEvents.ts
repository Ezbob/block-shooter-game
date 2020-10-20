import { PlayerArchetype } from "./archetypes/PlayerArchetype";
import { WeakEnemyArchetype } from "./archetypes/WeakEnemyArchetype";
import { CircularBuffer } from "./dataStructures/CircularBuffer";
import { IPathBuffer } from "./dataStructures/IPathBuffer";
import { SinglePassBuffer } from "./dataStructures/SinglePassBuffer";


export class LazyLevelEvents {

  constructor(
      private events: Array<PlayerJson | EnemyJson | ConditionJson>
  ) {
  }

  public instantiateNext(): boolean {
    let next = this.events.pop();
    if (!next) {
      return false;
    }

    switch(next.event_type) {
      case 'weak':
        this.instantiateEnemy(next as EnemyJson);
        break;
      case 'player':
        this.instantiatePlayer(next as PlayerJson);
        break;
    }

    return true;
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