/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 8);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
var pubsub = function () {

  var topics = {};

  return {
    subscribe: function subscribe(topic, listener) {
      if (!topics[topic]) topics[topic] = { queue: [] };

      var index = topics[topic].queue.push(listener) - 1;

      // function to delete topic
      return {
        remove: function remove() {
          delete topics[topic].queue[index];
        }
      };
    },

    publish: function publish(topic, info) {
      // no theme or no listeners
      if (!topics[topic] || !topics[topic].queue.length) return;

      var items = topics[topic].queue;
      items.forEach(function (item) {
        item(info || {});
      });
    }
  };
}();

exports.default = pubsub;

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _state = __webpack_require__(7);

var _state2 = _interopRequireDefault(_state);

var _pubsub = __webpack_require__(0);

var _pubsub2 = _interopRequireDefault(_pubsub);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Model = function () {
  function Model(data) {
    _classCallCheck(this, Model);

    this.id = data.id;
    this.name = data.name;
    this.breakTime = data.breakTime;
    this.steps = data.steps;

    this.states = data.states.map(function (state) {
      return new _state2.default(state);
    });
    this.currentState = this.getState(data.id);

    this.timeout = null;
    this.subscribtion = null;
  }

  _createClass(Model, [{
    key: 'getState',
    value: function getState(id) {
      return this.states.find(function (state) {
        return state.id == id;
      });
    }
  }, {
    key: 'start',
    value: function start() {
      var _this = this;

      var intervals = Promise.resolve(); // init promise chain
      for (var i = 0; i < this.steps; i++) {
        intervals = intervals.then(function () {
          return _this.makeBreak();
        }).then(function () {
          return _this.handleEvent();
        }).then(function (state) {
          _this.handleNewState(state);
        });
      }
      intervals.catch(function (state) {
        _pubsub2.default.publish('new_state', state);
      });
    }
  }, {
    key: 'makeBreak',
    value: function makeBreak() {
      var _this2 = this;

      return new Promise(function (resolve, reject) {
        setTimeout(function () {
          resolve();
        }, _this2.breakTime);
      });
    }
  }, {
    key: 'handleEvent',
    value: function handleEvent() {
      var _this3 = this;

      var event = this.currentState.event;
      var eventStartTime = Date.now();
      return new Promise(function (resolve, reject) {
        // send data about new event to other modules
        _pubsub2.default.publish('event', { event: event });

        // listen to user action
        // and if user input correct go to next state
        _this3.subscribtion = _pubsub2.default.subscribe('user_input', function (data) {
          var timeSpent = Date.now() - eventStartTime;
          var nextStateId = event.handleInput(data, timeSpent);
          var nextState = _this3.getState(nextStateId);
          if (nextState) {
            nextState.last ? reject(nextState) : resolve(nextState);
          }
        });

        // handle inactive
        var inactiveTime = event.getInactiveTime();
        _this3.timeout = setTimeout(function () {
          var nextStateId = event.getInactiveAction().nextState;
          var nextState = _this3.getState(nextStateId);
          nextState.last ? reject(nextState) : resolve(nextState);
        }, inactiveTime);
      });
    }
  }, {
    key: 'handleNewState',
    value: function handleNewState(state) {
      this.currentState = state;
      clearTimeout(this.timeout);
      this.subscribtion.remove();
      _pubsub2.default.publish('new_state', state);
    }

    // TODO

  }, {
    key: 'stop',
    value: function stop() {}
  }]);

  return Model;
}();

