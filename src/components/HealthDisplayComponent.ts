
import {SharedConstants} from '../SharedConstants';
import {IHealthBeadColors} from './IHealthBeadColors';


export class HealthDisplayComponent {
  constructor(
      public colors: IHealthBeadColors = {
        ok: 'rgb(103, 229, 25)',
        warning: 'rgb(255, 203, 33)',
        fatal: 'rgb(219, 6, 6)'
      },
      public position = {x: 10, y: SharedConstants.CANVAS_HEIGHT - 20},
      public dimension = {x: 20, y: 15}, public maxDisplayBead = 8) {}
};