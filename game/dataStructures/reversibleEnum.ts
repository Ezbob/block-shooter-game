
export default class Enum {
  map: {[key: string]: number};
  private _length: number;
  constructor(...args: any[]) {
    this.map = {};
    this._length = args.length;

    for (let i = 0; i < args.length; ++i) {
      this.map[args[i]] = i;
    }
  }

  get(key: string) {
    return typeof this.map[key] === 'undefined' ? -1 : this.map[key];
  };

  get length() {
    return this._length;
  }
};