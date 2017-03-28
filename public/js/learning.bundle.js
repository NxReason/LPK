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
/******/ 	return __webpack_require__(__webpack_require__.s = 17);
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

var _state = __webpack_require__(11);

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

var _state = __webpack_require__(12);

var _state2 = _interopRequireDefault(_state);

var _tools = __webpack_require__(13);

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
/* 5 */,
/* 6 */,
/* 7 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 8 */,
/* 9 */
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

    this.minTime = data.minTime;
    this.maxTime = data.maxTime;
    this.nextState = data.nextState;
    if (data.inactive) {
      this.inactive = true;
      this.tools = [];
    } else {
      this.inactive = false;
      this.tools = this.initTools(data.tools);
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

      return this.tools.every(function (tool) {
        // Если среди полученных итемов нет, того который есть в данном экшене
        var checkTool = data.find(function (obj) {
          return obj.id == tool.id;
        });
        if (!checkTool) {
          return false;
        }

        if (tool.type === 'switch') {
          return checkTool.value === tool.boolValue;
        }

        if (tool.type === 'range') {
          return _this.includesValue(checkTool.value, [tool.minValue, tool.maxValue]);
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
  }, {
    key: 'initTools',
    value: function initTools(tools) {
      return tools.map(function (tool) {
        return {
          id: tool.id,
          type: tool.type,
          minValue: tool.ActionTool.minValue,
          maxValue: tool.ActionTool.maxValue,
          boolValue: tool.ActionTool.boolValue
        };
      });
    }
  }]);

  return Action;
}();

exports.default = Action;

/***/ }),
/* 10 */
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
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _event = __webpack_require__(10);

var _event2 = _interopRequireDefault(_event);

var _action = __webpack_require__(9);

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
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _nodeFactory = __webpack_require__(0);

var _nodeFactory2 = _interopRequireDefault(_nodeFactory);

var _timer = __webpack_require__(14);

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

function setParameters() {
  var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];

  var frag = document.createDocumentFragment();
  params.forEach(function (param) {
    return frag.appendChild(createParameteNode(param.name, param.value));
  });

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
/* 13 */
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
/* 14 */
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
/* 15 */,
/* 16 */,
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


