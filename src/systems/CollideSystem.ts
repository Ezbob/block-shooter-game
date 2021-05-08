import { CanvasBoundaryComponent } from '../components/CanvasBoundaryComponent';
import {CollisionDetectionComponent} from '../components/CollisionDetectionComponent';
import {DamageComponent} from '../components/DamageComponent';
import { DimensionComponent } from '../components/DimensionComponent';
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
                    posE, compE.shape, posA, compA.shape)) {
              healthComp.health -= damageComp.damage;

              let s = damageComp.dealer.getComponent(ScoreComponent);

              if (s && healthComp.health <= 0) {
                s.score += healthComp.worth;
              }

              gtx.entityManager.deleteEntity(a);

              if (healthComp.health <= 0) {
                compE.layers = 0;  // disable collision
              }
            }
          }
        }
      }

      let collisionComp = entity.getComponent(CanvasBoundaryComponent)
      let dimensionComp = entity.getComponent(DimensionComponent)

      const canvasWidth = gtx.canvasManager.canvasWidth;
      const canvasHeight = gtx.canvasManager.canvasHeight;

      if (dimensionComp && collisionComp && posE) {

        if (posE.x < collisionComp.canvasPaddingX.x) {
          posE.x = collisionComp.canvasPaddingX.x
        }

        if (posE.x + dimensionComp.x >= canvasWidth - collisionComp.canvasPaddingX.y) {
          posE.x = (canvasWidth - dimensionComp.x - collisionComp.canvasPaddingX.y)
        }

        if (posE.y < collisionComp.canvasPaddingY.x) {
          posE.y = collisionComp.canvasPaddingY.x
        }

        if (posE.y + dimensionComp.y >= canvasHeight - collisionComp.canvasPaddingY.y) {
          posE.y = (canvasHeight - dimensionComp.y - collisionComp.canvasPaddingY.y)
        }

      }

    }
  }
}