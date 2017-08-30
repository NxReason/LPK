import nodeFactory from '../../utils/nodeFactory';
import pubsub from '../../utils/pubsub.js';
import panel from './panel';

const { appendChildren } = panel;

function createAction(data = {}) {
  const id = `action-${data.id || Date.now()}`;
  const nextState = null;
  const tools = [];

  const $actionWrapper = nodeFactory('div', { classList: ['panel-action'] });

  const $nextStateLabel = nodeFactory('label', { textContent: 'Следующее состояние' });
  const $nextStateSelect = nodeFactory('select', { classList: ['next-state-select'] });
  Object.keys(data.states).forEach((stateId) => {
    const { name } = data.states[stateId];
    const $option = nodeFactory('option', { attrs: { value: stateId }, textContent: name });
    $nextStateSelect.appendChild($option);
  });
  $nextStateSelect.addEventListener('change', (e) => createConnection(data.stateId, $nextStateSelect, id));

  const $toolsHeader = nodeFactory('div', { classList: ['panel-action-tools-header'] });
  const $toolsHeaderLabel = nodeFactory('label', { textContent: 'Значения приборов' });
  const $toolsHeaderIcon = nodeFactory('i', { classList: ['icon', 'icon-add'] });
  $toolsHeaderIcon.addEventListener('click', (e) => { addActionTool(data.tools, $actionWrapper); });

  appendChildren($toolsHeader,
    [ $toolsHeaderLabel, $toolsHeaderIcon ]
  );

  appendChildren($actionWrapper,
    [ $nextStateLabel, $nextStateSelect, $toolsHeader ],
  );

  return { id, $actionWrapper };
}

function createConnection(id, $sel, actionId) {
  const nextId = $sel.value;
  if (id === nextId) {
    console.warn('Trying to connect with itself');
    return;
  }
  pubsub.publish('nextStateChange', { source: id, target: nextId, actionId });
}

function addActionTool(tools, $parent) {
  pubsub.publish('newAction', { foo: 'bar' }) // todo
  const $wrapper = nodeFactory('div', { classList: [ 'panel-action-tool' ] });
  const $select = nodeFactory('select');
  fillToolsSelect($select, tools);
  $select.addEventListener('change', (e) => {
    pubsub.publish('actionSelectChange', { foo: 'bar' }); // todo
  });
  $wrapper.appendChild($select);
  addActionToolProps($select, $wrapper);
  $parent.appendChild($wrapper);
}

function fillToolsSelect($sel, tools) {
  Object.keys(tools).forEach((toolId) => {
    const { name, type } = tools[toolId];
    const $opt = nodeFactory('option', { attrs: { value: toolId, 'data-type': type }, textContent: name });
    $sel.appendChild($opt);
  });
}

function addActionToolProps($sel, $wrapper) {
  const sOption = $sel.options[$sel.selectedIndex];
  const $div = nodeFactory('div', { classList: ['panel-action-tool-value'] });
  switch(sOption.dataset.type) {
    case 'switch':
      createSwitchProps($div);
      break;
    case 'range':
      createRangeProps($div);
      break;
    default:
      console.warn('Invalid current tool option in action creator');
      break;
  }
  $wrapper.appendChild($div);
}

function createSwitchProps($parent) {
  // todo make ID's unique
  const $label = nodeFactory('label', { attrs: { for: 'action-tool-checkbox' }, textContent: 'Включен?' });
  const $input = nodeFactory('input', { attrs: { type: 'checkbox', id: 'action-tool-checkbox' } });

  appendChildren($parent, [ $label, $input ]);
}

function createRangeProps($parent) {
  const $inputMin = nodeFactory('input', { attrs: {
    type: 'text',
    placeholder: 'Минимум',
  } });

  const $inputMax = nodeFactory('input', { attrs: {
    type: 'text',
    placeholder: 'Максимум',
  } });
  appendChildren($parent, [ $inputMin, $inputMax ]);
}

export default createAction;
