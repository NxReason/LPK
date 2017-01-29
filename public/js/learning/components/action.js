class Action {
  constructor(data) {
    // link to corresponding tool somehow ¯\_(ツ)_/¯
    // given id, need to link to actual object
    this.toolId = data.tool;
    this.minTime = data.minTime;
    this.maxTime = data.maxTime;
    this.nextState = data.nextState;
    if (data.inactive) {
      this.inactive = true;
      this.value = null;
    } else {
      this.inactive = false;
      this.value = data.value;
    }

  }
}
