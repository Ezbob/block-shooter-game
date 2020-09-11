import ShotArchetype from '../archetypes/ShotArchetype';
import AutoShootComponent from '../components/AutoShootComponet';
import DimensionalComponent from '../components/DimensionalComponent';
import GunComponent from '../components/GunComponent';
import PositionalComponent from '../components/PositionalComponent';
import EntityManager from '../dataStructures/EntityManager';
import Vector2D from '../dataStructures/Vector2D';
import SharedVariables from '../SharedVariables';


import ISystem from './ISystem';

export default class AutoShootSystem implements ISystem {
  update() {
    let entities = EntityManager.filterEntitiesByComponentTypes(
        PositionalComponent, DimensionalComponent, AutoShootComponent,
        GunComponent);
    for (let e of entities) {
      let autoShootComp = e.getComponentByType(AutoShootComponent);

      if (autoShootComp.isShooting) {
        let gunComp = e.getComponentByType(GunComponent);
        let posComp = e.getComponentByType(PositionalComponent);
        let dimenComp = e.getComponentByType(DimensionalComponent);
        let diff = SharedVariables.frameClock.now - gunComp.timeSinceLast;
        if (diff > gunComp.shotDelay) {
          ShotArchetype.createNew(
              new Vector2D(
                posComp.position.x + dimenComp.dimension.x / 2,
                  posComp.position.y + dimenComp.dimension.y),
              new Vector2D(0, gunComp.bulletVelocity));
          gunComp.timeSinceLast = SharedVariables.frameClock.now;
        }
      }
    }
  }
};