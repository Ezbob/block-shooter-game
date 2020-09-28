import SharedVariables from '../SharedVariables';

export default class TimerComponent {
  public expireTime: number = 0;
  constructor(public expireEventName: string, timeFromNow: number) {
    this.expireTime = SharedVariables.frameClock.now + timeFromNow;
  }
}