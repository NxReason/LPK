import pubsub from '../../../utils/pubsub';
import nodeFactory from '../../../utils/nodeFactory';

function createParameter(id, data = {}) {
  const $paramWrapper = nodeFactory('div', { classList: [ 'panel-param' ] });

  const $nameInput = nodeFactory('input', {
    attrs: {
      type: 'text',
      placeholder: 'Name',
      value: data.name || '',
    },
  });
  $nameInput.addEventListener('change', (e) => {
    pubsub.publish('parameterNameChanged', { id, name: e.target.value });
  });

  const $valueInput = nodeFactory('input', {
    attrs: {
      type: 'text',
      placeholder: 'Value',
      value: data.value || '',
    },
  });
  $valueInput.addEventListener('change', (e) => {
    pubsub.publish('parameterValueChanged', { id, value: parseInt(e.target.value, 10) });
  });

  $paramWrapper.appendChild($nameInput);
  $paramWrapper.appendChild($valueInput);
  return $paramWrapper;
}

export default createParameter;
