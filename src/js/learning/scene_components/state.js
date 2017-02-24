import nodeFactory from '../../utils/nodeFactory';

const $name = document.querySelector('.model-state-name');
const $img = document.querySelector('.model-state-img');
const $params = document.querySelector('.model-params-values');
const $event = document.querySelector('.model-event');
const $response = document.querySelector('.model-response');

function set({ name, img, params }) {
  $name.textContent = name;
  $img.setAttribute('src', img);
  setParameters(params);
}

function setParameters(params) {
  const frag = document.createDocumentFragment();
  for (let key in params) {
    frag.appendChild(createParameteNode(key, params[key]));
  }
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

export default {
  set
}
