import Constants from './sharedConstants.js';

export default function CanvasManager(elementId) {
  var me = this;
  me.isAttached = false;
  me.elementId = elementId ? elementId : Constants.CANVAS_HTML_ID;

  me.setup = function() {
    try {
      me.html_element = document.getElementById(me.elementId);
      me.context = me.html_element.getContext('2d');
      me.html_element.setAttribute('width', Constants.CANVAS_WIDTH);
      me.html_element.setAttribute('height', Constants.CANVAS_HEIGHT);
    } catch (exception) {
      me.isAttached = false;
      throw exception;
    }
    if (me.context && me.html_element) {
      me.isAttached = true;
    } else {
      me.isAttached = false;
    }
  };

  me.getCanvasDOMId = function() {
    return me.elementId;
  };

  me.getCanvasContext = function() {
    return me.context;
  };

  me.getCanvasElement = function() {
    return me.html_element;
  };

  me.isAttached = function() {
    return me.isAttached;
  };
};