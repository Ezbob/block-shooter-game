import CleanUpComponent from '../components/CleanUpComponent';
import HealthComponent from '../components/HealthComponent';
import PositionalComponent from '../components/PositionalComponent';
import EntityManager from '../dataStructures/EntityManager';
import ISystem from './ISystem';

export default class CleanUpSystem implements ISystem {
  update(): void {
    for (let e of EntityManager) {
      let posComp = e.getComponentByType(PositionalComponent);
      let cleanup = e.getComponentByType(CleanUpComponent);
      let healthComp = e.getComponentByType(HealthComponent);

      if (posComp && cleanup) {
        if (posComp.position.y < cleanup.limitUpper) {
          EntityManager.deleteEntity(e.id);
          continue;
        }

        if (posComp.position.y > cleanup.limitLower) {
          EntityManager.deleteEntity(e.id);
          continue;
        }

        if (posComp.position.x < cleanup.limitXLeft) {
          EntityManager.deleteEntity(e.id);
          continue;
        }

        if (posComp.position.x > cleanup.limitXRight) {
          EntityManager.deleteEntity(e.id);
          continue;
        }
      }

      if (healthComp && healthComp.health <= 0) {
        EntityManager.deleteEntity(e.id);
      }
    }
  }
};