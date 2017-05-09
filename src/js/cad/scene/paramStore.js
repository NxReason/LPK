import nodeFactory from '../../utils/nodeFactory';
import pubsub from '../../utils/pubsub';

function createParamNode(data = {}) {
  const id = `param-${data.id}`;
  const name = '';
  const value = '';
  const $paramWrapper = nodeFactory('div', { classList: ['panel-param'] });
  const { stateId } = data;

  const $nameInput = nodeFactory('input', {
    attrs: {
      type: 'text',
      placeholder: 'Name',
    },
  });
  $nameInput.addEventListener('change', (e) => {
    const newName = e.target.value;
    pubsub.publish('paramNameChange', { id, value: newName, stateId });
  });

  const $valueInput = nodeFactory('input', {
    attrs: {
      type: 'text',
      placeholder: 'Value',
    },
  });
  $valueInput.addEventListener('change', (e) => {
    const newValue = e.target.value;
    pubsub.publish('paramValueChange', { id, value: newValue, stateId });
  });

  $paramWrapper.appendChild($nameInput);
  $paramWrapper.appendChild($valueInput);
  return {
    id,
    name,
    value,
    $paramWrapper,
  };
}

export default createParamNode;
