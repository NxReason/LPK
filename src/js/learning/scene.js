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

//
//   /** Creates input elements in 'tools' box */
//   initTools(tools) {
//     const toolsFragment = document.createDocumentFragment();
//
//     tools.forEach(tool => {
//       // Wrap every tool for proper display and add label
//       const div = document.createElement('div');
//       div.classList.add('tool');
//
//       const label = document.createElement('label');
//       label.setAttribute('for', tool.name);
//       label.classList.add('tool-name');
//       label.textContent = tool.name;
//       div.appendChild(label);
//
//       const toolNode = this.createToolNode(tool);
//       div.appendChild(toolNode);
//
//       // Append to fragment
//       toolsFragment.appendChild(div);
//     });
//
//     this.$toolsBox.innerHTML = '';
//     this.$toolsBox.appendChild(toolsFragment);
//     return this;
//   }
//
//   createToolNode(tool) {
//     switch(tool.type) {
//       case 'range':
//         return this.createRangeTool(tool);
//       case 'switch':
//         return this.createSwitchTool(tool);
//       default:
//         return 'Unknown tool type';
//     }
//   }
//
//   createRangeTool(tool) {
//     const divInput = document.createElement('div');
//     divInput.classList.add('range');
//
//     const spanMin = document.createElement('span');
//     spanMin.textContent = tool.min;
//     divInput.appendChild(spanMin)
//
//     const input = document.createElement('input');
//     input.setAttribute('data-id', tool.id);
//     input.setAttribute('data-type', 'range');
//     input.setAttribute('name', tool.name);
//     input.setAttribute('type', 'range');
//     input.setAttribute('min', tool.min);
//     input.setAttribute('max', tool.max);
//     divInput.appendChild(input);
//
//     const spanMax = document.createElement('span');
//     spanMax.textContent = tool.max;
//     divInput.appendChild(spanMax);
//
//     const divCurrent = document.createElement('div');
//     divCurrent.classList.add('range-current-value');
//     const spanCurrent = document.createElement('span');
//     spanCurrent.textContent = input.value;
//     divCurrent.appendChild(spanCurrent);
//
//     input.addEventListener('input', (evt) => {
//       this.updateCurrentRangeValue(spanCurrent, evt.target.value);
//     });
//
//     const fragment = document.createDocumentFragment();
//     fragment.appendChild(divInput);
//     fragment.appendChild(divCurrent);
//
//     return fragment;
//   }
//
//   updateCurrentRangeValue(node, value) {
//     node.textContent = value;
//   }
//
//   createSwitchTool(tool) {
//     const label = document.createElement('label');
//     label.classList.add('switch');
//
//     const input = document.createElement('input');
//     input.setAttribute('data-id', tool.id);
//     input.setAttribute('data-type', 'switch');
//     input.setAttribute('type', 'checkbox');
//     label.appendChild(input);
//
//     const div = document.createElement('div');
//     div.classList.add('slider');
//     label.appendChild(div);
//
//     return label;
//   }
//
//   /** Sets img and parameters of current state to UI */

//
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
