import state from './scene_components/state';
import tools from './scene_components/tools';

const exports = {};

// Scene metadata
const $modelName = document.querySelector('.model-name');
exports.init = function(model, response) {
  $modelName.textContent = model.name;
  state.set(model.currentState);
  tools.init(response.tools);
  return this;
}

// Manage content visibility
const $content = document.querySelector('.content');
exports.showContent = function() {
  setContentDisplay('flex');
  return this;
}
exports.hideContent = function() {
  setContentDisplay('none');
  return this;
}
function setContentDisplay(display) {
  $content.style.display = display;
}

// Manage buttons state
exports.enableButtons = function(...buttons) {
  setButtonsState(buttons, false);
}
exports.disableButtons = function(...buttons) {
  setButtonsState(buttons, true);
}
function setButtonsState(buttons, value) {
  buttons.forEach(button => button.disabled = value);
}

export default exports;
