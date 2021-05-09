
export class CanvasManager {
  private _isAttached: boolean = false;
  private htmlElement: HTMLCanvasElement;
  private context: CanvasRenderingContext2D;
  private _height: number;
  private _width: number;

  constructor(private elementId: string, width: number, height: number) {
    try {
      this.htmlElement =
          document.getElementById(this.elementId) as HTMLCanvasElement;
      this.context = this.htmlElement.getContext('2d');
      this.htmlElement.setAttribute('width', "" + width);
      this.htmlElement.setAttribute('height', "" + height);
      this._width = width;
      this._height = height;
    } catch (exception) {
      this._isAttached = false;
      throw exception;
    }
    if (this.context && this.htmlElement) {
      this._isAttached = true;
    } else {
      this._isAttached = false;
    }
  }

  get canvasWidth() {
    return this._width;
  }

  get canvasHeight() {
    return this._height;
  }

  getCanvasDOMId() {
    return this.elementId;
  };

  getCanvasContext() {
    return this.context;
  };

  getCanvasElement() {
    return this.htmlElement;
  };

  getBoundaries(): MathVector2d {
    return {x: this._width, y: this._height}
  }

  isAttached() {
    return this._isAttached;
  };
};