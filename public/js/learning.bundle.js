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
/******/ 	return __webpack_require__(__webpack_require__.s = 33);
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

var _state = __webpack_require__(21);

var _state2 = _interopRequireDefault(_state);

var _pubsub = __webpack_require__(1);

var _pubsub2 = _interopRequireDefault(_pubsub);

var _report = __webpack_require__(22);

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
    this.startState = new _state2.default({ id: 0, name: INITIAL_STATE_NAME, img: 'start.png', last: true });
    this.stopState = new _state2.default({ id: -1, name: STOP_STATE_NAME, img: 'stop.png', last: true });
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

var _state = __webpack_require__(23);

var _state2 = _interopRequireDefault(_state);

var _tools = __webpack_require__(24);

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
/* 18 */,
/* 19 */
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
/* 20 */
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
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _event = __webpack_require__(20);

var _event2 = _interopRequireDefault(_event);

var _action = __webpack_require__(19);

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
/* 22 */
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
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _nodeFactory = __webpack_require__(2);

var _nodeFactory2 = _interopRequireDefault(_nodeFactory);

var _timer = __webpack_require__(26);

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
  $img.setAttribute('src', 'img/states/' + img);
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
/* 24 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _nodeFactory = __webpack_require__(2);

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
      'max': tool.max,
      'value': 0
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
/* 25 */,
/* 26 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _nodeFactory = __webpack_require__(2);

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
/* 27 */,
/* 28 */,
/* 29 */,
/* 30 */,
/* 31 */,
/* 32 */,
/* 33 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


__webpack_require__(10);

var _pubsub = __webpack_require__(1);

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgNzY5YWQ5NTA1NjAyYzY3MDU1MWMiLCJ3ZWJwYWNrOi8vLy4vdXRpbHMvYWpheC5qcyIsIndlYnBhY2s6Ly8vLi91dGlscy9wdWJzdWIuanMiLCJ3ZWJwYWNrOi8vLy4vdXRpbHMvbm9kZUZhY3RvcnkuanMiLCJ3ZWJwYWNrOi8vLy4vbGVhcm5pbmcvbW9kZWwuanMiLCJ3ZWJwYWNrOi8vLy4vbGVhcm5pbmcvc2NlbmUuanMiLCJ3ZWJwYWNrOi8vLy4uL3Nhc3MvbGVhcm5pbmcuc2NzcyIsIndlYnBhY2s6Ly8vLi9sZWFybmluZy9tb2RlbF9jb21wb25lbnRzL2FjdGlvbi5qcyIsIndlYnBhY2s6Ly8vLi9sZWFybmluZy9tb2RlbF9jb21wb25lbnRzL2V2ZW50LmpzIiwid2VicGFjazovLy8uL2xlYXJuaW5nL21vZGVsX2NvbXBvbmVudHMvc3RhdGUuanMiLCJ3ZWJwYWNrOi8vLy4vbGVhcm5pbmcvcmVwb3J0LmpzIiwid2VicGFjazovLy8uL2xlYXJuaW5nL3NjZW5lX2NvbXBvbmVudHMvc3RhdGUuanMiLCJ3ZWJwYWNrOi8vLy4vbGVhcm5pbmcvc2NlbmVfY29tcG9uZW50cy90b29scy5qcyIsIndlYnBhY2s6Ly8vLi91dGlscy90aW1lci5qcyIsIndlYnBhY2s6Ly8vLi9sZWFybmluZy9pbmRleC5qcyJdLCJuYW1lcyI6WyJhamF4IiwicGF0aCIsIm9wdGlvbnMiLCJmdWxsUmVzcG9uc2UiLCJ4aHIiLCJYTUxIdHRwUmVxdWVzdCIsIm9wZW4iLCJtZXRob2QiLCJoZWFkZXJzIiwic2V0WEhSSGVhZGVycyIsInNlbmQiLCJkYXRhIiwiUHJvbWlzZSIsInJlc29sdmUiLCJyZWplY3QiLCJvbnJlYWR5c3RhdGVjaGFuZ2UiLCJyZWFkeVN0YXRlIiwic3RhdHVzIiwicmVzcG9uc2VUZXh0Iiwic3RhdHVzVGV4dCIsImhlYWRlciIsInNldFJlcXVlc3RIZWFkZXIiLCJwdWJzdWIiLCJ0b3BpY3MiLCJzdWJzY3JpYmUiLCJ0b3BpYyIsImxpc3RlbmVyIiwicXVldWUiLCJpbmRleCIsInB1c2giLCJyZW1vdmUiLCJwdWJsaXNoIiwiaW5mbyIsImxlbmd0aCIsIml0ZW1zIiwiZm9yRWFjaCIsIml0ZW0iLCJub2RlRmFjdG9yeSIsInR5cGUiLCJwYXJhbXMiLCJub2RlIiwiZG9jdW1lbnQiLCJjcmVhdGVFbGVtZW50IiwiYXBwZW5kQ2xhc3NlcyIsImFwcGVuZEF0dHJzIiwiaW5zZXJ0VGV4dENvbnRlbnQiLCJjbGFzc0xpc3QiLCJhZGQiLCJjbGFzc05hbWUiLCJhdHRycyIsImF0dHJOYW1lcyIsIk9iamVjdCIsImtleXMiLCJzZXRBdHRyaWJ1dGUiLCJhdHRyTmFtZSIsInRleHRDb250ZW50IiwiSU5JVElBTF9TVEFURV9OQU1FIiwiU1RPUF9TVEFURV9OQU1FIiwiTW9kZWwiLCJpZCIsIm5hbWUiLCJicmVha1RpbWUiLCJzdGVwcyIsInN0YXRlcyIsIm1hcCIsInN0YXRlIiwiY3VycmVudFN0YXRlIiwiZ2V0U3RhdGUiLCJpbml0aWFsU3RhdGUiLCJ0aW1lb3V0Iiwic3ViSW5wdXQiLCJzdWJTdG9wIiwic3RhcnRTdGF0ZSIsImltZyIsImxhc3QiLCJzdG9wU3RhdGUiLCJmaW5kIiwicmVwb3J0IiwiaGFuZGxlTmV3U3RhdGUiLCJpbnRlcnZhbHMiLCJpIiwidGhlbiIsIm1ha2VCcmVhayIsImhhbmRsZUV2ZW50IiwiY2F0Y2giLCJyZXNwb25zZSIsImNvbnNvbGUiLCJsb2ciLCJzZXRUaW1lb3V0IiwiY2xlYXJTdWJzIiwiZXZlbnQiLCJldmVudFN0YXJ0VGltZSIsIkRhdGUiLCJub3ciLCJpbmNyZWFzZUFjdGlvbnNOdW1iZXIiLCJ0aW1lU3BlbnQiLCJuZXh0U3RhdGVJZCIsImhhbmRsZUlucHV0IiwibmV4dFN0YXRlIiwic2V0U3BlbnRUaW1lIiwiaW5hY3RpdmVUaW1lIiwiZ2V0SW5hY3RpdmVUaW1lIiwiZ2V0SW5hY3RpdmVBY3Rpb24iLCJwdXNoU3RhdGUiLCJjbGVhclRpbWVvdXQiLCJleHBvcnRzIiwiJG1vZGVsTmFtZSIsInF1ZXJ5U2VsZWN0b3IiLCJpbml0IiwibW9kZWwiLCJzZXQiLCJ0b29scyIsIiRjb250ZW50Iiwic2hvd0NvbnRlbnQiLCJzZXRDb250ZW50RGlzcGxheSIsImhpZGVDb250ZW50IiwiZGlzcGxheSIsInN0eWxlIiwiZW5hYmxlQnV0dG9ucyIsImJ1dHRvbnMiLCJzZXRCdXR0b25zU3RhdGUiLCJkaXNhYmxlQnV0dG9ucyIsInZhbHVlIiwiYnV0dG9uIiwiZGlzYWJsZWQiLCJnZXRUb29sc0RhdGEiLCJzZXRTdGF0ZSIsInN0YXRlRGF0YSIsInNob3dFdmVudCIsImV2ZW50RGF0YSIsImhpZGVFdmVudCIsIkFjdGlvbiIsIm1pblRpbWUiLCJtYXhUaW1lIiwiaW5hY3RpdmUiLCJpbml0VG9vbHMiLCJ0aW1lIiwicmlnaHRUaW1lIiwicmlnaHREYXRhIiwiZXZlcnkiLCJjaGVja1Rvb2wiLCJvYmoiLCJ0b29sIiwiYm9vbFZhbHVlIiwiaW5jbHVkZXNWYWx1ZSIsIm1pblZhbHVlIiwibWF4VmFsdWUiLCJib3JkZXJzIiwiVHlwZUVycm9yIiwiQWN0aW9uVG9vbCIsIkV2ZW50IiwiZGVzY3JpcHRpb24iLCJTdGF0ZSIsImFjdGlvbnMiLCJhY3Rpb24iLCJ0aW1lcyIsImdldEFsbEFjdGlvblRpbWVzIiwiTWF0aCIsIm1heCIsInN1aXRlZEFjdGlvbnMiLCJmaWx0ZXIiLCJpc1N1aXRhYmxlIiwiUkVQT1JUX1VSTCIsImFqYXhDb25maWciLCJSZXBvcnQiLCJtb2RlbE5hbWUiLCJtYXhTdGVwcyIsInNwZW50VGltZSIsImFjdGlvbnNOdW1iZXIiLCJzZXRJbmFjdGl2ZSIsInNsaWNlIiwiSlNPTiIsInN0cmluZ2lmeSIsIiRuYW1lIiwiJGltZyIsIiRwYXJhbXMiLCIkZXZlbnQiLCIkZXZlbnRIZWFkZXIiLCIkZXZlbnRCb2R5IiwiJHRpbWVyQ29udGFpbmVyIiwiYXBwZW5kQ2hpbGQiLCJzZXRQYXJhbWV0ZXJzIiwiZnJhZyIsImNyZWF0ZURvY3VtZW50RnJhZ21lbnQiLCJjcmVhdGVQYXJhbWV0ZU5vZGUiLCJwYXJhbSIsImlubmVySFRNTCIsImtleSIsImRpdiIsImtleVNwYW4iLCJ2YWx1ZVNwYW4iLCJzaG93VGltZXIiLCJoaWRlVGltZXIiLCJzdGFydCIsInN0b3AiLCJ0b29sVHlwZXMiLCJSQU5HRSIsIlNXSVRDSCIsIiR0b29scyIsImZyYWdtZW50IiwibGFiZWwiLCJ0b29sTm9kZSIsImNyZWF0ZVRvb2xOb2RlIiwiY3JlYXRlUmFuZ2VUb29sIiwiY3JlYXRlU3dpdGNoVG9vbCIsImRpdklucHV0Iiwic3Bhbk1pbiIsIm1pbiIsImlucHV0Iiwic3Bhbk1heCIsImRpdkN1cnJlbnQiLCJzcGFuQ3VycmVudCIsImFkZEV2ZW50TGlzdGVuZXIiLCJldnQiLCJ0YXJnZXQiLCJ0b29sc0RhdGEiLCJpbnB1dHMiLCJxdWVyeVNlbGVjdG9yQWxsIiwiZGF0YXNldCIsInBhcnNlSW50IiwiY2hlY2tlZCIsIkVycm9yIiwibXNUb0NvbnRlbnQiLCJtcyIsInNlY29uZHMiLCJyb3VuZCIsIm1pbnMiLCJmbG9vciIsInNlY29uZHNMZWZ0IiwidGltZXIiLCJzdGFydFRpbWUiLCJpbnRlcnZhbCIsInNldEludGVydmFsIiwiZWxhcHNlZCIsImNsZWFySW50ZXJ2YWwiLCJsb2FkTW9kZWwiLCJwYXJzZSIsIiRzZWxlY3QiLCIkbG9hZEJ1dHRvbiIsIm1vZGVsSWQiLCIkc3RhcnRCdXR0b24iLCIkc3RvcEJ1dHRvbiIsIiRydW5CdXR0b24iLCJlcnJvciIsImVyciJdLCJtYXBwaW5ncyI6IjtBQUFBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBLG1EQUEyQyxjQUFjOztBQUV6RDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQUs7QUFDTDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLG1DQUEyQiwwQkFBMEIsRUFBRTtBQUN2RCx5Q0FBaUMsZUFBZTtBQUNoRDtBQUNBO0FBQ0E7O0FBRUE7QUFDQSw4REFBc0QsK0RBQStEOztBQUVySDtBQUNBOztBQUVBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7QUNoRUEsU0FBU0EsSUFBVCxHQUE2RDtBQUFBLE1BQS9DQyxJQUErQyx1RUFBeEMsRUFBd0M7QUFBQSxNQUFwQ0MsT0FBb0MsdUVBQTFCLEVBQTBCO0FBQUEsTUFBdEJDLFlBQXNCLHVFQUFQLEtBQU87O0FBQzNELE1BQU1DLE1BQU0sSUFBSUMsY0FBSixFQUFaO0FBQ0FELE1BQUlFLElBQUosQ0FBU0osUUFBUUssTUFBUixJQUFrQixLQUEzQixFQUFrQ04sSUFBbEMsRUFBd0MsSUFBeEM7QUFDQSxNQUFJQyxRQUFRTSxPQUFaLEVBQXFCO0FBQUVDLGtCQUFjTCxHQUFkLEVBQW1CRixRQUFRTSxPQUEzQjtBQUFzQztBQUM3REosTUFBSU0sSUFBSixDQUFTUixRQUFRUyxJQUFqQjs7QUFFQSxTQUFPLElBQUlDLE9BQUosQ0FBWSxVQUFDQyxPQUFELEVBQVVDLE1BQVYsRUFBcUI7QUFDdENWLFFBQUlXLGtCQUFKLEdBQXlCLFlBQVc7QUFDbEMsVUFBR1gsSUFBSVksVUFBSixJQUFrQixDQUFyQixFQUF3QjtBQUN0QixZQUFHWixJQUFJYSxNQUFKLElBQWMsR0FBakIsRUFBc0I7QUFDcEIsY0FBSWQsWUFBSixFQUFrQjtBQUNoQlUsb0JBQVFULEdBQVI7QUFDRCxXQUZELE1BRU87QUFDTFMsb0JBQVFULElBQUljLFlBQVo7QUFDRDtBQUNGLFNBTkQsTUFNTztBQUNMSixpQkFBT1YsSUFBSWUsVUFBWDtBQUNEO0FBQ0Y7QUFDRixLQVpEO0FBYUQsR0FkTSxDQUFQO0FBZUQ7O0FBRUQsU0FBU1YsYUFBVCxDQUF1QkwsR0FBdkIsRUFBNEJJLE9BQTVCLEVBQXFDO0FBQ25DLE9BQUssSUFBSVksTUFBVCxJQUFtQlosT0FBbkIsRUFBNEI7QUFDMUJKLFFBQUlpQixnQkFBSixDQUFxQkQsTUFBckIsRUFBNkJaLFFBQVFZLE1BQVIsQ0FBN0I7QUFDRDtBQUNGOztrQkFFY3BCLEk7Ozs7Ozs7Ozs7OztBQzdCZixJQUFNc0IsU0FBVSxZQUFXOztBQUV6QixNQUFNQyxTQUFTLEVBQWY7O0FBRUEsU0FBTztBQUNMQyxlQUFXLG1CQUFTQyxLQUFULEVBQWdCQyxRQUFoQixFQUEwQjtBQUNuQyxVQUFJLENBQUNILE9BQU9FLEtBQVAsQ0FBTCxFQUFvQkYsT0FBT0UsS0FBUCxJQUFnQixFQUFFRSxPQUFPLEVBQVQsRUFBaEI7O0FBRXBCLFVBQU1DLFFBQVFMLE9BQU9FLEtBQVAsRUFBY0UsS0FBZCxDQUFvQkUsSUFBcEIsQ0FBeUJILFFBQXpCLElBQXFDLENBQW5EO0FBQ0E7QUFDQSxhQUFPO0FBQ0xJLGdCQUFRLGtCQUFXO0FBQ2pCLGlCQUFPUCxPQUFPRSxLQUFQLEVBQWNFLEtBQWQsQ0FBb0JDLEtBQXBCLENBQVA7QUFDRDtBQUhJLE9BQVA7QUFLRCxLQVhJOztBQWFMRyxhQUFTLGlCQUFTTixLQUFULEVBQWdCTyxJQUFoQixFQUFzQjtBQUM3QjtBQUNBLFVBQUksQ0FBQ1QsT0FBT0UsS0FBUCxDQUFELElBQWtCLENBQUNGLE9BQU9FLEtBQVAsRUFBY0UsS0FBZCxDQUFvQk0sTUFBM0MsRUFBbUQ7O0FBRW5ELFVBQU1DLFFBQVFYLE9BQU9FLEtBQVAsRUFBY0UsS0FBNUI7QUFDQU8sWUFBTUMsT0FBTixDQUFjLGdCQUFRO0FBQ3BCQyxhQUFLSixRQUFRLEVBQWI7QUFDRCxPQUZEO0FBR0Q7QUFyQkksR0FBUDtBQXVCRCxDQTNCYyxFQUFmOztrQkE2QmVWLE07Ozs7Ozs7Ozs7OztBQzdCZixJQUFNZSxjQUFjLFNBQWRBLFdBQWMsR0FBb0M7QUFBQSxNQUEzQkMsSUFBMkIsdUVBQXBCLEtBQW9CO0FBQUEsTUFBYkMsTUFBYSx1RUFBSixFQUFJOztBQUN0RCxNQUFNQyxPQUFPQyxTQUFTQyxhQUFULENBQXVCSixJQUF2QixDQUFiOztBQUVBSyxnQkFBY0gsSUFBZCxFQUFvQkQsTUFBcEI7QUFDQUssY0FBWUosSUFBWixFQUFrQkQsTUFBbEI7QUFDQU0sb0JBQWtCTCxJQUFsQixFQUF3QkQsTUFBeEI7O0FBRUEsU0FBT0MsSUFBUDtBQUNELENBUkQ7O0FBVUEsU0FBU0csYUFBVCxDQUF1QkgsSUFBdkIsUUFBNEM7QUFBQSxNQUFiTSxTQUFhLFFBQWJBLFNBQWE7O0FBQzFDLE1BQUlBLGFBQWFBLFVBQVVYLE9BQTNCLEVBQW9DO0FBQ2xDVyxjQUFVWCxPQUFWLENBQWtCO0FBQUEsYUFBYUssS0FBS00sU0FBTCxDQUFlQyxHQUFmLENBQW1CQyxTQUFuQixDQUFiO0FBQUEsS0FBbEI7QUFDRDtBQUNGOztBQUVELFNBQVNKLFdBQVQsQ0FBcUJKLElBQXJCLFNBQXNDO0FBQUEsTUFBVFMsS0FBUyxTQUFUQSxLQUFTOztBQUNwQyxNQUFJQSxLQUFKLEVBQVc7QUFDVCxRQUFNQyxZQUFZQyxPQUFPQyxJQUFQLENBQVlILEtBQVosQ0FBbEI7QUFDQUMsY0FBVWYsT0FBVixDQUFrQjtBQUFBLGFBQVlLLEtBQUthLFlBQUwsQ0FBa0JDLFFBQWxCLEVBQTRCTCxNQUFNSyxRQUFOLENBQTVCLENBQVo7QUFBQSxLQUFsQjtBQUNEO0FBQ0Y7O0FBRUQsU0FBU1QsaUJBQVQsQ0FBMkJMLElBQTNCLFNBQXVEO0FBQUEsZ0NBQXBCZSxXQUFvQjtBQUFBLE1BQXBCQSxXQUFvQixxQ0FBTixFQUFNOztBQUNyRGYsT0FBS2UsV0FBTCxHQUFtQkEsV0FBbkI7QUFDRDs7a0JBRWNsQixXOzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUMzQmY7Ozs7QUFDQTs7OztBQUNBOzs7Ozs7OztBQUVBLElBQU1tQixxQkFBcUIsa0JBQTNCO0FBQ0EsSUFBTUMsa0JBQWtCLHNCQUF4Qjs7SUFFTUMsSztBQUNKLGlCQUFZL0MsSUFBWixFQUFrQjtBQUFBOztBQUNoQixTQUFLZ0QsRUFBTCxHQUFVaEQsS0FBS2dELEVBQWY7QUFDQSxTQUFLQyxJQUFMLEdBQVlqRCxLQUFLaUQsSUFBakI7QUFDQSxTQUFLQyxTQUFMLEdBQWlCbEQsS0FBS2tELFNBQXRCO0FBQ0EsU0FBS0MsS0FBTCxHQUFhbkQsS0FBS21ELEtBQWxCOztBQUVBLFNBQUtDLE1BQUwsR0FBY3BELEtBQUtvRCxNQUFMLENBQVlDLEdBQVosQ0FBZ0I7QUFBQSxhQUFTLG9CQUFVQyxLQUFWLENBQVQ7QUFBQSxLQUFoQixDQUFkO0FBQ0EsU0FBS0MsWUFBTCxHQUFvQixLQUFLQyxRQUFMLENBQWN4RCxLQUFLeUQsWUFBbkIsQ0FBcEI7O0FBRUEsU0FBS0MsT0FBTCxHQUFlLElBQWY7QUFDQSxTQUFLQyxRQUFMLEdBQWdCLElBQWhCO0FBQ0EsU0FBS0MsT0FBTCxHQUFlLElBQWY7QUFDQSxTQUFLQyxVQUFMLEdBQWtCLG9CQUFVLEVBQUViLElBQUksQ0FBTixFQUFTQyxNQUFNSixrQkFBZixFQUFtQ2lCLEtBQUssV0FBeEMsRUFBcURDLE1BQU0sSUFBM0QsRUFBVixDQUFsQjtBQUNBLFNBQUtDLFNBQUwsR0FBaUIsb0JBQVUsRUFBRWhCLElBQUksQ0FBQyxDQUFQLEVBQVVDLE1BQU1ILGVBQWhCLEVBQWlDZ0IsS0FBSyxVQUF0QyxFQUFrREMsTUFBTSxJQUF4RCxFQUFWLENBQWpCO0FBQ0Q7Ozs7NkJBRVFmLEUsRUFBSTtBQUNYLGFBQU8sS0FBS0ksTUFBTCxDQUFZYSxJQUFaLENBQWlCO0FBQUEsZUFBU1gsTUFBTU4sRUFBTixJQUFZQSxFQUFyQjtBQUFBLE9BQWpCLENBQVA7QUFDRDs7OzRCQUVPO0FBQUE7O0FBQ04sV0FBS2tCLE1BQUwsR0FBYyxxQkFBVyxLQUFLakIsSUFBaEIsRUFBc0IsS0FBS0UsS0FBM0IsQ0FBZDtBQUNBLFdBQUtnQixjQUFMLENBQW9CLEtBQUtaLFlBQXpCLEVBRk0sQ0FFa0M7QUFDeEMsVUFBSWEsWUFBWW5FLFFBQVFDLE9BQVIsRUFBaEIsQ0FITSxDQUc2QjtBQUNuQyxXQUFLLElBQUltRSxJQUFJLENBQWIsRUFBZ0JBLElBQUksS0FBS2xCLEtBQXpCLEVBQWdDa0IsR0FBaEMsRUFBcUM7QUFDbkNELG9CQUFZQSxVQUNWRSxJQURVLENBQ0wsWUFBTTtBQUFFLGlCQUFPLE1BQUtDLFNBQUwsRUFBUDtBQUF5QixTQUQ1QixFQUVWRCxJQUZVLENBRUwsWUFBTTtBQUFFLGlCQUFPLE1BQUtFLFdBQUwsRUFBUDtBQUEyQixTQUY5QixFQUdWRixJQUhVLENBR0wsaUJBQVM7QUFBRSxnQkFBS0gsY0FBTCxDQUFvQmIsS0FBcEI7QUFBNEIsU0FIbEMsQ0FBWjtBQUlEO0FBQ0RjLGdCQUNHSyxLQURILENBQ1M7QUFBQSxlQUFTLE1BQUtOLGNBQUwsQ0FBb0JiLEtBQXBCLENBQVQ7QUFBQSxPQURULEVBRUdnQixJQUZILENBRVEsWUFBTTtBQUNWLFlBQUksTUFBS2YsWUFBTCxDQUFrQk4sSUFBbEIsS0FBMkJILGVBQS9CLEVBQWdEO0FBQzlDLGdCQUFLb0IsTUFBTCxDQUFZbkUsSUFBWixHQUNDdUUsSUFERCxDQUNNLFVBQUNJLFFBQUQ7QUFBQSxtQkFBY0MsUUFBUUMsR0FBUixDQUFZRixRQUFaLENBQWQ7QUFBQSxXQUROO0FBRUQ7QUFDRixPQVBIO0FBUUEsYUFBT04sU0FBUDtBQUNEOzs7Z0NBRVc7QUFBQTs7QUFDVixhQUFPLElBQUluRSxPQUFKLENBQVksVUFBQ0MsT0FBRCxFQUFVQyxNQUFWLEVBQXFCO0FBQ3RDLGVBQUt5RCxPQUFMLEdBQWUsaUJBQU8vQyxTQUFQLENBQWlCLFlBQWpCLEVBQStCLFlBQU07QUFBRVYsaUJBQU8sT0FBSzZELFNBQVo7QUFBeUIsU0FBaEUsQ0FBZjtBQUNBYSxtQkFBVyxZQUFNO0FBQ2YsaUJBQUtDLFNBQUw7QUFDQTVFO0FBQ0QsU0FIRCxFQUdHLE9BQUtnRCxTQUhSO0FBSUQsT0FOTSxDQUFQO0FBT0Q7OztrQ0FFYTtBQUFBOztBQUNaLFVBQU02QixRQUFRLEtBQUt4QixZQUFMLENBQWtCd0IsS0FBaEM7QUFDQSxVQUFNQyxpQkFBaUJDLEtBQUtDLEdBQUwsRUFBdkI7QUFDQSxhQUFPLElBQUlqRixPQUFKLENBQVksVUFBQ0MsT0FBRCxFQUFVQyxNQUFWLEVBQXFCO0FBQ3RDO0FBQ0EseUJBQU9pQixPQUFQLENBQWUsT0FBZixFQUF3QjJELEtBQXhCOztBQUVBO0FBQ0E7QUFDQSxlQUFLcEIsUUFBTCxHQUFnQixpQkFBTzlDLFNBQVAsQ0FBaUIsWUFBakIsRUFBK0IsZ0JBQVE7QUFDckQsaUJBQUtxRCxNQUFMLENBQVlpQixxQkFBWjtBQUNBLGNBQU1DLFlBQVlILEtBQUtDLEdBQUwsS0FBYUYsY0FBL0I7QUFDQSxjQUFNSyxjQUFjLE9BQUs5QixZQUFMLENBQWtCK0IsV0FBbEIsQ0FBOEJ0RixJQUE5QixFQUFvQ29GLFNBQXBDLENBQXBCO0FBQ0EsY0FBTUcsWUFBWSxPQUFLL0IsUUFBTCxDQUFjNkIsV0FBZCxDQUFsQjtBQUNBLGNBQUtFLFNBQUwsRUFBaUI7QUFDZixtQkFBS3JCLE1BQUwsQ0FBWXNCLFlBQVosQ0FBeUJKLFNBQXpCO0FBQ0FHLHNCQUFVeEIsSUFBVixHQUFpQjVELE9BQU9vRixTQUFQLENBQWpCLEdBQXFDckYsUUFBUXFGLFNBQVIsQ0FBckM7QUFDRDtBQUNGLFNBVGUsQ0FBaEI7O0FBV0E7QUFDQSxlQUFLM0IsT0FBTCxHQUFlLGlCQUFPL0MsU0FBUCxDQUFpQixZQUFqQixFQUErQixZQUFNO0FBQ2xEVixpQkFBTyxPQUFLNkQsU0FBWjtBQUNELFNBRmMsQ0FBZjs7QUFJQTtBQUNBLFlBQU15QixlQUFlLE9BQUtsQyxZQUFMLENBQWtCbUMsZUFBbEIsRUFBckI7QUFDQSxlQUFLaEMsT0FBTCxHQUFlbUIsV0FBVyxZQUFNO0FBQzlCLGNBQU1RLGNBQWMsT0FBSzlCLFlBQUwsQ0FBa0JvQyxpQkFBbEIsR0FBc0NKLFNBQTFEO0FBQ0EsY0FBTUEsWUFBWSxPQUFLL0IsUUFBTCxDQUFjNkIsV0FBZCxDQUFsQjtBQUNBRSxvQkFBVXhCLElBQVYsR0FBaUI1RCxPQUFPb0YsU0FBUCxDQUFqQixHQUFxQ3JGLFFBQVFxRixTQUFSLENBQXJDO0FBQ0QsU0FKYyxFQUlaRSxZQUpZLENBQWY7QUFLRCxPQTdCTSxDQUFQO0FBOEJEOzs7bUNBRWNuQyxLLEVBQU87QUFDcEIsV0FBS1ksTUFBTCxDQUFZMEIsU0FBWixDQUFzQnRDLEtBQXRCO0FBQ0EsV0FBS0MsWUFBTCxHQUFvQkQsS0FBcEI7QUFDQXVDLG1CQUFhLEtBQUtuQyxPQUFsQjtBQUNBLFdBQUtvQixTQUFMO0FBQ0EsdUJBQU8xRCxPQUFQLENBQWUsV0FBZixFQUE0QmtDLEtBQTVCO0FBQ0Q7OztnQ0FFVztBQUNWLFVBQUksS0FBS0ssUUFBVCxFQUFtQjtBQUNqQixhQUFLQSxRQUFMLENBQWN4QyxNQUFkO0FBQ0Q7QUFDRCxVQUFJLEtBQUt5QyxPQUFULEVBQWtCO0FBQ2hCLGFBQUtBLE9BQUwsQ0FBYXpDLE1BQWI7QUFDRDtBQUNGOzs7Ozs7a0JBSVk0QixLOzs7Ozs7Ozs7Ozs7O0FDakhmOzs7O0FBQ0E7Ozs7OztBQUVBLElBQU0rQyxXQUFVLEVBQWhCOztBQUVBO0FBQ0EsSUFBTUMsYUFBYWpFLFNBQVNrRSxhQUFULENBQXVCLGFBQXZCLENBQW5CO0FBQ0FGLFNBQVFHLElBQVIsR0FBZSxVQUFTQyxLQUFULEVBQWdCeEIsUUFBaEIsRUFBMEI7QUFDdkNxQixhQUFXbkQsV0FBWCxHQUF5QnNELE1BQU1qRCxJQUEvQjtBQUNBLGtCQUFNa0QsR0FBTixDQUFVRCxNQUFNckMsVUFBaEI7QUFDQSxrQkFBTW9DLElBQU4sQ0FBV3ZCLFNBQVMwQixLQUFwQjtBQUNBLFNBQU8sSUFBUDtBQUNELENBTEQ7O0FBT0E7QUFDQSxJQUFNQyxXQUFXdkUsU0FBU2tFLGFBQVQsQ0FBdUIsVUFBdkIsQ0FBakI7QUFDQUYsU0FBUVEsV0FBUixHQUFzQixZQUFXO0FBQy9CQyxvQkFBa0IsTUFBbEI7QUFDQSxTQUFPLElBQVA7QUFDRCxDQUhEO0FBSUFULFNBQVFVLFdBQVIsR0FBc0IsWUFBVztBQUMvQkQsb0JBQWtCLE1BQWxCO0FBQ0EsU0FBTyxJQUFQO0FBQ0QsQ0FIRDtBQUlBLFNBQVNBLGlCQUFULENBQTJCRSxPQUEzQixFQUFvQztBQUNsQ0osV0FBU0ssS0FBVCxDQUFlRCxPQUFmLEdBQXlCQSxPQUF6QjtBQUNEOztBQUVEO0FBQ0FYLFNBQVFhLGFBQVIsR0FBd0IsWUFBcUI7QUFBQSxvQ0FBVEMsT0FBUztBQUFUQSxXQUFTO0FBQUE7O0FBQzNDQyxrQkFBZ0JELE9BQWhCLEVBQXlCLEtBQXpCO0FBQ0EsU0FBTyxJQUFQO0FBQ0QsQ0FIRDtBQUlBZCxTQUFRZ0IsY0FBUixHQUF5QixZQUFxQjtBQUFBLHFDQUFURixPQUFTO0FBQVRBLFdBQVM7QUFBQTs7QUFDNUNDLGtCQUFnQkQsT0FBaEIsRUFBeUIsSUFBekI7QUFDQSxTQUFPLElBQVA7QUFDRCxDQUhEO0FBSUEsU0FBU0MsZUFBVCxDQUF5QkQsT0FBekIsRUFBa0NHLEtBQWxDLEVBQXlDO0FBQ3ZDSCxVQUFRcEYsT0FBUixDQUFnQjtBQUFBLFdBQVV3RixPQUFPQyxRQUFQLEdBQWtCRixLQUE1QjtBQUFBLEdBQWhCO0FBQ0Q7O0FBRUQ7QUFDQWpCLFNBQVFvQixZQUFSLEdBQXVCO0FBQUEsU0FDckIsZ0JBQU1BLFlBQU4sRUFEcUI7QUFBQSxDQUF2Qjs7QUFHQXBCLFNBQVFxQixRQUFSLEdBQW1CO0FBQUEsU0FDakIsZ0JBQU1oQixHQUFOLENBQVVpQixTQUFWLENBRGlCO0FBQUEsQ0FBbkI7O0FBR0F0QixTQUFRdUIsU0FBUixHQUFvQjtBQUFBLFNBQ2xCLGdCQUFNQSxTQUFOLENBQWdCQyxTQUFoQixDQURrQjtBQUFBLENBQXBCOztBQUdBeEIsU0FBUXlCLFNBQVIsR0FBb0I7QUFBQSxTQUNsQixnQkFBTUEsU0FBTixFQURrQjtBQUFBLENBQXBCOztrQkFHZXpCLFE7Ozs7Ozs7O0FDdERmLHlDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0lDQU0wQixNO0FBQ0osa0JBQVl4SCxJQUFaLEVBQWtCO0FBQUE7O0FBQ2hCLFNBQUt5SCxPQUFMLEdBQWV6SCxLQUFLeUgsT0FBcEI7QUFDQSxTQUFLQyxPQUFMLEdBQWUxSCxLQUFLMEgsT0FBcEI7QUFDQSxTQUFLbkMsU0FBTCxHQUFpQnZGLEtBQUt1RixTQUF0QjtBQUNBLFFBQUl2RixLQUFLMkgsUUFBVCxFQUFtQjtBQUNqQixXQUFLQSxRQUFMLEdBQWdCLElBQWhCO0FBQ0EsV0FBS3ZCLEtBQUwsR0FBYSxFQUFiO0FBQ0QsS0FIRCxNQUdPO0FBQ0wsV0FBS3VCLFFBQUwsR0FBZ0IsS0FBaEI7QUFDQSxXQUFLdkIsS0FBTCxHQUFhLEtBQUt3QixTQUFMLENBQWU1SCxLQUFLb0csS0FBcEIsQ0FBYjtBQUNEO0FBRUY7O0FBRUQ7Ozs7Ozs7OzsrQkFLV3BHLEksRUFBTTZILEksRUFBTTtBQUNyQixhQUFPLEtBQUtDLFNBQUwsQ0FBZUQsSUFBZixLQUF3QixLQUFLRSxTQUFMLENBQWUvSCxJQUFmLENBQS9CO0FBQ0Q7OztnQ0FFb0I7QUFBQTs7QUFBQSxVQUFYQSxJQUFXLHVFQUFKLEVBQUk7O0FBQ25CLGFBQU8sS0FBS29HLEtBQUwsQ0FBVzRCLEtBQVgsQ0FBaUIsZ0JBQVE7QUFDOUI7QUFDQSxZQUFNQyxZQUFZakksS0FBS2lFLElBQUwsQ0FBVTtBQUFBLGlCQUFPaUUsSUFBSWxGLEVBQUosSUFBVW1GLEtBQUtuRixFQUF0QjtBQUFBLFNBQVYsQ0FBbEI7QUFDQSxZQUFJLENBQUNpRixTQUFMLEVBQWdCO0FBQUUsaUJBQU8sS0FBUDtBQUFlOztBQUVqQyxZQUFJRSxLQUFLeEcsSUFBTCxLQUFjLFFBQWxCLEVBQTRCO0FBQUUsaUJBQU9zRyxVQUFVbEIsS0FBVixLQUFvQm9CLEtBQUtDLFNBQWhDO0FBQTRDOztBQUUxRSxZQUFJRCxLQUFLeEcsSUFBTCxLQUFjLE9BQWxCLEVBQTJCO0FBQUUsaUJBQU8sTUFBSzBHLGFBQUwsQ0FBbUJKLFVBQVVsQixLQUE3QixFQUFvQyxDQUFFb0IsS0FBS0csUUFBUCxFQUFpQkgsS0FBS0ksUUFBdEIsQ0FBcEMsQ0FBUDtBQUE4RTs7QUFFM0csZUFBTyxLQUFQO0FBQ0QsT0FWTSxDQUFQO0FBV0Q7OztrQ0FFYXhCLEssRUFBT3lCLE8sRUFBUztBQUM1QixVQUFJLE9BQU96QixLQUFQLEtBQWlCLFFBQXJCLEVBQStCLE1BQU0sSUFBSTBCLFNBQUosQ0FBYyx5QkFBZCxDQUFOO0FBQy9CLGFBQVExQixTQUFTeUIsUUFBUSxDQUFSLENBQVYsSUFBMEJ6QixTQUFTeUIsUUFBUSxDQUFSLENBQTFDO0FBQ0Q7Ozs4QkFFU1gsSSxFQUFNO0FBQ2QsVUFBSSxPQUFPQSxJQUFQLEtBQWdCLFFBQXBCLEVBQThCLE1BQU0sSUFBSVksU0FBSixDQUFjLDZCQUFkLENBQU47QUFDOUIsYUFBUVosUUFBUSxLQUFLSixPQUFkLElBQTJCSSxRQUFRLEtBQUtILE9BQS9DO0FBQ0Q7Ozs4QkFFU3RCLEssRUFBTztBQUNmLGFBQU9BLE1BQU0vQyxHQUFOLENBQVUsZ0JBQVE7QUFDdkIsZUFBTztBQUNMTCxjQUFJbUYsS0FBS25GLEVBREo7QUFFTHJCLGdCQUFNd0csS0FBS3hHLElBRk47QUFHTDJHLG9CQUFVSCxLQUFLTyxVQUFMLENBQWdCSixRQUhyQjtBQUlMQyxvQkFBVUosS0FBS08sVUFBTCxDQUFnQkgsUUFKckI7QUFLTEgscUJBQVdELEtBQUtPLFVBQUwsQ0FBZ0JOO0FBTHRCLFNBQVA7QUFPRCxPQVJNLENBQVA7QUFTRDs7Ozs7O2tCQUdZWixNOzs7Ozs7Ozs7Ozs7Ozs7SUM3RFRtQixLLEdBQ0osZUFBWTNJLElBQVosRUFBa0I7QUFBQTs7QUFDaEIsT0FBS2dELEVBQUwsR0FBVWhELEtBQUtnRCxFQUFmO0FBQ0EsT0FBS0MsSUFBTCxHQUFZakQsS0FBS2lELElBQWpCO0FBQ0EsT0FBSzJGLFdBQUwsR0FBbUI1SSxLQUFLNEksV0FBeEI7QUFDRCxDOztrQkFHWUQsSzs7Ozs7Ozs7Ozs7Ozs7O0FDUmY7Ozs7QUFDQTs7Ozs7Ozs7OztJQUVNRSxLO0FBQ0osaUJBQVk3SSxJQUFaLEVBQWtCO0FBQUE7O0FBQ2hCLFNBQUtnRCxFQUFMLEdBQVVoRCxLQUFLZ0QsRUFBZjtBQUNBLFNBQUtDLElBQUwsR0FBWWpELEtBQUtpRCxJQUFqQjtBQUNBLFNBQUthLEdBQUwsR0FBVzlELEtBQUs4RCxHQUFoQjtBQUNBLFNBQUtsQyxNQUFMLEdBQWM1QixLQUFLNEIsTUFBbkI7O0FBRUEsUUFBSTVCLEtBQUsrRCxJQUFULEVBQWU7QUFDYixXQUFLQSxJQUFMLEdBQVksSUFBWjtBQUNBLFdBQUtnQixLQUFMLEdBQWEsSUFBYjtBQUNBLFdBQUsrRCxPQUFMLEdBQWUsSUFBZjtBQUNELEtBSkQsTUFJTztBQUNMLFdBQUsvRCxLQUFMLEdBQWEsb0JBQVUvRSxLQUFLK0UsS0FBZixDQUFiO0FBQ0EsV0FBSytELE9BQUwsR0FBZTlJLEtBQUs4SSxPQUFMLENBQWF6RixHQUFiLENBQWlCO0FBQUEsZUFBVSxxQkFBVzBGLE1BQVgsQ0FBVjtBQUFBLE9BQWpCLENBQWY7QUFDQSxXQUFLaEYsSUFBTCxHQUFZLEtBQVo7QUFDRDtBQUNGOzs7O3NDQUVpQjtBQUNoQixVQUFNaUYsUUFBUSxLQUFLQyxpQkFBTCxFQUFkO0FBQ0EsYUFBT0MsS0FBS0MsR0FBTCxnQ0FBWUgsS0FBWixFQUFQO0FBQ0Q7Ozt3Q0FFbUI7QUFDbEIsYUFBTyxLQUFLRixPQUFMLENBQWE3RSxJQUFiLENBQWtCO0FBQUEsZUFBVThFLE9BQU9wQixRQUFQLEtBQW9CLElBQTlCO0FBQUEsT0FBbEIsQ0FBUDtBQUNEOzs7d0NBRW1CO0FBQ2xCLGFBQU8sS0FBS21CLE9BQUwsQ0FBYXpGLEdBQWIsQ0FBaUI7QUFBQSxlQUFVMEYsT0FBT3JCLE9BQVAsSUFBa0IsQ0FBNUI7QUFBQSxPQUFqQixDQUFQO0FBQ0Q7OztnQ0FFVzFILEksRUFBTTZILEksRUFBTTtBQUN0QixVQUFNdUIsZ0JBQWdCLEtBQUtOLE9BQUwsQ0FBYU8sTUFBYixDQUFvQjtBQUFBLGVBQVVOLE9BQU9PLFVBQVAsQ0FBa0J0SixJQUFsQixFQUF3QjZILElBQXhCLENBQVY7QUFBQSxPQUFwQixDQUF0QjtBQUNBLFVBQUl1QixjQUFjOUgsTUFBZCxHQUF1QixDQUEzQixFQUE4QjtBQUM1QixlQUFPOEgsY0FBYyxDQUFkLEVBQWlCN0QsU0FBeEI7QUFDRDtBQUNELGFBQU8sSUFBUDtBQUNEOzs7Ozs7a0JBR1lzRCxLOzs7Ozs7Ozs7Ozs7Ozs7QUMzQ2Y7Ozs7Ozs7O0FBRUEsSUFBTVUsYUFBYSxrQkFBbkI7QUFDQSxJQUFNQyxhQUFhO0FBQ2pCNUosVUFBUSxNQURTO0FBRWpCQyxXQUFTO0FBQ1Asb0JBQWdCO0FBRFQ7QUFGUSxDQUFuQjs7SUFPTTRKLE07QUFDSixrQkFBWXhHLElBQVosRUFBa0JFLEtBQWxCLEVBQXlCO0FBQUE7O0FBQ3ZCLFNBQUt1RyxTQUFMLEdBQWlCekcsSUFBakI7QUFDQSxTQUFLMEcsUUFBTCxHQUFnQnhHLEtBQWhCO0FBQ0EsU0FBS0MsTUFBTCxHQUFjLEVBQWQ7QUFDQSxTQUFLRyxZQUFMLEdBQW9CLElBQXBCO0FBQ0Q7Ozs7OEJBRVNELEssRUFBTztBQUFBLFVBQ1BMLElBRE8sR0FDRUssS0FERixDQUNQTCxJQURPOztBQUVmLFVBQU15RSxVQUFVcEUsTUFBTVMsSUFBTixHQUFhLENBQUMsQ0FBZCxHQUFrQlQsTUFBTW9DLGVBQU4sRUFBbEM7QUFDQSxVQUFNa0UsWUFBWWxDLE9BQWxCO0FBQ0EsVUFBTUMsV0FBVyxJQUFqQjtBQUNBLFVBQU1rQyxnQkFBZ0IsQ0FBdEI7QUFDQSxXQUFLekcsTUFBTCxDQUFZbEMsSUFBWixDQUFpQixFQUFFK0IsVUFBRixFQUFReUUsZ0JBQVIsRUFBaUJDLGtCQUFqQixFQUEyQmtDLDRCQUEzQixFQUEwQ0Qsb0JBQTFDLEVBQWpCO0FBQ0EsV0FBS3JHLFlBQUwsR0FBb0IsS0FBS0gsTUFBTCxDQUFZLEtBQUtBLE1BQUwsQ0FBWTlCLE1BQVosR0FBcUIsQ0FBakMsQ0FBcEI7QUFDRDs7OzRDQUV1QjtBQUN0QixXQUFLaUMsWUFBTCxDQUFrQnNHLGFBQWxCO0FBQ0Q7OztpQ0FFWWhDLEksRUFBTTtBQUNqQixXQUFLdEUsWUFBTCxDQUFrQnFHLFNBQWxCLEdBQThCL0IsSUFBOUI7QUFDQSxXQUFLaUMsV0FBTCxDQUFpQixLQUFqQjtBQUNEOzs7Z0NBRVcvQyxLLEVBQU87QUFDakIsV0FBS3hELFlBQUwsQ0FBa0JvRSxRQUFsQixHQUE2QlosS0FBN0I7QUFDRDs7OzJCQUVNO0FBQ0wsVUFBSSxLQUFLM0QsTUFBTCxDQUFZOUIsTUFBWixHQUFxQixDQUF6QixFQUE0QjtBQUMxQjtBQUNBLGFBQUs4QixNQUFMLEdBQWMsS0FBS0EsTUFBTCxDQUFZMkcsS0FBWixDQUFrQixDQUFsQixFQUFxQixDQUFDLENBQXRCLENBQWQ7QUFDRDtBQUNEUCxpQkFBV3hKLElBQVgsR0FBa0JnSyxLQUFLQyxTQUFMLENBQWU7QUFDL0JQLG1CQUFXLEtBQUtBLFNBRGU7QUFFL0JDLGtCQUFVLEtBQUtBLFFBRmdCO0FBRy9CdkcsZ0JBQVEsS0FBS0E7QUFIa0IsT0FBZixDQUFsQjtBQUtBLGFBQU8sb0JBQUttRyxVQUFMLEVBQWlCQyxVQUFqQixDQUFQO0FBQ0Q7Ozs7OztrQkFHWUMsTTs7Ozs7Ozs7Ozs7OztBQ3ZEZjs7OztBQUNBOzs7Ozs7QUFFQSxJQUFNUyxRQUFRcEksU0FBU2tFLGFBQVQsQ0FBdUIsbUJBQXZCLENBQWQ7QUFDQSxJQUFNbUUsT0FBT3JJLFNBQVNrRSxhQUFULENBQXVCLGtCQUF2QixDQUFiO0FBQ0EsSUFBTW9FLFVBQVV0SSxTQUFTa0UsYUFBVCxDQUF1QixzQkFBdkIsQ0FBaEI7O0FBRUEsSUFBTXFFLFNBQVN2SSxTQUFTa0UsYUFBVCxDQUF1QixjQUF2QixDQUFmO0FBQ0EsSUFBTXNFLGVBQWVELE9BQU9yRSxhQUFQLENBQXFCLHdCQUFyQixDQUFyQjtBQUNBLElBQU11RSxhQUFhRixPQUFPckUsYUFBUCxDQUFxQixtQkFBckIsQ0FBbkI7O0FBRUEsSUFBTXdFLGtCQUFrQjFJLFNBQVNrRSxhQUFULENBQXVCLGNBQXZCLENBQXhCO0FBQ0F3RSxnQkFBZ0JDLFdBQWhCLENBQTRCLGdCQUFNNUksSUFBbEM7O0FBRUEsU0FBU3NFLEdBQVQsT0FBb0M7QUFBQSxNQUFyQmxELElBQXFCLFFBQXJCQSxJQUFxQjtBQUFBLE1BQWZhLEdBQWUsUUFBZkEsR0FBZTtBQUFBLE1BQVZsQyxNQUFVLFFBQVZBLE1BQVU7O0FBQ2xDc0ksUUFBTXRILFdBQU4sR0FBb0JLLElBQXBCO0FBQ0FrSCxPQUFLekgsWUFBTCxDQUFrQixLQUFsQixrQkFBdUNvQixHQUF2QztBQUNBNEcsZ0JBQWM5SSxNQUFkO0FBQ0Q7O0FBRUQsU0FBUzhJLGFBQVQsR0FBb0M7QUFBQSxNQUFiOUksTUFBYSx1RUFBSixFQUFJOztBQUNsQyxNQUFNK0ksT0FBTzdJLFNBQVM4SSxzQkFBVCxFQUFiO0FBQ0FoSixTQUFPSixPQUFQLENBQWU7QUFBQSxXQUFTbUosS0FBS0YsV0FBTCxDQUFpQkksbUJBQW1CQyxNQUFNN0gsSUFBekIsRUFBK0I2SCxNQUFNL0QsS0FBckMsQ0FBakIsQ0FBVDtBQUFBLEdBQWY7O0FBRUFxRCxVQUFRVyxTQUFSLEdBQW9CLEVBQXBCO0FBQ0FYLFVBQVFLLFdBQVIsQ0FBb0JFLElBQXBCO0FBQ0Q7O0FBRUQsU0FBU0Usa0JBQVQsQ0FBNEJHLEdBQTVCLEVBQWlDakUsS0FBakMsRUFBd0M7QUFDdEMsTUFBTWtFLE1BQU0sMkJBQVksS0FBWixFQUFtQixFQUFFOUksV0FBVyxDQUFDLFdBQUQsQ0FBYixFQUFuQixDQUFaOztBQUVBLE1BQU0rSSxVQUFVLDJCQUFZLE1BQVosRUFBb0IsRUFBRXRJLGFBQWFvSSxHQUFmLEVBQXBCLENBQWhCO0FBQ0FDLE1BQUlSLFdBQUosQ0FBZ0JTLE9BQWhCOztBQUVBLE1BQU1DLFlBQVksMkJBQVksTUFBWixFQUFvQixFQUFFdkksYUFBYW1FLEtBQWYsRUFBcEIsQ0FBbEI7QUFDQWtFLE1BQUlSLFdBQUosQ0FBZ0JVLFNBQWhCOztBQUVBLFNBQU9GLEdBQVA7QUFDRDs7QUFHRDtBQUNBLFNBQVM1RCxTQUFULENBQW1CdEMsS0FBbkIsRUFBMEI7QUFDeEJ1RixlQUFhMUgsV0FBYixHQUEyQm1DLE1BQU05QixJQUFqQztBQUNBc0gsYUFBVzNILFdBQVgsR0FBeUJtQyxNQUFNNkQsV0FBL0I7QUFDQXlCLFNBQU9sSSxTQUFQLENBQWlCaEIsTUFBakIsQ0FBd0IsV0FBeEIsRUFBcUMsV0FBckM7QUFDQWlLO0FBQ0Q7QUFDRCxTQUFTN0QsU0FBVCxHQUFxQjtBQUNuQjhDLFNBQU9sSSxTQUFQLENBQWlCQyxHQUFqQixDQUFxQixXQUFyQixFQUFrQyxXQUFsQztBQUNBaUo7QUFDRDs7QUFFRCxTQUFTRCxTQUFULEdBQXFCO0FBQ25CWixrQkFBZ0JySSxTQUFoQixDQUEwQmhCLE1BQTFCLENBQWlDLFdBQWpDO0FBQ0Esa0JBQU1tSyxLQUFOO0FBQ0Q7QUFDRCxTQUFTRCxTQUFULEdBQXFCO0FBQ25CYixrQkFBZ0JySSxTQUFoQixDQUEwQkMsR0FBMUIsQ0FBOEIsV0FBOUI7QUFDQSxrQkFBTW1KLElBQU47QUFDRDs7a0JBRWM7QUFDYnBGLFVBRGE7QUFFYmtCLHNCQUZhO0FBR2JFO0FBSGEsQzs7Ozs7Ozs7Ozs7OztBQzlEZjs7Ozs7O0FBRUEsSUFBTWlFLFlBQVk7QUFDaEJDLFNBQU8sT0FEUztBQUVoQkMsVUFBUTtBQUZRLENBQWxCO0FBSUEsSUFBTUMsU0FBUzdKLFNBQVNrRSxhQUFULENBQXVCLGFBQXZCLENBQWY7O0FBRUEsU0FBU0MsSUFBVCxDQUFjRyxLQUFkLEVBQXFCO0FBQ25CLE1BQU13RixXQUFXOUosU0FBUzhJLHNCQUFULEVBQWpCOztBQUVBeEUsUUFBTTVFLE9BQU4sQ0FBYyxnQkFBUTtBQUNwQjtBQUNBLFFBQU15SixNQUFNLDJCQUFZLEtBQVosRUFBbUIsRUFBRTlJLFdBQVcsQ0FBQyxNQUFELENBQWIsRUFBbkIsQ0FBWjs7QUFFQSxRQUFNMEosUUFBUSwyQkFBWSxPQUFaLEVBQXFCO0FBQ2pDMUosaUJBQVcsQ0FBQyxXQUFELENBRHNCO0FBRWpDRyxhQUFPLEVBQUUsT0FBTzZGLEtBQUtsRixJQUFkLEVBRjBCO0FBR2pDTCxtQkFBYXVGLEtBQUtsRjtBQUhlLEtBQXJCLENBQWQ7QUFLQWdJLFFBQUlSLFdBQUosQ0FBZ0JvQixLQUFoQjs7QUFFQSxRQUFNQyxXQUFXQyxlQUFlNUQsSUFBZixDQUFqQjtBQUNBOEMsUUFBSVIsV0FBSixDQUFnQnFCLFFBQWhCOztBQUVBRixhQUFTbkIsV0FBVCxDQUFxQlEsR0FBckI7QUFDRCxHQWZEOztBQWlCQVUsU0FBT1osU0FBUCxHQUFtQixFQUFuQjtBQUNBWSxTQUFPbEIsV0FBUCxDQUFtQm1CLFFBQW5CO0FBQ0Q7O0FBRUQsU0FBU0csY0FBVCxDQUF3QjVELElBQXhCLEVBQThCO0FBQzVCLFVBQU9BLEtBQUt4RyxJQUFaO0FBQ0UsU0FBSzZKLFVBQVVDLEtBQWY7QUFBd0IsYUFBT08sZ0JBQWdCN0QsSUFBaEIsQ0FBUDtBQUN4QixTQUFLcUQsVUFBVUUsTUFBZjtBQUF3QixhQUFPTyxpQkFBaUI5RCxJQUFqQixDQUFQO0FBQ3hCO0FBQXdCLGFBQU8sb0JBQVA7QUFIMUI7QUFLRDs7QUFFRCxTQUFTNkQsZUFBVCxDQUF5QjdELElBQXpCLEVBQStCO0FBQzdCLE1BQU0rRCxXQUFXLDJCQUFZLEtBQVosRUFBbUIsRUFBRS9KLFdBQVcsQ0FBQyxPQUFELENBQWIsRUFBbkIsQ0FBakI7O0FBRUEsTUFBTWdLLFVBQVUsMkJBQVksTUFBWixFQUFvQixFQUFFdkosYUFBYXVGLEtBQUtpRSxHQUFwQixFQUFwQixDQUFoQjtBQUNBRixXQUFTekIsV0FBVCxDQUFxQjBCLE9BQXJCOztBQUVBLE1BQU1FLFFBQVEsMkJBQVksT0FBWixFQUFxQjtBQUNqQy9KLFdBQU87QUFDTCxpQkFBVzZGLEtBQUtuRixFQURYO0FBRUwsbUJBQWEsT0FGUjtBQUdMLGNBQVFtRixLQUFLbEYsSUFIUjtBQUlMLGNBQVEsT0FKSDtBQUtMLGFBQU9rRixLQUFLaUUsR0FMUDtBQU1MLGFBQU9qRSxLQUFLZ0IsR0FOUDtBQU9MLGVBQVM7QUFQSjtBQUQwQixHQUFyQixDQUFkO0FBV0ErQyxXQUFTekIsV0FBVCxDQUFxQjRCLEtBQXJCOztBQUVBLE1BQU1DLFVBQVUsMkJBQVksTUFBWixFQUFvQixFQUFFMUosYUFBYXVGLEtBQUtnQixHQUFwQixFQUFwQixDQUFoQjtBQUNBK0MsV0FBU3pCLFdBQVQsQ0FBcUI2QixPQUFyQjs7QUFFQSxNQUFNQyxhQUFhLDJCQUFZLEtBQVosRUFBbUIsRUFBRXBLLFdBQVcsQ0FBQyxxQkFBRCxDQUFiLEVBQW5CLENBQW5CO0FBQ0EsTUFBTXFLLGNBQWMsMkJBQVksTUFBWixFQUFvQixFQUFFNUosYUFBYXlKLE1BQU10RixLQUFyQixFQUFwQixDQUFwQjtBQUNBd0YsYUFBVzlCLFdBQVgsQ0FBdUIrQixXQUF2Qjs7QUFFQUgsUUFBTUksZ0JBQU4sQ0FBdUIsT0FBdkIsRUFBZ0MsVUFBQ0MsR0FBRCxFQUFTO0FBQ3ZDRixnQkFBWTVKLFdBQVosR0FBMEI4SixJQUFJQyxNQUFKLENBQVc1RixLQUFyQztBQUNELEdBRkQ7O0FBSUEsTUFBTTZFLFdBQVc5SixTQUFTOEksc0JBQVQsRUFBakI7QUFDQWdCLFdBQVNuQixXQUFULENBQXFCeUIsUUFBckI7QUFDQU4sV0FBU25CLFdBQVQsQ0FBcUI4QixVQUFyQjs7QUFFQSxTQUFPWCxRQUFQO0FBQ0Q7O0FBRUQsU0FBU0ssZ0JBQVQsQ0FBMEI5RCxJQUExQixFQUFnQztBQUM5QixNQUFNMEQsUUFBUSwyQkFBWSxPQUFaLEVBQXFCLEVBQUUxSixXQUFXLENBQUMsUUFBRCxDQUFiLEVBQXJCLENBQWQ7O0FBRUEsTUFBTWtLLFFBQVEsMkJBQVksT0FBWixFQUFxQjtBQUNqQy9KLFdBQU87QUFDTCxpQkFBVzZGLEtBQUtuRixFQURYO0FBRUwsbUJBQWEsUUFGUjtBQUdMLGNBQVE7QUFISDtBQUQwQixHQUFyQixDQUFkO0FBT0E2SSxRQUFNcEIsV0FBTixDQUFrQjRCLEtBQWxCOztBQUVBLE1BQU1wQixNQUFNLDJCQUFZLEtBQVosRUFBbUIsRUFBRTlJLFdBQVcsQ0FBQyxRQUFELENBQWIsRUFBbkIsQ0FBWjtBQUNBMEosUUFBTXBCLFdBQU4sQ0FBa0JRLEdBQWxCOztBQUVBLFNBQU9ZLEtBQVA7QUFDRDs7QUFFRCxTQUFTM0UsWUFBVCxHQUF3QjtBQUN0QixNQUFNMEYsWUFBWSxFQUFsQjtBQUNBLE1BQU1DLFNBQVNsQixPQUFPbUIsZ0JBQVAsQ0FBd0IsZ0JBQXhCLENBQWY7QUFDQUQsU0FBT3JMLE9BQVAsQ0FBZSxpQkFBUztBQUFBLHlCQUNENkssTUFBTVUsT0FETDtBQUFBLFFBQ2QvSixFQURjLGtCQUNkQSxFQURjO0FBQUEsUUFDVnJCLElBRFUsa0JBQ1ZBLElBRFU7O0FBRXRCLFFBQUlvRixjQUFKO0FBQ0EsWUFBT3BGLElBQVA7QUFDRSxXQUFLNkosVUFBVUMsS0FBZjtBQUFzQjFFLGdCQUFRaUcsU0FBU1gsTUFBTXRGLEtBQWYsQ0FBUixDQUErQjtBQUNyRCxXQUFLeUUsVUFBVUUsTUFBZjtBQUF1QjNFLGdCQUFRc0YsTUFBTVksT0FBZCxDQUF1QjtBQUM5QztBQUFTLGNBQU0sSUFBSUMsS0FBSixrSkFBMkNsSyxFQUEzQyxDQUFOO0FBSFg7QUFLQTRKLGNBQVUxTCxJQUFWLENBQWUsRUFBRThCLE1BQUYsRUFBTStELFlBQU4sRUFBZjtBQUNELEdBVEQ7QUFVQSxTQUFPNkYsU0FBUDtBQUNEOztrQkFFYztBQUNiM0csWUFEYTtBQUViaUI7QUFGYSxDOzs7Ozs7Ozs7Ozs7OztBQy9HZjs7Ozs7O0FBRUEsU0FBU2lHLFdBQVQsQ0FBcUJDLEVBQXJCLEVBQXlCO0FBQ3ZCLE1BQU1DLFVBQVVuRSxLQUFLb0UsS0FBTCxDQUFXRixLQUFLLElBQWhCLENBQWhCO0FBQ0EsTUFBTUcsT0FBT3JFLEtBQUtzRSxLQUFMLENBQVdILFVBQVUsRUFBckIsQ0FBYjtBQUNBLE1BQU1JLGNBQWNKLFVBQVdFLE9BQU8sRUFBdEM7O0FBRUEsU0FBVUEsSUFBVixVQUFrQkUsZUFBZSxFQUFmLEdBQW9CLEVBQXBCLEdBQXlCLEdBQTNDLElBQWlEQSxXQUFqRDtBQUNEOztBQUVELElBQU1DLFFBQVE7QUFDWkMsYUFBVyxJQURDO0FBRVpDLFlBQVUsSUFGRTtBQUdaL0wsUUFBTSwyQkFBWSxNQUFaLEVBQW9CLEVBQUVNLFdBQVcsQ0FBQyxPQUFELENBQWIsRUFBd0JTLGFBQWEsTUFBckMsRUFBcEIsQ0FITTtBQUlaMEksU0FBTyxpQkFBVztBQUFBOztBQUNoQixTQUFLcUMsU0FBTCxHQUFpQjFJLEtBQUtDLEdBQUwsRUFBakI7QUFDQSxTQUFLMEksUUFBTCxHQUFnQkMsWUFBWSxZQUFNO0FBQ2hDLFVBQU1DLFVBQVU3SSxLQUFLQyxHQUFMLEtBQWEsTUFBS3lJLFNBQWxDO0FBQ0EsWUFBSzlMLElBQUwsQ0FBVWUsV0FBVixHQUF3QnVLLFlBQVlXLE9BQVosQ0FBeEI7QUFDRCxLQUhlLEVBR2IsSUFIYSxDQUFoQjtBQUlELEdBVlc7QUFXWnZDLFFBQU0sZ0JBQVc7QUFDZixRQUFJLENBQUMsS0FBS29DLFNBQVYsRUFBcUI7QUFBRTtBQUFTO0FBQ2hDLFNBQUtBLFNBQUwsR0FBaUIsSUFBakI7QUFDQUksa0JBQWMsS0FBS0gsUUFBbkI7QUFDQSxTQUFLL0wsSUFBTCxDQUFVZSxXQUFWLEdBQXdCLE1BQXhCO0FBQ0Q7QUFoQlcsQ0FBZDs7a0JBbUJlOEssSzs7Ozs7Ozs7Ozs7Ozs7O0FDN0JmOztBQUVBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7Ozs7QUFFQTs7O0FBR0EsU0FBU00sU0FBVCxDQUFtQmhMLEVBQW5CLEVBQXVCO0FBQ3JCLFNBQU8saUNBQWdCQSxFQUFoQixFQUFzQnNCLElBQXRCLENBQTJCO0FBQUEsV0FBWTBGLEtBQUtpRSxLQUFMLENBQVd2SixRQUFYLENBQVo7QUFBQSxHQUEzQixDQUFQO0FBQ0Q7O0FBRUQ7OztBQUdBLElBQU13SixVQUFVcE0sU0FBU2tFLGFBQVQsQ0FBdUIsZUFBdkIsQ0FBaEI7QUFDQSxJQUFNbUksY0FBY3JNLFNBQVNrRSxhQUFULENBQXVCLGlCQUF2QixDQUFwQjs7QUFFQSxJQUFJRSxRQUFRLElBQVo7O0FBRUFpSSxZQUFZMUIsZ0JBQVosQ0FBNkIsT0FBN0IsRUFBc0MsWUFBTTtBQUMxQyxNQUFLdkcsS0FBTCxFQUFhO0FBQUVBLFVBQU1xRixJQUFOO0FBQWU7QUFDOUIsTUFBTTZDLFVBQVVGLFFBQVFuSCxLQUF4QjtBQUNBaUgsWUFBVUksT0FBVixFQUNHOUosSUFESCxDQUNRLG9CQUFZO0FBQ2hCNEIsWUFBUSxvQkFBVXhCLFFBQVYsQ0FBUjtBQUNBLG9CQUFNdUIsSUFBTixDQUFXQyxLQUFYLEVBQWtCeEIsUUFBbEIsRUFDRzRCLFdBREgsR0FFR0ssYUFGSCxDQUVpQjBILFlBRmpCLEVBR0d2SCxjQUhILENBR2tCd0gsV0FIbEIsRUFHK0JDLFVBSC9CO0FBSUQsR0FQSCxFQVFHOUosS0FSSCxDQVFTLGVBQU87QUFBRUUsWUFBUTZKLEtBQVIsQ0FBY0MsR0FBZDtBQUFvQixHQVJ0QztBQVNELENBWkQ7QUFhQTtBQUNBLElBQU1KLGVBQWV2TSxTQUFTa0UsYUFBVCxDQUF1QixZQUF2QixDQUFyQjtBQUNBcUksYUFBYTVCLGdCQUFiLENBQThCLE9BQTlCLEVBQXVDLFlBQU07QUFDM0N2RyxRQUFNb0YsS0FBTjtBQUNBLGtCQUFNeEUsY0FBTixDQUFxQnVILFlBQXJCO0FBQ0Esa0JBQU0xSCxhQUFOLENBQW9CMkgsV0FBcEIsRUFBaUNDLFVBQWpDO0FBQ0QsQ0FKRDs7QUFNQSxJQUFNRCxjQUFjeE0sU0FBU2tFLGFBQVQsQ0FBdUIsV0FBdkIsQ0FBcEI7QUFDQXNJLFlBQVk3QixnQkFBWixDQUE2QixPQUE3QixFQUFzQyxZQUFNO0FBQzFDLG1CQUFPckwsT0FBUCxDQUFlLFlBQWY7QUFDQSxrQkFBTXVGLGFBQU4sQ0FBb0IwSCxZQUFwQjtBQUNBLGtCQUFNdkgsY0FBTixDQUFxQndILFdBQXJCLEVBQWtDQyxVQUFsQztBQUNELENBSkQ7O0FBTUEsSUFBTUEsYUFBYXpNLFNBQVNrRSxhQUFULENBQXVCLFVBQXZCLENBQW5CO0FBQ0F1SSxXQUFXOUIsZ0JBQVgsQ0FBNEIsT0FBNUIsRUFBcUMsWUFBTTtBQUN6QyxNQUFNRyxZQUFZLGdCQUFNMUYsWUFBTixFQUFsQjtBQUNBLG1CQUFPOUYsT0FBUCxDQUFlLFlBQWYsRUFBNkJ3TCxTQUE3QjtBQUNELENBSEQ7O0FBS0E7OztBQUdBLGlCQUFPL0wsU0FBUCxDQUFpQixXQUFqQixFQUE4QixpQkFBUztBQUNyQyxrQkFBTTBHLFNBQU47QUFDQSxrQkFBTUosUUFBTixDQUFlN0QsS0FBZjtBQUNELENBSEQ7QUFJQSxpQkFBT3pDLFNBQVAsQ0FBaUIsT0FBakIsRUFBMEI7QUFBQSxTQUFTLGdCQUFNd0csU0FBTixDQUFnQnRDLEtBQWhCLENBQVQ7QUFBQSxDQUExQjs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxxRCIsImZpbGUiOiJsZWFybmluZy5idW5kbGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSlcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcblxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gaWRlbnRpdHkgZnVuY3Rpb24gZm9yIGNhbGxpbmcgaGFybW9ueSBpbXBvcnRzIHdpdGggdGhlIGNvcnJlY3QgY29udGV4dFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5pID0gZnVuY3Rpb24odmFsdWUpIHsgcmV0dXJuIHZhbHVlOyB9O1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHtcbiBcdFx0XHRcdGNvbmZpZ3VyYWJsZTogZmFsc2UsXG4gXHRcdFx0XHRlbnVtZXJhYmxlOiB0cnVlLFxuIFx0XHRcdFx0Z2V0OiBnZXR0ZXJcbiBcdFx0XHR9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSAzMyk7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gd2VicGFjay9ib290c3RyYXAgNzY5YWQ5NTA1NjAyYzY3MDU1MWMiLCJmdW5jdGlvbiBhamF4KHBhdGggPSAnJywgb3B0aW9ucyA9IHt9LCBmdWxsUmVzcG9uc2UgPSBmYWxzZSkge1xyXG4gIGNvbnN0IHhociA9IG5ldyBYTUxIdHRwUmVxdWVzdCgpO1xyXG4gIHhoci5vcGVuKG9wdGlvbnMubWV0aG9kIHx8ICdHRVQnLCBwYXRoLCB0cnVlKTtcclxuICBpZiAob3B0aW9ucy5oZWFkZXJzKSB7IHNldFhIUkhlYWRlcnMoeGhyLCBvcHRpb25zLmhlYWRlcnMpOyB9XHJcbiAgeGhyLnNlbmQob3B0aW9ucy5kYXRhKTtcclxuXHJcbiAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcclxuICAgIHhoci5vbnJlYWR5c3RhdGVjaGFuZ2UgPSBmdW5jdGlvbigpIHtcclxuICAgICAgaWYoeGhyLnJlYWR5U3RhdGUgPT0gNCkge1xyXG4gICAgICAgIGlmKHhoci5zdGF0dXMgPT0gMjAwKSB7XHJcbiAgICAgICAgICBpZiAoZnVsbFJlc3BvbnNlKSB7XHJcbiAgICAgICAgICAgIHJlc29sdmUoeGhyKTtcclxuICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHJlc29sdmUoeGhyLnJlc3BvbnNlVGV4dCk7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIHJlamVjdCh4aHIuc3RhdHVzVGV4dCk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfSlcclxufVxyXG5cclxuZnVuY3Rpb24gc2V0WEhSSGVhZGVycyh4aHIsIGhlYWRlcnMpIHtcclxuICBmb3IgKGxldCBoZWFkZXIgaW4gaGVhZGVycykge1xyXG4gICAgeGhyLnNldFJlcXVlc3RIZWFkZXIoaGVhZGVyLCBoZWFkZXJzW2hlYWRlcl0pO1xyXG4gIH1cclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgYWpheDtcclxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vdXRpbHMvYWpheC5qcyIsImNvbnN0IHB1YnN1YiA9IChmdW5jdGlvbigpIHtcclxuXHJcbiAgY29uc3QgdG9waWNzID0ge307XHJcblxyXG4gIHJldHVybiB7XHJcbiAgICBzdWJzY3JpYmU6IGZ1bmN0aW9uKHRvcGljLCBsaXN0ZW5lcikge1xyXG4gICAgICBpZiAoIXRvcGljc1t0b3BpY10pIHRvcGljc1t0b3BpY10gPSB7IHF1ZXVlOiBbXSB9O1xyXG5cclxuICAgICAgY29uc3QgaW5kZXggPSB0b3BpY3NbdG9waWNdLnF1ZXVlLnB1c2gobGlzdGVuZXIpIC0gMTtcclxuICAgICAgLy8gZnVuY3Rpb24gdG8gZGVsZXRlIHRvcGljXHJcbiAgICAgIHJldHVybiB7XHJcbiAgICAgICAgcmVtb3ZlOiBmdW5jdGlvbigpIHtcclxuICAgICAgICAgIGRlbGV0ZSB0b3BpY3NbdG9waWNdLnF1ZXVlW2luZGV4XTtcclxuICAgICAgICB9XHJcbiAgICAgIH07XHJcbiAgICB9LFxyXG5cclxuICAgIHB1Ymxpc2g6IGZ1bmN0aW9uKHRvcGljLCBpbmZvKSB7XHJcbiAgICAgIC8vIG5vIHRoZW1lIG9yIG5vIGxpc3RlbmVyc1xyXG4gICAgICBpZiAoIXRvcGljc1t0b3BpY10gfHwgIXRvcGljc1t0b3BpY10ucXVldWUubGVuZ3RoKSByZXR1cm47XHJcblxyXG4gICAgICBjb25zdCBpdGVtcyA9IHRvcGljc1t0b3BpY10ucXVldWU7XHJcbiAgICAgIGl0ZW1zLmZvckVhY2goaXRlbSA9PiB7XHJcbiAgICAgICAgaXRlbShpbmZvIHx8IHt9KTtcclxuICAgICAgfSk7XHJcbiAgICB9XHJcbiAgfTtcclxufSkoKTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IHB1YnN1YjtcclxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vdXRpbHMvcHVic3ViLmpzIiwiY29uc3Qgbm9kZUZhY3RvcnkgPSBmdW5jdGlvbih0eXBlID0gJ2RpdicsIHBhcmFtcyA9IHt9KSB7XHJcbiAgY29uc3Qgbm9kZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQodHlwZSk7XHJcblxyXG4gIGFwcGVuZENsYXNzZXMobm9kZSwgcGFyYW1zKTtcclxuICBhcHBlbmRBdHRycyhub2RlLCBwYXJhbXMpO1xyXG4gIGluc2VydFRleHRDb250ZW50KG5vZGUsIHBhcmFtcyk7XHJcblxyXG4gIHJldHVybiBub2RlO1xyXG59XHJcblxyXG5mdW5jdGlvbiBhcHBlbmRDbGFzc2VzKG5vZGUsIHsgY2xhc3NMaXN0IH0pIHtcclxuICBpZiAoY2xhc3NMaXN0ICYmIGNsYXNzTGlzdC5mb3JFYWNoKSB7XHJcbiAgICBjbGFzc0xpc3QuZm9yRWFjaChjbGFzc05hbWUgPT4gbm9kZS5jbGFzc0xpc3QuYWRkKGNsYXNzTmFtZSkpO1xyXG4gIH1cclxufVxyXG5cclxuZnVuY3Rpb24gYXBwZW5kQXR0cnMobm9kZSwgeyBhdHRycyB9KSB7XHJcbiAgaWYgKGF0dHJzKSB7XHJcbiAgICBjb25zdCBhdHRyTmFtZXMgPSBPYmplY3Qua2V5cyhhdHRycyk7XHJcbiAgICBhdHRyTmFtZXMuZm9yRWFjaChhdHRyTmFtZSA9PiBub2RlLnNldEF0dHJpYnV0ZShhdHRyTmFtZSwgYXR0cnNbYXR0ck5hbWVdKSk7XHJcbiAgfVxyXG59XHJcblxyXG5mdW5jdGlvbiBpbnNlcnRUZXh0Q29udGVudChub2RlLCB7IHRleHRDb250ZW50ID0gXCJcIiB9KSB7XHJcbiAgbm9kZS50ZXh0Q29udGVudCA9IHRleHRDb250ZW50O1xyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBub2RlRmFjdG9yeTtcclxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vdXRpbHMvbm9kZUZhY3RvcnkuanMiLCJpbXBvcnQgU3RhdGUgZnJvbSAnLi9tb2RlbF9jb21wb25lbnRzL3N0YXRlJztcclxuaW1wb3J0IHB1YnN1YiBmcm9tICcuLi91dGlscy9wdWJzdWInO1xyXG5pbXBvcnQgUmVwb3J0IGZyb20gJy4vcmVwb3J0JztcclxuXHJcbmNvbnN0IElOSVRJQUxfU1RBVEVfTkFNRSA9ICfQodC+0YHRgtC+0Y/QvdC40LUg0LzQvtC00LXQu9C4JztcclxuY29uc3QgU1RPUF9TVEFURV9OQU1FID0gJ9Ce0LHRg9GH0LXQvdC40LUg0L7RgdGC0LDQvdC+0LLQu9C10L3Qvic7XHJcblxyXG5jbGFzcyBNb2RlbCB7XHJcbiAgY29uc3RydWN0b3IoZGF0YSkge1xyXG4gICAgdGhpcy5pZCA9IGRhdGEuaWQ7XHJcbiAgICB0aGlzLm5hbWUgPSBkYXRhLm5hbWU7XHJcbiAgICB0aGlzLmJyZWFrVGltZSA9IGRhdGEuYnJlYWtUaW1lO1xyXG4gICAgdGhpcy5zdGVwcyA9IGRhdGEuc3RlcHM7XHJcblxyXG4gICAgdGhpcy5zdGF0ZXMgPSBkYXRhLnN0YXRlcy5tYXAoc3RhdGUgPT4gbmV3IFN0YXRlKHN0YXRlKSk7XHJcbiAgICB0aGlzLmN1cnJlbnRTdGF0ZSA9IHRoaXMuZ2V0U3RhdGUoZGF0YS5pbml0aWFsU3RhdGUpO1xyXG5cclxuICAgIHRoaXMudGltZW91dCA9IG51bGw7XHJcbiAgICB0aGlzLnN1YklucHV0ID0gbnVsbDtcclxuICAgIHRoaXMuc3ViU3RvcCA9IG51bGw7XHJcbiAgICB0aGlzLnN0YXJ0U3RhdGUgPSBuZXcgU3RhdGUoeyBpZDogMCwgbmFtZTogSU5JVElBTF9TVEFURV9OQU1FLCBpbWc6ICdzdGFydC5wbmcnLCBsYXN0OiB0cnVlIH0pO1xyXG4gICAgdGhpcy5zdG9wU3RhdGUgPSBuZXcgU3RhdGUoeyBpZDogLTEsIG5hbWU6IFNUT1BfU1RBVEVfTkFNRSwgaW1nOiAnc3RvcC5wbmcnLCBsYXN0OiB0cnVlIH0pO1xyXG4gIH1cclxuXHJcbiAgZ2V0U3RhdGUoaWQpIHtcclxuICAgIHJldHVybiB0aGlzLnN0YXRlcy5maW5kKHN0YXRlID0+IHN0YXRlLmlkID09IGlkKTtcclxuICB9XHJcblxyXG4gIHN0YXJ0KCkge1xyXG4gICAgdGhpcy5yZXBvcnQgPSBuZXcgUmVwb3J0KHRoaXMubmFtZSwgdGhpcy5zdGVwcyk7XHJcbiAgICB0aGlzLmhhbmRsZU5ld1N0YXRlKHRoaXMuY3VycmVudFN0YXRlKTsgLy8gc2V0IGluaXRpYWwgc3RhdGVcclxuICAgIGxldCBpbnRlcnZhbHMgPSBQcm9taXNlLnJlc29sdmUoKTsgLy8gaW5pdCBwcm9taXNlIGNoYWluXHJcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMuc3RlcHM7IGkrKykge1xyXG4gICAgICBpbnRlcnZhbHMgPSBpbnRlcnZhbHNcclxuICAgICAgIC50aGVuKCgpID0+IHsgcmV0dXJuIHRoaXMubWFrZUJyZWFrKCkgfSlcclxuICAgICAgIC50aGVuKCgpID0+IHsgcmV0dXJuIHRoaXMuaGFuZGxlRXZlbnQoKSB9KVxyXG4gICAgICAgLnRoZW4oc3RhdGUgPT4geyB0aGlzLmhhbmRsZU5ld1N0YXRlKHN0YXRlKSB9KVxyXG4gICAgfVxyXG4gICAgaW50ZXJ2YWxzXHJcbiAgICAgIC5jYXRjaChzdGF0ZSA9PiB0aGlzLmhhbmRsZU5ld1N0YXRlKHN0YXRlKSlcclxuICAgICAgLnRoZW4oKCkgPT4ge1xyXG4gICAgICAgIGlmICh0aGlzLmN1cnJlbnRTdGF0ZS5uYW1lICE9PSBTVE9QX1NUQVRFX05BTUUpIHtcclxuICAgICAgICAgIHRoaXMucmVwb3J0LnNlbmQoKVxyXG4gICAgICAgICAgLnRoZW4oKHJlc3BvbnNlKSA9PiBjb25zb2xlLmxvZyhyZXNwb25zZSkpO1xyXG4gICAgICAgIH1cclxuICAgICAgfSk7XHJcbiAgICByZXR1cm4gaW50ZXJ2YWxzO1xyXG4gIH1cclxuXHJcbiAgbWFrZUJyZWFrKCkge1xyXG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcclxuICAgICAgdGhpcy5zdWJTdG9wID0gcHVic3ViLnN1YnNjcmliZSgnbW9kZWxfc3RvcCcsICgpID0+IHsgcmVqZWN0KHRoaXMuc3RvcFN0YXRlKTsgfSlcclxuICAgICAgc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgdGhpcy5jbGVhclN1YnMoKTtcclxuICAgICAgICByZXNvbHZlKClcclxuICAgICAgfSwgdGhpcy5icmVha1RpbWUpO1xyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICBoYW5kbGVFdmVudCgpIHtcclxuICAgIGNvbnN0IGV2ZW50ID0gdGhpcy5jdXJyZW50U3RhdGUuZXZlbnQ7XHJcbiAgICBjb25zdCBldmVudFN0YXJ0VGltZSA9IERhdGUubm93KCk7XHJcbiAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xyXG4gICAgICAvLyBzZW5kIGRhdGEgYWJvdXQgbmV3IGV2ZW50IHRvIG90aGVyIG1vZHVsZXNcclxuICAgICAgcHVic3ViLnB1Ymxpc2goJ2V2ZW50JywgZXZlbnQpO1xyXG5cclxuICAgICAgLy8gbGlzdGVuIHRvIHVzZXIgYWN0aW9uXHJcbiAgICAgIC8vIGFuZCBpZiB1c2VyIGlucHV0IGNvcnJlY3QgZ28gdG8gbmV4dCBzdGF0ZVxyXG4gICAgICB0aGlzLnN1YklucHV0ID0gcHVic3ViLnN1YnNjcmliZSgndXNlcl9pbnB1dCcsIGRhdGEgPT4ge1xyXG4gICAgICAgIHRoaXMucmVwb3J0LmluY3JlYXNlQWN0aW9uc051bWJlcigpO1xyXG4gICAgICAgIGNvbnN0IHRpbWVTcGVudCA9IERhdGUubm93KCkgLSBldmVudFN0YXJ0VGltZTtcclxuICAgICAgICBjb25zdCBuZXh0U3RhdGVJZCA9IHRoaXMuY3VycmVudFN0YXRlLmhhbmRsZUlucHV0KGRhdGEsIHRpbWVTcGVudCk7XHJcbiAgICAgICAgY29uc3QgbmV4dFN0YXRlID0gdGhpcy5nZXRTdGF0ZShuZXh0U3RhdGVJZCk7XHJcbiAgICAgICAgaWYgKCBuZXh0U3RhdGUgKSB7XHJcbiAgICAgICAgICB0aGlzLnJlcG9ydC5zZXRTcGVudFRpbWUodGltZVNwZW50KTtcclxuICAgICAgICAgIG5leHRTdGF0ZS5sYXN0ID8gcmVqZWN0KG5leHRTdGF0ZSkgOiByZXNvbHZlKG5leHRTdGF0ZSk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9KTtcclxuXHJcbiAgICAgIC8vIGhhbmRsZSB1c2VyIHN0b3AgYnV0dG9uIGNsaWNrXHJcbiAgICAgIHRoaXMuc3ViU3RvcCA9IHB1YnN1Yi5zdWJzY3JpYmUoJ21vZGVsX3N0b3AnLCAoKSA9PiB7XHJcbiAgICAgICAgcmVqZWN0KHRoaXMuc3RvcFN0YXRlKTtcclxuICAgICAgfSk7XHJcblxyXG4gICAgICAvLyBoYW5kbGUgaW5hY3RpdmVcclxuICAgICAgY29uc3QgaW5hY3RpdmVUaW1lID0gdGhpcy5jdXJyZW50U3RhdGUuZ2V0SW5hY3RpdmVUaW1lKCk7XHJcbiAgICAgIHRoaXMudGltZW91dCA9IHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgIGNvbnN0IG5leHRTdGF0ZUlkID0gdGhpcy5jdXJyZW50U3RhdGUuZ2V0SW5hY3RpdmVBY3Rpb24oKS5uZXh0U3RhdGU7XHJcbiAgICAgICAgY29uc3QgbmV4dFN0YXRlID0gdGhpcy5nZXRTdGF0ZShuZXh0U3RhdGVJZCk7XHJcbiAgICAgICAgbmV4dFN0YXRlLmxhc3QgPyByZWplY3QobmV4dFN0YXRlKSA6IHJlc29sdmUobmV4dFN0YXRlKTtcclxuICAgICAgfSwgaW5hY3RpdmVUaW1lKTtcclxuICAgIH0pXHJcbiAgfVxyXG5cclxuICBoYW5kbGVOZXdTdGF0ZShzdGF0ZSkge1xyXG4gICAgdGhpcy5yZXBvcnQucHVzaFN0YXRlKHN0YXRlKTtcclxuICAgIHRoaXMuY3VycmVudFN0YXRlID0gc3RhdGU7XHJcbiAgICBjbGVhclRpbWVvdXQodGhpcy50aW1lb3V0KTtcclxuICAgIHRoaXMuY2xlYXJTdWJzKCk7XHJcbiAgICBwdWJzdWIucHVibGlzaCgnbmV3X3N0YXRlJywgc3RhdGUpO1xyXG4gIH1cclxuXHJcbiAgY2xlYXJTdWJzKCkge1xyXG4gICAgaWYgKHRoaXMuc3ViSW5wdXQpIHtcclxuICAgICAgdGhpcy5zdWJJbnB1dC5yZW1vdmUoKTtcclxuICAgIH1cclxuICAgIGlmICh0aGlzLnN1YlN0b3ApIHtcclxuICAgICAgdGhpcy5zdWJTdG9wLnJlbW92ZSgpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IE1vZGVsO1xyXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9sZWFybmluZy9tb2RlbC5qcyIsImltcG9ydCBzdGF0ZSBmcm9tICcuL3NjZW5lX2NvbXBvbmVudHMvc3RhdGUnO1xyXG5pbXBvcnQgdG9vbHMgZnJvbSAnLi9zY2VuZV9jb21wb25lbnRzL3Rvb2xzJztcclxuXHJcbmNvbnN0IGV4cG9ydHMgPSB7fTtcclxuXHJcbi8vIFNjZW5lIG1ldGFkYXRhXHJcbmNvbnN0ICRtb2RlbE5hbWUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcubW9kZWwtbmFtZScpO1xyXG5leHBvcnRzLmluaXQgPSBmdW5jdGlvbihtb2RlbCwgcmVzcG9uc2UpIHtcclxuICAkbW9kZWxOYW1lLnRleHRDb250ZW50ID0gbW9kZWwubmFtZTtcclxuICBzdGF0ZS5zZXQobW9kZWwuc3RhcnRTdGF0ZSk7XHJcbiAgdG9vbHMuaW5pdChyZXNwb25zZS50b29scyk7XHJcbiAgcmV0dXJuIHRoaXM7XHJcbn1cclxuXHJcbi8vIE1hbmFnZSBjb250ZW50IHZpc2liaWxpdHlcclxuY29uc3QgJGNvbnRlbnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuY29udGVudCcpO1xyXG5leHBvcnRzLnNob3dDb250ZW50ID0gZnVuY3Rpb24oKSB7XHJcbiAgc2V0Q29udGVudERpc3BsYXkoJ2ZsZXgnKTtcclxuICByZXR1cm4gdGhpcztcclxufVxyXG5leHBvcnRzLmhpZGVDb250ZW50ID0gZnVuY3Rpb24oKSB7XHJcbiAgc2V0Q29udGVudERpc3BsYXkoJ25vbmUnKTtcclxuICByZXR1cm4gdGhpcztcclxufVxyXG5mdW5jdGlvbiBzZXRDb250ZW50RGlzcGxheShkaXNwbGF5KSB7XHJcbiAgJGNvbnRlbnQuc3R5bGUuZGlzcGxheSA9IGRpc3BsYXk7XHJcbn1cclxuXHJcbi8vIE1hbmFnZSBidXR0b25zIHN0YXRlXHJcbmV4cG9ydHMuZW5hYmxlQnV0dG9ucyA9IGZ1bmN0aW9uKC4uLmJ1dHRvbnMpIHtcclxuICBzZXRCdXR0b25zU3RhdGUoYnV0dG9ucywgZmFsc2UpO1xyXG4gIHJldHVybiB0aGlzO1xyXG59XHJcbmV4cG9ydHMuZGlzYWJsZUJ1dHRvbnMgPSBmdW5jdGlvbiguLi5idXR0b25zKSB7XHJcbiAgc2V0QnV0dG9uc1N0YXRlKGJ1dHRvbnMsIHRydWUpO1xyXG4gIHJldHVybiB0aGlzO1xyXG59XHJcbmZ1bmN0aW9uIHNldEJ1dHRvbnNTdGF0ZShidXR0b25zLCB2YWx1ZSkge1xyXG4gIGJ1dHRvbnMuZm9yRWFjaChidXR0b24gPT4gYnV0dG9uLmRpc2FibGVkID0gdmFsdWUpO1xyXG59XHJcblxyXG4vLyBEZWxlZ2F0ZSBwdWJsaWMgbWV0aG9kcyB0byBjb21wb25lbnRzXHJcbmV4cG9ydHMuZ2V0VG9vbHNEYXRhID0gKCkgPT5cclxuICB0b29scy5nZXRUb29sc0RhdGEoKTtcclxuXHJcbmV4cG9ydHMuc2V0U3RhdGUgPSBzdGF0ZURhdGEgPT5cclxuICBzdGF0ZS5zZXQoc3RhdGVEYXRhKTtcclxuXHJcbmV4cG9ydHMuc2hvd0V2ZW50ID0gZXZlbnREYXRhID0+XHJcbiAgc3RhdGUuc2hvd0V2ZW50KGV2ZW50RGF0YSk7XHJcblxyXG5leHBvcnRzLmhpZGVFdmVudCA9ICgpID0+XHJcbiAgc3RhdGUuaGlkZUV2ZW50KCk7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBleHBvcnRzO1xyXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9sZWFybmluZy9zY2VuZS5qcyIsIi8vIHJlbW92ZWQgYnkgZXh0cmFjdC10ZXh0LXdlYnBhY2stcGx1Z2luXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi4vc2Fzcy9sZWFybmluZy5zY3NzXG4vLyBtb2R1bGUgaWQgPSAxMFxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJjbGFzcyBBY3Rpb24ge1xyXG4gIGNvbnN0cnVjdG9yKGRhdGEpIHtcclxuICAgIHRoaXMubWluVGltZSA9IGRhdGEubWluVGltZTtcclxuICAgIHRoaXMubWF4VGltZSA9IGRhdGEubWF4VGltZTtcclxuICAgIHRoaXMubmV4dFN0YXRlID0gZGF0YS5uZXh0U3RhdGU7XHJcbiAgICBpZiAoZGF0YS5pbmFjdGl2ZSkge1xyXG4gICAgICB0aGlzLmluYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgdGhpcy50b29scyA9IFtdO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdGhpcy5pbmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICB0aGlzLnRvb2xzID0gdGhpcy5pbml0VG9vbHMoZGF0YS50b29scyk7XHJcbiAgICB9XHJcblxyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogQHBhcmFtIFt7IGlkOiBOdW1iZXIsIHZhbHVlOiBOdW1iZXIvQm9vbGVhbiB9LCB7Li4ufV1cclxuICAgKiBAcGFyYW0gTnVtYmVyXHJcbiAgICogQHJldHVybiBCb29sZWFuXHJcbiAgICovXHJcbiAgaXNTdWl0YWJsZShkYXRhLCB0aW1lKSB7XHJcbiAgICByZXR1cm4gdGhpcy5yaWdodFRpbWUodGltZSkgJiYgdGhpcy5yaWdodERhdGEoZGF0YSk7XHJcbiAgfVxyXG5cclxuICByaWdodERhdGEoZGF0YSA9IFtdKSB7XHJcbiAgICByZXR1cm4gdGhpcy50b29scy5ldmVyeSh0b29sID0+IHtcclxuICAgICAgLy8g0JXRgdC70Lgg0YHRgNC10LTQuCDQv9C+0LvRg9GH0LXQvdC90YvRhSDQuNGC0LXQvNC+0LIg0L3QtdGCLCDRgtC+0LPQviDQutC+0YLQvtGA0YvQuSDQtdGB0YLRjCDQsiDQtNCw0L3QvdC+0Lwg0Y3QutGI0LXQvdC1XHJcbiAgICAgIGNvbnN0IGNoZWNrVG9vbCA9IGRhdGEuZmluZChvYmogPT4gb2JqLmlkID09IHRvb2wuaWQpO1xyXG4gICAgICBpZiAoIWNoZWNrVG9vbCkgeyByZXR1cm4gZmFsc2U7IH1cclxuXHJcbiAgICAgIGlmICh0b29sLnR5cGUgPT09ICdzd2l0Y2gnKSB7IHJldHVybiBjaGVja1Rvb2wudmFsdWUgPT09IHRvb2wuYm9vbFZhbHVlOyB9XHJcblxyXG4gICAgICBpZiAodG9vbC50eXBlID09PSAncmFuZ2UnKSB7IHJldHVybiB0aGlzLmluY2x1ZGVzVmFsdWUoY2hlY2tUb29sLnZhbHVlLCBbIHRvb2wubWluVmFsdWUsIHRvb2wubWF4VmFsdWUgXSkgfVxyXG5cclxuICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICBpbmNsdWRlc1ZhbHVlKHZhbHVlLCBib3JkZXJzKSB7XHJcbiAgICBpZiAodHlwZW9mIHZhbHVlICE9PSAnbnVtYmVyJykgdGhyb3cgbmV3IFR5cGVFcnJvcignVmFsdWUgc2hvdWxkIGJlIGludGVnZXInKTtcclxuICAgIHJldHVybiAodmFsdWUgPj0gYm9yZGVyc1swXSkgJiYgKHZhbHVlIDw9IGJvcmRlcnNbMV0pO1xyXG4gIH1cclxuXHJcbiAgcmlnaHRUaW1lKHRpbWUpIHtcclxuICAgIGlmICh0eXBlb2YgdGltZSAhPT0gJ251bWJlcicpIHRocm93IG5ldyBUeXBlRXJyb3IoJ1RpbWUgc2hvdWxkIGJlIGludGVnZXIgKG1zKScpO1xyXG4gICAgcmV0dXJuICh0aW1lID49IHRoaXMubWluVGltZSkgJiYgKHRpbWUgPD0gdGhpcy5tYXhUaW1lKTtcclxuICB9XHJcblxyXG4gIGluaXRUb29scyh0b29scykge1xyXG4gICAgcmV0dXJuIHRvb2xzLm1hcCh0b29sID0+IHtcclxuICAgICAgcmV0dXJuIHtcclxuICAgICAgICBpZDogdG9vbC5pZCxcclxuICAgICAgICB0eXBlOiB0b29sLnR5cGUsXHJcbiAgICAgICAgbWluVmFsdWU6IHRvb2wuQWN0aW9uVG9vbC5taW5WYWx1ZSxcclxuICAgICAgICBtYXhWYWx1ZTogdG9vbC5BY3Rpb25Ub29sLm1heFZhbHVlLFxyXG4gICAgICAgIGJvb2xWYWx1ZTogdG9vbC5BY3Rpb25Ub29sLmJvb2xWYWx1ZVxyXG4gICAgICB9XHJcbiAgICB9KTtcclxuICB9XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IEFjdGlvbjtcclxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vbGVhcm5pbmcvbW9kZWxfY29tcG9uZW50cy9hY3Rpb24uanMiLCJjbGFzcyBFdmVudCB7XHJcbiAgY29uc3RydWN0b3IoZGF0YSkge1xyXG4gICAgdGhpcy5pZCA9IGRhdGEuaWQ7XHJcbiAgICB0aGlzLm5hbWUgPSBkYXRhLm5hbWU7XHJcbiAgICB0aGlzLmRlc2NyaXB0aW9uID0gZGF0YS5kZXNjcmlwdGlvbjtcclxuICB9XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IEV2ZW50O1xyXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9sZWFybmluZy9tb2RlbF9jb21wb25lbnRzL2V2ZW50LmpzIiwiaW1wb3J0IEV2ZW50IGZyb20gJy4vZXZlbnQnIDtcclxuaW1wb3J0IEFjdGlvbiBmcm9tICcuL2FjdGlvbic7XHJcblxyXG5jbGFzcyBTdGF0ZSB7XHJcbiAgY29uc3RydWN0b3IoZGF0YSkge1xyXG4gICAgdGhpcy5pZCA9IGRhdGEuaWQ7XHJcbiAgICB0aGlzLm5hbWUgPSBkYXRhLm5hbWU7XHJcbiAgICB0aGlzLmltZyA9IGRhdGEuaW1nO1xyXG4gICAgdGhpcy5wYXJhbXMgPSBkYXRhLnBhcmFtcztcclxuXHJcbiAgICBpZiAoZGF0YS5sYXN0KSB7XHJcbiAgICAgIHRoaXMubGFzdCA9IHRydWU7XHJcbiAgICAgIHRoaXMuZXZlbnQgPSBudWxsO1xyXG4gICAgICB0aGlzLmFjdGlvbnMgPSBudWxsO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdGhpcy5ldmVudCA9IG5ldyBFdmVudChkYXRhLmV2ZW50KTtcclxuICAgICAgdGhpcy5hY3Rpb25zID0gZGF0YS5hY3Rpb25zLm1hcChhY3Rpb24gPT4gbmV3IEFjdGlvbihhY3Rpb24pKTtcclxuICAgICAgdGhpcy5sYXN0ID0gZmFsc2U7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBnZXRJbmFjdGl2ZVRpbWUoKSB7XHJcbiAgICBjb25zdCB0aW1lcyA9IHRoaXMuZ2V0QWxsQWN0aW9uVGltZXMoKTtcclxuICAgIHJldHVybiBNYXRoLm1heCguLi50aW1lcyk7XHJcbiAgfVxyXG5cclxuICBnZXRJbmFjdGl2ZUFjdGlvbigpIHtcclxuICAgIHJldHVybiB0aGlzLmFjdGlvbnMuZmluZChhY3Rpb24gPT4gYWN0aW9uLmluYWN0aXZlID09PSB0cnVlKTtcclxuICB9XHJcblxyXG4gIGdldEFsbEFjdGlvblRpbWVzKCkge1xyXG4gICAgcmV0dXJuIHRoaXMuYWN0aW9ucy5tYXAoYWN0aW9uID0+IGFjdGlvbi5tYXhUaW1lIHx8IDApO1xyXG4gIH1cclxuXHJcbiAgaGFuZGxlSW5wdXQoZGF0YSwgdGltZSkge1xyXG4gICAgY29uc3Qgc3VpdGVkQWN0aW9ucyA9IHRoaXMuYWN0aW9ucy5maWx0ZXIoYWN0aW9uID0+IGFjdGlvbi5pc1N1aXRhYmxlKGRhdGEsIHRpbWUpKTtcclxuICAgIGlmIChzdWl0ZWRBY3Rpb25zLmxlbmd0aCA+IDApIHtcclxuICAgICAgcmV0dXJuIHN1aXRlZEFjdGlvbnNbMF0ubmV4dFN0YXRlO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIG51bGw7XHJcbiAgfVxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBTdGF0ZTtcclxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vbGVhcm5pbmcvbW9kZWxfY29tcG9uZW50cy9zdGF0ZS5qcyIsImltcG9ydCBhamF4IGZyb20gJy4uL3V0aWxzL2FqYXgnO1xyXG5cclxuY29uc3QgUkVQT1JUX1VSTCA9ICcvbGVhcm5pbmcvcmVwb3J0JztcclxuY29uc3QgYWpheENvbmZpZyA9IHtcclxuICBtZXRob2Q6ICdQT1NUJyxcclxuICBoZWFkZXJzOiB7XHJcbiAgICAnQ29udGVudC10eXBlJzogJ2FwcGxpY2F0aW9uL2pzb24nXHJcbiAgfVxyXG59XHJcblxyXG5jbGFzcyBSZXBvcnQge1xyXG4gIGNvbnN0cnVjdG9yKG5hbWUsIHN0ZXBzKSB7XHJcbiAgICB0aGlzLm1vZGVsTmFtZSA9IG5hbWU7XHJcbiAgICB0aGlzLm1heFN0ZXBzID0gc3RlcHM7XHJcbiAgICB0aGlzLnN0YXRlcyA9IFtdO1xyXG4gICAgdGhpcy5jdXJyZW50U3RhdGUgPSBudWxsO1xyXG4gIH1cclxuXHJcbiAgcHVzaFN0YXRlKHN0YXRlKSB7XHJcbiAgICBjb25zdCB7IG5hbWUgfSA9IHN0YXRlO1xyXG4gICAgY29uc3QgbWF4VGltZSA9IHN0YXRlLmxhc3QgPyAtMSA6IHN0YXRlLmdldEluYWN0aXZlVGltZSgpO1xyXG4gICAgY29uc3Qgc3BlbnRUaW1lID0gbWF4VGltZTtcclxuICAgIGNvbnN0IGluYWN0aXZlID0gdHJ1ZTtcclxuICAgIGNvbnN0IGFjdGlvbnNOdW1iZXIgPSAwO1xyXG4gICAgdGhpcy5zdGF0ZXMucHVzaCh7IG5hbWUsIG1heFRpbWUsIGluYWN0aXZlLCBhY3Rpb25zTnVtYmVyLCBzcGVudFRpbWUgfSk7XHJcbiAgICB0aGlzLmN1cnJlbnRTdGF0ZSA9IHRoaXMuc3RhdGVzW3RoaXMuc3RhdGVzLmxlbmd0aCAtIDFdO1xyXG4gIH1cclxuXHJcbiAgaW5jcmVhc2VBY3Rpb25zTnVtYmVyKCkge1xyXG4gICAgdGhpcy5jdXJyZW50U3RhdGUuYWN0aW9uc051bWJlcisrO1xyXG4gIH1cclxuXHJcbiAgc2V0U3BlbnRUaW1lKHRpbWUpIHtcclxuICAgIHRoaXMuY3VycmVudFN0YXRlLnNwZW50VGltZSA9IHRpbWU7XHJcbiAgICB0aGlzLnNldEluYWN0aXZlKGZhbHNlKTtcclxuICB9XHJcblxyXG4gIHNldEluYWN0aXZlKHZhbHVlKSB7XHJcbiAgICB0aGlzLmN1cnJlbnRTdGF0ZS5pbmFjdGl2ZSA9IHZhbHVlO1xyXG4gIH1cclxuXHJcbiAgc2VuZCgpIHtcclxuICAgIGlmICh0aGlzLnN0YXRlcy5sZW5ndGggPiAxKSB7XHJcbiAgICAgIC8vIHJlbW92ZSBsYXN0IHN0YXRlIC0gdXNlciBjYW4ndCBtYWtlIGFueSBhY3Rpb25cclxuICAgICAgdGhpcy5zdGF0ZXMgPSB0aGlzLnN0YXRlcy5zbGljZSgwLCAtMSk7XHJcbiAgICB9XHJcbiAgICBhamF4Q29uZmlnLmRhdGEgPSBKU09OLnN0cmluZ2lmeSh7XHJcbiAgICAgIG1vZGVsTmFtZTogdGhpcy5tb2RlbE5hbWUsXHJcbiAgICAgIG1heFN0ZXBzOiB0aGlzLm1heFN0ZXBzLFxyXG4gICAgICBzdGF0ZXM6IHRoaXMuc3RhdGVzXHJcbiAgICB9KTtcclxuICAgIHJldHVybiBhamF4KFJFUE9SVF9VUkwsIGFqYXhDb25maWcpO1xyXG4gIH1cclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgUmVwb3J0O1xyXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9sZWFybmluZy9yZXBvcnQuanMiLCJpbXBvcnQgbm9kZUZhY3RvcnkgZnJvbSAnLi4vLi4vdXRpbHMvbm9kZUZhY3RvcnknO1xyXG5pbXBvcnQgdGltZXIgZnJvbSAnLi4vLi4vdXRpbHMvdGltZXInO1xyXG5cclxuY29uc3QgJG5hbWUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcubW9kZWwtc3RhdGUtbmFtZScpO1xyXG5jb25zdCAkaW1nID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLm1vZGVsLXN0YXRlLWltZycpO1xyXG5jb25zdCAkcGFyYW1zID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLm1vZGVsLXBhcmFtcy12YWx1ZXMnKTtcclxuXHJcbmNvbnN0ICRldmVudCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5tb2RlbC1ldmVudCcpO1xyXG5jb25zdCAkZXZlbnRIZWFkZXIgPSAkZXZlbnQucXVlcnlTZWxlY3RvcignLm1vZGVsLWV2ZW50LW5hbWUgc3BhbicpO1xyXG5jb25zdCAkZXZlbnRCb2R5ID0gJGV2ZW50LnF1ZXJ5U2VsZWN0b3IoJy5tb2RlbC1ldmVudC1pbmZvJyk7XHJcblxyXG5jb25zdCAkdGltZXJDb250YWluZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcubW9kZWwtdGltZXInKTtcclxuJHRpbWVyQ29udGFpbmVyLmFwcGVuZENoaWxkKHRpbWVyLm5vZGUpO1xyXG5cclxuZnVuY3Rpb24gc2V0KHsgbmFtZSwgaW1nLCBwYXJhbXMgfSkge1xyXG4gICRuYW1lLnRleHRDb250ZW50ID0gbmFtZTtcclxuICAkaW1nLnNldEF0dHJpYnV0ZSgnc3JjJywgYGltZy9zdGF0ZXMvJHtpbWd9YCk7XHJcbiAgc2V0UGFyYW1ldGVycyhwYXJhbXMpO1xyXG59XHJcblxyXG5mdW5jdGlvbiBzZXRQYXJhbWV0ZXJzKHBhcmFtcyA9IFtdKSB7XHJcbiAgY29uc3QgZnJhZyA9IGRvY3VtZW50LmNyZWF0ZURvY3VtZW50RnJhZ21lbnQoKTtcclxuICBwYXJhbXMuZm9yRWFjaChwYXJhbSA9PiBmcmFnLmFwcGVuZENoaWxkKGNyZWF0ZVBhcmFtZXRlTm9kZShwYXJhbS5uYW1lLCBwYXJhbS52YWx1ZSkpKTtcclxuXHJcbiAgJHBhcmFtcy5pbm5lckhUTUwgPSBcIlwiO1xyXG4gICRwYXJhbXMuYXBwZW5kQ2hpbGQoZnJhZyk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGNyZWF0ZVBhcmFtZXRlTm9kZShrZXksIHZhbHVlKSB7XHJcbiAgY29uc3QgZGl2ID0gbm9kZUZhY3RvcnkoJ2RpdicsIHsgY2xhc3NMaXN0OiBbJ3BhcmFtZXRlciddIH0pO1xyXG5cclxuICBjb25zdCBrZXlTcGFuID0gbm9kZUZhY3RvcnkoJ3NwYW4nLCB7IHRleHRDb250ZW50OiBrZXkgfSk7XHJcbiAgZGl2LmFwcGVuZENoaWxkKGtleVNwYW4pO1xyXG5cclxuICBjb25zdCB2YWx1ZVNwYW4gPSBub2RlRmFjdG9yeSgnc3BhbicsIHsgdGV4dENvbnRlbnQ6IHZhbHVlIH0pO1xyXG4gIGRpdi5hcHBlbmRDaGlsZCh2YWx1ZVNwYW4pO1xyXG5cclxuICByZXR1cm4gZGl2O1xyXG59XHJcblxyXG5cclxuLyoqIFNldHMgZXZlbnQgZGF0YSB0byBVSSAqL1xyXG5mdW5jdGlvbiBzaG93RXZlbnQoZXZlbnQpIHtcclxuICAkZXZlbnRIZWFkZXIudGV4dENvbnRlbnQgPSBldmVudC5uYW1lO1xyXG4gICRldmVudEJvZHkudGV4dENvbnRlbnQgPSBldmVudC5kZXNjcmlwdGlvbjtcclxuICAkZXZlbnQuY2xhc3NMaXN0LnJlbW92ZSgnaXMtaGlkZGVuJywgJ3NsaWRlLXRvcCcpO1xyXG4gIHNob3dUaW1lcigpO1xyXG59XHJcbmZ1bmN0aW9uIGhpZGVFdmVudCgpIHtcclxuICAkZXZlbnQuY2xhc3NMaXN0LmFkZCgnaXMtaGlkZGVuJywgJ3NsaWRlLXRvcCcpO1xyXG4gIGhpZGVUaW1lcigpO1xyXG59XHJcblxyXG5mdW5jdGlvbiBzaG93VGltZXIoKSB7XHJcbiAgJHRpbWVyQ29udGFpbmVyLmNsYXNzTGlzdC5yZW1vdmUoJ2lzLWhpZGRlbicpO1xyXG4gIHRpbWVyLnN0YXJ0KCk7XHJcbn1cclxuZnVuY3Rpb24gaGlkZVRpbWVyKCkge1xyXG4gICR0aW1lckNvbnRhaW5lci5jbGFzc0xpc3QuYWRkKCdpcy1oaWRkZW4nKTtcclxuICB0aW1lci5zdG9wKCk7XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IHtcclxuICBzZXQsXHJcbiAgc2hvd0V2ZW50LFxyXG4gIGhpZGVFdmVudCxcclxufTtcclxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vbGVhcm5pbmcvc2NlbmVfY29tcG9uZW50cy9zdGF0ZS5qcyIsImltcG9ydCBub2RlRmFjdG9yeSBmcm9tICcuLi8uLi91dGlscy9ub2RlRmFjdG9yeSc7XHJcblxyXG5jb25zdCB0b29sVHlwZXMgPSB7XHJcbiAgUkFOR0U6ICdyYW5nZScsXHJcbiAgU1dJVENIOiAnc3dpdGNoJ1xyXG59XHJcbmNvbnN0ICR0b29scyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy50b29scy1saXN0Jyk7XHJcblxyXG5mdW5jdGlvbiBpbml0KHRvb2xzKSB7XHJcbiAgY29uc3QgZnJhZ21lbnQgPSBkb2N1bWVudC5jcmVhdGVEb2N1bWVudEZyYWdtZW50KCk7XHJcblxyXG4gIHRvb2xzLmZvckVhY2godG9vbCA9PiB7XHJcbiAgICAvLyBjcmVhdGUgdG9vbCB3cmFwcGVyXHJcbiAgICBjb25zdCBkaXYgPSBub2RlRmFjdG9yeSgnZGl2JywgeyBjbGFzc0xpc3Q6IFsndG9vbCddIH0pO1xyXG5cclxuICAgIGNvbnN0IGxhYmVsID0gbm9kZUZhY3RvcnkoJ2xhYmVsJywge1xyXG4gICAgICBjbGFzc0xpc3Q6IFsndG9vbC1uYW1lJ10sXHJcbiAgICAgIGF0dHJzOiB7IFwiZm9yXCI6IHRvb2wubmFtZSB9LFxyXG4gICAgICB0ZXh0Q29udGVudDogdG9vbC5uYW1lXHJcbiAgICB9KTtcclxuICAgIGRpdi5hcHBlbmRDaGlsZChsYWJlbCk7XHJcblxyXG4gICAgY29uc3QgdG9vbE5vZGUgPSBjcmVhdGVUb29sTm9kZSh0b29sKTtcclxuICAgIGRpdi5hcHBlbmRDaGlsZCh0b29sTm9kZSk7XHJcblxyXG4gICAgZnJhZ21lbnQuYXBwZW5kQ2hpbGQoZGl2KTtcclxuICB9KTtcclxuXHJcbiAgJHRvb2xzLmlubmVySFRNTCA9IFwiXCI7XHJcbiAgJHRvb2xzLmFwcGVuZENoaWxkKGZyYWdtZW50KTtcclxufVxyXG5cclxuZnVuY3Rpb24gY3JlYXRlVG9vbE5vZGUodG9vbCkge1xyXG4gIHN3aXRjaCh0b29sLnR5cGUpIHtcclxuICAgIGNhc2UgdG9vbFR5cGVzLlJBTkdFOiAgIHJldHVybiBjcmVhdGVSYW5nZVRvb2wodG9vbCk7XHJcbiAgICBjYXNlIHRvb2xUeXBlcy5TV0lUQ0g6ICByZXR1cm4gY3JlYXRlU3dpdGNoVG9vbCh0b29sKTtcclxuICAgIGRlZmF1bHQ6ICAgICAgICAgICAgICAgIHJldHVybiAn0J3QtdC40LfQstC10YHRgtC90YvQuSDQv9GA0LjQsdC+0YAnO1xyXG4gIH1cclxufVxyXG5cclxuZnVuY3Rpb24gY3JlYXRlUmFuZ2VUb29sKHRvb2wpIHtcclxuICBjb25zdCBkaXZJbnB1dCA9IG5vZGVGYWN0b3J5KCdkaXYnLCB7IGNsYXNzTGlzdDogWydyYW5nZSddIH0pO1xyXG5cclxuICBjb25zdCBzcGFuTWluID0gbm9kZUZhY3RvcnkoJ3NwYW4nLCB7IHRleHRDb250ZW50OiB0b29sLm1pbiB9KTtcclxuICBkaXZJbnB1dC5hcHBlbmRDaGlsZChzcGFuTWluKVxyXG5cclxuICBjb25zdCBpbnB1dCA9IG5vZGVGYWN0b3J5KCdpbnB1dCcsIHtcclxuICAgIGF0dHJzOiB7XHJcbiAgICAgICdkYXRhLWlkJzogdG9vbC5pZCxcclxuICAgICAgJ2RhdGEtdHlwZSc6ICdyYW5nZScsXHJcbiAgICAgICduYW1lJzogdG9vbC5uYW1lLFxyXG4gICAgICAndHlwZSc6ICdyYW5nZScsXHJcbiAgICAgICdtaW4nOiB0b29sLm1pbixcclxuICAgICAgJ21heCc6IHRvb2wubWF4LFxyXG4gICAgICAndmFsdWUnOiAwLFxyXG4gICAgfVxyXG4gIH0pO1xyXG4gIGRpdklucHV0LmFwcGVuZENoaWxkKGlucHV0KTtcclxuXHJcbiAgY29uc3Qgc3Bhbk1heCA9IG5vZGVGYWN0b3J5KCdzcGFuJywgeyB0ZXh0Q29udGVudDogdG9vbC5tYXggfSk7XHJcbiAgZGl2SW5wdXQuYXBwZW5kQ2hpbGQoc3Bhbk1heCk7XHJcblxyXG4gIGNvbnN0IGRpdkN1cnJlbnQgPSBub2RlRmFjdG9yeSgnZGl2JywgeyBjbGFzc0xpc3Q6IFsncmFuZ2UtY3VycmVudC12YWx1ZSddIH0pO1xyXG4gIGNvbnN0IHNwYW5DdXJyZW50ID0gbm9kZUZhY3RvcnkoJ3NwYW4nLCB7IHRleHRDb250ZW50OiBpbnB1dC52YWx1ZSB9KTtcclxuICBkaXZDdXJyZW50LmFwcGVuZENoaWxkKHNwYW5DdXJyZW50KTtcclxuXHJcbiAgaW5wdXQuYWRkRXZlbnRMaXN0ZW5lcignaW5wdXQnLCAoZXZ0KSA9PiB7XHJcbiAgICBzcGFuQ3VycmVudC50ZXh0Q29udGVudCA9IGV2dC50YXJnZXQudmFsdWU7XHJcbiAgfSk7XHJcblxyXG4gIGNvbnN0IGZyYWdtZW50ID0gZG9jdW1lbnQuY3JlYXRlRG9jdW1lbnRGcmFnbWVudCgpO1xyXG4gIGZyYWdtZW50LmFwcGVuZENoaWxkKGRpdklucHV0KTtcclxuICBmcmFnbWVudC5hcHBlbmRDaGlsZChkaXZDdXJyZW50KTtcclxuXHJcbiAgcmV0dXJuIGZyYWdtZW50O1xyXG59XHJcblxyXG5mdW5jdGlvbiBjcmVhdGVTd2l0Y2hUb29sKHRvb2wpIHtcclxuICBjb25zdCBsYWJlbCA9IG5vZGVGYWN0b3J5KCdsYWJlbCcsIHsgY2xhc3NMaXN0OiBbJ3N3aXRjaCddIH0pO1xyXG5cclxuICBjb25zdCBpbnB1dCA9IG5vZGVGYWN0b3J5KCdpbnB1dCcsIHtcclxuICAgIGF0dHJzOiB7XHJcbiAgICAgICdkYXRhLWlkJzogdG9vbC5pZCxcclxuICAgICAgJ2RhdGEtdHlwZSc6ICdzd2l0Y2gnLFxyXG4gICAgICAndHlwZSc6ICdjaGVja2JveCdcclxuICAgIH1cclxuICB9KTtcclxuICBsYWJlbC5hcHBlbmRDaGlsZChpbnB1dCk7XHJcblxyXG4gIGNvbnN0IGRpdiA9IG5vZGVGYWN0b3J5KCdkaXYnLCB7IGNsYXNzTGlzdDogWydzbGlkZXInXSB9KTtcclxuICBsYWJlbC5hcHBlbmRDaGlsZChkaXYpO1xyXG5cclxuICByZXR1cm4gbGFiZWw7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGdldFRvb2xzRGF0YSgpIHtcclxuICBjb25zdCB0b29sc0RhdGEgPSBbXTtcclxuICBjb25zdCBpbnB1dHMgPSAkdG9vbHMucXVlcnlTZWxlY3RvckFsbCgnaW5wdXRbZGF0YS1pZF0nKTtcclxuICBpbnB1dHMuZm9yRWFjaChpbnB1dCA9PiB7XHJcbiAgICBjb25zdCB7IGlkLCB0eXBlIH0gPSBpbnB1dC5kYXRhc2V0O1xyXG4gICAgbGV0IHZhbHVlO1xyXG4gICAgc3dpdGNoKHR5cGUpIHtcclxuICAgICAgY2FzZSB0b29sVHlwZXMuUkFOR0U6IHZhbHVlID0gcGFyc2VJbnQoaW5wdXQudmFsdWUpOyBicmVhaztcclxuICAgICAgY2FzZSB0b29sVHlwZXMuU1dJVENIOiB2YWx1ZSA9IGlucHV0LmNoZWNrZWQ7IGJyZWFrO1xyXG4gICAgICBkZWZhdWx0OiB0aHJvdyBuZXcgRXJyb3IoYNCd0LXQutC+0YDRgNC10LrRgtC90YvQuSDRgtC40L8g0L/RgNC40LHQvtGA0LAuIElEOiAke2lkfWApO1xyXG4gICAgfVxyXG4gICAgdG9vbHNEYXRhLnB1c2goeyBpZCwgdmFsdWUgfSk7XHJcbiAgfSk7XHJcbiAgcmV0dXJuIHRvb2xzRGF0YTtcclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQge1xyXG4gIGluaXQsXHJcbiAgZ2V0VG9vbHNEYXRhXHJcbn07XHJcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2xlYXJuaW5nL3NjZW5lX2NvbXBvbmVudHMvdG9vbHMuanMiLCJpbXBvcnQgbm9kZUZhY3RvcnkgZnJvbSAnLi9ub2RlRmFjdG9yeSc7XHJcblxyXG5mdW5jdGlvbiBtc1RvQ29udGVudChtcykge1xyXG4gIGNvbnN0IHNlY29uZHMgPSBNYXRoLnJvdW5kKG1zIC8gMTAwMCk7XHJcbiAgY29uc3QgbWlucyA9IE1hdGguZmxvb3Ioc2Vjb25kcyAvIDYwKTtcclxuICBjb25zdCBzZWNvbmRzTGVmdCA9IHNlY29uZHMgLSAobWlucyAqIDYwKTtcclxuXHJcbiAgcmV0dXJuIGAke21pbnN9OiR7c2Vjb25kc0xlZnQgPj0gMTAgPyAnJyA6ICcwJ30ke3NlY29uZHNMZWZ0fWA7XHJcbn1cclxuXHJcbmNvbnN0IHRpbWVyID0ge1xyXG4gIHN0YXJ0VGltZTogbnVsbCxcclxuICBpbnRlcnZhbDogbnVsbCxcclxuICBub2RlOiBub2RlRmFjdG9yeSgnc3BhbicsIHsgY2xhc3NMaXN0OiBbJ3RpbWVyJ10sIHRleHRDb250ZW50OiAnMDowMCcgfSksXHJcbiAgc3RhcnQ6IGZ1bmN0aW9uKCkge1xyXG4gICAgdGhpcy5zdGFydFRpbWUgPSBEYXRlLm5vdygpO1xyXG4gICAgdGhpcy5pbnRlcnZhbCA9IHNldEludGVydmFsKCgpID0+IHtcclxuICAgICAgY29uc3QgZWxhcHNlZCA9IERhdGUubm93KCkgLSB0aGlzLnN0YXJ0VGltZTtcclxuICAgICAgdGhpcy5ub2RlLnRleHRDb250ZW50ID0gbXNUb0NvbnRlbnQoZWxhcHNlZCk7XHJcbiAgICB9LCAxMDAwKTtcclxuICB9LFxyXG4gIHN0b3A6IGZ1bmN0aW9uKCkge1xyXG4gICAgaWYgKCF0aGlzLnN0YXJ0VGltZSkgeyByZXR1cm47IH1cclxuICAgIHRoaXMuc3RhcnRUaW1lID0gbnVsbDtcclxuICAgIGNsZWFySW50ZXJ2YWwodGhpcy5pbnRlcnZhbCk7XHJcbiAgICB0aGlzLm5vZGUudGV4dENvbnRlbnQgPSAnMDowMCc7XHJcbiAgfVxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCB0aW1lcjtcclxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vdXRpbHMvdGltZXIuanMiLCJpbXBvcnQgJy4uLy4uL3Nhc3MvbGVhcm5pbmcuc2Nzcyc7XHJcblxyXG5pbXBvcnQgcHVic3ViIGZyb20gJy4uL3V0aWxzL3B1YnN1Yic7XHJcbmltcG9ydCBhamF4IGZyb20gJy4uL3V0aWxzL2FqYXgnO1xyXG5pbXBvcnQgc2NlbmUgZnJvbSAnLi9zY2VuZSc7XHJcbmltcG9ydCBNb2RlbCBmcm9tICcuL21vZGVsJztcclxuXHJcbi8qKlxyXG4gKiBMb2FkIG1vZGVsIHdpdGggZ2l2ZW4gaWRcclxuICovXHJcbmZ1bmN0aW9uIGxvYWRNb2RlbChpZCkge1xyXG4gIHJldHVybiBhamF4KGAvbW9kZWxzLyR7aWR9YCkudGhlbihyZXNwb25zZSA9PiBKU09OLnBhcnNlKHJlc3BvbnNlKSk7XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBVSSBidXR0b24ncyBoYW5kbGVyc1xyXG4gKi9cclxuY29uc3QgJHNlbGVjdCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjbW9kZWwtc2VsZWN0XCIpO1xyXG5jb25zdCAkbG9hZEJ1dHRvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNsb2FkLW1vZGVsLWJ0bicpO1xyXG5cclxubGV0IG1vZGVsID0gbnVsbDtcclxuXHJcbiRsb2FkQnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xyXG4gIGlmICggbW9kZWwgKSB7IG1vZGVsLnN0b3AoKTsgfVxyXG4gIGNvbnN0IG1vZGVsSWQgPSAkc2VsZWN0LnZhbHVlO1xyXG4gIGxvYWRNb2RlbChtb2RlbElkKVxyXG4gICAgLnRoZW4ocmVzcG9uc2UgPT4ge1xyXG4gICAgICBtb2RlbCA9IG5ldyBNb2RlbChyZXNwb25zZSk7XHJcbiAgICAgIHNjZW5lLmluaXQobW9kZWwsIHJlc3BvbnNlKVxyXG4gICAgICAgIC5zaG93Q29udGVudCgpXHJcbiAgICAgICAgLmVuYWJsZUJ1dHRvbnMoJHN0YXJ0QnV0dG9uKVxyXG4gICAgICAgIC5kaXNhYmxlQnV0dG9ucygkc3RvcEJ1dHRvbiwgJHJ1bkJ1dHRvbik7XHJcbiAgICB9KVxyXG4gICAgLmNhdGNoKGVyciA9PiB7IGNvbnNvbGUuZXJyb3IoZXJyKSB9KTtcclxufSk7XHJcbi8vXHJcbmNvbnN0ICRzdGFydEJ1dHRvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNzdGFydC1idG4nKTtcclxuJHN0YXJ0QnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xyXG4gIG1vZGVsLnN0YXJ0KCk7XHJcbiAgc2NlbmUuZGlzYWJsZUJ1dHRvbnMoJHN0YXJ0QnV0dG9uKTtcclxuICBzY2VuZS5lbmFibGVCdXR0b25zKCRzdG9wQnV0dG9uLCAkcnVuQnV0dG9uKTtcclxufSk7XHJcblxyXG5jb25zdCAkc3RvcEJ1dHRvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNzdG9wLWJ0bicpO1xyXG4kc3RvcEJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcclxuICBwdWJzdWIucHVibGlzaCgnbW9kZWxfc3RvcCcpO1xyXG4gIHNjZW5lLmVuYWJsZUJ1dHRvbnMoJHN0YXJ0QnV0dG9uKTtcclxuICBzY2VuZS5kaXNhYmxlQnV0dG9ucygkc3RvcEJ1dHRvbiwgJHJ1bkJ1dHRvbik7XHJcbn0pO1xyXG5cclxuY29uc3QgJHJ1bkJ1dHRvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNydW4tYnRuJyk7XHJcbiRydW5CdXR0b24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XHJcbiAgY29uc3QgdG9vbHNEYXRhID0gc2NlbmUuZ2V0VG9vbHNEYXRhKCk7XHJcbiAgcHVic3ViLnB1Ymxpc2goJ3VzZXJfaW5wdXQnLCB0b29sc0RhdGEpO1xyXG59KTtcclxuXHJcbi8qKlxyXG4gKiBIYW5kbGUgY3VzdG9tIGV2ZW50cyBoZXJlICh1c2VyIGlucHV0LCBwcm9ncmFtbSBtZXNzYWdlcyBldGMuKVxyXG4gKi9cclxucHVic3ViLnN1YnNjcmliZSgnbmV3X3N0YXRlJywgc3RhdGUgPT4ge1xyXG4gIHNjZW5lLmhpZGVFdmVudCgpO1xyXG4gIHNjZW5lLnNldFN0YXRlKHN0YXRlKTtcclxufSk7XHJcbnB1YnN1Yi5zdWJzY3JpYmUoJ2V2ZW50JywgZXZlbnQgPT4gc2NlbmUuc2hvd0V2ZW50KGV2ZW50KSk7XHJcblxyXG4vLyAvKipcclxuLy8gKiBUaW1lciAoY3VycmVudGx5IGZvciBkZXYgbW9kZSBvbmx5KVxyXG4vLyAqL1xyXG4vLyBpbXBvcnQgdGltZXIgZnJvbSAnLi4vdXRpbHMvdGltZXInO1xyXG4vLyBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuaGVhZGVyJykuYXBwZW5kQ2hpbGQodGltZXIubm9kZSk7XHJcbi8vIHB1YnN1Yi5zdWJzY3JpYmUoJ25ld19zdGF0ZScsIHN0YXRlID0+IHRpbWVyLnN0b3AoKSk7XHJcbi8vIHB1YnN1Yi5zdWJzY3JpYmUoJ2V2ZW50JywgZXZlbnQgPT4gdGltZXIuc3RhcnQoKSk7XHJcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2xlYXJuaW5nL2luZGV4LmpzIl0sInNvdXJjZVJvb3QiOiIifQ==