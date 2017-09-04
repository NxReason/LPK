import uuid from 'uuid/v4';
import pubsub from '../../utils/pubsub';

export function handleHeaderClick($header, $list) {
  const closed = $list.classList.toggle('is-hidden');
  const $icon = $header.querySelector('.icon');
  $icon.style.transform = `rotate(${closed ? 0 : 90}deg)`;
}

export function handleAddBtnClick($header, $list, factory, eventName) {
  $list.classList.remove('is-hidden');
  $header.querySelector('.icon').style.transform = 'rotate(90deg)';
  const id = uuid();
  const $node = factory(id);
  $list.appendChild($node);
  pubsub.publish(eventName, id);
}
