/**
 * Main UI module
 */
import uuid from 'uuid/v4';

import { jsPlumb } from 'jsplumb';
import pubsub from '../../utils/pubsub';
import createState from './UIFactory/state';

import ModelMenu from './model_menu';
import StateMenu from './state_menu';

const $statePanel = document.querySelector('#new-state-panel');
const $propsPanel = document.querySelector('#model-props-panel');
const $cadPane = document.querySelector('#cad-pane');
jsPlumb.setContainer($cadPane);

/**
 * Listen to state name change in scheme
 * and set appropriate node text
 */
pubsub.subscribe('stateNameSet', ({ id, name }) => {
  const $name = document.querySelector(`#state-${id} .cad-state-name`);
  $name.textContent = name;
});

pubsub.subscribe('currentStateSet', (state) => {
  StateMenu.set(state);
});

const Scene = {
  // Handles menu-buttons clicks
  addState() {
    const id = uuid();
    const $stateNode = createState(id);
    $stateNode.addEventListener('contextmenu', (e) => {
      pubsub.publish('stateSelected', id);
      e.preventDefault();
      this.showStatePanel();
    });
    jsPlumb.draggable($stateNode, { containment: true });
    $cadPane.appendChild($stateNode);
    pubsub.publish('stateCreated', id);
  },

  showStatePanel() {
    this.hidePropsPanel();
    $statePanel.classList.remove('is-hidden');
  },

  showPropsPanel() {
    this.hideStatePanel();
    $propsPanel.classList.remove('is-hidden');
  },

  // Handle close-icons clicks
  hideStatePanel() {
    $statePanel.classList.add('is-hidden');
  },

  hidePropsPanel() {
    $propsPanel.classList.add('is-hidden');
  },

  // set initial UI data
  init(scheme) {
    ModelMenu.init(scheme);
  },
};

module.exports = Scene;
