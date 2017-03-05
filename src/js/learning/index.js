import '../../sass/learning.scss';

import pubsub from '../utils/pubsub';
import ajax from '../utils/ajax';
import scene from './scene';
import Model from './model';

/**
 * Load model with given id
 */
function loadModel(id) {
  return ajax(`/models/${id}`).then(response => JSON.parse(response));
}

/**
 * UI button's handlers
 */
const $select = document.querySelector("#model-select");
const $loadButton = document.querySelector('#load-model-btn');
let model = null;
$loadButton.addEventListener('click', () => {
  if ( model ) { model.stop(); }
  const modelId = $select.value;
  loadModel(modelId)
    .then(response => {
      model = new Model(response);
      scene.init(model, response)
        .showContent()
        .enableButtons($startButton)
        .disableButtons($stopButton, $runButton);
    })
    .catch(err => { console.error(err) });
});
//
const $startButton = document.querySelector('#start-btn');
$startButton.addEventListener('click', () => {
  model.start();
  scene.disableButtons($startButton);
  scene.enableButtons($stopButton, $runButton);
});

const $stopButton = document.querySelector('#stop-btn');
$stopButton.addEventListener('click', () => {
  model.stop();
  scene.enableButtons($startButton);
  scene.disableButtons($stopButton, $runButton);
});

const $runButton = document.querySelector('#run-btn');
$runButton.addEventListener('click', () => {
  const toolsData = scene.getToolsData();
  pubsub.publish('user_input', toolsData);
});

/**
 * Handle custom events here (user input, programm messages etc.)
 */
pubsub.subscribe('new_state', state => {
  scene.hideEvent();
  scene.setState(state);
});
pubsub.subscribe('event', event => scene.showEvent(event));

/**
* Timer (currently for dev mode only)
*/
import timer from '../utils/timer';
document.querySelector('.header').appendChild(timer.node);
pubsub.subscribe('new_state', state => timer.stop());
pubsub.subscribe('event', event => timer.start());
