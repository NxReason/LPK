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
  const $loadButton = document.querySelector('#load-model-btn');
  const $select = document.querySelector("#model-select");
  let model = {};
  $loadButton.addEventListener('click', () => {
    const modelId = $select.value;
    loadModel(modelId)
      .then(response => {
        model = new Model(response);
        scene.set(model);

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

})();
