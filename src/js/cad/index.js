import '../../sass/cad.scss';
import Scene from './scene';
import Scheme from './scheme';
import API from './api';

const $newStateButton = document.querySelector('#new-state-btn');
const $modelPropsButton = document.querySelector('#model-props-btn');

$newStateButton.addEventListener('click', () => Scene.addState());
$modelPropsButton.addEventListener('click', () => Scene.showPropsPanel());

const $stateCloseButton = document.querySelector('#new-state-panel .icon-close');
const $propsCloseButton = document.querySelector('#model-props-panel .icon-close');

$stateCloseButton.addEventListener('click', () => Scene.hideStatePanel());
$propsCloseButton.addEventListener('click', () => Scene.hidePropsPanel());

const scheme = new Scheme();
Scene.init(scheme);

const $saveModelBtn = document.getElementById('save-model-btn');

$saveModelBtn.addEventListener('click', () => {
  const model = scheme.getNormalized();
  API.sendModel(JSON.stringify(model))
    .then(() => {
      console.log('Model saved');
    })
    .catch((err) => {
      console.log(err);
    });
});
