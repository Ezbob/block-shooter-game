import {ShotArchetype} from '../archetypes/ShotArchetype';
import {AutoShootComponent} from '../components/AutoShootComponent';
import {GunComponent} from '../components/GunComponent';
import {PositionalComponent} from '../components/PositionalComponent';
import {EntityManager} from '../dataStructures/EntityManager';
import {GameContext} from '../GameContext';
import {ISystem} from './ISystem';

export class AutoShootSystem implements ISystem {
  update(ctx: GameContext) {
    for (const entity of EntityManager) {
      let autoShootComp = entity.getComponentByType(AutoShootComponent);
      let gunComp = entity.getComponentByType(GunComponent);
      let posComp = entity.getComponentByType(PositionalComponent);

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

          ShotArchetype.createNew(entity, initialPosition, velocity, collisionMask, ctx.canvasManager)
          gunComp.timeSinceLast = ctx.frameClock.now
        }
      }
    }
  }
};