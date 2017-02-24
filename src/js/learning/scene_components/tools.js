import nodeFactory from '../../utils/nodeFactory';

const $tools = document.querySelector('.tools-list');

function init(tools) {
  const fragment = document.createDocumentFragment();

  tools.forEach(tool => {
    // create tool wrapper
    const div = nodeFactory('div', { classList: ['tool'] });

    const label = nodeFactory('label', {
      classList: ['tool-name'],
      attrs: { "for": tool.name },
      textContent: tool.name
    });
    div.appendChild(label);

    const toolNode = createToolNode(tool);
    div.appendChild(toolNode);

    fragment.appendChild(div);
  });

  $tools.innerHTML = "";
  $tools.appendChild(fragment);
}

function createToolNode(tool) {
  switch(tool.type) {
    case 'range':
      return createRangeTool(tool);
    case 'switch':
      return createSwitchTool(tool);
    default:
      return 'Unknown tool type';
  }
}

function createRangeTool(tool) {
  const divInput = nodeFactory('div', { classList: ['range'] });

  const spanMin = nodeFactory('span', { textContent: tool.min });
  divInput.appendChild(spanMin)

  const input = nodeFactory('input', {
    attrs: {
      'data-id': tool.id,
      'data-type': 'range',
      'name': tool.name,
      'type': 'range',
      'min': tool.min,
      'max': tool.max
    }
  });
  divInput.appendChild(input);

  const spanMax = nodeFactory('span', { textContent: tool.max });
  divInput.appendChild(spanMax);

  const divCurrent = nodeFactory('div', { classList: ['range-current-value'] });
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
  const label = nodeFactory('label', { classList: ['switch'] });

  const input = nodeFactory('input', {
    attrs: {
      'data-id': tool.id,
      'data-type': 'switch',
      'type': 'checkbox'
    }
  });
  label.appendChild(input);

  const div = nodeFactory('div', { classList: ['slider'] });
  label.appendChild(div);

  return label;
}

export default {
  init,
};
