class Event {
  constructor(data) {
    this._id = data._id;
    this.name = data.name;
    this.desc = data.desc;
  }
}

export default Event;
