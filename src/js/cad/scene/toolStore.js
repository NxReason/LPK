import nodeFactory from '../../utils/nodeFactory';
import pubsub from '../../utils/pubsub';
import panel from './panel';

const { appendChildren } = panel;

const TOOL_TYPES = [ 'Switch', 'Range' ];

function createToolNode(params = {}) {
  const id = `tool-${params.id || Date.now()}`;
  const name = '';
  const minValue = '';
  const maxValue = '';
  const type = TOOL_TYPES[0].toLowerCase();

  const $toolWrapper = nodeFactory('div', { classList: ['panel-tool'], attrs: { id } });
  const $nameLabel = nodeFactory('label', {
    classList: ['panel-tool-name'],
    textContent: 'Название прибора',
  });
  const $nameInput = nodeFactory('input', { attrs: { type: 'text' } });
  $nameInput.addEventListener('change', (e) => {
    const value = e.target.value;
    pubsub.publish('toolNameChange', { id, value });
  });

  const $toolTypeWrapper = nodeFactory('div', { classList: ['panel-tool-type'] });
  const $toolTypeLabel = nodeFactory('label', { textContent: 'Тип прибора' });
  const $toolTypeSelect = nodeFactory('select');
  TOOL_TYPES.forEach(toolType => $toolTypeSelect.appendChild(createOption(toolType)));
  const $rangeValues = createRangeValues(id);

  $toolTypeSelect.addEventListener('change', (e) => {
    const value = e.target.value.toLowerCase();

    pubsub.publish('toolTypeChange', { id, value });

    if (value === 'range') {
      $rangeValues.style.display = 'flex';
    } else {
      $rangeValues.style.display = 'none';
    }
  });

  appendChildren($toolTypeWrapper, [ $toolTypeLabel, $toolTypeSelect ]);
  const $node = appendChildren(
    $toolWrapper,
    [ $nameLabel, $nameInput, $toolTypeWrapper, $rangeValues ],
  );

  return { id, name, type, minValue, maxValue, $node };
}

function createOption(value, name) {
  return nodeFactory('option', {
    textContent: value,
    attrs: { name: name || value.toLowerCase() },
  });
}

function createRangeValues(id) {
  const $wrapper = nodeFactory('div', { classList: ['panel-tool-range-values'] });
  return appendChildren(
    $wrapper,
    [
      { text: 'Минимум', limit: 'min' },
      { text: 'Максимум', limit: 'max' },
    ].map(data => createRangeValue(data, id)),
  );
}

function createRangeValue(params, id = 1) {
  const $div = nodeFactory('div', { attrs: { 'data-limit': params.limit } });
  const $label = nodeFactory('label', { textContent: params.text });
  const $input = nodeFactory('input', { attrs: { type: 'text' } });
  $input.addEventListener('change', (e) => {
    const value = e.target.value;
    const limit = params.limit || 'min';
    pubsub.publish('toolValueChange', { id, value, limit });
  });
  return appendChildren($div, [ $label, $input ]);
}

export default createToolNode;
