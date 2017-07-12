import '../../sass/galery.scss';
import ajax from '../utils/ajax.js';

const $imgLabel = document.querySelector('#new-image-label');
const $imgInput = document.querySelector('#new-image-input');

$imgInput.addEventListener('change', (e) => {
  let content = '';
  if (e.target.files) {
    content = e.target.value.split('\\').pop();
  } else {
    content = 'Изображение';
  }
  $imgLabel.querySelector('span').textContent = content;
});

const $imgName = document.querySelector('.new-image-name');
const $newImageButton = document.querySelector('.new-image-save');
$newImageButton.addEventListener('click', sendImage);

function sendImage() {
  const name = $imgName.value;
  if (!isFiles($imgInput) || !name) {
    console.warn('All fields are required');
    return;
  }
  const formdata = new FormData();
  formdata.append('name', name);
  formdata.append('img', $imgInput.files[0]);

  ajax('/galery/images', {
    method: 'POST',
    headers: [{ 'Content-type': 'multipart/form-data' }],
    data: formdata,
  })
  .then((res) => {
    console.log(res);
  })
  .catch((err) => {
    console.warn(err);
  });
}

function isFiles($input) { 
  return ($input.files.length >= 1);
}
