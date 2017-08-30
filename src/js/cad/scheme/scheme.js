import stateStore from '../scene/stateStore';
import toolStore from '../scene/toolStore';
import paramStore from '../scene/paramStore';
import actionStore from '../scene/actionStore';
import idGenerator from './idGen';

const stateIdGen = idGenerator();
const toolIdGen = idGenerator();
const paramIdGen = idGenerator();
const actionIdGen = idGenerator();

class Scheme {
  constructor() {
    this.modelName = 'Без названия';
    this.breakTime = 0;
    this.steps = 0;

    this.states = {};

    this.tools = {};
  }

  /**
   * Model info
   */
  setModelName(name) {
    this.modelName = name;
    console.log(this);
  }

  setBreakTime(breakTime) {
    this.breakTime = breakTime;
  }

  setSteps(steps) {
    this.steps = steps;
  }

  /**
   * Add components to scheme
   */
  addTool() {
    return this.addComponent(toolIdGen, toolStore, 'tools');
  }

  addState() {
    return this.addComponent(stateIdGen, stateStore, 'states');
  }

  addParameter(data) {
    const id = paramIdGen();
    const newComponent = paramStore({ id, stateId: data.id });
    this.states[data.id].params[newComponent.id] = newComponent;
    return newComponent;
  }

  addAction(data) {
    const id = actionIdGen();
    const newAction = actionStore({ id, stateId: data.id, states: this.states, tools: this.tools });
    this.states[data.id].actions[newAction.id] = newAction;
    return newAction;
  }

  /**
   * Create new scheme component with underlying DOM node
   * @param {function} gen - Function for generating id
   * @param {function} store - Function for creating new object
   * @param {object} list - Object containing scheme components
   */
  addComponent(gen, store, list) {
    const id = gen();
    const newComponent = store({ id });
    this[list][newComponent.id] = newComponent;
    return newComponent;
  }

  /**
   * Set new type for tool with given id
   * @param { id: String, value: String } data
   */
  setToolType(data) {
    this.tools[data.id].type = data.value;
  }

  setToolName(data) {
    this.tools[data.id].name = data.value;
  }

  setToolValue(data) {
    const prop = `${data.limit}Value`;
    this.tools[data.id][prop] = data.value;
  }

  /**
   * Handle state data change
   */
  setStateName(data) {
    this.states[data.id].name = data.value;
  }

  setStateImg(data) {
    this.states[data.id].img = data.value;
  }

  setEventName(data) {
    this.states[data.id].eventName = data.value;
  }

  setEventDesc(data) {
    this.states[data.id].eventDesc = data.value;
  }

  /**
   * Handle state parameters change
   */
  setParamName({ id, value, stateId }) {
    this.states[stateId].params[id].name = value;
  }

  setParamValue({ id, value, stateId }) {
    this.states[stateId].params[id].value = value;
  }

  /**
   * Handle actions
   */
  setAction(source, target, actionId) {
    this.states[source].actions[actionId].nextState = target;
    return; // todo
  }
}

export default Scheme;
