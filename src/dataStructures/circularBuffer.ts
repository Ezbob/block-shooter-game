
export default class CircularBuffer<T> {
  private maxLength: number;
  private nextIndex: number;
  private buffer: T[];

  constructor(...args: T[]) {
    this.buffer = args;
    this.maxLength = args.length;
    this.nextIndex = 0;
  }

  fill(maxLength: number, FillPrototype: any, ...args: any[]) {
    this.maxLength = maxLength;
    if (!(typeof FillPrototype == 'undefined' || FillPrototype == null)) {
      for (var i = 0; i < this.maxLength; ++i) {
        this.buffer.push(new FillPrototype(...args));
      }
    }
  }

  push(element: any) {
    if (this.length < this.maxLength) {
      this.buffer.push(element);
      return true;
    } else {
      return false;
    }
  }

  next(): any {
    let res = this.buffer[this.nextIndex];
    this.nextIndex = (this.nextIndex + 1) % this.length;
    return res;
  }

  isNewCycleNext(): boolean {
    return this.nextIndex === 0;
  }

  prev(): any {
    let res = this.buffer[this.nextIndex];
    let nextI = (this.nextIndex - 1) % this.length;
    this.nextIndex = nextI < 0 ? this.length - 1 : nextI;
    return res;
  };

  hasNext(): boolean {
    return this.length > 0;
  };

  reset() {
    this.nextIndex = 0;
  }

  get length(): number {
    return this.buffer.length;
  }
};