import nodeFactory from '../../utils/nodeFactory';

function createStateNode(data = {}) {
  const id = `state-${data.id || Date.now()}`;
  const name = data.name || 'Состояние';
  const img = '1';
  const eventName = '';
  const eventDesc = '';
  const params = {};
  const actions = [];

  const $node = nodeFactory('div', { classList: ['cad-state'], attrs: { id } });
  const $stateName = nodeFactory('h5', { classList: ['cad-state-name'], textContent: name });
  $node.appendChild($stateName);

  return {
    id,
    name,
    img,
    eventName,
    eventDesc,
    params,
    actions,
    $node,
  };
}

export default createStateNode;