exports.default = Model;

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Scene = function () {
  function Scene($modelName, $stateImg, $stateParams, $event, $responseBox, $toolsBox) {
    _classCallCheck(this, Scene);

    this.$modelName = $modelName;
    this.$stateImg = $stateImg;
    this.$stateParams = $stateParams;
    this.$event = $event;
    this.$responseBox = $responseBox;
    this.$toolsBox = $toolsBox;
  }

  _createClass(Scene, [{
    key: 'init',
    value: function init(model) {
      this.setModelName(model.name).setState(model.currentState);
      return this;
    }

    /** Set actual node content */

  }, {
    key: 'setModelName',
    value: function setModelName(name) {
      this.$modelName.textContent = name;
      return this;
    }

    /** Creates input elements in 'tools' box */

  }, {
    key: 'initTools',
    value: function initTools(tools) {
      var _this = this;

      var toolsFragment = document.createDocumentFragment();

      tools.forEach(function (tool) {
        // Wrap every tool for proper display and add label
        var div = document.createElement('div');
        div.classList.add('tool');

        var label = document.createElement('label');
        label.setAttribute('for', tool.name);
        label.textContent = tool.name;
        div.appendChild(label);

        var toolNode = _this.createToolNode(tool);
        div.appendChild(toolNode);

        // Append to fragment
        toolsFragment.appendChild(div);
      });

      this.$toolsBox.innerHTML = '';
      this.$toolsBox.appendChild(toolsFragment);
      return this;
    }
  }, {
    key: 'createToolNode',
    value: function createToolNode(tool) {
      switch (tool.type) {
        case 'range':
          return this.createRangeTool(tool);
        case 'switch':
          return this.createSwitchTool(tool);
        default:
          return 'Unknown tool type';
      }
    }
  }, {
    key: 'createRangeTool',
    value: function createRangeTool(tool) {
      var div = document.createElement('div');

      var spanMin = document.createElement('span');
      spanMin.textContent = tool.min;
      div.appendChild(spanMin);

      var input = document.createElement('input');
      input.setAttribute('data-id', tool.id);
      input.setAttribute('data-type', 'range');
      input.setAttribute('name', tool.name);
      input.setAttribute('type', 'range');
      input.setAttribute('min', tool.min);
      input.setAttribute('max', tool.max);
      div.appendChild(input);

      var spanMax = document.createElement('span');
      spanMax.textContent = tool.max;
      div.appendChild(spanMax);

      return div;
    }
  }, {
    key: 'createSwitchTool',
    value: function createSwitchTool(tool) {
      var label = document.createElement('label');
      label.classList.add('switch');

      var input = document.createElement('input');
      input.setAttribute('data-id', tool.id);
      input.setAttribute('data-type', 'switch');
      input.setAttribute('type', 'checkbox');
      label.appendChild(input);

      var div = document.createElement('div');
      div.classList.add('slider');
      label.appendChild(div);

      return label;
    }

    /** Sets img and parameters of current state to UI */

  }, {
    key: 'setState',
    value: function setState(_ref) {
      var img = _ref.img,
          params = _ref.params;

      // Change state image
      this.$stateImg.setAttribute('src', img);

      // Set state parameters
      var paramsFragment = document.createDocumentFragment();
      for (var key in params) {
        paramsFragment.appendChild(this.createParameterNode(key, params[key]));
      }
      this.$stateParams.innerHTML = '';
      this.$stateParams.appendChild(paramsFragment);

      return this;
    }
  }, {
    key: 'createParameterNode',
    value: function createParameterNode(key, value) {
      var div = document.createElement('div');

      var keySpan = document.createElement('span');
      keySpan.textContent = key;
      div.appendChild(keySpan);

      var valueSpan = document.createElement('span');
      valueSpan.textContent = value;
      div.appendChild(valueSpan);

      return div;
    }

    /** Sets event data to UI */

  }, {
    key: 'setEvent',
    value: function setEvent(event) {
      this.$event.textContent = event.name;
    }

    /** Get data from tool nodes */

  }, {
    key: 'getToolsData',
    value: function getToolsData() {
      var toolsData = {};
      var inputs = this.$toolsBox.querySelectorAll('input[data-id]');
      inputs.forEach(function (input) {
        var _input$dataset = input.dataset,
            id = _input$dataset.id,
            type = _input$dataset.type;

        var value = void 0;
        switch (type) {
          case 'range':
            value = parseInt(input.value);break;
          case 'switch':
            value = input.checked;break;
          default:
            throw new Error('Invalid tool type');
        }
        toolsData[id] = value;
      });
      return toolsData;
    }
  }]);

  return Scene;
}();

exports.default = Scene;

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
function ajax() {
  var path = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

  var xhr = new XMLHttpRequest();
  xhr.open(options.method || 'GET', path, true);
  if (options.headers) {
    setXHRHeaders(xhr, options.headers);
  }
  xhr.send(options.data);

  return new Promise(function (resolve, reject) {
    xhr.onreadystatechange = function () {
      if (xhr.readyState == 4) {
        if (xhr.status == 200) {
          resolve(xhr.responseText);
        } else {
          reject(xhr.statusText);
        }
      }
    };
  });
}

function setXHRHeaders(xhr, headers) {
  for (var header in headers) {
    xhr.setRequestHeader(header, headers[headers]);
  }
}

exports.default = ajax;

