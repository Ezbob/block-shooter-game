import { PlayerArchetype } from "../archetypes/PlayerArchetype";
import { WeakEnemyArchetype } from "../archetypes/WeakEnemyArchetype";
import { SpawnComponent } from "../components/SpawnComponent";
import { TimerComponent } from "../components/TimerComponent";
import { CircularBuffer } from "../dataStructures/CircularBuffer";
import { Entity } from "../dataStructures/Entity";
import { EntityManager } from "../dataStructures/EntityManager";
import { IPathBuffer } from "../dataStructures/IPathBuffer";
import { SinglePassBuffer } from "../dataStructures/SinglePassBuffer";
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

                if (spawnComponent.spawningSet) {
                    let entity = null
                    while (entity = this.instantiateNext(spawnComponent)) {
                        if ( entity.getComponentByType(TimerComponent) ) {
                            break;
                        }
                    }
                }
            }

        }
    }

    private instantiateNext(spawn: SpawnComponent): Entity | null {
        let next = spawn.spawningSet.shift();
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
}