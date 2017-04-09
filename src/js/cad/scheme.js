import stateFactory from './stateFactory';

const scheme = {};
const states = [];

scheme.addState = () => {
  const id = `state${states.length}`;
  const newState = stateFactory({ id });
  states.push(newState);
  return newState;
}

export default scheme;
