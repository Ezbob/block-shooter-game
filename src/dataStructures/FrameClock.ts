
export class FrameClock {
  private _lastUpdate: number;
  private _now: number;
  private _dt: number;
  private _lag: number;
  private _msPerUpdate: number;

  constructor(fpsLimit: number) {
    this._lastUpdate = 0;
    this._now = 0;
    this._dt = 0;
    this._lag = 0;
    this._msPerUpdate = (1 / fpsLimit) * 1000;
  }

  update() {
    this._now = window.performance.now();
    this._dt = (this._now - (this._lastUpdate || this._now));
    this._lastUpdate = this.now;
    this._lag += this._dt;
  };

  public get now(): number {
    return this._now;
  }

  public get dt(): number {
    return this._dt;
  }

  public get lastUpdate(): number {
    return this._lastUpdate;
  }

  public shouldUpdate(): boolean {
    return this._lag >= this._msPerUpdate;
  }

  public deductLag()  {
    this._lag -= this._msPerUpdate;
  }
};
