import CollisionDetectionComponent from '../components/CollisionDetectionComponent';
import DamageComponent from '../components/DamageComponent';
import HealthComponent from '../components/HealthComponent';
import PositionalComponent from '../components/PositionalComponent';
import EntityManager from '../dataStructures/EntityManager';
import Utils from '../Utils';

import ISystem from './ISystem';

export default class CollideSystem implements ISystem {
  update() {
    for (let e of EntityManager) {
      let compE = e.getComponentByType(CollisionDetectionComponent);
      let posE = e.getComponentByType(PositionalComponent);

      if (compE && posE) {
        for (let a of EntityManager) {
          let compA = a.getComponentByType(CollisionDetectionComponent);
          let posA = a.getComponentByType(PositionalComponent);
          let healthComp = e.getComponentByType(HealthComponent);
          let damageComp = a.getComponentByType(DamageComponent);

          if (compA && posA && healthComp && damageComp) {
            if (e.id != a.id && (compA.layers & compE.layers) != 0 &&
                Utils.intersectingRectanglesFlat(
                    posE.position, compE.shape, posA.position, compA.shape)) {
              healthComp.health -= damageComp.damage;

              EntityManager.deleteEntity(a.id);

              if (healthComp.health <= 0) {
                compE.layers = 0;  // disable collision
              }
            }
          }
        }
      }
    }
  }
}