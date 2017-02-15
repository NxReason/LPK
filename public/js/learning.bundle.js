/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.l = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };

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

/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};

/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

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
        label.classList.add('tool-name');
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
      var _this2 = this;

      var divInput = document.createElement('div');
      divInput.classList.add('range');

      var spanMin = document.createElement('span');
      spanMin.textContent = tool.min;
      divInput.appendChild(spanMin);

      var input = document.createElement('input');
      input.setAttribute('data-id', tool.id);
      input.setAttribute('data-type', 'range');
      input.setAttribute('name', tool.name);
      input.setAttribute('type', 'range');
      input.setAttribute('min', tool.min);
      input.setAttribute('max', tool.max);
      divInput.appendChild(input);

      var spanMax = document.createElement('span');
      spanMax.textContent = tool.max;
      divInput.appendChild(spanMax);

      var divCurrent = document.createElement('div');
      divCurrent.classList.add('range-current-value');
      var spanCurrent = document.createElement('span');
      spanCurrent.textContent = input.value;
      divCurrent.appendChild(spanCurrent);

      input.addEventListener('input', function (evt) {
        _this2.updateCurrentRangeValue(spanCurrent, evt.target.value);
      });

      var fragment = document.createDocumentFragment();
      fragment.appendChild(divInput);
      fragment.appendChild(divCurrent);

      return fragment;
    }
  }, {
    key: 'updateCurrentRangeValue',
    value: function updateCurrentRangeValue(node, value) {
      node.textContent = value;
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

      // Hide last event data
      this.hideEvent();

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
      div.classList.add('parameter');

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
      this.$event.querySelector('.model-event-name span').textContent = event.name;
      this.$event.querySelector('.model-event-info').textContent = event.description;
      this.$event.classList.remove('is-hidden');
    }
  }, {
    key: 'hideEvent',
    value: function hideEvent() {
      this.$event.classList.add('is-hidden');
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

var scene = new _scene2.default(document.querySelector('.model-name'), document.querySelector('.model-state-img'), document.querySelector('.model-params-values'), document.querySelector('.model-event'), document.querySelector('.model-response'), document.querySelector('.tools-list'));

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
  $runButton.disabled = !$runButton.disabled;
}

function setContentDisplay(display) {
  var content = document.querySelector('.content');
  content.style.display = display;
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
    setContentDisplay('flex');
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGVhcm5pbmcuYnVuZGxlLmpzIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vL3dlYnBhY2svYm9vdHN0cmFwIDdjMDQ2NmNmM2NiMDEzZTI0OTQyIiwid2VicGFjazovLy8uL3V0aWxzL3B1YnN1Yi5qcyIsIndlYnBhY2s6Ly8vLi9sZWFybmluZy9tb2RlbC5qcyIsIndlYnBhY2s6Ly8vLi9sZWFybmluZy9zY2VuZS5qcyIsIndlYnBhY2s6Ly8vLi91dGlscy9hamF4LmpzIiwid2VicGFjazovLy8uLi9zYXNzL2xlYXJuaW5nLnNjc3MiLCJ3ZWJwYWNrOi8vLy4vbGVhcm5pbmcvY29tcG9uZW50cy9hY3Rpb24uanMiLCJ3ZWJwYWNrOi8vLy4vbGVhcm5pbmcvY29tcG9uZW50cy9ldmVudC5qcyIsIndlYnBhY2s6Ly8vLi9sZWFybmluZy9jb21wb25lbnRzL3N0YXRlLmpzIiwid2VicGFjazovLy8uL2xlYXJuaW5nLmpzIl0sInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKVxuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuXG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBpZGVudGl0eSBmdW5jdGlvbiBmb3IgY2FsbGluZyBoYXJtb255IGltcG9ydHMgd2l0aCB0aGUgY29ycmVjdCBjb250ZXh0XG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmkgPSBmdW5jdGlvbih2YWx1ZSkgeyByZXR1cm4gdmFsdWU7IH07XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwge1xuIFx0XHRcdFx0Y29uZmlndXJhYmxlOiBmYWxzZSxcbiBcdFx0XHRcdGVudW1lcmFibGU6IHRydWUsXG4gXHRcdFx0XHRnZXQ6IGdldHRlclxuIFx0XHRcdH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IDgpO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIHdlYnBhY2svYm9vdHN0cmFwIDdjMDQ2NmNmM2NiMDEzZTI0OTQyIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuICB2YWx1ZTogdHJ1ZVxufSk7XG52YXIgcHVic3ViID0gZnVuY3Rpb24gKCkge1xuXG4gIHZhciB0b3BpY3MgPSB7fTtcblxuICByZXR1cm4ge1xuICAgIHN1YnNjcmliZTogZnVuY3Rpb24gc3Vic2NyaWJlKHRvcGljLCBsaXN0ZW5lcikge1xuICAgICAgaWYgKCF0b3BpY3NbdG9waWNdKSB0b3BpY3NbdG9waWNdID0geyBxdWV1ZTogW10gfTtcblxuICAgICAgdmFyIGluZGV4ID0gdG9waWNzW3RvcGljXS5xdWV1ZS5wdXNoKGxpc3RlbmVyKSAtIDE7XG4gICAgICAvLyBmdW5jdGlvbiB0byBkZWxldGUgdG9waWNcbiAgICAgIHJldHVybiB7XG4gICAgICAgIHJlbW92ZTogZnVuY3Rpb24gcmVtb3ZlKCkge1xuICAgICAgICAgIGRlbGV0ZSB0b3BpY3NbdG9waWNdLnF1ZXVlW2luZGV4XTtcbiAgICAgICAgfVxuICAgICAgfTtcbiAgICB9LFxuXG4gICAgcHVibGlzaDogZnVuY3Rpb24gcHVibGlzaCh0b3BpYywgaW5mbykge1xuICAgICAgLy8gbm8gdGhlbWUgb3Igbm8gbGlzdGVuZXJzXG4gICAgICBpZiAoIXRvcGljc1t0b3BpY10gfHwgIXRvcGljc1t0b3BpY10ucXVldWUubGVuZ3RoKSByZXR1cm47XG5cbiAgICAgIHZhciBpdGVtcyA9IHRvcGljc1t0b3BpY10ucXVldWU7XG4gICAgICBpdGVtcy5mb3JFYWNoKGZ1bmN0aW9uIChpdGVtKSB7XG4gICAgICAgIGl0ZW0oaW5mbyB8fCB7fSk7XG4gICAgICB9KTtcbiAgICB9XG4gIH07XG59KCk7XG5cbmV4cG9ydHMuZGVmYXVsdCA9IHB1YnN1YjtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL3V0aWxzL3B1YnN1Yi5qc1xuLy8gbW9kdWxlIGlkID0gMFxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCIndXNlIHN0cmljdCc7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuICB2YWx1ZTogdHJ1ZVxufSk7XG5cbnZhciBfY3JlYXRlQ2xhc3MgPSBmdW5jdGlvbiAoKSB7IGZ1bmN0aW9uIGRlZmluZVByb3BlcnRpZXModGFyZ2V0LCBwcm9wcykgeyBmb3IgKHZhciBpID0gMDsgaSA8IHByb3BzLmxlbmd0aDsgaSsrKSB7IHZhciBkZXNjcmlwdG9yID0gcHJvcHNbaV07IGRlc2NyaXB0b3IuZW51bWVyYWJsZSA9IGRlc2NyaXB0b3IuZW51bWVyYWJsZSB8fCBmYWxzZTsgZGVzY3JpcHRvci5jb25maWd1cmFibGUgPSB0cnVlOyBpZiAoXCJ2YWx1ZVwiIGluIGRlc2NyaXB0b3IpIGRlc2NyaXB0b3Iud3JpdGFibGUgPSB0cnVlOyBPYmplY3QuZGVmaW5lUHJvcGVydHkodGFyZ2V0LCBkZXNjcmlwdG9yLmtleSwgZGVzY3JpcHRvcik7IH0gfSByZXR1cm4gZnVuY3Rpb24gKENvbnN0cnVjdG9yLCBwcm90b1Byb3BzLCBzdGF0aWNQcm9wcykgeyBpZiAocHJvdG9Qcm9wcykgZGVmaW5lUHJvcGVydGllcyhDb25zdHJ1Y3Rvci5wcm90b3R5cGUsIHByb3RvUHJvcHMpOyBpZiAoc3RhdGljUHJvcHMpIGRlZmluZVByb3BlcnRpZXMoQ29uc3RydWN0b3IsIHN0YXRpY1Byb3BzKTsgcmV0dXJuIENvbnN0cnVjdG9yOyB9OyB9KCk7XG5cbnZhciBfc3RhdGUgPSByZXF1aXJlKCcuL2NvbXBvbmVudHMvc3RhdGUnKTtcblxudmFyIF9zdGF0ZTIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9zdGF0ZSk7XG5cbnZhciBfcHVic3ViID0gcmVxdWlyZSgnLi4vdXRpbHMvcHVic3ViJyk7XG5cbnZhciBfcHVic3ViMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX3B1YnN1Yik7XG5cbmZ1bmN0aW9uIF9pbnRlcm9wUmVxdWlyZURlZmF1bHQob2JqKSB7IHJldHVybiBvYmogJiYgb2JqLl9fZXNNb2R1bGUgPyBvYmogOiB7IGRlZmF1bHQ6IG9iaiB9OyB9XG5cbmZ1bmN0aW9uIF9jbGFzc0NhbGxDaGVjayhpbnN0YW5jZSwgQ29uc3RydWN0b3IpIHsgaWYgKCEoaW5zdGFuY2UgaW5zdGFuY2VvZiBDb25zdHJ1Y3RvcikpIHsgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkNhbm5vdCBjYWxsIGEgY2xhc3MgYXMgYSBmdW5jdGlvblwiKTsgfSB9XG5cbnZhciBNb2RlbCA9IGZ1bmN0aW9uICgpIHtcbiAgZnVuY3Rpb24gTW9kZWwoZGF0YSkge1xuICAgIF9jbGFzc0NhbGxDaGVjayh0aGlzLCBNb2RlbCk7XG5cbiAgICB0aGlzLmlkID0gZGF0YS5pZDtcbiAgICB0aGlzLm5hbWUgPSBkYXRhLm5hbWU7XG4gICAgdGhpcy5icmVha1RpbWUgPSBkYXRhLmJyZWFrVGltZTtcbiAgICB0aGlzLnN0ZXBzID0gZGF0YS5zdGVwcztcblxuICAgIHRoaXMuc3RhdGVzID0gZGF0YS5zdGF0ZXMubWFwKGZ1bmN0aW9uIChzdGF0ZSkge1xuICAgICAgcmV0dXJuIG5ldyBfc3RhdGUyLmRlZmF1bHQoc3RhdGUpO1xuICAgIH0pO1xuICAgIHRoaXMuY3VycmVudFN0YXRlID0gdGhpcy5nZXRTdGF0ZShkYXRhLmlkKTtcblxuICAgIHRoaXMudGltZW91dCA9IG51bGw7XG4gICAgdGhpcy5zdWJzY3JpYnRpb24gPSBudWxsO1xuICB9XG5cbiAgX2NyZWF0ZUNsYXNzKE1vZGVsLCBbe1xuICAgIGtleTogJ2dldFN0YXRlJyxcbiAgICB2YWx1ZTogZnVuY3Rpb24gZ2V0U3RhdGUoaWQpIHtcbiAgICAgIHJldHVybiB0aGlzLnN0YXRlcy5maW5kKGZ1bmN0aW9uIChzdGF0ZSkge1xuICAgICAgICByZXR1cm4gc3RhdGUuaWQgPT0gaWQ7XG4gICAgICB9KTtcbiAgICB9XG4gIH0sIHtcbiAgICBrZXk6ICdzdGFydCcsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIHN0YXJ0KCkge1xuICAgICAgdmFyIF90aGlzID0gdGhpcztcblxuICAgICAgdmFyIGludGVydmFscyA9IFByb21pc2UucmVzb2x2ZSgpOyAvLyBpbml0IHByb21pc2UgY2hhaW5cbiAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdGhpcy5zdGVwczsgaSsrKSB7XG4gICAgICAgIGludGVydmFscyA9IGludGVydmFscy50aGVuKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICByZXR1cm4gX3RoaXMubWFrZUJyZWFrKCk7XG4gICAgICAgIH0pLnRoZW4oZnVuY3Rpb24gKCkge1xuICAgICAgICAgIHJldHVybiBfdGhpcy5oYW5kbGVFdmVudCgpO1xuICAgICAgICB9KS50aGVuKGZ1bmN0aW9uIChzdGF0ZSkge1xuICAgICAgICAgIF90aGlzLmhhbmRsZU5ld1N0YXRlKHN0YXRlKTtcbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgICBpbnRlcnZhbHMuY2F0Y2goZnVuY3Rpb24gKHN0YXRlKSB7XG4gICAgICAgIF9wdWJzdWIyLmRlZmF1bHQucHVibGlzaCgnbmV3X3N0YXRlJywgc3RhdGUpO1xuICAgICAgfSk7XG4gICAgfVxuICB9LCB7XG4gICAga2V5OiAnbWFrZUJyZWFrJyxcbiAgICB2YWx1ZTogZnVuY3Rpb24gbWFrZUJyZWFrKCkge1xuICAgICAgdmFyIF90aGlzMiA9IHRoaXM7XG5cbiAgICAgIHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xuICAgICAgICAgIHJlc29sdmUoKTtcbiAgICAgICAgfSwgX3RoaXMyLmJyZWFrVGltZSk7XG4gICAgICB9KTtcbiAgICB9XG4gIH0sIHtcbiAgICBrZXk6ICdoYW5kbGVFdmVudCcsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIGhhbmRsZUV2ZW50KCkge1xuICAgICAgdmFyIF90aGlzMyA9IHRoaXM7XG5cbiAgICAgIHZhciBldmVudCA9IHRoaXMuY3VycmVudFN0YXRlLmV2ZW50O1xuICAgICAgdmFyIGV2ZW50U3RhcnRUaW1lID0gRGF0ZS5ub3coKTtcbiAgICAgIHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgICAgIC8vIHNlbmQgZGF0YSBhYm91dCBuZXcgZXZlbnQgdG8gb3RoZXIgbW9kdWxlc1xuICAgICAgICBfcHVic3ViMi5kZWZhdWx0LnB1Ymxpc2goJ2V2ZW50JywgeyBldmVudDogZXZlbnQgfSk7XG5cbiAgICAgICAgLy8gbGlzdGVuIHRvIHVzZXIgYWN0aW9uXG4gICAgICAgIC8vIGFuZCBpZiB1c2VyIGlucHV0IGNvcnJlY3QgZ28gdG8gbmV4dCBzdGF0ZVxuICAgICAgICBfdGhpczMuc3Vic2NyaWJ0aW9uID0gX3B1YnN1YjIuZGVmYXVsdC5zdWJzY3JpYmUoJ3VzZXJfaW5wdXQnLCBmdW5jdGlvbiAoZGF0YSkge1xuICAgICAgICAgIHZhciB0aW1lU3BlbnQgPSBEYXRlLm5vdygpIC0gZXZlbnRTdGFydFRpbWU7XG4gICAgICAgICAgdmFyIG5leHRTdGF0ZUlkID0gZXZlbnQuaGFuZGxlSW5wdXQoZGF0YSwgdGltZVNwZW50KTtcbiAgICAgICAgICB2YXIgbmV4dFN0YXRlID0gX3RoaXMzLmdldFN0YXRlKG5leHRTdGF0ZUlkKTtcbiAgICAgICAgICBpZiAobmV4dFN0YXRlKSB7XG4gICAgICAgICAgICBuZXh0U3RhdGUubGFzdCA/IHJlamVjdChuZXh0U3RhdGUpIDogcmVzb2x2ZShuZXh0U3RhdGUpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICAgICAgLy8gaGFuZGxlIGluYWN0aXZlXG4gICAgICAgIHZhciBpbmFjdGl2ZVRpbWUgPSBldmVudC5nZXRJbmFjdGl2ZVRpbWUoKTtcbiAgICAgICAgX3RoaXMzLnRpbWVvdXQgPSBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICB2YXIgbmV4dFN0YXRlSWQgPSBldmVudC5nZXRJbmFjdGl2ZUFjdGlvbigpLm5leHRTdGF0ZTtcbiAgICAgICAgICB2YXIgbmV4dFN0YXRlID0gX3RoaXMzLmdldFN0YXRlKG5leHRTdGF0ZUlkKTtcbiAgICAgICAgICBuZXh0U3RhdGUubGFzdCA/IHJlamVjdChuZXh0U3RhdGUpIDogcmVzb2x2ZShuZXh0U3RhdGUpO1xuICAgICAgICB9LCBpbmFjdGl2ZVRpbWUpO1xuICAgICAgfSk7XG4gICAgfVxuICB9LCB7XG4gICAga2V5OiAnaGFuZGxlTmV3U3RhdGUnLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBoYW5kbGVOZXdTdGF0ZShzdGF0ZSkge1xuICAgICAgdGhpcy5jdXJyZW50U3RhdGUgPSBzdGF0ZTtcbiAgICAgIGNsZWFyVGltZW91dCh0aGlzLnRpbWVvdXQpO1xuICAgICAgdGhpcy5zdWJzY3JpYnRpb24ucmVtb3ZlKCk7XG4gICAgICBfcHVic3ViMi5kZWZhdWx0LnB1Ymxpc2goJ25ld19zdGF0ZScsIHN0YXRlKTtcbiAgICB9XG5cbiAgICAvLyBUT0RPXG5cbiAgfSwge1xuICAgIGtleTogJ3N0b3AnLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBzdG9wKCkge31cbiAgfV0pO1xuXG4gIHJldHVybiBNb2RlbDtcbn0oKTtcblxuZXhwb3J0cy5kZWZhdWx0ID0gTW9kZWw7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9sZWFybmluZy9tb2RlbC5qc1xuLy8gbW9kdWxlIGlkID0gMVxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCIndXNlIHN0cmljdCc7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuICB2YWx1ZTogdHJ1ZVxufSk7XG5cbnZhciBfY3JlYXRlQ2xhc3MgPSBmdW5jdGlvbiAoKSB7IGZ1bmN0aW9uIGRlZmluZVByb3BlcnRpZXModGFyZ2V0LCBwcm9wcykgeyBmb3IgKHZhciBpID0gMDsgaSA8IHByb3BzLmxlbmd0aDsgaSsrKSB7IHZhciBkZXNjcmlwdG9yID0gcHJvcHNbaV07IGRlc2NyaXB0b3IuZW51bWVyYWJsZSA9IGRlc2NyaXB0b3IuZW51bWVyYWJsZSB8fCBmYWxzZTsgZGVzY3JpcHRvci5jb25maWd1cmFibGUgPSB0cnVlOyBpZiAoXCJ2YWx1ZVwiIGluIGRlc2NyaXB0b3IpIGRlc2NyaXB0b3Iud3JpdGFibGUgPSB0cnVlOyBPYmplY3QuZGVmaW5lUHJvcGVydHkodGFyZ2V0LCBkZXNjcmlwdG9yLmtleSwgZGVzY3JpcHRvcik7IH0gfSByZXR1cm4gZnVuY3Rpb24gKENvbnN0cnVjdG9yLCBwcm90b1Byb3BzLCBzdGF0aWNQcm9wcykgeyBpZiAocHJvdG9Qcm9wcykgZGVmaW5lUHJvcGVydGllcyhDb25zdHJ1Y3Rvci5wcm90b3R5cGUsIHByb3RvUHJvcHMpOyBpZiAoc3RhdGljUHJvcHMpIGRlZmluZVByb3BlcnRpZXMoQ29uc3RydWN0b3IsIHN0YXRpY1Byb3BzKTsgcmV0dXJuIENvbnN0cnVjdG9yOyB9OyB9KCk7XG5cbmZ1bmN0aW9uIF9jbGFzc0NhbGxDaGVjayhpbnN0YW5jZSwgQ29uc3RydWN0b3IpIHsgaWYgKCEoaW5zdGFuY2UgaW5zdGFuY2VvZiBDb25zdHJ1Y3RvcikpIHsgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkNhbm5vdCBjYWxsIGEgY2xhc3MgYXMgYSBmdW5jdGlvblwiKTsgfSB9XG5cbnZhciBTY2VuZSA9IGZ1bmN0aW9uICgpIHtcbiAgZnVuY3Rpb24gU2NlbmUoJG1vZGVsTmFtZSwgJHN0YXRlSW1nLCAkc3RhdGVQYXJhbXMsICRldmVudCwgJHJlc3BvbnNlQm94LCAkdG9vbHNCb3gpIHtcbiAgICBfY2xhc3NDYWxsQ2hlY2sodGhpcywgU2NlbmUpO1xuXG4gICAgdGhpcy4kbW9kZWxOYW1lID0gJG1vZGVsTmFtZTtcbiAgICB0aGlzLiRzdGF0ZUltZyA9ICRzdGF0ZUltZztcbiAgICB0aGlzLiRzdGF0ZVBhcmFtcyA9ICRzdGF0ZVBhcmFtcztcbiAgICB0aGlzLiRldmVudCA9ICRldmVudDtcbiAgICB0aGlzLiRyZXNwb25zZUJveCA9ICRyZXNwb25zZUJveDtcbiAgICB0aGlzLiR0b29sc0JveCA9ICR0b29sc0JveDtcbiAgfVxuXG4gIF9jcmVhdGVDbGFzcyhTY2VuZSwgW3tcbiAgICBrZXk6ICdpbml0JyxcbiAgICB2YWx1ZTogZnVuY3Rpb24gaW5pdChtb2RlbCkge1xuICAgICAgdGhpcy5zZXRNb2RlbE5hbWUobW9kZWwubmFtZSkuc2V0U3RhdGUobW9kZWwuY3VycmVudFN0YXRlKTtcbiAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cblxuICAgIC8qKiBTZXQgYWN0dWFsIG5vZGUgY29udGVudCAqL1xuXG4gIH0sIHtcbiAgICBrZXk6ICdzZXRNb2RlbE5hbWUnLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBzZXRNb2RlbE5hbWUobmFtZSkge1xuICAgICAgdGhpcy4kbW9kZWxOYW1lLnRleHRDb250ZW50ID0gbmFtZTtcbiAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cblxuICAgIC8qKiBDcmVhdGVzIGlucHV0IGVsZW1lbnRzIGluICd0b29scycgYm94ICovXG5cbiAgfSwge1xuICAgIGtleTogJ2luaXRUb29scycsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIGluaXRUb29scyh0b29scykge1xuICAgICAgdmFyIF90aGlzID0gdGhpcztcblxuICAgICAgdmFyIHRvb2xzRnJhZ21lbnQgPSBkb2N1bWVudC5jcmVhdGVEb2N1bWVudEZyYWdtZW50KCk7XG5cbiAgICAgIHRvb2xzLmZvckVhY2goZnVuY3Rpb24gKHRvb2wpIHtcbiAgICAgICAgLy8gV3JhcCBldmVyeSB0b29sIGZvciBwcm9wZXIgZGlzcGxheSBhbmQgYWRkIGxhYmVsXG4gICAgICAgIHZhciBkaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgZGl2LmNsYXNzTGlzdC5hZGQoJ3Rvb2wnKTtcblxuICAgICAgICB2YXIgbGFiZWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdsYWJlbCcpO1xuICAgICAgICBsYWJlbC5zZXRBdHRyaWJ1dGUoJ2ZvcicsIHRvb2wubmFtZSk7XG4gICAgICAgIGxhYmVsLmNsYXNzTGlzdC5hZGQoJ3Rvb2wtbmFtZScpO1xuICAgICAgICBsYWJlbC50ZXh0Q29udGVudCA9IHRvb2wubmFtZTtcbiAgICAgICAgZGl2LmFwcGVuZENoaWxkKGxhYmVsKTtcblxuICAgICAgICB2YXIgdG9vbE5vZGUgPSBfdGhpcy5jcmVhdGVUb29sTm9kZSh0b29sKTtcbiAgICAgICAgZGl2LmFwcGVuZENoaWxkKHRvb2xOb2RlKTtcblxuICAgICAgICAvLyBBcHBlbmQgdG8gZnJhZ21lbnRcbiAgICAgICAgdG9vbHNGcmFnbWVudC5hcHBlbmRDaGlsZChkaXYpO1xuICAgICAgfSk7XG5cbiAgICAgIHRoaXMuJHRvb2xzQm94LmlubmVySFRNTCA9ICcnO1xuICAgICAgdGhpcy4kdG9vbHNCb3guYXBwZW5kQ2hpbGQodG9vbHNGcmFnbWVudCk7XG4gICAgICByZXR1cm4gdGhpcztcbiAgICB9XG4gIH0sIHtcbiAgICBrZXk6ICdjcmVhdGVUb29sTm9kZScsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIGNyZWF0ZVRvb2xOb2RlKHRvb2wpIHtcbiAgICAgIHN3aXRjaCAodG9vbC50eXBlKSB7XG4gICAgICAgIGNhc2UgJ3JhbmdlJzpcbiAgICAgICAgICByZXR1cm4gdGhpcy5jcmVhdGVSYW5nZVRvb2wodG9vbCk7XG4gICAgICAgIGNhc2UgJ3N3aXRjaCc6XG4gICAgICAgICAgcmV0dXJuIHRoaXMuY3JlYXRlU3dpdGNoVG9vbCh0b29sKTtcbiAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICByZXR1cm4gJ1Vua25vd24gdG9vbCB0eXBlJztcbiAgICAgIH1cbiAgICB9XG4gIH0sIHtcbiAgICBrZXk6ICdjcmVhdGVSYW5nZVRvb2wnLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBjcmVhdGVSYW5nZVRvb2wodG9vbCkge1xuICAgICAgdmFyIF90aGlzMiA9IHRoaXM7XG5cbiAgICAgIHZhciBkaXZJbnB1dCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgZGl2SW5wdXQuY2xhc3NMaXN0LmFkZCgncmFuZ2UnKTtcblxuICAgICAgdmFyIHNwYW5NaW4gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzcGFuJyk7XG4gICAgICBzcGFuTWluLnRleHRDb250ZW50ID0gdG9vbC5taW47XG4gICAgICBkaXZJbnB1dC5hcHBlbmRDaGlsZChzcGFuTWluKTtcblxuICAgICAgdmFyIGlucHV0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaW5wdXQnKTtcbiAgICAgIGlucHV0LnNldEF0dHJpYnV0ZSgnZGF0YS1pZCcsIHRvb2wuaWQpO1xuICAgICAgaW5wdXQuc2V0QXR0cmlidXRlKCdkYXRhLXR5cGUnLCAncmFuZ2UnKTtcbiAgICAgIGlucHV0LnNldEF0dHJpYnV0ZSgnbmFtZScsIHRvb2wubmFtZSk7XG4gICAgICBpbnB1dC5zZXRBdHRyaWJ1dGUoJ3R5cGUnLCAncmFuZ2UnKTtcbiAgICAgIGlucHV0LnNldEF0dHJpYnV0ZSgnbWluJywgdG9vbC5taW4pO1xuICAgICAgaW5wdXQuc2V0QXR0cmlidXRlKCdtYXgnLCB0b29sLm1heCk7XG4gICAgICBkaXZJbnB1dC5hcHBlbmRDaGlsZChpbnB1dCk7XG5cbiAgICAgIHZhciBzcGFuTWF4ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3BhbicpO1xuICAgICAgc3Bhbk1heC50ZXh0Q29udGVudCA9IHRvb2wubWF4O1xuICAgICAgZGl2SW5wdXQuYXBwZW5kQ2hpbGQoc3Bhbk1heCk7XG5cbiAgICAgIHZhciBkaXZDdXJyZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICBkaXZDdXJyZW50LmNsYXNzTGlzdC5hZGQoJ3JhbmdlLWN1cnJlbnQtdmFsdWUnKTtcbiAgICAgIHZhciBzcGFuQ3VycmVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NwYW4nKTtcbiAgICAgIHNwYW5DdXJyZW50LnRleHRDb250ZW50ID0gaW5wdXQudmFsdWU7XG4gICAgICBkaXZDdXJyZW50LmFwcGVuZENoaWxkKHNwYW5DdXJyZW50KTtcblxuICAgICAgaW5wdXQuYWRkRXZlbnRMaXN0ZW5lcignaW5wdXQnLCBmdW5jdGlvbiAoZXZ0KSB7XG4gICAgICAgIF90aGlzMi51cGRhdGVDdXJyZW50UmFuZ2VWYWx1ZShzcGFuQ3VycmVudCwgZXZ0LnRhcmdldC52YWx1ZSk7XG4gICAgICB9KTtcblxuICAgICAgdmFyIGZyYWdtZW50ID0gZG9jdW1lbnQuY3JlYXRlRG9jdW1lbnRGcmFnbWVudCgpO1xuICAgICAgZnJhZ21lbnQuYXBwZW5kQ2hpbGQoZGl2SW5wdXQpO1xuICAgICAgZnJhZ21lbnQuYXBwZW5kQ2hpbGQoZGl2Q3VycmVudCk7XG5cbiAgICAgIHJldHVybiBmcmFnbWVudDtcbiAgICB9XG4gIH0sIHtcbiAgICBrZXk6ICd1cGRhdGVDdXJyZW50UmFuZ2VWYWx1ZScsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIHVwZGF0ZUN1cnJlbnRSYW5nZVZhbHVlKG5vZGUsIHZhbHVlKSB7XG4gICAgICBub2RlLnRleHRDb250ZW50ID0gdmFsdWU7XG4gICAgfVxuICB9LCB7XG4gICAga2V5OiAnY3JlYXRlU3dpdGNoVG9vbCcsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIGNyZWF0ZVN3aXRjaFRvb2wodG9vbCkge1xuICAgICAgdmFyIGxhYmVsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnbGFiZWwnKTtcbiAgICAgIGxhYmVsLmNsYXNzTGlzdC5hZGQoJ3N3aXRjaCcpO1xuXG4gICAgICB2YXIgaW5wdXQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpbnB1dCcpO1xuICAgICAgaW5wdXQuc2V0QXR0cmlidXRlKCdkYXRhLWlkJywgdG9vbC5pZCk7XG4gICAgICBpbnB1dC5zZXRBdHRyaWJ1dGUoJ2RhdGEtdHlwZScsICdzd2l0Y2gnKTtcbiAgICAgIGlucHV0LnNldEF0dHJpYnV0ZSgndHlwZScsICdjaGVja2JveCcpO1xuICAgICAgbGFiZWwuYXBwZW5kQ2hpbGQoaW5wdXQpO1xuXG4gICAgICB2YXIgZGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICBkaXYuY2xhc3NMaXN0LmFkZCgnc2xpZGVyJyk7XG4gICAgICBsYWJlbC5hcHBlbmRDaGlsZChkaXYpO1xuXG4gICAgICByZXR1cm4gbGFiZWw7XG4gICAgfVxuXG4gICAgLyoqIFNldHMgaW1nIGFuZCBwYXJhbWV0ZXJzIG9mIGN1cnJlbnQgc3RhdGUgdG8gVUkgKi9cblxuICB9LCB7XG4gICAga2V5OiAnc2V0U3RhdGUnLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBzZXRTdGF0ZShfcmVmKSB7XG4gICAgICB2YXIgaW1nID0gX3JlZi5pbWcsXG4gICAgICAgICAgcGFyYW1zID0gX3JlZi5wYXJhbXM7XG5cbiAgICAgIC8vIEhpZGUgbGFzdCBldmVudCBkYXRhXG4gICAgICB0aGlzLmhpZGVFdmVudCgpO1xuXG4gICAgICAvLyBDaGFuZ2Ugc3RhdGUgaW1hZ2VcbiAgICAgIHRoaXMuJHN0YXRlSW1nLnNldEF0dHJpYnV0ZSgnc3JjJywgaW1nKTtcblxuICAgICAgLy8gU2V0IHN0YXRlIHBhcmFtZXRlcnNcbiAgICAgIHZhciBwYXJhbXNGcmFnbWVudCA9IGRvY3VtZW50LmNyZWF0ZURvY3VtZW50RnJhZ21lbnQoKTtcbiAgICAgIGZvciAodmFyIGtleSBpbiBwYXJhbXMpIHtcbiAgICAgICAgcGFyYW1zRnJhZ21lbnQuYXBwZW5kQ2hpbGQodGhpcy5jcmVhdGVQYXJhbWV0ZXJOb2RlKGtleSwgcGFyYW1zW2tleV0pKTtcbiAgICAgIH1cbiAgICAgIHRoaXMuJHN0YXRlUGFyYW1zLmlubmVySFRNTCA9ICcnO1xuICAgICAgdGhpcy4kc3RhdGVQYXJhbXMuYXBwZW5kQ2hpbGQocGFyYW1zRnJhZ21lbnQpO1xuXG4gICAgICByZXR1cm4gdGhpcztcbiAgICB9XG4gIH0sIHtcbiAgICBrZXk6ICdjcmVhdGVQYXJhbWV0ZXJOb2RlJyxcbiAgICB2YWx1ZTogZnVuY3Rpb24gY3JlYXRlUGFyYW1ldGVyTm9kZShrZXksIHZhbHVlKSB7XG4gICAgICB2YXIgZGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICBkaXYuY2xhc3NMaXN0LmFkZCgncGFyYW1ldGVyJyk7XG5cbiAgICAgIHZhciBrZXlTcGFuID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3BhbicpO1xuICAgICAga2V5U3Bhbi50ZXh0Q29udGVudCA9IGtleTtcbiAgICAgIGRpdi5hcHBlbmRDaGlsZChrZXlTcGFuKTtcblxuICAgICAgdmFyIHZhbHVlU3BhbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NwYW4nKTtcbiAgICAgIHZhbHVlU3Bhbi50ZXh0Q29udGVudCA9IHZhbHVlO1xuICAgICAgZGl2LmFwcGVuZENoaWxkKHZhbHVlU3Bhbik7XG5cbiAgICAgIHJldHVybiBkaXY7XG4gICAgfVxuXG4gICAgLyoqIFNldHMgZXZlbnQgZGF0YSB0byBVSSAqL1xuXG4gIH0sIHtcbiAgICBrZXk6ICdzZXRFdmVudCcsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIHNldEV2ZW50KGV2ZW50KSB7XG4gICAgICB0aGlzLiRldmVudC5xdWVyeVNlbGVjdG9yKCcubW9kZWwtZXZlbnQtbmFtZSBzcGFuJykudGV4dENvbnRlbnQgPSBldmVudC5uYW1lO1xuICAgICAgdGhpcy4kZXZlbnQucXVlcnlTZWxlY3RvcignLm1vZGVsLWV2ZW50LWluZm8nKS50ZXh0Q29udGVudCA9IGV2ZW50LmRlc2NyaXB0aW9uO1xuICAgICAgdGhpcy4kZXZlbnQuY2xhc3NMaXN0LnJlbW92ZSgnaXMtaGlkZGVuJyk7XG4gICAgfVxuICB9LCB7XG4gICAga2V5OiAnaGlkZUV2ZW50JyxcbiAgICB2YWx1ZTogZnVuY3Rpb24gaGlkZUV2ZW50KCkge1xuICAgICAgdGhpcy4kZXZlbnQuY2xhc3NMaXN0LmFkZCgnaXMtaGlkZGVuJyk7XG4gICAgfVxuXG4gICAgLyoqIEdldCBkYXRhIGZyb20gdG9vbCBub2RlcyAqL1xuXG4gIH0sIHtcbiAgICBrZXk6ICdnZXRUb29sc0RhdGEnLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBnZXRUb29sc0RhdGEoKSB7XG4gICAgICB2YXIgdG9vbHNEYXRhID0ge307XG4gICAgICB2YXIgaW5wdXRzID0gdGhpcy4kdG9vbHNCb3gucXVlcnlTZWxlY3RvckFsbCgnaW5wdXRbZGF0YS1pZF0nKTtcbiAgICAgIGlucHV0cy5mb3JFYWNoKGZ1bmN0aW9uIChpbnB1dCkge1xuICAgICAgICB2YXIgX2lucHV0JGRhdGFzZXQgPSBpbnB1dC5kYXRhc2V0LFxuICAgICAgICAgICAgaWQgPSBfaW5wdXQkZGF0YXNldC5pZCxcbiAgICAgICAgICAgIHR5cGUgPSBfaW5wdXQkZGF0YXNldC50eXBlO1xuXG4gICAgICAgIHZhciB2YWx1ZSA9IHZvaWQgMDtcbiAgICAgICAgc3dpdGNoICh0eXBlKSB7XG4gICAgICAgICAgY2FzZSAncmFuZ2UnOlxuICAgICAgICAgICAgdmFsdWUgPSBwYXJzZUludChpbnB1dC52YWx1ZSk7YnJlYWs7XG4gICAgICAgICAgY2FzZSAnc3dpdGNoJzpcbiAgICAgICAgICAgIHZhbHVlID0gaW5wdXQuY2hlY2tlZDticmVhaztcbiAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdJbnZhbGlkIHRvb2wgdHlwZScpO1xuICAgICAgICB9XG4gICAgICAgIHRvb2xzRGF0YVtpZF0gPSB2YWx1ZTtcbiAgICAgIH0pO1xuICAgICAgcmV0dXJuIHRvb2xzRGF0YTtcbiAgICB9XG4gIH1dKTtcblxuICByZXR1cm4gU2NlbmU7XG59KCk7XG5cbmV4cG9ydHMuZGVmYXVsdCA9IFNjZW5lO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbGVhcm5pbmcvc2NlbmUuanNcbi8vIG1vZHVsZSBpZCA9IDJcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiJ3VzZSBzdHJpY3QnO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgdmFsdWU6IHRydWVcbn0pO1xuZnVuY3Rpb24gYWpheCgpIHtcbiAgdmFyIHBhdGggPSBhcmd1bWVudHMubGVuZ3RoID4gMCAmJiBhcmd1bWVudHNbMF0gIT09IHVuZGVmaW5lZCA/IGFyZ3VtZW50c1swXSA6ICcnO1xuICB2YXIgb3B0aW9ucyA9IGFyZ3VtZW50cy5sZW5ndGggPiAxICYmIGFyZ3VtZW50c1sxXSAhPT0gdW5kZWZpbmVkID8gYXJndW1lbnRzWzFdIDoge307XG5cbiAgdmFyIHhociA9IG5ldyBYTUxIdHRwUmVxdWVzdCgpO1xuICB4aHIub3BlbihvcHRpb25zLm1ldGhvZCB8fCAnR0VUJywgcGF0aCwgdHJ1ZSk7XG4gIGlmIChvcHRpb25zLmhlYWRlcnMpIHtcbiAgICBzZXRYSFJIZWFkZXJzKHhociwgb3B0aW9ucy5oZWFkZXJzKTtcbiAgfVxuICB4aHIuc2VuZChvcHRpb25zLmRhdGEpO1xuXG4gIHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgeGhyLm9ucmVhZHlzdGF0ZWNoYW5nZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgIGlmICh4aHIucmVhZHlTdGF0ZSA9PSA0KSB7XG4gICAgICAgIGlmICh4aHIuc3RhdHVzID09IDIwMCkge1xuICAgICAgICAgIHJlc29sdmUoeGhyLnJlc3BvbnNlVGV4dCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgcmVqZWN0KHhoci5zdGF0dXNUZXh0KTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH07XG4gIH0pO1xufVxuXG5mdW5jdGlvbiBzZXRYSFJIZWFkZXJzKHhociwgaGVhZGVycykge1xuICBmb3IgKHZhciBoZWFkZXIgaW4gaGVhZGVycykge1xuICAgIHhoci5zZXRSZXF1ZXN0SGVhZGVyKGhlYWRlciwgaGVhZGVyc1toZWFkZXJzXSk7XG4gIH1cbn1cblxuZXhwb3J0cy5kZWZhdWx0ID0gYWpheDtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL3V0aWxzL2FqYXguanNcbi8vIG1vZHVsZSBpZCA9IDNcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiLy8gcmVtb3ZlZCBieSBleHRyYWN0LXRleHQtd2VicGFjay1wbHVnaW5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuLi9zYXNzL2xlYXJuaW5nLnNjc3Ncbi8vIG1vZHVsZSBpZCA9IDRcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiJ3VzZSBzdHJpY3QnO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgdmFsdWU6IHRydWVcbn0pO1xuXG52YXIgX2NyZWF0ZUNsYXNzID0gZnVuY3Rpb24gKCkgeyBmdW5jdGlvbiBkZWZpbmVQcm9wZXJ0aWVzKHRhcmdldCwgcHJvcHMpIHsgZm9yICh2YXIgaSA9IDA7IGkgPCBwcm9wcy5sZW5ndGg7IGkrKykgeyB2YXIgZGVzY3JpcHRvciA9IHByb3BzW2ldOyBkZXNjcmlwdG9yLmVudW1lcmFibGUgPSBkZXNjcmlwdG9yLmVudW1lcmFibGUgfHwgZmFsc2U7IGRlc2NyaXB0b3IuY29uZmlndXJhYmxlID0gdHJ1ZTsgaWYgKFwidmFsdWVcIiBpbiBkZXNjcmlwdG9yKSBkZXNjcmlwdG9yLndyaXRhYmxlID0gdHJ1ZTsgT2JqZWN0LmRlZmluZVByb3BlcnR5KHRhcmdldCwgZGVzY3JpcHRvci5rZXksIGRlc2NyaXB0b3IpOyB9IH0gcmV0dXJuIGZ1bmN0aW9uIChDb25zdHJ1Y3RvciwgcHJvdG9Qcm9wcywgc3RhdGljUHJvcHMpIHsgaWYgKHByb3RvUHJvcHMpIGRlZmluZVByb3BlcnRpZXMoQ29uc3RydWN0b3IucHJvdG90eXBlLCBwcm90b1Byb3BzKTsgaWYgKHN0YXRpY1Byb3BzKSBkZWZpbmVQcm9wZXJ0aWVzKENvbnN0cnVjdG9yLCBzdGF0aWNQcm9wcyk7IHJldHVybiBDb25zdHJ1Y3RvcjsgfTsgfSgpO1xuXG5mdW5jdGlvbiBfY2xhc3NDYWxsQ2hlY2soaW5zdGFuY2UsIENvbnN0cnVjdG9yKSB7IGlmICghKGluc3RhbmNlIGluc3RhbmNlb2YgQ29uc3RydWN0b3IpKSB7IHRocm93IG5ldyBUeXBlRXJyb3IoXCJDYW5ub3QgY2FsbCBhIGNsYXNzIGFzIGEgZnVuY3Rpb25cIik7IH0gfVxuXG52YXIgQWN0aW9uID0gZnVuY3Rpb24gKCkge1xuICBmdW5jdGlvbiBBY3Rpb24oZGF0YSkge1xuICAgIF9jbGFzc0NhbGxDaGVjayh0aGlzLCBBY3Rpb24pO1xuXG4gICAgdGhpcy50b29sSWQgPSBkYXRhLnRvb2w7XG4gICAgdGhpcy5taW5UaW1lID0gZGF0YS5taW5UaW1lO1xuICAgIHRoaXMubWF4VGltZSA9IGRhdGEubWF4VGltZTtcbiAgICB0aGlzLm5leHRTdGF0ZSA9IGRhdGEubmV4dFN0YXRlO1xuICAgIGlmIChkYXRhLmluYWN0aXZlKSB7XG4gICAgICB0aGlzLmluYWN0aXZlID0gdHJ1ZTtcbiAgICAgIHRoaXMudmFsdWUgPSBudWxsO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLmluYWN0aXZlID0gZmFsc2U7XG4gICAgICB0aGlzLnZhbHVlID0gZGF0YS52YWx1ZTtcbiAgICB9XG4gIH1cblxuICBfY3JlYXRlQ2xhc3MoQWN0aW9uLCBbe1xuICAgIGtleTogJ2lzU3VpdGFibGUnLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBpc1N1aXRhYmxlKGRhdGEsIHRpbWUpIHtcbiAgICAgIHJldHVybiB0aGlzLnJpZ2h0VGltZSh0aW1lKSAmJiB0aGlzLnJpZ2h0RGF0YShkYXRhKTtcbiAgICB9XG4gIH0sIHtcbiAgICBrZXk6ICdyaWdodERhdGEnLFxuICAgIHZhbHVlOiBmdW5jdGlvbiByaWdodERhdGEoZGF0YSkge1xuICAgICAgaWYgKHR5cGVvZiB0aGlzLnZhbHVlID09ICdib29sZWFuJyAmJiBkYXRhW3RoaXMudG9vbElkXSAmJiBkYXRhW3RoaXMudG9vbElkXSA9PSB0aGlzLnZhbHVlKSB7XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgfSBlbHNlIGlmIChBcnJheS5pc0FycmF5KHRoaXMudmFsdWUpICYmIGRhdGFbdGhpcy50b29sSWRdICYmIHRoaXMuaW5jbHVkZXNWYWx1ZShkYXRhW3RoaXMudG9vbElkXSkpIHtcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICB9XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICB9LCB7XG4gICAga2V5OiAnaW5jbHVkZXNWYWx1ZScsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIGluY2x1ZGVzVmFsdWUodmFsdWUsIGJvcmRlcnMpIHtcbiAgICAgIHJldHVybiB2YWx1ZSA+IHRoaXMudmFsdWVbMF0gJiYgdmFsdWUgPCB0aGlzLnZhbHVlWzFdO1xuICAgIH1cbiAgfSwge1xuICAgIGtleTogJ3JpZ2h0VGltZScsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIHJpZ2h0VGltZSh0aW1lKSB7XG4gICAgICByZXR1cm4gdGltZSA+IHRoaXMubWluVGltZSAmJiB0aW1lIDwgdGhpcy5tYXhUaW1lO1xuICAgIH1cbiAgfV0pO1xuXG4gIHJldHVybiBBY3Rpb247XG59KCk7XG5cbmV4cG9ydHMuZGVmYXVsdCA9IEFjdGlvbjtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL2xlYXJuaW5nL2NvbXBvbmVudHMvYWN0aW9uLmpzXG4vLyBtb2R1bGUgaWQgPSA1XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIid1c2Ugc3RyaWN0JztcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcblxudmFyIF9jcmVhdGVDbGFzcyA9IGZ1bmN0aW9uICgpIHsgZnVuY3Rpb24gZGVmaW5lUHJvcGVydGllcyh0YXJnZXQsIHByb3BzKSB7IGZvciAodmFyIGkgPSAwOyBpIDwgcHJvcHMubGVuZ3RoOyBpKyspIHsgdmFyIGRlc2NyaXB0b3IgPSBwcm9wc1tpXTsgZGVzY3JpcHRvci5lbnVtZXJhYmxlID0gZGVzY3JpcHRvci5lbnVtZXJhYmxlIHx8IGZhbHNlOyBkZXNjcmlwdG9yLmNvbmZpZ3VyYWJsZSA9IHRydWU7IGlmIChcInZhbHVlXCIgaW4gZGVzY3JpcHRvcikgZGVzY3JpcHRvci53cml0YWJsZSA9IHRydWU7IE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0YXJnZXQsIGRlc2NyaXB0b3Iua2V5LCBkZXNjcmlwdG9yKTsgfSB9IHJldHVybiBmdW5jdGlvbiAoQ29uc3RydWN0b3IsIHByb3RvUHJvcHMsIHN0YXRpY1Byb3BzKSB7IGlmIChwcm90b1Byb3BzKSBkZWZpbmVQcm9wZXJ0aWVzKENvbnN0cnVjdG9yLnByb3RvdHlwZSwgcHJvdG9Qcm9wcyk7IGlmIChzdGF0aWNQcm9wcykgZGVmaW5lUHJvcGVydGllcyhDb25zdHJ1Y3Rvciwgc3RhdGljUHJvcHMpOyByZXR1cm4gQ29uc3RydWN0b3I7IH07IH0oKTtcblxudmFyIF9hY3Rpb24gPSByZXF1aXJlKCcuL2FjdGlvbicpO1xuXG52YXIgX2FjdGlvbjIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9hY3Rpb24pO1xuXG5mdW5jdGlvbiBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KG9iaikgeyByZXR1cm4gb2JqICYmIG9iai5fX2VzTW9kdWxlID8gb2JqIDogeyBkZWZhdWx0OiBvYmogfTsgfVxuXG5mdW5jdGlvbiBfdG9Db25zdW1hYmxlQXJyYXkoYXJyKSB7IGlmIChBcnJheS5pc0FycmF5KGFycikpIHsgZm9yICh2YXIgaSA9IDAsIGFycjIgPSBBcnJheShhcnIubGVuZ3RoKTsgaSA8IGFyci5sZW5ndGg7IGkrKykgeyBhcnIyW2ldID0gYXJyW2ldOyB9IHJldHVybiBhcnIyOyB9IGVsc2UgeyByZXR1cm4gQXJyYXkuZnJvbShhcnIpOyB9IH1cblxuZnVuY3Rpb24gX2NsYXNzQ2FsbENoZWNrKGluc3RhbmNlLCBDb25zdHJ1Y3RvcikgeyBpZiAoIShpbnN0YW5jZSBpbnN0YW5jZW9mIENvbnN0cnVjdG9yKSkgeyB0aHJvdyBuZXcgVHlwZUVycm9yKFwiQ2Fubm90IGNhbGwgYSBjbGFzcyBhcyBhIGZ1bmN0aW9uXCIpOyB9IH1cblxudmFyIEV2ZW50ID0gZnVuY3Rpb24gKCkge1xuICBmdW5jdGlvbiBFdmVudChkYXRhKSB7XG4gICAgX2NsYXNzQ2FsbENoZWNrKHRoaXMsIEV2ZW50KTtcblxuICAgIHRoaXMuaWQgPSBkYXRhLmlkO1xuICAgIHRoaXMubmFtZSA9IGRhdGEubmFtZTtcbiAgICB0aGlzLmRlc2NyaXB0aW9uID0gZGF0YS5kZXNjcmlwdGlvbjtcbiAgICB0aGlzLmFjdGlvbnMgPSBkYXRhLmFjdGlvbnMubWFwKGZ1bmN0aW9uIChhY3Rpb24pIHtcbiAgICAgIHJldHVybiBuZXcgX2FjdGlvbjIuZGVmYXVsdChhY3Rpb24pO1xuICAgIH0pO1xuICB9XG5cbiAgX2NyZWF0ZUNsYXNzKEV2ZW50LCBbe1xuICAgIGtleTogJ2dldEluYWN0aXZlVGltZScsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIGdldEluYWN0aXZlVGltZSgpIHtcbiAgICAgIHZhciB0aW1lcyA9IHRoaXMuZ2V0QWxsQWN0aW9uVGltZXMoKTtcbiAgICAgIHJldHVybiBNYXRoLm1heC5hcHBseShNYXRoLCBfdG9Db25zdW1hYmxlQXJyYXkodGltZXMpKTtcbiAgICB9XG4gIH0sIHtcbiAgICBrZXk6ICdnZXRJbmFjdGl2ZUFjdGlvbicsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIGdldEluYWN0aXZlQWN0aW9uKCkge1xuICAgICAgcmV0dXJuIHRoaXMuYWN0aW9ucy5maW5kKGZ1bmN0aW9uIChhY3Rpb24pIHtcbiAgICAgICAgcmV0dXJuIGFjdGlvbi5pbmFjdGl2ZSA9PT0gdHJ1ZTtcbiAgICAgIH0pO1xuICAgIH1cbiAgfSwge1xuICAgIGtleTogJ2dldEFsbEFjdGlvblRpbWVzJyxcbiAgICB2YWx1ZTogZnVuY3Rpb24gZ2V0QWxsQWN0aW9uVGltZXMoKSB7XG4gICAgICByZXR1cm4gdGhpcy5hY3Rpb25zLm1hcChmdW5jdGlvbiAoYWN0aW9uKSB7XG4gICAgICAgIHJldHVybiBhY3Rpb24ubWF4VGltZSB8fCAwO1xuICAgICAgfSk7XG4gICAgfVxuICB9LCB7XG4gICAga2V5OiAnaGFuZGxlSW5wdXQnLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBoYW5kbGVJbnB1dChkYXRhLCB0aW1lKSB7XG4gICAgICB2YXIgc3VpdGVkQWN0aW9ucyA9IHRoaXMuYWN0aW9ucy5maWx0ZXIoZnVuY3Rpb24gKGFjdGlvbikge1xuICAgICAgICByZXR1cm4gYWN0aW9uLmlzU3VpdGFibGUoZGF0YSwgdGltZSk7XG4gICAgICB9KTtcbiAgICAgIGlmIChzdWl0ZWRBY3Rpb25zKSB7XG4gICAgICAgIHJldHVybiBzdWl0ZWRBY3Rpb25zWzBdLm5leHRTdGF0ZTtcbiAgICAgIH1cbiAgICB9XG4gIH1dKTtcblxuICByZXR1cm4gRXZlbnQ7XG59KCk7XG5cbmV4cG9ydHMuZGVmYXVsdCA9IEV2ZW50O1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbGVhcm5pbmcvY29tcG9uZW50cy9ldmVudC5qc1xuLy8gbW9kdWxlIGlkID0gNlxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCIndXNlIHN0cmljdCc7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuICB2YWx1ZTogdHJ1ZVxufSk7XG5cbnZhciBfZXZlbnQgPSByZXF1aXJlKCcuL2V2ZW50Jyk7XG5cbnZhciBfZXZlbnQyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfZXZlbnQpO1xuXG5mdW5jdGlvbiBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KG9iaikgeyByZXR1cm4gb2JqICYmIG9iai5fX2VzTW9kdWxlID8gb2JqIDogeyBkZWZhdWx0OiBvYmogfTsgfVxuXG5mdW5jdGlvbiBfY2xhc3NDYWxsQ2hlY2soaW5zdGFuY2UsIENvbnN0cnVjdG9yKSB7IGlmICghKGluc3RhbmNlIGluc3RhbmNlb2YgQ29uc3RydWN0b3IpKSB7IHRocm93IG5ldyBUeXBlRXJyb3IoXCJDYW5ub3QgY2FsbCBhIGNsYXNzIGFzIGEgZnVuY3Rpb25cIik7IH0gfVxuXG52YXIgU3RhdGUgPSBmdW5jdGlvbiBTdGF0ZShkYXRhKSB7XG4gIF9jbGFzc0NhbGxDaGVjayh0aGlzLCBTdGF0ZSk7XG5cbiAgdGhpcy5pZCA9IGRhdGEuaWQ7XG4gIHRoaXMubmFtZSA9IGRhdGEubmFtZTtcbiAgdGhpcy5pbWcgPSBkYXRhLmltZztcbiAgdGhpcy5wYXJhbXMgPSBkYXRhLnBhcmFtcztcblxuICBpZiAoZGF0YS5sYXN0KSB7XG4gICAgdGhpcy5sYXN0ID0gdHJ1ZTtcbiAgICB0aGlzLmV2ZW50ID0gbnVsbDtcbiAgfSBlbHNlIHtcbiAgICB0aGlzLmV2ZW50ID0gbmV3IF9ldmVudDIuZGVmYXVsdChkYXRhLmV2ZW50KTtcbiAgICB0aGlzLmxhc3QgPSBmYWxzZTtcbiAgfVxufTtcblxuZXhwb3J0cy5kZWZhdWx0ID0gU3RhdGU7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9sZWFybmluZy9jb21wb25lbnRzL3N0YXRlLmpzXG4vLyBtb2R1bGUgaWQgPSA3XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIid1c2Ugc3RyaWN0JztcblxucmVxdWlyZSgnLi4vc2Fzcy9sZWFybmluZy5zY3NzJyk7XG5cbnZhciBfcHVic3ViID0gcmVxdWlyZSgnLi91dGlscy9wdWJzdWInKTtcblxudmFyIF9wdWJzdWIyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfcHVic3ViKTtcblxudmFyIF9hamF4ID0gcmVxdWlyZSgnLi91dGlscy9hamF4Jyk7XG5cbnZhciBfYWpheDIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9hamF4KTtcblxudmFyIF9zY2VuZSA9IHJlcXVpcmUoJy4vbGVhcm5pbmcvc2NlbmUnKTtcblxudmFyIF9zY2VuZTIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9zY2VuZSk7XG5cbnZhciBfbW9kZWwgPSByZXF1aXJlKCcuL2xlYXJuaW5nL21vZGVsJyk7XG5cbnZhciBfbW9kZWwyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfbW9kZWwpO1xuXG5mdW5jdGlvbiBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KG9iaikgeyByZXR1cm4gb2JqICYmIG9iai5fX2VzTW9kdWxlID8gb2JqIDogeyBkZWZhdWx0OiBvYmogfTsgfVxuXG52YXIgc2NlbmUgPSBuZXcgX3NjZW5lMi5kZWZhdWx0KGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5tb2RlbC1uYW1lJyksIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5tb2RlbC1zdGF0ZS1pbWcnKSwgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLm1vZGVsLXBhcmFtcy12YWx1ZXMnKSwgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLm1vZGVsLWV2ZW50JyksIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5tb2RlbC1yZXNwb25zZScpLCBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcudG9vbHMtbGlzdCcpKTtcblxuLyoqXHJcbiAqIExvYWQgbW9kZWwgd2l0aCBnaXZlbiBpZFxyXG4gKi9cbmZ1bmN0aW9uIGxvYWRNb2RlbChpZCkge1xuICByZXR1cm4gKDAsIF9hamF4Mi5kZWZhdWx0KSgnL21vZGVscy8nICsgaWQpLnRoZW4oZnVuY3Rpb24gKHJlc3BvbnNlKSB7XG4gICAgcmV0dXJuIEpTT04ucGFyc2UocmVzcG9uc2UpO1xuICB9KTtcbn1cblxuZnVuY3Rpb24gdG9nZ2xlQ29udHJvbEJ1dHRvbnMoKSB7XG4gICRzdGFydEJ1dHRvbi5kaXNhYmxlZCA9ICEkc3RhcnRCdXR0b24uZGlzYWJsZWQ7XG4gICRzdG9wQnV0dG9uLmRpc2FibGVkID0gISRzdG9wQnV0dG9uLmRpc2FibGVkO1xuICAkcnVuQnV0dG9uLmRpc2FibGVkID0gISRydW5CdXR0b24uZGlzYWJsZWQ7XG59XG5cbmZ1bmN0aW9uIHNldENvbnRlbnREaXNwbGF5KGRpc3BsYXkpIHtcbiAgdmFyIGNvbnRlbnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuY29udGVudCcpO1xuICBjb250ZW50LnN0eWxlLmRpc3BsYXkgPSBkaXNwbGF5O1xufVxuXG4vKipcclxuICogVUkgYnV0dG9uJ3MgaGFuZGxlcnNcclxuICovXG52YXIgJGxvYWRCdXR0b24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjbG9hZC1tb2RlbC1idG4nKTtcbnZhciAkc2VsZWN0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNtb2RlbC1zZWxlY3RcIik7XG52YXIgbW9kZWwgPSB7fTtcbiRsb2FkQnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24gKCkge1xuICB2YXIgbW9kZWxJZCA9ICRzZWxlY3QudmFsdWU7XG4gIGxvYWRNb2RlbChtb2RlbElkKS50aGVuKGZ1bmN0aW9uIChyZXNwb25zZSkge1xuICAgIG1vZGVsID0gbmV3IF9tb2RlbDIuZGVmYXVsdChyZXNwb25zZSk7XG4gICAgc2NlbmUuaW5pdChtb2RlbCkuaW5pdFRvb2xzKHJlc3BvbnNlLnRvb2xzKTtcbiAgICB0b2dnbGVDb250cm9sQnV0dG9ucygpO1xuICAgIHNldENvbnRlbnREaXNwbGF5KCdmbGV4Jyk7XG4gIH0pLmNhdGNoKGZ1bmN0aW9uIChlcnIpIHtcbiAgICBjb25zb2xlLmVycm9yKGVycik7XG4gIH0pO1xufSk7XG5cbnZhciAkc3RhcnRCdXR0b24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjc3RhcnQtYnRuJyk7XG4kc3RhcnRCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbiAoKSB7XG4gIG1vZGVsLnN0YXJ0KCk7XG59KTtcblxudmFyICRzdG9wQnV0dG9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3N0b3AtYnRuJyk7XG4kc3RvcEJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZ1bmN0aW9uICgpIHtcbiAgbW9kZWwuc3RvcCgpOyAvLyBUT0RPXG59KTtcblxudmFyICRydW5CdXR0b24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjcnVuLWJ0bicpO1xuJHJ1bkJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZ1bmN0aW9uICgpIHtcbiAgdmFyIHRvb2xzRGF0YSA9IHNjZW5lLmdldFRvb2xzRGF0YSgpO1xuICBfcHVic3ViMi5kZWZhdWx0LnB1Ymxpc2goJ3VzZXJfaW5wdXQnLCB0b29sc0RhdGEpO1xufSk7XG5cbi8qKlxyXG4gKiBIYW5kbGUgY3VzdG9tIGV2ZW50cyBoZXJlICh1c2VyIGlucHV0LCBwcm9ncmFtbSBtZXNzYWdlcyBldGMuKVxyXG4gKi9cbl9wdWJzdWIyLmRlZmF1bHQuc3Vic2NyaWJlKCduZXdfc3RhdGUnLCBmdW5jdGlvbiAoc3RhdGUpIHtcbiAgcmV0dXJuIHNjZW5lLnNldFN0YXRlKHN0YXRlKTtcbn0pO1xuX3B1YnN1YjIuZGVmYXVsdC5zdWJzY3JpYmUoJ2V2ZW50JywgZnVuY3Rpb24gKGRhdGEpIHtcbiAgcmV0dXJuIHNjZW5lLnNldEV2ZW50KGRhdGEuZXZlbnQpO1xufSk7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9sZWFybmluZy5qc1xuLy8gbW9kdWxlIGlkID0gOFxuLy8gbW9kdWxlIGNodW5rcyA9IDAiXSwibWFwcGluZ3MiOiI7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7OztBQ2hFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7O0FDbENBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7OztBQzdIQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7O0FDeE9BO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7O0FDbkNBOzs7Ozs7O0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7QUN6REE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7O0FDakVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7QUMvQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Iiwic291cmNlUm9vdCI6IiJ9