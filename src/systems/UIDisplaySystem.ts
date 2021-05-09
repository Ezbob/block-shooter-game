import { MessageComponent } from '../components/MessageComponent';
import {HealthComponent} from '../components/HealthComponent';
import {HealthDisplayComponent} from '../components/HealthDisplayComponent';
import {ScoreComponent} from '../components/ScoreComponent';
import {GameContext} from '../GameContext';
import {ISystem} from './ISystem';
import { Vec2dParse } from '../VectorOperations';

export class UIDisplaySystem implements ISystem {
  private getBeadColor(
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
      let messageComp = e.getComponent(MessageComponent)


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

      if (scoreComp && messageComp) {
        messageComp.message = "" + scoreComp.score
      }

      if (messageComp) {
        let text = messageComp.message
        let measurement = ctx.measureText(text)
        let resolved = Vec2dParse(messageComp.position, gtx.canvasManager.getBoundaries(), {
          x: (measurement.width / 2),
          y: (messageComp.pixelSize / 2)
        })

        ctx.font = `${messageComp.pixelSize}px ${messageComp.fontFaceName}`

        if (messageComp.isFilled) {
          ctx.fillStyle = `${messageComp.color}`
          ctx.fillText(text, resolved.x, resolved.y)
        } else {
          ctx.strokeStyle = `${messageComp.color}`
          ctx.strokeText(text, resolved.x, resolved.y)
        }

      }
    }
  }
};