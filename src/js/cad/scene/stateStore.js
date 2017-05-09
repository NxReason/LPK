import nodeFactory from '../../utils/nodeFactory';

function createStateNode(data = {}) {
  const id = `state-${data.id || Date.now()}`;
  const name = data.name || 'Состояние';
  const eventName = '';
  const eventDesc = '';
  const params = {};

  const $node = nodeFactory('div', { classList: ['cad-state'], attrs: { id } });
  const $stateName = nodeFactory('h5', { classList: ['cad-state-name'], textContent: name });
  $node.appendChild($stateName);

  return {
    id,
    name,
    eventName,
    eventDesc,
    params,
    $node,
  };
}

export default createStateNode;
