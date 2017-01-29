class Model {
  constructor(data) {
    this.id = data.id;
    this.name = data.name;
    this.breakTime = data.breakTime;
    this.steps = data.steps;

    this.states = data.states.map(state => new State(state));
    this.currentState = this.getState(data.id);
  }

  getState(id) {
    return this.states.find(state => state.id == id);
  }
}
