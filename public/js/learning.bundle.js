/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
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
/******/ 	return __webpack_require__(__webpack_require__.s = 36);
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
/* 6 */,
/* 7 */,
/* 8 */,
/* 9 */,
/* 10 */,
/* 11 */,
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _state = __webpack_require__(39);

var _state2 = _interopRequireDefault(_state);

var _pubsub = __webpack_require__(1);

var _pubsub2 = _interopRequireDefault(_pubsub);

var _report = __webpack_require__(40);

var _report2 = _interopRequireDefault(_report);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var INITIAL_STATE_NAME = 'Состояние модели';
var STOP_STATE_NAME = 'Обучение остановлено';

var Model = function () {
  function Model(data) {
    _classCallCheck(this, Model);

    this._id = data._id;
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
    this.startState = new _state2.default({ id: 0, name: INITIAL_STATE_NAME, img: { url: 'start.png' }, last: true });
    this.stopState = new _state2.default({ id: -1, name: STOP_STATE_NAME, img: { url: 'stop.png' }, last: true });
  }

  _createClass(Model, [{
    key: 'getState',
    value: function getState(uuid) {
      return this.states.find(function (state) {
        return state.uuid === uuid;
      });
    }
  }, {
    key: 'start',
    value: function start() {
      var _this = this;

      // TODO: refactor
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
            if (nextState.last) {
              reject(nextState);
            } else {
              resolve(nextState);
            }
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
          if (nextState.last) {
            reject(nextState);
          } else {
            resolve(nextState);
          }
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
  }, {
    key: 'stop',
    value: function stop() {}
  }]);

  return Model;
}();

exports.default = Model;

/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _state = __webpack_require__(41);

var _state2 = _interopRequireDefault(_state);

var _tools = __webpack_require__(42);

var _tools2 = _interopRequireDefault(_tools);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _exports = {};

// Scene metadata
var $modelName = document.querySelector('.model-name');
_exports.init = function init(model, response) {
  $modelName.textContent = model.name;
  _state2.default.set(model.startState);
  _tools2.default.init(response.tools);
  return this;
};

// Manage content visibility
var $content = document.querySelector('.content');
_exports.showContent = function showContent() {
  setContentDisplay('flex');
  return this;
};
_exports.hideContent = function hideContent() {
  setContentDisplay('none');
  return this;
};
function setContentDisplay(display) {
  $content.style.display = display;
}

// Manage buttons state
_exports.enableButtons = function enableButtons() {
  for (var _len = arguments.length, buttons = Array(_len), _key = 0; _key < _len; _key++) {
    buttons[_key] = arguments[_key];
  }

  setButtonsState(buttons, false);
  return this;
};
_exports.disableButtons = function disableButtons() {
  for (var _len2 = arguments.length, buttons = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
    buttons[_key2] = arguments[_key2];
  }

  setButtonsState(buttons, true);
  return this;
};
function setButtonsState(buttons, value) {
  buttons.forEach(function (button) {
    button.disabled = value;
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
/* 14 */,
/* 15 */,
/* 16 */,
/* 17 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 18 */,
/* 19 */,
/* 20 */,
/* 21 */,
/* 22 */,
/* 23 */,
/* 24 */,
/* 25 */,
/* 26 */,
/* 27 */,
/* 28 */,
/* 29 */,
/* 30 */,
/* 31 */,
/* 32 */,
/* 33 */,
/* 34 */,
/* 35 */,
/* 36 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


__webpack_require__(17);

var _pubsub = __webpack_require__(1);

var _pubsub2 = _interopRequireDefault(_pubsub);

var _ajax = __webpack_require__(0);

var _ajax2 = _interopRequireDefault(_ajax);

var _scene = __webpack_require__(13);

var _scene2 = _interopRequireDefault(_scene);

var _model = __webpack_require__(12);

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
var $select = document.querySelector('#model-select');
var $loadButton = document.querySelector('#load-model-btn');
var $startButton = document.querySelector('#start-btn');
var $stopButton = document.querySelector('#stop-btn');
var $runButton = document.querySelector('#run-btn');

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

$startButton.addEventListener('click', function () {
  model.start();
  _scene2.default.disableButtons($startButton);
  _scene2.default.enableButtons($stopButton, $runButton);
});

$stopButton.addEventListener('click', function () {
  _pubsub2.default.publish('model_stop');
  _scene2.default.enableButtons($startButton);
  _scene2.default.disableButtons($stopButton, $runButton);
});

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

/***/ }),
/* 37 */
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

    this.time = data.time || {};
    this.nextState = data.nextState;
    if (data.inactive) {
      this.inactive = true;
      this.tools = [];
    } else {
      this.inactive = false;
      this.tools = this.initTools(data.tools);
    }
  }

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

      // TODO: refactor
      return this.tools.every(function (tool) {
        // Если среди полученных итемов нет, того который есть в данном экшене
        var receivedTool = data.find(function (obj) {
          return obj.uuid === tool.uuid;
        });
        if (!receivedTool) {
          return false;
        }

        if (tool.type === 'switch') {
          return receivedTool.value === tool.switchValue;
        }

        if (tool.type === 'range') {
          return _this.includesValue(receivedTool.value, [tool.rangeValues[0], tool.rangeValues[1]]);
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
      return time >= this.time.min && time <= this.time.max;
    }
  }, {
    key: 'initTools',
    value: function initTools(tools) {
      return tools.map(function (tool) {
        return {
          uuid: tool.uuid,
          type: tool.type,
          rangeValues: tool.rangeValues,
          switchValue: tool.switchValue
        };
      });
    }
  }]);

  return Action;
}();

exports.default = Action;

/***/ }),
/* 38 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Event = function Event(data) {
  _classCallCheck(this, Event);

  this._id = data._id;
  this.name = data.name;
  this.desc = data.desc;
};

exports.default = Event;

/***/ }),
/* 39 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _event = __webpack_require__(38);

var _event2 = _interopRequireDefault(_event);

var _action = __webpack_require__(37);

var _action2 = _interopRequireDefault(_action);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var State = function () {
  function State(data) {
    _classCallCheck(this, State);

    this._id = data._id;
    this.uuid = data.uuid;
    this.name = data.name;
    this.img = data.img;
    this.parameters = data.parameters;

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
      var times = this.actions.map(function (action) {
        return action.time.max || 0;
      });
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
/* 40 */
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

    this.model = name;
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
        model: this.model,
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
/* 41 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _nodeFactory = __webpack_require__(2);

var _nodeFactory2 = _interopRequireDefault(_nodeFactory);

var _timer = __webpack_require__(44);

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
      parameters = _ref.parameters;

  $name.textContent = name;
  $img.setAttribute('src', 'uploads/' + img.url);
  setParameters(parameters);
}

function setParameters() {
  var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];

  var frag = document.createDocumentFragment();
  params.forEach(function (param) {
    return frag.appendChild(createParameteNode(param.name, param.value));
  });

  $params.innerHTML = '';
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
  $eventBody.textContent = event.desc;
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
/* 42 */
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
      textContent: tool.name
    });
    div.appendChild(label);

    var toolNode = createToolNode(tool);
    div.appendChild(toolNode);

    fragment.appendChild(div);
  });

  $tools.innerHTML = '';
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

  var spanMin = (0, _nodeFactory2.default)('span', { textContent: tool.rangeValues.min });
  divInput.appendChild(spanMin);

  var input = (0, _nodeFactory2.default)('input', {
    attrs: {
      'data-uuid': tool.uuid,
      'data-type': 'range',
      name: tool.name,
      type: 'range',
      min: tool.rangeValues.min,
      max: tool.rangeValues.max,
      value: 0
    }
  });
  divInput.appendChild(input);

  var spanMax = (0, _nodeFactory2.default)('span', { textContent: tool.rangeValues.max });
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
      'data-uuid': tool.uuid,
      'data-type': 'switch',
      type: 'checkbox'
    }
  });
  label.appendChild(input);

  var div = (0, _nodeFactory2.default)('div', { classList: ['slider'] });
  label.appendChild(div);

  return label;
}

function getToolsData() {
  var toolsData = [];
  var inputs = $tools.querySelectorAll('input[data-uuid]');
  inputs.forEach(function (input) {
    var _input$dataset = input.dataset,
        uuid = _input$dataset.uuid,
        type = _input$dataset.type;

    var value = void 0;
    switch (type) {
      case toolTypes.RANGE:
        value = parseInt(input.value, 10);break;
      case toolTypes.SWITCH:
        value = input.checked;break;
      default:
        throw new Error('\u041D\u0435\u043A\u043E\u0440\u0440\u0435\u043A\u0442\u043D\u044B\u0439 \u0442\u0438\u043F \u043F\u0440\u0438\u0431\u043E\u0440\u0430. ID: ' + id);
    }
    toolsData.push({ uuid: uuid, value: value });
  });
  return toolsData;
}

exports.default = {
  init: init,
  getToolsData: getToolsData
};

/***/ }),
/* 43 */,
/* 44 */
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

