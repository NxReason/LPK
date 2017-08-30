import nodeFactory from '../../utils/nodeFactory';

const toolTypes = {
  RANGE: 'range',
  SWITCH: 'switch',
};
const $tools = document.querySelector('.tools-list');

function init(tools) {
  const fragment = document.createDocumentFragment();

  tools.forEach((tool) => {
    // create tool wrapper
    const div = nodeFactory('div', { classList: [ 'tool' ] });

    const label = nodeFactory('label', {
      classList: [ 'tool-name' ],
      textContent: tool.name,
    });
    div.appendChild(label);

    const toolNode = createToolNode(tool);
    div.appendChild(toolNode);

    fragment.appendChild(div);
  });

  $tools.innerHTML = '';
  $tools.appendChild(fragment);
}

function createToolNode(tool) {
  switch (tool.type) {
    case toolTypes.RANGE:
      return createRangeTool(tool);
    case toolTypes.SWITCH:
      return createSwitchTool(tool);
    default:
      return 'Неизвестный прибор';
  }
}

function createRangeTool(tool) {
  const divInput = nodeFactory('div', { classList: [ 'range' ] });

  const spanMin = nodeFactory('span', { textContent: tool.rangeValues.min });
  divInput.appendChild(spanMin);

  const input = nodeFactory('input', {
    attrs: {
      'data-uuid': tool.uuid,
      'data-type': 'range',
      name: tool.name,
      type: 'range',
      min: tool.rangeValues.min,
      max: tool.rangeValues.max,
      value: 0,
    },
  });
  divInput.appendChild(input);

  const spanMax = nodeFactory('span', { textContent: tool.rangeValues.max });
  divInput.appendChild(spanMax);

  const divCurrent = nodeFactory('div', { classList: [ 'range-current-value' ] });
  const spanCurrent = nodeFactory('span', { textContent: input.value });
  divCurrent.appendChild(spanCurrent);

  input.addEventListener('input', (evt) => {
    spanCurrent.textContent = evt.target.value;
  });

  const fragment = document.createDocumentFragment();
  fragment.appendChild(divInput);
  fragment.appendChild(divCurrent);

  return fragment;
}

function createSwitchTool(tool) {
  const label = nodeFactory('label', { classList: [ 'switch' ] });

  const input = nodeFactory('input', {
    attrs: {
      'data-uuid': tool.uuid,
      'data-type': 'switch',
      type: 'checkbox',
    },
  });
  label.appendChild(input);

  const div = nodeFactory('div', { classList: [ 'slider' ] });
  label.appendChild(div);

  return label;
}

function getToolsData() {
  const toolsData = [];
  const inputs = $tools.querySelectorAll('input[data-uuid]');
  inputs.forEach((input) => {
    const { uuid, type } = input.dataset;
    let value;
    switch (type) {
      case toolTypes.RANGE: value = parseInt(input.value, 10); break;
      case toolTypes.SWITCH: value = input.checked; break;
      default: throw new Error(`Некорректный тип прибора. ID: ${id}`);
    }
    toolsData.push({ uuid, value });
  });
  return toolsData;
}

export default {
  init,
  getToolsData,
};
