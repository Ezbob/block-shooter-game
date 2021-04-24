import {CleanUpComponent} from '../components/CleanUpComponent';
import {HealthComponent} from '../components/HealthComponent';
import {PositionalComponent} from '../components/PositionalComponent';
import {GameContext} from '../GameContext';
import {ISystem} from './ISystem';

export class CleanUpSystem implements ISystem {
  update(gtx: GameContext): void {
    for (let e of gtx.entityManager) {
      let posComp = e.getComponent(PositionalComponent);
      let cleanup = e.getComponent(CleanUpComponent);
      let healthComp = e.getComponent(HealthComponent);

      if (posComp && cleanup) {
        if (posComp.position.y < cleanup.limitUpper) {
          gtx.entityManager.deleteEntity(e.id);
          continue;
        }

        if (posComp.position.y > cleanup.limitLower) {
          gtx.entityManager.deleteEntity(e.id);
          continue;
        }

        if (posComp.position.x < cleanup.limitXLeft) {
          gtx.entityManager.deleteEntity(e.id);
          continue;
        }

        if (posComp.position.x > cleanup.limitXRight) {
          gtx.entityManager.deleteEntity(e.id);
          continue;
        }
      }

      if (healthComp && healthComp.health <= 0) {
        gtx.entityManager.deleteEntity(e.id);
      }
    }
  }
};