import { jsPlumb } from 'jsplumb';
import nodeFactory from '../../../utils/nodeFactory';
import pubsub from '../../../utils/pubsub';

export function createAction(id, { states, tools, currentState }, action) {
  const $actionWrapper = nodeFactory('div', { classList: [ 'panel-action' ] });

  /**
   * Next state
   */
  const $nextStateLabel = nodeFactory('label', { textContent: 'Следующее состояние' });
  const $nextStateSelect = nodeFactory('select', { classList: [ 'next-state-select' ] });
  if (!action) {
    const $defaultOption = nodeFactory('option', {
      textContent: 'Следующее состояние',
      attrs: { selected: true, disabled: true, hidden: true },
    });
    $nextStateSelect.appendChild($defaultOption);
  }
  states.forEach(({ name, uuid }) => {
    // skip current state
    if (uuid === currentState) { return; }
    const $option = nodeFactory('option', { attrs: { value: uuid }, textContent: name });
    $nextStateSelect.appendChild($option);
  });
  $nextStateSelect.addEventListener('change', () => setNextState(currentState, $nextStateSelect.value, id));
  $actionWrapper.appendChild($nextStateLabel);
  $actionWrapper.appendChild($nextStateSelect);

  /**
   * Action time
   */
  const $time = nodeFactory('div', { classList: [ 'panel-action-time' ] });
  createActionTimeNode($time, id);
  $actionWrapper.appendChild($time);

  /**
   * Tools
   */
  const $toolsHeader = nodeFactory('div', { classList: [ 'panel-action-tools-header' ] });
  const $toolsHeaderLabel = nodeFactory('label', { textContent: 'Значения приборов' });
  const $toolsHeaderIcon = nodeFactory('i', { classList: [ 'icon', 'icon-add' ] });
  $toolsHeaderIcon.addEventListener('click', () => {
    if (tools.length === 0) { return; }
    addActionTool(tools, $actionWrapper, id);
  });
  $toolsHeader.appendChild($toolsHeaderLabel);
  $toolsHeader.appendChild($toolsHeaderIcon);
  $actionWrapper.appendChild($toolsHeader);

  return $actionWrapper;
}

function setNextState(source, target, id, inactive) {
  if (source === target) {
    console.warn('Trying to connect with itself');
    return;
  }
  connect(source, target);
  pubsub.publish('actionNextStateChanged', { id, stateId: target });
}

function connect(source, target) {
  jsPlumb.connect({
    source: `state-${source}`,
    target: `state-${target}`,
    anchor: [ 'Perimeter', { shape: 'Rectangle' }],
    endpoint: 'Blank',
    connector: [ 'Flowchart', { stub: 0, gap: 10, cornerRadius: 5 }],
    overlays: [
      [ 'Arrow', { width: 10, length: 10, foldback: 0.7, location: 1 }],
    ],
    detachable: false,
  });
}

function createActionTimeNode($parent, id) {
  const $label = nodeFactory('label', { textContent: 'Время действия' });

  const $inputs = nodeFactory('div', { classList: [ 'panel-action-time-controls' ] });
  const $inputMin = nodeFactory('input', { attrs: { placeholder: 'min' } });
  const $inputMax = nodeFactory('input', { attrs: { placeholder: 'max' } });

  const handleChange = () => {
    pubsub.publish('actionTimeChanged', {
      id,
      time: {
        min: parseInt($inputMin.value, 10),
        max: parseInt($inputMax.value, 10),
      },
    });
  };
  $inputMin.addEventListener('change', () => handleChange());
  $inputMax.addEventListener('change', () => handleChange());

  $inputs.appendChild($inputMin);
  $inputs.appendChild($inputMax);

  $parent.appendChild($label);
  $parent.appendChild($inputs);
}

/**
 * Action tools DOM
 */
