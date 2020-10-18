import {SharedConstants} from './SharedConstants';

export class CanvasManager {
  private _isAttached: boolean = false;
  private htmlElement: HTMLCanvasElement;
  private context: CanvasRenderingContext2D;

  constructor(private elementId: string = SharedConstants.CANVAS_HTML_ID) {
    try {
      this.htmlElement =
          document.getElementById(this.elementId) as HTMLCanvasElement;
      this.context = this.htmlElement.getContext('2d');
      this.htmlElement.setAttribute('width', SharedConstants.CANVAS_WIDTH.toString());
      this.htmlElement.setAttribute('height', SharedConstants.CANVAS_HEIGHT.toString());
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

  getCanvasDOMId() {
    return this.elementId;
  };

  getCanvasContext() {
    return this.context;
  };

  getCanvasElement() {
    return this.htmlElement;
  };

  isAttached() {
    return this._isAttached;
  };
};