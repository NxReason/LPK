import Event from './event' ;

class State {
  constructor(data) {
    this.id = data.id;
    this.name = data.name;
    this.img = data.img;
    this.params = data.params;

    if(data.last) {
      this.last = true;
      this.event = null;
    } else {
      this.event = new Event(data.event);
      this.last = false;
    }

  }
}

export default State;
