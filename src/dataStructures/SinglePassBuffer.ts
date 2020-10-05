import {IPathBuffer} from './IPathBuffer';

export class SinglePassBuffer<T> implements IPathBuffer<T> {
  private buffer: T[];
  private nextI: number = 0;

  constructor(...args: T[]) {
    this.buffer = [...args];
  }

  next(): T|undefined {
    return this.buffer[this.nextI++];
  }

  first(): T|undefined {
    return this.buffer[0];
  }

  get length(): number {
    return this.buffer.length;
  }

  *[Symbol.iterator](): Generator<T> {
    for (let e of this.buffer) {
      yield e;
    }
  }
};