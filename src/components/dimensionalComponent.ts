import Vector2D from '../dataStructures/Vector2D'
import SharedVariables from '../SharedVariables';
import IComponent from '../dataStructures/IComponent';

export default class DimensionalComponent implements IComponent {
  static cid: number = SharedVariables.componentIdGenerator.generate();
  constructor(public dimension: Vector2D = new Vector2D(10, 10)) {}

  get cid() {
    return DimensionalComponent.cid;
  }
}