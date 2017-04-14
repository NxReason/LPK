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
/******/ 	return __webpack_require__(__webpack_require__.s = 26);
/******/ })
/************************************************************************/
/******/ ({

/***/ 0:
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

/***/ 1:
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

/***/ 15:
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

/***/ 16:
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

/***/ 17:
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

/***/ 18:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _nodeFactory = __webpack_require__(1);

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

/***/ 19:
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

/***/ 2:
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

/***/ 21:
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

/***/ 26:
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

/***/ }),

/***/ 49:
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
        steps: this.steps,
        states: this.states
      });
      (0, _ajax2.default)(REPORT_URL, ajaxConfig);
    }
  }]);

  return Report;
}();

exports.default = Report;

/***/ }),

/***/ 5:
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

var _report = __webpack_require__(49);

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
          _this.report.send();
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

/***/ 6:
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

/***/ 9:
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgOTlmMWFhZmY5NzNiMDJjNjM5ZWMiLCJ3ZWJwYWNrOi8vLy4vdXRpbHMvYWpheC5qcyIsIndlYnBhY2s6Ly8vLi91dGlscy9ub2RlRmFjdG9yeS5qcyIsIndlYnBhY2s6Ly8vLi9sZWFybmluZy9tb2RlbF9jb21wb25lbnRzL2FjdGlvbi5qcyIsIndlYnBhY2s6Ly8vLi9sZWFybmluZy9tb2RlbF9jb21wb25lbnRzL2V2ZW50LmpzIiwid2VicGFjazovLy8uL2xlYXJuaW5nL21vZGVsX2NvbXBvbmVudHMvc3RhdGUuanMiLCJ3ZWJwYWNrOi8vLy4vbGVhcm5pbmcvc2NlbmVfY29tcG9uZW50cy9zdGF0ZS5qcyIsIndlYnBhY2s6Ly8vLi9sZWFybmluZy9zY2VuZV9jb21wb25lbnRzL3Rvb2xzLmpzIiwid2VicGFjazovLy8uL3V0aWxzL3B1YnN1Yi5qcyIsIndlYnBhY2s6Ly8vLi91dGlscy90aW1lci5qcyIsIndlYnBhY2s6Ly8vLi9sZWFybmluZy9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9sZWFybmluZy9yZXBvcnQuanMiLCJ3ZWJwYWNrOi8vLy4vbGVhcm5pbmcvbW9kZWwuanMiLCJ3ZWJwYWNrOi8vLy4vbGVhcm5pbmcvc2NlbmUuanMiLCJ3ZWJwYWNrOi8vLy4uL3Nhc3MvbGVhcm5pbmcuc2NzcyJdLCJuYW1lcyI6WyJhamF4IiwicGF0aCIsIm9wdGlvbnMiLCJmdWxsUmVzcG9uc2UiLCJ4aHIiLCJYTUxIdHRwUmVxdWVzdCIsIm9wZW4iLCJtZXRob2QiLCJoZWFkZXJzIiwic2V0WEhSSGVhZGVycyIsInNlbmQiLCJkYXRhIiwiUHJvbWlzZSIsInJlc29sdmUiLCJyZWplY3QiLCJvbnJlYWR5c3RhdGVjaGFuZ2UiLCJyZWFkeVN0YXRlIiwic3RhdHVzIiwicmVzcG9uc2VUZXh0Iiwic3RhdHVzVGV4dCIsImhlYWRlciIsInNldFJlcXVlc3RIZWFkZXIiLCJub2RlRmFjdG9yeSIsInR5cGUiLCJwYXJhbXMiLCJub2RlIiwiZG9jdW1lbnQiLCJjcmVhdGVFbGVtZW50IiwiYXBwZW5kQ2xhc3NlcyIsImFwcGVuZEF0dHJzIiwiaW5zZXJ0VGV4dENvbnRlbnQiLCJjbGFzc0xpc3QiLCJmb3JFYWNoIiwiYWRkIiwiY2xhc3NOYW1lIiwiYXR0cnMiLCJhdHRyTmFtZXMiLCJPYmplY3QiLCJrZXlzIiwic2V0QXR0cmlidXRlIiwiYXR0ck5hbWUiLCJ0ZXh0Q29udGVudCIsIkFjdGlvbiIsIm1pblRpbWUiLCJtYXhUaW1lIiwibmV4dFN0YXRlIiwiaW5hY3RpdmUiLCJ0b29scyIsImluaXRUb29scyIsInRpbWUiLCJyaWdodFRpbWUiLCJyaWdodERhdGEiLCJldmVyeSIsImNoZWNrVG9vbCIsImZpbmQiLCJvYmoiLCJpZCIsInRvb2wiLCJ2YWx1ZSIsImJvb2xWYWx1ZSIsImluY2x1ZGVzVmFsdWUiLCJtaW5WYWx1ZSIsIm1heFZhbHVlIiwiYm9yZGVycyIsIlR5cGVFcnJvciIsIm1hcCIsIkFjdGlvblRvb2wiLCJFdmVudCIsIm5hbWUiLCJkZXNjcmlwdGlvbiIsIlN0YXRlIiwiaW1nIiwibGFzdCIsImV2ZW50IiwiYWN0aW9ucyIsImFjdGlvbiIsInRpbWVzIiwiZ2V0QWxsQWN0aW9uVGltZXMiLCJNYXRoIiwibWF4Iiwic3VpdGVkQWN0aW9ucyIsImZpbHRlciIsImlzU3VpdGFibGUiLCJsZW5ndGgiLCIkbmFtZSIsInF1ZXJ5U2VsZWN0b3IiLCIkaW1nIiwiJHBhcmFtcyIsIiRldmVudCIsIiRldmVudEhlYWRlciIsIiRldmVudEJvZHkiLCIkdGltZXJDb250YWluZXIiLCJhcHBlbmRDaGlsZCIsInNldCIsInNldFBhcmFtZXRlcnMiLCJmcmFnIiwiY3JlYXRlRG9jdW1lbnRGcmFnbWVudCIsImNyZWF0ZVBhcmFtZXRlTm9kZSIsInBhcmFtIiwiaW5uZXJIVE1MIiwia2V5IiwiZGl2Iiwia2V5U3BhbiIsInZhbHVlU3BhbiIsInNob3dFdmVudCIsInJlbW92ZSIsInNob3dUaW1lciIsImhpZGVFdmVudCIsImhpZGVUaW1lciIsInN0YXJ0Iiwic3RvcCIsInRvb2xUeXBlcyIsIlJBTkdFIiwiU1dJVENIIiwiJHRvb2xzIiwiaW5pdCIsImZyYWdtZW50IiwibGFiZWwiLCJ0b29sTm9kZSIsImNyZWF0ZVRvb2xOb2RlIiwiY3JlYXRlUmFuZ2VUb29sIiwiY3JlYXRlU3dpdGNoVG9vbCIsImRpdklucHV0Iiwic3Bhbk1pbiIsIm1pbiIsImlucHV0Iiwic3Bhbk1heCIsImRpdkN1cnJlbnQiLCJzcGFuQ3VycmVudCIsImFkZEV2ZW50TGlzdGVuZXIiLCJldnQiLCJ0YXJnZXQiLCJnZXRUb29sc0RhdGEiLCJ0b29sc0RhdGEiLCJpbnB1dHMiLCJxdWVyeVNlbGVjdG9yQWxsIiwiZGF0YXNldCIsInBhcnNlSW50IiwiY2hlY2tlZCIsIkVycm9yIiwicHVzaCIsInB1YnN1YiIsInRvcGljcyIsInN1YnNjcmliZSIsInRvcGljIiwibGlzdGVuZXIiLCJxdWV1ZSIsImluZGV4IiwicHVibGlzaCIsImluZm8iLCJpdGVtcyIsIml0ZW0iLCJtc1RvQ29udGVudCIsIm1zIiwic2Vjb25kcyIsInJvdW5kIiwibWlucyIsImZsb29yIiwic2Vjb25kc0xlZnQiLCJ0aW1lciIsInN0YXJ0VGltZSIsImludGVydmFsIiwiRGF0ZSIsIm5vdyIsInNldEludGVydmFsIiwiZWxhcHNlZCIsImNsZWFySW50ZXJ2YWwiLCJsb2FkTW9kZWwiLCJ0aGVuIiwiSlNPTiIsInBhcnNlIiwicmVzcG9uc2UiLCIkc2VsZWN0IiwiJGxvYWRCdXR0b24iLCJtb2RlbCIsIm1vZGVsSWQiLCJzaG93Q29udGVudCIsImVuYWJsZUJ1dHRvbnMiLCIkc3RhcnRCdXR0b24iLCJkaXNhYmxlQnV0dG9ucyIsIiRzdG9wQnV0dG9uIiwiJHJ1bkJ1dHRvbiIsImNhdGNoIiwiY29uc29sZSIsImVycm9yIiwiZXJyIiwic2V0U3RhdGUiLCJzdGF0ZSIsIlJFUE9SVF9VUkwiLCJhamF4Q29uZmlnIiwiUmVwb3J0Iiwic3RlcHMiLCJtb2RlbE5hbWUiLCJtYXhTdGVwcyIsInN0YXRlcyIsImN1cnJlbnRTdGF0ZSIsImdldEluYWN0aXZlVGltZSIsImFjdGlvbnNOdW1iZXIiLCJzcGVudFRpbWUiLCJzZXRJbmFjdGl2ZSIsInNsaWNlIiwic3RyaW5naWZ5IiwiSU5JVElBTF9TVEFURV9OQU1FIiwiU1RPUF9TVEFURV9OQU1FIiwiTW9kZWwiLCJicmVha1RpbWUiLCJnZXRTdGF0ZSIsImluaXRpYWxTdGF0ZSIsInRpbWVvdXQiLCJzdWJJbnB1dCIsInN1YlN0b3AiLCJzdGFydFN0YXRlIiwic3RvcFN0YXRlIiwicmVwb3J0IiwiaGFuZGxlTmV3U3RhdGUiLCJpbnRlcnZhbHMiLCJpIiwibWFrZUJyZWFrIiwiaGFuZGxlRXZlbnQiLCJzZXRUaW1lb3V0IiwiY2xlYXJTdWJzIiwiZXZlbnRTdGFydFRpbWUiLCJpbmNyZWFzZUFjdGlvbnNOdW1iZXIiLCJ0aW1lU3BlbnQiLCJuZXh0U3RhdGVJZCIsImhhbmRsZUlucHV0Iiwic2V0U3BlbnRUaW1lIiwiaW5hY3RpdmVUaW1lIiwiZ2V0SW5hY3RpdmVBY3Rpb24iLCJwdXNoU3RhdGUiLCJjbGVhclRpbWVvdXQiLCJleHBvcnRzIiwiJG1vZGVsTmFtZSIsIiRjb250ZW50Iiwic2V0Q29udGVudERpc3BsYXkiLCJoaWRlQ29udGVudCIsImRpc3BsYXkiLCJzdHlsZSIsImJ1dHRvbnMiLCJzZXRCdXR0b25zU3RhdGUiLCJidXR0b24iLCJkaXNhYmxlZCIsInN0YXRlRGF0YSIsImV2ZW50RGF0YSJdLCJtYXBwaW5ncyI6IjtBQUFBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBLG1EQUEyQyxjQUFjOztBQUV6RDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQUs7QUFDTDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtB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QUNBTCxTQUFRdEQsYUFBUixHQUF3QixZQUFxQjtBQUFBLG9DQUFUNkQsT0FBUztBQUFUQSxXQUFTO0FBQUE7O0FBQzNDQyxrQkFBZ0JELE9BQWhCLEVBQXlCLEtBQXpCO0FBQ0EsU0FBTyxJQUFQO0FBQ0QsQ0FIRDtBQUlBUCxTQUFRcEQsY0FBUixHQUF5QixZQUFxQjtBQUFBLHFDQUFUMkQsT0FBUztBQUFUQSxXQUFTO0FBQUE7O0FBQzVDQyxrQkFBZ0JELE9BQWhCLEVBQXlCLElBQXpCO0FBQ0EsU0FBTyxJQUFQO0FBQ0QsQ0FIRDtBQUlBLFNBQVNDLGVBQVQsQ0FBeUJELE9BQXpCLEVBQWtDcEwsS0FBbEMsRUFBeUM7QUFDdkNvTCxVQUFROU0sT0FBUixDQUFnQjtBQUFBLFdBQVVnTixPQUFPQyxRQUFQLEdBQWtCdkwsS0FBNUI7QUFBQSxHQUFoQjtBQUNEOztBQUVEO0FBQ0E2SyxTQUFRbkcsWUFBUixHQUF1QjtBQUFBLFNBQ3JCLGdCQUFNQSxZQUFOLEVBRHFCO0FBQUEsQ0FBdkI7O0FBR0FtRyxTQUFRN0MsUUFBUixHQUFtQjtBQUFBLFNBQ2pCLGdCQUFNN0YsR0FBTixDQUFVcUosU0FBVixDQURpQjtBQUFBLENBQW5COztBQUdBWCxTQUFRL0gsU0FBUixHQUFvQjtBQUFBLFNBQ2xCLGdCQUFNQSxTQUFOLENBQWdCMkksU0FBaEIsQ0FEa0I7QUFBQSxDQUFwQjs7QUFHQVosU0FBUTVILFNBQVIsR0FBb0I7QUFBQSxTQUNsQixnQkFBTUEsU0FBTixFQURrQjtBQUFBLENBQXBCOztrQkFHZTRILFE7Ozs7Ozs7QUN0RGYseUMiLCJmaWxlIjoibGVhcm5pbmcuYnVuZGxlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pXG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG5cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGlkZW50aXR5IGZ1bmN0aW9uIGZvciBjYWxsaW5nIGhhcm1vbnkgaW1wb3J0cyB3aXRoIHRoZSBjb3JyZWN0IGNvbnRleHRcbiBcdF9fd2VicGFja19yZXF1aXJlX18uaSA9IGZ1bmN0aW9uKHZhbHVlKSB7IHJldHVybiB2YWx1ZTsgfTtcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7XG4gXHRcdFx0XHRjb25maWd1cmFibGU6IGZhbHNlLFxuIFx0XHRcdFx0ZW51bWVyYWJsZTogdHJ1ZSxcbiBcdFx0XHRcdGdldDogZ2V0dGVyXG4gXHRcdFx0fSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gMjYpO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIHdlYnBhY2svYm9vdHN0cmFwIDk5ZjFhYWZmOTczYjAyYzYzOWVjIiwiZnVuY3Rpb24gYWpheChwYXRoID0gJycsIG9wdGlvbnMgPSB7fSwgZnVsbFJlc3BvbnNlID0gZmFsc2UpIHtcclxuICBjb25zdCB4aHIgPSBuZXcgWE1MSHR0cFJlcXVlc3QoKTtcclxuICB4aHIub3BlbihvcHRpb25zLm1ldGhvZCB8fCAnR0VUJywgcGF0aCwgdHJ1ZSk7XHJcbiAgaWYgKG9wdGlvbnMuaGVhZGVycykgeyBzZXRYSFJIZWFkZXJzKHhociwgb3B0aW9ucy5oZWFkZXJzKTsgfVxyXG4gIHhoci5zZW5kKG9wdGlvbnMuZGF0YSk7XHJcblxyXG4gIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XHJcbiAgICB4aHIub25yZWFkeXN0YXRlY2hhbmdlID0gZnVuY3Rpb24oKSB7XHJcbiAgICAgIGlmKHhoci5yZWFkeVN0YXRlID09IDQpIHtcclxuICAgICAgICBpZih4aHIuc3RhdHVzID09IDIwMCkge1xyXG4gICAgICAgICAgaWYgKGZ1bGxSZXNwb25zZSkge1xyXG4gICAgICAgICAgICByZXNvbHZlKHhocik7XHJcbiAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICByZXNvbHZlKHhoci5yZXNwb25zZVRleHQpO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICByZWplY3QoeGhyLnN0YXR1c1RleHQpO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH0pXHJcbn1cclxuXHJcbmZ1bmN0aW9uIHNldFhIUkhlYWRlcnMoeGhyLCBoZWFkZXJzKSB7XHJcbiAgZm9yIChsZXQgaGVhZGVyIGluIGhlYWRlcnMpIHtcclxuICAgIHhoci5zZXRSZXF1ZXN0SGVhZGVyKGhlYWRlciwgaGVhZGVyc1toZWFkZXJdKTtcclxuICB9XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IGFqYXg7XHJcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3V0aWxzL2FqYXguanMiLCJjb25zdCBub2RlRmFjdG9yeSA9IGZ1bmN0aW9uKHR5cGUgPSAnZGl2JywgcGFyYW1zID0ge30pIHtcclxuICBjb25zdCBub2RlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCh0eXBlKTtcclxuXHJcbiAgYXBwZW5kQ2xhc3Nlcyhub2RlLCBwYXJhbXMpO1xyXG4gIGFwcGVuZEF0dHJzKG5vZGUsIHBhcmFtcyk7XHJcbiAgaW5zZXJ0VGV4dENvbnRlbnQobm9kZSwgcGFyYW1zKTtcclxuXHJcbiAgcmV0dXJuIG5vZGU7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGFwcGVuZENsYXNzZXMobm9kZSwgeyBjbGFzc0xpc3QgfSkge1xyXG4gIGlmIChjbGFzc0xpc3QgJiYgY2xhc3NMaXN0LmZvckVhY2gpIHtcclxuICAgIGNsYXNzTGlzdC5mb3JFYWNoKGNsYXNzTmFtZSA9PiBub2RlLmNsYXNzTGlzdC5hZGQoY2xhc3NOYW1lKSk7XHJcbiAgfVxyXG59XHJcblxyXG5mdW5jdGlvbiBhcHBlbmRBdHRycyhub2RlLCB7IGF0dHJzIH0pIHtcclxuICBpZiAoYXR0cnMpIHtcclxuICAgIGNvbnN0IGF0dHJOYW1lcyA9IE9iamVjdC5rZXlzKGF0dHJzKTtcclxuICAgIGF0dHJOYW1lcy5mb3JFYWNoKGF0dHJOYW1lID0+IG5vZGUuc2V0QXR0cmlidXRlKGF0dHJOYW1lLCBhdHRyc1thdHRyTmFtZV0pKTtcclxuICB9XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGluc2VydFRleHRDb250ZW50KG5vZGUsIHsgdGV4dENvbnRlbnQgPSBcIlwiIH0pIHtcclxuICBub2RlLnRleHRDb250ZW50ID0gdGV4dENvbnRlbnQ7XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IG5vZGVGYWN0b3J5O1xyXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi91dGlscy9ub2RlRmFjdG9yeS5qcyIsImNsYXNzIEFjdGlvbiB7XHJcbiAgY29uc3RydWN0b3IoZGF0YSkge1xyXG4gICAgdGhpcy5taW5UaW1lID0gZGF0YS5taW5UaW1lO1xyXG4gICAgdGhpcy5tYXhUaW1lID0gZGF0YS5tYXhUaW1lO1xyXG4gICAgdGhpcy5uZXh0U3RhdGUgPSBkYXRhLm5leHRTdGF0ZTtcclxuICAgIGlmIChkYXRhLmluYWN0aXZlKSB7XHJcbiAgICAgIHRoaXMuaW5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICB0aGlzLnRvb2xzID0gW107XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB0aGlzLmluYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgIHRoaXMudG9vbHMgPSB0aGlzLmluaXRUb29scyhkYXRhLnRvb2xzKTtcclxuICAgIH1cclxuXHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBAcGFyYW0gW3sgaWQ6IE51bWJlciwgdmFsdWU6IE51bWJlci9Cb29sZWFuIH0sIHsuLi59XVxyXG4gICAqIEBwYXJhbSBOdW1iZXJcclxuICAgKiBAcmV0dXJuIEJvb2xlYW5cclxuICAgKi9cclxuICBpc1N1aXRhYmxlKGRhdGEsIHRpbWUpIHtcclxuICAgIHJldHVybiB0aGlzLnJpZ2h0VGltZSh0aW1lKSAmJiB0aGlzLnJpZ2h0RGF0YShkYXRhKTtcclxuICB9XHJcblxyXG4gIHJpZ2h0RGF0YShkYXRhID0gW10pIHtcclxuICAgIHJldHVybiB0aGlzLnRvb2xzLmV2ZXJ5KHRvb2wgPT4ge1xyXG4gICAgICAvLyDQldGB0LvQuCDRgdGA0LXQtNC4INC/0L7Qu9GD0YfQtdC90L3Ri9GFINC40YLQtdC80L7QsiDQvdC10YIsINGC0L7Qs9C+INC60L7RgtC+0YDRi9C5INC10YHRgtGMINCyINC00LDQvdC90L7QvCDRjdC60YjQtdC90LVcclxuICAgICAgY29uc3QgY2hlY2tUb29sID0gZGF0YS5maW5kKG9iaiA9PiBvYmouaWQgPT0gdG9vbC5pZCk7XHJcbiAgICAgIGlmICghY2hlY2tUb29sKSB7IHJldHVybiBmYWxzZTsgfVxyXG5cclxuICAgICAgaWYgKHRvb2wudHlwZSA9PT0gJ3N3aXRjaCcpIHsgcmV0dXJuIGNoZWNrVG9vbC52YWx1ZSA9PT0gdG9vbC5ib29sVmFsdWU7IH1cclxuXHJcbiAgICAgIGlmICh0b29sLnR5cGUgPT09ICdyYW5nZScpIHsgcmV0dXJuIHRoaXMuaW5jbHVkZXNWYWx1ZShjaGVja1Rvb2wudmFsdWUsIFsgdG9vbC5taW5WYWx1ZSwgdG9vbC5tYXhWYWx1ZSBdKSB9XHJcblxyXG4gICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIGluY2x1ZGVzVmFsdWUodmFsdWUsIGJvcmRlcnMpIHtcclxuICAgIGlmICh0eXBlb2YgdmFsdWUgIT09ICdudW1iZXInKSB0aHJvdyBuZXcgVHlwZUVycm9yKCdWYWx1ZSBzaG91bGQgYmUgaW50ZWdlcicpO1xyXG4gICAgcmV0dXJuICh2YWx1ZSA+PSBib3JkZXJzWzBdKSAmJiAodmFsdWUgPD0gYm9yZGVyc1sxXSk7XHJcbiAgfVxyXG5cclxuICByaWdodFRpbWUodGltZSkge1xyXG4gICAgaWYgKHR5cGVvZiB0aW1lICE9PSAnbnVtYmVyJykgdGhyb3cgbmV3IFR5cGVFcnJvcignVGltZSBzaG91bGQgYmUgaW50ZWdlciAobXMpJyk7XHJcbiAgICByZXR1cm4gKHRpbWUgPj0gdGhpcy5taW5UaW1lKSAmJiAodGltZSA8PSB0aGlzLm1heFRpbWUpO1xyXG4gIH1cclxuXHJcbiAgaW5pdFRvb2xzKHRvb2xzKSB7XHJcbiAgICByZXR1cm4gdG9vbHMubWFwKHRvb2wgPT4ge1xyXG4gICAgICByZXR1cm4ge1xyXG4gICAgICAgIGlkOiB0b29sLmlkLFxyXG4gICAgICAgIHR5cGU6IHRvb2wudHlwZSxcclxuICAgICAgICBtaW5WYWx1ZTogdG9vbC5BY3Rpb25Ub29sLm1pblZhbHVlLFxyXG4gICAgICAgIG1heFZhbHVlOiB0b29sLkFjdGlvblRvb2wubWF4VmFsdWUsXHJcbiAgICAgICAgYm9vbFZhbHVlOiB0b29sLkFjdGlvblRvb2wuYm9vbFZhbHVlXHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG4gIH1cclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgQWN0aW9uO1xyXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9sZWFybmluZy9tb2RlbF9jb21wb25lbnRzL2FjdGlvbi5qcyIsImNsYXNzIEV2ZW50IHtcclxuICBjb25zdHJ1Y3RvcihkYXRhKSB7XHJcbiAgICB0aGlzLmlkID0gZGF0YS5pZDtcclxuICAgIHRoaXMubmFtZSA9IGRhdGEubmFtZTtcclxuICAgIHRoaXMuZGVzY3JpcHRpb24gPSBkYXRhLmRlc2NyaXB0aW9uO1xyXG4gIH1cclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgRXZlbnQ7XHJcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2xlYXJuaW5nL21vZGVsX2NvbXBvbmVudHMvZXZlbnQuanMiLCJpbXBvcnQgRXZlbnQgZnJvbSAnLi9ldmVudCcgO1xyXG5pbXBvcnQgQWN0aW9uIGZyb20gJy4vYWN0aW9uJztcclxuXHJcbmNsYXNzIFN0YXRlIHtcclxuICBjb25zdHJ1Y3RvcihkYXRhKSB7XHJcbiAgICB0aGlzLmlkID0gZGF0YS5pZDtcclxuICAgIHRoaXMubmFtZSA9IGRhdGEubmFtZTtcclxuICAgIHRoaXMuaW1nID0gZGF0YS5pbWc7XHJcbiAgICB0aGlzLnBhcmFtcyA9IGRhdGEucGFyYW1zO1xyXG5cclxuICAgIGlmKGRhdGEubGFzdCkge1xyXG4gICAgICB0aGlzLmxhc3QgPSB0cnVlO1xyXG4gICAgICB0aGlzLmV2ZW50ID0gbnVsbDtcclxuICAgICAgdGhpcy5hY3Rpb25zID0gbnVsbDtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHRoaXMuZXZlbnQgPSBuZXcgRXZlbnQoZGF0YS5ldmVudCk7XHJcbiAgICAgIHRoaXMuYWN0aW9ucyA9IGRhdGEuYWN0aW9ucy5tYXAoYWN0aW9uID0+IG5ldyBBY3Rpb24oYWN0aW9uKSk7XHJcbiAgICAgIHRoaXMubGFzdCA9IGZhbHNlO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgZ2V0SW5hY3RpdmVUaW1lKCkge1xyXG4gICAgY29uc3QgdGltZXMgPSB0aGlzLmdldEFsbEFjdGlvblRpbWVzKCk7XHJcbiAgICByZXR1cm4gTWF0aC5tYXgoLi4udGltZXMpO1xyXG4gIH1cclxuXHJcbiAgZ2V0SW5hY3RpdmVBY3Rpb24oKSB7XHJcbiAgICByZXR1cm4gdGhpcy5hY3Rpb25zLmZpbmQoYWN0aW9uID0+IGFjdGlvbi5pbmFjdGl2ZSA9PT0gdHJ1ZSk7XHJcbiAgfVxyXG5cclxuICBnZXRBbGxBY3Rpb25UaW1lcygpIHtcclxuICAgIHJldHVybiB0aGlzLmFjdGlvbnMubWFwKGFjdGlvbiA9PiBhY3Rpb24ubWF4VGltZSB8fCAwKTtcclxuICB9XHJcblxyXG4gIGhhbmRsZUlucHV0KGRhdGEsIHRpbWUpIHtcclxuICAgIGNvbnN0IHN1aXRlZEFjdGlvbnMgPSB0aGlzLmFjdGlvbnMuZmlsdGVyKGFjdGlvbiA9PiBhY3Rpb24uaXNTdWl0YWJsZShkYXRhLCB0aW1lKSk7XHJcbiAgICBpZiAoc3VpdGVkQWN0aW9ucy5sZW5ndGggPiAwKSB7XHJcbiAgICAgIHJldHVybiBzdWl0ZWRBY3Rpb25zWzBdLm5leHRTdGF0ZTtcclxuICAgIH1cclxuICAgIHJldHVybiBudWxsO1xyXG4gIH1cclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgU3RhdGU7XHJcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2xlYXJuaW5nL21vZGVsX2NvbXBvbmVudHMvc3RhdGUuanMiLCJpbXBvcnQgbm9kZUZhY3RvcnkgZnJvbSAnLi4vLi4vdXRpbHMvbm9kZUZhY3RvcnknO1xyXG5pbXBvcnQgdGltZXIgZnJvbSAnLi4vLi4vdXRpbHMvdGltZXInO1xyXG5cclxuY29uc3QgJG5hbWUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcubW9kZWwtc3RhdGUtbmFtZScpO1xyXG5jb25zdCAkaW1nID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLm1vZGVsLXN0YXRlLWltZycpO1xyXG5jb25zdCAkcGFyYW1zID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLm1vZGVsLXBhcmFtcy12YWx1ZXMnKTtcclxuXHJcbmNvbnN0ICRldmVudCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5tb2RlbC1ldmVudCcpO1xyXG5jb25zdCAkZXZlbnRIZWFkZXIgPSAkZXZlbnQucXVlcnlTZWxlY3RvcignLm1vZGVsLWV2ZW50LW5hbWUgc3BhbicpO1xyXG5jb25zdCAkZXZlbnRCb2R5ID0gJGV2ZW50LnF1ZXJ5U2VsZWN0b3IoJy5tb2RlbC1ldmVudC1pbmZvJyk7XHJcblxyXG5jb25zdCAkdGltZXJDb250YWluZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcubW9kZWwtdGltZXInKTtcclxuJHRpbWVyQ29udGFpbmVyLmFwcGVuZENoaWxkKHRpbWVyLm5vZGUpO1xyXG5cclxuZnVuY3Rpb24gc2V0KHsgbmFtZSwgaW1nLCBwYXJhbXMgfSkge1xyXG4gICRuYW1lLnRleHRDb250ZW50ID0gbmFtZTtcclxuICAkaW1nLnNldEF0dHJpYnV0ZSgnc3JjJywgaW1nKTtcclxuICBzZXRQYXJhbWV0ZXJzKHBhcmFtcyk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIHNldFBhcmFtZXRlcnMocGFyYW1zID0gW10pIHtcclxuICBjb25zdCBmcmFnID0gZG9jdW1lbnQuY3JlYXRlRG9jdW1lbnRGcmFnbWVudCgpO1xyXG4gIHBhcmFtcy5mb3JFYWNoKHBhcmFtID0+IGZyYWcuYXBwZW5kQ2hpbGQoY3JlYXRlUGFyYW1ldGVOb2RlKHBhcmFtLm5hbWUsIHBhcmFtLnZhbHVlKSkpO1xyXG5cclxuICAkcGFyYW1zLmlubmVySFRNTCA9IFwiXCI7XHJcbiAgJHBhcmFtcy5hcHBlbmRDaGlsZChmcmFnKTtcclxufVxyXG5cclxuZnVuY3Rpb24gY3JlYXRlUGFyYW1ldGVOb2RlKGtleSwgdmFsdWUpIHtcclxuICBjb25zdCBkaXYgPSBub2RlRmFjdG9yeSgnZGl2JywgeyBjbGFzc0xpc3Q6IFsncGFyYW1ldGVyJ10gfSk7XHJcblxyXG4gIGNvbnN0IGtleVNwYW4gPSBub2RlRmFjdG9yeSgnc3BhbicsIHsgdGV4dENvbnRlbnQ6IGtleSB9KTtcclxuICBkaXYuYXBwZW5kQ2hpbGQoa2V5U3Bhbik7XHJcblxyXG4gIGNvbnN0IHZhbHVlU3BhbiA9IG5vZGVGYWN0b3J5KCdzcGFuJywgeyB0ZXh0Q29udGVudDogdmFsdWUgfSk7XHJcbiAgZGl2LmFwcGVuZENoaWxkKHZhbHVlU3Bhbik7XHJcblxyXG4gIHJldHVybiBkaXY7XHJcbn1cclxuXHJcblxyXG4vKiogU2V0cyBldmVudCBkYXRhIHRvIFVJICovXHJcbmZ1bmN0aW9uIHNob3dFdmVudChldmVudCkge1xyXG4gICRldmVudEhlYWRlci50ZXh0Q29udGVudCA9IGV2ZW50Lm5hbWU7XHJcbiAgJGV2ZW50Qm9keS50ZXh0Q29udGVudCA9IGV2ZW50LmRlc2NyaXB0aW9uO1xyXG4gICRldmVudC5jbGFzc0xpc3QucmVtb3ZlKCdpcy1oaWRkZW4nLCAnc2xpZGUtdG9wJyk7XHJcbiAgc2hvd1RpbWVyKCk7XHJcbn1cclxuZnVuY3Rpb24gaGlkZUV2ZW50KCkge1xyXG4gICRldmVudC5jbGFzc0xpc3QuYWRkKCdpcy1oaWRkZW4nLCAnc2xpZGUtdG9wJyk7XHJcbiAgaGlkZVRpbWVyKCk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIHNob3dUaW1lcigpIHtcclxuICAkdGltZXJDb250YWluZXIuY2xhc3NMaXN0LnJlbW92ZSgnaXMtaGlkZGVuJyk7XHJcbiAgdGltZXIuc3RhcnQoKTtcclxufVxyXG5mdW5jdGlvbiBoaWRlVGltZXIoKSB7XHJcbiAgJHRpbWVyQ29udGFpbmVyLmNsYXNzTGlzdC5hZGQoJ2lzLWhpZGRlbicpO1xyXG4gIHRpbWVyLnN0b3AoKTtcclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQge1xyXG4gIHNldCxcclxuICBzaG93RXZlbnQsXHJcbiAgaGlkZUV2ZW50XHJcbn1cclxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vbGVhcm5pbmcvc2NlbmVfY29tcG9uZW50cy9zdGF0ZS5qcyIsImltcG9ydCBub2RlRmFjdG9yeSBmcm9tICcuLi8uLi91dGlscy9ub2RlRmFjdG9yeSc7XHJcblxyXG5jb25zdCB0b29sVHlwZXMgPSB7XHJcbiAgUkFOR0U6ICdyYW5nZScsXHJcbiAgU1dJVENIOiAnc3dpdGNoJ1xyXG59XHJcbmNvbnN0ICR0b29scyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy50b29scy1saXN0Jyk7XHJcblxyXG5mdW5jdGlvbiBpbml0KHRvb2xzKSB7XHJcbiAgY29uc3QgZnJhZ21lbnQgPSBkb2N1bWVudC5jcmVhdGVEb2N1bWVudEZyYWdtZW50KCk7XHJcblxyXG4gIHRvb2xzLmZvckVhY2godG9vbCA9PiB7XHJcbiAgICAvLyBjcmVhdGUgdG9vbCB3cmFwcGVyXHJcbiAgICBjb25zdCBkaXYgPSBub2RlRmFjdG9yeSgnZGl2JywgeyBjbGFzc0xpc3Q6IFsndG9vbCddIH0pO1xyXG5cclxuICAgIGNvbnN0IGxhYmVsID0gbm9kZUZhY3RvcnkoJ2xhYmVsJywge1xyXG4gICAgICBjbGFzc0xpc3Q6IFsndG9vbC1uYW1lJ10sXHJcbiAgICAgIGF0dHJzOiB7IFwiZm9yXCI6IHRvb2wubmFtZSB9LFxyXG4gICAgICB0ZXh0Q29udGVudDogdG9vbC5uYW1lXHJcbiAgICB9KTtcclxuICAgIGRpdi5hcHBlbmRDaGlsZChsYWJlbCk7XHJcblxyXG4gICAgY29uc3QgdG9vbE5vZGUgPSBjcmVhdGVUb29sTm9kZSh0b29sKTtcclxuICAgIGRpdi5hcHBlbmRDaGlsZCh0b29sTm9kZSk7XHJcblxyXG4gICAgZnJhZ21lbnQuYXBwZW5kQ2hpbGQoZGl2KTtcclxuICB9KTtcclxuXHJcbiAgJHRvb2xzLmlubmVySFRNTCA9IFwiXCI7XHJcbiAgJHRvb2xzLmFwcGVuZENoaWxkKGZyYWdtZW50KTtcclxufVxyXG5cclxuZnVuY3Rpb24gY3JlYXRlVG9vbE5vZGUodG9vbCkge1xyXG4gIHN3aXRjaCh0b29sLnR5cGUpIHtcclxuICAgIGNhc2UgdG9vbFR5cGVzLlJBTkdFOiAgIHJldHVybiBjcmVhdGVSYW5nZVRvb2wodG9vbCk7XHJcbiAgICBjYXNlIHRvb2xUeXBlcy5TV0lUQ0g6ICByZXR1cm4gY3JlYXRlU3dpdGNoVG9vbCh0b29sKTtcclxuICAgIGRlZmF1bHQ6ICAgICAgICAgICAgICAgIHJldHVybiAn0J3QtdC40LfQstC10YHRgtC90YvQuSDQv9GA0LjQsdC+0YAnO1xyXG4gIH1cclxufVxyXG5cclxuZnVuY3Rpb24gY3JlYXRlUmFuZ2VUb29sKHRvb2wpIHtcclxuICBjb25zdCBkaXZJbnB1dCA9IG5vZGVGYWN0b3J5KCdkaXYnLCB7IGNsYXNzTGlzdDogWydyYW5nZSddIH0pO1xyXG5cclxuICBjb25zdCBzcGFuTWluID0gbm9kZUZhY3RvcnkoJ3NwYW4nLCB7IHRleHRDb250ZW50OiB0b29sLm1pbiB9KTtcclxuICBkaXZJbnB1dC5hcHBlbmRDaGlsZChzcGFuTWluKVxyXG5cclxuICBjb25zdCBpbnB1dCA9IG5vZGVGYWN0b3J5KCdpbnB1dCcsIHtcclxuICAgIGF0dHJzOiB7XHJcbiAgICAgICdkYXRhLWlkJzogdG9vbC5pZCxcclxuICAgICAgJ2RhdGEtdHlwZSc6ICdyYW5nZScsXHJcbiAgICAgICduYW1lJzogdG9vbC5uYW1lLFxyXG4gICAgICAndHlwZSc6ICdyYW5nZScsXHJcbiAgICAgICdtaW4nOiB0b29sLm1pbixcclxuICAgICAgJ21heCc6IHRvb2wubWF4XHJcbiAgICB9XHJcbiAgfSk7XHJcbiAgZGl2SW5wdXQuYXBwZW5kQ2hpbGQoaW5wdXQpO1xyXG5cclxuICBjb25zdCBzcGFuTWF4ID0gbm9kZUZhY3RvcnkoJ3NwYW4nLCB7IHRleHRDb250ZW50OiB0b29sLm1heCB9KTtcclxuICBkaXZJbnB1dC5hcHBlbmRDaGlsZChzcGFuTWF4KTtcclxuXHJcbiAgY29uc3QgZGl2Q3VycmVudCA9IG5vZGVGYWN0b3J5KCdkaXYnLCB7IGNsYXNzTGlzdDogWydyYW5nZS1jdXJyZW50LXZhbHVlJ10gfSk7XHJcbiAgY29uc3Qgc3BhbkN1cnJlbnQgPSBub2RlRmFjdG9yeSgnc3BhbicsIHsgdGV4dENvbnRlbnQ6IGlucHV0LnZhbHVlIH0pO1xyXG4gIGRpdkN1cnJlbnQuYXBwZW5kQ2hpbGQoc3BhbkN1cnJlbnQpO1xyXG5cclxuICBpbnB1dC5hZGRFdmVudExpc3RlbmVyKCdpbnB1dCcsIChldnQpID0+IHtcclxuICAgIHNwYW5DdXJyZW50LnRleHRDb250ZW50ID0gZXZ0LnRhcmdldC52YWx1ZTtcclxuICB9KTtcclxuXHJcbiAgY29uc3QgZnJhZ21lbnQgPSBkb2N1bWVudC5jcmVhdGVEb2N1bWVudEZyYWdtZW50KCk7XHJcbiAgZnJhZ21lbnQuYXBwZW5kQ2hpbGQoZGl2SW5wdXQpO1xyXG4gIGZyYWdtZW50LmFwcGVuZENoaWxkKGRpdkN1cnJlbnQpO1xyXG5cclxuICByZXR1cm4gZnJhZ21lbnQ7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGNyZWF0ZVN3aXRjaFRvb2wodG9vbCkge1xyXG4gIGNvbnN0IGxhYmVsID0gbm9kZUZhY3RvcnkoJ2xhYmVsJywgeyBjbGFzc0xpc3Q6IFsnc3dpdGNoJ10gfSk7XHJcblxyXG4gIGNvbnN0IGlucHV0ID0gbm9kZUZhY3RvcnkoJ2lucHV0Jywge1xyXG4gICAgYXR0cnM6IHtcclxuICAgICAgJ2RhdGEtaWQnOiB0b29sLmlkLFxyXG4gICAgICAnZGF0YS10eXBlJzogJ3N3aXRjaCcsXHJcbiAgICAgICd0eXBlJzogJ2NoZWNrYm94J1xyXG4gICAgfVxyXG4gIH0pO1xyXG4gIGxhYmVsLmFwcGVuZENoaWxkKGlucHV0KTtcclxuXHJcbiAgY29uc3QgZGl2ID0gbm9kZUZhY3RvcnkoJ2RpdicsIHsgY2xhc3NMaXN0OiBbJ3NsaWRlciddIH0pO1xyXG4gIGxhYmVsLmFwcGVuZENoaWxkKGRpdik7XHJcblxyXG4gIHJldHVybiBsYWJlbDtcclxufVxyXG5cclxuZnVuY3Rpb24gZ2V0VG9vbHNEYXRhKCkge1xyXG4gIGNvbnN0IHRvb2xzRGF0YSA9IFtdO1xyXG4gIGNvbnN0IGlucHV0cyA9ICR0b29scy5xdWVyeVNlbGVjdG9yQWxsKCdpbnB1dFtkYXRhLWlkXScpO1xyXG4gIGlucHV0cy5mb3JFYWNoKGlucHV0ID0+IHtcclxuICAgIGNvbnN0IHsgaWQsIHR5cGUgfSA9IGlucHV0LmRhdGFzZXQ7XHJcbiAgICBsZXQgdmFsdWU7XHJcbiAgICBzd2l0Y2godHlwZSkge1xyXG4gICAgICBjYXNlIHRvb2xUeXBlcy5SQU5HRTogdmFsdWUgPSBwYXJzZUludChpbnB1dC52YWx1ZSk7IGJyZWFrO1xyXG4gICAgICBjYXNlIHRvb2xUeXBlcy5TV0lUQ0g6IHZhbHVlID0gaW5wdXQuY2hlY2tlZDsgYnJlYWs7XHJcbiAgICAgIGRlZmF1bHQ6IHRocm93IG5ldyBFcnJvcihg0J3QtdC60L7RgNGA0LXQutGC0L3Ri9C5INGC0LjQvyDQv9GA0LjQsdC+0YDQsC4gSUQ6ICR7aWR9YCk7XHJcbiAgICB9XHJcbiAgICB0b29sc0RhdGEucHVzaCh7IGlkLCB2YWx1ZSB9KTtcclxuICB9KTtcclxuICByZXR1cm4gdG9vbHNEYXRhO1xyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCB7XHJcbiAgaW5pdCxcclxuICBnZXRUb29sc0RhdGFcclxufTtcclxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vbGVhcm5pbmcvc2NlbmVfY29tcG9uZW50cy90b29scy5qcyIsImNvbnN0IHB1YnN1YiA9IChmdW5jdGlvbigpIHtcclxuXHJcbiAgY29uc3QgdG9waWNzID0ge307XHJcblxyXG4gIHJldHVybiB7XHJcbiAgICBzdWJzY3JpYmU6IGZ1bmN0aW9uKHRvcGljLCBsaXN0ZW5lcikge1xyXG4gICAgICBpZiAoIXRvcGljc1t0b3BpY10pIHRvcGljc1t0b3BpY10gPSB7IHF1ZXVlOiBbXSB9O1xyXG5cclxuICAgICAgY29uc3QgaW5kZXggPSB0b3BpY3NbdG9waWNdLnF1ZXVlLnB1c2gobGlzdGVuZXIpIC0gMTtcclxuICAgICAgLy8gZnVuY3Rpb24gdG8gZGVsZXRlIHRvcGljXHJcbiAgICAgIHJldHVybiB7XHJcbiAgICAgICAgcmVtb3ZlOiBmdW5jdGlvbigpIHtcclxuICAgICAgICAgIGRlbGV0ZSB0b3BpY3NbdG9waWNdLnF1ZXVlW2luZGV4XTtcclxuICAgICAgICB9XHJcbiAgICAgIH07XHJcbiAgICB9LFxyXG5cclxuICAgIHB1Ymxpc2g6IGZ1bmN0aW9uKHRvcGljLCBpbmZvKSB7XHJcbiAgICAgIC8vIG5vIHRoZW1lIG9yIG5vIGxpc3RlbmVyc1xyXG4gICAgICBpZiAoIXRvcGljc1t0b3BpY10gfHwgIXRvcGljc1t0b3BpY10ucXVldWUubGVuZ3RoKSByZXR1cm47XHJcblxyXG4gICAgICBjb25zdCBpdGVtcyA9IHRvcGljc1t0b3BpY10ucXVldWU7XHJcbiAgICAgIGl0ZW1zLmZvckVhY2goaXRlbSA9PiB7XHJcbiAgICAgICAgaXRlbShpbmZvIHx8IHt9KTtcclxuICAgICAgfSk7XHJcbiAgICB9XHJcbiAgfTtcclxufSkoKTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IHB1YnN1YjtcclxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vdXRpbHMvcHVic3ViLmpzIiwiaW1wb3J0IG5vZGVGYWN0b3J5IGZyb20gJy4vbm9kZUZhY3RvcnknO1xyXG5cclxuZnVuY3Rpb24gbXNUb0NvbnRlbnQobXMpIHtcclxuICBjb25zdCBzZWNvbmRzID0gTWF0aC5yb3VuZChtcyAvIDEwMDApO1xyXG4gIGNvbnN0IG1pbnMgPSBNYXRoLmZsb29yKHNlY29uZHMgLyA2MCk7XHJcbiAgY29uc3Qgc2Vjb25kc0xlZnQgPSBzZWNvbmRzIC0gKG1pbnMgKiA2MCk7XHJcblxyXG4gIHJldHVybiBgJHttaW5zfToke3NlY29uZHNMZWZ0ID49IDEwID8gJycgOiAnMCd9JHtzZWNvbmRzTGVmdH1gO1xyXG59XHJcblxyXG5jb25zdCB0aW1lciA9IHtcclxuICBzdGFydFRpbWU6IG51bGwsXHJcbiAgaW50ZXJ2YWw6IG51bGwsXHJcbiAgbm9kZTogbm9kZUZhY3RvcnkoJ3NwYW4nLCB7IGNsYXNzTGlzdDogWyd0aW1lciddLCB0ZXh0Q29udGVudDogJzA6MDAnIH0pLFxyXG4gIHN0YXJ0OiBmdW5jdGlvbigpIHtcclxuICAgIHRoaXMuc3RhcnRUaW1lID0gRGF0ZS5ub3coKTtcclxuICAgIHRoaXMuaW50ZXJ2YWwgPSBzZXRJbnRlcnZhbCgoKSA9PiB7XHJcbiAgICAgIGNvbnN0IGVsYXBzZWQgPSBEYXRlLm5vdygpIC0gdGhpcy5zdGFydFRpbWU7XHJcbiAgICAgIHRoaXMubm9kZS50ZXh0Q29udGVudCA9IG1zVG9Db250ZW50KGVsYXBzZWQpO1xyXG4gICAgfSwgMTAwMCk7XHJcbiAgfSxcclxuICBzdG9wOiBmdW5jdGlvbigpIHtcclxuICAgIGlmICghdGhpcy5zdGFydFRpbWUpIHsgcmV0dXJuOyB9XHJcbiAgICB0aGlzLnN0YXJ0VGltZSA9IG51bGw7XHJcbiAgICBjbGVhckludGVydmFsKHRoaXMuaW50ZXJ2YWwpO1xyXG4gICAgdGhpcy5ub2RlLnRleHRDb250ZW50ID0gJzA6MDAnO1xyXG4gIH1cclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgdGltZXI7XHJcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3V0aWxzL3RpbWVyLmpzIiwiaW1wb3J0ICcuLi8uLi9zYXNzL2xlYXJuaW5nLnNjc3MnO1xyXG5cclxuaW1wb3J0IHB1YnN1YiBmcm9tICcuLi91dGlscy9wdWJzdWInO1xyXG5pbXBvcnQgYWpheCBmcm9tICcuLi91dGlscy9hamF4JztcclxuaW1wb3J0IHNjZW5lIGZyb20gJy4vc2NlbmUnO1xyXG5pbXBvcnQgTW9kZWwgZnJvbSAnLi9tb2RlbCc7XHJcblxyXG4vKipcclxuICogTG9hZCBtb2RlbCB3aXRoIGdpdmVuIGlkXHJcbiAqL1xyXG5mdW5jdGlvbiBsb2FkTW9kZWwoaWQpIHtcclxuICByZXR1cm4gYWpheChgL21vZGVscy8ke2lkfWApLnRoZW4ocmVzcG9uc2UgPT4gSlNPTi5wYXJzZShyZXNwb25zZSkpO1xyXG59XHJcblxyXG4vKipcclxuICogVUkgYnV0dG9uJ3MgaGFuZGxlcnNcclxuICovXHJcbmNvbnN0ICRzZWxlY3QgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI21vZGVsLXNlbGVjdFwiKTtcclxuY29uc3QgJGxvYWRCdXR0b24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjbG9hZC1tb2RlbC1idG4nKTtcclxuXHJcbmxldCBtb2RlbCA9IG51bGw7XHJcblxyXG4kbG9hZEJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcclxuICBpZiAoIG1vZGVsICkgeyBtb2RlbC5zdG9wKCk7IH1cclxuICBjb25zdCBtb2RlbElkID0gJHNlbGVjdC52YWx1ZTtcclxuICBsb2FkTW9kZWwobW9kZWxJZClcclxuICAgIC50aGVuKHJlc3BvbnNlID0+IHtcclxuICAgICAgbW9kZWwgPSBuZXcgTW9kZWwocmVzcG9uc2UpO1xyXG4gICAgICBzY2VuZS5pbml0KG1vZGVsLCByZXNwb25zZSlcclxuICAgICAgICAuc2hvd0NvbnRlbnQoKVxyXG4gICAgICAgIC5lbmFibGVCdXR0b25zKCRzdGFydEJ1dHRvbilcclxuICAgICAgICAuZGlzYWJsZUJ1dHRvbnMoJHN0b3BCdXR0b24sICRydW5CdXR0b24pO1xyXG4gICAgfSlcclxuICAgIC5jYXRjaChlcnIgPT4geyBjb25zb2xlLmVycm9yKGVycikgfSk7XHJcbn0pO1xyXG4vL1xyXG5jb25zdCAkc3RhcnRCdXR0b24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjc3RhcnQtYnRuJyk7XHJcbiRzdGFydEJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcclxuICBtb2RlbC5zdGFydCgpO1xyXG4gIHNjZW5lLmRpc2FibGVCdXR0b25zKCRzdGFydEJ1dHRvbik7XHJcbiAgc2NlbmUuZW5hYmxlQnV0dG9ucygkc3RvcEJ1dHRvbiwgJHJ1bkJ1dHRvbik7XHJcbn0pO1xyXG5cclxuY29uc3QgJHN0b3BCdXR0b24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjc3RvcC1idG4nKTtcclxuJHN0b3BCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XHJcbiAgcHVic3ViLnB1Ymxpc2goJ21vZGVsX3N0b3AnKTtcclxuICBzY2VuZS5lbmFibGVCdXR0b25zKCRzdGFydEJ1dHRvbik7XHJcbiAgc2NlbmUuZGlzYWJsZUJ1dHRvbnMoJHN0b3BCdXR0b24sICRydW5CdXR0b24pO1xyXG59KTtcclxuXHJcbmNvbnN0ICRydW5CdXR0b24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjcnVuLWJ0bicpO1xyXG4kcnVuQnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xyXG4gIGNvbnN0IHRvb2xzRGF0YSA9IHNjZW5lLmdldFRvb2xzRGF0YSgpO1xyXG4gIHB1YnN1Yi5wdWJsaXNoKCd1c2VyX2lucHV0JywgdG9vbHNEYXRhKTtcclxufSk7XHJcblxyXG4vKipcclxuICogSGFuZGxlIGN1c3RvbSBldmVudHMgaGVyZSAodXNlciBpbnB1dCwgcHJvZ3JhbW0gbWVzc2FnZXMgZXRjLilcclxuICovXHJcbnB1YnN1Yi5zdWJzY3JpYmUoJ25ld19zdGF0ZScsIHN0YXRlID0+IHtcclxuICBzY2VuZS5oaWRlRXZlbnQoKTtcclxuICBzY2VuZS5zZXRTdGF0ZShzdGF0ZSk7XHJcbn0pO1xyXG5wdWJzdWIuc3Vic2NyaWJlKCdldmVudCcsIGV2ZW50ID0+IHNjZW5lLnNob3dFdmVudChldmVudCkpO1xyXG5cclxuLy8gLyoqXHJcbi8vICogVGltZXIgKGN1cnJlbnRseSBmb3IgZGV2IG1vZGUgb25seSlcclxuLy8gKi9cclxuLy8gaW1wb3J0IHRpbWVyIGZyb20gJy4uL3V0aWxzL3RpbWVyJztcclxuLy8gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmhlYWRlcicpLmFwcGVuZENoaWxkKHRpbWVyLm5vZGUpO1xyXG4vLyBwdWJzdWIuc3Vic2NyaWJlKCduZXdfc3RhdGUnLCBzdGF0ZSA9PiB0aW1lci5zdG9wKCkpO1xyXG4vLyBwdWJzdWIuc3Vic2NyaWJlKCdldmVudCcsIGV2ZW50ID0+IHRpbWVyLnN0YXJ0KCkpO1xyXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9sZWFybmluZy9pbmRleC5qcyIsImltcG9ydCBhamF4IGZyb20gJy4uL3V0aWxzL2FqYXgnO1xyXG5cclxuY29uc3QgUkVQT1JUX1VSTCA9ICcvbGVhcm5pbmcvcmVwb3J0JztcclxuY29uc3QgYWpheENvbmZpZyA9IHtcclxuICBtZXRob2Q6ICdQT1NUJyxcclxuICBoZWFkZXJzOiB7XHJcbiAgICAnQ29udGVudC10eXBlJzogJ2FwcGxpY2F0aW9uL2pzb24nXHJcbiAgfVxyXG59XHJcblxyXG5jbGFzcyBSZXBvcnQge1xyXG4gIGNvbnN0cnVjdG9yKG5hbWUsIHN0ZXBzKSB7XHJcbiAgICB0aGlzLm1vZGVsTmFtZSA9IG5hbWU7XHJcbiAgICB0aGlzLm1heFN0ZXBzID0gc3RlcHM7XHJcbiAgICB0aGlzLnN0YXRlcyA9IFtdO1xyXG4gICAgdGhpcy5jdXJyZW50U3RhdGUgPSBudWxsO1xyXG4gIH1cclxuXHJcbiAgcHVzaFN0YXRlKHN0YXRlKSB7XHJcbiAgICBjb25zdCB7IG5hbWUgfSA9IHN0YXRlO1xyXG4gICAgY29uc3QgbWF4VGltZSA9IHN0YXRlLmxhc3QgPyAtMSA6IHN0YXRlLmdldEluYWN0aXZlVGltZSgpO1xyXG4gICAgY29uc3QgaW5hY3RpdmUgPSB0cnVlO1xyXG4gICAgY29uc3QgYWN0aW9uc051bWJlciA9IDA7XHJcbiAgICB0aGlzLnN0YXRlcy5wdXNoKHsgbmFtZSwgbWF4VGltZSwgaW5hY3RpdmUsIGFjdGlvbnNOdW1iZXIgfSk7XHJcbiAgICB0aGlzLmN1cnJlbnRTdGF0ZSA9IHRoaXMuc3RhdGVzW3RoaXMuc3RhdGVzLmxlbmd0aCAtIDFdO1xyXG4gIH1cclxuXHJcbiAgaW5jcmVhc2VBY3Rpb25zTnVtYmVyKCkge1xyXG4gICAgdGhpcy5jdXJyZW50U3RhdGUuYWN0aW9uc051bWJlcisrO1xyXG4gIH1cclxuXHJcbiAgc2V0U3BlbnRUaW1lKHRpbWUpIHtcclxuICAgIHRoaXMuY3VycmVudFN0YXRlLnNwZW50VGltZSA9IHRpbWU7XHJcbiAgICB0aGlzLnNldEluYWN0aXZlKGZhbHNlKTtcclxuICB9XHJcblxyXG4gIHNldEluYWN0aXZlKHZhbHVlKSB7XHJcbiAgICB0aGlzLmN1cnJlbnRTdGF0ZS5pbmFjdGl2ZSA9IHZhbHVlO1xyXG4gIH1cclxuXHJcbiAgc2VuZCgpIHtcclxuICAgIGlmICh0aGlzLnN0YXRlcy5sZW5ndGggPiAxKSB7XHJcbiAgICAgIC8vIHJlbW92ZSBsYXN0IHN0YXRlIC0gdXNlciBjYW4ndCBtYWtlIGFueSBhY3Rpb25cclxuICAgICAgdGhpcy5zdGF0ZXMgPSB0aGlzLnN0YXRlcy5zbGljZSgwLCAtMSk7XHJcbiAgICB9XHJcbiAgICBhamF4Q29uZmlnLmRhdGEgPSBKU09OLnN0cmluZ2lmeSh7XHJcbiAgICAgIG1vZGVsTmFtZTogdGhpcy5tb2RlbE5hbWUsXHJcbiAgICAgIHN0ZXBzOiB0aGlzLnN0ZXBzLFxyXG4gICAgICBzdGF0ZXM6IHRoaXMuc3RhdGVzXHJcbiAgICB9KTtcclxuICAgIGFqYXgoUkVQT1JUX1VSTCwgYWpheENvbmZpZyk7XHJcbiAgfVxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBSZXBvcnQ7XHJcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2xlYXJuaW5nL3JlcG9ydC5qcyIsImltcG9ydCBTdGF0ZSBmcm9tICcuL21vZGVsX2NvbXBvbmVudHMvc3RhdGUnO1xyXG5pbXBvcnQgcHVic3ViIGZyb20gJy4uL3V0aWxzL3B1YnN1Yic7XHJcbmltcG9ydCBSZXBvcnQgZnJvbSAnLi9yZXBvcnQnO1xyXG5cclxuY29uc3QgSU5JVElBTF9TVEFURV9OQU1FID0gJ9Ch0L7RgdGC0L7Rj9C90LjQtSDQvNC+0LTQtdC70LgnO1xyXG5jb25zdCBTVE9QX1NUQVRFX05BTUUgPSAn0J7QsdGD0YfQtdC90LjQtSDQvtGB0YLQsNC90L7QstC70LXQvdC+JztcclxuXHJcbmNsYXNzIE1vZGVsIHtcclxuICBjb25zdHJ1Y3RvcihkYXRhKSB7XHJcbiAgICB0aGlzLmlkID0gZGF0YS5pZDtcclxuICAgIHRoaXMubmFtZSA9IGRhdGEubmFtZTtcclxuICAgIHRoaXMuYnJlYWtUaW1lID0gZGF0YS5icmVha1RpbWU7XHJcbiAgICB0aGlzLnN0ZXBzID0gZGF0YS5zdGVwcztcclxuXHJcbiAgICB0aGlzLnN0YXRlcyA9IGRhdGEuc3RhdGVzLm1hcChzdGF0ZSA9PiBuZXcgU3RhdGUoc3RhdGUpKTtcclxuICAgIHRoaXMuY3VycmVudFN0YXRlID0gdGhpcy5nZXRTdGF0ZShkYXRhLmluaXRpYWxTdGF0ZSk7XHJcblxyXG4gICAgdGhpcy50aW1lb3V0ID0gbnVsbDtcclxuICAgIHRoaXMuc3ViSW5wdXQgPSBudWxsO1xyXG4gICAgdGhpcy5zdWJTdG9wID0gbnVsbDtcclxuICAgIHRoaXMuc3RhcnRTdGF0ZSA9IG5ldyBTdGF0ZSh7IGlkOiAwLCBuYW1lOiBJTklUSUFMX1NUQVRFX05BTUUsIGltZzogJ2ltZy9zdGFydC5wbmcnLCBsYXN0OiB0cnVlIH0pO1xyXG4gICAgdGhpcy5zdG9wU3RhdGUgPSBuZXcgU3RhdGUoeyBpZDogLTEsIG5hbWU6IFNUT1BfU1RBVEVfTkFNRSwgaW1nOiAnaW1nL3N0b3AucG5nJywgbGFzdDogdHJ1ZSB9KTtcclxuICB9XHJcblxyXG4gIGdldFN0YXRlKGlkKSB7XHJcbiAgICByZXR1cm4gdGhpcy5zdGF0ZXMuZmluZChzdGF0ZSA9PiBzdGF0ZS5pZCA9PSBpZCk7XHJcbiAgfVxyXG5cclxuICBzdGFydCgpIHtcclxuICAgIHRoaXMucmVwb3J0ID0gbmV3IFJlcG9ydCh0aGlzLm5hbWUsIHRoaXMuc3RlcHMpO1xyXG4gICAgdGhpcy5oYW5kbGVOZXdTdGF0ZSh0aGlzLmN1cnJlbnRTdGF0ZSk7IC8vIHNldCBpbml0aWFsIHN0YXRlXHJcbiAgICBsZXQgaW50ZXJ2YWxzID0gUHJvbWlzZS5yZXNvbHZlKCk7IC8vIGluaXQgcHJvbWlzZSBjaGFpblxyXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLnN0ZXBzOyBpKyspIHtcclxuICAgICAgaW50ZXJ2YWxzID0gaW50ZXJ2YWxzXHJcbiAgICAgICAudGhlbigoKSA9PiB7IHJldHVybiB0aGlzLm1ha2VCcmVhaygpIH0pXHJcbiAgICAgICAudGhlbigoKSA9PiB7IHJldHVybiB0aGlzLmhhbmRsZUV2ZW50KCkgfSlcclxuICAgICAgIC50aGVuKHN0YXRlID0+IHsgdGhpcy5oYW5kbGVOZXdTdGF0ZShzdGF0ZSkgfSlcclxuICAgIH1cclxuICAgIGludGVydmFsc1xyXG4gICAgICAuY2F0Y2goc3RhdGUgPT4gdGhpcy5oYW5kbGVOZXdTdGF0ZShzdGF0ZSkpXHJcbiAgICAgIC50aGVuKCgpID0+IHtcclxuICAgICAgICBpZiAodGhpcy5jdXJyZW50U3RhdGUubmFtZSAhPT0gU1RPUF9TVEFURV9OQU1FKSB7XHJcbiAgICAgICAgICB0aGlzLnJlcG9ydC5zZW5kKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9KTtcclxuICAgIHJldHVybiBpbnRlcnZhbHM7XHJcbiAgfVxyXG5cclxuICBtYWtlQnJlYWsoKSB7XHJcbiAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xyXG4gICAgICB0aGlzLnN1YlN0b3AgPSBwdWJzdWIuc3Vic2NyaWJlKCdtb2RlbF9zdG9wJywgKCkgPT4geyByZWplY3QodGhpcy5zdG9wU3RhdGUpOyB9KVxyXG4gICAgICBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgICB0aGlzLmNsZWFyU3VicygpO1xyXG4gICAgICAgIHJlc29sdmUoKVxyXG4gICAgICB9LCB0aGlzLmJyZWFrVGltZSk7XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIGhhbmRsZUV2ZW50KCkge1xyXG4gICAgY29uc3QgZXZlbnQgPSB0aGlzLmN1cnJlbnRTdGF0ZS5ldmVudDtcclxuICAgIGNvbnN0IGV2ZW50U3RhcnRUaW1lID0gRGF0ZS5ub3coKTtcclxuICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XHJcbiAgICAgIC8vIHNlbmQgZGF0YSBhYm91dCBuZXcgZXZlbnQgdG8gb3RoZXIgbW9kdWxlc1xyXG4gICAgICBwdWJzdWIucHVibGlzaCgnZXZlbnQnLCBldmVudCk7XHJcblxyXG4gICAgICAvLyBsaXN0ZW4gdG8gdXNlciBhY3Rpb25cclxuICAgICAgLy8gYW5kIGlmIHVzZXIgaW5wdXQgY29ycmVjdCBnbyB0byBuZXh0IHN0YXRlXHJcbiAgICAgIHRoaXMuc3ViSW5wdXQgPSBwdWJzdWIuc3Vic2NyaWJlKCd1c2VyX2lucHV0JywgZGF0YSA9PiB7XHJcbiAgICAgICAgdGhpcy5yZXBvcnQuaW5jcmVhc2VBY3Rpb25zTnVtYmVyKCk7XHJcbiAgICAgICAgY29uc3QgdGltZVNwZW50ID0gRGF0ZS5ub3coKSAtIGV2ZW50U3RhcnRUaW1lO1xyXG4gICAgICAgIGNvbnN0IG5leHRTdGF0ZUlkID0gdGhpcy5jdXJyZW50U3RhdGUuaGFuZGxlSW5wdXQoZGF0YSwgdGltZVNwZW50KTtcclxuICAgICAgICBjb25zdCBuZXh0U3RhdGUgPSB0aGlzLmdldFN0YXRlKG5leHRTdGF0ZUlkKTtcclxuICAgICAgICBpZiAoIG5leHRTdGF0ZSApIHtcclxuICAgICAgICAgIHRoaXMucmVwb3J0LnNldFNwZW50VGltZSh0aW1lU3BlbnQpO1xyXG4gICAgICAgICAgbmV4dFN0YXRlLmxhc3QgPyByZWplY3QobmV4dFN0YXRlKSA6IHJlc29sdmUobmV4dFN0YXRlKTtcclxuICAgICAgICB9XHJcbiAgICAgIH0pO1xyXG5cclxuICAgICAgLy8gaGFuZGxlIHVzZXIgc3RvcCBidXR0b24gY2xpY2tcclxuICAgICAgdGhpcy5zdWJTdG9wID0gcHVic3ViLnN1YnNjcmliZSgnbW9kZWxfc3RvcCcsICgpID0+IHtcclxuICAgICAgICByZWplY3QodGhpcy5zdG9wU3RhdGUpO1xyXG4gICAgICB9KTtcclxuXHJcbiAgICAgIC8vIGhhbmRsZSBpbmFjdGl2ZVxyXG4gICAgICBjb25zdCBpbmFjdGl2ZVRpbWUgPSB0aGlzLmN1cnJlbnRTdGF0ZS5nZXRJbmFjdGl2ZVRpbWUoKTtcclxuICAgICAgdGhpcy50aW1lb3V0ID0gc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgY29uc3QgbmV4dFN0YXRlSWQgPSB0aGlzLmN1cnJlbnRTdGF0ZS5nZXRJbmFjdGl2ZUFjdGlvbigpLm5leHRTdGF0ZTtcclxuICAgICAgICBjb25zdCBuZXh0U3RhdGUgPSB0aGlzLmdldFN0YXRlKG5leHRTdGF0ZUlkKTtcclxuICAgICAgICBuZXh0U3RhdGUubGFzdCA/IHJlamVjdChuZXh0U3RhdGUpIDogcmVzb2x2ZShuZXh0U3RhdGUpO1xyXG4gICAgICB9LCBpbmFjdGl2ZVRpbWUpO1xyXG4gICAgfSlcclxuICB9XHJcblxyXG4gIGhhbmRsZU5ld1N0YXRlKHN0YXRlKSB7XHJcbiAgICB0aGlzLnJlcG9ydC5wdXNoU3RhdGUoc3RhdGUpO1xyXG4gICAgdGhpcy5jdXJyZW50U3RhdGUgPSBzdGF0ZTtcclxuICAgIGNsZWFyVGltZW91dCh0aGlzLnRpbWVvdXQpO1xyXG4gICAgdGhpcy5jbGVhclN1YnMoKTtcclxuICAgIHB1YnN1Yi5wdWJsaXNoKCduZXdfc3RhdGUnLCBzdGF0ZSk7XHJcbiAgfVxyXG5cclxuICBjbGVhclN1YnMoKSB7XHJcbiAgICBpZiAodGhpcy5zdWJJbnB1dCkge1xyXG4gICAgICB0aGlzLnN1YklucHV0LnJlbW92ZSgpO1xyXG4gICAgfVxyXG4gICAgaWYgKHRoaXMuc3ViU3RvcCkge1xyXG4gICAgICB0aGlzLnN1YlN0b3AucmVtb3ZlKCk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgTW9kZWw7XHJcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2xlYXJuaW5nL21vZGVsLmpzIiwiaW1wb3J0IHN0YXRlIGZyb20gJy4vc2NlbmVfY29tcG9uZW50cy9zdGF0ZSc7XHJcbmltcG9ydCB0b29scyBmcm9tICcuL3NjZW5lX2NvbXBvbmVudHMvdG9vbHMnO1xyXG5cclxuY29uc3QgZXhwb3J0cyA9IHt9O1xyXG5cclxuLy8gU2NlbmUgbWV0YWRhdGFcclxuY29uc3QgJG1vZGVsTmFtZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5tb2RlbC1uYW1lJyk7XHJcbmV4cG9ydHMuaW5pdCA9IGZ1bmN0aW9uKG1vZGVsLCByZXNwb25zZSkge1xyXG4gICRtb2RlbE5hbWUudGV4dENvbnRlbnQgPSBtb2RlbC5uYW1lO1xyXG4gIHN0YXRlLnNldChtb2RlbC5zdGFydFN0YXRlKTtcclxuICB0b29scy5pbml0KHJlc3BvbnNlLnRvb2xzKTtcclxuICByZXR1cm4gdGhpcztcclxufVxyXG5cclxuLy8gTWFuYWdlIGNvbnRlbnQgdmlzaWJpbGl0eVxyXG5jb25zdCAkY29udGVudCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5jb250ZW50Jyk7XHJcbmV4cG9ydHMuc2hvd0NvbnRlbnQgPSBmdW5jdGlvbigpIHtcclxuICBzZXRDb250ZW50RGlzcGxheSgnZmxleCcpO1xyXG4gIHJldHVybiB0aGlzO1xyXG59XHJcbmV4cG9ydHMuaGlkZUNvbnRlbnQgPSBmdW5jdGlvbigpIHtcclxuICBzZXRDb250ZW50RGlzcGxheSgnbm9uZScpO1xyXG4gIHJldHVybiB0aGlzO1xyXG59XHJcbmZ1bmN0aW9uIHNldENvbnRlbnREaXNwbGF5KGRpc3BsYXkpIHtcclxuICAkY29udGVudC5zdHlsZS5kaXNwbGF5ID0gZGlzcGxheTtcclxufVxyXG5cclxuLy8gTWFuYWdlIGJ1dHRvbnMgc3RhdGVcclxuZXhwb3J0cy5lbmFibGVCdXR0b25zID0gZnVuY3Rpb24oLi4uYnV0dG9ucykge1xyXG4gIHNldEJ1dHRvbnNTdGF0ZShidXR0b25zLCBmYWxzZSk7XHJcbiAgcmV0dXJuIHRoaXM7XHJcbn1cclxuZXhwb3J0cy5kaXNhYmxlQnV0dG9ucyA9IGZ1bmN0aW9uKC4uLmJ1dHRvbnMpIHtcclxuICBzZXRCdXR0b25zU3RhdGUoYnV0dG9ucywgdHJ1ZSk7XHJcbiAgcmV0dXJuIHRoaXM7XHJcbn1cclxuZnVuY3Rpb24gc2V0QnV0dG9uc1N0YXRlKGJ1dHRvbnMsIHZhbHVlKSB7XHJcbiAgYnV0dG9ucy5mb3JFYWNoKGJ1dHRvbiA9PiBidXR0b24uZGlzYWJsZWQgPSB2YWx1ZSk7XHJcbn1cclxuXHJcbi8vIERlbGVnYXRlIHB1YmxpYyBtZXRob2RzIHRvIGNvbXBvbmVudHNcclxuZXhwb3J0cy5nZXRUb29sc0RhdGEgPSAoKSA9PlxyXG4gIHRvb2xzLmdldFRvb2xzRGF0YSgpO1xyXG5cclxuZXhwb3J0cy5zZXRTdGF0ZSA9IHN0YXRlRGF0YSA9PlxyXG4gIHN0YXRlLnNldChzdGF0ZURhdGEpO1xyXG5cclxuZXhwb3J0cy5zaG93RXZlbnQgPSBldmVudERhdGEgPT5cclxuICBzdGF0ZS5zaG93RXZlbnQoZXZlbnREYXRhKTtcclxuXHJcbmV4cG9ydHMuaGlkZUV2ZW50ID0gKCkgPT5cclxuICBzdGF0ZS5oaWRlRXZlbnQoKTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGV4cG9ydHM7XHJcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2xlYXJuaW5nL3NjZW5lLmpzIiwiLy8gcmVtb3ZlZCBieSBleHRyYWN0LXRleHQtd2VicGFjay1wbHVnaW5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuLi9zYXNzL2xlYXJuaW5nLnNjc3Ncbi8vIG1vZHVsZSBpZCA9IDlcbi8vIG1vZHVsZSBjaHVua3MgPSAwIl0sInNvdXJjZVJvb3QiOiIifQ==