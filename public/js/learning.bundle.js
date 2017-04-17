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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgZjViOGNhZDYxZWEzMjcwODg2OGUiLCJ3ZWJwYWNrOi8vLy4vdXRpbHMvYWpheC5qcyIsIndlYnBhY2s6Ly8vLi91dGlscy9ub2RlRmFjdG9yeS5qcyIsIndlYnBhY2s6Ly8vLi91dGlscy9wdWJzdWIuanMiLCJ3ZWJwYWNrOi8vLy4vbGVhcm5pbmcvbW9kZWwuanMiLCJ3ZWJwYWNrOi8vLy4vbGVhcm5pbmcvc2NlbmUuanMiLCJ3ZWJwYWNrOi8vLy4uL3Nhc3MvbGVhcm5pbmcuc2NzcyIsIndlYnBhY2s6Ly8vLi9sZWFybmluZy9tb2RlbF9jb21wb25lbnRzL2FjdGlvbi5qcyIsIndlYnBhY2s6Ly8vLi9sZWFybmluZy9tb2RlbF9jb21wb25lbnRzL2V2ZW50LmpzIiwid2VicGFjazovLy8uL2xlYXJuaW5nL21vZGVsX2NvbXBvbmVudHMvc3RhdGUuanMiLCJ3ZWJwYWNrOi8vLy4vbGVhcm5pbmcvcmVwb3J0LmpzIiwid2VicGFjazovLy8uL2xlYXJuaW5nL3NjZW5lX2NvbXBvbmVudHMvc3RhdGUuanMiLCJ3ZWJwYWNrOi8vLy4vbGVhcm5pbmcvc2NlbmVfY29tcG9uZW50cy90b29scy5qcyIsIndlYnBhY2s6Ly8vLi91dGlscy90aW1lci5qcyIsIndlYnBhY2s6Ly8vLi9sZWFybmluZy9pbmRleC5qcyJdLCJuYW1lcyI6WyJhamF4IiwicGF0aCIsIm9wdGlvbnMiLCJmdWxsUmVzcG9uc2UiLCJ4aHIiLCJYTUxIdHRwUmVxdWVzdCIsIm9wZW4iLCJtZXRob2QiLCJoZWFkZXJzIiwic2V0WEhSSGVhZGVycyIsInNlbmQiLCJkYXRhIiwiUHJvbWlzZSIsInJlc29sdmUiLCJyZWplY3QiLCJvbnJlYWR5c3RhdGVjaGFuZ2UiLCJyZWFkeVN0YXRlIiwic3RhdHVzIiwicmVzcG9uc2VUZXh0Iiwic3RhdHVzVGV4dCIsImhlYWRlciIsInNldFJlcXVlc3RIZWFkZXIiLCJub2RlRmFjdG9yeSIsInR5cGUiLCJwYXJhbXMiLCJub2RlIiwiZG9jdW1lbnQiLCJjcmVhdGVFbGVtZW50IiwiYXBwZW5kQ2xhc3NlcyIsImFwcGVuZEF0dHJzIiwiaW5zZXJ0VGV4dENvbnRlbnQiLCJjbGFzc0xpc3QiLCJmb3JFYWNoIiwiYWRkIiwiY2xhc3NOYW1lIiwiYXR0cnMiLCJhdHRyTmFtZXMiLCJPYmplY3QiLCJrZXlzIiwic2V0QXR0cmlidXRlIiwiYXR0ck5hbWUiLCJ0ZXh0Q29udGVudCIsInB1YnN1YiIsInRvcGljcyIsInN1YnNjcmliZSIsInRvcGljIiwibGlzdGVuZXIiLCJxdWV1ZSIsImluZGV4IiwicHVzaCIsInJlbW92ZSIsInB1Ymxpc2giLCJpbmZvIiwibGVuZ3RoIiwiaXRlbXMiLCJpdGVtIiwiSU5JVElBTF9TVEFURV9OQU1FIiwiU1RPUF9TVEFURV9OQU1FIiwiTW9kZWwiLCJpZCIsIm5hbWUiLCJicmVha1RpbWUiLCJzdGVwcyIsInN0YXRlcyIsIm1hcCIsInN0YXRlIiwiY3VycmVudFN0YXRlIiwiZ2V0U3RhdGUiLCJpbml0aWFsU3RhdGUiLCJ0aW1lb3V0Iiwic3ViSW5wdXQiLCJzdWJTdG9wIiwic3RhcnRTdGF0ZSIsImltZyIsImxhc3QiLCJzdG9wU3RhdGUiLCJmaW5kIiwicmVwb3J0IiwiaGFuZGxlTmV3U3RhdGUiLCJpbnRlcnZhbHMiLCJpIiwidGhlbiIsIm1ha2VCcmVhayIsImhhbmRsZUV2ZW50IiwiY2F0Y2giLCJyZXNwb25zZSIsImNvbnNvbGUiLCJsb2ciLCJzZXRUaW1lb3V0IiwiY2xlYXJTdWJzIiwiZXZlbnQiLCJldmVudFN0YXJ0VGltZSIsIkRhdGUiLCJub3ciLCJpbmNyZWFzZUFjdGlvbnNOdW1iZXIiLCJ0aW1lU3BlbnQiLCJuZXh0U3RhdGVJZCIsImhhbmRsZUlucHV0IiwibmV4dFN0YXRlIiwic2V0U3BlbnRUaW1lIiwiaW5hY3RpdmVUaW1lIiwiZ2V0SW5hY3RpdmVUaW1lIiwiZ2V0SW5hY3RpdmVBY3Rpb24iLCJwdXNoU3RhdGUiLCJjbGVhclRpbWVvdXQiLCJleHBvcnRzIiwiJG1vZGVsTmFtZSIsInF1ZXJ5U2VsZWN0b3IiLCJpbml0IiwibW9kZWwiLCJzZXQiLCJ0b29scyIsIiRjb250ZW50Iiwic2hvd0NvbnRlbnQiLCJzZXRDb250ZW50RGlzcGxheSIsImhpZGVDb250ZW50IiwiZGlzcGxheSIsInN0eWxlIiwiZW5hYmxlQnV0dG9ucyIsImJ1dHRvbnMiLCJzZXRCdXR0b25zU3RhdGUiLCJkaXNhYmxlQnV0dG9ucyIsInZhbHVlIiwiYnV0dG9uIiwiZGlzYWJsZWQiLCJnZXRUb29sc0RhdGEiLCJzZXRTdGF0ZSIsInN0YXRlRGF0YSIsInNob3dFdmVudCIsImV2ZW50RGF0YSIsImhpZGVFdmVudCIsIkFjdGlvbiIsIm1pblRpbWUiLCJtYXhUaW1lIiwiaW5hY3RpdmUiLCJpbml0VG9vbHMiLCJ0aW1lIiwicmlnaHRUaW1lIiwicmlnaHREYXRhIiwiZXZlcnkiLCJjaGVja1Rvb2wiLCJvYmoiLCJ0b29sIiwiYm9vbFZhbHVlIiwiaW5jbHVkZXNWYWx1ZSIsIm1pblZhbHVlIiwibWF4VmFsdWUiLCJib3JkZXJzIiwiVHlwZUVycm9yIiwiQWN0aW9uVG9vbCIsIkV2ZW50IiwiZGVzY3JpcHRpb24iLCJTdGF0ZSIsImFjdGlvbnMiLCJhY3Rpb24iLCJ0aW1lcyIsImdldEFsbEFjdGlvblRpbWVzIiwiTWF0aCIsIm1heCIsInN1aXRlZEFjdGlvbnMiLCJmaWx0ZXIiLCJpc1N1aXRhYmxlIiwiUkVQT1JUX1VSTCIsImFqYXhDb25maWciLCJSZXBvcnQiLCJtb2RlbE5hbWUiLCJtYXhTdGVwcyIsInNwZW50VGltZSIsImFjdGlvbnNOdW1iZXIiLCJzZXRJbmFjdGl2ZSIsInNsaWNlIiwiSlNPTiIsInN0cmluZ2lmeSIsIiRuYW1lIiwiJGltZyIsIiRwYXJhbXMiLCIkZXZlbnQiLCIkZXZlbnRIZWFkZXIiLCIkZXZlbnRCb2R5IiwiJHRpbWVyQ29udGFpbmVyIiwiYXBwZW5kQ2hpbGQiLCJzZXRQYXJhbWV0ZXJzIiwiZnJhZyIsImNyZWF0ZURvY3VtZW50RnJhZ21lbnQiLCJjcmVhdGVQYXJhbWV0ZU5vZGUiLCJwYXJhbSIsImlubmVySFRNTCIsImtleSIsImRpdiIsImtleVNwYW4iLCJ2YWx1ZVNwYW4iLCJzaG93VGltZXIiLCJoaWRlVGltZXIiLCJzdGFydCIsInN0b3AiLCJ0b29sVHlwZXMiLCJSQU5HRSIsIlNXSVRDSCIsIiR0b29scyIsImZyYWdtZW50IiwibGFiZWwiLCJ0b29sTm9kZSIsImNyZWF0ZVRvb2xOb2RlIiwiY3JlYXRlUmFuZ2VUb29sIiwiY3JlYXRlU3dpdGNoVG9vbCIsImRpdklucHV0Iiwic3Bhbk1pbiIsIm1pbiIsImlucHV0Iiwic3Bhbk1heCIsImRpdkN1cnJlbnQiLCJzcGFuQ3VycmVudCIsImFkZEV2ZW50TGlzdGVuZXIiLCJldnQiLCJ0YXJnZXQiLCJ0b29sc0RhdGEiLCJpbnB1dHMiLCJxdWVyeVNlbGVjdG9yQWxsIiwiZGF0YXNldCIsInBhcnNlSW50IiwiY2hlY2tlZCIsIkVycm9yIiwibXNUb0NvbnRlbnQiLCJtcyIsInNlY29uZHMiLCJyb3VuZCIsIm1pbnMiLCJmbG9vciIsInNlY29uZHNMZWZ0IiwidGltZXIiLCJzdGFydFRpbWUiLCJpbnRlcnZhbCIsInNldEludGVydmFsIiwiZWxhcHNlZCIsImNsZWFySW50ZXJ2YWwiLCJsb2FkTW9kZWwiLCJwYXJzZSIsIiRzZWxlY3QiLCIkbG9hZEJ1dHRvbiIsIm1vZGVsSWQiLCIkc3RhcnRCdXR0b24iLCIkc3RvcEJ1dHRvbiIsIiRydW5CdXR0b24iLCJlcnJvciIsImVyciJdLCJtYXBwaW5ncyI6IjtBQUFBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBLG1EQUEyQyxjQUFjOztBQUV6RDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQUs7QUFDTDtBQUNBOztBQUVBO0FBQ0E7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bnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pXG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG5cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGlkZW50aXR5IGZ1bmN0aW9uIGZvciBjYWxsaW5nIGhhcm1vbnkgaW1wb3J0cyB3aXRoIHRoZSBjb3JyZWN0IGNvbnRleHRcbiBcdF9fd2VicGFja19yZXF1aXJlX18uaSA9IGZ1bmN0aW9uKHZhbHVlKSB7IHJldHVybiB2YWx1ZTsgfTtcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7XG4gXHRcdFx0XHRjb25maWd1cmFibGU6IGZhbHNlLFxuIFx0XHRcdFx0ZW51bWVyYWJsZTogdHJ1ZSxcbiBcdFx0XHRcdGdldDogZ2V0dGVyXG4gXHRcdFx0fSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gMjcpO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIHdlYnBhY2svYm9vdHN0cmFwIGY1YjhjYWQ2MWVhMzI3MDg4NjhlIiwiZnVuY3Rpb24gYWpheChwYXRoID0gJycsIG9wdGlvbnMgPSB7fSwgZnVsbFJlc3BvbnNlID0gZmFsc2UpIHtcclxuICBjb25zdCB4aHIgPSBuZXcgWE1MSHR0cFJlcXVlc3QoKTtcclxuICB4aHIub3BlbihvcHRpb25zLm1ldGhvZCB8fCAnR0VUJywgcGF0aCwgdHJ1ZSk7XHJcbiAgaWYgKG9wdGlvbnMuaGVhZGVycykgeyBzZXRYSFJIZWFkZXJzKHhociwgb3B0aW9ucy5oZWFkZXJzKTsgfVxyXG4gIHhoci5zZW5kKG9wdGlvbnMuZGF0YSk7XHJcblxyXG4gIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XHJcbiAgICB4aHIub25yZWFkeXN0YXRlY2hhbmdlID0gZnVuY3Rpb24oKSB7XHJcbiAgICAgIGlmKHhoci5yZWFkeVN0YXRlID09IDQpIHtcclxuICAgICAgICBpZih4aHIuc3RhdHVzID09IDIwMCkge1xyXG4gICAgICAgICAgaWYgKGZ1bGxSZXNwb25zZSkge1xyXG4gICAgICAgICAgICByZXNvbHZlKHhocik7XHJcbiAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICByZXNvbHZlKHhoci5yZXNwb25zZVRleHQpO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICByZWplY3QoeGhyLnN0YXR1c1RleHQpO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH0pXHJcbn1cclxuXHJcbmZ1bmN0aW9uIHNldFhIUkhlYWRlcnMoeGhyLCBoZWFkZXJzKSB7XHJcbiAgZm9yIChsZXQgaGVhZGVyIGluIGhlYWRlcnMpIHtcclxuICAgIHhoci5zZXRSZXF1ZXN0SGVhZGVyKGhlYWRlciwgaGVhZGVyc1toZWFkZXJdKTtcclxuICB9XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IGFqYXg7XHJcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3V0aWxzL2FqYXguanMiLCJjb25zdCBub2RlRmFjdG9yeSA9IGZ1bmN0aW9uKHR5cGUgPSAnZGl2JywgcGFyYW1zID0ge30pIHtcclxuICBjb25zdCBub2RlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCh0eXBlKTtcclxuXHJcbiAgYXBwZW5kQ2xhc3Nlcyhub2RlLCBwYXJhbXMpO1xyXG4gIGFwcGVuZEF0dHJzKG5vZGUsIHBhcmFtcyk7XHJcbiAgaW5zZXJ0VGV4dENvbnRlbnQobm9kZSwgcGFyYW1zKTtcclxuXHJcbiAgcmV0dXJuIG5vZGU7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGFwcGVuZENsYXNzZXMobm9kZSwgeyBjbGFzc0xpc3QgfSkge1xyXG4gIGlmIChjbGFzc0xpc3QgJiYgY2xhc3NMaXN0LmZvckVhY2gpIHtcclxuICAgIGNsYXNzTGlzdC5mb3JFYWNoKGNsYXNzTmFtZSA9PiBub2RlLmNsYXNzTGlzdC5hZGQoY2xhc3NOYW1lKSk7XHJcbiAgfVxyXG59XHJcblxyXG5mdW5jdGlvbiBhcHBlbmRBdHRycyhub2RlLCB7IGF0dHJzIH0pIHtcclxuICBpZiAoYXR0cnMpIHtcclxuICAgIGNvbnN0IGF0dHJOYW1lcyA9IE9iamVjdC5rZXlzKGF0dHJzKTtcclxuICAgIGF0dHJOYW1lcy5mb3JFYWNoKGF0dHJOYW1lID0+IG5vZGUuc2V0QXR0cmlidXRlKGF0dHJOYW1lLCBhdHRyc1thdHRyTmFtZV0pKTtcclxuICB9XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGluc2VydFRleHRDb250ZW50KG5vZGUsIHsgdGV4dENvbnRlbnQgPSBcIlwiIH0pIHtcclxuICBub2RlLnRleHRDb250ZW50ID0gdGV4dENvbnRlbnQ7XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IG5vZGVGYWN0b3J5O1xyXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi91dGlscy9ub2RlRmFjdG9yeS5qcyIsImNvbnN0IHB1YnN1YiA9IChmdW5jdGlvbigpIHtcclxuXHJcbiAgY29uc3QgdG9waWNzID0ge307XHJcblxyXG4gIHJldHVybiB7XHJcbiAgICBzdWJzY3JpYmU6IGZ1bmN0aW9uKHRvcGljLCBsaXN0ZW5lcikge1xyXG4gICAgICBpZiAoIXRvcGljc1t0b3BpY10pIHRvcGljc1t0b3BpY10gPSB7IHF1ZXVlOiBbXSB9O1xyXG5cclxuICAgICAgY29uc3QgaW5kZXggPSB0b3BpY3NbdG9waWNdLnF1ZXVlLnB1c2gobGlzdGVuZXIpIC0gMTtcclxuICAgICAgLy8gZnVuY3Rpb24gdG8gZGVsZXRlIHRvcGljXHJcbiAgICAgIHJldHVybiB7XHJcbiAgICAgICAgcmVtb3ZlOiBmdW5jdGlvbigpIHtcclxuICAgICAgICAgIGRlbGV0ZSB0b3BpY3NbdG9waWNdLnF1ZXVlW2luZGV4XTtcclxuICAgICAgICB9XHJcbiAgICAgIH07XHJcbiAgICB9LFxyXG5cclxuICAgIHB1Ymxpc2g6IGZ1bmN0aW9uKHRvcGljLCBpbmZvKSB7XHJcbiAgICAgIC8vIG5vIHRoZW1lIG9yIG5vIGxpc3RlbmVyc1xyXG4gICAgICBpZiAoIXRvcGljc1t0b3BpY10gfHwgIXRvcGljc1t0b3BpY10ucXVldWUubGVuZ3RoKSByZXR1cm47XHJcblxyXG4gICAgICBjb25zdCBpdGVtcyA9IHRvcGljc1t0b3BpY10ucXVldWU7XHJcbiAgICAgIGl0ZW1zLmZvckVhY2goaXRlbSA9PiB7XHJcbiAgICAgICAgaXRlbShpbmZvIHx8IHt9KTtcclxuICAgICAgfSk7XHJcbiAgICB9XHJcbiAgfTtcclxufSkoKTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IHB1YnN1YjtcclxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vdXRpbHMvcHVic3ViLmpzIiwiaW1wb3J0IFN0YXRlIGZyb20gJy4vbW9kZWxfY29tcG9uZW50cy9zdGF0ZSc7XHJcbmltcG9ydCBwdWJzdWIgZnJvbSAnLi4vdXRpbHMvcHVic3ViJztcclxuaW1wb3J0IFJlcG9ydCBmcm9tICcuL3JlcG9ydCc7XHJcblxyXG5jb25zdCBJTklUSUFMX1NUQVRFX05BTUUgPSAn0KHQvtGB0YLQvtGP0L3QuNC1INC80L7QtNC10LvQuCc7XHJcbmNvbnN0IFNUT1BfU1RBVEVfTkFNRSA9ICfQntCx0YPRh9C10L3QuNC1INC+0YHRgtCw0L3QvtCy0LvQtdC90L4nO1xyXG5cclxuY2xhc3MgTW9kZWwge1xyXG4gIGNvbnN0cnVjdG9yKGRhdGEpIHtcclxuICAgIHRoaXMuaWQgPSBkYXRhLmlkO1xyXG4gICAgdGhpcy5uYW1lID0gZGF0YS5uYW1lO1xyXG4gICAgdGhpcy5icmVha1RpbWUgPSBkYXRhLmJyZWFrVGltZTtcclxuICAgIHRoaXMuc3RlcHMgPSBkYXRhLnN0ZXBzO1xyXG5cclxuICAgIHRoaXMuc3RhdGVzID0gZGF0YS5zdGF0ZXMubWFwKHN0YXRlID0+IG5ldyBTdGF0ZShzdGF0ZSkpO1xyXG4gICAgdGhpcy5jdXJyZW50U3RhdGUgPSB0aGlzLmdldFN0YXRlKGRhdGEuaW5pdGlhbFN0YXRlKTtcclxuXHJcbiAgICB0aGlzLnRpbWVvdXQgPSBudWxsO1xyXG4gICAgdGhpcy5zdWJJbnB1dCA9IG51bGw7XHJcbiAgICB0aGlzLnN1YlN0b3AgPSBudWxsO1xyXG4gICAgdGhpcy5zdGFydFN0YXRlID0gbmV3IFN0YXRlKHsgaWQ6IDAsIG5hbWU6IElOSVRJQUxfU1RBVEVfTkFNRSwgaW1nOiAnaW1nL3N0YXJ0LnBuZycsIGxhc3Q6IHRydWUgfSk7XHJcbiAgICB0aGlzLnN0b3BTdGF0ZSA9IG5ldyBTdGF0ZSh7IGlkOiAtMSwgbmFtZTogU1RPUF9TVEFURV9OQU1FLCBpbWc6ICdpbWcvc3RvcC5wbmcnLCBsYXN0OiB0cnVlIH0pO1xyXG4gIH1cclxuXHJcbiAgZ2V0U3RhdGUoaWQpIHtcclxuICAgIHJldHVybiB0aGlzLnN0YXRlcy5maW5kKHN0YXRlID0+IHN0YXRlLmlkID09IGlkKTtcclxuICB9XHJcblxyXG4gIHN0YXJ0KCkge1xyXG4gICAgdGhpcy5yZXBvcnQgPSBuZXcgUmVwb3J0KHRoaXMubmFtZSwgdGhpcy5zdGVwcyk7XHJcbiAgICB0aGlzLmhhbmRsZU5ld1N0YXRlKHRoaXMuY3VycmVudFN0YXRlKTsgLy8gc2V0IGluaXRpYWwgc3RhdGVcclxuICAgIGxldCBpbnRlcnZhbHMgPSBQcm9taXNlLnJlc29sdmUoKTsgLy8gaW5pdCBwcm9taXNlIGNoYWluXHJcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMuc3RlcHM7IGkrKykge1xyXG4gICAgICBpbnRlcnZhbHMgPSBpbnRlcnZhbHNcclxuICAgICAgIC50aGVuKCgpID0+IHsgcmV0dXJuIHRoaXMubWFrZUJyZWFrKCkgfSlcclxuICAgICAgIC50aGVuKCgpID0+IHsgcmV0dXJuIHRoaXMuaGFuZGxlRXZlbnQoKSB9KVxyXG4gICAgICAgLnRoZW4oc3RhdGUgPT4geyB0aGlzLmhhbmRsZU5ld1N0YXRlKHN0YXRlKSB9KVxyXG4gICAgfVxyXG4gICAgaW50ZXJ2YWxzXHJcbiAgICAgIC5jYXRjaChzdGF0ZSA9PiB0aGlzLmhhbmRsZU5ld1N0YXRlKHN0YXRlKSlcclxuICAgICAgLnRoZW4oKCkgPT4ge1xyXG4gICAgICAgIGlmICh0aGlzLmN1cnJlbnRTdGF0ZS5uYW1lICE9PSBTVE9QX1NUQVRFX05BTUUpIHtcclxuICAgICAgICAgIHRoaXMucmVwb3J0LnNlbmQoKVxyXG4gICAgICAgICAgLnRoZW4oKHJlc3BvbnNlKSA9PiBjb25zb2xlLmxvZyhyZXNwb25zZSkpO1xyXG4gICAgICAgIH1cclxuICAgICAgfSk7XHJcbiAgICByZXR1cm4gaW50ZXJ2YWxzO1xyXG4gIH1cclxuXHJcbiAgbWFrZUJyZWFrKCkge1xyXG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcclxuICAgICAgdGhpcy5zdWJTdG9wID0gcHVic3ViLnN1YnNjcmliZSgnbW9kZWxfc3RvcCcsICgpID0+IHsgcmVqZWN0KHRoaXMuc3RvcFN0YXRlKTsgfSlcclxuICAgICAgc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgdGhpcy5jbGVhclN1YnMoKTtcclxuICAgICAgICByZXNvbHZlKClcclxuICAgICAgfSwgdGhpcy5icmVha1RpbWUpO1xyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICBoYW5kbGVFdmVudCgpIHtcclxuICAgIGNvbnN0IGV2ZW50ID0gdGhpcy5jdXJyZW50U3RhdGUuZXZlbnQ7XHJcbiAgICBjb25zdCBldmVudFN0YXJ0VGltZSA9IERhdGUubm93KCk7XHJcbiAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xyXG4gICAgICAvLyBzZW5kIGRhdGEgYWJvdXQgbmV3IGV2ZW50IHRvIG90aGVyIG1vZHVsZXNcclxuICAgICAgcHVic3ViLnB1Ymxpc2goJ2V2ZW50JywgZXZlbnQpO1xyXG5cclxuICAgICAgLy8gbGlzdGVuIHRvIHVzZXIgYWN0aW9uXHJcbiAgICAgIC8vIGFuZCBpZiB1c2VyIGlucHV0IGNvcnJlY3QgZ28gdG8gbmV4dCBzdGF0ZVxyXG4gICAgICB0aGlzLnN1YklucHV0ID0gcHVic3ViLnN1YnNjcmliZSgndXNlcl9pbnB1dCcsIGRhdGEgPT4ge1xyXG4gICAgICAgIHRoaXMucmVwb3J0LmluY3JlYXNlQWN0aW9uc051bWJlcigpO1xyXG4gICAgICAgIGNvbnN0IHRpbWVTcGVudCA9IERhdGUubm93KCkgLSBldmVudFN0YXJ0VGltZTtcclxuICAgICAgICBjb25zdCBuZXh0U3RhdGVJZCA9IHRoaXMuY3VycmVudFN0YXRlLmhhbmRsZUlucHV0KGRhdGEsIHRpbWVTcGVudCk7XHJcbiAgICAgICAgY29uc3QgbmV4dFN0YXRlID0gdGhpcy5nZXRTdGF0ZShuZXh0U3RhdGVJZCk7XHJcbiAgICAgICAgaWYgKCBuZXh0U3RhdGUgKSB7XHJcbiAgICAgICAgICB0aGlzLnJlcG9ydC5zZXRTcGVudFRpbWUodGltZVNwZW50KTtcclxuICAgICAgICAgIG5leHRTdGF0ZS5sYXN0ID8gcmVqZWN0KG5leHRTdGF0ZSkgOiByZXNvbHZlKG5leHRTdGF0ZSk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9KTtcclxuXHJcbiAgICAgIC8vIGhhbmRsZSB1c2VyIHN0b3AgYnV0dG9uIGNsaWNrXHJcbiAgICAgIHRoaXMuc3ViU3RvcCA9IHB1YnN1Yi5zdWJzY3JpYmUoJ21vZGVsX3N0b3AnLCAoKSA9PiB7XHJcbiAgICAgICAgcmVqZWN0KHRoaXMuc3RvcFN0YXRlKTtcclxuICAgICAgfSk7XHJcblxyXG4gICAgICAvLyBoYW5kbGUgaW5hY3RpdmVcclxuICAgICAgY29uc3QgaW5hY3RpdmVUaW1lID0gdGhpcy5jdXJyZW50U3RhdGUuZ2V0SW5hY3RpdmVUaW1lKCk7XHJcbiAgICAgIHRoaXMudGltZW91dCA9IHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgIGNvbnN0IG5leHRTdGF0ZUlkID0gdGhpcy5jdXJyZW50U3RhdGUuZ2V0SW5hY3RpdmVBY3Rpb24oKS5uZXh0U3RhdGU7XHJcbiAgICAgICAgY29uc3QgbmV4dFN0YXRlID0gdGhpcy5nZXRTdGF0ZShuZXh0U3RhdGVJZCk7XHJcbiAgICAgICAgbmV4dFN0YXRlLmxhc3QgPyByZWplY3QobmV4dFN0YXRlKSA6IHJlc29sdmUobmV4dFN0YXRlKTtcclxuICAgICAgfSwgaW5hY3RpdmVUaW1lKTtcclxuICAgIH0pXHJcbiAgfVxyXG5cclxuICBoYW5kbGVOZXdTdGF0ZShzdGF0ZSkge1xyXG4gICAgdGhpcy5yZXBvcnQucHVzaFN0YXRlKHN0YXRlKTtcclxuICAgIHRoaXMuY3VycmVudFN0YXRlID0gc3RhdGU7XHJcbiAgICBjbGVhclRpbWVvdXQodGhpcy50aW1lb3V0KTtcclxuICAgIHRoaXMuY2xlYXJTdWJzKCk7XHJcbiAgICBwdWJzdWIucHVibGlzaCgnbmV3X3N0YXRlJywgc3RhdGUpO1xyXG4gIH1cclxuXHJcbiAgY2xlYXJTdWJzKCkge1xyXG4gICAgaWYgKHRoaXMuc3ViSW5wdXQpIHtcclxuICAgICAgdGhpcy5zdWJJbnB1dC5yZW1vdmUoKTtcclxuICAgIH1cclxuICAgIGlmICh0aGlzLnN1YlN0b3ApIHtcclxuICAgICAgdGhpcy5zdWJTdG9wLnJlbW92ZSgpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IE1vZGVsO1xyXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9sZWFybmluZy9tb2RlbC5qcyIsImltcG9ydCBzdGF0ZSBmcm9tICcuL3NjZW5lX2NvbXBvbmVudHMvc3RhdGUnO1xyXG5pbXBvcnQgdG9vbHMgZnJvbSAnLi9zY2VuZV9jb21wb25lbnRzL3Rvb2xzJztcclxuXHJcbmNvbnN0IGV4cG9ydHMgPSB7fTtcclxuXHJcbi8vIFNjZW5lIG1ldGFkYXRhXHJcbmNvbnN0ICRtb2RlbE5hbWUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcubW9kZWwtbmFtZScpO1xyXG5leHBvcnRzLmluaXQgPSBmdW5jdGlvbihtb2RlbCwgcmVzcG9uc2UpIHtcclxuICAkbW9kZWxOYW1lLnRleHRDb250ZW50ID0gbW9kZWwubmFtZTtcclxuICBzdGF0ZS5zZXQobW9kZWwuc3RhcnRTdGF0ZSk7XHJcbiAgdG9vbHMuaW5pdChyZXNwb25zZS50b29scyk7XHJcbiAgcmV0dXJuIHRoaXM7XHJcbn1cclxuXHJcbi8vIE1hbmFnZSBjb250ZW50IHZpc2liaWxpdHlcclxuY29uc3QgJGNvbnRlbnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuY29udGVudCcpO1xyXG5leHBvcnRzLnNob3dDb250ZW50ID0gZnVuY3Rpb24oKSB7XHJcbiAgc2V0Q29udGVudERpc3BsYXkoJ2ZsZXgnKTtcclxuICByZXR1cm4gdGhpcztcclxufVxyXG5leHBvcnRzLmhpZGVDb250ZW50ID0gZnVuY3Rpb24oKSB7XHJcbiAgc2V0Q29udGVudERpc3BsYXkoJ25vbmUnKTtcclxuICByZXR1cm4gdGhpcztcclxufVxyXG5mdW5jdGlvbiBzZXRDb250ZW50RGlzcGxheShkaXNwbGF5KSB7XHJcbiAgJGNvbnRlbnQuc3R5bGUuZGlzcGxheSA9IGRpc3BsYXk7XHJcbn1cclxuXHJcbi8vIE1hbmFnZSBidXR0b25zIHN0YXRlXHJcbmV4cG9ydHMuZW5hYmxlQnV0dG9ucyA9IGZ1bmN0aW9uKC4uLmJ1dHRvbnMpIHtcclxuICBzZXRCdXR0b25zU3RhdGUoYnV0dG9ucywgZmFsc2UpO1xyXG4gIHJldHVybiB0aGlzO1xyXG59XHJcbmV4cG9ydHMuZGlzYWJsZUJ1dHRvbnMgPSBmdW5jdGlvbiguLi5idXR0b25zKSB7XHJcbiAgc2V0QnV0dG9uc1N0YXRlKGJ1dHRvbnMsIHRydWUpO1xyXG4gIHJldHVybiB0aGlzO1xyXG59XHJcbmZ1bmN0aW9uIHNldEJ1dHRvbnNTdGF0ZShidXR0b25zLCB2YWx1ZSkge1xyXG4gIGJ1dHRvbnMuZm9yRWFjaChidXR0b24gPT4gYnV0dG9uLmRpc2FibGVkID0gdmFsdWUpO1xyXG59XHJcblxyXG4vLyBEZWxlZ2F0ZSBwdWJsaWMgbWV0aG9kcyB0byBjb21wb25lbnRzXHJcbmV4cG9ydHMuZ2V0VG9vbHNEYXRhID0gKCkgPT5cclxuICB0b29scy5nZXRUb29sc0RhdGEoKTtcclxuXHJcbmV4cG9ydHMuc2V0U3RhdGUgPSBzdGF0ZURhdGEgPT5cclxuICBzdGF0ZS5zZXQoc3RhdGVEYXRhKTtcclxuXHJcbmV4cG9ydHMuc2hvd0V2ZW50ID0gZXZlbnREYXRhID0+XHJcbiAgc3RhdGUuc2hvd0V2ZW50KGV2ZW50RGF0YSk7XHJcblxyXG5leHBvcnRzLmhpZGVFdmVudCA9ICgpID0+XHJcbiAgc3RhdGUuaGlkZUV2ZW50KCk7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBleHBvcnRzO1xyXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9sZWFybmluZy9zY2VuZS5qcyIsIi8vIHJlbW92ZWQgYnkgZXh0cmFjdC10ZXh0LXdlYnBhY2stcGx1Z2luXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi4vc2Fzcy9sZWFybmluZy5zY3NzXG4vLyBtb2R1bGUgaWQgPSA5XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsImNsYXNzIEFjdGlvbiB7XHJcbiAgY29uc3RydWN0b3IoZGF0YSkge1xyXG4gICAgdGhpcy5taW5UaW1lID0gZGF0YS5taW5UaW1lO1xyXG4gICAgdGhpcy5tYXhUaW1lID0gZGF0YS5tYXhUaW1lO1xyXG4gICAgdGhpcy5uZXh0U3RhdGUgPSBkYXRhLm5leHRTdGF0ZTtcclxuICAgIGlmIChkYXRhLmluYWN0aXZlKSB7XHJcbiAgICAgIHRoaXMuaW5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICB0aGlzLnRvb2xzID0gW107XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB0aGlzLmluYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgIHRoaXMudG9vbHMgPSB0aGlzLmluaXRUb29scyhkYXRhLnRvb2xzKTtcclxuICAgIH1cclxuXHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBAcGFyYW0gW3sgaWQ6IE51bWJlciwgdmFsdWU6IE51bWJlci9Cb29sZWFuIH0sIHsuLi59XVxyXG4gICAqIEBwYXJhbSBOdW1iZXJcclxuICAgKiBAcmV0dXJuIEJvb2xlYW5cclxuICAgKi9cclxuICBpc1N1aXRhYmxlKGRhdGEsIHRpbWUpIHtcclxuICAgIHJldHVybiB0aGlzLnJpZ2h0VGltZSh0aW1lKSAmJiB0aGlzLnJpZ2h0RGF0YShkYXRhKTtcclxuICB9XHJcblxyXG4gIHJpZ2h0RGF0YShkYXRhID0gW10pIHtcclxuICAgIHJldHVybiB0aGlzLnRvb2xzLmV2ZXJ5KHRvb2wgPT4ge1xyXG4gICAgICAvLyDQldGB0LvQuCDRgdGA0LXQtNC4INC/0L7Qu9GD0YfQtdC90L3Ri9GFINC40YLQtdC80L7QsiDQvdC10YIsINGC0L7Qs9C+INC60L7RgtC+0YDRi9C5INC10YHRgtGMINCyINC00LDQvdC90L7QvCDRjdC60YjQtdC90LVcclxuICAgICAgY29uc3QgY2hlY2tUb29sID0gZGF0YS5maW5kKG9iaiA9PiBvYmouaWQgPT0gdG9vbC5pZCk7XHJcbiAgICAgIGlmICghY2hlY2tUb29sKSB7IHJldHVybiBmYWxzZTsgfVxyXG5cclxuICAgICAgaWYgKHRvb2wudHlwZSA9PT0gJ3N3aXRjaCcpIHsgcmV0dXJuIGNoZWNrVG9vbC52YWx1ZSA9PT0gdG9vbC5ib29sVmFsdWU7IH1cclxuXHJcbiAgICAgIGlmICh0b29sLnR5cGUgPT09ICdyYW5nZScpIHsgcmV0dXJuIHRoaXMuaW5jbHVkZXNWYWx1ZShjaGVja1Rvb2wudmFsdWUsIFsgdG9vbC5taW5WYWx1ZSwgdG9vbC5tYXhWYWx1ZSBdKSB9XHJcblxyXG4gICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIGluY2x1ZGVzVmFsdWUodmFsdWUsIGJvcmRlcnMpIHtcclxuICAgIGlmICh0eXBlb2YgdmFsdWUgIT09ICdudW1iZXInKSB0aHJvdyBuZXcgVHlwZUVycm9yKCdWYWx1ZSBzaG91bGQgYmUgaW50ZWdlcicpO1xyXG4gICAgcmV0dXJuICh2YWx1ZSA+PSBib3JkZXJzWzBdKSAmJiAodmFsdWUgPD0gYm9yZGVyc1sxXSk7XHJcbiAgfVxyXG5cclxuICByaWdodFRpbWUodGltZSkge1xyXG4gICAgaWYgKHR5cGVvZiB0aW1lICE9PSAnbnVtYmVyJykgdGhyb3cgbmV3IFR5cGVFcnJvcignVGltZSBzaG91bGQgYmUgaW50ZWdlciAobXMpJyk7XHJcbiAgICByZXR1cm4gKHRpbWUgPj0gdGhpcy5taW5UaW1lKSAmJiAodGltZSA8PSB0aGlzLm1heFRpbWUpO1xyXG4gIH1cclxuXHJcbiAgaW5pdFRvb2xzKHRvb2xzKSB7XHJcbiAgICByZXR1cm4gdG9vbHMubWFwKHRvb2wgPT4ge1xyXG4gICAgICByZXR1cm4ge1xyXG4gICAgICAgIGlkOiB0b29sLmlkLFxyXG4gICAgICAgIHR5cGU6IHRvb2wudHlwZSxcclxuICAgICAgICBtaW5WYWx1ZTogdG9vbC5BY3Rpb25Ub29sLm1pblZhbHVlLFxyXG4gICAgICAgIG1heFZhbHVlOiB0b29sLkFjdGlvblRvb2wubWF4VmFsdWUsXHJcbiAgICAgICAgYm9vbFZhbHVlOiB0b29sLkFjdGlvblRvb2wuYm9vbFZhbHVlXHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG4gIH1cclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgQWN0aW9uO1xyXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9sZWFybmluZy9tb2RlbF9jb21wb25lbnRzL2FjdGlvbi5qcyIsImNsYXNzIEV2ZW50IHtcclxuICBjb25zdHJ1Y3RvcihkYXRhKSB7XHJcbiAgICB0aGlzLmlkID0gZGF0YS5pZDtcclxuICAgIHRoaXMubmFtZSA9IGRhdGEubmFtZTtcclxuICAgIHRoaXMuZGVzY3JpcHRpb24gPSBkYXRhLmRlc2NyaXB0aW9uO1xyXG4gIH1cclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgRXZlbnQ7XHJcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2xlYXJuaW5nL21vZGVsX2NvbXBvbmVudHMvZXZlbnQuanMiLCJpbXBvcnQgRXZlbnQgZnJvbSAnLi9ldmVudCcgO1xyXG5pbXBvcnQgQWN0aW9uIGZyb20gJy4vYWN0aW9uJztcclxuXHJcbmNsYXNzIFN0YXRlIHtcclxuICBjb25zdHJ1Y3RvcihkYXRhKSB7XHJcbiAgICB0aGlzLmlkID0gZGF0YS5pZDtcclxuICAgIHRoaXMubmFtZSA9IGRhdGEubmFtZTtcclxuICAgIHRoaXMuaW1nID0gZGF0YS5pbWc7XHJcbiAgICB0aGlzLnBhcmFtcyA9IGRhdGEucGFyYW1zO1xyXG5cclxuICAgIGlmKGRhdGEubGFzdCkge1xyXG4gICAgICB0aGlzLmxhc3QgPSB0cnVlO1xyXG4gICAgICB0aGlzLmV2ZW50ID0gbnVsbDtcclxuICAgICAgdGhpcy5hY3Rpb25zID0gbnVsbDtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHRoaXMuZXZlbnQgPSBuZXcgRXZlbnQoZGF0YS5ldmVudCk7XHJcbiAgICAgIHRoaXMuYWN0aW9ucyA9IGRhdGEuYWN0aW9ucy5tYXAoYWN0aW9uID0+IG5ldyBBY3Rpb24oYWN0aW9uKSk7XHJcbiAgICAgIHRoaXMubGFzdCA9IGZhbHNlO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgZ2V0SW5hY3RpdmVUaW1lKCkge1xyXG4gICAgY29uc3QgdGltZXMgPSB0aGlzLmdldEFsbEFjdGlvblRpbWVzKCk7XHJcbiAgICByZXR1cm4gTWF0aC5tYXgoLi4udGltZXMpO1xyXG4gIH1cclxuXHJcbiAgZ2V0SW5hY3RpdmVBY3Rpb24oKSB7XHJcbiAgICByZXR1cm4gdGhpcy5hY3Rpb25zLmZpbmQoYWN0aW9uID0+IGFjdGlvbi5pbmFjdGl2ZSA9PT0gdHJ1ZSk7XHJcbiAgfVxyXG5cclxuICBnZXRBbGxBY3Rpb25UaW1lcygpIHtcclxuICAgIHJldHVybiB0aGlzLmFjdGlvbnMubWFwKGFjdGlvbiA9PiBhY3Rpb24ubWF4VGltZSB8fCAwKTtcclxuICB9XHJcblxyXG4gIGhhbmRsZUlucHV0KGRhdGEsIHRpbWUpIHtcclxuICAgIGNvbnN0IHN1aXRlZEFjdGlvbnMgPSB0aGlzLmFjdGlvbnMuZmlsdGVyKGFjdGlvbiA9PiBhY3Rpb24uaXNTdWl0YWJsZShkYXRhLCB0aW1lKSk7XHJcbiAgICBpZiAoc3VpdGVkQWN0aW9ucy5sZW5ndGggPiAwKSB7XHJcbiAgICAgIHJldHVybiBzdWl0ZWRBY3Rpb25zWzBdLm5leHRTdGF0ZTtcclxuICAgIH1cclxuICAgIHJldHVybiBudWxsO1xyXG4gIH1cclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgU3RhdGU7XHJcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2xlYXJuaW5nL21vZGVsX2NvbXBvbmVudHMvc3RhdGUuanMiLCJpbXBvcnQgYWpheCBmcm9tICcuLi91dGlscy9hamF4JztcclxuXHJcbmNvbnN0IFJFUE9SVF9VUkwgPSAnL2xlYXJuaW5nL3JlcG9ydCc7XHJcbmNvbnN0IGFqYXhDb25maWcgPSB7XHJcbiAgbWV0aG9kOiAnUE9TVCcsXHJcbiAgaGVhZGVyczoge1xyXG4gICAgJ0NvbnRlbnQtdHlwZSc6ICdhcHBsaWNhdGlvbi9qc29uJ1xyXG4gIH1cclxufVxyXG5cclxuY2xhc3MgUmVwb3J0IHtcclxuICBjb25zdHJ1Y3RvcihuYW1lLCBzdGVwcykge1xyXG4gICAgdGhpcy5tb2RlbE5hbWUgPSBuYW1lO1xyXG4gICAgdGhpcy5tYXhTdGVwcyA9IHN0ZXBzO1xyXG4gICAgdGhpcy5zdGF0ZXMgPSBbXTtcclxuICAgIHRoaXMuY3VycmVudFN0YXRlID0gbnVsbDtcclxuICB9XHJcblxyXG4gIHB1c2hTdGF0ZShzdGF0ZSkge1xyXG4gICAgY29uc3QgeyBuYW1lIH0gPSBzdGF0ZTtcclxuICAgIGNvbnN0IG1heFRpbWUgPSBzdGF0ZS5sYXN0ID8gLTEgOiBzdGF0ZS5nZXRJbmFjdGl2ZVRpbWUoKTtcclxuICAgIGNvbnN0IHNwZW50VGltZSA9IG1heFRpbWU7XHJcbiAgICBjb25zdCBpbmFjdGl2ZSA9IHRydWU7XHJcbiAgICBjb25zdCBhY3Rpb25zTnVtYmVyID0gMDtcclxuICAgIHRoaXMuc3RhdGVzLnB1c2goeyBuYW1lLCBtYXhUaW1lLCBpbmFjdGl2ZSwgYWN0aW9uc051bWJlciwgc3BlbnRUaW1lIH0pO1xyXG4gICAgdGhpcy5jdXJyZW50U3RhdGUgPSB0aGlzLnN0YXRlc1t0aGlzLnN0YXRlcy5sZW5ndGggLSAxXTtcclxuICB9XHJcblxyXG4gIGluY3JlYXNlQWN0aW9uc051bWJlcigpIHtcclxuICAgIHRoaXMuY3VycmVudFN0YXRlLmFjdGlvbnNOdW1iZXIrKztcclxuICB9XHJcblxyXG4gIHNldFNwZW50VGltZSh0aW1lKSB7XHJcbiAgICB0aGlzLmN1cnJlbnRTdGF0ZS5zcGVudFRpbWUgPSB0aW1lO1xyXG4gICAgdGhpcy5zZXRJbmFjdGl2ZShmYWxzZSk7XHJcbiAgfVxyXG5cclxuICBzZXRJbmFjdGl2ZSh2YWx1ZSkge1xyXG4gICAgdGhpcy5jdXJyZW50U3RhdGUuaW5hY3RpdmUgPSB2YWx1ZTtcclxuICB9XHJcblxyXG4gIHNlbmQoKSB7XHJcbiAgICBpZiAodGhpcy5zdGF0ZXMubGVuZ3RoID4gMSkge1xyXG4gICAgICAvLyByZW1vdmUgbGFzdCBzdGF0ZSAtIHVzZXIgY2FuJ3QgbWFrZSBhbnkgYWN0aW9uXHJcbiAgICAgIHRoaXMuc3RhdGVzID0gdGhpcy5zdGF0ZXMuc2xpY2UoMCwgLTEpO1xyXG4gICAgfVxyXG4gICAgYWpheENvbmZpZy5kYXRhID0gSlNPTi5zdHJpbmdpZnkoe1xyXG4gICAgICBtb2RlbE5hbWU6IHRoaXMubW9kZWxOYW1lLFxyXG4gICAgICBtYXhTdGVwczogdGhpcy5tYXhTdGVwcyxcclxuICAgICAgc3RhdGVzOiB0aGlzLnN0YXRlc1xyXG4gICAgfSk7XHJcbiAgICByZXR1cm4gYWpheChSRVBPUlRfVVJMLCBhamF4Q29uZmlnKTtcclxuICB9XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IFJlcG9ydDtcclxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vbGVhcm5pbmcvcmVwb3J0LmpzIiwiaW1wb3J0IG5vZGVGYWN0b3J5IGZyb20gJy4uLy4uL3V0aWxzL25vZGVGYWN0b3J5JztcclxuaW1wb3J0IHRpbWVyIGZyb20gJy4uLy4uL3V0aWxzL3RpbWVyJztcclxuXHJcbmNvbnN0ICRuYW1lID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLm1vZGVsLXN0YXRlLW5hbWUnKTtcclxuY29uc3QgJGltZyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5tb2RlbC1zdGF0ZS1pbWcnKTtcclxuY29uc3QgJHBhcmFtcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5tb2RlbC1wYXJhbXMtdmFsdWVzJyk7XHJcblxyXG5jb25zdCAkZXZlbnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcubW9kZWwtZXZlbnQnKTtcclxuY29uc3QgJGV2ZW50SGVhZGVyID0gJGV2ZW50LnF1ZXJ5U2VsZWN0b3IoJy5tb2RlbC1ldmVudC1uYW1lIHNwYW4nKTtcclxuY29uc3QgJGV2ZW50Qm9keSA9ICRldmVudC5xdWVyeVNlbGVjdG9yKCcubW9kZWwtZXZlbnQtaW5mbycpO1xyXG5cclxuY29uc3QgJHRpbWVyQ29udGFpbmVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLm1vZGVsLXRpbWVyJyk7XHJcbiR0aW1lckNvbnRhaW5lci5hcHBlbmRDaGlsZCh0aW1lci5ub2RlKTtcclxuXHJcbmZ1bmN0aW9uIHNldCh7IG5hbWUsIGltZywgcGFyYW1zIH0pIHtcclxuICAkbmFtZS50ZXh0Q29udGVudCA9IG5hbWU7XHJcbiAgJGltZy5zZXRBdHRyaWJ1dGUoJ3NyYycsIGltZyk7XHJcbiAgc2V0UGFyYW1ldGVycyhwYXJhbXMpO1xyXG59XHJcblxyXG5mdW5jdGlvbiBzZXRQYXJhbWV0ZXJzKHBhcmFtcyA9IFtdKSB7XHJcbiAgY29uc3QgZnJhZyA9IGRvY3VtZW50LmNyZWF0ZURvY3VtZW50RnJhZ21lbnQoKTtcclxuICBwYXJhbXMuZm9yRWFjaChwYXJhbSA9PiBmcmFnLmFwcGVuZENoaWxkKGNyZWF0ZVBhcmFtZXRlTm9kZShwYXJhbS5uYW1lLCBwYXJhbS52YWx1ZSkpKTtcclxuXHJcbiAgJHBhcmFtcy5pbm5lckhUTUwgPSBcIlwiO1xyXG4gICRwYXJhbXMuYXBwZW5kQ2hpbGQoZnJhZyk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGNyZWF0ZVBhcmFtZXRlTm9kZShrZXksIHZhbHVlKSB7XHJcbiAgY29uc3QgZGl2ID0gbm9kZUZhY3RvcnkoJ2RpdicsIHsgY2xhc3NMaXN0OiBbJ3BhcmFtZXRlciddIH0pO1xyXG5cclxuICBjb25zdCBrZXlTcGFuID0gbm9kZUZhY3RvcnkoJ3NwYW4nLCB7IHRleHRDb250ZW50OiBrZXkgfSk7XHJcbiAgZGl2LmFwcGVuZENoaWxkKGtleVNwYW4pO1xyXG5cclxuICBjb25zdCB2YWx1ZVNwYW4gPSBub2RlRmFjdG9yeSgnc3BhbicsIHsgdGV4dENvbnRlbnQ6IHZhbHVlIH0pO1xyXG4gIGRpdi5hcHBlbmRDaGlsZCh2YWx1ZVNwYW4pO1xyXG5cclxuICByZXR1cm4gZGl2O1xyXG59XHJcblxyXG5cclxuLyoqIFNldHMgZXZlbnQgZGF0YSB0byBVSSAqL1xyXG5mdW5jdGlvbiBzaG93RXZlbnQoZXZlbnQpIHtcclxuICAkZXZlbnRIZWFkZXIudGV4dENvbnRlbnQgPSBldmVudC5uYW1lO1xyXG4gICRldmVudEJvZHkudGV4dENvbnRlbnQgPSBldmVudC5kZXNjcmlwdGlvbjtcclxuICAkZXZlbnQuY2xhc3NMaXN0LnJlbW92ZSgnaXMtaGlkZGVuJywgJ3NsaWRlLXRvcCcpO1xyXG4gIHNob3dUaW1lcigpO1xyXG59XHJcbmZ1bmN0aW9uIGhpZGVFdmVudCgpIHtcclxuICAkZXZlbnQuY2xhc3NMaXN0LmFkZCgnaXMtaGlkZGVuJywgJ3NsaWRlLXRvcCcpO1xyXG4gIGhpZGVUaW1lcigpO1xyXG59XHJcblxyXG5mdW5jdGlvbiBzaG93VGltZXIoKSB7XHJcbiAgJHRpbWVyQ29udGFpbmVyLmNsYXNzTGlzdC5yZW1vdmUoJ2lzLWhpZGRlbicpO1xyXG4gIHRpbWVyLnN0YXJ0KCk7XHJcbn1cclxuZnVuY3Rpb24gaGlkZVRpbWVyKCkge1xyXG4gICR0aW1lckNvbnRhaW5lci5jbGFzc0xpc3QuYWRkKCdpcy1oaWRkZW4nKTtcclxuICB0aW1lci5zdG9wKCk7XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IHtcclxuICBzZXQsXHJcbiAgc2hvd0V2ZW50LFxyXG4gIGhpZGVFdmVudFxyXG59XHJcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2xlYXJuaW5nL3NjZW5lX2NvbXBvbmVudHMvc3RhdGUuanMiLCJpbXBvcnQgbm9kZUZhY3RvcnkgZnJvbSAnLi4vLi4vdXRpbHMvbm9kZUZhY3RvcnknO1xyXG5cclxuY29uc3QgdG9vbFR5cGVzID0ge1xyXG4gIFJBTkdFOiAncmFuZ2UnLFxyXG4gIFNXSVRDSDogJ3N3aXRjaCdcclxufVxyXG5jb25zdCAkdG9vbHMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcudG9vbHMtbGlzdCcpO1xyXG5cclxuZnVuY3Rpb24gaW5pdCh0b29scykge1xyXG4gIGNvbnN0IGZyYWdtZW50ID0gZG9jdW1lbnQuY3JlYXRlRG9jdW1lbnRGcmFnbWVudCgpO1xyXG5cclxuICB0b29scy5mb3JFYWNoKHRvb2wgPT4ge1xyXG4gICAgLy8gY3JlYXRlIHRvb2wgd3JhcHBlclxyXG4gICAgY29uc3QgZGl2ID0gbm9kZUZhY3RvcnkoJ2RpdicsIHsgY2xhc3NMaXN0OiBbJ3Rvb2wnXSB9KTtcclxuXHJcbiAgICBjb25zdCBsYWJlbCA9IG5vZGVGYWN0b3J5KCdsYWJlbCcsIHtcclxuICAgICAgY2xhc3NMaXN0OiBbJ3Rvb2wtbmFtZSddLFxyXG4gICAgICBhdHRyczogeyBcImZvclwiOiB0b29sLm5hbWUgfSxcclxuICAgICAgdGV4dENvbnRlbnQ6IHRvb2wubmFtZVxyXG4gICAgfSk7XHJcbiAgICBkaXYuYXBwZW5kQ2hpbGQobGFiZWwpO1xyXG5cclxuICAgIGNvbnN0IHRvb2xOb2RlID0gY3JlYXRlVG9vbE5vZGUodG9vbCk7XHJcbiAgICBkaXYuYXBwZW5kQ2hpbGQodG9vbE5vZGUpO1xyXG5cclxuICAgIGZyYWdtZW50LmFwcGVuZENoaWxkKGRpdik7XHJcbiAgfSk7XHJcblxyXG4gICR0b29scy5pbm5lckhUTUwgPSBcIlwiO1xyXG4gICR0b29scy5hcHBlbmRDaGlsZChmcmFnbWVudCk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGNyZWF0ZVRvb2xOb2RlKHRvb2wpIHtcclxuICBzd2l0Y2godG9vbC50eXBlKSB7XHJcbiAgICBjYXNlIHRvb2xUeXBlcy5SQU5HRTogICByZXR1cm4gY3JlYXRlUmFuZ2VUb29sKHRvb2wpO1xyXG4gICAgY2FzZSB0b29sVHlwZXMuU1dJVENIOiAgcmV0dXJuIGNyZWF0ZVN3aXRjaFRvb2wodG9vbCk7XHJcbiAgICBkZWZhdWx0OiAgICAgICAgICAgICAgICByZXR1cm4gJ9Cd0LXQuNC30LLQtdGB0YLQvdGL0Lkg0L/RgNC40LHQvtGAJztcclxuICB9XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGNyZWF0ZVJhbmdlVG9vbCh0b29sKSB7XHJcbiAgY29uc3QgZGl2SW5wdXQgPSBub2RlRmFjdG9yeSgnZGl2JywgeyBjbGFzc0xpc3Q6IFsncmFuZ2UnXSB9KTtcclxuXHJcbiAgY29uc3Qgc3Bhbk1pbiA9IG5vZGVGYWN0b3J5KCdzcGFuJywgeyB0ZXh0Q29udGVudDogdG9vbC5taW4gfSk7XHJcbiAgZGl2SW5wdXQuYXBwZW5kQ2hpbGQoc3Bhbk1pbilcclxuXHJcbiAgY29uc3QgaW5wdXQgPSBub2RlRmFjdG9yeSgnaW5wdXQnLCB7XHJcbiAgICBhdHRyczoge1xyXG4gICAgICAnZGF0YS1pZCc6IHRvb2wuaWQsXHJcbiAgICAgICdkYXRhLXR5cGUnOiAncmFuZ2UnLFxyXG4gICAgICAnbmFtZSc6IHRvb2wubmFtZSxcclxuICAgICAgJ3R5cGUnOiAncmFuZ2UnLFxyXG4gICAgICAnbWluJzogdG9vbC5taW4sXHJcbiAgICAgICdtYXgnOiB0b29sLm1heFxyXG4gICAgfVxyXG4gIH0pO1xyXG4gIGRpdklucHV0LmFwcGVuZENoaWxkKGlucHV0KTtcclxuXHJcbiAgY29uc3Qgc3Bhbk1heCA9IG5vZGVGYWN0b3J5KCdzcGFuJywgeyB0ZXh0Q29udGVudDogdG9vbC5tYXggfSk7XHJcbiAgZGl2SW5wdXQuYXBwZW5kQ2hpbGQoc3Bhbk1heCk7XHJcblxyXG4gIGNvbnN0IGRpdkN1cnJlbnQgPSBub2RlRmFjdG9yeSgnZGl2JywgeyBjbGFzc0xpc3Q6IFsncmFuZ2UtY3VycmVudC12YWx1ZSddIH0pO1xyXG4gIGNvbnN0IHNwYW5DdXJyZW50ID0gbm9kZUZhY3RvcnkoJ3NwYW4nLCB7IHRleHRDb250ZW50OiBpbnB1dC52YWx1ZSB9KTtcclxuICBkaXZDdXJyZW50LmFwcGVuZENoaWxkKHNwYW5DdXJyZW50KTtcclxuXHJcbiAgaW5wdXQuYWRkRXZlbnRMaXN0ZW5lcignaW5wdXQnLCAoZXZ0KSA9PiB7XHJcbiAgICBzcGFuQ3VycmVudC50ZXh0Q29udGVudCA9IGV2dC50YXJnZXQudmFsdWU7XHJcbiAgfSk7XHJcblxyXG4gIGNvbnN0IGZyYWdtZW50ID0gZG9jdW1lbnQuY3JlYXRlRG9jdW1lbnRGcmFnbWVudCgpO1xyXG4gIGZyYWdtZW50LmFwcGVuZENoaWxkKGRpdklucHV0KTtcclxuICBmcmFnbWVudC5hcHBlbmRDaGlsZChkaXZDdXJyZW50KTtcclxuXHJcbiAgcmV0dXJuIGZyYWdtZW50O1xyXG59XHJcblxyXG5mdW5jdGlvbiBjcmVhdGVTd2l0Y2hUb29sKHRvb2wpIHtcclxuICBjb25zdCBsYWJlbCA9IG5vZGVGYWN0b3J5KCdsYWJlbCcsIHsgY2xhc3NMaXN0OiBbJ3N3aXRjaCddIH0pO1xyXG5cclxuICBjb25zdCBpbnB1dCA9IG5vZGVGYWN0b3J5KCdpbnB1dCcsIHtcclxuICAgIGF0dHJzOiB7XHJcbiAgICAgICdkYXRhLWlkJzogdG9vbC5pZCxcclxuICAgICAgJ2RhdGEtdHlwZSc6ICdzd2l0Y2gnLFxyXG4gICAgICAndHlwZSc6ICdjaGVja2JveCdcclxuICAgIH1cclxuICB9KTtcclxuICBsYWJlbC5hcHBlbmRDaGlsZChpbnB1dCk7XHJcblxyXG4gIGNvbnN0IGRpdiA9IG5vZGVGYWN0b3J5KCdkaXYnLCB7IGNsYXNzTGlzdDogWydzbGlkZXInXSB9KTtcclxuICBsYWJlbC5hcHBlbmRDaGlsZChkaXYpO1xyXG5cclxuICByZXR1cm4gbGFiZWw7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGdldFRvb2xzRGF0YSgpIHtcclxuICBjb25zdCB0b29sc0RhdGEgPSBbXTtcclxuICBjb25zdCBpbnB1dHMgPSAkdG9vbHMucXVlcnlTZWxlY3RvckFsbCgnaW5wdXRbZGF0YS1pZF0nKTtcclxuICBpbnB1dHMuZm9yRWFjaChpbnB1dCA9PiB7XHJcbiAgICBjb25zdCB7IGlkLCB0eXBlIH0gPSBpbnB1dC5kYXRhc2V0O1xyXG4gICAgbGV0IHZhbHVlO1xyXG4gICAgc3dpdGNoKHR5cGUpIHtcclxuICAgICAgY2FzZSB0b29sVHlwZXMuUkFOR0U6IHZhbHVlID0gcGFyc2VJbnQoaW5wdXQudmFsdWUpOyBicmVhaztcclxuICAgICAgY2FzZSB0b29sVHlwZXMuU1dJVENIOiB2YWx1ZSA9IGlucHV0LmNoZWNrZWQ7IGJyZWFrO1xyXG4gICAgICBkZWZhdWx0OiB0aHJvdyBuZXcgRXJyb3IoYNCd0LXQutC+0YDRgNC10LrRgtC90YvQuSDRgtC40L8g0L/RgNC40LHQvtGA0LAuIElEOiAke2lkfWApO1xyXG4gICAgfVxyXG4gICAgdG9vbHNEYXRhLnB1c2goeyBpZCwgdmFsdWUgfSk7XHJcbiAgfSk7XHJcbiAgcmV0dXJuIHRvb2xzRGF0YTtcclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQge1xyXG4gIGluaXQsXHJcbiAgZ2V0VG9vbHNEYXRhXHJcbn07XHJcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2xlYXJuaW5nL3NjZW5lX2NvbXBvbmVudHMvdG9vbHMuanMiLCJpbXBvcnQgbm9kZUZhY3RvcnkgZnJvbSAnLi9ub2RlRmFjdG9yeSc7XHJcblxyXG5mdW5jdGlvbiBtc1RvQ29udGVudChtcykge1xyXG4gIGNvbnN0IHNlY29uZHMgPSBNYXRoLnJvdW5kKG1zIC8gMTAwMCk7XHJcbiAgY29uc3QgbWlucyA9IE1hdGguZmxvb3Ioc2Vjb25kcyAvIDYwKTtcclxuICBjb25zdCBzZWNvbmRzTGVmdCA9IHNlY29uZHMgLSAobWlucyAqIDYwKTtcclxuXHJcbiAgcmV0dXJuIGAke21pbnN9OiR7c2Vjb25kc0xlZnQgPj0gMTAgPyAnJyA6ICcwJ30ke3NlY29uZHNMZWZ0fWA7XHJcbn1cclxuXHJcbmNvbnN0IHRpbWVyID0ge1xyXG4gIHN0YXJ0VGltZTogbnVsbCxcclxuICBpbnRlcnZhbDogbnVsbCxcclxuICBub2RlOiBub2RlRmFjdG9yeSgnc3BhbicsIHsgY2xhc3NMaXN0OiBbJ3RpbWVyJ10sIHRleHRDb250ZW50OiAnMDowMCcgfSksXHJcbiAgc3RhcnQ6IGZ1bmN0aW9uKCkge1xyXG4gICAgdGhpcy5zdGFydFRpbWUgPSBEYXRlLm5vdygpO1xyXG4gICAgdGhpcy5pbnRlcnZhbCA9IHNldEludGVydmFsKCgpID0+IHtcclxuICAgICAgY29uc3QgZWxhcHNlZCA9IERhdGUubm93KCkgLSB0aGlzLnN0YXJ0VGltZTtcclxuICAgICAgdGhpcy5ub2RlLnRleHRDb250ZW50ID0gbXNUb0NvbnRlbnQoZWxhcHNlZCk7XHJcbiAgICB9LCAxMDAwKTtcclxuICB9LFxyXG4gIHN0b3A6IGZ1bmN0aW9uKCkge1xyXG4gICAgaWYgKCF0aGlzLnN0YXJ0VGltZSkgeyByZXR1cm47IH1cclxuICAgIHRoaXMuc3RhcnRUaW1lID0gbnVsbDtcclxuICAgIGNsZWFySW50ZXJ2YWwodGhpcy5pbnRlcnZhbCk7XHJcbiAgICB0aGlzLm5vZGUudGV4dENvbnRlbnQgPSAnMDowMCc7XHJcbiAgfVxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCB0aW1lcjtcclxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vdXRpbHMvdGltZXIuanMiLCJpbXBvcnQgJy4uLy4uL3Nhc3MvbGVhcm5pbmcuc2Nzcyc7XHJcblxyXG5pbXBvcnQgcHVic3ViIGZyb20gJy4uL3V0aWxzL3B1YnN1Yic7XHJcbmltcG9ydCBhamF4IGZyb20gJy4uL3V0aWxzL2FqYXgnO1xyXG5pbXBvcnQgc2NlbmUgZnJvbSAnLi9zY2VuZSc7XHJcbmltcG9ydCBNb2RlbCBmcm9tICcuL21vZGVsJztcclxuXHJcbi8qKlxyXG4gKiBMb2FkIG1vZGVsIHdpdGggZ2l2ZW4gaWRcclxuICovXHJcbmZ1bmN0aW9uIGxvYWRNb2RlbChpZCkge1xyXG4gIHJldHVybiBhamF4KGAvbW9kZWxzLyR7aWR9YCkudGhlbihyZXNwb25zZSA9PiBKU09OLnBhcnNlKHJlc3BvbnNlKSk7XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBVSSBidXR0b24ncyBoYW5kbGVyc1xyXG4gKi9cclxuY29uc3QgJHNlbGVjdCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjbW9kZWwtc2VsZWN0XCIpO1xyXG5jb25zdCAkbG9hZEJ1dHRvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNsb2FkLW1vZGVsLWJ0bicpO1xyXG5cclxubGV0IG1vZGVsID0gbnVsbDtcclxuXHJcbiRsb2FkQnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xyXG4gIGlmICggbW9kZWwgKSB7IG1vZGVsLnN0b3AoKTsgfVxyXG4gIGNvbnN0IG1vZGVsSWQgPSAkc2VsZWN0LnZhbHVlO1xyXG4gIGxvYWRNb2RlbChtb2RlbElkKVxyXG4gICAgLnRoZW4ocmVzcG9uc2UgPT4ge1xyXG4gICAgICBtb2RlbCA9IG5ldyBNb2RlbChyZXNwb25zZSk7XHJcbiAgICAgIHNjZW5lLmluaXQobW9kZWwsIHJlc3BvbnNlKVxyXG4gICAgICAgIC5zaG93Q29udGVudCgpXHJcbiAgICAgICAgLmVuYWJsZUJ1dHRvbnMoJHN0YXJ0QnV0dG9uKVxyXG4gICAgICAgIC5kaXNhYmxlQnV0dG9ucygkc3RvcEJ1dHRvbiwgJHJ1bkJ1dHRvbik7XHJcbiAgICB9KVxyXG4gICAgLmNhdGNoKGVyciA9PiB7IGNvbnNvbGUuZXJyb3IoZXJyKSB9KTtcclxufSk7XHJcbi8vXHJcbmNvbnN0ICRzdGFydEJ1dHRvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNzdGFydC1idG4nKTtcclxuJHN0YXJ0QnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xyXG4gIG1vZGVsLnN0YXJ0KCk7XHJcbiAgc2NlbmUuZGlzYWJsZUJ1dHRvbnMoJHN0YXJ0QnV0dG9uKTtcclxuICBzY2VuZS5lbmFibGVCdXR0b25zKCRzdG9wQnV0dG9uLCAkcnVuQnV0dG9uKTtcclxufSk7XHJcblxyXG5jb25zdCAkc3RvcEJ1dHRvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNzdG9wLWJ0bicpO1xyXG4kc3RvcEJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcclxuICBwdWJzdWIucHVibGlzaCgnbW9kZWxfc3RvcCcpO1xyXG4gIHNjZW5lLmVuYWJsZUJ1dHRvbnMoJHN0YXJ0QnV0dG9uKTtcclxuICBzY2VuZS5kaXNhYmxlQnV0dG9ucygkc3RvcEJ1dHRvbiwgJHJ1bkJ1dHRvbik7XHJcbn0pO1xyXG5cclxuY29uc3QgJHJ1bkJ1dHRvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNydW4tYnRuJyk7XHJcbiRydW5CdXR0b24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XHJcbiAgY29uc3QgdG9vbHNEYXRhID0gc2NlbmUuZ2V0VG9vbHNEYXRhKCk7XHJcbiAgcHVic3ViLnB1Ymxpc2goJ3VzZXJfaW5wdXQnLCB0b29sc0RhdGEpO1xyXG59KTtcclxuXHJcbi8qKlxyXG4gKiBIYW5kbGUgY3VzdG9tIGV2ZW50cyBoZXJlICh1c2VyIGlucHV0LCBwcm9ncmFtbSBtZXNzYWdlcyBldGMuKVxyXG4gKi9cclxucHVic3ViLnN1YnNjcmliZSgnbmV3X3N0YXRlJywgc3RhdGUgPT4ge1xyXG4gIHNjZW5lLmhpZGVFdmVudCgpO1xyXG4gIHNjZW5lLnNldFN0YXRlKHN0YXRlKTtcclxufSk7XHJcbnB1YnN1Yi5zdWJzY3JpYmUoJ2V2ZW50JywgZXZlbnQgPT4gc2NlbmUuc2hvd0V2ZW50KGV2ZW50KSk7XHJcblxyXG4vLyAvKipcclxuLy8gKiBUaW1lciAoY3VycmVudGx5IGZvciBkZXYgbW9kZSBvbmx5KVxyXG4vLyAqL1xyXG4vLyBpbXBvcnQgdGltZXIgZnJvbSAnLi4vdXRpbHMvdGltZXInO1xyXG4vLyBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuaGVhZGVyJykuYXBwZW5kQ2hpbGQodGltZXIubm9kZSk7XHJcbi8vIHB1YnN1Yi5zdWJzY3JpYmUoJ25ld19zdGF0ZScsIHN0YXRlID0+IHRpbWVyLnN0b3AoKSk7XHJcbi8vIHB1YnN1Yi5zdWJzY3JpYmUoJ2V2ZW50JywgZXZlbnQgPT4gdGltZXIuc3RhcnQoKSk7XHJcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2xlYXJuaW5nL2luZGV4LmpzIl0sInNvdXJjZVJvb3QiOiIifQ==