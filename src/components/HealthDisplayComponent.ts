import IComponent from '../dataStructures/IComponent';
import Vector2D from '../dataStructures/Vector2D';
import SharedConstants from '../SharedConstants';

export interface IHealthBeadColors {
  ok: string, warning: string, fatal: string
}

export default class HealthDisplayComponent implements IComponent {
  static cid = 10;
  constructor(
      public colors: IHealthBeadColors = {
        ok: 'rgb(103, 229, 25)',
        warning: 'rgb(255, 203, 33)',
        fatal: 'rgb(219, 6, 6)'
      },
      public position = new Vector2D(10, SharedConstants.CANVAS_HEIGHT - 20),
      public dimension = new Vector2D(20, 15),
      public maxDisplayBead = 8) {}

  get cid(): number {
    return HealthDisplayComponent.cid
  }
};