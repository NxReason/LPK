import pubsub from '../../utils/pubsub';
import panel from './panel';

const { toggleListDisplay } = panel;
const statePanel = {};

/**
 * Panel data handlers
 */
const $currentStateId = document.querySelector('#current-state-id');
const $stateNameInput = document.querySelector('#state-name-input');
const $imgSelect = document.querySelector('#image-select');
const $eventNameInput = document.querySelector('#event-name-input');
const $eventDescInput = document.querySelector('#event-description-input');
const $paramsList = document.querySelector('#panel-params-list');
const $actionsList = document.querySelector('#panel-actions-list');


statePanel.fillContent = (state) => {
  $currentStateId.value = state.id;
  $stateNameInput.value = state.name;
  $imgSelect.value = state.img;
  $eventNameInput.value = state.eventName;
  $eventDescInput.value = state.eventDesc;

  $paramsList.innerHTML = '';
  Object.keys(state.params).forEach((paramId) => {
    $paramsList.appendChild(state.params[paramId].$paramWrapper);
  });

  $actionsList.innerHTML = '';
  Object.keys(state.actions).forEach((actionId) => {
    $actionsList.appendChild(state.actions[actionId].$actionWrapper);
  });
};

publishOnChange($stateNameInput, 'stateNameChange');
publishOnChange($imgSelect, 'stateImgChange');
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
 * Actions
 */
const $actionsOpenBtn = document.querySelector('#panel-actions-open');
const $actionsOpenIcon = $actionsOpenBtn.querySelector('.icon-forward');
const $addActionBtn = document.querySelector('#add-action-btn');

let actionsListClosed = true;

$actionsOpenBtn.addEventListener('click', () => {
  actionsListClosed = toggleListDisplay(actionsListClosed, $actionsList, $actionsOpenIcon);
});

$addActionBtn.addEventListener('click', () => {
  const id = $currentStateId.value;
  pubsub.publish('actionCreated', { id });
  if (actionsListClosed) {
    actionsListClosed = toggleListDisplay(actionsListClosed, $actionsList, $actionsOpenIcon);
  }
});

statePanel.appendAction = ($node) => {
  $actionsList.appendChild($node);
};

export default statePanel;
