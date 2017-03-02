import nodeFactory from './nodeFactory';

function msToContent(ms) {
  const seconds = Math.round(ms / 1000);
  const mins = Math.floor(seconds / 60);
  const secondsLeft = seconds - (mins * 60);

  return `${mins}:${secondsLeft >= 10 ? '' : '0'}${secondsLeft}`;
}

const timer = {
  startTime: null,
  interval: null,
  node: nodeFactory('span', { classList: ['timer'], textContent: '0:00' }),
  start: function() {
    this.startTime = Date.now();
    this.interval = setInterval(() => {
      const elapsed = Date.now() - this.startTime;
      this.node.textContent = msToContent(elapsed);
    }, 1000);
  },
  stop: function() {
    if (!this.startTime) { return; }
    this.startTime = null;
    clearInterval(this.interval);
    this.node.textContent = '0:00';
  }
}

export default timer;
