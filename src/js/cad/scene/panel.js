function toggleListDisplay(flag, $list, $icon) {
  if (flag) {
    showList($list, $icon);
  } else {
    hideList($list, $icon);
  }
  return !flag;
}

function showList($list, $icon) {
  if ($icon) $icon.classList.add('turn-down');
  $list.style.display = 'block';
}

function hideList($list, $icon) {
  if ($icon) $icon.classList.remove('turn-down');
  $list.style.display = 'none';
}

function appendListElement(element, $list) {
  let $li;
  if (typeof element === 'function') {
    $li = element();
  } else {
    $li = element;
  }
  $list.appendChild($li);
}

function appendChildren(parent, children) {
  if (children.forEach) {
    children.forEach(child => parent.appendChild(child));
  }
  return parent;
}

export default {
  toggleListDisplay,
  appendListElement,
  appendChildren,
};
