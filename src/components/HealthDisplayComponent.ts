
import {Vector2D} from '../dataStructures/Vector2D';
import {SharedConstants} from '../SharedConstants';
import {IHealthBeadColors} from './IHealthBeadColors';


export class HealthDisplayComponent {
  constructor(
      public colors: IHealthBeadColors = {
        ok: 'rgb(103, 229, 25)',
        warning: 'rgb(255, 203, 33)',
        fatal: 'rgb(219, 6, 6)'
      },
      public position = new Vector2D(10, SharedConstants.CANVAS_HEIGHT - 20),
      public dimension = new Vector2D(20, 15), public maxDisplayBead = 8) {}
};