
export default class Enum {
  constructor(...args) {
    this.map = {};

    for (var i = 0; i < args.length; ++i) {
      this.map[args[i]] = i;
    }
  }

  get(key) {
    return typeof this.map[key] === 'undefined' ? -1 : this.map[key];
  };

  get length() {
    if (!this._length) {
      this._length = Object.keys(this.map).length;
    }
    return this._length
  }
};