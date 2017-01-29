/**
 * Singleton object handling all interface changes
 */
const UIController = (function() {
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
  $loadButton = document.querySelector('#load-model-btn');
  $select = document.querySelector("#model-select");
  $loadButton.addEventListener('click', () => {
    const modelId = $select.value;
    loadModel(modelId)
    .then(model => {
      console.log(model);
    })
    .catch(err => {
      console.log(err.message);
    });
  });

  $startButton = document.querySelector('#start-btn');
  $stopButton = document.querySelector('#stop-btn');

  return {
    loadModel
  }
})();
