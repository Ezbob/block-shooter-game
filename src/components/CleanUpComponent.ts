import SharedConstants from '../SharedConstants';

export default class CleanUpComponent {
  constructor(
      public limitUpper = -20,
      public limitLower = SharedConstants.CANVAS_HEIGHT + 20) {}
};