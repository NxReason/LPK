class Scene {
  constructor($modelName, $stateImg, $stateParams, $event, $response, $tools) {
    this.$modelName = $modelName;
    this.$stateImg = $stateImg;
    this.$stateParams = $stateParams;
    this.$event = $event;
    this.$response = $response;
    this.$tools = $tools;

    pubsub.subscribe('event', data => { this.setEvent(data) });
  }

  init(model) {
    this.setModelName(model.name).setState(model.currentState);
    return this;
  }

  /** Set actual node content */
  setModelName(name) {
    this.$modelName.textContent = name;
    return this;
  }

  /** Create input elements in 'tools' block */
  initTools(tools) {
    const html = tools.map(tool => {
      return `<div class='tool'>${this.createTool(tool)}</div>`
    }).join('');

    this.$tools.innerHTML = html;
    return this;
  }

  createTool(tool) {
    switch (tool.type) {
      case 'range':
        return `
          <label for='${tool.name}'>${tool.name}</label>
          <div>
            <span>${tool.min}</span>
            <input data-id='${tool.id}' name='${tool.name}' type='range' min='${tool.min}' max='${tool.max}'>
            <span>${tool.max}</span>
          </div>
          `
      case 'switch':
        return `
          <label for="${tool.name}">${tool.name}</label>
          <label class='switch'>
            <input type='checkbox'>
            <div class='slider'></div>
          </label>
        `
      default:
        return 'Unknown tool type';
    }
  }

  /** Setting img and parameters of current state to UI */
  setState({ img, params }) {
    console.log(img, params);
    this.$stateImg.setAttribute('src', img);
    let html = '';
    for (let key in params) {
      html += `
        <div>
          <span>${key}:</span>
          <span>${params[key]}</span>
        </div>
      `
    }
    this.$stateParams.innerHTML = html;
    return this;
  }

  setEvent({ event }) {
    this.$event.textContent = event.name;
  }
}
