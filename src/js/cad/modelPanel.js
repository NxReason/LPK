import nodeFactory from '../utils/nodeFactory';

const TOOL_TYPES = ['Switch', 'Range'];

const $paramsOpenBtn = document.querySelector("#panel-params-open");
const $paramsOpenIcon = $paramsOpenBtn.querySelector(".icon-forward");
const $addParamBtn = document.querySelector("#add-param-btn");
const $paramsList = document.querySelector("#panel-params-list");

const $toolsOpenBtn = document.querySelector("#panel-tools-open");
const $toolsOpenIcon = $toolsOpenBtn.querySelector(".icon-forward");
const $addToolBtn = document.querySelector("#add-tool-btn");
const $toolsList = document.querySelector("#panel-tools-list");

let toolsListClosed = true;
let paramsListClosed = true;

$paramsOpenBtn.addEventListener('click', () =>
  paramsListClosed = toggleListDisplay(paramsListClosed, $paramsList, $paramsOpenIcon));

$toolsOpenBtn.addEventListener('click', () =>
  toolsListClosed = toggleListDisplay(toolsListClosed, $toolsList, $toolsOpenIcon));

function toggleListDisplay(flag, $list, $icon) {
    flag ? showList($list, $icon) : hideList($list, $icon);
    flag = !flag;
    return flag;
}

function showList($list, $icon) {
  if ($icon) $icon.classList.add('turn-down');
  $list.style.display = 'block';
}
function hideList($list, $icon) {
  if ($icon) $icon.classList.remove('turn-down');
  $list.style.display = 'none';
}

$addParamBtn.addEventListener('click', () =>
  paramsListClosed = appendListElement(createParamNode, $paramsList, paramsListClosed, $paramsOpenIcon));

$addToolBtn.addEventListener('click', () =>
  toolsListClosed = appendListElement(createToolNode, $toolsList, toolsListClosed, $toolsOpenIcon));

function appendListElement(creator, $list, flag, $icon) {
  const $li = creator();
  $list.appendChild($li);
  if (flag) {
    flag = toggleListDisplay(flag, $list, $icon);
  }
  return flag;
}

function createParamNode() {
  const $paramWrapper = nodeFactory('div', { classList: ['panel-param'] });
  const $nameInput = nodeFactory('input', { attrs: { type: 'text', placeholder: 'Name' } });
  const $valueInput = nodeFactory('input', { attrs: { type: 'text', placeholder: 'Value' } });
  $paramWrapper.appendChild($nameInput);
  $paramWrapper.appendChild($valueInput);
  return $paramWrapper;
}

function createToolNode() {
  const $toolWrapper = nodeFactory('div', { classList: ['panel-tool'] });
  const $nameLabel = nodeFactory('label', {
    classList: ['panel-tool-name'],
    textContent: "Название прибора"
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
    attrs: { name: name || value.toLowerCase() }
  });
}

function createRangeValues() {
  const $wrapper = nodeFactory('div', { classList: ['panel-tool-range-values'] });
  return appendChildren(
    $wrapper,
    [{ text: 'Минимум' }, { text: 'Максимум' }].map(data => createRangeValue(data))
  );
}

function createRangeValue(params) {
  const $div = nodeFactory('div');
  const $label = nodeFactory('label', { textContent: params.text });
  const $input = nodeFactory('input', { attrs: { type: 'text' } });
  return appendChildren($div, [ $label, $input ]);
}

function appendChildren(parent, children) {
  if (children.forEach) {
    children.forEach(child => parent.appendChild(child));
  }
  return parent;
}
