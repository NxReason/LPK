import pubsub from '../../../utils/pubsub';

import EventMenu from './eventMenu';
import ParametersMenu from './parametersMenu';
import ActionsMenu from './actionsMenu';

const $nameInput = document.getElementById('state-name-input');
$nameInput.addEventListener('change', () => {
  pubsub.publish('stateNameChanged', $nameInput.value);
});

const $imageSelect = document.getElementById('image-select');
$imageSelect.addEventListener('change', () => {
  pubsub.publish('stateImageChanged', $imageSelect.value);
});

const $initialState = document.getElementById('initial-state-checkbox');


const StateMenu = {
  set(state) {
    $nameInput.value = state.name;
    $imageSelect.value = state.img;
    $initialState.checked = false;
    $initialState.onclick = () => {
      if ($initialState.checked) { pubsub.publish('initialStateChanged', state.uuid); }
    };
    EventMenu.set(state.event);
    ParametersMenu.set(state.parameters);
    ActionsMenu.set(state.actions);
  },
};

export default StateMenu;
