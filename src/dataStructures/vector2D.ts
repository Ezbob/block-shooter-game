
export default class Vector2D extends Array<number> {

  constructor(x: number, y: number) {
    super(x, y);
  }

  get x() {
    return this[0];
  };

  get y() {
    return this[1];
  };

  set x(x) {
    this[0] = x;
  };

  set y(y) {
    this[1] = y;
  };

  magnitude() {
    let sum = 0;
    for (let i = 0; i < this.length; ++i) {
      sum += (this[i] * this[i]);
    }
    return Math.sqrt(sum);
  };

  add(other: Vector2D) : Vector2D {
    let res = new Vector2D(0, 0);
    for (let i = 0; i < this.length; ++i) {
      res[i] = this[i] + other[i];
    }
    return res;
  };

  addMut(other: Vector2D) {
    for (let i = 0; i < this.length; ++i) {
      this[i] = this[i] + other[i];
    }
    return this;
  };

  sub(other: Vector2D) {
    let res = new Vector2D(0, 0);
    for (let i = 0; i < this.length; ++i) {
      res[i] = this[i] - other[i];
    }
    return res;
  };

  subMut(other: Vector2D) {
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

  rotateMut90() {
    this[0] = this[1];
    this[1] = -this[0];
  };

  rotate90() {
    return new Vector2D(this[1], -this[0])
  };

  rotate(angle: number): Vector2D {
    let res = new Vector2D(this.x, this.y);
    res.x = Math.cos(angle) * this.x - Math.sin(angle) * this.y;
    res.y = Math.sin(angle) * this.x + Math.cos(angle) * this.y;
    return res;
  }

  mul(scalar: number) {
    let res = new Vector2D(0, 0);
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

  mulMembers(other: Vector2D) {
    let res = new Vector2D(0, 0);
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

  dot(other: Vector2D) {
    let res = 0;
    for (let i = 0; i < this.length; ++i) {
      res += this[i] * other[i];
    }
    return res;
  };

  equals(other: Vector2D) {
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

  toString() {
    return 'Vector2D(' + this.join(', ') + ')';
  }
};
