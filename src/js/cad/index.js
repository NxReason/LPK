import '../../sass/cad.scss';
import scene from './scene';

const $newStateButton = document.querySelector('#new-state-btn');
const $modelPropsButton = document.querySelector('#model-props-btn');

$newStateButton.addEventListener('click', () => scene.addState());
$modelPropsButton.addEventListener('click', () => scene.showPropsPanel());

const $stateCloseButton = document.querySelector("#new-state-panel .icon-close");
const $propsCloseButton = document.querySelector("#model-props-panel .icon-close");

$stateCloseButton.addEventListener('click', () => scene.hideStatePanel());
$propsCloseButton.addEventListener('click', () => scene.hidePropsPanel());
