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
/******/ 	return __webpack_require__(__webpack_require__.s = 14);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
var nodeFactory = function nodeFactory() {
  var type = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'div';
  var params = arguments[1];

  var node = document.createElement(type);

  appendClasses(node, params);
  appendAttrs(node, params);
  insertTextContent(node, params);

  return node;
};

function appendClasses(node, _ref) {
  var classList = _ref.classList;

  if (classList && classList.forEach) {
    classList.forEach(function (className) {
      return node.classList.add(className);
    });
  }
}

function appendAttrs(node, _ref2) {
  var attrs = _ref2.attrs;

  if (attrs) {
    var attrNames = Object.keys(attrs);
    attrNames.forEach(function (attrName) {
      return node.setAttribute(attrName, attrs[attrName]);
    });
  }
}

function insertTextContent(node, _ref3) {
  var _ref3$textContent = _ref3.textContent,
      textContent = _ref3$textContent === undefined ? "" : _ref3$textContent;

  node.textContent = textContent;
}

exports.default = nodeFactory;

/***/ }),
/* 1 */
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
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _state = __webpack_require__(9);

var _state2 = _interopRequireDefault(_state);

var _pubsub = __webpack_require__(1);

var _pubsub2 = _interopRequireDefault(_pubsub);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var INITIAL_STATE_NAME = 'Состояние модели';
var STOP_STATE_NAME = 'Обучение остановлено';

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
    this.initialState = data.initialState;
    this.currentState = this.getState(this.initialState);

    this.timeout = null;
    this.subInput = null;
    this.subStop = null;
    this.startState = new _state2.default({ id: 0, name: INITIAL_STATE_NAME, img: 'img/start.png', last: true });
    this.stopState = new _state2.default({ id: -1, name: STOP_STATE_NAME, img: 'img/stop.png', last: true });
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

      this.currentState = this.getState(this.initialState);
      _pubsub2.default.publish('new_state', this.currentState);
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
        return _this.handleNewState(state);
      });
      return intervals;
    }
  }, {
    key: 'makeBreak',
    value: function makeBreak() {
      var _this2 = this;

      return new Promise(function (resolve, reject) {
        _this2.subStop = _pubsub2.default.subscribe('model_stop', function () {
          reject(_this2.stopState);
        });
        setTimeout(function () {
          _this2.clearSubs();
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
        _pubsub2.default.publish('event', event);

        // listen to user action
        // and if user input correct go to next state
        _this3.subInput = _pubsub2.default.subscribe('user_input', function (data) {
          var timeSpent = Date.now() - eventStartTime;
          var nextStateId = _this3.currentState.handleInput(data, timeSpent);
          var nextState = _this3.getState(nextStateId);
          if (nextState) {
            nextState.last ? reject(nextState) : resolve(nextState);
          }
        });

        _this3.subStop = _pubsub2.default.subscribe('model_stop', function () {
          reject(_this3.stopState);
        });

        // handle inactive
        var inactiveTime = _this3.currentState.getInactiveTime();
        _this3.timeout = setTimeout(function () {
          var nextStateId = _this3.currentState.getInactiveAction().nextState;
          var nextState = _this3.getState(nextStateId);
          nextState.last ? reject(nextState) : resolve(nextState);
        }, inactiveTime);
      });
    }
  }, {
    key: 'stop',
    value: function stop() {
      _pubsub2.default.publish('model_stop');
    }
  }, {
    key: 'handleNewState',
    value: function handleNewState(state) {
      this.currentState = state;
      clearTimeout(this.timeout);
      this.clearSubs();
      _pubsub2.default.publish('new_state', state);
    }
  }, {
    key: 'clearSubs',
    value: function clearSubs() {
      if (this.subInput) {
        this.subInput.remove();
      }
      if (this.subStop) {
        this.subStop.remove();
      }
    }
  }]);

  return Model;
}();

exports.default = Model;

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _state = __webpack_require__(10);

var _state2 = _interopRequireDefault(_state);

var _tools = __webpack_require__(11);

var _tools2 = _interopRequireDefault(_tools);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _exports = {};

// Scene metadata
var $modelName = document.querySelector('.model-name');
_exports.init = function (model, response) {
  $modelName.textContent = model.name;
  _state2.default.set(model.startState);
  _tools2.default.init(response.tools);
  return this;
};

// Manage content visibility
var $content = document.querySelector('.content');
_exports.showContent = function () {
  setContentDisplay('flex');
  return this;
};
_exports.hideContent = function () {
  setContentDisplay('none');
  return this;
};
function setContentDisplay(display) {
  $content.style.display = display;
}

// Manage buttons state
_exports.enableButtons = function () {
  for (var _len = arguments.length, buttons = Array(_len), _key = 0; _key < _len; _key++) {
    buttons[_key] = arguments[_key];
  }

  setButtonsState(buttons, false);
  return this;
};
_exports.disableButtons = function () {
  for (var _len2 = arguments.length, buttons = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
    buttons[_key2] = arguments[_key2];
  }

  setButtonsState(buttons, true);
  return this;
};
function setButtonsState(buttons, value) {
  buttons.forEach(function (button) {
    return button.disabled = value;
  });
}

// Delegate public methods to components
_exports.getToolsData = function () {
  return _tools2.default.getToolsData();
};

_exports.setState = function (stateData) {
  return _state2.default.set(stateData);
};

_exports.showEvent = function (eventData) {
  return _state2.default.showEvent(eventData);
};

_exports.hideEvent = function () {
  return _state2.default.hideEvent();
};

exports.default = _exports;

/***/ }),
/* 4 */
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
/* 5 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 6 */,
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Action = function () {
  function Action(data) {
    _classCallCheck(this, Action);

    this.minTime = data.minTime;
    this.maxTime = data.maxTime;
    this.nextState = data.nextState;
    if (data.inactive) {
      this.inactive = true;
      this.tools = [];
    } else {
      this.inactive = false;
      this.tools = data.tools;
    }
  }

  /**
   * @param [{ id: Number, value: Number/Boolean }, {...}]
   * @param Number
   * @return Boolean
   */


  _createClass(Action, [{
    key: 'isSuitable',
    value: function isSuitable(data, time) {
      return this.rightTime(time) && this.rightData(data);
    }
  }, {
    key: 'rightData',
    value: function rightData() {
      var _this = this;

      var data = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];

      if (!Array.isArray(data)) {
        throw new TypeError('Invalid type of data from tools. Expected array, got ' + (typeof data === 'undefined' ? 'undefined' : _typeof(data)));
      }
      return this.tools.every(function (tool) {
        // Если среди полученных итемов нет, того который есть в данном экшене
        var checkTool = data.find(function (obj) {
          return obj.id == tool.id;
        });
        if (!checkTool) {
          return false;
        }

        // Для переключателя
        if (typeof tool.value === 'boolean') {
          return checkTool.value === tool.value;
        }

        // Для ренджа
        if (Array.isArray(tool.value)) {
          return _this.includesValue(checkTool.value, tool.value);
        }

        return false;
      });
    }
  }, {
    key: 'includesValue',
    value: function includesValue(value, borders) {
      if (typeof value !== 'number') throw new TypeError('Value should be integer');
      return value >= borders[0] && value <= borders[1];
    }
  }, {
    key: 'rightTime',
    value: function rightTime(time) {
      if (typeof time !== 'number') throw new TypeError('Time should be integer (ms)');
      return time >= this.minTime && time <= this.maxTime;
    }
  }]);

  return Action;
}();

exports.default = Action;

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Event = function Event(data) {
  _classCallCheck(this, Event);

  this.id = data.id;
  this.name = data.name;
  this.description = data.description;
};

exports.default = Event;

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _event = __webpack_require__(8);

var _event2 = _interopRequireDefault(_event);

var _action = __webpack_require__(7);

var _action2 = _interopRequireDefault(_action);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var State = function () {
  function State(data) {
    _classCallCheck(this, State);

    this.id = data.id;
    this.name = data.name;
    this.img = data.img;
    this.params = data.params;

    if (data.last) {
      this.last = true;
      this.event = null;
      this.actions = null;
    } else {
      this.event = new _event2.default(data.event);
      this.actions = data.actions.map(function (action) {
        return new _action2.default(action);
      });
      this.last = false;
    }
  }

  _createClass(State, [{
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
      if (suitedActions.length > 0) {
        return suitedActions[0].nextState;
      }
      return null;
    }
  }]);

  return State;
}();

exports.default = State;

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _nodeFactory = __webpack_require__(0);

var _nodeFactory2 = _interopRequireDefault(_nodeFactory);

var _timer = __webpack_require__(12);

var _timer2 = _interopRequireDefault(_timer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var $name = document.querySelector('.model-state-name');
var $img = document.querySelector('.model-state-img');
var $params = document.querySelector('.model-params-values');

var $event = document.querySelector('.model-event');
var $eventHeader = $event.querySelector('.model-event-name span');
var $eventBody = $event.querySelector('.model-event-info');

var $timerContainer = document.querySelector('.model-timer');
$timerContainer.appendChild(_timer2.default.node);

function set(_ref) {
  var name = _ref.name,
      img = _ref.img,
      params = _ref.params;

  $name.textContent = name;
  $img.setAttribute('src', img);
  setParameters(params);
}

function setParameters(params) {
  var frag = document.createDocumentFragment();
  for (var key in params) {
    frag.appendChild(createParameteNode(key, params[key]));
  }
  $params.innerHTML = "";
  $params.appendChild(frag);
}

function createParameteNode(key, value) {
  var div = (0, _nodeFactory2.default)('div', { classList: ['parameter'] });

  var keySpan = (0, _nodeFactory2.default)('span', { textContent: key });
  div.appendChild(keySpan);

  var valueSpan = (0, _nodeFactory2.default)('span', { textContent: value });
  div.appendChild(valueSpan);

  return div;
}

/** Sets event data to UI */
function showEvent(event) {
  $eventHeader.textContent = event.name;
  $eventBody.textContent = event.description;
  $event.classList.remove('is-hidden', 'slide-top');
  showTimer();
}
function hideEvent() {
  $event.classList.add('is-hidden', 'slide-top');
  hideTimer();
}

function showTimer() {
  $timerContainer.classList.remove('is-hidden');
  _timer2.default.start();
}
function hideTimer() {
  $timerContainer.classList.add('is-hidden');
  _timer2.default.stop();
}

exports.default = {
  set: set,
  showEvent: showEvent,
  hideEvent: hideEvent
};

/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _nodeFactory = __webpack_require__(0);

var _nodeFactory2 = _interopRequireDefault(_nodeFactory);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var toolTypes = {
  RANGE: 'range',
  SWITCH: 'switch'
};
var $tools = document.querySelector('.tools-list');

function init(tools) {
  var fragment = document.createDocumentFragment();

  tools.forEach(function (tool) {
    // create tool wrapper
    var div = (0, _nodeFactory2.default)('div', { classList: ['tool'] });

    var label = (0, _nodeFactory2.default)('label', {
      classList: ['tool-name'],
      attrs: { "for": tool.name },
      textContent: tool.name
    });
    div.appendChild(label);

    var toolNode = createToolNode(tool);
    div.appendChild(toolNode);

    fragment.appendChild(div);
  });

  $tools.innerHTML = "";
  $tools.appendChild(fragment);
}

function createToolNode(tool) {
  switch (tool.type) {
    case toolTypes.RANGE:
      return createRangeTool(tool);
    case toolTypes.SWITCH:
      return createSwitchTool(tool);
    default:
      return 'Неизвестный прибор';
  }
}

function createRangeTool(tool) {
  var divInput = (0, _nodeFactory2.default)('div', { classList: ['range'] });

  var spanMin = (0, _nodeFactory2.default)('span', { textContent: tool.min });
  divInput.appendChild(spanMin);

  var input = (0, _nodeFactory2.default)('input', {
    attrs: {
      'data-id': tool.id,
      'data-type': 'range',
      'name': tool.name,
      'type': 'range',
      'min': tool.min,
      'max': tool.max
    }
  });
  divInput.appendChild(input);

  var spanMax = (0, _nodeFactory2.default)('span', { textContent: tool.max });
  divInput.appendChild(spanMax);

  var divCurrent = (0, _nodeFactory2.default)('div', { classList: ['range-current-value'] });
  var spanCurrent = (0, _nodeFactory2.default)('span', { textContent: input.value });
  divCurrent.appendChild(spanCurrent);

  input.addEventListener('input', function (evt) {
    spanCurrent.textContent = evt.target.value;
  });

  var fragment = document.createDocumentFragment();
  fragment.appendChild(divInput);
  fragment.appendChild(divCurrent);

  return fragment;
}

function createSwitchTool(tool) {
  var label = (0, _nodeFactory2.default)('label', { classList: ['switch'] });

  var input = (0, _nodeFactory2.default)('input', {
    attrs: {
      'data-id': tool.id,
      'data-type': 'switch',
      'type': 'checkbox'
    }
  });
  label.appendChild(input);

  var div = (0, _nodeFactory2.default)('div', { classList: ['slider'] });
  label.appendChild(div);

  return label;
}

function getToolsData() {
  var toolsData = [];
  var inputs = $tools.querySelectorAll('input[data-id]');
  inputs.forEach(function (input) {
    var _input$dataset = input.dataset,
        id = _input$dataset.id,
        type = _input$dataset.type;

    var value = void 0;
    switch (type) {
      case toolTypes.RANGE:
        value = parseInt(input.value);break;
      case toolTypes.SWITCH:
        value = input.checked;break;
      default:
        throw new Error('\u041D\u0435\u043A\u043E\u0440\u0440\u0435\u043A\u0442\u043D\u044B\u0439 \u0442\u0438\u043F \u043F\u0440\u0438\u0431\u043E\u0440\u0430. ID: ' + id);
    }
    toolsData.push({ id: id, value: value });
  });
  return toolsData;
}

exports.default = {
  init: init,
  getToolsData: getToolsData
};

/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _nodeFactory = __webpack_require__(0);

var _nodeFactory2 = _interopRequireDefault(_nodeFactory);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function msToContent(ms) {
  var seconds = Math.round(ms / 1000);
  var mins = Math.floor(seconds / 60);
  var secondsLeft = seconds - mins * 60;

  return mins + ':' + (secondsLeft >= 10 ? '' : '0') + secondsLeft;
}

var timer = {
  startTime: null,
  interval: null,
  node: (0, _nodeFactory2.default)('span', { classList: ['timer'], textContent: '0:00' }),
  start: function start() {
    var _this = this;

    this.startTime = Date.now();
    this.interval = setInterval(function () {
      var elapsed = Date.now() - _this.startTime;
      _this.node.textContent = msToContent(elapsed);
    }, 1000);
  },
  stop: function stop() {
    if (!this.startTime) {
      return;
    }
    this.startTime = null;
    clearInterval(this.interval);
    this.node.textContent = '0:00';
  }
};

exports.default = timer;

/***/ }),
/* 13 */,
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


__webpack_require__(5);

var _pubsub = __webpack_require__(1);

var _pubsub2 = _interopRequireDefault(_pubsub);

var _ajax = __webpack_require__(4);

var _ajax2 = _interopRequireDefault(_ajax);

var _scene = __webpack_require__(3);

var _scene2 = _interopRequireDefault(_scene);

var _model = __webpack_require__(2);

var _model2 = _interopRequireDefault(_model);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Load model with given id
 */
function loadModel(id) {
  return (0, _ajax2.default)('/models/' + id).then(function (response) {
    return JSON.parse(response);
  });
}

/**
 * UI button's handlers
 */
var $select = document.querySelector("#model-select");
var $loadButton = document.querySelector('#load-model-btn');
var model = null;
$loadButton.addEventListener('click', function () {
  if (model) {
    model.stop();
  }
  var modelId = $select.value;
  loadModel(modelId).then(function (response) {
    model = new _model2.default(response);
    _scene2.default.init(model, response).showContent().enableButtons($startButton).disableButtons($stopButton, $runButton);
  }).catch(function (err) {
    console.error(err);
  });
});
//
var $startButton = document.querySelector('#start-btn');
$startButton.addEventListener('click', function () {
  model.start();
  _scene2.default.disableButtons($startButton);
  _scene2.default.enableButtons($stopButton, $runButton);
});

var $stopButton = document.querySelector('#stop-btn');
$stopButton.addEventListener('click', function () {
  model.stop();
  _scene2.default.enableButtons($startButton);
  _scene2.default.disableButtons($stopButton, $runButton);
});

var $runButton = document.querySelector('#run-btn');
$runButton.addEventListener('click', function () {
  var toolsData = _scene2.default.getToolsData();
  _pubsub2.default.publish('user_input', toolsData);
});

