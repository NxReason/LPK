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
/******/ 	return __webpack_require__(__webpack_require__.s = 30);
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
/* 5 */,
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _state = __webpack_require__(20);

var _state2 = _interopRequireDefault(_state);

var _pubsub = __webpack_require__(2);

var _pubsub2 = _interopRequireDefault(_pubsub);

var _report = __webpack_require__(21);

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
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _state = __webpack_require__(22);

var _state2 = _interopRequireDefault(_state);

var _tools = __webpack_require__(23);

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
/* 8 */,
/* 9 */,
/* 10 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 11 */,
/* 12 */,
/* 13 */,
/* 14 */,
/* 15 */,
/* 16 */,
/* 17 */,
/* 18 */
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
/* 19 */
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
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _event = __webpack_require__(19);

var _event2 = _interopRequireDefault(_event);

var _action = __webpack_require__(18);

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
/* 21 */
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
      var spentTime = maxTime;
      var inactive = true;
      var actionsNumber = 0;
      this.states.push({ name: name, maxTime: maxTime, inactive: inactive, actionsNumber: actionsNumber, spentTime: spentTime });
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
        maxSteps: this.maxSteps,
        states: this.states
      });
      return (0, _ajax2.default)(REPORT_URL, ajaxConfig);
    }
  }]);

  return Report;
}();

exports.default = Report;

/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _nodeFactory = __webpack_require__(1);

var _nodeFactory2 = _interopRequireDefault(_nodeFactory);

