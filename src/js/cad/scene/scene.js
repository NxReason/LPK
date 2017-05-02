import Scheme from '../scheme/scheme';
import modelPanel from './modelPanel';
import statePanel from './statePanel';
import { jsPlumb } from '../../utils/jsplumb.min';

const scene = {};

const scheme = new Scheme();
/**
 * Tabs control
 */
const $statePanel = document.querySelector('#new-state-panel');
const $propsPanel = document.querySelector('#model-props-panel');
const $cadWrapper = document.querySelector('#cad-wrapper');
const $cadPane = document.querySelector('#cad-pane');

let openedTabs = 0;

const setFlexRatio = (el, ratio) => {
  el.style.flex = ratio;
};

function showTab($tab) {
  if ($tab.classList.contains('is-hidden')) {
    openedTabs++;
    $tab.classList.remove('is-hidden');
    setFlexRatio($cadWrapper, 4 - openedTabs);
  }
}

function hideTab($tab) {
  openedTabs--;
  $tab.classList.add('is-hidden');
  setFlexRatio($cadWrapper, 4 - openedTabs);
}

scene.showPropsPanel = () => {
  showTab($propsPanel);
  return scene;
};
scene.hidePropsPanel = () => {
  hideTab($propsPanel);
  return scene;
};

scene.showStatePanel = () => {
  showTab($statePanel);
  return scene;
};
scene.hideStatePanel = () => {
  hideTab($statePanel);
  return scene;
};

/**
 * State-objects management
 */
scene.addState = () => {
  const state = scheme.addState();
  $cadPane.appendChild(state.$node);
  jsPlumb.draggable(state.$node.id, {
    containment: true,
  });
  state.$node.addEventListener('contextmenu', (e) => {
    e.preventDefault();
    console.log(state);
    console.log(this);
    scene.showStatePanel();
  });
};

export default scene;
