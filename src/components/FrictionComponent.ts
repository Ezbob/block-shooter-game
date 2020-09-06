import IComponent from '../dataStructures/IComponent';
import SharedVariables from '../SharedVariables';

export default class FrictionComponent implements IComponent {
  static cid: number = SharedVariables.componentIdGenerator.generate();

  constructor(public frictionBreakingForce = 0.5) {}

  get cid() {
    return FrictionComponent.cid;
  }
}