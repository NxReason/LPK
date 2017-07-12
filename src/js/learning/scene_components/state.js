import nodeFactory from '../../utils/nodeFactory';
import timer from '../../utils/timer';

const $name = document.querySelector('.model-state-name');
const $img = document.querySelector('.model-state-img');
const $params = document.querySelector('.model-params-values');

const $event = document.querySelector('.model-event');
const $eventHeader = $event.querySelector('.model-event-name span');
const $eventBody = $event.querySelector('.model-event-info');

const $timerContainer = document.querySelector('.model-timer');
$timerContainer.appendChild(timer.node);

function set({ name, img, params }) {
  $name.textContent = name;
  $img.setAttribute('src', `img/states/${img}`);
  setParameters(params);
}

function setParameters(params = []) {
  const frag = document.createDocumentFragment();
  params.forEach(param => frag.appendChild(createParameteNode(param.name, param.value)));

  $params.innerHTML = "";
  $params.appendChild(frag);
}

function createParameteNode(key, value) {
  const div = nodeFactory('div', { classList: ['parameter'] });

  const keySpan = nodeFactory('span', { textContent: key });
  div.appendChild(keySpan);

  const valueSpan = nodeFactory('span', { textContent: value });
  div.appendChild(valueSpan);

  return div;
}


/** Sets event data to UI */
function showEvent(event) {
  $eventHeader.textContent = event.name;
  $eventBody.textContent = event.description;
  $event.classList.remove('is-hidden', 'slide-top');
  showTimer();
}
function hideEvent() {
  $event.classList.add('is-hidden', 'slide-top');
  hideTimer();
}

function showTimer() {
  $timerContainer.classList.remove('is-hidden');
  timer.start();
}
function hideTimer() {
  $timerContainer.classList.add('is-hidden');
  timer.stop();
}

export default {
  set,
  showEvent,
  hideEvent,
};
