import createParameter from '../UIFactory/parameter';
import {
  handleHeaderClick,
  handleAddBtnClick,
} from '../utils';

const $header = document.getElementById('panel-params-open');
const $addBtn = document.getElementById('add-param-btn');
const $parametersList = document.getElementById('panel-params-list');

$header.addEventListener('click', () => handleHeaderClick($header, $parametersList));
$addBtn.addEventListener('click', () => handleAddBtnClick($header, $parametersList, createParameter, 'parameterCreated'));

const ParametersMenu = {
  set(parameters) {
    $parametersList.innerHTML = '';
    parameters.forEach(p => $parametersList.appendChild(createParameter(p.id, p)));
  },
};

export default ParametersMenu;
