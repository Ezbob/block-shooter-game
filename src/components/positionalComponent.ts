import IComponent from '../dataStructures/IComponent';
import Vector2D from '../dataStructures/Vector2D'
import SharedVariables from '../SharedVariables';

export default class PositionalComponent implements IComponent {
  static cid: number = SharedVariables.componentIdGenerator.generate();
  constructor(
      public position: Vector2D = new Vector2D(0, 0),
      public velocity: Vector2D = new Vector2D(0, 0),
      public breakingForcePercentage: number = 0.6) {}

  get cid() {
    return PositionalComponent.cid;
  }
}