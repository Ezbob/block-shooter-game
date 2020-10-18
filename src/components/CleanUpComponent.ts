
import {SharedConstants} from '../SharedConstants';

export class CleanUpComponent {
  constructor(
      public limitUpper = -20,
      public limitLower = SharedConstants.CANVAS_HEIGHT + 20,
      public limitXRight = SharedConstants.CANVAS_WIDTH + 20,
      public limitXLeft = -20) {}
};
