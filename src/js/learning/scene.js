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

//   /** Sets event data to UI */
//   setEvent(event) {
//     console.log(event);
//     this.$event.querySelector('.model-event-name span').textContent = event.name;
//     this.$event.querySelector('.model-event-info').textContent = event.description;
//     this.$event.classList.remove('is-hidden');
//   }
//   hideEvent() {
//     this.$event.classList.add('is-hidden');
//   }
//
//   /** Get data from tool nodes */
//   getToolsData() {
//     const toolsData = {};
//     const inputs = this.$toolsBox.querySelectorAll('input[data-id]');
//     inputs.forEach(input => {
//       const { id, type } = input.dataset;
//       let value;
//       switch(type) {
//         case 'range': value = parseInt(input.value); break;
//         case 'switch': value = input.checked; break;
//         default: throw new Error('Invalid tool type');
//       }
//       toolsData[id] = value;
//     });
//     return toolsData;
//   }
// }

export default exports;
