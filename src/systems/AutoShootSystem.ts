import ShotArchetype from '../archetypes/ShotArchetype';
import AutoShootComponent from '../components/AutoShootComponent';
import DimensionalComponent from '../components/DimensionalComponent';
import GunComponent from '../components/GunComponent';
import PositionalComponent from '../components/PositionalComponent';
import EntityManager from '../dataStructures/EntityManager';
import Vector2D from '../dataStructures/Vector2D';
import SharedVariables from '../SharedVariables';


import ISystem from './ISystem';

export default class AutoShootSystem implements ISystem {
  update() {
    for (let e of EntityManager) {
      let autoShootComp = e.getComponentByType(AutoShootComponent);

      if (autoShootComp && autoShootComp.isShooting) {
        let gunComp = e.getComponentByType(GunComponent);
        let posComp = e.getComponentByType(PositionalComponent);
        let dimensionComp = e.getComponentByType(DimensionalComponent);

        if (!(gunComp && posComp && dimensionComp)) {
          continue;
        }

        let diff = SharedVariables.frameClock.now - gunComp.timeSinceLast;
        if (diff > gunComp.shotDelay) {
          ShotArchetype.createNew(
              new Vector2D(
                posComp.position.x + dimensionComp.dimension.x / 2,
                  posComp.position.y + dimensionComp.dimension.y),
              new Vector2D(0, gunComp.bulletVelocity), 0x0001);
          gunComp.timeSinceLast = SharedVariables.frameClock.now;
        }
      }
    }
  }
};