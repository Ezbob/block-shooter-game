import {CleanUpComponent} from '../components/CleanUpComponent';
import {HealthComponent} from '../components/HealthComponent';
import {DynamicPositionalComponent} from '../components/DynamicPositionalComponent';
import { SpawnCountdownComponent } from '../components/SpawnCountdownComponent';
import {GameContext} from '../GameContext';
import {ISystem} from './ISystem';

export class CleanUpSystem implements ISystem {
  update(gtx: GameContext): void {

    let deathCount = 0;
    for (let e of gtx.entityManager) {
      let posComp = e.getComponent(DynamicPositionalComponent);
      let cleanup = e.getComponent(CleanUpComponent);
      let healthComp = e.getComponent(HealthComponent);

      if (posComp && cleanup) {
        if (posComp.position.y < cleanup.limitUpper) {
          gtx.entityManager.deleteEntity(e);
          continue;
        }

        if (posComp.position.y > cleanup.limitLower) {
          gtx.entityManager.deleteEntity(e);
          continue;
        }

        if (posComp.position.x < cleanup.limitXLeft) {
          gtx.entityManager.deleteEntity(e);
          continue;
        }

        if (posComp.position.x > cleanup.limitXRight) {
          gtx.entityManager.deleteEntity(e);
          continue;
        }
      }

      if (healthComp && healthComp.health <= 0) {
        gtx.entityManager.deleteEntity(e);
        deathCount++;
      }
    }

    for (let e of gtx.entityManager) {
      let component = e.getComponent(SpawnCountdownComponent)
      if (component) {
        component.countdown -= deathCount;
      }
    }
  }
};