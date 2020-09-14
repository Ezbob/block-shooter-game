import IComponent from '../dataStructures/IComponent';
import SharedVariables from '../SharedVariables';

export default class AutoShootComponent implements IComponent {
  static cid: number = SharedVariables.componentIdGenerator.generate();
  constructor(public isShooting = true) {}

  get cid() {
    return AutoShootComponent.cid;
  }
}