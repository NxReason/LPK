import state from './scene_components/state';
import tools from './scene_components/tools';

const exports = {};

// Scene metadata
const $modelName = document.querySelector('.model-name');
exports.init = function init(model, response) {
  $modelName.textContent = model.name;
  state.set(model.startState);
  tools.init(response.tools);
  return this;
};

// Manage content visibility
const $content = document.querySelector('.content');
exports.showContent = function showContent() {
  setContentDisplay('flex');
  return this;
};
exports.hideContent = function hideContent() {
  setContentDisplay('none');
  return this;
};
function setContentDisplay(display) {
  $content.style.display = display;
}

// Manage buttons state
exports.enableButtons = function enableButtons(...buttons) {
  setButtonsState(buttons, false);
  return this;
};
exports.disableButtons = function disableButtons(...buttons) {
  setButtonsState(buttons, true);
  return this;
};
function setButtonsState(buttons, value) {
  buttons.forEach((button) => { button.disabled = value; });
}

// Delegate public methods to components
exports.getToolsData = () => tools.getToolsData();
exports.setState = stateData => state.set(stateData);
exports.showEvent = eventData => state.showEvent(eventData);
exports.hideEvent = () => state.hideEvent();

export default exports;
