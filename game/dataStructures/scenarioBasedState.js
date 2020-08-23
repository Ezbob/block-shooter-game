import Scenario from './scenario.js';
import GameState from './gameState.js';
import Constants from '../sharedConstants.js';

export default function ScenarioBasedState() {
    var me = this;

    me.__proto__ = new GameState(Constants.STATE_TYPES.get('action'));
    me.scenarioStack = [];

    me.getCurrentScenario = function() {
        return me.scenarioStack.length > 0 ?  me.scenarioStack[me.scenarioStack.length - 1] : new Scenario()
    };
};

