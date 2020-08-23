import ReversibleEnum from './dataStructures/reversibleEnum.js';

let Constants = {
  CANVAS_HTML_ID: 'playground',
  CANVAS_WIDTH: 1080,
  CANVAS_HEIGHT: 900,
  DEBUG_ON: true,
  REVERSED_INPUT: false,
  FPS_LIMIT: 140,

  ENTITY_TYPES:
      new ReversibleEnum('enemy', 'cloud', 'shot', 'player', 'uiProp'),
  SCENARIO_TYPES: new ReversibleEnum('destroyall', 'timeout'),
  STATE_TYPES: new ReversibleEnum('pause', 'action', 'intro')
};

export default Constants;