import {ShotArchetype} from '../archetypes/ShotArchetype';
import {AutoShootComponent} from '../components/AutoShootComponent';
import { DimensionComponent } from '../components/DimensionComponent';
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
      let dimensionComp = entity.getComponent(DimensionComponent)

      if (autoShootComp && autoShootComp.isShooting && gunComp && posComp) {
        let diff = ctx.frameClock.now - gunComp.timeSinceLast
        if (diff > gunComp.shotDelay) {

          let initialPosition = {
            x: posComp.x + dimensionComp.x / 2,
            y: posComp.y + dimensionComp.y
          }

          ShotArchetype.createNew(ctx, entity, initialPosition, {x: 0, y: gunComp.gunForce}, 0b0001)
          gunComp.timeSinceLast = ctx.frameClock.now
        }
      }
    }
  }
};