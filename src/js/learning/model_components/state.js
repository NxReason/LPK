import Event from './event' ;
import Action from './action';

class State {
  constructor(data) {
    this.id = data.id;
    this.name = data.name;
    this.img = data.img;
    this.params = data.params;

    if (data.last) {
      this.last = true;
      this.event = null;
      this.actions = null;
    } else {
      this.event = new Event(data.event);
      this.actions = data.actions.map(action => new Action(action));
      this.last = false;
    }
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
    if (suitedActions.length > 0) {
      return suitedActions[0].nextState;
    }
    return null;
  }
}

export default State;