/***/ })
/******/ ]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgYmQ3MzcwZGRhN2Q3MWQwNjU3OGM/NDNlZCIsIndlYnBhY2s6Ly8vLi91dGlscy9hamF4LmpzIiwid2VicGFjazovLy8uL3V0aWxzL3B1YnN1Yi5qcz9mY2VkIiwid2VicGFjazovLy8uL3V0aWxzL25vZGVGYWN0b3J5LmpzP2MxNWUiLCJ3ZWJwYWNrOi8vLy4vbGVhcm5pbmcvbW9kZWwuanMiLCJ3ZWJwYWNrOi8vLy4vbGVhcm5pbmcvc2NlbmUuanMiLCJ3ZWJwYWNrOi8vLy4uL3Nhc3MvbGVhcm5pbmcuc2NzcyIsIndlYnBhY2s6Ly8vLi9sZWFybmluZy9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9sZWFybmluZy9tb2RlbF9jb21wb25lbnRzL2FjdGlvbi5qcyIsIndlYnBhY2s6Ly8vLi9sZWFybmluZy9tb2RlbF9jb21wb25lbnRzL2V2ZW50LmpzIiwid2VicGFjazovLy8uL2xlYXJuaW5nL21vZGVsX2NvbXBvbmVudHMvc3RhdGUuanMiLCJ3ZWJwYWNrOi8vLy4vbGVhcm5pbmcvcmVwb3J0LmpzIiwid2VicGFjazovLy8uL2xlYXJuaW5nL3NjZW5lX2NvbXBvbmVudHMvc3RhdGUuanMiLCJ3ZWJwYWNrOi8vLy4vbGVhcm5pbmcvc2NlbmVfY29tcG9uZW50cy90b29scy5qcyIsIndlYnBhY2s6Ly8vLi91dGlscy90aW1lci5qcyJdLCJuYW1lcyI6WyJhamF4IiwicGF0aCIsIm9wdGlvbnMiLCJmdWxsUmVzcG9uc2UiLCJ4aHIiLCJYTUxIdHRwUmVxdWVzdCIsIm9wZW4iLCJtZXRob2QiLCJoZWFkZXJzIiwic2V0WEhSSGVhZGVycyIsInNlbmQiLCJkYXRhIiwiUHJvbWlzZSIsInJlc29sdmUiLCJyZWplY3QiLCJvbnJlYWR5c3RhdGVjaGFuZ2UiLCJyZWFkeVN0YXRlIiwic3RhdHVzIiwicmVzcG9uc2VUZXh0Iiwic3RhdHVzVGV4dCIsImhlYWRlciIsInNldFJlcXVlc3RIZWFkZXIiLCJwdWJzdWIiLCJ0b3BpY3MiLCJzdWJzY3JpYmUiLCJ0b3BpYyIsImxpc3RlbmVyIiwicXVldWUiLCJpbmRleCIsInB1c2giLCJyZW1vdmUiLCJwdWJsaXNoIiwiaW5mbyIsImxlbmd0aCIsIml0ZW1zIiwiZm9yRWFjaCIsIml0ZW0iLCJub2RlRmFjdG9yeSIsInR5cGUiLCJwYXJhbXMiLCJub2RlIiwiZG9jdW1lbnQiLCJjcmVhdGVFbGVtZW50IiwiYXBwZW5kQ2xhc3NlcyIsImFwcGVuZEF0dHJzIiwiaW5zZXJ0VGV4dENvbnRlbnQiLCJjbGFzc0xpc3QiLCJhZGQiLCJjbGFzc05hbWUiLCJhdHRycyIsImF0dHJOYW1lcyIsIk9iamVjdCIsImtleXMiLCJzZXRBdHRyaWJ1dGUiLCJhdHRyTmFtZSIsInRleHRDb250ZW50IiwiSU5JVElBTF9TVEFURV9OQU1FIiwiU1RPUF9TVEFURV9OQU1FIiwiTW9kZWwiLCJfaWQiLCJuYW1lIiwiYnJlYWtUaW1lIiwic3RlcHMiLCJzdGF0ZXMiLCJtYXAiLCJzdGF0ZSIsImN1cnJlbnRTdGF0ZSIsImdldFN0YXRlIiwiaW5pdGlhbFN0YXRlIiwidGltZW91dCIsInN1YklucHV0Iiwic3ViU3RvcCIsInN0YXJ0U3RhdGUiLCJpZCIsImltZyIsInVybCIsImxhc3QiLCJzdG9wU3RhdGUiLCJ1dWlkIiwiZmluZCIsInJlcG9ydCIsImhhbmRsZU5ld1N0YXRlIiwiaW50ZXJ2YWxzIiwiaSIsInRoZW4iLCJtYWtlQnJlYWsiLCJoYW5kbGVFdmVudCIsImNhdGNoIiwiY29uc29sZSIsImxvZyIsInJlc3BvbnNlIiwic2V0VGltZW91dCIsImNsZWFyU3VicyIsImV2ZW50IiwiZXZlbnRTdGFydFRpbWUiLCJEYXRlIiwibm93IiwiaW5jcmVhc2VBY3Rpb25zTnVtYmVyIiwidGltZVNwZW50IiwibmV4dFN0YXRlSWQiLCJoYW5kbGVJbnB1dCIsIm5leHRTdGF0ZSIsInNldFNwZW50VGltZSIsImluYWN0aXZlVGltZSIsImdldEluYWN0aXZlVGltZSIsImdldEluYWN0aXZlQWN0aW9uIiwicHVzaFN0YXRlIiwiY2xlYXJUaW1lb3V0IiwiZXhwb3J0cyIsIiRtb2RlbE5hbWUiLCJxdWVyeVNlbGVjdG9yIiwiaW5pdCIsIm1vZGVsIiwic2V0IiwidG9vbHMiLCIkY29udGVudCIsInNob3dDb250ZW50Iiwic2V0Q29udGVudERpc3BsYXkiLCJoaWRlQ29udGVudCIsImRpc3BsYXkiLCJzdHlsZSIsImVuYWJsZUJ1dHRvbnMiLCJidXR0b25zIiwic2V0QnV0dG9uc1N0YXRlIiwiZGlzYWJsZUJ1dHRvbnMiLCJ2YWx1ZSIsImJ1dHRvbiIsImRpc2FibGVkIiwiZ2V0VG9vbHNEYXRhIiwic2V0U3RhdGUiLCJzdGF0ZURhdGEiLCJzaG93RXZlbnQiLCJldmVudERhdGEiLCJoaWRlRXZlbnQiLCJsb2FkTW9kZWwiLCJKU09OIiwicGFyc2UiLCIkc2VsZWN0IiwiJGxvYWRCdXR0b24iLCIkc3RhcnRCdXR0b24iLCIkc3RvcEJ1dHRvbiIsIiRydW5CdXR0b24iLCJhZGRFdmVudExpc3RlbmVyIiwic3RvcCIsIm1vZGVsSWQiLCJlcnIiLCJlcnJvciIsInN0YXJ0IiwidG9vbHNEYXRhIiwiQWN0aW9uIiwidGltZSIsImluYWN0aXZlIiwiaW5pdFRvb2xzIiwicmlnaHRUaW1lIiwicmlnaHREYXRhIiwiZXZlcnkiLCJ0b29sIiwicmVjZWl2ZWRUb29sIiwib2JqIiwic3dpdGNoVmFsdWUiLCJpbmNsdWRlc1ZhbHVlIiwicmFuZ2VWYWx1ZXMiLCJib3JkZXJzIiwiVHlwZUVycm9yIiwibWluIiwibWF4IiwiRXZlbnQiLCJkZXNjIiwiU3RhdGUiLCJwYXJhbWV0ZXJzIiwiYWN0aW9ucyIsImFjdGlvbiIsInRpbWVzIiwiTWF0aCIsInN1aXRlZEFjdGlvbnMiLCJmaWx0ZXIiLCJpc1N1aXRhYmxlIiwiUkVQT1JUX1VSTCIsImFqYXhDb25maWciLCJSZXBvcnQiLCJtYXhTdGVwcyIsIm1heFRpbWUiLCJzcGVudFRpbWUiLCJhY3Rpb25zTnVtYmVyIiwic2V0SW5hY3RpdmUiLCJzbGljZSIsInN0cmluZ2lmeSIsIiRuYW1lIiwiJGltZyIsIiRwYXJhbXMiLCIkZXZlbnQiLCIkZXZlbnRIZWFkZXIiLCIkZXZlbnRCb2R5IiwiJHRpbWVyQ29udGFpbmVyIiwiYXBwZW5kQ2hpbGQiLCJzZXRQYXJhbWV0ZXJzIiwiZnJhZyIsImNyZWF0ZURvY3VtZW50RnJhZ21lbnQiLCJjcmVhdGVQYXJhbWV0ZU5vZGUiLCJwYXJhbSIsImlubmVySFRNTCIsImtleSIsImRpdiIsImtleVNwYW4iLCJ2YWx1ZVNwYW4iLCJzaG93VGltZXIiLCJoaWRlVGltZXIiLCJ0b29sVHlwZXMiLCJSQU5HRSIsIlNXSVRDSCIsIiR0b29scyIsImZyYWdtZW50IiwibGFiZWwiLCJ0b29sTm9kZSIsImNyZWF0ZVRvb2xOb2RlIiwiY3JlYXRlUmFuZ2VUb29sIiwiY3JlYXRlU3dpdGNoVG9vbCIsImRpdklucHV0Iiwic3Bhbk1pbiIsImlucHV0Iiwic3Bhbk1heCIsImRpdkN1cnJlbnQiLCJzcGFuQ3VycmVudCIsImV2dCIsInRhcmdldCIsImlucHV0cyIsInF1ZXJ5U2VsZWN0b3JBbGwiLCJkYXRhc2V0IiwicGFyc2VJbnQiLCJjaGVja2VkIiwiRXJyb3IiLCJtc1RvQ29udGVudCIsIm1zIiwic2Vjb25kcyIsInJvdW5kIiwibWlucyIsImZsb29yIiwic2Vjb25kc0xlZnQiLCJ0aW1lciIsInN0YXJ0VGltZSIsImludGVydmFsIiwic2V0SW50ZXJ2YWwiLCJlbGFwc2VkIiwiY2xlYXJJbnRlcnZhbCJdLCJtYXBwaW5ncyI6IjtBQUFBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQSxtREFBMkMsY0FBYzs7QUFFekQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFLO0FBQ0w7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxtQ0FB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Z0csU0FBVixFQUFxQjtBQUFFO0FBQVM7QUFDaEMsU0FBS0EsU0FBTCxHQUFpQixJQUFqQjtBQUNBSSxrQkFBYyxLQUFLSCxRQUFuQjtBQUNBLFNBQUt4TSxJQUFMLENBQVVlLFdBQVYsR0FBd0IsTUFBeEI7QUFDRDtBQWhCVyxDQUFkOztrQkFtQmV1TCxLIiwiZmlsZSI6ImxlYXJuaW5nLmJ1bmRsZS5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGlkZW50aXR5IGZ1bmN0aW9uIGZvciBjYWxsaW5nIGhhcm1vbnkgaW1wb3J0cyB3aXRoIHRoZSBjb3JyZWN0IGNvbnRleHRcbiBcdF9fd2VicGFja19yZXF1aXJlX18uaSA9IGZ1bmN0aW9uKHZhbHVlKSB7IHJldHVybiB2YWx1ZTsgfTtcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7XG4gXHRcdFx0XHRjb25maWd1cmFibGU6IGZhbHNlLFxuIFx0XHRcdFx0ZW51bWVyYWJsZTogdHJ1ZSxcbiBcdFx0XHRcdGdldDogZ2V0dGVyXG4gXHRcdFx0fSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gMzYpO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIHdlYnBhY2svYm9vdHN0cmFwIGJkNzM3MGRkYTdkNzFkMDY1NzhjIiwiZnVuY3Rpb24gYWpheChwYXRoID0gJycsIG9wdGlvbnMgPSB7fSwgZnVsbFJlc3BvbnNlID0gZmFsc2UpIHtcclxuICBjb25zdCB4aHIgPSBuZXcgWE1MSHR0cFJlcXVlc3QoKTtcclxuICB4aHIub3BlbihvcHRpb25zLm1ldGhvZCB8fCAnR0VUJywgcGF0aCwgdHJ1ZSk7XHJcbiAgaWYgKG9wdGlvbnMuaGVhZGVycykgeyBzZXRYSFJIZWFkZXJzKHhociwgb3B0aW9ucy5oZWFkZXJzKTsgfVxyXG4gIHhoci5zZW5kKG9wdGlvbnMuZGF0YSk7XHJcblxyXG4gIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XHJcbiAgICB4aHIub25yZWFkeXN0YXRlY2hhbmdlID0gZnVuY3Rpb24oKSB7XHJcbiAgICAgIGlmKHhoci5yZWFkeVN0YXRlID09IDQpIHtcclxuICAgICAgICBpZih4aHIuc3RhdHVzID09IDIwMCkge1xyXG4gICAgICAgICAgaWYgKGZ1bGxSZXNwb25zZSkge1xyXG4gICAgICAgICAgICByZXNvbHZlKHhocik7XHJcbiAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICByZXNvbHZlKHhoci5yZXNwb25zZVRleHQpO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICByZWplY3QoeGhyLnN0YXR1c1RleHQpO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH0pXHJcbn1cclxuXHJcbmZ1bmN0aW9uIHNldFhIUkhlYWRlcnMoeGhyLCBoZWFkZXJzKSB7XHJcbiAgZm9yIChsZXQgaGVhZGVyIGluIGhlYWRlcnMpIHtcclxuICAgIHhoci5zZXRSZXF1ZXN0SGVhZGVyKGhlYWRlciwgaGVhZGVyc1toZWFkZXJdKTtcclxuICB9XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IGFqYXg7XHJcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3V0aWxzL2FqYXguanMiLCJjb25zdCBwdWJzdWIgPSAoZnVuY3Rpb24oKSB7XHJcblxyXG4gIGNvbnN0IHRvcGljcyA9IHt9O1xyXG5cclxuICByZXR1cm4ge1xyXG4gICAgc3Vic2NyaWJlOiBmdW5jdGlvbih0b3BpYywgbGlzdGVuZXIpIHtcclxuICAgICAgaWYgKCF0b3BpY3NbdG9waWNdKSB0b3BpY3NbdG9waWNdID0geyBxdWV1ZTogW10gfTtcclxuXHJcbiAgICAgIGNvbnN0IGluZGV4ID0gdG9waWNzW3RvcGljXS5xdWV1ZS5wdXNoKGxpc3RlbmVyKSAtIDE7XHJcbiAgICAgIC8vIGZ1bmN0aW9uIHRvIGRlbGV0ZSB0b3BpY1xyXG4gICAgICByZXR1cm4ge1xyXG4gICAgICAgIHJlbW92ZTogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICBkZWxldGUgdG9waWNzW3RvcGljXS5xdWV1ZVtpbmRleF07XHJcbiAgICAgICAgfVxyXG4gICAgICB9O1xyXG4gICAgfSxcclxuXHJcbiAgICBwdWJsaXNoOiBmdW5jdGlvbih0b3BpYywgaW5mbykge1xyXG4gICAgICAvLyBubyB0aGVtZSBvciBubyBsaXN0ZW5lcnNcclxuICAgICAgaWYgKCF0b3BpY3NbdG9waWNdIHx8ICF0b3BpY3NbdG9waWNdLnF1ZXVlLmxlbmd0aCkgcmV0dXJuO1xyXG5cclxuICAgICAgY29uc3QgaXRlbXMgPSB0b3BpY3NbdG9waWNdLnF1ZXVlO1xyXG4gICAgICBpdGVtcy5mb3JFYWNoKGl0ZW0gPT4ge1xyXG4gICAgICAgIGl0ZW0oaW5mbyB8fCB7fSk7XHJcbiAgICAgIH0pO1xyXG4gICAgfVxyXG4gIH07XHJcbn0pKCk7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBwdWJzdWI7XHJcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3V0aWxzL3B1YnN1Yi5qcyIsImNvbnN0IG5vZGVGYWN0b3J5ID0gZnVuY3Rpb24odHlwZSA9ICdkaXYnLCBwYXJhbXMgPSB7fSkge1xyXG4gIGNvbnN0IG5vZGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KHR5cGUpO1xyXG5cclxuICBhcHBlbmRDbGFzc2VzKG5vZGUsIHBhcmFtcyk7XHJcbiAgYXBwZW5kQXR0cnMobm9kZSwgcGFyYW1zKTtcclxuICBpbnNlcnRUZXh0Q29udGVudChub2RlLCBwYXJhbXMpO1xyXG5cclxuICByZXR1cm4gbm9kZTtcclxufVxyXG5cclxuZnVuY3Rpb24gYXBwZW5kQ2xhc3Nlcyhub2RlLCB7IGNsYXNzTGlzdCB9KSB7XHJcbiAgaWYgKGNsYXNzTGlzdCAmJiBjbGFzc0xpc3QuZm9yRWFjaCkge1xyXG4gICAgY2xhc3NMaXN0LmZvckVhY2goY2xhc3NOYW1lID0+IG5vZGUuY2xhc3NMaXN0LmFkZChjbGFzc05hbWUpKTtcclxuICB9XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGFwcGVuZEF0dHJzKG5vZGUsIHsgYXR0cnMgfSkge1xyXG4gIGlmIChhdHRycykge1xyXG4gICAgY29uc3QgYXR0ck5hbWVzID0gT2JqZWN0LmtleXMoYXR0cnMpO1xyXG4gICAgYXR0ck5hbWVzLmZvckVhY2goYXR0ck5hbWUgPT4gbm9kZS5zZXRBdHRyaWJ1dGUoYXR0ck5hbWUsIGF0dHJzW2F0dHJOYW1lXSkpO1xyXG4gIH1cclxufVxyXG5cclxuZnVuY3Rpb24gaW5zZXJ0VGV4dENvbnRlbnQobm9kZSwgeyB0ZXh0Q29udGVudCA9IFwiXCIgfSkge1xyXG4gIG5vZGUudGV4dENvbnRlbnQgPSB0ZXh0Q29udGVudDtcclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgbm9kZUZhY3Rvcnk7XHJcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3V0aWxzL25vZGVGYWN0b3J5LmpzIiwiaW1wb3J0IFN0YXRlIGZyb20gJy4vbW9kZWxfY29tcG9uZW50cy9zdGF0ZSc7XHJcbmltcG9ydCBwdWJzdWIgZnJvbSAnLi4vdXRpbHMvcHVic3ViJztcclxuaW1wb3J0IFJlcG9ydCBmcm9tICcuL3JlcG9ydCc7XHJcblxyXG5jb25zdCBJTklUSUFMX1NUQVRFX05BTUUgPSAn0KHQvtGB0YLQvtGP0L3QuNC1INC80L7QtNC10LvQuCc7XHJcbmNvbnN0IFNUT1BfU1RBVEVfTkFNRSA9ICfQntCx0YPRh9C10L3QuNC1INC+0YHRgtCw0L3QvtCy0LvQtdC90L4nO1xyXG5cclxuY2xhc3MgTW9kZWwge1xyXG4gIGNvbnN0cnVjdG9yKGRhdGEpIHtcclxuICAgIHRoaXMuX2lkID0gZGF0YS5faWQ7XHJcbiAgICB0aGlzLm5hbWUgPSBkYXRhLm5hbWU7XHJcbiAgICB0aGlzLmJyZWFrVGltZSA9IGRhdGEuYnJlYWtUaW1lO1xyXG4gICAgdGhpcy5zdGVwcyA9IGRhdGEuc3RlcHM7XHJcblxyXG4gICAgdGhpcy5zdGF0ZXMgPSBkYXRhLnN0YXRlcy5tYXAoc3RhdGUgPT4gbmV3IFN0YXRlKHN0YXRlKSk7XHJcbiAgICB0aGlzLmN1cnJlbnRTdGF0ZSA9IHRoaXMuZ2V0U3RhdGUoZGF0YS5pbml0aWFsU3RhdGUpO1xyXG5cclxuICAgIHRoaXMudGltZW91dCA9IG51bGw7XHJcbiAgICB0aGlzLnN1YklucHV0ID0gbnVsbDtcclxuICAgIHRoaXMuc3ViU3RvcCA9IG51bGw7XHJcbiAgICB0aGlzLnN0YXJ0U3RhdGUgPSBuZXcgU3RhdGUoeyBpZDogMCwgbmFtZTogSU5JVElBTF9TVEFURV9OQU1FLCBpbWc6IHsgdXJsOiAnc3RhcnQucG5nJyB9LCBsYXN0OiB0cnVlIH0pO1xyXG4gICAgdGhpcy5zdG9wU3RhdGUgPSBuZXcgU3RhdGUoeyBpZDogLTEsIG5hbWU6IFNUT1BfU1RBVEVfTkFNRSwgaW1nOiB7IHVybDogJ3N0b3AucG5nJyB9LCBsYXN0OiB0cnVlIH0pO1xyXG4gIH1cclxuXHJcbiAgZ2V0U3RhdGUodXVpZCkge1xyXG4gICAgcmV0dXJuIHRoaXMuc3RhdGVzLmZpbmQoc3RhdGUgPT4gc3RhdGUudXVpZCA9PT0gdXVpZCk7XHJcbiAgfVxyXG5cclxuICBzdGFydCgpIHtcclxuICAgIC8vIFRPRE86IHJlZmFjdG9yXHJcbiAgICB0aGlzLnJlcG9ydCA9IG5ldyBSZXBvcnQodGhpcy5uYW1lLCB0aGlzLnN0ZXBzKTtcclxuICAgIHRoaXMuaGFuZGxlTmV3U3RhdGUodGhpcy5jdXJyZW50U3RhdGUpOyAvLyBzZXQgaW5pdGlhbCBzdGF0ZVxyXG4gICAgbGV0IGludGVydmFscyA9IFByb21pc2UucmVzb2x2ZSgpOyAvLyBpbml0IHByb21pc2UgY2hhaW5cclxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5zdGVwczsgaSsrKSB7XHJcbiAgICAgIGludGVydmFscyA9IGludGVydmFsc1xyXG4gICAgICAgLnRoZW4oKCkgPT4gdGhpcy5tYWtlQnJlYWsoKSlcclxuICAgICAgIC50aGVuKCgpID0+IHRoaXMuaGFuZGxlRXZlbnQoKSlcclxuICAgICAgIC50aGVuKChzdGF0ZSkgPT4geyB0aGlzLmhhbmRsZU5ld1N0YXRlKHN0YXRlKTsgfSk7XHJcbiAgICB9XHJcbiAgICBpbnRlcnZhbHNcclxuICAgICAgLmNhdGNoKHN0YXRlID0+IHRoaXMuaGFuZGxlTmV3U3RhdGUoc3RhdGUpKVxyXG4gICAgICAudGhlbigoKSA9PiB7XHJcbiAgICAgICAgaWYgKHRoaXMuY3VycmVudFN0YXRlLm5hbWUgIT09IFNUT1BfU1RBVEVfTkFNRSkge1xyXG4gICAgICAgICAgdGhpcy5yZXBvcnQuc2VuZCgpXHJcbiAgICAgICAgICAudGhlbihyZXNwb25zZSA9PiBjb25zb2xlLmxvZyhyZXNwb25zZSkpO1xyXG4gICAgICAgIH1cclxuICAgICAgfSk7XHJcbiAgICByZXR1cm4gaW50ZXJ2YWxzO1xyXG4gIH1cclxuXHJcbiAgbWFrZUJyZWFrKCkge1xyXG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcclxuICAgICAgdGhpcy5zdWJTdG9wID0gcHVic3ViLnN1YnNjcmliZSgnbW9kZWxfc3RvcCcsICgpID0+IHsgcmVqZWN0KHRoaXMuc3RvcFN0YXRlKTsgfSk7XHJcbiAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgIHRoaXMuY2xlYXJTdWJzKCk7XHJcbiAgICAgICAgcmVzb2x2ZSgpO1xyXG4gICAgICB9LCB0aGlzLmJyZWFrVGltZSk7XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIGhhbmRsZUV2ZW50KCkge1xyXG4gICAgY29uc3QgZXZlbnQgPSB0aGlzLmN1cnJlbnRTdGF0ZS5ldmVudDtcclxuICAgIGNvbnN0IGV2ZW50U3RhcnRUaW1lID0gRGF0ZS5ub3coKTtcclxuICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XHJcbiAgICAgIC8vIHNlbmQgZGF0YSBhYm91dCBuZXcgZXZlbnQgdG8gb3RoZXIgbW9kdWxlc1xyXG4gICAgICBwdWJzdWIucHVibGlzaCgnZXZlbnQnLCBldmVudCk7XHJcblxyXG4gICAgICAvLyBsaXN0ZW4gdG8gdXNlciBhY3Rpb25cclxuICAgICAgLy8gYW5kIGlmIHVzZXIgaW5wdXQgY29ycmVjdCBnbyB0byBuZXh0IHN0YXRlXHJcbiAgICAgIHRoaXMuc3ViSW5wdXQgPSBwdWJzdWIuc3Vic2NyaWJlKCd1c2VyX2lucHV0JywgKGRhdGEpID0+IHtcclxuICAgICAgICB0aGlzLnJlcG9ydC5pbmNyZWFzZUFjdGlvbnNOdW1iZXIoKTtcclxuICAgICAgICBjb25zdCB0aW1lU3BlbnQgPSBEYXRlLm5vdygpIC0gZXZlbnRTdGFydFRpbWU7XHJcbiAgICAgICAgY29uc3QgbmV4dFN0YXRlSWQgPSB0aGlzLmN1cnJlbnRTdGF0ZS5oYW5kbGVJbnB1dChkYXRhLCB0aW1lU3BlbnQpO1xyXG4gICAgICAgIGNvbnN0IG5leHRTdGF0ZSA9IHRoaXMuZ2V0U3RhdGUobmV4dFN0YXRlSWQpO1xyXG4gICAgICAgIGlmIChuZXh0U3RhdGUpIHtcclxuICAgICAgICAgIHRoaXMucmVwb3J0LnNldFNwZW50VGltZSh0aW1lU3BlbnQpO1xyXG4gICAgICAgICAgaWYgKG5leHRTdGF0ZS5sYXN0KSB7XHJcbiAgICAgICAgICAgIHJlamVjdChuZXh0U3RhdGUpO1xyXG4gICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgcmVzb2x2ZShuZXh0U3RhdGUpO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgfSk7XHJcblxyXG4gICAgICAvLyBoYW5kbGUgdXNlciBzdG9wIGJ1dHRvbiBjbGlja1xyXG4gICAgICB0aGlzLnN1YlN0b3AgPSBwdWJzdWIuc3Vic2NyaWJlKCdtb2RlbF9zdG9wJywgKCkgPT4ge1xyXG4gICAgICAgIHJlamVjdCh0aGlzLnN0b3BTdGF0ZSk7XHJcbiAgICAgIH0pO1xyXG5cclxuICAgICAgLy8gaGFuZGxlIGluYWN0aXZlXHJcbiAgICAgIGNvbnN0IGluYWN0aXZlVGltZSA9IHRoaXMuY3VycmVudFN0YXRlLmdldEluYWN0aXZlVGltZSgpO1xyXG4gICAgICB0aGlzLnRpbWVvdXQgPSBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgICBjb25zdCBuZXh0U3RhdGVJZCA9IHRoaXMuY3VycmVudFN0YXRlLmdldEluYWN0aXZlQWN0aW9uKCkubmV4dFN0YXRlO1xyXG4gICAgICAgIGNvbnN0IG5leHRTdGF0ZSA9IHRoaXMuZ2V0U3RhdGUobmV4dFN0YXRlSWQpO1xyXG4gICAgICAgIGlmIChuZXh0U3RhdGUubGFzdCkge1xyXG4gICAgICAgICAgcmVqZWN0KG5leHRTdGF0ZSk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIHJlc29sdmUobmV4dFN0YXRlKTtcclxuICAgICAgICB9XHJcbiAgICAgIH0sIGluYWN0aXZlVGltZSk7XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIGhhbmRsZU5ld1N0YXRlKHN0YXRlKSB7XHJcbiAgICB0aGlzLnJlcG9ydC5wdXNoU3RhdGUoc3RhdGUpO1xyXG4gICAgdGhpcy5jdXJyZW50U3RhdGUgPSBzdGF0ZTtcclxuICAgIGNsZWFyVGltZW91dCh0aGlzLnRpbWVvdXQpO1xyXG4gICAgdGhpcy5jbGVhclN1YnMoKTtcclxuICAgIHB1YnN1Yi5wdWJsaXNoKCduZXdfc3RhdGUnLCBzdGF0ZSk7XHJcbiAgfVxyXG5cclxuICBjbGVhclN1YnMoKSB7XHJcbiAgICBpZiAodGhpcy5zdWJJbnB1dCkge1xyXG4gICAgICB0aGlzLnN1YklucHV0LnJlbW92ZSgpO1xyXG4gICAgfVxyXG4gICAgaWYgKHRoaXMuc3ViU3RvcCkge1xyXG4gICAgICB0aGlzLnN1YlN0b3AucmVtb3ZlKCk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBzdG9wKCkge31cclxuXHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IE1vZGVsO1xyXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9sZWFybmluZy9tb2RlbC5qcyIsImltcG9ydCBzdGF0ZSBmcm9tICcuL3NjZW5lX2NvbXBvbmVudHMvc3RhdGUnO1xyXG5pbXBvcnQgdG9vbHMgZnJvbSAnLi9zY2VuZV9jb21wb25lbnRzL3Rvb2xzJztcclxuXHJcbmNvbnN0IGV4cG9ydHMgPSB7fTtcclxuXHJcbi8vIFNjZW5lIG1ldGFkYXRhXHJcbmNvbnN0ICRtb2RlbE5hbWUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcubW9kZWwtbmFtZScpO1xyXG5leHBvcnRzLmluaXQgPSBmdW5jdGlvbiBpbml0KG1vZGVsLCByZXNwb25zZSkge1xyXG4gICRtb2RlbE5hbWUudGV4dENvbnRlbnQgPSBtb2RlbC5uYW1lO1xyXG4gIHN0YXRlLnNldChtb2RlbC5zdGFydFN0YXRlKTtcclxuICB0b29scy5pbml0KHJlc3BvbnNlLnRvb2xzKTtcclxuICByZXR1cm4gdGhpcztcclxufTtcclxuXHJcbi8vIE1hbmFnZSBjb250ZW50IHZpc2liaWxpdHlcclxuY29uc3QgJGNvbnRlbnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuY29udGVudCcpO1xyXG5leHBvcnRzLnNob3dDb250ZW50ID0gZnVuY3Rpb24gc2hvd0NvbnRlbnQoKSB7XHJcbiAgc2V0Q29udGVudERpc3BsYXkoJ2ZsZXgnKTtcclxuICByZXR1cm4gdGhpcztcclxufTtcclxuZXhwb3J0cy5oaWRlQ29udGVudCA9IGZ1bmN0aW9uIGhpZGVDb250ZW50KCkge1xyXG4gIHNldENvbnRlbnREaXNwbGF5KCdub25lJyk7XHJcbiAgcmV0dXJuIHRoaXM7XHJcbn07XHJcbmZ1bmN0aW9uIHNldENvbnRlbnREaXNwbGF5KGRpc3BsYXkpIHtcclxuICAkY29udGVudC5zdHlsZS5kaXNwbGF5ID0gZGlzcGxheTtcclxufVxyXG5cclxuLy8gTWFuYWdlIGJ1dHRvbnMgc3RhdGVcclxuZXhwb3J0cy5lbmFibGVCdXR0b25zID0gZnVuY3Rpb24gZW5hYmxlQnV0dG9ucyguLi5idXR0b25zKSB7XHJcbiAgc2V0QnV0dG9uc1N0YXRlKGJ1dHRvbnMsIGZhbHNlKTtcclxuICByZXR1cm4gdGhpcztcclxufTtcclxuZXhwb3J0cy5kaXNhYmxlQnV0dG9ucyA9IGZ1bmN0aW9uIGRpc2FibGVCdXR0b25zKC4uLmJ1dHRvbnMpIHtcclxuICBzZXRCdXR0b25zU3RhdGUoYnV0dG9ucywgdHJ1ZSk7XHJcbiAgcmV0dXJuIHRoaXM7XHJcbn07XHJcbmZ1bmN0aW9uIHNldEJ1dHRvbnNTdGF0ZShidXR0b25zLCB2YWx1ZSkge1xyXG4gIGJ1dHRvbnMuZm9yRWFjaCgoYnV0dG9uKSA9PiB7IGJ1dHRvbi5kaXNhYmxlZCA9IHZhbHVlOyB9KTtcclxufVxyXG5cclxuLy8gRGVsZWdhdGUgcHVibGljIG1ldGhvZHMgdG8gY29tcG9uZW50c1xyXG5leHBvcnRzLmdldFRvb2xzRGF0YSA9ICgpID0+IHRvb2xzLmdldFRvb2xzRGF0YSgpO1xyXG5leHBvcnRzLnNldFN0YXRlID0gc3RhdGVEYXRhID0+IHN0YXRlLnNldChzdGF0ZURhdGEpO1xyXG5leHBvcnRzLnNob3dFdmVudCA9IGV2ZW50RGF0YSA9PiBzdGF0ZS5zaG93RXZlbnQoZXZlbnREYXRhKTtcclxuZXhwb3J0cy5oaWRlRXZlbnQgPSAoKSA9PiBzdGF0ZS5oaWRlRXZlbnQoKTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGV4cG9ydHM7XHJcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2xlYXJuaW5nL3NjZW5lLmpzIiwiLy8gcmVtb3ZlZCBieSBleHRyYWN0LXRleHQtd2VicGFjay1wbHVnaW5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuLi9zYXNzL2xlYXJuaW5nLnNjc3Ncbi8vIG1vZHVsZSBpZCA9IDE3XG4vLyBtb2R1bGUgY2h1bmtzID0gMSIsImltcG9ydCAnLi4vLi4vc2Fzcy9sZWFybmluZy5zY3NzJztcclxuXHJcbmltcG9ydCBwdWJzdWIgZnJvbSAnLi4vdXRpbHMvcHVic3ViJztcclxuaW1wb3J0IGFqYXggZnJvbSAnLi4vdXRpbHMvYWpheCc7XHJcbmltcG9ydCBzY2VuZSBmcm9tICcuL3NjZW5lJztcclxuaW1wb3J0IE1vZGVsIGZyb20gJy4vbW9kZWwnO1xyXG5cclxuLyoqXHJcbiAqIExvYWQgbW9kZWwgd2l0aCBnaXZlbiBpZFxyXG4gKi9cclxuZnVuY3Rpb24gbG9hZE1vZGVsKGlkKSB7XHJcbiAgcmV0dXJuIGFqYXgoYC9tb2RlbHMvJHtpZH1gKS50aGVuKHJlc3BvbnNlID0+IEpTT04ucGFyc2UocmVzcG9uc2UpKTtcclxufVxyXG5cclxuLyoqXHJcbiAqIFVJIGJ1dHRvbidzIGhhbmRsZXJzXHJcbiAqL1xyXG5jb25zdCAkc2VsZWN0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI21vZGVsLXNlbGVjdCcpO1xyXG5jb25zdCAkbG9hZEJ1dHRvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNsb2FkLW1vZGVsLWJ0bicpO1xyXG5jb25zdCAkc3RhcnRCdXR0b24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjc3RhcnQtYnRuJyk7XHJcbmNvbnN0ICRzdG9wQnV0dG9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3N0b3AtYnRuJyk7XHJcbmNvbnN0ICRydW5CdXR0b24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjcnVuLWJ0bicpO1xyXG5cclxubGV0IG1vZGVsID0gbnVsbDtcclxuXHJcbiRsb2FkQnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xyXG4gIGlmIChtb2RlbCkgeyBtb2RlbC5zdG9wKCk7IH1cclxuICBjb25zdCBtb2RlbElkID0gJHNlbGVjdC52YWx1ZTtcclxuICBsb2FkTW9kZWwobW9kZWxJZClcclxuICAgIC50aGVuKChyZXNwb25zZSkgPT4ge1xyXG4gICAgICBtb2RlbCA9IG5ldyBNb2RlbChyZXNwb25zZSk7XHJcbiAgICAgIHNjZW5lLmluaXQobW9kZWwsIHJlc3BvbnNlKVxyXG4gICAgICAgIC5zaG93Q29udGVudCgpXHJcbiAgICAgICAgLmVuYWJsZUJ1dHRvbnMoJHN0YXJ0QnV0dG9uKVxyXG4gICAgICAgIC5kaXNhYmxlQnV0dG9ucygkc3RvcEJ1dHRvbiwgJHJ1bkJ1dHRvbik7XHJcbiAgICB9KVxyXG4gICAgLmNhdGNoKChlcnIpID0+IHsgY29uc29sZS5lcnJvcihlcnIpOyB9KTtcclxufSk7XHJcblxyXG4kc3RhcnRCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XHJcbiAgbW9kZWwuc3RhcnQoKTtcclxuICBzY2VuZS5kaXNhYmxlQnV0dG9ucygkc3RhcnRCdXR0b24pO1xyXG4gIHNjZW5lLmVuYWJsZUJ1dHRvbnMoJHN0b3BCdXR0b24sICRydW5CdXR0b24pO1xyXG59KTtcclxuXHJcbiRzdG9wQnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xyXG4gIHB1YnN1Yi5wdWJsaXNoKCdtb2RlbF9zdG9wJyk7XHJcbiAgc2NlbmUuZW5hYmxlQnV0dG9ucygkc3RhcnRCdXR0b24pO1xyXG4gIHNjZW5lLmRpc2FibGVCdXR0b25zKCRzdG9wQnV0dG9uLCAkcnVuQnV0dG9uKTtcclxufSk7XHJcblxyXG4kcnVuQnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xyXG4gIGNvbnN0IHRvb2xzRGF0YSA9IHNjZW5lLmdldFRvb2xzRGF0YSgpO1xyXG4gIHB1YnN1Yi5wdWJsaXNoKCd1c2VyX2lucHV0JywgdG9vbHNEYXRhKTtcclxufSk7XHJcblxyXG4vKipcclxuICogSGFuZGxlIGN1c3RvbSBldmVudHMgaGVyZSAodXNlciBpbnB1dCwgcHJvZ3JhbW0gbWVzc2FnZXMgZXRjLilcclxuICovXHJcbnB1YnN1Yi5zdWJzY3JpYmUoJ25ld19zdGF0ZScsIChzdGF0ZSkgPT4ge1xyXG4gIHNjZW5lLmhpZGVFdmVudCgpO1xyXG4gIHNjZW5lLnNldFN0YXRlKHN0YXRlKTtcclxufSk7XHJcbnB1YnN1Yi5zdWJzY3JpYmUoJ2V2ZW50JywgZXZlbnQgPT4gc2NlbmUuc2hvd0V2ZW50KGV2ZW50KSk7XHJcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2xlYXJuaW5nL2luZGV4LmpzIiwiY2xhc3MgQWN0aW9uIHtcclxuICBjb25zdHJ1Y3RvcihkYXRhKSB7XHJcbiAgICB0aGlzLnRpbWUgPSBkYXRhLnRpbWUgfHwge307XHJcbiAgICB0aGlzLm5leHRTdGF0ZSA9IGRhdGEubmV4dFN0YXRlO1xyXG4gICAgaWYgKGRhdGEuaW5hY3RpdmUpIHtcclxuICAgICAgdGhpcy5pbmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgIHRoaXMudG9vbHMgPSBbXTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHRoaXMuaW5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgdGhpcy50b29scyA9IHRoaXMuaW5pdFRvb2xzKGRhdGEudG9vbHMpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgaXNTdWl0YWJsZShkYXRhLCB0aW1lKSB7XHJcbiAgICByZXR1cm4gdGhpcy5yaWdodFRpbWUodGltZSkgJiYgdGhpcy5yaWdodERhdGEoZGF0YSk7XHJcbiAgfVxyXG5cclxuICByaWdodERhdGEoZGF0YSA9IFtdKSB7XHJcbiAgICAvLyBUT0RPOiByZWZhY3RvclxyXG4gICAgcmV0dXJuIHRoaXMudG9vbHMuZXZlcnkoKHRvb2wpID0+IHtcclxuICAgICAgLy8g0JXRgdC70Lgg0YHRgNC10LTQuCDQv9C+0LvRg9GH0LXQvdC90YvRhSDQuNGC0LXQvNC+0LIg0L3QtdGCLCDRgtC+0LPQviDQutC+0YLQvtGA0YvQuSDQtdGB0YLRjCDQsiDQtNCw0L3QvdC+0Lwg0Y3QutGI0LXQvdC1XHJcbiAgICAgIGNvbnN0IHJlY2VpdmVkVG9vbCA9IGRhdGEuZmluZChvYmogPT4gb2JqLnV1aWQgPT09IHRvb2wudXVpZCk7XHJcbiAgICAgIGlmICghcmVjZWl2ZWRUb29sKSB7IHJldHVybiBmYWxzZTsgfVxyXG5cclxuICAgICAgaWYgKHRvb2wudHlwZSA9PT0gJ3N3aXRjaCcpIHsgcmV0dXJuIHJlY2VpdmVkVG9vbC52YWx1ZSA9PT0gdG9vbC5zd2l0Y2hWYWx1ZTsgfVxyXG5cclxuICAgICAgaWYgKHRvb2wudHlwZSA9PT0gJ3JhbmdlJykgeyByZXR1cm4gdGhpcy5pbmNsdWRlc1ZhbHVlKHJlY2VpdmVkVG9vbC52YWx1ZSwgWyB0b29sLnJhbmdlVmFsdWVzWzBdLCB0b29sLnJhbmdlVmFsdWVzWzFdIF0pOyB9XHJcblxyXG4gICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIGluY2x1ZGVzVmFsdWUodmFsdWUsIGJvcmRlcnMpIHtcclxuICAgIGlmICh0eXBlb2YgdmFsdWUgIT09ICdudW1iZXInKSB0aHJvdyBuZXcgVHlwZUVycm9yKCdWYWx1ZSBzaG91bGQgYmUgaW50ZWdlcicpO1xyXG4gICAgcmV0dXJuICh2YWx1ZSA+PSBib3JkZXJzWzBdKSAmJiAodmFsdWUgPD0gYm9yZGVyc1sxXSk7XHJcbiAgfVxyXG5cclxuICByaWdodFRpbWUodGltZSkge1xyXG4gICAgaWYgKHR5cGVvZiB0aW1lICE9PSAnbnVtYmVyJykgdGhyb3cgbmV3IFR5cGVFcnJvcignVGltZSBzaG91bGQgYmUgaW50ZWdlciAobXMpJyk7XHJcbiAgICByZXR1cm4gKHRpbWUgPj0gdGhpcy50aW1lLm1pbikgJiYgKHRpbWUgPD0gdGhpcy50aW1lLm1heCk7XHJcbiAgfVxyXG5cclxuICBpbml0VG9vbHModG9vbHMpIHtcclxuICAgIHJldHVybiB0b29scy5tYXAodG9vbCA9PiAoe1xyXG4gICAgICB1dWlkOiB0b29sLnV1aWQsXHJcbiAgICAgIHR5cGU6IHRvb2wudHlwZSxcclxuICAgICAgcmFuZ2VWYWx1ZXM6IHRvb2wucmFuZ2VWYWx1ZXMsXHJcbiAgICAgIHN3aXRjaFZhbHVlOiB0b29sLnN3aXRjaFZhbHVlLFxyXG4gICAgfSkpO1xyXG4gIH1cclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgQWN0aW9uO1xyXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9sZWFybmluZy9tb2RlbF9jb21wb25lbnRzL2FjdGlvbi5qcyIsImNsYXNzIEV2ZW50IHtcclxuICBjb25zdHJ1Y3RvcihkYXRhKSB7XHJcbiAgICB0aGlzLl9pZCA9IGRhdGEuX2lkO1xyXG4gICAgdGhpcy5uYW1lID0gZGF0YS5uYW1lO1xyXG4gICAgdGhpcy5kZXNjID0gZGF0YS5kZXNjO1xyXG4gIH1cclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgRXZlbnQ7XHJcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2xlYXJuaW5nL21vZGVsX2NvbXBvbmVudHMvZXZlbnQuanMiLCJpbXBvcnQgRXZlbnQgZnJvbSAnLi9ldmVudCc7XHJcbmltcG9ydCBBY3Rpb24gZnJvbSAnLi9hY3Rpb24nO1xyXG5cclxuY2xhc3MgU3RhdGUge1xyXG4gIGNvbnN0cnVjdG9yKGRhdGEpIHtcclxuICAgIHRoaXMuX2lkID0gZGF0YS5faWQ7XHJcbiAgICB0aGlzLnV1aWQgPSBkYXRhLnV1aWQ7XHJcbiAgICB0aGlzLm5hbWUgPSBkYXRhLm5hbWU7XHJcbiAgICB0aGlzLmltZyA9IGRhdGEuaW1nO1xyXG4gICAgdGhpcy5wYXJhbWV0ZXJzID0gZGF0YS5wYXJhbWV0ZXJzO1xyXG5cclxuICAgIGlmIChkYXRhLmxhc3QpIHtcclxuICAgICAgdGhpcy5sYXN0ID0gdHJ1ZTtcclxuICAgICAgdGhpcy5ldmVudCA9IG51bGw7XHJcbiAgICAgIHRoaXMuYWN0aW9ucyA9IG51bGw7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB0aGlzLmV2ZW50ID0gbmV3IEV2ZW50KGRhdGEuZXZlbnQpO1xyXG4gICAgICB0aGlzLmFjdGlvbnMgPSBkYXRhLmFjdGlvbnMubWFwKGFjdGlvbiA9PiBuZXcgQWN0aW9uKGFjdGlvbikpO1xyXG4gICAgICB0aGlzLmxhc3QgPSBmYWxzZTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIGdldEluYWN0aXZlVGltZSgpIHtcclxuICAgIGNvbnN0IHRpbWVzID0gdGhpcy5hY3Rpb25zLm1hcChhY3Rpb24gPT4gYWN0aW9uLnRpbWUubWF4IHx8IDApO1xyXG4gICAgcmV0dXJuIE1hdGgubWF4KC4uLnRpbWVzKTtcclxuICB9XHJcblxyXG4gIGdldEluYWN0aXZlQWN0aW9uKCkge1xyXG4gICAgcmV0dXJuIHRoaXMuYWN0aW9ucy5maW5kKGFjdGlvbiA9PiBhY3Rpb24uaW5hY3RpdmUgPT09IHRydWUpO1xyXG4gIH1cclxuXHJcbiAgaGFuZGxlSW5wdXQoZGF0YSwgdGltZSkge1xyXG4gICAgY29uc3Qgc3VpdGVkQWN0aW9ucyA9IHRoaXMuYWN0aW9ucy5maWx0ZXIoYWN0aW9uID0+IGFjdGlvbi5pc1N1aXRhYmxlKGRhdGEsIHRpbWUpKTtcclxuICAgIGlmIChzdWl0ZWRBY3Rpb25zLmxlbmd0aCA+IDApIHtcclxuICAgICAgcmV0dXJuIHN1aXRlZEFjdGlvbnNbMF0ubmV4dFN0YXRlO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIG51bGw7XHJcbiAgfVxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBTdGF0ZTtcclxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vbGVhcm5pbmcvbW9kZWxfY29tcG9uZW50cy9zdGF0ZS5qcyIsImltcG9ydCBhamF4IGZyb20gJy4uL3V0aWxzL2FqYXgnO1xyXG5cclxuY29uc3QgUkVQT1JUX1VSTCA9ICcvbGVhcm5pbmcvcmVwb3J0JztcclxuY29uc3QgYWpheENvbmZpZyA9IHtcclxuICBtZXRob2Q6ICdQT1NUJyxcclxuICBoZWFkZXJzOiB7XHJcbiAgICAnQ29udGVudC10eXBlJzogJ2FwcGxpY2F0aW9uL2pzb24nLFxyXG4gIH0sXHJcbn07XHJcblxyXG5jbGFzcyBSZXBvcnQge1xyXG4gIGNvbnN0cnVjdG9yKG5hbWUsIHN0ZXBzKSB7XHJcbiAgICB0aGlzLm1vZGVsID0gbmFtZTtcclxuICAgIHRoaXMubWF4U3RlcHMgPSBzdGVwcztcclxuICAgIHRoaXMuc3RhdGVzID0gW107XHJcbiAgICB0aGlzLmN1cnJlbnRTdGF0ZSA9IG51bGw7XHJcbiAgfVxyXG5cclxuICBwdXNoU3RhdGUoc3RhdGUpIHtcclxuICAgIGNvbnN0IHsgbmFtZSB9ID0gc3RhdGU7XHJcbiAgICBjb25zdCBtYXhUaW1lID0gc3RhdGUubGFzdCA/IC0xIDogc3RhdGUuZ2V0SW5hY3RpdmVUaW1lKCk7XHJcbiAgICBjb25zdCBzcGVudFRpbWUgPSBtYXhUaW1lO1xyXG4gICAgY29uc3QgaW5hY3RpdmUgPSB0cnVlO1xyXG4gICAgY29uc3QgYWN0aW9uc051bWJlciA9IDA7XHJcbiAgICB0aGlzLnN0YXRlcy5wdXNoKHsgbmFtZSwgbWF4VGltZSwgaW5hY3RpdmUsIGFjdGlvbnNOdW1iZXIsIHNwZW50VGltZSB9KTtcclxuICAgIHRoaXMuY3VycmVudFN0YXRlID0gdGhpcy5zdGF0ZXNbdGhpcy5zdGF0ZXMubGVuZ3RoIC0gMV07XHJcbiAgfVxyXG5cclxuICBpbmNyZWFzZUFjdGlvbnNOdW1iZXIoKSB7XHJcbiAgICB0aGlzLmN1cnJlbnRTdGF0ZS5hY3Rpb25zTnVtYmVyKys7XHJcbiAgfVxyXG5cclxuICBzZXRTcGVudFRpbWUodGltZSkge1xyXG4gICAgdGhpcy5jdXJyZW50U3RhdGUuc3BlbnRUaW1lID0gdGltZTtcclxuICAgIHRoaXMuc2V0SW5hY3RpdmUoZmFsc2UpO1xyXG4gIH1cclxuXHJcbiAgc2V0SW5hY3RpdmUodmFsdWUpIHtcclxuICAgIHRoaXMuY3VycmVudFN0YXRlLmluYWN0aXZlID0gdmFsdWU7XHJcbiAgfVxyXG5cclxuICBzZW5kKCkge1xyXG4gICAgaWYgKHRoaXMuc3RhdGVzLmxlbmd0aCA+IDEpIHtcclxuICAgICAgLy8gcmVtb3ZlIGxhc3Qgc3RhdGUgLSB1c2VyIGNhbid0IG1ha2UgYW55IGFjdGlvblxyXG4gICAgICB0aGlzLnN0YXRlcyA9IHRoaXMuc3RhdGVzLnNsaWNlKDAsIC0xKTtcclxuICAgIH1cclxuICAgIGFqYXhDb25maWcuZGF0YSA9IEpTT04uc3RyaW5naWZ5KHtcclxuICAgICAgbW9kZWw6IHRoaXMubW9kZWwsXHJcbiAgICAgIG1heFN0ZXBzOiB0aGlzLm1heFN0ZXBzLFxyXG4gICAgICBzdGF0ZXM6IHRoaXMuc3RhdGVzLFxyXG4gICAgfSk7XHJcbiAgICByZXR1cm4gYWpheChSRVBPUlRfVVJMLCBhamF4Q29uZmlnKTtcclxuICB9XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IFJlcG9ydDtcclxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vbGVhcm5pbmcvcmVwb3J0LmpzIiwiaW1wb3J0IG5vZGVGYWN0b3J5IGZyb20gJy4uLy4uL3V0aWxzL25vZGVGYWN0b3J5JztcclxuaW1wb3J0IHRpbWVyIGZyb20gJy4uLy4uL3V0aWxzL3RpbWVyJztcclxuXHJcbmNvbnN0ICRuYW1lID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLm1vZGVsLXN0YXRlLW5hbWUnKTtcclxuY29uc3QgJGltZyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5tb2RlbC1zdGF0ZS1pbWcnKTtcclxuY29uc3QgJHBhcmFtcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5tb2RlbC1wYXJhbXMtdmFsdWVzJyk7XHJcblxyXG5jb25zdCAkZXZlbnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcubW9kZWwtZXZlbnQnKTtcclxuY29uc3QgJGV2ZW50SGVhZGVyID0gJGV2ZW50LnF1ZXJ5U2VsZWN0b3IoJy5tb2RlbC1ldmVudC1uYW1lIHNwYW4nKTtcclxuY29uc3QgJGV2ZW50Qm9keSA9ICRldmVudC5xdWVyeVNlbGVjdG9yKCcubW9kZWwtZXZlbnQtaW5mbycpO1xyXG5cclxuY29uc3QgJHRpbWVyQ29udGFpbmVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLm1vZGVsLXRpbWVyJyk7XHJcbiR0aW1lckNvbnRhaW5lci5hcHBlbmRDaGlsZCh0aW1lci5ub2RlKTtcclxuXHJcbmZ1bmN0aW9uIHNldCh7IG5hbWUsIGltZywgcGFyYW1ldGVycyB9KSB7XHJcbiAgJG5hbWUudGV4dENvbnRlbnQgPSBuYW1lO1xyXG4gICRpbWcuc2V0QXR0cmlidXRlKCdzcmMnLCBgdXBsb2Fkcy8ke2ltZy51cmx9YCk7XHJcbiAgc2V0UGFyYW1ldGVycyhwYXJhbWV0ZXJzKTtcclxufVxyXG5cclxuZnVuY3Rpb24gc2V0UGFyYW1ldGVycyhwYXJhbXMgPSBbXSkge1xyXG4gIGNvbnN0IGZyYWcgPSBkb2N1bWVudC5jcmVhdGVEb2N1bWVudEZyYWdtZW50KCk7XHJcbiAgcGFyYW1zLmZvckVhY2gocGFyYW0gPT4gZnJhZy5hcHBlbmRDaGlsZChjcmVhdGVQYXJhbWV0ZU5vZGUocGFyYW0ubmFtZSwgcGFyYW0udmFsdWUpKSk7XHJcblxyXG4gICRwYXJhbXMuaW5uZXJIVE1MID0gJyc7XHJcbiAgJHBhcmFtcy5hcHBlbmRDaGlsZChmcmFnKTtcclxufVxyXG5cclxuZnVuY3Rpb24gY3JlYXRlUGFyYW1ldGVOb2RlKGtleSwgdmFsdWUpIHtcclxuICBjb25zdCBkaXYgPSBub2RlRmFjdG9yeSgnZGl2JywgeyBjbGFzc0xpc3Q6IFsgJ3BhcmFtZXRlcicgXSB9KTtcclxuXHJcbiAgY29uc3Qga2V5U3BhbiA9IG5vZGVGYWN0b3J5KCdzcGFuJywgeyB0ZXh0Q29udGVudDoga2V5IH0pO1xyXG4gIGRpdi5hcHBlbmRDaGlsZChrZXlTcGFuKTtcclxuXHJcbiAgY29uc3QgdmFsdWVTcGFuID0gbm9kZUZhY3RvcnkoJ3NwYW4nLCB7IHRleHRDb250ZW50OiB2YWx1ZSB9KTtcclxuICBkaXYuYXBwZW5kQ2hpbGQodmFsdWVTcGFuKTtcclxuXHJcbiAgcmV0dXJuIGRpdjtcclxufVxyXG5cclxuLyoqIFNldHMgZXZlbnQgZGF0YSB0byBVSSAqL1xyXG5mdW5jdGlvbiBzaG93RXZlbnQoZXZlbnQpIHtcclxuICAkZXZlbnRIZWFkZXIudGV4dENvbnRlbnQgPSBldmVudC5uYW1lO1xyXG4gICRldmVudEJvZHkudGV4dENvbnRlbnQgPSBldmVudC5kZXNjO1xyXG4gICRldmVudC5jbGFzc0xpc3QucmVtb3ZlKCdpcy1oaWRkZW4nLCAnc2xpZGUtdG9wJyk7XHJcbiAgc2hvd1RpbWVyKCk7XHJcbn1cclxuZnVuY3Rpb24gaGlkZUV2ZW50KCkge1xyXG4gICRldmVudC5jbGFzc0xpc3QuYWRkKCdpcy1oaWRkZW4nLCAnc2xpZGUtdG9wJyk7XHJcbiAgaGlkZVRpbWVyKCk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIHNob3dUaW1lcigpIHtcclxuICAkdGltZXJDb250YWluZXIuY2xhc3NMaXN0LnJlbW92ZSgnaXMtaGlkZGVuJyk7XHJcbiAgdGltZXIuc3RhcnQoKTtcclxufVxyXG5mdW5jdGlvbiBoaWRlVGltZXIoKSB7XHJcbiAgJHRpbWVyQ29udGFpbmVyLmNsYXNzTGlzdC5hZGQoJ2lzLWhpZGRlbicpO1xyXG4gIHRpbWVyLnN0b3AoKTtcclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQge1xyXG4gIHNldCxcclxuICBzaG93RXZlbnQsXHJcbiAgaGlkZUV2ZW50LFxyXG59O1xyXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9sZWFybmluZy9zY2VuZV9jb21wb25lbnRzL3N0YXRlLmpzIiwiaW1wb3J0IG5vZGVGYWN0b3J5IGZyb20gJy4uLy4uL3V0aWxzL25vZGVGYWN0b3J5JztcclxuXHJcbmNvbnN0IHRvb2xUeXBlcyA9IHtcclxuICBSQU5HRTogJ3JhbmdlJyxcclxuICBTV0lUQ0g6ICdzd2l0Y2gnLFxyXG59O1xyXG5jb25zdCAkdG9vbHMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcudG9vbHMtbGlzdCcpO1xyXG5cclxuZnVuY3Rpb24gaW5pdCh0b29scykge1xyXG4gIGNvbnN0IGZyYWdtZW50ID0gZG9jdW1lbnQuY3JlYXRlRG9jdW1lbnRGcmFnbWVudCgpO1xyXG5cclxuICB0b29scy5mb3JFYWNoKCh0b29sKSA9PiB7XHJcbiAgICAvLyBjcmVhdGUgdG9vbCB3cmFwcGVyXHJcbiAgICBjb25zdCBkaXYgPSBub2RlRmFjdG9yeSgnZGl2JywgeyBjbGFzc0xpc3Q6IFsgJ3Rvb2wnIF0gfSk7XHJcblxyXG4gICAgY29uc3QgbGFiZWwgPSBub2RlRmFjdG9yeSgnbGFiZWwnLCB7XHJcbiAgICAgIGNsYXNzTGlzdDogWyAndG9vbC1uYW1lJyBdLFxyXG4gICAgICB0ZXh0Q29udGVudDogdG9vbC5uYW1lLFxyXG4gICAgfSk7XHJcbiAgICBkaXYuYXBwZW5kQ2hpbGQobGFiZWwpO1xyXG5cclxuICAgIGNvbnN0IHRvb2xOb2RlID0gY3JlYXRlVG9vbE5vZGUodG9vbCk7XHJcbiAgICBkaXYuYXBwZW5kQ2hpbGQodG9vbE5vZGUpO1xyXG5cclxuICAgIGZyYWdtZW50LmFwcGVuZENoaWxkKGRpdik7XHJcbiAgfSk7XHJcblxyXG4gICR0b29scy5pbm5lckhUTUwgPSAnJztcclxuICAkdG9vbHMuYXBwZW5kQ2hpbGQoZnJhZ21lbnQpO1xyXG59XHJcblxyXG5mdW5jdGlvbiBjcmVhdGVUb29sTm9kZSh0b29sKSB7XHJcbiAgc3dpdGNoICh0b29sLnR5cGUpIHtcclxuICAgIGNhc2UgdG9vbFR5cGVzLlJBTkdFOlxyXG4gICAgICByZXR1cm4gY3JlYXRlUmFuZ2VUb29sKHRvb2wpO1xyXG4gICAgY2FzZSB0b29sVHlwZXMuU1dJVENIOlxyXG4gICAgICByZXR1cm4gY3JlYXRlU3dpdGNoVG9vbCh0b29sKTtcclxuICAgIGRlZmF1bHQ6XHJcbiAgICAgIHJldHVybiAn0J3QtdC40LfQstC10YHRgtC90YvQuSDQv9GA0LjQsdC+0YAnO1xyXG4gIH1cclxufVxyXG5cclxuZnVuY3Rpb24gY3JlYXRlUmFuZ2VUb29sKHRvb2wpIHtcclxuICBjb25zdCBkaXZJbnB1dCA9IG5vZGVGYWN0b3J5KCdkaXYnLCB7IGNsYXNzTGlzdDogWyAncmFuZ2UnIF0gfSk7XHJcblxyXG4gIGNvbnN0IHNwYW5NaW4gPSBub2RlRmFjdG9yeSgnc3BhbicsIHsgdGV4dENvbnRlbnQ6IHRvb2wucmFuZ2VWYWx1ZXMubWluIH0pO1xyXG4gIGRpdklucHV0LmFwcGVuZENoaWxkKHNwYW5NaW4pO1xyXG5cclxuICBjb25zdCBpbnB1dCA9IG5vZGVGYWN0b3J5KCdpbnB1dCcsIHtcclxuICAgIGF0dHJzOiB7XHJcbiAgICAgICdkYXRhLXV1aWQnOiB0b29sLnV1aWQsXHJcbiAgICAgICdkYXRhLXR5cGUnOiAncmFuZ2UnLFxyXG4gICAgICBuYW1lOiB0b29sLm5hbWUsXHJcbiAgICAgIHR5cGU6ICdyYW5nZScsXHJcbiAgICAgIG1pbjogdG9vbC5yYW5nZVZhbHVlcy5taW4sXHJcbiAgICAgIG1heDogdG9vbC5yYW5nZVZhbHVlcy5tYXgsXHJcbiAgICAgIHZhbHVlOiAwLFxyXG4gICAgfSxcclxuICB9KTtcclxuICBkaXZJbnB1dC5hcHBlbmRDaGlsZChpbnB1dCk7XHJcblxyXG4gIGNvbnN0IHNwYW5NYXggPSBub2RlRmFjdG9yeSgnc3BhbicsIHsgdGV4dENvbnRlbnQ6IHRvb2wucmFuZ2VWYWx1ZXMubWF4IH0pO1xyXG4gIGRpdklucHV0LmFwcGVuZENoaWxkKHNwYW5NYXgpO1xyXG5cclxuICBjb25zdCBkaXZDdXJyZW50ID0gbm9kZUZhY3RvcnkoJ2RpdicsIHsgY2xhc3NMaXN0OiBbICdyYW5nZS1jdXJyZW50LXZhbHVlJyBdIH0pO1xyXG4gIGNvbnN0IHNwYW5DdXJyZW50ID0gbm9kZUZhY3RvcnkoJ3NwYW4nLCB7IHRleHRDb250ZW50OiBpbnB1dC52YWx1ZSB9KTtcclxuICBkaXZDdXJyZW50LmFwcGVuZENoaWxkKHNwYW5DdXJyZW50KTtcclxuXHJcbiAgaW5wdXQuYWRkRXZlbnRMaXN0ZW5lcignaW5wdXQnLCAoZXZ0KSA9PiB7XHJcbiAgICBzcGFuQ3VycmVudC50ZXh0Q29udGVudCA9IGV2dC50YXJnZXQudmFsdWU7XHJcbiAgfSk7XHJcblxyXG4gIGNvbnN0IGZyYWdtZW50ID0gZG9jdW1lbnQuY3JlYXRlRG9jdW1lbnRGcmFnbWVudCgpO1xyXG4gIGZyYWdtZW50LmFwcGVuZENoaWxkKGRpdklucHV0KTtcclxuICBmcmFnbWVudC5hcHBlbmRDaGlsZChkaXZDdXJyZW50KTtcclxuXHJcbiAgcmV0dXJuIGZyYWdtZW50O1xyXG59XHJcblxyXG5mdW5jdGlvbiBjcmVhdGVTd2l0Y2hUb29sKHRvb2wpIHtcclxuICBjb25zdCBsYWJlbCA9IG5vZGVGYWN0b3J5KCdsYWJlbCcsIHsgY2xhc3NMaXN0OiBbICdzd2l0Y2gnIF0gfSk7XHJcblxyXG4gIGNvbnN0IGlucHV0ID0gbm9kZUZhY3RvcnkoJ2lucHV0Jywge1xyXG4gICAgYXR0cnM6IHtcclxuICAgICAgJ2RhdGEtdXVpZCc6IHRvb2wudXVpZCxcclxuICAgICAgJ2RhdGEtdHlwZSc6ICdzd2l0Y2gnLFxyXG4gICAgICB0eXBlOiAnY2hlY2tib3gnLFxyXG4gICAgfSxcclxuICB9KTtcclxuICBsYWJlbC5hcHBlbmRDaGlsZChpbnB1dCk7XHJcblxyXG4gIGNvbnN0IGRpdiA9IG5vZGVGYWN0b3J5KCdkaXYnLCB7IGNsYXNzTGlzdDogWyAnc2xpZGVyJyBdIH0pO1xyXG4gIGxhYmVsLmFwcGVuZENoaWxkKGRpdik7XHJcblxyXG4gIHJldHVybiBsYWJlbDtcclxufVxyXG5cclxuZnVuY3Rpb24gZ2V0VG9vbHNEYXRhKCkge1xyXG4gIGNvbnN0IHRvb2xzRGF0YSA9IFtdO1xyXG4gIGNvbnN0IGlucHV0cyA9ICR0b29scy5xdWVyeVNlbGVjdG9yQWxsKCdpbnB1dFtkYXRhLXV1aWRdJyk7XHJcbiAgaW5wdXRzLmZvckVhY2goKGlucHV0KSA9PiB7XHJcbiAgICBjb25zdCB7IHV1aWQsIHR5cGUgfSA9IGlucHV0LmRhdGFzZXQ7XHJcbiAgICBsZXQgdmFsdWU7XHJcbiAgICBzd2l0Y2ggKHR5cGUpIHtcclxuICAgICAgY2FzZSB0b29sVHlwZXMuUkFOR0U6IHZhbHVlID0gcGFyc2VJbnQoaW5wdXQudmFsdWUsIDEwKTsgYnJlYWs7XHJcbiAgICAgIGNhc2UgdG9vbFR5cGVzLlNXSVRDSDogdmFsdWUgPSBpbnB1dC5jaGVja2VkOyBicmVhaztcclxuICAgICAgZGVmYXVsdDogdGhyb3cgbmV3IEVycm9yKGDQndC10LrQvtGA0YDQtdC60YLQvdGL0Lkg0YLQuNC/INC/0YDQuNCx0L7RgNCwLiBJRDogJHtpZH1gKTtcclxuICAgIH1cclxuICAgIHRvb2xzRGF0YS5wdXNoKHsgdXVpZCwgdmFsdWUgfSk7XHJcbiAgfSk7XHJcbiAgcmV0dXJuIHRvb2xzRGF0YTtcclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQge1xyXG4gIGluaXQsXHJcbiAgZ2V0VG9vbHNEYXRhLFxyXG59O1xyXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9sZWFybmluZy9zY2VuZV9jb21wb25lbnRzL3Rvb2xzLmpzIiwiaW1wb3J0IG5vZGVGYWN0b3J5IGZyb20gJy4vbm9kZUZhY3RvcnknO1xyXG5cclxuZnVuY3Rpb24gbXNUb0NvbnRlbnQobXMpIHtcclxuICBjb25zdCBzZWNvbmRzID0gTWF0aC5yb3VuZChtcyAvIDEwMDApO1xyXG4gIGNvbnN0IG1pbnMgPSBNYXRoLmZsb29yKHNlY29uZHMgLyA2MCk7XHJcbiAgY29uc3Qgc2Vjb25kc0xlZnQgPSBzZWNvbmRzIC0gKG1pbnMgKiA2MCk7XHJcblxyXG4gIHJldHVybiBgJHttaW5zfToke3NlY29uZHNMZWZ0ID49IDEwID8gJycgOiAnMCd9JHtzZWNvbmRzTGVmdH1gO1xyXG59XHJcblxyXG5jb25zdCB0aW1lciA9IHtcclxuICBzdGFydFRpbWU6IG51bGwsXHJcbiAgaW50ZXJ2YWw6IG51bGwsXHJcbiAgbm9kZTogbm9kZUZhY3RvcnkoJ3NwYW4nLCB7IGNsYXNzTGlzdDogWyd0aW1lciddLCB0ZXh0Q29udGVudDogJzA6MDAnIH0pLFxyXG4gIHN0YXJ0OiBmdW5jdGlvbigpIHtcclxuICAgIHRoaXMuc3RhcnRUaW1lID0gRGF0ZS5ub3coKTtcclxuICAgIHRoaXMuaW50ZXJ2YWwgPSBzZXRJbnRlcnZhbCgoKSA9PiB7XHJcbiAgICAgIGNvbnN0IGVsYXBzZWQgPSBEYXRlLm5vdygpIC0gdGhpcy5zdGFydFRpbWU7XHJcbiAgICAgIHRoaXMubm9kZS50ZXh0Q29udGVudCA9IG1zVG9Db250ZW50KGVsYXBzZWQpO1xyXG4gICAgfSwgMTAwMCk7XHJcbiAgfSxcclxuICBzdG9wOiBmdW5jdGlvbigpIHtcclxuICAgIGlmICghdGhpcy5zdGFydFRpbWUpIHsgcmV0dXJuOyB9XHJcbiAgICB0aGlzLnN0YXJ0VGltZSA9IG51bGw7XHJcbiAgICBjbGVhckludGVydmFsKHRoaXMuaW50ZXJ2YWwpO1xyXG4gICAgdGhpcy5ub2RlLnRleHRDb250ZW50ID0gJzA6MDAnO1xyXG4gIH1cclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgdGltZXI7XHJcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3V0aWxzL3RpbWVyLmpzIl0sInNvdXJjZVJvb3QiOiIifQ==