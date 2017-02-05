class Event {
  constructor(data) {
    this.id = data.id;
    this.name = data.name;
    this.description = data.description;
    this.actions = data.actions.map(action => new Action(action));
  }

  getInactiveTime() {
    const times = this.getAllActionTimes();
    return Math.max(...times);
  }

  getInactiveAction() {
    return this.actions.find(action => action.inactive === true);
  }

  getAllActionTimes() {
    return this.actions.map(action => action.maxTime || 0);
  }

  handleInput(data, time) {
    const suitedActions = this.actions.filter(action => action.isSuitable(data, time));
    if (suitedActions) {
      return suitedActions[0].nextState;
    }
  }
}
