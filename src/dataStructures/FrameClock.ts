import { TimerComponent } from "../components/TimerComponent";
import { EntityManager } from "./EntityManager";

export class FrameClock {
  private _lastUpdate: number = 0;
  private _now: number = 0;
  private _dt: number = 0;
  private _isPaused: boolean = false;

  constructor(private entityManager: EntityManager) {}

  public tick(now: number) {
    this._now = now
    this._dt = (this._now - (this._lastUpdate || this._now));
    this._lastUpdate = this.now;
  }

  public pause = () => {
    this._isPaused = true;
  }

  public resume = () => {
    if (this._isPaused) {
      this._isPaused = false;
      let now = window.performance.now()
      let diff =  now - this._lastUpdate; 
      this._lastUpdate = now;

      this.entityManager.createEntity(new TimerComponent('timeResumed', diff))
    }
  }

  public get isPaused(): boolean {
    return this._isPaused;
  }

  public get now(): number {
    return this._now;
  }

  public get dt(): number {
    return this._dt / 1000;
  }

  public get lastUpdate(): number {
    return this._lastUpdate;
  }
};
