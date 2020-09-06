import IComponent from '../dataStructures/IComponent';
import Vector2D from '../dataStructures/Vector2D';
import SharedVariables from '../SharedVariables';

export default class CanvasCollisionComponent implements IComponent {
  static cid: number = SharedVariables.componentIdGenerator.generate();

  constructor(
      public canvasPaddingX: Vector2D = new Vector2D(0, 0),
      public canvasPaddingY: Vector2D = new Vector2D(0, 0)) {}

  get cid() {
    return CanvasCollisionComponent.cid;
  }
};