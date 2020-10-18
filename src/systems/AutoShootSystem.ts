import {ShotArchetype} from '../archetypes/ShotArchetype';
import {AutoShootComponent} from '../components/AutoShootComponent';
import {GunComponent} from '../components/GunComponent';
import {PositionalComponent} from '../components/PositionalComponent';
import {EntityManager} from '../dataStructures/EntityManager';
import {SharedVariables} from '../SharedVariables';
import {ISystem} from './ISystem';

export class AutoShootSystem implements ISystem {
  update() {
    for (let e of EntityManager) {
      let autoShootComp = e.getComponentByType(AutoShootComponent);
      let gunComp = e.getComponentByType(GunComponent);
      let posComp = e.getComponentByType(PositionalComponent);

      if (autoShootComp && autoShootComp.isShooting && gunComp && posComp) {
        let diff = SharedVariables.frameClock.now - gunComp.timeSinceLast;
        if (diff > gunComp.shotDelay) {
          ShotArchetype.createNew(
              e,
              {
                x: posComp.position.x + posComp.dimension.x / 2,
                y:  posComp.position.y + posComp.dimension.y
              },
              {
                x: 0,
                y: gunComp.bulletVelocity
              }, 0b0001);
          gunComp.timeSinceLast = SharedVariables.frameClock.now;
        }
      }
    }
  }
};