import State from './model_components/state';
import pubsub from '../utils/pubsub';
import Report from './report';

const INITIAL_STATE_NAME = 'Состояние модели';
const STOP_STATE_NAME = 'Обучение остановлено';

class Model {
  constructor(data) {
    this.id = data.id;
    this.name = data.name;
    this.breakTime = data.breakTime;
    this.steps = data.steps;

    this.states = data.states.map(state => new State(state));
    this.currentState = this.getState(data.initialState);

    this.timeout = null;
    this.subInput = null;
    this.subStop = null;
    this.startState = new State({ id: 0, name: INITIAL_STATE_NAME, img: 'img/start.png', last: true });
    this.stopState = new State({ id: -1, name: STOP_STATE_NAME, img: 'img/stop.png', last: true });
  }

  getState(id) {
    return this.states.find(state => state.id == id);
  }

  start() {
    this.report = new Report(this.name, this.steps);
    this.handleNewState(this.currentState); // set initial state
    let intervals = Promise.resolve(); // init promise chain
    for (let i = 0; i < this.steps; i++) {
      intervals = intervals
       .then(() => { return this.makeBreak() })
       .then(() => { return this.handleEvent() })
       .then(state => { this.handleNewState(state) })
    }
    intervals
      .catch(state => this.handleNewState(state))
      .then(() => {
        if (this.currentState.name !== STOP_STATE_NAME) {
          this.report.send()
          .then((response) => console.log(response));
        }
      });
    return intervals;
  }

  makeBreak() {
    return new Promise((resolve, reject) => {
      this.subStop = pubsub.subscribe('model_stop', () => { reject(this.stopState); })
      setTimeout(() => {
        this.clearSubs();
        resolve()
      }, this.breakTime);
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
      this.subInput = pubsub.subscribe('user_input', data => {
        this.report.increaseActionsNumber();
        const timeSpent = Date.now() - eventStartTime;
        const nextStateId = this.currentState.handleInput(data, timeSpent);
        const nextState = this.getState(nextStateId);
        if ( nextState ) {
          this.report.setSpentTime(timeSpent);
          nextState.last ? reject(nextState) : resolve(nextState);
        }
      });

      // handle user stop button click
      this.subStop = pubsub.subscribe('model_stop', () => {
        reject(this.stopState);
      });

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
    this.report.pushState(state);
    this.currentState = state;
    clearTimeout(this.timeout);
    this.clearSubs();
    pubsub.publish('new_state', state);
  }

  clearSubs() {
    if (this.subInput) {
      this.subInput.remove();
    }
    if (this.subStop) {
      this.subStop.remove();
    }
  }

}

export default Model;
