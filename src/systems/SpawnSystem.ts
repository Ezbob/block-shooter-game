import { PlayerArchetype } from "../archetypes/PlayerArchetype";
import { WeakEnemyArchetype } from "../archetypes/WeakEnemyArchetype";
import { SpawnComponent } from "../components/SpawnComponent";
import { SpawnCountdownComponent } from "../components/SpawnCountdownComponent";
import { TimerComponent } from "../components/TimerComponent";
import { CircularBuffer } from "../dataStructures/CircularBuffer";
import { IPathBuffer } from "../dataStructures/IPathBuffer";
import { SinglePassBuffer } from "../dataStructures/SinglePassBuffer";
import { GameContext } from "../GameContext";
import { ISystem } from "./ISystem";

export class SpawnSystem implements ISystem {

    update(ctx: GameContext): void {

        for (let e of ctx.entityManager) {
            let spawnComponent = e.getComponent(SpawnComponent);

            if (spawnComponent && this.canSpawn(spawnComponent)) {
                let entity = null
                while (entity = this.instantiateNext(spawnComponent, ctx)) {
                    if ( entity.getComponent(TimerComponent) || entity.getComponent(SpawnCountdownComponent) ) {
                        break;
                    }
                }
            }

        }
    }

    private canSpawn(spawn: SpawnComponent) {
        return spawn.shouldSpawn && spawn.spawningSet.length > 0
    }

    private instantiateNext(spawn: SpawnComponent, gtx: GameContext) {
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

    private instantiateCondition(next: ConditionJson, spawn: SpawnComponent, gtx: GameContext) {
        switch(next.event_type) {
            case 'timeout':
                spawn.shouldSpawn = false
                return gtx.entityManager.createEntity(
                    new TimerComponent(
                        'spawnTimeout',
                        gtx.frameClock.now + next.argument,
                        spawn
                    )
                )
            case 'enemies_defeated':
                spawn.shouldSpawn = false
                return gtx.entityManager.createEntity(
                    new SpawnCountdownComponent(
                        next.argument,
                        spawn
                    )
                )
        }
        return null
    }

    private instantiateEnemy(enemy: EnemyJson, gtx: GameContext) {
        switch (enemy.event_type) {
            case 'weak':
            let path = this.instantiatePath(enemy.path);
            return WeakEnemyArchetype.createNew(
                gtx, enemy.movement.startAt, enemy.movement.velocity, path, gtx.assets.weak);
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
            },
            gtx.assets.player1
            );
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