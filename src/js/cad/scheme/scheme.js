import stateStore from '../scene/stateStore';
import toolStore from '../scene/toolStore';
import idGenerator from './idGen';

const stateIdGen = idGenerator();
const toolIdGen = idGenerator();

class Scheme {
  constructor() {
    this.modelName = 'Без названия';
    this.breakTime = 0;
    this.steps = 0;

    this.states = {};

    this.tools = {};
  }

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

  addTool() {
    return this.addComponent(toolIdGen, toolStore, 'tools');
  }

  addState() {
    return this.addComponent(stateIdGen, stateStore, 'states');
  }

  addComponent(gen, store, list) {
    const id = gen();
    const newComponent = store({ id });
    this[list][newComponent.id] = newComponent;
    return newComponent;
  }

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
}

export default Scheme;
