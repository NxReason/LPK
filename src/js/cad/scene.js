import scheme from './scheme';
import modelPanel from './modelPanel';
import { jsPlumb } from '../utils/jsplumb.min.js';
const scene = {};

/**
 * Tabs control
 */
const $statePanel = document.querySelector("#new-state-panel");
const $propsPanel = document.querySelector("#model-props-panel");
const $cadWrapper = document.querySelector("#cad-wrapper");
const $cadPane = document.querySelector("#cad-pane");

let openedTabs = 0;

scene.showPropsPanel = () => {
  showTab($propsPanel);
  return scene;
}
scene.hidePropsPanel = () => {
  hideTab($propsPanel);
  return scene;
}

scene.showStatePanel = () => {
  showTab($statePanel);
  return scene;
}
scene.hideStatePanel = () => {
  hideTab($statePanel);
  return scene;
}

const showTab = ($tab) => {
  if ($tab.classList.contains('is-hidden')) {
    openedTabs++;
    $tab.classList.remove('is-hidden');
    setFlexRatio($cadWrapper, 4 - openedTabs);
  }
};
const hideTab = ($tab) => {
  openedTabs--;
  $tab.classList.add('is-hidden');
  setFlexRatio($cadWrapper, 4 - openedTabs);
};

const setFlexRatio = (el, ratio) => {
  el.style.flex = ratio;
};

/**
 * State-objects management
 */
scene.addState = () => {
  const state = scheme.addState();
  $cadPane.appendChild(state.$node);
  jsPlumb.draggable(state.$node.id, {
    containment: true
  });
  state.$node.addEventListener('contextmenu', (e) => {
    e.preventDefault();
    scene.showStatePanel();
  })
};

export default scene;