__webpack_require__(7);

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgYzgzMDQzOGNhNWZkNzM3OThhNWQiLCJ3ZWJwYWNrOi8vLy4vdXRpbHMvbm9kZUZhY3RvcnkuanMiLCJ3ZWJwYWNrOi8vLy4vdXRpbHMvcHVic3ViLmpzIiwid2VicGFjazovLy8uL2xlYXJuaW5nL21vZGVsLmpzIiwid2VicGFjazovLy8uL2xlYXJuaW5nL3NjZW5lLmpzIiwid2VicGFjazovLy8uL3V0aWxzL2FqYXguanMiLCJ3ZWJwYWNrOi8vLy4uL3Nhc3MvbGVhcm5pbmcuc2NzcyIsIndlYnBhY2s6Ly8vLi9sZWFybmluZy9tb2RlbF9jb21wb25lbnRzL2FjdGlvbi5qcyIsIndlYnBhY2s6Ly8vLi9sZWFybmluZy9tb2RlbF9jb21wb25lbnRzL2V2ZW50LmpzIiwid2VicGFjazovLy8uL2xlYXJuaW5nL21vZGVsX2NvbXBvbmVudHMvc3RhdGUuanMiLCJ3ZWJwYWNrOi8vLy4vbGVhcm5pbmcvc2NlbmVfY29tcG9uZW50cy9zdGF0ZS5qcyIsIndlYnBhY2s6Ly8vLi9sZWFybmluZy9zY2VuZV9jb21wb25lbnRzL3Rvb2xzLmpzIiwid2VicGFjazovLy8uL3V0aWxzL3RpbWVyLmpzIiwid2VicGFjazovLy8uL2xlYXJuaW5nL2luZGV4LmpzIl0sIm5hbWVzIjpbIm5vZGVGYWN0b3J5IiwidHlwZSIsInBhcmFtcyIsIm5vZGUiLCJkb2N1bWVudCIsImNyZWF0ZUVsZW1lbnQiLCJhcHBlbmRDbGFzc2VzIiwiYXBwZW5kQXR0cnMiLCJpbnNlcnRUZXh0Q29udGVudCIsImNsYXNzTGlzdCIsImZvckVhY2giLCJhZGQiLCJjbGFzc05hbWUiLCJhdHRycyIsImF0dHJOYW1lcyIsIk9iamVjdCIsImtleXMiLCJzZXRBdHRyaWJ1dGUiLCJhdHRyTmFtZSIsInRleHRDb250ZW50IiwicHVic3ViIiwidG9waWNzIiwic3Vic2NyaWJlIiwidG9waWMiLCJsaXN0ZW5lciIsInF1ZXVlIiwiaW5kZXgiLCJwdXNoIiwicmVtb3ZlIiwicHVibGlzaCIsImluZm8iLCJsZW5ndGgiLCJpdGVtcyIsIml0ZW0iLCJJTklUSUFMX1NUQVRFX05BTUUiLCJTVE9QX1NUQVRFX05BTUUiLCJNb2RlbCIsImRhdGEiLCJpZCIsIm5hbWUiLCJicmVha1RpbWUiLCJzdGVwcyIsInN0YXRlcyIsIm1hcCIsInN0YXRlIiwiaW5pdGlhbFN0YXRlIiwiY3VycmVudFN0YXRlIiwiZ2V0U3RhdGUiLCJ0aW1lb3V0Iiwic3ViSW5wdXQiLCJzdWJTdG9wIiwic3RhcnRTdGF0ZSIsImltZyIsImxhc3QiLCJzdG9wU3RhdGUiLCJmaW5kIiwiaW50ZXJ2YWxzIiwiUHJvbWlzZSIsInJlc29sdmUiLCJpIiwidGhlbiIsIm1ha2VCcmVhayIsImhhbmRsZUV2ZW50IiwiaGFuZGxlTmV3U3RhdGUiLCJjYXRjaCIsInJlamVjdCIsInNldFRpbWVvdXQiLCJjbGVhclN1YnMiLCJldmVudCIsImV2ZW50U3RhcnRUaW1lIiwiRGF0ZSIsIm5vdyIsInRpbWVTcGVudCIsIm5leHRTdGF0ZUlkIiwiaGFuZGxlSW5wdXQiLCJuZXh0U3RhdGUiLCJpbmFjdGl2ZVRpbWUiLCJnZXRJbmFjdGl2ZVRpbWUiLCJnZXRJbmFjdGl2ZUFjdGlvbiIsImNsZWFyVGltZW91dCIsImV4cG9ydHMiLCIkbW9kZWxOYW1lIiwicXVlcnlTZWxlY3RvciIsImluaXQiLCJtb2RlbCIsInJlc3BvbnNlIiwic2V0IiwidG9vbHMiLCIkY29udGVudCIsInNob3dDb250ZW50Iiwic2V0Q29udGVudERpc3BsYXkiLCJoaWRlQ29udGVudCIsImRpc3BsYXkiLCJzdHlsZSIsImVuYWJsZUJ1dHRvbnMiLCJidXR0b25zIiwic2V0QnV0dG9uc1N0YXRlIiwiZGlzYWJsZUJ1dHRvbnMiLCJ2YWx1ZSIsImJ1dHRvbiIsImRpc2FibGVkIiwiZ2V0VG9vbHNEYXRhIiwic2V0U3RhdGUiLCJzdGF0ZURhdGEiLCJzaG93RXZlbnQiLCJldmVudERhdGEiLCJoaWRlRXZlbnQiLCJhamF4IiwicGF0aCIsIm9wdGlvbnMiLCJ4aHIiLCJYTUxIdHRwUmVxdWVzdCIsIm9wZW4iLCJtZXRob2QiLCJoZWFkZXJzIiwic2V0WEhSSGVhZGVycyIsInNlbmQiLCJvbnJlYWR5c3RhdGVjaGFuZ2UiLCJyZWFkeVN0YXRlIiwic3RhdHVzIiwicmVzcG9uc2VUZXh0Iiwic3RhdHVzVGV4dCIsImhlYWRlciIsInNldFJlcXVlc3RIZWFkZXIiLCJBY3Rpb24iLCJtaW5UaW1lIiwibWF4VGltZSIsImluYWN0aXZlIiwiaW5pdFRvb2xzIiwidGltZSIsInJpZ2h0VGltZSIsInJpZ2h0RGF0YSIsImV2ZXJ5IiwiY2hlY2tUb29sIiwib2JqIiwidG9vbCIsImJvb2xWYWx1ZSIsImluY2x1ZGVzVmFsdWUiLCJtaW5WYWx1ZSIsIm1heFZhbHVlIiwiYm9yZGVycyIsIlR5cGVFcnJvciIsIkFjdGlvblRvb2wiLCJFdmVudCIsImRlc2NyaXB0aW9uIiwiU3RhdGUiLCJhY3Rpb25zIiwiYWN0aW9uIiwidGltZXMiLCJnZXRBbGxBY3Rpb25UaW1lcyIsIk1hdGgiLCJtYXgiLCJzdWl0ZWRBY3Rpb25zIiwiZmlsdGVyIiwiaXNTdWl0YWJsZSIsIiRuYW1lIiwiJGltZyIsIiRwYXJhbXMiLCIkZXZlbnQiLCIkZXZlbnRIZWFkZXIiLCIkZXZlbnRCb2R5IiwiJHRpbWVyQ29udGFpbmVyIiwiYXBwZW5kQ2hpbGQiLCJzZXRQYXJhbWV0ZXJzIiwiZnJhZyIsImNyZWF0ZURvY3VtZW50RnJhZ21lbnQiLCJjcmVhdGVQYXJhbWV0ZU5vZGUiLCJwYXJhbSIsImlubmVySFRNTCIsImtleSIsImRpdiIsImtleVNwYW4iLCJ2YWx1ZVNwYW4iLCJzaG93VGltZXIiLCJoaWRlVGltZXIiLCJzdGFydCIsInN0b3AiLCJ0b29sVHlwZXMiLCJSQU5HRSIsIlNXSVRDSCIsIiR0b29scyIsImZyYWdtZW50IiwibGFiZWwiLCJ0b29sTm9kZSIsImNyZWF0ZVRvb2xOb2RlIiwiY3JlYXRlUmFuZ2VUb29sIiwiY3JlYXRlU3dpdGNoVG9vbCIsImRpdklucHV0Iiwic3Bhbk1pbiIsIm1pbiIsImlucHV0Iiwic3Bhbk1heCIsImRpdkN1cnJlbnQiLCJzcGFuQ3VycmVudCIsImFkZEV2ZW50TGlzdGVuZXIiLCJldnQiLCJ0YXJnZXQiLCJ0b29sc0RhdGEiLCJpbnB1dHMiLCJxdWVyeVNlbGVjdG9yQWxsIiwiZGF0YXNldCIsInBhcnNlSW50IiwiY2hlY2tlZCIsIkVycm9yIiwibXNUb0NvbnRlbnQiLCJtcyIsInNlY29uZHMiLCJyb3VuZCIsIm1pbnMiLCJmbG9vciIsInNlY29uZHNMZWZ0IiwidGltZXIiLCJzdGFydFRpbWUiLCJpbnRlcnZhbCIsInNldEludGVydmFsIiwiZWxhcHNlZCIsImNsZWFySW50ZXJ2YWwiLCJsb2FkTW9kZWwiLCJKU09OIiwicGFyc2UiLCIkc2VsZWN0IiwiJGxvYWRCdXR0b24iLCJtb2RlbElkIiwiJHN0YXJ0QnV0dG9uIiwiJHN0b3BCdXR0b24iLCIkcnVuQnV0dG9uIiwiY29uc29sZSIsImVycm9yIiwiZXJyIl0sIm1hcHBpbmdzIjoiO0FBQUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0EsbURBQTJDLGNBQWM7O0FBRXpEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBSztBQUNMO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsbUNBQTJCLDBCQUEwQixFQUFFO0FBQ3ZELHlDQUFpQyxlQUFlO0FBQ2hEO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLDhEQUFzRCwrREFBK0Q7O0FBRXJIO0FBQ0E7O0FBRUE7QUFDQTs7Ozs7Ozs7Ozs7OztBQ2hFQSxJQUFNQSxjQUFjLFNBQWRBLFdBQWMsR0FBK0I7QUFBQSxNQUF0QkMsSUFBc0IsdUVBQWYsS0FBZTtBQUFBLE1BQVJDLE1BQVE7O0FBQ2pELE1BQU1DLE9BQU9DLFNBQVNDLGFBQVQsQ0FB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QUFDQTZJLGFBQWE3QixnQkFBYixDQUE4QixPQUE5QixFQUF1QyxZQUFNO0FBQzNDOUcsUUFBTTJGLEtBQU47QUFDQSxrQkFBTTlFLGNBQU4sQ0FBcUI4SCxZQUFyQjtBQUNBLGtCQUFNakksYUFBTixDQUFvQmtJLFdBQXBCLEVBQWlDQyxVQUFqQztBQUNELENBSkQ7O0FBTUEsSUFBTUQsY0FBYzVOLFNBQVM4RSxhQUFULENBQXVCLFdBQXZCLENBQXBCO0FBQ0E4SSxZQUFZOUIsZ0JBQVosQ0FBNkIsT0FBN0IsRUFBc0MsWUFBTTtBQUMxQzlHLFFBQU00RixJQUFOO0FBQ0Esa0JBQU1sRixhQUFOLENBQW9CaUksWUFBcEI7QUFDQSxrQkFBTTlILGNBQU4sQ0FBcUIrSCxXQUFyQixFQUFrQ0MsVUFBbEM7QUFDRCxDQUpEOztBQU1BLElBQU1BLGFBQWE3TixTQUFTOEUsYUFBVCxDQUF1QixVQUF2QixDQUFuQjtBQUNBK0ksV0FBVy9CLGdCQUFYLENBQTRCLE9BQTVCLEVBQXFDLFlBQU07QUFDekMsTUFBTUcsWUFBWSxnQkFBTWhHLFlBQU4sRUFBbEI7QUFDQSxtQkFBT3hFLE9BQVAsQ0FBZSxZQUFmLEVBQTZCd0ssU0FBN0I7QUFDRCxDQUhEOztBQUtBOzs7QUFHQSxpQkFBTy9LLFNBQVAsQ0FBaUIsV0FBakIsRUFBOEIsaUJBQVM7QUFDckMsa0JBQU1vRixTQUFOO0FBQ0Esa0JBQU1KLFFBQU4sQ0FBZTFELEtBQWY7QUFDRCxDQUhEO0FBSUEsaUJBQU90QixTQUFQLENBQWlCLE9BQWpCLEVBQTBCO0FBQUEsU0FBUyxnQkFBTWtGLFNBQU4sQ0FBZ0JwQyxLQUFoQixDQUFUO0FBQUEsQ0FBMUI7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EscUQiLCJmaWxlIjoibGVhcm5pbmcuYnVuZGxlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pXG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG5cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGlkZW50aXR5IGZ1bmN0aW9uIGZvciBjYWxsaW5nIGhhcm1vbnkgaW1wb3J0cyB3aXRoIHRoZSBjb3JyZWN0IGNvbnRleHRcbiBcdF9fd2VicGFja19yZXF1aXJlX18uaSA9IGZ1bmN0aW9uKHZhbHVlKSB7IHJldHVybiB2YWx1ZTsgfTtcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7XG4gXHRcdFx0XHRjb25maWd1cmFibGU6IGZhbHNlLFxuIFx0XHRcdFx0ZW51bWVyYWJsZTogdHJ1ZSxcbiBcdFx0XHRcdGdldDogZ2V0dGVyXG4gXHRcdFx0fSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gMTcpO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIHdlYnBhY2svYm9vdHN0cmFwIGM4MzA0MzhjYTVmZDczNzk4YTVkIiwiY29uc3Qgbm9kZUZhY3RvcnkgPSBmdW5jdGlvbih0eXBlID0gJ2RpdicsIHBhcmFtcykge1xyXG4gIGNvbnN0IG5vZGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KHR5cGUpO1xyXG5cclxuICBhcHBlbmRDbGFzc2VzKG5vZGUsIHBhcmFtcyk7XHJcbiAgYXBwZW5kQXR0cnMobm9kZSwgcGFyYW1zKTtcclxuICBpbnNlcnRUZXh0Q29udGVudChub2RlLCBwYXJhbXMpO1xyXG5cclxuICByZXR1cm4gbm9kZTtcclxufVxyXG5cclxuZnVuY3Rpb24gYXBwZW5kQ2xhc3Nlcyhub2RlLCB7IGNsYXNzTGlzdCB9KSB7XHJcbiAgaWYgKGNsYXNzTGlzdCAmJiBjbGFzc0xpc3QuZm9yRWFjaCkge1xyXG4gICAgY2xhc3NMaXN0LmZvckVhY2goY2xhc3NOYW1lID0+IG5vZGUuY2xhc3NMaXN0LmFkZChjbGFzc05hbWUpKTtcclxuICB9XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGFwcGVuZEF0dHJzKG5vZGUsIHsgYXR0cnMgfSkge1xyXG4gIGlmIChhdHRycykge1xyXG4gICAgY29uc3QgYXR0ck5hbWVzID0gT2JqZWN0LmtleXMoYXR0cnMpO1xyXG4gICAgYXR0ck5hbWVzLmZvckVhY2goYXR0ck5hbWUgPT4gbm9kZS5zZXRBdHRyaWJ1dGUoYXR0ck5hbWUsIGF0dHJzW2F0dHJOYW1lXSkpO1xyXG4gIH1cclxufVxyXG5cclxuZnVuY3Rpb24gaW5zZXJ0VGV4dENvbnRlbnQobm9kZSwgeyB0ZXh0Q29udGVudCA9IFwiXCIgfSkge1xyXG4gIG5vZGUudGV4dENvbnRlbnQgPSB0ZXh0Q29udGVudDtcclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgbm9kZUZhY3Rvcnk7XHJcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3V0aWxzL25vZGVGYWN0b3J5LmpzIiwiY29uc3QgcHVic3ViID0gKGZ1bmN0aW9uKCkge1xyXG5cclxuICBjb25zdCB0b3BpY3MgPSB7fTtcclxuXHJcbiAgcmV0dXJuIHtcclxuICAgIHN1YnNjcmliZTogZnVuY3Rpb24odG9waWMsIGxpc3RlbmVyKSB7XHJcbiAgICAgIGlmICghdG9waWNzW3RvcGljXSkgdG9waWNzW3RvcGljXSA9IHsgcXVldWU6IFtdIH07XHJcblxyXG4gICAgICBjb25zdCBpbmRleCA9IHRvcGljc1t0b3BpY10ucXVldWUucHVzaChsaXN0ZW5lcikgLSAxO1xyXG4gICAgICAvLyBmdW5jdGlvbiB0byBkZWxldGUgdG9waWNcclxuICAgICAgcmV0dXJuIHtcclxuICAgICAgICByZW1vdmU6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgZGVsZXRlIHRvcGljc1t0b3BpY10ucXVldWVbaW5kZXhdO1xyXG4gICAgICAgIH1cclxuICAgICAgfTtcclxuICAgIH0sXHJcblxyXG4gICAgcHVibGlzaDogZnVuY3Rpb24odG9waWMsIGluZm8pIHtcclxuICAgICAgLy8gbm8gdGhlbWUgb3Igbm8gbGlzdGVuZXJzXHJcbiAgICAgIGlmICghdG9waWNzW3RvcGljXSB8fCAhdG9waWNzW3RvcGljXS5xdWV1ZS5sZW5ndGgpIHJldHVybjtcclxuXHJcbiAgICAgIGNvbnN0IGl0ZW1zID0gdG9waWNzW3RvcGljXS5xdWV1ZTtcclxuICAgICAgaXRlbXMuZm9yRWFjaChpdGVtID0+IHtcclxuICAgICAgICBpdGVtKGluZm8gfHwge30pO1xyXG4gICAgICB9KTtcclxuICAgIH1cclxuICB9O1xyXG59KSgpO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgcHVic3ViO1xyXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi91dGlscy9wdWJzdWIuanMiLCJpbXBvcnQgU3RhdGUgZnJvbSAnLi9tb2RlbF9jb21wb25lbnRzL3N0YXRlJztcclxuaW1wb3J0IHB1YnN1YiBmcm9tICcuLi91dGlscy9wdWJzdWInO1xyXG5cclxuY29uc3QgSU5JVElBTF9TVEFURV9OQU1FID0gJ9Ch0L7RgdGC0L7Rj9C90LjQtSDQvNC+0LTQtdC70LgnO1xyXG5jb25zdCBTVE9QX1NUQVRFX05BTUUgPSAn0J7QsdGD0YfQtdC90LjQtSDQvtGB0YLQsNC90L7QstC70LXQvdC+JztcclxuXHJcbmNsYXNzIE1vZGVsIHtcclxuICBjb25zdHJ1Y3RvcihkYXRhKSB7XHJcbiAgICB0aGlzLmlkID0gZGF0YS5pZDtcclxuICAgIHRoaXMubmFtZSA9IGRhdGEubmFtZTtcclxuICAgIHRoaXMuYnJlYWtUaW1lID0gZGF0YS5icmVha1RpbWU7XHJcbiAgICB0aGlzLnN0ZXBzID0gZGF0YS5zdGVwcztcclxuXHJcbiAgICB0aGlzLnN0YXRlcyA9IGRhdGEuc3RhdGVzLm1hcChzdGF0ZSA9PiBuZXcgU3RhdGUoc3RhdGUpKTtcclxuICAgIHRoaXMuaW5pdGlhbFN0YXRlID0gZGF0YS5pbml0aWFsU3RhdGU7XHJcbiAgICB0aGlzLmN1cnJlbnRTdGF0ZSA9IHRoaXMuZ2V0U3RhdGUodGhpcy5pbml0aWFsU3RhdGUpO1xyXG5cclxuICAgIHRoaXMudGltZW91dCA9IG51bGw7XHJcbiAgICB0aGlzLnN1YklucHV0ID0gbnVsbDtcclxuICAgIHRoaXMuc3ViU3RvcCA9IG51bGw7XHJcbiAgICB0aGlzLnN0YXJ0U3RhdGUgPSBuZXcgU3RhdGUoeyBpZDogMCwgbmFtZTogSU5JVElBTF9TVEFURV9OQU1FLCBpbWc6ICdpbWcvc3RhcnQucG5nJywgbGFzdDogdHJ1ZSB9KTtcclxuICAgIHRoaXMuc3RvcFN0YXRlID0gbmV3IFN0YXRlKHsgaWQ6IC0xLCBuYW1lOiBTVE9QX1NUQVRFX05BTUUsIGltZzogJ2ltZy9zdG9wLnBuZycsIGxhc3Q6IHRydWUgfSk7XHJcbiAgfVxyXG5cclxuICBnZXRTdGF0ZShpZCkge1xyXG4gICAgcmV0dXJuIHRoaXMuc3RhdGVzLmZpbmQoc3RhdGUgPT4gc3RhdGUuaWQgPT0gaWQpO1xyXG4gIH1cclxuXHJcbiAgc3RhcnQoKSB7XHJcbiAgICB0aGlzLmN1cnJlbnRTdGF0ZSA9IHRoaXMuZ2V0U3RhdGUodGhpcy5pbml0aWFsU3RhdGUpO1xyXG4gICAgcHVic3ViLnB1Ymxpc2goJ25ld19zdGF0ZScsIHRoaXMuY3VycmVudFN0YXRlKTtcclxuICAgIGxldCBpbnRlcnZhbHMgPSBQcm9taXNlLnJlc29sdmUoKTsgLy8gaW5pdCBwcm9taXNlIGNoYWluXHJcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMuc3RlcHM7IGkrKykge1xyXG4gICAgICBpbnRlcnZhbHMgPSBpbnRlcnZhbHNcclxuICAgICAgIC50aGVuKCgpID0+IHsgcmV0dXJuIHRoaXMubWFrZUJyZWFrKCkgfSlcclxuICAgICAgIC50aGVuKCgpID0+IHsgcmV0dXJuIHRoaXMuaGFuZGxlRXZlbnQoKSB9KVxyXG4gICAgICAgLnRoZW4oc3RhdGUgPT4geyB0aGlzLmhhbmRsZU5ld1N0YXRlKHN0YXRlKSB9KVxyXG4gICAgfVxyXG4gICAgaW50ZXJ2YWxzLmNhdGNoKHN0YXRlID0+IHRoaXMuaGFuZGxlTmV3U3RhdGUoc3RhdGUpKTtcclxuICAgIHJldHVybiBpbnRlcnZhbHM7XHJcbiAgfVxyXG5cclxuICBtYWtlQnJlYWsoKSB7XHJcbiAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xyXG4gICAgICB0aGlzLnN1YlN0b3AgPSBwdWJzdWIuc3Vic2NyaWJlKCdtb2RlbF9zdG9wJywgKCkgPT4geyByZWplY3QodGhpcy5zdG9wU3RhdGUpOyB9KVxyXG4gICAgICBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgICB0aGlzLmNsZWFyU3VicygpO1xyXG4gICAgICAgIHJlc29sdmUoKVxyXG4gICAgICB9LCB0aGlzLmJyZWFrVGltZSk7XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIGhhbmRsZUV2ZW50KCkge1xyXG4gICAgY29uc3QgZXZlbnQgPSB0aGlzLmN1cnJlbnRTdGF0ZS5ldmVudDtcclxuICAgIGNvbnN0IGV2ZW50U3RhcnRUaW1lID0gRGF0ZS5ub3coKTtcclxuICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XHJcbiAgICAgIC8vIHNlbmQgZGF0YSBhYm91dCBuZXcgZXZlbnQgdG8gb3RoZXIgbW9kdWxlc1xyXG4gICAgICBwdWJzdWIucHVibGlzaCgnZXZlbnQnLCBldmVudCk7XHJcblxyXG4gICAgICAvLyBsaXN0ZW4gdG8gdXNlciBhY3Rpb25cclxuICAgICAgLy8gYW5kIGlmIHVzZXIgaW5wdXQgY29ycmVjdCBnbyB0byBuZXh0IHN0YXRlXHJcbiAgICAgIHRoaXMuc3ViSW5wdXQgPSBwdWJzdWIuc3Vic2NyaWJlKCd1c2VyX2lucHV0JywgZGF0YSA9PiB7XHJcbiAgICAgICAgY29uc3QgdGltZVNwZW50ID0gRGF0ZS5ub3coKSAtIGV2ZW50U3RhcnRUaW1lO1xyXG4gICAgICAgIGNvbnN0IG5leHRTdGF0ZUlkID0gdGhpcy5jdXJyZW50U3RhdGUuaGFuZGxlSW5wdXQoZGF0YSwgdGltZVNwZW50KTtcclxuICAgICAgICBjb25zdCBuZXh0U3RhdGUgPSB0aGlzLmdldFN0YXRlKG5leHRTdGF0ZUlkKTtcclxuICAgICAgICBpZiAoIG5leHRTdGF0ZSApIHtcclxuICAgICAgICAgIG5leHRTdGF0ZS5sYXN0ID8gcmVqZWN0KG5leHRTdGF0ZSkgOiByZXNvbHZlKG5leHRTdGF0ZSk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9KTtcclxuXHJcbiAgICAgIHRoaXMuc3ViU3RvcCA9IHB1YnN1Yi5zdWJzY3JpYmUoJ21vZGVsX3N0b3AnLCAoKSA9PiB7XHJcbiAgICAgICAgcmVqZWN0KHRoaXMuc3RvcFN0YXRlKTtcclxuICAgICAgfSk7XHJcblxyXG4gICAgICAvLyBoYW5kbGUgaW5hY3RpdmVcclxuICAgICAgY29uc3QgaW5hY3RpdmVUaW1lID0gdGhpcy5jdXJyZW50U3RhdGUuZ2V0SW5hY3RpdmVUaW1lKCk7XHJcbiAgICAgIHRoaXMudGltZW91dCA9IHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgIGNvbnN0IG5leHRTdGF0ZUlkID0gdGhpcy5jdXJyZW50U3RhdGUuZ2V0SW5hY3RpdmVBY3Rpb24oKS5uZXh0U3RhdGU7XHJcbiAgICAgICAgY29uc3QgbmV4dFN0YXRlID0gdGhpcy5nZXRTdGF0ZShuZXh0U3RhdGVJZCk7XHJcbiAgICAgICAgbmV4dFN0YXRlLmxhc3QgPyByZWplY3QobmV4dFN0YXRlKSA6IHJlc29sdmUobmV4dFN0YXRlKTtcclxuICAgICAgfSwgaW5hY3RpdmVUaW1lKTtcclxuICAgIH0pXHJcbiAgfVxyXG5cclxuICBzdG9wKCkge1xyXG4gICAgcHVic3ViLnB1Ymxpc2goJ21vZGVsX3N0b3AnKTtcclxuICB9XHJcblxyXG4gIGhhbmRsZU5ld1N0YXRlKHN0YXRlKSB7XHJcbiAgICB0aGlzLmN1cnJlbnRTdGF0ZSA9IHN0YXRlO1xyXG4gICAgY2xlYXJUaW1lb3V0KHRoaXMudGltZW91dCk7XHJcbiAgICB0aGlzLmNsZWFyU3VicygpO1xyXG4gICAgcHVic3ViLnB1Ymxpc2goJ25ld19zdGF0ZScsIHN0YXRlKTtcclxuICB9XHJcblxyXG4gIGNsZWFyU3VicygpIHtcclxuICAgIGlmICh0aGlzLnN1YklucHV0KSB7XHJcbiAgICAgIHRoaXMuc3ViSW5wdXQucmVtb3ZlKCk7XHJcbiAgICB9XHJcbiAgICBpZiAodGhpcy5zdWJTdG9wKSB7XHJcbiAgICAgIHRoaXMuc3ViU3RvcC5yZW1vdmUoKTtcclxuICAgIH1cclxuICB9XHJcblxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBNb2RlbDtcclxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vbGVhcm5pbmcvbW9kZWwuanMiLCJpbXBvcnQgc3RhdGUgZnJvbSAnLi9zY2VuZV9jb21wb25lbnRzL3N0YXRlJztcclxuaW1wb3J0IHRvb2xzIGZyb20gJy4vc2NlbmVfY29tcG9uZW50cy90b29scyc7XHJcblxyXG5jb25zdCBleHBvcnRzID0ge307XHJcblxyXG4vLyBTY2VuZSBtZXRhZGF0YVxyXG5jb25zdCAkbW9kZWxOYW1lID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLm1vZGVsLW5hbWUnKTtcclxuZXhwb3J0cy5pbml0ID0gZnVuY3Rpb24obW9kZWwsIHJlc3BvbnNlKSB7XHJcbiAgJG1vZGVsTmFtZS50ZXh0Q29udGVudCA9IG1vZGVsLm5hbWU7XHJcbiAgc3RhdGUuc2V0KG1vZGVsLnN0YXJ0U3RhdGUpO1xyXG4gIHRvb2xzLmluaXQocmVzcG9uc2UudG9vbHMpO1xyXG4gIHJldHVybiB0aGlzO1xyXG59XHJcblxyXG4vLyBNYW5hZ2UgY29udGVudCB2aXNpYmlsaXR5XHJcbmNvbnN0ICRjb250ZW50ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmNvbnRlbnQnKTtcclxuZXhwb3J0cy5zaG93Q29udGVudCA9IGZ1bmN0aW9uKCkge1xyXG4gIHNldENvbnRlbnREaXNwbGF5KCdmbGV4Jyk7XHJcbiAgcmV0dXJuIHRoaXM7XHJcbn1cclxuZXhwb3J0cy5oaWRlQ29udGVudCA9IGZ1bmN0aW9uKCkge1xyXG4gIHNldENvbnRlbnREaXNwbGF5KCdub25lJyk7XHJcbiAgcmV0dXJuIHRoaXM7XHJcbn1cclxuZnVuY3Rpb24gc2V0Q29udGVudERpc3BsYXkoZGlzcGxheSkge1xyXG4gICRjb250ZW50LnN0eWxlLmRpc3BsYXkgPSBkaXNwbGF5O1xyXG59XHJcblxyXG4vLyBNYW5hZ2UgYnV0dG9ucyBzdGF0ZVxyXG5leHBvcnRzLmVuYWJsZUJ1dHRvbnMgPSBmdW5jdGlvbiguLi5idXR0b25zKSB7XHJcbiAgc2V0QnV0dG9uc1N0YXRlKGJ1dHRvbnMsIGZhbHNlKTtcclxuICByZXR1cm4gdGhpcztcclxufVxyXG5leHBvcnRzLmRpc2FibGVCdXR0b25zID0gZnVuY3Rpb24oLi4uYnV0dG9ucykge1xyXG4gIHNldEJ1dHRvbnNTdGF0ZShidXR0b25zLCB0cnVlKTtcclxuICByZXR1cm4gdGhpcztcclxufVxyXG5mdW5jdGlvbiBzZXRCdXR0b25zU3RhdGUoYnV0dG9ucywgdmFsdWUpIHtcclxuICBidXR0b25zLmZvckVhY2goYnV0dG9uID0+IGJ1dHRvbi5kaXNhYmxlZCA9IHZhbHVlKTtcclxufVxyXG5cclxuLy8gRGVsZWdhdGUgcHVibGljIG1ldGhvZHMgdG8gY29tcG9uZW50c1xyXG5leHBvcnRzLmdldFRvb2xzRGF0YSA9ICgpID0+XHJcbiAgdG9vbHMuZ2V0VG9vbHNEYXRhKCk7XHJcblxyXG5leHBvcnRzLnNldFN0YXRlID0gc3RhdGVEYXRhID0+XHJcbiAgc3RhdGUuc2V0KHN0YXRlRGF0YSk7XHJcblxyXG5leHBvcnRzLnNob3dFdmVudCA9IGV2ZW50RGF0YSA9PlxyXG4gIHN0YXRlLnNob3dFdmVudChldmVudERhdGEpO1xyXG5cclxuZXhwb3J0cy5oaWRlRXZlbnQgPSAoKSA9PlxyXG4gIHN0YXRlLmhpZGVFdmVudCgpO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgZXhwb3J0cztcclxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vbGVhcm5pbmcvc2NlbmUuanMiLCJmdW5jdGlvbiBhamF4KHBhdGggPSAnJywgb3B0aW9ucyA9IHt9KSB7XHJcbiAgY29uc3QgeGhyID0gbmV3IFhNTEh0dHBSZXF1ZXN0KCk7XHJcbiAgeGhyLm9wZW4ob3B0aW9ucy5tZXRob2QgfHwgJ0dFVCcsIHBhdGgsIHRydWUpO1xyXG4gIGlmIChvcHRpb25zLmhlYWRlcnMpIHsgc2V0WEhSSGVhZGVycyh4aHIsIG9wdGlvbnMuaGVhZGVycyk7IH1cclxuICB4aHIuc2VuZChvcHRpb25zLmRhdGEpO1xyXG5cclxuICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xyXG4gICAgeGhyLm9ucmVhZHlzdGF0ZWNoYW5nZSA9IGZ1bmN0aW9uKCkge1xyXG4gICAgICBpZih4aHIucmVhZHlTdGF0ZSA9PSA0KSB7XHJcbiAgICAgICAgaWYoeGhyLnN0YXR1cyA9PSAyMDApIHtcclxuICAgICAgICAgIHJlc29sdmUoeGhyLnJlc3BvbnNlVGV4dCk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIHJlamVjdCh4aHIuc3RhdHVzVGV4dCk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfSlcclxufVxyXG5cclxuZnVuY3Rpb24gc2V0WEhSSGVhZGVycyh4aHIsIGhlYWRlcnMpIHtcclxuICBmb3IgKGxldCBoZWFkZXIgaW4gaGVhZGVycykge1xyXG4gICAgeGhyLnNldFJlcXVlc3RIZWFkZXIoaGVhZGVyLCBoZWFkZXJzW2hlYWRlcnNdKTtcclxuICB9XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IGFqYXg7XHJcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3V0aWxzL2FqYXguanMiLCIvLyByZW1vdmVkIGJ5IGV4dHJhY3QtdGV4dC13ZWJwYWNrLXBsdWdpblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4uL3Nhc3MvbGVhcm5pbmcuc2Nzc1xuLy8gbW9kdWxlIGlkID0gN1xuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJjbGFzcyBBY3Rpb24ge1xyXG4gIGNvbnN0cnVjdG9yKGRhdGEpIHtcclxuICAgIHRoaXMubWluVGltZSA9IGRhdGEubWluVGltZTtcclxuICAgIHRoaXMubWF4VGltZSA9IGRhdGEubWF4VGltZTtcclxuICAgIHRoaXMubmV4dFN0YXRlID0gZGF0YS5uZXh0U3RhdGU7XHJcbiAgICBpZiAoZGF0YS5pbmFjdGl2ZSkge1xyXG4gICAgICB0aGlzLmluYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgdGhpcy50b29scyA9IFtdO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdGhpcy5pbmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICB0aGlzLnRvb2xzID0gdGhpcy5pbml0VG9vbHMoZGF0YS50b29scyk7XHJcbiAgICB9XHJcblxyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogQHBhcmFtIFt7IGlkOiBOdW1iZXIsIHZhbHVlOiBOdW1iZXIvQm9vbGVhbiB9LCB7Li4ufV1cclxuICAgKiBAcGFyYW0gTnVtYmVyXHJcbiAgICogQHJldHVybiBCb29sZWFuXHJcbiAgICovXHJcbiAgaXNTdWl0YWJsZShkYXRhLCB0aW1lKSB7XHJcbiAgICByZXR1cm4gdGhpcy5yaWdodFRpbWUodGltZSkgJiYgdGhpcy5yaWdodERhdGEoZGF0YSk7XHJcbiAgfVxyXG5cclxuICByaWdodERhdGEoZGF0YSA9IFtdKSB7XHJcbiAgICByZXR1cm4gdGhpcy50b29scy5ldmVyeSh0b29sID0+IHtcclxuICAgICAgLy8g0JXRgdC70Lgg0YHRgNC10LTQuCDQv9C+0LvRg9GH0LXQvdC90YvRhSDQuNGC0LXQvNC+0LIg0L3QtdGCLCDRgtC+0LPQviDQutC+0YLQvtGA0YvQuSDQtdGB0YLRjCDQsiDQtNCw0L3QvdC+0Lwg0Y3QutGI0LXQvdC1XHJcbiAgICAgIGNvbnN0IGNoZWNrVG9vbCA9IGRhdGEuZmluZChvYmogPT4gb2JqLmlkID09IHRvb2wuaWQpO1xyXG4gICAgICBpZiAoIWNoZWNrVG9vbCkgeyByZXR1cm4gZmFsc2U7IH1cclxuXHJcbiAgICAgIGlmICh0b29sLnR5cGUgPT09ICdzd2l0Y2gnKSB7IHJldHVybiBjaGVja1Rvb2wudmFsdWUgPT09IHRvb2wuYm9vbFZhbHVlOyB9XHJcblxyXG4gICAgICBpZiAodG9vbC50eXBlID09PSAncmFuZ2UnKSB7IHJldHVybiB0aGlzLmluY2x1ZGVzVmFsdWUoY2hlY2tUb29sLnZhbHVlLCBbIHRvb2wubWluVmFsdWUsIHRvb2wubWF4VmFsdWUgXSkgfVxyXG5cclxuICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICBpbmNsdWRlc1ZhbHVlKHZhbHVlLCBib3JkZXJzKSB7XHJcbiAgICBpZiAodHlwZW9mIHZhbHVlICE9PSAnbnVtYmVyJykgdGhyb3cgbmV3IFR5cGVFcnJvcignVmFsdWUgc2hvdWxkIGJlIGludGVnZXInKTtcclxuICAgIHJldHVybiAodmFsdWUgPj0gYm9yZGVyc1swXSkgJiYgKHZhbHVlIDw9IGJvcmRlcnNbMV0pO1xyXG4gIH1cclxuXHJcbiAgcmlnaHRUaW1lKHRpbWUpIHtcclxuICAgIGlmICh0eXBlb2YgdGltZSAhPT0gJ251bWJlcicpIHRocm93IG5ldyBUeXBlRXJyb3IoJ1RpbWUgc2hvdWxkIGJlIGludGVnZXIgKG1zKScpO1xyXG4gICAgcmV0dXJuICh0aW1lID49IHRoaXMubWluVGltZSkgJiYgKHRpbWUgPD0gdGhpcy5tYXhUaW1lKTtcclxuICB9XHJcblxyXG4gIGluaXRUb29scyh0b29scykge1xyXG4gICAgcmV0dXJuIHRvb2xzLm1hcCh0b29sID0+IHtcclxuICAgICAgcmV0dXJuIHtcclxuICAgICAgICBpZDogdG9vbC5pZCxcclxuICAgICAgICB0eXBlOiB0b29sLnR5cGUsXHJcbiAgICAgICAgbWluVmFsdWU6IHRvb2wuQWN0aW9uVG9vbC5taW5WYWx1ZSxcclxuICAgICAgICBtYXhWYWx1ZTogdG9vbC5BY3Rpb25Ub29sLm1heFZhbHVlLFxyXG4gICAgICAgIGJvb2xWYWx1ZTogdG9vbC5BY3Rpb25Ub29sLmJvb2xWYWx1ZVxyXG4gICAgICB9XHJcbiAgICB9KTtcclxuICB9XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IEFjdGlvbjtcclxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vbGVhcm5pbmcvbW9kZWxfY29tcG9uZW50cy9hY3Rpb24uanMiLCJjbGFzcyBFdmVudCB7XHJcbiAgY29uc3RydWN0b3IoZGF0YSkge1xyXG4gICAgdGhpcy5pZCA9IGRhdGEuaWQ7XHJcbiAgICB0aGlzLm5hbWUgPSBkYXRhLm5hbWU7XHJcbiAgICB0aGlzLmRlc2NyaXB0aW9uID0gZGF0YS5kZXNjcmlwdGlvbjtcclxuICB9XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IEV2ZW50O1xyXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9sZWFybmluZy9tb2RlbF9jb21wb25lbnRzL2V2ZW50LmpzIiwiaW1wb3J0IEV2ZW50IGZyb20gJy4vZXZlbnQnIDtcclxuaW1wb3J0IEFjdGlvbiBmcm9tICcuL2FjdGlvbic7XHJcblxyXG5jbGFzcyBTdGF0ZSB7XHJcbiAgY29uc3RydWN0b3IoZGF0YSkge1xyXG4gICAgdGhpcy5pZCA9IGRhdGEuaWQ7XHJcbiAgICB0aGlzLm5hbWUgPSBkYXRhLm5hbWU7XHJcbiAgICB0aGlzLmltZyA9IGRhdGEuaW1nO1xyXG4gICAgdGhpcy5wYXJhbXMgPSBkYXRhLnBhcmFtcztcclxuXHJcbiAgICBpZihkYXRhLmxhc3QpIHtcclxuICAgICAgdGhpcy5sYXN0ID0gdHJ1ZTtcclxuICAgICAgdGhpcy5ldmVudCA9IG51bGw7XHJcbiAgICAgIHRoaXMuYWN0aW9ucyA9IG51bGw7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB0aGlzLmV2ZW50ID0gbmV3IEV2ZW50KGRhdGEuZXZlbnQpO1xyXG4gICAgICB0aGlzLmFjdGlvbnMgPSBkYXRhLmFjdGlvbnMubWFwKGFjdGlvbiA9PiBuZXcgQWN0aW9uKGFjdGlvbikpO1xyXG4gICAgICB0aGlzLmxhc3QgPSBmYWxzZTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIGdldEluYWN0aXZlVGltZSgpIHtcclxuICAgIGNvbnN0IHRpbWVzID0gdGhpcy5nZXRBbGxBY3Rpb25UaW1lcygpO1xyXG4gICAgcmV0dXJuIE1hdGgubWF4KC4uLnRpbWVzKTtcclxuICB9XHJcblxyXG4gIGdldEluYWN0aXZlQWN0aW9uKCkge1xyXG4gICAgcmV0dXJuIHRoaXMuYWN0aW9ucy5maW5kKGFjdGlvbiA9PiBhY3Rpb24uaW5hY3RpdmUgPT09IHRydWUpO1xyXG4gIH1cclxuXHJcbiAgZ2V0QWxsQWN0aW9uVGltZXMoKSB7XHJcbiAgICByZXR1cm4gdGhpcy5hY3Rpb25zLm1hcChhY3Rpb24gPT4gYWN0aW9uLm1heFRpbWUgfHwgMCk7XHJcbiAgfVxyXG5cclxuICBoYW5kbGVJbnB1dChkYXRhLCB0aW1lKSB7XHJcbiAgICBjb25zdCBzdWl0ZWRBY3Rpb25zID0gdGhpcy5hY3Rpb25zLmZpbHRlcihhY3Rpb24gPT4gYWN0aW9uLmlzU3VpdGFibGUoZGF0YSwgdGltZSkpO1xyXG4gICAgaWYgKHN1aXRlZEFjdGlvbnMubGVuZ3RoID4gMCkge1xyXG4gICAgICByZXR1cm4gc3VpdGVkQWN0aW9uc1swXS5uZXh0U3RhdGU7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gbnVsbDtcclxuICB9XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IFN0YXRlO1xyXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9sZWFybmluZy9tb2RlbF9jb21wb25lbnRzL3N0YXRlLmpzIiwiaW1wb3J0IG5vZGVGYWN0b3J5IGZyb20gJy4uLy4uL3V0aWxzL25vZGVGYWN0b3J5JztcclxuaW1wb3J0IHRpbWVyIGZyb20gJy4uLy4uL3V0aWxzL3RpbWVyJztcclxuXHJcbmNvbnN0ICRuYW1lID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLm1vZGVsLXN0YXRlLW5hbWUnKTtcclxuY29uc3QgJGltZyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5tb2RlbC1zdGF0ZS1pbWcnKTtcclxuY29uc3QgJHBhcmFtcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5tb2RlbC1wYXJhbXMtdmFsdWVzJyk7XHJcblxyXG5jb25zdCAkZXZlbnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcubW9kZWwtZXZlbnQnKTtcclxuY29uc3QgJGV2ZW50SGVhZGVyID0gJGV2ZW50LnF1ZXJ5U2VsZWN0b3IoJy5tb2RlbC1ldmVudC1uYW1lIHNwYW4nKTtcclxuY29uc3QgJGV2ZW50Qm9keSA9ICRldmVudC5xdWVyeVNlbGVjdG9yKCcubW9kZWwtZXZlbnQtaW5mbycpO1xyXG5cclxuY29uc3QgJHRpbWVyQ29udGFpbmVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLm1vZGVsLXRpbWVyJyk7XHJcbiR0aW1lckNvbnRhaW5lci5hcHBlbmRDaGlsZCh0aW1lci5ub2RlKTtcclxuXHJcbmZ1bmN0aW9uIHNldCh7IG5hbWUsIGltZywgcGFyYW1zIH0pIHtcclxuICAkbmFtZS50ZXh0Q29udGVudCA9IG5hbWU7XHJcbiAgJGltZy5zZXRBdHRyaWJ1dGUoJ3NyYycsIGltZyk7XHJcbiAgc2V0UGFyYW1ldGVycyhwYXJhbXMpO1xyXG59XHJcblxyXG5mdW5jdGlvbiBzZXRQYXJhbWV0ZXJzKHBhcmFtcyA9IFtdKSB7XHJcbiAgY29uc3QgZnJhZyA9IGRvY3VtZW50LmNyZWF0ZURvY3VtZW50RnJhZ21lbnQoKTtcclxuICBwYXJhbXMuZm9yRWFjaChwYXJhbSA9PiBmcmFnLmFwcGVuZENoaWxkKGNyZWF0ZVBhcmFtZXRlTm9kZShwYXJhbS5uYW1lLCBwYXJhbS52YWx1ZSkpKTtcclxuXHJcbiAgJHBhcmFtcy5pbm5lckhUTUwgPSBcIlwiO1xyXG4gICRwYXJhbXMuYXBwZW5kQ2hpbGQoZnJhZyk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGNyZWF0ZVBhcmFtZXRlTm9kZShrZXksIHZhbHVlKSB7XHJcbiAgY29uc3QgZGl2ID0gbm9kZUZhY3RvcnkoJ2RpdicsIHsgY2xhc3NMaXN0OiBbJ3BhcmFtZXRlciddIH0pO1xyXG5cclxuICBjb25zdCBrZXlTcGFuID0gbm9kZUZhY3RvcnkoJ3NwYW4nLCB7IHRleHRDb250ZW50OiBrZXkgfSk7XHJcbiAgZGl2LmFwcGVuZENoaWxkKGtleVNwYW4pO1xyXG5cclxuICBjb25zdCB2YWx1ZVNwYW4gPSBub2RlRmFjdG9yeSgnc3BhbicsIHsgdGV4dENvbnRlbnQ6IHZhbHVlIH0pO1xyXG4gIGRpdi5hcHBlbmRDaGlsZCh2YWx1ZVNwYW4pO1xyXG5cclxuICByZXR1cm4gZGl2O1xyXG59XHJcblxyXG5cclxuLyoqIFNldHMgZXZlbnQgZGF0YSB0byBVSSAqL1xyXG5mdW5jdGlvbiBzaG93RXZlbnQoZXZlbnQpIHtcclxuICAkZXZlbnRIZWFkZXIudGV4dENvbnRlbnQgPSBldmVudC5uYW1lO1xyXG4gICRldmVudEJvZHkudGV4dENvbnRlbnQgPSBldmVudC5kZXNjcmlwdGlvbjtcclxuICAkZXZlbnQuY2xhc3NMaXN0LnJlbW92ZSgnaXMtaGlkZGVuJywgJ3NsaWRlLXRvcCcpO1xyXG4gIHNob3dUaW1lcigpO1xyXG59XHJcbmZ1bmN0aW9uIGhpZGVFdmVudCgpIHtcclxuICAkZXZlbnQuY2xhc3NMaXN0LmFkZCgnaXMtaGlkZGVuJywgJ3NsaWRlLXRvcCcpO1xyXG4gIGhpZGVUaW1lcigpO1xyXG59XHJcblxyXG5mdW5jdGlvbiBzaG93VGltZXIoKSB7XHJcbiAgJHRpbWVyQ29udGFpbmVyLmNsYXNzTGlzdC5yZW1vdmUoJ2lzLWhpZGRlbicpO1xyXG4gIHRpbWVyLnN0YXJ0KCk7XHJcbn1cclxuZnVuY3Rpb24gaGlkZVRpbWVyKCkge1xyXG4gICR0aW1lckNvbnRhaW5lci5jbGFzc0xpc3QuYWRkKCdpcy1oaWRkZW4nKTtcclxuICB0aW1lci5zdG9wKCk7XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IHtcclxuICBzZXQsXHJcbiAgc2hvd0V2ZW50LFxyXG4gIGhpZGVFdmVudFxyXG59XHJcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2xlYXJuaW5nL3NjZW5lX2NvbXBvbmVudHMvc3RhdGUuanMiLCJpbXBvcnQgbm9kZUZhY3RvcnkgZnJvbSAnLi4vLi4vdXRpbHMvbm9kZUZhY3RvcnknO1xyXG5cclxuY29uc3QgdG9vbFR5cGVzID0ge1xyXG4gIFJBTkdFOiAncmFuZ2UnLFxyXG4gIFNXSVRDSDogJ3N3aXRjaCdcclxufVxyXG5jb25zdCAkdG9vbHMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcudG9vbHMtbGlzdCcpO1xyXG5cclxuZnVuY3Rpb24gaW5pdCh0b29scykge1xyXG4gIGNvbnN0IGZyYWdtZW50ID0gZG9jdW1lbnQuY3JlYXRlRG9jdW1lbnRGcmFnbWVudCgpO1xyXG5cclxuICB0b29scy5mb3JFYWNoKHRvb2wgPT4ge1xyXG4gICAgLy8gY3JlYXRlIHRvb2wgd3JhcHBlclxyXG4gICAgY29uc3QgZGl2ID0gbm9kZUZhY3RvcnkoJ2RpdicsIHsgY2xhc3NMaXN0OiBbJ3Rvb2wnXSB9KTtcclxuXHJcbiAgICBjb25zdCBsYWJlbCA9IG5vZGVGYWN0b3J5KCdsYWJlbCcsIHtcclxuICAgICAgY2xhc3NMaXN0OiBbJ3Rvb2wtbmFtZSddLFxyXG4gICAgICBhdHRyczogeyBcImZvclwiOiB0b29sLm5hbWUgfSxcclxuICAgICAgdGV4dENvbnRlbnQ6IHRvb2wubmFtZVxyXG4gICAgfSk7XHJcbiAgICBkaXYuYXBwZW5kQ2hpbGQobGFiZWwpO1xyXG5cclxuICAgIGNvbnN0IHRvb2xOb2RlID0gY3JlYXRlVG9vbE5vZGUodG9vbCk7XHJcbiAgICBkaXYuYXBwZW5kQ2hpbGQodG9vbE5vZGUpO1xyXG5cclxuICAgIGZyYWdtZW50LmFwcGVuZENoaWxkKGRpdik7XHJcbiAgfSk7XHJcblxyXG4gICR0b29scy5pbm5lckhUTUwgPSBcIlwiO1xyXG4gICR0b29scy5hcHBlbmRDaGlsZChmcmFnbWVudCk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGNyZWF0ZVRvb2xOb2RlKHRvb2wpIHtcclxuICBzd2l0Y2godG9vbC50eXBlKSB7XHJcbiAgICBjYXNlIHRvb2xUeXBlcy5SQU5HRTogICByZXR1cm4gY3JlYXRlUmFuZ2VUb29sKHRvb2wpO1xyXG4gICAgY2FzZSB0b29sVHlwZXMuU1dJVENIOiAgcmV0dXJuIGNyZWF0ZVN3aXRjaFRvb2wodG9vbCk7XHJcbiAgICBkZWZhdWx0OiAgICAgICAgICAgICAgICByZXR1cm4gJ9Cd0LXQuNC30LLQtdGB0YLQvdGL0Lkg0L/RgNC40LHQvtGAJztcclxuICB9XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGNyZWF0ZVJhbmdlVG9vbCh0b29sKSB7XHJcbiAgY29uc3QgZGl2SW5wdXQgPSBub2RlRmFjdG9yeSgnZGl2JywgeyBjbGFzc0xpc3Q6IFsncmFuZ2UnXSB9KTtcclxuXHJcbiAgY29uc3Qgc3Bhbk1pbiA9IG5vZGVGYWN0b3J5KCdzcGFuJywgeyB0ZXh0Q29udGVudDogdG9vbC5taW4gfSk7XHJcbiAgZGl2SW5wdXQuYXBwZW5kQ2hpbGQoc3Bhbk1pbilcclxuXHJcbiAgY29uc3QgaW5wdXQgPSBub2RlRmFjdG9yeSgnaW5wdXQnLCB7XHJcbiAgICBhdHRyczoge1xyXG4gICAgICAnZGF0YS1pZCc6IHRvb2wuaWQsXHJcbiAgICAgICdkYXRhLXR5cGUnOiAncmFuZ2UnLFxyXG4gICAgICAnbmFtZSc6IHRvb2wubmFtZSxcclxuICAgICAgJ3R5cGUnOiAncmFuZ2UnLFxyXG4gICAgICAnbWluJzogdG9vbC5taW4sXHJcbiAgICAgICdtYXgnOiB0b29sLm1heFxyXG4gICAgfVxyXG4gIH0pO1xyXG4gIGRpdklucHV0LmFwcGVuZENoaWxkKGlucHV0KTtcclxuXHJcbiAgY29uc3Qgc3Bhbk1heCA9IG5vZGVGYWN0b3J5KCdzcGFuJywgeyB0ZXh0Q29udGVudDogdG9vbC5tYXggfSk7XHJcbiAgZGl2SW5wdXQuYXBwZW5kQ2hpbGQoc3Bhbk1heCk7XHJcblxyXG4gIGNvbnN0IGRpdkN1cnJlbnQgPSBub2RlRmFjdG9yeSgnZGl2JywgeyBjbGFzc0xpc3Q6IFsncmFuZ2UtY3VycmVudC12YWx1ZSddIH0pO1xyXG4gIGNvbnN0IHNwYW5DdXJyZW50ID0gbm9kZUZhY3RvcnkoJ3NwYW4nLCB7IHRleHRDb250ZW50OiBpbnB1dC52YWx1ZSB9KTtcclxuICBkaXZDdXJyZW50LmFwcGVuZENoaWxkKHNwYW5DdXJyZW50KTtcclxuXHJcbiAgaW5wdXQuYWRkRXZlbnRMaXN0ZW5lcignaW5wdXQnLCAoZXZ0KSA9PiB7XHJcbiAgICBzcGFuQ3VycmVudC50ZXh0Q29udGVudCA9IGV2dC50YXJnZXQudmFsdWU7XHJcbiAgfSk7XHJcblxyXG4gIGNvbnN0IGZyYWdtZW50ID0gZG9jdW1lbnQuY3JlYXRlRG9jdW1lbnRGcmFnbWVudCgpO1xyXG4gIGZyYWdtZW50LmFwcGVuZENoaWxkKGRpdklucHV0KTtcclxuICBmcmFnbWVudC5hcHBlbmRDaGlsZChkaXZDdXJyZW50KTtcclxuXHJcbiAgcmV0dXJuIGZyYWdtZW50O1xyXG59XHJcblxyXG5mdW5jdGlvbiBjcmVhdGVTd2l0Y2hUb29sKHRvb2wpIHtcclxuICBjb25zdCBsYWJlbCA9IG5vZGVGYWN0b3J5KCdsYWJlbCcsIHsgY2xhc3NMaXN0OiBbJ3N3aXRjaCddIH0pO1xyXG5cclxuICBjb25zdCBpbnB1dCA9IG5vZGVGYWN0b3J5KCdpbnB1dCcsIHtcclxuICAgIGF0dHJzOiB7XHJcbiAgICAgICdkYXRhLWlkJzogdG9vbC5pZCxcclxuICAgICAgJ2RhdGEtdHlwZSc6ICdzd2l0Y2gnLFxyXG4gICAgICAndHlwZSc6ICdjaGVja2JveCdcclxuICAgIH1cclxuICB9KTtcclxuICBsYWJlbC5hcHBlbmRDaGlsZChpbnB1dCk7XHJcblxyXG4gIGNvbnN0IGRpdiA9IG5vZGVGYWN0b3J5KCdkaXYnLCB7IGNsYXNzTGlzdDogWydzbGlkZXInXSB9KTtcclxuICBsYWJlbC5hcHBlbmRDaGlsZChkaXYpO1xyXG5cclxuICByZXR1cm4gbGFiZWw7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGdldFRvb2xzRGF0YSgpIHtcclxuICBjb25zdCB0b29sc0RhdGEgPSBbXTtcclxuICBjb25zdCBpbnB1dHMgPSAkdG9vbHMucXVlcnlTZWxlY3RvckFsbCgnaW5wdXRbZGF0YS1pZF0nKTtcclxuICBpbnB1dHMuZm9yRWFjaChpbnB1dCA9PiB7XHJcbiAgICBjb25zdCB7IGlkLCB0eXBlIH0gPSBpbnB1dC5kYXRhc2V0O1xyXG4gICAgbGV0IHZhbHVlO1xyXG4gICAgc3dpdGNoKHR5cGUpIHtcclxuICAgICAgY2FzZSB0b29sVHlwZXMuUkFOR0U6IHZhbHVlID0gcGFyc2VJbnQoaW5wdXQudmFsdWUpOyBicmVhaztcclxuICAgICAgY2FzZSB0b29sVHlwZXMuU1dJVENIOiB2YWx1ZSA9IGlucHV0LmNoZWNrZWQ7IGJyZWFrO1xyXG4gICAgICBkZWZhdWx0OiB0aHJvdyBuZXcgRXJyb3IoYNCd0LXQutC+0YDRgNC10LrRgtC90YvQuSDRgtC40L8g0L/RgNC40LHQvtGA0LAuIElEOiAke2lkfWApO1xyXG4gICAgfVxyXG4gICAgdG9vbHNEYXRhLnB1c2goeyBpZCwgdmFsdWUgfSk7XHJcbiAgfSk7XHJcbiAgcmV0dXJuIHRvb2xzRGF0YTtcclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQge1xyXG4gIGluaXQsXHJcbiAgZ2V0VG9vbHNEYXRhXHJcbn07XHJcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2xlYXJuaW5nL3NjZW5lX2NvbXBvbmVudHMvdG9vbHMuanMiLCJpbXBvcnQgbm9kZUZhY3RvcnkgZnJvbSAnLi9ub2RlRmFjdG9yeSc7XHJcblxyXG5mdW5jdGlvbiBtc1RvQ29udGVudChtcykge1xyXG4gIGNvbnN0IHNlY29uZHMgPSBNYXRoLnJvdW5kKG1zIC8gMTAwMCk7XHJcbiAgY29uc3QgbWlucyA9IE1hdGguZmxvb3Ioc2Vjb25kcyAvIDYwKTtcclxuICBjb25zdCBzZWNvbmRzTGVmdCA9IHNlY29uZHMgLSAobWlucyAqIDYwKTtcclxuXHJcbiAgcmV0dXJuIGAke21pbnN9OiR7c2Vjb25kc0xlZnQgPj0gMTAgPyAnJyA6ICcwJ30ke3NlY29uZHNMZWZ0fWA7XHJcbn1cclxuXHJcbmNvbnN0IHRpbWVyID0ge1xyXG4gIHN0YXJ0VGltZTogbnVsbCxcclxuICBpbnRlcnZhbDogbnVsbCxcclxuICBub2RlOiBub2RlRmFjdG9yeSgnc3BhbicsIHsgY2xhc3NMaXN0OiBbJ3RpbWVyJ10sIHRleHRDb250ZW50OiAnMDowMCcgfSksXHJcbiAgc3RhcnQ6IGZ1bmN0aW9uKCkge1xyXG4gICAgdGhpcy5zdGFydFRpbWUgPSBEYXRlLm5vdygpO1xyXG4gICAgdGhpcy5pbnRlcnZhbCA9IHNldEludGVydmFsKCgpID0+IHtcclxuICAgICAgY29uc3QgZWxhcHNlZCA9IERhdGUubm93KCkgLSB0aGlzLnN0YXJ0VGltZTtcclxuICAgICAgdGhpcy5ub2RlLnRleHRDb250ZW50ID0gbXNUb0NvbnRlbnQoZWxhcHNlZCk7XHJcbiAgICB9LCAxMDAwKTtcclxuICB9LFxyXG4gIHN0b3A6IGZ1bmN0aW9uKCkge1xyXG4gICAgaWYgKCF0aGlzLnN0YXJ0VGltZSkgeyByZXR1cm47IH1cclxuICAgIHRoaXMuc3RhcnRUaW1lID0gbnVsbDtcclxuICAgIGNsZWFySW50ZXJ2YWwodGhpcy5pbnRlcnZhbCk7XHJcbiAgICB0aGlzLm5vZGUudGV4dENvbnRlbnQgPSAnMDowMCc7XHJcbiAgfVxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCB0aW1lcjtcclxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vdXRpbHMvdGltZXIuanMiLCJpbXBvcnQgJy4uLy4uL3Nhc3MvbGVhcm5pbmcuc2Nzcyc7XHJcblxyXG5pbXBvcnQgcHVic3ViIGZyb20gJy4uL3V0aWxzL3B1YnN1Yic7XHJcbmltcG9ydCBhamF4IGZyb20gJy4uL3V0aWxzL2FqYXgnO1xyXG5pbXBvcnQgc2NlbmUgZnJvbSAnLi9zY2VuZSc7XHJcbmltcG9ydCBNb2RlbCBmcm9tICcuL21vZGVsJztcclxuXHJcbi8qKlxyXG4gKiBMb2FkIG1vZGVsIHdpdGggZ2l2ZW4gaWRcclxuICovXHJcbmZ1bmN0aW9uIGxvYWRNb2RlbChpZCkge1xyXG4gIHJldHVybiBhamF4KGAvbW9kZWxzLyR7aWR9YCkudGhlbihyZXNwb25zZSA9PiBKU09OLnBhcnNlKHJlc3BvbnNlKSk7XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBVSSBidXR0b24ncyBoYW5kbGVyc1xyXG4gKi9cclxuY29uc3QgJHNlbGVjdCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjbW9kZWwtc2VsZWN0XCIpO1xyXG5jb25zdCAkbG9hZEJ1dHRvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNsb2FkLW1vZGVsLWJ0bicpO1xyXG5sZXQgbW9kZWwgPSBudWxsO1xyXG4kbG9hZEJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcclxuICBpZiAoIG1vZGVsICkgeyBtb2RlbC5zdG9wKCk7IH1cclxuICBjb25zdCBtb2RlbElkID0gJHNlbGVjdC52YWx1ZTtcclxuICBsb2FkTW9kZWwobW9kZWxJZClcclxuICAgIC50aGVuKHJlc3BvbnNlID0+IHtcclxuICAgICAgbW9kZWwgPSBuZXcgTW9kZWwocmVzcG9uc2UpO1xyXG4gICAgICBzY2VuZS5pbml0KG1vZGVsLCByZXNwb25zZSlcclxuICAgICAgICAuc2hvd0NvbnRlbnQoKVxyXG4gICAgICAgIC5lbmFibGVCdXR0b25zKCRzdGFydEJ1dHRvbilcclxuICAgICAgICAuZGlzYWJsZUJ1dHRvbnMoJHN0b3BCdXR0b24sICRydW5CdXR0b24pO1xyXG4gICAgfSlcclxuICAgIC5jYXRjaChlcnIgPT4geyBjb25zb2xlLmVycm9yKGVycikgfSk7XHJcbn0pO1xyXG4vL1xyXG5jb25zdCAkc3RhcnRCdXR0b24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjc3RhcnQtYnRuJyk7XHJcbiRzdGFydEJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcclxuICBtb2RlbC5zdGFydCgpO1xyXG4gIHNjZW5lLmRpc2FibGVCdXR0b25zKCRzdGFydEJ1dHRvbik7XHJcbiAgc2NlbmUuZW5hYmxlQnV0dG9ucygkc3RvcEJ1dHRvbiwgJHJ1bkJ1dHRvbik7XHJcbn0pO1xyXG5cclxuY29uc3QgJHN0b3BCdXR0b24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjc3RvcC1idG4nKTtcclxuJHN0b3BCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XHJcbiAgbW9kZWwuc3RvcCgpO1xyXG4gIHNjZW5lLmVuYWJsZUJ1dHRvbnMoJHN0YXJ0QnV0dG9uKTtcclxuICBzY2VuZS5kaXNhYmxlQnV0dG9ucygkc3RvcEJ1dHRvbiwgJHJ1bkJ1dHRvbik7XHJcbn0pO1xyXG5cclxuY29uc3QgJHJ1bkJ1dHRvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNydW4tYnRuJyk7XHJcbiRydW5CdXR0b24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XHJcbiAgY29uc3QgdG9vbHNEYXRhID0gc2NlbmUuZ2V0VG9vbHNEYXRhKCk7XHJcbiAgcHVic3ViLnB1Ymxpc2goJ3VzZXJfaW5wdXQnLCB0b29sc0RhdGEpO1xyXG59KTtcclxuXHJcbi8qKlxyXG4gKiBIYW5kbGUgY3VzdG9tIGV2ZW50cyBoZXJlICh1c2VyIGlucHV0LCBwcm9ncmFtbSBtZXNzYWdlcyBldGMuKVxyXG4gKi9cclxucHVic3ViLnN1YnNjcmliZSgnbmV3X3N0YXRlJywgc3RhdGUgPT4ge1xyXG4gIHNjZW5lLmhpZGVFdmVudCgpO1xyXG4gIHNjZW5lLnNldFN0YXRlKHN0YXRlKTtcclxufSk7XHJcbnB1YnN1Yi5zdWJzY3JpYmUoJ2V2ZW50JywgZXZlbnQgPT4gc2NlbmUuc2hvd0V2ZW50KGV2ZW50KSk7XHJcblxyXG4vLyAvKipcclxuLy8gKiBUaW1lciAoY3VycmVudGx5IGZvciBkZXYgbW9kZSBvbmx5KVxyXG4vLyAqL1xyXG4vLyBpbXBvcnQgdGltZXIgZnJvbSAnLi4vdXRpbHMvdGltZXInO1xyXG4vLyBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuaGVhZGVyJykuYXBwZW5kQ2hpbGQodGltZXIubm9kZSk7XHJcbi8vIHB1YnN1Yi5zdWJzY3JpYmUoJ25ld19zdGF0ZScsIHN0YXRlID0+IHRpbWVyLnN0b3AoKSk7XHJcbi8vIHB1YnN1Yi5zdWJzY3JpYmUoJ2V2ZW50JywgZXZlbnQgPT4gdGltZXIuc3RhcnQoKSk7XHJcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2xlYXJuaW5nL2luZGV4LmpzIl0sInNvdXJjZVJvb3QiOiIifQ==