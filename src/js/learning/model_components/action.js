class Action {
  constructor(data) {
    this.time = data.time || {};
    this.nextState = data.nextState;
    if (data.inactive) {
      this.inactive = true;
      this.tools = [];
    } else {
      this.inactive = false;
      this.tools = this.initTools(data.tools);
    }
  }

  isSuitable(data, time) {
    return this.rightTime(time) && this.rightData(data);
  }

  rightData(data = []) {
    // TODO: refactor
    return this.tools.every((tool) => {
      // Если среди полученных итемов нет, того который есть в данном экшене
      const receivedTool = data.find(obj => obj.uuid === tool.uuid);
      if (!receivedTool) { return false; }

      if (tool.type === 'switch') { return receivedTool.value === tool.switchValue; }

      if (tool.type === 'range') { return this.includesValue(receivedTool.value, [ tool.rangeValues[0], tool.rangeValues[1] ]); }

      return false;
    });
  }

  includesValue(value, borders) {
    if (typeof value !== 'number') throw new TypeError('Value should be integer');
    return (value >= borders[0]) && (value <= borders[1]);
  }

  rightTime(time) {
    if (typeof time !== 'number') throw new TypeError('Time should be integer (ms)');
    return (time >= this.time.min) && (time <= this.time.max);
  }

  initTools(tools) {
    return tools.map(tool => ({
      uuid: tool.uuid,
      type: tool.type,
      rangeValues: tool.rangeValues,
      switchValue: tool.switchValue,
    }));
  }
}

export default Action;
