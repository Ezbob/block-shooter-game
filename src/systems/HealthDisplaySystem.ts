import HealthComponent from '../components/HealthComponent';
import HealthDisplayComponent, {IHealthBeadColors} from '../components/HealthDisplayComponent';
import EntityManager from '../dataStructures/EntityManager';
import SharedVariables from '../SharedVariables';
import ISystem from './ISystem';

export default class HealthDisplaySystem implements ISystem {
  getBeadColor(
      colors: IHealthBeadColors, numberOfBeads: number,
      maxBeads: number): string {
    var mid = Math.floor(maxBeads * 0.5);
    var lower = Math.floor(maxBeads * 0.25);
    if (numberOfBeads > mid) {
      return colors.ok;
    } else if (numberOfBeads <= mid && numberOfBeads > lower) {
      return colors.warning;
    } else {
      return colors.fatal;
    }
  }

  update(): void {
    let ctx = SharedVariables.canvasManager.getCanvasContext();

    for (let e of EntityManager) {
      let healthComp = e.getComponentByType(HealthComponent)
      let healthDispComp = e.getComponentByType(HealthDisplayComponent)

      if (healthComp && healthDispComp) {
        let beads = Math.floor(
            healthComp.health /
                Math.ceil(
                    healthComp.maxHealth / healthDispComp.maxDisplayBead) +
            1);
        let beadColor = this.getBeadColor(
            healthDispComp.colors, beads, healthDispComp.maxDisplayBead)
        ctx.fillStyle = beadColor;

        for (let i = 0; i < beads; i++) {
          ctx.fillRect(
              (healthDispComp.position.x + 3) +
                  (healthDispComp.dimension.x * i),
              healthDispComp.position.y + 2, healthDispComp.dimension.x - 5,
              healthDispComp.dimension.y - 2);
        }
      }
    }
  }
};