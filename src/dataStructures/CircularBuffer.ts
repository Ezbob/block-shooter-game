
export default class CircularBuffer<T> {
  private nextIndex: number;
  private buffer: T[];

  constructor(...args: T[]) {
    this.buffer = args;
    this.nextIndex = 0;
  }

  next(): T | undefined {
    let res = this.buffer[this.nextIndex];
    this.nextIndex = (this.nextIndex + 1) % this.length;
    return res;
  }

  first(): T | undefined {
    return this.buffer[0];
  }

  last(): T | undefined {
    return this.buffer[this.length - 1];
  }

  reset() {
    this.nextIndex = 0;
  }

  *[Symbol.iterator]() {
    for (let e of this.buffer) {
      yield e;
    }
  }

  get length(): number {
    return this.buffer.length;
  }
};