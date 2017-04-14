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
/******/ 	return __webpack_require__(__webpack_require__.s = 27);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
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
/* 1 */
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
/* 4 */,
/* 5 */
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

var _report = __webpack_require__(18);

var _report2 = _interopRequireDefault(_report);

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
    this.currentState = this.getState(data.initialState);

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

      this.report = new _report2.default(this.name, this.steps);
      this.handleNewState(this.currentState); // set initial state
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
      }).then(function () {
        if (_this.currentState.name !== STOP_STATE_NAME) {
          _this.report.send().then(function (response) {
            return console.log(response);
          });
        }
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
          _this3.report.increaseActionsNumber();
          var timeSpent = Date.now() - eventStartTime;
          var nextStateId = _this3.currentState.handleInput(data, timeSpent);
          var nextState = _this3.getState(nextStateId);
          if (nextState) {
            _this3.report.setSpentTime(timeSpent);
            nextState.last ? reject(nextState) : resolve(nextState);
          }
        });

        // handle user stop button click
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
    key: 'handleNewState',
    value: function handleNewState(state) {
      this.report.pushState(state);
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
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _state = __webpack_require__(19);

var _state2 = _interopRequireDefault(_state);

var _tools = __webpack_require__(20);

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

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _ajax = __webpack_require__(0);

var _ajax2 = _interopRequireDefault(_ajax);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var REPORT_URL = '/learning/report';
var ajaxConfig = {
  method: 'POST',
  headers: {
    'Content-type': 'application/json'
  }
};

var Report = function () {
  function Report(name, steps) {
    _classCallCheck(this, Report);

    this.modelName = name;
    this.maxSteps = steps;
    this.states = [];
    this.currentState = null;
  }

  _createClass(Report, [{
    key: 'pushState',
    value: function pushState(state) {
      var name = state.name;

      var maxTime = state.last ? -1 : state.getInactiveTime();
      var inactive = true;
      var actionsNumber = 0;
      this.states.push({ name: name, maxTime: maxTime, inactive: inactive, actionsNumber: actionsNumber });
      this.currentState = this.states[this.states.length - 1];
    }
  }, {
    key: 'increaseActionsNumber',
    value: function increaseActionsNumber() {
      this.currentState.actionsNumber++;
    }
  }, {
    key: 'setSpentTime',
    value: function setSpentTime(time) {
      this.currentState.spentTime = time;
      this.setInactive(false);
    }
  }, {
    key: 'setInactive',
    value: function setInactive(value) {
      this.currentState.inactive = value;
    }
  }, {
    key: 'send',
    value: function send() {
      if (this.states.length > 1) {
        // remove last state - user can't make any action
        this.states = this.states.slice(0, -1);
      }
      ajaxConfig.data = JSON.stringify({
        modelName: this.modelName,
        maxSteps: this.steps,
        states: this.states
      });
      return (0, _ajax2.default)(REPORT_URL, ajaxConfig);
    }
  }]);

  return Report;
}();

exports.default = Report;

/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _nodeFactory = __webpack_require__(1);

var _nodeFactory2 = _interopRequireDefault(_nodeFactory);

var _timer = __webpack_require__(22);

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
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _nodeFactory = __webpack_require__(1);

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
/* 21 */,
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _nodeFactory = __webpack_require__(1);

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
/* 23 */,
/* 24 */,
/* 25 */,
/* 26 */,
/* 27 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


__webpack_require__(9);

var _pubsub = __webpack_require__(2);

var _pubsub2 = _interopRequireDefault(_pubsub);

var _ajax = __webpack_require__(0);

var _ajax2 = _interopRequireDefault(_ajax);

var _scene = __webpack_require__(6);

var _scene2 = _interopRequireDefault(_scene);

var _model = __webpack_require__(5);

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
  _pubsub2.default.publish('model_stop');
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgNDAxNDU4YWUwNmNlNDNjZTkwNTYiLCJ3ZWJwYWNrOi8vLy4vdXRpbHMvYWpheC5qcyIsIndlYnBhY2s6Ly8vLi91dGlscy9ub2RlRmFjdG9yeS5qcyIsIndlYnBhY2s6Ly8vLi91dGlscy9wdWJzdWIuanMiLCJ3ZWJwYWNrOi8vLy4vbGVhcm5pbmcvbW9kZWwuanMiLCJ3ZWJwYWNrOi8vLy4vbGVhcm5pbmcvc2NlbmUuanMiLCJ3ZWJwYWNrOi8vLy4uL3Nhc3MvbGVhcm5pbmcuc2NzcyIsIndlYnBhY2s6Ly8vLi9sZWFybmluZy9tb2RlbF9jb21wb25lbnRzL2FjdGlvbi5qcyIsIndlYnBhY2s6Ly8vLi9sZWFybmluZy9tb2RlbF9jb21wb25lbnRzL2V2ZW50LmpzIiwid2VicGFjazovLy8uL2xlYXJuaW5nL21vZGVsX2NvbXBvbmVudHMvc3RhdGUuanMiLCJ3ZWJwYWNrOi8vLy4vbGVhcm5pbmcvcmVwb3J0LmpzIiwid2VicGFjazovLy8uL2xlYXJuaW5nL3NjZW5lX2NvbXBvbmVudHMvc3RhdGUuanMiLCJ3ZWJwYWNrOi8vLy4vbGVhcm5pbmcvc2NlbmVfY29tcG9uZW50cy90b29scy5qcyIsIndlYnBhY2s6Ly8vLi91dGlscy90aW1lci5qcyIsIndlYnBhY2s6Ly8vLi9sZWFybmluZy9pbmRleC5qcyJdLCJuYW1lcyI6WyJhamF4IiwicGF0aCIsIm9wdGlvbnMiLCJmdWxsUmVzcG9uc2UiLCJ4aHIiLCJYTUxIdHRwUmVxdWVzdCIsIm9wZW4iLCJtZXRob2QiLCJoZWFkZXJzIiwic2V0WEhSSGVhZGVycyIsInNlbmQiLCJkYXRhIiwiUHJvbWlzZSIsInJlc29sdmUiLCJyZWplY3QiLCJvbnJlYWR5c3RhdGVjaGFuZ2UiLCJyZWFkeVN0YXRlIiwic3RhdHVzIiwicmVzcG9uc2VUZXh0Iiwic3RhdHVzVGV4dCIsImhlYWRlciIsInNldFJlcXVlc3RIZWFkZXIiLCJub2RlRmFjdG9yeSIsInR5cGUiLCJwYXJhbXMiLCJub2RlIiwiZG9jdW1lbnQiLCJjcmVhdGVFbGVtZW50IiwiYXBwZW5kQ2xhc3NlcyIsImFwcGVuZEF0dHJzIiwiaW5zZXJ0VGV4dENvbnRlbnQiLCJjbGFzc0xpc3QiLCJmb3JFYWNoIiwiYWRkIiwiY2xhc3NOYW1lIiwiYXR0cnMiLCJhdHRyTmFtZXMiLCJPYmplY3QiLCJrZXlzIiwic2V0QXR0cmlidXRlIiwiYXR0ck5hbWUiLCJ0ZXh0Q29udGVudCIsInB1YnN1YiIsInRvcGljcyIsInN1YnNjcmliZSIsInRvcGljIiwibGlzdGVuZXIiLCJxdWV1ZSIsImluZGV4IiwicHVzaCIsInJlbW92ZSIsInB1Ymxpc2giLCJpbmZvIiwibGVuZ3RoIiwiaXRlbXMiLCJpdGVtIiwiSU5JVElBTF9TVEFURV9OQU1FIiwiU1RPUF9TVEFURV9OQU1FIiwiTW9kZWwiLCJpZCIsIm5hbWUiLCJicmVha1RpbWUiLCJzdGVwcyIsInN0YXRlcyIsIm1hcCIsInN0YXRlIiwiY3VycmVudFN0YXRlIiwiZ2V0U3RhdGUiLCJpbml0aWFsU3RhdGUiLCJ0aW1lb3V0Iiwic3ViSW5wdXQiLCJzdWJTdG9wIiwic3RhcnRTdGF0ZSIsImltZyIsImxhc3QiLCJzdG9wU3RhdGUiLCJmaW5kIiwicmVwb3J0IiwiaGFuZGxlTmV3U3RhdGUiLCJpbnRlcnZhbHMiLCJpIiwidGhlbiIsIm1ha2VCcmVhayIsImhhbmRsZUV2ZW50IiwiY2F0Y2giLCJyZXNwb25zZSIsImNvbnNvbGUiLCJsb2ciLCJzZXRUaW1lb3V0IiwiY2xlYXJTdWJzIiwiZXZlbnQiLCJldmVudFN0YXJ0VGltZSIsIkRhdGUiLCJub3ciLCJpbmNyZWFzZUFjdGlvbnNOdW1iZXIiLCJ0aW1lU3BlbnQiLCJuZXh0U3RhdGVJZCIsImhhbmRsZUlucHV0IiwibmV4dFN0YXRlIiwic2V0U3BlbnRUaW1lIiwiaW5hY3RpdmVUaW1lIiwiZ2V0SW5hY3RpdmVUaW1lIiwiZ2V0SW5hY3RpdmVBY3Rpb24iLCJwdXNoU3RhdGUiLCJjbGVhclRpbWVvdXQiLCJleHBvcnRzIiwiJG1vZGVsTmFtZSIsInF1ZXJ5U2VsZWN0b3IiLCJpbml0IiwibW9kZWwiLCJzZXQiLCJ0b29scyIsIiRjb250ZW50Iiwic2hvd0NvbnRlbnQiLCJzZXRDb250ZW50RGlzcGxheSIsImhpZGVDb250ZW50IiwiZGlzcGxheSIsInN0eWxlIiwiZW5hYmxlQnV0dG9ucyIsImJ1dHRvbnMiLCJzZXRCdXR0b25zU3RhdGUiLCJkaXNhYmxlQnV0dG9ucyIsInZhbHVlIiwiYnV0dG9uIiwiZGlzYWJsZWQiLCJnZXRUb29sc0RhdGEiLCJzZXRTdGF0ZSIsInN0YXRlRGF0YSIsInNob3dFdmVudCIsImV2ZW50RGF0YSIsImhpZGVFdmVudCIsIkFjdGlvbiIsIm1pblRpbWUiLCJtYXhUaW1lIiwiaW5hY3RpdmUiLCJpbml0VG9vbHMiLCJ0aW1lIiwicmlnaHRUaW1lIiwicmlnaHREYXRhIiwiZXZlcnkiLCJjaGVja1Rvb2wiLCJvYmoiLCJ0b29sIiwiYm9vbFZhbHVlIiwiaW5jbHVkZXNWYWx1ZSIsIm1pblZhbHVlIiwibWF4VmFsdWUiLCJib3JkZXJzIiwiVHlwZUVycm9yIiwiQWN0aW9uVG9vbCIsIkV2ZW50IiwiZGVzY3JpcHRpb24iLCJTdGF0ZSIsImFjdGlvbnMiLCJhY3Rpb24iLCJ0aW1lcyIsImdldEFsbEFjdGlvblRpbWVzIiwiTWF0aCIsIm1heCIsInN1aXRlZEFjdGlvbnMiLCJmaWx0ZXIiLCJpc1N1aXRhYmxlIiwiUkVQT1JUX1VSTCIsImFqYXhDb25maWciLCJSZXBvcnQiLCJtb2RlbE5hbWUiLCJtYXhTdGVwcyIsImFjdGlvbnNOdW1iZXIiLCJzcGVudFRpbWUiLCJzZXRJbmFjdGl2ZSIsInNsaWNlIiwiSlNPTiIsInN0cmluZ2lmeSIsIiRuYW1lIiwiJGltZyIsIiRwYXJhbXMiLCIkZXZlbnQiLCIkZXZlbnRIZWFkZXIiLCIkZXZlbnRCb2R5IiwiJHRpbWVyQ29udGFpbmVyIiwiYXBwZW5kQ2hpbGQiLCJzZXRQYXJhbWV0ZXJzIiwiZnJhZyIsImNyZWF0ZURvY3VtZW50RnJhZ21lbnQiLCJjcmVhdGVQYXJhbWV0ZU5vZGUiLCJwYXJhbSIsImlubmVySFRNTCIsImtleSIsImRpdiIsImtleVNwYW4iLCJ2YWx1ZVNwYW4iLCJzaG93VGltZXIiLCJoaWRlVGltZXIiLCJzdGFydCIsInN0b3AiLCJ0b29sVHlwZXMiLCJSQU5HRSIsIlNXSVRDSCIsIiR0b29scyIsImZyYWdtZW50IiwibGFiZWwiLCJ0b29sTm9kZSIsImNyZWF0ZVRvb2xOb2RlIiwiY3JlYXRlUmFuZ2VUb29sIiwiY3JlYXRlU3dpdGNoVG9vbCIsImRpdklucHV0Iiwic3Bhbk1pbiIsIm1pbiIsImlucHV0Iiwic3Bhbk1heCIsImRpdkN1cnJlbnQiLCJzcGFuQ3VycmVudCIsImFkZEV2ZW50TGlzdGVuZXIiLCJldnQiLCJ0YXJnZXQiLCJ0b29sc0RhdGEiLCJpbnB1dHMiLCJxdWVyeVNlbGVjdG9yQWxsIiwiZGF0YXNldCIsInBhcnNlSW50IiwiY2hlY2tlZCIsIkVycm9yIiwibXNUb0NvbnRlbnQiLCJtcyIsInNlY29uZHMiLCJyb3VuZCIsIm1pbnMiLCJmbG9vciIsInNlY29uZHNMZWZ0IiwidGltZXIiLCJzdGFydFRpbWUiLCJpbnRlcnZhbCIsInNldEludGVydmFsIiwiZWxhcHNlZCIsImNsZWFySW50ZXJ2YWwiLCJsb2FkTW9kZWwiLCJwYXJzZSIsIiRzZWxlY3QiLCIkbG9hZEJ1dHRvbiIsIm1vZGVsSWQiLCIkc3RhcnRCdXR0b24iLCIkc3RvcEJ1dHRvbiIsIiRydW5CdXR0b24iLCJlcnJvciIsImVyciJdLCJtYXBwaW5ncyI6IjtBQUFBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBLG1EQUEyQyxjQUFjOztBQUV6RDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQUs7QUFDTDtBQUNBOztBQUVBO0FBQ0E7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Q0EsSUFBTUosZUFBZXROLFNBQVNpRixhQUFULENBQXVCLFlBQXZCLENBQXJCO0FBQ0FxSSxhQUFhNUIsZ0JBQWIsQ0FBOEIsT0FBOUIsRUFBdUMsWUFBTTtBQUMzQ3ZHLFFBQU1vRixLQUFOO0FBQ0Esa0JBQU14RSxjQUFOLENBQXFCdUgsWUFBckI7QUFDQSxrQkFBTTFILGFBQU4sQ0FBb0IySCxXQUFwQixFQUFpQ0MsVUFBakM7QUFDRCxDQUpEOztBQU1BLElBQU1ELGNBQWN2TixTQUFTaUYsYUFBVCxDQUF1QixXQUF2QixDQUFwQjtBQUNBc0ksWUFBWTdCLGdCQUFaLENBQTZCLE9BQTdCLEVBQXNDLFlBQU07QUFDMUMsbUJBQU9qSyxPQUFQLENBQWUsWUFBZjtBQUNBLGtCQUFNbUUsYUFBTixDQUFvQjBILFlBQXBCO0FBQ0Esa0JBQU12SCxjQUFOLENBQXFCd0gsV0FBckIsRUFBa0NDLFVBQWxDO0FBQ0QsQ0FKRDs7QUFNQSxJQUFNQSxhQUFheE4sU0FBU2lGLGFBQVQsQ0FBdUIsVUFBdkIsQ0FBbkI7QUFDQXVJLFdBQVc5QixnQkFBWCxDQUE0QixPQUE1QixFQUFxQyxZQUFNO0FBQ3pDLE1BQU1HLFlBQVksZ0JBQU0xRixZQUFOLEVBQWxCO0FBQ0EsbUJBQU8xRSxPQUFQLENBQWUsWUFBZixFQUE2Qm9LLFNBQTdCO0FBQ0QsQ0FIRDs7QUFLQTs7O0FBR0EsaUJBQU8zSyxTQUFQLENBQWlCLFdBQWpCLEVBQThCLGlCQUFTO0FBQ3JDLGtCQUFNc0YsU0FBTjtBQUNBLGtCQUFNSixRQUFOLENBQWU3RCxLQUFmO0FBQ0QsQ0FIRDtBQUlBLGlCQUFPckIsU0FBUCxDQUFpQixPQUFqQixFQUEwQjtBQUFBLFNBQVMsZ0JBQU1vRixTQUFOLENBQWdCdEMsS0FBaEIsQ0FBVDtBQUFBLENBQTFCOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHFEIiwiZmlsZSI6ImxlYXJuaW5nLmJ1bmRsZS5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKVxuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuXG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBpZGVudGl0eSBmdW5jdGlvbiBmb3IgY2FsbGluZyBoYXJtb255IGltcG9ydHMgd2l0aCB0aGUgY29ycmVjdCBjb250ZXh0XG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmkgPSBmdW5jdGlvbih2YWx1ZSkgeyByZXR1cm4gdmFsdWU7IH07XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwge1xuIFx0XHRcdFx0Y29uZmlndXJhYmxlOiBmYWxzZSxcbiBcdFx0XHRcdGVudW1lcmFibGU6IHRydWUsXG4gXHRcdFx0XHRnZXQ6IGdldHRlclxuIFx0XHRcdH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IDI3KTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyB3ZWJwYWNrL2Jvb3RzdHJhcCA0MDE0NThhZTA2Y2U0M2NlOTA1NiIsImZ1bmN0aW9uIGFqYXgocGF0aCA9ICcnLCBvcHRpb25zID0ge30sIGZ1bGxSZXNwb25zZSA9IGZhbHNlKSB7XHJcbiAgY29uc3QgeGhyID0gbmV3IFhNTEh0dHBSZXF1ZXN0KCk7XHJcbiAgeGhyLm9wZW4ob3B0aW9ucy5tZXRob2QgfHwgJ0dFVCcsIHBhdGgsIHRydWUpO1xyXG4gIGlmIChvcHRpb25zLmhlYWRlcnMpIHsgc2V0WEhSSGVhZGVycyh4aHIsIG9wdGlvbnMuaGVhZGVycyk7IH1cclxuICB4aHIuc2VuZChvcHRpb25zLmRhdGEpO1xyXG5cclxuICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xyXG4gICAgeGhyLm9ucmVhZHlzdGF0ZWNoYW5nZSA9IGZ1bmN0aW9uKCkge1xyXG4gICAgICBpZih4aHIucmVhZHlTdGF0ZSA9PSA0KSB7XHJcbiAgICAgICAgaWYoeGhyLnN0YXR1cyA9PSAyMDApIHtcclxuICAgICAgICAgIGlmIChmdWxsUmVzcG9uc2UpIHtcclxuICAgICAgICAgICAgcmVzb2x2ZSh4aHIpO1xyXG4gICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgcmVzb2x2ZSh4aHIucmVzcG9uc2VUZXh0KTtcclxuICAgICAgICAgIH1cclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgcmVqZWN0KHhoci5zdGF0dXNUZXh0KTtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9KVxyXG59XHJcblxyXG5mdW5jdGlvbiBzZXRYSFJIZWFkZXJzKHhociwgaGVhZGVycykge1xyXG4gIGZvciAobGV0IGhlYWRlciBpbiBoZWFkZXJzKSB7XHJcbiAgICB4aHIuc2V0UmVxdWVzdEhlYWRlcihoZWFkZXIsIGhlYWRlcnNbaGVhZGVyXSk7XHJcbiAgfVxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBhamF4O1xyXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi91dGlscy9hamF4LmpzIiwiY29uc3Qgbm9kZUZhY3RvcnkgPSBmdW5jdGlvbih0eXBlID0gJ2RpdicsIHBhcmFtcyA9IHt9KSB7XHJcbiAgY29uc3Qgbm9kZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQodHlwZSk7XHJcblxyXG4gIGFwcGVuZENsYXNzZXMobm9kZSwgcGFyYW1zKTtcclxuICBhcHBlbmRBdHRycyhub2RlLCBwYXJhbXMpO1xyXG4gIGluc2VydFRleHRDb250ZW50KG5vZGUsIHBhcmFtcyk7XHJcblxyXG4gIHJldHVybiBub2RlO1xyXG59XHJcblxyXG5mdW5jdGlvbiBhcHBlbmRDbGFzc2VzKG5vZGUsIHsgY2xhc3NMaXN0IH0pIHtcclxuICBpZiAoY2xhc3NMaXN0ICYmIGNsYXNzTGlzdC5mb3JFYWNoKSB7XHJcbiAgICBjbGFzc0xpc3QuZm9yRWFjaChjbGFzc05hbWUgPT4gbm9kZS5jbGFzc0xpc3QuYWRkKGNsYXNzTmFtZSkpO1xyXG4gIH1cclxufVxyXG5cclxuZnVuY3Rpb24gYXBwZW5kQXR0cnMobm9kZSwgeyBhdHRycyB9KSB7XHJcbiAgaWYgKGF0dHJzKSB7XHJcbiAgICBjb25zdCBhdHRyTmFtZXMgPSBPYmplY3Qua2V5cyhhdHRycyk7XHJcbiAgICBhdHRyTmFtZXMuZm9yRWFjaChhdHRyTmFtZSA9PiBub2RlLnNldEF0dHJpYnV0ZShhdHRyTmFtZSwgYXR0cnNbYXR0ck5hbWVdKSk7XHJcbiAgfVxyXG59XHJcblxyXG5mdW5jdGlvbiBpbnNlcnRUZXh0Q29udGVudChub2RlLCB7IHRleHRDb250ZW50ID0gXCJcIiB9KSB7XHJcbiAgbm9kZS50ZXh0Q29udGVudCA9IHRleHRDb250ZW50O1xyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBub2RlRmFjdG9yeTtcclxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vdXRpbHMvbm9kZUZhY3RvcnkuanMiLCJjb25zdCBwdWJzdWIgPSAoZnVuY3Rpb24oKSB7XHJcblxyXG4gIGNvbnN0IHRvcGljcyA9IHt9O1xyXG5cclxuICByZXR1cm4ge1xyXG4gICAgc3Vic2NyaWJlOiBmdW5jdGlvbih0b3BpYywgbGlzdGVuZXIpIHtcclxuICAgICAgaWYgKCF0b3BpY3NbdG9waWNdKSB0b3BpY3NbdG9waWNdID0geyBxdWV1ZTogW10gfTtcclxuXHJcbiAgICAgIGNvbnN0IGluZGV4ID0gdG9waWNzW3RvcGljXS5xdWV1ZS5wdXNoKGxpc3RlbmVyKSAtIDE7XHJcbiAgICAgIC8vIGZ1bmN0aW9uIHRvIGRlbGV0ZSB0b3BpY1xyXG4gICAgICByZXR1cm4ge1xyXG4gICAgICAgIHJlbW92ZTogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICBkZWxldGUgdG9waWNzW3RvcGljXS5xdWV1ZVtpbmRleF07XHJcbiAgICAgICAgfVxyXG4gICAgICB9O1xyXG4gICAgfSxcclxuXHJcbiAgICBwdWJsaXNoOiBmdW5jdGlvbih0b3BpYywgaW5mbykge1xyXG4gICAgICAvLyBubyB0aGVtZSBvciBubyBsaXN0ZW5lcnNcclxuICAgICAgaWYgKCF0b3BpY3NbdG9waWNdIHx8ICF0b3BpY3NbdG9waWNdLnF1ZXVlLmxlbmd0aCkgcmV0dXJuO1xyXG5cclxuICAgICAgY29uc3QgaXRlbXMgPSB0b3BpY3NbdG9waWNdLnF1ZXVlO1xyXG4gICAgICBpdGVtcy5mb3JFYWNoKGl0ZW0gPT4ge1xyXG4gICAgICAgIGl0ZW0oaW5mbyB8fCB7fSk7XHJcbiAgICAgIH0pO1xyXG4gICAgfVxyXG4gIH07XHJcbn0pKCk7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBwdWJzdWI7XHJcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3V0aWxzL3B1YnN1Yi5qcyIsImltcG9ydCBTdGF0ZSBmcm9tICcuL21vZGVsX2NvbXBvbmVudHMvc3RhdGUnO1xyXG5pbXBvcnQgcHVic3ViIGZyb20gJy4uL3V0aWxzL3B1YnN1Yic7XHJcbmltcG9ydCBSZXBvcnQgZnJvbSAnLi9yZXBvcnQnO1xyXG5cclxuY29uc3QgSU5JVElBTF9TVEFURV9OQU1FID0gJ9Ch0L7RgdGC0L7Rj9C90LjQtSDQvNC+0LTQtdC70LgnO1xyXG5jb25zdCBTVE9QX1NUQVRFX05BTUUgPSAn0J7QsdGD0YfQtdC90LjQtSDQvtGB0YLQsNC90L7QstC70LXQvdC+JztcclxuXHJcbmNsYXNzIE1vZGVsIHtcclxuICBjb25zdHJ1Y3RvcihkYXRhKSB7XHJcbiAgICB0aGlzLmlkID0gZGF0YS5pZDtcclxuICAgIHRoaXMubmFtZSA9IGRhdGEubmFtZTtcclxuICAgIHRoaXMuYnJlYWtUaW1lID0gZGF0YS5icmVha1RpbWU7XHJcbiAgICB0aGlzLnN0ZXBzID0gZGF0YS5zdGVwcztcclxuXHJcbiAgICB0aGlzLnN0YXRlcyA9IGRhdGEuc3RhdGVzLm1hcChzdGF0ZSA9PiBuZXcgU3RhdGUoc3RhdGUpKTtcclxuICAgIHRoaXMuY3VycmVudFN0YXRlID0gdGhpcy5nZXRTdGF0ZShkYXRhLmluaXRpYWxTdGF0ZSk7XHJcblxyXG4gICAgdGhpcy50aW1lb3V0ID0gbnVsbDtcclxuICAgIHRoaXMuc3ViSW5wdXQgPSBudWxsO1xyXG4gICAgdGhpcy5zdWJTdG9wID0gbnVsbDtcclxuICAgIHRoaXMuc3RhcnRTdGF0ZSA9IG5ldyBTdGF0ZSh7IGlkOiAwLCBuYW1lOiBJTklUSUFMX1NUQVRFX05BTUUsIGltZzogJ2ltZy9zdGFydC5wbmcnLCBsYXN0OiB0cnVlIH0pO1xyXG4gICAgdGhpcy5zdG9wU3RhdGUgPSBuZXcgU3RhdGUoeyBpZDogLTEsIG5hbWU6IFNUT1BfU1RBVEVfTkFNRSwgaW1nOiAnaW1nL3N0b3AucG5nJywgbGFzdDogdHJ1ZSB9KTtcclxuICB9XHJcblxyXG4gIGdldFN0YXRlKGlkKSB7XHJcbiAgICByZXR1cm4gdGhpcy5zdGF0ZXMuZmluZChzdGF0ZSA9PiBzdGF0ZS5pZCA9PSBpZCk7XHJcbiAgfVxyXG5cclxuICBzdGFydCgpIHtcclxuICAgIHRoaXMucmVwb3J0ID0gbmV3IFJlcG9ydCh0aGlzLm5hbWUsIHRoaXMuc3RlcHMpO1xyXG4gICAgdGhpcy5oYW5kbGVOZXdTdGF0ZSh0aGlzLmN1cnJlbnRTdGF0ZSk7IC8vIHNldCBpbml0aWFsIHN0YXRlXHJcbiAgICBsZXQgaW50ZXJ2YWxzID0gUHJvbWlzZS5yZXNvbHZlKCk7IC8vIGluaXQgcHJvbWlzZSBjaGFpblxyXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLnN0ZXBzOyBpKyspIHtcclxuICAgICAgaW50ZXJ2YWxzID0gaW50ZXJ2YWxzXHJcbiAgICAgICAudGhlbigoKSA9PiB7IHJldHVybiB0aGlzLm1ha2VCcmVhaygpIH0pXHJcbiAgICAgICAudGhlbigoKSA9PiB7IHJldHVybiB0aGlzLmhhbmRsZUV2ZW50KCkgfSlcclxuICAgICAgIC50aGVuKHN0YXRlID0+IHsgdGhpcy5oYW5kbGVOZXdTdGF0ZShzdGF0ZSkgfSlcclxuICAgIH1cclxuICAgIGludGVydmFsc1xyXG4gICAgICAuY2F0Y2goc3RhdGUgPT4gdGhpcy5oYW5kbGVOZXdTdGF0ZShzdGF0ZSkpXHJcbiAgICAgIC50aGVuKCgpID0+IHtcclxuICAgICAgICBpZiAodGhpcy5jdXJyZW50U3RhdGUubmFtZSAhPT0gU1RPUF9TVEFURV9OQU1FKSB7XHJcbiAgICAgICAgICB0aGlzLnJlcG9ydC5zZW5kKClcclxuICAgICAgICAgIC50aGVuKChyZXNwb25zZSkgPT4gY29uc29sZS5sb2cocmVzcG9uc2UpKTtcclxuICAgICAgICB9XHJcbiAgICAgIH0pO1xyXG4gICAgcmV0dXJuIGludGVydmFscztcclxuICB9XHJcblxyXG4gIG1ha2VCcmVhaygpIHtcclxuICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XHJcbiAgICAgIHRoaXMuc3ViU3RvcCA9IHB1YnN1Yi5zdWJzY3JpYmUoJ21vZGVsX3N0b3AnLCAoKSA9PiB7IHJlamVjdCh0aGlzLnN0b3BTdGF0ZSk7IH0pXHJcbiAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgIHRoaXMuY2xlYXJTdWJzKCk7XHJcbiAgICAgICAgcmVzb2x2ZSgpXHJcbiAgICAgIH0sIHRoaXMuYnJlYWtUaW1lKTtcclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgaGFuZGxlRXZlbnQoKSB7XHJcbiAgICBjb25zdCBldmVudCA9IHRoaXMuY3VycmVudFN0YXRlLmV2ZW50O1xyXG4gICAgY29uc3QgZXZlbnRTdGFydFRpbWUgPSBEYXRlLm5vdygpO1xyXG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcclxuICAgICAgLy8gc2VuZCBkYXRhIGFib3V0IG5ldyBldmVudCB0byBvdGhlciBtb2R1bGVzXHJcbiAgICAgIHB1YnN1Yi5wdWJsaXNoKCdldmVudCcsIGV2ZW50KTtcclxuXHJcbiAgICAgIC8vIGxpc3RlbiB0byB1c2VyIGFjdGlvblxyXG4gICAgICAvLyBhbmQgaWYgdXNlciBpbnB1dCBjb3JyZWN0IGdvIHRvIG5leHQgc3RhdGVcclxuICAgICAgdGhpcy5zdWJJbnB1dCA9IHB1YnN1Yi5zdWJzY3JpYmUoJ3VzZXJfaW5wdXQnLCBkYXRhID0+IHtcclxuICAgICAgICB0aGlzLnJlcG9ydC5pbmNyZWFzZUFjdGlvbnNOdW1iZXIoKTtcclxuICAgICAgICBjb25zdCB0aW1lU3BlbnQgPSBEYXRlLm5vdygpIC0gZXZlbnRTdGFydFRpbWU7XHJcbiAgICAgICAgY29uc3QgbmV4dFN0YXRlSWQgPSB0aGlzLmN1cnJlbnRTdGF0ZS5oYW5kbGVJbnB1dChkYXRhLCB0aW1lU3BlbnQpO1xyXG4gICAgICAgIGNvbnN0IG5leHRTdGF0ZSA9IHRoaXMuZ2V0U3RhdGUobmV4dFN0YXRlSWQpO1xyXG4gICAgICAgIGlmICggbmV4dFN0YXRlICkge1xyXG4gICAgICAgICAgdGhpcy5yZXBvcnQuc2V0U3BlbnRUaW1lKHRpbWVTcGVudCk7XHJcbiAgICAgICAgICBuZXh0U3RhdGUubGFzdCA/IHJlamVjdChuZXh0U3RhdGUpIDogcmVzb2x2ZShuZXh0U3RhdGUpO1xyXG4gICAgICAgIH1cclxuICAgICAgfSk7XHJcblxyXG4gICAgICAvLyBoYW5kbGUgdXNlciBzdG9wIGJ1dHRvbiBjbGlja1xyXG4gICAgICB0aGlzLnN1YlN0b3AgPSBwdWJzdWIuc3Vic2NyaWJlKCdtb2RlbF9zdG9wJywgKCkgPT4ge1xyXG4gICAgICAgIHJlamVjdCh0aGlzLnN0b3BTdGF0ZSk7XHJcbiAgICAgIH0pO1xyXG5cclxuICAgICAgLy8gaGFuZGxlIGluYWN0aXZlXHJcbiAgICAgIGNvbnN0IGluYWN0aXZlVGltZSA9IHRoaXMuY3VycmVudFN0YXRlLmdldEluYWN0aXZlVGltZSgpO1xyXG4gICAgICB0aGlzLnRpbWVvdXQgPSBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgICBjb25zdCBuZXh0U3RhdGVJZCA9IHRoaXMuY3VycmVudFN0YXRlLmdldEluYWN0aXZlQWN0aW9uKCkubmV4dFN0YXRlO1xyXG4gICAgICAgIGNvbnN0IG5leHRTdGF0ZSA9IHRoaXMuZ2V0U3RhdGUobmV4dFN0YXRlSWQpO1xyXG4gICAgICAgIG5leHRTdGF0ZS5sYXN0ID8gcmVqZWN0KG5leHRTdGF0ZSkgOiByZXNvbHZlKG5leHRTdGF0ZSk7XHJcbiAgICAgIH0sIGluYWN0aXZlVGltZSk7XHJcbiAgICB9KVxyXG4gIH1cclxuXHJcbiAgaGFuZGxlTmV3U3RhdGUoc3RhdGUpIHtcclxuICAgIHRoaXMucmVwb3J0LnB1c2hTdGF0ZShzdGF0ZSk7XHJcbiAgICB0aGlzLmN1cnJlbnRTdGF0ZSA9IHN0YXRlO1xyXG4gICAgY2xlYXJUaW1lb3V0KHRoaXMudGltZW91dCk7XHJcbiAgICB0aGlzLmNsZWFyU3VicygpO1xyXG4gICAgcHVic3ViLnB1Ymxpc2goJ25ld19zdGF0ZScsIHN0YXRlKTtcclxuICB9XHJcblxyXG4gIGNsZWFyU3VicygpIHtcclxuICAgIGlmICh0aGlzLnN1YklucHV0KSB7XHJcbiAgICAgIHRoaXMuc3ViSW5wdXQucmVtb3ZlKCk7XHJcbiAgICB9XHJcbiAgICBpZiAodGhpcy5zdWJTdG9wKSB7XHJcbiAgICAgIHRoaXMuc3ViU3RvcC5yZW1vdmUoKTtcclxuICAgIH1cclxuICB9XHJcblxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBNb2RlbDtcclxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vbGVhcm5pbmcvbW9kZWwuanMiLCJpbXBvcnQgc3RhdGUgZnJvbSAnLi9zY2VuZV9jb21wb25lbnRzL3N0YXRlJztcclxuaW1wb3J0IHRvb2xzIGZyb20gJy4vc2NlbmVfY29tcG9uZW50cy90b29scyc7XHJcblxyXG5jb25zdCBleHBvcnRzID0ge307XHJcblxyXG4vLyBTY2VuZSBtZXRhZGF0YVxyXG5jb25zdCAkbW9kZWxOYW1lID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLm1vZGVsLW5hbWUnKTtcclxuZXhwb3J0cy5pbml0ID0gZnVuY3Rpb24obW9kZWwsIHJlc3BvbnNlKSB7XHJcbiAgJG1vZGVsTmFtZS50ZXh0Q29udGVudCA9IG1vZGVsLm5hbWU7XHJcbiAgc3RhdGUuc2V0KG1vZGVsLnN0YXJ0U3RhdGUpO1xyXG4gIHRvb2xzLmluaXQocmVzcG9uc2UudG9vbHMpO1xyXG4gIHJldHVybiB0aGlzO1xyXG59XHJcblxyXG4vLyBNYW5hZ2UgY29udGVudCB2aXNpYmlsaXR5XHJcbmNvbnN0ICRjb250ZW50ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmNvbnRlbnQnKTtcclxuZXhwb3J0cy5zaG93Q29udGVudCA9IGZ1bmN0aW9uKCkge1xyXG4gIHNldENvbnRlbnREaXNwbGF5KCdmbGV4Jyk7XHJcbiAgcmV0dXJuIHRoaXM7XHJcbn1cclxuZXhwb3J0cy5oaWRlQ29udGVudCA9IGZ1bmN0aW9uKCkge1xyXG4gIHNldENvbnRlbnREaXNwbGF5KCdub25lJyk7XHJcbiAgcmV0dXJuIHRoaXM7XHJcbn1cclxuZnVuY3Rpb24gc2V0Q29udGVudERpc3BsYXkoZGlzcGxheSkge1xyXG4gICRjb250ZW50LnN0eWxlLmRpc3BsYXkgPSBkaXNwbGF5O1xyXG59XHJcblxyXG4vLyBNYW5hZ2UgYnV0dG9ucyBzdGF0ZVxyXG5leHBvcnRzLmVuYWJsZUJ1dHRvbnMgPSBmdW5jdGlvbiguLi5idXR0b25zKSB7XHJcbiAgc2V0QnV0dG9uc1N0YXRlKGJ1dHRvbnMsIGZhbHNlKTtcclxuICByZXR1cm4gdGhpcztcclxufVxyXG5leHBvcnRzLmRpc2FibGVCdXR0b25zID0gZnVuY3Rpb24oLi4uYnV0dG9ucykge1xyXG4gIHNldEJ1dHRvbnNTdGF0ZShidXR0b25zLCB0cnVlKTtcclxuICByZXR1cm4gdGhpcztcclxufVxyXG5mdW5jdGlvbiBzZXRCdXR0b25zU3RhdGUoYnV0dG9ucywgdmFsdWUpIHtcclxuICBidXR0b25zLmZvckVhY2goYnV0dG9uID0+IGJ1dHRvbi5kaXNhYmxlZCA9IHZhbHVlKTtcclxufVxyXG5cclxuLy8gRGVsZWdhdGUgcHVibGljIG1ldGhvZHMgdG8gY29tcG9uZW50c1xyXG5leHBvcnRzLmdldFRvb2xzRGF0YSA9ICgpID0+XHJcbiAgdG9vbHMuZ2V0VG9vbHNEYXRhKCk7XHJcblxyXG5leHBvcnRzLnNldFN0YXRlID0gc3RhdGVEYXRhID0+XHJcbiAgc3RhdGUuc2V0KHN0YXRlRGF0YSk7XHJcblxyXG5leHBvcnRzLnNob3dFdmVudCA9IGV2ZW50RGF0YSA9PlxyXG4gIHN0YXRlLnNob3dFdmVudChldmVudERhdGEpO1xyXG5cclxuZXhwb3J0cy5oaWRlRXZlbnQgPSAoKSA9PlxyXG4gIHN0YXRlLmhpZGVFdmVudCgpO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgZXhwb3J0cztcclxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vbGVhcm5pbmcvc2NlbmUuanMiLCIvLyByZW1vdmVkIGJ5IGV4dHJhY3QtdGV4dC13ZWJwYWNrLXBsdWdpblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4uL3Nhc3MvbGVhcm5pbmcuc2Nzc1xuLy8gbW9kdWxlIGlkID0gOVxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJjbGFzcyBBY3Rpb24ge1xyXG4gIGNvbnN0cnVjdG9yKGRhdGEpIHtcclxuICAgIHRoaXMubWluVGltZSA9IGRhdGEubWluVGltZTtcclxuICAgIHRoaXMubWF4VGltZSA9IGRhdGEubWF4VGltZTtcclxuICAgIHRoaXMubmV4dFN0YXRlID0gZGF0YS5uZXh0U3RhdGU7XHJcbiAgICBpZiAoZGF0YS5pbmFjdGl2ZSkge1xyXG4gICAgICB0aGlzLmluYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgdGhpcy50b29scyA9IFtdO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdGhpcy5pbmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICB0aGlzLnRvb2xzID0gdGhpcy5pbml0VG9vbHMoZGF0YS50b29scyk7XHJcbiAgICB9XHJcblxyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogQHBhcmFtIFt7IGlkOiBOdW1iZXIsIHZhbHVlOiBOdW1iZXIvQm9vbGVhbiB9LCB7Li4ufV1cclxuICAgKiBAcGFyYW0gTnVtYmVyXHJcbiAgICogQHJldHVybiBCb29sZWFuXHJcbiAgICovXHJcbiAgaXNTdWl0YWJsZShkYXRhLCB0aW1lKSB7XHJcbiAgICByZXR1cm4gdGhpcy5yaWdodFRpbWUodGltZSkgJiYgdGhpcy5yaWdodERhdGEoZGF0YSk7XHJcbiAgfVxyXG5cclxuICByaWdodERhdGEoZGF0YSA9IFtdKSB7XHJcbiAgICByZXR1cm4gdGhpcy50b29scy5ldmVyeSh0b29sID0+IHtcclxuICAgICAgLy8g0JXRgdC70Lgg0YHRgNC10LTQuCDQv9C+0LvRg9GH0LXQvdC90YvRhSDQuNGC0LXQvNC+0LIg0L3QtdGCLCDRgtC+0LPQviDQutC+0YLQvtGA0YvQuSDQtdGB0YLRjCDQsiDQtNCw0L3QvdC+0Lwg0Y3QutGI0LXQvdC1XHJcbiAgICAgIGNvbnN0IGNoZWNrVG9vbCA9IGRhdGEuZmluZChvYmogPT4gb2JqLmlkID09IHRvb2wuaWQpO1xyXG4gICAgICBpZiAoIWNoZWNrVG9vbCkgeyByZXR1cm4gZmFsc2U7IH1cclxuXHJcbiAgICAgIGlmICh0b29sLnR5cGUgPT09ICdzd2l0Y2gnKSB7IHJldHVybiBjaGVja1Rvb2wudmFsdWUgPT09IHRvb2wuYm9vbFZhbHVlOyB9XHJcblxyXG4gICAgICBpZiAodG9vbC50eXBlID09PSAncmFuZ2UnKSB7IHJldHVybiB0aGlzLmluY2x1ZGVzVmFsdWUoY2hlY2tUb29sLnZhbHVlLCBbIHRvb2wubWluVmFsdWUsIHRvb2wubWF4VmFsdWUgXSkgfVxyXG5cclxuICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICBpbmNsdWRlc1ZhbHVlKHZhbHVlLCBib3JkZXJzKSB7XHJcbiAgICBpZiAodHlwZW9mIHZhbHVlICE9PSAnbnVtYmVyJykgdGhyb3cgbmV3IFR5cGVFcnJvcignVmFsdWUgc2hvdWxkIGJlIGludGVnZXInKTtcclxuICAgIHJldHVybiAodmFsdWUgPj0gYm9yZGVyc1swXSkgJiYgKHZhbHVlIDw9IGJvcmRlcnNbMV0pO1xyXG4gIH1cclxuXHJcbiAgcmlnaHRUaW1lKHRpbWUpIHtcclxuICAgIGlmICh0eXBlb2YgdGltZSAhPT0gJ251bWJlcicpIHRocm93IG5ldyBUeXBlRXJyb3IoJ1RpbWUgc2hvdWxkIGJlIGludGVnZXIgKG1zKScpO1xyXG4gICAgcmV0dXJuICh0aW1lID49IHRoaXMubWluVGltZSkgJiYgKHRpbWUgPD0gdGhpcy5tYXhUaW1lKTtcclxuICB9XHJcblxyXG4gIGluaXRUb29scyh0b29scykge1xyXG4gICAgcmV0dXJuIHRvb2xzLm1hcCh0b29sID0+IHtcclxuICAgICAgcmV0dXJuIHtcclxuICAgICAgICBpZDogdG9vbC5pZCxcclxuICAgICAgICB0eXBlOiB0b29sLnR5cGUsXHJcbiAgICAgICAgbWluVmFsdWU6IHRvb2wuQWN0aW9uVG9vbC5taW5WYWx1ZSxcclxuICAgICAgICBtYXhWYWx1ZTogdG9vbC5BY3Rpb25Ub29sLm1heFZhbHVlLFxyXG4gICAgICAgIGJvb2xWYWx1ZTogdG9vbC5BY3Rpb25Ub29sLmJvb2xWYWx1ZVxyXG4gICAgICB9XHJcbiAgICB9KTtcclxuICB9XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IEFjdGlvbjtcclxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vbGVhcm5pbmcvbW9kZWxfY29tcG9uZW50cy9hY3Rpb24uanMiLCJjbGFzcyBFdmVudCB7XHJcbiAgY29uc3RydWN0b3IoZGF0YSkge1xyXG4gICAgdGhpcy5pZCA9IGRhdGEuaWQ7XHJcbiAgICB0aGlzLm5hbWUgPSBkYXRhLm5hbWU7XHJcbiAgICB0aGlzLmRlc2NyaXB0aW9uID0gZGF0YS5kZXNjcmlwdGlvbjtcclxuICB9XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IEV2ZW50O1xyXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9sZWFybmluZy9tb2RlbF9jb21wb25lbnRzL2V2ZW50LmpzIiwiaW1wb3J0IEV2ZW50IGZyb20gJy4vZXZlbnQnIDtcclxuaW1wb3J0IEFjdGlvbiBmcm9tICcuL2FjdGlvbic7XHJcblxyXG5jbGFzcyBTdGF0ZSB7XHJcbiAgY29uc3RydWN0b3IoZGF0YSkge1xyXG4gICAgdGhpcy5pZCA9IGRhdGEuaWQ7XHJcbiAgICB0aGlzLm5hbWUgPSBkYXRhLm5hbWU7XHJcbiAgICB0aGlzLmltZyA9IGRhdGEuaW1nO1xyXG4gICAgdGhpcy5wYXJhbXMgPSBkYXRhLnBhcmFtcztcclxuXHJcbiAgICBpZihkYXRhLmxhc3QpIHtcclxuICAgICAgdGhpcy5sYXN0ID0gdHJ1ZTtcclxuICAgICAgdGhpcy5ldmVudCA9IG51bGw7XHJcbiAgICAgIHRoaXMuYWN0aW9ucyA9IG51bGw7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB0aGlzLmV2ZW50ID0gbmV3IEV2ZW50KGRhdGEuZXZlbnQpO1xyXG4gICAgICB0aGlzLmFjdGlvbnMgPSBkYXRhLmFjdGlvbnMubWFwKGFjdGlvbiA9PiBuZXcgQWN0aW9uKGFjdGlvbikpO1xyXG4gICAgICB0aGlzLmxhc3QgPSBmYWxzZTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIGdldEluYWN0aXZlVGltZSgpIHtcclxuICAgIGNvbnN0IHRpbWVzID0gdGhpcy5nZXRBbGxBY3Rpb25UaW1lcygpO1xyXG4gICAgcmV0dXJuIE1hdGgubWF4KC4uLnRpbWVzKTtcclxuICB9XHJcblxyXG4gIGdldEluYWN0aXZlQWN0aW9uKCkge1xyXG4gICAgcmV0dXJuIHRoaXMuYWN0aW9ucy5maW5kKGFjdGlvbiA9PiBhY3Rpb24uaW5hY3RpdmUgPT09IHRydWUpO1xyXG4gIH1cclxuXHJcbiAgZ2V0QWxsQWN0aW9uVGltZXMoKSB7XHJcbiAgICByZXR1cm4gdGhpcy5hY3Rpb25zLm1hcChhY3Rpb24gPT4gYWN0aW9uLm1heFRpbWUgfHwgMCk7XHJcbiAgfVxyXG5cclxuICBoYW5kbGVJbnB1dChkYXRhLCB0aW1lKSB7XHJcbiAgICBjb25zdCBzdWl0ZWRBY3Rpb25zID0gdGhpcy5hY3Rpb25zLmZpbHRlcihhY3Rpb24gPT4gYWN0aW9uLmlzU3VpdGFibGUoZGF0YSwgdGltZSkpO1xyXG4gICAgaWYgKHN1aXRlZEFjdGlvbnMubGVuZ3RoID4gMCkge1xyXG4gICAgICByZXR1cm4gc3VpdGVkQWN0aW9uc1swXS5uZXh0U3RhdGU7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gbnVsbDtcclxuICB9XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IFN0YXRlO1xyXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9sZWFybmluZy9tb2RlbF9jb21wb25lbnRzL3N0YXRlLmpzIiwiaW1wb3J0IGFqYXggZnJvbSAnLi4vdXRpbHMvYWpheCc7XHJcblxyXG5jb25zdCBSRVBPUlRfVVJMID0gJy9sZWFybmluZy9yZXBvcnQnO1xyXG5jb25zdCBhamF4Q29uZmlnID0ge1xyXG4gIG1ldGhvZDogJ1BPU1QnLFxyXG4gIGhlYWRlcnM6IHtcclxuICAgICdDb250ZW50LXR5cGUnOiAnYXBwbGljYXRpb24vanNvbidcclxuICB9XHJcbn1cclxuXHJcbmNsYXNzIFJlcG9ydCB7XHJcbiAgY29uc3RydWN0b3IobmFtZSwgc3RlcHMpIHtcclxuICAgIHRoaXMubW9kZWxOYW1lID0gbmFtZTtcclxuICAgIHRoaXMubWF4U3RlcHMgPSBzdGVwcztcclxuICAgIHRoaXMuc3RhdGVzID0gW107XHJcbiAgICB0aGlzLmN1cnJlbnRTdGF0ZSA9IG51bGw7XHJcbiAgfVxyXG5cclxuICBwdXNoU3RhdGUoc3RhdGUpIHtcclxuICAgIGNvbnN0IHsgbmFtZSB9ID0gc3RhdGU7XHJcbiAgICBjb25zdCBtYXhUaW1lID0gc3RhdGUubGFzdCA/IC0xIDogc3RhdGUuZ2V0SW5hY3RpdmVUaW1lKCk7XHJcbiAgICBjb25zdCBpbmFjdGl2ZSA9IHRydWU7XHJcbiAgICBjb25zdCBhY3Rpb25zTnVtYmVyID0gMDtcclxuICAgIHRoaXMuc3RhdGVzLnB1c2goeyBuYW1lLCBtYXhUaW1lLCBpbmFjdGl2ZSwgYWN0aW9uc051bWJlciB9KTtcclxuICAgIHRoaXMuY3VycmVudFN0YXRlID0gdGhpcy5zdGF0ZXNbdGhpcy5zdGF0ZXMubGVuZ3RoIC0gMV07XHJcbiAgfVxyXG5cclxuICBpbmNyZWFzZUFjdGlvbnNOdW1iZXIoKSB7XHJcbiAgICB0aGlzLmN1cnJlbnRTdGF0ZS5hY3Rpb25zTnVtYmVyKys7XHJcbiAgfVxyXG5cclxuICBzZXRTcGVudFRpbWUodGltZSkge1xyXG4gICAgdGhpcy5jdXJyZW50U3RhdGUuc3BlbnRUaW1lID0gdGltZTtcclxuICAgIHRoaXMuc2V0SW5hY3RpdmUoZmFsc2UpO1xyXG4gIH1cclxuXHJcbiAgc2V0SW5hY3RpdmUodmFsdWUpIHtcclxuICAgIHRoaXMuY3VycmVudFN0YXRlLmluYWN0aXZlID0gdmFsdWU7XHJcbiAgfVxyXG5cclxuICBzZW5kKCkge1xyXG4gICAgaWYgKHRoaXMuc3RhdGVzLmxlbmd0aCA+IDEpIHtcclxuICAgICAgLy8gcmVtb3ZlIGxhc3Qgc3RhdGUgLSB1c2VyIGNhbid0IG1ha2UgYW55IGFjdGlvblxyXG4gICAgICB0aGlzLnN0YXRlcyA9IHRoaXMuc3RhdGVzLnNsaWNlKDAsIC0xKTtcclxuICAgIH1cclxuICAgIGFqYXhDb25maWcuZGF0YSA9IEpTT04uc3RyaW5naWZ5KHtcclxuICAgICAgbW9kZWxOYW1lOiB0aGlzLm1vZGVsTmFtZSxcclxuICAgICAgbWF4U3RlcHM6IHRoaXMuc3RlcHMsXHJcbiAgICAgIHN0YXRlczogdGhpcy5zdGF0ZXNcclxuICAgIH0pO1xyXG4gICAgcmV0dXJuIGFqYXgoUkVQT1JUX1VSTCwgYWpheENvbmZpZyk7XHJcbiAgfVxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBSZXBvcnQ7XHJcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2xlYXJuaW5nL3JlcG9ydC5qcyIsImltcG9ydCBub2RlRmFjdG9yeSBmcm9tICcuLi8uLi91dGlscy9ub2RlRmFjdG9yeSc7XHJcbmltcG9ydCB0aW1lciBmcm9tICcuLi8uLi91dGlscy90aW1lcic7XHJcblxyXG5jb25zdCAkbmFtZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5tb2RlbC1zdGF0ZS1uYW1lJyk7XHJcbmNvbnN0ICRpbWcgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcubW9kZWwtc3RhdGUtaW1nJyk7XHJcbmNvbnN0ICRwYXJhbXMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcubW9kZWwtcGFyYW1zLXZhbHVlcycpO1xyXG5cclxuY29uc3QgJGV2ZW50ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLm1vZGVsLWV2ZW50Jyk7XHJcbmNvbnN0ICRldmVudEhlYWRlciA9ICRldmVudC5xdWVyeVNlbGVjdG9yKCcubW9kZWwtZXZlbnQtbmFtZSBzcGFuJyk7XHJcbmNvbnN0ICRldmVudEJvZHkgPSAkZXZlbnQucXVlcnlTZWxlY3RvcignLm1vZGVsLWV2ZW50LWluZm8nKTtcclxuXHJcbmNvbnN0ICR0aW1lckNvbnRhaW5lciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5tb2RlbC10aW1lcicpO1xyXG4kdGltZXJDb250YWluZXIuYXBwZW5kQ2hpbGQodGltZXIubm9kZSk7XHJcblxyXG5mdW5jdGlvbiBzZXQoeyBuYW1lLCBpbWcsIHBhcmFtcyB9KSB7XHJcbiAgJG5hbWUudGV4dENvbnRlbnQgPSBuYW1lO1xyXG4gICRpbWcuc2V0QXR0cmlidXRlKCdzcmMnLCBpbWcpO1xyXG4gIHNldFBhcmFtZXRlcnMocGFyYW1zKTtcclxufVxyXG5cclxuZnVuY3Rpb24gc2V0UGFyYW1ldGVycyhwYXJhbXMgPSBbXSkge1xyXG4gIGNvbnN0IGZyYWcgPSBkb2N1bWVudC5jcmVhdGVEb2N1bWVudEZyYWdtZW50KCk7XHJcbiAgcGFyYW1zLmZvckVhY2gocGFyYW0gPT4gZnJhZy5hcHBlbmRDaGlsZChjcmVhdGVQYXJhbWV0ZU5vZGUocGFyYW0ubmFtZSwgcGFyYW0udmFsdWUpKSk7XHJcblxyXG4gICRwYXJhbXMuaW5uZXJIVE1MID0gXCJcIjtcclxuICAkcGFyYW1zLmFwcGVuZENoaWxkKGZyYWcpO1xyXG59XHJcblxyXG5mdW5jdGlvbiBjcmVhdGVQYXJhbWV0ZU5vZGUoa2V5LCB2YWx1ZSkge1xyXG4gIGNvbnN0IGRpdiA9IG5vZGVGYWN0b3J5KCdkaXYnLCB7IGNsYXNzTGlzdDogWydwYXJhbWV0ZXInXSB9KTtcclxuXHJcbiAgY29uc3Qga2V5U3BhbiA9IG5vZGVGYWN0b3J5KCdzcGFuJywgeyB0ZXh0Q29udGVudDoga2V5IH0pO1xyXG4gIGRpdi5hcHBlbmRDaGlsZChrZXlTcGFuKTtcclxuXHJcbiAgY29uc3QgdmFsdWVTcGFuID0gbm9kZUZhY3RvcnkoJ3NwYW4nLCB7IHRleHRDb250ZW50OiB2YWx1ZSB9KTtcclxuICBkaXYuYXBwZW5kQ2hpbGQodmFsdWVTcGFuKTtcclxuXHJcbiAgcmV0dXJuIGRpdjtcclxufVxyXG5cclxuXHJcbi8qKiBTZXRzIGV2ZW50IGRhdGEgdG8gVUkgKi9cclxuZnVuY3Rpb24gc2hvd0V2ZW50KGV2ZW50KSB7XHJcbiAgJGV2ZW50SGVhZGVyLnRleHRDb250ZW50ID0gZXZlbnQubmFtZTtcclxuICAkZXZlbnRCb2R5LnRleHRDb250ZW50ID0gZXZlbnQuZGVzY3JpcHRpb247XHJcbiAgJGV2ZW50LmNsYXNzTGlzdC5yZW1vdmUoJ2lzLWhpZGRlbicsICdzbGlkZS10b3AnKTtcclxuICBzaG93VGltZXIoKTtcclxufVxyXG5mdW5jdGlvbiBoaWRlRXZlbnQoKSB7XHJcbiAgJGV2ZW50LmNsYXNzTGlzdC5hZGQoJ2lzLWhpZGRlbicsICdzbGlkZS10b3AnKTtcclxuICBoaWRlVGltZXIoKTtcclxufVxyXG5cclxuZnVuY3Rpb24gc2hvd1RpbWVyKCkge1xyXG4gICR0aW1lckNvbnRhaW5lci5jbGFzc0xpc3QucmVtb3ZlKCdpcy1oaWRkZW4nKTtcclxuICB0aW1lci5zdGFydCgpO1xyXG59XHJcbmZ1bmN0aW9uIGhpZGVUaW1lcigpIHtcclxuICAkdGltZXJDb250YWluZXIuY2xhc3NMaXN0LmFkZCgnaXMtaGlkZGVuJyk7XHJcbiAgdGltZXIuc3RvcCgpO1xyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCB7XHJcbiAgc2V0LFxyXG4gIHNob3dFdmVudCxcclxuICBoaWRlRXZlbnRcclxufVxyXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9sZWFybmluZy9zY2VuZV9jb21wb25lbnRzL3N0YXRlLmpzIiwiaW1wb3J0IG5vZGVGYWN0b3J5IGZyb20gJy4uLy4uL3V0aWxzL25vZGVGYWN0b3J5JztcclxuXHJcbmNvbnN0IHRvb2xUeXBlcyA9IHtcclxuICBSQU5HRTogJ3JhbmdlJyxcclxuICBTV0lUQ0g6ICdzd2l0Y2gnXHJcbn1cclxuY29uc3QgJHRvb2xzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnRvb2xzLWxpc3QnKTtcclxuXHJcbmZ1bmN0aW9uIGluaXQodG9vbHMpIHtcclxuICBjb25zdCBmcmFnbWVudCA9IGRvY3VtZW50LmNyZWF0ZURvY3VtZW50RnJhZ21lbnQoKTtcclxuXHJcbiAgdG9vbHMuZm9yRWFjaCh0b29sID0+IHtcclxuICAgIC8vIGNyZWF0ZSB0b29sIHdyYXBwZXJcclxuICAgIGNvbnN0IGRpdiA9IG5vZGVGYWN0b3J5KCdkaXYnLCB7IGNsYXNzTGlzdDogWyd0b29sJ10gfSk7XHJcblxyXG4gICAgY29uc3QgbGFiZWwgPSBub2RlRmFjdG9yeSgnbGFiZWwnLCB7XHJcbiAgICAgIGNsYXNzTGlzdDogWyd0b29sLW5hbWUnXSxcclxuICAgICAgYXR0cnM6IHsgXCJmb3JcIjogdG9vbC5uYW1lIH0sXHJcbiAgICAgIHRleHRDb250ZW50OiB0b29sLm5hbWVcclxuICAgIH0pO1xyXG4gICAgZGl2LmFwcGVuZENoaWxkKGxhYmVsKTtcclxuXHJcbiAgICBjb25zdCB0b29sTm9kZSA9IGNyZWF0ZVRvb2xOb2RlKHRvb2wpO1xyXG4gICAgZGl2LmFwcGVuZENoaWxkKHRvb2xOb2RlKTtcclxuXHJcbiAgICBmcmFnbWVudC5hcHBlbmRDaGlsZChkaXYpO1xyXG4gIH0pO1xyXG5cclxuICAkdG9vbHMuaW5uZXJIVE1MID0gXCJcIjtcclxuICAkdG9vbHMuYXBwZW5kQ2hpbGQoZnJhZ21lbnQpO1xyXG59XHJcblxyXG5mdW5jdGlvbiBjcmVhdGVUb29sTm9kZSh0b29sKSB7XHJcbiAgc3dpdGNoKHRvb2wudHlwZSkge1xyXG4gICAgY2FzZSB0b29sVHlwZXMuUkFOR0U6ICAgcmV0dXJuIGNyZWF0ZVJhbmdlVG9vbCh0b29sKTtcclxuICAgIGNhc2UgdG9vbFR5cGVzLlNXSVRDSDogIHJldHVybiBjcmVhdGVTd2l0Y2hUb29sKHRvb2wpO1xyXG4gICAgZGVmYXVsdDogICAgICAgICAgICAgICAgcmV0dXJuICfQndC10LjQt9Cy0LXRgdGC0L3Ri9C5INC/0YDQuNCx0L7RgCc7XHJcbiAgfVxyXG59XHJcblxyXG5mdW5jdGlvbiBjcmVhdGVSYW5nZVRvb2wodG9vbCkge1xyXG4gIGNvbnN0IGRpdklucHV0ID0gbm9kZUZhY3RvcnkoJ2RpdicsIHsgY2xhc3NMaXN0OiBbJ3JhbmdlJ10gfSk7XHJcblxyXG4gIGNvbnN0IHNwYW5NaW4gPSBub2RlRmFjdG9yeSgnc3BhbicsIHsgdGV4dENvbnRlbnQ6IHRvb2wubWluIH0pO1xyXG4gIGRpdklucHV0LmFwcGVuZENoaWxkKHNwYW5NaW4pXHJcblxyXG4gIGNvbnN0IGlucHV0ID0gbm9kZUZhY3RvcnkoJ2lucHV0Jywge1xyXG4gICAgYXR0cnM6IHtcclxuICAgICAgJ2RhdGEtaWQnOiB0b29sLmlkLFxyXG4gICAgICAnZGF0YS10eXBlJzogJ3JhbmdlJyxcclxuICAgICAgJ25hbWUnOiB0b29sLm5hbWUsXHJcbiAgICAgICd0eXBlJzogJ3JhbmdlJyxcclxuICAgICAgJ21pbic6IHRvb2wubWluLFxyXG4gICAgICAnbWF4JzogdG9vbC5tYXhcclxuICAgIH1cclxuICB9KTtcclxuICBkaXZJbnB1dC5hcHBlbmRDaGlsZChpbnB1dCk7XHJcblxyXG4gIGNvbnN0IHNwYW5NYXggPSBub2RlRmFjdG9yeSgnc3BhbicsIHsgdGV4dENvbnRlbnQ6IHRvb2wubWF4IH0pO1xyXG4gIGRpdklucHV0LmFwcGVuZENoaWxkKHNwYW5NYXgpO1xyXG5cclxuICBjb25zdCBkaXZDdXJyZW50ID0gbm9kZUZhY3RvcnkoJ2RpdicsIHsgY2xhc3NMaXN0OiBbJ3JhbmdlLWN1cnJlbnQtdmFsdWUnXSB9KTtcclxuICBjb25zdCBzcGFuQ3VycmVudCA9IG5vZGVGYWN0b3J5KCdzcGFuJywgeyB0ZXh0Q29udGVudDogaW5wdXQudmFsdWUgfSk7XHJcbiAgZGl2Q3VycmVudC5hcHBlbmRDaGlsZChzcGFuQ3VycmVudCk7XHJcblxyXG4gIGlucHV0LmFkZEV2ZW50TGlzdGVuZXIoJ2lucHV0JywgKGV2dCkgPT4ge1xyXG4gICAgc3BhbkN1cnJlbnQudGV4dENvbnRlbnQgPSBldnQudGFyZ2V0LnZhbHVlO1xyXG4gIH0pO1xyXG5cclxuICBjb25zdCBmcmFnbWVudCA9IGRvY3VtZW50LmNyZWF0ZURvY3VtZW50RnJhZ21lbnQoKTtcclxuICBmcmFnbWVudC5hcHBlbmRDaGlsZChkaXZJbnB1dCk7XHJcbiAgZnJhZ21lbnQuYXBwZW5kQ2hpbGQoZGl2Q3VycmVudCk7XHJcblxyXG4gIHJldHVybiBmcmFnbWVudDtcclxufVxyXG5cclxuZnVuY3Rpb24gY3JlYXRlU3dpdGNoVG9vbCh0b29sKSB7XHJcbiAgY29uc3QgbGFiZWwgPSBub2RlRmFjdG9yeSgnbGFiZWwnLCB7IGNsYXNzTGlzdDogWydzd2l0Y2gnXSB9KTtcclxuXHJcbiAgY29uc3QgaW5wdXQgPSBub2RlRmFjdG9yeSgnaW5wdXQnLCB7XHJcbiAgICBhdHRyczoge1xyXG4gICAgICAnZGF0YS1pZCc6IHRvb2wuaWQsXHJcbiAgICAgICdkYXRhLXR5cGUnOiAnc3dpdGNoJyxcclxuICAgICAgJ3R5cGUnOiAnY2hlY2tib3gnXHJcbiAgICB9XHJcbiAgfSk7XHJcbiAgbGFiZWwuYXBwZW5kQ2hpbGQoaW5wdXQpO1xyXG5cclxuICBjb25zdCBkaXYgPSBub2RlRmFjdG9yeSgnZGl2JywgeyBjbGFzc0xpc3Q6IFsnc2xpZGVyJ10gfSk7XHJcbiAgbGFiZWwuYXBwZW5kQ2hpbGQoZGl2KTtcclxuXHJcbiAgcmV0dXJuIGxhYmVsO1xyXG59XHJcblxyXG5mdW5jdGlvbiBnZXRUb29sc0RhdGEoKSB7XHJcbiAgY29uc3QgdG9vbHNEYXRhID0gW107XHJcbiAgY29uc3QgaW5wdXRzID0gJHRvb2xzLnF1ZXJ5U2VsZWN0b3JBbGwoJ2lucHV0W2RhdGEtaWRdJyk7XHJcbiAgaW5wdXRzLmZvckVhY2goaW5wdXQgPT4ge1xyXG4gICAgY29uc3QgeyBpZCwgdHlwZSB9ID0gaW5wdXQuZGF0YXNldDtcclxuICAgIGxldCB2YWx1ZTtcclxuICAgIHN3aXRjaCh0eXBlKSB7XHJcbiAgICAgIGNhc2UgdG9vbFR5cGVzLlJBTkdFOiB2YWx1ZSA9IHBhcnNlSW50KGlucHV0LnZhbHVlKTsgYnJlYWs7XHJcbiAgICAgIGNhc2UgdG9vbFR5cGVzLlNXSVRDSDogdmFsdWUgPSBpbnB1dC5jaGVja2VkOyBicmVhaztcclxuICAgICAgZGVmYXVsdDogdGhyb3cgbmV3IEVycm9yKGDQndC10LrQvtGA0YDQtdC60YLQvdGL0Lkg0YLQuNC/INC/0YDQuNCx0L7RgNCwLiBJRDogJHtpZH1gKTtcclxuICAgIH1cclxuICAgIHRvb2xzRGF0YS5wdXNoKHsgaWQsIHZhbHVlIH0pO1xyXG4gIH0pO1xyXG4gIHJldHVybiB0b29sc0RhdGE7XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IHtcclxuICBpbml0LFxyXG4gIGdldFRvb2xzRGF0YVxyXG59O1xyXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9sZWFybmluZy9zY2VuZV9jb21wb25lbnRzL3Rvb2xzLmpzIiwiaW1wb3J0IG5vZGVGYWN0b3J5IGZyb20gJy4vbm9kZUZhY3RvcnknO1xyXG5cclxuZnVuY3Rpb24gbXNUb0NvbnRlbnQobXMpIHtcclxuICBjb25zdCBzZWNvbmRzID0gTWF0aC5yb3VuZChtcyAvIDEwMDApO1xyXG4gIGNvbnN0IG1pbnMgPSBNYXRoLmZsb29yKHNlY29uZHMgLyA2MCk7XHJcbiAgY29uc3Qgc2Vjb25kc0xlZnQgPSBzZWNvbmRzIC0gKG1pbnMgKiA2MCk7XHJcblxyXG4gIHJldHVybiBgJHttaW5zfToke3NlY29uZHNMZWZ0ID49IDEwID8gJycgOiAnMCd9JHtzZWNvbmRzTGVmdH1gO1xyXG59XHJcblxyXG5jb25zdCB0aW1lciA9IHtcclxuICBzdGFydFRpbWU6IG51bGwsXHJcbiAgaW50ZXJ2YWw6IG51bGwsXHJcbiAgbm9kZTogbm9kZUZhY3RvcnkoJ3NwYW4nLCB7IGNsYXNzTGlzdDogWyd0aW1lciddLCB0ZXh0Q29udGVudDogJzA6MDAnIH0pLFxyXG4gIHN0YXJ0OiBmdW5jdGlvbigpIHtcclxuICAgIHRoaXMuc3RhcnRUaW1lID0gRGF0ZS5ub3coKTtcclxuICAgIHRoaXMuaW50ZXJ2YWwgPSBzZXRJbnRlcnZhbCgoKSA9PiB7XHJcbiAgICAgIGNvbnN0IGVsYXBzZWQgPSBEYXRlLm5vdygpIC0gdGhpcy5zdGFydFRpbWU7XHJcbiAgICAgIHRoaXMubm9kZS50ZXh0Q29udGVudCA9IG1zVG9Db250ZW50KGVsYXBzZWQpO1xyXG4gICAgfSwgMTAwMCk7XHJcbiAgfSxcclxuICBzdG9wOiBmdW5jdGlvbigpIHtcclxuICAgIGlmICghdGhpcy5zdGFydFRpbWUpIHsgcmV0dXJuOyB9XHJcbiAgICB0aGlzLnN0YXJ0VGltZSA9IG51bGw7XHJcbiAgICBjbGVhckludGVydmFsKHRoaXMuaW50ZXJ2YWwpO1xyXG4gICAgdGhpcy5ub2RlLnRleHRDb250ZW50ID0gJzA6MDAnO1xyXG4gIH1cclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgdGltZXI7XHJcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3V0aWxzL3RpbWVyLmpzIiwiaW1wb3J0ICcuLi8uLi9zYXNzL2xlYXJuaW5nLnNjc3MnO1xyXG5cclxuaW1wb3J0IHB1YnN1YiBmcm9tICcuLi91dGlscy9wdWJzdWInO1xyXG5pbXBvcnQgYWpheCBmcm9tICcuLi91dGlscy9hamF4JztcclxuaW1wb3J0IHNjZW5lIGZyb20gJy4vc2NlbmUnO1xyXG5pbXBvcnQgTW9kZWwgZnJvbSAnLi9tb2RlbCc7XHJcblxyXG4vKipcclxuICogTG9hZCBtb2RlbCB3aXRoIGdpdmVuIGlkXHJcbiAqL1xyXG5mdW5jdGlvbiBsb2FkTW9kZWwoaWQpIHtcclxuICByZXR1cm4gYWpheChgL21vZGVscy8ke2lkfWApLnRoZW4ocmVzcG9uc2UgPT4gSlNPTi5wYXJzZShyZXNwb25zZSkpO1xyXG59XHJcblxyXG4vKipcclxuICogVUkgYnV0dG9uJ3MgaGFuZGxlcnNcclxuICovXHJcbmNvbnN0ICRzZWxlY3QgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI21vZGVsLXNlbGVjdFwiKTtcclxuY29uc3QgJGxvYWRCdXR0b24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjbG9hZC1tb2RlbC1idG4nKTtcclxuXHJcbmxldCBtb2RlbCA9IG51bGw7XHJcblxyXG4kbG9hZEJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcclxuICBpZiAoIG1vZGVsICkgeyBtb2RlbC5zdG9wKCk7IH1cclxuICBjb25zdCBtb2RlbElkID0gJHNlbGVjdC52YWx1ZTtcclxuICBsb2FkTW9kZWwobW9kZWxJZClcclxuICAgIC50aGVuKHJlc3BvbnNlID0+IHtcclxuICAgICAgbW9kZWwgPSBuZXcgTW9kZWwocmVzcG9uc2UpO1xyXG4gICAgICBzY2VuZS5pbml0KG1vZGVsLCByZXNwb25zZSlcclxuICAgICAgICAuc2hvd0NvbnRlbnQoKVxyXG4gICAgICAgIC5lbmFibGVCdXR0b25zKCRzdGFydEJ1dHRvbilcclxuICAgICAgICAuZGlzYWJsZUJ1dHRvbnMoJHN0b3BCdXR0b24sICRydW5CdXR0b24pO1xyXG4gICAgfSlcclxuICAgIC5jYXRjaChlcnIgPT4geyBjb25zb2xlLmVycm9yKGVycikgfSk7XHJcbn0pO1xyXG4vL1xyXG5jb25zdCAkc3RhcnRCdXR0b24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjc3RhcnQtYnRuJyk7XHJcbiRzdGFydEJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcclxuICBtb2RlbC5zdGFydCgpO1xyXG4gIHNjZW5lLmRpc2FibGVCdXR0b25zKCRzdGFydEJ1dHRvbik7XHJcbiAgc2NlbmUuZW5hYmxlQnV0dG9ucygkc3RvcEJ1dHRvbiwgJHJ1bkJ1dHRvbik7XHJcbn0pO1xyXG5cclxuY29uc3QgJHN0b3BCdXR0b24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjc3RvcC1idG4nKTtcclxuJHN0b3BCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XHJcbiAgcHVic3ViLnB1Ymxpc2goJ21vZGVsX3N0b3AnKTtcclxuICBzY2VuZS5lbmFibGVCdXR0b25zKCRzdGFydEJ1dHRvbik7XHJcbiAgc2NlbmUuZGlzYWJsZUJ1dHRvbnMoJHN0b3BCdXR0b24sICRydW5CdXR0b24pO1xyXG59KTtcclxuXHJcbmNvbnN0ICRydW5CdXR0b24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjcnVuLWJ0bicpO1xyXG4kcnVuQnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xyXG4gIGNvbnN0IHRvb2xzRGF0YSA9IHNjZW5lLmdldFRvb2xzRGF0YSgpO1xyXG4gIHB1YnN1Yi5wdWJsaXNoKCd1c2VyX2lucHV0JywgdG9vbHNEYXRhKTtcclxufSk7XHJcblxyXG4vKipcclxuICogSGFuZGxlIGN1c3RvbSBldmVudHMgaGVyZSAodXNlciBpbnB1dCwgcHJvZ3JhbW0gbWVzc2FnZXMgZXRjLilcclxuICovXHJcbnB1YnN1Yi5zdWJzY3JpYmUoJ25ld19zdGF0ZScsIHN0YXRlID0+IHtcclxuICBzY2VuZS5oaWRlRXZlbnQoKTtcclxuICBzY2VuZS5zZXRTdGF0ZShzdGF0ZSk7XHJcbn0pO1xyXG5wdWJzdWIuc3Vic2NyaWJlKCdldmVudCcsIGV2ZW50ID0+IHNjZW5lLnNob3dFdmVudChldmVudCkpO1xyXG5cclxuLy8gLyoqXHJcbi8vICogVGltZXIgKGN1cnJlbnRseSBmb3IgZGV2IG1vZGUgb25seSlcclxuLy8gKi9cclxuLy8gaW1wb3J0IHRpbWVyIGZyb20gJy4uL3V0aWxzL3RpbWVyJztcclxuLy8gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmhlYWRlcicpLmFwcGVuZENoaWxkKHRpbWVyLm5vZGUpO1xyXG4vLyBwdWJzdWIuc3Vic2NyaWJlKCduZXdfc3RhdGUnLCBzdGF0ZSA9PiB0aW1lci5zdG9wKCkpO1xyXG4vLyBwdWJzdWIuc3Vic2NyaWJlKCdldmVudCcsIGV2ZW50ID0+IHRpbWVyLnN0YXJ0KCkpO1xyXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9sZWFybmluZy9pbmRleC5qcyJdLCJzb3VyY2VSb290IjoiIn0=