class Model {
  constructor(data) {
    this.id = data.id;
    this.name = data.name;
    this.breakTime = data.breakTime * 1000; // seconds -> ms
    this.steps = data.steps;

    this.states = data.states.map(state => new State(state));
    this.currentState = this.getState(data.id);

    // TODO stub
    this.tools = data.tools;
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
  }

  makeBreak() {
    return new Promise((resolve, reject) => {
      setTimeout(() => { console.log(`foo`); resolve() }, this.breakTime);
    });
  }

  handleEvent() {
    const event = this.currentState.event;
    return new Promise((resolve, reject) => {
      pubsub.publish('event', { event });
      setTimeout(() => { resolve() }, 1000);
    })
  }

  stop() {

  }
}
