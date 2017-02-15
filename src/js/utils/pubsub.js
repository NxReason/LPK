const pubsub = (function() {

  const topics = {};

  return {
    subscribe: function(topic, listener) {
      if (!topics[topic]) topics[topic] = { queue: [] };

      const index = topics[topic].queue.push(listener) - 1;
      // function to delete topic
      return {
        remove: function() {
          delete topics[topic].queue[index];
        }
      };
    },

    publish: function(topic, info) {
      // no theme or no listeners
      if (!topics[topic] || !topics[topic].queue.length) return;

      const items = topics[topic].queue;
      items.forEach(item => {
        item(info || {});
      });
    }
  };
})();

export default pubsub;
