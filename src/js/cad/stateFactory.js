import nodeFactory from '../utils/nodeFactory';

function init(params = {}) {
  let name = params.name || 'Состояние';
  let id = params.id  || `state${Date.now()}`

  const $node = nodeFactory('div', { classList: ['cad-state'], attrs: { id } });
  const $stateName = nodeFactory('h5', { classList: ['cad-state-name'], textContent: name });
  $node.appendChild($stateName);

  return {
    $node
  }
}

export default init;
