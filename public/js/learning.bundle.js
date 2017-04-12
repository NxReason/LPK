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
/******/ 	return __webpack_require__(__webpack_require__.s = 24);
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
function ajax() {
  var path = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var fullResponse = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

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
          if (fullResponse) {
            resolve(xhr);
          } else {
            resolve(xhr.responseText);
          }
        } else {
          reject(xhr.statusText);
        }
      }
    };
  });
}

function setXHRHeaders(xhr, headers) {
  for (var header in headers) {
    xhr.setRequestHeader(header, headers[header]);
  }
}

exports.default = ajax;

/***/ }),
/* 2 */
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
/* 3 */,
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _state = __webpack_require__(17);

var _state2 = _interopRequireDefault(_state);

var _pubsub = __webpack_require__(2);

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
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _state = __webpack_require__(18);

var _state2 = _interopRequireDefault(_state);

var _tools = __webpack_require__(19);

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
/* 6 */,
/* 7 */,
/* 8 */,
/* 9 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 10 */,
/* 11 */,
/* 12 */,
/* 13 */,
/* 14 */,
/* 15 */
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
/* 16 */
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
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _event = __webpack_require__(16);

var _event2 = _interopRequireDefault(_event);

var _action = __webpack_require__(15);

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
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _nodeFactory = __webpack_require__(0);

var _nodeFactory2 = _interopRequireDefault(_nodeFactory);

