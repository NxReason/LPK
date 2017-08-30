import '../../sass/galery.scss';
import ajax from '../utils/ajax';
import nodeFactory from '../utils/nodeFactory';

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
    const img = JSON.parse(res);
    addImageNode(img);
  })
  .catch((err) => {
    console.warn(err);
  });
}

function isFiles($input) { 
  return ($input.files.length >= 1);
}

const $imagesList = document.querySelector('.images-list-ul');
function addImageNode(img) {
  const $li = nodeFactory('li', { classList: ['image-item'] });

  const $span = nodeFactory('span', { classList: ['image-item-name'], textContent: img.name });
  const $a = nodeFactory('a',{
    attrs: { href: `/uploads/${img.url}`, target: '_blank' },
  });
  const $iconWrapper = nodeFactory('span', { classList: ['icon-wrapper'] });
  const $icon = nodeFactory('i', { classList: [ 'icon', 'icon-image' ] });

  $iconWrapper.appendChild($icon);
  $a.appendChild($iconWrapper);
  $li.appendChild($span);
  $li.appendChild($a);

  $imagesList.appendChild($li);
}
