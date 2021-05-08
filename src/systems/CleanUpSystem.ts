import {CleanUpComponent} from '../components/CleanUpComponent';
import { DeathMessageComponent } from '../components/DeathComponent';
import {HealthComponent} from '../components/HealthComponent';
import {PositionalComponent} from '../components/PositionalComponent';
import { RoleComponent } from '../components/RoleComponent';
import { SpawnCountdownComponent } from '../components/SpawnCountdownComponent';
import {GameContext} from '../GameContext';
import {ISystem} from './ISystem';

export class CleanUpSystem implements ISystem {
  update(gtx: GameContext): void {

    let deathCount = 0;
    for (let e of gtx.entityManager) {
      let posComp = e.getComponent(PositionalComponent)
      let cleanup = e.getComponent(CleanUpComponent)
      let healthComp = e.getComponent(HealthComponent)

      if (posComp && cleanup) {
        if (posComp.y < cleanup.limitUpper) {
          gtx.entityManager.deleteEntity(e);
          continue;
        }

        if (posComp.y > cleanup.limitLower) {
          gtx.entityManager.deleteEntity(e);
          continue;
        }

        if (posComp.x < cleanup.limitXLeft) {
          gtx.entityManager.deleteEntity(e);
          continue;
        }

        if (posComp.x > cleanup.limitXRight) {
          gtx.entityManager.deleteEntity(e);
          continue;
        }
      }

      if (healthComp && healthComp.health <= 0) {
        let role = e.getComponent(RoleComponent)
        if (role && role.roleName == "enemy") {
          deathCount++;
        } else if (role && role.roleName == "player") {
          gtx.entityManager.createEntity(new DeathMessageComponent("Game over"))
        }
        gtx.entityManager.deleteEntity(e);
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