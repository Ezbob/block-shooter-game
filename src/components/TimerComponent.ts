import {SharedVariables} from '../SharedVariables';

export class TimerComponent {
  public expireTime: number = 0;

  constructor(public expireEventName: string, timeFromNow: number, public eventArguments: any[] = null) {
    this.expireTime = SharedVariables.frameClock.now + timeFromNow;
  }
}