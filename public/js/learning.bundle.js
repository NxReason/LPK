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
/******/ 	return __webpack_require__(__webpack_require__.s = 22);
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
  var params = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

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
/* 2 */,
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _state = __webpack_require__(15);

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
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _state = __webpack_require__(16);

var _state2 = _interopRequireDefault(_state);

var _tools = __webpack_require__(17);

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
/* 5 */
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
/* 6 */,
/* 7 */,
/* 8 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 9 */,
/* 10 */,
/* 11 */,
/* 12 */,
/* 13 */
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
/* 14 */
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
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _event = __webpack_require__(14);

var _event2 = _interopRequireDefault(_event);

var _action = __webpack_require__(13);

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
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _nodeFactory = __webpack_require__(0);

var _nodeFactory2 = _interopRequireDefault(_nodeFactory);

var _timer = __webpack_require__(19);

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
/* 17 */
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
/* 18 */,
/* 19 */
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
/* 20 */,
/* 21 */,
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


__webpack_require__(8);

var _pubsub = __webpack_require__(1);

var _pubsub2 = _interopRequireDefault(_pubsub);

var _ajax = __webpack_require__(5);

var _ajax2 = _interopRequireDefault(_ajax);

var _scene = __webpack_require__(4);

var _scene2 = _interopRequireDefault(_scene);

