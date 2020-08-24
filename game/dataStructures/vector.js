
export default class Vector extends Array {

  constructor(...args) {
    super(...args)
  }

  getX() {
    return this[0];
  };

  getY() {
    return this[1];
  };

  getZ() {
    return this[2];
  };

  setX(x) {
    this[0] = x;
  };

  setY(y) {
    this[1] = y;
  };

  setZ(z) {
    this[2] = z;
  };

  magnitude() {
    var sum = 0;
    for (var i = 0; i < this.length; ++i) {
      sum += (this[i] * this[i]);
    }
    return Math.sqrt(sum);
  };

  add(other) {
    var res = new Vector();
    for (var i = 0; i < this.length; ++i) {
      res[i] = this[i] + other[i];
    }
    return res;
  };

  addme(other) {
    for (var i = 0; i < this.length; ++i) {
      this[i] = this[i] + other[i];
    }
    return this;
  };

  addmut(...scalars) {
    for (var i = 0; i < this.length; ++i) {
      this[i] = this[i] + scalars[i];
    }
    return this;
  };

  sub(other) {
    var res = new Vector();
    for (var i = 0; i < this.length; ++i) {
      res[i] = this[i] - other[i];
    }
    return res;
  };

  subme(other) {
    for (var i = 0; i < this.length; ++i) {
      this[i] = this[i] - other[i];
    }
    return this;
  };

  rotateme2d90() {
    this[0] = this[1]
    this[1] = -this[0]
  };

  rotate2d() {
    return new Vector(this[1], -this[0])
  };

  mul(scalar) {
    var res = new Vector();
    for (var i = 0; i < this.length; ++i) {
      res[i] = this[i] * scalar;
    }
    return res;
  };

  mulme(scalar) {
    for (var i = 0; i < this.length; ++i) {
      this[i] = this[i] * scalar;
    }
    return this;
  };

  mulmembers(other) {
    var res = new Vector();
    for (var i = 0; i < this.length; ++i) {
      res[i] = this[i] * other[i];
    }
    return res;
  };

  norm() {
    return this.mul(1 / this.magnitude())
  };

  dot(other) {
    var res = 0;
    for (var i = 0; i < this.length; ++i) {
      res += this[i] * other[i];
    }
    return res;
  };

  equals(other) {
    if (this.length !== other.length) {
      return false;
    }

    for (var i = 0; i < this.length; ++i) {
      if (this[i] !== other[i]) {
        return false;
      }
    }
    return true;
  };

  fromArray(array) {
    var res = new Vector();
    res = array;
    return res;
  };

  v(a) {
    return this.fromArray(a)
  };

  toString() {
    return 'Vector(' + this.join(", ") + ')';
  }
};