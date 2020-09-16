import IComponent from '../dataStructures/IComponent';
import Vector2D from '../dataStructures/Vector2D';

export default class CanvasBoundaryComponent implements IComponent {
  static cid: number = 1;

  constructor(
      public canvasPaddingX: Vector2D = new Vector2D(0, 0),
      public canvasPaddingY: Vector2D = new Vector2D(0, 0)) {}

  get cid() {
    return CanvasBoundaryComponent.cid;
  }
};