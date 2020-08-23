import ReversibleEnum from './dataStructures/reversibleEnum.js';

let Constants = {
  CANVAS_HTML_ID: 'playground',
  CANVAS: null,
  CONTEXT2D: null,
  DEBUG_ON: false,
  CANVAS_WIDTH: 1080,
  CANVAS_HEIGHT: 900,
  REVERSED_INPUT: false,
  FPS_LIMIT: 140,
  KEYS: {
    left: 37,
    up: 38,
    right: 39,
    down: 40,
    z: 90,
    x: 88,
    space: 32,
    enter: 13,
    control: 17,
    alt: 18,
    escape: 27
  },

  ENTITY_TYPES:
      new ReversibleEnum('enemy', 'cloud', 'shot', 'player', 'uiProp'),
  SCENARIO_TYPES: new ReversibleEnum('destroyall', 'timeout'),
  STATE_TYPES: new ReversibleEnum('pause', 'action', 'intro')
};

Constants.CANVAS = document.getElementById(Constants.CANVAS_HTML_ID);
Constants.CONTEXT2D = Constants.CANVAS.getContext('2d');
Constants.CANVAS.setAttribute('width', Constants.CANVAS_WIDTH);
Constants.CANVAS.setAttribute('height', Constants.CANVAS_HEIGHT);

export default Constants;