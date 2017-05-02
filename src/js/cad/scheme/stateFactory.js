import nodeFactory from '../../utils/nodeFactory';

function init(params = {}) {
  const name = params.name || 'Состояние';
  const id = params.id || `state${Date.now()}`;

  const $node = nodeFactory('div', { classList: ['cad-state'], attrs: { id } });
  const $stateName = nodeFactory('h5', { classList: ['cad-state-name'], textContent: name });
  $node.appendChild($stateName);

  return {
    id,
    name,
    $node,
  };
}

export default init;
