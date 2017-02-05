class Model {
  constructor(data) {
    this.id = data.id;
    this.name = data.name;
    this.breakTime = data.breakTime;
    this.steps = data.steps;

    this.states = data.states.map(state => new State(state));
    this.currentState = this.getState(data.id);

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
    }
    intervals.catch(state => { pubsub.publish('new_state',  state) });
  }

  makeBreak() {
    if (this.subscribtion) { this.subscribtion.remove() }
    return new Promise((resolve, reject) => {
      setTimeout(() => { resolve() }, this.breakTime);
    });
  }

  handleEvent() {
    const event = this.currentState.event;
    return new Promise((resolve, reject) => {
      // send data about new event to other modules
      pubsub.publish('event', { event });

      // listen to user action
      // and if user input correct go to next state
      this.subscribtion = pubsub.subscribe('user_input', data => {
        // TODO check tools input and decide about next state
        console.log(data);
      })

      // handle inactive
      const inactiveTime = event.getInactiveTime();
      this.timeout = setTimeout(() => {
        const nextStateId = event.getInactiveAction().nextState;
        const nextState = this.getState(nextStateId);
        nextState.last ? reject(nextState) : resolve(nextState);
      }, inactiveTime);
    })
  }

  // TODO
  stop() {

  }

}
