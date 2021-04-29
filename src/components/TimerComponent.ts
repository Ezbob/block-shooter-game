

export class TimerComponent {

  constructor(
    public eventName: string,
    public time: number,
    public eventArguments: any[] = null) {
  }
}