function addActionTool(tools, $parent, id) {
  const $wrapper = nodeFactory('div', { classList: [ 'panel-action-tool' ] });
  const $select = nodeFactory('select');
  const $defaultOption = nodeFactory('option', { textContent: 'Прибор', attrs: { selected: true, disabled: true, hidden: true } });
  $select.appendChild($defaultOption);
  fillToolsSelect($select, tools);

  const $inputWrapper = nodeFactory('div', { classList: [ 'panel-action-tool-value' ] });
  $select.addEventListener('change', (e) => {
    pubsub.publish('actionToolChanged', { id, toolId: e.target.value });
    const currentOption = $select.options[$select.selectedIndex];
    const { dataset: { type }, value: toolId } = currentOption;
    const $input = createActionToolInput(type, { id, toolId });
    $inputWrapper.innerHTML = '';
    $inputWrapper.appendChild($input);
  });

  $wrapper.appendChild($select);
  $wrapper.appendChild($inputWrapper);

  $parent.appendChild($wrapper);
}

function fillToolsSelect($sel, tools) {
  tools.forEach(({ uuid, name, type }) => {
    const $opt = nodeFactory('option', { attrs: { value: uuid, 'data-type': type }, textContent: name });
    $sel.appendChild($opt);
  });
}

function createActionToolInput(type, ids) {
  switch (type) {
    case 'switch':
      return createSwitchInput(ids);
    case 'range':
      return createRangeInput(ids);
    default:
      console.warn('Invalid current tool option in action creator');
      return nodeFactory('div');
  }
}

function createSwitchInput({ id, toolId }) {
  // todo make ID's unique
  const $fragment = document.createDocumentFragment();
  const $label = nodeFactory('label', { attrs: { for: 'action-tool-checkbox' }, textContent: 'Включен?' });
  const $input = nodeFactory('input', { attrs: { type: 'checkbox', id: 'action-tool-checkbox' } });

  $input.addEventListener('change', () => {
    pubsub.publish('actionToolValueChanged', { id, toolId, value: $input.checked });
  });

  $fragment.appendChild($label);
  $fragment.appendChild($input);

  return $fragment;
}

function createRangeInput({ id, toolId }) {
  const $fragment = document.createDocumentFragment();
  const $inputMin = nodeFactory('input', {
    attrs: {
      type: 'text',
      placeholder: 'Минимум',
    },
  });

  const $inputMax = nodeFactory('input', {
    attrs: {
      type: 'text',
      placeholder: 'Максимум',
    },
  });

  const handleChange = () => {
    pubsub.publish('actionToolValueChanged', {
      id,
      toolId,
      value: [
        parseInt($inputMin.value, 10),
        parseInt($inputMax.value, 10),
      ],
    });
  };

  $inputMin.addEventListener('change', () => handleChange());
  $inputMax.addEventListener('change', () => handleChange());

  $fragment.appendChild($inputMin);
  $fragment.appendChild($inputMax);

  return $fragment;
}

/**
 * Inactive action constructor
 */
export function createInactiveAction(id, { currentState, states }) {
  const $wrapper = nodeFactory('div', { classList: [ 'panel-action' ] });

  const $label = nodeFactory('label', { textContent: 'Переход при бездействии' });
  const $select = nodeFactory('select', { classList: [ 'next-state-select' ] });
  const $defaultOption = nodeFactory('option', {
    textContent: 'Состояние',
    attrs: { disabled: true, hidden: true, selected: true },
  });
  $select.appendChild($defaultOption);

  states.forEach(({ uuid, name }) => {
    if (uuid === currentState) { return; }
    const $option = nodeFactory('option', { attrs: { value: uuid }, textContent: name });
    $select.appendChild($option);
  });

  $select.addEventListener('change', () => {
    const nextState = $select.value;
    connect(currentState, nextState);
    pubsub.publish('inactiveActionSet', { id, nextState });
  });

  $wrapper.appendChild($label);
  $wrapper.appendChild($select);

  return $wrapper;
}
