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
      this.tools = this.initTools(data.tools);
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
    return this.tools.every(tool => {
      // Если среди полученных итемов нет, того который есть в данном экшене
      const checkTool = data.find(obj => obj.id == tool.id);
      if (!checkTool) { return false; }

      if (tool.type === 'switch') { return checkTool.value === tool.boolValue; }

      if (tool.type === 'range') { return this.includesValue(checkTool.value, [ tool.minValue, tool.maxValue ]) }

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

  initTools(tools) {
    return tools.map(tool => {
      return {
        id: tool.id,
        type: tool.type,
        minValue: tool.ActionTool.minValue,
        maxValue: tool.ActionTool.maxValue,
        boolValue: tool.ActionTool.boolValue
      }
    });
  }
}

export default Action;
