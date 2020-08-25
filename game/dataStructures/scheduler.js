import Variables from '../sharedVariables.js';

import Enum from './reversibleEnum.js';


class TimedEvent {
  constructor(type, action, startTimestamp, duration, activationTimes) {
    this.startTimestamp = startTimestamp;
    this.type = type;
    this.action = action;
    this.enabled = true;
    this.duration = typeof duration !== 'number' ? 0 : duration;
    this.activationTimes =
        typeof activationTimes !== 'number' ? 0 : activationTimes;
  }
  activate() {};
};

export default class Scheduler {
  constructor() {
    this.events = [];
    this.EventType = new Enum('after', 'until');
  }

  update() {
    for (var i = this.events.length - 1; i >= 0; --i) {
      var current = this.events[i];
      if (current.enabled) {
        current.activate();
      } else {
        this.events.splice(i, 1);
      }
    }
  };

  /*
   * do the action after milisecs passed
   */
  after(milisec, action) {
    var now = Variables.frameClock.now;
    var event =
        new TimedEvent(this.EventType.get('after'), action, now, milisec);
    event.activate = function() {
      var now = Variables.frameClock.now;
      if (now - this.startTimestamp >= this.duration && this.enabled) {
        this.action();
        this.enabled = false;
      }
    };
    return this.events[this.events.push(event)];
  };

  /*
   * do the action until milisecs passed
   */
  until(milisec, action) {
    var now = Variables.frameClock.now;
    var event =
        new TimedEvent(this.EventType.get('until'), action, now, milisec);

    event.activate = function() {
      var now = Variables.frameClock.now;
      this.action();
      if (now - this.startTimestamp >= this.duration && this.enabled) {
        this.enabled = false;
      }
    };
    return this.events[this.events.push(event)];
  };

  toString() {
    return 'Scheduler(' + this.events.join(', ') + ')';
  };
};