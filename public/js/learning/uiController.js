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

  /**
   * Set dinamic parts of the model to UI
   * State image / state params e.g.
   */
  // TODO
  function setScene(model) {
    console.log(model);
  }

  /**
   * Set tools from received model to UI
   */
  function initTools(tools) {
    html = tools.map(tool => {
      return `<div class='tool'>${createTool(tool)}</div>`
    }).join('');

    $tools.innerHTML = html;
  }

  /**
   * Create html for single tool
   */
  function createTool(tool) {
    switch (tool.type) {
      case 'range':
        return `
          <label for='${tool.name}'>${tool.name}</label>
          <input data-id='${tool.id}' name='${tool.name}' type='range' min='${tool.min}' max='${tool.max}'>
          `
      case 'switch':
      //TODO change button to toggle switch
        return `<button>${tool.name}</button>`
      default:
        return 'Unknown tool type';
    }
  }

  $loadButton = document.querySelector('#load-model-btn');
  $select = document.querySelector("#model-select");
  $loadButton.addEventListener('click', () => {
    const modelId = $select.value;
    loadModel(modelId)
      .then(model => {
        initTools(model.tools);
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
