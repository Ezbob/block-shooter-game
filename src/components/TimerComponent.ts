import { SpawnComponent } from "./SpawnComponent";

export class TimerComponent {

  constructor(
    public eventName: string,
    public time: number,
    public spawn: SpawnComponent = null) {
  }
}