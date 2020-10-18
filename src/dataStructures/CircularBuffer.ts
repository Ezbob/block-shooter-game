import { IPathBuffer } from "./IPathBuffer";

export class CircularBuffer<T> implements IPathBuffer<T> {
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

  get length(): number {
    return this.buffer.length;
  }

  *[Symbol.iterator]() : Generator<T> {
    for (let e of this.buffer) {
      yield e;
    }
  }
};