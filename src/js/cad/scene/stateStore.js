import nodeFactory from '../../utils/nodeFactory';

function createStateNode(params = {}) {
  const id = `state-${params.id || Date.now()}`;
  const name = params.name || 'Состояние';
  const eventName = '';
  const eventDesc = '';

  const $node = nodeFactory('div', { classList: ['cad-state'], attrs: { id } });
  const $stateName = nodeFactory('h5', { classList: ['cad-state-name'], textContent: name });
  $node.appendChild($stateName);

  return {
    id,
    name,
    eventName,
    eventDesc,
    $node,
  };
}

export default createStateNode;
