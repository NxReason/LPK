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
/* 5 */,
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _state = __webpack_require__(30);

var _state2 = _interopRequireDefault(_state);

var _pubsub = __webpack_require__(2);

var _pubsub2 = _interopRequireDefault(_pubsub);

var _report = __webpack_require__(31);

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
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _state = __webpack_require__(32);

var _state2 = _interopRequireDefault(_state);

var _tools = __webpack_require__(33);

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
/* 8 */,
/* 9 */,
/* 10 */,
/* 11 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 12 */,
/* 13 */,
/* 14 */,
/* 15 */,
/* 16 */,
/* 17 */,
/* 18 */,
/* 19 */,
/* 20 */,
/* 21 */,
/* 22 */,
/* 23 */,
/* 24 */,
/* 25 */,
/* 26 */,
/* 27 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


__webpack_require__(11);

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
/* 28 */
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
/* 29 */
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
/* 30 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _event = __webpack_require__(29);

var _event2 = _interopRequireDefault(_event);

var _action = __webpack_require__(28);

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
/* 31 */
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
/* 32 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _nodeFactory = __webpack_require__(1);

var _nodeFactory2 = _interopRequireDefault(_nodeFactory);

var _timer = __webpack_require__(36);

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
/* 33 */
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
/* 34 */,
/* 35 */,
/* 36 */
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

