// import '../../sass/common.scss';

import ajax from '../utils/ajax.js';

const $modelsList = document.querySelector('.models-list');
$modelsList.addEventListener('click', removeModel);

function removeModel(e) {
  if (e.target.classList.contains('model__control-delete')) {
    const $btn = e.target;
    const id = $btn.dataset.id;

    ajax(`/admin/models/${id}`, {
      method: 'DELETE',
      headers: [{ 'Content-type': 'application/json' }],
    })
    .then((res) => {
      const data = JSON.parse(res);
      removeModelNode(id);
    })
    .catch((err) => {
      console.warn(err);
    });
  }
}

function removeModelNode(id) {
  const $node = document.getElementById(`model-${id}`);
  $modelsList.removeChild($node);
}
