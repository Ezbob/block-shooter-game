import {ShotArchetype} from '../archetypes/ShotArchetype';
import {AutoShootComponent} from '../components/AutoShootComponent';
import {GunComponent} from '../components/GunComponent';
import {PositionalComponent} from '../components/PositionalComponent';
import {GameContext} from '../GameContext';
import {ISystem} from './ISystem';

export class AutoShootSystem implements ISystem {
  update(ctx: GameContext) {
    for (const entity of ctx.entityManager) {
      let autoShootComp = entity.getComponent(AutoShootComponent);
      let gunComp = entity.getComponent(GunComponent);
      let posComp = entity.getComponent(PositionalComponent);

      if (autoShootComp && autoShootComp.isShooting && gunComp && posComp) {
        let diff = ctx.frameClock.now - gunComp.timeSinceLast
        if (diff > gunComp.shotDelay) {
          let initialPosition = {
            x: posComp.position.x + posComp.dimension.x / 2,
            y: posComp.position.y + posComp.dimension.y
          }

          let velocity = {
            x: 0,
            y: gunComp.bulletVelocity
          }

          let collisionMask = 0b0001

          ShotArchetype.createNew(ctx, entity, initialPosition, velocity, collisionMask)
          gunComp.timeSinceLast = ctx.frameClock.now
        }
      }
    }
  }
};