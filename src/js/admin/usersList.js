import ajax from '../utils/ajax';

const $tableBody = document.querySelector('.users-table tbody');
const $delButtons = document.querySelectorAll('.users-btn-delete');
const deleteUrlBase = '/admin/users/delete/';
$delButtons.forEach($btn => {
  $btn.addEventListener('click', handleUserDelete);
});

function handleUserDelete(e) {
  const $btn = e.target;
  const id = $btn.dataset.userId;
  const url = deleteUrlBase + id;

  ajax(url, {
    method: 'DELETE',
    headers: {
      'Content-type': 'application/json'
    }
  })
  .then(res => {
    res = JSON.parse(res);
    if (res.deleted) {
      hideUserRow(id);
    } else {
      console.log(res.message);
    }
  })
  .catch(err => console.error(err));
}

function hideUserRow(id) {
  const $row = document.querySelector(`tr[data-user-id="${id}"]`);
  $tableBody.removeChild($row);
}