var _timer = __webpack_require__(21);

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
/* 19 */
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
/* 20 */,
/* 21 */
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
/* 22 */,
/* 23 */,
/* 24 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


__webpack_require__(9);

var _pubsub = __webpack_require__(2);

var _pubsub2 = _interopRequireDefault(_pubsub);

var _ajax = __webpack_require__(1);

var _ajax2 = _interopRequireDefault(_ajax);

var _scene = __webpack_require__(5);

var _scene2 = _interopRequireDefault(_scene);

var _model = __webpack_require__(4);

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgNGU5Y2RmYTM0YjA5Yzc2YTc2MjYiLCJ3ZWJwYWNrOi8vLy4vdXRpbHMvbm9kZUZhY3RvcnkuanMiLCJ3ZWJwYWNrOi8vLy4vdXRpbHMvYWpheC5qcyIsIndlYnBhY2s6Ly8vLi91dGlscy9wdWJzdWIuanMiLCJ3ZWJwYWNrOi8vLy4vbGVhcm5pbmcvbW9kZWwuanMiLCJ3ZWJwYWNrOi8vLy4vbGVhcm5pbmcvc2NlbmUuanMiLCJ3ZWJwYWNrOi8vLy4uL3Nhc3MvbGVhcm5pbmcuc2NzcyIsIndlYnBhY2s6Ly8vLi9sZWFybmluZy9tb2RlbF9jb21wb25lbnRzL2FjdGlvbi5qcyIsIndlYnBhY2s6Ly8vLi9sZWFybmluZy9tb2RlbF9jb21wb25lbnRzL2V2ZW50LmpzIiwid2VicGFjazovLy8uL2xlYXJuaW5nL21vZGVsX2NvbXBvbmVudHMvc3RhdGUuanMiLCJ3ZWJwYWNrOi8vLy4vbGVhcm5pbmcvc2NlbmVfY29tcG9uZW50cy9zdGF0ZS5qcyIsIndlYnBhY2s6Ly8vLi9sZWFybmluZy9zY2VuZV9jb21wb25lbnRzL3Rvb2xzLmpzIiwid2VicGFjazovLy8uL3V0aWxzL3RpbWVyLmpzIiwid2VicGFjazovLy8uL2xlYXJuaW5nL2luZGV4LmpzIl0sIm5hbWVzIjpbIm5vZGVGYWN0b3J5IiwidHlwZSIsInBhcmFtcyIsIm5vZGUiLCJkb2N1bWVudCIsImNyZWF0ZUVsZW1lbnQiLCJhcHBlbmRDbGFzc2VzIiwiYXBwZW5kQXR0cnMiLCJpbnNlcnRUZXh0Q29udGVudCIsImNsYXNzTGlzdCIsImZvckVhY2giLCJhZGQiLCJjbGFzc05hbWUiLCJhdHRycyIsImF0dHJOYW1lcyIsIk9iamVjdCIsImtleXMiLCJzZXRBdHRyaWJ1dGUiLCJhdHRyTmFtZSIsInRleHRDb250ZW50IiwiYWpheCIsInBhdGgiLCJvcHRpb25zIiwiZnVsbFJlc3BvbnNlIiwieGhyIiwiWE1MSHR0cFJlcXVlc3QiLCJvcGVuIiwibWV0aG9kIiwiaGVhZGVycyIsInNldFhIUkhlYWRlcnMiLCJzZW5kIiwiZGF0YSIsIlByb21pc2UiLCJyZXNvbHZlIiwicmVqZWN0Iiwib25yZWFkeXN0YXRlY2hhbmdlIiwicmVhZHlTdGF0ZSIsInN0YXR1cyIsInJlc3BvbnNlVGV4dCIsInN0YXR1c1RleHQiLCJoZWFkZXIiLCJzZXRSZXF1ZXN0SGVhZGVyIiwicHVic3ViIiwidG9waWNzIiwic3Vic2NyaWJlIiwidG9waWMiLCJsaXN0ZW5lciIsInF1ZXVlIiwiaW5kZXgiLCJwdXNoIiwicmVtb3ZlIiwicHVibGlzaCIsImluZm8iLCJsZW5ndGgiLCJpdGVtcyIsIml0ZW0iLCJJTklUSUFMX1NUQVRFX05BTUUiLCJTVE9QX1NUQVRFX05BTUUiLCJNb2RlbCIsImlkIiwibmFtZSIsImJyZWFrVGltZSIsInN0ZXBzIiwic3RhdGVzIiwibWFwIiwic3RhdGUiLCJpbml0aWFsU3RhdGUiLCJjdXJyZW50U3RhdGUiLCJnZXRTdGF0ZSIsInRpbWVvdXQiLCJzdWJJbnB1dCIsInN1YlN0b3AiLCJzdGFydFN0YXRlIiwiaW1nIiwibGFzdCIsInN0b3BTdGF0ZSIsImZpbmQiLCJpbnRlcnZhbHMiLCJpIiwidGhlbiIsIm1ha2VCcmVhayIsImhhbmRsZUV2ZW50IiwiaGFuZGxlTmV3U3RhdGUiLCJjYXRjaCIsInNldFRpbWVvdXQiLCJjbGVhclN1YnMiLCJldmVudCIsImV2ZW50U3RhcnRUaW1lIiwiRGF0ZSIsIm5vdyIsInRpbWVTcGVudCIsIm5leHRTdGF0ZUlkIiwiaGFuZGxlSW5wdXQiLCJuZXh0U3RhdGUiLCJpbmFjdGl2ZVRpbWUiLCJnZXRJbmFjdGl2ZVRpbWUiLCJnZXRJbmFjdGl2ZUFjdGlvbiIsImNsZWFyVGltZW91dCIsImV4cG9ydHMiLCIkbW9kZWxOYW1lIiwicXVlcnlTZWxlY3RvciIsImluaXQiLCJtb2RlbCIsInJlc3BvbnNlIiwic2V0IiwidG9vbHMiLCIkY29udGVudCIsInNob3dDb250ZW50Iiwic2V0Q29udGVudERpc3BsYXkiLCJoaWRlQ29udGVudCIsImRpc3BsYXkiLCJzdHlsZSIsImVuYWJsZUJ1dHRvbnMiLCJidXR0b25zIiwic2V0QnV0dG9uc1N0YXRlIiwiZGlzYWJsZUJ1dHRvbnMiLCJ2YWx1ZSIsImJ1dHRvbiIsImRpc2FibGVkIiwiZ2V0VG9vbHNEYXRhIiwic2V0U3RhdGUiLCJzdGF0ZURhdGEiLCJzaG93RXZlbnQiLCJldmVudERhdGEiLCJoaWRlRXZlbnQiLCJBY3Rpb24iLCJtaW5UaW1lIiwibWF4VGltZSIsImluYWN0aXZlIiwiaW5pdFRvb2xzIiwidGltZSIsInJpZ2h0VGltZSIsInJpZ2h0RGF0YSIsImV2ZXJ5IiwiY2hlY2tUb29sIiwib2JqIiwidG9vbCIsImJvb2xWYWx1ZSIsImluY2x1ZGVzVmFsdWUiLCJtaW5WYWx1ZSIsIm1heFZhbHVlIiwiYm9yZGVycyIsIlR5cGVFcnJvciIsIkFjdGlvblRvb2wiLCJFdmVudCIsImRlc2NyaXB0aW9uIiwiU3RhdGUiLCJhY3Rpb25zIiwiYWN0aW9uIiwidGltZXMiLCJnZXRBbGxBY3Rpb25UaW1lcyIsIk1hdGgiLCJtYXgiLCJzdWl0ZWRBY3Rpb25zIiwiZmlsdGVyIiwiaXNTdWl0YWJsZSIsIiRuYW1lIiwiJGltZyIsIiRwYXJhbXMiLCIkZXZlbnQiLCIkZXZlbnRIZWFkZXIiLCIkZXZlbnRCb2R5IiwiJHRpbWVyQ29udGFpbmVyIiwiYXBwZW5kQ2hpbGQiLCJzZXRQYXJhbWV0ZXJzIiwiZnJhZyIsImNyZWF0ZURvY3VtZW50RnJhZ21lbnQiLCJjcmVhdGVQYXJhbWV0ZU5vZGUiLCJwYXJhbSIsImlubmVySFRNTCIsImtleSIsImRpdiIsImtleVNwYW4iLCJ2YWx1ZVNwYW4iLCJzaG93VGltZXIiLCJoaWRlVGltZXIiLCJzdGFydCIsInN0b3AiLCJ0b29sVHlwZXMiLCJSQU5HRSIsIlNXSVRDSCIsIiR0b29scyIsImZyYWdtZW50IiwibGFiZWwiLCJ0b29sTm9kZSIsImNyZWF0ZVRvb2xOb2RlIiwiY3JlYXRlUmFuZ2VUb29sIiwiY3JlYXRlU3dpdGNoVG9vbCIsImRpdklucHV0Iiwic3Bhbk1pbiIsIm1pbiIsImlucHV0Iiwic3Bhbk1heCIsImRpdkN1cnJlbnQiLCJzcGFuQ3VycmVudCIsImFkZEV2ZW50TGlzdGVuZXIiLCJldnQiLCJ0YXJnZXQiLCJ0b29sc0RhdGEiLCJpbnB1dHMiLCJxdWVyeVNlbGVjdG9yQWxsIiwiZGF0YXNldCIsInBhcnNlSW50IiwiY2hlY2tlZCIsIkVycm9yIiwibXNUb0NvbnRlbnQiLCJtcyIsInNlY29uZHMiLCJyb3VuZCIsIm1pbnMiLCJmbG9vciIsInNlY29uZHNMZWZ0IiwidGltZXIiLCJzdGFydFRpbWUiLCJpbnRlcnZhbCIsInNldEludGVydmFsIiwiZWxhcHNlZCIsImNsZWFySW50ZXJ2YWwiLCJsb2FkTW9kZWwiLCJKU09OIiwicGFyc2UiLCIkc2VsZWN0IiwiJGxvYWRCdXR0b24iLCJtb2RlbElkIiwiJHN0YXJ0QnV0dG9uIiwiJHN0b3BCdXR0b24iLCIkcnVuQnV0dG9uIiwiY29uc29sZSIsImVycm9yIiwiZXJyIl0sIm1hcHBpbmdzIjoiO0FBQUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0EsbURBQTJDLGNBQWM7O0FBRXpEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBSztBQUNMO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsbUNBQTJCLDBCQUEwQixFQUFFO0FBQ3ZELHlDQUFpQyxlQUFlO0FBQ2hEO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLDhEQUFzRCwrREFBK0Q7O0FBRXJIO0FBQ0E7O0FBRUE7QUFDQTs7Ozs7Ozs7Ozs7OztBQ2hFQSxJQUFNQSxjQUFjLFNBQWRBLFdBQWMsR0FBb0M7QUFBQSxNQUEzQkMsSUFBMkIsdUVBQXBCLEtBQW9CO0FBQUEsTUFBYkMsTUFBYSx1RUFBSixFQUFJOztBQUN0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QUFDQTtBQUNBO0FBQ0E7QUFDQSxxRCIsImZpbGUiOiJsZWFybmluZy5idW5kbGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSlcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcblxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gaWRlbnRpdHkgZnVuY3Rpb24gZm9yIGNhbGxpbmcgaGFybW9ueSBpbXBvcnRzIHdpdGggdGhlIGNvcnJlY3QgY29udGV4dFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5pID0gZnVuY3Rpb24odmFsdWUpIHsgcmV0dXJuIHZhbHVlOyB9O1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHtcbiBcdFx0XHRcdGNvbmZpZ3VyYWJsZTogZmFsc2UsXG4gXHRcdFx0XHRlbnVtZXJhYmxlOiB0cnVlLFxuIFx0XHRcdFx0Z2V0OiBnZXR0ZXJcbiBcdFx0XHR9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSAyNCk7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gd2VicGFjay9ib290c3RyYXAgNGU5Y2RmYTM0YjA5Yzc2YTc2MjYiLCJjb25zdCBub2RlRmFjdG9yeSA9IGZ1bmN0aW9uKHR5cGUgPSAnZGl2JywgcGFyYW1zID0ge30pIHtcclxuICBjb25zdCBub2RlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCh0eXBlKTtcclxuXHJcbiAgYXBwZW5kQ2xhc3Nlcyhub2RlLCBwYXJhbXMpO1xyXG4gIGFwcGVuZEF0dHJzKG5vZGUsIHBhcmFtcyk7XHJcbiAgaW5zZXJ0VGV4dENvbnRlbnQobm9kZSwgcGFyYW1zKTtcclxuXHJcbiAgcmV0dXJuIG5vZGU7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGFwcGVuZENsYXNzZXMobm9kZSwgeyBjbGFzc0xpc3QgfSkge1xyXG4gIGlmIChjbGFzc0xpc3QgJiYgY2xhc3NMaXN0LmZvckVhY2gpIHtcclxuICAgIGNsYXNzTGlzdC5mb3JFYWNoKGNsYXNzTmFtZSA9PiBub2RlLmNsYXNzTGlzdC5hZGQoY2xhc3NOYW1lKSk7XHJcbiAgfVxyXG59XHJcblxyXG5mdW5jdGlvbiBhcHBlbmRBdHRycyhub2RlLCB7IGF0dHJzIH0pIHtcclxuICBpZiAoYXR0cnMpIHtcclxuICAgIGNvbnN0IGF0dHJOYW1lcyA9IE9iamVjdC5rZXlzKGF0dHJzKTtcclxuICAgIGF0dHJOYW1lcy5mb3JFYWNoKGF0dHJOYW1lID0+IG5vZGUuc2V0QXR0cmlidXRlKGF0dHJOYW1lLCBhdHRyc1thdHRyTmFtZV0pKTtcclxuICB9XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGluc2VydFRleHRDb250ZW50KG5vZGUsIHsgdGV4dENvbnRlbnQgPSBcIlwiIH0pIHtcclxuICBub2RlLnRleHRDb250ZW50ID0gdGV4dENvbnRlbnQ7XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IG5vZGVGYWN0b3J5O1xyXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi91dGlscy9ub2RlRmFjdG9yeS5qcyIsImZ1bmN0aW9uIGFqYXgocGF0aCA9ICcnLCBvcHRpb25zID0ge30sIGZ1bGxSZXNwb25zZSA9IGZhbHNlKSB7XHJcbiAgY29uc3QgeGhyID0gbmV3IFhNTEh0dHBSZXF1ZXN0KCk7XHJcbiAgeGhyLm9wZW4ob3B0aW9ucy5tZXRob2QgfHwgJ0dFVCcsIHBhdGgsIHRydWUpO1xyXG4gIGlmIChvcHRpb25zLmhlYWRlcnMpIHsgc2V0WEhSSGVhZGVycyh4aHIsIG9wdGlvbnMuaGVhZGVycyk7IH1cclxuICB4aHIuc2VuZChvcHRpb25zLmRhdGEpO1xyXG5cclxuICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xyXG4gICAgeGhyLm9ucmVhZHlzdGF0ZWNoYW5nZSA9IGZ1bmN0aW9uKCkge1xyXG4gICAgICBpZih4aHIucmVhZHlTdGF0ZSA9PSA0KSB7XHJcbiAgICAgICAgaWYoeGhyLnN0YXR1cyA9PSAyMDApIHtcclxuICAgICAgICAgIGlmIChmdWxsUmVzcG9uc2UpIHtcclxuICAgICAgICAgICAgcmVzb2x2ZSh4aHIpO1xyXG4gICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgcmVzb2x2ZSh4aHIucmVzcG9uc2VUZXh0KTtcclxuICAgICAgICAgIH1cclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgcmVqZWN0KHhoci5zdGF0dXNUZXh0KTtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9KVxyXG59XHJcblxyXG5mdW5jdGlvbiBzZXRYSFJIZWFkZXJzKHhociwgaGVhZGVycykge1xyXG4gIGZvciAobGV0IGhlYWRlciBpbiBoZWFkZXJzKSB7XHJcbiAgICB4aHIuc2V0UmVxdWVzdEhlYWRlcihoZWFkZXIsIGhlYWRlcnNbaGVhZGVyXSk7XHJcbiAgfVxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBhamF4O1xyXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi91dGlscy9hamF4LmpzIiwiY29uc3QgcHVic3ViID0gKGZ1bmN0aW9uKCkge1xyXG5cclxuICBjb25zdCB0b3BpY3MgPSB7fTtcclxuXHJcbiAgcmV0dXJuIHtcclxuICAgIHN1YnNjcmliZTogZnVuY3Rpb24odG9waWMsIGxpc3RlbmVyKSB7XHJcbiAgICAgIGlmICghdG9waWNzW3RvcGljXSkgdG9waWNzW3RvcGljXSA9IHsgcXVldWU6IFtdIH07XHJcblxyXG4gICAgICBjb25zdCBpbmRleCA9IHRvcGljc1t0b3BpY10ucXVldWUucHVzaChsaXN0ZW5lcikgLSAxO1xyXG4gICAgICAvLyBmdW5jdGlvbiB0byBkZWxldGUgdG9waWNcclxuICAgICAgcmV0dXJuIHtcclxuICAgICAgICByZW1vdmU6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgZGVsZXRlIHRvcGljc1t0b3BpY10ucXVldWVbaW5kZXhdO1xyXG4gICAgICAgIH1cclxuICAgICAgfTtcclxuICAgIH0sXHJcblxyXG4gICAgcHVibGlzaDogZnVuY3Rpb24odG9waWMsIGluZm8pIHtcclxuICAgICAgLy8gbm8gdGhlbWUgb3Igbm8gbGlzdGVuZXJzXHJcbiAgICAgIGlmICghdG9waWNzW3RvcGljXSB8fCAhdG9waWNzW3RvcGljXS5xdWV1ZS5sZW5ndGgpIHJldHVybjtcclxuXHJcbiAgICAgIGNvbnN0IGl0ZW1zID0gdG9waWNzW3RvcGljXS5xdWV1ZTtcclxuICAgICAgaXRlbXMuZm9yRWFjaChpdGVtID0+IHtcclxuICAgICAgICBpdGVtKGluZm8gfHwge30pO1xyXG4gICAgICB9KTtcclxuICAgIH1cclxuICB9O1xyXG59KSgpO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgcHVic3ViO1xyXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi91dGlscy9wdWJzdWIuanMiLCJpbXBvcnQgU3RhdGUgZnJvbSAnLi9tb2RlbF9jb21wb25lbnRzL3N0YXRlJztcclxuaW1wb3J0IHB1YnN1YiBmcm9tICcuLi91dGlscy9wdWJzdWInO1xyXG5cclxuY29uc3QgSU5JVElBTF9TVEFURV9OQU1FID0gJ9Ch0L7RgdGC0L7Rj9C90LjQtSDQvNC+0LTQtdC70LgnO1xyXG5jb25zdCBTVE9QX1NUQVRFX05BTUUgPSAn0J7QsdGD0YfQtdC90LjQtSDQvtGB0YLQsNC90L7QstC70LXQvdC+JztcclxuXHJcbmNsYXNzIE1vZGVsIHtcclxuICBjb25zdHJ1Y3RvcihkYXRhKSB7XHJcbiAgICB0aGlzLmlkID0gZGF0YS5pZDtcclxuICAgIHRoaXMubmFtZSA9IGRhdGEubmFtZTtcclxuICAgIHRoaXMuYnJlYWtUaW1lID0gZGF0YS5icmVha1RpbWU7XHJcbiAgICB0aGlzLnN0ZXBzID0gZGF0YS5zdGVwcztcclxuXHJcbiAgICB0aGlzLnN0YXRlcyA9IGRhdGEuc3RhdGVzLm1hcChzdGF0ZSA9PiBuZXcgU3RhdGUoc3RhdGUpKTtcclxuICAgIHRoaXMuaW5pdGlhbFN0YXRlID0gZGF0YS5pbml0aWFsU3RhdGU7XHJcbiAgICB0aGlzLmN1cnJlbnRTdGF0ZSA9IHRoaXMuZ2V0U3RhdGUodGhpcy5pbml0aWFsU3RhdGUpO1xyXG5cclxuICAgIHRoaXMudGltZW91dCA9IG51bGw7XHJcbiAgICB0aGlzLnN1YklucHV0ID0gbnVsbDtcclxuICAgIHRoaXMuc3ViU3RvcCA9IG51bGw7XHJcbiAgICB0aGlzLnN0YXJ0U3RhdGUgPSBuZXcgU3RhdGUoeyBpZDogMCwgbmFtZTogSU5JVElBTF9TVEFURV9OQU1FLCBpbWc6ICdpbWcvc3RhcnQucG5nJywgbGFzdDogdHJ1ZSB9KTtcclxuICAgIHRoaXMuc3RvcFN0YXRlID0gbmV3IFN0YXRlKHsgaWQ6IC0xLCBuYW1lOiBTVE9QX1NUQVRFX05BTUUsIGltZzogJ2ltZy9zdG9wLnBuZycsIGxhc3Q6IHRydWUgfSk7XHJcbiAgfVxyXG5cclxuICBnZXRTdGF0ZShpZCkge1xyXG4gICAgcmV0dXJuIHRoaXMuc3RhdGVzLmZpbmQoc3RhdGUgPT4gc3RhdGUuaWQgPT0gaWQpO1xyXG4gIH1cclxuXHJcbiAgc3RhcnQoKSB7XHJcbiAgICB0aGlzLmN1cnJlbnRTdGF0ZSA9IHRoaXMuZ2V0U3RhdGUodGhpcy5pbml0aWFsU3RhdGUpO1xyXG4gICAgcHVic3ViLnB1Ymxpc2goJ25ld19zdGF0ZScsIHRoaXMuY3VycmVudFN0YXRlKTtcclxuICAgIGxldCBpbnRlcnZhbHMgPSBQcm9taXNlLnJlc29sdmUoKTsgLy8gaW5pdCBwcm9taXNlIGNoYWluXHJcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMuc3RlcHM7IGkrKykge1xyXG4gICAgICBpbnRlcnZhbHMgPSBpbnRlcnZhbHNcclxuICAgICAgIC50aGVuKCgpID0+IHsgcmV0dXJuIHRoaXMubWFrZUJyZWFrKCkgfSlcclxuICAgICAgIC50aGVuKCgpID0+IHsgcmV0dXJuIHRoaXMuaGFuZGxlRXZlbnQoKSB9KVxyXG4gICAgICAgLnRoZW4oc3RhdGUgPT4geyB0aGlzLmhhbmRsZU5ld1N0YXRlKHN0YXRlKSB9KVxyXG4gICAgfVxyXG4gICAgaW50ZXJ2YWxzLmNhdGNoKHN0YXRlID0+IHRoaXMuaGFuZGxlTmV3U3RhdGUoc3RhdGUpKTtcclxuICAgIHJldHVybiBpbnRlcnZhbHM7XHJcbiAgfVxyXG5cclxuICBtYWtlQnJlYWsoKSB7XHJcbiAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xyXG4gICAgICB0aGlzLnN1YlN0b3AgPSBwdWJzdWIuc3Vic2NyaWJlKCdtb2RlbF9zdG9wJywgKCkgPT4geyByZWplY3QodGhpcy5zdG9wU3RhdGUpOyB9KVxyXG4gICAgICBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgICB0aGlzLmNsZWFyU3VicygpO1xyXG4gICAgICAgIHJlc29sdmUoKVxyXG4gICAgICB9LCB0aGlzLmJyZWFrVGltZSk7XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIGhhbmRsZUV2ZW50KCkge1xyXG4gICAgY29uc3QgZXZlbnQgPSB0aGlzLmN1cnJlbnRTdGF0ZS5ldmVudDtcclxuICAgIGNvbnN0IGV2ZW50U3RhcnRUaW1lID0gRGF0ZS5ub3coKTtcclxuICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XHJcbiAgICAgIC8vIHNlbmQgZGF0YSBhYm91dCBuZXcgZXZlbnQgdG8gb3RoZXIgbW9kdWxlc1xyXG4gICAgICBwdWJzdWIucHVibGlzaCgnZXZlbnQnLCBldmVudCk7XHJcblxyXG4gICAgICAvLyBsaXN0ZW4gdG8gdXNlciBhY3Rpb25cclxuICAgICAgLy8gYW5kIGlmIHVzZXIgaW5wdXQgY29ycmVjdCBnbyB0byBuZXh0IHN0YXRlXHJcbiAgICAgIHRoaXMuc3ViSW5wdXQgPSBwdWJzdWIuc3Vic2NyaWJlKCd1c2VyX2lucHV0JywgZGF0YSA9PiB7XHJcbiAgICAgICAgY29uc3QgdGltZVNwZW50ID0gRGF0ZS5ub3coKSAtIGV2ZW50U3RhcnRUaW1lO1xyXG4gICAgICAgIGNvbnN0IG5leHRTdGF0ZUlkID0gdGhpcy5jdXJyZW50U3RhdGUuaGFuZGxlSW5wdXQoZGF0YSwgdGltZVNwZW50KTtcclxuICAgICAgICBjb25zdCBuZXh0U3RhdGUgPSB0aGlzLmdldFN0YXRlKG5leHRTdGF0ZUlkKTtcclxuICAgICAgICBpZiAoIG5leHRTdGF0ZSApIHtcclxuICAgICAgICAgIG5leHRTdGF0ZS5sYXN0ID8gcmVqZWN0KG5leHRTdGF0ZSkgOiByZXNvbHZlKG5leHRTdGF0ZSk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9KTtcclxuXHJcbiAgICAgIHRoaXMuc3ViU3RvcCA9IHB1YnN1Yi5zdWJzY3JpYmUoJ21vZGVsX3N0b3AnLCAoKSA9PiB7XHJcbiAgICAgICAgcmVqZWN0KHRoaXMuc3RvcFN0YXRlKTtcclxuICAgICAgfSk7XHJcblxyXG4gICAgICAvLyBoYW5kbGUgaW5hY3RpdmVcclxuICAgICAgY29uc3QgaW5hY3RpdmVUaW1lID0gdGhpcy5jdXJyZW50U3RhdGUuZ2V0SW5hY3RpdmVUaW1lKCk7XHJcbiAgICAgIHRoaXMudGltZW91dCA9IHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgIGNvbnN0IG5leHRTdGF0ZUlkID0gdGhpcy5jdXJyZW50U3RhdGUuZ2V0SW5hY3RpdmVBY3Rpb24oKS5uZXh0U3RhdGU7XHJcbiAgICAgICAgY29uc3QgbmV4dFN0YXRlID0gdGhpcy5nZXRTdGF0ZShuZXh0U3RhdGVJZCk7XHJcbiAgICAgICAgbmV4dFN0YXRlLmxhc3QgPyByZWplY3QobmV4dFN0YXRlKSA6IHJlc29sdmUobmV4dFN0YXRlKTtcclxuICAgICAgfSwgaW5hY3RpdmVUaW1lKTtcclxuICAgIH0pXHJcbiAgfVxyXG5cclxuICBzdG9wKCkge1xyXG4gICAgcHVic3ViLnB1Ymxpc2goJ21vZGVsX3N0b3AnKTtcclxuICB9XHJcblxyXG4gIGhhbmRsZU5ld1N0YXRlKHN0YXRlKSB7XHJcbiAgICB0aGlzLmN1cnJlbnRTdGF0ZSA9IHN0YXRlO1xyXG4gICAgY2xlYXJUaW1lb3V0KHRoaXMudGltZW91dCk7XHJcbiAgICB0aGlzLmNsZWFyU3VicygpO1xyXG4gICAgcHVic3ViLnB1Ymxpc2goJ25ld19zdGF0ZScsIHN0YXRlKTtcclxuICB9XHJcblxyXG4gIGNsZWFyU3VicygpIHtcclxuICAgIGlmICh0aGlzLnN1YklucHV0KSB7XHJcbiAgICAgIHRoaXMuc3ViSW5wdXQucmVtb3ZlKCk7XHJcbiAgICB9XHJcbiAgICBpZiAodGhpcy5zdWJTdG9wKSB7XHJcbiAgICAgIHRoaXMuc3ViU3RvcC5yZW1vdmUoKTtcclxuICAgIH1cclxuICB9XHJcblxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBNb2RlbDtcclxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vbGVhcm5pbmcvbW9kZWwuanMiLCJpbXBvcnQgc3RhdGUgZnJvbSAnLi9zY2VuZV9jb21wb25lbnRzL3N0YXRlJztcclxuaW1wb3J0IHRvb2xzIGZyb20gJy4vc2NlbmVfY29tcG9uZW50cy90b29scyc7XHJcblxyXG5jb25zdCBleHBvcnRzID0ge307XHJcblxyXG4vLyBTY2VuZSBtZXRhZGF0YVxyXG5jb25zdCAkbW9kZWxOYW1lID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLm1vZGVsLW5hbWUnKTtcclxuZXhwb3J0cy5pbml0ID0gZnVuY3Rpb24obW9kZWwsIHJlc3BvbnNlKSB7XHJcbiAgJG1vZGVsTmFtZS50ZXh0Q29udGVudCA9IG1vZGVsLm5hbWU7XHJcbiAgc3RhdGUuc2V0KG1vZGVsLnN0YXJ0U3RhdGUpO1xyXG4gIHRvb2xzLmluaXQocmVzcG9uc2UudG9vbHMpO1xyXG4gIHJldHVybiB0aGlzO1xyXG59XHJcblxyXG4vLyBNYW5hZ2UgY29udGVudCB2aXNpYmlsaXR5XHJcbmNvbnN0ICRjb250ZW50ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmNvbnRlbnQnKTtcclxuZXhwb3J0cy5zaG93Q29udGVudCA9IGZ1bmN0aW9uKCkge1xyXG4gIHNldENvbnRlbnREaXNwbGF5KCdmbGV4Jyk7XHJcbiAgcmV0dXJuIHRoaXM7XHJcbn1cclxuZXhwb3J0cy5oaWRlQ29udGVudCA9IGZ1bmN0aW9uKCkge1xyXG4gIHNldENvbnRlbnREaXNwbGF5KCdub25lJyk7XHJcbiAgcmV0dXJuIHRoaXM7XHJcbn1cclxuZnVuY3Rpb24gc2V0Q29udGVudERpc3BsYXkoZGlzcGxheSkge1xyXG4gICRjb250ZW50LnN0eWxlLmRpc3BsYXkgPSBkaXNwbGF5O1xyXG59XHJcblxyXG4vLyBNYW5hZ2UgYnV0dG9ucyBzdGF0ZVxyXG5leHBvcnRzLmVuYWJsZUJ1dHRvbnMgPSBmdW5jdGlvbiguLi5idXR0b25zKSB7XHJcbiAgc2V0QnV0dG9uc1N0YXRlKGJ1dHRvbnMsIGZhbHNlKTtcclxuICByZXR1cm4gdGhpcztcclxufVxyXG5leHBvcnRzLmRpc2FibGVCdXR0b25zID0gZnVuY3Rpb24oLi4uYnV0dG9ucykge1xyXG4gIHNldEJ1dHRvbnNTdGF0ZShidXR0b25zLCB0cnVlKTtcclxuICByZXR1cm4gdGhpcztcclxufVxyXG5mdW5jdGlvbiBzZXRCdXR0b25zU3RhdGUoYnV0dG9ucywgdmFsdWUpIHtcclxuICBidXR0b25zLmZvckVhY2goYnV0dG9uID0+IGJ1dHRvbi5kaXNhYmxlZCA9IHZhbHVlKTtcclxufVxyXG5cclxuLy8gRGVsZWdhdGUgcHVibGljIG1ldGhvZHMgdG8gY29tcG9uZW50c1xyXG5leHBvcnRzLmdldFRvb2xzRGF0YSA9ICgpID0+XHJcbiAgdG9vbHMuZ2V0VG9vbHNEYXRhKCk7XHJcblxyXG5leHBvcnRzLnNldFN0YXRlID0gc3RhdGVEYXRhID0+XHJcbiAgc3RhdGUuc2V0KHN0YXRlRGF0YSk7XHJcblxyXG5leHBvcnRzLnNob3dFdmVudCA9IGV2ZW50RGF0YSA9PlxyXG4gIHN0YXRlLnNob3dFdmVudChldmVudERhdGEpO1xyXG5cclxuZXhwb3J0cy5oaWRlRXZlbnQgPSAoKSA9PlxyXG4gIHN0YXRlLmhpZGVFdmVudCgpO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgZXhwb3J0cztcclxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vbGVhcm5pbmcvc2NlbmUuanMiLCIvLyByZW1vdmVkIGJ5IGV4dHJhY3QtdGV4dC13ZWJwYWNrLXBsdWdpblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4uL3Nhc3MvbGVhcm5pbmcuc2Nzc1xuLy8gbW9kdWxlIGlkID0gOVxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJjbGFzcyBBY3Rpb24ge1xyXG4gIGNvbnN0cnVjdG9yKGRhdGEpIHtcclxuICAgIHRoaXMubWluVGltZSA9IGRhdGEubWluVGltZTtcclxuICAgIHRoaXMubWF4VGltZSA9IGRhdGEubWF4VGltZTtcclxuICAgIHRoaXMubmV4dFN0YXRlID0gZGF0YS5uZXh0U3RhdGU7XHJcbiAgICBpZiAoZGF0YS5pbmFjdGl2ZSkge1xyXG4gICAgICB0aGlzLmluYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgdGhpcy50b29scyA9IFtdO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdGhpcy5pbmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICB0aGlzLnRvb2xzID0gdGhpcy5pbml0VG9vbHMoZGF0YS50b29scyk7XHJcbiAgICB9XHJcblxyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogQHBhcmFtIFt7IGlkOiBOdW1iZXIsIHZhbHVlOiBOdW1iZXIvQm9vbGVhbiB9LCB7Li4ufV1cclxuICAgKiBAcGFyYW0gTnVtYmVyXHJcbiAgICogQHJldHVybiBCb29sZWFuXHJcbiAgICovXHJcbiAgaXNTdWl0YWJsZShkYXRhLCB0aW1lKSB7XHJcbiAgICByZXR1cm4gdGhpcy5yaWdodFRpbWUodGltZSkgJiYgdGhpcy5yaWdodERhdGEoZGF0YSk7XHJcbiAgfVxyXG5cclxuICByaWdodERhdGEoZGF0YSA9IFtdKSB7XHJcbiAgICByZXR1cm4gdGhpcy50b29scy5ldmVyeSh0b29sID0+IHtcclxuICAgICAgLy8g0JXRgdC70Lgg0YHRgNC10LTQuCDQv9C+0LvRg9GH0LXQvdC90YvRhSDQuNGC0LXQvNC+0LIg0L3QtdGCLCDRgtC+0LPQviDQutC+0YLQvtGA0YvQuSDQtdGB0YLRjCDQsiDQtNCw0L3QvdC+0Lwg0Y3QutGI0LXQvdC1XHJcbiAgICAgIGNvbnN0IGNoZWNrVG9vbCA9IGRhdGEuZmluZChvYmogPT4gb2JqLmlkID09IHRvb2wuaWQpO1xyXG4gICAgICBpZiAoIWNoZWNrVG9vbCkgeyByZXR1cm4gZmFsc2U7IH1cclxuXHJcbiAgICAgIGlmICh0b29sLnR5cGUgPT09ICdzd2l0Y2gnKSB7IHJldHVybiBjaGVja1Rvb2wudmFsdWUgPT09IHRvb2wuYm9vbFZhbHVlOyB9XHJcblxyXG4gICAgICBpZiAodG9vbC50eXBlID09PSAncmFuZ2UnKSB7IHJldHVybiB0aGlzLmluY2x1ZGVzVmFsdWUoY2hlY2tUb29sLnZhbHVlLCBbIHRvb2wubWluVmFsdWUsIHRvb2wubWF4VmFsdWUgXSkgfVxyXG5cclxuICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICBpbmNsdWRlc1ZhbHVlKHZhbHVlLCBib3JkZXJzKSB7XHJcbiAgICBpZiAodHlwZW9mIHZhbHVlICE9PSAnbnVtYmVyJykgdGhyb3cgbmV3IFR5cGVFcnJvcignVmFsdWUgc2hvdWxkIGJlIGludGVnZXInKTtcclxuICAgIHJldHVybiAodmFsdWUgPj0gYm9yZGVyc1swXSkgJiYgKHZhbHVlIDw9IGJvcmRlcnNbMV0pO1xyXG4gIH1cclxuXHJcbiAgcmlnaHRUaW1lKHRpbWUpIHtcclxuICAgIGlmICh0eXBlb2YgdGltZSAhPT0gJ251bWJlcicpIHRocm93IG5ldyBUeXBlRXJyb3IoJ1RpbWUgc2hvdWxkIGJlIGludGVnZXIgKG1zKScpO1xyXG4gICAgcmV0dXJuICh0aW1lID49IHRoaXMubWluVGltZSkgJiYgKHRpbWUgPD0gdGhpcy5tYXhUaW1lKTtcclxuICB9XHJcblxyXG4gIGluaXRUb29scyh0b29scykge1xyXG4gICAgcmV0dXJuIHRvb2xzLm1hcCh0b29sID0+IHtcclxuICAgICAgcmV0dXJuIHtcclxuICAgICAgICBpZDogdG9vbC5pZCxcclxuICAgICAgICB0eXBlOiB0b29sLnR5cGUsXHJcbiAgICAgICAgbWluVmFsdWU6IHRvb2wuQWN0aW9uVG9vbC5taW5WYWx1ZSxcclxuICAgICAgICBtYXhWYWx1ZTogdG9vbC5BY3Rpb25Ub29sLm1heFZhbHVlLFxyXG4gICAgICAgIGJvb2xWYWx1ZTogdG9vbC5BY3Rpb25Ub29sLmJvb2xWYWx1ZVxyXG4gICAgICB9XHJcbiAgICB9KTtcclxuICB9XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IEFjdGlvbjtcclxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vbGVhcm5pbmcvbW9kZWxfY29tcG9uZW50cy9hY3Rpb24uanMiLCJjbGFzcyBFdmVudCB7XHJcbiAgY29uc3RydWN0b3IoZGF0YSkge1xyXG4gICAgdGhpcy5pZCA9IGRhdGEuaWQ7XHJcbiAgICB0aGlzLm5hbWUgPSBkYXRhLm5hbWU7XHJcbiAgICB0aGlzLmRlc2NyaXB0aW9uID0gZGF0YS5kZXNjcmlwdGlvbjtcclxuICB9XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IEV2ZW50O1xyXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9sZWFybmluZy9tb2RlbF9jb21wb25lbnRzL2V2ZW50LmpzIiwiaW1wb3J0IEV2ZW50IGZyb20gJy4vZXZlbnQnIDtcclxuaW1wb3J0IEFjdGlvbiBmcm9tICcuL2FjdGlvbic7XHJcblxyXG5jbGFzcyBTdGF0ZSB7XHJcbiAgY29uc3RydWN0b3IoZGF0YSkge1xyXG4gICAgdGhpcy5pZCA9IGRhdGEuaWQ7XHJcbiAgICB0aGlzLm5hbWUgPSBkYXRhLm5hbWU7XHJcbiAgICB0aGlzLmltZyA9IGRhdGEuaW1nO1xyXG4gICAgdGhpcy5wYXJhbXMgPSBkYXRhLnBhcmFtcztcclxuXHJcbiAgICBpZihkYXRhLmxhc3QpIHtcclxuICAgICAgdGhpcy5sYXN0ID0gdHJ1ZTtcclxuICAgICAgdGhpcy5ldmVudCA9IG51bGw7XHJcbiAgICAgIHRoaXMuYWN0aW9ucyA9IG51bGw7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB0aGlzLmV2ZW50ID0gbmV3IEV2ZW50KGRhdGEuZXZlbnQpO1xyXG4gICAgICB0aGlzLmFjdGlvbnMgPSBkYXRhLmFjdGlvbnMubWFwKGFjdGlvbiA9PiBuZXcgQWN0aW9uKGFjdGlvbikpO1xyXG4gICAgICB0aGlzLmxhc3QgPSBmYWxzZTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIGdldEluYWN0aXZlVGltZSgpIHtcclxuICAgIGNvbnN0IHRpbWVzID0gdGhpcy5nZXRBbGxBY3Rpb25UaW1lcygpO1xyXG4gICAgcmV0dXJuIE1hdGgubWF4KC4uLnRpbWVzKTtcclxuICB9XHJcblxyXG4gIGdldEluYWN0aXZlQWN0aW9uKCkge1xyXG4gICAgcmV0dXJuIHRoaXMuYWN0aW9ucy5maW5kKGFjdGlvbiA9PiBhY3Rpb24uaW5hY3RpdmUgPT09IHRydWUpO1xyXG4gIH1cclxuXHJcbiAgZ2V0QWxsQWN0aW9uVGltZXMoKSB7XHJcbiAgICByZXR1cm4gdGhpcy5hY3Rpb25zLm1hcChhY3Rpb24gPT4gYWN0aW9uLm1heFRpbWUgfHwgMCk7XHJcbiAgfVxyXG5cclxuICBoYW5kbGVJbnB1dChkYXRhLCB0aW1lKSB7XHJcbiAgICBjb25zdCBzdWl0ZWRBY3Rpb25zID0gdGhpcy5hY3Rpb25zLmZpbHRlcihhY3Rpb24gPT4gYWN0aW9uLmlzU3VpdGFibGUoZGF0YSwgdGltZSkpO1xyXG4gICAgaWYgKHN1aXRlZEFjdGlvbnMubGVuZ3RoID4gMCkge1xyXG4gICAgICByZXR1cm4gc3VpdGVkQWN0aW9uc1swXS5uZXh0U3RhdGU7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gbnVsbDtcclxuICB9XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IFN0YXRlO1xyXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9sZWFybmluZy9tb2RlbF9jb21wb25lbnRzL3N0YXRlLmpzIiwiaW1wb3J0IG5vZGVGYWN0b3J5IGZyb20gJy4uLy4uL3V0aWxzL25vZGVGYWN0b3J5JztcclxuaW1wb3J0IHRpbWVyIGZyb20gJy4uLy4uL3V0aWxzL3RpbWVyJztcclxuXHJcbmNvbnN0ICRuYW1lID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLm1vZGVsLXN0YXRlLW5hbWUnKTtcclxuY29uc3QgJGltZyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5tb2RlbC1zdGF0ZS1pbWcnKTtcclxuY29uc3QgJHBhcmFtcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5tb2RlbC1wYXJhbXMtdmFsdWVzJyk7XHJcblxyXG5jb25zdCAkZXZlbnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcubW9kZWwtZXZlbnQnKTtcclxuY29uc3QgJGV2ZW50SGVhZGVyID0gJGV2ZW50LnF1ZXJ5U2VsZWN0b3IoJy5tb2RlbC1ldmVudC1uYW1lIHNwYW4nKTtcclxuY29uc3QgJGV2ZW50Qm9keSA9ICRldmVudC5xdWVyeVNlbGVjdG9yKCcubW9kZWwtZXZlbnQtaW5mbycpO1xyXG5cclxuY29uc3QgJHRpbWVyQ29udGFpbmVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLm1vZGVsLXRpbWVyJyk7XHJcbiR0aW1lckNvbnRhaW5lci5hcHBlbmRDaGlsZCh0aW1lci5ub2RlKTtcclxuXHJcbmZ1bmN0aW9uIHNldCh7IG5hbWUsIGltZywgcGFyYW1zIH0pIHtcclxuICAkbmFtZS50ZXh0Q29udGVudCA9IG5hbWU7XHJcbiAgJGltZy5zZXRBdHRyaWJ1dGUoJ3NyYycsIGltZyk7XHJcbiAgc2V0UGFyYW1ldGVycyhwYXJhbXMpO1xyXG59XHJcblxyXG5mdW5jdGlvbiBzZXRQYXJhbWV0ZXJzKHBhcmFtcyA9IFtdKSB7XHJcbiAgY29uc3QgZnJhZyA9IGRvY3VtZW50LmNyZWF0ZURvY3VtZW50RnJhZ21lbnQoKTtcclxuICBwYXJhbXMuZm9yRWFjaChwYXJhbSA9PiBmcmFnLmFwcGVuZENoaWxkKGNyZWF0ZVBhcmFtZXRlTm9kZShwYXJhbS5uYW1lLCBwYXJhbS52YWx1ZSkpKTtcclxuXHJcbiAgJHBhcmFtcy5pbm5lckhUTUwgPSBcIlwiO1xyXG4gICRwYXJhbXMuYXBwZW5kQ2hpbGQoZnJhZyk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGNyZWF0ZVBhcmFtZXRlTm9kZShrZXksIHZhbHVlKSB7XHJcbiAgY29uc3QgZGl2ID0gbm9kZUZhY3RvcnkoJ2RpdicsIHsgY2xhc3NMaXN0OiBbJ3BhcmFtZXRlciddIH0pO1xyXG5cclxuICBjb25zdCBrZXlTcGFuID0gbm9kZUZhY3RvcnkoJ3NwYW4nLCB7IHRleHRDb250ZW50OiBrZXkgfSk7XHJcbiAgZGl2LmFwcGVuZENoaWxkKGtleVNwYW4pO1xyXG5cclxuICBjb25zdCB2YWx1ZVNwYW4gPSBub2RlRmFjdG9yeSgnc3BhbicsIHsgdGV4dENvbnRlbnQ6IHZhbHVlIH0pO1xyXG4gIGRpdi5hcHBlbmRDaGlsZCh2YWx1ZVNwYW4pO1xyXG5cclxuICByZXR1cm4gZGl2O1xyXG59XHJcblxyXG5cclxuLyoqIFNldHMgZXZlbnQgZGF0YSB0byBVSSAqL1xyXG5mdW5jdGlvbiBzaG93RXZlbnQoZXZlbnQpIHtcclxuICAkZXZlbnRIZWFkZXIudGV4dENvbnRlbnQgPSBldmVudC5uYW1lO1xyXG4gICRldmVudEJvZHkudGV4dENvbnRlbnQgPSBldmVudC5kZXNjcmlwdGlvbjtcclxuICAkZXZlbnQuY2xhc3NMaXN0LnJlbW92ZSgnaXMtaGlkZGVuJywgJ3NsaWRlLXRvcCcpO1xyXG4gIHNob3dUaW1lcigpO1xyXG59XHJcbmZ1bmN0aW9uIGhpZGVFdmVudCgpIHtcclxuICAkZXZlbnQuY2xhc3NMaXN0LmFkZCgnaXMtaGlkZGVuJywgJ3NsaWRlLXRvcCcpO1xyXG4gIGhpZGVUaW1lcigpO1xyXG59XHJcblxyXG5mdW5jdGlvbiBzaG93VGltZXIoKSB7XHJcbiAgJHRpbWVyQ29udGFpbmVyLmNsYXNzTGlzdC5yZW1vdmUoJ2lzLWhpZGRlbicpO1xyXG4gIHRpbWVyLnN0YXJ0KCk7XHJcbn1cclxuZnVuY3Rpb24gaGlkZVRpbWVyKCkge1xyXG4gICR0aW1lckNvbnRhaW5lci5jbGFzc0xpc3QuYWRkKCdpcy1oaWRkZW4nKTtcclxuICB0aW1lci5zdG9wKCk7XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IHtcclxuICBzZXQsXHJcbiAgc2hvd0V2ZW50LFxyXG4gIGhpZGVFdmVudFxyXG59XHJcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2xlYXJuaW5nL3NjZW5lX2NvbXBvbmVudHMvc3RhdGUuanMiLCJpbXBvcnQgbm9kZUZhY3RvcnkgZnJvbSAnLi4vLi4vdXRpbHMvbm9kZUZhY3RvcnknO1xyXG5cclxuY29uc3QgdG9vbFR5cGVzID0ge1xyXG4gIFJBTkdFOiAncmFuZ2UnLFxyXG4gIFNXSVRDSDogJ3N3aXRjaCdcclxufVxyXG5jb25zdCAkdG9vbHMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcudG9vbHMtbGlzdCcpO1xyXG5cclxuZnVuY3Rpb24gaW5pdCh0b29scykge1xyXG4gIGNvbnN0IGZyYWdtZW50ID0gZG9jdW1lbnQuY3JlYXRlRG9jdW1lbnRGcmFnbWVudCgpO1xyXG5cclxuICB0b29scy5mb3JFYWNoKHRvb2wgPT4ge1xyXG4gICAgLy8gY3JlYXRlIHRvb2wgd3JhcHBlclxyXG4gICAgY29uc3QgZGl2ID0gbm9kZUZhY3RvcnkoJ2RpdicsIHsgY2xhc3NMaXN0OiBbJ3Rvb2wnXSB9KTtcclxuXHJcbiAgICBjb25zdCBsYWJlbCA9IG5vZGVGYWN0b3J5KCdsYWJlbCcsIHtcclxuICAgICAgY2xhc3NMaXN0OiBbJ3Rvb2wtbmFtZSddLFxyXG4gICAgICBhdHRyczogeyBcImZvclwiOiB0b29sLm5hbWUgfSxcclxuICAgICAgdGV4dENvbnRlbnQ6IHRvb2wubmFtZVxyXG4gICAgfSk7XHJcbiAgICBkaXYuYXBwZW5kQ2hpbGQobGFiZWwpO1xyXG5cclxuICAgIGNvbnN0IHRvb2xOb2RlID0gY3JlYXRlVG9vbE5vZGUodG9vbCk7XHJcbiAgICBkaXYuYXBwZW5kQ2hpbGQodG9vbE5vZGUpO1xyXG5cclxuICAgIGZyYWdtZW50LmFwcGVuZENoaWxkKGRpdik7XHJcbiAgfSk7XHJcblxyXG4gICR0b29scy5pbm5lckhUTUwgPSBcIlwiO1xyXG4gICR0b29scy5hcHBlbmRDaGlsZChmcmFnbWVudCk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGNyZWF0ZVRvb2xOb2RlKHRvb2wpIHtcclxuICBzd2l0Y2godG9vbC50eXBlKSB7XHJcbiAgICBjYXNlIHRvb2xUeXBlcy5SQU5HRTogICByZXR1cm4gY3JlYXRlUmFuZ2VUb29sKHRvb2wpO1xyXG4gICAgY2FzZSB0b29sVHlwZXMuU1dJVENIOiAgcmV0dXJuIGNyZWF0ZVN3aXRjaFRvb2wodG9vbCk7XHJcbiAgICBkZWZhdWx0OiAgICAgICAgICAgICAgICByZXR1cm4gJ9Cd0LXQuNC30LLQtdGB0YLQvdGL0Lkg0L/RgNC40LHQvtGAJztcclxuICB9XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGNyZWF0ZVJhbmdlVG9vbCh0b29sKSB7XHJcbiAgY29uc3QgZGl2SW5wdXQgPSBub2RlRmFjdG9yeSgnZGl2JywgeyBjbGFzc0xpc3Q6IFsncmFuZ2UnXSB9KTtcclxuXHJcbiAgY29uc3Qgc3Bhbk1pbiA9IG5vZGVGYWN0b3J5KCdzcGFuJywgeyB0ZXh0Q29udGVudDogdG9vbC5taW4gfSk7XHJcbiAgZGl2SW5wdXQuYXBwZW5kQ2hpbGQoc3Bhbk1pbilcclxuXHJcbiAgY29uc3QgaW5wdXQgPSBub2RlRmFjdG9yeSgnaW5wdXQnLCB7XHJcbiAgICBhdHRyczoge1xyXG4gICAgICAnZGF0YS1pZCc6IHRvb2wuaWQsXHJcbiAgICAgICdkYXRhLXR5cGUnOiAncmFuZ2UnLFxyXG4gICAgICAnbmFtZSc6IHRvb2wubmFtZSxcclxuICAgICAgJ3R5cGUnOiAncmFuZ2UnLFxyXG4gICAgICAnbWluJzogdG9vbC5taW4sXHJcbiAgICAgICdtYXgnOiB0b29sLm1heFxyXG4gICAgfVxyXG4gIH0pO1xyXG4gIGRpdklucHV0LmFwcGVuZENoaWxkKGlucHV0KTtcclxuXHJcbiAgY29uc3Qgc3Bhbk1heCA9IG5vZGVGYWN0b3J5KCdzcGFuJywgeyB0ZXh0Q29udGVudDogdG9vbC5tYXggfSk7XHJcbiAgZGl2SW5wdXQuYXBwZW5kQ2hpbGQoc3Bhbk1heCk7XHJcblxyXG4gIGNvbnN0IGRpdkN1cnJlbnQgPSBub2RlRmFjdG9yeSgnZGl2JywgeyBjbGFzc0xpc3Q6IFsncmFuZ2UtY3VycmVudC12YWx1ZSddIH0pO1xyXG4gIGNvbnN0IHNwYW5DdXJyZW50ID0gbm9kZUZhY3RvcnkoJ3NwYW4nLCB7IHRleHRDb250ZW50OiBpbnB1dC52YWx1ZSB9KTtcclxuICBkaXZDdXJyZW50LmFwcGVuZENoaWxkKHNwYW5DdXJyZW50KTtcclxuXHJcbiAgaW5wdXQuYWRkRXZlbnRMaXN0ZW5lcignaW5wdXQnLCAoZXZ0KSA9PiB7XHJcbiAgICBzcGFuQ3VycmVudC50ZXh0Q29udGVudCA9IGV2dC50YXJnZXQudmFsdWU7XHJcbiAgfSk7XHJcblxyXG4gIGNvbnN0IGZyYWdtZW50ID0gZG9jdW1lbnQuY3JlYXRlRG9jdW1lbnRGcmFnbWVudCgpO1xyXG4gIGZyYWdtZW50LmFwcGVuZENoaWxkKGRpdklucHV0KTtcclxuICBmcmFnbWVudC5hcHBlbmRDaGlsZChkaXZDdXJyZW50KTtcclxuXHJcbiAgcmV0dXJuIGZyYWdtZW50O1xyXG59XHJcblxyXG5mdW5jdGlvbiBjcmVhdGVTd2l0Y2hUb29sKHRvb2wpIHtcclxuICBjb25zdCBsYWJlbCA9IG5vZGVGYWN0b3J5KCdsYWJlbCcsIHsgY2xhc3NMaXN0OiBbJ3N3aXRjaCddIH0pO1xyXG5cclxuICBjb25zdCBpbnB1dCA9IG5vZGVGYWN0b3J5KCdpbnB1dCcsIHtcclxuICAgIGF0dHJzOiB7XHJcbiAgICAgICdkYXRhLWlkJzogdG9vbC5pZCxcclxuICAgICAgJ2RhdGEtdHlwZSc6ICdzd2l0Y2gnLFxyXG4gICAgICAndHlwZSc6ICdjaGVja2JveCdcclxuICAgIH1cclxuICB9KTtcclxuICBsYWJlbC5hcHBlbmRDaGlsZChpbnB1dCk7XHJcblxyXG4gIGNvbnN0IGRpdiA9IG5vZGVGYWN0b3J5KCdkaXYnLCB7IGNsYXNzTGlzdDogWydzbGlkZXInXSB9KTtcclxuICBsYWJlbC5hcHBlbmRDaGlsZChkaXYpO1xyXG5cclxuICByZXR1cm4gbGFiZWw7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGdldFRvb2xzRGF0YSgpIHtcclxuICBjb25zdCB0b29sc0RhdGEgPSBbXTtcclxuICBjb25zdCBpbnB1dHMgPSAkdG9vbHMucXVlcnlTZWxlY3RvckFsbCgnaW5wdXRbZGF0YS1pZF0nKTtcclxuICBpbnB1dHMuZm9yRWFjaChpbnB1dCA9PiB7XHJcbiAgICBjb25zdCB7IGlkLCB0eXBlIH0gPSBpbnB1dC5kYXRhc2V0O1xyXG4gICAgbGV0IHZhbHVlO1xyXG4gICAgc3dpdGNoKHR5cGUpIHtcclxuICAgICAgY2FzZSB0b29sVHlwZXMuUkFOR0U6IHZhbHVlID0gcGFyc2VJbnQoaW5wdXQudmFsdWUpOyBicmVhaztcclxuICAgICAgY2FzZSB0b29sVHlwZXMuU1dJVENIOiB2YWx1ZSA9IGlucHV0LmNoZWNrZWQ7IGJyZWFrO1xyXG4gICAgICBkZWZhdWx0OiB0aHJvdyBuZXcgRXJyb3IoYNCd0LXQutC+0YDRgNC10LrRgtC90YvQuSDRgtC40L8g0L/RgNC40LHQvtGA0LAuIElEOiAke2lkfWApO1xyXG4gICAgfVxyXG4gICAgdG9vbHNEYXRhLnB1c2goeyBpZCwgdmFsdWUgfSk7XHJcbiAgfSk7XHJcbiAgcmV0dXJuIHRvb2xzRGF0YTtcclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQge1xyXG4gIGluaXQsXHJcbiAgZ2V0VG9vbHNEYXRhXHJcbn07XHJcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2xlYXJuaW5nL3NjZW5lX2NvbXBvbmVudHMvdG9vbHMuanMiLCJpbXBvcnQgbm9kZUZhY3RvcnkgZnJvbSAnLi9ub2RlRmFjdG9yeSc7XHJcblxyXG5mdW5jdGlvbiBtc1RvQ29udGVudChtcykge1xyXG4gIGNvbnN0IHNlY29uZHMgPSBNYXRoLnJvdW5kKG1zIC8gMTAwMCk7XHJcbiAgY29uc3QgbWlucyA9IE1hdGguZmxvb3Ioc2Vjb25kcyAvIDYwKTtcclxuICBjb25zdCBzZWNvbmRzTGVmdCA9IHNlY29uZHMgLSAobWlucyAqIDYwKTtcclxuXHJcbiAgcmV0dXJuIGAke21pbnN9OiR7c2Vjb25kc0xlZnQgPj0gMTAgPyAnJyA6ICcwJ30ke3NlY29uZHNMZWZ0fWA7XHJcbn1cclxuXHJcbmNvbnN0IHRpbWVyID0ge1xyXG4gIHN0YXJ0VGltZTogbnVsbCxcclxuICBpbnRlcnZhbDogbnVsbCxcclxuICBub2RlOiBub2RlRmFjdG9yeSgnc3BhbicsIHsgY2xhc3NMaXN0OiBbJ3RpbWVyJ10sIHRleHRDb250ZW50OiAnMDowMCcgfSksXHJcbiAgc3RhcnQ6IGZ1bmN0aW9uKCkge1xyXG4gICAgdGhpcy5zdGFydFRpbWUgPSBEYXRlLm5vdygpO1xyXG4gICAgdGhpcy5pbnRlcnZhbCA9IHNldEludGVydmFsKCgpID0+IHtcclxuICAgICAgY29uc3QgZWxhcHNlZCA9IERhdGUubm93KCkgLSB0aGlzLnN0YXJ0VGltZTtcclxuICAgICAgdGhpcy5ub2RlLnRleHRDb250ZW50ID0gbXNUb0NvbnRlbnQoZWxhcHNlZCk7XHJcbiAgICB9LCAxMDAwKTtcclxuICB9LFxyXG4gIHN0b3A6IGZ1bmN0aW9uKCkge1xyXG4gICAgaWYgKCF0aGlzLnN0YXJ0VGltZSkgeyByZXR1cm47IH1cclxuICAgIHRoaXMuc3RhcnRUaW1lID0gbnVsbDtcclxuICAgIGNsZWFySW50ZXJ2YWwodGhpcy5pbnRlcnZhbCk7XHJcbiAgICB0aGlzLm5vZGUudGV4dENvbnRlbnQgPSAnMDowMCc7XHJcbiAgfVxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCB0aW1lcjtcclxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vdXRpbHMvdGltZXIuanMiLCJpbXBvcnQgJy4uLy4uL3Nhc3MvbGVhcm5pbmcuc2Nzcyc7XHJcblxyXG5pbXBvcnQgcHVic3ViIGZyb20gJy4uL3V0aWxzL3B1YnN1Yic7XHJcbmltcG9ydCBhamF4IGZyb20gJy4uL3V0aWxzL2FqYXgnO1xyXG5pbXBvcnQgc2NlbmUgZnJvbSAnLi9zY2VuZSc7XHJcbmltcG9ydCBNb2RlbCBmcm9tICcuL21vZGVsJztcclxuXHJcbi8qKlxyXG4gKiBMb2FkIG1vZGVsIHdpdGggZ2l2ZW4gaWRcclxuICovXHJcbmZ1bmN0aW9uIGxvYWRNb2RlbChpZCkge1xyXG4gIHJldHVybiBhamF4KGAvbW9kZWxzLyR7aWR9YCkudGhlbihyZXNwb25zZSA9PiBKU09OLnBhcnNlKHJlc3BvbnNlKSk7XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBVSSBidXR0b24ncyBoYW5kbGVyc1xyXG4gKi9cclxuY29uc3QgJHNlbGVjdCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjbW9kZWwtc2VsZWN0XCIpO1xyXG5jb25zdCAkbG9hZEJ1dHRvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNsb2FkLW1vZGVsLWJ0bicpO1xyXG5sZXQgbW9kZWwgPSBudWxsO1xyXG4kbG9hZEJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcclxuICBpZiAoIG1vZGVsICkgeyBtb2RlbC5zdG9wKCk7IH1cclxuICBjb25zdCBtb2RlbElkID0gJHNlbGVjdC52YWx1ZTtcclxuICBsb2FkTW9kZWwobW9kZWxJZClcclxuICAgIC50aGVuKHJlc3BvbnNlID0+IHtcclxuICAgICAgbW9kZWwgPSBuZXcgTW9kZWwocmVzcG9uc2UpO1xyXG4gICAgICBzY2VuZS5pbml0KG1vZGVsLCByZXNwb25zZSlcclxuICAgICAgICAuc2hvd0NvbnRlbnQoKVxyXG4gICAgICAgIC5lbmFibGVCdXR0b25zKCRzdGFydEJ1dHRvbilcclxuICAgICAgICAuZGlzYWJsZUJ1dHRvbnMoJHN0b3BCdXR0b24sICRydW5CdXR0b24pO1xyXG4gICAgfSlcclxuICAgIC5jYXRjaChlcnIgPT4geyBjb25zb2xlLmVycm9yKGVycikgfSk7XHJcbn0pO1xyXG4vL1xyXG5jb25zdCAkc3RhcnRCdXR0b24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjc3RhcnQtYnRuJyk7XHJcbiRzdGFydEJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcclxuICBtb2RlbC5zdGFydCgpO1xyXG4gIHNjZW5lLmRpc2FibGVCdXR0b25zKCRzdGFydEJ1dHRvbik7XHJcbiAgc2NlbmUuZW5hYmxlQnV0dG9ucygkc3RvcEJ1dHRvbiwgJHJ1bkJ1dHRvbik7XHJcbn0pO1xyXG5cclxuY29uc3QgJHN0b3BCdXR0b24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjc3RvcC1idG4nKTtcclxuJHN0b3BCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XHJcbiAgbW9kZWwuc3RvcCgpO1xyXG4gIHNjZW5lLmVuYWJsZUJ1dHRvbnMoJHN0YXJ0QnV0dG9uKTtcclxuICBzY2VuZS5kaXNhYmxlQnV0dG9ucygkc3RvcEJ1dHRvbiwgJHJ1bkJ1dHRvbik7XHJcbn0pO1xyXG5cclxuY29uc3QgJHJ1bkJ1dHRvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNydW4tYnRuJyk7XHJcbiRydW5CdXR0b24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XHJcbiAgY29uc3QgdG9vbHNEYXRhID0gc2NlbmUuZ2V0VG9vbHNEYXRhKCk7XHJcbiAgcHVic3ViLnB1Ymxpc2goJ3VzZXJfaW5wdXQnLCB0b29sc0RhdGEpO1xyXG59KTtcclxuXHJcbi8qKlxyXG4gKiBIYW5kbGUgY3VzdG9tIGV2ZW50cyBoZXJlICh1c2VyIGlucHV0LCBwcm9ncmFtbSBtZXNzYWdlcyBldGMuKVxyXG4gKi9cclxucHVic3ViLnN1YnNjcmliZSgnbmV3X3N0YXRlJywgc3RhdGUgPT4ge1xyXG4gIHNjZW5lLmhpZGVFdmVudCgpO1xyXG4gIHNjZW5lLnNldFN0YXRlKHN0YXRlKTtcclxufSk7XHJcbnB1YnN1Yi5zdWJzY3JpYmUoJ2V2ZW50JywgZXZlbnQgPT4gc2NlbmUuc2hvd0V2ZW50KGV2ZW50KSk7XHJcblxyXG4vLyAvKipcclxuLy8gKiBUaW1lciAoY3VycmVudGx5IGZvciBkZXYgbW9kZSBvbmx5KVxyXG4vLyAqL1xyXG4vLyBpbXBvcnQgdGltZXIgZnJvbSAnLi4vdXRpbHMvdGltZXInO1xyXG4vLyBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuaGVhZGVyJykuYXBwZW5kQ2hpbGQodGltZXIubm9kZSk7XHJcbi8vIHB1YnN1Yi5zdWJzY3JpYmUoJ25ld19zdGF0ZScsIHN0YXRlID0+IHRpbWVyLnN0b3AoKSk7XHJcbi8vIHB1YnN1Yi5zdWJzY3JpYmUoJ2V2ZW50JywgZXZlbnQgPT4gdGltZXIuc3RhcnQoKSk7XHJcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2xlYXJuaW5nL2luZGV4LmpzIl0sInNvdXJjZVJvb3QiOiIifQ==