import { EventQueue } from "./EventQueue";

export class FrameClock {
  private _lastUpdate: number = 0;
  private _now: number = 0;
  private _dt: number = 0;
  private lagTime: number = 0;
  private msPerUpdate: number = 0;
  private _isPaused: boolean = false;

  constructor(fpsLimit: number, private eventQueue: EventQueue) {
    this.msPerUpdate = (1 / fpsLimit) * 1000;
  }

  public tick() {
    this._now = window.performance.now();
    this._dt = (this._now - (this._lastUpdate || this._now));
    this._lastUpdate = this.now;
    this.lagTime += this._dt;
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
      this.eventQueue.putEvent('timeResumed', diff);
    }
  }

  public shouldUpdate(): boolean {
    return this.lagTime >= this.msPerUpdate;
  }

  public deductLag() {
    this.lagTime -= this.msPerUpdate;
  }

  public get isPaused(): boolean {
    return this._isPaused;
  }

  public get now(): number {
    return this._now;
  }

  public get dt(): number {
    return this._dt;
  }

  public get lastUpdate(): number {
    return this._lastUpdate;
  }
};
