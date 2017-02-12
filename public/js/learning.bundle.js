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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGVhcm5pbmcuYnVuZGxlLmpzIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vL3dlYnBhY2svYm9vdHN0cmFwIGI2Mjk0NjVmMzVlNzA1NGQ3ZmVjIiwid2VicGFjazovLy8uL3V0aWxzL3B1YnN1Yi5qcyIsIndlYnBhY2s6Ly8vLi9sZWFybmluZy9tb2RlbC5qcyIsIndlYnBhY2s6Ly8vLi9sZWFybmluZy9zY2VuZS5qcyIsIndlYnBhY2s6Ly8vLi91dGlscy9hamF4LmpzIiwid2VicGFjazovLy8uLi9zYXNzL2xlYXJuaW5nLnNjc3MiLCJ3ZWJwYWNrOi8vLy4vbGVhcm5pbmcvY29tcG9uZW50cy9hY3Rpb24uanMiLCJ3ZWJwYWNrOi8vLy4vbGVhcm5pbmcvY29tcG9uZW50cy9ldmVudC5qcyIsIndlYnBhY2s6Ly8vLi9sZWFybmluZy9jb21wb25lbnRzL3N0YXRlLmpzIiwid2VicGFjazovLy8uL2xlYXJuaW5nLmpzIl0sInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKVxuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuXG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBpZGVudGl0eSBmdW5jdGlvbiBmb3IgY2FsbGluZyBoYXJtb255IGltcG9ydHMgd2l0aCB0aGUgY29ycmVjdCBjb250ZXh0XG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmkgPSBmdW5jdGlvbih2YWx1ZSkgeyByZXR1cm4gdmFsdWU7IH07XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwge1xuIFx0XHRcdFx0Y29uZmlndXJhYmxlOiBmYWxzZSxcbiBcdFx0XHRcdGVudW1lcmFibGU6IHRydWUsXG4gXHRcdFx0XHRnZXQ6IGdldHRlclxuIFx0XHRcdH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IDgpO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIHdlYnBhY2svYm9vdHN0cmFwIGI2Mjk0NjVmMzVlNzA1NGQ3ZmVjIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuICB2YWx1ZTogdHJ1ZVxufSk7XG52YXIgcHVic3ViID0gZnVuY3Rpb24gKCkge1xuXG4gIHZhciB0b3BpY3MgPSB7fTtcblxuICByZXR1cm4ge1xuICAgIHN1YnNjcmliZTogZnVuY3Rpb24gc3Vic2NyaWJlKHRvcGljLCBsaXN0ZW5lcikge1xuICAgICAgaWYgKCF0b3BpY3NbdG9waWNdKSB0b3BpY3NbdG9waWNdID0geyBxdWV1ZTogW10gfTtcblxuICAgICAgdmFyIGluZGV4ID0gdG9waWNzW3RvcGljXS5xdWV1ZS5wdXNoKGxpc3RlbmVyKSAtIDE7XG5cbiAgICAgIC8vIGZ1bmN0aW9uIHRvIGRlbGV0ZSB0b3BpY1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAgcmVtb3ZlOiBmdW5jdGlvbiByZW1vdmUoKSB7XG4gICAgICAgICAgZGVsZXRlIHRvcGljc1t0b3BpY10ucXVldWVbaW5kZXhdO1xuICAgICAgICB9XG4gICAgICB9O1xuICAgIH0sXG5cbiAgICBwdWJsaXNoOiBmdW5jdGlvbiBwdWJsaXNoKHRvcGljLCBpbmZvKSB7XG4gICAgICAvLyBubyB0aGVtZSBvciBubyBsaXN0ZW5lcnNcbiAgICAgIGlmICghdG9waWNzW3RvcGljXSB8fCAhdG9waWNzW3RvcGljXS5xdWV1ZS5sZW5ndGgpIHJldHVybjtcblxuICAgICAgdmFyIGl0ZW1zID0gdG9waWNzW3RvcGljXS5xdWV1ZTtcbiAgICAgIGl0ZW1zLmZvckVhY2goZnVuY3Rpb24gKGl0ZW0pIHtcbiAgICAgICAgaXRlbShpbmZvIHx8IHt9KTtcbiAgICAgIH0pO1xuICAgIH1cbiAgfTtcbn0oKTtcblxuZXhwb3J0cy5kZWZhdWx0ID0gcHVic3ViO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vdXRpbHMvcHVic3ViLmpzXG4vLyBtb2R1bGUgaWQgPSAwXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIid1c2Ugc3RyaWN0JztcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcblxudmFyIF9jcmVhdGVDbGFzcyA9IGZ1bmN0aW9uICgpIHsgZnVuY3Rpb24gZGVmaW5lUHJvcGVydGllcyh0YXJnZXQsIHByb3BzKSB7IGZvciAodmFyIGkgPSAwOyBpIDwgcHJvcHMubGVuZ3RoOyBpKyspIHsgdmFyIGRlc2NyaXB0b3IgPSBwcm9wc1tpXTsgZGVzY3JpcHRvci5lbnVtZXJhYmxlID0gZGVzY3JpcHRvci5lbnVtZXJhYmxlIHx8IGZhbHNlOyBkZXNjcmlwdG9yLmNvbmZpZ3VyYWJsZSA9IHRydWU7IGlmIChcInZhbHVlXCIgaW4gZGVzY3JpcHRvcikgZGVzY3JpcHRvci53cml0YWJsZSA9IHRydWU7IE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0YXJnZXQsIGRlc2NyaXB0b3Iua2V5LCBkZXNjcmlwdG9yKTsgfSB9IHJldHVybiBmdW5jdGlvbiAoQ29uc3RydWN0b3IsIHByb3RvUHJvcHMsIHN0YXRpY1Byb3BzKSB7IGlmIChwcm90b1Byb3BzKSBkZWZpbmVQcm9wZXJ0aWVzKENvbnN0cnVjdG9yLnByb3RvdHlwZSwgcHJvdG9Qcm9wcyk7IGlmIChzdGF0aWNQcm9wcykgZGVmaW5lUHJvcGVydGllcyhDb25zdHJ1Y3Rvciwgc3RhdGljUHJvcHMpOyByZXR1cm4gQ29uc3RydWN0b3I7IH07IH0oKTtcblxudmFyIF9zdGF0ZSA9IHJlcXVpcmUoJy4vY29tcG9uZW50cy9zdGF0ZScpO1xuXG52YXIgX3N0YXRlMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX3N0YXRlKTtcblxudmFyIF9wdWJzdWIgPSByZXF1aXJlKCcuLi91dGlscy9wdWJzdWInKTtcblxudmFyIF9wdWJzdWIyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfcHVic3ViKTtcblxuZnVuY3Rpb24gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChvYmopIHsgcmV0dXJuIG9iaiAmJiBvYmouX19lc01vZHVsZSA/IG9iaiA6IHsgZGVmYXVsdDogb2JqIH07IH1cblxuZnVuY3Rpb24gX2NsYXNzQ2FsbENoZWNrKGluc3RhbmNlLCBDb25zdHJ1Y3RvcikgeyBpZiAoIShpbnN0YW5jZSBpbnN0YW5jZW9mIENvbnN0cnVjdG9yKSkgeyB0aHJvdyBuZXcgVHlwZUVycm9yKFwiQ2Fubm90IGNhbGwgYSBjbGFzcyBhcyBhIGZ1bmN0aW9uXCIpOyB9IH1cblxudmFyIE1vZGVsID0gZnVuY3Rpb24gKCkge1xuICBmdW5jdGlvbiBNb2RlbChkYXRhKSB7XG4gICAgX2NsYXNzQ2FsbENoZWNrKHRoaXMsIE1vZGVsKTtcblxuICAgIHRoaXMuaWQgPSBkYXRhLmlkO1xuICAgIHRoaXMubmFtZSA9IGRhdGEubmFtZTtcbiAgICB0aGlzLmJyZWFrVGltZSA9IGRhdGEuYnJlYWtUaW1lO1xuICAgIHRoaXMuc3RlcHMgPSBkYXRhLnN0ZXBzO1xuXG4gICAgdGhpcy5zdGF0ZXMgPSBkYXRhLnN0YXRlcy5tYXAoZnVuY3Rpb24gKHN0YXRlKSB7XG4gICAgICByZXR1cm4gbmV3IF9zdGF0ZTIuZGVmYXVsdChzdGF0ZSk7XG4gICAgfSk7XG4gICAgdGhpcy5jdXJyZW50U3RhdGUgPSB0aGlzLmdldFN0YXRlKGRhdGEuaWQpO1xuXG4gICAgdGhpcy50aW1lb3V0ID0gbnVsbDtcbiAgICB0aGlzLnN1YnNjcmlidGlvbiA9IG51bGw7XG4gIH1cblxuICBfY3JlYXRlQ2xhc3MoTW9kZWwsIFt7XG4gICAga2V5OiAnZ2V0U3RhdGUnLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBnZXRTdGF0ZShpZCkge1xuICAgICAgcmV0dXJuIHRoaXMuc3RhdGVzLmZpbmQoZnVuY3Rpb24gKHN0YXRlKSB7XG4gICAgICAgIHJldHVybiBzdGF0ZS5pZCA9PSBpZDtcbiAgICAgIH0pO1xuICAgIH1cbiAgfSwge1xuICAgIGtleTogJ3N0YXJ0JyxcbiAgICB2YWx1ZTogZnVuY3Rpb24gc3RhcnQoKSB7XG4gICAgICB2YXIgX3RoaXMgPSB0aGlzO1xuXG4gICAgICB2YXIgaW50ZXJ2YWxzID0gUHJvbWlzZS5yZXNvbHZlKCk7IC8vIGluaXQgcHJvbWlzZSBjaGFpblxuICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCB0aGlzLnN0ZXBzOyBpKyspIHtcbiAgICAgICAgaW50ZXJ2YWxzID0gaW50ZXJ2YWxzLnRoZW4oZnVuY3Rpb24gKCkge1xuICAgICAgICAgIHJldHVybiBfdGhpcy5tYWtlQnJlYWsoKTtcbiAgICAgICAgfSkudGhlbihmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgcmV0dXJuIF90aGlzLmhhbmRsZUV2ZW50KCk7XG4gICAgICAgIH0pLnRoZW4oZnVuY3Rpb24gKHN0YXRlKSB7XG4gICAgICAgICAgX3RoaXMuaGFuZGxlTmV3U3RhdGUoc3RhdGUpO1xuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICAgIGludGVydmFscy5jYXRjaChmdW5jdGlvbiAoc3RhdGUpIHtcbiAgICAgICAgX3B1YnN1YjIuZGVmYXVsdC5wdWJsaXNoKCduZXdfc3RhdGUnLCBzdGF0ZSk7XG4gICAgICB9KTtcbiAgICB9XG4gIH0sIHtcbiAgICBrZXk6ICdtYWtlQnJlYWsnLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBtYWtlQnJlYWsoKSB7XG4gICAgICB2YXIgX3RoaXMyID0gdGhpcztcblxuICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcbiAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgcmVzb2x2ZSgpO1xuICAgICAgICB9LCBfdGhpczIuYnJlYWtUaW1lKTtcbiAgICAgIH0pO1xuICAgIH1cbiAgfSwge1xuICAgIGtleTogJ2hhbmRsZUV2ZW50JyxcbiAgICB2YWx1ZTogZnVuY3Rpb24gaGFuZGxlRXZlbnQoKSB7XG4gICAgICB2YXIgX3RoaXMzID0gdGhpcztcblxuICAgICAgdmFyIGV2ZW50ID0gdGhpcy5jdXJyZW50U3RhdGUuZXZlbnQ7XG4gICAgICB2YXIgZXZlbnRTdGFydFRpbWUgPSBEYXRlLm5vdygpO1xuICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcbiAgICAgICAgLy8gc2VuZCBkYXRhIGFib3V0IG5ldyBldmVudCB0byBvdGhlciBtb2R1bGVzXG4gICAgICAgIF9wdWJzdWIyLmRlZmF1bHQucHVibGlzaCgnZXZlbnQnLCB7IGV2ZW50OiBldmVudCB9KTtcblxuICAgICAgICAvLyBsaXN0ZW4gdG8gdXNlciBhY3Rpb25cbiAgICAgICAgLy8gYW5kIGlmIHVzZXIgaW5wdXQgY29ycmVjdCBnbyB0byBuZXh0IHN0YXRlXG4gICAgICAgIF90aGlzMy5zdWJzY3JpYnRpb24gPSBfcHVic3ViMi5kZWZhdWx0LnN1YnNjcmliZSgndXNlcl9pbnB1dCcsIGZ1bmN0aW9uIChkYXRhKSB7XG4gICAgICAgICAgdmFyIHRpbWVTcGVudCA9IERhdGUubm93KCkgLSBldmVudFN0YXJ0VGltZTtcbiAgICAgICAgICB2YXIgbmV4dFN0YXRlSWQgPSBldmVudC5oYW5kbGVJbnB1dChkYXRhLCB0aW1lU3BlbnQpO1xuICAgICAgICAgIHZhciBuZXh0U3RhdGUgPSBfdGhpczMuZ2V0U3RhdGUobmV4dFN0YXRlSWQpO1xuICAgICAgICAgIGlmIChuZXh0U3RhdGUpIHtcbiAgICAgICAgICAgIG5leHRTdGF0ZS5sYXN0ID8gcmVqZWN0KG5leHRTdGF0ZSkgOiByZXNvbHZlKG5leHRTdGF0ZSk7XG4gICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICAvLyBoYW5kbGUgaW5hY3RpdmVcbiAgICAgICAgdmFyIGluYWN0aXZlVGltZSA9IGV2ZW50LmdldEluYWN0aXZlVGltZSgpO1xuICAgICAgICBfdGhpczMudGltZW91dCA9IHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xuICAgICAgICAgIHZhciBuZXh0U3RhdGVJZCA9IGV2ZW50LmdldEluYWN0aXZlQWN0aW9uKCkubmV4dFN0YXRlO1xuICAgICAgICAgIHZhciBuZXh0U3RhdGUgPSBfdGhpczMuZ2V0U3RhdGUobmV4dFN0YXRlSWQpO1xuICAgICAgICAgIG5leHRTdGF0ZS5sYXN0ID8gcmVqZWN0KG5leHRTdGF0ZSkgOiByZXNvbHZlKG5leHRTdGF0ZSk7XG4gICAgICAgIH0sIGluYWN0aXZlVGltZSk7XG4gICAgICB9KTtcbiAgICB9XG4gIH0sIHtcbiAgICBrZXk6ICdoYW5kbGVOZXdTdGF0ZScsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIGhhbmRsZU5ld1N0YXRlKHN0YXRlKSB7XG4gICAgICB0aGlzLmN1cnJlbnRTdGF0ZSA9IHN0YXRlO1xuICAgICAgY2xlYXJUaW1lb3V0KHRoaXMudGltZW91dCk7XG4gICAgICB0aGlzLnN1YnNjcmlidGlvbi5yZW1vdmUoKTtcbiAgICAgIF9wdWJzdWIyLmRlZmF1bHQucHVibGlzaCgnbmV3X3N0YXRlJywgc3RhdGUpO1xuICAgIH1cblxuICAgIC8vIFRPRE9cblxuICB9LCB7XG4gICAga2V5OiAnc3RvcCcsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIHN0b3AoKSB7fVxuICB9XSk7XG5cbiAgcmV0dXJuIE1vZGVsO1xufSgpO1xuXG5leHBvcnRzLmRlZmF1bHQgPSBNb2RlbDtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL2xlYXJuaW5nL21vZGVsLmpzXG4vLyBtb2R1bGUgaWQgPSAxXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIid1c2Ugc3RyaWN0JztcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcblxudmFyIF9jcmVhdGVDbGFzcyA9IGZ1bmN0aW9uICgpIHsgZnVuY3Rpb24gZGVmaW5lUHJvcGVydGllcyh0YXJnZXQsIHByb3BzKSB7IGZvciAodmFyIGkgPSAwOyBpIDwgcHJvcHMubGVuZ3RoOyBpKyspIHsgdmFyIGRlc2NyaXB0b3IgPSBwcm9wc1tpXTsgZGVzY3JpcHRvci5lbnVtZXJhYmxlID0gZGVzY3JpcHRvci5lbnVtZXJhYmxlIHx8IGZhbHNlOyBkZXNjcmlwdG9yLmNvbmZpZ3VyYWJsZSA9IHRydWU7IGlmIChcInZhbHVlXCIgaW4gZGVzY3JpcHRvcikgZGVzY3JpcHRvci53cml0YWJsZSA9IHRydWU7IE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0YXJnZXQsIGRlc2NyaXB0b3Iua2V5LCBkZXNjcmlwdG9yKTsgfSB9IHJldHVybiBmdW5jdGlvbiAoQ29uc3RydWN0b3IsIHByb3RvUHJvcHMsIHN0YXRpY1Byb3BzKSB7IGlmIChwcm90b1Byb3BzKSBkZWZpbmVQcm9wZXJ0aWVzKENvbnN0cnVjdG9yLnByb3RvdHlwZSwgcHJvdG9Qcm9wcyk7IGlmIChzdGF0aWNQcm9wcykgZGVmaW5lUHJvcGVydGllcyhDb25zdHJ1Y3Rvciwgc3RhdGljUHJvcHMpOyByZXR1cm4gQ29uc3RydWN0b3I7IH07IH0oKTtcblxuZnVuY3Rpb24gX2NsYXNzQ2FsbENoZWNrKGluc3RhbmNlLCBDb25zdHJ1Y3RvcikgeyBpZiAoIShpbnN0YW5jZSBpbnN0YW5jZW9mIENvbnN0cnVjdG9yKSkgeyB0aHJvdyBuZXcgVHlwZUVycm9yKFwiQ2Fubm90IGNhbGwgYSBjbGFzcyBhcyBhIGZ1bmN0aW9uXCIpOyB9IH1cblxudmFyIFNjZW5lID0gZnVuY3Rpb24gKCkge1xuICBmdW5jdGlvbiBTY2VuZSgkbW9kZWxOYW1lLCAkc3RhdGVJbWcsICRzdGF0ZVBhcmFtcywgJGV2ZW50LCAkcmVzcG9uc2VCb3gsICR0b29sc0JveCkge1xuICAgIF9jbGFzc0NhbGxDaGVjayh0aGlzLCBTY2VuZSk7XG5cbiAgICB0aGlzLiRtb2RlbE5hbWUgPSAkbW9kZWxOYW1lO1xuICAgIHRoaXMuJHN0YXRlSW1nID0gJHN0YXRlSW1nO1xuICAgIHRoaXMuJHN0YXRlUGFyYW1zID0gJHN0YXRlUGFyYW1zO1xuICAgIHRoaXMuJGV2ZW50ID0gJGV2ZW50O1xuICAgIHRoaXMuJHJlc3BvbnNlQm94ID0gJHJlc3BvbnNlQm94O1xuICAgIHRoaXMuJHRvb2xzQm94ID0gJHRvb2xzQm94O1xuICB9XG5cbiAgX2NyZWF0ZUNsYXNzKFNjZW5lLCBbe1xuICAgIGtleTogJ2luaXQnLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBpbml0KG1vZGVsKSB7XG4gICAgICB0aGlzLnNldE1vZGVsTmFtZShtb2RlbC5uYW1lKS5zZXRTdGF0ZShtb2RlbC5jdXJyZW50U3RhdGUpO1xuICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuXG4gICAgLyoqIFNldCBhY3R1YWwgbm9kZSBjb250ZW50ICovXG5cbiAgfSwge1xuICAgIGtleTogJ3NldE1vZGVsTmFtZScsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIHNldE1vZGVsTmFtZShuYW1lKSB7XG4gICAgICB0aGlzLiRtb2RlbE5hbWUudGV4dENvbnRlbnQgPSBuYW1lO1xuICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuXG4gICAgLyoqIENyZWF0ZXMgaW5wdXQgZWxlbWVudHMgaW4gJ3Rvb2xzJyBib3ggKi9cblxuICB9LCB7XG4gICAga2V5OiAnaW5pdFRvb2xzJyxcbiAgICB2YWx1ZTogZnVuY3Rpb24gaW5pdFRvb2xzKHRvb2xzKSB7XG4gICAgICB2YXIgX3RoaXMgPSB0aGlzO1xuXG4gICAgICB2YXIgdG9vbHNGcmFnbWVudCA9IGRvY3VtZW50LmNyZWF0ZURvY3VtZW50RnJhZ21lbnQoKTtcblxuICAgICAgdG9vbHMuZm9yRWFjaChmdW5jdGlvbiAodG9vbCkge1xuICAgICAgICAvLyBXcmFwIGV2ZXJ5IHRvb2wgZm9yIHByb3BlciBkaXNwbGF5IGFuZCBhZGQgbGFiZWxcbiAgICAgICAgdmFyIGRpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICBkaXYuY2xhc3NMaXN0LmFkZCgndG9vbCcpO1xuXG4gICAgICAgIHZhciBsYWJlbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2xhYmVsJyk7XG4gICAgICAgIGxhYmVsLnNldEF0dHJpYnV0ZSgnZm9yJywgdG9vbC5uYW1lKTtcbiAgICAgICAgbGFiZWwudGV4dENvbnRlbnQgPSB0b29sLm5hbWU7XG4gICAgICAgIGRpdi5hcHBlbmRDaGlsZChsYWJlbCk7XG5cbiAgICAgICAgdmFyIHRvb2xOb2RlID0gX3RoaXMuY3JlYXRlVG9vbE5vZGUodG9vbCk7XG4gICAgICAgIGRpdi5hcHBlbmRDaGlsZCh0b29sTm9kZSk7XG5cbiAgICAgICAgLy8gQXBwZW5kIHRvIGZyYWdtZW50XG4gICAgICAgIHRvb2xzRnJhZ21lbnQuYXBwZW5kQ2hpbGQoZGl2KTtcbiAgICAgIH0pO1xuXG4gICAgICB0aGlzLiR0b29sc0JveC5pbm5lckhUTUwgPSAnJztcbiAgICAgIHRoaXMuJHRvb2xzQm94LmFwcGVuZENoaWxkKHRvb2xzRnJhZ21lbnQpO1xuICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuICB9LCB7XG4gICAga2V5OiAnY3JlYXRlVG9vbE5vZGUnLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBjcmVhdGVUb29sTm9kZSh0b29sKSB7XG4gICAgICBzd2l0Y2ggKHRvb2wudHlwZSkge1xuICAgICAgICBjYXNlICdyYW5nZSc6XG4gICAgICAgICAgcmV0dXJuIHRoaXMuY3JlYXRlUmFuZ2VUb29sKHRvb2wpO1xuICAgICAgICBjYXNlICdzd2l0Y2gnOlxuICAgICAgICAgIHJldHVybiB0aGlzLmNyZWF0ZVN3aXRjaFRvb2wodG9vbCk7XG4gICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgcmV0dXJuICdVbmtub3duIHRvb2wgdHlwZSc7XG4gICAgICB9XG4gICAgfVxuICB9LCB7XG4gICAga2V5OiAnY3JlYXRlUmFuZ2VUb29sJyxcbiAgICB2YWx1ZTogZnVuY3Rpb24gY3JlYXRlUmFuZ2VUb29sKHRvb2wpIHtcbiAgICAgIHZhciBkaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcblxuICAgICAgdmFyIHNwYW5NaW4gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzcGFuJyk7XG4gICAgICBzcGFuTWluLnRleHRDb250ZW50ID0gdG9vbC5taW47XG4gICAgICBkaXYuYXBwZW5kQ2hpbGQoc3Bhbk1pbik7XG5cbiAgICAgIHZhciBpbnB1dCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2lucHV0Jyk7XG4gICAgICBpbnB1dC5zZXRBdHRyaWJ1dGUoJ2RhdGEtaWQnLCB0b29sLmlkKTtcbiAgICAgIGlucHV0LnNldEF0dHJpYnV0ZSgnZGF0YS10eXBlJywgJ3JhbmdlJyk7XG4gICAgICBpbnB1dC5zZXRBdHRyaWJ1dGUoJ25hbWUnLCB0b29sLm5hbWUpO1xuICAgICAgaW5wdXQuc2V0QXR0cmlidXRlKCd0eXBlJywgJ3JhbmdlJyk7XG4gICAgICBpbnB1dC5zZXRBdHRyaWJ1dGUoJ21pbicsIHRvb2wubWluKTtcbiAgICAgIGlucHV0LnNldEF0dHJpYnV0ZSgnbWF4JywgdG9vbC5tYXgpO1xuICAgICAgZGl2LmFwcGVuZENoaWxkKGlucHV0KTtcblxuICAgICAgdmFyIHNwYW5NYXggPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzcGFuJyk7XG4gICAgICBzcGFuTWF4LnRleHRDb250ZW50ID0gdG9vbC5tYXg7XG4gICAgICBkaXYuYXBwZW5kQ2hpbGQoc3Bhbk1heCk7XG5cbiAgICAgIHJldHVybiBkaXY7XG4gICAgfVxuICB9LCB7XG4gICAga2V5OiAnY3JlYXRlU3dpdGNoVG9vbCcsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIGNyZWF0ZVN3aXRjaFRvb2wodG9vbCkge1xuICAgICAgdmFyIGxhYmVsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnbGFiZWwnKTtcbiAgICAgIGxhYmVsLmNsYXNzTGlzdC5hZGQoJ3N3aXRjaCcpO1xuXG4gICAgICB2YXIgaW5wdXQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpbnB1dCcpO1xuICAgICAgaW5wdXQuc2V0QXR0cmlidXRlKCdkYXRhLWlkJywgdG9vbC5pZCk7XG4gICAgICBpbnB1dC5zZXRBdHRyaWJ1dGUoJ2RhdGEtdHlwZScsICdzd2l0Y2gnKTtcbiAgICAgIGlucHV0LnNldEF0dHJpYnV0ZSgndHlwZScsICdjaGVja2JveCcpO1xuICAgICAgbGFiZWwuYXBwZW5kQ2hpbGQoaW5wdXQpO1xuXG4gICAgICB2YXIgZGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICBkaXYuY2xhc3NMaXN0LmFkZCgnc2xpZGVyJyk7XG4gICAgICBsYWJlbC5hcHBlbmRDaGlsZChkaXYpO1xuXG4gICAgICByZXR1cm4gbGFiZWw7XG4gICAgfVxuXG4gICAgLyoqIFNldHMgaW1nIGFuZCBwYXJhbWV0ZXJzIG9mIGN1cnJlbnQgc3RhdGUgdG8gVUkgKi9cblxuICB9LCB7XG4gICAga2V5OiAnc2V0U3RhdGUnLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBzZXRTdGF0ZShfcmVmKSB7XG4gICAgICB2YXIgaW1nID0gX3JlZi5pbWcsXG4gICAgICAgICAgcGFyYW1zID0gX3JlZi5wYXJhbXM7XG5cbiAgICAgIC8vIENoYW5nZSBzdGF0ZSBpbWFnZVxuICAgICAgdGhpcy4kc3RhdGVJbWcuc2V0QXR0cmlidXRlKCdzcmMnLCBpbWcpO1xuXG4gICAgICAvLyBTZXQgc3RhdGUgcGFyYW1ldGVyc1xuICAgICAgdmFyIHBhcmFtc0ZyYWdtZW50ID0gZG9jdW1lbnQuY3JlYXRlRG9jdW1lbnRGcmFnbWVudCgpO1xuICAgICAgZm9yICh2YXIga2V5IGluIHBhcmFtcykge1xuICAgICAgICBwYXJhbXNGcmFnbWVudC5hcHBlbmRDaGlsZCh0aGlzLmNyZWF0ZVBhcmFtZXRlck5vZGUoa2V5LCBwYXJhbXNba2V5XSkpO1xuICAgICAgfVxuICAgICAgdGhpcy4kc3RhdGVQYXJhbXMuaW5uZXJIVE1MID0gJyc7XG4gICAgICB0aGlzLiRzdGF0ZVBhcmFtcy5hcHBlbmRDaGlsZChwYXJhbXNGcmFnbWVudCk7XG5cbiAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cbiAgfSwge1xuICAgIGtleTogJ2NyZWF0ZVBhcmFtZXRlck5vZGUnLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBjcmVhdGVQYXJhbWV0ZXJOb2RlKGtleSwgdmFsdWUpIHtcbiAgICAgIHZhciBkaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgIGRpdi5jbGFzc0xpc3QuYWRkKCdwYXJhbWV0ZXInKTtcblxuICAgICAgdmFyIGtleVNwYW4gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzcGFuJyk7XG4gICAgICBrZXlTcGFuLnRleHRDb250ZW50ID0ga2V5O1xuICAgICAgZGl2LmFwcGVuZENoaWxkKGtleVNwYW4pO1xuXG4gICAgICB2YXIgdmFsdWVTcGFuID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3BhbicpO1xuICAgICAgdmFsdWVTcGFuLnRleHRDb250ZW50ID0gdmFsdWU7XG4gICAgICBkaXYuYXBwZW5kQ2hpbGQodmFsdWVTcGFuKTtcblxuICAgICAgcmV0dXJuIGRpdjtcbiAgICB9XG5cbiAgICAvKiogU2V0cyBldmVudCBkYXRhIHRvIFVJICovXG5cbiAgfSwge1xuICAgIGtleTogJ3NldEV2ZW50JyxcbiAgICB2YWx1ZTogZnVuY3Rpb24gc2V0RXZlbnQoZXZlbnQpIHtcbiAgICAgIHRoaXMuJGV2ZW50LnRleHRDb250ZW50ID0gZXZlbnQubmFtZTtcbiAgICB9XG5cbiAgICAvKiogR2V0IGRhdGEgZnJvbSB0b29sIG5vZGVzICovXG5cbiAgfSwge1xuICAgIGtleTogJ2dldFRvb2xzRGF0YScsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIGdldFRvb2xzRGF0YSgpIHtcbiAgICAgIHZhciB0b29sc0RhdGEgPSB7fTtcbiAgICAgIHZhciBpbnB1dHMgPSB0aGlzLiR0b29sc0JveC5xdWVyeVNlbGVjdG9yQWxsKCdpbnB1dFtkYXRhLWlkXScpO1xuICAgICAgaW5wdXRzLmZvckVhY2goZnVuY3Rpb24gKGlucHV0KSB7XG4gICAgICAgIHZhciBfaW5wdXQkZGF0YXNldCA9IGlucHV0LmRhdGFzZXQsXG4gICAgICAgICAgICBpZCA9IF9pbnB1dCRkYXRhc2V0LmlkLFxuICAgICAgICAgICAgdHlwZSA9IF9pbnB1dCRkYXRhc2V0LnR5cGU7XG5cbiAgICAgICAgdmFyIHZhbHVlID0gdm9pZCAwO1xuICAgICAgICBzd2l0Y2ggKHR5cGUpIHtcbiAgICAgICAgICBjYXNlICdyYW5nZSc6XG4gICAgICAgICAgICB2YWx1ZSA9IHBhcnNlSW50KGlucHV0LnZhbHVlKTticmVhaztcbiAgICAgICAgICBjYXNlICdzd2l0Y2gnOlxuICAgICAgICAgICAgdmFsdWUgPSBpbnB1dC5jaGVja2VkO2JyZWFrO1xuICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ0ludmFsaWQgdG9vbCB0eXBlJyk7XG4gICAgICAgIH1cbiAgICAgICAgdG9vbHNEYXRhW2lkXSA9IHZhbHVlO1xuICAgICAgfSk7XG4gICAgICByZXR1cm4gdG9vbHNEYXRhO1xuICAgIH1cbiAgfV0pO1xuXG4gIHJldHVybiBTY2VuZTtcbn0oKTtcblxuZXhwb3J0cy5kZWZhdWx0ID0gU2NlbmU7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9sZWFybmluZy9zY2VuZS5qc1xuLy8gbW9kdWxlIGlkID0gMlxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCIndXNlIHN0cmljdCc7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuICB2YWx1ZTogdHJ1ZVxufSk7XG5mdW5jdGlvbiBhamF4KCkge1xuICB2YXIgcGF0aCA9IGFyZ3VtZW50cy5sZW5ndGggPiAwICYmIGFyZ3VtZW50c1swXSAhPT0gdW5kZWZpbmVkID8gYXJndW1lbnRzWzBdIDogJyc7XG4gIHZhciBvcHRpb25zID0gYXJndW1lbnRzLmxlbmd0aCA+IDEgJiYgYXJndW1lbnRzWzFdICE9PSB1bmRlZmluZWQgPyBhcmd1bWVudHNbMV0gOiB7fTtcblxuICB2YXIgeGhyID0gbmV3IFhNTEh0dHBSZXF1ZXN0KCk7XG4gIHhoci5vcGVuKG9wdGlvbnMubWV0aG9kIHx8ICdHRVQnLCBwYXRoLCB0cnVlKTtcbiAgaWYgKG9wdGlvbnMuaGVhZGVycykge1xuICAgIHNldFhIUkhlYWRlcnMoeGhyLCBvcHRpb25zLmhlYWRlcnMpO1xuICB9XG4gIHhoci5zZW5kKG9wdGlvbnMuZGF0YSk7XG5cbiAgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcbiAgICB4aHIub25yZWFkeXN0YXRlY2hhbmdlID0gZnVuY3Rpb24gKCkge1xuICAgICAgaWYgKHhoci5yZWFkeVN0YXRlID09IDQpIHtcbiAgICAgICAgaWYgKHhoci5zdGF0dXMgPT0gMjAwKSB7XG4gICAgICAgICAgcmVzb2x2ZSh4aHIucmVzcG9uc2VUZXh0KTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICByZWplY3QoeGhyLnN0YXR1c1RleHQpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfTtcbiAgfSk7XG59XG5cbmZ1bmN0aW9uIHNldFhIUkhlYWRlcnMoeGhyLCBoZWFkZXJzKSB7XG4gIGZvciAodmFyIGhlYWRlciBpbiBoZWFkZXJzKSB7XG4gICAgeGhyLnNldFJlcXVlc3RIZWFkZXIoaGVhZGVyLCBoZWFkZXJzW2hlYWRlcnNdKTtcbiAgfVxufVxuXG5leHBvcnRzLmRlZmF1bHQgPSBhamF4O1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vdXRpbHMvYWpheC5qc1xuLy8gbW9kdWxlIGlkID0gM1xuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCIvLyByZW1vdmVkIGJ5IGV4dHJhY3QtdGV4dC13ZWJwYWNrLXBsdWdpblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4uL3Nhc3MvbGVhcm5pbmcuc2Nzc1xuLy8gbW9kdWxlIGlkID0gNFxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCIndXNlIHN0cmljdCc7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuICB2YWx1ZTogdHJ1ZVxufSk7XG5cbnZhciBfY3JlYXRlQ2xhc3MgPSBmdW5jdGlvbiAoKSB7IGZ1bmN0aW9uIGRlZmluZVByb3BlcnRpZXModGFyZ2V0LCBwcm9wcykgeyBmb3IgKHZhciBpID0gMDsgaSA8IHByb3BzLmxlbmd0aDsgaSsrKSB7IHZhciBkZXNjcmlwdG9yID0gcHJvcHNbaV07IGRlc2NyaXB0b3IuZW51bWVyYWJsZSA9IGRlc2NyaXB0b3IuZW51bWVyYWJsZSB8fCBmYWxzZTsgZGVzY3JpcHRvci5jb25maWd1cmFibGUgPSB0cnVlOyBpZiAoXCJ2YWx1ZVwiIGluIGRlc2NyaXB0b3IpIGRlc2NyaXB0b3Iud3JpdGFibGUgPSB0cnVlOyBPYmplY3QuZGVmaW5lUHJvcGVydHkodGFyZ2V0LCBkZXNjcmlwdG9yLmtleSwgZGVzY3JpcHRvcik7IH0gfSByZXR1cm4gZnVuY3Rpb24gKENvbnN0cnVjdG9yLCBwcm90b1Byb3BzLCBzdGF0aWNQcm9wcykgeyBpZiAocHJvdG9Qcm9wcykgZGVmaW5lUHJvcGVydGllcyhDb25zdHJ1Y3Rvci5wcm90b3R5cGUsIHByb3RvUHJvcHMpOyBpZiAoc3RhdGljUHJvcHMpIGRlZmluZVByb3BlcnRpZXMoQ29uc3RydWN0b3IsIHN0YXRpY1Byb3BzKTsgcmV0dXJuIENvbnN0cnVjdG9yOyB9OyB9KCk7XG5cbmZ1bmN0aW9uIF9jbGFzc0NhbGxDaGVjayhpbnN0YW5jZSwgQ29uc3RydWN0b3IpIHsgaWYgKCEoaW5zdGFuY2UgaW5zdGFuY2VvZiBDb25zdHJ1Y3RvcikpIHsgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkNhbm5vdCBjYWxsIGEgY2xhc3MgYXMgYSBmdW5jdGlvblwiKTsgfSB9XG5cbnZhciBBY3Rpb24gPSBmdW5jdGlvbiAoKSB7XG4gIGZ1bmN0aW9uIEFjdGlvbihkYXRhKSB7XG4gICAgX2NsYXNzQ2FsbENoZWNrKHRoaXMsIEFjdGlvbik7XG5cbiAgICB0aGlzLnRvb2xJZCA9IGRhdGEudG9vbDtcbiAgICB0aGlzLm1pblRpbWUgPSBkYXRhLm1pblRpbWU7XG4gICAgdGhpcy5tYXhUaW1lID0gZGF0YS5tYXhUaW1lO1xuICAgIHRoaXMubmV4dFN0YXRlID0gZGF0YS5uZXh0U3RhdGU7XG4gICAgaWYgKGRhdGEuaW5hY3RpdmUpIHtcbiAgICAgIHRoaXMuaW5hY3RpdmUgPSB0cnVlO1xuICAgICAgdGhpcy52YWx1ZSA9IG51bGw7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuaW5hY3RpdmUgPSBmYWxzZTtcbiAgICAgIHRoaXMudmFsdWUgPSBkYXRhLnZhbHVlO1xuICAgIH1cbiAgfVxuXG4gIF9jcmVhdGVDbGFzcyhBY3Rpb24sIFt7XG4gICAga2V5OiAnaXNTdWl0YWJsZScsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIGlzU3VpdGFibGUoZGF0YSwgdGltZSkge1xuICAgICAgcmV0dXJuIHRoaXMucmlnaHRUaW1lKHRpbWUpICYmIHRoaXMucmlnaHREYXRhKGRhdGEpO1xuICAgIH1cbiAgfSwge1xuICAgIGtleTogJ3JpZ2h0RGF0YScsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIHJpZ2h0RGF0YShkYXRhKSB7XG4gICAgICBpZiAodHlwZW9mIHRoaXMudmFsdWUgPT0gJ2Jvb2xlYW4nICYmIGRhdGFbdGhpcy50b29sSWRdICYmIGRhdGFbdGhpcy50b29sSWRdID09IHRoaXMudmFsdWUpIHtcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICB9IGVsc2UgaWYgKEFycmF5LmlzQXJyYXkodGhpcy52YWx1ZSkgJiYgZGF0YVt0aGlzLnRvb2xJZF0gJiYgdGhpcy5pbmNsdWRlc1ZhbHVlKGRhdGFbdGhpcy50b29sSWRdKSkge1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgIH1cbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gIH0sIHtcbiAgICBrZXk6ICdpbmNsdWRlc1ZhbHVlJyxcbiAgICB2YWx1ZTogZnVuY3Rpb24gaW5jbHVkZXNWYWx1ZSh2YWx1ZSwgYm9yZGVycykge1xuICAgICAgcmV0dXJuIHZhbHVlID4gdGhpcy52YWx1ZVswXSAmJiB2YWx1ZSA8IHRoaXMudmFsdWVbMV07XG4gICAgfVxuICB9LCB7XG4gICAga2V5OiAncmlnaHRUaW1lJyxcbiAgICB2YWx1ZTogZnVuY3Rpb24gcmlnaHRUaW1lKHRpbWUpIHtcbiAgICAgIHJldHVybiB0aW1lID4gdGhpcy5taW5UaW1lICYmIHRpbWUgPCB0aGlzLm1heFRpbWU7XG4gICAgfVxuICB9XSk7XG5cbiAgcmV0dXJuIEFjdGlvbjtcbn0oKTtcblxuZXhwb3J0cy5kZWZhdWx0ID0gQWN0aW9uO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbGVhcm5pbmcvY29tcG9uZW50cy9hY3Rpb24uanNcbi8vIG1vZHVsZSBpZCA9IDVcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiJ3VzZSBzdHJpY3QnO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgdmFsdWU6IHRydWVcbn0pO1xuXG52YXIgX2NyZWF0ZUNsYXNzID0gZnVuY3Rpb24gKCkgeyBmdW5jdGlvbiBkZWZpbmVQcm9wZXJ0aWVzKHRhcmdldCwgcHJvcHMpIHsgZm9yICh2YXIgaSA9IDA7IGkgPCBwcm9wcy5sZW5ndGg7IGkrKykgeyB2YXIgZGVzY3JpcHRvciA9IHByb3BzW2ldOyBkZXNjcmlwdG9yLmVudW1lcmFibGUgPSBkZXNjcmlwdG9yLmVudW1lcmFibGUgfHwgZmFsc2U7IGRlc2NyaXB0b3IuY29uZmlndXJhYmxlID0gdHJ1ZTsgaWYgKFwidmFsdWVcIiBpbiBkZXNjcmlwdG9yKSBkZXNjcmlwdG9yLndyaXRhYmxlID0gdHJ1ZTsgT2JqZWN0LmRlZmluZVByb3BlcnR5KHRhcmdldCwgZGVzY3JpcHRvci5rZXksIGRlc2NyaXB0b3IpOyB9IH0gcmV0dXJuIGZ1bmN0aW9uIChDb25zdHJ1Y3RvciwgcHJvdG9Qcm9wcywgc3RhdGljUHJvcHMpIHsgaWYgKHByb3RvUHJvcHMpIGRlZmluZVByb3BlcnRpZXMoQ29uc3RydWN0b3IucHJvdG90eXBlLCBwcm90b1Byb3BzKTsgaWYgKHN0YXRpY1Byb3BzKSBkZWZpbmVQcm9wZXJ0aWVzKENvbnN0cnVjdG9yLCBzdGF0aWNQcm9wcyk7IHJldHVybiBDb25zdHJ1Y3RvcjsgfTsgfSgpO1xuXG52YXIgX2FjdGlvbiA9IHJlcXVpcmUoJy4vYWN0aW9uJyk7XG5cbnZhciBfYWN0aW9uMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX2FjdGlvbik7XG5cbmZ1bmN0aW9uIF9pbnRlcm9wUmVxdWlyZURlZmF1bHQob2JqKSB7IHJldHVybiBvYmogJiYgb2JqLl9fZXNNb2R1bGUgPyBvYmogOiB7IGRlZmF1bHQ6IG9iaiB9OyB9XG5cbmZ1bmN0aW9uIF90b0NvbnN1bWFibGVBcnJheShhcnIpIHsgaWYgKEFycmF5LmlzQXJyYXkoYXJyKSkgeyBmb3IgKHZhciBpID0gMCwgYXJyMiA9IEFycmF5KGFyci5sZW5ndGgpOyBpIDwgYXJyLmxlbmd0aDsgaSsrKSB7IGFycjJbaV0gPSBhcnJbaV07IH0gcmV0dXJuIGFycjI7IH0gZWxzZSB7IHJldHVybiBBcnJheS5mcm9tKGFycik7IH0gfVxuXG5mdW5jdGlvbiBfY2xhc3NDYWxsQ2hlY2soaW5zdGFuY2UsIENvbnN0cnVjdG9yKSB7IGlmICghKGluc3RhbmNlIGluc3RhbmNlb2YgQ29uc3RydWN0b3IpKSB7IHRocm93IG5ldyBUeXBlRXJyb3IoXCJDYW5ub3QgY2FsbCBhIGNsYXNzIGFzIGEgZnVuY3Rpb25cIik7IH0gfVxuXG52YXIgRXZlbnQgPSBmdW5jdGlvbiAoKSB7XG4gIGZ1bmN0aW9uIEV2ZW50KGRhdGEpIHtcbiAgICBfY2xhc3NDYWxsQ2hlY2sodGhpcywgRXZlbnQpO1xuXG4gICAgdGhpcy5pZCA9IGRhdGEuaWQ7XG4gICAgdGhpcy5uYW1lID0gZGF0YS5uYW1lO1xuICAgIHRoaXMuZGVzY3JpcHRpb24gPSBkYXRhLmRlc2NyaXB0aW9uO1xuICAgIHRoaXMuYWN0aW9ucyA9IGRhdGEuYWN0aW9ucy5tYXAoZnVuY3Rpb24gKGFjdGlvbikge1xuICAgICAgcmV0dXJuIG5ldyBfYWN0aW9uMi5kZWZhdWx0KGFjdGlvbik7XG4gICAgfSk7XG4gIH1cblxuICBfY3JlYXRlQ2xhc3MoRXZlbnQsIFt7XG4gICAga2V5OiAnZ2V0SW5hY3RpdmVUaW1lJyxcbiAgICB2YWx1ZTogZnVuY3Rpb24gZ2V0SW5hY3RpdmVUaW1lKCkge1xuICAgICAgdmFyIHRpbWVzID0gdGhpcy5nZXRBbGxBY3Rpb25UaW1lcygpO1xuICAgICAgcmV0dXJuIE1hdGgubWF4LmFwcGx5KE1hdGgsIF90b0NvbnN1bWFibGVBcnJheSh0aW1lcykpO1xuICAgIH1cbiAgfSwge1xuICAgIGtleTogJ2dldEluYWN0aXZlQWN0aW9uJyxcbiAgICB2YWx1ZTogZnVuY3Rpb24gZ2V0SW5hY3RpdmVBY3Rpb24oKSB7XG4gICAgICByZXR1cm4gdGhpcy5hY3Rpb25zLmZpbmQoZnVuY3Rpb24gKGFjdGlvbikge1xuICAgICAgICByZXR1cm4gYWN0aW9uLmluYWN0aXZlID09PSB0cnVlO1xuICAgICAgfSk7XG4gICAgfVxuICB9LCB7XG4gICAga2V5OiAnZ2V0QWxsQWN0aW9uVGltZXMnLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBnZXRBbGxBY3Rpb25UaW1lcygpIHtcbiAgICAgIHJldHVybiB0aGlzLmFjdGlvbnMubWFwKGZ1bmN0aW9uIChhY3Rpb24pIHtcbiAgICAgICAgcmV0dXJuIGFjdGlvbi5tYXhUaW1lIHx8IDA7XG4gICAgICB9KTtcbiAgICB9XG4gIH0sIHtcbiAgICBrZXk6ICdoYW5kbGVJbnB1dCcsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIGhhbmRsZUlucHV0KGRhdGEsIHRpbWUpIHtcbiAgICAgIHZhciBzdWl0ZWRBY3Rpb25zID0gdGhpcy5hY3Rpb25zLmZpbHRlcihmdW5jdGlvbiAoYWN0aW9uKSB7XG4gICAgICAgIHJldHVybiBhY3Rpb24uaXNTdWl0YWJsZShkYXRhLCB0aW1lKTtcbiAgICAgIH0pO1xuICAgICAgaWYgKHN1aXRlZEFjdGlvbnMpIHtcbiAgICAgICAgcmV0dXJuIHN1aXRlZEFjdGlvbnNbMF0ubmV4dFN0YXRlO1xuICAgICAgfVxuICAgIH1cbiAgfV0pO1xuXG4gIHJldHVybiBFdmVudDtcbn0oKTtcblxuZXhwb3J0cy5kZWZhdWx0ID0gRXZlbnQ7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9sZWFybmluZy9jb21wb25lbnRzL2V2ZW50LmpzXG4vLyBtb2R1bGUgaWQgPSA2XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIid1c2Ugc3RyaWN0JztcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcblxudmFyIF9ldmVudCA9IHJlcXVpcmUoJy4vZXZlbnQnKTtcblxudmFyIF9ldmVudDIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9ldmVudCk7XG5cbmZ1bmN0aW9uIF9pbnRlcm9wUmVxdWlyZURlZmF1bHQob2JqKSB7IHJldHVybiBvYmogJiYgb2JqLl9fZXNNb2R1bGUgPyBvYmogOiB7IGRlZmF1bHQ6IG9iaiB9OyB9XG5cbmZ1bmN0aW9uIF9jbGFzc0NhbGxDaGVjayhpbnN0YW5jZSwgQ29uc3RydWN0b3IpIHsgaWYgKCEoaW5zdGFuY2UgaW5zdGFuY2VvZiBDb25zdHJ1Y3RvcikpIHsgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkNhbm5vdCBjYWxsIGEgY2xhc3MgYXMgYSBmdW5jdGlvblwiKTsgfSB9XG5cbnZhciBTdGF0ZSA9IGZ1bmN0aW9uIFN0YXRlKGRhdGEpIHtcbiAgX2NsYXNzQ2FsbENoZWNrKHRoaXMsIFN0YXRlKTtcblxuICB0aGlzLmlkID0gZGF0YS5pZDtcbiAgdGhpcy5uYW1lID0gZGF0YS5uYW1lO1xuICB0aGlzLmltZyA9IGRhdGEuaW1nO1xuICB0aGlzLnBhcmFtcyA9IGRhdGEucGFyYW1zO1xuXG4gIGlmIChkYXRhLmxhc3QpIHtcbiAgICB0aGlzLmxhc3QgPSB0cnVlO1xuICAgIHRoaXMuZXZlbnQgPSBudWxsO1xuICB9IGVsc2Uge1xuICAgIHRoaXMuZXZlbnQgPSBuZXcgX2V2ZW50Mi5kZWZhdWx0KGRhdGEuZXZlbnQpO1xuICAgIHRoaXMubGFzdCA9IGZhbHNlO1xuICB9XG59O1xuXG5leHBvcnRzLmRlZmF1bHQgPSBTdGF0ZTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL2xlYXJuaW5nL2NvbXBvbmVudHMvc3RhdGUuanNcbi8vIG1vZHVsZSBpZCA9IDdcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiJ3VzZSBzdHJpY3QnO1xuXG5yZXF1aXJlKCcuLi9zYXNzL2xlYXJuaW5nLnNjc3MnKTtcblxudmFyIF9wdWJzdWIgPSByZXF1aXJlKCcuL3V0aWxzL3B1YnN1YicpO1xuXG52YXIgX3B1YnN1YjIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9wdWJzdWIpO1xuXG52YXIgX2FqYXggPSByZXF1aXJlKCcuL3V0aWxzL2FqYXgnKTtcblxudmFyIF9hamF4MiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX2FqYXgpO1xuXG52YXIgX3NjZW5lID0gcmVxdWlyZSgnLi9sZWFybmluZy9zY2VuZScpO1xuXG52YXIgX3NjZW5lMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX3NjZW5lKTtcblxudmFyIF9tb2RlbCA9IHJlcXVpcmUoJy4vbGVhcm5pbmcvbW9kZWwnKTtcblxudmFyIF9tb2RlbDIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9tb2RlbCk7XG5cbmZ1bmN0aW9uIF9pbnRlcm9wUmVxdWlyZURlZmF1bHQob2JqKSB7IHJldHVybiBvYmogJiYgb2JqLl9fZXNNb2R1bGUgPyBvYmogOiB7IGRlZmF1bHQ6IG9iaiB9OyB9XG5cbnZhciBzY2VuZSA9IG5ldyBfc2NlbmUyLmRlZmF1bHQoZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLm1vZGVsLW5hbWUnKSwgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLm1vZGVsLXN0YXRlLWltZycpLCBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcubW9kZWwtcGFyYW1zLXZhbHVlcycpLCBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcubW9kZWwtZXZlbnQnKSwgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLm1vZGVsLXJlc3BvbnNlJyksIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy50b29scy1saXN0JykpO1xuXG4vKipcclxuICogTG9hZCBtb2RlbCB3aXRoIGdpdmVuIGlkXHJcbiAqL1xuZnVuY3Rpb24gbG9hZE1vZGVsKGlkKSB7XG4gIHJldHVybiAoMCwgX2FqYXgyLmRlZmF1bHQpKCcvbW9kZWxzLycgKyBpZCkudGhlbihmdW5jdGlvbiAocmVzcG9uc2UpIHtcbiAgICByZXR1cm4gSlNPTi5wYXJzZShyZXNwb25zZSk7XG4gIH0pO1xufVxuXG5mdW5jdGlvbiB0b2dnbGVDb250cm9sQnV0dG9ucygpIHtcbiAgJHN0YXJ0QnV0dG9uLmRpc2FibGVkID0gISRzdGFydEJ1dHRvbi5kaXNhYmxlZDtcbiAgJHN0b3BCdXR0b24uZGlzYWJsZWQgPSAhJHN0b3BCdXR0b24uZGlzYWJsZWQ7XG59XG5cbi8qKlxyXG4gKiBVSSBidXR0b24ncyBoYW5kbGVyc1xyXG4gKi9cbnZhciAkbG9hZEJ1dHRvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNsb2FkLW1vZGVsLWJ0bicpO1xudmFyICRzZWxlY3QgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI21vZGVsLXNlbGVjdFwiKTtcbnZhciBtb2RlbCA9IHt9O1xuJGxvYWRCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbiAoKSB7XG4gIHZhciBtb2RlbElkID0gJHNlbGVjdC52YWx1ZTtcbiAgbG9hZE1vZGVsKG1vZGVsSWQpLnRoZW4oZnVuY3Rpb24gKHJlc3BvbnNlKSB7XG4gICAgbW9kZWwgPSBuZXcgX21vZGVsMi5kZWZhdWx0KHJlc3BvbnNlKTtcbiAgICBzY2VuZS5pbml0KG1vZGVsKS5pbml0VG9vbHMocmVzcG9uc2UudG9vbHMpO1xuICAgIHRvZ2dsZUNvbnRyb2xCdXR0b25zKCk7XG4gIH0pLmNhdGNoKGZ1bmN0aW9uIChlcnIpIHtcbiAgICBjb25zb2xlLmVycm9yKGVycik7XG4gIH0pO1xufSk7XG5cbnZhciAkc3RhcnRCdXR0b24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjc3RhcnQtYnRuJyk7XG4kc3RhcnRCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbiAoKSB7XG4gIG1vZGVsLnN0YXJ0KCk7XG59KTtcblxudmFyICRzdG9wQnV0dG9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3N0b3AtYnRuJyk7XG4kc3RvcEJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZ1bmN0aW9uICgpIHtcbiAgbW9kZWwuc3RvcCgpOyAvLyBUT0RPXG59KTtcblxudmFyICRydW5CdXR0b24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjcnVuLWJ0bicpO1xuJHJ1bkJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZ1bmN0aW9uICgpIHtcbiAgdmFyIHRvb2xzRGF0YSA9IHNjZW5lLmdldFRvb2xzRGF0YSgpO1xuICBfcHVic3ViMi5kZWZhdWx0LnB1Ymxpc2goJ3VzZXJfaW5wdXQnLCB0b29sc0RhdGEpO1xufSk7XG5cbi8qKlxyXG4gKiBIYW5kbGUgY3VzdG9tIGV2ZW50cyBoZXJlICh1c2VyIGlucHV0LCBwcm9ncmFtbSBtZXNzYWdlcyBldGMuKVxyXG4gKi9cbl9wdWJzdWIyLmRlZmF1bHQuc3Vic2NyaWJlKCduZXdfc3RhdGUnLCBmdW5jdGlvbiAoc3RhdGUpIHtcbiAgcmV0dXJuIHNjZW5lLnNldFN0YXRlKHN0YXRlKTtcbn0pO1xuX3B1YnN1YjIuZGVmYXVsdC5zdWJzY3JpYmUoJ2V2ZW50JywgZnVuY3Rpb24gKGRhdGEpIHtcbiAgcmV0dXJuIHNjZW5lLnNldEV2ZW50KGRhdGEuZXZlbnQpO1xufSk7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9sZWFybmluZy5qc1xuLy8gbW9kdWxlIGlkID0gOFxuLy8gbW9kdWxlIGNodW5rcyA9IDAiXSwibWFwcGluZ3MiOiI7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7OztBQ2hFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7QUNuQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7O0FDN0hBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7QUN2TUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7QUNuQ0E7Ozs7Ozs7QUNBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7OztBQ3pEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7QUNqRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7OztBQy9CQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Iiwic291cmNlUm9vdCI6IiJ9