var _model = __webpack_require__(3);

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgMGQxZDUyOWM0Y2QxYTczZjY3MzgiLCJ3ZWJwYWNrOi8vLy4vdXRpbHMvbm9kZUZhY3RvcnkuanMiLCJ3ZWJwYWNrOi8vLy4vdXRpbHMvcHVic3ViLmpzIiwid2VicGFjazovLy8uL2xlYXJuaW5nL21vZGVsLmpzIiwid2VicGFjazovLy8uL2xlYXJuaW5nL3NjZW5lLmpzIiwid2VicGFjazovLy8uL3V0aWxzL2FqYXguanMiLCJ3ZWJwYWNrOi8vLy4uL3Nhc3MvbGVhcm5pbmcuc2NzcyIsIndlYnBhY2s6Ly8vLi9sZWFybmluZy9tb2RlbF9jb21wb25lbnRzL2FjdGlvbi5qcyIsIndlYnBhY2s6Ly8vLi9sZWFybmluZy9tb2RlbF9jb21wb25lbnRzL2V2ZW50LmpzIiwid2VicGFjazovLy8uL2xlYXJuaW5nL21vZGVsX2NvbXBvbmVudHMvc3RhdGUuanMiLCJ3ZWJwYWNrOi8vLy4vbGVhcm5pbmcvc2NlbmVfY29tcG9uZW50cy9zdGF0ZS5qcyIsIndlYnBhY2s6Ly8vLi9sZWFybmluZy9zY2VuZV9jb21wb25lbnRzL3Rvb2xzLmpzIiwid2VicGFjazovLy8uL3V0aWxzL3RpbWVyLmpzIiwid2VicGFjazovLy8uL2xlYXJuaW5nL2luZGV4LmpzIl0sIm5hbWVzIjpbIm5vZGVGYWN0b3J5IiwidHlwZSIsInBhcmFtcyIsIm5vZGUiLCJkb2N1bWVudCIsImNyZWF0ZUVsZW1lbnQiLCJhcHBlbmRDbGFzc2VzIiwiYXBwZW5kQXR0cnMiLCJpbnNlcnRUZXh0Q29udGVudCIsImNsYXNzTGlzdCIsImZvckVhY2giLCJhZGQiLCJjbGFzc05hbWUiLCJhdHRycyIsImF0dHJOYW1lcyIsIk9iamVjdCIsImtleXMiLCJzZXRBdHRyaWJ1dGUiLCJhdHRyTmFtZSIsInRleHRDb250ZW50IiwicHVic3ViIiwidG9waWNzIiwic3Vic2NyaWJlIiwidG9waWMiLCJsaXN0ZW5lciIsInF1ZXVlIiwiaW5kZXgiLCJwdXNoIiwicmVtb3ZlIiwicHVibGlzaCIsImluZm8iLCJsZW5ndGgiLCJpdGVtcyIsIml0ZW0iLCJJTklUSUFMX1NUQVRFX05BTUUiLCJTVE9QX1NUQVRFX05BTUUiLCJNb2RlbCIsImRhdGEiLCJpZCIsIm5hbWUiLCJicmVha1RpbWUiLCJzdGVwcyIsInN0YXRlcyIsIm1hcCIsInN0YXRlIiwiaW5pdGlhbFN0YXRlIiwiY3VycmVudFN0YXRlIiwiZ2V0U3RhdGUiLCJ0aW1lb3V0Iiwic3ViSW5wdXQiLCJzdWJTdG9wIiwic3RhcnRTdGF0ZSIsImltZyIsImxhc3QiLCJzdG9wU3RhdGUiLCJmaW5kIiwiaW50ZXJ2YWxzIiwiUHJvbWlzZSIsInJlc29sdmUiLCJpIiwidGhlbiIsIm1ha2VCcmVhayIsImhhbmRsZUV2ZW50IiwiaGFuZGxlTmV3U3RhdGUiLCJjYXRjaCIsInJlamVjdCIsInNldFRpbWVvdXQiLCJjbGVhclN1YnMiLCJldmVudCIsImV2ZW50U3RhcnRUaW1lIiwiRGF0ZSIsIm5vdyIsInRpbWVTcGVudCIsIm5leHRTdGF0ZUlkIiwiaGFuZGxlSW5wdXQiLCJuZXh0U3RhdGUiLCJpbmFjdGl2ZVRpbWUiLCJnZXRJbmFjdGl2ZVRpbWUiLCJnZXRJbmFjdGl2ZUFjdGlvbiIsImNsZWFyVGltZW91dCIsImV4cG9ydHMiLCIkbW9kZWxOYW1lIiwicXVlcnlTZWxlY3RvciIsImluaXQiLCJtb2RlbCIsInJlc3BvbnNlIiwic2V0IiwidG9vbHMiLCIkY29udGVudCIsInNob3dDb250ZW50Iiwic2V0Q29udGVudERpc3BsYXkiLCJoaWRlQ29udGVudCIsImRpc3BsYXkiLCJzdHlsZSIsImVuYWJsZUJ1dHRvbnMiLCJidXR0b25zIiwic2V0QnV0dG9uc1N0YXRlIiwiZGlzYWJsZUJ1dHRvbnMiLCJ2YWx1ZSIsImJ1dHRvbiIsImRpc2FibGVkIiwiZ2V0VG9vbHNEYXRhIiwic2V0U3RhdGUiLCJzdGF0ZURhdGEiLCJzaG93RXZlbnQiLCJldmVudERhdGEiLCJoaWRlRXZlbnQiLCJhamF4IiwicGF0aCIsIm9wdGlvbnMiLCJ4aHIiLCJYTUxIdHRwUmVxdWVzdCIsIm9wZW4iLCJtZXRob2QiLCJoZWFkZXJzIiwic2V0WEhSSGVhZGVycyIsInNlbmQiLCJvbnJlYWR5c3RhdGVjaGFuZ2UiLCJyZWFkeVN0YXRlIiwic3RhdHVzIiwicmVzcG9uc2VUZXh0Iiwic3RhdHVzVGV4dCIsImhlYWRlciIsInNldFJlcXVlc3RIZWFkZXIiLCJBY3Rpb24iLCJtaW5UaW1lIiwibWF4VGltZSIsImluYWN0aXZlIiwiaW5pdFRvb2xzIiwidGltZSIsInJpZ2h0VGltZSIsInJpZ2h0RGF0YSIsImV2ZXJ5IiwiY2hlY2tUb29sIiwib2JqIiwidG9vbCIsImJvb2xWYWx1ZSIsImluY2x1ZGVzVmFsdWUiLCJtaW5WYWx1ZSIsIm1heFZhbHVlIiwiYm9yZGVycyIsIlR5cGVFcnJvciIsIkFjdGlvblRvb2wiLCJFdmVudCIsImRlc2NyaXB0aW9uIiwiU3RhdGUiLCJhY3Rpb25zIiwiYWN0aW9uIiwidGltZXMiLCJnZXRBbGxBY3Rpb25UaW1lcyIsIk1hdGgiLCJtYXgiLCJzdWl0ZWRBY3Rpb25zIiwiZmlsdGVyIiwiaXNTdWl0YWJsZSIsIiRuYW1lIiwiJGltZyIsIiRwYXJhbXMiLCIkZXZlbnQiLCIkZXZlbnRIZWFkZXIiLCIkZXZlbnRCb2R5IiwiJHRpbWVyQ29udGFpbmVyIiwiYXBwZW5kQ2hpbGQiLCJzZXRQYXJhbWV0ZXJzIiwiZnJhZyIsImNyZWF0ZURvY3VtZW50RnJhZ21lbnQiLCJjcmVhdGVQYXJhbWV0ZU5vZGUiLCJwYXJhbSIsImlubmVySFRNTCIsImtleSIsImRpdiIsImtleVNwYW4iLCJ2YWx1ZVNwYW4iLCJzaG93VGltZXIiLCJoaWRlVGltZXIiLCJzdGFydCIsInN0b3AiLCJ0b29sVHlwZXMiLCJSQU5HRSIsIlNXSVRDSCIsIiR0b29scyIsImZyYWdtZW50IiwibGFiZWwiLCJ0b29sTm9kZSIsImNyZWF0ZVRvb2xOb2RlIiwiY3JlYXRlUmFuZ2VUb29sIiwiY3JlYXRlU3dpdGNoVG9vbCIsImRpdklucHV0Iiwic3Bhbk1pbiIsIm1pbiIsImlucHV0Iiwic3Bhbk1heCIsImRpdkN1cnJlbnQiLCJzcGFuQ3VycmVudCIsImFkZEV2ZW50TGlzdGVuZXIiLCJldnQiLCJ0YXJnZXQiLCJ0b29sc0RhdGEiLCJpbnB1dHMiLCJxdWVyeVNlbGVjdG9yQWxsIiwiZGF0YXNldCIsInBhcnNlSW50IiwiY2hlY2tlZCIsIkVycm9yIiwibXNUb0NvbnRlbnQiLCJtcyIsInNlY29uZHMiLCJyb3VuZCIsIm1pbnMiLCJmbG9vciIsInNlY29uZHNMZWZ0IiwidGltZXIiLCJzdGFydFRpbWUiLCJpbnRlcnZhbCIsInNldEludGVydmFsIiwiZWxhcHNlZCIsImNsZWFySW50ZXJ2YWwiLCJsb2FkTW9kZWwiLCJKU09OIiwicGFyc2UiLCIkc2VsZWN0IiwiJGxvYWRCdXR0b24iLCJtb2RlbElkIiwiJHN0YXJ0QnV0dG9uIiwiJHN0b3BCdXR0b24iLCIkcnVuQnV0dG9uIiwiY29uc29sZSIsImVycm9yIiwiZXJyIl0sIm1hcHBpbmdzIjoiO0FBQUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0EsbURBQTJDLGNBQWM7O0FBRXpEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBSztBQUNMO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsbUNBQTJCLDBCQUEwQixFQUFFO0FBQ3ZELHlDQUFpQyxlQUFlO0FBQ2hEO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLDhEQUFzRCwrREFBK0Q7O0FBRXJIO0FBQ0E7O0FBRUE7QUFDQTs7Ozs7Ozs7Ozs7OztBQ2hFQSxJQUFNQSxjQUFjLFNBQWRBLFdBQWMsR0FBb0M7QUFBQSxNQUEzQkMsSUFBMkIsdUVBQXBCLEtBQW9CO0FBQUEsTUFBYkMsTUFBYSx1RUFBSixFQUFJOztBQUN0RCxNQUFNQyxPQUFPQyxTQUFTQyxhQUFULENBQXVCSixJQUF2QixDQUFiOztBQUVBSyxnQkFBY0gsSUFBZCxFQUFvQkQsTUFBcEI7QUFDQUssY0FBWUosSUFBWixFQUFrQkQsTUFBbEI7QUFDQU0sb0JBQWtCTCxJQUFsQixFQUF3QkQsTUFBeEI7O0FBRUEsU0FBT0MsSUFBUDtBQUNELENBUkQ7O0FBVUEsU0FBU0csYUFBVCxDQUF1QkgsSUFBdkIsUUFBNEM7QUFBQSxNQUFiTSxTQUFhLFFBQWJBLFNBQWE7O0FBQzFDLE1BQUlBLGFBQWFBLFVBQVVDLE9BQTNCLEVBQW9DO0FBQ2xDRCxjQUFVQyxPQUFWLENBQWtCO0FBQUEsYUFBYVAsS0FBS00sU0FBTCxDQUFlRSxHQUFmLENBQW1CQyxTQUFuQixDQUFiO0FBQUEsS0FBbEI7QUFDRDtBQUNGOztBQUVELFNBQVNMLFdBQVQsQ0FBcUJKLElBQXJCLFNBQXNDO0FBQUEsTUFBVFUsS0FBUyxTQUFUQSxLQUFTOztBQUNwQyxNQUFJQSxLQUFKLEVBQVc7QUFDVCxRQUFNQyxZQUFZQyxPQUFPQyxJQUFQLENBQVlILEtBQVosQ0FBbEI7QUFDQUMsY0FBVUosT0FBVixDQUFrQjtBQUFBLGFBQVlQLEtBQUtjLFlBQUwsQ0FBa0JDLFFBQWxCLEVBQTRCTCxNQUFNSyxRQUFOLENBQTVCLENBQVo7QUFBQSxLQUFsQjtBQUNEO0FBQ0Y7O0FBRUQsU0FBU1YsaUJBQVQsQ0FBMkJMLElBQTNCLFNBQXVEO0FBQUEsZ0NBQXBCZ0IsV0FBb0I7QUFBQSxNQUFwQkEsV0FBb0IscUNBQU4sRUFBTTs7QUFDckRoQixPQUFLZ0IsV0FBTCxHQUFtQkEsV0FBbkI7QUFDRDs7a0JBRWNuQixXOzs7Ozs7Ozs7Ozs7QUMzQmYsSUFBTW9CLFNBQVUsWUFBVzs7QUFFekIsTUFBTUMsU0FBUyxFQUFmOztBQUVBLFNBQU87QUFDTEMsZUFBVyxtQkFBU0MsS0FBVCxFQUFnQkMsUUFBaEIsRUFBMEI7QUFDbkMsVUFBSSxDQUFDSCxPQUFPRSxLQUFQLENBQUwsRUFBb0JGLE9BQU9FLEtBQVAsSUFBZ0IsRUFBRUUsT0FBTyxFQUFULEVBQWhCOztBQUVwQixVQUFNQyxRQUFRTCxPQUFPRSxLQUFQLEVBQWNFLEtBQWQsQ0FBb0JFLElBQXBCLENBQXlCSCxRQUF6QixJQUFxQyxDQUFuRDtBQUNBO0FBQ0EsYUFBTztBQUNMSSxnQkFBUSxrQkFBVztBQUNqQixpQkFBT1AsT0FBT0UsS0FBUCxFQUFjRSxLQUFkLENBQW9CQyxLQUFwQixDQUFQO0FBQ0Q7QUFISSxPQUFQO0FBS0QsS0FYSTs7QUFhTEcsYUFBUyxpQkFBU04sS0FBVCxFQUFnQk8sSUFBaEIsRUFBc0I7QUFDN0I7QUFDQSxVQUFJLENBQUNULE9BQU9FLEtBQVAsQ0FBRCxJQUFrQixDQUFDRixPQUFPRSxLQUFQLEVBQWNFLEtBQWQsQ0FBb0JNLE1BQTNDLEVBQW1EOztBQUVuRCxVQUFNQyxRQUFRWCxPQUFPRSxLQUFQLEVBQWNFLEtBQTVCO0FBQ0FPLFlBQU10QixPQUFOLENBQWMsZ0JBQVE7QUFDcEJ1QixhQUFLSCxRQUFRLEVBQWI7QUFDRCxPQUZEO0FBR0Q7QUFyQkksR0FBUDtBQXVCRCxDQTNCYyxFQUFmOztrQkE2QmVWLE07Ozs7Ozs7Ozs7Ozs7Ozs7QUM3QmY7Ozs7QUFDQTs7Ozs7Ozs7QUFFQSxJQUFNYyxxQkFBcUIsa0JBQTNCO0FBQ0EsSUFBTUMsa0JBQWtCLHNCQUF4Qjs7SUFFTUMsSztBQUNKLGlCQUFZQyxJQUFaLEVBQWtCO0FBQUE7O0FBQ2hCLFNBQUtDLEVBQUwsR0FBVUQsS0FBS0MsRUFBZjtBQUNBLFNBQUtDLElBQUwsR0FBWUYsS0FBS0UsSUFBakI7QUFDQSxTQUFLQyxTQUFMLEdBQWlCSCxLQUFLRyxTQUF0QjtBQUNBLFNBQUtDLEtBQUwsR0FBYUosS0FBS0ksS0FBbEI7O0FBRUEsU0FBS0MsTUFBTCxHQUFjTCxLQUFLSyxNQUFMLENBQVlDLEdBQVosQ0FBZ0I7QUFBQSxhQUFTLG9CQUFVQyxLQUFWLENBQVQ7QUFBQSxLQUFoQixDQUFkO0FBQ0EsU0FBS0MsWUFBTCxHQUFvQlIsS0FBS1EsWUFBekI7QUFDQSxTQUFLQyxZQUFMLEdBQW9CLEtBQUtDLFFBQUwsQ0FBYyxLQUFLRixZQUFuQixDQUFwQjs7QUFFQSxTQUFLRyxPQUFMLEdBQWUsSUFBZjtBQUNBLFNBQUtDLFFBQUwsR0FBZ0IsSUFBaEI7QUFDQSxTQUFLQyxPQUFMLEdBQWUsSUFBZjtBQUNBLFNBQUtDLFVBQUwsR0FBa0Isb0JBQVUsRUFBRWIsSUFBSSxDQUFOLEVBQVNDLE1BQU1MLGtCQUFmLEVBQW1Da0IsS0FBSyxlQUF4QyxFQUF5REMsTUFBTSxJQUEvRCxFQUFWLENBQWxCO0FBQ0EsU0FBS0MsU0FBTCxHQUFpQixvQkFBVSxFQUFFaEIsSUFBSSxDQUFDLENBQVAsRUFBVUMsTUFBTUosZUFBaEIsRUFBaUNpQixLQUFLLGNBQXRDLEVBQXNEQyxNQUFNLElBQTVELEVBQVYsQ0FBakI7QUFDRDs7Ozs2QkFFUWYsRSxFQUFJO0FBQ1gsYUFBTyxLQUFLSSxNQUFMLENBQVlhLElBQVosQ0FBaUI7QUFBQSxlQUFTWCxNQUFNTixFQUFOLElBQVlBLEVBQXJCO0FBQUEsT0FBakIsQ0FBUDtBQUNEOzs7NEJBRU87QUFBQTs7QUFDTixXQUFLUSxZQUFMLEdBQW9CLEtBQUtDLFFBQUwsQ0FBYyxLQUFLRixZQUFuQixDQUFwQjtBQUNBLHVCQUFPaEIsT0FBUCxDQUFlLFdBQWYsRUFBNEIsS0FBS2lCLFlBQWpDO0FBQ0EsVUFBSVUsWUFBWUMsUUFBUUMsT0FBUixFQUFoQixDQUhNLENBRzZCO0FBQ25DLFdBQUssSUFBSUMsSUFBSSxDQUFiLEVBQWdCQSxJQUFJLEtBQUtsQixLQUF6QixFQUFnQ2tCLEdBQWhDLEVBQXFDO0FBQ25DSCxvQkFBWUEsVUFDVkksSUFEVSxDQUNMLFlBQU07QUFBRSxpQkFBTyxNQUFLQyxTQUFMLEVBQVA7QUFBeUIsU0FENUIsRUFFVkQsSUFGVSxDQUVMLFlBQU07QUFBRSxpQkFBTyxNQUFLRSxXQUFMLEVBQVA7QUFBMkIsU0FGOUIsRUFHVkYsSUFIVSxDQUdMLGlCQUFTO0FBQUUsZ0JBQUtHLGNBQUwsQ0FBb0JuQixLQUFwQjtBQUE0QixTQUhsQyxDQUFaO0FBSUQ7QUFDRFksZ0JBQVVRLEtBQVYsQ0FBZ0I7QUFBQSxlQUFTLE1BQUtELGNBQUwsQ0FBb0JuQixLQUFwQixDQUFUO0FBQUEsT0FBaEI7QUFDQSxhQUFPWSxTQUFQO0FBQ0Q7OztnQ0FFVztBQUFBOztBQUNWLGFBQU8sSUFBSUMsT0FBSixDQUFZLFVBQUNDLE9BQUQsRUFBVU8sTUFBVixFQUFxQjtBQUN0QyxlQUFLZixPQUFMLEdBQWUsaUJBQU81QixTQUFQLENBQWlCLFlBQWpCLEVBQStCLFlBQU07QUFBRTJDLGlCQUFPLE9BQUtYLFNBQVo7QUFBeUIsU0FBaEUsQ0FBZjtBQUNBWSxtQkFBVyxZQUFNO0FBQ2YsaUJBQUtDLFNBQUw7QUFDQVQ7QUFDRCxTQUhELEVBR0csT0FBS2xCLFNBSFI7QUFJRCxPQU5NLENBQVA7QUFPRDs7O2tDQUVhO0FBQUE7O0FBQ1osVUFBTTRCLFFBQVEsS0FBS3RCLFlBQUwsQ0FBa0JzQixLQUFoQztBQUNBLFVBQU1DLGlCQUFpQkMsS0FBS0MsR0FBTCxFQUF2QjtBQUNBLGFBQU8sSUFBSWQsT0FBSixDQUFZLFVBQUNDLE9BQUQsRUFBVU8sTUFBVixFQUFxQjtBQUN0QztBQUNBLHlCQUFPcEMsT0FBUCxDQUFlLE9BQWYsRUFBd0J1QyxLQUF4Qjs7QUFFQTtBQUNBO0FBQ0EsZUFBS25CLFFBQUwsR0FBZ0IsaUJBQU8zQixTQUFQLENBQWlCLFlBQWpCLEVBQStCLGdCQUFRO0FBQ3JELGNBQU1rRCxZQUFZRixLQUFLQyxHQUFMLEtBQWFGLGNBQS9CO0FBQ0EsY0FBTUksY0FBYyxPQUFLM0IsWUFBTCxDQUFrQjRCLFdBQWxCLENBQThCckMsSUFBOUIsRUFBb0NtQyxTQUFwQyxDQUFwQjtBQUNBLGNBQU1HLFlBQVksT0FBSzVCLFFBQUwsQ0FBYzBCLFdBQWQsQ0FBbEI7QUFDQSxjQUFLRSxTQUFMLEVBQWlCO0FBQ2ZBLHNCQUFVdEIsSUFBVixHQUFpQlksT0FBT1UsU0FBUCxDQUFqQixHQUFxQ2pCLFFBQVFpQixTQUFSLENBQXJDO0FBQ0Q7QUFDRixTQVBlLENBQWhCOztBQVNBLGVBQUt6QixPQUFMLEdBQWUsaUJBQU81QixTQUFQLENBQWlCLFlBQWpCLEVBQStCLFlBQU07QUFDbEQyQyxpQkFBTyxPQUFLWCxTQUFaO0FBQ0QsU0FGYyxDQUFmOztBQUlBO0FBQ0EsWUFBTXNCLGVBQWUsT0FBSzlCLFlBQUwsQ0FBa0IrQixlQUFsQixFQUFyQjtBQUNBLGVBQUs3QixPQUFMLEdBQWVrQixXQUFXLFlBQU07QUFDOUIsY0FBTU8sY0FBYyxPQUFLM0IsWUFBTCxDQUFrQmdDLGlCQUFsQixHQUFzQ0gsU0FBMUQ7QUFDQSxjQUFNQSxZQUFZLE9BQUs1QixRQUFMLENBQWMwQixXQUFkLENBQWxCO0FBQ0FFLG9CQUFVdEIsSUFBVixHQUFpQlksT0FBT1UsU0FBUCxDQUFqQixHQUFxQ2pCLFFBQVFpQixTQUFSLENBQXJDO0FBQ0QsU0FKYyxFQUlaQyxZQUpZLENBQWY7QUFLRCxPQTFCTSxDQUFQO0FBMkJEOzs7MkJBRU07QUFDTCx1QkFBTy9DLE9BQVAsQ0FBZSxZQUFmO0FBQ0Q7OzttQ0FFY2UsSyxFQUFPO0FBQ3BCLFdBQUtFLFlBQUwsR0FBb0JGLEtBQXBCO0FBQ0FtQyxtQkFBYSxLQUFLL0IsT0FBbEI7QUFDQSxXQUFLbUIsU0FBTDtBQUNBLHVCQUFPdEMsT0FBUCxDQUFlLFdBQWYsRUFBNEJlLEtBQTVCO0FBQ0Q7OztnQ0FFVztBQUNWLFVBQUksS0FBS0ssUUFBVCxFQUFtQjtBQUNqQixhQUFLQSxRQUFMLENBQWNyQixNQUFkO0FBQ0Q7QUFDRCxVQUFJLEtBQUtzQixPQUFULEVBQWtCO0FBQ2hCLGFBQUtBLE9BQUwsQ0FBYXRCLE1BQWI7QUFDRDtBQUNGOzs7Ozs7a0JBSVlRLEs7Ozs7Ozs7Ozs7Ozs7QUMxR2Y7Ozs7QUFDQTs7Ozs7O0FBRUEsSUFBTTRDLFdBQVUsRUFBaEI7O0FBRUE7QUFDQSxJQUFNQyxhQUFhN0UsU0FBUzhFLGFBQVQsQ0FBdUIsYUFBdkIsQ0FBbkI7QUFDQUYsU0FBUUcsSUFBUixHQUFlLFVBQVNDLEtBQVQsRUFBZ0JDLFFBQWhCLEVBQTBCO0FBQ3ZDSixhQUFXOUQsV0FBWCxHQUF5QmlFLE1BQU03QyxJQUEvQjtBQUNBLGtCQUFNK0MsR0FBTixDQUFVRixNQUFNakMsVUFBaEI7QUFDQSxrQkFBTWdDLElBQU4sQ0FBV0UsU0FBU0UsS0FBcEI7QUFDQSxTQUFPLElBQVA7QUFDRCxDQUxEOztBQU9BO0FBQ0EsSUFBTUMsV0FBV3BGLFNBQVM4RSxhQUFULENBQXVCLFVBQXZCLENBQWpCO0FBQ0FGLFNBQVFTLFdBQVIsR0FBc0IsWUFBVztBQUMvQkMsb0JBQWtCLE1BQWxCO0FBQ0EsU0FBTyxJQUFQO0FBQ0QsQ0FIRDtBQUlBVixTQUFRVyxXQUFSLEdBQXNCLFlBQVc7QUFDL0JELG9CQUFrQixNQUFsQjtBQUNBLFNBQU8sSUFBUDtBQUNELENBSEQ7QUFJQSxTQUFTQSxpQkFBVCxDQUEyQkUsT0FBM0IsRUFBb0M7QUFDbENKLFdBQVNLLEtBQVQsQ0FBZUQsT0FBZixHQUF5QkEsT0FBekI7QUFDRDs7QUFFRDtBQUNBWixTQUFRYyxhQUFSLEdBQXdCLFlBQXFCO0FBQUEsb0NBQVRDLE9BQVM7QUFBVEEsV0FBUztBQUFBOztBQUMzQ0Msa0JBQWdCRCxPQUFoQixFQUF5QixLQUF6QjtBQUNBLFNBQU8sSUFBUDtBQUNELENBSEQ7QUFJQWYsU0FBUWlCLGNBQVIsR0FBeUIsWUFBcUI7QUFBQSxxQ0FBVEYsT0FBUztBQUFUQSxXQUFTO0FBQUE7O0FBQzVDQyxrQkFBZ0JELE9BQWhCLEVBQXlCLElBQXpCO0FBQ0EsU0FBTyxJQUFQO0FBQ0QsQ0FIRDtBQUlBLFNBQVNDLGVBQVQsQ0FBeUJELE9BQXpCLEVBQWtDRyxLQUFsQyxFQUF5QztBQUN2Q0gsVUFBUXJGLE9BQVIsQ0FBZ0I7QUFBQSxXQUFVeUYsT0FBT0MsUUFBUCxHQUFrQkYsS0FBNUI7QUFBQSxHQUFoQjtBQUNEOztBQUVEO0FBQ0FsQixTQUFRcUIsWUFBUixHQUF1QjtBQUFBLFNBQ3JCLGdCQUFNQSxZQUFOLEVBRHFCO0FBQUEsQ0FBdkI7O0FBR0FyQixTQUFRc0IsUUFBUixHQUFtQjtBQUFBLFNBQ2pCLGdCQUFNaEIsR0FBTixDQUFVaUIsU0FBVixDQURpQjtBQUFBLENBQW5COztBQUdBdkIsU0FBUXdCLFNBQVIsR0FBb0I7QUFBQSxTQUNsQixnQkFBTUEsU0FBTixDQUFnQkMsU0FBaEIsQ0FEa0I7QUFBQSxDQUFwQjs7QUFHQXpCLFNBQVEwQixTQUFSLEdBQW9CO0FBQUEsU0FDbEIsZ0JBQU1BLFNBQU4sRUFEa0I7QUFBQSxDQUFwQjs7a0JBR2UxQixROzs7Ozs7Ozs7Ozs7QUN0RGYsU0FBUzJCLElBQVQsR0FBdUM7QUFBQSxNQUF6QkMsSUFBeUIsdUVBQWxCLEVBQWtCO0FBQUEsTUFBZEMsT0FBYyx1RUFBSixFQUFJOztBQUNyQyxNQUFNQyxNQUFNLElBQUlDLGNBQUosRUFBWjtBQUNBRCxNQUFJRSxJQUFKLENBQVNILFFBQVFJLE1BQVIsSUFBa0IsS0FBM0IsRUFBa0NMLElBQWxDLEVBQXdDLElBQXhDO0FBQ0EsTUFBSUMsUUFBUUssT0FBWixFQUFxQjtBQUFFQyxrQkFBY0wsR0FBZCxFQUFtQkQsUUFBUUssT0FBM0I7QUFBc0M7QUFDN0RKLE1BQUlNLElBQUosQ0FBU1AsUUFBUXhFLElBQWpCOztBQUVBLFNBQU8sSUFBSW9CLE9BQUosQ0FBWSxVQUFDQyxPQUFELEVBQVVPLE1BQVYsRUFBcUI7QUFDdEM2QyxRQUFJTyxrQkFBSixHQUF5QixZQUFXO0FBQ2xDLFVBQUdQLElBQUlRLFVBQUosSUFBa0IsQ0FBckIsRUFBd0I7QUFDdEIsWUFBR1IsSUFBSVMsTUFBSixJQUFjLEdBQWpCLEVBQXNCO0FBQ3BCN0Qsa0JBQVFvRCxJQUFJVSxZQUFaO0FBQ0QsU0FGRCxNQUVPO0FBQ0x2RCxpQkFBTzZDLElBQUlXLFVBQVg7QUFDRDtBQUNGO0FBQ0YsS0FSRDtBQVNELEdBVk0sQ0FBUDtBQVdEOztBQUVELFNBQVNOLGFBQVQsQ0FBdUJMLEdBQXZCLEVBQTRCSSxPQUE1QixFQUFxQztBQUNuQyxPQUFLLElBQUlRLE1BQVQsSUFBbUJSLE9BQW5CLEVBQTRCO0FBQzFCSixRQUFJYSxnQkFBSixDQUFxQkQsTUFBckIsRUFBNkJSLFFBQVFBLE9BQVIsQ0FBN0I7QUFDRDtBQUNGOztrQkFFY1AsSTs7Ozs7Ozs7QUN6QmYseUM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztJQ0FNaUIsTTtBQUNKLGtCQUFZdkYsSUFBWixFQUFrQjtBQUFBOztBQUNoQixTQUFLd0YsT0FBTCxHQUFleEYsS0FBS3dGLE9BQXBCO0FBQ0EsU0FBS0MsT0FBTCxHQUFlekYsS0FBS3lGLE9BQXBCO0FBQ0EsU0FBS25ELFNBQUwsR0FBaUJ0QyxLQUFLc0MsU0FBdEI7QUFDQSxRQUFJdEMsS0FBSzBGLFFBQVQsRUFBbUI7QUFDakIsV0FBS0EsUUFBTCxHQUFnQixJQUFoQjtBQUNBLFdBQUt4QyxLQUFMLEdBQWEsRUFBYjtBQUNELEtBSEQsTUFHTztBQUNMLFdBQUt3QyxRQUFMLEdBQWdCLEtBQWhCO0FBQ0EsV0FBS3hDLEtBQUwsR0FBYSxLQUFLeUMsU0FBTCxDQUFlM0YsS0FBS2tELEtBQXBCLENBQWI7QUFDRDtBQUVGOztBQUVEOzs7Ozs7Ozs7K0JBS1dsRCxJLEVBQU00RixJLEVBQU07QUFDckIsYUFBTyxLQUFLQyxTQUFMLENBQWVELElBQWYsS0FBd0IsS0FBS0UsU0FBTCxDQUFlOUYsSUFBZixDQUEvQjtBQUNEOzs7Z0NBRW9CO0FBQUE7O0FBQUEsVUFBWEEsSUFBVyx1RUFBSixFQUFJOztBQUNuQixhQUFPLEtBQUtrRCxLQUFMLENBQVc2QyxLQUFYLENBQWlCLGdCQUFRO0FBQzlCO0FBQ0EsWUFBTUMsWUFBWWhHLEtBQUtrQixJQUFMLENBQVU7QUFBQSxpQkFBTytFLElBQUloRyxFQUFKLElBQVVpRyxLQUFLakcsRUFBdEI7QUFBQSxTQUFWLENBQWxCO0FBQ0EsWUFBSSxDQUFDK0YsU0FBTCxFQUFnQjtBQUFFLGlCQUFPLEtBQVA7QUFBZTs7QUFFakMsWUFBSUUsS0FBS3RJLElBQUwsS0FBYyxRQUFsQixFQUE0QjtBQUFFLGlCQUFPb0ksVUFBVW5DLEtBQVYsS0FBb0JxQyxLQUFLQyxTQUFoQztBQUE0Qzs7QUFFMUUsWUFBSUQsS0FBS3RJLElBQUwsS0FBYyxPQUFsQixFQUEyQjtBQUFFLGlCQUFPLE1BQUt3SSxhQUFMLENBQW1CSixVQUFVbkMsS0FBN0IsRUFBb0MsQ0FBRXFDLEtBQUtHLFFBQVAsRUFBaUJILEtBQUtJLFFBQXRCLENBQXBDLENBQVA7QUFBOEU7O0FBRTNHLGVBQU8sS0FBUDtBQUNELE9BVk0sQ0FBUDtBQVdEOzs7a0NBRWF6QyxLLEVBQU8wQyxPLEVBQVM7QUFDNUIsVUFBSSxPQUFPMUMsS0FBUCxLQUFpQixRQUFyQixFQUErQixNQUFNLElBQUkyQyxTQUFKLENBQWMseUJBQWQsQ0FBTjtBQUMvQixhQUFRM0MsU0FBUzBDLFFBQVEsQ0FBUixDQUFWLElBQTBCMUMsU0FBUzBDLFFBQVEsQ0FBUixDQUExQztBQUNEOzs7OEJBRVNYLEksRUFBTTtBQUNkLFVBQUksT0FBT0EsSUFBUCxLQUFnQixRQUFwQixFQUE4QixNQUFNLElBQUlZLFNBQUosQ0FBYyw2QkFBZCxDQUFOO0FBQzlCLGFBQVFaLFFBQVEsS0FBS0osT0FBZCxJQUEyQkksUUFBUSxLQUFLSCxPQUEvQztBQUNEOzs7OEJBRVN2QyxLLEVBQU87QUFDZixhQUFPQSxNQUFNNUMsR0FBTixDQUFVLGdCQUFRO0FBQ3ZCLGVBQU87QUFDTEwsY0FBSWlHLEtBQUtqRyxFQURKO0FBRUxyQyxnQkFBTXNJLEtBQUt0SSxJQUZOO0FBR0x5SSxvQkFBVUgsS0FBS08sVUFBTCxDQUFnQkosUUFIckI7QUFJTEMsb0JBQVVKLEtBQUtPLFVBQUwsQ0FBZ0JILFFBSnJCO0FBS0xILHFCQUFXRCxLQUFLTyxVQUFMLENBQWdCTjtBQUx0QixTQUFQO0FBT0QsT0FSTSxDQUFQO0FBU0Q7Ozs7OztrQkFHWVosTTs7Ozs7Ozs7Ozs7Ozs7O0lDN0RUbUIsSyxHQUNKLGVBQVkxRyxJQUFaLEVBQWtCO0FBQUE7O0FBQ2hCLE9BQUtDLEVBQUwsR0FBVUQsS0FBS0MsRUFBZjtBQUNBLE9BQUtDLElBQUwsR0FBWUYsS0FBS0UsSUFBakI7QUFDQSxPQUFLeUcsV0FBTCxHQUFtQjNHLEtBQUsyRyxXQUF4QjtBQUNELEM7O2tCQUdZRCxLOzs7Ozs7Ozs7Ozs7Ozs7QUNSZjs7OztBQUNBOzs7Ozs7Ozs7O0lBRU1FLEs7QUFDSixpQkFBWTVHLElBQVosRUFBa0I7QUFBQTs7QUFDaEIsU0FBS0MsRUFBTCxHQUFVRCxLQUFLQyxFQUFmO0FBQ0EsU0FBS0MsSUFBTCxHQUFZRixLQUFLRSxJQUFqQjtBQUNBLFNBQUthLEdBQUwsR0FBV2YsS0FBS2UsR0FBaEI7QUFDQSxTQUFLbEQsTUFBTCxHQUFjbUMsS0FBS25DLE1BQW5COztBQUVBLFFBQUdtQyxLQUFLZ0IsSUFBUixFQUFjO0FBQ1osV0FBS0EsSUFBTCxHQUFZLElBQVo7QUFDQSxXQUFLZSxLQUFMLEdBQWEsSUFBYjtBQUNBLFdBQUs4RSxPQUFMLEdBQWUsSUFBZjtBQUNELEtBSkQsTUFJTztBQUNMLFdBQUs5RSxLQUFMLEdBQWEsb0JBQVUvQixLQUFLK0IsS0FBZixDQUFiO0FBQ0EsV0FBSzhFLE9BQUwsR0FBZTdHLEtBQUs2RyxPQUFMLENBQWF2RyxHQUFiLENBQWlCO0FBQUEsZUFBVSxxQkFBV3dHLE1BQVgsQ0FBVjtBQUFBLE9BQWpCLENBQWY7QUFDQSxXQUFLOUYsSUFBTCxHQUFZLEtBQVo7QUFDRDtBQUNGOzs7O3NDQUVpQjtBQUNoQixVQUFNK0YsUUFBUSxLQUFLQyxpQkFBTCxFQUFkO0FBQ0EsYUFBT0MsS0FBS0MsR0FBTCxnQ0FBWUgsS0FBWixFQUFQO0FBQ0Q7Ozt3Q0FFbUI7QUFDbEIsYUFBTyxLQUFLRixPQUFMLENBQWEzRixJQUFiLENBQWtCO0FBQUEsZUFBVTRGLE9BQU9wQixRQUFQLEtBQW9CLElBQTlCO0FBQUEsT0FBbEIsQ0FBUDtBQUNEOzs7d0NBRW1CO0FBQ2xCLGFBQU8sS0FBS21CLE9BQUwsQ0FBYXZHLEdBQWIsQ0FBaUI7QUFBQSxlQUFVd0csT0FBT3JCLE9BQVAsSUFBa0IsQ0FBNUI7QUFBQSxPQUFqQixDQUFQO0FBQ0Q7OztnQ0FFV3pGLEksRUFBTTRGLEksRUFBTTtBQUN0QixVQUFNdUIsZ0JBQWdCLEtBQUtOLE9BQUwsQ0FBYU8sTUFBYixDQUFvQjtBQUFBLGVBQVVOLE9BQU9PLFVBQVAsQ0FBa0JySCxJQUFsQixFQUF3QjRGLElBQXhCLENBQVY7QUFBQSxPQUFwQixDQUF0QjtBQUNBLFVBQUl1QixjQUFjekgsTUFBZCxHQUF1QixDQUEzQixFQUE4QjtBQUM1QixlQUFPeUgsY0FBYyxDQUFkLEVBQWlCN0UsU0FBeEI7QUFDRDtBQUNELGFBQU8sSUFBUDtBQUNEOzs7Ozs7a0JBR1lzRSxLOzs7Ozs7Ozs7Ozs7O0FDM0NmOzs7O0FBQ0E7Ozs7OztBQUVBLElBQU1VLFFBQVF2SixTQUFTOEUsYUFBVCxDQUF1QixtQkFBdkIsQ0FBZDtBQUNBLElBQU0wRSxPQUFPeEosU0FBUzhFLGFBQVQsQ0FBdUIsa0JBQXZCLENBQWI7QUFDQSxJQUFNMkUsVUFBVXpKLFNBQVM4RSxhQUFULENBQXVCLHNCQUF2QixDQUFoQjs7QUFFQSxJQUFNNEUsU0FBUzFKLFNBQVM4RSxhQUFULENBQXVCLGNBQXZCLENBQWY7QUFDQSxJQUFNNkUsZUFBZUQsT0FBTzVFLGFBQVAsQ0FBcUIsd0JBQXJCLENBQXJCO0FBQ0EsSUFBTThFLGFBQWFGLE9BQU81RSxhQUFQLENBQXFCLG1CQUFyQixDQUFuQjs7QUFFQSxJQUFNK0Usa0JBQWtCN0osU0FBUzhFLGFBQVQsQ0FBdUIsY0FBdkIsQ0FBeEI7QUFDQStFLGdCQUFnQkMsV0FBaEIsQ0FBNEIsZ0JBQU0vSixJQUFsQzs7QUFFQSxTQUFTbUYsR0FBVCxPQUFvQztBQUFBLE1BQXJCL0MsSUFBcUIsUUFBckJBLElBQXFCO0FBQUEsTUFBZmEsR0FBZSxRQUFmQSxHQUFlO0FBQUEsTUFBVmxELE1BQVUsUUFBVkEsTUFBVTs7QUFDbEN5SixRQUFNeEksV0FBTixHQUFvQm9CLElBQXBCO0FBQ0FxSCxPQUFLM0ksWUFBTCxDQUFrQixLQUFsQixFQUF5Qm1DLEdBQXpCO0FBQ0ErRyxnQkFBY2pLLE1BQWQ7QUFDRDs7QUFFRCxTQUFTaUssYUFBVCxHQUFvQztBQUFBLE1BQWJqSyxNQUFhLHVFQUFKLEVBQUk7O0FBQ2xDLE1BQU1rSyxPQUFPaEssU0FBU2lLLHNCQUFULEVBQWI7QUFDQW5LLFNBQU9RLE9BQVAsQ0FBZTtBQUFBLFdBQVMwSixLQUFLRixXQUFMLENBQWlCSSxtQkFBbUJDLE1BQU1oSSxJQUF6QixFQUErQmdJLE1BQU1yRSxLQUFyQyxDQUFqQixDQUFUO0FBQUEsR0FBZjs7QUFFQTJELFVBQVFXLFNBQVIsR0FBb0IsRUFBcEI7QUFDQVgsVUFBUUssV0FBUixDQUFvQkUsSUFBcEI7QUFDRDs7QUFFRCxTQUFTRSxrQkFBVCxDQUE0QkcsR0FBNUIsRUFBaUN2RSxLQUFqQyxFQUF3QztBQUN0QyxNQUFNd0UsTUFBTSwyQkFBWSxLQUFaLEVBQW1CLEVBQUVqSyxXQUFXLENBQUMsV0FBRCxDQUFiLEVBQW5CLENBQVo7O0FBRUEsTUFBTWtLLFVBQVUsMkJBQVksTUFBWixFQUFvQixFQUFFeEosYUFBYXNKLEdBQWYsRUFBcEIsQ0FBaEI7QUFDQUMsTUFBSVIsV0FBSixDQUFnQlMsT0FBaEI7O0FBRUEsTUFBTUMsWUFBWSwyQkFBWSxNQUFaLEVBQW9CLEVBQUV6SixhQUFhK0UsS0FBZixFQUFwQixDQUFsQjtBQUNBd0UsTUFBSVIsV0FBSixDQUFnQlUsU0FBaEI7O0FBRUEsU0FBT0YsR0FBUDtBQUNEOztBQUdEO0FBQ0EsU0FBU2xFLFNBQVQsQ0FBbUJwQyxLQUFuQixFQUEwQjtBQUN4QjJGLGVBQWE1SSxXQUFiLEdBQTJCaUQsTUFBTTdCLElBQWpDO0FBQ0F5SCxhQUFXN0ksV0FBWCxHQUF5QmlELE1BQU00RSxXQUEvQjtBQUNBYyxTQUFPckosU0FBUCxDQUFpQm1CLE1BQWpCLENBQXdCLFdBQXhCLEVBQXFDLFdBQXJDO0FBQ0FpSjtBQUNEO0FBQ0QsU0FBU25FLFNBQVQsR0FBcUI7QUFDbkJvRCxTQUFPckosU0FBUCxDQUFpQkUsR0FBakIsQ0FBcUIsV0FBckIsRUFBa0MsV0FBbEM7QUFDQW1LO0FBQ0Q7O0FBRUQsU0FBU0QsU0FBVCxHQUFxQjtBQUNuQlosa0JBQWdCeEosU0FBaEIsQ0FBMEJtQixNQUExQixDQUFpQyxXQUFqQztBQUNBLGtCQUFNbUosS0FBTjtBQUNEO0FBQ0QsU0FBU0QsU0FBVCxHQUFxQjtBQUNuQmIsa0JBQWdCeEosU0FBaEIsQ0FBMEJFLEdBQTFCLENBQThCLFdBQTlCO0FBQ0Esa0JBQU1xSyxJQUFOO0FBQ0Q7O2tCQUVjO0FBQ2IxRixVQURhO0FBRWJrQixzQkFGYTtBQUdiRTtBQUhhLEM7Ozs7Ozs7Ozs7Ozs7QUM5RGY7Ozs7OztBQUVBLElBQU11RSxZQUFZO0FBQ2hCQyxTQUFPLE9BRFM7QUFFaEJDLFVBQVE7QUFGUSxDQUFsQjtBQUlBLElBQU1DLFNBQVNoTCxTQUFTOEUsYUFBVCxDQUF1QixhQUF2QixDQUFmOztBQUVBLFNBQVNDLElBQVQsQ0FBY0ksS0FBZCxFQUFxQjtBQUNuQixNQUFNOEYsV0FBV2pMLFNBQVNpSyxzQkFBVCxFQUFqQjs7QUFFQTlFLFFBQU03RSxPQUFOLENBQWMsZ0JBQVE7QUFDcEI7QUFDQSxRQUFNZ0ssTUFBTSwyQkFBWSxLQUFaLEVBQW1CLEVBQUVqSyxXQUFXLENBQUMsTUFBRCxDQUFiLEVBQW5CLENBQVo7O0FBRUEsUUFBTTZLLFFBQVEsMkJBQVksT0FBWixFQUFxQjtBQUNqQzdLLGlCQUFXLENBQUMsV0FBRCxDQURzQjtBQUVqQ0ksYUFBTyxFQUFFLE9BQU8wSCxLQUFLaEcsSUFBZCxFQUYwQjtBQUdqQ3BCLG1CQUFhb0gsS0FBS2hHO0FBSGUsS0FBckIsQ0FBZDtBQUtBbUksUUFBSVIsV0FBSixDQUFnQm9CLEtBQWhCOztBQUVBLFFBQU1DLFdBQVdDLGVBQWVqRCxJQUFmLENBQWpCO0FBQ0FtQyxRQUFJUixXQUFKLENBQWdCcUIsUUFBaEI7O0FBRUFGLGFBQVNuQixXQUFULENBQXFCUSxHQUFyQjtBQUNELEdBZkQ7O0FBaUJBVSxTQUFPWixTQUFQLEdBQW1CLEVBQW5CO0FBQ0FZLFNBQU9sQixXQUFQLENBQW1CbUIsUUFBbkI7QUFDRDs7QUFFRCxTQUFTRyxjQUFULENBQXdCakQsSUFBeEIsRUFBOEI7QUFDNUIsVUFBT0EsS0FBS3RJLElBQVo7QUFDRSxTQUFLZ0wsVUFBVUMsS0FBZjtBQUF3QixhQUFPTyxnQkFBZ0JsRCxJQUFoQixDQUFQO0FBQ3hCLFNBQUswQyxVQUFVRSxNQUFmO0FBQXdCLGFBQU9PLGlCQUFpQm5ELElBQWpCLENBQVA7QUFDeEI7QUFBd0IsYUFBTyxvQkFBUDtBQUgxQjtBQUtEOztBQUVELFNBQVNrRCxlQUFULENBQXlCbEQsSUFBekIsRUFBK0I7QUFDN0IsTUFBTW9ELFdBQVcsMkJBQVksS0FBWixFQUFtQixFQUFFbEwsV0FBVyxDQUFDLE9BQUQsQ0FBYixFQUFuQixDQUFqQjs7QUFFQSxNQUFNbUwsVUFBVSwyQkFBWSxNQUFaLEVBQW9CLEVBQUV6SyxhQUFhb0gsS0FBS3NELEdBQXBCLEVBQXBCLENBQWhCO0FBQ0FGLFdBQVN6QixXQUFULENBQXFCMEIsT0FBckI7O0FBRUEsTUFBTUUsUUFBUSwyQkFBWSxPQUFaLEVBQXFCO0FBQ2pDakwsV0FBTztBQUNMLGlCQUFXMEgsS0FBS2pHLEVBRFg7QUFFTCxtQkFBYSxPQUZSO0FBR0wsY0FBUWlHLEtBQUtoRyxJQUhSO0FBSUwsY0FBUSxPQUpIO0FBS0wsYUFBT2dHLEtBQUtzRCxHQUxQO0FBTUwsYUFBT3RELEtBQUtnQjtBQU5QO0FBRDBCLEdBQXJCLENBQWQ7QUFVQW9DLFdBQVN6QixXQUFULENBQXFCNEIsS0FBckI7O0FBRUEsTUFBTUMsVUFBVSwyQkFBWSxNQUFaLEVBQW9CLEVBQUU1SyxhQUFhb0gsS0FBS2dCLEdBQXBCLEVBQXBCLENBQWhCO0FBQ0FvQyxXQUFTekIsV0FBVCxDQUFxQjZCLE9BQXJCOztBQUVBLE1BQU1DLGFBQWEsMkJBQVksS0FBWixFQUFtQixFQUFFdkwsV0FBVyxDQUFDLHFCQUFELENBQWIsRUFBbkIsQ0FBbkI7QUFDQSxNQUFNd0wsY0FBYywyQkFBWSxNQUFaLEVBQW9CLEVBQUU5SyxhQUFhMkssTUFBTTVGLEtBQXJCLEVBQXBCLENBQXBCO0FBQ0E4RixhQUFXOUIsV0FBWCxDQUF1QitCLFdBQXZCOztBQUVBSCxRQUFNSSxnQkFBTixDQUF1QixPQUF2QixFQUFnQyxVQUFDQyxHQUFELEVBQVM7QUFDdkNGLGdCQUFZOUssV0FBWixHQUEwQmdMLElBQUlDLE1BQUosQ0FBV2xHLEtBQXJDO0FBQ0QsR0FGRDs7QUFJQSxNQUFNbUYsV0FBV2pMLFNBQVNpSyxzQkFBVCxFQUFqQjtBQUNBZ0IsV0FBU25CLFdBQVQsQ0FBcUJ5QixRQUFyQjtBQUNBTixXQUFTbkIsV0FBVCxDQUFxQjhCLFVBQXJCOztBQUVBLFNBQU9YLFFBQVA7QUFDRDs7QUFFRCxTQUFTSyxnQkFBVCxDQUEwQm5ELElBQTFCLEVBQWdDO0FBQzlCLE1BQU0rQyxRQUFRLDJCQUFZLE9BQVosRUFBcUIsRUFBRTdLLFdBQVcsQ0FBQyxRQUFELENBQWIsRUFBckIsQ0FBZDs7QUFFQSxNQUFNcUwsUUFBUSwyQkFBWSxPQUFaLEVBQXFCO0FBQ2pDakwsV0FBTztBQUNMLGlCQUFXMEgsS0FBS2pHLEVBRFg7QUFFTCxtQkFBYSxRQUZSO0FBR0wsY0FBUTtBQUhIO0FBRDBCLEdBQXJCLENBQWQ7QUFPQWdKLFFBQU1wQixXQUFOLENBQWtCNEIsS0FBbEI7O0FBRUEsTUFBTXBCLE1BQU0sMkJBQVksS0FBWixFQUFtQixFQUFFakssV0FBVyxDQUFDLFFBQUQsQ0FBYixFQUFuQixDQUFaO0FBQ0E2SyxRQUFNcEIsV0FBTixDQUFrQlEsR0FBbEI7O0FBRUEsU0FBT1ksS0FBUDtBQUNEOztBQUVELFNBQVNqRixZQUFULEdBQXdCO0FBQ3RCLE1BQU1nRyxZQUFZLEVBQWxCO0FBQ0EsTUFBTUMsU0FBU2xCLE9BQU9tQixnQkFBUCxDQUF3QixnQkFBeEIsQ0FBZjtBQUNBRCxTQUFPNUwsT0FBUCxDQUFlLGlCQUFTO0FBQUEseUJBQ0RvTCxNQUFNVSxPQURMO0FBQUEsUUFDZGxLLEVBRGMsa0JBQ2RBLEVBRGM7QUFBQSxRQUNWckMsSUFEVSxrQkFDVkEsSUFEVTs7QUFFdEIsUUFBSWlHLGNBQUo7QUFDQSxZQUFPakcsSUFBUDtBQUNFLFdBQUtnTCxVQUFVQyxLQUFmO0FBQXNCaEYsZ0JBQVF1RyxTQUFTWCxNQUFNNUYsS0FBZixDQUFSLENBQStCO0FBQ3JELFdBQUsrRSxVQUFVRSxNQUFmO0FBQXVCakYsZ0JBQVE0RixNQUFNWSxPQUFkLENBQXVCO0FBQzlDO0FBQVMsY0FBTSxJQUFJQyxLQUFKLGtKQUEyQ3JLLEVBQTNDLENBQU47QUFIWDtBQUtBK0osY0FBVTFLLElBQVYsQ0FBZSxFQUFFVyxNQUFGLEVBQU00RCxZQUFOLEVBQWY7QUFDRCxHQVREO0FBVUEsU0FBT21HLFNBQVA7QUFDRDs7a0JBRWM7QUFDYmxILFlBRGE7QUFFYmtCO0FBRmEsQzs7Ozs7Ozs7Ozs7Ozs7QUM5R2Y7Ozs7OztBQUVBLFNBQVN1RyxXQUFULENBQXFCQyxFQUFyQixFQUF5QjtBQUN2QixNQUFNQyxVQUFVeEQsS0FBS3lELEtBQUwsQ0FBV0YsS0FBSyxJQUFoQixDQUFoQjtBQUNBLE1BQU1HLE9BQU8xRCxLQUFLMkQsS0FBTCxDQUFXSCxVQUFVLEVBQXJCLENBQWI7QUFDQSxNQUFNSSxjQUFjSixVQUFXRSxPQUFPLEVBQXRDOztBQUVBLFNBQVVBLElBQVYsVUFBa0JFLGVBQWUsRUFBZixHQUFvQixFQUFwQixHQUF5QixHQUEzQyxJQUFpREEsV0FBakQ7QUFDRDs7QUFFRCxJQUFNQyxRQUFRO0FBQ1pDLGFBQVcsSUFEQztBQUVaQyxZQUFVLElBRkU7QUFHWmxOLFFBQU0sMkJBQVksTUFBWixFQUFvQixFQUFFTSxXQUFXLENBQUMsT0FBRCxDQUFiLEVBQXdCVSxhQUFhLE1BQXJDLEVBQXBCLENBSE07QUFJWjRKLFNBQU8saUJBQVc7QUFBQTs7QUFDaEIsU0FBS3FDLFNBQUwsR0FBaUI5SSxLQUFLQyxHQUFMLEVBQWpCO0FBQ0EsU0FBSzhJLFFBQUwsR0FBZ0JDLFlBQVksWUFBTTtBQUNoQyxVQUFNQyxVQUFVakosS0FBS0MsR0FBTCxLQUFhLE1BQUs2SSxTQUFsQztBQUNBLFlBQUtqTixJQUFMLENBQVVnQixXQUFWLEdBQXdCeUwsWUFBWVcsT0FBWixDQUF4QjtBQUNELEtBSGUsRUFHYixJQUhhLENBQWhCO0FBSUQsR0FWVztBQVdadkMsUUFBTSxnQkFBVztBQUNmLFFBQUksQ0FBQyxLQUFLb0MsU0FBVixFQUFxQjtBQUFFO0FBQVM7QUFDaEMsU0FBS0EsU0FBTCxHQUFpQixJQUFqQjtBQUNBSSxrQkFBYyxLQUFLSCxRQUFuQjtBQUNBLFNBQUtsTixJQUFMLENBQVVnQixXQUFWLEdBQXdCLE1BQXhCO0FBQ0Q7QUFoQlcsQ0FBZDs7a0JBbUJlZ00sSzs7Ozs7Ozs7Ozs7QUM3QmY7O0FBRUE7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7OztBQUVBOzs7QUFHQSxTQUFTTSxTQUFULENBQW1CbkwsRUFBbkIsRUFBdUI7QUFDckIsU0FBTyxpQ0FBZ0JBLEVBQWhCLEVBQXNCc0IsSUFBdEIsQ0FBMkI7QUFBQSxXQUFZOEosS0FBS0MsS0FBTCxDQUFXdEksUUFBWCxDQUFaO0FBQUEsR0FBM0IsQ0FBUDtBQUNEOztBQUVEOzs7QUFHQSxJQUFNdUksVUFBVXhOLFNBQVM4RSxhQUFULENBQXVCLGVBQXZCLENBQWhCO0FBQ0EsSUFBTTJJLGNBQWN6TixTQUFTOEUsYUFBVCxDQUF1QixpQkFBdkIsQ0FBcEI7QUFDQSxJQUFJRSxRQUFRLElBQVo7QUFDQXlJLFlBQVkzQixnQkFBWixDQUE2QixPQUE3QixFQUFzQyxZQUFNO0FBQzFDLE1BQUs5RyxLQUFMLEVBQWE7QUFBRUEsVUFBTTRGLElBQU47QUFBZTtBQUM5QixNQUFNOEMsVUFBVUYsUUFBUTFILEtBQXhCO0FBQ0F1SCxZQUFVSyxPQUFWLEVBQ0dsSyxJQURILENBQ1Esb0JBQVk7QUFDaEJ3QixZQUFRLG9CQUFVQyxRQUFWLENBQVI7QUFDQSxvQkFBTUYsSUFBTixDQUFXQyxLQUFYLEVBQWtCQyxRQUFsQixFQUNHSSxXQURILEdBRUdLLGFBRkgsQ0FFaUJpSSxZQUZqQixFQUdHOUgsY0FISCxDQUdrQitILFdBSGxCLEVBRytCQyxVQUgvQjtBQUlELEdBUEgsRUFRR2pLLEtBUkgsQ0FRUyxlQUFPO0FBQUVrSyxZQUFRQyxLQUFSLENBQWNDLEdBQWQ7QUFBb0IsR0FSdEM7QUFTRCxDQVpEO0FBYUE7QUFDQSxJQUFNTCxlQUFlM04sU0FBUzhFLGFBQVQsQ0FBdUIsWUFBdkIsQ0FBckI7QUFDQTZJLGFBQWE3QixnQkFBYixDQUE4QixPQUE5QixFQUF1QyxZQUFNO0FBQzNDOUcsUUFBTTJGLEtBQU47QUFDQSxrQkFBTTlFLGNBQU4sQ0FBcUI4SCxZQUFyQjtBQUNBLGtCQUFNakksYUFBTixDQUFvQmtJLFdBQXBCLEVBQWlDQyxVQUFqQztBQUNELENBSkQ7O0FBTUEsSUFBTUQsY0FBYzVOLFNBQVM4RSxhQUFULENBQXVCLFdBQXZCLENBQXBCO0FBQ0E4SSxZQUFZOUIsZ0JBQVosQ0FBNkIsT0FBN0IsRUFBc0MsWUFBTTtBQUMxQzlHLFFBQU00RixJQUFOO0FBQ0Esa0JBQU1sRixhQUFOLENBQW9CaUksWUFBcEI7QUFDQSxrQkFBTTlILGNBQU4sQ0FBcUIrSCxXQUFyQixFQUFrQ0MsVUFBbEM7QUFDRCxDQUpEOztBQU1BLElBQU1BLGFBQWE3TixTQUFTOEUsYUFBVCxDQUF1QixVQUF2QixDQUFuQjtBQUNBK0ksV0FBVy9CLGdCQUFYLENBQTRCLE9BQTVCLEVBQXFDLFlBQU07QUFDekMsTUFBTUcsWUFBWSxnQkFBTWhHLFlBQU4sRUFBbEI7QUFDQSxtQkFBT3hFLE9BQVAsQ0FBZSxZQUFmLEVBQTZCd0ssU0FBN0I7QUFDRCxDQUhEOztBQUtBOzs7QUFHQSxpQkFBTy9LLFNBQVAsQ0FBaUIsV0FBakIsRUFBOEIsaUJBQVM7QUFDckMsa0JBQU1vRixTQUFOO0FBQ0Esa0JBQU1KLFFBQU4sQ0FBZTFELEtBQWY7QUFDRCxDQUhEO0FBSUEsaUJBQU90QixTQUFQLENBQWlCLE9BQWpCLEVBQTBCO0FBQUEsU0FBUyxnQkFBTWtGLFNBQU4sQ0FBZ0JwQyxLQUFoQixDQUFUO0FBQUEsQ0FBMUI7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EscUQiLCJmaWxlIjoibGVhcm5pbmcuYnVuZGxlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pXG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG5cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGlkZW50aXR5IGZ1bmN0aW9uIGZvciBjYWxsaW5nIGhhcm1vbnkgaW1wb3J0cyB3aXRoIHRoZSBjb3JyZWN0IGNvbnRleHRcbiBcdF9fd2VicGFja19yZXF1aXJlX18uaSA9IGZ1bmN0aW9uKHZhbHVlKSB7IHJldHVybiB2YWx1ZTsgfTtcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7XG4gXHRcdFx0XHRjb25maWd1cmFibGU6IGZhbHNlLFxuIFx0XHRcdFx0ZW51bWVyYWJsZTogdHJ1ZSxcbiBcdFx0XHRcdGdldDogZ2V0dGVyXG4gXHRcdFx0fSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gMjIpO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIHdlYnBhY2svYm9vdHN0cmFwIDBkMWQ1MjljNGNkMWE3M2Y2NzM4IiwiY29uc3Qgbm9kZUZhY3RvcnkgPSBmdW5jdGlvbih0eXBlID0gJ2RpdicsIHBhcmFtcyA9IHt9KSB7XHJcbiAgY29uc3Qgbm9kZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQodHlwZSk7XHJcblxyXG4gIGFwcGVuZENsYXNzZXMobm9kZSwgcGFyYW1zKTtcclxuICBhcHBlbmRBdHRycyhub2RlLCBwYXJhbXMpO1xyXG4gIGluc2VydFRleHRDb250ZW50KG5vZGUsIHBhcmFtcyk7XHJcblxyXG4gIHJldHVybiBub2RlO1xyXG59XHJcblxyXG5mdW5jdGlvbiBhcHBlbmRDbGFzc2VzKG5vZGUsIHsgY2xhc3NMaXN0IH0pIHtcclxuICBpZiAoY2xhc3NMaXN0ICYmIGNsYXNzTGlzdC5mb3JFYWNoKSB7XHJcbiAgICBjbGFzc0xpc3QuZm9yRWFjaChjbGFzc05hbWUgPT4gbm9kZS5jbGFzc0xpc3QuYWRkKGNsYXNzTmFtZSkpO1xyXG4gIH1cclxufVxyXG5cclxuZnVuY3Rpb24gYXBwZW5kQXR0cnMobm9kZSwgeyBhdHRycyB9KSB7XHJcbiAgaWYgKGF0dHJzKSB7XHJcbiAgICBjb25zdCBhdHRyTmFtZXMgPSBPYmplY3Qua2V5cyhhdHRycyk7XHJcbiAgICBhdHRyTmFtZXMuZm9yRWFjaChhdHRyTmFtZSA9PiBub2RlLnNldEF0dHJpYnV0ZShhdHRyTmFtZSwgYXR0cnNbYXR0ck5hbWVdKSk7XHJcbiAgfVxyXG59XHJcblxyXG5mdW5jdGlvbiBpbnNlcnRUZXh0Q29udGVudChub2RlLCB7IHRleHRDb250ZW50ID0gXCJcIiB9KSB7XHJcbiAgbm9kZS50ZXh0Q29udGVudCA9IHRleHRDb250ZW50O1xyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBub2RlRmFjdG9yeTtcclxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vdXRpbHMvbm9kZUZhY3RvcnkuanMiLCJjb25zdCBwdWJzdWIgPSAoZnVuY3Rpb24oKSB7XHJcblxyXG4gIGNvbnN0IHRvcGljcyA9IHt9O1xyXG5cclxuICByZXR1cm4ge1xyXG4gICAgc3Vic2NyaWJlOiBmdW5jdGlvbih0b3BpYywgbGlzdGVuZXIpIHtcclxuICAgICAgaWYgKCF0b3BpY3NbdG9waWNdKSB0b3BpY3NbdG9waWNdID0geyBxdWV1ZTogW10gfTtcclxuXHJcbiAgICAgIGNvbnN0IGluZGV4ID0gdG9waWNzW3RvcGljXS5xdWV1ZS5wdXNoKGxpc3RlbmVyKSAtIDE7XHJcbiAgICAgIC8vIGZ1bmN0aW9uIHRvIGRlbGV0ZSB0b3BpY1xyXG4gICAgICByZXR1cm4ge1xyXG4gICAgICAgIHJlbW92ZTogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICBkZWxldGUgdG9waWNzW3RvcGljXS5xdWV1ZVtpbmRleF07XHJcbiAgICAgICAgfVxyXG4gICAgICB9O1xyXG4gICAgfSxcclxuXHJcbiAgICBwdWJsaXNoOiBmdW5jdGlvbih0b3BpYywgaW5mbykge1xyXG4gICAgICAvLyBubyB0aGVtZSBvciBubyBsaXN0ZW5lcnNcclxuICAgICAgaWYgKCF0b3BpY3NbdG9waWNdIHx8ICF0b3BpY3NbdG9waWNdLnF1ZXVlLmxlbmd0aCkgcmV0dXJuO1xyXG5cclxuICAgICAgY29uc3QgaXRlbXMgPSB0b3BpY3NbdG9waWNdLnF1ZXVlO1xyXG4gICAgICBpdGVtcy5mb3JFYWNoKGl0ZW0gPT4ge1xyXG4gICAgICAgIGl0ZW0oaW5mbyB8fCB7fSk7XHJcbiAgICAgIH0pO1xyXG4gICAgfVxyXG4gIH07XHJcbn0pKCk7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBwdWJzdWI7XHJcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3V0aWxzL3B1YnN1Yi5qcyIsImltcG9ydCBTdGF0ZSBmcm9tICcuL21vZGVsX2NvbXBvbmVudHMvc3RhdGUnO1xyXG5pbXBvcnQgcHVic3ViIGZyb20gJy4uL3V0aWxzL3B1YnN1Yic7XHJcblxyXG5jb25zdCBJTklUSUFMX1NUQVRFX05BTUUgPSAn0KHQvtGB0YLQvtGP0L3QuNC1INC80L7QtNC10LvQuCc7XHJcbmNvbnN0IFNUT1BfU1RBVEVfTkFNRSA9ICfQntCx0YPRh9C10L3QuNC1INC+0YHRgtCw0L3QvtCy0LvQtdC90L4nO1xyXG5cclxuY2xhc3MgTW9kZWwge1xyXG4gIGNvbnN0cnVjdG9yKGRhdGEpIHtcclxuICAgIHRoaXMuaWQgPSBkYXRhLmlkO1xyXG4gICAgdGhpcy5uYW1lID0gZGF0YS5uYW1lO1xyXG4gICAgdGhpcy5icmVha1RpbWUgPSBkYXRhLmJyZWFrVGltZTtcclxuICAgIHRoaXMuc3RlcHMgPSBkYXRhLnN0ZXBzO1xyXG5cclxuICAgIHRoaXMuc3RhdGVzID0gZGF0YS5zdGF0ZXMubWFwKHN0YXRlID0+IG5ldyBTdGF0ZShzdGF0ZSkpO1xyXG4gICAgdGhpcy5pbml0aWFsU3RhdGUgPSBkYXRhLmluaXRpYWxTdGF0ZTtcclxuICAgIHRoaXMuY3VycmVudFN0YXRlID0gdGhpcy5nZXRTdGF0ZSh0aGlzLmluaXRpYWxTdGF0ZSk7XHJcblxyXG4gICAgdGhpcy50aW1lb3V0ID0gbnVsbDtcclxuICAgIHRoaXMuc3ViSW5wdXQgPSBudWxsO1xyXG4gICAgdGhpcy5zdWJTdG9wID0gbnVsbDtcclxuICAgIHRoaXMuc3RhcnRTdGF0ZSA9IG5ldyBTdGF0ZSh7IGlkOiAwLCBuYW1lOiBJTklUSUFMX1NUQVRFX05BTUUsIGltZzogJ2ltZy9zdGFydC5wbmcnLCBsYXN0OiB0cnVlIH0pO1xyXG4gICAgdGhpcy5zdG9wU3RhdGUgPSBuZXcgU3RhdGUoeyBpZDogLTEsIG5hbWU6IFNUT1BfU1RBVEVfTkFNRSwgaW1nOiAnaW1nL3N0b3AucG5nJywgbGFzdDogdHJ1ZSB9KTtcclxuICB9XHJcblxyXG4gIGdldFN0YXRlKGlkKSB7XHJcbiAgICByZXR1cm4gdGhpcy5zdGF0ZXMuZmluZChzdGF0ZSA9PiBzdGF0ZS5pZCA9PSBpZCk7XHJcbiAgfVxyXG5cclxuICBzdGFydCgpIHtcclxuICAgIHRoaXMuY3VycmVudFN0YXRlID0gdGhpcy5nZXRTdGF0ZSh0aGlzLmluaXRpYWxTdGF0ZSk7XHJcbiAgICBwdWJzdWIucHVibGlzaCgnbmV3X3N0YXRlJywgdGhpcy5jdXJyZW50U3RhdGUpO1xyXG4gICAgbGV0IGludGVydmFscyA9IFByb21pc2UucmVzb2x2ZSgpOyAvLyBpbml0IHByb21pc2UgY2hhaW5cclxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5zdGVwczsgaSsrKSB7XHJcbiAgICAgIGludGVydmFscyA9IGludGVydmFsc1xyXG4gICAgICAgLnRoZW4oKCkgPT4geyByZXR1cm4gdGhpcy5tYWtlQnJlYWsoKSB9KVxyXG4gICAgICAgLnRoZW4oKCkgPT4geyByZXR1cm4gdGhpcy5oYW5kbGVFdmVudCgpIH0pXHJcbiAgICAgICAudGhlbihzdGF0ZSA9PiB7IHRoaXMuaGFuZGxlTmV3U3RhdGUoc3RhdGUpIH0pXHJcbiAgICB9XHJcbiAgICBpbnRlcnZhbHMuY2F0Y2goc3RhdGUgPT4gdGhpcy5oYW5kbGVOZXdTdGF0ZShzdGF0ZSkpO1xyXG4gICAgcmV0dXJuIGludGVydmFscztcclxuICB9XHJcblxyXG4gIG1ha2VCcmVhaygpIHtcclxuICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XHJcbiAgICAgIHRoaXMuc3ViU3RvcCA9IHB1YnN1Yi5zdWJzY3JpYmUoJ21vZGVsX3N0b3AnLCAoKSA9PiB7IHJlamVjdCh0aGlzLnN0b3BTdGF0ZSk7IH0pXHJcbiAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgIHRoaXMuY2xlYXJTdWJzKCk7XHJcbiAgICAgICAgcmVzb2x2ZSgpXHJcbiAgICAgIH0sIHRoaXMuYnJlYWtUaW1lKTtcclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgaGFuZGxlRXZlbnQoKSB7XHJcbiAgICBjb25zdCBldmVudCA9IHRoaXMuY3VycmVudFN0YXRlLmV2ZW50O1xyXG4gICAgY29uc3QgZXZlbnRTdGFydFRpbWUgPSBEYXRlLm5vdygpO1xyXG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcclxuICAgICAgLy8gc2VuZCBkYXRhIGFib3V0IG5ldyBldmVudCB0byBvdGhlciBtb2R1bGVzXHJcbiAgICAgIHB1YnN1Yi5wdWJsaXNoKCdldmVudCcsIGV2ZW50KTtcclxuXHJcbiAgICAgIC8vIGxpc3RlbiB0byB1c2VyIGFjdGlvblxyXG4gICAgICAvLyBhbmQgaWYgdXNlciBpbnB1dCBjb3JyZWN0IGdvIHRvIG5leHQgc3RhdGVcclxuICAgICAgdGhpcy5zdWJJbnB1dCA9IHB1YnN1Yi5zdWJzY3JpYmUoJ3VzZXJfaW5wdXQnLCBkYXRhID0+IHtcclxuICAgICAgICBjb25zdCB0aW1lU3BlbnQgPSBEYXRlLm5vdygpIC0gZXZlbnRTdGFydFRpbWU7XHJcbiAgICAgICAgY29uc3QgbmV4dFN0YXRlSWQgPSB0aGlzLmN1cnJlbnRTdGF0ZS5oYW5kbGVJbnB1dChkYXRhLCB0aW1lU3BlbnQpO1xyXG4gICAgICAgIGNvbnN0IG5leHRTdGF0ZSA9IHRoaXMuZ2V0U3RhdGUobmV4dFN0YXRlSWQpO1xyXG4gICAgICAgIGlmICggbmV4dFN0YXRlICkge1xyXG4gICAgICAgICAgbmV4dFN0YXRlLmxhc3QgPyByZWplY3QobmV4dFN0YXRlKSA6IHJlc29sdmUobmV4dFN0YXRlKTtcclxuICAgICAgICB9XHJcbiAgICAgIH0pO1xyXG5cclxuICAgICAgdGhpcy5zdWJTdG9wID0gcHVic3ViLnN1YnNjcmliZSgnbW9kZWxfc3RvcCcsICgpID0+IHtcclxuICAgICAgICByZWplY3QodGhpcy5zdG9wU3RhdGUpO1xyXG4gICAgICB9KTtcclxuXHJcbiAgICAgIC8vIGhhbmRsZSBpbmFjdGl2ZVxyXG4gICAgICBjb25zdCBpbmFjdGl2ZVRpbWUgPSB0aGlzLmN1cnJlbnRTdGF0ZS5nZXRJbmFjdGl2ZVRpbWUoKTtcclxuICAgICAgdGhpcy50aW1lb3V0ID0gc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgY29uc3QgbmV4dFN0YXRlSWQgPSB0aGlzLmN1cnJlbnRTdGF0ZS5nZXRJbmFjdGl2ZUFjdGlvbigpLm5leHRTdGF0ZTtcclxuICAgICAgICBjb25zdCBuZXh0U3RhdGUgPSB0aGlzLmdldFN0YXRlKG5leHRTdGF0ZUlkKTtcclxuICAgICAgICBuZXh0U3RhdGUubGFzdCA/IHJlamVjdChuZXh0U3RhdGUpIDogcmVzb2x2ZShuZXh0U3RhdGUpO1xyXG4gICAgICB9LCBpbmFjdGl2ZVRpbWUpO1xyXG4gICAgfSlcclxuICB9XHJcblxyXG4gIHN0b3AoKSB7XHJcbiAgICBwdWJzdWIucHVibGlzaCgnbW9kZWxfc3RvcCcpO1xyXG4gIH1cclxuXHJcbiAgaGFuZGxlTmV3U3RhdGUoc3RhdGUpIHtcclxuICAgIHRoaXMuY3VycmVudFN0YXRlID0gc3RhdGU7XHJcbiAgICBjbGVhclRpbWVvdXQodGhpcy50aW1lb3V0KTtcclxuICAgIHRoaXMuY2xlYXJTdWJzKCk7XHJcbiAgICBwdWJzdWIucHVibGlzaCgnbmV3X3N0YXRlJywgc3RhdGUpO1xyXG4gIH1cclxuXHJcbiAgY2xlYXJTdWJzKCkge1xyXG4gICAgaWYgKHRoaXMuc3ViSW5wdXQpIHtcclxuICAgICAgdGhpcy5zdWJJbnB1dC5yZW1vdmUoKTtcclxuICAgIH1cclxuICAgIGlmICh0aGlzLnN1YlN0b3ApIHtcclxuICAgICAgdGhpcy5zdWJTdG9wLnJlbW92ZSgpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IE1vZGVsO1xyXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9sZWFybmluZy9tb2RlbC5qcyIsImltcG9ydCBzdGF0ZSBmcm9tICcuL3NjZW5lX2NvbXBvbmVudHMvc3RhdGUnO1xyXG5pbXBvcnQgdG9vbHMgZnJvbSAnLi9zY2VuZV9jb21wb25lbnRzL3Rvb2xzJztcclxuXHJcbmNvbnN0IGV4cG9ydHMgPSB7fTtcclxuXHJcbi8vIFNjZW5lIG1ldGFkYXRhXHJcbmNvbnN0ICRtb2RlbE5hbWUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcubW9kZWwtbmFtZScpO1xyXG5leHBvcnRzLmluaXQgPSBmdW5jdGlvbihtb2RlbCwgcmVzcG9uc2UpIHtcclxuICAkbW9kZWxOYW1lLnRleHRDb250ZW50ID0gbW9kZWwubmFtZTtcclxuICBzdGF0ZS5zZXQobW9kZWwuc3RhcnRTdGF0ZSk7XHJcbiAgdG9vbHMuaW5pdChyZXNwb25zZS50b29scyk7XHJcbiAgcmV0dXJuIHRoaXM7XHJcbn1cclxuXHJcbi8vIE1hbmFnZSBjb250ZW50IHZpc2liaWxpdHlcclxuY29uc3QgJGNvbnRlbnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuY29udGVudCcpO1xyXG5leHBvcnRzLnNob3dDb250ZW50ID0gZnVuY3Rpb24oKSB7XHJcbiAgc2V0Q29udGVudERpc3BsYXkoJ2ZsZXgnKTtcclxuICByZXR1cm4gdGhpcztcclxufVxyXG5leHBvcnRzLmhpZGVDb250ZW50ID0gZnVuY3Rpb24oKSB7XHJcbiAgc2V0Q29udGVudERpc3BsYXkoJ25vbmUnKTtcclxuICByZXR1cm4gdGhpcztcclxufVxyXG5mdW5jdGlvbiBzZXRDb250ZW50RGlzcGxheShkaXNwbGF5KSB7XHJcbiAgJGNvbnRlbnQuc3R5bGUuZGlzcGxheSA9IGRpc3BsYXk7XHJcbn1cclxuXHJcbi8vIE1hbmFnZSBidXR0b25zIHN0YXRlXHJcbmV4cG9ydHMuZW5hYmxlQnV0dG9ucyA9IGZ1bmN0aW9uKC4uLmJ1dHRvbnMpIHtcclxuICBzZXRCdXR0b25zU3RhdGUoYnV0dG9ucywgZmFsc2UpO1xyXG4gIHJldHVybiB0aGlzO1xyXG59XHJcbmV4cG9ydHMuZGlzYWJsZUJ1dHRvbnMgPSBmdW5jdGlvbiguLi5idXR0b25zKSB7XHJcbiAgc2V0QnV0dG9uc1N0YXRlKGJ1dHRvbnMsIHRydWUpO1xyXG4gIHJldHVybiB0aGlzO1xyXG59XHJcbmZ1bmN0aW9uIHNldEJ1dHRvbnNTdGF0ZShidXR0b25zLCB2YWx1ZSkge1xyXG4gIGJ1dHRvbnMuZm9yRWFjaChidXR0b24gPT4gYnV0dG9uLmRpc2FibGVkID0gdmFsdWUpO1xyXG59XHJcblxyXG4vLyBEZWxlZ2F0ZSBwdWJsaWMgbWV0aG9kcyB0byBjb21wb25lbnRzXHJcbmV4cG9ydHMuZ2V0VG9vbHNEYXRhID0gKCkgPT5cclxuICB0b29scy5nZXRUb29sc0RhdGEoKTtcclxuXHJcbmV4cG9ydHMuc2V0U3RhdGUgPSBzdGF0ZURhdGEgPT5cclxuICBzdGF0ZS5zZXQoc3RhdGVEYXRhKTtcclxuXHJcbmV4cG9ydHMuc2hvd0V2ZW50ID0gZXZlbnREYXRhID0+XHJcbiAgc3RhdGUuc2hvd0V2ZW50KGV2ZW50RGF0YSk7XHJcblxyXG5leHBvcnRzLmhpZGVFdmVudCA9ICgpID0+XHJcbiAgc3RhdGUuaGlkZUV2ZW50KCk7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBleHBvcnRzO1xyXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9sZWFybmluZy9zY2VuZS5qcyIsImZ1bmN0aW9uIGFqYXgocGF0aCA9ICcnLCBvcHRpb25zID0ge30pIHtcclxuICBjb25zdCB4aHIgPSBuZXcgWE1MSHR0cFJlcXVlc3QoKTtcclxuICB4aHIub3BlbihvcHRpb25zLm1ldGhvZCB8fCAnR0VUJywgcGF0aCwgdHJ1ZSk7XHJcbiAgaWYgKG9wdGlvbnMuaGVhZGVycykgeyBzZXRYSFJIZWFkZXJzKHhociwgb3B0aW9ucy5oZWFkZXJzKTsgfVxyXG4gIHhoci5zZW5kKG9wdGlvbnMuZGF0YSk7XHJcblxyXG4gIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XHJcbiAgICB4aHIub25yZWFkeXN0YXRlY2hhbmdlID0gZnVuY3Rpb24oKSB7XHJcbiAgICAgIGlmKHhoci5yZWFkeVN0YXRlID09IDQpIHtcclxuICAgICAgICBpZih4aHIuc3RhdHVzID09IDIwMCkge1xyXG4gICAgICAgICAgcmVzb2x2ZSh4aHIucmVzcG9uc2VUZXh0KTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgcmVqZWN0KHhoci5zdGF0dXNUZXh0KTtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9KVxyXG59XHJcblxyXG5mdW5jdGlvbiBzZXRYSFJIZWFkZXJzKHhociwgaGVhZGVycykge1xyXG4gIGZvciAobGV0IGhlYWRlciBpbiBoZWFkZXJzKSB7XHJcbiAgICB4aHIuc2V0UmVxdWVzdEhlYWRlcihoZWFkZXIsIGhlYWRlcnNbaGVhZGVyc10pO1xyXG4gIH1cclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgYWpheDtcclxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vdXRpbHMvYWpheC5qcyIsIi8vIHJlbW92ZWQgYnkgZXh0cmFjdC10ZXh0LXdlYnBhY2stcGx1Z2luXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi4vc2Fzcy9sZWFybmluZy5zY3NzXG4vLyBtb2R1bGUgaWQgPSA4XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsImNsYXNzIEFjdGlvbiB7XHJcbiAgY29uc3RydWN0b3IoZGF0YSkge1xyXG4gICAgdGhpcy5taW5UaW1lID0gZGF0YS5taW5UaW1lO1xyXG4gICAgdGhpcy5tYXhUaW1lID0gZGF0YS5tYXhUaW1lO1xyXG4gICAgdGhpcy5uZXh0U3RhdGUgPSBkYXRhLm5leHRTdGF0ZTtcclxuICAgIGlmIChkYXRhLmluYWN0aXZlKSB7XHJcbiAgICAgIHRoaXMuaW5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICB0aGlzLnRvb2xzID0gW107XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB0aGlzLmluYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgIHRoaXMudG9vbHMgPSB0aGlzLmluaXRUb29scyhkYXRhLnRvb2xzKTtcclxuICAgIH1cclxuXHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBAcGFyYW0gW3sgaWQ6IE51bWJlciwgdmFsdWU6IE51bWJlci9Cb29sZWFuIH0sIHsuLi59XVxyXG4gICAqIEBwYXJhbSBOdW1iZXJcclxuICAgKiBAcmV0dXJuIEJvb2xlYW5cclxuICAgKi9cclxuICBpc1N1aXRhYmxlKGRhdGEsIHRpbWUpIHtcclxuICAgIHJldHVybiB0aGlzLnJpZ2h0VGltZSh0aW1lKSAmJiB0aGlzLnJpZ2h0RGF0YShkYXRhKTtcclxuICB9XHJcblxyXG4gIHJpZ2h0RGF0YShkYXRhID0gW10pIHtcclxuICAgIHJldHVybiB0aGlzLnRvb2xzLmV2ZXJ5KHRvb2wgPT4ge1xyXG4gICAgICAvLyDQldGB0LvQuCDRgdGA0LXQtNC4INC/0L7Qu9GD0YfQtdC90L3Ri9GFINC40YLQtdC80L7QsiDQvdC10YIsINGC0L7Qs9C+INC60L7RgtC+0YDRi9C5INC10YHRgtGMINCyINC00LDQvdC90L7QvCDRjdC60YjQtdC90LVcclxuICAgICAgY29uc3QgY2hlY2tUb29sID0gZGF0YS5maW5kKG9iaiA9PiBvYmouaWQgPT0gdG9vbC5pZCk7XHJcbiAgICAgIGlmICghY2hlY2tUb29sKSB7IHJldHVybiBmYWxzZTsgfVxyXG5cclxuICAgICAgaWYgKHRvb2wudHlwZSA9PT0gJ3N3aXRjaCcpIHsgcmV0dXJuIGNoZWNrVG9vbC52YWx1ZSA9PT0gdG9vbC5ib29sVmFsdWU7IH1cclxuXHJcbiAgICAgIGlmICh0b29sLnR5cGUgPT09ICdyYW5nZScpIHsgcmV0dXJuIHRoaXMuaW5jbHVkZXNWYWx1ZShjaGVja1Rvb2wudmFsdWUsIFsgdG9vbC5taW5WYWx1ZSwgdG9vbC5tYXhWYWx1ZSBdKSB9XHJcblxyXG4gICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIGluY2x1ZGVzVmFsdWUodmFsdWUsIGJvcmRlcnMpIHtcclxuICAgIGlmICh0eXBlb2YgdmFsdWUgIT09ICdudW1iZXInKSB0aHJvdyBuZXcgVHlwZUVycm9yKCdWYWx1ZSBzaG91bGQgYmUgaW50ZWdlcicpO1xyXG4gICAgcmV0dXJuICh2YWx1ZSA+PSBib3JkZXJzWzBdKSAmJiAodmFsdWUgPD0gYm9yZGVyc1sxXSk7XHJcbiAgfVxyXG5cclxuICByaWdodFRpbWUodGltZSkge1xyXG4gICAgaWYgKHR5cGVvZiB0aW1lICE9PSAnbnVtYmVyJykgdGhyb3cgbmV3IFR5cGVFcnJvcignVGltZSBzaG91bGQgYmUgaW50ZWdlciAobXMpJyk7XHJcbiAgICByZXR1cm4gKHRpbWUgPj0gdGhpcy5taW5UaW1lKSAmJiAodGltZSA8PSB0aGlzLm1heFRpbWUpO1xyXG4gIH1cclxuXHJcbiAgaW5pdFRvb2xzKHRvb2xzKSB7XHJcbiAgICByZXR1cm4gdG9vbHMubWFwKHRvb2wgPT4ge1xyXG4gICAgICByZXR1cm4ge1xyXG4gICAgICAgIGlkOiB0b29sLmlkLFxyXG4gICAgICAgIHR5cGU6IHRvb2wudHlwZSxcclxuICAgICAgICBtaW5WYWx1ZTogdG9vbC5BY3Rpb25Ub29sLm1pblZhbHVlLFxyXG4gICAgICAgIG1heFZhbHVlOiB0b29sLkFjdGlvblRvb2wubWF4VmFsdWUsXHJcbiAgICAgICAgYm9vbFZhbHVlOiB0b29sLkFjdGlvblRvb2wuYm9vbFZhbHVlXHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG4gIH1cclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgQWN0aW9uO1xyXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9sZWFybmluZy9tb2RlbF9jb21wb25lbnRzL2FjdGlvbi5qcyIsImNsYXNzIEV2ZW50IHtcclxuICBjb25zdHJ1Y3RvcihkYXRhKSB7XHJcbiAgICB0aGlzLmlkID0gZGF0YS5pZDtcclxuICAgIHRoaXMubmFtZSA9IGRhdGEubmFtZTtcclxuICAgIHRoaXMuZGVzY3JpcHRpb24gPSBkYXRhLmRlc2NyaXB0aW9uO1xyXG4gIH1cclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgRXZlbnQ7XHJcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2xlYXJuaW5nL21vZGVsX2NvbXBvbmVudHMvZXZlbnQuanMiLCJpbXBvcnQgRXZlbnQgZnJvbSAnLi9ldmVudCcgO1xyXG5pbXBvcnQgQWN0aW9uIGZyb20gJy4vYWN0aW9uJztcclxuXHJcbmNsYXNzIFN0YXRlIHtcclxuICBjb25zdHJ1Y3RvcihkYXRhKSB7XHJcbiAgICB0aGlzLmlkID0gZGF0YS5pZDtcclxuICAgIHRoaXMubmFtZSA9IGRhdGEubmFtZTtcclxuICAgIHRoaXMuaW1nID0gZGF0YS5pbWc7XHJcbiAgICB0aGlzLnBhcmFtcyA9IGRhdGEucGFyYW1zO1xyXG5cclxuICAgIGlmKGRhdGEubGFzdCkge1xyXG4gICAgICB0aGlzLmxhc3QgPSB0cnVlO1xyXG4gICAgICB0aGlzLmV2ZW50ID0gbnVsbDtcclxuICAgICAgdGhpcy5hY3Rpb25zID0gbnVsbDtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHRoaXMuZXZlbnQgPSBuZXcgRXZlbnQoZGF0YS5ldmVudCk7XHJcbiAgICAgIHRoaXMuYWN0aW9ucyA9IGRhdGEuYWN0aW9ucy5tYXAoYWN0aW9uID0+IG5ldyBBY3Rpb24oYWN0aW9uKSk7XHJcbiAgICAgIHRoaXMubGFzdCA9IGZhbHNlO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgZ2V0SW5hY3RpdmVUaW1lKCkge1xyXG4gICAgY29uc3QgdGltZXMgPSB0aGlzLmdldEFsbEFjdGlvblRpbWVzKCk7XHJcbiAgICByZXR1cm4gTWF0aC5tYXgoLi4udGltZXMpO1xyXG4gIH1cclxuXHJcbiAgZ2V0SW5hY3RpdmVBY3Rpb24oKSB7XHJcbiAgICByZXR1cm4gdGhpcy5hY3Rpb25zLmZpbmQoYWN0aW9uID0+IGFjdGlvbi5pbmFjdGl2ZSA9PT0gdHJ1ZSk7XHJcbiAgfVxyXG5cclxuICBnZXRBbGxBY3Rpb25UaW1lcygpIHtcclxuICAgIHJldHVybiB0aGlzLmFjdGlvbnMubWFwKGFjdGlvbiA9PiBhY3Rpb24ubWF4VGltZSB8fCAwKTtcclxuICB9XHJcblxyXG4gIGhhbmRsZUlucHV0KGRhdGEsIHRpbWUpIHtcclxuICAgIGNvbnN0IHN1aXRlZEFjdGlvbnMgPSB0aGlzLmFjdGlvbnMuZmlsdGVyKGFjdGlvbiA9PiBhY3Rpb24uaXNTdWl0YWJsZShkYXRhLCB0aW1lKSk7XHJcbiAgICBpZiAoc3VpdGVkQWN0aW9ucy5sZW5ndGggPiAwKSB7XHJcbiAgICAgIHJldHVybiBzdWl0ZWRBY3Rpb25zWzBdLm5leHRTdGF0ZTtcclxuICAgIH1cclxuICAgIHJldHVybiBudWxsO1xyXG4gIH1cclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgU3RhdGU7XHJcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2xlYXJuaW5nL21vZGVsX2NvbXBvbmVudHMvc3RhdGUuanMiLCJpbXBvcnQgbm9kZUZhY3RvcnkgZnJvbSAnLi4vLi4vdXRpbHMvbm9kZUZhY3RvcnknO1xyXG5pbXBvcnQgdGltZXIgZnJvbSAnLi4vLi4vdXRpbHMvdGltZXInO1xyXG5cclxuY29uc3QgJG5hbWUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcubW9kZWwtc3RhdGUtbmFtZScpO1xyXG5jb25zdCAkaW1nID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLm1vZGVsLXN0YXRlLWltZycpO1xyXG5jb25zdCAkcGFyYW1zID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLm1vZGVsLXBhcmFtcy12YWx1ZXMnKTtcclxuXHJcbmNvbnN0ICRldmVudCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5tb2RlbC1ldmVudCcpO1xyXG5jb25zdCAkZXZlbnRIZWFkZXIgPSAkZXZlbnQucXVlcnlTZWxlY3RvcignLm1vZGVsLWV2ZW50LW5hbWUgc3BhbicpO1xyXG5jb25zdCAkZXZlbnRCb2R5ID0gJGV2ZW50LnF1ZXJ5U2VsZWN0b3IoJy5tb2RlbC1ldmVudC1pbmZvJyk7XHJcblxyXG5jb25zdCAkdGltZXJDb250YWluZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcubW9kZWwtdGltZXInKTtcclxuJHRpbWVyQ29udGFpbmVyLmFwcGVuZENoaWxkKHRpbWVyLm5vZGUpO1xyXG5cclxuZnVuY3Rpb24gc2V0KHsgbmFtZSwgaW1nLCBwYXJhbXMgfSkge1xyXG4gICRuYW1lLnRleHRDb250ZW50ID0gbmFtZTtcclxuICAkaW1nLnNldEF0dHJpYnV0ZSgnc3JjJywgaW1nKTtcclxuICBzZXRQYXJhbWV0ZXJzKHBhcmFtcyk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIHNldFBhcmFtZXRlcnMocGFyYW1zID0gW10pIHtcclxuICBjb25zdCBmcmFnID0gZG9jdW1lbnQuY3JlYXRlRG9jdW1lbnRGcmFnbWVudCgpO1xyXG4gIHBhcmFtcy5mb3JFYWNoKHBhcmFtID0+IGZyYWcuYXBwZW5kQ2hpbGQoY3JlYXRlUGFyYW1ldGVOb2RlKHBhcmFtLm5hbWUsIHBhcmFtLnZhbHVlKSkpO1xyXG5cclxuICAkcGFyYW1zLmlubmVySFRNTCA9IFwiXCI7XHJcbiAgJHBhcmFtcy5hcHBlbmRDaGlsZChmcmFnKTtcclxufVxyXG5cclxuZnVuY3Rpb24gY3JlYXRlUGFyYW1ldGVOb2RlKGtleSwgdmFsdWUpIHtcclxuICBjb25zdCBkaXYgPSBub2RlRmFjdG9yeSgnZGl2JywgeyBjbGFzc0xpc3Q6IFsncGFyYW1ldGVyJ10gfSk7XHJcblxyXG4gIGNvbnN0IGtleVNwYW4gPSBub2RlRmFjdG9yeSgnc3BhbicsIHsgdGV4dENvbnRlbnQ6IGtleSB9KTtcclxuICBkaXYuYXBwZW5kQ2hpbGQoa2V5U3Bhbik7XHJcblxyXG4gIGNvbnN0IHZhbHVlU3BhbiA9IG5vZGVGYWN0b3J5KCdzcGFuJywgeyB0ZXh0Q29udGVudDogdmFsdWUgfSk7XHJcbiAgZGl2LmFwcGVuZENoaWxkKHZhbHVlU3Bhbik7XHJcblxyXG4gIHJldHVybiBkaXY7XHJcbn1cclxuXHJcblxyXG4vKiogU2V0cyBldmVudCBkYXRhIHRvIFVJICovXHJcbmZ1bmN0aW9uIHNob3dFdmVudChldmVudCkge1xyXG4gICRldmVudEhlYWRlci50ZXh0Q29udGVudCA9IGV2ZW50Lm5hbWU7XHJcbiAgJGV2ZW50Qm9keS50ZXh0Q29udGVudCA9IGV2ZW50LmRlc2NyaXB0aW9uO1xyXG4gICRldmVudC5jbGFzc0xpc3QucmVtb3ZlKCdpcy1oaWRkZW4nLCAnc2xpZGUtdG9wJyk7XHJcbiAgc2hvd1RpbWVyKCk7XHJcbn1cclxuZnVuY3Rpb24gaGlkZUV2ZW50KCkge1xyXG4gICRldmVudC5jbGFzc0xpc3QuYWRkKCdpcy1oaWRkZW4nLCAnc2xpZGUtdG9wJyk7XHJcbiAgaGlkZVRpbWVyKCk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIHNob3dUaW1lcigpIHtcclxuICAkdGltZXJDb250YWluZXIuY2xhc3NMaXN0LnJlbW92ZSgnaXMtaGlkZGVuJyk7XHJcbiAgdGltZXIuc3RhcnQoKTtcclxufVxyXG5mdW5jdGlvbiBoaWRlVGltZXIoKSB7XHJcbiAgJHRpbWVyQ29udGFpbmVyLmNsYXNzTGlzdC5hZGQoJ2lzLWhpZGRlbicpO1xyXG4gIHRpbWVyLnN0b3AoKTtcclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQge1xyXG4gIHNldCxcclxuICBzaG93RXZlbnQsXHJcbiAgaGlkZUV2ZW50XHJcbn1cclxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vbGVhcm5pbmcvc2NlbmVfY29tcG9uZW50cy9zdGF0ZS5qcyIsImltcG9ydCBub2RlRmFjdG9yeSBmcm9tICcuLi8uLi91dGlscy9ub2RlRmFjdG9yeSc7XHJcblxyXG5jb25zdCB0b29sVHlwZXMgPSB7XHJcbiAgUkFOR0U6ICdyYW5nZScsXHJcbiAgU1dJVENIOiAnc3dpdGNoJ1xyXG59XHJcbmNvbnN0ICR0b29scyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy50b29scy1saXN0Jyk7XHJcblxyXG5mdW5jdGlvbiBpbml0KHRvb2xzKSB7XHJcbiAgY29uc3QgZnJhZ21lbnQgPSBkb2N1bWVudC5jcmVhdGVEb2N1bWVudEZyYWdtZW50KCk7XHJcblxyXG4gIHRvb2xzLmZvckVhY2godG9vbCA9PiB7XHJcbiAgICAvLyBjcmVhdGUgdG9vbCB3cmFwcGVyXHJcbiAgICBjb25zdCBkaXYgPSBub2RlRmFjdG9yeSgnZGl2JywgeyBjbGFzc0xpc3Q6IFsndG9vbCddIH0pO1xyXG5cclxuICAgIGNvbnN0IGxhYmVsID0gbm9kZUZhY3RvcnkoJ2xhYmVsJywge1xyXG4gICAgICBjbGFzc0xpc3Q6IFsndG9vbC1uYW1lJ10sXHJcbiAgICAgIGF0dHJzOiB7IFwiZm9yXCI6IHRvb2wubmFtZSB9LFxyXG4gICAgICB0ZXh0Q29udGVudDogdG9vbC5uYW1lXHJcbiAgICB9KTtcclxuICAgIGRpdi5hcHBlbmRDaGlsZChsYWJlbCk7XHJcblxyXG4gICAgY29uc3QgdG9vbE5vZGUgPSBjcmVhdGVUb29sTm9kZSh0b29sKTtcclxuICAgIGRpdi5hcHBlbmRDaGlsZCh0b29sTm9kZSk7XHJcblxyXG4gICAgZnJhZ21lbnQuYXBwZW5kQ2hpbGQoZGl2KTtcclxuICB9KTtcclxuXHJcbiAgJHRvb2xzLmlubmVySFRNTCA9IFwiXCI7XHJcbiAgJHRvb2xzLmFwcGVuZENoaWxkKGZyYWdtZW50KTtcclxufVxyXG5cclxuZnVuY3Rpb24gY3JlYXRlVG9vbE5vZGUodG9vbCkge1xyXG4gIHN3aXRjaCh0b29sLnR5cGUpIHtcclxuICAgIGNhc2UgdG9vbFR5cGVzLlJBTkdFOiAgIHJldHVybiBjcmVhdGVSYW5nZVRvb2wodG9vbCk7XHJcbiAgICBjYXNlIHRvb2xUeXBlcy5TV0lUQ0g6ICByZXR1cm4gY3JlYXRlU3dpdGNoVG9vbCh0b29sKTtcclxuICAgIGRlZmF1bHQ6ICAgICAgICAgICAgICAgIHJldHVybiAn0J3QtdC40LfQstC10YHRgtC90YvQuSDQv9GA0LjQsdC+0YAnO1xyXG4gIH1cclxufVxyXG5cclxuZnVuY3Rpb24gY3JlYXRlUmFuZ2VUb29sKHRvb2wpIHtcclxuICBjb25zdCBkaXZJbnB1dCA9IG5vZGVGYWN0b3J5KCdkaXYnLCB7IGNsYXNzTGlzdDogWydyYW5nZSddIH0pO1xyXG5cclxuICBjb25zdCBzcGFuTWluID0gbm9kZUZhY3RvcnkoJ3NwYW4nLCB7IHRleHRDb250ZW50OiB0b29sLm1pbiB9KTtcclxuICBkaXZJbnB1dC5hcHBlbmRDaGlsZChzcGFuTWluKVxyXG5cclxuICBjb25zdCBpbnB1dCA9IG5vZGVGYWN0b3J5KCdpbnB1dCcsIHtcclxuICAgIGF0dHJzOiB7XHJcbiAgICAgICdkYXRhLWlkJzogdG9vbC5pZCxcclxuICAgICAgJ2RhdGEtdHlwZSc6ICdyYW5nZScsXHJcbiAgICAgICduYW1lJzogdG9vbC5uYW1lLFxyXG4gICAgICAndHlwZSc6ICdyYW5nZScsXHJcbiAgICAgICdtaW4nOiB0b29sLm1pbixcclxuICAgICAgJ21heCc6IHRvb2wubWF4XHJcbiAgICB9XHJcbiAgfSk7XHJcbiAgZGl2SW5wdXQuYXBwZW5kQ2hpbGQoaW5wdXQpO1xyXG5cclxuICBjb25zdCBzcGFuTWF4ID0gbm9kZUZhY3RvcnkoJ3NwYW4nLCB7IHRleHRDb250ZW50OiB0b29sLm1heCB9KTtcclxuICBkaXZJbnB1dC5hcHBlbmRDaGlsZChzcGFuTWF4KTtcclxuXHJcbiAgY29uc3QgZGl2Q3VycmVudCA9IG5vZGVGYWN0b3J5KCdkaXYnLCB7IGNsYXNzTGlzdDogWydyYW5nZS1jdXJyZW50LXZhbHVlJ10gfSk7XHJcbiAgY29uc3Qgc3BhbkN1cnJlbnQgPSBub2RlRmFjdG9yeSgnc3BhbicsIHsgdGV4dENvbnRlbnQ6IGlucHV0LnZhbHVlIH0pO1xyXG4gIGRpdkN1cnJlbnQuYXBwZW5kQ2hpbGQoc3BhbkN1cnJlbnQpO1xyXG5cclxuICBpbnB1dC5hZGRFdmVudExpc3RlbmVyKCdpbnB1dCcsIChldnQpID0+IHtcclxuICAgIHNwYW5DdXJyZW50LnRleHRDb250ZW50ID0gZXZ0LnRhcmdldC52YWx1ZTtcclxuICB9KTtcclxuXHJcbiAgY29uc3QgZnJhZ21lbnQgPSBkb2N1bWVudC5jcmVhdGVEb2N1bWVudEZyYWdtZW50KCk7XHJcbiAgZnJhZ21lbnQuYXBwZW5kQ2hpbGQoZGl2SW5wdXQpO1xyXG4gIGZyYWdtZW50LmFwcGVuZENoaWxkKGRpdkN1cnJlbnQpO1xyXG5cclxuICByZXR1cm4gZnJhZ21lbnQ7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGNyZWF0ZVN3aXRjaFRvb2wodG9vbCkge1xyXG4gIGNvbnN0IGxhYmVsID0gbm9kZUZhY3RvcnkoJ2xhYmVsJywgeyBjbGFzc0xpc3Q6IFsnc3dpdGNoJ10gfSk7XHJcblxyXG4gIGNvbnN0IGlucHV0ID0gbm9kZUZhY3RvcnkoJ2lucHV0Jywge1xyXG4gICAgYXR0cnM6IHtcclxuICAgICAgJ2RhdGEtaWQnOiB0b29sLmlkLFxyXG4gICAgICAnZGF0YS10eXBlJzogJ3N3aXRjaCcsXHJcbiAgICAgICd0eXBlJzogJ2NoZWNrYm94J1xyXG4gICAgfVxyXG4gIH0pO1xyXG4gIGxhYmVsLmFwcGVuZENoaWxkKGlucHV0KTtcclxuXHJcbiAgY29uc3QgZGl2ID0gbm9kZUZhY3RvcnkoJ2RpdicsIHsgY2xhc3NMaXN0OiBbJ3NsaWRlciddIH0pO1xyXG4gIGxhYmVsLmFwcGVuZENoaWxkKGRpdik7XHJcblxyXG4gIHJldHVybiBsYWJlbDtcclxufVxyXG5cclxuZnVuY3Rpb24gZ2V0VG9vbHNEYXRhKCkge1xyXG4gIGNvbnN0IHRvb2xzRGF0YSA9IFtdO1xyXG4gIGNvbnN0IGlucHV0cyA9ICR0b29scy5xdWVyeVNlbGVjdG9yQWxsKCdpbnB1dFtkYXRhLWlkXScpO1xyXG4gIGlucHV0cy5mb3JFYWNoKGlucHV0ID0+IHtcclxuICAgIGNvbnN0IHsgaWQsIHR5cGUgfSA9IGlucHV0LmRhdGFzZXQ7XHJcbiAgICBsZXQgdmFsdWU7XHJcbiAgICBzd2l0Y2godHlwZSkge1xyXG4gICAgICBjYXNlIHRvb2xUeXBlcy5SQU5HRTogdmFsdWUgPSBwYXJzZUludChpbnB1dC52YWx1ZSk7IGJyZWFrO1xyXG4gICAgICBjYXNlIHRvb2xUeXBlcy5TV0lUQ0g6IHZhbHVlID0gaW5wdXQuY2hlY2tlZDsgYnJlYWs7XHJcbiAgICAgIGRlZmF1bHQ6IHRocm93IG5ldyBFcnJvcihg0J3QtdC60L7RgNGA0LXQutGC0L3Ri9C5INGC0LjQvyDQv9GA0LjQsdC+0YDQsC4gSUQ6ICR7aWR9YCk7XHJcbiAgICB9XHJcbiAgICB0b29sc0RhdGEucHVzaCh7IGlkLCB2YWx1ZSB9KTtcclxuICB9KTtcclxuICByZXR1cm4gdG9vbHNEYXRhO1xyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCB7XHJcbiAgaW5pdCxcclxuICBnZXRUb29sc0RhdGFcclxufTtcclxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vbGVhcm5pbmcvc2NlbmVfY29tcG9uZW50cy90b29scy5qcyIsImltcG9ydCBub2RlRmFjdG9yeSBmcm9tICcuL25vZGVGYWN0b3J5JztcclxuXHJcbmZ1bmN0aW9uIG1zVG9Db250ZW50KG1zKSB7XHJcbiAgY29uc3Qgc2Vjb25kcyA9IE1hdGgucm91bmQobXMgLyAxMDAwKTtcclxuICBjb25zdCBtaW5zID0gTWF0aC5mbG9vcihzZWNvbmRzIC8gNjApO1xyXG4gIGNvbnN0IHNlY29uZHNMZWZ0ID0gc2Vjb25kcyAtIChtaW5zICogNjApO1xyXG5cclxuICByZXR1cm4gYCR7bWluc306JHtzZWNvbmRzTGVmdCA+PSAxMCA/ICcnIDogJzAnfSR7c2Vjb25kc0xlZnR9YDtcclxufVxyXG5cclxuY29uc3QgdGltZXIgPSB7XHJcbiAgc3RhcnRUaW1lOiBudWxsLFxyXG4gIGludGVydmFsOiBudWxsLFxyXG4gIG5vZGU6IG5vZGVGYWN0b3J5KCdzcGFuJywgeyBjbGFzc0xpc3Q6IFsndGltZXInXSwgdGV4dENvbnRlbnQ6ICcwOjAwJyB9KSxcclxuICBzdGFydDogZnVuY3Rpb24oKSB7XHJcbiAgICB0aGlzLnN0YXJ0VGltZSA9IERhdGUubm93KCk7XHJcbiAgICB0aGlzLmludGVydmFsID0gc2V0SW50ZXJ2YWwoKCkgPT4ge1xyXG4gICAgICBjb25zdCBlbGFwc2VkID0gRGF0ZS5ub3coKSAtIHRoaXMuc3RhcnRUaW1lO1xyXG4gICAgICB0aGlzLm5vZGUudGV4dENvbnRlbnQgPSBtc1RvQ29udGVudChlbGFwc2VkKTtcclxuICAgIH0sIDEwMDApO1xyXG4gIH0sXHJcbiAgc3RvcDogZnVuY3Rpb24oKSB7XHJcbiAgICBpZiAoIXRoaXMuc3RhcnRUaW1lKSB7IHJldHVybjsgfVxyXG4gICAgdGhpcy5zdGFydFRpbWUgPSBudWxsO1xyXG4gICAgY2xlYXJJbnRlcnZhbCh0aGlzLmludGVydmFsKTtcclxuICAgIHRoaXMubm9kZS50ZXh0Q29udGVudCA9ICcwOjAwJztcclxuICB9XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IHRpbWVyO1xyXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi91dGlscy90aW1lci5qcyIsImltcG9ydCAnLi4vLi4vc2Fzcy9sZWFybmluZy5zY3NzJztcclxuXHJcbmltcG9ydCBwdWJzdWIgZnJvbSAnLi4vdXRpbHMvcHVic3ViJztcclxuaW1wb3J0IGFqYXggZnJvbSAnLi4vdXRpbHMvYWpheCc7XHJcbmltcG9ydCBzY2VuZSBmcm9tICcuL3NjZW5lJztcclxuaW1wb3J0IE1vZGVsIGZyb20gJy4vbW9kZWwnO1xyXG5cclxuLyoqXHJcbiAqIExvYWQgbW9kZWwgd2l0aCBnaXZlbiBpZFxyXG4gKi9cclxuZnVuY3Rpb24gbG9hZE1vZGVsKGlkKSB7XHJcbiAgcmV0dXJuIGFqYXgoYC9tb2RlbHMvJHtpZH1gKS50aGVuKHJlc3BvbnNlID0+IEpTT04ucGFyc2UocmVzcG9uc2UpKTtcclxufVxyXG5cclxuLyoqXHJcbiAqIFVJIGJ1dHRvbidzIGhhbmRsZXJzXHJcbiAqL1xyXG5jb25zdCAkc2VsZWN0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNtb2RlbC1zZWxlY3RcIik7XHJcbmNvbnN0ICRsb2FkQnV0dG9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2xvYWQtbW9kZWwtYnRuJyk7XHJcbmxldCBtb2RlbCA9IG51bGw7XHJcbiRsb2FkQnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xyXG4gIGlmICggbW9kZWwgKSB7IG1vZGVsLnN0b3AoKTsgfVxyXG4gIGNvbnN0IG1vZGVsSWQgPSAkc2VsZWN0LnZhbHVlO1xyXG4gIGxvYWRNb2RlbChtb2RlbElkKVxyXG4gICAgLnRoZW4ocmVzcG9uc2UgPT4ge1xyXG4gICAgICBtb2RlbCA9IG5ldyBNb2RlbChyZXNwb25zZSk7XHJcbiAgICAgIHNjZW5lLmluaXQobW9kZWwsIHJlc3BvbnNlKVxyXG4gICAgICAgIC5zaG93Q29udGVudCgpXHJcbiAgICAgICAgLmVuYWJsZUJ1dHRvbnMoJHN0YXJ0QnV0dG9uKVxyXG4gICAgICAgIC5kaXNhYmxlQnV0dG9ucygkc3RvcEJ1dHRvbiwgJHJ1bkJ1dHRvbik7XHJcbiAgICB9KVxyXG4gICAgLmNhdGNoKGVyciA9PiB7IGNvbnNvbGUuZXJyb3IoZXJyKSB9KTtcclxufSk7XHJcbi8vXHJcbmNvbnN0ICRzdGFydEJ1dHRvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNzdGFydC1idG4nKTtcclxuJHN0YXJ0QnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xyXG4gIG1vZGVsLnN0YXJ0KCk7XHJcbiAgc2NlbmUuZGlzYWJsZUJ1dHRvbnMoJHN0YXJ0QnV0dG9uKTtcclxuICBzY2VuZS5lbmFibGVCdXR0b25zKCRzdG9wQnV0dG9uLCAkcnVuQnV0dG9uKTtcclxufSk7XHJcblxyXG5jb25zdCAkc3RvcEJ1dHRvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNzdG9wLWJ0bicpO1xyXG4kc3RvcEJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcclxuICBtb2RlbC5zdG9wKCk7XHJcbiAgc2NlbmUuZW5hYmxlQnV0dG9ucygkc3RhcnRCdXR0b24pO1xyXG4gIHNjZW5lLmRpc2FibGVCdXR0b25zKCRzdG9wQnV0dG9uLCAkcnVuQnV0dG9uKTtcclxufSk7XHJcblxyXG5jb25zdCAkcnVuQnV0dG9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3J1bi1idG4nKTtcclxuJHJ1bkJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcclxuICBjb25zdCB0b29sc0RhdGEgPSBzY2VuZS5nZXRUb29sc0RhdGEoKTtcclxuICBwdWJzdWIucHVibGlzaCgndXNlcl9pbnB1dCcsIHRvb2xzRGF0YSk7XHJcbn0pO1xyXG5cclxuLyoqXHJcbiAqIEhhbmRsZSBjdXN0b20gZXZlbnRzIGhlcmUgKHVzZXIgaW5wdXQsIHByb2dyYW1tIG1lc3NhZ2VzIGV0Yy4pXHJcbiAqL1xyXG5wdWJzdWIuc3Vic2NyaWJlKCduZXdfc3RhdGUnLCBzdGF0ZSA9PiB7XHJcbiAgc2NlbmUuaGlkZUV2ZW50KCk7XHJcbiAgc2NlbmUuc2V0U3RhdGUoc3RhdGUpO1xyXG59KTtcclxucHVic3ViLnN1YnNjcmliZSgnZXZlbnQnLCBldmVudCA9PiBzY2VuZS5zaG93RXZlbnQoZXZlbnQpKTtcclxuXHJcbi8vIC8qKlxyXG4vLyAqIFRpbWVyIChjdXJyZW50bHkgZm9yIGRldiBtb2RlIG9ubHkpXHJcbi8vICovXHJcbi8vIGltcG9ydCB0aW1lciBmcm9tICcuLi91dGlscy90aW1lcic7XHJcbi8vIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5oZWFkZXInKS5hcHBlbmRDaGlsZCh0aW1lci5ub2RlKTtcclxuLy8gcHVic3ViLnN1YnNjcmliZSgnbmV3X3N0YXRlJywgc3RhdGUgPT4gdGltZXIuc3RvcCgpKTtcclxuLy8gcHVic3ViLnN1YnNjcmliZSgnZXZlbnQnLCBldmVudCA9PiB0aW1lci5zdGFydCgpKTtcclxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vbGVhcm5pbmcvaW5kZXguanMiXSwic291cmNlUm9vdCI6IiJ9