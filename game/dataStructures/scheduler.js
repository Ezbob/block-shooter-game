import ReversibleEnum from './reversibleEnum.js';
import Variables from '../sharedVariables.js';

export default function Scheduler() {
  var me = this;

  me.events = [];
  me.EventType = new ReversibleEnum('after', 'until');

  me.TimedEvent = function(
      type, action, startTimestamp, duration, activationTimes) {
    this.startTimestamp = startTimestamp;
    this.type = type;
    this.action = action;
    this.enabled = true;
    this.duration = typeof duration !== 'number' ? 0 : duration;
    this.activationTimes =
        typeof activationTimes !== 'number' ? 0 : activationTimes;
    this.activate = function() {};
  };

  me.update = function() {
    for (var i = me.events.length - 1; i >= 0; --i) {
      var current = me.events[i];
      if (current.enabled) {
        current.activate();
      } else {
        me.events.splice(i, 1);
      }
    }
  };

  /*
   * do the action after milisecs passed
   */
  me.after = function(milisec, action) {
    var now = Variables.frameClock.now;
    var event =
        new me.TimedEvent(me.EventType.get('after'), action, now, milisec);
    event.activate = function() {
      var now = Variables.frameClock.now;
      if (now - this.startTimestamp >= this.duration && this.enabled) {
        this.action();
        this.enabled = false;
      }
    };
    return me.events[me.events.push(event)];
  };

  /*
   * do the action until milisecs passed
   */
  me.until = function(milisec, action) {
    var now = Variables.frameClock.now;
    var event =
        new me.TimedEvent(me.EventType.get('until'), action, now, milisec);

    event.activate = function() {
      var now = Variables.frameClock.now;
      this.action();
      if (now - this.startTimestamp >= this.duration && this.enabled) {
        this.enabled = false;
      }
    };
    return me.events[me.events.push(event)];
  };

  me.__proto__.toString = function() {
    return 'Scheduler(' + me.events.join(', ') + ')';
  };
};