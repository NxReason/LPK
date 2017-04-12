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

  showError('password-verify', res);
}

$rows['username'].input.addEventListener('change', () => {
  validator.unique('username', $rows['username'].input.value)
  .then(res => {
    showError('username', res);
  })
  .catch(err => console.error(err));
});

function showError(fieldName, response) {
  $rows[fieldName].error.textContent = response.valid ? "" : response.message;
}

/**
 * Saving data on server
 */
const $form = document.querySelector("#user-form");
const $saveButton = document.querySelector('#save-btn');
const $response = document.querySelector('#server-response');

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

  ajax(url, options)
  .then(res => {
    res = JSON.parse(res);
    if (res.created) {
      showSuccessRes('Пользователь успешно создан');
    } else {
      showFailureRes(`Не удалось создать пользователя: ${res.message}`);
    }
  })
  .catch(err => console.error(err));
});

function showSuccessRes(msg) {
  swapClasses($response, 'success', 'error');
  $response.textContent = msg;
  clearForm();
}

function showFailureRes(msg) {
  swapClasses($response, 'error', 'success');
  $response.textContent = msg;
}

function swapClasses($el, on, off) {
  $el.classList.add(on);
  $el.classList.remove(off);
}

function clearForm() {
  const keys = Object.keys($rows);
  keys.forEach(key => {
    $rows[key].input.value = "";
  })
}
