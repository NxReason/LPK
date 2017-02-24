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
  const modelId = $select.value;
  loadModel(modelId)
    .then(response => {
      model = new Model(response);
      scene.init(model, response).showContent().enableButtons($startButton);
    })
    .catch(err => { console.error(err) });
});
//
const $startButton = document.querySelector('#start-btn');
// $startButton.addEventListener('click', () => {
//   model.start();
// });
//
const $stopButton = document.querySelector('#stop-btn');
// $stopButton.addEventListener('click', () => {
//   model.stop(); // TODO
// });
//
const $runButton = document.querySelector('#run-btn');
// $runButton.addEventListener('click', () => {
//   const toolsData = scene.getToolsData();
//   pubsub.publish('user_input', toolsData);
// });
//
// /**
//  * Handle custom events here (user input, programm messages etc.)
//  */
// pubsub.subscribe('new_state', state => scene.setState(state));
// pubsub.subscribe('event', data => scene.setEvent(data.event));
