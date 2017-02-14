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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGVhcm5pbmcuYnVuZGxlLmpzIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vL3dlYnBhY2svYm9vdHN0cmFwIDFkZjMzY2JjN2U2YmJiOGU4MTkyIiwid2VicGFjazovLy8uL3V0aWxzL3B1YnN1Yi5qcyIsIndlYnBhY2s6Ly8vLi9sZWFybmluZy9tb2RlbC5qcyIsIndlYnBhY2s6Ly8vLi9sZWFybmluZy9zY2VuZS5qcyIsIndlYnBhY2s6Ly8vLi91dGlscy9hamF4LmpzIiwid2VicGFjazovLy8uLi9zYXNzL2xlYXJuaW5nLnNjc3MiLCJ3ZWJwYWNrOi8vLy4vbGVhcm5pbmcvY29tcG9uZW50cy9hY3Rpb24uanMiLCJ3ZWJwYWNrOi8vLy4vbGVhcm5pbmcvY29tcG9uZW50cy9ldmVudC5qcyIsIndlYnBhY2s6Ly8vLi9sZWFybmluZy9jb21wb25lbnRzL3N0YXRlLmpzIiwid2VicGFjazovLy8uL2xlYXJuaW5nLmpzIl0sInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKVxuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuXG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBpZGVudGl0eSBmdW5jdGlvbiBmb3IgY2FsbGluZyBoYXJtb255IGltcG9ydHMgd2l0aCB0aGUgY29ycmVjdCBjb250ZXh0XG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmkgPSBmdW5jdGlvbih2YWx1ZSkgeyByZXR1cm4gdmFsdWU7IH07XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwge1xuIFx0XHRcdFx0Y29uZmlndXJhYmxlOiBmYWxzZSxcbiBcdFx0XHRcdGVudW1lcmFibGU6IHRydWUsXG4gXHRcdFx0XHRnZXQ6IGdldHRlclxuIFx0XHRcdH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IDgpO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIHdlYnBhY2svYm9vdHN0cmFwIDFkZjMzY2JjN2U2YmJiOGU4MTkyIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuICB2YWx1ZTogdHJ1ZVxufSk7XG52YXIgcHVic3ViID0gZnVuY3Rpb24gKCkge1xuXG4gIHZhciB0b3BpY3MgPSB7fTtcblxuICByZXR1cm4ge1xuICAgIHN1YnNjcmliZTogZnVuY3Rpb24gc3Vic2NyaWJlKHRvcGljLCBsaXN0ZW5lcikge1xuICAgICAgaWYgKCF0b3BpY3NbdG9waWNdKSB0b3BpY3NbdG9waWNdID0geyBxdWV1ZTogW10gfTtcblxuICAgICAgdmFyIGluZGV4ID0gdG9waWNzW3RvcGljXS5xdWV1ZS5wdXNoKGxpc3RlbmVyKSAtIDE7XG5cbiAgICAgIC8vIGZ1bmN0aW9uIHRvIGRlbGV0ZSB0b3BpY1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAgcmVtb3ZlOiBmdW5jdGlvbiByZW1vdmUoKSB7XG4gICAgICAgICAgZGVsZXRlIHRvcGljc1t0b3BpY10ucXVldWVbaW5kZXhdO1xuICAgICAgICB9XG4gICAgICB9O1xuICAgIH0sXG5cbiAgICBwdWJsaXNoOiBmdW5jdGlvbiBwdWJsaXNoKHRvcGljLCBpbmZvKSB7XG4gICAgICAvLyBubyB0aGVtZSBvciBubyBsaXN0ZW5lcnNcbiAgICAgIGlmICghdG9waWNzW3RvcGljXSB8fCAhdG9waWNzW3RvcGljXS5xdWV1ZS5sZW5ndGgpIHJldHVybjtcblxuICAgICAgdmFyIGl0ZW1zID0gdG9waWNzW3RvcGljXS5xdWV1ZTtcbiAgICAgIGl0ZW1zLmZvckVhY2goZnVuY3Rpb24gKGl0ZW0pIHtcbiAgICAgICAgaXRlbShpbmZvIHx8IHt9KTtcbiAgICAgIH0pO1xuICAgIH1cbiAgfTtcbn0oKTtcblxuZXhwb3J0cy5kZWZhdWx0ID0gcHVic3ViO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vdXRpbHMvcHVic3ViLmpzXG4vLyBtb2R1bGUgaWQgPSAwXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIid1c2Ugc3RyaWN0JztcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcblxudmFyIF9jcmVhdGVDbGFzcyA9IGZ1bmN0aW9uICgpIHsgZnVuY3Rpb24gZGVmaW5lUHJvcGVydGllcyh0YXJnZXQsIHByb3BzKSB7IGZvciAodmFyIGkgPSAwOyBpIDwgcHJvcHMubGVuZ3RoOyBpKyspIHsgdmFyIGRlc2NyaXB0b3IgPSBwcm9wc1tpXTsgZGVzY3JpcHRvci5lbnVtZXJhYmxlID0gZGVzY3JpcHRvci5lbnVtZXJhYmxlIHx8IGZhbHNlOyBkZXNjcmlwdG9yLmNvbmZpZ3VyYWJsZSA9IHRydWU7IGlmIChcInZhbHVlXCIgaW4gZGVzY3JpcHRvcikgZGVzY3JpcHRvci53cml0YWJsZSA9IHRydWU7IE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0YXJnZXQsIGRlc2NyaXB0b3Iua2V5LCBkZXNjcmlwdG9yKTsgfSB9IHJldHVybiBmdW5jdGlvbiAoQ29uc3RydWN0b3IsIHByb3RvUHJvcHMsIHN0YXRpY1Byb3BzKSB7IGlmIChwcm90b1Byb3BzKSBkZWZpbmVQcm9wZXJ0aWVzKENvbnN0cnVjdG9yLnByb3RvdHlwZSwgcHJvdG9Qcm9wcyk7IGlmIChzdGF0aWNQcm9wcykgZGVmaW5lUHJvcGVydGllcyhDb25zdHJ1Y3Rvciwgc3RhdGljUHJvcHMpOyByZXR1cm4gQ29uc3RydWN0b3I7IH07IH0oKTtcblxudmFyIF9zdGF0ZSA9IHJlcXVpcmUoJy4vY29tcG9uZW50cy9zdGF0ZScpO1xuXG52YXIgX3N0YXRlMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX3N0YXRlKTtcblxudmFyIF9wdWJzdWIgPSByZXF1aXJlKCcuLi91dGlscy9wdWJzdWInKTtcblxudmFyIF9wdWJzdWIyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfcHVic3ViKTtcblxuZnVuY3Rpb24gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChvYmopIHsgcmV0dXJuIG9iaiAmJiBvYmouX19lc01vZHVsZSA/IG9iaiA6IHsgZGVmYXVsdDogb2JqIH07IH1cblxuZnVuY3Rpb24gX2NsYXNzQ2FsbENoZWNrKGluc3RhbmNlLCBDb25zdHJ1Y3RvcikgeyBpZiAoIShpbnN0YW5jZSBpbnN0YW5jZW9mIENvbnN0cnVjdG9yKSkgeyB0aHJvdyBuZXcgVHlwZUVycm9yKFwiQ2Fubm90IGNhbGwgYSBjbGFzcyBhcyBhIGZ1bmN0aW9uXCIpOyB9IH1cblxudmFyIE1vZGVsID0gZnVuY3Rpb24gKCkge1xuICBmdW5jdGlvbiBNb2RlbChkYXRhKSB7XG4gICAgX2NsYXNzQ2FsbENoZWNrKHRoaXMsIE1vZGVsKTtcblxuICAgIHRoaXMuaWQgPSBkYXRhLmlkO1xuICAgIHRoaXMubmFtZSA9IGRhdGEubmFtZTtcbiAgICB0aGlzLmJyZWFrVGltZSA9IGRhdGEuYnJlYWtUaW1lO1xuICAgIHRoaXMuc3RlcHMgPSBkYXRhLnN0ZXBzO1xuXG4gICAgdGhpcy5zdGF0ZXMgPSBkYXRhLnN0YXRlcy5tYXAoZnVuY3Rpb24gKHN0YXRlKSB7XG4gICAgICByZXR1cm4gbmV3IF9zdGF0ZTIuZGVmYXVsdChzdGF0ZSk7XG4gICAgfSk7XG4gICAgdGhpcy5jdXJyZW50U3RhdGUgPSB0aGlzLmdldFN0YXRlKGRhdGEuaWQpO1xuXG4gICAgdGhpcy50aW1lb3V0ID0gbnVsbDtcbiAgICB0aGlzLnN1YnNjcmlidGlvbiA9IG51bGw7XG4gIH1cblxuICBfY3JlYXRlQ2xhc3MoTW9kZWwsIFt7XG4gICAga2V5OiAnZ2V0U3RhdGUnLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBnZXRTdGF0ZShpZCkge1xuICAgICAgcmV0dXJuIHRoaXMuc3RhdGVzLmZpbmQoZnVuY3Rpb24gKHN0YXRlKSB7XG4gICAgICAgIHJldHVybiBzdGF0ZS5pZCA9PSBpZDtcbiAgICAgIH0pO1xuICAgIH1cbiAgfSwge1xuICAgIGtleTogJ3N0YXJ0JyxcbiAgICB2YWx1ZTogZnVuY3Rpb24gc3RhcnQoKSB7XG4gICAgICB2YXIgX3RoaXMgPSB0aGlzO1xuXG4gICAgICB2YXIgaW50ZXJ2YWxzID0gUHJvbWlzZS5yZXNvbHZlKCk7IC8vIGluaXQgcHJvbWlzZSBjaGFpblxuICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCB0aGlzLnN0ZXBzOyBpKyspIHtcbiAgICAgICAgaW50ZXJ2YWxzID0gaW50ZXJ2YWxzLnRoZW4oZnVuY3Rpb24gKCkge1xuICAgICAgICAgIHJldHVybiBfdGhpcy5tYWtlQnJlYWsoKTtcbiAgICAgICAgfSkudGhlbihmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgcmV0dXJuIF90aGlzLmhhbmRsZUV2ZW50KCk7XG4gICAgICAgIH0pLnRoZW4oZnVuY3Rpb24gKHN0YXRlKSB7XG4gICAgICAgICAgX3RoaXMuaGFuZGxlTmV3U3RhdGUoc3RhdGUpO1xuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICAgIGludGVydmFscy5jYXRjaChmdW5jdGlvbiAoc3RhdGUpIHtcbiAgICAgICAgX3B1YnN1YjIuZGVmYXVsdC5wdWJsaXNoKCduZXdfc3RhdGUnLCBzdGF0ZSk7XG4gICAgICB9KTtcbiAgICB9XG4gIH0sIHtcbiAgICBrZXk6ICdtYWtlQnJlYWsnLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBtYWtlQnJlYWsoKSB7XG4gICAgICB2YXIgX3RoaXMyID0gdGhpcztcblxuICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcbiAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgcmVzb2x2ZSgpO1xuICAgICAgICB9LCBfdGhpczIuYnJlYWtUaW1lKTtcbiAgICAgIH0pO1xuICAgIH1cbiAgfSwge1xuICAgIGtleTogJ2hhbmRsZUV2ZW50JyxcbiAgICB2YWx1ZTogZnVuY3Rpb24gaGFuZGxlRXZlbnQoKSB7XG4gICAgICB2YXIgX3RoaXMzID0gdGhpcztcblxuICAgICAgdmFyIGV2ZW50ID0gdGhpcy5jdXJyZW50U3RhdGUuZXZlbnQ7XG4gICAgICB2YXIgZXZlbnRTdGFydFRpbWUgPSBEYXRlLm5vdygpO1xuICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcbiAgICAgICAgLy8gc2VuZCBkYXRhIGFib3V0IG5ldyBldmVudCB0byBvdGhlciBtb2R1bGVzXG4gICAgICAgIF9wdWJzdWIyLmRlZmF1bHQucHVibGlzaCgnZXZlbnQnLCB7IGV2ZW50OiBldmVudCB9KTtcblxuICAgICAgICAvLyBsaXN0ZW4gdG8gdXNlciBhY3Rpb25cbiAgICAgICAgLy8gYW5kIGlmIHVzZXIgaW5wdXQgY29ycmVjdCBnbyB0byBuZXh0IHN0YXRlXG4gICAgICAgIF90aGlzMy5zdWJzY3JpYnRpb24gPSBfcHVic3ViMi5kZWZhdWx0LnN1YnNjcmliZSgndXNlcl9pbnB1dCcsIGZ1bmN0aW9uIChkYXRhKSB7XG4gICAgICAgICAgdmFyIHRpbWVTcGVudCA9IERhdGUubm93KCkgLSBldmVudFN0YXJ0VGltZTtcbiAgICAgICAgICB2YXIgbmV4dFN0YXRlSWQgPSBldmVudC5oYW5kbGVJbnB1dChkYXRhLCB0aW1lU3BlbnQpO1xuICAgICAgICAgIHZhciBuZXh0U3RhdGUgPSBfdGhpczMuZ2V0U3RhdGUobmV4dFN0YXRlSWQpO1xuICAgICAgICAgIGlmIChuZXh0U3RhdGUpIHtcbiAgICAgICAgICAgIG5leHRTdGF0ZS5sYXN0ID8gcmVqZWN0KG5leHRTdGF0ZSkgOiByZXNvbHZlKG5leHRTdGF0ZSk7XG4gICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICAvLyBoYW5kbGUgaW5hY3RpdmVcbiAgICAgICAgdmFyIGluYWN0aXZlVGltZSA9IGV2ZW50LmdldEluYWN0aXZlVGltZSgpO1xuICAgICAgICBfdGhpczMudGltZW91dCA9IHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xuICAgICAgICAgIHZhciBuZXh0U3RhdGVJZCA9IGV2ZW50LmdldEluYWN0aXZlQWN0aW9uKCkubmV4dFN0YXRlO1xuICAgICAgICAgIHZhciBuZXh0U3RhdGUgPSBfdGhpczMuZ2V0U3RhdGUobmV4dFN0YXRlSWQpO1xuICAgICAgICAgIG5leHRTdGF0ZS5sYXN0ID8gcmVqZWN0KG5leHRTdGF0ZSkgOiByZXNvbHZlKG5leHRTdGF0ZSk7XG4gICAgICAgIH0sIGluYWN0aXZlVGltZSk7XG4gICAgICB9KTtcbiAgICB9XG4gIH0sIHtcbiAgICBrZXk6ICdoYW5kbGVOZXdTdGF0ZScsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIGhhbmRsZU5ld1N0YXRlKHN0YXRlKSB7XG4gICAgICB0aGlzLmN1cnJlbnRTdGF0ZSA9IHN0YXRlO1xuICAgICAgY2xlYXJUaW1lb3V0KHRoaXMudGltZW91dCk7XG4gICAgICB0aGlzLnN1YnNjcmlidGlvbi5yZW1vdmUoKTtcbiAgICAgIF9wdWJzdWIyLmRlZmF1bHQucHVibGlzaCgnbmV3X3N0YXRlJywgc3RhdGUpO1xuICAgIH1cblxuICAgIC8vIFRPRE9cblxuICB9LCB7XG4gICAga2V5OiAnc3RvcCcsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIHN0b3AoKSB7fVxuICB9XSk7XG5cbiAgcmV0dXJuIE1vZGVsO1xufSgpO1xuXG5leHBvcnRzLmRlZmF1bHQgPSBNb2RlbDtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL2xlYXJuaW5nL21vZGVsLmpzXG4vLyBtb2R1bGUgaWQgPSAxXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIid1c2Ugc3RyaWN0JztcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcblxudmFyIF9jcmVhdGVDbGFzcyA9IGZ1bmN0aW9uICgpIHsgZnVuY3Rpb24gZGVmaW5lUHJvcGVydGllcyh0YXJnZXQsIHByb3BzKSB7IGZvciAodmFyIGkgPSAwOyBpIDwgcHJvcHMubGVuZ3RoOyBpKyspIHsgdmFyIGRlc2NyaXB0b3IgPSBwcm9wc1tpXTsgZGVzY3JpcHRvci5lbnVtZXJhYmxlID0gZGVzY3JpcHRvci5lbnVtZXJhYmxlIHx8IGZhbHNlOyBkZXNjcmlwdG9yLmNvbmZpZ3VyYWJsZSA9IHRydWU7IGlmIChcInZhbHVlXCIgaW4gZGVzY3JpcHRvcikgZGVzY3JpcHRvci53cml0YWJsZSA9IHRydWU7IE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0YXJnZXQsIGRlc2NyaXB0b3Iua2V5LCBkZXNjcmlwdG9yKTsgfSB9IHJldHVybiBmdW5jdGlvbiAoQ29uc3RydWN0b3IsIHByb3RvUHJvcHMsIHN0YXRpY1Byb3BzKSB7IGlmIChwcm90b1Byb3BzKSBkZWZpbmVQcm9wZXJ0aWVzKENvbnN0cnVjdG9yLnByb3RvdHlwZSwgcHJvdG9Qcm9wcyk7IGlmIChzdGF0aWNQcm9wcykgZGVmaW5lUHJvcGVydGllcyhDb25zdHJ1Y3Rvciwgc3RhdGljUHJvcHMpOyByZXR1cm4gQ29uc3RydWN0b3I7IH07IH0oKTtcblxuZnVuY3Rpb24gX2NsYXNzQ2FsbENoZWNrKGluc3RhbmNlLCBDb25zdHJ1Y3RvcikgeyBpZiAoIShpbnN0YW5jZSBpbnN0YW5jZW9mIENvbnN0cnVjdG9yKSkgeyB0aHJvdyBuZXcgVHlwZUVycm9yKFwiQ2Fubm90IGNhbGwgYSBjbGFzcyBhcyBhIGZ1bmN0aW9uXCIpOyB9IH1cblxudmFyIFNjZW5lID0gZnVuY3Rpb24gKCkge1xuICBmdW5jdGlvbiBTY2VuZSgkbW9kZWxOYW1lLCAkc3RhdGVJbWcsICRzdGF0ZVBhcmFtcywgJGV2ZW50LCAkcmVzcG9uc2VCb3gsICR0b29sc0JveCkge1xuICAgIF9jbGFzc0NhbGxDaGVjayh0aGlzLCBTY2VuZSk7XG5cbiAgICB0aGlzLiRtb2RlbE5hbWUgPSAkbW9kZWxOYW1lO1xuICAgIHRoaXMuJHN0YXRlSW1nID0gJHN0YXRlSW1nO1xuICAgIHRoaXMuJHN0YXRlUGFyYW1zID0gJHN0YXRlUGFyYW1zO1xuICAgIHRoaXMuJGV2ZW50ID0gJGV2ZW50O1xuICAgIHRoaXMuJHJlc3BvbnNlQm94ID0gJHJlc3BvbnNlQm94O1xuICAgIHRoaXMuJHRvb2xzQm94ID0gJHRvb2xzQm94O1xuICB9XG5cbiAgX2NyZWF0ZUNsYXNzKFNjZW5lLCBbe1xuICAgIGtleTogJ2luaXQnLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBpbml0KG1vZGVsKSB7XG4gICAgICB0aGlzLnNldE1vZGVsTmFtZShtb2RlbC5uYW1lKS5zZXRTdGF0ZShtb2RlbC5jdXJyZW50U3RhdGUpO1xuICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuXG4gICAgLyoqIFNldCBhY3R1YWwgbm9kZSBjb250ZW50ICovXG5cbiAgfSwge1xuICAgIGtleTogJ3NldE1vZGVsTmFtZScsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIHNldE1vZGVsTmFtZShuYW1lKSB7XG4gICAgICB0aGlzLiRtb2RlbE5hbWUudGV4dENvbnRlbnQgPSBuYW1lO1xuICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuXG4gICAgLyoqIENyZWF0ZXMgaW5wdXQgZWxlbWVudHMgaW4gJ3Rvb2xzJyBib3ggKi9cblxuICB9LCB7XG4gICAga2V5OiAnaW5pdFRvb2xzJyxcbiAgICB2YWx1ZTogZnVuY3Rpb24gaW5pdFRvb2xzKHRvb2xzKSB7XG4gICAgICB2YXIgX3RoaXMgPSB0aGlzO1xuXG4gICAgICB2YXIgdG9vbHNGcmFnbWVudCA9IGRvY3VtZW50LmNyZWF0ZURvY3VtZW50RnJhZ21lbnQoKTtcblxuICAgICAgdG9vbHMuZm9yRWFjaChmdW5jdGlvbiAodG9vbCkge1xuICAgICAgICAvLyBXcmFwIGV2ZXJ5IHRvb2wgZm9yIHByb3BlciBkaXNwbGF5IGFuZCBhZGQgbGFiZWxcbiAgICAgICAgdmFyIGRpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICBkaXYuY2xhc3NMaXN0LmFkZCgndG9vbCcpO1xuXG4gICAgICAgIHZhciBsYWJlbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2xhYmVsJyk7XG4gICAgICAgIGxhYmVsLnNldEF0dHJpYnV0ZSgnZm9yJywgdG9vbC5uYW1lKTtcbiAgICAgICAgbGFiZWwuY2xhc3NMaXN0LmFkZCgndG9vbC1uYW1lJyk7XG4gICAgICAgIGxhYmVsLnRleHRDb250ZW50ID0gdG9vbC5uYW1lO1xuICAgICAgICBkaXYuYXBwZW5kQ2hpbGQobGFiZWwpO1xuXG4gICAgICAgIHZhciB0b29sTm9kZSA9IF90aGlzLmNyZWF0ZVRvb2xOb2RlKHRvb2wpO1xuICAgICAgICBkaXYuYXBwZW5kQ2hpbGQodG9vbE5vZGUpO1xuXG4gICAgICAgIC8vIEFwcGVuZCB0byBmcmFnbWVudFxuICAgICAgICB0b29sc0ZyYWdtZW50LmFwcGVuZENoaWxkKGRpdik7XG4gICAgICB9KTtcblxuICAgICAgdGhpcy4kdG9vbHNCb3guaW5uZXJIVE1MID0gJyc7XG4gICAgICB0aGlzLiR0b29sc0JveC5hcHBlbmRDaGlsZCh0b29sc0ZyYWdtZW50KTtcbiAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cbiAgfSwge1xuICAgIGtleTogJ2NyZWF0ZVRvb2xOb2RlJyxcbiAgICB2YWx1ZTogZnVuY3Rpb24gY3JlYXRlVG9vbE5vZGUodG9vbCkge1xuICAgICAgc3dpdGNoICh0b29sLnR5cGUpIHtcbiAgICAgICAgY2FzZSAncmFuZ2UnOlxuICAgICAgICAgIHJldHVybiB0aGlzLmNyZWF0ZVJhbmdlVG9vbCh0b29sKTtcbiAgICAgICAgY2FzZSAnc3dpdGNoJzpcbiAgICAgICAgICByZXR1cm4gdGhpcy5jcmVhdGVTd2l0Y2hUb29sKHRvb2wpO1xuICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgIHJldHVybiAnVW5rbm93biB0b29sIHR5cGUnO1xuICAgICAgfVxuICAgIH1cbiAgfSwge1xuICAgIGtleTogJ2NyZWF0ZVJhbmdlVG9vbCcsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIGNyZWF0ZVJhbmdlVG9vbCh0b29sKSB7XG4gICAgICB2YXIgX3RoaXMyID0gdGhpcztcblxuICAgICAgdmFyIGRpdklucHV0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICBkaXZJbnB1dC5jbGFzc0xpc3QuYWRkKCdyYW5nZScpO1xuXG4gICAgICB2YXIgc3Bhbk1pbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NwYW4nKTtcbiAgICAgIHNwYW5NaW4udGV4dENvbnRlbnQgPSB0b29sLm1pbjtcbiAgICAgIGRpdklucHV0LmFwcGVuZENoaWxkKHNwYW5NaW4pO1xuXG4gICAgICB2YXIgaW5wdXQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpbnB1dCcpO1xuICAgICAgaW5wdXQuc2V0QXR0cmlidXRlKCdkYXRhLWlkJywgdG9vbC5pZCk7XG4gICAgICBpbnB1dC5zZXRBdHRyaWJ1dGUoJ2RhdGEtdHlwZScsICdyYW5nZScpO1xuICAgICAgaW5wdXQuc2V0QXR0cmlidXRlKCduYW1lJywgdG9vbC5uYW1lKTtcbiAgICAgIGlucHV0LnNldEF0dHJpYnV0ZSgndHlwZScsICdyYW5nZScpO1xuICAgICAgaW5wdXQuc2V0QXR0cmlidXRlKCdtaW4nLCB0b29sLm1pbik7XG4gICAgICBpbnB1dC5zZXRBdHRyaWJ1dGUoJ21heCcsIHRvb2wubWF4KTtcbiAgICAgIGRpdklucHV0LmFwcGVuZENoaWxkKGlucHV0KTtcblxuICAgICAgdmFyIHNwYW5NYXggPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzcGFuJyk7XG4gICAgICBzcGFuTWF4LnRleHRDb250ZW50ID0gdG9vbC5tYXg7XG4gICAgICBkaXZJbnB1dC5hcHBlbmRDaGlsZChzcGFuTWF4KTtcblxuICAgICAgdmFyIGRpdkN1cnJlbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgIGRpdkN1cnJlbnQuY2xhc3NMaXN0LmFkZCgncmFuZ2UtY3VycmVudC12YWx1ZScpO1xuICAgICAgdmFyIHNwYW5DdXJyZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3BhbicpO1xuICAgICAgc3BhbkN1cnJlbnQudGV4dENvbnRlbnQgPSBpbnB1dC52YWx1ZTtcbiAgICAgIGRpdkN1cnJlbnQuYXBwZW5kQ2hpbGQoc3BhbkN1cnJlbnQpO1xuXG4gICAgICBpbnB1dC5hZGRFdmVudExpc3RlbmVyKCdpbnB1dCcsIGZ1bmN0aW9uIChldnQpIHtcbiAgICAgICAgX3RoaXMyLnVwZGF0ZUN1cnJlbnRSYW5nZVZhbHVlKHNwYW5DdXJyZW50LCBldnQudGFyZ2V0LnZhbHVlKTtcbiAgICAgIH0pO1xuXG4gICAgICB2YXIgZnJhZ21lbnQgPSBkb2N1bWVudC5jcmVhdGVEb2N1bWVudEZyYWdtZW50KCk7XG4gICAgICBmcmFnbWVudC5hcHBlbmRDaGlsZChkaXZJbnB1dCk7XG4gICAgICBmcmFnbWVudC5hcHBlbmRDaGlsZChkaXZDdXJyZW50KTtcblxuICAgICAgcmV0dXJuIGZyYWdtZW50O1xuICAgIH1cbiAgfSwge1xuICAgIGtleTogJ3VwZGF0ZUN1cnJlbnRSYW5nZVZhbHVlJyxcbiAgICB2YWx1ZTogZnVuY3Rpb24gdXBkYXRlQ3VycmVudFJhbmdlVmFsdWUobm9kZSwgdmFsdWUpIHtcbiAgICAgIG5vZGUudGV4dENvbnRlbnQgPSB2YWx1ZTtcbiAgICB9XG4gIH0sIHtcbiAgICBrZXk6ICdjcmVhdGVTd2l0Y2hUb29sJyxcbiAgICB2YWx1ZTogZnVuY3Rpb24gY3JlYXRlU3dpdGNoVG9vbCh0b29sKSB7XG4gICAgICB2YXIgbGFiZWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdsYWJlbCcpO1xuICAgICAgbGFiZWwuY2xhc3NMaXN0LmFkZCgnc3dpdGNoJyk7XG5cbiAgICAgIHZhciBpbnB1dCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2lucHV0Jyk7XG4gICAgICBpbnB1dC5zZXRBdHRyaWJ1dGUoJ2RhdGEtaWQnLCB0b29sLmlkKTtcbiAgICAgIGlucHV0LnNldEF0dHJpYnV0ZSgnZGF0YS10eXBlJywgJ3N3aXRjaCcpO1xuICAgICAgaW5wdXQuc2V0QXR0cmlidXRlKCd0eXBlJywgJ2NoZWNrYm94Jyk7XG4gICAgICBsYWJlbC5hcHBlbmRDaGlsZChpbnB1dCk7XG5cbiAgICAgIHZhciBkaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgIGRpdi5jbGFzc0xpc3QuYWRkKCdzbGlkZXInKTtcbiAgICAgIGxhYmVsLmFwcGVuZENoaWxkKGRpdik7XG5cbiAgICAgIHJldHVybiBsYWJlbDtcbiAgICB9XG5cbiAgICAvKiogU2V0cyBpbWcgYW5kIHBhcmFtZXRlcnMgb2YgY3VycmVudCBzdGF0ZSB0byBVSSAqL1xuXG4gIH0sIHtcbiAgICBrZXk6ICdzZXRTdGF0ZScsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIHNldFN0YXRlKF9yZWYpIHtcbiAgICAgIHZhciBpbWcgPSBfcmVmLmltZyxcbiAgICAgICAgICBwYXJhbXMgPSBfcmVmLnBhcmFtcztcblxuICAgICAgLy8gQ2hhbmdlIHN0YXRlIGltYWdlXG4gICAgICB0aGlzLiRzdGF0ZUltZy5zZXRBdHRyaWJ1dGUoJ3NyYycsIGltZyk7XG5cbiAgICAgIC8vIFNldCBzdGF0ZSBwYXJhbWV0ZXJzXG4gICAgICB2YXIgcGFyYW1zRnJhZ21lbnQgPSBkb2N1bWVudC5jcmVhdGVEb2N1bWVudEZyYWdtZW50KCk7XG4gICAgICBmb3IgKHZhciBrZXkgaW4gcGFyYW1zKSB7XG4gICAgICAgIHBhcmFtc0ZyYWdtZW50LmFwcGVuZENoaWxkKHRoaXMuY3JlYXRlUGFyYW1ldGVyTm9kZShrZXksIHBhcmFtc1trZXldKSk7XG4gICAgICB9XG4gICAgICB0aGlzLiRzdGF0ZVBhcmFtcy5pbm5lckhUTUwgPSAnJztcbiAgICAgIHRoaXMuJHN0YXRlUGFyYW1zLmFwcGVuZENoaWxkKHBhcmFtc0ZyYWdtZW50KTtcblxuICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuICB9LCB7XG4gICAga2V5OiAnY3JlYXRlUGFyYW1ldGVyTm9kZScsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIGNyZWF0ZVBhcmFtZXRlck5vZGUoa2V5LCB2YWx1ZSkge1xuICAgICAgdmFyIGRpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgZGl2LmNsYXNzTGlzdC5hZGQoJ3BhcmFtZXRlcicpO1xuXG4gICAgICB2YXIga2V5U3BhbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NwYW4nKTtcbiAgICAgIGtleVNwYW4udGV4dENvbnRlbnQgPSBrZXk7XG4gICAgICBkaXYuYXBwZW5kQ2hpbGQoa2V5U3Bhbik7XG5cbiAgICAgIHZhciB2YWx1ZVNwYW4gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzcGFuJyk7XG4gICAgICB2YWx1ZVNwYW4udGV4dENvbnRlbnQgPSB2YWx1ZTtcbiAgICAgIGRpdi5hcHBlbmRDaGlsZCh2YWx1ZVNwYW4pO1xuXG4gICAgICByZXR1cm4gZGl2O1xuICAgIH1cblxuICAgIC8qKiBTZXRzIGV2ZW50IGRhdGEgdG8gVUkgKi9cblxuICB9LCB7XG4gICAga2V5OiAnc2V0RXZlbnQnLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBzZXRFdmVudChldmVudCkge1xuICAgICAgdGhpcy4kZXZlbnQudGV4dENvbnRlbnQgPSBldmVudC5uYW1lO1xuICAgIH1cblxuICAgIC8qKiBHZXQgZGF0YSBmcm9tIHRvb2wgbm9kZXMgKi9cblxuICB9LCB7XG4gICAga2V5OiAnZ2V0VG9vbHNEYXRhJyxcbiAgICB2YWx1ZTogZnVuY3Rpb24gZ2V0VG9vbHNEYXRhKCkge1xuICAgICAgdmFyIHRvb2xzRGF0YSA9IHt9O1xuICAgICAgdmFyIGlucHV0cyA9IHRoaXMuJHRvb2xzQm94LnF1ZXJ5U2VsZWN0b3JBbGwoJ2lucHV0W2RhdGEtaWRdJyk7XG4gICAgICBpbnB1dHMuZm9yRWFjaChmdW5jdGlvbiAoaW5wdXQpIHtcbiAgICAgICAgdmFyIF9pbnB1dCRkYXRhc2V0ID0gaW5wdXQuZGF0YXNldCxcbiAgICAgICAgICAgIGlkID0gX2lucHV0JGRhdGFzZXQuaWQsXG4gICAgICAgICAgICB0eXBlID0gX2lucHV0JGRhdGFzZXQudHlwZTtcblxuICAgICAgICB2YXIgdmFsdWUgPSB2b2lkIDA7XG4gICAgICAgIHN3aXRjaCAodHlwZSkge1xuICAgICAgICAgIGNhc2UgJ3JhbmdlJzpcbiAgICAgICAgICAgIHZhbHVlID0gcGFyc2VJbnQoaW5wdXQudmFsdWUpO2JyZWFrO1xuICAgICAgICAgIGNhc2UgJ3N3aXRjaCc6XG4gICAgICAgICAgICB2YWx1ZSA9IGlucHV0LmNoZWNrZWQ7YnJlYWs7XG4gICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignSW52YWxpZCB0b29sIHR5cGUnKTtcbiAgICAgICAgfVxuICAgICAgICB0b29sc0RhdGFbaWRdID0gdmFsdWU7XG4gICAgICB9KTtcbiAgICAgIHJldHVybiB0b29sc0RhdGE7XG4gICAgfVxuICB9XSk7XG5cbiAgcmV0dXJuIFNjZW5lO1xufSgpO1xuXG5leHBvcnRzLmRlZmF1bHQgPSBTY2VuZTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL2xlYXJuaW5nL3NjZW5lLmpzXG4vLyBtb2R1bGUgaWQgPSAyXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIid1c2Ugc3RyaWN0JztcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcbmZ1bmN0aW9uIGFqYXgoKSB7XG4gIHZhciBwYXRoID0gYXJndW1lbnRzLmxlbmd0aCA+IDAgJiYgYXJndW1lbnRzWzBdICE9PSB1bmRlZmluZWQgPyBhcmd1bWVudHNbMF0gOiAnJztcbiAgdmFyIG9wdGlvbnMgPSBhcmd1bWVudHMubGVuZ3RoID4gMSAmJiBhcmd1bWVudHNbMV0gIT09IHVuZGVmaW5lZCA/IGFyZ3VtZW50c1sxXSA6IHt9O1xuXG4gIHZhciB4aHIgPSBuZXcgWE1MSHR0cFJlcXVlc3QoKTtcbiAgeGhyLm9wZW4ob3B0aW9ucy5tZXRob2QgfHwgJ0dFVCcsIHBhdGgsIHRydWUpO1xuICBpZiAob3B0aW9ucy5oZWFkZXJzKSB7XG4gICAgc2V0WEhSSGVhZGVycyh4aHIsIG9wdGlvbnMuaGVhZGVycyk7XG4gIH1cbiAgeGhyLnNlbmQob3B0aW9ucy5kYXRhKTtcblxuICByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xuICAgIHhoci5vbnJlYWR5c3RhdGVjaGFuZ2UgPSBmdW5jdGlvbiAoKSB7XG4gICAgICBpZiAoeGhyLnJlYWR5U3RhdGUgPT0gNCkge1xuICAgICAgICBpZiAoeGhyLnN0YXR1cyA9PSAyMDApIHtcbiAgICAgICAgICByZXNvbHZlKHhoci5yZXNwb25zZVRleHQpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHJlamVjdCh4aHIuc3RhdHVzVGV4dCk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9O1xuICB9KTtcbn1cblxuZnVuY3Rpb24gc2V0WEhSSGVhZGVycyh4aHIsIGhlYWRlcnMpIHtcbiAgZm9yICh2YXIgaGVhZGVyIGluIGhlYWRlcnMpIHtcbiAgICB4aHIuc2V0UmVxdWVzdEhlYWRlcihoZWFkZXIsIGhlYWRlcnNbaGVhZGVyc10pO1xuICB9XG59XG5cbmV4cG9ydHMuZGVmYXVsdCA9IGFqYXg7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi91dGlscy9hamF4LmpzXG4vLyBtb2R1bGUgaWQgPSAzXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIi8vIHJlbW92ZWQgYnkgZXh0cmFjdC10ZXh0LXdlYnBhY2stcGx1Z2luXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi4vc2Fzcy9sZWFybmluZy5zY3NzXG4vLyBtb2R1bGUgaWQgPSA0XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIid1c2Ugc3RyaWN0JztcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcblxudmFyIF9jcmVhdGVDbGFzcyA9IGZ1bmN0aW9uICgpIHsgZnVuY3Rpb24gZGVmaW5lUHJvcGVydGllcyh0YXJnZXQsIHByb3BzKSB7IGZvciAodmFyIGkgPSAwOyBpIDwgcHJvcHMubGVuZ3RoOyBpKyspIHsgdmFyIGRlc2NyaXB0b3IgPSBwcm9wc1tpXTsgZGVzY3JpcHRvci5lbnVtZXJhYmxlID0gZGVzY3JpcHRvci5lbnVtZXJhYmxlIHx8IGZhbHNlOyBkZXNjcmlwdG9yLmNvbmZpZ3VyYWJsZSA9IHRydWU7IGlmIChcInZhbHVlXCIgaW4gZGVzY3JpcHRvcikgZGVzY3JpcHRvci53cml0YWJsZSA9IHRydWU7IE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0YXJnZXQsIGRlc2NyaXB0b3Iua2V5LCBkZXNjcmlwdG9yKTsgfSB9IHJldHVybiBmdW5jdGlvbiAoQ29uc3RydWN0b3IsIHByb3RvUHJvcHMsIHN0YXRpY1Byb3BzKSB7IGlmIChwcm90b1Byb3BzKSBkZWZpbmVQcm9wZXJ0aWVzKENvbnN0cnVjdG9yLnByb3RvdHlwZSwgcHJvdG9Qcm9wcyk7IGlmIChzdGF0aWNQcm9wcykgZGVmaW5lUHJvcGVydGllcyhDb25zdHJ1Y3Rvciwgc3RhdGljUHJvcHMpOyByZXR1cm4gQ29uc3RydWN0b3I7IH07IH0oKTtcblxuZnVuY3Rpb24gX2NsYXNzQ2FsbENoZWNrKGluc3RhbmNlLCBDb25zdHJ1Y3RvcikgeyBpZiAoIShpbnN0YW5jZSBpbnN0YW5jZW9mIENvbnN0cnVjdG9yKSkgeyB0aHJvdyBuZXcgVHlwZUVycm9yKFwiQ2Fubm90IGNhbGwgYSBjbGFzcyBhcyBhIGZ1bmN0aW9uXCIpOyB9IH1cblxudmFyIEFjdGlvbiA9IGZ1bmN0aW9uICgpIHtcbiAgZnVuY3Rpb24gQWN0aW9uKGRhdGEpIHtcbiAgICBfY2xhc3NDYWxsQ2hlY2sodGhpcywgQWN0aW9uKTtcblxuICAgIHRoaXMudG9vbElkID0gZGF0YS50b29sO1xuICAgIHRoaXMubWluVGltZSA9IGRhdGEubWluVGltZTtcbiAgICB0aGlzLm1heFRpbWUgPSBkYXRhLm1heFRpbWU7XG4gICAgdGhpcy5uZXh0U3RhdGUgPSBkYXRhLm5leHRTdGF0ZTtcbiAgICBpZiAoZGF0YS5pbmFjdGl2ZSkge1xuICAgICAgdGhpcy5pbmFjdGl2ZSA9IHRydWU7XG4gICAgICB0aGlzLnZhbHVlID0gbnVsbDtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5pbmFjdGl2ZSA9IGZhbHNlO1xuICAgICAgdGhpcy52YWx1ZSA9IGRhdGEudmFsdWU7XG4gICAgfVxuICB9XG5cbiAgX2NyZWF0ZUNsYXNzKEFjdGlvbiwgW3tcbiAgICBrZXk6ICdpc1N1aXRhYmxlJyxcbiAgICB2YWx1ZTogZnVuY3Rpb24gaXNTdWl0YWJsZShkYXRhLCB0aW1lKSB7XG4gICAgICByZXR1cm4gdGhpcy5yaWdodFRpbWUodGltZSkgJiYgdGhpcy5yaWdodERhdGEoZGF0YSk7XG4gICAgfVxuICB9LCB7XG4gICAga2V5OiAncmlnaHREYXRhJyxcbiAgICB2YWx1ZTogZnVuY3Rpb24gcmlnaHREYXRhKGRhdGEpIHtcbiAgICAgIGlmICh0eXBlb2YgdGhpcy52YWx1ZSA9PSAnYm9vbGVhbicgJiYgZGF0YVt0aGlzLnRvb2xJZF0gJiYgZGF0YVt0aGlzLnRvb2xJZF0gPT0gdGhpcy52YWx1ZSkge1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgIH0gZWxzZSBpZiAoQXJyYXkuaXNBcnJheSh0aGlzLnZhbHVlKSAmJiBkYXRhW3RoaXMudG9vbElkXSAmJiB0aGlzLmluY2x1ZGVzVmFsdWUoZGF0YVt0aGlzLnRvb2xJZF0pKSB7XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgfVxuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgfSwge1xuICAgIGtleTogJ2luY2x1ZGVzVmFsdWUnLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBpbmNsdWRlc1ZhbHVlKHZhbHVlLCBib3JkZXJzKSB7XG4gICAgICByZXR1cm4gdmFsdWUgPiB0aGlzLnZhbHVlWzBdICYmIHZhbHVlIDwgdGhpcy52YWx1ZVsxXTtcbiAgICB9XG4gIH0sIHtcbiAgICBrZXk6ICdyaWdodFRpbWUnLFxuICAgIHZhbHVlOiBmdW5jdGlvbiByaWdodFRpbWUodGltZSkge1xuICAgICAgcmV0dXJuIHRpbWUgPiB0aGlzLm1pblRpbWUgJiYgdGltZSA8IHRoaXMubWF4VGltZTtcbiAgICB9XG4gIH1dKTtcblxuICByZXR1cm4gQWN0aW9uO1xufSgpO1xuXG5leHBvcnRzLmRlZmF1bHQgPSBBY3Rpb247XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9sZWFybmluZy9jb21wb25lbnRzL2FjdGlvbi5qc1xuLy8gbW9kdWxlIGlkID0gNVxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCIndXNlIHN0cmljdCc7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuICB2YWx1ZTogdHJ1ZVxufSk7XG5cbnZhciBfY3JlYXRlQ2xhc3MgPSBmdW5jdGlvbiAoKSB7IGZ1bmN0aW9uIGRlZmluZVByb3BlcnRpZXModGFyZ2V0LCBwcm9wcykgeyBmb3IgKHZhciBpID0gMDsgaSA8IHByb3BzLmxlbmd0aDsgaSsrKSB7IHZhciBkZXNjcmlwdG9yID0gcHJvcHNbaV07IGRlc2NyaXB0b3IuZW51bWVyYWJsZSA9IGRlc2NyaXB0b3IuZW51bWVyYWJsZSB8fCBmYWxzZTsgZGVzY3JpcHRvci5jb25maWd1cmFibGUgPSB0cnVlOyBpZiAoXCJ2YWx1ZVwiIGluIGRlc2NyaXB0b3IpIGRlc2NyaXB0b3Iud3JpdGFibGUgPSB0cnVlOyBPYmplY3QuZGVmaW5lUHJvcGVydHkodGFyZ2V0LCBkZXNjcmlwdG9yLmtleSwgZGVzY3JpcHRvcik7IH0gfSByZXR1cm4gZnVuY3Rpb24gKENvbnN0cnVjdG9yLCBwcm90b1Byb3BzLCBzdGF0aWNQcm9wcykgeyBpZiAocHJvdG9Qcm9wcykgZGVmaW5lUHJvcGVydGllcyhDb25zdHJ1Y3Rvci5wcm90b3R5cGUsIHByb3RvUHJvcHMpOyBpZiAoc3RhdGljUHJvcHMpIGRlZmluZVByb3BlcnRpZXMoQ29uc3RydWN0b3IsIHN0YXRpY1Byb3BzKTsgcmV0dXJuIENvbnN0cnVjdG9yOyB9OyB9KCk7XG5cbnZhciBfYWN0aW9uID0gcmVxdWlyZSgnLi9hY3Rpb24nKTtcblxudmFyIF9hY3Rpb24yID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfYWN0aW9uKTtcblxuZnVuY3Rpb24gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChvYmopIHsgcmV0dXJuIG9iaiAmJiBvYmouX19lc01vZHVsZSA/IG9iaiA6IHsgZGVmYXVsdDogb2JqIH07IH1cblxuZnVuY3Rpb24gX3RvQ29uc3VtYWJsZUFycmF5KGFycikgeyBpZiAoQXJyYXkuaXNBcnJheShhcnIpKSB7IGZvciAodmFyIGkgPSAwLCBhcnIyID0gQXJyYXkoYXJyLmxlbmd0aCk7IGkgPCBhcnIubGVuZ3RoOyBpKyspIHsgYXJyMltpXSA9IGFycltpXTsgfSByZXR1cm4gYXJyMjsgfSBlbHNlIHsgcmV0dXJuIEFycmF5LmZyb20oYXJyKTsgfSB9XG5cbmZ1bmN0aW9uIF9jbGFzc0NhbGxDaGVjayhpbnN0YW5jZSwgQ29uc3RydWN0b3IpIHsgaWYgKCEoaW5zdGFuY2UgaW5zdGFuY2VvZiBDb25zdHJ1Y3RvcikpIHsgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkNhbm5vdCBjYWxsIGEgY2xhc3MgYXMgYSBmdW5jdGlvblwiKTsgfSB9XG5cbnZhciBFdmVudCA9IGZ1bmN0aW9uICgpIHtcbiAgZnVuY3Rpb24gRXZlbnQoZGF0YSkge1xuICAgIF9jbGFzc0NhbGxDaGVjayh0aGlzLCBFdmVudCk7XG5cbiAgICB0aGlzLmlkID0gZGF0YS5pZDtcbiAgICB0aGlzLm5hbWUgPSBkYXRhLm5hbWU7XG4gICAgdGhpcy5kZXNjcmlwdGlvbiA9IGRhdGEuZGVzY3JpcHRpb247XG4gICAgdGhpcy5hY3Rpb25zID0gZGF0YS5hY3Rpb25zLm1hcChmdW5jdGlvbiAoYWN0aW9uKSB7XG4gICAgICByZXR1cm4gbmV3IF9hY3Rpb24yLmRlZmF1bHQoYWN0aW9uKTtcbiAgICB9KTtcbiAgfVxuXG4gIF9jcmVhdGVDbGFzcyhFdmVudCwgW3tcbiAgICBrZXk6ICdnZXRJbmFjdGl2ZVRpbWUnLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBnZXRJbmFjdGl2ZVRpbWUoKSB7XG4gICAgICB2YXIgdGltZXMgPSB0aGlzLmdldEFsbEFjdGlvblRpbWVzKCk7XG4gICAgICByZXR1cm4gTWF0aC5tYXguYXBwbHkoTWF0aCwgX3RvQ29uc3VtYWJsZUFycmF5KHRpbWVzKSk7XG4gICAgfVxuICB9LCB7XG4gICAga2V5OiAnZ2V0SW5hY3RpdmVBY3Rpb24nLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBnZXRJbmFjdGl2ZUFjdGlvbigpIHtcbiAgICAgIHJldHVybiB0aGlzLmFjdGlvbnMuZmluZChmdW5jdGlvbiAoYWN0aW9uKSB7XG4gICAgICAgIHJldHVybiBhY3Rpb24uaW5hY3RpdmUgPT09IHRydWU7XG4gICAgICB9KTtcbiAgICB9XG4gIH0sIHtcbiAgICBrZXk6ICdnZXRBbGxBY3Rpb25UaW1lcycsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIGdldEFsbEFjdGlvblRpbWVzKCkge1xuICAgICAgcmV0dXJuIHRoaXMuYWN0aW9ucy5tYXAoZnVuY3Rpb24gKGFjdGlvbikge1xuICAgICAgICByZXR1cm4gYWN0aW9uLm1heFRpbWUgfHwgMDtcbiAgICAgIH0pO1xuICAgIH1cbiAgfSwge1xuICAgIGtleTogJ2hhbmRsZUlucHV0JyxcbiAgICB2YWx1ZTogZnVuY3Rpb24gaGFuZGxlSW5wdXQoZGF0YSwgdGltZSkge1xuICAgICAgdmFyIHN1aXRlZEFjdGlvbnMgPSB0aGlzLmFjdGlvbnMuZmlsdGVyKGZ1bmN0aW9uIChhY3Rpb24pIHtcbiAgICAgICAgcmV0dXJuIGFjdGlvbi5pc1N1aXRhYmxlKGRhdGEsIHRpbWUpO1xuICAgICAgfSk7XG4gICAgICBpZiAoc3VpdGVkQWN0aW9ucykge1xuICAgICAgICByZXR1cm4gc3VpdGVkQWN0aW9uc1swXS5uZXh0U3RhdGU7XG4gICAgICB9XG4gICAgfVxuICB9XSk7XG5cbiAgcmV0dXJuIEV2ZW50O1xufSgpO1xuXG5leHBvcnRzLmRlZmF1bHQgPSBFdmVudDtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL2xlYXJuaW5nL2NvbXBvbmVudHMvZXZlbnQuanNcbi8vIG1vZHVsZSBpZCA9IDZcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiJ3VzZSBzdHJpY3QnO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgdmFsdWU6IHRydWVcbn0pO1xuXG52YXIgX2V2ZW50ID0gcmVxdWlyZSgnLi9ldmVudCcpO1xuXG52YXIgX2V2ZW50MiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX2V2ZW50KTtcblxuZnVuY3Rpb24gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChvYmopIHsgcmV0dXJuIG9iaiAmJiBvYmouX19lc01vZHVsZSA/IG9iaiA6IHsgZGVmYXVsdDogb2JqIH07IH1cblxuZnVuY3Rpb24gX2NsYXNzQ2FsbENoZWNrKGluc3RhbmNlLCBDb25zdHJ1Y3RvcikgeyBpZiAoIShpbnN0YW5jZSBpbnN0YW5jZW9mIENvbnN0cnVjdG9yKSkgeyB0aHJvdyBuZXcgVHlwZUVycm9yKFwiQ2Fubm90IGNhbGwgYSBjbGFzcyBhcyBhIGZ1bmN0aW9uXCIpOyB9IH1cblxudmFyIFN0YXRlID0gZnVuY3Rpb24gU3RhdGUoZGF0YSkge1xuICBfY2xhc3NDYWxsQ2hlY2sodGhpcywgU3RhdGUpO1xuXG4gIHRoaXMuaWQgPSBkYXRhLmlkO1xuICB0aGlzLm5hbWUgPSBkYXRhLm5hbWU7XG4gIHRoaXMuaW1nID0gZGF0YS5pbWc7XG4gIHRoaXMucGFyYW1zID0gZGF0YS5wYXJhbXM7XG5cbiAgaWYgKGRhdGEubGFzdCkge1xuICAgIHRoaXMubGFzdCA9IHRydWU7XG4gICAgdGhpcy5ldmVudCA9IG51bGw7XG4gIH0gZWxzZSB7XG4gICAgdGhpcy5ldmVudCA9IG5ldyBfZXZlbnQyLmRlZmF1bHQoZGF0YS5ldmVudCk7XG4gICAgdGhpcy5sYXN0ID0gZmFsc2U7XG4gIH1cbn07XG5cbmV4cG9ydHMuZGVmYXVsdCA9IFN0YXRlO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbGVhcm5pbmcvY29tcG9uZW50cy9zdGF0ZS5qc1xuLy8gbW9kdWxlIGlkID0gN1xuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCIndXNlIHN0cmljdCc7XG5cbnJlcXVpcmUoJy4uL3Nhc3MvbGVhcm5pbmcuc2NzcycpO1xuXG52YXIgX3B1YnN1YiA9IHJlcXVpcmUoJy4vdXRpbHMvcHVic3ViJyk7XG5cbnZhciBfcHVic3ViMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX3B1YnN1Yik7XG5cbnZhciBfYWpheCA9IHJlcXVpcmUoJy4vdXRpbHMvYWpheCcpO1xuXG52YXIgX2FqYXgyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfYWpheCk7XG5cbnZhciBfc2NlbmUgPSByZXF1aXJlKCcuL2xlYXJuaW5nL3NjZW5lJyk7XG5cbnZhciBfc2NlbmUyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfc2NlbmUpO1xuXG52YXIgX21vZGVsID0gcmVxdWlyZSgnLi9sZWFybmluZy9tb2RlbCcpO1xuXG52YXIgX21vZGVsMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX21vZGVsKTtcblxuZnVuY3Rpb24gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChvYmopIHsgcmV0dXJuIG9iaiAmJiBvYmouX19lc01vZHVsZSA/IG9iaiA6IHsgZGVmYXVsdDogb2JqIH07IH1cblxudmFyIHNjZW5lID0gbmV3IF9zY2VuZTIuZGVmYXVsdChkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcubW9kZWwtbmFtZScpLCBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcubW9kZWwtc3RhdGUtaW1nJyksIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5tb2RlbC1wYXJhbXMtdmFsdWVzJyksIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5tb2RlbC1ldmVudCcpLCBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcubW9kZWwtcmVzcG9uc2UnKSwgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnRvb2xzLWxpc3QnKSk7XG5cbi8qKlxyXG4gKiBMb2FkIG1vZGVsIHdpdGggZ2l2ZW4gaWRcclxuICovXG5mdW5jdGlvbiBsb2FkTW9kZWwoaWQpIHtcbiAgcmV0dXJuICgwLCBfYWpheDIuZGVmYXVsdCkoJy9tb2RlbHMvJyArIGlkKS50aGVuKGZ1bmN0aW9uIChyZXNwb25zZSkge1xuICAgIHJldHVybiBKU09OLnBhcnNlKHJlc3BvbnNlKTtcbiAgfSk7XG59XG5cbmZ1bmN0aW9uIHRvZ2dsZUNvbnRyb2xCdXR0b25zKCkge1xuICAkc3RhcnRCdXR0b24uZGlzYWJsZWQgPSAhJHN0YXJ0QnV0dG9uLmRpc2FibGVkO1xuICAkc3RvcEJ1dHRvbi5kaXNhYmxlZCA9ICEkc3RvcEJ1dHRvbi5kaXNhYmxlZDtcbn1cblxuLyoqXHJcbiAqIFVJIGJ1dHRvbidzIGhhbmRsZXJzXHJcbiAqL1xudmFyICRsb2FkQnV0dG9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2xvYWQtbW9kZWwtYnRuJyk7XG52YXIgJHNlbGVjdCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjbW9kZWwtc2VsZWN0XCIpO1xudmFyIG1vZGVsID0ge307XG4kbG9hZEJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZ1bmN0aW9uICgpIHtcbiAgdmFyIG1vZGVsSWQgPSAkc2VsZWN0LnZhbHVlO1xuICBsb2FkTW9kZWwobW9kZWxJZCkudGhlbihmdW5jdGlvbiAocmVzcG9uc2UpIHtcbiAgICBtb2RlbCA9IG5ldyBfbW9kZWwyLmRlZmF1bHQocmVzcG9uc2UpO1xuICAgIHNjZW5lLmluaXQobW9kZWwpLmluaXRUb29scyhyZXNwb25zZS50b29scyk7XG4gICAgdG9nZ2xlQ29udHJvbEJ1dHRvbnMoKTtcbiAgfSkuY2F0Y2goZnVuY3Rpb24gKGVycikge1xuICAgIGNvbnNvbGUuZXJyb3IoZXJyKTtcbiAgfSk7XG59KTtcblxudmFyICRzdGFydEJ1dHRvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNzdGFydC1idG4nKTtcbiRzdGFydEJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZ1bmN0aW9uICgpIHtcbiAgbW9kZWwuc3RhcnQoKTtcbn0pO1xuXG52YXIgJHN0b3BCdXR0b24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjc3RvcC1idG4nKTtcbiRzdG9wQnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24gKCkge1xuICBtb2RlbC5zdG9wKCk7IC8vIFRPRE9cbn0pO1xuXG52YXIgJHJ1bkJ1dHRvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNydW4tYnRuJyk7XG4kcnVuQnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24gKCkge1xuICB2YXIgdG9vbHNEYXRhID0gc2NlbmUuZ2V0VG9vbHNEYXRhKCk7XG4gIF9wdWJzdWIyLmRlZmF1bHQucHVibGlzaCgndXNlcl9pbnB1dCcsIHRvb2xzRGF0YSk7XG59KTtcblxuLyoqXHJcbiAqIEhhbmRsZSBjdXN0b20gZXZlbnRzIGhlcmUgKHVzZXIgaW5wdXQsIHByb2dyYW1tIG1lc3NhZ2VzIGV0Yy4pXHJcbiAqL1xuX3B1YnN1YjIuZGVmYXVsdC5zdWJzY3JpYmUoJ25ld19zdGF0ZScsIGZ1bmN0aW9uIChzdGF0ZSkge1xuICByZXR1cm4gc2NlbmUuc2V0U3RhdGUoc3RhdGUpO1xufSk7XG5fcHVic3ViMi5kZWZhdWx0LnN1YnNjcmliZSgnZXZlbnQnLCBmdW5jdGlvbiAoZGF0YSkge1xuICByZXR1cm4gc2NlbmUuc2V0RXZlbnQoZGF0YS5ldmVudCk7XG59KTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL2xlYXJuaW5nLmpzXG4vLyBtb2R1bGUgaWQgPSA4XG4vLyBtb2R1bGUgY2h1bmtzID0gMCJdLCJtYXBwaW5ncyI6IjtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7O0FDaEVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7OztBQ25DQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7QUM3SEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7QUM5TkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7QUNuQ0E7Ozs7Ozs7QUNBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7OztBQ3pEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7QUNqRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7OztBQy9CQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Iiwic291cmNlUm9vdCI6IiJ9