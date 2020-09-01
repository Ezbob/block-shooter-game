
export default class CircularBuffer extends Array {
  constructor(...args) {
    super(...args);

    this.size = args.length;
    this.nextIndex = 0;
  }

  fill(size, FillPrototype) {
    this.size = size;
    if (!(typeof FillPrototype == 'undefined' || FillPrototype == null)) {
      for (var i = 0; i < this.size; ++i) {
        this.push(new FillPrototype(arguments.slice(2)));
      }
    }
  }

  push(element) {
    if (this.length < this.size) {
      super.push(element);
      return true;
    } else {
      return false;
    }
  }

  next() {
    let res = this[this.nextIndex];
    this.nextIndex = (this.nextIndex + 1) % this.length;
    return res;
  }

  isNewCycleNext() {
    return this.nextIndex === 0;
  }

  prev() {
    let res = this[this.nextIndex];
    let nextI = (this.nextIndex - 1) % this.length;
    this.nextIndex = nextI < 0 ? this.length - 1 : nextI;
    return res;
  };

  hasNext() {
    return this.length > 0;
  };

  reset() {
    this.nextIndex = 0;
  };

  toString() {
    return 'CircularBuffer(' + super.join(', ') + ')';
  };
};