/***/ }),
/* 4 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Action = function () {
  function Action(data) {
    _classCallCheck(this, Action);

    this.toolId = data.tool;
    this.minTime = data.minTime;
    this.maxTime = data.maxTime;
    this.nextState = data.nextState;
    if (data.inactive) {
      this.inactive = true;
      this.value = null;
    } else {
      this.inactive = false;
      this.value = data.value;
    }
  }

  _createClass(Action, [{
    key: 'isSuitable',
    value: function isSuitable(data, time) {
      return this.rightTime(time) && this.rightData(data);
    }
  }, {
    key: 'rightData',
    value: function rightData(data) {
      if (typeof this.value == 'boolean' && data[this.toolId] && data[this.toolId] == this.value) {
        return true;
      } else if (Array.isArray(this.value) && data[this.toolId] && this.includesValue(data[this.toolId])) {
        return true;
      }
      return false;
    }
  }, {
    key: 'includesValue',
    value: function includesValue(value, borders) {
      return value > this.value[0] && value < this.value[1];
    }
  }, {
    key: 'rightTime',
    value: function rightTime(time) {
      return time > this.minTime && time < this.maxTime;
    }
  }]);

  return Action;
}();

exports.default = Action;

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _action = __webpack_require__(5);

var _action2 = _interopRequireDefault(_action);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Event = function () {
  function Event(data) {
    _classCallCheck(this, Event);

    this.id = data.id;
    this.name = data.name;
    this.description = data.description;
    this.actions = data.actions.map(function (action) {
      return new _action2.default(action);
    });
  }

  _createClass(Event, [{
    key: 'getInactiveTime',
    value: function getInactiveTime() {
      var times = this.getAllActionTimes();
      return Math.max.apply(Math, _toConsumableArray(times));
    }
  }, {
    key: 'getInactiveAction',
    value: function getInactiveAction() {
      return this.actions.find(function (action) {
        return action.inactive === true;
      });
    }
  }, {
    key: 'getAllActionTimes',
    value: function getAllActionTimes() {
      return this.actions.map(function (action) {
        return action.maxTime || 0;
      });
    }
  }, {
    key: 'handleInput',
    value: function handleInput(data, time) {
      var suitedActions = this.actions.filter(function (action) {
        return action.isSuitable(data, time);
      });
      if (suitedActions) {
        return suitedActions[0].nextState;
      }
    }
  }]);

  return Event;
}();

exports.default = Event;

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _event = __webpack_require__(6);

var _event2 = _interopRequireDefault(_event);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var State = function State(data) {
  _classCallCheck(this, State);

  this.id = data.id;
  this.name = data.name;
  this.img = data.img;
  this.params = data.params;

  if (data.last) {
    this.last = true;
    this.event = null;
  } else {
    this.event = new _event2.default(data.event);
    this.last = false;
  }
};

exports.default = State;

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


__webpack_require__(4);

var _pubsub = __webpack_require__(0);

var _pubsub2 = _interopRequireDefault(_pubsub);

var _ajax = __webpack_require__(3);

var _ajax2 = _interopRequireDefault(_ajax);

var _scene = __webpack_require__(2);

var _scene2 = _interopRequireDefault(_scene);

var _model = __webpack_require__(1);

var _model2 = _interopRequireDefault(_model);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var scene = new _scene2.default(document.querySelector('.model-name'), document.querySelector('.state-visual'), document.querySelector('.state-params'), document.querySelector('.event'), document.querySelector('.response'), document.querySelector('.tools'));

/**
 * Load model with given id
 */
function loadModel(id) {
  return (0, _ajax2.default)('/models/' + id).then(function (response) {
    return JSON.parse(response);
  });
}

function toggleControlButtons() {
  $startButton.disabled = !$startButton.disabled;
  $stopButton.disabled = !$stopButton.disabled;
}

/**
 * UI button's handlers
 */
var $loadButton = document.querySelector('#load-model-btn');
var $select = document.querySelector("#model-select");
var model = {};
$loadButton.addEventListener('click', function () {
  var modelId = $select.value;
  loadModel(modelId).then(function (response) {
    model = new _model2.default(response);
    scene.init(model).initTools(response.tools);
    toggleControlButtons();
  }).catch(function (err) {
    console.error(err);
  });
});

var $startButton = document.querySelector('#start-btn');
$startButton.addEventListener('click', function () {
  model.start();
});

var $stopButton = document.querySelector('#stop-btn');
$stopButton.addEventListener('click', function () {
  model.stop(); // TODO
});

var $runButton = document.querySelector('#run-btn');
$runButton.addEventListener('click', function () {
  var toolsData = scene.getToolsData();
  _pubsub2.default.publish('user_input', toolsData);
});

/**
 * Handle custom events here (user input, programm messages etc.)
 */
_pubsub2.default.subscribe('new_state', function (state) {
  return scene.setState(state);
});
_pubsub2.default.subscribe('event', function (data) {
  return scene.setEvent(data.event);
});

/***/ })
/******/ ]);
//# sourceMappingURL=learning.bundle.js.map