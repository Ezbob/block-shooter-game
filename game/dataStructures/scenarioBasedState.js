import Constants from '../sharedConstants.js';

import GameState from './gameState.js';
import Scenario from './scenario.js';

export default class ScenarioBasedState extends GameState {
  constructor() {
    super(Constants.STATE_TYPES.get('action'));
    this.scenarioStack = [];
  }

  getCurrentScenario() {
    return this.scenarioStack.length > 0 ?
        this.scenarioStack[this.scenarioStack.length - 1] :
        new Scenario()
  };
};
