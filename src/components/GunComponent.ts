import IComponent from '../dataStructures/IComponent';
import SharedVariables from '../SharedVariables';

export default class GunComponent implements IComponent {
  static cid: number = SharedVariables.componentIdGenerator.generate();
  public timeSinceLast = 0;
  constructor(public shotDelay = 150, public bulletVelocity = -12) {}

  get cid() {
    return GunComponent.cid;
  }
};