import pubsub from '../../../utils/pubsub';
import ToolsMenu from './toolsMenu';

const $modelName = document.querySelector('#model-name-input');
const $breakTime = document.querySelector('#break-time-input');
const $steps = document.querySelector('#steps-input');

$modelName.addEventListener('change', () => { pubsub.publish('nameChanged', $modelName.value); });
$breakTime.addEventListener('change', () => { pubsub.publish('breakChanged', parseInt($breakTime.value, 10)); });
$steps.addEventListener('change', () => { pubsub.publish('stepsChanged', parseInt($steps.value, 10)); });

export default {
  init({ name, breakTime, steps }) {
    $modelName.value = name;
    $breakTime.value = breakTime;
    $steps.value = steps;
  },
};
