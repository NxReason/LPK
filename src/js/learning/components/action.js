class Action {
  constructor(data) {
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

  isSuitable(data, time) {
    return this.rightTime(time) && this.rightData(data);
  }

  rightData(data) {
    if (typeof this.value == 'boolean' && data[this.toolId] && data[this.toolId] == this.value) {
      return true;
    } else if (Array.isArray(this.value) && data[this.toolId] && this.includesValue(data[this.toolId])) {
      return true;
    }
    return false;
  }

  includesValue(value, borders) {
    return (value > this.value[0]) && (value < this.value[1]);
  }

  rightTime(time) {
    return (time > this.minTime) && (time < this.maxTime);
  }
}

export default Action;
