import ReversibleEnum from './dataStructures/reversibleEnum.js';

let Constants = {
  CANVAS_HTML_ID: 'playground',
  CANVAS_WIDTH: 1080,
  CANVAS_HEIGHT: 900,
  DEBUG_ON: false,
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

export default Constants;