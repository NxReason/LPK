import nodeFactory from '../../utils/nodeFactory';
import pubsub from '../../utils/pubsub';
import panel from './panel';

const { toggleListDisplay, appendListElement } = panel;
const statePanel = {};

/**
 * Panel data handers
 */
const $currentStateId = document.querySelector('#current-state-id');
const $stateNameInput = document.querySelector('#state-name-input');
const $eventNameInput = document.querySelector('#event-name-input');
const $eventDescInput = document.querySelector('#event-description-input');

statePanel.fillContent = (state) => {
  $currentStateId.value = state.id;
  $stateNameInput.value = state.name;
  $eventNameInput.value = state.eventName;
  $eventDescInput.value = state.eventDesc;
};

publishOnChange($stateNameInput, 'stateNameChange');
publishOnChange($eventNameInput, 'eventNameChange');
publishOnChange($eventDescInput, 'eventDescChange');

function publishOnChange($node, topic) {
  $node.addEventListener('change', (event) => {
    const id = $currentStateId.value;
    const value = event.target.value;
    pubsub.publish(topic, { id, value });
  });
}

/**
 * Panel view handlers
 */
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
  const id = $currentStateId.value;
  const $paramWrapper = nodeFactory('div', { classList: ['panel-param'] });

  const $nameInput = nodeFactory('input', { attrs: { type: 'text', placeholder: 'Name' } });
  $nameInput.addEventListener('change', (e) => {
    const value = e.target.value;
    pubsub.publish('paramNameChange', { id, value });
  });

  const $valueInput = nodeFactory('input', { attrs: { type: 'text', placeholder: 'Value' } });
  $valueInput.addEventListener('change', (e) => {
    const value = e.target.value;
    pubsub.publish('paramValueChange', { id, value });
  });

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
