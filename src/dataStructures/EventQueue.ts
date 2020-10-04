import {IEvent} from './IEvent';

export class EventQueue {
  private queue = new Array<IEvent>();

  public putEvent(event: string, ...args: any[]) {
    let newEvent: IEvent = {name: event, args: args ? args : null};
    this.queue.push(newEvent);
  }

  public clear() {
    if (this.queue.length > 0) {
      this.queue = [];
    }
  }

  public * [Symbol.iterator]() {
    for (let q of this.queue) {
      yield q;
    }
  }
};