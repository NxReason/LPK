import '../../sass/userForm.scss';

import validator from './userValidator';
import ajax from '../utils/ajax';
/**
 * Form validation
 */
const INPUT_NAMES = ['username', 'password', 'password-verify', 'firstname',
  'lastname', 'email'];

const $rows = INPUT_NAMES.map(name => {
  return document.querySelector(`[name=${name}]`);
}).map($field => {
  return {
    input: $field,
    error: $field.parentNode.querySelector('.error-field')
  }
}).reduce((res, $row) => {
  res[$row.input.getAttribute('name')] = $row;
  return res;
}, {});

[$rows['password'].input, $rows['password-verify'].input]
  .forEach($pass => {
    $pass.addEventListener('change', handlePasswordChange);
  });

function handlePasswordChange() {
  const res = validator.verify(
    $rows['password'].input.value,
    $rows['password-verify'].input.value
  );

  $rows['password-verify'].error.textContent = res.valid ? "" : res.message;
}

/**
 * Saving data on server
 */
const $form = document.querySelector("#user-form");
const $saveButton = document.querySelector('#save-btn');
$saveButton.addEventListener('click', (e) => {
  e.preventDefault();

  const data = Object.keys($rows).reduce((acc, row) => {
    acc[row] = $rows[row].input.value;
    return acc;
  }, {});

  const url = $form.action;
  const options = {
    method: $form.method,
    data: JSON.stringify(data),
    headers: {
      'Content-type': 'application/json'
    }
  };

  ajax(url, options, true)
  .then(data => console.log(data))
  .catch(err => console.err(err));
});
