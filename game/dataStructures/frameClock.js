
export default class FrameClock {
  constructor() {
    this.lastUpdate = 0;
    this.now = 0;
    this.dt = 0;
  }

  update() {
    this.now = window.performance.now();
    this.dt = (this.now - (this.lastUpdate || this.now));
    this.lastUpdate = this.now;
  };
};
