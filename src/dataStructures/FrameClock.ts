
export default class FrameClock {
  private _lastUpdate: number;
  private _now: number;
  private _dt: number;

  constructor() {
    this._lastUpdate = 0;
    this._now = 0;
    this._dt = 0;
  }

  update() {
    this._now = window.performance.now();
    this._dt = (this._now - (this._lastUpdate || this._now));
    this._lastUpdate = this.now;
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
};