/***/ })
/******/ ]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgZjkxNzY2YjBjNjgxNjRlYzlkMzYiLCJ3ZWJwYWNrOi8vLy4vdXRpbHMvYWpheC5qcyIsIndlYnBhY2s6Ly8vLi91dGlscy9ub2RlRmFjdG9yeS5qcyIsIndlYnBhY2s6Ly8vLi91dGlscy9wdWJzdWIuanMiLCJ3ZWJwYWNrOi8vLy4vbGVhcm5pbmcvbW9kZWwuanMiLCJ3ZWJwYWNrOi8vLy4vbGVhcm5pbmcvc2NlbmUuanMiLCJ3ZWJwYWNrOi8vLy4uL3Nhc3MvbGVhcm5pbmcuc2NzcyIsIndlYnBhY2s6Ly8vLi9sZWFybmluZy9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9sZWFybmluZy9tb2RlbF9jb21wb25lbnRzL2FjdGlvbi5qcyIsIndlYnBhY2s6Ly8vLi9sZWFybmluZy9tb2RlbF9jb21wb25lbnRzL2V2ZW50LmpzIiwid2VicGFjazovLy8uL2xlYXJuaW5nL21vZGVsX2NvbXBvbmVudHMvc3RhdGUuanMiLCJ3ZWJwYWNrOi8vLy4vbGVhcm5pbmcvcmVwb3J0LmpzIiwid2VicGFjazovLy8uL2xlYXJuaW5nL3NjZW5lX2NvbXBvbmVudHMvc3RhdGUuanMiLCJ3ZWJwYWNrOi8vLy4vbGVhcm5pbmcvc2NlbmVfY29tcG9uZW50cy90b29scy5qcyIsIndlYnBhY2s6Ly8vLi91dGlscy90aW1lci5qcyJdLCJuYW1lcyI6WyJhamF4IiwicGF0aCIsIm9wdGlvbnMiLCJmdWxsUmVzcG9uc2UiLCJ4aHIiLCJYTUxIdHRwUmVxdWVzdCIsIm9wZW4iLCJtZXRob2QiLCJoZWFkZXJzIiwic2V0WEhSSGVhZGVycyIsInNlbmQiLCJkYXRhIiwiUHJvbWlzZSIsInJlc29sdmUiLCJyZWplY3QiLCJvbnJlYWR5c3RhdGVjaGFuZ2UiLCJyZWFkeVN0YXRlIiwic3RhdHVzIiwicmVzcG9uc2VUZXh0Iiwic3RhdHVzVGV4dCIsImhlYWRlciIsInNldFJlcXVlc3RIZWFkZXIiLCJub2RlRmFjdG9yeSIsInR5cGUiLCJwYXJhbXMiLCJub2RlIiwiZG9jdW1lbnQiLCJjcmVhdGVFbGVtZW50IiwiYXBwZW5kQ2xhc3NlcyIsImFwcGVuZEF0dHJzIiwiaW5zZXJ0VGV4dENvbnRlbnQiLCJjbGFzc0xpc3QiLCJmb3JFYWNoIiwiYWRkIiwiY2xhc3NOYW1lIiwiYXR0cnMiLCJhdHRyTmFtZXMiLCJPYmplY3QiLCJrZXlzIiwic2V0QXR0cmlidXRlIiwiYXR0ck5hbWUiLCJ0ZXh0Q29udGVudCIsInB1YnN1YiIsInRvcGljcyIsInN1YnNjcmliZSIsInRvcGljIiwibGlzdGVuZXIiLCJxdWV1ZSIsImluZGV4IiwicHVzaCIsInJlbW92ZSIsInB1Ymxpc2giLCJpbmZvIiwibGVuZ3RoIiwiaXRlbXMiLCJpdGVtIiwiSU5JVElBTF9TVEFURV9OQU1FIiwiU1RPUF9TVEFURV9OQU1FIiwiTW9kZWwiLCJfaWQiLCJuYW1lIiwiYnJlYWtUaW1lIiwic3RlcHMiLCJzdGF0ZXMiLCJtYXAiLCJzdGF0ZSIsImN1cnJlbnRTdGF0ZSIsImdldFN0YXRlIiwiaW5pdGlhbFN0YXRlIiwidGltZW91dCIsInN1YklucHV0Iiwic3ViU3RvcCIsInN0YXJ0U3RhdGUiLCJpZCIsImltZyIsInVybCIsImxhc3QiLCJzdG9wU3RhdGUiLCJ1dWlkIiwiZmluZCIsInJlcG9ydCIsImhhbmRsZU5ld1N0YXRlIiwiaW50ZXJ2YWxzIiwiaSIsInRoZW4iLCJtYWtlQnJlYWsiLCJoYW5kbGVFdmVudCIsImNhdGNoIiwiY29uc29sZSIsImxvZyIsInJlc3BvbnNlIiwic2V0VGltZW91dCIsImNsZWFyU3VicyIsImV2ZW50IiwiZXZlbnRTdGFydFRpbWUiLCJEYXRlIiwibm93IiwiaW5jcmVhc2VBY3Rpb25zTnVtYmVyIiwidGltZVNwZW50IiwibmV4dFN0YXRlSWQiLCJoYW5kbGVJbnB1dCIsIm5leHRTdGF0ZSIsInNldFNwZW50VGltZSIsImluYWN0aXZlVGltZSIsImdldEluYWN0aXZlVGltZSIsImdldEluYWN0aXZlQWN0aW9uIiwicHVzaFN0YXRlIiwiY2xlYXJUaW1lb3V0IiwiZXhwb3J0cyIsIiRtb2RlbE5hbWUiLCJxdWVyeVNlbGVjdG9yIiwiaW5pdCIsIm1vZGVsIiwic2V0IiwidG9vbHMiLCIkY29udGVudCIsInNob3dDb250ZW50Iiwic2V0Q29udGVudERpc3BsYXkiLCJoaWRlQ29udGVudCIsImRpc3BsYXkiLCJzdHlsZSIsImVuYWJsZUJ1dHRvbnMiLCJidXR0b25zIiwic2V0QnV0dG9uc1N0YXRlIiwiZGlzYWJsZUJ1dHRvbnMiLCJ2YWx1ZSIsImJ1dHRvbiIsImRpc2FibGVkIiwiZ2V0VG9vbHNEYXRhIiwic2V0U3RhdGUiLCJzdGF0ZURhdGEiLCJzaG93RXZlbnQiLCJldmVudERhdGEiLCJoaWRlRXZlbnQiLCJsb2FkTW9kZWwiLCJKU09OIiwicGFyc2UiLCIkc2VsZWN0IiwiJGxvYWRCdXR0b24iLCIkc3RhcnRCdXR0b24iLCIkc3RvcEJ1dHRvbiIsIiRydW5CdXR0b24iLCJhZGRFdmVudExpc3RlbmVyIiwic3RvcCIsIm1vZGVsSWQiLCJlcnIiLCJlcnJvciIsInN0YXJ0IiwidG9vbHNEYXRhIiwiQWN0aW9uIiwidGltZSIsImluYWN0aXZlIiwiaW5pdFRvb2xzIiwicmlnaHRUaW1lIiwicmlnaHREYXRhIiwiZXZlcnkiLCJ0b29sIiwicmVjZWl2ZWRUb29sIiwib2JqIiwic3dpdGNoVmFsdWUiLCJpbmNsdWRlc1ZhbHVlIiwicmFuZ2VWYWx1ZXMiLCJib3JkZXJzIiwiVHlwZUVycm9yIiwibWluIiwibWF4IiwiRXZlbnQiLCJkZXNjIiwiU3RhdGUiLCJwYXJhbWV0ZXJzIiwiYWN0aW9ucyIsImFjdGlvbiIsInRpbWVzIiwiTWF0aCIsInN1aXRlZEFjdGlvbnMiLCJmaWx0ZXIiLCJpc1N1aXRhYmxlIiwiUkVQT1JUX1VSTCIsImFqYXhDb25maWciLCJSZXBvcnQiLCJtYXhTdGVwcyIsIm1heFRpbWUiLCJzcGVudFRpbWUiLCJhY3Rpb25zTnVtYmVyIiwic2V0SW5hY3RpdmUiLCJzbGljZSIsInN0cmluZ2lmeSIsIiRuYW1lIiwiJGltZyIsIiRwYXJhbXMiLCIkZXZlbnQiLCIkZXZlbnRIZWFkZXIiLCIkZXZlbnRCb2R5IiwiJHRpbWVyQ29udGFpbmVyIiwiYXBwZW5kQ2hpbGQiLCJzZXRQYXJhbWV0ZXJzIiwiZnJhZyIsImNyZWF0ZURvY3VtZW50RnJhZ21lbnQiLCJjcmVhdGVQYXJhbWV0ZU5vZGUiLCJwYXJhbSIsImlubmVySFRNTCIsImtleSIsImRpdiIsImtleVNwYW4iLCJ2YWx1ZVNwYW4iLCJzaG93VGltZXIiLCJoaWRlVGltZXIiLCJ0b29sVHlwZXMiLCJSQU5HRSIsIlNXSVRDSCIsIiR0b29scyIsImZyYWdtZW50IiwibGFiZWwiLCJ0b29sTm9kZSIsImNyZWF0ZVRvb2xOb2RlIiwiY3JlYXRlUmFuZ2VUb29sIiwiY3JlYXRlU3dpdGNoVG9vbCIsImRpdklucHV0Iiwic3Bhbk1pbiIsImlucHV0Iiwic3Bhbk1heCIsImRpdkN1cnJlbnQiLCJzcGFuQ3VycmVudCIsImV2dCIsInRhcmdldCIsImlucHV0cyIsInF1ZXJ5U2VsZWN0b3JBbGwiLCJkYXRhc2V0IiwicGFyc2VJbnQiLCJjaGVja2VkIiwiRXJyb3IiLCJtc1RvQ29udGVudCIsIm1zIiwic2Vjb25kcyIsInJvdW5kIiwibWlucyIsImZsb29yIiwic2Vjb25kc0xlZnQiLCJ0aW1lciIsInN0YXJ0VGltZSIsImludGVydmFsIiwic2V0SW50ZXJ2YWwiLCJlbGFwc2VkIiwiY2xlYXJJbnRlcnZhbCJdLCJtYXBwaW5ncyI6IjtBQUFBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQSxtREFBMkMsY0FBYzs7QUFFekQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFLO0FBQ0w7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxtQ0FBMkIsMEJBQTBCLEVBQUU7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QVM7QUFDaEMsU0FBS0EsU0FBTCxHQUFpQixJQUFqQjtBQUNBSSxrQkFBYyxLQUFLSCxRQUFuQjtBQUNBLFNBQUt2TixJQUFMLENBQVVnQixXQUFWLEdBQXdCLE1BQXhCO0FBQ0Q7QUFoQlcsQ0FBZDs7a0JBbUJlcU0sSyIsImZpbGUiOiJsZWFybmluZy5idW5kbGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBpZGVudGl0eSBmdW5jdGlvbiBmb3IgY2FsbGluZyBoYXJtb255IGltcG9ydHMgd2l0aCB0aGUgY29ycmVjdCBjb250ZXh0XG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmkgPSBmdW5jdGlvbih2YWx1ZSkgeyByZXR1cm4gdmFsdWU7IH07XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwge1xuIFx0XHRcdFx0Y29uZmlndXJhYmxlOiBmYWxzZSxcbiBcdFx0XHRcdGVudW1lcmFibGU6IHRydWUsXG4gXHRcdFx0XHRnZXQ6IGdldHRlclxuIFx0XHRcdH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IDI3KTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyB3ZWJwYWNrL2Jvb3RzdHJhcCBmOTE3NjZiMGM2ODE2NGVjOWQzNiIsImZ1bmN0aW9uIGFqYXgocGF0aCA9ICcnLCBvcHRpb25zID0ge30sIGZ1bGxSZXNwb25zZSA9IGZhbHNlKSB7XHJcbiAgY29uc3QgeGhyID0gbmV3IFhNTEh0dHBSZXF1ZXN0KCk7XHJcbiAgeGhyLm9wZW4ob3B0aW9ucy5tZXRob2QgfHwgJ0dFVCcsIHBhdGgsIHRydWUpO1xyXG4gIGlmIChvcHRpb25zLmhlYWRlcnMpIHsgc2V0WEhSSGVhZGVycyh4aHIsIG9wdGlvbnMuaGVhZGVycyk7IH1cclxuICB4aHIuc2VuZChvcHRpb25zLmRhdGEpO1xyXG5cclxuICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xyXG4gICAgeGhyLm9ucmVhZHlzdGF0ZWNoYW5nZSA9IGZ1bmN0aW9uKCkge1xyXG4gICAgICBpZih4aHIucmVhZHlTdGF0ZSA9PSA0KSB7XHJcbiAgICAgICAgaWYoeGhyLnN0YXR1cyA9PSAyMDApIHtcclxuICAgICAgICAgIGlmIChmdWxsUmVzcG9uc2UpIHtcclxuICAgICAgICAgICAgcmVzb2x2ZSh4aHIpO1xyXG4gICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgcmVzb2x2ZSh4aHIucmVzcG9uc2VUZXh0KTtcclxuICAgICAgICAgIH1cclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgcmVqZWN0KHhoci5zdGF0dXNUZXh0KTtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9KVxyXG59XHJcblxyXG5mdW5jdGlvbiBzZXRYSFJIZWFkZXJzKHhociwgaGVhZGVycykge1xyXG4gIGZvciAobGV0IGhlYWRlciBpbiBoZWFkZXJzKSB7XHJcbiAgICB4aHIuc2V0UmVxdWVzdEhlYWRlcihoZWFkZXIsIGhlYWRlcnNbaGVhZGVyXSk7XHJcbiAgfVxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBhamF4O1xyXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi91dGlscy9hamF4LmpzIiwiY29uc3Qgbm9kZUZhY3RvcnkgPSBmdW5jdGlvbih0eXBlID0gJ2RpdicsIHBhcmFtcyA9IHt9KSB7XHJcbiAgY29uc3Qgbm9kZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQodHlwZSk7XHJcblxyXG4gIGFwcGVuZENsYXNzZXMobm9kZSwgcGFyYW1zKTtcclxuICBhcHBlbmRBdHRycyhub2RlLCBwYXJhbXMpO1xyXG4gIGluc2VydFRleHRDb250ZW50KG5vZGUsIHBhcmFtcyk7XHJcblxyXG4gIHJldHVybiBub2RlO1xyXG59XHJcblxyXG5mdW5jdGlvbiBhcHBlbmRDbGFzc2VzKG5vZGUsIHsgY2xhc3NMaXN0IH0pIHtcclxuICBpZiAoY2xhc3NMaXN0ICYmIGNsYXNzTGlzdC5mb3JFYWNoKSB7XHJcbiAgICBjbGFzc0xpc3QuZm9yRWFjaChjbGFzc05hbWUgPT4gbm9kZS5jbGFzc0xpc3QuYWRkKGNsYXNzTmFtZSkpO1xyXG4gIH1cclxufVxyXG5cclxuZnVuY3Rpb24gYXBwZW5kQXR0cnMobm9kZSwgeyBhdHRycyB9KSB7XHJcbiAgaWYgKGF0dHJzKSB7XHJcbiAgICBjb25zdCBhdHRyTmFtZXMgPSBPYmplY3Qua2V5cyhhdHRycyk7XHJcbiAgICBhdHRyTmFtZXMuZm9yRWFjaChhdHRyTmFtZSA9PiBub2RlLnNldEF0dHJpYnV0ZShhdHRyTmFtZSwgYXR0cnNbYXR0ck5hbWVdKSk7XHJcbiAgfVxyXG59XHJcblxyXG5mdW5jdGlvbiBpbnNlcnRUZXh0Q29udGVudChub2RlLCB7IHRleHRDb250ZW50ID0gXCJcIiB9KSB7XHJcbiAgbm9kZS50ZXh0Q29udGVudCA9IHRleHRDb250ZW50O1xyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBub2RlRmFjdG9yeTtcclxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vdXRpbHMvbm9kZUZhY3RvcnkuanMiLCJjb25zdCBwdWJzdWIgPSAoZnVuY3Rpb24oKSB7XHJcblxyXG4gIGNvbnN0IHRvcGljcyA9IHt9O1xyXG5cclxuICByZXR1cm4ge1xyXG4gICAgc3Vic2NyaWJlOiBmdW5jdGlvbih0b3BpYywgbGlzdGVuZXIpIHtcclxuICAgICAgaWYgKCF0b3BpY3NbdG9waWNdKSB0b3BpY3NbdG9waWNdID0geyBxdWV1ZTogW10gfTtcclxuXHJcbiAgICAgIGNvbnN0IGluZGV4ID0gdG9waWNzW3RvcGljXS5xdWV1ZS5wdXNoKGxpc3RlbmVyKSAtIDE7XHJcbiAgICAgIC8vIGZ1bmN0aW9uIHRvIGRlbGV0ZSB0b3BpY1xyXG4gICAgICByZXR1cm4ge1xyXG4gICAgICAgIHJlbW92ZTogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICBkZWxldGUgdG9waWNzW3RvcGljXS5xdWV1ZVtpbmRleF07XHJcbiAgICAgICAgfVxyXG4gICAgICB9O1xyXG4gICAgfSxcclxuXHJcbiAgICBwdWJsaXNoOiBmdW5jdGlvbih0b3BpYywgaW5mbykge1xyXG4gICAgICAvLyBubyB0aGVtZSBvciBubyBsaXN0ZW5lcnNcclxuICAgICAgaWYgKCF0b3BpY3NbdG9waWNdIHx8ICF0b3BpY3NbdG9waWNdLnF1ZXVlLmxlbmd0aCkgcmV0dXJuO1xyXG5cclxuICAgICAgY29uc3QgaXRlbXMgPSB0b3BpY3NbdG9waWNdLnF1ZXVlO1xyXG4gICAgICBpdGVtcy5mb3JFYWNoKGl0ZW0gPT4ge1xyXG4gICAgICAgIGl0ZW0oaW5mbyB8fCB7fSk7XHJcbiAgICAgIH0pO1xyXG4gICAgfVxyXG4gIH07XHJcbn0pKCk7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBwdWJzdWI7XHJcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3V0aWxzL3B1YnN1Yi5qcyIsImltcG9ydCBTdGF0ZSBmcm9tICcuL21vZGVsX2NvbXBvbmVudHMvc3RhdGUnO1xyXG5pbXBvcnQgcHVic3ViIGZyb20gJy4uL3V0aWxzL3B1YnN1Yic7XHJcbmltcG9ydCBSZXBvcnQgZnJvbSAnLi9yZXBvcnQnO1xyXG5cclxuY29uc3QgSU5JVElBTF9TVEFURV9OQU1FID0gJ9Ch0L7RgdGC0L7Rj9C90LjQtSDQvNC+0LTQtdC70LgnO1xyXG5jb25zdCBTVE9QX1NUQVRFX05BTUUgPSAn0J7QsdGD0YfQtdC90LjQtSDQvtGB0YLQsNC90L7QstC70LXQvdC+JztcclxuXHJcbmNsYXNzIE1vZGVsIHtcclxuICBjb25zdHJ1Y3RvcihkYXRhKSB7XHJcbiAgICB0aGlzLl9pZCA9IGRhdGEuX2lkO1xyXG4gICAgdGhpcy5uYW1lID0gZGF0YS5uYW1lO1xyXG4gICAgdGhpcy5icmVha1RpbWUgPSBkYXRhLmJyZWFrVGltZTtcclxuICAgIHRoaXMuc3RlcHMgPSBkYXRhLnN0ZXBzO1xyXG5cclxuICAgIHRoaXMuc3RhdGVzID0gZGF0YS5zdGF0ZXMubWFwKHN0YXRlID0+IG5ldyBTdGF0ZShzdGF0ZSkpO1xyXG4gICAgdGhpcy5jdXJyZW50U3RhdGUgPSB0aGlzLmdldFN0YXRlKGRhdGEuaW5pdGlhbFN0YXRlKTtcclxuXHJcbiAgICB0aGlzLnRpbWVvdXQgPSBudWxsO1xyXG4gICAgdGhpcy5zdWJJbnB1dCA9IG51bGw7XHJcbiAgICB0aGlzLnN1YlN0b3AgPSBudWxsO1xyXG4gICAgdGhpcy5zdGFydFN0YXRlID0gbmV3IFN0YXRlKHsgaWQ6IDAsIG5hbWU6IElOSVRJQUxfU1RBVEVfTkFNRSwgaW1nOiB7IHVybDogJ3N0YXJ0LnBuZycgfSwgbGFzdDogdHJ1ZSB9KTtcclxuICAgIHRoaXMuc3RvcFN0YXRlID0gbmV3IFN0YXRlKHsgaWQ6IC0xLCBuYW1lOiBTVE9QX1NUQVRFX05BTUUsIGltZzogeyB1cmw6ICdzdG9wLnBuZycgfSwgbGFzdDogdHJ1ZSB9KTtcclxuICB9XHJcblxyXG4gIGdldFN0YXRlKHV1aWQpIHtcclxuICAgIHJldHVybiB0aGlzLnN0YXRlcy5maW5kKHN0YXRlID0+IHN0YXRlLnV1aWQgPT09IHV1aWQpO1xyXG4gIH1cclxuXHJcbiAgc3RhcnQoKSB7XHJcbiAgICAvLyBUT0RPOiByZWZhY3RvclxyXG4gICAgdGhpcy5yZXBvcnQgPSBuZXcgUmVwb3J0KHRoaXMubmFtZSwgdGhpcy5zdGVwcyk7XHJcbiAgICB0aGlzLmhhbmRsZU5ld1N0YXRlKHRoaXMuY3VycmVudFN0YXRlKTsgLy8gc2V0IGluaXRpYWwgc3RhdGVcclxuICAgIGxldCBpbnRlcnZhbHMgPSBQcm9taXNlLnJlc29sdmUoKTsgLy8gaW5pdCBwcm9taXNlIGNoYWluXHJcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMuc3RlcHM7IGkrKykge1xyXG4gICAgICBpbnRlcnZhbHMgPSBpbnRlcnZhbHNcclxuICAgICAgIC50aGVuKCgpID0+IHRoaXMubWFrZUJyZWFrKCkpXHJcbiAgICAgICAudGhlbigoKSA9PiB0aGlzLmhhbmRsZUV2ZW50KCkpXHJcbiAgICAgICAudGhlbigoc3RhdGUpID0+IHsgdGhpcy5oYW5kbGVOZXdTdGF0ZShzdGF0ZSk7IH0pO1xyXG4gICAgfVxyXG4gICAgaW50ZXJ2YWxzXHJcbiAgICAgIC5jYXRjaChzdGF0ZSA9PiB0aGlzLmhhbmRsZU5ld1N0YXRlKHN0YXRlKSlcclxuICAgICAgLnRoZW4oKCkgPT4ge1xyXG4gICAgICAgIGlmICh0aGlzLmN1cnJlbnRTdGF0ZS5uYW1lICE9PSBTVE9QX1NUQVRFX05BTUUpIHtcclxuICAgICAgICAgIHRoaXMucmVwb3J0LnNlbmQoKVxyXG4gICAgICAgICAgLnRoZW4ocmVzcG9uc2UgPT4gY29uc29sZS5sb2cocmVzcG9uc2UpKTtcclxuICAgICAgICB9XHJcbiAgICAgIH0pO1xyXG4gICAgcmV0dXJuIGludGVydmFscztcclxuICB9XHJcblxyXG4gIG1ha2VCcmVhaygpIHtcclxuICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XHJcbiAgICAgIHRoaXMuc3ViU3RvcCA9IHB1YnN1Yi5zdWJzY3JpYmUoJ21vZGVsX3N0b3AnLCAoKSA9PiB7IHJlamVjdCh0aGlzLnN0b3BTdGF0ZSk7IH0pO1xyXG4gICAgICBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgICB0aGlzLmNsZWFyU3VicygpO1xyXG4gICAgICAgIHJlc29sdmUoKTtcclxuICAgICAgfSwgdGhpcy5icmVha1RpbWUpO1xyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICBoYW5kbGVFdmVudCgpIHtcclxuICAgIGNvbnN0IGV2ZW50ID0gdGhpcy5jdXJyZW50U3RhdGUuZXZlbnQ7XHJcbiAgICBjb25zdCBldmVudFN0YXJ0VGltZSA9IERhdGUubm93KCk7XHJcbiAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xyXG4gICAgICAvLyBzZW5kIGRhdGEgYWJvdXQgbmV3IGV2ZW50IHRvIG90aGVyIG1vZHVsZXNcclxuICAgICAgcHVic3ViLnB1Ymxpc2goJ2V2ZW50JywgZXZlbnQpO1xyXG5cclxuICAgICAgLy8gbGlzdGVuIHRvIHVzZXIgYWN0aW9uXHJcbiAgICAgIC8vIGFuZCBpZiB1c2VyIGlucHV0IGNvcnJlY3QgZ28gdG8gbmV4dCBzdGF0ZVxyXG4gICAgICB0aGlzLnN1YklucHV0ID0gcHVic3ViLnN1YnNjcmliZSgndXNlcl9pbnB1dCcsIChkYXRhKSA9PiB7XHJcbiAgICAgICAgdGhpcy5yZXBvcnQuaW5jcmVhc2VBY3Rpb25zTnVtYmVyKCk7XHJcbiAgICAgICAgY29uc3QgdGltZVNwZW50ID0gRGF0ZS5ub3coKSAtIGV2ZW50U3RhcnRUaW1lO1xyXG4gICAgICAgIGNvbnN0IG5leHRTdGF0ZUlkID0gdGhpcy5jdXJyZW50U3RhdGUuaGFuZGxlSW5wdXQoZGF0YSwgdGltZVNwZW50KTtcclxuICAgICAgICBjb25zdCBuZXh0U3RhdGUgPSB0aGlzLmdldFN0YXRlKG5leHRTdGF0ZUlkKTtcclxuICAgICAgICBpZiAobmV4dFN0YXRlKSB7XHJcbiAgICAgICAgICB0aGlzLnJlcG9ydC5zZXRTcGVudFRpbWUodGltZVNwZW50KTtcclxuICAgICAgICAgIGlmIChuZXh0U3RhdGUubGFzdCkge1xyXG4gICAgICAgICAgICByZWplY3QobmV4dFN0YXRlKTtcclxuICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHJlc29sdmUobmV4dFN0YXRlKTtcclxuICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgIH0pO1xyXG5cclxuICAgICAgLy8gaGFuZGxlIHVzZXIgc3RvcCBidXR0b24gY2xpY2tcclxuICAgICAgdGhpcy5zdWJTdG9wID0gcHVic3ViLnN1YnNjcmliZSgnbW9kZWxfc3RvcCcsICgpID0+IHtcclxuICAgICAgICByZWplY3QodGhpcy5zdG9wU3RhdGUpO1xyXG4gICAgICB9KTtcclxuXHJcbiAgICAgIC8vIGhhbmRsZSBpbmFjdGl2ZVxyXG4gICAgICBjb25zdCBpbmFjdGl2ZVRpbWUgPSB0aGlzLmN1cnJlbnRTdGF0ZS5nZXRJbmFjdGl2ZVRpbWUoKTtcclxuICAgICAgdGhpcy50aW1lb3V0ID0gc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgY29uc3QgbmV4dFN0YXRlSWQgPSB0aGlzLmN1cnJlbnRTdGF0ZS5nZXRJbmFjdGl2ZUFjdGlvbigpLm5leHRTdGF0ZTtcclxuICAgICAgICBjb25zdCBuZXh0U3RhdGUgPSB0aGlzLmdldFN0YXRlKG5leHRTdGF0ZUlkKTtcclxuICAgICAgICBpZiAobmV4dFN0YXRlLmxhc3QpIHtcclxuICAgICAgICAgIHJlamVjdChuZXh0U3RhdGUpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICByZXNvbHZlKG5leHRTdGF0ZSk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9LCBpbmFjdGl2ZVRpbWUpO1xyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICBoYW5kbGVOZXdTdGF0ZShzdGF0ZSkge1xyXG4gICAgdGhpcy5yZXBvcnQucHVzaFN0YXRlKHN0YXRlKTtcclxuICAgIHRoaXMuY3VycmVudFN0YXRlID0gc3RhdGU7XHJcbiAgICBjbGVhclRpbWVvdXQodGhpcy50aW1lb3V0KTtcclxuICAgIHRoaXMuY2xlYXJTdWJzKCk7XHJcbiAgICBwdWJzdWIucHVibGlzaCgnbmV3X3N0YXRlJywgc3RhdGUpO1xyXG4gIH1cclxuXHJcbiAgY2xlYXJTdWJzKCkge1xyXG4gICAgaWYgKHRoaXMuc3ViSW5wdXQpIHtcclxuICAgICAgdGhpcy5zdWJJbnB1dC5yZW1vdmUoKTtcclxuICAgIH1cclxuICAgIGlmICh0aGlzLnN1YlN0b3ApIHtcclxuICAgICAgdGhpcy5zdWJTdG9wLnJlbW92ZSgpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgc3RvcCgpIHt9XHJcblxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBNb2RlbDtcclxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vbGVhcm5pbmcvbW9kZWwuanMiLCJpbXBvcnQgc3RhdGUgZnJvbSAnLi9zY2VuZV9jb21wb25lbnRzL3N0YXRlJztcclxuaW1wb3J0IHRvb2xzIGZyb20gJy4vc2NlbmVfY29tcG9uZW50cy90b29scyc7XHJcblxyXG5jb25zdCBleHBvcnRzID0ge307XHJcblxyXG4vLyBTY2VuZSBtZXRhZGF0YVxyXG5jb25zdCAkbW9kZWxOYW1lID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLm1vZGVsLW5hbWUnKTtcclxuZXhwb3J0cy5pbml0ID0gZnVuY3Rpb24gaW5pdChtb2RlbCwgcmVzcG9uc2UpIHtcclxuICAkbW9kZWxOYW1lLnRleHRDb250ZW50ID0gbW9kZWwubmFtZTtcclxuICBzdGF0ZS5zZXQobW9kZWwuc3RhcnRTdGF0ZSk7XHJcbiAgdG9vbHMuaW5pdChyZXNwb25zZS50b29scyk7XHJcbiAgcmV0dXJuIHRoaXM7XHJcbn07XHJcblxyXG4vLyBNYW5hZ2UgY29udGVudCB2aXNpYmlsaXR5XHJcbmNvbnN0ICRjb250ZW50ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmNvbnRlbnQnKTtcclxuZXhwb3J0cy5zaG93Q29udGVudCA9IGZ1bmN0aW9uIHNob3dDb250ZW50KCkge1xyXG4gIHNldENvbnRlbnREaXNwbGF5KCdmbGV4Jyk7XHJcbiAgcmV0dXJuIHRoaXM7XHJcbn07XHJcbmV4cG9ydHMuaGlkZUNvbnRlbnQgPSBmdW5jdGlvbiBoaWRlQ29udGVudCgpIHtcclxuICBzZXRDb250ZW50RGlzcGxheSgnbm9uZScpO1xyXG4gIHJldHVybiB0aGlzO1xyXG59O1xyXG5mdW5jdGlvbiBzZXRDb250ZW50RGlzcGxheShkaXNwbGF5KSB7XHJcbiAgJGNvbnRlbnQuc3R5bGUuZGlzcGxheSA9IGRpc3BsYXk7XHJcbn1cclxuXHJcbi8vIE1hbmFnZSBidXR0b25zIHN0YXRlXHJcbmV4cG9ydHMuZW5hYmxlQnV0dG9ucyA9IGZ1bmN0aW9uIGVuYWJsZUJ1dHRvbnMoLi4uYnV0dG9ucykge1xyXG4gIHNldEJ1dHRvbnNTdGF0ZShidXR0b25zLCBmYWxzZSk7XHJcbiAgcmV0dXJuIHRoaXM7XHJcbn07XHJcbmV4cG9ydHMuZGlzYWJsZUJ1dHRvbnMgPSBmdW5jdGlvbiBkaXNhYmxlQnV0dG9ucyguLi5idXR0b25zKSB7XHJcbiAgc2V0QnV0dG9uc1N0YXRlKGJ1dHRvbnMsIHRydWUpO1xyXG4gIHJldHVybiB0aGlzO1xyXG59O1xyXG5mdW5jdGlvbiBzZXRCdXR0b25zU3RhdGUoYnV0dG9ucywgdmFsdWUpIHtcclxuICBidXR0b25zLmZvckVhY2goKGJ1dHRvbikgPT4geyBidXR0b24uZGlzYWJsZWQgPSB2YWx1ZTsgfSk7XHJcbn1cclxuXHJcbi8vIERlbGVnYXRlIHB1YmxpYyBtZXRob2RzIHRvIGNvbXBvbmVudHNcclxuZXhwb3J0cy5nZXRUb29sc0RhdGEgPSAoKSA9PiB0b29scy5nZXRUb29sc0RhdGEoKTtcclxuZXhwb3J0cy5zZXRTdGF0ZSA9IHN0YXRlRGF0YSA9PiBzdGF0ZS5zZXQoc3RhdGVEYXRhKTtcclxuZXhwb3J0cy5zaG93RXZlbnQgPSBldmVudERhdGEgPT4gc3RhdGUuc2hvd0V2ZW50KGV2ZW50RGF0YSk7XHJcbmV4cG9ydHMuaGlkZUV2ZW50ID0gKCkgPT4gc3RhdGUuaGlkZUV2ZW50KCk7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBleHBvcnRzO1xyXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9sZWFybmluZy9zY2VuZS5qcyIsIi8vIHJlbW92ZWQgYnkgZXh0cmFjdC10ZXh0LXdlYnBhY2stcGx1Z2luXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi4vc2Fzcy9sZWFybmluZy5zY3NzXG4vLyBtb2R1bGUgaWQgPSAxMVxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJpbXBvcnQgJy4uLy4uL3Nhc3MvbGVhcm5pbmcuc2Nzcyc7XHJcblxyXG5pbXBvcnQgcHVic3ViIGZyb20gJy4uL3V0aWxzL3B1YnN1Yic7XHJcbmltcG9ydCBhamF4IGZyb20gJy4uL3V0aWxzL2FqYXgnO1xyXG5pbXBvcnQgc2NlbmUgZnJvbSAnLi9zY2VuZSc7XHJcbmltcG9ydCBNb2RlbCBmcm9tICcuL21vZGVsJztcclxuXHJcbi8qKlxyXG4gKiBMb2FkIG1vZGVsIHdpdGggZ2l2ZW4gaWRcclxuICovXHJcbmZ1bmN0aW9uIGxvYWRNb2RlbChpZCkge1xyXG4gIHJldHVybiBhamF4KGAvbW9kZWxzLyR7aWR9YCkudGhlbihyZXNwb25zZSA9PiBKU09OLnBhcnNlKHJlc3BvbnNlKSk7XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBVSSBidXR0b24ncyBoYW5kbGVyc1xyXG4gKi9cclxuY29uc3QgJHNlbGVjdCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNtb2RlbC1zZWxlY3QnKTtcclxuY29uc3QgJGxvYWRCdXR0b24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjbG9hZC1tb2RlbC1idG4nKTtcclxuY29uc3QgJHN0YXJ0QnV0dG9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3N0YXJ0LWJ0bicpO1xyXG5jb25zdCAkc3RvcEJ1dHRvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNzdG9wLWJ0bicpO1xyXG5jb25zdCAkcnVuQnV0dG9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3J1bi1idG4nKTtcclxuXHJcbmxldCBtb2RlbCA9IG51bGw7XHJcblxyXG4kbG9hZEJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcclxuICBpZiAobW9kZWwpIHsgbW9kZWwuc3RvcCgpOyB9XHJcbiAgY29uc3QgbW9kZWxJZCA9ICRzZWxlY3QudmFsdWU7XHJcbiAgbG9hZE1vZGVsKG1vZGVsSWQpXHJcbiAgICAudGhlbigocmVzcG9uc2UpID0+IHtcclxuICAgICAgbW9kZWwgPSBuZXcgTW9kZWwocmVzcG9uc2UpO1xyXG4gICAgICBzY2VuZS5pbml0KG1vZGVsLCByZXNwb25zZSlcclxuICAgICAgICAuc2hvd0NvbnRlbnQoKVxyXG4gICAgICAgIC5lbmFibGVCdXR0b25zKCRzdGFydEJ1dHRvbilcclxuICAgICAgICAuZGlzYWJsZUJ1dHRvbnMoJHN0b3BCdXR0b24sICRydW5CdXR0b24pO1xyXG4gICAgfSlcclxuICAgIC5jYXRjaCgoZXJyKSA9PiB7IGNvbnNvbGUuZXJyb3IoZXJyKTsgfSk7XHJcbn0pO1xyXG5cclxuJHN0YXJ0QnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xyXG4gIG1vZGVsLnN0YXJ0KCk7XHJcbiAgc2NlbmUuZGlzYWJsZUJ1dHRvbnMoJHN0YXJ0QnV0dG9uKTtcclxuICBzY2VuZS5lbmFibGVCdXR0b25zKCRzdG9wQnV0dG9uLCAkcnVuQnV0dG9uKTtcclxufSk7XHJcblxyXG4kc3RvcEJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcclxuICBwdWJzdWIucHVibGlzaCgnbW9kZWxfc3RvcCcpO1xyXG4gIHNjZW5lLmVuYWJsZUJ1dHRvbnMoJHN0YXJ0QnV0dG9uKTtcclxuICBzY2VuZS5kaXNhYmxlQnV0dG9ucygkc3RvcEJ1dHRvbiwgJHJ1bkJ1dHRvbik7XHJcbn0pO1xyXG5cclxuJHJ1bkJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcclxuICBjb25zdCB0b29sc0RhdGEgPSBzY2VuZS5nZXRUb29sc0RhdGEoKTtcclxuICBwdWJzdWIucHVibGlzaCgndXNlcl9pbnB1dCcsIHRvb2xzRGF0YSk7XHJcbn0pO1xyXG5cclxuLyoqXHJcbiAqIEhhbmRsZSBjdXN0b20gZXZlbnRzIGhlcmUgKHVzZXIgaW5wdXQsIHByb2dyYW1tIG1lc3NhZ2VzIGV0Yy4pXHJcbiAqL1xyXG5wdWJzdWIuc3Vic2NyaWJlKCduZXdfc3RhdGUnLCAoc3RhdGUpID0+IHtcclxuICBzY2VuZS5oaWRlRXZlbnQoKTtcclxuICBzY2VuZS5zZXRTdGF0ZShzdGF0ZSk7XHJcbn0pO1xyXG5wdWJzdWIuc3Vic2NyaWJlKCdldmVudCcsIGV2ZW50ID0+IHNjZW5lLnNob3dFdmVudChldmVudCkpO1xyXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9sZWFybmluZy9pbmRleC5qcyIsImNsYXNzIEFjdGlvbiB7XHJcbiAgY29uc3RydWN0b3IoZGF0YSkge1xyXG4gICAgdGhpcy50aW1lID0gZGF0YS50aW1lIHx8IHt9O1xyXG4gICAgdGhpcy5uZXh0U3RhdGUgPSBkYXRhLm5leHRTdGF0ZTtcclxuICAgIGlmIChkYXRhLmluYWN0aXZlKSB7XHJcbiAgICAgIHRoaXMuaW5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICB0aGlzLnRvb2xzID0gW107XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB0aGlzLmluYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgIHRoaXMudG9vbHMgPSB0aGlzLmluaXRUb29scyhkYXRhLnRvb2xzKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIGlzU3VpdGFibGUoZGF0YSwgdGltZSkge1xyXG4gICAgcmV0dXJuIHRoaXMucmlnaHRUaW1lKHRpbWUpICYmIHRoaXMucmlnaHREYXRhKGRhdGEpO1xyXG4gIH1cclxuXHJcbiAgcmlnaHREYXRhKGRhdGEgPSBbXSkge1xyXG4gICAgLy8gVE9ETzogcmVmYWN0b3JcclxuICAgIHJldHVybiB0aGlzLnRvb2xzLmV2ZXJ5KCh0b29sKSA9PiB7XHJcbiAgICAgIC8vINCV0YHQu9C4INGB0YDQtdC00Lgg0L/QvtC70YPRh9C10L3QvdGL0YUg0LjRgtC10LzQvtCyINC90LXRgiwg0YLQvtCz0L4g0LrQvtGC0L7RgNGL0Lkg0LXRgdGC0Ywg0LIg0LTQsNC90L3QvtC8INGN0LrRiNC10L3QtVxyXG4gICAgICBjb25zdCByZWNlaXZlZFRvb2wgPSBkYXRhLmZpbmQob2JqID0+IG9iai51dWlkID09PSB0b29sLnV1aWQpO1xyXG4gICAgICBpZiAoIXJlY2VpdmVkVG9vbCkgeyByZXR1cm4gZmFsc2U7IH1cclxuXHJcbiAgICAgIGlmICh0b29sLnR5cGUgPT09ICdzd2l0Y2gnKSB7IHJldHVybiByZWNlaXZlZFRvb2wudmFsdWUgPT09IHRvb2wuc3dpdGNoVmFsdWU7IH1cclxuXHJcbiAgICAgIGlmICh0b29sLnR5cGUgPT09ICdyYW5nZScpIHsgcmV0dXJuIHRoaXMuaW5jbHVkZXNWYWx1ZShyZWNlaXZlZFRvb2wudmFsdWUsIFsgdG9vbC5yYW5nZVZhbHVlc1swXSwgdG9vbC5yYW5nZVZhbHVlc1sxXSBdKTsgfVxyXG5cclxuICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICBpbmNsdWRlc1ZhbHVlKHZhbHVlLCBib3JkZXJzKSB7XHJcbiAgICBpZiAodHlwZW9mIHZhbHVlICE9PSAnbnVtYmVyJykgdGhyb3cgbmV3IFR5cGVFcnJvcignVmFsdWUgc2hvdWxkIGJlIGludGVnZXInKTtcclxuICAgIHJldHVybiAodmFsdWUgPj0gYm9yZGVyc1swXSkgJiYgKHZhbHVlIDw9IGJvcmRlcnNbMV0pO1xyXG4gIH1cclxuXHJcbiAgcmlnaHRUaW1lKHRpbWUpIHtcclxuICAgIGlmICh0eXBlb2YgdGltZSAhPT0gJ251bWJlcicpIHRocm93IG5ldyBUeXBlRXJyb3IoJ1RpbWUgc2hvdWxkIGJlIGludGVnZXIgKG1zKScpO1xyXG4gICAgcmV0dXJuICh0aW1lID49IHRoaXMudGltZS5taW4pICYmICh0aW1lIDw9IHRoaXMudGltZS5tYXgpO1xyXG4gIH1cclxuXHJcbiAgaW5pdFRvb2xzKHRvb2xzKSB7XHJcbiAgICByZXR1cm4gdG9vbHMubWFwKHRvb2wgPT4gKHtcclxuICAgICAgdXVpZDogdG9vbC51dWlkLFxyXG4gICAgICB0eXBlOiB0b29sLnR5cGUsXHJcbiAgICAgIHJhbmdlVmFsdWVzOiB0b29sLnJhbmdlVmFsdWVzLFxyXG4gICAgICBzd2l0Y2hWYWx1ZTogdG9vbC5zd2l0Y2hWYWx1ZSxcclxuICAgIH0pKTtcclxuICB9XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IEFjdGlvbjtcclxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vbGVhcm5pbmcvbW9kZWxfY29tcG9uZW50cy9hY3Rpb24uanMiLCJjbGFzcyBFdmVudCB7XHJcbiAgY29uc3RydWN0b3IoZGF0YSkge1xyXG4gICAgdGhpcy5faWQgPSBkYXRhLl9pZDtcclxuICAgIHRoaXMubmFtZSA9IGRhdGEubmFtZTtcclxuICAgIHRoaXMuZGVzYyA9IGRhdGEuZGVzYztcclxuICB9XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IEV2ZW50O1xyXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9sZWFybmluZy9tb2RlbF9jb21wb25lbnRzL2V2ZW50LmpzIiwiaW1wb3J0IEV2ZW50IGZyb20gJy4vZXZlbnQnO1xyXG5pbXBvcnQgQWN0aW9uIGZyb20gJy4vYWN0aW9uJztcclxuXHJcbmNsYXNzIFN0YXRlIHtcclxuICBjb25zdHJ1Y3RvcihkYXRhKSB7XHJcbiAgICB0aGlzLl9pZCA9IGRhdGEuX2lkO1xyXG4gICAgdGhpcy51dWlkID0gZGF0YS51dWlkO1xyXG4gICAgdGhpcy5uYW1lID0gZGF0YS5uYW1lO1xyXG4gICAgdGhpcy5pbWcgPSBkYXRhLmltZztcclxuICAgIHRoaXMucGFyYW1ldGVycyA9IGRhdGEucGFyYW1ldGVycztcclxuXHJcbiAgICBpZiAoZGF0YS5sYXN0KSB7XHJcbiAgICAgIHRoaXMubGFzdCA9IHRydWU7XHJcbiAgICAgIHRoaXMuZXZlbnQgPSBudWxsO1xyXG4gICAgICB0aGlzLmFjdGlvbnMgPSBudWxsO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdGhpcy5ldmVudCA9IG5ldyBFdmVudChkYXRhLmV2ZW50KTtcclxuICAgICAgdGhpcy5hY3Rpb25zID0gZGF0YS5hY3Rpb25zLm1hcChhY3Rpb24gPT4gbmV3IEFjdGlvbihhY3Rpb24pKTtcclxuICAgICAgdGhpcy5sYXN0ID0gZmFsc2U7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBnZXRJbmFjdGl2ZVRpbWUoKSB7XHJcbiAgICBjb25zdCB0aW1lcyA9IHRoaXMuYWN0aW9ucy5tYXAoYWN0aW9uID0+IGFjdGlvbi50aW1lLm1heCB8fCAwKTtcclxuICAgIHJldHVybiBNYXRoLm1heCguLi50aW1lcyk7XHJcbiAgfVxyXG5cclxuICBnZXRJbmFjdGl2ZUFjdGlvbigpIHtcclxuICAgIHJldHVybiB0aGlzLmFjdGlvbnMuZmluZChhY3Rpb24gPT4gYWN0aW9uLmluYWN0aXZlID09PSB0cnVlKTtcclxuICB9XHJcblxyXG4gIGhhbmRsZUlucHV0KGRhdGEsIHRpbWUpIHtcclxuICAgIGNvbnN0IHN1aXRlZEFjdGlvbnMgPSB0aGlzLmFjdGlvbnMuZmlsdGVyKGFjdGlvbiA9PiBhY3Rpb24uaXNTdWl0YWJsZShkYXRhLCB0aW1lKSk7XHJcbiAgICBpZiAoc3VpdGVkQWN0aW9ucy5sZW5ndGggPiAwKSB7XHJcbiAgICAgIHJldHVybiBzdWl0ZWRBY3Rpb25zWzBdLm5leHRTdGF0ZTtcclxuICAgIH1cclxuICAgIHJldHVybiBudWxsO1xyXG4gIH1cclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgU3RhdGU7XHJcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2xlYXJuaW5nL21vZGVsX2NvbXBvbmVudHMvc3RhdGUuanMiLCJpbXBvcnQgYWpheCBmcm9tICcuLi91dGlscy9hamF4JztcclxuXHJcbmNvbnN0IFJFUE9SVF9VUkwgPSAnL2xlYXJuaW5nL3JlcG9ydCc7XHJcbmNvbnN0IGFqYXhDb25maWcgPSB7XHJcbiAgbWV0aG9kOiAnUE9TVCcsXHJcbiAgaGVhZGVyczoge1xyXG4gICAgJ0NvbnRlbnQtdHlwZSc6ICdhcHBsaWNhdGlvbi9qc29uJyxcclxuICB9LFxyXG59O1xyXG5cclxuY2xhc3MgUmVwb3J0IHtcclxuICBjb25zdHJ1Y3RvcihuYW1lLCBzdGVwcykge1xyXG4gICAgdGhpcy5tb2RlbCA9IG5hbWU7XHJcbiAgICB0aGlzLm1heFN0ZXBzID0gc3RlcHM7XHJcbiAgICB0aGlzLnN0YXRlcyA9IFtdO1xyXG4gICAgdGhpcy5jdXJyZW50U3RhdGUgPSBudWxsO1xyXG4gIH1cclxuXHJcbiAgcHVzaFN0YXRlKHN0YXRlKSB7XHJcbiAgICBjb25zdCB7IG5hbWUgfSA9IHN0YXRlO1xyXG4gICAgY29uc3QgbWF4VGltZSA9IHN0YXRlLmxhc3QgPyAtMSA6IHN0YXRlLmdldEluYWN0aXZlVGltZSgpO1xyXG4gICAgY29uc3Qgc3BlbnRUaW1lID0gbWF4VGltZTtcclxuICAgIGNvbnN0IGluYWN0aXZlID0gdHJ1ZTtcclxuICAgIGNvbnN0IGFjdGlvbnNOdW1iZXIgPSAwO1xyXG4gICAgdGhpcy5zdGF0ZXMucHVzaCh7IG5hbWUsIG1heFRpbWUsIGluYWN0aXZlLCBhY3Rpb25zTnVtYmVyLCBzcGVudFRpbWUgfSk7XHJcbiAgICB0aGlzLmN1cnJlbnRTdGF0ZSA9IHRoaXMuc3RhdGVzW3RoaXMuc3RhdGVzLmxlbmd0aCAtIDFdO1xyXG4gIH1cclxuXHJcbiAgaW5jcmVhc2VBY3Rpb25zTnVtYmVyKCkge1xyXG4gICAgdGhpcy5jdXJyZW50U3RhdGUuYWN0aW9uc051bWJlcisrO1xyXG4gIH1cclxuXHJcbiAgc2V0U3BlbnRUaW1lKHRpbWUpIHtcclxuICAgIHRoaXMuY3VycmVudFN0YXRlLnNwZW50VGltZSA9IHRpbWU7XHJcbiAgICB0aGlzLnNldEluYWN0aXZlKGZhbHNlKTtcclxuICB9XHJcblxyXG4gIHNldEluYWN0aXZlKHZhbHVlKSB7XHJcbiAgICB0aGlzLmN1cnJlbnRTdGF0ZS5pbmFjdGl2ZSA9IHZhbHVlO1xyXG4gIH1cclxuXHJcbiAgc2VuZCgpIHtcclxuICAgIGlmICh0aGlzLnN0YXRlcy5sZW5ndGggPiAxKSB7XHJcbiAgICAgIC8vIHJlbW92ZSBsYXN0IHN0YXRlIC0gdXNlciBjYW4ndCBtYWtlIGFueSBhY3Rpb25cclxuICAgICAgdGhpcy5zdGF0ZXMgPSB0aGlzLnN0YXRlcy5zbGljZSgwLCAtMSk7XHJcbiAgICB9XHJcbiAgICBhamF4Q29uZmlnLmRhdGEgPSBKU09OLnN0cmluZ2lmeSh7XHJcbiAgICAgIG1vZGVsOiB0aGlzLm1vZGVsLFxyXG4gICAgICBtYXhTdGVwczogdGhpcy5tYXhTdGVwcyxcclxuICAgICAgc3RhdGVzOiB0aGlzLnN0YXRlcyxcclxuICAgIH0pO1xyXG4gICAgcmV0dXJuIGFqYXgoUkVQT1JUX1VSTCwgYWpheENvbmZpZyk7XHJcbiAgfVxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBSZXBvcnQ7XHJcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2xlYXJuaW5nL3JlcG9ydC5qcyIsImltcG9ydCBub2RlRmFjdG9yeSBmcm9tICcuLi8uLi91dGlscy9ub2RlRmFjdG9yeSc7XHJcbmltcG9ydCB0aW1lciBmcm9tICcuLi8uLi91dGlscy90aW1lcic7XHJcblxyXG5jb25zdCAkbmFtZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5tb2RlbC1zdGF0ZS1uYW1lJyk7XHJcbmNvbnN0ICRpbWcgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcubW9kZWwtc3RhdGUtaW1nJyk7XHJcbmNvbnN0ICRwYXJhbXMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcubW9kZWwtcGFyYW1zLXZhbHVlcycpO1xyXG5cclxuY29uc3QgJGV2ZW50ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLm1vZGVsLWV2ZW50Jyk7XHJcbmNvbnN0ICRldmVudEhlYWRlciA9ICRldmVudC5xdWVyeVNlbGVjdG9yKCcubW9kZWwtZXZlbnQtbmFtZSBzcGFuJyk7XHJcbmNvbnN0ICRldmVudEJvZHkgPSAkZXZlbnQucXVlcnlTZWxlY3RvcignLm1vZGVsLWV2ZW50LWluZm8nKTtcclxuXHJcbmNvbnN0ICR0aW1lckNvbnRhaW5lciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5tb2RlbC10aW1lcicpO1xyXG4kdGltZXJDb250YWluZXIuYXBwZW5kQ2hpbGQodGltZXIubm9kZSk7XHJcblxyXG5mdW5jdGlvbiBzZXQoeyBuYW1lLCBpbWcsIHBhcmFtZXRlcnMgfSkge1xyXG4gICRuYW1lLnRleHRDb250ZW50ID0gbmFtZTtcclxuICAkaW1nLnNldEF0dHJpYnV0ZSgnc3JjJywgYHVwbG9hZHMvJHtpbWcudXJsfWApO1xyXG4gIHNldFBhcmFtZXRlcnMocGFyYW1ldGVycyk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIHNldFBhcmFtZXRlcnMocGFyYW1zID0gW10pIHtcclxuICBjb25zdCBmcmFnID0gZG9jdW1lbnQuY3JlYXRlRG9jdW1lbnRGcmFnbWVudCgpO1xyXG4gIHBhcmFtcy5mb3JFYWNoKHBhcmFtID0+IGZyYWcuYXBwZW5kQ2hpbGQoY3JlYXRlUGFyYW1ldGVOb2RlKHBhcmFtLm5hbWUsIHBhcmFtLnZhbHVlKSkpO1xyXG5cclxuICAkcGFyYW1zLmlubmVySFRNTCA9ICcnO1xyXG4gICRwYXJhbXMuYXBwZW5kQ2hpbGQoZnJhZyk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGNyZWF0ZVBhcmFtZXRlTm9kZShrZXksIHZhbHVlKSB7XHJcbiAgY29uc3QgZGl2ID0gbm9kZUZhY3RvcnkoJ2RpdicsIHsgY2xhc3NMaXN0OiBbICdwYXJhbWV0ZXInIF0gfSk7XHJcblxyXG4gIGNvbnN0IGtleVNwYW4gPSBub2RlRmFjdG9yeSgnc3BhbicsIHsgdGV4dENvbnRlbnQ6IGtleSB9KTtcclxuICBkaXYuYXBwZW5kQ2hpbGQoa2V5U3Bhbik7XHJcblxyXG4gIGNvbnN0IHZhbHVlU3BhbiA9IG5vZGVGYWN0b3J5KCdzcGFuJywgeyB0ZXh0Q29udGVudDogdmFsdWUgfSk7XHJcbiAgZGl2LmFwcGVuZENoaWxkKHZhbHVlU3Bhbik7XHJcblxyXG4gIHJldHVybiBkaXY7XHJcbn1cclxuXHJcbi8qKiBTZXRzIGV2ZW50IGRhdGEgdG8gVUkgKi9cclxuZnVuY3Rpb24gc2hvd0V2ZW50KGV2ZW50KSB7XHJcbiAgJGV2ZW50SGVhZGVyLnRleHRDb250ZW50ID0gZXZlbnQubmFtZTtcclxuICAkZXZlbnRCb2R5LnRleHRDb250ZW50ID0gZXZlbnQuZGVzYztcclxuICAkZXZlbnQuY2xhc3NMaXN0LnJlbW92ZSgnaXMtaGlkZGVuJywgJ3NsaWRlLXRvcCcpO1xyXG4gIHNob3dUaW1lcigpO1xyXG59XHJcbmZ1bmN0aW9uIGhpZGVFdmVudCgpIHtcclxuICAkZXZlbnQuY2xhc3NMaXN0LmFkZCgnaXMtaGlkZGVuJywgJ3NsaWRlLXRvcCcpO1xyXG4gIGhpZGVUaW1lcigpO1xyXG59XHJcblxyXG5mdW5jdGlvbiBzaG93VGltZXIoKSB7XHJcbiAgJHRpbWVyQ29udGFpbmVyLmNsYXNzTGlzdC5yZW1vdmUoJ2lzLWhpZGRlbicpO1xyXG4gIHRpbWVyLnN0YXJ0KCk7XHJcbn1cclxuZnVuY3Rpb24gaGlkZVRpbWVyKCkge1xyXG4gICR0aW1lckNvbnRhaW5lci5jbGFzc0xpc3QuYWRkKCdpcy1oaWRkZW4nKTtcclxuICB0aW1lci5zdG9wKCk7XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IHtcclxuICBzZXQsXHJcbiAgc2hvd0V2ZW50LFxyXG4gIGhpZGVFdmVudCxcclxufTtcclxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vbGVhcm5pbmcvc2NlbmVfY29tcG9uZW50cy9zdGF0ZS5qcyIsImltcG9ydCBub2RlRmFjdG9yeSBmcm9tICcuLi8uLi91dGlscy9ub2RlRmFjdG9yeSc7XHJcblxyXG5jb25zdCB0b29sVHlwZXMgPSB7XHJcbiAgUkFOR0U6ICdyYW5nZScsXHJcbiAgU1dJVENIOiAnc3dpdGNoJyxcclxufTtcclxuY29uc3QgJHRvb2xzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnRvb2xzLWxpc3QnKTtcclxuXHJcbmZ1bmN0aW9uIGluaXQodG9vbHMpIHtcclxuICBjb25zdCBmcmFnbWVudCA9IGRvY3VtZW50LmNyZWF0ZURvY3VtZW50RnJhZ21lbnQoKTtcclxuXHJcbiAgdG9vbHMuZm9yRWFjaCgodG9vbCkgPT4ge1xyXG4gICAgLy8gY3JlYXRlIHRvb2wgd3JhcHBlclxyXG4gICAgY29uc3QgZGl2ID0gbm9kZUZhY3RvcnkoJ2RpdicsIHsgY2xhc3NMaXN0OiBbICd0b29sJyBdIH0pO1xyXG5cclxuICAgIGNvbnN0IGxhYmVsID0gbm9kZUZhY3RvcnkoJ2xhYmVsJywge1xyXG4gICAgICBjbGFzc0xpc3Q6IFsgJ3Rvb2wtbmFtZScgXSxcclxuICAgICAgdGV4dENvbnRlbnQ6IHRvb2wubmFtZSxcclxuICAgIH0pO1xyXG4gICAgZGl2LmFwcGVuZENoaWxkKGxhYmVsKTtcclxuXHJcbiAgICBjb25zdCB0b29sTm9kZSA9IGNyZWF0ZVRvb2xOb2RlKHRvb2wpO1xyXG4gICAgZGl2LmFwcGVuZENoaWxkKHRvb2xOb2RlKTtcclxuXHJcbiAgICBmcmFnbWVudC5hcHBlbmRDaGlsZChkaXYpO1xyXG4gIH0pO1xyXG5cclxuICAkdG9vbHMuaW5uZXJIVE1MID0gJyc7XHJcbiAgJHRvb2xzLmFwcGVuZENoaWxkKGZyYWdtZW50KTtcclxufVxyXG5cclxuZnVuY3Rpb24gY3JlYXRlVG9vbE5vZGUodG9vbCkge1xyXG4gIHN3aXRjaCAodG9vbC50eXBlKSB7XHJcbiAgICBjYXNlIHRvb2xUeXBlcy5SQU5HRTpcclxuICAgICAgcmV0dXJuIGNyZWF0ZVJhbmdlVG9vbCh0b29sKTtcclxuICAgIGNhc2UgdG9vbFR5cGVzLlNXSVRDSDpcclxuICAgICAgcmV0dXJuIGNyZWF0ZVN3aXRjaFRvb2wodG9vbCk7XHJcbiAgICBkZWZhdWx0OlxyXG4gICAgICByZXR1cm4gJ9Cd0LXQuNC30LLQtdGB0YLQvdGL0Lkg0L/RgNC40LHQvtGAJztcclxuICB9XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGNyZWF0ZVJhbmdlVG9vbCh0b29sKSB7XHJcbiAgY29uc3QgZGl2SW5wdXQgPSBub2RlRmFjdG9yeSgnZGl2JywgeyBjbGFzc0xpc3Q6IFsgJ3JhbmdlJyBdIH0pO1xyXG5cclxuICBjb25zdCBzcGFuTWluID0gbm9kZUZhY3RvcnkoJ3NwYW4nLCB7IHRleHRDb250ZW50OiB0b29sLnJhbmdlVmFsdWVzLm1pbiB9KTtcclxuICBkaXZJbnB1dC5hcHBlbmRDaGlsZChzcGFuTWluKTtcclxuXHJcbiAgY29uc3QgaW5wdXQgPSBub2RlRmFjdG9yeSgnaW5wdXQnLCB7XHJcbiAgICBhdHRyczoge1xyXG4gICAgICAnZGF0YS11dWlkJzogdG9vbC51dWlkLFxyXG4gICAgICAnZGF0YS10eXBlJzogJ3JhbmdlJyxcclxuICAgICAgbmFtZTogdG9vbC5uYW1lLFxyXG4gICAgICB0eXBlOiAncmFuZ2UnLFxyXG4gICAgICBtaW46IHRvb2wucmFuZ2VWYWx1ZXMubWluLFxyXG4gICAgICBtYXg6IHRvb2wucmFuZ2VWYWx1ZXMubWF4LFxyXG4gICAgICB2YWx1ZTogMCxcclxuICAgIH0sXHJcbiAgfSk7XHJcbiAgZGl2SW5wdXQuYXBwZW5kQ2hpbGQoaW5wdXQpO1xyXG5cclxuICBjb25zdCBzcGFuTWF4ID0gbm9kZUZhY3RvcnkoJ3NwYW4nLCB7IHRleHRDb250ZW50OiB0b29sLnJhbmdlVmFsdWVzLm1heCB9KTtcclxuICBkaXZJbnB1dC5hcHBlbmRDaGlsZChzcGFuTWF4KTtcclxuXHJcbiAgY29uc3QgZGl2Q3VycmVudCA9IG5vZGVGYWN0b3J5KCdkaXYnLCB7IGNsYXNzTGlzdDogWyAncmFuZ2UtY3VycmVudC12YWx1ZScgXSB9KTtcclxuICBjb25zdCBzcGFuQ3VycmVudCA9IG5vZGVGYWN0b3J5KCdzcGFuJywgeyB0ZXh0Q29udGVudDogaW5wdXQudmFsdWUgfSk7XHJcbiAgZGl2Q3VycmVudC5hcHBlbmRDaGlsZChzcGFuQ3VycmVudCk7XHJcblxyXG4gIGlucHV0LmFkZEV2ZW50TGlzdGVuZXIoJ2lucHV0JywgKGV2dCkgPT4ge1xyXG4gICAgc3BhbkN1cnJlbnQudGV4dENvbnRlbnQgPSBldnQudGFyZ2V0LnZhbHVlO1xyXG4gIH0pO1xyXG5cclxuICBjb25zdCBmcmFnbWVudCA9IGRvY3VtZW50LmNyZWF0ZURvY3VtZW50RnJhZ21lbnQoKTtcclxuICBmcmFnbWVudC5hcHBlbmRDaGlsZChkaXZJbnB1dCk7XHJcbiAgZnJhZ21lbnQuYXBwZW5kQ2hpbGQoZGl2Q3VycmVudCk7XHJcblxyXG4gIHJldHVybiBmcmFnbWVudDtcclxufVxyXG5cclxuZnVuY3Rpb24gY3JlYXRlU3dpdGNoVG9vbCh0b29sKSB7XHJcbiAgY29uc3QgbGFiZWwgPSBub2RlRmFjdG9yeSgnbGFiZWwnLCB7IGNsYXNzTGlzdDogWyAnc3dpdGNoJyBdIH0pO1xyXG5cclxuICBjb25zdCBpbnB1dCA9IG5vZGVGYWN0b3J5KCdpbnB1dCcsIHtcclxuICAgIGF0dHJzOiB7XHJcbiAgICAgICdkYXRhLXV1aWQnOiB0b29sLnV1aWQsXHJcbiAgICAgICdkYXRhLXR5cGUnOiAnc3dpdGNoJyxcclxuICAgICAgdHlwZTogJ2NoZWNrYm94JyxcclxuICAgIH0sXHJcbiAgfSk7XHJcbiAgbGFiZWwuYXBwZW5kQ2hpbGQoaW5wdXQpO1xyXG5cclxuICBjb25zdCBkaXYgPSBub2RlRmFjdG9yeSgnZGl2JywgeyBjbGFzc0xpc3Q6IFsgJ3NsaWRlcicgXSB9KTtcclxuICBsYWJlbC5hcHBlbmRDaGlsZChkaXYpO1xyXG5cclxuICByZXR1cm4gbGFiZWw7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGdldFRvb2xzRGF0YSgpIHtcclxuICBjb25zdCB0b29sc0RhdGEgPSBbXTtcclxuICBjb25zdCBpbnB1dHMgPSAkdG9vbHMucXVlcnlTZWxlY3RvckFsbCgnaW5wdXRbZGF0YS11dWlkXScpO1xyXG4gIGlucHV0cy5mb3JFYWNoKChpbnB1dCkgPT4ge1xyXG4gICAgY29uc3QgeyB1dWlkLCB0eXBlIH0gPSBpbnB1dC5kYXRhc2V0O1xyXG4gICAgbGV0IHZhbHVlO1xyXG4gICAgc3dpdGNoICh0eXBlKSB7XHJcbiAgICAgIGNhc2UgdG9vbFR5cGVzLlJBTkdFOiB2YWx1ZSA9IHBhcnNlSW50KGlucHV0LnZhbHVlLCAxMCk7IGJyZWFrO1xyXG4gICAgICBjYXNlIHRvb2xUeXBlcy5TV0lUQ0g6IHZhbHVlID0gaW5wdXQuY2hlY2tlZDsgYnJlYWs7XHJcbiAgICAgIGRlZmF1bHQ6IHRocm93IG5ldyBFcnJvcihg0J3QtdC60L7RgNGA0LXQutGC0L3Ri9C5INGC0LjQvyDQv9GA0LjQsdC+0YDQsC4gSUQ6ICR7aWR9YCk7XHJcbiAgICB9XHJcbiAgICB0b29sc0RhdGEucHVzaCh7IHV1aWQsIHZhbHVlIH0pO1xyXG4gIH0pO1xyXG4gIHJldHVybiB0b29sc0RhdGE7XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IHtcclxuICBpbml0LFxyXG4gIGdldFRvb2xzRGF0YSxcclxufTtcclxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vbGVhcm5pbmcvc2NlbmVfY29tcG9uZW50cy90b29scy5qcyIsImltcG9ydCBub2RlRmFjdG9yeSBmcm9tICcuL25vZGVGYWN0b3J5JztcclxuXHJcbmZ1bmN0aW9uIG1zVG9Db250ZW50KG1zKSB7XHJcbiAgY29uc3Qgc2Vjb25kcyA9IE1hdGgucm91bmQobXMgLyAxMDAwKTtcclxuICBjb25zdCBtaW5zID0gTWF0aC5mbG9vcihzZWNvbmRzIC8gNjApO1xyXG4gIGNvbnN0IHNlY29uZHNMZWZ0ID0gc2Vjb25kcyAtIChtaW5zICogNjApO1xyXG5cclxuICByZXR1cm4gYCR7bWluc306JHtzZWNvbmRzTGVmdCA+PSAxMCA/ICcnIDogJzAnfSR7c2Vjb25kc0xlZnR9YDtcclxufVxyXG5cclxuY29uc3QgdGltZXIgPSB7XHJcbiAgc3RhcnRUaW1lOiBudWxsLFxyXG4gIGludGVydmFsOiBudWxsLFxyXG4gIG5vZGU6IG5vZGVGYWN0b3J5KCdzcGFuJywgeyBjbGFzc0xpc3Q6IFsndGltZXInXSwgdGV4dENvbnRlbnQ6ICcwOjAwJyB9KSxcclxuICBzdGFydDogZnVuY3Rpb24oKSB7XHJcbiAgICB0aGlzLnN0YXJ0VGltZSA9IERhdGUubm93KCk7XHJcbiAgICB0aGlzLmludGVydmFsID0gc2V0SW50ZXJ2YWwoKCkgPT4ge1xyXG4gICAgICBjb25zdCBlbGFwc2VkID0gRGF0ZS5ub3coKSAtIHRoaXMuc3RhcnRUaW1lO1xyXG4gICAgICB0aGlzLm5vZGUudGV4dENvbnRlbnQgPSBtc1RvQ29udGVudChlbGFwc2VkKTtcclxuICAgIH0sIDEwMDApO1xyXG4gIH0sXHJcbiAgc3RvcDogZnVuY3Rpb24oKSB7XHJcbiAgICBpZiAoIXRoaXMuc3RhcnRUaW1lKSB7IHJldHVybjsgfVxyXG4gICAgdGhpcy5zdGFydFRpbWUgPSBudWxsO1xyXG4gICAgY2xlYXJJbnRlcnZhbCh0aGlzLmludGVydmFsKTtcclxuICAgIHRoaXMubm9kZS50ZXh0Q29udGVudCA9ICcwOjAwJztcclxuICB9XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IHRpbWVyO1xyXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi91dGlscy90aW1lci5qcyJdLCJzb3VyY2VSb290IjoiIn0=