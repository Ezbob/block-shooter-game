import { IPathBuffer } from "./IPathBuffer";

export class CircularBuffer<T> implements IPathBuffer<T> {
  private nextIndex: number = 0;
  private buffer: T[];

  constructor(...args: T[]) {
    this.buffer = args;
  }

  next(): T | undefined {
    return this.buffer[this.nextIndex++ % this.length];
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