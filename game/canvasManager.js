import Constants from './sharedConstants.js';

export default class CanvasManager {
  constructor(elementId) {
    this.isAttached = false;
    this.elementId = elementId ? elementId : Constants.CANVAS_HTML_ID;
  }

  setup() {
    try {
      this.html_element = document.getElementById(this.elementId);
      this.context = this.html_element.getContext('2d');
      this.html_element.setAttribute('width', Constants.CANVAS_WIDTH);
      this.html_element.setAttribute('height', Constants.CANVAS_HEIGHT);
    } catch (exception) {
      this.isAttached = false;
      throw exception;
    }
    if (this.context && this.html_element) {
      this.isAttached = true;
    } else {
      this.isAttached = false;
    }
  };

  getCanvasDOMId() {
    return this.elementId;
  };

  getCanvasContext() {
    return this.context;
  };

  getCanvasElement() {
    return this.html_element;
  };

  isAttached() {
    return this.isAttached;
  };
};