

export class TimerComponent {

  constructor(
    public expireEventName: string,
    public expireTime: number,
    public eventArguments: any[] = null) {
  }
}