var _timer = __webpack_require__(25);

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
/* 23 */
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
/* 24 */,
/* 25 */
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
/* 26 */,
/* 27 */,
/* 28 */,
/* 29 */,
/* 30 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


__webpack_require__(10);

var _pubsub = __webpack_require__(2);

var _pubsub2 = _interopRequireDefault(_pubsub);

var _ajax = __webpack_require__(0);

var _ajax2 = _interopRequireDefault(_ajax);

var _scene = __webpack_require__(7);

var _scene2 = _interopRequireDefault(_scene);

var _model = __webpack_require__(6);

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgZThmZGM4NGJiNjE4ZDczNzc0OTAiLCJ3ZWJwYWNrOi8vLy4vdXRpbHMvYWpheC5qcyIsIndlYnBhY2s6Ly8vLi91dGlscy9ub2RlRmFjdG9yeS5qcyIsIndlYnBhY2s6Ly8vLi91dGlscy9wdWJzdWIuanMiLCJ3ZWJwYWNrOi8vLy4vbGVhcm5pbmcvbW9kZWwuanMiLCJ3ZWJwYWNrOi8vLy4vbGVhcm5pbmcvc2NlbmUuanMiLCJ3ZWJwYWNrOi8vLy4uL3Nhc3MvbGVhcm5pbmcuc2NzcyIsIndlYnBhY2s6Ly8vLi9sZWFybmluZy9tb2RlbF9jb21wb25lbnRzL2FjdGlvbi5qcyIsIndlYnBhY2s6Ly8vLi9sZWFybmluZy9tb2RlbF9jb21wb25lbnRzL2V2ZW50LmpzIiwid2VicGFjazovLy8uL2xlYXJuaW5nL21vZGVsX2NvbXBvbmVudHMvc3RhdGUuanMiLCJ3ZWJwYWNrOi8vLy4vbGVhcm5pbmcvcmVwb3J0LmpzIiwid2VicGFjazovLy8uL2xlYXJuaW5nL3NjZW5lX2NvbXBvbmVudHMvc3RhdGUuanMiLCJ3ZWJwYWNrOi8vLy4vbGVhcm5pbmcvc2NlbmVfY29tcG9uZW50cy90b29scy5qcyIsIndlYnBhY2s6Ly8vLi91dGlscy90aW1lci5qcyIsIndlYnBhY2s6Ly8vLi9sZWFybmluZy9pbmRleC5qcyJdLCJuYW1lcyI6WyJhamF4IiwicGF0aCIsIm9wdGlvbnMiLCJmdWxsUmVzcG9uc2UiLCJ4aHIiLCJYTUxIdHRwUmVxdWVzdCIsIm9wZW4iLCJtZXRob2QiLCJoZWFkZXJzIiwic2V0WEhSSGVhZGVycyIsInNlbmQiLCJkYXRhIiwiUHJvbWlzZSIsInJlc29sdmUiLCJyZWplY3QiLCJvbnJlYWR5c3RhdGVjaGFuZ2UiLCJyZWFkeVN0YXRlIiwic3RhdHVzIiwicmVzcG9uc2VUZXh0Iiwic3RhdHVzVGV4dCIsImhlYWRlciIsInNldFJlcXVlc3RIZWFkZXIiLCJub2RlRmFjdG9yeSIsInR5cGUiLCJwYXJhbXMiLCJub2RlIiwiZG9jdW1lbnQiLCJjcmVhdGVFbGVtZW50IiwiYXBwZW5kQ2xhc3NlcyIsImFwcGVuZEF0dHJzIiwiaW5zZXJ0VGV4dENvbnRlbnQiLCJjbGFzc0xpc3QiLCJmb3JFYWNoIiwiYWRkIiwiY2xhc3NOYW1lIiwiYXR0cnMiLCJhdHRyTmFtZXMiLCJPYmplY3QiLCJrZXlzIiwic2V0QXR0cmlidXRlIiwiYXR0ck5hbWUiLCJ0ZXh0Q29udGVudCIsInB1YnN1YiIsInRvcGljcyIsInN1YnNjcmliZSIsInRvcGljIiwibGlzdGVuZXIiLCJxdWV1ZSIsImluZGV4IiwicHVzaCIsInJlbW92ZSIsInB1Ymxpc2giLCJpbmZvIiwibGVuZ3RoIiwiaXRlbXMiLCJpdGVtIiwiSU5JVElBTF9TVEFURV9OQU1FIiwiU1RPUF9TVEFURV9OQU1FIiwiTW9kZWwiLCJpZCIsIm5hbWUiLCJicmVha1RpbWUiLCJzdGVwcyIsInN0YXRlcyIsIm1hcCIsInN0YXRlIiwiY3VycmVudFN0YXRlIiwiZ2V0U3RhdGUiLCJpbml0aWFsU3RhdGUiLCJ0aW1lb3V0Iiwic3ViSW5wdXQiLCJzdWJTdG9wIiwic3RhcnRTdGF0ZSIsImltZyIsImxhc3QiLCJzdG9wU3RhdGUiLCJmaW5kIiwicmVwb3J0IiwiaGFuZGxlTmV3U3RhdGUiLCJpbnRlcnZhbHMiLCJpIiwidGhlbiIsIm1ha2VCcmVhayIsImhhbmRsZUV2ZW50IiwiY2F0Y2giLCJyZXNwb25zZSIsImNvbnNvbGUiLCJsb2ciLCJzZXRUaW1lb3V0IiwiY2xlYXJTdWJzIiwiZXZlbnQiLCJldmVudFN0YXJ0VGltZSIsIkRhdGUiLCJub3ciLCJpbmNyZWFzZUFjdGlvbnNOdW1iZXIiLCJ0aW1lU3BlbnQiLCJuZXh0U3RhdGVJZCIsImhhbmRsZUlucHV0IiwibmV4dFN0YXRlIiwic2V0U3BlbnRUaW1lIiwiaW5hY3RpdmVUaW1lIiwiZ2V0SW5hY3RpdmVUaW1lIiwiZ2V0SW5hY3RpdmVBY3Rpb24iLCJwdXNoU3RhdGUiLCJjbGVhclRpbWVvdXQiLCJleHBvcnRzIiwiJG1vZGVsTmFtZSIsInF1ZXJ5U2VsZWN0b3IiLCJpbml0IiwibW9kZWwiLCJzZXQiLCJ0b29scyIsIiRjb250ZW50Iiwic2hvd0NvbnRlbnQiLCJzZXRDb250ZW50RGlzcGxheSIsImhpZGVDb250ZW50IiwiZGlzcGxheSIsInN0eWxlIiwiZW5hYmxlQnV0dG9ucyIsImJ1dHRvbnMiLCJzZXRCdXR0b25zU3RhdGUiLCJkaXNhYmxlQnV0dG9ucyIsInZhbHVlIiwiYnV0dG9uIiwiZGlzYWJsZWQiLCJnZXRUb29sc0RhdGEiLCJzZXRTdGF0ZSIsInN0YXRlRGF0YSIsInNob3dFdmVudCIsImV2ZW50RGF0YSIsImhpZGVFdmVudCIsIkFjdGlvbiIsIm1pblRpbWUiLCJtYXhUaW1lIiwiaW5hY3RpdmUiLCJpbml0VG9vbHMiLCJ0aW1lIiwicmlnaHRUaW1lIiwicmlnaHREYXRhIiwiZXZlcnkiLCJjaGVja1Rvb2wiLCJvYmoiLCJ0b29sIiwiYm9vbFZhbHVlIiwiaW5jbHVkZXNWYWx1ZSIsIm1pblZhbHVlIiwibWF4VmFsdWUiLCJib3JkZXJzIiwiVHlwZUVycm9yIiwiQWN0aW9uVG9vbCIsIkV2ZW50IiwiZGVzY3JpcHRpb24iLCJTdGF0ZSIsImFjdGlvbnMiLCJhY3Rpb24iLCJ0aW1lcyIsImdldEFsbEFjdGlvblRpbWVzIiwiTWF0aCIsIm1heCIsInN1aXRlZEFjdGlvbnMiLCJmaWx0ZXIiLCJpc1N1aXRhYmxlIiwiUkVQT1JUX1VSTCIsImFqYXhDb25maWciLCJSZXBvcnQiLCJtb2RlbE5hbWUiLCJtYXhTdGVwcyIsInNwZW50VGltZSIsImFjdGlvbnNOdW1iZXIiLCJzZXRJbmFjdGl2ZSIsInNsaWNlIiwiSlNPTiIsInN0cmluZ2lmeSIsIiRuYW1lIiwiJGltZyIsIiRwYXJhbXMiLCIkZXZlbnQiLCIkZXZlbnRIZWFkZXIiLCIkZXZlbnRCb2R5IiwiJHRpbWVyQ29udGFpbmVyIiwiYXBwZW5kQ2hpbGQiLCJzZXRQYXJhbWV0ZXJzIiwiZnJhZyIsImNyZWF0ZURvY3VtZW50RnJhZ21lbnQiLCJjcmVhdGVQYXJhbWV0ZU5vZGUiLCJwYXJhbSIsImlubmVySFRNTCIsImtleSIsImRpdiIsImtleVNwYW4iLCJ2YWx1ZVNwYW4iLCJzaG93VGltZXIiLCJoaWRlVGltZXIiLCJzdGFydCIsInN0b3AiLCJ0b29sVHlwZXMiLCJSQU5HRSIsIlNXSVRDSCIsIiR0b29scyIsImZyYWdtZW50IiwibGFiZWwiLCJ0b29sTm9kZSIsImNyZWF0ZVRvb2xOb2RlIiwiY3JlYXRlUmFuZ2VUb29sIiwiY3JlYXRlU3dpdGNoVG9vbCIsImRpdklucHV0Iiwic3Bhbk1pbiIsIm1pbiIsImlucHV0Iiwic3Bhbk1heCIsImRpdkN1cnJlbnQiLCJzcGFuQ3VycmVudCIsImFkZEV2ZW50TGlzdGVuZXIiLCJldnQiLCJ0YXJnZXQiLCJ0b29sc0RhdGEiLCJpbnB1dHMiLCJxdWVyeVNlbGVjdG9yQWxsIiwiZGF0YXNldCIsInBhcnNlSW50IiwiY2hlY2tlZCIsIkVycm9yIiwibXNUb0NvbnRlbnQiLCJtcyIsInNlY29uZHMiLCJyb3VuZCIsIm1pbnMiLCJmbG9vciIsInNlY29uZHNMZWZ0IiwidGltZXIiLCJzdGFydFRpbWUiLCJpbnRlcnZhbCIsInNldEludGVydmFsIiwiZWxhcHNlZCIsImNsZWFySW50ZXJ2YWwiLCJsb2FkTW9kZWwiLCJwYXJzZSIsIiRzZWxlY3QiLCIkbG9hZEJ1dHRvbiIsIm1vZGVsSWQiLCIkc3RhcnRCdXR0b24iLCIkc3RvcEJ1dHRvbiIsIiRydW5CdXR0b24iLCJlcnJvciIsImVyciJdLCJtYXBwaW5ncyI6IjtBQUFBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBLG1EQUEyQyxjQUFjOztBQUV6RDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQUs7QUFDTDtBQUNBOztBQUVBO0FBQ0E7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bnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pXG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG5cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGlkZW50aXR5IGZ1bmN0aW9uIGZvciBjYWxsaW5nIGhhcm1vbnkgaW1wb3J0cyB3aXRoIHRoZSBjb3JyZWN0IGNvbnRleHRcbiBcdF9fd2VicGFja19yZXF1aXJlX18uaSA9IGZ1bmN0aW9uKHZhbHVlKSB7IHJldHVybiB2YWx1ZTsgfTtcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7XG4gXHRcdFx0XHRjb25maWd1cmFibGU6IGZhbHNlLFxuIFx0XHRcdFx0ZW51bWVyYWJsZTogdHJ1ZSxcbiBcdFx0XHRcdGdldDogZ2V0dGVyXG4gXHRcdFx0fSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gMzApO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIHdlYnBhY2svYm9vdHN0cmFwIGU4ZmRjODRiYjYxOGQ3Mzc3NDkwIiwiZnVuY3Rpb24gYWpheChwYXRoID0gJycsIG9wdGlvbnMgPSB7fSwgZnVsbFJlc3BvbnNlID0gZmFsc2UpIHtcclxuICBjb25zdCB4aHIgPSBuZXcgWE1MSHR0cFJlcXVlc3QoKTtcclxuICB4aHIub3BlbihvcHRpb25zLm1ldGhvZCB8fCAnR0VUJywgcGF0aCwgdHJ1ZSk7XHJcbiAgaWYgKG9wdGlvbnMuaGVhZGVycykgeyBzZXRYSFJIZWFkZXJzKHhociwgb3B0aW9ucy5oZWFkZXJzKTsgfVxyXG4gIHhoci5zZW5kKG9wdGlvbnMuZGF0YSk7XHJcblxyXG4gIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XHJcbiAgICB4aHIub25yZWFkeXN0YXRlY2hhbmdlID0gZnVuY3Rpb24oKSB7XHJcbiAgICAgIGlmKHhoci5yZWFkeVN0YXRlID09IDQpIHtcclxuICAgICAgICBpZih4aHIuc3RhdHVzID09IDIwMCkge1xyXG4gICAgICAgICAgaWYgKGZ1bGxSZXNwb25zZSkge1xyXG4gICAgICAgICAgICByZXNvbHZlKHhocik7XHJcbiAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICByZXNvbHZlKHhoci5yZXNwb25zZVRleHQpO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICByZWplY3QoeGhyLnN0YXR1c1RleHQpO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH0pXHJcbn1cclxuXHJcbmZ1bmN0aW9uIHNldFhIUkhlYWRlcnMoeGhyLCBoZWFkZXJzKSB7XHJcbiAgZm9yIChsZXQgaGVhZGVyIGluIGhlYWRlcnMpIHtcclxuICAgIHhoci5zZXRSZXF1ZXN0SGVhZGVyKGhlYWRlciwgaGVhZGVyc1toZWFkZXJdKTtcclxuICB9XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IGFqYXg7XHJcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3V0aWxzL2FqYXguanMiLCJjb25zdCBub2RlRmFjdG9yeSA9IGZ1bmN0aW9uKHR5cGUgPSAnZGl2JywgcGFyYW1zID0ge30pIHtcclxuICBjb25zdCBub2RlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCh0eXBlKTtcclxuXHJcbiAgYXBwZW5kQ2xhc3Nlcyhub2RlLCBwYXJhbXMpO1xyXG4gIGFwcGVuZEF0dHJzKG5vZGUsIHBhcmFtcyk7XHJcbiAgaW5zZXJ0VGV4dENvbnRlbnQobm9kZSwgcGFyYW1zKTtcclxuXHJcbiAgcmV0dXJuIG5vZGU7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGFwcGVuZENsYXNzZXMobm9kZSwgeyBjbGFzc0xpc3QgfSkge1xyXG4gIGlmIChjbGFzc0xpc3QgJiYgY2xhc3NMaXN0LmZvckVhY2gpIHtcclxuICAgIGNsYXNzTGlzdC5mb3JFYWNoKGNsYXNzTmFtZSA9PiBub2RlLmNsYXNzTGlzdC5hZGQoY2xhc3NOYW1lKSk7XHJcbiAgfVxyXG59XHJcblxyXG5mdW5jdGlvbiBhcHBlbmRBdHRycyhub2RlLCB7IGF0dHJzIH0pIHtcclxuICBpZiAoYXR0cnMpIHtcclxuICAgIGNvbnN0IGF0dHJOYW1lcyA9IE9iamVjdC5rZXlzKGF0dHJzKTtcclxuICAgIGF0dHJOYW1lcy5mb3JFYWNoKGF0dHJOYW1lID0+IG5vZGUuc2V0QXR0cmlidXRlKGF0dHJOYW1lLCBhdHRyc1thdHRyTmFtZV0pKTtcclxuICB9XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGluc2VydFRleHRDb250ZW50KG5vZGUsIHsgdGV4dENvbnRlbnQgPSBcIlwiIH0pIHtcclxuICBub2RlLnRleHRDb250ZW50ID0gdGV4dENvbnRlbnQ7XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IG5vZGVGYWN0b3J5O1xyXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi91dGlscy9ub2RlRmFjdG9yeS5qcyIsImNvbnN0IHB1YnN1YiA9IChmdW5jdGlvbigpIHtcclxuXHJcbiAgY29uc3QgdG9waWNzID0ge307XHJcblxyXG4gIHJldHVybiB7XHJcbiAgICBzdWJzY3JpYmU6IGZ1bmN0aW9uKHRvcGljLCBsaXN0ZW5lcikge1xyXG4gICAgICBpZiAoIXRvcGljc1t0b3BpY10pIHRvcGljc1t0b3BpY10gPSB7IHF1ZXVlOiBbXSB9O1xyXG5cclxuICAgICAgY29uc3QgaW5kZXggPSB0b3BpY3NbdG9waWNdLnF1ZXVlLnB1c2gobGlzdGVuZXIpIC0gMTtcclxuICAgICAgLy8gZnVuY3Rpb24gdG8gZGVsZXRlIHRvcGljXHJcbiAgICAgIHJldHVybiB7XHJcbiAgICAgICAgcmVtb3ZlOiBmdW5jdGlvbigpIHtcclxuICAgICAgICAgIGRlbGV0ZSB0b3BpY3NbdG9waWNdLnF1ZXVlW2luZGV4XTtcclxuICAgICAgICB9XHJcbiAgICAgIH07XHJcbiAgICB9LFxyXG5cclxuICAgIHB1Ymxpc2g6IGZ1bmN0aW9uKHRvcGljLCBpbmZvKSB7XHJcbiAgICAgIC8vIG5vIHRoZW1lIG9yIG5vIGxpc3RlbmVyc1xyXG4gICAgICBpZiAoIXRvcGljc1t0b3BpY10gfHwgIXRvcGljc1t0b3BpY10ucXVldWUubGVuZ3RoKSByZXR1cm47XHJcblxyXG4gICAgICBjb25zdCBpdGVtcyA9IHRvcGljc1t0b3BpY10ucXVldWU7XHJcbiAgICAgIGl0ZW1zLmZvckVhY2goaXRlbSA9PiB7XHJcbiAgICAgICAgaXRlbShpbmZvIHx8IHt9KTtcclxuICAgICAgfSk7XHJcbiAgICB9XHJcbiAgfTtcclxufSkoKTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IHB1YnN1YjtcclxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vdXRpbHMvcHVic3ViLmpzIiwiaW1wb3J0IFN0YXRlIGZyb20gJy4vbW9kZWxfY29tcG9uZW50cy9zdGF0ZSc7XHJcbmltcG9ydCBwdWJzdWIgZnJvbSAnLi4vdXRpbHMvcHVic3ViJztcclxuaW1wb3J0IFJlcG9ydCBmcm9tICcuL3JlcG9ydCc7XHJcblxyXG5jb25zdCBJTklUSUFMX1NUQVRFX05BTUUgPSAn0KHQvtGB0YLQvtGP0L3QuNC1INC80L7QtNC10LvQuCc7XHJcbmNvbnN0IFNUT1BfU1RBVEVfTkFNRSA9ICfQntCx0YPRh9C10L3QuNC1INC+0YHRgtCw0L3QvtCy0LvQtdC90L4nO1xyXG5cclxuY2xhc3MgTW9kZWwge1xyXG4gIGNvbnN0cnVjdG9yKGRhdGEpIHtcclxuICAgIHRoaXMuaWQgPSBkYXRhLmlkO1xyXG4gICAgdGhpcy5uYW1lID0gZGF0YS5uYW1lO1xyXG4gICAgdGhpcy5icmVha1RpbWUgPSBkYXRhLmJyZWFrVGltZTtcclxuICAgIHRoaXMuc3RlcHMgPSBkYXRhLnN0ZXBzO1xyXG5cclxuICAgIHRoaXMuc3RhdGVzID0gZGF0YS5zdGF0ZXMubWFwKHN0YXRlID0+IG5ldyBTdGF0ZShzdGF0ZSkpO1xyXG4gICAgdGhpcy5jdXJyZW50U3RhdGUgPSB0aGlzLmdldFN0YXRlKGRhdGEuaW5pdGlhbFN0YXRlKTtcclxuXHJcbiAgICB0aGlzLnRpbWVvdXQgPSBudWxsO1xyXG4gICAgdGhpcy5zdWJJbnB1dCA9IG51bGw7XHJcbiAgICB0aGlzLnN1YlN0b3AgPSBudWxsO1xyXG4gICAgdGhpcy5zdGFydFN0YXRlID0gbmV3IFN0YXRlKHsgaWQ6IDAsIG5hbWU6IElOSVRJQUxfU1RBVEVfTkFNRSwgaW1nOiAnaW1nL3N0YXJ0LnBuZycsIGxhc3Q6IHRydWUgfSk7XHJcbiAgICB0aGlzLnN0b3BTdGF0ZSA9IG5ldyBTdGF0ZSh7IGlkOiAtMSwgbmFtZTogU1RPUF9TVEFURV9OQU1FLCBpbWc6ICdpbWcvc3RvcC5wbmcnLCBsYXN0OiB0cnVlIH0pO1xyXG4gIH1cclxuXHJcbiAgZ2V0U3RhdGUoaWQpIHtcclxuICAgIHJldHVybiB0aGlzLnN0YXRlcy5maW5kKHN0YXRlID0+IHN0YXRlLmlkID09IGlkKTtcclxuICB9XHJcblxyXG4gIHN0YXJ0KCkge1xyXG4gICAgdGhpcy5yZXBvcnQgPSBuZXcgUmVwb3J0KHRoaXMubmFtZSwgdGhpcy5zdGVwcyk7XHJcbiAgICB0aGlzLmhhbmRsZU5ld1N0YXRlKHRoaXMuY3VycmVudFN0YXRlKTsgLy8gc2V0IGluaXRpYWwgc3RhdGVcclxuICAgIGxldCBpbnRlcnZhbHMgPSBQcm9taXNlLnJlc29sdmUoKTsgLy8gaW5pdCBwcm9taXNlIGNoYWluXHJcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMuc3RlcHM7IGkrKykge1xyXG4gICAgICBpbnRlcnZhbHMgPSBpbnRlcnZhbHNcclxuICAgICAgIC50aGVuKCgpID0+IHsgcmV0dXJuIHRoaXMubWFrZUJyZWFrKCkgfSlcclxuICAgICAgIC50aGVuKCgpID0+IHsgcmV0dXJuIHRoaXMuaGFuZGxlRXZlbnQoKSB9KVxyXG4gICAgICAgLnRoZW4oc3RhdGUgPT4geyB0aGlzLmhhbmRsZU5ld1N0YXRlKHN0YXRlKSB9KVxyXG4gICAgfVxyXG4gICAgaW50ZXJ2YWxzXHJcbiAgICAgIC5jYXRjaChzdGF0ZSA9PiB0aGlzLmhhbmRsZU5ld1N0YXRlKHN0YXRlKSlcclxuICAgICAgLnRoZW4oKCkgPT4ge1xyXG4gICAgICAgIGlmICh0aGlzLmN1cnJlbnRTdGF0ZS5uYW1lICE9PSBTVE9QX1NUQVRFX05BTUUpIHtcclxuICAgICAgICAgIHRoaXMucmVwb3J0LnNlbmQoKVxyXG4gICAgICAgICAgLnRoZW4oKHJlc3BvbnNlKSA9PiBjb25zb2xlLmxvZyhyZXNwb25zZSkpO1xyXG4gICAgICAgIH1cclxuICAgICAgfSk7XHJcbiAgICByZXR1cm4gaW50ZXJ2YWxzO1xyXG4gIH1cclxuXHJcbiAgbWFrZUJyZWFrKCkge1xyXG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcclxuICAgICAgdGhpcy5zdWJTdG9wID0gcHVic3ViLnN1YnNjcmliZSgnbW9kZWxfc3RvcCcsICgpID0+IHsgcmVqZWN0KHRoaXMuc3RvcFN0YXRlKTsgfSlcclxuICAgICAgc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgdGhpcy5jbGVhclN1YnMoKTtcclxuICAgICAgICByZXNvbHZlKClcclxuICAgICAgfSwgdGhpcy5icmVha1RpbWUpO1xyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICBoYW5kbGVFdmVudCgpIHtcclxuICAgIGNvbnN0IGV2ZW50ID0gdGhpcy5jdXJyZW50U3RhdGUuZXZlbnQ7XHJcbiAgICBjb25zdCBldmVudFN0YXJ0VGltZSA9IERhdGUubm93KCk7XHJcbiAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xyXG4gICAgICAvLyBzZW5kIGRhdGEgYWJvdXQgbmV3IGV2ZW50IHRvIG90aGVyIG1vZHVsZXNcclxuICAgICAgcHVic3ViLnB1Ymxpc2goJ2V2ZW50JywgZXZlbnQpO1xyXG5cclxuICAgICAgLy8gbGlzdGVuIHRvIHVzZXIgYWN0aW9uXHJcbiAgICAgIC8vIGFuZCBpZiB1c2VyIGlucHV0IGNvcnJlY3QgZ28gdG8gbmV4dCBzdGF0ZVxyXG4gICAgICB0aGlzLnN1YklucHV0ID0gcHVic3ViLnN1YnNjcmliZSgndXNlcl9pbnB1dCcsIGRhdGEgPT4ge1xyXG4gICAgICAgIHRoaXMucmVwb3J0LmluY3JlYXNlQWN0aW9uc051bWJlcigpO1xyXG4gICAgICAgIGNvbnN0IHRpbWVTcGVudCA9IERhdGUubm93KCkgLSBldmVudFN0YXJ0VGltZTtcclxuICAgICAgICBjb25zdCBuZXh0U3RhdGVJZCA9IHRoaXMuY3VycmVudFN0YXRlLmhhbmRsZUlucHV0KGRhdGEsIHRpbWVTcGVudCk7XHJcbiAgICAgICAgY29uc3QgbmV4dFN0YXRlID0gdGhpcy5nZXRTdGF0ZShuZXh0U3RhdGVJZCk7XHJcbiAgICAgICAgaWYgKCBuZXh0U3RhdGUgKSB7XHJcbiAgICAgICAgICB0aGlzLnJlcG9ydC5zZXRTcGVudFRpbWUodGltZVNwZW50KTtcclxuICAgICAgICAgIG5leHRTdGF0ZS5sYXN0ID8gcmVqZWN0KG5leHRTdGF0ZSkgOiByZXNvbHZlKG5leHRTdGF0ZSk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9KTtcclxuXHJcbiAgICAgIC8vIGhhbmRsZSB1c2VyIHN0b3AgYnV0dG9uIGNsaWNrXHJcbiAgICAgIHRoaXMuc3ViU3RvcCA9IHB1YnN1Yi5zdWJzY3JpYmUoJ21vZGVsX3N0b3AnLCAoKSA9PiB7XHJcbiAgICAgICAgcmVqZWN0KHRoaXMuc3RvcFN0YXRlKTtcclxuICAgICAgfSk7XHJcblxyXG4gICAgICAvLyBoYW5kbGUgaW5hY3RpdmVcclxuICAgICAgY29uc3QgaW5hY3RpdmVUaW1lID0gdGhpcy5jdXJyZW50U3RhdGUuZ2V0SW5hY3RpdmVUaW1lKCk7XHJcbiAgICAgIHRoaXMudGltZW91dCA9IHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgIGNvbnN0IG5leHRTdGF0ZUlkID0gdGhpcy5jdXJyZW50U3RhdGUuZ2V0SW5hY3RpdmVBY3Rpb24oKS5uZXh0U3RhdGU7XHJcbiAgICAgICAgY29uc3QgbmV4dFN0YXRlID0gdGhpcy5nZXRTdGF0ZShuZXh0U3RhdGVJZCk7XHJcbiAgICAgICAgbmV4dFN0YXRlLmxhc3QgPyByZWplY3QobmV4dFN0YXRlKSA6IHJlc29sdmUobmV4dFN0YXRlKTtcclxuICAgICAgfSwgaW5hY3RpdmVUaW1lKTtcclxuICAgIH0pXHJcbiAgfVxyXG5cclxuICBoYW5kbGVOZXdTdGF0ZShzdGF0ZSkge1xyXG4gICAgdGhpcy5yZXBvcnQucHVzaFN0YXRlKHN0YXRlKTtcclxuICAgIHRoaXMuY3VycmVudFN0YXRlID0gc3RhdGU7XHJcbiAgICBjbGVhclRpbWVvdXQodGhpcy50aW1lb3V0KTtcclxuICAgIHRoaXMuY2xlYXJTdWJzKCk7XHJcbiAgICBwdWJzdWIucHVibGlzaCgnbmV3X3N0YXRlJywgc3RhdGUpO1xyXG4gIH1cclxuXHJcbiAgY2xlYXJTdWJzKCkge1xyXG4gICAgaWYgKHRoaXMuc3ViSW5wdXQpIHtcclxuICAgICAgdGhpcy5zdWJJbnB1dC5yZW1vdmUoKTtcclxuICAgIH1cclxuICAgIGlmICh0aGlzLnN1YlN0b3ApIHtcclxuICAgICAgdGhpcy5zdWJTdG9wLnJlbW92ZSgpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IE1vZGVsO1xyXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9sZWFybmluZy9tb2RlbC5qcyIsImltcG9ydCBzdGF0ZSBmcm9tICcuL3NjZW5lX2NvbXBvbmVudHMvc3RhdGUnO1xyXG5pbXBvcnQgdG9vbHMgZnJvbSAnLi9zY2VuZV9jb21wb25lbnRzL3Rvb2xzJztcclxuXHJcbmNvbnN0IGV4cG9ydHMgPSB7fTtcclxuXHJcbi8vIFNjZW5lIG1ldGFkYXRhXHJcbmNvbnN0ICRtb2RlbE5hbWUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcubW9kZWwtbmFtZScpO1xyXG5leHBvcnRzLmluaXQgPSBmdW5jdGlvbihtb2RlbCwgcmVzcG9uc2UpIHtcclxuICAkbW9kZWxOYW1lLnRleHRDb250ZW50ID0gbW9kZWwubmFtZTtcclxuICBzdGF0ZS5zZXQobW9kZWwuc3RhcnRTdGF0ZSk7XHJcbiAgdG9vbHMuaW5pdChyZXNwb25zZS50b29scyk7XHJcbiAgcmV0dXJuIHRoaXM7XHJcbn1cclxuXHJcbi8vIE1hbmFnZSBjb250ZW50IHZpc2liaWxpdHlcclxuY29uc3QgJGNvbnRlbnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuY29udGVudCcpO1xyXG5leHBvcnRzLnNob3dDb250ZW50ID0gZnVuY3Rpb24oKSB7XHJcbiAgc2V0Q29udGVudERpc3BsYXkoJ2ZsZXgnKTtcclxuICByZXR1cm4gdGhpcztcclxufVxyXG5leHBvcnRzLmhpZGVDb250ZW50ID0gZnVuY3Rpb24oKSB7XHJcbiAgc2V0Q29udGVudERpc3BsYXkoJ25vbmUnKTtcclxuICByZXR1cm4gdGhpcztcclxufVxyXG5mdW5jdGlvbiBzZXRDb250ZW50RGlzcGxheShkaXNwbGF5KSB7XHJcbiAgJGNvbnRlbnQuc3R5bGUuZGlzcGxheSA9IGRpc3BsYXk7XHJcbn1cclxuXHJcbi8vIE1hbmFnZSBidXR0b25zIHN0YXRlXHJcbmV4cG9ydHMuZW5hYmxlQnV0dG9ucyA9IGZ1bmN0aW9uKC4uLmJ1dHRvbnMpIHtcclxuICBzZXRCdXR0b25zU3RhdGUoYnV0dG9ucywgZmFsc2UpO1xyXG4gIHJldHVybiB0aGlzO1xyXG59XHJcbmV4cG9ydHMuZGlzYWJsZUJ1dHRvbnMgPSBmdW5jdGlvbiguLi5idXR0b25zKSB7XHJcbiAgc2V0QnV0dG9uc1N0YXRlKGJ1dHRvbnMsIHRydWUpO1xyXG4gIHJldHVybiB0aGlzO1xyXG59XHJcbmZ1bmN0aW9uIHNldEJ1dHRvbnNTdGF0ZShidXR0b25zLCB2YWx1ZSkge1xyXG4gIGJ1dHRvbnMuZm9yRWFjaChidXR0b24gPT4gYnV0dG9uLmRpc2FibGVkID0gdmFsdWUpO1xyXG59XHJcblxyXG4vLyBEZWxlZ2F0ZSBwdWJsaWMgbWV0aG9kcyB0byBjb21wb25lbnRzXHJcbmV4cG9ydHMuZ2V0VG9vbHNEYXRhID0gKCkgPT5cclxuICB0b29scy5nZXRUb29sc0RhdGEoKTtcclxuXHJcbmV4cG9ydHMuc2V0U3RhdGUgPSBzdGF0ZURhdGEgPT5cclxuICBzdGF0ZS5zZXQoc3RhdGVEYXRhKTtcclxuXHJcbmV4cG9ydHMuc2hvd0V2ZW50ID0gZXZlbnREYXRhID0+XHJcbiAgc3RhdGUuc2hvd0V2ZW50KGV2ZW50RGF0YSk7XHJcblxyXG5leHBvcnRzLmhpZGVFdmVudCA9ICgpID0+XHJcbiAgc3RhdGUuaGlkZUV2ZW50KCk7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBleHBvcnRzO1xyXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9sZWFybmluZy9zY2VuZS5qcyIsIi8vIHJlbW92ZWQgYnkgZXh0cmFjdC10ZXh0LXdlYnBhY2stcGx1Z2luXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi4vc2Fzcy9sZWFybmluZy5zY3NzXG4vLyBtb2R1bGUgaWQgPSAxMFxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJjbGFzcyBBY3Rpb24ge1xyXG4gIGNvbnN0cnVjdG9yKGRhdGEpIHtcclxuICAgIHRoaXMubWluVGltZSA9IGRhdGEubWluVGltZTtcclxuICAgIHRoaXMubWF4VGltZSA9IGRhdGEubWF4VGltZTtcclxuICAgIHRoaXMubmV4dFN0YXRlID0gZGF0YS5uZXh0U3RhdGU7XHJcbiAgICBpZiAoZGF0YS5pbmFjdGl2ZSkge1xyXG4gICAgICB0aGlzLmluYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgdGhpcy50b29scyA9IFtdO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdGhpcy5pbmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICB0aGlzLnRvb2xzID0gdGhpcy5pbml0VG9vbHMoZGF0YS50b29scyk7XHJcbiAgICB9XHJcblxyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogQHBhcmFtIFt7IGlkOiBOdW1iZXIsIHZhbHVlOiBOdW1iZXIvQm9vbGVhbiB9LCB7Li4ufV1cclxuICAgKiBAcGFyYW0gTnVtYmVyXHJcbiAgICogQHJldHVybiBCb29sZWFuXHJcbiAgICovXHJcbiAgaXNTdWl0YWJsZShkYXRhLCB0aW1lKSB7XHJcbiAgICByZXR1cm4gdGhpcy5yaWdodFRpbWUodGltZSkgJiYgdGhpcy5yaWdodERhdGEoZGF0YSk7XHJcbiAgfVxyXG5cclxuICByaWdodERhdGEoZGF0YSA9IFtdKSB7XHJcbiAgICByZXR1cm4gdGhpcy50b29scy5ldmVyeSh0b29sID0+IHtcclxuICAgICAgLy8g0JXRgdC70Lgg0YHRgNC10LTQuCDQv9C+0LvRg9GH0LXQvdC90YvRhSDQuNGC0LXQvNC+0LIg0L3QtdGCLCDRgtC+0LPQviDQutC+0YLQvtGA0YvQuSDQtdGB0YLRjCDQsiDQtNCw0L3QvdC+0Lwg0Y3QutGI0LXQvdC1XHJcbiAgICAgIGNvbnN0IGNoZWNrVG9vbCA9IGRhdGEuZmluZChvYmogPT4gb2JqLmlkID09IHRvb2wuaWQpO1xyXG4gICAgICBpZiAoIWNoZWNrVG9vbCkgeyByZXR1cm4gZmFsc2U7IH1cclxuXHJcbiAgICAgIGlmICh0b29sLnR5cGUgPT09ICdzd2l0Y2gnKSB7IHJldHVybiBjaGVja1Rvb2wudmFsdWUgPT09IHRvb2wuYm9vbFZhbHVlOyB9XHJcblxyXG4gICAgICBpZiAodG9vbC50eXBlID09PSAncmFuZ2UnKSB7IHJldHVybiB0aGlzLmluY2x1ZGVzVmFsdWUoY2hlY2tUb29sLnZhbHVlLCBbIHRvb2wubWluVmFsdWUsIHRvb2wubWF4VmFsdWUgXSkgfVxyXG5cclxuICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICBpbmNsdWRlc1ZhbHVlKHZhbHVlLCBib3JkZXJzKSB7XHJcbiAgICBpZiAodHlwZW9mIHZhbHVlICE9PSAnbnVtYmVyJykgdGhyb3cgbmV3IFR5cGVFcnJvcignVmFsdWUgc2hvdWxkIGJlIGludGVnZXInKTtcclxuICAgIHJldHVybiAodmFsdWUgPj0gYm9yZGVyc1swXSkgJiYgKHZhbHVlIDw9IGJvcmRlcnNbMV0pO1xyXG4gIH1cclxuXHJcbiAgcmlnaHRUaW1lKHRpbWUpIHtcclxuICAgIGlmICh0eXBlb2YgdGltZSAhPT0gJ251bWJlcicpIHRocm93IG5ldyBUeXBlRXJyb3IoJ1RpbWUgc2hvdWxkIGJlIGludGVnZXIgKG1zKScpO1xyXG4gICAgcmV0dXJuICh0aW1lID49IHRoaXMubWluVGltZSkgJiYgKHRpbWUgPD0gdGhpcy5tYXhUaW1lKTtcclxuICB9XHJcblxyXG4gIGluaXRUb29scyh0b29scykge1xyXG4gICAgcmV0dXJuIHRvb2xzLm1hcCh0b29sID0+IHtcclxuICAgICAgcmV0dXJuIHtcclxuICAgICAgICBpZDogdG9vbC5pZCxcclxuICAgICAgICB0eXBlOiB0b29sLnR5cGUsXHJcbiAgICAgICAgbWluVmFsdWU6IHRvb2wuQWN0aW9uVG9vbC5taW5WYWx1ZSxcclxuICAgICAgICBtYXhWYWx1ZTogdG9vbC5BY3Rpb25Ub29sLm1heFZhbHVlLFxyXG4gICAgICAgIGJvb2xWYWx1ZTogdG9vbC5BY3Rpb25Ub29sLmJvb2xWYWx1ZVxyXG4gICAgICB9XHJcbiAgICB9KTtcclxuICB9XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IEFjdGlvbjtcclxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vbGVhcm5pbmcvbW9kZWxfY29tcG9uZW50cy9hY3Rpb24uanMiLCJjbGFzcyBFdmVudCB7XHJcbiAgY29uc3RydWN0b3IoZGF0YSkge1xyXG4gICAgdGhpcy5pZCA9IGRhdGEuaWQ7XHJcbiAgICB0aGlzLm5hbWUgPSBkYXRhLm5hbWU7XHJcbiAgICB0aGlzLmRlc2NyaXB0aW9uID0gZGF0YS5kZXNjcmlwdGlvbjtcclxuICB9XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IEV2ZW50O1xyXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9sZWFybmluZy9tb2RlbF9jb21wb25lbnRzL2V2ZW50LmpzIiwiaW1wb3J0IEV2ZW50IGZyb20gJy4vZXZlbnQnIDtcclxuaW1wb3J0IEFjdGlvbiBmcm9tICcuL2FjdGlvbic7XHJcblxyXG5jbGFzcyBTdGF0ZSB7XHJcbiAgY29uc3RydWN0b3IoZGF0YSkge1xyXG4gICAgdGhpcy5pZCA9IGRhdGEuaWQ7XHJcbiAgICB0aGlzLm5hbWUgPSBkYXRhLm5hbWU7XHJcbiAgICB0aGlzLmltZyA9IGRhdGEuaW1nO1xyXG4gICAgdGhpcy5wYXJhbXMgPSBkYXRhLnBhcmFtcztcclxuXHJcbiAgICBpZihkYXRhLmxhc3QpIHtcclxuICAgICAgdGhpcy5sYXN0ID0gdHJ1ZTtcclxuICAgICAgdGhpcy5ldmVudCA9IG51bGw7XHJcbiAgICAgIHRoaXMuYWN0aW9ucyA9IG51bGw7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB0aGlzLmV2ZW50ID0gbmV3IEV2ZW50KGRhdGEuZXZlbnQpO1xyXG4gICAgICB0aGlzLmFjdGlvbnMgPSBkYXRhLmFjdGlvbnMubWFwKGFjdGlvbiA9PiBuZXcgQWN0aW9uKGFjdGlvbikpO1xyXG4gICAgICB0aGlzLmxhc3QgPSBmYWxzZTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIGdldEluYWN0aXZlVGltZSgpIHtcclxuICAgIGNvbnN0IHRpbWVzID0gdGhpcy5nZXRBbGxBY3Rpb25UaW1lcygpO1xyXG4gICAgcmV0dXJuIE1hdGgubWF4KC4uLnRpbWVzKTtcclxuICB9XHJcblxyXG4gIGdldEluYWN0aXZlQWN0aW9uKCkge1xyXG4gICAgcmV0dXJuIHRoaXMuYWN0aW9ucy5maW5kKGFjdGlvbiA9PiBhY3Rpb24uaW5hY3RpdmUgPT09IHRydWUpO1xyXG4gIH1cclxuXHJcbiAgZ2V0QWxsQWN0aW9uVGltZXMoKSB7XHJcbiAgICByZXR1cm4gdGhpcy5hY3Rpb25zLm1hcChhY3Rpb24gPT4gYWN0aW9uLm1heFRpbWUgfHwgMCk7XHJcbiAgfVxyXG5cclxuICBoYW5kbGVJbnB1dChkYXRhLCB0aW1lKSB7XHJcbiAgICBjb25zdCBzdWl0ZWRBY3Rpb25zID0gdGhpcy5hY3Rpb25zLmZpbHRlcihhY3Rpb24gPT4gYWN0aW9uLmlzU3VpdGFibGUoZGF0YSwgdGltZSkpO1xyXG4gICAgaWYgKHN1aXRlZEFjdGlvbnMubGVuZ3RoID4gMCkge1xyXG4gICAgICByZXR1cm4gc3VpdGVkQWN0aW9uc1swXS5uZXh0U3RhdGU7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gbnVsbDtcclxuICB9XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IFN0YXRlO1xyXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9sZWFybmluZy9tb2RlbF9jb21wb25lbnRzL3N0YXRlLmpzIiwiaW1wb3J0IGFqYXggZnJvbSAnLi4vdXRpbHMvYWpheCc7XHJcblxyXG5jb25zdCBSRVBPUlRfVVJMID0gJy9sZWFybmluZy9yZXBvcnQnO1xyXG5jb25zdCBhamF4Q29uZmlnID0ge1xyXG4gIG1ldGhvZDogJ1BPU1QnLFxyXG4gIGhlYWRlcnM6IHtcclxuICAgICdDb250ZW50LXR5cGUnOiAnYXBwbGljYXRpb24vanNvbidcclxuICB9XHJcbn1cclxuXHJcbmNsYXNzIFJlcG9ydCB7XHJcbiAgY29uc3RydWN0b3IobmFtZSwgc3RlcHMpIHtcclxuICAgIHRoaXMubW9kZWxOYW1lID0gbmFtZTtcclxuICAgIHRoaXMubWF4U3RlcHMgPSBzdGVwcztcclxuICAgIHRoaXMuc3RhdGVzID0gW107XHJcbiAgICB0aGlzLmN1cnJlbnRTdGF0ZSA9IG51bGw7XHJcbiAgfVxyXG5cclxuICBwdXNoU3RhdGUoc3RhdGUpIHtcclxuICAgIGNvbnN0IHsgbmFtZSB9ID0gc3RhdGU7XHJcbiAgICBjb25zdCBtYXhUaW1lID0gc3RhdGUubGFzdCA/IC0xIDogc3RhdGUuZ2V0SW5hY3RpdmVUaW1lKCk7XHJcbiAgICBjb25zdCBzcGVudFRpbWUgPSBtYXhUaW1lO1xyXG4gICAgY29uc3QgaW5hY3RpdmUgPSB0cnVlO1xyXG4gICAgY29uc3QgYWN0aW9uc051bWJlciA9IDA7XHJcbiAgICB0aGlzLnN0YXRlcy5wdXNoKHsgbmFtZSwgbWF4VGltZSwgaW5hY3RpdmUsIGFjdGlvbnNOdW1iZXIsIHNwZW50VGltZSB9KTtcclxuICAgIHRoaXMuY3VycmVudFN0YXRlID0gdGhpcy5zdGF0ZXNbdGhpcy5zdGF0ZXMubGVuZ3RoIC0gMV07XHJcbiAgfVxyXG5cclxuICBpbmNyZWFzZUFjdGlvbnNOdW1iZXIoKSB7XHJcbiAgICB0aGlzLmN1cnJlbnRTdGF0ZS5hY3Rpb25zTnVtYmVyKys7XHJcbiAgfVxyXG5cclxuICBzZXRTcGVudFRpbWUodGltZSkge1xyXG4gICAgdGhpcy5jdXJyZW50U3RhdGUuc3BlbnRUaW1lID0gdGltZTtcclxuICAgIHRoaXMuc2V0SW5hY3RpdmUoZmFsc2UpO1xyXG4gIH1cclxuXHJcbiAgc2V0SW5hY3RpdmUodmFsdWUpIHtcclxuICAgIHRoaXMuY3VycmVudFN0YXRlLmluYWN0aXZlID0gdmFsdWU7XHJcbiAgfVxyXG5cclxuICBzZW5kKCkge1xyXG4gICAgaWYgKHRoaXMuc3RhdGVzLmxlbmd0aCA+IDEpIHtcclxuICAgICAgLy8gcmVtb3ZlIGxhc3Qgc3RhdGUgLSB1c2VyIGNhbid0IG1ha2UgYW55IGFjdGlvblxyXG4gICAgICB0aGlzLnN0YXRlcyA9IHRoaXMuc3RhdGVzLnNsaWNlKDAsIC0xKTtcclxuICAgIH1cclxuICAgIGFqYXhDb25maWcuZGF0YSA9IEpTT04uc3RyaW5naWZ5KHtcclxuICAgICAgbW9kZWxOYW1lOiB0aGlzLm1vZGVsTmFtZSxcclxuICAgICAgbWF4U3RlcHM6IHRoaXMubWF4U3RlcHMsXHJcbiAgICAgIHN0YXRlczogdGhpcy5zdGF0ZXNcclxuICAgIH0pO1xyXG4gICAgcmV0dXJuIGFqYXgoUkVQT1JUX1VSTCwgYWpheENvbmZpZyk7XHJcbiAgfVxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBSZXBvcnQ7XHJcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2xlYXJuaW5nL3JlcG9ydC5qcyIsImltcG9ydCBub2RlRmFjdG9yeSBmcm9tICcuLi8uLi91dGlscy9ub2RlRmFjdG9yeSc7XHJcbmltcG9ydCB0aW1lciBmcm9tICcuLi8uLi91dGlscy90aW1lcic7XHJcblxyXG5jb25zdCAkbmFtZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5tb2RlbC1zdGF0ZS1uYW1lJyk7XHJcbmNvbnN0ICRpbWcgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcubW9kZWwtc3RhdGUtaW1nJyk7XHJcbmNvbnN0ICRwYXJhbXMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcubW9kZWwtcGFyYW1zLXZhbHVlcycpO1xyXG5cclxuY29uc3QgJGV2ZW50ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLm1vZGVsLWV2ZW50Jyk7XHJcbmNvbnN0ICRldmVudEhlYWRlciA9ICRldmVudC5xdWVyeVNlbGVjdG9yKCcubW9kZWwtZXZlbnQtbmFtZSBzcGFuJyk7XHJcbmNvbnN0ICRldmVudEJvZHkgPSAkZXZlbnQucXVlcnlTZWxlY3RvcignLm1vZGVsLWV2ZW50LWluZm8nKTtcclxuXHJcbmNvbnN0ICR0aW1lckNvbnRhaW5lciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5tb2RlbC10aW1lcicpO1xyXG4kdGltZXJDb250YWluZXIuYXBwZW5kQ2hpbGQodGltZXIubm9kZSk7XHJcblxyXG5mdW5jdGlvbiBzZXQoeyBuYW1lLCBpbWcsIHBhcmFtcyB9KSB7XHJcbiAgJG5hbWUudGV4dENvbnRlbnQgPSBuYW1lO1xyXG4gICRpbWcuc2V0QXR0cmlidXRlKCdzcmMnLCBpbWcpO1xyXG4gIHNldFBhcmFtZXRlcnMocGFyYW1zKTtcclxufVxyXG5cclxuZnVuY3Rpb24gc2V0UGFyYW1ldGVycyhwYXJhbXMgPSBbXSkge1xyXG4gIGNvbnN0IGZyYWcgPSBkb2N1bWVudC5jcmVhdGVEb2N1bWVudEZyYWdtZW50KCk7XHJcbiAgcGFyYW1zLmZvckVhY2gocGFyYW0gPT4gZnJhZy5hcHBlbmRDaGlsZChjcmVhdGVQYXJhbWV0ZU5vZGUocGFyYW0ubmFtZSwgcGFyYW0udmFsdWUpKSk7XHJcblxyXG4gICRwYXJhbXMuaW5uZXJIVE1MID0gXCJcIjtcclxuICAkcGFyYW1zLmFwcGVuZENoaWxkKGZyYWcpO1xyXG59XHJcblxyXG5mdW5jdGlvbiBjcmVhdGVQYXJhbWV0ZU5vZGUoa2V5LCB2YWx1ZSkge1xyXG4gIGNvbnN0IGRpdiA9IG5vZGVGYWN0b3J5KCdkaXYnLCB7IGNsYXNzTGlzdDogWydwYXJhbWV0ZXInXSB9KTtcclxuXHJcbiAgY29uc3Qga2V5U3BhbiA9IG5vZGVGYWN0b3J5KCdzcGFuJywgeyB0ZXh0Q29udGVudDoga2V5IH0pO1xyXG4gIGRpdi5hcHBlbmRDaGlsZChrZXlTcGFuKTtcclxuXHJcbiAgY29uc3QgdmFsdWVTcGFuID0gbm9kZUZhY3RvcnkoJ3NwYW4nLCB7IHRleHRDb250ZW50OiB2YWx1ZSB9KTtcclxuICBkaXYuYXBwZW5kQ2hpbGQodmFsdWVTcGFuKTtcclxuXHJcbiAgcmV0dXJuIGRpdjtcclxufVxyXG5cclxuXHJcbi8qKiBTZXRzIGV2ZW50IGRhdGEgdG8gVUkgKi9cclxuZnVuY3Rpb24gc2hvd0V2ZW50KGV2ZW50KSB7XHJcbiAgJGV2ZW50SGVhZGVyLnRleHRDb250ZW50ID0gZXZlbnQubmFtZTtcclxuICAkZXZlbnRCb2R5LnRleHRDb250ZW50ID0gZXZlbnQuZGVzY3JpcHRpb247XHJcbiAgJGV2ZW50LmNsYXNzTGlzdC5yZW1vdmUoJ2lzLWhpZGRlbicsICdzbGlkZS10b3AnKTtcclxuICBzaG93VGltZXIoKTtcclxufVxyXG5mdW5jdGlvbiBoaWRlRXZlbnQoKSB7XHJcbiAgJGV2ZW50LmNsYXNzTGlzdC5hZGQoJ2lzLWhpZGRlbicsICdzbGlkZS10b3AnKTtcclxuICBoaWRlVGltZXIoKTtcclxufVxyXG5cclxuZnVuY3Rpb24gc2hvd1RpbWVyKCkge1xyXG4gICR0aW1lckNvbnRhaW5lci5jbGFzc0xpc3QucmVtb3ZlKCdpcy1oaWRkZW4nKTtcclxuICB0aW1lci5zdGFydCgpO1xyXG59XHJcbmZ1bmN0aW9uIGhpZGVUaW1lcigpIHtcclxuICAkdGltZXJDb250YWluZXIuY2xhc3NMaXN0LmFkZCgnaXMtaGlkZGVuJyk7XHJcbiAgdGltZXIuc3RvcCgpO1xyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCB7XHJcbiAgc2V0LFxyXG4gIHNob3dFdmVudCxcclxuICBoaWRlRXZlbnRcclxufVxyXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9sZWFybmluZy9zY2VuZV9jb21wb25lbnRzL3N0YXRlLmpzIiwiaW1wb3J0IG5vZGVGYWN0b3J5IGZyb20gJy4uLy4uL3V0aWxzL25vZGVGYWN0b3J5JztcclxuXHJcbmNvbnN0IHRvb2xUeXBlcyA9IHtcclxuICBSQU5HRTogJ3JhbmdlJyxcclxuICBTV0lUQ0g6ICdzd2l0Y2gnXHJcbn1cclxuY29uc3QgJHRvb2xzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnRvb2xzLWxpc3QnKTtcclxuXHJcbmZ1bmN0aW9uIGluaXQodG9vbHMpIHtcclxuICBjb25zdCBmcmFnbWVudCA9IGRvY3VtZW50LmNyZWF0ZURvY3VtZW50RnJhZ21lbnQoKTtcclxuXHJcbiAgdG9vbHMuZm9yRWFjaCh0b29sID0+IHtcclxuICAgIC8vIGNyZWF0ZSB0b29sIHdyYXBwZXJcclxuICAgIGNvbnN0IGRpdiA9IG5vZGVGYWN0b3J5KCdkaXYnLCB7IGNsYXNzTGlzdDogWyd0b29sJ10gfSk7XHJcblxyXG4gICAgY29uc3QgbGFiZWwgPSBub2RlRmFjdG9yeSgnbGFiZWwnLCB7XHJcbiAgICAgIGNsYXNzTGlzdDogWyd0b29sLW5hbWUnXSxcclxuICAgICAgYXR0cnM6IHsgXCJmb3JcIjogdG9vbC5uYW1lIH0sXHJcbiAgICAgIHRleHRDb250ZW50OiB0b29sLm5hbWVcclxuICAgIH0pO1xyXG4gICAgZGl2LmFwcGVuZENoaWxkKGxhYmVsKTtcclxuXHJcbiAgICBjb25zdCB0b29sTm9kZSA9IGNyZWF0ZVRvb2xOb2RlKHRvb2wpO1xyXG4gICAgZGl2LmFwcGVuZENoaWxkKHRvb2xOb2RlKTtcclxuXHJcbiAgICBmcmFnbWVudC5hcHBlbmRDaGlsZChkaXYpO1xyXG4gIH0pO1xyXG5cclxuICAkdG9vbHMuaW5uZXJIVE1MID0gXCJcIjtcclxuICAkdG9vbHMuYXBwZW5kQ2hpbGQoZnJhZ21lbnQpO1xyXG59XHJcblxyXG5mdW5jdGlvbiBjcmVhdGVUb29sTm9kZSh0b29sKSB7XHJcbiAgc3dpdGNoKHRvb2wudHlwZSkge1xyXG4gICAgY2FzZSB0b29sVHlwZXMuUkFOR0U6ICAgcmV0dXJuIGNyZWF0ZVJhbmdlVG9vbCh0b29sKTtcclxuICAgIGNhc2UgdG9vbFR5cGVzLlNXSVRDSDogIHJldHVybiBjcmVhdGVTd2l0Y2hUb29sKHRvb2wpO1xyXG4gICAgZGVmYXVsdDogICAgICAgICAgICAgICAgcmV0dXJuICfQndC10LjQt9Cy0LXRgdGC0L3Ri9C5INC/0YDQuNCx0L7RgCc7XHJcbiAgfVxyXG59XHJcblxyXG5mdW5jdGlvbiBjcmVhdGVSYW5nZVRvb2wodG9vbCkge1xyXG4gIGNvbnN0IGRpdklucHV0ID0gbm9kZUZhY3RvcnkoJ2RpdicsIHsgY2xhc3NMaXN0OiBbJ3JhbmdlJ10gfSk7XHJcblxyXG4gIGNvbnN0IHNwYW5NaW4gPSBub2RlRmFjdG9yeSgnc3BhbicsIHsgdGV4dENvbnRlbnQ6IHRvb2wubWluIH0pO1xyXG4gIGRpdklucHV0LmFwcGVuZENoaWxkKHNwYW5NaW4pXHJcblxyXG4gIGNvbnN0IGlucHV0ID0gbm9kZUZhY3RvcnkoJ2lucHV0Jywge1xyXG4gICAgYXR0cnM6IHtcclxuICAgICAgJ2RhdGEtaWQnOiB0b29sLmlkLFxyXG4gICAgICAnZGF0YS10eXBlJzogJ3JhbmdlJyxcclxuICAgICAgJ25hbWUnOiB0b29sLm5hbWUsXHJcbiAgICAgICd0eXBlJzogJ3JhbmdlJyxcclxuICAgICAgJ21pbic6IHRvb2wubWluLFxyXG4gICAgICAnbWF4JzogdG9vbC5tYXhcclxuICAgIH1cclxuICB9KTtcclxuICBkaXZJbnB1dC5hcHBlbmRDaGlsZChpbnB1dCk7XHJcblxyXG4gIGNvbnN0IHNwYW5NYXggPSBub2RlRmFjdG9yeSgnc3BhbicsIHsgdGV4dENvbnRlbnQ6IHRvb2wubWF4IH0pO1xyXG4gIGRpdklucHV0LmFwcGVuZENoaWxkKHNwYW5NYXgpO1xyXG5cclxuICBjb25zdCBkaXZDdXJyZW50ID0gbm9kZUZhY3RvcnkoJ2RpdicsIHsgY2xhc3NMaXN0OiBbJ3JhbmdlLWN1cnJlbnQtdmFsdWUnXSB9KTtcclxuICBjb25zdCBzcGFuQ3VycmVudCA9IG5vZGVGYWN0b3J5KCdzcGFuJywgeyB0ZXh0Q29udGVudDogaW5wdXQudmFsdWUgfSk7XHJcbiAgZGl2Q3VycmVudC5hcHBlbmRDaGlsZChzcGFuQ3VycmVudCk7XHJcblxyXG4gIGlucHV0LmFkZEV2ZW50TGlzdGVuZXIoJ2lucHV0JywgKGV2dCkgPT4ge1xyXG4gICAgc3BhbkN1cnJlbnQudGV4dENvbnRlbnQgPSBldnQudGFyZ2V0LnZhbHVlO1xyXG4gIH0pO1xyXG5cclxuICBjb25zdCBmcmFnbWVudCA9IGRvY3VtZW50LmNyZWF0ZURvY3VtZW50RnJhZ21lbnQoKTtcclxuICBmcmFnbWVudC5hcHBlbmRDaGlsZChkaXZJbnB1dCk7XHJcbiAgZnJhZ21lbnQuYXBwZW5kQ2hpbGQoZGl2Q3VycmVudCk7XHJcblxyXG4gIHJldHVybiBmcmFnbWVudDtcclxufVxyXG5cclxuZnVuY3Rpb24gY3JlYXRlU3dpdGNoVG9vbCh0b29sKSB7XHJcbiAgY29uc3QgbGFiZWwgPSBub2RlRmFjdG9yeSgnbGFiZWwnLCB7IGNsYXNzTGlzdDogWydzd2l0Y2gnXSB9KTtcclxuXHJcbiAgY29uc3QgaW5wdXQgPSBub2RlRmFjdG9yeSgnaW5wdXQnLCB7XHJcbiAgICBhdHRyczoge1xyXG4gICAgICAnZGF0YS1pZCc6IHRvb2wuaWQsXHJcbiAgICAgICdkYXRhLXR5cGUnOiAnc3dpdGNoJyxcclxuICAgICAgJ3R5cGUnOiAnY2hlY2tib3gnXHJcbiAgICB9XHJcbiAgfSk7XHJcbiAgbGFiZWwuYXBwZW5kQ2hpbGQoaW5wdXQpO1xyXG5cclxuICBjb25zdCBkaXYgPSBub2RlRmFjdG9yeSgnZGl2JywgeyBjbGFzc0xpc3Q6IFsnc2xpZGVyJ10gfSk7XHJcbiAgbGFiZWwuYXBwZW5kQ2hpbGQoZGl2KTtcclxuXHJcbiAgcmV0dXJuIGxhYmVsO1xyXG59XHJcblxyXG5mdW5jdGlvbiBnZXRUb29sc0RhdGEoKSB7XHJcbiAgY29uc3QgdG9vbHNEYXRhID0gW107XHJcbiAgY29uc3QgaW5wdXRzID0gJHRvb2xzLnF1ZXJ5U2VsZWN0b3JBbGwoJ2lucHV0W2RhdGEtaWRdJyk7XHJcbiAgaW5wdXRzLmZvckVhY2goaW5wdXQgPT4ge1xyXG4gICAgY29uc3QgeyBpZCwgdHlwZSB9ID0gaW5wdXQuZGF0YXNldDtcclxuICAgIGxldCB2YWx1ZTtcclxuICAgIHN3aXRjaCh0eXBlKSB7XHJcbiAgICAgIGNhc2UgdG9vbFR5cGVzLlJBTkdFOiB2YWx1ZSA9IHBhcnNlSW50KGlucHV0LnZhbHVlKTsgYnJlYWs7XHJcbiAgICAgIGNhc2UgdG9vbFR5cGVzLlNXSVRDSDogdmFsdWUgPSBpbnB1dC5jaGVja2VkOyBicmVhaztcclxuICAgICAgZGVmYXVsdDogdGhyb3cgbmV3IEVycm9yKGDQndC10LrQvtGA0YDQtdC60YLQvdGL0Lkg0YLQuNC/INC/0YDQuNCx0L7RgNCwLiBJRDogJHtpZH1gKTtcclxuICAgIH1cclxuICAgIHRvb2xzRGF0YS5wdXNoKHsgaWQsIHZhbHVlIH0pO1xyXG4gIH0pO1xyXG4gIHJldHVybiB0b29sc0RhdGE7XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IHtcclxuICBpbml0LFxyXG4gIGdldFRvb2xzRGF0YVxyXG59O1xyXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9sZWFybmluZy9zY2VuZV9jb21wb25lbnRzL3Rvb2xzLmpzIiwiaW1wb3J0IG5vZGVGYWN0b3J5IGZyb20gJy4vbm9kZUZhY3RvcnknO1xyXG5cclxuZnVuY3Rpb24gbXNUb0NvbnRlbnQobXMpIHtcclxuICBjb25zdCBzZWNvbmRzID0gTWF0aC5yb3VuZChtcyAvIDEwMDApO1xyXG4gIGNvbnN0IG1pbnMgPSBNYXRoLmZsb29yKHNlY29uZHMgLyA2MCk7XHJcbiAgY29uc3Qgc2Vjb25kc0xlZnQgPSBzZWNvbmRzIC0gKG1pbnMgKiA2MCk7XHJcblxyXG4gIHJldHVybiBgJHttaW5zfToke3NlY29uZHNMZWZ0ID49IDEwID8gJycgOiAnMCd9JHtzZWNvbmRzTGVmdH1gO1xyXG59XHJcblxyXG5jb25zdCB0aW1lciA9IHtcclxuICBzdGFydFRpbWU6IG51bGwsXHJcbiAgaW50ZXJ2YWw6IG51bGwsXHJcbiAgbm9kZTogbm9kZUZhY3RvcnkoJ3NwYW4nLCB7IGNsYXNzTGlzdDogWyd0aW1lciddLCB0ZXh0Q29udGVudDogJzA6MDAnIH0pLFxyXG4gIHN0YXJ0OiBmdW5jdGlvbigpIHtcclxuICAgIHRoaXMuc3RhcnRUaW1lID0gRGF0ZS5ub3coKTtcclxuICAgIHRoaXMuaW50ZXJ2YWwgPSBzZXRJbnRlcnZhbCgoKSA9PiB7XHJcbiAgICAgIGNvbnN0IGVsYXBzZWQgPSBEYXRlLm5vdygpIC0gdGhpcy5zdGFydFRpbWU7XHJcbiAgICAgIHRoaXMubm9kZS50ZXh0Q29udGVudCA9IG1zVG9Db250ZW50KGVsYXBzZWQpO1xyXG4gICAgfSwgMTAwMCk7XHJcbiAgfSxcclxuICBzdG9wOiBmdW5jdGlvbigpIHtcclxuICAgIGlmICghdGhpcy5zdGFydFRpbWUpIHsgcmV0dXJuOyB9XHJcbiAgICB0aGlzLnN0YXJ0VGltZSA9IG51bGw7XHJcbiAgICBjbGVhckludGVydmFsKHRoaXMuaW50ZXJ2YWwpO1xyXG4gICAgdGhpcy5ub2RlLnRleHRDb250ZW50ID0gJzA6MDAnO1xyXG4gIH1cclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgdGltZXI7XHJcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3V0aWxzL3RpbWVyLmpzIiwiaW1wb3J0ICcuLi8uLi9zYXNzL2xlYXJuaW5nLnNjc3MnO1xyXG5cclxuaW1wb3J0IHB1YnN1YiBmcm9tICcuLi91dGlscy9wdWJzdWInO1xyXG5pbXBvcnQgYWpheCBmcm9tICcuLi91dGlscy9hamF4JztcclxuaW1wb3J0IHNjZW5lIGZyb20gJy4vc2NlbmUnO1xyXG5pbXBvcnQgTW9kZWwgZnJvbSAnLi9tb2RlbCc7XHJcblxyXG4vKipcclxuICogTG9hZCBtb2RlbCB3aXRoIGdpdmVuIGlkXHJcbiAqL1xyXG5mdW5jdGlvbiBsb2FkTW9kZWwoaWQpIHtcclxuICByZXR1cm4gYWpheChgL21vZGVscy8ke2lkfWApLnRoZW4ocmVzcG9uc2UgPT4gSlNPTi5wYXJzZShyZXNwb25zZSkpO1xyXG59XHJcblxyXG4vKipcclxuICogVUkgYnV0dG9uJ3MgaGFuZGxlcnNcclxuICovXHJcbmNvbnN0ICRzZWxlY3QgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI21vZGVsLXNlbGVjdFwiKTtcclxuY29uc3QgJGxvYWRCdXR0b24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjbG9hZC1tb2RlbC1idG4nKTtcclxuXHJcbmxldCBtb2RlbCA9IG51bGw7XHJcblxyXG4kbG9hZEJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcclxuICBpZiAoIG1vZGVsICkgeyBtb2RlbC5zdG9wKCk7IH1cclxuICBjb25zdCBtb2RlbElkID0gJHNlbGVjdC52YWx1ZTtcclxuICBsb2FkTW9kZWwobW9kZWxJZClcclxuICAgIC50aGVuKHJlc3BvbnNlID0+IHtcclxuICAgICAgbW9kZWwgPSBuZXcgTW9kZWwocmVzcG9uc2UpO1xyXG4gICAgICBzY2VuZS5pbml0KG1vZGVsLCByZXNwb25zZSlcclxuICAgICAgICAuc2hvd0NvbnRlbnQoKVxyXG4gICAgICAgIC5lbmFibGVCdXR0b25zKCRzdGFydEJ1dHRvbilcclxuICAgICAgICAuZGlzYWJsZUJ1dHRvbnMoJHN0b3BCdXR0b24sICRydW5CdXR0b24pO1xyXG4gICAgfSlcclxuICAgIC5jYXRjaChlcnIgPT4geyBjb25zb2xlLmVycm9yKGVycikgfSk7XHJcbn0pO1xyXG4vL1xyXG5jb25zdCAkc3RhcnRCdXR0b24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjc3RhcnQtYnRuJyk7XHJcbiRzdGFydEJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcclxuICBtb2RlbC5zdGFydCgpO1xyXG4gIHNjZW5lLmRpc2FibGVCdXR0b25zKCRzdGFydEJ1dHRvbik7XHJcbiAgc2NlbmUuZW5hYmxlQnV0dG9ucygkc3RvcEJ1dHRvbiwgJHJ1bkJ1dHRvbik7XHJcbn0pO1xyXG5cclxuY29uc3QgJHN0b3BCdXR0b24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjc3RvcC1idG4nKTtcclxuJHN0b3BCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XHJcbiAgcHVic3ViLnB1Ymxpc2goJ21vZGVsX3N0b3AnKTtcclxuICBzY2VuZS5lbmFibGVCdXR0b25zKCRzdGFydEJ1dHRvbik7XHJcbiAgc2NlbmUuZGlzYWJsZUJ1dHRvbnMoJHN0b3BCdXR0b24sICRydW5CdXR0b24pO1xyXG59KTtcclxuXHJcbmNvbnN0ICRydW5CdXR0b24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjcnVuLWJ0bicpO1xyXG4kcnVuQnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xyXG4gIGNvbnN0IHRvb2xzRGF0YSA9IHNjZW5lLmdldFRvb2xzRGF0YSgpO1xyXG4gIHB1YnN1Yi5wdWJsaXNoKCd1c2VyX2lucHV0JywgdG9vbHNEYXRhKTtcclxufSk7XHJcblxyXG4vKipcclxuICogSGFuZGxlIGN1c3RvbSBldmVudHMgaGVyZSAodXNlciBpbnB1dCwgcHJvZ3JhbW0gbWVzc2FnZXMgZXRjLilcclxuICovXHJcbnB1YnN1Yi5zdWJzY3JpYmUoJ25ld19zdGF0ZScsIHN0YXRlID0+IHtcclxuICBzY2VuZS5oaWRlRXZlbnQoKTtcclxuICBzY2VuZS5zZXRTdGF0ZShzdGF0ZSk7XHJcbn0pO1xyXG5wdWJzdWIuc3Vic2NyaWJlKCdldmVudCcsIGV2ZW50ID0+IHNjZW5lLnNob3dFdmVudChldmVudCkpO1xyXG5cclxuLy8gLyoqXHJcbi8vICogVGltZXIgKGN1cnJlbnRseSBmb3IgZGV2IG1vZGUgb25seSlcclxuLy8gKi9cclxuLy8gaW1wb3J0IHRpbWVyIGZyb20gJy4uL3V0aWxzL3RpbWVyJztcclxuLy8gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmhlYWRlcicpLmFwcGVuZENoaWxkKHRpbWVyLm5vZGUpO1xyXG4vLyBwdWJzdWIuc3Vic2NyaWJlKCduZXdfc3RhdGUnLCBzdGF0ZSA9PiB0aW1lci5zdG9wKCkpO1xyXG4vLyBwdWJzdWIuc3Vic2NyaWJlKCdldmVudCcsIGV2ZW50ID0+IHRpbWVyLnN0YXJ0KCkpO1xyXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9sZWFybmluZy9pbmRleC5qcyJdLCJzb3VyY2VSb290IjoiIn0=