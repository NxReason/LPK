class Action {
  constructor(data) {
    this.minTime = data.minTime;
    this.maxTime = data.maxTime;
    this.nextState = data.nextState;
    if (data.inactive) {
      this.inactive = true;
      this.tools = [];
    } else {
      this.inactive = false;
      this.tools = data.tools;
    }

  }

  /**
   * @param [{ id: Number, value: Number/Boolean }, {...}]
   * @param Number
   * @return Boolean
   */
  isSuitable(data, time) {
    return this.rightTime(time) && this.rightData(data);
  }

  rightData(data = []) {
    if(!Array.isArray(data)) { throw new TypeError(`Invalid type of data from tools. Expected array, got ${typeof data}`); }
    return this.tools.every(tool => {
      // Если среди полученных итемов нет, того который есть в данном экшене
      const checkTool = data.find(obj => obj.id == tool.id);
      if (!checkTool) { return false; }

      // Для переключателя
      if (typeof tool.value === 'boolean') { return checkTool.value === tool.value; }

      // Для ренджа
      if (Array.isArray(tool.value)) { return this.includesValue(checkTool.value, tool.value) }

      return false;
    });
  }

  includesValue(value, borders) {
    if (typeof value !== 'number') throw new TypeError('Value should be integer');
    return (value >= borders[0]) && (value <= borders[1]);
  }

  rightTime(time) {
    if (typeof time !== 'number') throw new TypeError('Time should be integer (ms)');
    return (time >= this.minTime) && (time <= this.maxTime);
  }
}

export default Action;
