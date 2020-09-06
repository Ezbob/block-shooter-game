import SharedVariables from '../SharedVariables';
import IComponent from '../dataStructures/IComponent';

export default class GunComponent implements IComponent {
  static cid: number = SharedVariables.componentIdGenerator.generate();
  public timeSinceLast = 0;
  constructor(public shotDelay = 150) {}

  get cid() {
    return GunComponent.cid;
  }
};