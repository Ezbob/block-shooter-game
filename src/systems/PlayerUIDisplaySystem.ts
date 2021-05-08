import { DeathMessageComponent } from '../components/DeathComponent';
import {HealthComponent} from '../components/HealthComponent';
import {HealthDisplayComponent} from '../components/HealthDisplayComponent';
import {ScoreComponent} from '../components/ScoreComponent';
import {ScoreDisplayComponent} from '../components/ScoreDisplayComponent';
import {GameContext} from '../GameContext';
import {ISystem} from './ISystem';

export class PlayerUIDisplaySystem implements ISystem {
  getBeadColor(
      colors: {
        ok: string, warning: string, fatal: string
      }, numberOfBeads: number,
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

  update(gtx: GameContext): void {
    let ctx = gtx.canvasManager.getCanvasContext();

    for (let e of gtx.entityManager) {
      let healthComp = e.getComponent(HealthComponent)
      let healthDispComp = e.getComponent(HealthDisplayComponent)
      let scoreComp = e.getComponent(ScoreComponent);
      let scoreDisplayComp = e.getComponent(ScoreDisplayComponent)
      let deathMessage = e.getComponent(DeathMessageComponent)


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

      if (scoreComp && scoreDisplayComp) {
        ctx.fillStyle = scoreDisplayComp.color;
        ctx.font =
            `${scoreDisplayComp.pixelSize} ${scoreDisplayComp.fontFaceName}`

        let text = `${scoreComp.score}`;
        let textMeasure = ctx.measureText(text);
        ctx.fillText(
            text, scoreDisplayComp.position.x - (textMeasure.width / 2),
            scoreDisplayComp.position.y)
      }

      if (deathMessage) {
        let text = deathMessage.message
        let measurement = ctx.measureText(text)
        //ctx.fillStyle = `${deathMessage.color}`
        //ctx.font = `${deathMessage.pixelSize} ${deathMessage.fontFaceName}`
        ctx.fillText(text, 
          gtx.canvasManager.canvasWidth / 2 - measurement.width / 2, 
          gtx.canvasManager.canvasHeight / 2 - measurement.emHeightDescent / 2)
      }
    }
  }
};