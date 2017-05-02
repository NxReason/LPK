import nodeFactory from '../../utils/nodeFactory';
import panel from './panel';

const { appendChildren, toggleListDisplay, appendListElement } = panel;

const TOOL_TYPES = [ 'Switch', 'Range' ];

const $toolsOpenBtn = document.querySelector('#panel-tools-open');
const $toolsOpenIcon = $toolsOpenBtn.querySelector('.icon-forward');
const $addToolBtn = document.querySelector('#add-tool-btn');
const $toolsList = document.querySelector('#panel-tools-list');

let toolsListClosed = true;

$toolsOpenBtn.addEventListener('click', () => {
  toolsListClosed = toggleListDisplay(toolsListClosed, $toolsList, $toolsOpenIcon);
});

function createToolNode() {
  const $toolWrapper = nodeFactory('div', { classList: ['panel-tool'] });
  const $nameLabel = nodeFactory('label', {
    classList: ['panel-tool-name'],
    textContent: 'Название прибора',
  });
  const $nameInput = nodeFactory('input', { attrs: { type: 'text' } });

  const $toolTypeWrapper = nodeFactory('div', { classList: ['panel-tool-type'] });
  const $toolTypeLabel = nodeFactory('label', { textContent: 'Тип прибора' });
  const $toolTypeSelect = nodeFactory('select');
  TOOL_TYPES.forEach(type => $toolTypeSelect.appendChild(createOption(type)));
  const $rangeValues = createRangeValues();

  $toolTypeSelect.addEventListener('change', (e) => {
    if (e.target.value.toLowerCase() === 'range') {
      // show range values
      $rangeValues.style.display = 'flex';
    } else {
      $rangeValues.style.display = 'none';
    }
  });

  appendChildren($toolTypeWrapper, [ $toolTypeLabel, $toolTypeSelect ]);
  return appendChildren($toolWrapper, [ $nameLabel, $nameInput, $toolTypeWrapper, $rangeValues ]);
}

function createOption(value, name) {
  return nodeFactory('option', {
    textContent: value,
    attrs: { name: name || value.toLowerCase() },
  });
}

function createRangeValues() {
  const $wrapper = nodeFactory('div', { classList: ['panel-tool-range-values'] });
  return appendChildren(
    $wrapper,
    [{ text: 'Минимум' }, { text: 'Максимум' }].map(data => createRangeValue(data)),
  );
}

function createRangeValue(params) {
  const $div = nodeFactory('div');
  const $label = nodeFactory('label', { textContent: params.text });
  const $input = nodeFactory('input', { attrs: { type: 'text' } });
  return appendChildren($div, [ $label, $input ]);
}

$addToolBtn.addEventListener('click', () => {
  toolsListClosed = appendListElement(createToolNode, $toolsList, toolsListClosed, $toolsOpenIcon);
});