/**
 * Handle custom events here (user input, programm messages etc.)
 */
_pubsub2.default.subscribe('new_state', function (state) {
  _scene2.default.hideEvent();
  _scene2.default.setState(state);
});
_pubsub2.default.subscribe('event', function (event) {
  return _scene2.default.showEvent(event);
});

// /**
// * Timer (currently for dev mode only)
// */
// import timer from '../utils/timer';
// document.querySelector('.header').appendChild(timer.node);
// pubsub.subscribe('new_state', state => timer.stop());
// pubsub.subscribe('event', event => timer.start());

/***/ })
/******/ ]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgYTQ3Nzc1NzNkNGZiNWZlMjkzOWQiLCJ3ZWJwYWNrOi8vLy4vdXRpbHMvbm9kZUZhY3RvcnkuanMiLCJ3ZWJwYWNrOi8vLy4vdXRpbHMvcHVic3ViLmpzIiwid2VicGFjazovLy8uL2xlYXJuaW5nL21vZGVsLmpzIiwid2VicGFjazovLy8uL2xlYXJuaW5nL3NjZW5lLmpzIiwid2VicGFjazovLy8uL3V0aWxzL2FqYXguanMiLCJ3ZWJwYWNrOi8vLy4uL3Nhc3MvbGVhcm5pbmcuc2NzcyIsIndlYnBhY2s6Ly8vLi9sZWFybmluZy9tb2RlbF9jb21wb25lbnRzL2FjdGlvbi5qcyIsIndlYnBhY2s6Ly8vLi9sZWFybmluZy9tb2RlbF9jb21wb25lbnRzL2V2ZW50LmpzIiwid2VicGFjazovLy8uL2xlYXJuaW5nL21vZGVsX2NvbXBvbmVudHMvc3RhdGUuanMiLCJ3ZWJwYWNrOi8vLy4vbGVhcm5pbmcvc2NlbmVfY29tcG9uZW50cy9zdGF0ZS5qcyIsIndlYnBhY2s6Ly8vLi9sZWFybmluZy9zY2VuZV9jb21wb25lbnRzL3Rvb2xzLmpzIiwid2VicGFjazovLy8uL3V0aWxzL3RpbWVyLmpzIiwid2VicGFjazovLy8uL2xlYXJuaW5nL2luZGV4LmpzIl0sIm5hbWVzIjpbIm5vZGVGYWN0b3J5IiwidHlwZSIsInBhcmFtcyIsIm5vZGUiLCJkb2N1bWVudCIsImNyZWF0ZUVsZW1lbnQiLCJhcHBlbmRDbGFzc2VzIiwiYXBwZW5kQXR0cnMiLCJpbnNlcnRUZXh0Q29udGVudCIsImNsYXNzTGlzdCIsImZvckVhY2giLCJhZGQiLCJjbGFzc05hbWUiLCJhdHRycyIsImF0dHJOYW1lcyIsIk9iamVjdCIsImtleXMiLCJzZXRBdHRyaWJ1dGUiLCJhdHRyTmFtZSIsInRleHRDb250ZW50IiwicHVic3ViIiwidG9waWNzIiwic3Vic2NyaWJlIiwidG9waWMiLCJsaXN0ZW5lciIsInF1ZXVlIiwiaW5kZXgiLCJwdXNoIiwicmVtb3ZlIiwicHVibGlzaCIsImluZm8iLCJsZW5ndGgiLCJpdGVtcyIsIml0ZW0iLCJJTklUSUFMX1NUQVRFX05BTUUiLCJTVE9QX1NUQVRFX05BTUUiLCJNb2RlbCIsImRhdGEiLCJpZCIsIm5hbWUiLCJicmVha1RpbWUiLCJzdGVwcyIsInN0YXRlcyIsIm1hcCIsInN0YXRlIiwiaW5pdGlhbFN0YXRlIiwiY3VycmVudFN0YXRlIiwiZ2V0U3RhdGUiLCJ0aW1lb3V0Iiwic3ViSW5wdXQiLCJzdWJTdG9wIiwic3RhcnRTdGF0ZSIsImltZyIsImxhc3QiLCJzdG9wU3RhdGUiLCJmaW5kIiwiaW50ZXJ2YWxzIiwiUHJvbWlzZSIsInJlc29sdmUiLCJpIiwidGhlbiIsIm1ha2VCcmVhayIsImhhbmRsZUV2ZW50IiwiaGFuZGxlTmV3U3RhdGUiLCJjYXRjaCIsInJlamVjdCIsInNldFRpbWVvdXQiLCJjbGVhclN1YnMiLCJldmVudCIsImV2ZW50U3RhcnRUaW1lIiwiRGF0ZSIsIm5vdyIsInRpbWVTcGVudCIsIm5leHRTdGF0ZUlkIiwiaGFuZGxlSW5wdXQiLCJuZXh0U3RhdGUiLCJpbmFjdGl2ZVRpbWUiLCJnZXRJbmFjdGl2ZVRpbWUiLCJnZXRJbmFjdGl2ZUFjdGlvbiIsImNsZWFyVGltZW91dCIsImV4cG9ydHMiLCIkbW9kZWxOYW1lIiwicXVlcnlTZWxlY3RvciIsImluaXQiLCJtb2RlbCIsInJlc3BvbnNlIiwic2V0IiwidG9vbHMiLCIkY29udGVudCIsInNob3dDb250ZW50Iiwic2V0Q29udGVudERpc3BsYXkiLCJoaWRlQ29udGVudCIsImRpc3BsYXkiLCJzdHlsZSIsImVuYWJsZUJ1dHRvbnMiLCJidXR0b25zIiwic2V0QnV0dG9uc1N0YXRlIiwiZGlzYWJsZUJ1dHRvbnMiLCJ2YWx1ZSIsImJ1dHRvbiIsImRpc2FibGVkIiwiZ2V0VG9vbHNEYXRhIiwic2V0U3RhdGUiLCJzdGF0ZURhdGEiLCJzaG93RXZlbnQiLCJldmVudERhdGEiLCJoaWRlRXZlbnQiLCJhamF4IiwicGF0aCIsIm9wdGlvbnMiLCJ4aHIiLCJYTUxIdHRwUmVxdWVzdCIsIm9wZW4iLCJtZXRob2QiLCJoZWFkZXJzIiwic2V0WEhSSGVhZGVycyIsInNlbmQiLCJvbnJlYWR5c3RhdGVjaGFuZ2UiLCJyZWFkeVN0YXRlIiwic3RhdHVzIiwicmVzcG9uc2VUZXh0Iiwic3RhdHVzVGV4dCIsImhlYWRlciIsInNldFJlcXVlc3RIZWFkZXIiLCJBY3Rpb24iLCJtaW5UaW1lIiwibWF4VGltZSIsImluYWN0aXZlIiwidGltZSIsInJpZ2h0VGltZSIsInJpZ2h0RGF0YSIsIkFycmF5IiwiaXNBcnJheSIsIlR5cGVFcnJvciIsImV2ZXJ5IiwiY2hlY2tUb29sIiwib2JqIiwidG9vbCIsImluY2x1ZGVzVmFsdWUiLCJib3JkZXJzIiwiRXZlbnQiLCJkZXNjcmlwdGlvbiIsIlN0YXRlIiwiYWN0aW9ucyIsImFjdGlvbiIsInRpbWVzIiwiZ2V0QWxsQWN0aW9uVGltZXMiLCJNYXRoIiwibWF4Iiwic3VpdGVkQWN0aW9ucyIsImZpbHRlciIsImlzU3VpdGFibGUiLCIkbmFtZSIsIiRpbWciLCIkcGFyYW1zIiwiJGV2ZW50IiwiJGV2ZW50SGVhZGVyIiwiJGV2ZW50Qm9keSIsIiR0aW1lckNvbnRhaW5lciIsImFwcGVuZENoaWxkIiwic2V0UGFyYW1ldGVycyIsImZyYWciLCJjcmVhdGVEb2N1bWVudEZyYWdtZW50Iiwia2V5IiwiY3JlYXRlUGFyYW1ldGVOb2RlIiwiaW5uZXJIVE1MIiwiZGl2Iiwia2V5U3BhbiIsInZhbHVlU3BhbiIsInNob3dUaW1lciIsImhpZGVUaW1lciIsInN0YXJ0Iiwic3RvcCIsInRvb2xUeXBlcyIsIlJBTkdFIiwiU1dJVENIIiwiJHRvb2xzIiwiZnJhZ21lbnQiLCJsYWJlbCIsInRvb2xOb2RlIiwiY3JlYXRlVG9vbE5vZGUiLCJjcmVhdGVSYW5nZVRvb2wiLCJjcmVhdGVTd2l0Y2hUb29sIiwiZGl2SW5wdXQiLCJzcGFuTWluIiwibWluIiwiaW5wdXQiLCJzcGFuTWF4IiwiZGl2Q3VycmVudCIsInNwYW5DdXJyZW50IiwiYWRkRXZlbnRMaXN0ZW5lciIsImV2dCIsInRhcmdldCIsInRvb2xzRGF0YSIsImlucHV0cyIsInF1ZXJ5U2VsZWN0b3JBbGwiLCJkYXRhc2V0IiwicGFyc2VJbnQiLCJjaGVja2VkIiwiRXJyb3IiLCJtc1RvQ29udGVudCIsIm1zIiwic2Vjb25kcyIsInJvdW5kIiwibWlucyIsImZsb29yIiwic2Vjb25kc0xlZnQiLCJ0aW1lciIsInN0YXJ0VGltZSIsImludGVydmFsIiwic2V0SW50ZXJ2YWwiLCJlbGFwc2VkIiwiY2xlYXJJbnRlcnZhbCIsImxvYWRNb2RlbCIsIkpTT04iLCJwYXJzZSIsIiRzZWxlY3QiLCIkbG9hZEJ1dHRvbiIsIm1vZGVsSWQiLCIkc3RhcnRCdXR0b24iLCIkc3RvcEJ1dHRvbiIsIiRydW5CdXR0b24iLCJjb25zb2xlIiwiZXJyb3IiLCJlcnIiXSwibWFwcGluZ3MiOiI7QUFBQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQSxtREFBMkMsY0FBYzs7QUFFekQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFLO0FBQ0w7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxtQ0FBMkIsMEJBQTBCLEVBQUU7QUFDdkQseUNBQWlDLGVBQWU7QUFDaEQ7QUFDQTtBQUNBOztBQUVBO0FBQ0EsOERBQXNELCtEQUErRDs7QUFFckg7QUFDQTs7QUFFQTtBQUNBOzs7Ozs7Ozs7Ozs7O0FDaEVBLElBQU1BLGNBQWMsU0FBZEEsV0FBYyxHQUErQjtBQUFBLE1BQXRCQyxJQUFzQix1RUFBZixLQUFlO0FBQUEsTUFBUkMsTUFBUTs7QUFDakQsTUFBTUMsT0FBT0MsU0FBU0MsYUFBVCxDQUF1QkosSUFBdkIsQ0FBYjs7QUFFQUssZ0JBQWNILElBQWQsRUFBb0JELE1BQXBCO0FBQ0FLLGNBQVlKLElBQVosRUFBa0JELE1BQWxCO0FBQ0FNLG9CQUFrQkwsSUFBbEIsRUFBd0JELE1BQXhCOztBQUVBLFNBQU9DLElBQVA7QUFDRCxDQVJEOztBQVVBLFNBQVNHLGFBQVQsQ0FBdUJILElBQXZCLFFBQTRDO0FBQUEsTUFBYk0sU0FBYSxRQUFiQSxTQUFhOztBQUMxQyxNQUFJQSxhQUFhQSxVQUFVQyxPQUEzQixFQUFvQztBQUNsQ0QsY0FBVUMsT0FBVixDQUFrQjtBQUFBLGFBQWFQLEtBQUtNLFNBQUwsQ0FBZUUsR0FBZixDQUFtQkMsU0FBbkIsQ0FBYjtBQUFBLEtBQWxCO0FBQ0Q7QUFDRjs7QUFFRCxTQUFTTCxXQUFULENBQXFCSixJQUFyQixTQUFzQztBQUFBLE1BQVRVLEtBQVMsU0FBVEEsS0FBUzs7QUFDcEMsTUFBSUEsS0FBSixFQUFXO0FBQ1QsUUFBTUMsWUFBWUMsT0FBT0MsSUFBUCxDQUFZSCxLQUFaLENBQWxCO0FBQ0FDLGNBQVVKLE9BQVYsQ0FBa0I7QUFBQSxhQUFZUCxLQUFLYyxZQUFMLENBQWtCQyxRQUFsQixFQUE0QkwsTUFBTUssUUFBTixDQUE1QixDQUFaO0FBQUEsS0FBbEI7QUFDRDtBQUNGOztBQUVELFNBQVNWLGlCQUFULENBQTJCTCxJQUEzQixTQUF1RDtBQUFBLGdDQUFwQmdCLFdBQW9CO0FBQUEsTUFBcEJBLFdBQW9CLHFDQUFOLEVBQU07O0FBQ3JEaEIsT0FBS2dCLFdBQUwsR0FBbUJBLFdBQW5CO0FBQ0Q7O2tCQUVjbkIsVzs7Ozs7Ozs7Ozs7O0FDM0JmLElBQU1vQixTQUFVLFlBQVc7O0FBRXpCLE1BQU1DLFNBQVMsRUFBZjs7QUFFQSxTQUFPO0FBQ0xDLGVBQVcsbUJBQVNDLEtBQVQsRUFBZ0JDLFFBQWhCLEVBQTBCO0FBQ25DLFVBQUksQ0FBQ0gsT0FBT0UsS0FBUCxDQUFMLEVBQW9CRixPQUFPRSxLQUFQLElBQWdCLEVBQUVFLE9BQU8sRUFBVCxFQUFoQjs7QUFFcEIsVUFBTUMsUUFBUUwsT0FBT0UsS0FBUCxFQUFjRSxLQUFkLENBQW9CRSxJQUFwQixDQUF5QkgsUUFBekIsSUFBcUMsQ0FBbkQ7QUFDQTtBQUNBLGFBQU87QUFDTEksZ0JBQVEsa0JBQVc7QUFDakIsaUJBQU9QLE9BQU9FLEtBQVAsRUFBY0UsS0FBZCxDQUFvQkMsS0FBcEIsQ0FBUDtBQUNEO0FBSEksT0FBUDtBQUtELEtBWEk7O0FBYUxHLGFBQVMsaUJBQVNOLEtBQVQsRUFBZ0JPLElBQWhCLEVBQXNCO0FBQzdCO0FBQ0EsVUFBSSxDQUFDVCxPQUFPRSxLQUFQLENBQUQsSUFBa0IsQ0FBQ0YsT0FBT0UsS0FBUCxFQUFjRSxLQUFkLENBQW9CTSxNQUEzQyxFQUFtRDs7QUFFbkQsVUFBTUMsUUFBUVgsT0FBT0UsS0FBUCxFQUFjRSxLQUE1QjtBQUNBTyxZQUFNdEIsT0FBTixDQUFjLGdCQUFRO0FBQ3BCdUIsYUFBS0gsUUFBUSxFQUFiO0FBQ0QsT0FGRDtBQUdEO0FBckJJLEdBQVA7QUF1QkQsQ0EzQmMsRUFBZjs7a0JBNkJlVixNOzs7Ozs7Ozs7Ozs7Ozs7QUM3QmY7Ozs7QUFDQTs7Ozs7Ozs7QUFFQSxJQUFNYyxxQkFBcUIsa0JBQTNCO0FBQ0EsSUFBTUMsa0JBQWtCLHNCQUF4Qjs7SUFFTUMsSztBQUNKLGlCQUFZQyxJQUFaLEVBQWtCO0FBQUE7O0FBQ2hCLFNBQUtDLEVBQUwsR0FBVUQsS0FBS0MsRUFBZjtBQUNBLFNBQUtDLElBQUwsR0FBWUYsS0FBS0UsSUFBakI7QUFDQSxTQUFLQyxTQUFMLEdBQWlCSCxLQUFLRyxTQUF0QjtBQUNBLFNBQUtDLEtBQUwsR0FBYUosS0FBS0ksS0FBbEI7O0FBRUEsU0FBS0MsTUFBTCxHQUFjTCxLQUFLSyxNQUFMLENBQVlDLEdBQVosQ0FBZ0I7QUFBQSxhQUFTLG9CQUFVQyxLQUFWLENBQVQ7QUFBQSxLQUFoQixDQUFkO0FBQ0EsU0FBS0MsWUFBTCxHQUFvQlIsS0FBS1EsWUFBekI7QUFDQSxTQUFLQyxZQUFMLEdBQW9CLEtBQUtDLFFBQUwsQ0FBYyxLQUFLRixZQUFuQixDQUFwQjs7QUFFQSxTQUFLRyxPQUFMLEdBQWUsSUFBZjtBQUNBLFNBQUtDLFFBQUwsR0FBZ0IsSUFBaEI7QUFDQSxTQUFLQyxPQUFMLEdBQWUsSUFBZjtBQUNBLFNBQUtDLFVBQUwsR0FBa0Isb0JBQVUsRUFBRWIsSUFBSSxDQUFOLEVBQVNDLE1BQU1MLGtCQUFmLEVBQW1Da0IsS0FBSyxlQUF4QyxFQUF5REMsTUFBTSxJQUEvRCxFQUFWLENBQWxCO0FBQ0EsU0FBS0MsU0FBTCxHQUFpQixvQkFBVSxFQUFFaEIsSUFBSSxDQUFDLENBQVAsRUFBVUMsTUFBTUosZUFBaEIsRUFBaUNpQixLQUFLLGNBQXRDLEVBQXNEQyxNQUFNLElBQTVELEVBQVYsQ0FBakI7QUFDRDs7Ozs2QkFFUWYsRSxFQUFJO0FBQ1gsYUFBTyxLQUFLSSxNQUFMLENBQVlhLElBQVosQ0FBaUI7QUFBQSxlQUFTWCxNQUFNTixFQUFOLElBQVlBLEVBQXJCO0FBQUEsT0FBakIsQ0FBUDtBQUNEOzs7NEJBRU87QUFBQTs7QUFDTixXQUFLUSxZQUFMLEdBQW9CLEtBQUtDLFFBQUwsQ0FBYyxLQUFLRixZQUFuQixDQUFwQjtBQUNBLHVCQUFPaEIsT0FBUCxDQUFlLFdBQWYsRUFBNEIsS0FBS2lCLFlBQWpDO0FBQ0EsVUFBSVUsWUFBWUMsUUFBUUMsT0FBUixFQUFoQixDQUhNLENBRzZCO0FBQ25DLFdBQUssSUFBSUMsSUFBSSxDQUFiLEVBQWdCQSxJQUFJLEtBQUtsQixLQUF6QixFQUFnQ2tCLEdBQWhDLEVBQXFDO0FBQ25DSCxvQkFBWUEsVUFDVkksSUFEVSxDQUNMLFlBQU07QUFBRSxpQkFBTyxNQUFLQyxTQUFMLEVBQVA7QUFBeUIsU0FENUIsRUFFVkQsSUFGVSxDQUVMLFlBQU07QUFBRSxpQkFBTyxNQUFLRSxXQUFMLEVBQVA7QUFBMkIsU0FGOUIsRUFHVkYsSUFIVSxDQUdMLGlCQUFTO0FBQUUsZ0JBQUtHLGNBQUwsQ0FBb0JuQixLQUFwQjtBQUE0QixTQUhsQyxDQUFaO0FBSUQ7QUFDRFksZ0JBQVVRLEtBQVYsQ0FBZ0I7QUFBQSxlQUFTLE1BQUtELGNBQUwsQ0FBb0JuQixLQUFwQixDQUFUO0FBQUEsT0FBaEI7QUFDQSxhQUFPWSxTQUFQO0FBQ0Q7OztnQ0FFVztBQUFBOztBQUNWLGFBQU8sSUFBSUMsT0FBSixDQUFZLFVBQUNDLE9BQUQsRUFBVU8sTUFBVixFQUFxQjtBQUN0QyxlQUFLZixPQUFMLEdBQWUsaUJBQU81QixTQUFQLENBQWlCLFlBQWpCLEVBQStCLFlBQU07QUFBRTJDLGlCQUFPLE9BQUtYLFNBQVo7QUFBeUIsU0FBaEUsQ0FBZjtBQUNBWSxtQkFBVyxZQUFNO0FBQ2YsaUJBQUtDLFNBQUw7QUFDQVQ7QUFDRCxTQUhELEVBR0csT0FBS2xCLFNBSFI7QUFJRCxPQU5NLENBQVA7QUFPRDs7O2tDQUVhO0FBQUE7O0FBQ1osVUFBTTRCLFFBQVEsS0FBS3RCLFlBQUwsQ0FBa0JzQixLQUFoQztBQUNBLFVBQU1DLGlCQUFpQkMsS0FBS0MsR0FBTCxFQUF2QjtBQUNBLGFBQU8sSUFBSWQsT0FBSixDQUFZLFVBQUNDLE9BQUQsRUFBVU8sTUFBVixFQUFxQjtBQUN0QztBQUNBLHlCQUFPcEMsT0FBUCxDQUFlLE9BQWYsRUFBd0J1QyxLQUF4Qjs7QUFFQTtBQUNBO0FBQ0EsZUFBS25CLFFBQUwsR0FBZ0IsaUJBQU8zQixTQUFQLENBQWlCLFlBQWpCLEVBQStCLGdCQUFRO0FBQ3JELGNBQU1rRCxZQUFZRixLQUFLQyxHQUFMLEtBQWFGLGNBQS9CO0FBQ0EsY0FBTUksY0FBYyxPQUFLM0IsWUFBTCxDQUFrQjRCLFdBQWxCLENBQThCckMsSUFBOUIsRUFBb0NtQyxTQUFwQyxDQUFwQjtBQUNBLGNBQU1HLFlBQVksT0FBSzVCLFFBQUwsQ0FBYzBCLFdBQWQsQ0FBbEI7QUFDQSxjQUFLRSxTQUFMLEVBQWlCO0FBQ2ZBLHNCQUFVdEIsSUFBVixHQUFpQlksT0FBT1UsU0FBUCxDQUFqQixHQUFxQ2pCLFFBQVFpQixTQUFSLENBQXJDO0FBQ0Q7QUFDRixTQVBlLENBQWhCOztBQVNBLGVBQUt6QixPQUFMLEdBQWUsaUJBQU81QixTQUFQLENBQWlCLFlBQWpCLEVBQStCLFlBQU07QUFDbEQyQyxpQkFBTyxPQUFLWCxTQUFaO0FBQ0QsU0FGYyxDQUFmOztBQUlBO0FBQ0EsWUFBTXNCLGVBQWUsT0FBSzlCLFlBQUwsQ0FBa0IrQixlQUFsQixFQUFyQjtBQUNBLGVBQUs3QixPQUFMLEdBQWVrQixXQUFXLFlBQU07QUFDOUIsY0FBTU8sY0FBYyxPQUFLM0IsWUFBTCxDQUFrQmdDLGlCQUFsQixHQUFzQ0gsU0FBMUQ7QUFDQSxjQUFNQSxZQUFZLE9BQUs1QixRQUFMLENBQWMwQixXQUFkLENBQWxCO0FBQ0FFLG9CQUFVdEIsSUFBVixHQUFpQlksT0FBT1UsU0FBUCxDQUFqQixHQUFxQ2pCLFFBQVFpQixTQUFSLENBQXJDO0FBQ0QsU0FKYyxFQUlaQyxZQUpZLENBQWY7QUFLRCxPQTFCTSxDQUFQO0FBMkJEOzs7MkJBRU07QUFDTCx1QkFBTy9DLE9BQVAsQ0FBZSxZQUFmO0FBQ0Q7OzttQ0FFY2UsSyxFQUFPO0FBQ3BCLFdBQUtFLFlBQUwsR0FBb0JGLEtBQXBCO0FBQ0FtQyxtQkFBYSxLQUFLL0IsT0FBbEI7QUFDQSxXQUFLbUIsU0FBTDtBQUNBLHVCQUFPdEMsT0FBUCxDQUFlLFdBQWYsRUFBNEJlLEtBQTVCO0FBQ0Q7OztnQ0FFVztBQUNWLFVBQUksS0FBS0ssUUFBVCxFQUFtQjtBQUNqQixhQUFLQSxRQUFMLENBQWNyQixNQUFkO0FBQ0Q7QUFDRCxVQUFJLEtBQUtzQixPQUFULEVBQWtCO0FBQ2hCLGFBQUtBLE9BQUwsQ0FBYXRCLE1BQWI7QUFDRDtBQUNGOzs7Ozs7a0JBSVlRLEs7Ozs7Ozs7Ozs7Ozs7QUMxR2Y7Ozs7QUFDQTs7Ozs7O0FBRUEsSUFBTTRDLFdBQVUsRUFBaEI7O0FBRUE7QUFDQSxJQUFNQyxhQUFhN0UsU0FBUzhFLGFBQVQsQ0FBdUIsYUFBdkIsQ0FBbkI7QUFDQUYsU0FBUUcsSUFBUixHQUFlLFVBQVNDLEtBQVQsRUFBZ0JDLFFBQWhCLEVBQTBCO0FBQ3ZDSixhQUFXOUQsV0FBWCxHQUF5QmlFLE1BQU03QyxJQUEvQjtBQUNBLGtCQUFNK0MsR0FBTixDQUFVRixNQUFNakMsVUFBaEI7QUFDQSxrQkFBTWdDLElBQU4sQ0FBV0UsU0FBU0UsS0FBcEI7QUFDQSxTQUFPLElBQVA7QUFDRCxDQUxEOztBQU9BO0FBQ0EsSUFBTUMsV0FBV3BGLFNBQVM4RSxhQUFULENBQXVCLFVBQXZCLENBQWpCO0FBQ0FGLFNBQVFTLFdBQVIsR0FBc0IsWUFBVztBQUMvQkMsb0JBQWtCLE1BQWxCO0FBQ0EsU0FBTyxJQUFQO0FBQ0QsQ0FIRDtBQUlBVixTQUFRVyxXQUFSLEdBQXNCLFlBQVc7QUFDL0JELG9CQUFrQixNQUFsQjtBQUNBLFNBQU8sSUFBUDtBQUNELENBSEQ7QUFJQSxTQUFTQSxpQkFBVCxDQUEyQkUsT0FBM0IsRUFBb0M7QUFDbENKLFdBQVNLLEtBQVQsQ0FBZUQsT0FBZixHQUF5QkEsT0FBekI7QUFDRDs7QUFFRDtBQUNBWixTQUFRYyxhQUFSLEdBQXdCLFlBQXFCO0FBQUEsb0NBQVRDLE9BQVM7QUFBVEEsV0FBUztBQUFBOztBQUMzQ0Msa0JBQWdCRCxPQUFoQixFQUF5QixLQUF6QjtBQUNBLFNBQU8sSUFBUDtBQUNELENBSEQ7QUFJQWYsU0FBUWlCLGNBQVIsR0FBeUIsWUFBcUI7QUFBQSxxQ0FBVEYsT0FBUztBQUFUQSxXQUFTO0FBQUE7O0FBQzVDQyxrQkFBZ0JELE9BQWhCLEVBQXlCLElBQXpCO0FBQ0EsU0FBTyxJQUFQO0FBQ0QsQ0FIRDtBQUlBLFNBQVNDLGVBQVQsQ0FBeUJELE9BQXpCLEVBQWtDRyxLQUFsQyxFQUF5QztBQUN2Q0gsVUFBUXJGLE9BQVIsQ0FBZ0I7QUFBQSxXQUFVeUYsT0FBT0MsUUFBUCxHQUFrQkYsS0FBNUI7QUFBQSxHQUFoQjtBQUNEOztBQUVEO0FBQ0FsQixTQUFRcUIsWUFBUixHQUF1QjtBQUFBLFNBQ3JCLGdCQUFNQSxZQUFOLEVBRHFCO0FBQUEsQ0FBdkI7O0FBR0FyQixTQUFRc0IsUUFBUixHQUFtQjtBQUFBLFNBQ2pCLGdCQUFNaEIsR0FBTixDQUFVaUIsU0FBVixDQURpQjtBQUFBLENBQW5COztBQUdBdkIsU0FBUXdCLFNBQVIsR0FBb0I7QUFBQSxTQUNsQixnQkFBTUEsU0FBTixDQUFnQkMsU0FBaEIsQ0FEa0I7QUFBQSxDQUFwQjs7QUFHQXpCLFNBQVEwQixTQUFSLEdBQW9CO0FBQUEsU0FDbEIsZ0JBQU1BLFNBQU4sRUFEa0I7QUFBQSxDQUFwQjs7a0JBR2UxQixROzs7Ozs7Ozs7Ozs7QUN0RGYsU0FBUzJCLElBQVQsR0FBdUM7QUFBQSxNQUF6QkMsSUFBeUIsdUVBQWxCLEVBQWtCO0FBQUEsTUFBZEMsT0FBYyx1RUFBSixFQUFJOztBQUNyQyxNQUFNQyxNQUFNLElBQUlDLGNBQUosRUFBWjtBQUNBRCxNQUFJRSxJQUFKLENBQVNILFFBQVFJLE1BQVIsSUFBa0IsS0FBM0IsRUFBa0NMLElBQWxDLEVBQXdDLElBQXhDO0FBQ0EsTUFBSUMsUUFBUUssT0FBWixFQUFxQjtBQUFFQyxrQkFBY0wsR0FBZCxFQUFtQkQsUUFBUUssT0FBM0I7QUFBc0M7QUFDN0RKLE1BQUlNLElBQUosQ0FBU1AsUUFBUXhFLElBQWpCOztBQUVBLFNBQU8sSUFBSW9CLE9BQUosQ0FBWSxVQUFDQyxPQUFELEVBQVVPLE1BQVYsRUFBcUI7QUFDdEM2QyxRQUFJTyxrQkFBSixHQUF5QixZQUFXO0FBQ2xDLFVBQUdQLElBQUlRLFVBQUosSUFBa0IsQ0FBckIsRUFBd0I7QUFDdEIsWUFBR1IsSUFBSVMsTUFBSixJQUFjLEdBQWpCLEVBQXNCO0FBQ3BCN0Qsa0JBQVFvRCxJQUFJVSxZQUFaO0FBQ0QsU0FGRCxNQUVPO0FBQ0x2RCxpQkFBTzZDLElBQUlXLFVBQVg7QUFDRDtBQUNGO0FBQ0YsS0FSRDtBQVNELEdBVk0sQ0FBUDtBQVdEOztBQUVELFNBQVNOLGFBQVQsQ0FBdUJMLEdBQXZCLEVBQTRCSSxPQUE1QixFQUFxQztBQUNuQyxPQUFLLElBQUlRLE1BQVQsSUFBbUJSLE9BQW5CLEVBQTRCO0FBQzFCSixRQUFJYSxnQkFBSixDQUFxQkQsTUFBckIsRUFBNkJSLFFBQVFBLE9BQVIsQ0FBN0I7QUFDRDtBQUNGOztrQkFFY1AsSTs7Ozs7O0FDekJmLHlDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7OztJQ0FNaUIsTTtBQUNKLGtCQUFZdkYsSUFBWixFQUFrQjtBQUFBOztBQUNoQixTQUFLd0YsT0FBTCxHQUFleEYsS0FBS3dGLE9BQXBCO0FBQ0EsU0FBS0MsT0FBTCxHQUFlekYsS0FBS3lGLE9BQXBCO0FBQ0EsU0FBS25ELFNBQUwsR0FBaUJ0QyxLQUFLc0MsU0FBdEI7QUFDQSxRQUFJdEMsS0FBSzBGLFFBQVQsRUFBbUI7QUFDakIsV0FBS0EsUUFBTCxHQUFnQixJQUFoQjtBQUNBLFdBQUt4QyxLQUFMLEdBQWEsRUFBYjtBQUNELEtBSEQsTUFHTztBQUNMLFdBQUt3QyxRQUFMLEdBQWdCLEtBQWhCO0FBQ0EsV0FBS3hDLEtBQUwsR0FBYWxELEtBQUtrRCxLQUFsQjtBQUNEO0FBRUY7O0FBRUQ7Ozs7Ozs7OzsrQkFLV2xELEksRUFBTTJGLEksRUFBTTtBQUNyQixhQUFPLEtBQUtDLFNBQUwsQ0FBZUQsSUFBZixLQUF3QixLQUFLRSxTQUFMLENBQWU3RixJQUFmLENBQS9CO0FBQ0Q7OztnQ0FFb0I7QUFBQTs7QUFBQSxVQUFYQSxJQUFXLHVFQUFKLEVBQUk7O0FBQ25CLFVBQUcsQ0FBQzhGLE1BQU1DLE9BQU4sQ0FBYy9GLElBQWQsQ0FBSixFQUF5QjtBQUFFLGNBQU0sSUFBSWdHLFNBQUosbUVBQTZFaEcsSUFBN0UseUNBQTZFQSxJQUE3RSxHQUFOO0FBQTZGO0FBQ3hILGFBQU8sS0FBS2tELEtBQUwsQ0FBVytDLEtBQVgsQ0FBaUIsZ0JBQVE7QUFDOUI7QUFDQSxZQUFNQyxZQUFZbEcsS0FBS2tCLElBQUwsQ0FBVTtBQUFBLGlCQUFPaUYsSUFBSWxHLEVBQUosSUFBVW1HLEtBQUtuRyxFQUF0QjtBQUFBLFNBQVYsQ0FBbEI7QUFDQSxZQUFJLENBQUNpRyxTQUFMLEVBQWdCO0FBQUUsaUJBQU8sS0FBUDtBQUFlOztBQUVqQztBQUNBLFlBQUksT0FBT0UsS0FBS3ZDLEtBQVosS0FBc0IsU0FBMUIsRUFBcUM7QUFBRSxpQkFBT3FDLFVBQVVyQyxLQUFWLEtBQW9CdUMsS0FBS3ZDLEtBQWhDO0FBQXdDOztBQUUvRTtBQUNBLFlBQUlpQyxNQUFNQyxPQUFOLENBQWNLLEtBQUt2QyxLQUFuQixDQUFKLEVBQStCO0FBQUUsaUJBQU8sTUFBS3dDLGFBQUwsQ0FBbUJILFVBQVVyQyxLQUE3QixFQUFvQ3VDLEtBQUt2QyxLQUF6QyxDQUFQO0FBQXdEOztBQUV6RixlQUFPLEtBQVA7QUFDRCxPQVpNLENBQVA7QUFhRDs7O2tDQUVhQSxLLEVBQU95QyxPLEVBQVM7QUFDNUIsVUFBSSxPQUFPekMsS0FBUCxLQUFpQixRQUFyQixFQUErQixNQUFNLElBQUltQyxTQUFKLENBQWMseUJBQWQsQ0FBTjtBQUMvQixhQUFRbkMsU0FBU3lDLFFBQVEsQ0FBUixDQUFWLElBQTBCekMsU0FBU3lDLFFBQVEsQ0FBUixDQUExQztBQUNEOzs7OEJBRVNYLEksRUFBTTtBQUNkLFVBQUksT0FBT0EsSUFBUCxLQUFnQixRQUFwQixFQUE4QixNQUFNLElBQUlLLFNBQUosQ0FBYyw2QkFBZCxDQUFOO0FBQzlCLGFBQVFMLFFBQVEsS0FBS0gsT0FBZCxJQUEyQkcsUUFBUSxLQUFLRixPQUEvQztBQUNEOzs7Ozs7a0JBR1lGLE07Ozs7Ozs7Ozs7Ozs7OztJQ3BEVGdCLEssR0FDSixlQUFZdkcsSUFBWixFQUFrQjtBQUFBOztBQUNoQixPQUFLQyxFQUFMLEdBQVVELEtBQUtDLEVBQWY7QUFDQSxPQUFLQyxJQUFMLEdBQVlGLEtBQUtFLElBQWpCO0FBQ0EsT0FBS3NHLFdBQUwsR0FBbUJ4RyxLQUFLd0csV0FBeEI7QUFDRCxDOztrQkFHWUQsSzs7Ozs7Ozs7Ozs7Ozs7O0FDUmY7Ozs7QUFDQTs7Ozs7Ozs7OztJQUVNRSxLO0FBQ0osaUJBQVl6RyxJQUFaLEVBQWtCO0FBQUE7O0FBQ2hCLFNBQUtDLEVBQUwsR0FBVUQsS0FBS0MsRUFBZjtBQUNBLFNBQUtDLElBQUwsR0FBWUYsS0FBS0UsSUFBakI7QUFDQSxTQUFLYSxHQUFMLEdBQVdmLEtBQUtlLEdBQWhCO0FBQ0EsU0FBS2xELE1BQUwsR0FBY21DLEtBQUtuQyxNQUFuQjs7QUFFQSxRQUFHbUMsS0FBS2dCLElBQVIsRUFBYztBQUNaLFdBQUtBLElBQUwsR0FBWSxJQUFaO0FBQ0EsV0FBS2UsS0FBTCxHQUFhLElBQWI7QUFDQSxXQUFLMkUsT0FBTCxHQUFlLElBQWY7QUFDRCxLQUpELE1BSU87QUFDTCxXQUFLM0UsS0FBTCxHQUFhLG9CQUFVL0IsS0FBSytCLEtBQWYsQ0FBYjtBQUNBLFdBQUsyRSxPQUFMLEdBQWUxRyxLQUFLMEcsT0FBTCxDQUFhcEcsR0FBYixDQUFpQjtBQUFBLGVBQVUscUJBQVdxRyxNQUFYLENBQVY7QUFBQSxPQUFqQixDQUFmO0FBQ0EsV0FBSzNGLElBQUwsR0FBWSxLQUFaO0FBQ0Q7QUFDRjs7OztzQ0FFaUI7QUFDaEIsVUFBTTRGLFFBQVEsS0FBS0MsaUJBQUwsRUFBZDtBQUNBLGFBQU9DLEtBQUtDLEdBQUwsZ0NBQVlILEtBQVosRUFBUDtBQUNEOzs7d0NBRW1CO0FBQ2xCLGFBQU8sS0FBS0YsT0FBTCxDQUFheEYsSUFBYixDQUFrQjtBQUFBLGVBQVV5RixPQUFPakIsUUFBUCxLQUFvQixJQUE5QjtBQUFBLE9BQWxCLENBQVA7QUFDRDs7O3dDQUVtQjtBQUNsQixhQUFPLEtBQUtnQixPQUFMLENBQWFwRyxHQUFiLENBQWlCO0FBQUEsZUFBVXFHLE9BQU9sQixPQUFQLElBQWtCLENBQTVCO0FBQUEsT0FBakIsQ0FBUDtBQUNEOzs7Z0NBRVd6RixJLEVBQU0yRixJLEVBQU07QUFDdEIsVUFBTXFCLGdCQUFnQixLQUFLTixPQUFMLENBQWFPLE1BQWIsQ0FBb0I7QUFBQSxlQUFVTixPQUFPTyxVQUFQLENBQWtCbEgsSUFBbEIsRUFBd0IyRixJQUF4QixDQUFWO0FBQUEsT0FBcEIsQ0FBdEI7QUFDQSxVQUFJcUIsY0FBY3RILE1BQWQsR0FBdUIsQ0FBM0IsRUFBOEI7QUFDNUIsZUFBT3NILGNBQWMsQ0FBZCxFQUFpQjFFLFNBQXhCO0FBQ0Q7QUFDRCxhQUFPLElBQVA7QUFDRDs7Ozs7O2tCQUdZbUUsSzs7Ozs7Ozs7Ozs7OztBQzNDZjs7OztBQUNBOzs7Ozs7QUFFQSxJQUFNVSxRQUFRcEosU0FBUzhFLGFBQVQsQ0FBdUIsbUJBQXZCLENBQWQ7QUFDQSxJQUFNdUUsT0FBT3JKLFNBQVM4RSxhQUFULENBQXVCLGtCQUF2QixDQUFiO0FBQ0EsSUFBTXdFLFVBQVV0SixTQUFTOEUsYUFBVCxDQUF1QixzQkFBdkIsQ0FBaEI7O0FBRUEsSUFBTXlFLFNBQVN2SixTQUFTOEUsYUFBVCxDQUF1QixjQUF2QixDQUFmO0FBQ0EsSUFBTTBFLGVBQWVELE9BQU96RSxhQUFQLENBQXFCLHdCQUFyQixDQUFyQjtBQUNBLElBQU0yRSxhQUFhRixPQUFPekUsYUFBUCxDQUFxQixtQkFBckIsQ0FBbkI7O0FBRUEsSUFBTTRFLGtCQUFrQjFKLFNBQVM4RSxhQUFULENBQXVCLGNBQXZCLENBQXhCO0FBQ0E0RSxnQkFBZ0JDLFdBQWhCLENBQTRCLGdCQUFNNUosSUFBbEM7O0FBRUEsU0FBU21GLEdBQVQsT0FBb0M7QUFBQSxNQUFyQi9DLElBQXFCLFFBQXJCQSxJQUFxQjtBQUFBLE1BQWZhLEdBQWUsUUFBZkEsR0FBZTtBQUFBLE1BQVZsRCxNQUFVLFFBQVZBLE1BQVU7O0FBQ2xDc0osUUFBTXJJLFdBQU4sR0FBb0JvQixJQUFwQjtBQUNBa0gsT0FBS3hJLFlBQUwsQ0FBa0IsS0FBbEIsRUFBeUJtQyxHQUF6QjtBQUNBNEcsZ0JBQWM5SixNQUFkO0FBQ0Q7O0FBRUQsU0FBUzhKLGFBQVQsQ0FBdUI5SixNQUF2QixFQUErQjtBQUM3QixNQUFNK0osT0FBTzdKLFNBQVM4SixzQkFBVCxFQUFiO0FBQ0EsT0FBSyxJQUFJQyxHQUFULElBQWdCakssTUFBaEIsRUFBd0I7QUFDdEIrSixTQUFLRixXQUFMLENBQWlCSyxtQkFBbUJELEdBQW5CLEVBQXdCakssT0FBT2lLLEdBQVAsQ0FBeEIsQ0FBakI7QUFDRDtBQUNEVCxVQUFRVyxTQUFSLEdBQW9CLEVBQXBCO0FBQ0FYLFVBQVFLLFdBQVIsQ0FBb0JFLElBQXBCO0FBQ0Q7O0FBRUQsU0FBU0csa0JBQVQsQ0FBNEJELEdBQTVCLEVBQWlDakUsS0FBakMsRUFBd0M7QUFDdEMsTUFBTW9FLE1BQU0sMkJBQVksS0FBWixFQUFtQixFQUFFN0osV0FBVyxDQUFDLFdBQUQsQ0FBYixFQUFuQixDQUFaOztBQUVBLE1BQU04SixVQUFVLDJCQUFZLE1BQVosRUFBb0IsRUFBRXBKLGFBQWFnSixHQUFmLEVBQXBCLENBQWhCO0FBQ0FHLE1BQUlQLFdBQUosQ0FBZ0JRLE9BQWhCOztBQUVBLE1BQU1DLFlBQVksMkJBQVksTUFBWixFQUFvQixFQUFFckosYUFBYStFLEtBQWYsRUFBcEIsQ0FBbEI7QUFDQW9FLE1BQUlQLFdBQUosQ0FBZ0JTLFNBQWhCOztBQUVBLFNBQU9GLEdBQVA7QUFDRDs7QUFHRDtBQUNBLFNBQVM5RCxTQUFULENBQW1CcEMsS0FBbkIsRUFBMEI7QUFDeEJ3RixlQUFhekksV0FBYixHQUEyQmlELE1BQU03QixJQUFqQztBQUNBc0gsYUFBVzFJLFdBQVgsR0FBeUJpRCxNQUFNeUUsV0FBL0I7QUFDQWMsU0FBT2xKLFNBQVAsQ0FBaUJtQixNQUFqQixDQUF3QixXQUF4QixFQUFxQyxXQUFyQztBQUNBNkk7QUFDRDtBQUNELFNBQVMvRCxTQUFULEdBQXFCO0FBQ25CaUQsU0FBT2xKLFNBQVAsQ0FBaUJFLEdBQWpCLENBQXFCLFdBQXJCLEVBQWtDLFdBQWxDO0FBQ0ErSjtBQUNEOztBQUVELFNBQVNELFNBQVQsR0FBcUI7QUFDbkJYLGtCQUFnQnJKLFNBQWhCLENBQTBCbUIsTUFBMUIsQ0FBaUMsV0FBakM7QUFDQSxrQkFBTStJLEtBQU47QUFDRDtBQUNELFNBQVNELFNBQVQsR0FBcUI7QUFDbkJaLGtCQUFnQnJKLFNBQWhCLENBQTBCRSxHQUExQixDQUE4QixXQUE5QjtBQUNBLGtCQUFNaUssSUFBTjtBQUNEOztrQkFFYztBQUNidEYsVUFEYTtBQUVia0Isc0JBRmE7QUFHYkU7QUFIYSxDOzs7Ozs7Ozs7Ozs7O0FDL0RmOzs7Ozs7QUFFQSxJQUFNbUUsWUFBWTtBQUNoQkMsU0FBTyxPQURTO0FBRWhCQyxVQUFRO0FBRlEsQ0FBbEI7QUFJQSxJQUFNQyxTQUFTNUssU0FBUzhFLGFBQVQsQ0FBdUIsYUFBdkIsQ0FBZjs7QUFFQSxTQUFTQyxJQUFULENBQWNJLEtBQWQsRUFBcUI7QUFDbkIsTUFBTTBGLFdBQVc3SyxTQUFTOEosc0JBQVQsRUFBakI7O0FBRUEzRSxRQUFNN0UsT0FBTixDQUFjLGdCQUFRO0FBQ3BCO0FBQ0EsUUFBTTRKLE1BQU0sMkJBQVksS0FBWixFQUFtQixFQUFFN0osV0FBVyxDQUFDLE1BQUQsQ0FBYixFQUFuQixDQUFaOztBQUVBLFFBQU15SyxRQUFRLDJCQUFZLE9BQVosRUFBcUI7QUFDakN6SyxpQkFBVyxDQUFDLFdBQUQsQ0FEc0I7QUFFakNJLGFBQU8sRUFBRSxPQUFPNEgsS0FBS2xHLElBQWQsRUFGMEI7QUFHakNwQixtQkFBYXNILEtBQUtsRztBQUhlLEtBQXJCLENBQWQ7QUFLQStILFFBQUlQLFdBQUosQ0FBZ0JtQixLQUFoQjs7QUFFQSxRQUFNQyxXQUFXQyxlQUFlM0MsSUFBZixDQUFqQjtBQUNBNkIsUUFBSVAsV0FBSixDQUFnQm9CLFFBQWhCOztBQUVBRixhQUFTbEIsV0FBVCxDQUFxQk8sR0FBckI7QUFDRCxHQWZEOztBQWlCQVUsU0FBT1gsU0FBUCxHQUFtQixFQUFuQjtBQUNBVyxTQUFPakIsV0FBUCxDQUFtQmtCLFFBQW5CO0FBQ0Q7O0FBRUQsU0FBU0csY0FBVCxDQUF3QjNDLElBQXhCLEVBQThCO0FBQzVCLFVBQU9BLEtBQUt4SSxJQUFaO0FBQ0UsU0FBSzRLLFVBQVVDLEtBQWY7QUFBd0IsYUFBT08sZ0JBQWdCNUMsSUFBaEIsQ0FBUDtBQUN4QixTQUFLb0MsVUFBVUUsTUFBZjtBQUF3QixhQUFPTyxpQkFBaUI3QyxJQUFqQixDQUFQO0FBQ3hCO0FBQXdCLGFBQU8sb0JBQVA7QUFIMUI7QUFLRDs7QUFFRCxTQUFTNEMsZUFBVCxDQUF5QjVDLElBQXpCLEVBQStCO0FBQzdCLE1BQU04QyxXQUFXLDJCQUFZLEtBQVosRUFBbUIsRUFBRTlLLFdBQVcsQ0FBQyxPQUFELENBQWIsRUFBbkIsQ0FBakI7O0FBRUEsTUFBTStLLFVBQVUsMkJBQVksTUFBWixFQUFvQixFQUFFckssYUFBYXNILEtBQUtnRCxHQUFwQixFQUFwQixDQUFoQjtBQUNBRixXQUFTeEIsV0FBVCxDQUFxQnlCLE9BQXJCOztBQUVBLE1BQU1FLFFBQVEsMkJBQVksT0FBWixFQUFxQjtBQUNqQzdLLFdBQU87QUFDTCxpQkFBVzRILEtBQUtuRyxFQURYO0FBRUwsbUJBQWEsT0FGUjtBQUdMLGNBQVFtRyxLQUFLbEcsSUFIUjtBQUlMLGNBQVEsT0FKSDtBQUtMLGFBQU9rRyxLQUFLZ0QsR0FMUDtBQU1MLGFBQU9oRCxLQUFLVztBQU5QO0FBRDBCLEdBQXJCLENBQWQ7QUFVQW1DLFdBQVN4QixXQUFULENBQXFCMkIsS0FBckI7O0FBRUEsTUFBTUMsVUFBVSwyQkFBWSxNQUFaLEVBQW9CLEVBQUV4SyxhQUFhc0gsS0FBS1csR0FBcEIsRUFBcEIsQ0FBaEI7QUFDQW1DLFdBQVN4QixXQUFULENBQXFCNEIsT0FBckI7O0FBRUEsTUFBTUMsYUFBYSwyQkFBWSxLQUFaLEVBQW1CLEVBQUVuTCxXQUFXLENBQUMscUJBQUQsQ0FBYixFQUFuQixDQUFuQjtBQUNBLE1BQU1vTCxjQUFjLDJCQUFZLE1BQVosRUFBb0IsRUFBRTFLLGFBQWF1SyxNQUFNeEYsS0FBckIsRUFBcEIsQ0FBcEI7QUFDQTBGLGFBQVc3QixXQUFYLENBQXVCOEIsV0FBdkI7O0FBRUFILFFBQU1JLGdCQUFOLENBQXVCLE9BQXZCLEVBQWdDLFVBQUNDLEdBQUQsRUFBUztBQUN2Q0YsZ0JBQVkxSyxXQUFaLEdBQTBCNEssSUFBSUMsTUFBSixDQUFXOUYsS0FBckM7QUFDRCxHQUZEOztBQUlBLE1BQU0rRSxXQUFXN0ssU0FBUzhKLHNCQUFULEVBQWpCO0FBQ0FlLFdBQVNsQixXQUFULENBQXFCd0IsUUFBckI7QUFDQU4sV0FBU2xCLFdBQVQsQ0FBcUI2QixVQUFyQjs7QUFFQSxTQUFPWCxRQUFQO0FBQ0Q7O0FBRUQsU0FBU0ssZ0JBQVQsQ0FBMEI3QyxJQUExQixFQUFnQztBQUM5QixNQUFNeUMsUUFBUSwyQkFBWSxPQUFaLEVBQXFCLEVBQUV6SyxXQUFXLENBQUMsUUFBRCxDQUFiLEVBQXJCLENBQWQ7O0FBRUEsTUFBTWlMLFFBQVEsMkJBQVksT0FBWixFQUFxQjtBQUNqQzdLLFdBQU87QUFDTCxpQkFBVzRILEtBQUtuRyxFQURYO0FBRUwsbUJBQWEsUUFGUjtBQUdMLGNBQVE7QUFISDtBQUQwQixHQUFyQixDQUFkO0FBT0E0SSxRQUFNbkIsV0FBTixDQUFrQjJCLEtBQWxCOztBQUVBLE1BQU1wQixNQUFNLDJCQUFZLEtBQVosRUFBbUIsRUFBRTdKLFdBQVcsQ0FBQyxRQUFELENBQWIsRUFBbkIsQ0FBWjtBQUNBeUssUUFBTW5CLFdBQU4sQ0FBa0JPLEdBQWxCOztBQUVBLFNBQU9ZLEtBQVA7QUFDRDs7QUFFRCxTQUFTN0UsWUFBVCxHQUF3QjtBQUN0QixNQUFNNEYsWUFBWSxFQUFsQjtBQUNBLE1BQU1DLFNBQVNsQixPQUFPbUIsZ0JBQVAsQ0FBd0IsZ0JBQXhCLENBQWY7QUFDQUQsU0FBT3hMLE9BQVAsQ0FBZSxpQkFBUztBQUFBLHlCQUNEZ0wsTUFBTVUsT0FETDtBQUFBLFFBQ2Q5SixFQURjLGtCQUNkQSxFQURjO0FBQUEsUUFDVnJDLElBRFUsa0JBQ1ZBLElBRFU7O0FBRXRCLFFBQUlpRyxjQUFKO0FBQ0EsWUFBT2pHLElBQVA7QUFDRSxXQUFLNEssVUFBVUMsS0FBZjtBQUFzQjVFLGdCQUFRbUcsU0FBU1gsTUFBTXhGLEtBQWYsQ0FBUixDQUErQjtBQUNyRCxXQUFLMkUsVUFBVUUsTUFBZjtBQUF1QjdFLGdCQUFRd0YsTUFBTVksT0FBZCxDQUF1QjtBQUM5QztBQUFTLGNBQU0sSUFBSUMsS0FBSixrSkFBMkNqSyxFQUEzQyxDQUFOO0FBSFg7QUFLQTJKLGNBQVV0SyxJQUFWLENBQWUsRUFBRVcsTUFBRixFQUFNNEQsWUFBTixFQUFmO0FBQ0QsR0FURDtBQVVBLFNBQU8rRixTQUFQO0FBQ0Q7O2tCQUVjO0FBQ2I5RyxZQURhO0FBRWJrQjtBQUZhLEM7Ozs7Ozs7Ozs7Ozs7QUM5R2Y7Ozs7OztBQUVBLFNBQVNtRyxXQUFULENBQXFCQyxFQUFyQixFQUF5QjtBQUN2QixNQUFNQyxVQUFVdkQsS0FBS3dELEtBQUwsQ0FBV0YsS0FBSyxJQUFoQixDQUFoQjtBQUNBLE1BQU1HLE9BQU96RCxLQUFLMEQsS0FBTCxDQUFXSCxVQUFVLEVBQXJCLENBQWI7QUFDQSxNQUFNSSxjQUFjSixVQUFXRSxPQUFPLEVBQXRDOztBQUVBLFNBQVVBLElBQVYsVUFBa0JFLGVBQWUsRUFBZixHQUFvQixFQUFwQixHQUF5QixHQUEzQyxJQUFpREEsV0FBakQ7QUFDRDs7QUFFRCxJQUFNQyxRQUFRO0FBQ1pDLGFBQVcsSUFEQztBQUVaQyxZQUFVLElBRkU7QUFHWjlNLFFBQU0sMkJBQVksTUFBWixFQUFvQixFQUFFTSxXQUFXLENBQUMsT0FBRCxDQUFiLEVBQXdCVSxhQUFhLE1BQXJDLEVBQXBCLENBSE07QUFJWndKLFNBQU8saUJBQVc7QUFBQTs7QUFDaEIsU0FBS3FDLFNBQUwsR0FBaUIxSSxLQUFLQyxHQUFMLEVBQWpCO0FBQ0EsU0FBSzBJLFFBQUwsR0FBZ0JDLFlBQVksWUFBTTtBQUNoQyxVQUFNQyxVQUFVN0ksS0FBS0MsR0FBTCxLQUFhLE1BQUt5SSxTQUFsQztBQUNBLFlBQUs3TSxJQUFMLENBQVVnQixXQUFWLEdBQXdCcUwsWUFBWVcsT0FBWixDQUF4QjtBQUNELEtBSGUsRUFHYixJQUhhLENBQWhCO0FBSUQsR0FWVztBQVdadkMsUUFBTSxnQkFBVztBQUNmLFFBQUksQ0FBQyxLQUFLb0MsU0FBVixFQUFxQjtBQUFFO0FBQVM7QUFDaEMsU0FBS0EsU0FBTCxHQUFpQixJQUFqQjtBQUNBSSxrQkFBYyxLQUFLSCxRQUFuQjtBQUNBLFNBQUs5TSxJQUFMLENBQVVnQixXQUFWLEdBQXdCLE1BQXhCO0FBQ0Q7QUFoQlcsQ0FBZDs7a0JBbUJlNEwsSzs7Ozs7Ozs7OztBQzdCZjs7QUFFQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7Ozs7O0FBRUE7OztBQUdBLFNBQVNNLFNBQVQsQ0FBbUIvSyxFQUFuQixFQUF1QjtBQUNyQixTQUFPLGlDQUFnQkEsRUFBaEIsRUFBc0JzQixJQUF0QixDQUEyQjtBQUFBLFdBQVkwSixLQUFLQyxLQUFMLENBQVdsSSxRQUFYLENBQVo7QUFBQSxHQUEzQixDQUFQO0FBQ0Q7O0FBRUQ7OztBQUdBLElBQU1tSSxVQUFVcE4sU0FBUzhFLGFBQVQsQ0FBdUIsZUFBdkIsQ0FBaEI7QUFDQSxJQUFNdUksY0FBY3JOLFNBQVM4RSxhQUFULENBQXVCLGlCQUF2QixDQUFwQjtBQUNBLElBQUlFLFFBQVEsSUFBWjtBQUNBcUksWUFBWTNCLGdCQUFaLENBQTZCLE9BQTdCLEVBQXNDLFlBQU07QUFDMUMsTUFBSzFHLEtBQUwsRUFBYTtBQUFFQSxVQUFNd0YsSUFBTjtBQUFlO0FBQzlCLE1BQU04QyxVQUFVRixRQUFRdEgsS0FBeEI7QUFDQW1ILFlBQVVLLE9BQVYsRUFDRzlKLElBREgsQ0FDUSxvQkFBWTtBQUNoQndCLFlBQVEsb0JBQVVDLFFBQVYsQ0FBUjtBQUNBLG9CQUFNRixJQUFOLENBQVdDLEtBQVgsRUFBa0JDLFFBQWxCLEVBQ0dJLFdBREgsR0FFR0ssYUFGSCxDQUVpQjZILFlBRmpCLEVBR0cxSCxjQUhILENBR2tCMkgsV0FIbEIsRUFHK0JDLFVBSC9CO0FBSUQsR0FQSCxFQVFHN0osS0FSSCxDQVFTLGVBQU87QUFBRThKLFlBQVFDLEtBQVIsQ0FBY0MsR0FBZDtBQUFvQixHQVJ0QztBQVNELENBWkQ7QUFhQTtBQUNBLElBQU1MLGVBQWV2TixTQUFTOEUsYUFBVCxDQUF1QixZQUF2QixDQUFyQjtBQUNBeUksYUFBYTdCLGdCQUFiLENBQThCLE9BQTlCLEVBQXVDLFlBQU07QUFDM0MxRyxRQUFNdUYsS0FBTjtBQUNBLGtCQUFNMUUsY0FBTixDQUFxQjBILFlBQXJCO0FBQ0Esa0JBQU03SCxhQUFOLENBQW9COEgsV0FBcEIsRUFBaUNDLFVBQWpDO0FBQ0QsQ0FKRDs7QUFNQSxJQUFNRCxjQUFjeE4sU0FBUzhFLGFBQVQsQ0FBdUIsV0FBdkIsQ0FBcEI7QUFDQTBJLFlBQVk5QixnQkFBWixDQUE2QixPQUE3QixFQUFzQyxZQUFNO0FBQzFDMUcsUUFBTXdGLElBQU47QUFDQSxrQkFBTTlFLGFBQU4sQ0FBb0I2SCxZQUFwQjtBQUNBLGtCQUFNMUgsY0FBTixDQUFxQjJILFdBQXJCLEVBQWtDQyxVQUFsQztBQUNELENBSkQ7O0FBTUEsSUFBTUEsYUFBYXpOLFNBQVM4RSxhQUFULENBQXVCLFVBQXZCLENBQW5CO0FBQ0EySSxXQUFXL0IsZ0JBQVgsQ0FBNEIsT0FBNUIsRUFBcUMsWUFBTTtBQUN6QyxNQUFNRyxZQUFZLGdCQUFNNUYsWUFBTixFQUFsQjtBQUNBLG1CQUFPeEUsT0FBUCxDQUFlLFlBQWYsRUFBNkJvSyxTQUE3QjtBQUNELENBSEQ7O0FBS0E7OztBQUdBLGlCQUFPM0ssU0FBUCxDQUFpQixXQUFqQixFQUE4QixpQkFBUztBQUNyQyxrQkFBTW9GLFNBQU47QUFDQSxrQkFBTUosUUFBTixDQUFlMUQsS0FBZjtBQUNELENBSEQ7QUFJQSxpQkFBT3RCLFNBQVAsQ0FBaUIsT0FBakIsRUFBMEI7QUFBQSxTQUFTLGdCQUFNa0YsU0FBTixDQUFnQnBDLEtBQWhCLENBQVQ7QUFBQSxDQUExQjs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxxRCIsImZpbGUiOiJsZWFybmluZy5idW5kbGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSlcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcblxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gaWRlbnRpdHkgZnVuY3Rpb24gZm9yIGNhbGxpbmcgaGFybW9ueSBpbXBvcnRzIHdpdGggdGhlIGNvcnJlY3QgY29udGV4dFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5pID0gZnVuY3Rpb24odmFsdWUpIHsgcmV0dXJuIHZhbHVlOyB9O1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHtcbiBcdFx0XHRcdGNvbmZpZ3VyYWJsZTogZmFsc2UsXG4gXHRcdFx0XHRlbnVtZXJhYmxlOiB0cnVlLFxuIFx0XHRcdFx0Z2V0OiBnZXR0ZXJcbiBcdFx0XHR9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSAxNCk7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gd2VicGFjay9ib290c3RyYXAgYTQ3Nzc1NzNkNGZiNWZlMjkzOWQiLCJjb25zdCBub2RlRmFjdG9yeSA9IGZ1bmN0aW9uKHR5cGUgPSAnZGl2JywgcGFyYW1zKSB7XHJcbiAgY29uc3Qgbm9kZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQodHlwZSk7XHJcblxyXG4gIGFwcGVuZENsYXNzZXMobm9kZSwgcGFyYW1zKTtcclxuICBhcHBlbmRBdHRycyhub2RlLCBwYXJhbXMpO1xyXG4gIGluc2VydFRleHRDb250ZW50KG5vZGUsIHBhcmFtcyk7XHJcblxyXG4gIHJldHVybiBub2RlO1xyXG59XHJcblxyXG5mdW5jdGlvbiBhcHBlbmRDbGFzc2VzKG5vZGUsIHsgY2xhc3NMaXN0IH0pIHtcclxuICBpZiAoY2xhc3NMaXN0ICYmIGNsYXNzTGlzdC5mb3JFYWNoKSB7XHJcbiAgICBjbGFzc0xpc3QuZm9yRWFjaChjbGFzc05hbWUgPT4gbm9kZS5jbGFzc0xpc3QuYWRkKGNsYXNzTmFtZSkpO1xyXG4gIH1cclxufVxyXG5cclxuZnVuY3Rpb24gYXBwZW5kQXR0cnMobm9kZSwgeyBhdHRycyB9KSB7XHJcbiAgaWYgKGF0dHJzKSB7XHJcbiAgICBjb25zdCBhdHRyTmFtZXMgPSBPYmplY3Qua2V5cyhhdHRycyk7XHJcbiAgICBhdHRyTmFtZXMuZm9yRWFjaChhdHRyTmFtZSA9PiBub2RlLnNldEF0dHJpYnV0ZShhdHRyTmFtZSwgYXR0cnNbYXR0ck5hbWVdKSk7XHJcbiAgfVxyXG59XHJcblxyXG5mdW5jdGlvbiBpbnNlcnRUZXh0Q29udGVudChub2RlLCB7IHRleHRDb250ZW50ID0gXCJcIiB9KSB7XHJcbiAgbm9kZS50ZXh0Q29udGVudCA9IHRleHRDb250ZW50O1xyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBub2RlRmFjdG9yeTtcclxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vdXRpbHMvbm9kZUZhY3RvcnkuanMiLCJjb25zdCBwdWJzdWIgPSAoZnVuY3Rpb24oKSB7XHJcblxyXG4gIGNvbnN0IHRvcGljcyA9IHt9O1xyXG5cclxuICByZXR1cm4ge1xyXG4gICAgc3Vic2NyaWJlOiBmdW5jdGlvbih0b3BpYywgbGlzdGVuZXIpIHtcclxuICAgICAgaWYgKCF0b3BpY3NbdG9waWNdKSB0b3BpY3NbdG9waWNdID0geyBxdWV1ZTogW10gfTtcclxuXHJcbiAgICAgIGNvbnN0IGluZGV4ID0gdG9waWNzW3RvcGljXS5xdWV1ZS5wdXNoKGxpc3RlbmVyKSAtIDE7XHJcbiAgICAgIC8vIGZ1bmN0aW9uIHRvIGRlbGV0ZSB0b3BpY1xyXG4gICAgICByZXR1cm4ge1xyXG4gICAgICAgIHJlbW92ZTogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICBkZWxldGUgdG9waWNzW3RvcGljXS5xdWV1ZVtpbmRleF07XHJcbiAgICAgICAgfVxyXG4gICAgICB9O1xyXG4gICAgfSxcclxuXHJcbiAgICBwdWJsaXNoOiBmdW5jdGlvbih0b3BpYywgaW5mbykge1xyXG4gICAgICAvLyBubyB0aGVtZSBvciBubyBsaXN0ZW5lcnNcclxuICAgICAgaWYgKCF0b3BpY3NbdG9waWNdIHx8ICF0b3BpY3NbdG9waWNdLnF1ZXVlLmxlbmd0aCkgcmV0dXJuO1xyXG5cclxuICAgICAgY29uc3QgaXRlbXMgPSB0b3BpY3NbdG9waWNdLnF1ZXVlO1xyXG4gICAgICBpdGVtcy5mb3JFYWNoKGl0ZW0gPT4ge1xyXG4gICAgICAgIGl0ZW0oaW5mbyB8fCB7fSk7XHJcbiAgICAgIH0pO1xyXG4gICAgfVxyXG4gIH07XHJcbn0pKCk7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBwdWJzdWI7XHJcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3V0aWxzL3B1YnN1Yi5qcyIsImltcG9ydCBTdGF0ZSBmcm9tICcuL21vZGVsX2NvbXBvbmVudHMvc3RhdGUnO1xyXG5pbXBvcnQgcHVic3ViIGZyb20gJy4uL3V0aWxzL3B1YnN1Yic7XHJcblxyXG5jb25zdCBJTklUSUFMX1NUQVRFX05BTUUgPSAn0KHQvtGB0YLQvtGP0L3QuNC1INC80L7QtNC10LvQuCc7XHJcbmNvbnN0IFNUT1BfU1RBVEVfTkFNRSA9ICfQntCx0YPRh9C10L3QuNC1INC+0YHRgtCw0L3QvtCy0LvQtdC90L4nO1xyXG5cclxuY2xhc3MgTW9kZWwge1xyXG4gIGNvbnN0cnVjdG9yKGRhdGEpIHtcclxuICAgIHRoaXMuaWQgPSBkYXRhLmlkO1xyXG4gICAgdGhpcy5uYW1lID0gZGF0YS5uYW1lO1xyXG4gICAgdGhpcy5icmVha1RpbWUgPSBkYXRhLmJyZWFrVGltZTtcclxuICAgIHRoaXMuc3RlcHMgPSBkYXRhLnN0ZXBzO1xyXG5cclxuICAgIHRoaXMuc3RhdGVzID0gZGF0YS5zdGF0ZXMubWFwKHN0YXRlID0+IG5ldyBTdGF0ZShzdGF0ZSkpO1xyXG4gICAgdGhpcy5pbml0aWFsU3RhdGUgPSBkYXRhLmluaXRpYWxTdGF0ZTtcclxuICAgIHRoaXMuY3VycmVudFN0YXRlID0gdGhpcy5nZXRTdGF0ZSh0aGlzLmluaXRpYWxTdGF0ZSk7XHJcblxyXG4gICAgdGhpcy50aW1lb3V0ID0gbnVsbDtcclxuICAgIHRoaXMuc3ViSW5wdXQgPSBudWxsO1xyXG4gICAgdGhpcy5zdWJTdG9wID0gbnVsbDtcclxuICAgIHRoaXMuc3RhcnRTdGF0ZSA9IG5ldyBTdGF0ZSh7IGlkOiAwLCBuYW1lOiBJTklUSUFMX1NUQVRFX05BTUUsIGltZzogJ2ltZy9zdGFydC5wbmcnLCBsYXN0OiB0cnVlIH0pO1xyXG4gICAgdGhpcy5zdG9wU3RhdGUgPSBuZXcgU3RhdGUoeyBpZDogLTEsIG5hbWU6IFNUT1BfU1RBVEVfTkFNRSwgaW1nOiAnaW1nL3N0b3AucG5nJywgbGFzdDogdHJ1ZSB9KTtcclxuICB9XHJcblxyXG4gIGdldFN0YXRlKGlkKSB7XHJcbiAgICByZXR1cm4gdGhpcy5zdGF0ZXMuZmluZChzdGF0ZSA9PiBzdGF0ZS5pZCA9PSBpZCk7XHJcbiAgfVxyXG5cclxuICBzdGFydCgpIHtcclxuICAgIHRoaXMuY3VycmVudFN0YXRlID0gdGhpcy5nZXRTdGF0ZSh0aGlzLmluaXRpYWxTdGF0ZSk7XHJcbiAgICBwdWJzdWIucHVibGlzaCgnbmV3X3N0YXRlJywgdGhpcy5jdXJyZW50U3RhdGUpO1xyXG4gICAgbGV0IGludGVydmFscyA9IFByb21pc2UucmVzb2x2ZSgpOyAvLyBpbml0IHByb21pc2UgY2hhaW5cclxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5zdGVwczsgaSsrKSB7XHJcbiAgICAgIGludGVydmFscyA9IGludGVydmFsc1xyXG4gICAgICAgLnRoZW4oKCkgPT4geyByZXR1cm4gdGhpcy5tYWtlQnJlYWsoKSB9KVxyXG4gICAgICAgLnRoZW4oKCkgPT4geyByZXR1cm4gdGhpcy5oYW5kbGVFdmVudCgpIH0pXHJcbiAgICAgICAudGhlbihzdGF0ZSA9PiB7IHRoaXMuaGFuZGxlTmV3U3RhdGUoc3RhdGUpIH0pXHJcbiAgICB9XHJcbiAgICBpbnRlcnZhbHMuY2F0Y2goc3RhdGUgPT4gdGhpcy5oYW5kbGVOZXdTdGF0ZShzdGF0ZSkpO1xyXG4gICAgcmV0dXJuIGludGVydmFscztcclxuICB9XHJcblxyXG4gIG1ha2VCcmVhaygpIHtcclxuICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XHJcbiAgICAgIHRoaXMuc3ViU3RvcCA9IHB1YnN1Yi5zdWJzY3JpYmUoJ21vZGVsX3N0b3AnLCAoKSA9PiB7IHJlamVjdCh0aGlzLnN0b3BTdGF0ZSk7IH0pXHJcbiAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgIHRoaXMuY2xlYXJTdWJzKCk7XHJcbiAgICAgICAgcmVzb2x2ZSgpXHJcbiAgICAgIH0sIHRoaXMuYnJlYWtUaW1lKTtcclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgaGFuZGxlRXZlbnQoKSB7XHJcbiAgICBjb25zdCBldmVudCA9IHRoaXMuY3VycmVudFN0YXRlLmV2ZW50O1xyXG4gICAgY29uc3QgZXZlbnRTdGFydFRpbWUgPSBEYXRlLm5vdygpO1xyXG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcclxuICAgICAgLy8gc2VuZCBkYXRhIGFib3V0IG5ldyBldmVudCB0byBvdGhlciBtb2R1bGVzXHJcbiAgICAgIHB1YnN1Yi5wdWJsaXNoKCdldmVudCcsIGV2ZW50KTtcclxuXHJcbiAgICAgIC8vIGxpc3RlbiB0byB1c2VyIGFjdGlvblxyXG4gICAgICAvLyBhbmQgaWYgdXNlciBpbnB1dCBjb3JyZWN0IGdvIHRvIG5leHQgc3RhdGVcclxuICAgICAgdGhpcy5zdWJJbnB1dCA9IHB1YnN1Yi5zdWJzY3JpYmUoJ3VzZXJfaW5wdXQnLCBkYXRhID0+IHtcclxuICAgICAgICBjb25zdCB0aW1lU3BlbnQgPSBEYXRlLm5vdygpIC0gZXZlbnRTdGFydFRpbWU7XHJcbiAgICAgICAgY29uc3QgbmV4dFN0YXRlSWQgPSB0aGlzLmN1cnJlbnRTdGF0ZS5oYW5kbGVJbnB1dChkYXRhLCB0aW1lU3BlbnQpO1xyXG4gICAgICAgIGNvbnN0IG5leHRTdGF0ZSA9IHRoaXMuZ2V0U3RhdGUobmV4dFN0YXRlSWQpO1xyXG4gICAgICAgIGlmICggbmV4dFN0YXRlICkge1xyXG4gICAgICAgICAgbmV4dFN0YXRlLmxhc3QgPyByZWplY3QobmV4dFN0YXRlKSA6IHJlc29sdmUobmV4dFN0YXRlKTtcclxuICAgICAgICB9XHJcbiAgICAgIH0pO1xyXG5cclxuICAgICAgdGhpcy5zdWJTdG9wID0gcHVic3ViLnN1YnNjcmliZSgnbW9kZWxfc3RvcCcsICgpID0+IHtcclxuICAgICAgICByZWplY3QodGhpcy5zdG9wU3RhdGUpO1xyXG4gICAgICB9KTtcclxuXHJcbiAgICAgIC8vIGhhbmRsZSBpbmFjdGl2ZVxyXG4gICAgICBjb25zdCBpbmFjdGl2ZVRpbWUgPSB0aGlzLmN1cnJlbnRTdGF0ZS5nZXRJbmFjdGl2ZVRpbWUoKTtcclxuICAgICAgdGhpcy50aW1lb3V0ID0gc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgY29uc3QgbmV4dFN0YXRlSWQgPSB0aGlzLmN1cnJlbnRTdGF0ZS5nZXRJbmFjdGl2ZUFjdGlvbigpLm5leHRTdGF0ZTtcclxuICAgICAgICBjb25zdCBuZXh0U3RhdGUgPSB0aGlzLmdldFN0YXRlKG5leHRTdGF0ZUlkKTtcclxuICAgICAgICBuZXh0U3RhdGUubGFzdCA/IHJlamVjdChuZXh0U3RhdGUpIDogcmVzb2x2ZShuZXh0U3RhdGUpO1xyXG4gICAgICB9LCBpbmFjdGl2ZVRpbWUpO1xyXG4gICAgfSlcclxuICB9XHJcblxyXG4gIHN0b3AoKSB7XHJcbiAgICBwdWJzdWIucHVibGlzaCgnbW9kZWxfc3RvcCcpO1xyXG4gIH1cclxuXHJcbiAgaGFuZGxlTmV3U3RhdGUoc3RhdGUpIHtcclxuICAgIHRoaXMuY3VycmVudFN0YXRlID0gc3RhdGU7XHJcbiAgICBjbGVhclRpbWVvdXQodGhpcy50aW1lb3V0KTtcclxuICAgIHRoaXMuY2xlYXJTdWJzKCk7XHJcbiAgICBwdWJzdWIucHVibGlzaCgnbmV3X3N0YXRlJywgc3RhdGUpO1xyXG4gIH1cclxuXHJcbiAgY2xlYXJTdWJzKCkge1xyXG4gICAgaWYgKHRoaXMuc3ViSW5wdXQpIHtcclxuICAgICAgdGhpcy5zdWJJbnB1dC5yZW1vdmUoKTtcclxuICAgIH1cclxuICAgIGlmICh0aGlzLnN1YlN0b3ApIHtcclxuICAgICAgdGhpcy5zdWJTdG9wLnJlbW92ZSgpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IE1vZGVsO1xyXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9sZWFybmluZy9tb2RlbC5qcyIsImltcG9ydCBzdGF0ZSBmcm9tICcuL3NjZW5lX2NvbXBvbmVudHMvc3RhdGUnO1xyXG5pbXBvcnQgdG9vbHMgZnJvbSAnLi9zY2VuZV9jb21wb25lbnRzL3Rvb2xzJztcclxuXHJcbmNvbnN0IGV4cG9ydHMgPSB7fTtcclxuXHJcbi8vIFNjZW5lIG1ldGFkYXRhXHJcbmNvbnN0ICRtb2RlbE5hbWUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcubW9kZWwtbmFtZScpO1xyXG5leHBvcnRzLmluaXQgPSBmdW5jdGlvbihtb2RlbCwgcmVzcG9uc2UpIHtcclxuICAkbW9kZWxOYW1lLnRleHRDb250ZW50ID0gbW9kZWwubmFtZTtcclxuICBzdGF0ZS5zZXQobW9kZWwuc3RhcnRTdGF0ZSk7XHJcbiAgdG9vbHMuaW5pdChyZXNwb25zZS50b29scyk7XHJcbiAgcmV0dXJuIHRoaXM7XHJcbn1cclxuXHJcbi8vIE1hbmFnZSBjb250ZW50IHZpc2liaWxpdHlcclxuY29uc3QgJGNvbnRlbnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuY29udGVudCcpO1xyXG5leHBvcnRzLnNob3dDb250ZW50ID0gZnVuY3Rpb24oKSB7XHJcbiAgc2V0Q29udGVudERpc3BsYXkoJ2ZsZXgnKTtcclxuICByZXR1cm4gdGhpcztcclxufVxyXG5leHBvcnRzLmhpZGVDb250ZW50ID0gZnVuY3Rpb24oKSB7XHJcbiAgc2V0Q29udGVudERpc3BsYXkoJ25vbmUnKTtcclxuICByZXR1cm4gdGhpcztcclxufVxyXG5mdW5jdGlvbiBzZXRDb250ZW50RGlzcGxheShkaXNwbGF5KSB7XHJcbiAgJGNvbnRlbnQuc3R5bGUuZGlzcGxheSA9IGRpc3BsYXk7XHJcbn1cclxuXHJcbi8vIE1hbmFnZSBidXR0b25zIHN0YXRlXHJcbmV4cG9ydHMuZW5hYmxlQnV0dG9ucyA9IGZ1bmN0aW9uKC4uLmJ1dHRvbnMpIHtcclxuICBzZXRCdXR0b25zU3RhdGUoYnV0dG9ucywgZmFsc2UpO1xyXG4gIHJldHVybiB0aGlzO1xyXG59XHJcbmV4cG9ydHMuZGlzYWJsZUJ1dHRvbnMgPSBmdW5jdGlvbiguLi5idXR0b25zKSB7XHJcbiAgc2V0QnV0dG9uc1N0YXRlKGJ1dHRvbnMsIHRydWUpO1xyXG4gIHJldHVybiB0aGlzO1xyXG59XHJcbmZ1bmN0aW9uIHNldEJ1dHRvbnNTdGF0ZShidXR0b25zLCB2YWx1ZSkge1xyXG4gIGJ1dHRvbnMuZm9yRWFjaChidXR0b24gPT4gYnV0dG9uLmRpc2FibGVkID0gdmFsdWUpO1xyXG59XHJcblxyXG4vLyBEZWxlZ2F0ZSBwdWJsaWMgbWV0aG9kcyB0byBjb21wb25lbnRzXHJcbmV4cG9ydHMuZ2V0VG9vbHNEYXRhID0gKCkgPT5cclxuICB0b29scy5nZXRUb29sc0RhdGEoKTtcclxuXHJcbmV4cG9ydHMuc2V0U3RhdGUgPSBzdGF0ZURhdGEgPT5cclxuICBzdGF0ZS5zZXQoc3RhdGVEYXRhKTtcclxuXHJcbmV4cG9ydHMuc2hvd0V2ZW50ID0gZXZlbnREYXRhID0+XHJcbiAgc3RhdGUuc2hvd0V2ZW50KGV2ZW50RGF0YSk7XHJcblxyXG5leHBvcnRzLmhpZGVFdmVudCA9ICgpID0+XHJcbiAgc3RhdGUuaGlkZUV2ZW50KCk7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBleHBvcnRzO1xyXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9sZWFybmluZy9zY2VuZS5qcyIsImZ1bmN0aW9uIGFqYXgocGF0aCA9ICcnLCBvcHRpb25zID0ge30pIHtcclxuICBjb25zdCB4aHIgPSBuZXcgWE1MSHR0cFJlcXVlc3QoKTtcclxuICB4aHIub3BlbihvcHRpb25zLm1ldGhvZCB8fCAnR0VUJywgcGF0aCwgdHJ1ZSk7XHJcbiAgaWYgKG9wdGlvbnMuaGVhZGVycykgeyBzZXRYSFJIZWFkZXJzKHhociwgb3B0aW9ucy5oZWFkZXJzKTsgfVxyXG4gIHhoci5zZW5kKG9wdGlvbnMuZGF0YSk7XHJcblxyXG4gIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XHJcbiAgICB4aHIub25yZWFkeXN0YXRlY2hhbmdlID0gZnVuY3Rpb24oKSB7XHJcbiAgICAgIGlmKHhoci5yZWFkeVN0YXRlID09IDQpIHtcclxuICAgICAgICBpZih4aHIuc3RhdHVzID09IDIwMCkge1xyXG4gICAgICAgICAgcmVzb2x2ZSh4aHIucmVzcG9uc2VUZXh0KTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgcmVqZWN0KHhoci5zdGF0dXNUZXh0KTtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9KVxyXG59XHJcblxyXG5mdW5jdGlvbiBzZXRYSFJIZWFkZXJzKHhociwgaGVhZGVycykge1xyXG4gIGZvciAobGV0IGhlYWRlciBpbiBoZWFkZXJzKSB7XHJcbiAgICB4aHIuc2V0UmVxdWVzdEhlYWRlcihoZWFkZXIsIGhlYWRlcnNbaGVhZGVyc10pO1xyXG4gIH1cclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgYWpheDtcclxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vdXRpbHMvYWpheC5qcyIsIi8vIHJlbW92ZWQgYnkgZXh0cmFjdC10ZXh0LXdlYnBhY2stcGx1Z2luXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi4vc2Fzcy9sZWFybmluZy5zY3NzXG4vLyBtb2R1bGUgaWQgPSA1XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsImNsYXNzIEFjdGlvbiB7XHJcbiAgY29uc3RydWN0b3IoZGF0YSkge1xyXG4gICAgdGhpcy5taW5UaW1lID0gZGF0YS5taW5UaW1lO1xyXG4gICAgdGhpcy5tYXhUaW1lID0gZGF0YS5tYXhUaW1lO1xyXG4gICAgdGhpcy5uZXh0U3RhdGUgPSBkYXRhLm5leHRTdGF0ZTtcclxuICAgIGlmIChkYXRhLmluYWN0aXZlKSB7XHJcbiAgICAgIHRoaXMuaW5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICB0aGlzLnRvb2xzID0gW107XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB0aGlzLmluYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgIHRoaXMudG9vbHMgPSBkYXRhLnRvb2xzO1xyXG4gICAgfVxyXG5cclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIEBwYXJhbSBbeyBpZDogTnVtYmVyLCB2YWx1ZTogTnVtYmVyL0Jvb2xlYW4gfSwgey4uLn1dXHJcbiAgICogQHBhcmFtIE51bWJlclxyXG4gICAqIEByZXR1cm4gQm9vbGVhblxyXG4gICAqL1xyXG4gIGlzU3VpdGFibGUoZGF0YSwgdGltZSkge1xyXG4gICAgcmV0dXJuIHRoaXMucmlnaHRUaW1lKHRpbWUpICYmIHRoaXMucmlnaHREYXRhKGRhdGEpO1xyXG4gIH1cclxuXHJcbiAgcmlnaHREYXRhKGRhdGEgPSBbXSkge1xyXG4gICAgaWYoIUFycmF5LmlzQXJyYXkoZGF0YSkpIHsgdGhyb3cgbmV3IFR5cGVFcnJvcihgSW52YWxpZCB0eXBlIG9mIGRhdGEgZnJvbSB0b29scy4gRXhwZWN0ZWQgYXJyYXksIGdvdCAke3R5cGVvZiBkYXRhfWApOyB9XHJcbiAgICByZXR1cm4gdGhpcy50b29scy5ldmVyeSh0b29sID0+IHtcclxuICAgICAgLy8g0JXRgdC70Lgg0YHRgNC10LTQuCDQv9C+0LvRg9GH0LXQvdC90YvRhSDQuNGC0LXQvNC+0LIg0L3QtdGCLCDRgtC+0LPQviDQutC+0YLQvtGA0YvQuSDQtdGB0YLRjCDQsiDQtNCw0L3QvdC+0Lwg0Y3QutGI0LXQvdC1XHJcbiAgICAgIGNvbnN0IGNoZWNrVG9vbCA9IGRhdGEuZmluZChvYmogPT4gb2JqLmlkID09IHRvb2wuaWQpO1xyXG4gICAgICBpZiAoIWNoZWNrVG9vbCkgeyByZXR1cm4gZmFsc2U7IH1cclxuXHJcbiAgICAgIC8vINCU0LvRjyDQv9C10YDQtdC60LvRjtGH0LDRgtC10LvRj1xyXG4gICAgICBpZiAodHlwZW9mIHRvb2wudmFsdWUgPT09ICdib29sZWFuJykgeyByZXR1cm4gY2hlY2tUb29sLnZhbHVlID09PSB0b29sLnZhbHVlOyB9XHJcblxyXG4gICAgICAvLyDQlNC70Y8g0YDQtdC90LTQttCwXHJcbiAgICAgIGlmIChBcnJheS5pc0FycmF5KHRvb2wudmFsdWUpKSB7IHJldHVybiB0aGlzLmluY2x1ZGVzVmFsdWUoY2hlY2tUb29sLnZhbHVlLCB0b29sLnZhbHVlKSB9XHJcblxyXG4gICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIGluY2x1ZGVzVmFsdWUodmFsdWUsIGJvcmRlcnMpIHtcclxuICAgIGlmICh0eXBlb2YgdmFsdWUgIT09ICdudW1iZXInKSB0aHJvdyBuZXcgVHlwZUVycm9yKCdWYWx1ZSBzaG91bGQgYmUgaW50ZWdlcicpO1xyXG4gICAgcmV0dXJuICh2YWx1ZSA+PSBib3JkZXJzWzBdKSAmJiAodmFsdWUgPD0gYm9yZGVyc1sxXSk7XHJcbiAgfVxyXG5cclxuICByaWdodFRpbWUodGltZSkge1xyXG4gICAgaWYgKHR5cGVvZiB0aW1lICE9PSAnbnVtYmVyJykgdGhyb3cgbmV3IFR5cGVFcnJvcignVGltZSBzaG91bGQgYmUgaW50ZWdlciAobXMpJyk7XHJcbiAgICByZXR1cm4gKHRpbWUgPj0gdGhpcy5taW5UaW1lKSAmJiAodGltZSA8PSB0aGlzLm1heFRpbWUpO1xyXG4gIH1cclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgQWN0aW9uO1xyXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9sZWFybmluZy9tb2RlbF9jb21wb25lbnRzL2FjdGlvbi5qcyIsImNsYXNzIEV2ZW50IHtcclxuICBjb25zdHJ1Y3RvcihkYXRhKSB7XHJcbiAgICB0aGlzLmlkID0gZGF0YS5pZDtcclxuICAgIHRoaXMubmFtZSA9IGRhdGEubmFtZTtcclxuICAgIHRoaXMuZGVzY3JpcHRpb24gPSBkYXRhLmRlc2NyaXB0aW9uO1xyXG4gIH1cclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgRXZlbnQ7XHJcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2xlYXJuaW5nL21vZGVsX2NvbXBvbmVudHMvZXZlbnQuanMiLCJpbXBvcnQgRXZlbnQgZnJvbSAnLi9ldmVudCcgO1xyXG5pbXBvcnQgQWN0aW9uIGZyb20gJy4vYWN0aW9uJztcclxuXHJcbmNsYXNzIFN0YXRlIHtcclxuICBjb25zdHJ1Y3RvcihkYXRhKSB7XHJcbiAgICB0aGlzLmlkID0gZGF0YS5pZDtcclxuICAgIHRoaXMubmFtZSA9IGRhdGEubmFtZTtcclxuICAgIHRoaXMuaW1nID0gZGF0YS5pbWc7XHJcbiAgICB0aGlzLnBhcmFtcyA9IGRhdGEucGFyYW1zO1xyXG5cclxuICAgIGlmKGRhdGEubGFzdCkge1xyXG4gICAgICB0aGlzLmxhc3QgPSB0cnVlO1xyXG4gICAgICB0aGlzLmV2ZW50ID0gbnVsbDtcclxuICAgICAgdGhpcy5hY3Rpb25zID0gbnVsbDtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHRoaXMuZXZlbnQgPSBuZXcgRXZlbnQoZGF0YS5ldmVudCk7XHJcbiAgICAgIHRoaXMuYWN0aW9ucyA9IGRhdGEuYWN0aW9ucy5tYXAoYWN0aW9uID0+IG5ldyBBY3Rpb24oYWN0aW9uKSk7XHJcbiAgICAgIHRoaXMubGFzdCA9IGZhbHNlO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgZ2V0SW5hY3RpdmVUaW1lKCkge1xyXG4gICAgY29uc3QgdGltZXMgPSB0aGlzLmdldEFsbEFjdGlvblRpbWVzKCk7XHJcbiAgICByZXR1cm4gTWF0aC5tYXgoLi4udGltZXMpO1xyXG4gIH1cclxuXHJcbiAgZ2V0SW5hY3RpdmVBY3Rpb24oKSB7XHJcbiAgICByZXR1cm4gdGhpcy5hY3Rpb25zLmZpbmQoYWN0aW9uID0+IGFjdGlvbi5pbmFjdGl2ZSA9PT0gdHJ1ZSk7XHJcbiAgfVxyXG5cclxuICBnZXRBbGxBY3Rpb25UaW1lcygpIHtcclxuICAgIHJldHVybiB0aGlzLmFjdGlvbnMubWFwKGFjdGlvbiA9PiBhY3Rpb24ubWF4VGltZSB8fCAwKTtcclxuICB9XHJcblxyXG4gIGhhbmRsZUlucHV0KGRhdGEsIHRpbWUpIHtcclxuICAgIGNvbnN0IHN1aXRlZEFjdGlvbnMgPSB0aGlzLmFjdGlvbnMuZmlsdGVyKGFjdGlvbiA9PiBhY3Rpb24uaXNTdWl0YWJsZShkYXRhLCB0aW1lKSk7XHJcbiAgICBpZiAoc3VpdGVkQWN0aW9ucy5sZW5ndGggPiAwKSB7XHJcbiAgICAgIHJldHVybiBzdWl0ZWRBY3Rpb25zWzBdLm5leHRTdGF0ZTtcclxuICAgIH1cclxuICAgIHJldHVybiBudWxsO1xyXG4gIH1cclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgU3RhdGU7XHJcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2xlYXJuaW5nL21vZGVsX2NvbXBvbmVudHMvc3RhdGUuanMiLCJpbXBvcnQgbm9kZUZhY3RvcnkgZnJvbSAnLi4vLi4vdXRpbHMvbm9kZUZhY3RvcnknO1xyXG5pbXBvcnQgdGltZXIgZnJvbSAnLi4vLi4vdXRpbHMvdGltZXInO1xyXG5cclxuY29uc3QgJG5hbWUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcubW9kZWwtc3RhdGUtbmFtZScpO1xyXG5jb25zdCAkaW1nID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLm1vZGVsLXN0YXRlLWltZycpO1xyXG5jb25zdCAkcGFyYW1zID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLm1vZGVsLXBhcmFtcy12YWx1ZXMnKTtcclxuXHJcbmNvbnN0ICRldmVudCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5tb2RlbC1ldmVudCcpO1xyXG5jb25zdCAkZXZlbnRIZWFkZXIgPSAkZXZlbnQucXVlcnlTZWxlY3RvcignLm1vZGVsLWV2ZW50LW5hbWUgc3BhbicpO1xyXG5jb25zdCAkZXZlbnRCb2R5ID0gJGV2ZW50LnF1ZXJ5U2VsZWN0b3IoJy5tb2RlbC1ldmVudC1pbmZvJyk7XHJcblxyXG5jb25zdCAkdGltZXJDb250YWluZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcubW9kZWwtdGltZXInKTtcclxuJHRpbWVyQ29udGFpbmVyLmFwcGVuZENoaWxkKHRpbWVyLm5vZGUpO1xyXG5cclxuZnVuY3Rpb24gc2V0KHsgbmFtZSwgaW1nLCBwYXJhbXMgfSkge1xyXG4gICRuYW1lLnRleHRDb250ZW50ID0gbmFtZTtcclxuICAkaW1nLnNldEF0dHJpYnV0ZSgnc3JjJywgaW1nKTtcclxuICBzZXRQYXJhbWV0ZXJzKHBhcmFtcyk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIHNldFBhcmFtZXRlcnMocGFyYW1zKSB7XHJcbiAgY29uc3QgZnJhZyA9IGRvY3VtZW50LmNyZWF0ZURvY3VtZW50RnJhZ21lbnQoKTtcclxuICBmb3IgKGxldCBrZXkgaW4gcGFyYW1zKSB7XHJcbiAgICBmcmFnLmFwcGVuZENoaWxkKGNyZWF0ZVBhcmFtZXRlTm9kZShrZXksIHBhcmFtc1trZXldKSk7XHJcbiAgfVxyXG4gICRwYXJhbXMuaW5uZXJIVE1MID0gXCJcIjtcclxuICAkcGFyYW1zLmFwcGVuZENoaWxkKGZyYWcpO1xyXG59XHJcblxyXG5mdW5jdGlvbiBjcmVhdGVQYXJhbWV0ZU5vZGUoa2V5LCB2YWx1ZSkge1xyXG4gIGNvbnN0IGRpdiA9IG5vZGVGYWN0b3J5KCdkaXYnLCB7IGNsYXNzTGlzdDogWydwYXJhbWV0ZXInXSB9KTtcclxuXHJcbiAgY29uc3Qga2V5U3BhbiA9IG5vZGVGYWN0b3J5KCdzcGFuJywgeyB0ZXh0Q29udGVudDoga2V5IH0pO1xyXG4gIGRpdi5hcHBlbmRDaGlsZChrZXlTcGFuKTtcclxuXHJcbiAgY29uc3QgdmFsdWVTcGFuID0gbm9kZUZhY3RvcnkoJ3NwYW4nLCB7IHRleHRDb250ZW50OiB2YWx1ZSB9KTtcclxuICBkaXYuYXBwZW5kQ2hpbGQodmFsdWVTcGFuKTtcclxuXHJcbiAgcmV0dXJuIGRpdjtcclxufVxyXG5cclxuXHJcbi8qKiBTZXRzIGV2ZW50IGRhdGEgdG8gVUkgKi9cclxuZnVuY3Rpb24gc2hvd0V2ZW50KGV2ZW50KSB7XHJcbiAgJGV2ZW50SGVhZGVyLnRleHRDb250ZW50ID0gZXZlbnQubmFtZTtcclxuICAkZXZlbnRCb2R5LnRleHRDb250ZW50ID0gZXZlbnQuZGVzY3JpcHRpb247XHJcbiAgJGV2ZW50LmNsYXNzTGlzdC5yZW1vdmUoJ2lzLWhpZGRlbicsICdzbGlkZS10b3AnKTtcclxuICBzaG93VGltZXIoKTtcclxufVxyXG5mdW5jdGlvbiBoaWRlRXZlbnQoKSB7XHJcbiAgJGV2ZW50LmNsYXNzTGlzdC5hZGQoJ2lzLWhpZGRlbicsICdzbGlkZS10b3AnKTtcclxuICBoaWRlVGltZXIoKTtcclxufVxyXG5cclxuZnVuY3Rpb24gc2hvd1RpbWVyKCkge1xyXG4gICR0aW1lckNvbnRhaW5lci5jbGFzc0xpc3QucmVtb3ZlKCdpcy1oaWRkZW4nKTtcclxuICB0aW1lci5zdGFydCgpO1xyXG59XHJcbmZ1bmN0aW9uIGhpZGVUaW1lcigpIHtcclxuICAkdGltZXJDb250YWluZXIuY2xhc3NMaXN0LmFkZCgnaXMtaGlkZGVuJyk7XHJcbiAgdGltZXIuc3RvcCgpO1xyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCB7XHJcbiAgc2V0LFxyXG4gIHNob3dFdmVudCxcclxuICBoaWRlRXZlbnRcclxufVxyXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9sZWFybmluZy9zY2VuZV9jb21wb25lbnRzL3N0YXRlLmpzIiwiaW1wb3J0IG5vZGVGYWN0b3J5IGZyb20gJy4uLy4uL3V0aWxzL25vZGVGYWN0b3J5JztcclxuXHJcbmNvbnN0IHRvb2xUeXBlcyA9IHtcclxuICBSQU5HRTogJ3JhbmdlJyxcclxuICBTV0lUQ0g6ICdzd2l0Y2gnXHJcbn1cclxuY29uc3QgJHRvb2xzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnRvb2xzLWxpc3QnKTtcclxuXHJcbmZ1bmN0aW9uIGluaXQodG9vbHMpIHtcclxuICBjb25zdCBmcmFnbWVudCA9IGRvY3VtZW50LmNyZWF0ZURvY3VtZW50RnJhZ21lbnQoKTtcclxuXHJcbiAgdG9vbHMuZm9yRWFjaCh0b29sID0+IHtcclxuICAgIC8vIGNyZWF0ZSB0b29sIHdyYXBwZXJcclxuICAgIGNvbnN0IGRpdiA9IG5vZGVGYWN0b3J5KCdkaXYnLCB7IGNsYXNzTGlzdDogWyd0b29sJ10gfSk7XHJcblxyXG4gICAgY29uc3QgbGFiZWwgPSBub2RlRmFjdG9yeSgnbGFiZWwnLCB7XHJcbiAgICAgIGNsYXNzTGlzdDogWyd0b29sLW5hbWUnXSxcclxuICAgICAgYXR0cnM6IHsgXCJmb3JcIjogdG9vbC5uYW1lIH0sXHJcbiAgICAgIHRleHRDb250ZW50OiB0b29sLm5hbWVcclxuICAgIH0pO1xyXG4gICAgZGl2LmFwcGVuZENoaWxkKGxhYmVsKTtcclxuXHJcbiAgICBjb25zdCB0b29sTm9kZSA9IGNyZWF0ZVRvb2xOb2RlKHRvb2wpO1xyXG4gICAgZGl2LmFwcGVuZENoaWxkKHRvb2xOb2RlKTtcclxuXHJcbiAgICBmcmFnbWVudC5hcHBlbmRDaGlsZChkaXYpO1xyXG4gIH0pO1xyXG5cclxuICAkdG9vbHMuaW5uZXJIVE1MID0gXCJcIjtcclxuICAkdG9vbHMuYXBwZW5kQ2hpbGQoZnJhZ21lbnQpO1xyXG59XHJcblxyXG5mdW5jdGlvbiBjcmVhdGVUb29sTm9kZSh0b29sKSB7XHJcbiAgc3dpdGNoKHRvb2wudHlwZSkge1xyXG4gICAgY2FzZSB0b29sVHlwZXMuUkFOR0U6ICAgcmV0dXJuIGNyZWF0ZVJhbmdlVG9vbCh0b29sKTtcclxuICAgIGNhc2UgdG9vbFR5cGVzLlNXSVRDSDogIHJldHVybiBjcmVhdGVTd2l0Y2hUb29sKHRvb2wpO1xyXG4gICAgZGVmYXVsdDogICAgICAgICAgICAgICAgcmV0dXJuICfQndC10LjQt9Cy0LXRgdGC0L3Ri9C5INC/0YDQuNCx0L7RgCc7XHJcbiAgfVxyXG59XHJcblxyXG5mdW5jdGlvbiBjcmVhdGVSYW5nZVRvb2wodG9vbCkge1xyXG4gIGNvbnN0IGRpdklucHV0ID0gbm9kZUZhY3RvcnkoJ2RpdicsIHsgY2xhc3NMaXN0OiBbJ3JhbmdlJ10gfSk7XHJcblxyXG4gIGNvbnN0IHNwYW5NaW4gPSBub2RlRmFjdG9yeSgnc3BhbicsIHsgdGV4dENvbnRlbnQ6IHRvb2wubWluIH0pO1xyXG4gIGRpdklucHV0LmFwcGVuZENoaWxkKHNwYW5NaW4pXHJcblxyXG4gIGNvbnN0IGlucHV0ID0gbm9kZUZhY3RvcnkoJ2lucHV0Jywge1xyXG4gICAgYXR0cnM6IHtcclxuICAgICAgJ2RhdGEtaWQnOiB0b29sLmlkLFxyXG4gICAgICAnZGF0YS10eXBlJzogJ3JhbmdlJyxcclxuICAgICAgJ25hbWUnOiB0b29sLm5hbWUsXHJcbiAgICAgICd0eXBlJzogJ3JhbmdlJyxcclxuICAgICAgJ21pbic6IHRvb2wubWluLFxyXG4gICAgICAnbWF4JzogdG9vbC5tYXhcclxuICAgIH1cclxuICB9KTtcclxuICBkaXZJbnB1dC5hcHBlbmRDaGlsZChpbnB1dCk7XHJcblxyXG4gIGNvbnN0IHNwYW5NYXggPSBub2RlRmFjdG9yeSgnc3BhbicsIHsgdGV4dENvbnRlbnQ6IHRvb2wubWF4IH0pO1xyXG4gIGRpdklucHV0LmFwcGVuZENoaWxkKHNwYW5NYXgpO1xyXG5cclxuICBjb25zdCBkaXZDdXJyZW50ID0gbm9kZUZhY3RvcnkoJ2RpdicsIHsgY2xhc3NMaXN0OiBbJ3JhbmdlLWN1cnJlbnQtdmFsdWUnXSB9KTtcclxuICBjb25zdCBzcGFuQ3VycmVudCA9IG5vZGVGYWN0b3J5KCdzcGFuJywgeyB0ZXh0Q29udGVudDogaW5wdXQudmFsdWUgfSk7XHJcbiAgZGl2Q3VycmVudC5hcHBlbmRDaGlsZChzcGFuQ3VycmVudCk7XHJcblxyXG4gIGlucHV0LmFkZEV2ZW50TGlzdGVuZXIoJ2lucHV0JywgKGV2dCkgPT4ge1xyXG4gICAgc3BhbkN1cnJlbnQudGV4dENvbnRlbnQgPSBldnQudGFyZ2V0LnZhbHVlO1xyXG4gIH0pO1xyXG5cclxuICBjb25zdCBmcmFnbWVudCA9IGRvY3VtZW50LmNyZWF0ZURvY3VtZW50RnJhZ21lbnQoKTtcclxuICBmcmFnbWVudC5hcHBlbmRDaGlsZChkaXZJbnB1dCk7XHJcbiAgZnJhZ21lbnQuYXBwZW5kQ2hpbGQoZGl2Q3VycmVudCk7XHJcblxyXG4gIHJldHVybiBmcmFnbWVudDtcclxufVxyXG5cclxuZnVuY3Rpb24gY3JlYXRlU3dpdGNoVG9vbCh0b29sKSB7XHJcbiAgY29uc3QgbGFiZWwgPSBub2RlRmFjdG9yeSgnbGFiZWwnLCB7IGNsYXNzTGlzdDogWydzd2l0Y2gnXSB9KTtcclxuXHJcbiAgY29uc3QgaW5wdXQgPSBub2RlRmFjdG9yeSgnaW5wdXQnLCB7XHJcbiAgICBhdHRyczoge1xyXG4gICAgICAnZGF0YS1pZCc6IHRvb2wuaWQsXHJcbiAgICAgICdkYXRhLXR5cGUnOiAnc3dpdGNoJyxcclxuICAgICAgJ3R5cGUnOiAnY2hlY2tib3gnXHJcbiAgICB9XHJcbiAgfSk7XHJcbiAgbGFiZWwuYXBwZW5kQ2hpbGQoaW5wdXQpO1xyXG5cclxuICBjb25zdCBkaXYgPSBub2RlRmFjdG9yeSgnZGl2JywgeyBjbGFzc0xpc3Q6IFsnc2xpZGVyJ10gfSk7XHJcbiAgbGFiZWwuYXBwZW5kQ2hpbGQoZGl2KTtcclxuXHJcbiAgcmV0dXJuIGxhYmVsO1xyXG59XHJcblxyXG5mdW5jdGlvbiBnZXRUb29sc0RhdGEoKSB7XHJcbiAgY29uc3QgdG9vbHNEYXRhID0gW107XHJcbiAgY29uc3QgaW5wdXRzID0gJHRvb2xzLnF1ZXJ5U2VsZWN0b3JBbGwoJ2lucHV0W2RhdGEtaWRdJyk7XHJcbiAgaW5wdXRzLmZvckVhY2goaW5wdXQgPT4ge1xyXG4gICAgY29uc3QgeyBpZCwgdHlwZSB9ID0gaW5wdXQuZGF0YXNldDtcclxuICAgIGxldCB2YWx1ZTtcclxuICAgIHN3aXRjaCh0eXBlKSB7XHJcbiAgICAgIGNhc2UgdG9vbFR5cGVzLlJBTkdFOiB2YWx1ZSA9IHBhcnNlSW50KGlucHV0LnZhbHVlKTsgYnJlYWs7XHJcbiAgICAgIGNhc2UgdG9vbFR5cGVzLlNXSVRDSDogdmFsdWUgPSBpbnB1dC5jaGVja2VkOyBicmVhaztcclxuICAgICAgZGVmYXVsdDogdGhyb3cgbmV3IEVycm9yKGDQndC10LrQvtGA0YDQtdC60YLQvdGL0Lkg0YLQuNC/INC/0YDQuNCx0L7RgNCwLiBJRDogJHtpZH1gKTtcclxuICAgIH1cclxuICAgIHRvb2xzRGF0YS5wdXNoKHsgaWQsIHZhbHVlIH0pO1xyXG4gIH0pO1xyXG4gIHJldHVybiB0b29sc0RhdGE7XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IHtcclxuICBpbml0LFxyXG4gIGdldFRvb2xzRGF0YVxyXG59O1xyXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9sZWFybmluZy9zY2VuZV9jb21wb25lbnRzL3Rvb2xzLmpzIiwiaW1wb3J0IG5vZGVGYWN0b3J5IGZyb20gJy4vbm9kZUZhY3RvcnknO1xyXG5cclxuZnVuY3Rpb24gbXNUb0NvbnRlbnQobXMpIHtcclxuICBjb25zdCBzZWNvbmRzID0gTWF0aC5yb3VuZChtcyAvIDEwMDApO1xyXG4gIGNvbnN0IG1pbnMgPSBNYXRoLmZsb29yKHNlY29uZHMgLyA2MCk7XHJcbiAgY29uc3Qgc2Vjb25kc0xlZnQgPSBzZWNvbmRzIC0gKG1pbnMgKiA2MCk7XHJcblxyXG4gIHJldHVybiBgJHttaW5zfToke3NlY29uZHNMZWZ0ID49IDEwID8gJycgOiAnMCd9JHtzZWNvbmRzTGVmdH1gO1xyXG59XHJcblxyXG5jb25zdCB0aW1lciA9IHtcclxuICBzdGFydFRpbWU6IG51bGwsXHJcbiAgaW50ZXJ2YWw6IG51bGwsXHJcbiAgbm9kZTogbm9kZUZhY3RvcnkoJ3NwYW4nLCB7IGNsYXNzTGlzdDogWyd0aW1lciddLCB0ZXh0Q29udGVudDogJzA6MDAnIH0pLFxyXG4gIHN0YXJ0OiBmdW5jdGlvbigpIHtcclxuICAgIHRoaXMuc3RhcnRUaW1lID0gRGF0ZS5ub3coKTtcclxuICAgIHRoaXMuaW50ZXJ2YWwgPSBzZXRJbnRlcnZhbCgoKSA9PiB7XHJcbiAgICAgIGNvbnN0IGVsYXBzZWQgPSBEYXRlLm5vdygpIC0gdGhpcy5zdGFydFRpbWU7XHJcbiAgICAgIHRoaXMubm9kZS50ZXh0Q29udGVudCA9IG1zVG9Db250ZW50KGVsYXBzZWQpO1xyXG4gICAgfSwgMTAwMCk7XHJcbiAgfSxcclxuICBzdG9wOiBmdW5jdGlvbigpIHtcclxuICAgIGlmICghdGhpcy5zdGFydFRpbWUpIHsgcmV0dXJuOyB9XHJcbiAgICB0aGlzLnN0YXJ0VGltZSA9IG51bGw7XHJcbiAgICBjbGVhckludGVydmFsKHRoaXMuaW50ZXJ2YWwpO1xyXG4gICAgdGhpcy5ub2RlLnRleHRDb250ZW50ID0gJzA6MDAnO1xyXG4gIH1cclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgdGltZXI7XHJcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3V0aWxzL3RpbWVyLmpzIiwiaW1wb3J0ICcuLi8uLi9zYXNzL2xlYXJuaW5nLnNjc3MnO1xyXG5cclxuaW1wb3J0IHB1YnN1YiBmcm9tICcuLi91dGlscy9wdWJzdWInO1xyXG5pbXBvcnQgYWpheCBmcm9tICcuLi91dGlscy9hamF4JztcclxuaW1wb3J0IHNjZW5lIGZyb20gJy4vc2NlbmUnO1xyXG5pbXBvcnQgTW9kZWwgZnJvbSAnLi9tb2RlbCc7XHJcblxyXG4vKipcclxuICogTG9hZCBtb2RlbCB3aXRoIGdpdmVuIGlkXHJcbiAqL1xyXG5mdW5jdGlvbiBsb2FkTW9kZWwoaWQpIHtcclxuICByZXR1cm4gYWpheChgL21vZGVscy8ke2lkfWApLnRoZW4ocmVzcG9uc2UgPT4gSlNPTi5wYXJzZShyZXNwb25zZSkpO1xyXG59XHJcblxyXG4vKipcclxuICogVUkgYnV0dG9uJ3MgaGFuZGxlcnNcclxuICovXHJcbmNvbnN0ICRzZWxlY3QgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI21vZGVsLXNlbGVjdFwiKTtcclxuY29uc3QgJGxvYWRCdXR0b24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjbG9hZC1tb2RlbC1idG4nKTtcclxubGV0IG1vZGVsID0gbnVsbDtcclxuJGxvYWRCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XHJcbiAgaWYgKCBtb2RlbCApIHsgbW9kZWwuc3RvcCgpOyB9XHJcbiAgY29uc3QgbW9kZWxJZCA9ICRzZWxlY3QudmFsdWU7XHJcbiAgbG9hZE1vZGVsKG1vZGVsSWQpXHJcbiAgICAudGhlbihyZXNwb25zZSA9PiB7XHJcbiAgICAgIG1vZGVsID0gbmV3IE1vZGVsKHJlc3BvbnNlKTtcclxuICAgICAgc2NlbmUuaW5pdChtb2RlbCwgcmVzcG9uc2UpXHJcbiAgICAgICAgLnNob3dDb250ZW50KClcclxuICAgICAgICAuZW5hYmxlQnV0dG9ucygkc3RhcnRCdXR0b24pXHJcbiAgICAgICAgLmRpc2FibGVCdXR0b25zKCRzdG9wQnV0dG9uLCAkcnVuQnV0dG9uKTtcclxuICAgIH0pXHJcbiAgICAuY2F0Y2goZXJyID0+IHsgY29uc29sZS5lcnJvcihlcnIpIH0pO1xyXG59KTtcclxuLy9cclxuY29uc3QgJHN0YXJ0QnV0dG9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3N0YXJ0LWJ0bicpO1xyXG4kc3RhcnRCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XHJcbiAgbW9kZWwuc3RhcnQoKTtcclxuICBzY2VuZS5kaXNhYmxlQnV0dG9ucygkc3RhcnRCdXR0b24pO1xyXG4gIHNjZW5lLmVuYWJsZUJ1dHRvbnMoJHN0b3BCdXR0b24sICRydW5CdXR0b24pO1xyXG59KTtcclxuXHJcbmNvbnN0ICRzdG9wQnV0dG9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3N0b3AtYnRuJyk7XHJcbiRzdG9wQnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xyXG4gIG1vZGVsLnN0b3AoKTtcclxuICBzY2VuZS5lbmFibGVCdXR0b25zKCRzdGFydEJ1dHRvbik7XHJcbiAgc2NlbmUuZGlzYWJsZUJ1dHRvbnMoJHN0b3BCdXR0b24sICRydW5CdXR0b24pO1xyXG59KTtcclxuXHJcbmNvbnN0ICRydW5CdXR0b24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjcnVuLWJ0bicpO1xyXG4kcnVuQnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xyXG4gIGNvbnN0IHRvb2xzRGF0YSA9IHNjZW5lLmdldFRvb2xzRGF0YSgpO1xyXG4gIHB1YnN1Yi5wdWJsaXNoKCd1c2VyX2lucHV0JywgdG9vbHNEYXRhKTtcclxufSk7XHJcblxyXG4vKipcclxuICogSGFuZGxlIGN1c3RvbSBldmVudHMgaGVyZSAodXNlciBpbnB1dCwgcHJvZ3JhbW0gbWVzc2FnZXMgZXRjLilcclxuICovXHJcbnB1YnN1Yi5zdWJzY3JpYmUoJ25ld19zdGF0ZScsIHN0YXRlID0+IHtcclxuICBzY2VuZS5oaWRlRXZlbnQoKTtcclxuICBzY2VuZS5zZXRTdGF0ZShzdGF0ZSk7XHJcbn0pO1xyXG5wdWJzdWIuc3Vic2NyaWJlKCdldmVudCcsIGV2ZW50ID0+IHNjZW5lLnNob3dFdmVudChldmVudCkpO1xyXG5cclxuLy8gLyoqXHJcbi8vICogVGltZXIgKGN1cnJlbnRseSBmb3IgZGV2IG1vZGUgb25seSlcclxuLy8gKi9cclxuLy8gaW1wb3J0IHRpbWVyIGZyb20gJy4uL3V0aWxzL3RpbWVyJztcclxuLy8gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmhlYWRlcicpLmFwcGVuZENoaWxkKHRpbWVyLm5vZGUpO1xyXG4vLyBwdWJzdWIuc3Vic2NyaWJlKCduZXdfc3RhdGUnLCBzdGF0ZSA9PiB0aW1lci5zdG9wKCkpO1xyXG4vLyBwdWJzdWIuc3Vic2NyaWJlKCdldmVudCcsIGV2ZW50ID0+IHRpbWVyLnN0YXJ0KCkpO1xyXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9sZWFybmluZy9pbmRleC5qcyJdLCJzb3VyY2VSb290IjoiIn0=