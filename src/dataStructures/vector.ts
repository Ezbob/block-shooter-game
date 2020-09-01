
export default class Vector extends Array {
  constructor(...args: number[]) {
    super(...args)
  }

  get x() {
    return this[0];
  };

  get y() {
    return this[1];
  };

  get z() {
    return this[2];
  };

  set x(x) {
    this[0] = x;
  };

  set y(y) {
    this[1] = y;
  };

  set z(z) {
    this[2] = z;
  };

  magnitude() {
    let sum = 0;
    for (let i = 0; i < this.length; ++i) {
      sum += (this[i] * this[i]);
    }
    return Math.sqrt(sum);
  };

  add(other: Vector) {
    let res = new Vector();
    for (let i = 0; i < this.length; ++i) {
      res[i] = this[i] + other[i];
    }
    return res;
  };

  addMut(other: Vector) {
    for (let i = 0; i < this.length; ++i) {
      this[i] = this[i] + other[i];
    }
    return this;
  };

  addMutScalars(...scalars: number[]) {
    for (let i = 0; i < this.length; ++i) {
      this[i] = this[i] + scalars[i];
    }
    return this;
  };

  sub(other: Vector) {
    let res = new Vector();
    for (let i = 0; i < this.length; ++i) {
      res[i] = this[i] - other[i];
    }
    return res;
  };

  subMut(other: Vector) {
    for (let i = 0; i < this.length; ++i) {
      this[i] = this[i] - other[i];
    }
    return this;
  };

  subMutScalars(...scalars: number[]) {
    for (let i = 0; i < this.length; ++i) {
      this[i] = this[i] - scalars[i];
    }
    return this;
  };

  rotateMut2d90() {
    this[0] = this[1];
    this[1] = -this[0];
  };

  rotate2d() {
    return new Vector(this[1], -this[0])
  };

  mul(scalar: number) {
    let res = new Vector();
    for (let i = 0; i < this.length; ++i) {
      res[i] = this[i] * scalar;
    }
    return res;
  };

  mulMut(scalar: number) {
    for (let i = 0; i < this.length; ++i) {
      this[i] = this[i] * scalar;
    }
    return this;
  };

  mulMembers(other: Vector) {
    let res = new Vector();
    for (let i = 0; i < this.length; ++i) {
      res[i] = this[i] * other[i];
    }
    return res;
  };

  norm() {
    return this.mul(1 / this.magnitude())
  };

  normMut() {
    return this.mulMut(1 / this.magnitude())
  };

  dot(other: Vector) {
    let res = 0;
    for (let i = 0; i < this.length; ++i) {
      res += this[i] * other[i];
    }
    return res;
  };

  equals(other: Vector) {
    if (this.length !== other.length) {
      return false;
    }

    for (let i = 0; i < this.length; ++i) {
      if (this[i] !== other[i]) {
        return false;
      }
    }
    return true;
  };

  fromArray(array: number[]) {
    return new Vector(...array);
  };

  v(a: number[]) {
    return this.fromArray(a)
  };

  toString() {
    return 'Vector(' + this.join(', ') + ')';
  }
};