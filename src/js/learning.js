import '../sass/learning.scss';

import pubsub from './utils/pubsub';
import ajax from './utils/ajax';
import Scene from './learning/scene';
import Model from './learning/model';

const scene = new Scene(
  document.querySelector('.model-name'),
  document.querySelector('.model-state-img'),
  document.querySelector('.model-params-values'),
  document.querySelector('.model-event'),
  document.querySelector('.model-response'),
  document.querySelector('.tools-list')
)

/**
 * Load model with given id
 */
function loadModel(id) {
  return ajax(`/models/${id}`).then(response => JSON.parse(response));
}

function toggleControlButtons() {
  $startButton.disabled = !$startButton.disabled;
  $stopButton.disabled = !$stopButton.disabled;
  $runButton.disabled = !$runButton.disabled;
}

function setContentDisplay(display) {
  const content = document.querySelector('.content');
  content.style.display = display;
}

/**
 * UI button's handlers
 */
const $loadButton = document.querySelector('#load-model-btn');
const $select = document.querySelector("#model-select");
let model = {};
$loadButton.addEventListener('click', () => {
  const modelId = $select.value;
  loadModel(modelId)
    .then(response => {
      model = new Model(response);
      scene.init(model).initTools(response.tools);
      toggleControlButtons();
      setContentDisplay('flex');
    })
    .catch(err => { console.error(err) });
});

const $startButton = document.querySelector('#start-btn');
$startButton.addEventListener('click', () => {
  model.start();
});

const $stopButton = document.querySelector('#stop-btn');
$stopButton.addEventListener('click', () => {
  model.stop(); // TODO
});

const $runButton = document.querySelector('#run-btn');
$runButton.addEventListener('click', () => {
  const toolsData = scene.getToolsData();
  pubsub.publish('user_input', toolsData);
});

/**
 * Handle custom events here (user input, programm messages etc.)
 */
pubsub.subscribe('new_state', state => scene.setState(state));
pubsub.subscribe('event', data => scene.setEvent(data.event));
