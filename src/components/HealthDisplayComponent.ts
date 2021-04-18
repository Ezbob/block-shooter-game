
import {IHealthBeadColors} from './IHealthBeadColors';

export class HealthDisplayComponent {
  constructor(
      public position: MathVector2d,
      public dimension: MathVector2d = {x: 20, y: 15},
      public maxDisplayBead = 8,
      public colors: IHealthBeadColors = {
        ok: 'rgb(103, 229, 25)',
        warning: 'rgb(255, 203, 33)',
        fatal: 'rgb(219, 6, 6)'
      }) {}
};