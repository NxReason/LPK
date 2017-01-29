/**
 * Singleton object handling all interface changes
 */
const UIController = (function() {
  /**
   * Scene elements
   */
  $modelName = document.querySelector('.model-name');
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
    $stateImg.setAttribute('src', model.currentState.img);
    const { params } = model.currentState;
    let html = '';
    for (param in params) {
      html += `
        <div>
          <span>${param}:</span>
          <span>${params[param]}</span>
        </div>
      `
    }
    $stateParams.innerHTML = html;
  }

  /**
   * Set tools from received model to UI
   */
  function initTools(tools) {
    const html = tools.map(tool => {
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
          <div>
            <span>${tool.min}</span>
            <input data-id='${tool.id}' name='${tool.name}' type='range' min='${tool.min}' max='${tool.max}'>
            <span>${tool.max}</span>
          </div>
          `
      case 'switch':
        return `
          <label for="${tool.name}">${tool.name}</label>
          <label class='switch'>
            <input type='checkbox'>
            <div class='slider'></div>
          </label>
        `
      default:
        return 'Unknown tool type';
    }
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
        $modelName.textContent = model.name;
        initTools(model.tools);
        currentModel = new Model(model);
        /** dynamic parts */
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
