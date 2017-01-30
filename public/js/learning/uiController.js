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
  let currentModel;
  function loadModel(id) {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', `/models/${id}`, true);
    xhr.send();

    return new Promise((resolve, reject) => {
      xhr.onreadystatechange = function() {
        if(xhr.readyState == 4) {
          if(xhr.status == 200) {
            resolve(JSON.parse(xhr.responseText));
          } else {
            reject(xhr.statusText);
          }
        }
      }
    })
  }

  /**
   * UI button's handlers
   */
  $loadButton = document.querySelector('#load-model-btn');
  $select = document.querySelector("#model-select");
  $loadButton.addEventListener('click', () => {
    const modelId = $select.value;
    loadModel(modelId)
      .then(model => {
        /** initializing static parts of UI */
        scene.setModelName(model.name).initTools(model.tools);

        /** creating model from received data */
        currentModel = new Model(model);
        /** initializing dynamic parts */
        scene.setState(currentModel.currentState);
      })
      .catch(err => { console.error(err) });
  });

  $startButton = document.querySelector('#start-btn');
  $stopButton = document.querySelector('#stop-btn');

  /** Public interface */
  // return {
  //   loadModel
  // }
})();
