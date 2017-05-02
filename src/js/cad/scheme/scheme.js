import stateFactory from './stateFactory';
import idGenerator from './idGen';

const stateIdGen = idGenerator();
// const toolIdGen = idGenerator();

class Scheme {
  constructor() {
    this.modelName = 'Без названия';

    this.states = [];
  }

  setModelName(name) {
    this.modelName = name;
  }

  addState() {
    const id = stateIdGen();
    const newState = stateFactory({ id });
    this.states.push(newState);
    return newState;
  }
}

export default Scheme;
