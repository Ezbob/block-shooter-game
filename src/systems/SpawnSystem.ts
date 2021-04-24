import { PlayerArchetype } from "../archetypes/PlayerArchetype";
import { WeakEnemyArchetype } from "../archetypes/WeakEnemyArchetype";
import { SpawnComponent } from "../components/SpawnComponent";
import { TimerComponent } from "../components/TimerComponent";
import { CircularBuffer } from "../dataStructures/CircularBuffer";
import { Entity } from "../dataStructures/Entity";
import { IPathBuffer } from "../dataStructures/IPathBuffer";
import { SinglePassBuffer } from "../dataStructures/SinglePassBuffer";
import { GameContext } from "../GameContext";
import { ISystem } from "./ISystem";

export class SpawnSystem implements ISystem {

    update(ctx: GameContext): void {
        for (let event of ctx.timedEventQueue) {
            if (event.name == 'spawnTimeout') {
                console.log("spawntimeout")
                let spawnComponent = event.args[0]
                spawnComponent.shouldSpawn = true;
            }
        }
        for (let e of ctx.entityManager) {
            let spawnComponent = e.getComponent(SpawnComponent);

            if (spawnComponent && spawnComponent.shouldSpawn) {

                if (spawnComponent.spawningSet) {
                    let entity = null
                    while (entity = this.instantiateNext(spawnComponent, ctx)) {
                        if ( entity.getComponent(TimerComponent) ) {
                            break;
                        }
                    }
                }
            }

        }
    }

    private instantiateNext(spawn: SpawnComponent, gtx: GameContext): Entity | null {
        let next = spawn.spawningSet.shift();
        if (!next) {
            return null;
        }

        switch(next.event_type) {
            case 'weak':
                return this.instantiateEnemy(next as EnemyJson, gtx);
            case 'player':
                return this.instantiatePlayer(next as PlayerJson, gtx);
            case 'timeout':
            case 'enemies_defeated':
                return this.instantiateCondition(next as ConditionJson, spawn, gtx);
        }

        return null;
    }

    private instantiateCondition(next: ConditionJson, spawn: SpawnComponent, gtx: GameContext): Entity | null {
        switch(next.event_type) {
            case 'timeout':
                spawn.shouldSpawn = false
                return gtx.entityManager.createEntity(new TimerComponent('spawnTimeout', gtx.frameClock.now + next.argument, [spawn]))
            case 'enemies_defeated':
                break;
        }
        return null
    }

    private instantiateEnemy(enemy: EnemyJson, gtx: GameContext) {
        switch (enemy.event_type) {
            case 'weak':
            let path = this.instantiatePath(enemy.path);
            return WeakEnemyArchetype.createNew(gtx, enemy.movement.startAt, enemy.movement.velocity, path);
        }
    }

    private instantiatePlayer(player: PlayerJson, gtx: GameContext) {
        return PlayerArchetype.createNew(
            gtx,
            player.movement.startAt,
            player.movement.velocity,
            {
                x: 10,
                y: gtx.canvasManager.canvasHeight - 20
            },{
                x: gtx.canvasManager.canvasWidth - gtx.canvasManager.canvasWidth / 11,
                y: gtx.canvasManager.canvasHeight - 10
            });
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