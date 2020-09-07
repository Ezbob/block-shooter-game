import CleanUpComponent from '../components/CleanUpComponent';
import HealthComponent from '../components/HealthComponent';
import PositionalComponent from '../components/PositionalComponent';
import EntityManager from '../dataStructures/EntityManager';
import ISystem from './ISystem';

export default class CleanUpSystem implements ISystem {
  update(): void {
    let entities = EntityManager.filterEntitiesByComponentTypes(
        PositionalComponent, CleanUpComponent);

    for (let e of entities) {
      let posComp = e.getComponentByType(PositionalComponent);
      let cleanup = e.getComponentByType(CleanUpComponent);

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

    entities = EntityManager.filterEntitiesByComponentTypes(HealthComponent);

    for (let e of entities) {
      let healthComp = e.getComponentByType(HealthComponent);
      if (healthComp.health <= 0) {
        EntityManager.deleteEntity(e.id);
      }
    }
  }
};