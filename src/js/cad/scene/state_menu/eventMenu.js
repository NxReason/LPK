import pubsub from '../../../utils/pubsub';

const $name = document.getElementById('event-name-input');
const $desc = document.getElementById('event-description-input');

$name.addEventListener('change', () => {
  pubsub.publish('eventNameChanged', $name.value);
});

$desc.addEventListener('change', () => {
  pubsub.publish('eventDescChanged', $desc.value);
});

const EventMenu = {
  set({ name, desc }) {
    $name.value = name;
    $desc.value = desc;
  },
};

export default EventMenu;
