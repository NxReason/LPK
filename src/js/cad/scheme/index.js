/**
 * Main CAD data handler
 */
import pubsub from '../../utils/pubsub';
import {
  DEFAULT_STATE_NAME,
  DEFAULT_TOOL_NAME,
  DEFAULT_TOOL_TYPE,
  DEFAULT_IMAGE_ID,
} from '../config';
import normalize from './normalize';

class Scheme {
  constructor() {
    // model data
    this.name = '';
    this.initialState = '';
    this.breakTime = 5;
    this.steps = 10;
    this.tools = {};
    this.states = {};
    this.parameters = {};
    this.actions = {};

    // util props
    this._cs = null; // Current state

    // non menu events
    pubsub.subscribe('stateCreated', this.addState.bind(this));
    pubsub.subscribe('stateSelected', this.setCurrentState.bind(this));

    // model menu events
    pubsub.subscribe('nameChanged', this.setName.bind(this));
    pubsub.subscribe('breakChanged', this.setBreakTime.bind(this));
    pubsub.subscribe('stepsChanged', this.setSteps.bind(this));

    // tool menu events
    pubsub.subscribe('toolCreated', this.addTool.bind(this));
    pubsub.subscribe('toolNameChanged', this.setToolName.bind(this));
    pubsub.subscribe('toolTypeChanged', this.setToolType.bind(this));
    pubsub.subscribe('toolRangeChanged', this.setToolRange.bind(this));

    // state menu events
    pubsub.subscribe('stateNameChanged', this.setStateName.bind(this));
    pubsub.subscribe('stateImageChanged', this.setStateImage.bind(this));
    pubsub.subscribe('initialStateChanged', this.setInitialState.bind(this));

    // event menu events
    pubsub.subscribe('eventNameChanged', this.setEventName.bind(this));
    pubsub.subscribe('eventDescChanged', this.setEventDesc.bind(this));

    // parameters menu events
    pubsub.subscribe('parameterCreated', this.addParameter.bind(this));
    pubsub.subscribe('parameterNameChanged', this.setParameterName.bind(this));
    pubsub.subscribe('parameterValueChanged', this.setParameterValue.bind(this));

    // actions menu events
    pubsub.subscribe('actionCreated', this.addAction.bind(this));
    pubsub.subscribe('actionNextStateChanged', this.setActionNextState.bind(this));
    pubsub.subscribe('actionTimeChanged', this.setActionTime.bind(this));
    pubsub.subscribe('actionToolChanged', this.setActionTool.bind(this));
    pubsub.subscribe('actionToolValueChanged', this.setActionToolValue.bind(this));
    pubsub.subscribe('inactiveActionSet', this.setInactiveAction.bind(this));

    // send states data to action creator
    // receive any payload and return it back with states array
    // and current state uuid
    pubsub.subscribe('schemeDataRequested', (payload) => {
      const states = Object.values(this.states);
      const tools = Object.values(this.tools);
      pubsub.publish('schemeDataSent', Object.assign({ states, tools, currentState: this._cs }, payload));
    });
  }

  // Returns normalized current scheme data
  getNormalized() {
    return normalize(this);
  }

  // Non menu event-listeners
  addState(id) {
    this.states[id] = {
      uuid: id,
      name: DEFAULT_STATE_NAME,
      img: DEFAULT_IMAGE_ID,
      parameters: [],
      event: { name: '', desc: '' },
      actions: [],
    };
  }

  setCurrentState(id) {
    this._cs = id;
    const cs = this.states[id];
    const parameters = cs.parameters.map(pId => this.parameters[pId]);
    const actions = cs.actions.map(aId => this.actions[aId]);
    pubsub.publish('currentStateSet', Object.assign({},
      this.states[this._cs],
      { parameters },
      { actions },
    ));
  }

  // Model menu event-listeners
  setName(name) {
    this.name = name;
  }

  setBreakTime(time) {
    this.breakTime = time;
  }

  setSteps(steps) {
    this.steps = steps;
  }

  // Tool menu event-listeners
  addTool(id) {
    this.tools[id] = {
      uuid: id,
      name: DEFAULT_TOOL_NAME,
      type: DEFAULT_TOOL_TYPE,
      rangeValues: {},
    };
  }

  setToolName({ id, name }) {
    this.tools[id].name = name;
  }

  setToolType({ id, type }) {
    this.tools[id].type = type;
  }

  setToolRange({ id, values }) {
    this.tools[id].rangeValues = values;
  }

  // State menu event-listeners
  setStateName(name) {
    this.states[this._cs].name = name;
    pubsub.publish('stateNameSet', { id: this._cs, name });
  }

  setStateImage(img) {
    this.states[this._cs].img = img;
  }

  setInitialState(stateId) {
    this.initialState = stateId;
  }

  // Event menu event-listeners
  setEventName(name) {
    this.states[this._cs].event.name = name;
  }

  setEventDesc(desc) {
    this.states[this._cs].event.desc = desc;
  }

  // Parameters menu event-listeners
  addParameter(id) {
    this.parameters[id] = {
      id,
      name: '',
      value: '',
    };
    this.states[this._cs].parameters.push(id);
  }

  setParameterName({ id, name }) {
    this.parameters[id].name = name;
  }

  setParameterValue({ id, value }) {
    this.parameters[id].value = value;
  }

  // Action menu event-listeners
  addAction(id) {
    this.actions[id] = {
      id,
      nextState: '',
      time: { min: 0, max: 0 },
      tools: {},
    };
    this.states[this._cs].actions.push(id);
  }

  setActionNextState({ id, stateId }) {
    this.actions[id].nextState = stateId;
  }

  setActionTime({ id, time }) {
    this.actions[id].time = time;
  }

  setActionTool({ id, toolId }) {
    let value = null;
    switch (this.tools[toolId].type) {
      case 'switch':
        value = false;
        break;
      case 'range':
        value = [ 0, 0 ];
        break;
      default:
        console.warn('Invalid tool type');
        value = null;
        break;
    }
    this.actions[id].tools[toolId] = {
      value,
      id: toolId,
    };
  }

  setActionToolValue({ id, toolId, value }) {
    this.actions[id].tools[toolId].value = value;
  }

  setInactiveAction({ id, nextState }) {
    this.actions[id] = {
      id,
      nextState,
      inactive: true,
    };
  }
}

export default Scheme;
