import Enum from './dataStructures/reversibleEnum.js';

export default {
  CANVAS_HTML_ID: 'playground',
  CANVAS_WIDTH: 1080,
  CANVAS_HEIGHT: 900,
  DEBUG_ON: true,
  REVERSED_INPUT: false,
  FPS_LIMIT: 140,

  ENTITY_TYPES: new Enum('enemy', 'shot', 'player', 'uiProp'),
  SCENARIO_TYPES: new Enum('destroyall', 'timeout'),
  STATE_TYPES: new Enum('pause', 'action', 'intro')
};
