import nodeFactory from '../../../utils/nodeFactory';
import { DEFAULT_STATE_NAME } from '../../config';

export default function createState(id) {
  const nodeId = `state-${id}`;
  const $node = nodeFactory('div', { classList: [ 'cad-state' ], attrs: { id: nodeId } });
  const $stateName = nodeFactory('h5', { classList: [ 'cad-state-name' ], textContent: DEFAULT_STATE_NAME });
  $node.appendChild($stateName);
  return $node;
}
