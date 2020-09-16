import IComponent from '../dataStructures/IComponent';
import SharedConstants from '../SharedConstants';

export default class CleanUpComponent implements IComponent {
  static cid: number = 2;
  constructor(
      public limitUpper = -20,
      public limitLower = SharedConstants.CANVAS_HEIGHT + 20,
      public limitXRight = SharedConstants.CANVAS_WIDTH + 20,
      public limitXLeft = -20) {}

  get cid() {
    return CleanUpComponent.cid;
  }
};
