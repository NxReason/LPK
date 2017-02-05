class Scene {
  constructor($modelName, $stateImg, $stateParams, $event, $responseBox, $toolsBox) {
    this.$modelName = $modelName;
    this.$stateImg = $stateImg;
    this.$stateParams = $stateParams;
    this.$event = $event;
    this.$responseBox = $responseBox;
    this.$toolsBox = $toolsBox;
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

  /** Creates input elements in 'tools' box */
  initTools(tools) {
    const toolsFragment = document.createDocumentFragment();

    tools.forEach(tool => {
      // Wrap every tool for proper display and add label
      const div = document.createElement('div');
      div.classList.add('tool');

      const label = document.createElement('label');
      label.setAttribute('for', tool.name);
      label.textContent = tool.name;
      div.appendChild(label);

      const toolNode = this.createToolNode(tool);
      div.appendChild(toolNode);

      // Append to fragment
      toolsFragment.appendChild(div);
    });

    this.$toolsBox.innerHTML = '';
    this.$toolsBox.appendChild(toolsFragment);
    return this;
  }

  createToolNode(tool) {
    switch(tool.type) {
      case 'range':
        return this.createRangeTool(tool);
      case 'switch':
        return this.createSwitchTool(tool);
      default:
        return 'Unknown tool type';
    }
  }

  createRangeTool(tool) {
    const div = document.createElement('div');

    const spanMin = document.createElement('span');
    spanMin.textContent = tool.min;
    div.appendChild(spanMin)

    const input = document.createElement('input');
    input.setAttribute('data-id', tool.id);
    input.setAttribute('data-type', 'range');
    input.setAttribute('name', tool.name);
    input.setAttribute('type', 'range');
    input.setAttribute('min', tool.min);
    input.setAttribute('max', tool.max);
    div.appendChild(input);

    const spanMax = document.createElement('span');
    spanMax.textContent = tool.max;
    div.appendChild(spanMax);

    return div;
  }

  createSwitchTool(tool) {
    const label = document.createElement('label');
    label.classList.add('switch');

    const input = document.createElement('input');
    input.setAttribute('data-id', tool.id);
    input.setAttribute('data-type', 'switch');
    input.setAttribute('type', 'checkbox');
    label.appendChild(input);

    const div = document.createElement('div');
    div.classList.add('slider');
    label.appendChild(div);

    return label;
  }

  /** Sets img and parameters of current state to UI */
  setState({ img, params }) {
    // Change state image
    this.$stateImg.setAttribute('src', img);

    // Set state parameters
    const paramsFragment = document.createDocumentFragment();
    for (let key in params) {
      paramsFragment.appendChild(this.createParameterNode(key, params[key]));
    }
    this.$stateParams.innerHTML = '';
    this.$stateParams.appendChild(paramsFragment);

    return this;
  }

  createParameterNode(key, value) {
    const div = document.createElement('div');

    const keySpan = document.createElement('span');
    keySpan.textContent = key;
    div.appendChild(keySpan);

    const valueSpan = document.createElement('span');
    valueSpan.textContent = value;
    div.appendChild(valueSpan);

    return div;
  }

  /** Sets event data to UI */
  setEvent(event) {
    this.$event.textContent = event.name;
  }

  /** Get data from tool nodes */
  getToolsData() {
    const toolsData = {};
    const inputs = this.$toolsBox.querySelectorAll('input[data-id]');
    inputs.forEach(input => {
      const { id, type } = input.dataset;
      let value;
      switch(type) {
        case 'range': value = parseInt(input.value); break;
        case 'switch': value = input.checked; break;
        default: throw new Error('Invalid tool type');
      }
      toolsData[id] = value;
    });
    return toolsData;
  }
}
