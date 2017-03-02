import State from './model_components/state';
import pubsub from '../utils/pubsub';

class Model {
  constructor(data) {
    this.id = data.id;
    this.name = data.name;
    this.breakTime = data.breakTime;
    this.steps = data.steps;

    this.states = data.states.map(state => new State(state));
    this.currentState = this.getState(data.initialState);

    this.timeout = null;
    this.subscribtion = null;
  }

  getState(id) {
    return this.states.find(state => state.id == id);
  }

  start() {
    let intervals = Promise.resolve(); // init promise chain
    for (let i = 0; i < this.steps; i++) {
      intervals = intervals
       .then(() => { return this.makeBreak() })
       .then(() => { return this.handleEvent() })
       .then(state => { this.handleNewState(state) })
    }
    intervals.catch(state => { pubsub.publish('new_state',  state) });
    return intervals;
  }

  makeBreak() {
    return new Promise((resolve, reject) => {
      setTimeout(() => { resolve() }, this.breakTime);
    });
  }

  handleEvent() {
    const event = this.currentState.event;
    const eventStartTime = Date.now();
    return new Promise((resolve, reject) => {
      // send data about new event to other modules
      pubsub.publish('event', event);

      // listen to user action
      // and if user input correct go to next state
      this.subscribtion = pubsub.subscribe('user_input', data => {
        const timeSpent = Date.now() - eventStartTime;
        const nextStateId = this.currentState.handleInput(data, timeSpent);
        const nextState = this.getState(nextStateId);
        if (nextState) {
          nextState.last ? reject(nextState) : resolve(nextState);
        }
      })

      // handle inactive
      const inactiveTime = this.currentState.getInactiveTime();
      this.timeout = setTimeout(() => {
        const nextStateId = this.currentState.getInactiveAction().nextState;
        const nextState = this.getState(nextStateId);
        nextState.last ? reject(nextState) : resolve(nextState);
      }, inactiveTime);
    })
  }

  handleNewState(state) {
    this.currentState = state;
    clearTimeout(this.timeout);
    if (this.subscription) {
      this.subscribtion.remove();
    }
    pubsub.publish('new_state', state);
  }

  // TODO
  stop() {

  }

}

export default Model;
