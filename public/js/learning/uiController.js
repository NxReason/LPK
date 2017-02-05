/**
 * Singleton object handling all interface changes
 */
const UIController = (function() {
  const scene = new Scene(
    document.querySelector('.model-name'),
    document.querySelector('.state-visual'),
    document.querySelector('.state-params'),
    document.querySelector('.event'),
    document.querySelector('.response'),
    document.querySelector('.tools')
  )

  /**
   * Load model with given id
   */
  function loadModel(id) {
    return ajax(`/models/${id}`)
      .then(response => JSON.parse(response));
  }

  /**
   * UI button's handlers
   */
  const $loadButton = document.querySelector('#load-model-btn');
  const $select = document.querySelector("#model-select");
  let model = {};
  $loadButton.addEventListener('click', () => {
    const modelId = $select.value;
    loadModel(modelId)
      .then(response => {
        model = new Model(response);
        scene.init(model).initTools(response.tools);

        $startButton.disabled = false;
        $stopButton.disabled = false;
      })
      .catch(err => { console.error(err) });
  });

  const $startButton = document.querySelector('#start-btn');
  $startButton.addEventListener('click', () => {
    model.start();
  });

  const $stopButton = document.querySelector('#stop-btn');
  $stopButton.addEventListener('click', () => {
    model.stop();
  });

  const $runButton = document.querySelector('#run-btn');
  $runButton.addEventListener('click', () => {
    const toolsData = scene.getToolsData();
    pubsub.publish('user_input', toolsData);
  });

  /**
   * Handle custom events here (user input, programm messages etc.)
   */
  pubsub.subscribe('new_state', state => scene.setState(state));
  pubsub.subscribe('event', data => scene.setEvent(data.event));

})();
