import pubsub from '../../../utils/pubsub';
import nodeFactory from '../../../utils/nodeFactory';

import {
  DEFAULT_TOOL_NAME,
  TOOL_TYPES,
  DEFAULT_TOOL_TYPE,
} from '../../config';

export default function createTool(id) {
  const $toolWrapper = nodeFactory('div', { classList: [ 'panel-tool' ] });
  const $nameLabel = nodeFactory('label', { classList: [ 'panel-tool-name' ], textContent: 'Название прибора' });
  const $nameInput = nodeFactory('input', { attrs: { type: 'text', value: DEFAULT_TOOL_NAME } });
  $nameInput.addEventListener('change', () => {
    pubsub.publish('toolNameChanged', { id, name: $nameInput.value });
  });

  const $toolTypeWrapper = nodeFactory('div', { classList: [ 'panel-tool-type' ] });
  const $toolTypeLabel = nodeFactory('label', { textContent: 'Тип прибора' });
  const $toolTypeSelect = nodeFactory('select');
  TOOL_TYPES.forEach((toolType) => {
    const $option = createOption(toolType);
    $toolTypeSelect.appendChild($option);
    if (toolType === DEFAULT_TOOL_TYPE) { $option.selected = true; }
  });
  const $rangeValues = createRangeValues(id);

  $toolTypeSelect.addEventListener('change', (e) => {
    const type = e.target.value;
    pubsub.publish('toolTypeChanged', { id, type });
    if (type === 'range') {
      $rangeValues.style.display = 'flex';
    } else {
      $rangeValues.style.display = 'none';
    }
  });
  $toolTypeWrapper.appendChild($toolTypeLabel);
  $toolTypeWrapper.appendChild($toolTypeSelect);

  $toolWrapper.appendChild($nameLabel);
  $toolWrapper.appendChild($nameInput);
  $toolWrapper.appendChild($toolTypeWrapper);
  $toolWrapper.appendChild($rangeValues);

  return $toolWrapper;
}

function createOption(value, name) {
  return nodeFactory('option', {
    textContent: value,
    attrs: { name: name || value },
  });
}

function createRangeValues(id) {
  const $wrapper = nodeFactory('div', { classList: [ 'panel-tool-range-values' ] });

  const $minInput = createRangeInput('Минимум');
  $wrapper.appendChild($minInput);

  const $maxInput = createRangeInput('Максимум');
  $wrapper.appendChild($maxInput);

  const handleValueChange = () => {
    const values = {
      min: parseInt($minInput.querySelector('input').value, 10),
      max: parseInt($maxInput.querySelector('input').value, 10),
    };
    pubsub.publish('toolRangeChanged', { id, values });
  };

  $minInput.addEventListener('change', () => { handleValueChange(); });
  $maxInput.addEventListener('change', () => { handleValueChange(); });

  return $wrapper;
}

function createRangeInput(name) {
  const $div = nodeFactory('div');
  const $label = nodeFactory('label', { textContent: name });
  const $input = nodeFactory('input', { attrs: { type: 'text' } });

  $div.appendChild($label);
  $div.appendChild($input);

  return $div;
}
