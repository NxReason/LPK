class Event {
  constructor(data) {
    this.id = data.id;
    this.name = data.name;
    this.description = data.description;
    this.actions = data.actions.map(action => new Action(action));
  }
}
