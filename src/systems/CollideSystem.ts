import {CollisionDetectionComponent} from '../components/CollisionDetectionComponent';
import {DamageComponent} from '../components/DamageComponent';
import {HealthComponent} from '../components/HealthComponent';
import {PositionalComponent} from '../components/PositionalComponent';
import {ScoreComponent} from '../components/ScoreComponent';
import { GameContext } from '../GameContext';
import {Utils} from '../Utils';

import {ISystem} from './ISystem';

export class CollideSystem implements ISystem {
  update(gtx: GameContext) {
    for (let entity of gtx.entityManager) {
      let compE = entity.getComponent(CollisionDetectionComponent);
      let posE = entity.getComponent(PositionalComponent);
      let healthComp = entity.getComponent(HealthComponent);

      if (compE && posE && healthComp) {
        for (let a of gtx.entityManager) {
          let compA = a.getComponent(CollisionDetectionComponent);
          let posA = a.getComponent(PositionalComponent);
          let damageComp = a.getComponent(DamageComponent);

          if (compA && posA && damageComp) {
            if (entity.id != a.id && (compA.layers & compE.layers) != 0 &&
                Utils.intersectingRectanglesFlat(
                    posE.position, compE.shape, posA.position, compA.shape)) {
              healthComp.health -= damageComp.damage;

              let s = damageComp.dealer.getComponent(ScoreComponent);

              if (s && healthComp.health <= 0) {
                s.score += healthComp.worth;
              }

              gtx.entityManager.deleteEntity(a.id);

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