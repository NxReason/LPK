import Scheme from '../scheme/scheme';
import panel from './panel';
import statePanel from './statePanel';
import { jsPlumb } from '../../utils/jsplumb.min';
import pubsub from '../../utils/pubsub';

const { appendListElement, toggleListDisplay } = panel;

const scene = {};
const scheme = new Scheme();

/**
 * Tabs control
 */
const $statePanel = document.querySelector('#new-state-panel');
const $propsPanel = document.querySelector('#model-props-panel');
const $cadWrapper = document.querySelector('#cad-wrapper');
const $cadPane = document.querySelector('#cad-pane');

let openedTabs = 0;

const setFlexRatio = (el, ratio) => {
  el.style.flex = ratio;
};

function showTab($tab) {
  if ($tab.classList.contains('is-hidden')) {
    openedTabs++;
    $tab.classList.remove('is-hidden');
    setFlexRatio($cadWrapper, 4 - openedTabs);
  }
}

function hideTab($tab) {
  openedTabs--;
  $tab.classList.add('is-hidden');
  setFlexRatio($cadWrapper, 4 - openedTabs);
}

scene.showPropsPanel = () => {
  showTab($propsPanel);
  return scene;
};
scene.hidePropsPanel = () => {
  hideTab($propsPanel);
  return scene;
};

scene.showStatePanel = () => {
  showTab($statePanel);
  return scene;
};
scene.hideStatePanel = () => {
  hideTab($statePanel);
  return scene;
};

/**
 * Model panel listeners
 */
const $modelNameInput = document.querySelector('#model-name-input');
handleModelParamChange($modelNameInput, 'setModelName');

const $breakTimeInput = document.querySelector('#break-time-input');
handleModelParamChange($breakTimeInput, 'setBreakTime');

const $stepsInput = document.querySelector('#steps-input');
handleModelParamChange($stepsInput, 'setSteps');

function handleModelParamChange($node, handler) {
  $node.addEventListener('change', e => scheme[handler](e.target.value));
}

const $toolsOpenBtn = document.querySelector('#panel-tools-open');
const $toolsOpenIcon = $toolsOpenBtn.querySelector('.icon-forward');
const $addToolBtn = document.querySelector('#add-tool-btn');
const $toolsList = document.querySelector('#panel-tools-list');

let toolsListClosed = true;
$toolsOpenBtn.addEventListener('click', () => {
  toolsListClosed = toggleListDisplay(toolsListClosed, $toolsList, $toolsOpenIcon);
});
$addToolBtn.addEventListener('click', () => {
  const tool = scheme.addTool();
  toolsListClosed = appendListElement(tool.$node, $toolsList, toolsListClosed, $toolsOpenIcon);
});


const subscriptions = {
  toolTypeChange: 'setToolType',
  toolNameChange: 'setToolName',
  toolValueChange: 'setToolValue',
  stateNameChange: 'setStateName',
  stateImgChange: 'setStateImg',
  eventNameChange: 'setEventName',
  eventDescChange: 'setEventDesc',
  paramNameChange: 'setParamName',
  paramValueChange: 'setParamValue',
};

Object.keys(subscriptions).forEach((key) => {
  setHandlerForTopic(key, subscriptions[key]);
});

function setHandlerForTopic(topic, handler) {
  pubsub.subscribe(topic, data => scheme[handler](data));
}

pubsub.subscribe('stateNameChange', (data) => {
  const $stateNode = document.querySelector(`#${data.id}`);
  const $stateName = $stateNode.querySelector('.cad-state-name');
  $stateName.textContent = data.value;
});

pubsub.subscribe('paramCreated', (data) => {
  const newParam = scheme.addParameter(data);
  statePanel.appendParam(newParam.$paramWrapper);
});

pubsub.subscribe('actionCreated', (data) => {
  const newAction = scheme.addAction(data);
  statePanel.appendAction(newAction.$actionWrapper);
});

pubsub.subscribe('nextStateChange', (data) => {
  // create jsPlumb link
  const { source, target, actionId } = data;
  jsPlumb.connect({ source, target });
  scheme.setAction(source, target, actionId);
});

/**
 * State-objects management
 */
scene.addState = () => {
  const state = scheme.addState();
  $cadPane.appendChild(state.$node);

  jsPlumb.draggable(state.$node.id, {
    containment: true,
  });

  state.$node.addEventListener('contextmenu', (e) => {
    e.preventDefault();
    statePanel.fillContent(state);
    scene.showStatePanel();
  });
};

export default scene;
