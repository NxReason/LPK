import nodeFactory from '../../utils/nodeFactory';
import panel from './panel';

const { toggleListDisplay, appendListElement } = panel;
const statePanel = {};

const $paramsOpenBtn = document.querySelector('#panel-params-open');
const $paramsOpenIcon = $paramsOpenBtn.querySelector('.icon-forward');
const $addParamBtn = document.querySelector('#add-param-btn');
const $paramsList = document.querySelector('#panel-params-list');

const $imgLabel = document.querySelector('#state-image-label');
const $imgInput = document.querySelector('#state-image-input');

let paramsListClosed = true;

$paramsOpenBtn.addEventListener('click', () => {
  paramsListClosed = toggleListDisplay(paramsListClosed, $paramsList, $paramsOpenIcon);
});

$addParamBtn.addEventListener('click', () => {
  paramsListClosed =
    appendListElement(createParamNode, $paramsList, paramsListClosed, $paramsOpenIcon);
});

function createParamNode() {
  const $paramWrapper = nodeFactory('div', { classList: ['panel-param'] });
  const $nameInput = nodeFactory('input', { attrs: { type: 'text', placeholder: 'Name' } });
  const $valueInput = nodeFactory('input', { attrs: { type: 'text', placeholder: 'Value' } });
  $paramWrapper.appendChild($nameInput);
  $paramWrapper.appendChild($valueInput);
  return $paramWrapper;
}

$imgInput.addEventListener('change', (e) => {
  let content = '';
  if (e.target.files) {
    content = e.target.value.split('\\').pop();
  } else {
    content = 'Изображение';
  }
  $imgLabel.querySelector('span').textContent = content;
});

export default statePanel;
