import {CollisionDetectionComponent} from '../components/CollisionDetectionComponent';
import {DamageComponent} from '../components/DamageComponent';
import {HealthComponent} from '../components/HealthComponent';
import {PositionalComponent} from '../components/PositionalComponent';
import {ScoreComponent} from '../components/ScoreComponent';
import {EntityManager} from '../dataStructures/EntityManager';
import { GameContext } from '../GameContext';
import {Utils} from '../Utils';

import {ISystem} from './ISystem';

export class CollideSystem implements ISystem {
  update(_ctx: GameContext) {
    for (let entity of EntityManager) {
      let compE = entity.getComponentByType(CollisionDetectionComponent);
      let posE = entity.getComponentByType(PositionalComponent);
      let healthComp = entity.getComponentByType(HealthComponent);

      if (compE && posE && healthComp) {
        for (let a of EntityManager) {
          let compA = a.getComponentByType(CollisionDetectionComponent);
          let posA = a.getComponentByType(PositionalComponent);
          let damageComp = a.getComponentByType(DamageComponent);

          if (compA && posA && damageComp) {
            if (entity.id != a.id && (compA.layers & compE.layers) != 0 &&
                Utils.intersectingRectanglesFlat(
                    posE.position, compE.shape, posA.position, compA.shape)) {
              healthComp.health -= damageComp.damage;

              let s = damageComp.dealer.getComponentByType(ScoreComponent);

              if (s && healthComp.health <= 0) {
                s.score += healthComp.worth;
              }

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