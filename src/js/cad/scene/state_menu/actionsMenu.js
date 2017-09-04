import uuid from 'uuid/v4';

import pubsub from '../../../utils/pubsub';
import { createAction, createInactiveAction } from '../UIFactory/action';
import {
  handleHeaderClick,
} from '../utils';

const $header = document.getElementById('panel-actions-open');
const $addBtn = document.getElementById('add-action-btn');
const $actionsList = document.getElementById('panel-actions-list');

$header.addEventListener('click', () => handleHeaderClick($header, $actionsList));
$addBtn.addEventListener('click', () => {
  pubsub.publish('schemeDataRequested', { newAction: true });
  $actionsList.classList.remove('is-hidden');
  $header.querySelector('.icon').style.transform = 'rotate(90deg)';
});

pubsub.subscribe('schemeDataSent', (data) => {
  if (data.newAction) {
    const id = uuid();
    const $actionNode = createAction(id, data);
    $actionsList.appendChild($actionNode);
    pubsub.publish('actionCreated', id);

    const inactiveId = uuid();
    $actionsList.appendChild(createInactiveAction(inactiveId, data));
    pubsub.publish('actionCreated', inactiveId);
  } else {
    data.actions.forEach((action) => {
      const $actionNode = createAction(action.id, data);
      $actionsList.appendChild($actionNode);
    });
  }
});

const ActionsMenu = {
  set(actions) {
    $actionsList.innerHTML = '';
    pubsub.publish('schemeDataRequested', { newAction: false, actions });
  },
};

export default ActionsMenu;
