
export default class ReversibleEnum {
  constructor(...args) {
    this.map = {};
    this.reverseMap = {};

    for (var i = 0; i < args.length; ++i) {
      this.map[args[i]] = i;
    }

    var keys = Object.keys(this.map);

    for (var i = 0; i < keys.length; ++i) {
      var currkey = keys[i];
      this.reverseMap[this.map[currkey]] = currkey;
    }
  }

  get(key) {
    return typeof this.map[key] === 'undefined' ? -1 : this.map[key];
  };

  getReverse(value) {
    return this.reverseMap[value] || 'unknown';
  };
};