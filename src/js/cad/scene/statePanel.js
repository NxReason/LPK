import pubsub from '../../utils/pubsub';
import panel from './panel';

const { toggleListDisplay } = panel;
const statePanel = {};

/**
 * Panel data handlers
 */
const $currentStateId = document.querySelector('#current-state-id');
const $stateNameInput = document.querySelector('#state-name-input');
const $eventNameInput = document.querySelector('#event-name-input');
const $eventDescInput = document.querySelector('#event-description-input');
const $paramsList = document.querySelector('#panel-params-list');

statePanel.fillContent = (state) => {
  $currentStateId.value = state.id;
  $stateNameInput.value = state.name;
  $eventNameInput.value = state.eventName;
  $eventDescInput.value = state.eventDesc;

  $paramsList.innerHTML = '';
  Object.keys(state.params).forEach((paramId) => {
    $paramsList.appendChild(state.params[paramId].$paramWrapper);
  });
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
 * State params
 */
const $paramsOpenBtn = document.querySelector('#panel-params-open');
const $paramsOpenIcon = $paramsOpenBtn.querySelector('.icon-forward');
const $addParamBtn = document.querySelector('#add-param-btn');

const $imgLabel = document.querySelector('#state-image-label');
const $imgInput = document.querySelector('#state-image-input');

let paramsListClosed = true;

$paramsOpenBtn.addEventListener('click', () => {
  paramsListClosed = toggleListDisplay(paramsListClosed, $paramsList, $paramsOpenIcon);
});

$addParamBtn.addEventListener('click', () => {
  const id = $currentStateId.value;
  pubsub.publish('paramCreated', { id });
  if (paramsListClosed) {
    paramsListClosed = toggleListDisplay(paramsListClosed, $paramsList, $paramsOpenIcon);
  }
});

statePanel.appendParam = ($node) => {
  $paramsList.appendChild($node);
};

/**
 * Handle state images
 */
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
