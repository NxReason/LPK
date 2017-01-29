/**
 * Singleton object handling all interface changes
 */
const UIController = (function() {
  /**
   * Scene elements
   */
  $stateImg = document.querySelector('.state-visual');
  $stateParams = document.querySelector('.state-params');
  $event = document.querySelector('.event');
  $response = document.querySelector('.response');
  $tools = document.querySelector('.tools');

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
  function setScene(model) {
    console.log(model);
  }
  $loadButton = document.querySelector('#load-model-btn');
  $select = document.querySelector("#model-select");
  $loadButton.addEventListener('click', () => {
    const modelId = $select.value;
    loadModel(modelId)
      .then(model => {
        currentModel = new Model(model);
        setScene(currentModel);
      })
      .catch(err => { console.error(err.message) });
  });

  $startButton = document.querySelector('#start-btn');
  $stopButton = document.querySelector('#stop-btn');

  /** Public interface */
  // return {
  //   loadModel
  // }
})();
