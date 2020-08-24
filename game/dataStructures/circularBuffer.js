
export default class CircularBuffer extends Array {

  constructor(size, FillPrototype) {
    super();

    this.size = size || 15;
    this.next_index = 0;
  
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
  };

  next() {
    var res = this[this.next_index];
    this.next_index = (this.next_index + 1) % this.length;
    return res;
  };

  prev() {
    var res = this[this.next_index];
    var nexti = (this.next_index - 1) % this.length;
    this.next_index = nexti < 0 ? this.length - 1 : nexti;
    return res;
  };

  hasNext() {
    return this.length > 0;
  };

  reset() {
    this.next_index = 0;
  };

  toString() {
    return 'CircularBuffer(' + super.join(', ') + ')';
  };
};