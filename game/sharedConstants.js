import ReversibleEnum from './dataStructures/reversibleEnum.js';

let Constants = {
    CANVAS_HTML_ID: "playground",
    CANVAS: null,
    CONTEXT2D: null,
    DEBUG_ON: false,
    CANVAS_WIDTH: 1080,
    CANVAS_HEIGHT: 0,
    MAX_SHOTS: 300,
    MAX_ENEMIES: 25,
    DIRECTION: 1, // if negative reverse the controls, if zero no controls, else normal
    BASE_VELOCITY: {x: 2, y: 2},
    TRAVEL_VELOCITY: 0.45,
    FPS_LIMIT: 140,
    NUMBER_OF_CLOUDS: 30,
    KEYS: { left: 37, up: 38, right: 39, down: 40, z: 90, x: 88, space: 32, enter: 13, control: 17, alt: 18, escape: 27 },
    ENTITY_TYPES: new ReversibleEnum('enemy', 'cloud', 'shot', 'player', 'uiProp'),
    SCENARIO_TYPES: new ReversibleEnum('destroyall', 'timeout'),
    STATE_TYPES: new ReversibleEnum('pause', 'action', 'intro')
};

Constants.CANVAS_HEIGHT = Constants.CANVAS_WIDTH / 12 * 9;
Constants.CANVAS = document.getElementById(Constants.CANVAS_HTML_ID);
Constants.CONTEXT2D = Constants.CANVAS.getContext('2d');
Constants.CANVAS.setAttribute("width", Constants.CANVAS_WIDTH);
Constants.CANVAS.setAttribute("height", Constants.CANVAS_HEIGHT);

export default Constants;