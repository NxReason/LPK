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
    this.steps = steps;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgNGM0NTgzNzQ1OTc3NmI0ZTM5YTkiLCJ3ZWJwYWNrOi8vLy4vdXRpbHMvYWpheC5qcyIsIndlYnBhY2s6Ly8vLi91dGlscy9ub2RlRmFjdG9yeS5qcyIsIndlYnBhY2s6Ly8vLi9sZWFybmluZy9tb2RlbF9jb21wb25lbnRzL2FjdGlvbi5qcyIsIndlYnBhY2s6Ly8vLi9sZWFybmluZy9tb2RlbF9jb21wb25lbnRzL2V2ZW50LmpzIiwid2VicGFjazovLy8uL2xlYXJuaW5nL21vZGVsX2NvbXBvbmVudHMvc3RhdGUuanMiLCJ3ZWJwYWNrOi8vLy4vbGVhcm5pbmcvc2NlbmVfY29tcG9uZW50cy9zdGF0ZS5qcyIsIndlYnBhY2s6Ly8vLi9sZWFybmluZy9zY2VuZV9jb21wb25lbnRzL3Rvb2xzLmpzIiwid2VicGFjazovLy8uL3V0aWxzL3B1YnN1Yi5qcyIsIndlYnBhY2s6Ly8vLi91dGlscy90aW1lci5qcyIsIndlYnBhY2s6Ly8vLi9sZWFybmluZy9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9sZWFybmluZy9yZXBvcnQuanMiLCJ3ZWJwYWNrOi8vLy4vbGVhcm5pbmcvbW9kZWwuanMiLCJ3ZWJwYWNrOi8vLy4vbGVhcm5pbmcvc2NlbmUuanMiLCJ3ZWJwYWNrOi8vLy4uL3Nhc3MvbGVhcm5pbmcuc2NzcyJdLCJuYW1lcyI6WyJhamF4IiwicGF0aCIsIm9wdGlvbnMiLCJmdWxsUmVzcG9uc2UiLCJ4aHIiLCJYTUxIdHRwUmVxdWVzdCIsIm9wZW4iLCJtZXRob2QiLCJoZWFkZXJzIiwic2V0WEhSSGVhZGVycyIsInNlbmQiLCJkYXRhIiwiUHJvbWlzZSIsInJlc29sdmUiLCJyZWplY3QiLCJvbnJlYWR5c3RhdGVjaGFuZ2UiLCJyZWFkeVN0YXRlIiwic3RhdHVzIiwicmVzcG9uc2VUZXh0Iiwic3RhdHVzVGV4dCIsImhlYWRlciIsInNldFJlcXVlc3RIZWFkZXIiLCJub2RlRmFjdG9yeSIsInR5cGUiLCJwYXJhbXMiLCJub2RlIiwiZG9jdW1lbnQiLCJjcmVhdGVFbGVtZW50IiwiYXBwZW5kQ2xhc3NlcyIsImFwcGVuZEF0dHJzIiwiaW5zZXJ0VGV4dENvbnRlbnQiLCJjbGFzc0xpc3QiLCJmb3JFYWNoIiwiYWRkIiwiY2xhc3NOYW1lIiwiYXR0cnMiLCJhdHRyTmFtZXMiLCJPYmplY3QiLCJrZXlzIiwic2V0QXR0cmlidXRlIiwiYXR0ck5hbWUiLCJ0ZXh0Q29udGVudCIsIkFjdGlvbiIsIm1pblRpbWUiLCJtYXhUaW1lIiwibmV4dFN0YXRlIiwiaW5hY3RpdmUiLCJ0b29scyIsImluaXRUb29scyIsInRpbWUiLCJyaWdodFRpbWUiLCJyaWdodERhdGEiLCJldmVyeSIsImNoZWNrVG9vbCIsImZpbmQiLCJvYmoiLCJpZCIsInRvb2wiLCJ2YWx1ZSIsImJvb2xWYWx1ZSIsImluY2x1ZGVzVmFsdWUiLCJtaW5WYWx1ZSIsIm1heFZhbHVlIiwiYm9yZGVycyIsIlR5cGVFcnJvciIsIm1hcCIsIkFjdGlvblRvb2wiLCJFdmVudCIsIm5hbWUiLCJkZXNjcmlwdGlvbiIsIlN0YXRlIiwiaW1nIiwibGFzdCIsImV2ZW50IiwiYWN0aW9ucyIsImFjdGlvbiIsInRpbWVzIiwiZ2V0QWxsQWN0aW9uVGltZXMiLCJNYXRoIiwibWF4Iiwic3VpdGVkQWN0aW9ucyIsImZpbHRlciIsImlzU3VpdGFibGUiLCJsZW5ndGgiLCIkbmFtZSIsInF1ZXJ5U2VsZWN0b3IiLCIkaW1nIiwiJHBhcmFtcyIsIiRldmVudCIsIiRldmVudEhlYWRlciIsIiRldmVudEJvZHkiLCIkdGltZXJDb250YWluZXIiLCJhcHBlbmRDaGlsZCIsInNldCIsInNldFBhcmFtZXRlcnMiLCJmcmFnIiwiY3JlYXRlRG9jdW1lbnRGcmFnbWVudCIsImNyZWF0ZVBhcmFtZXRlTm9kZSIsInBhcmFtIiwiaW5uZXJIVE1MIiwia2V5IiwiZGl2Iiwia2V5U3BhbiIsInZhbHVlU3BhbiIsInNob3dFdmVudCIsInJlbW92ZSIsInNob3dUaW1lciIsImhpZGVFdmVudCIsImhpZGVUaW1lciIsInN0YXJ0Iiwic3RvcCIsInRvb2xUeXBlcyIsIlJBTkdFIiwiU1dJVENIIiwiJHRvb2xzIiwiaW5pdCIsImZyYWdtZW50IiwibGFiZWwiLCJ0b29sTm9kZSIsImNyZWF0ZVRvb2xOb2RlIiwiY3JlYXRlUmFuZ2VUb29sIiwiY3JlYXRlU3dpdGNoVG9vbCIsImRpdklucHV0Iiwic3Bhbk1pbiIsIm1pbiIsImlucHV0Iiwic3Bhbk1heCIsImRpdkN1cnJlbnQiLCJzcGFuQ3VycmVudCIsImFkZEV2ZW50TGlzdGVuZXIiLCJldnQiLCJ0YXJnZXQiLCJnZXRUb29sc0RhdGEiLCJ0b29sc0RhdGEiLCJpbnB1dHMiLCJxdWVyeVNlbGVjdG9yQWxsIiwiZGF0YXNldCIsInBhcnNlSW50IiwiY2hlY2tlZCIsIkVycm9yIiwicHVzaCIsInB1YnN1YiIsInRvcGljcyIsInN1YnNjcmliZSIsInRvcGljIiwibGlzdGVuZXIiLCJxdWV1ZSIsImluZGV4IiwicHVibGlzaCIsImluZm8iLCJpdGVtcyIsIml0ZW0iLCJtc1RvQ29udGVudCIsIm1zIiwic2Vjb25kcyIsInJvdW5kIiwibWlucyIsImZsb29yIiwic2Vjb25kc0xlZnQiLCJ0aW1lciIsInN0YXJ0VGltZSIsImludGVydmFsIiwiRGF0ZSIsIm5vdyIsInNldEludGVydmFsIiwiZWxhcHNlZCIsImNsZWFySW50ZXJ2YWwiLCJsb2FkTW9kZWwiLCJ0aGVuIiwiSlNPTiIsInBhcnNlIiwicmVzcG9uc2UiLCIkc2VsZWN0IiwiJGxvYWRCdXR0b24iLCJtb2RlbCIsIm1vZGVsSWQiLCJzaG93Q29udGVudCIsImVuYWJsZUJ1dHRvbnMiLCIkc3RhcnRCdXR0b24iLCJkaXNhYmxlQnV0dG9ucyIsIiRzdG9wQnV0dG9uIiwiJHJ1bkJ1dHRvbiIsImNhdGNoIiwiY29uc29sZSIsImVycm9yIiwiZXJyIiwic2V0U3RhdGUiLCJzdGF0ZSIsIlJFUE9SVF9VUkwiLCJhamF4Q29uZmlnIiwiUmVwb3J0Iiwic3RlcHMiLCJtb2RlbE5hbWUiLCJzdGF0ZXMiLCJjdXJyZW50U3RhdGUiLCJnZXRJbmFjdGl2ZVRpbWUiLCJhY3Rpb25zTnVtYmVyIiwic3BlbnRUaW1lIiwic2V0SW5hY3RpdmUiLCJzbGljZSIsInN0cmluZ2lmeSIsIklOSVRJQUxfU1RBVEVfTkFNRSIsIlNUT1BfU1RBVEVfTkFNRSIsIk1vZGVsIiwiYnJlYWtUaW1lIiwiZ2V0U3RhdGUiLCJpbml0aWFsU3RhdGUiLCJ0aW1lb3V0Iiwic3ViSW5wdXQiLCJzdWJTdG9wIiwic3RhcnRTdGF0ZSIsInN0b3BTdGF0ZSIsInJlcG9ydCIsImhhbmRsZU5ld1N0YXRlIiwiaW50ZXJ2YWxzIiwiaSIsIm1ha2VCcmVhayIsImhhbmRsZUV2ZW50Iiwic2V0VGltZW91dCIsImNsZWFyU3VicyIsImV2ZW50U3RhcnRUaW1lIiwiaW5jcmVhc2VBY3Rpb25zTnVtYmVyIiwidGltZVNwZW50IiwibmV4dFN0YXRlSWQiLCJoYW5kbGVJbnB1dCIsInNldFNwZW50VGltZSIsImluYWN0aXZlVGltZSIsImdldEluYWN0aXZlQWN0aW9uIiwicHVzaFN0YXRlIiwiY2xlYXJUaW1lb3V0IiwiZXhwb3J0cyIsIiRtb2RlbE5hbWUiLCIkY29udGVudCIsInNldENvbnRlbnREaXNwbGF5IiwiaGlkZUNvbnRlbnQiLCJkaXNwbGF5Iiwic3R5bGUiLCJidXR0b25zIiwic2V0QnV0dG9uc1N0YXRlIiwiYnV0dG9uIiwiZGlzYWJsZWQiLCJzdGF0ZURhdGEiLCJldmVudERhdGEiXSwibWFwcGluZ3MiOiI7QUFBQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQSxtREFBMkMsY0FBYzs7QUFFekQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFLO0FBQ0w7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxtQ0FBMkIs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QUFSLEdBQXdCLFlBQXFCO0FBQUEsb0NBQVQ0RCxPQUFTO0FBQVRBLFdBQVM7QUFBQTs7QUFDM0NDLGtCQUFnQkQsT0FBaEIsRUFBeUIsS0FBekI7QUFDQSxTQUFPLElBQVA7QUFDRCxDQUhEO0FBSUFQLFNBQVFuRCxjQUFSLEdBQXlCLFlBQXFCO0FBQUEscUNBQVQwRCxPQUFTO0FBQVRBLFdBQVM7QUFBQTs7QUFDNUNDLGtCQUFnQkQsT0FBaEIsRUFBeUIsSUFBekI7QUFDQSxTQUFPLElBQVA7QUFDRCxDQUhEO0FBSUEsU0FBU0MsZUFBVCxDQUF5QkQsT0FBekIsRUFBa0NuTCxLQUFsQyxFQUF5QztBQUN2Q21MLFVBQVE3TSxPQUFSLENBQWdCO0FBQUEsV0FBVStNLE9BQU9DLFFBQVAsR0FBa0J0TCxLQUE1QjtBQUFBLEdBQWhCO0FBQ0Q7O0FBRUQ7QUFDQTRLLFNBQVFsRyxZQUFSLEdBQXVCO0FBQUEsU0FDckIsZ0JBQU1BLFlBQU4sRUFEcUI7QUFBQSxDQUF2Qjs7QUFHQWtHLFNBQVE1QyxRQUFSLEdBQW1CO0FBQUEsU0FDakIsZ0JBQU03RixHQUFOLENBQVVvSixTQUFWLENBRGlCO0FBQUEsQ0FBbkI7O0FBR0FYLFNBQVE5SCxTQUFSLEdBQW9CO0FBQUEsU0FDbEIsZ0JBQU1BLFNBQU4sQ0FBZ0IwSSxTQUFoQixDQURrQjtBQUFBLENBQXBCOztBQUdBWixTQUFRM0gsU0FBUixHQUFvQjtBQUFBLFNBQ2xCLGdCQUFNQSxTQUFOLEVBRGtCO0FBQUEsQ0FBcEI7O2tCQUdlMkgsUTs7Ozs7OztBQ3REZix5QyIsImZpbGUiOiJsZWFybmluZy5idW5kbGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSlcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcblxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gaWRlbnRpdHkgZnVuY3Rpb24gZm9yIGNhbGxpbmcgaGFybW9ueSBpbXBvcnRzIHdpdGggdGhlIGNvcnJlY3QgY29udGV4dFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5pID0gZnVuY3Rpb24odmFsdWUpIHsgcmV0dXJuIHZhbHVlOyB9O1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHtcbiBcdFx0XHRcdGNvbmZpZ3VyYWJsZTogZmFsc2UsXG4gXHRcdFx0XHRlbnVtZXJhYmxlOiB0cnVlLFxuIFx0XHRcdFx0Z2V0OiBnZXR0ZXJcbiBcdFx0XHR9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSAyNik7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gd2VicGFjay9ib290c3RyYXAgNGM0NTgzNzQ1OTc3NmI0ZTM5YTkiLCJmdW5jdGlvbiBhamF4KHBhdGggPSAnJywgb3B0aW9ucyA9IHt9LCBmdWxsUmVzcG9uc2UgPSBmYWxzZSkge1xyXG4gIGNvbnN0IHhociA9IG5ldyBYTUxIdHRwUmVxdWVzdCgpO1xyXG4gIHhoci5vcGVuKG9wdGlvbnMubWV0aG9kIHx8ICdHRVQnLCBwYXRoLCB0cnVlKTtcclxuICBpZiAob3B0aW9ucy5oZWFkZXJzKSB7IHNldFhIUkhlYWRlcnMoeGhyLCBvcHRpb25zLmhlYWRlcnMpOyB9XHJcbiAgeGhyLnNlbmQob3B0aW9ucy5kYXRhKTtcclxuXHJcbiAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcclxuICAgIHhoci5vbnJlYWR5c3RhdGVjaGFuZ2UgPSBmdW5jdGlvbigpIHtcclxuICAgICAgaWYoeGhyLnJlYWR5U3RhdGUgPT0gNCkge1xyXG4gICAgICAgIGlmKHhoci5zdGF0dXMgPT0gMjAwKSB7XHJcbiAgICAgICAgICBpZiAoZnVsbFJlc3BvbnNlKSB7XHJcbiAgICAgICAgICAgIHJlc29sdmUoeGhyKTtcclxuICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHJlc29sdmUoeGhyLnJlc3BvbnNlVGV4dCk7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIHJlamVjdCh4aHIuc3RhdHVzVGV4dCk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfSlcclxufVxyXG5cclxuZnVuY3Rpb24gc2V0WEhSSGVhZGVycyh4aHIsIGhlYWRlcnMpIHtcclxuICBmb3IgKGxldCBoZWFkZXIgaW4gaGVhZGVycykge1xyXG4gICAgeGhyLnNldFJlcXVlc3RIZWFkZXIoaGVhZGVyLCBoZWFkZXJzW2hlYWRlcl0pO1xyXG4gIH1cclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgYWpheDtcclxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vdXRpbHMvYWpheC5qcyIsImNvbnN0IG5vZGVGYWN0b3J5ID0gZnVuY3Rpb24odHlwZSA9ICdkaXYnLCBwYXJhbXMgPSB7fSkge1xyXG4gIGNvbnN0IG5vZGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KHR5cGUpO1xyXG5cclxuICBhcHBlbmRDbGFzc2VzKG5vZGUsIHBhcmFtcyk7XHJcbiAgYXBwZW5kQXR0cnMobm9kZSwgcGFyYW1zKTtcclxuICBpbnNlcnRUZXh0Q29udGVudChub2RlLCBwYXJhbXMpO1xyXG5cclxuICByZXR1cm4gbm9kZTtcclxufVxyXG5cclxuZnVuY3Rpb24gYXBwZW5kQ2xhc3Nlcyhub2RlLCB7IGNsYXNzTGlzdCB9KSB7XHJcbiAgaWYgKGNsYXNzTGlzdCAmJiBjbGFzc0xpc3QuZm9yRWFjaCkge1xyXG4gICAgY2xhc3NMaXN0LmZvckVhY2goY2xhc3NOYW1lID0+IG5vZGUuY2xhc3NMaXN0LmFkZChjbGFzc05hbWUpKTtcclxuICB9XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGFwcGVuZEF0dHJzKG5vZGUsIHsgYXR0cnMgfSkge1xyXG4gIGlmIChhdHRycykge1xyXG4gICAgY29uc3QgYXR0ck5hbWVzID0gT2JqZWN0LmtleXMoYXR0cnMpO1xyXG4gICAgYXR0ck5hbWVzLmZvckVhY2goYXR0ck5hbWUgPT4gbm9kZS5zZXRBdHRyaWJ1dGUoYXR0ck5hbWUsIGF0dHJzW2F0dHJOYW1lXSkpO1xyXG4gIH1cclxufVxyXG5cclxuZnVuY3Rpb24gaW5zZXJ0VGV4dENvbnRlbnQobm9kZSwgeyB0ZXh0Q29udGVudCA9IFwiXCIgfSkge1xyXG4gIG5vZGUudGV4dENvbnRlbnQgPSB0ZXh0Q29udGVudDtcclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgbm9kZUZhY3Rvcnk7XHJcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3V0aWxzL25vZGVGYWN0b3J5LmpzIiwiY2xhc3MgQWN0aW9uIHtcclxuICBjb25zdHJ1Y3RvcihkYXRhKSB7XHJcbiAgICB0aGlzLm1pblRpbWUgPSBkYXRhLm1pblRpbWU7XHJcbiAgICB0aGlzLm1heFRpbWUgPSBkYXRhLm1heFRpbWU7XHJcbiAgICB0aGlzLm5leHRTdGF0ZSA9IGRhdGEubmV4dFN0YXRlO1xyXG4gICAgaWYgKGRhdGEuaW5hY3RpdmUpIHtcclxuICAgICAgdGhpcy5pbmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgIHRoaXMudG9vbHMgPSBbXTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHRoaXMuaW5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgdGhpcy50b29scyA9IHRoaXMuaW5pdFRvb2xzKGRhdGEudG9vbHMpO1xyXG4gICAgfVxyXG5cclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIEBwYXJhbSBbeyBpZDogTnVtYmVyLCB2YWx1ZTogTnVtYmVyL0Jvb2xlYW4gfSwgey4uLn1dXHJcbiAgICogQHBhcmFtIE51bWJlclxyXG4gICAqIEByZXR1cm4gQm9vbGVhblxyXG4gICAqL1xyXG4gIGlzU3VpdGFibGUoZGF0YSwgdGltZSkge1xyXG4gICAgcmV0dXJuIHRoaXMucmlnaHRUaW1lKHRpbWUpICYmIHRoaXMucmlnaHREYXRhKGRhdGEpO1xyXG4gIH1cclxuXHJcbiAgcmlnaHREYXRhKGRhdGEgPSBbXSkge1xyXG4gICAgcmV0dXJuIHRoaXMudG9vbHMuZXZlcnkodG9vbCA9PiB7XHJcbiAgICAgIC8vINCV0YHQu9C4INGB0YDQtdC00Lgg0L/QvtC70YPRh9C10L3QvdGL0YUg0LjRgtC10LzQvtCyINC90LXRgiwg0YLQvtCz0L4g0LrQvtGC0L7RgNGL0Lkg0LXRgdGC0Ywg0LIg0LTQsNC90L3QvtC8INGN0LrRiNC10L3QtVxyXG4gICAgICBjb25zdCBjaGVja1Rvb2wgPSBkYXRhLmZpbmQob2JqID0+IG9iai5pZCA9PSB0b29sLmlkKTtcclxuICAgICAgaWYgKCFjaGVja1Rvb2wpIHsgcmV0dXJuIGZhbHNlOyB9XHJcblxyXG4gICAgICBpZiAodG9vbC50eXBlID09PSAnc3dpdGNoJykgeyByZXR1cm4gY2hlY2tUb29sLnZhbHVlID09PSB0b29sLmJvb2xWYWx1ZTsgfVxyXG5cclxuICAgICAgaWYgKHRvb2wudHlwZSA9PT0gJ3JhbmdlJykgeyByZXR1cm4gdGhpcy5pbmNsdWRlc1ZhbHVlKGNoZWNrVG9vbC52YWx1ZSwgWyB0b29sLm1pblZhbHVlLCB0b29sLm1heFZhbHVlIF0pIH1cclxuXHJcbiAgICAgIHJldHVybiBmYWxzZTtcclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgaW5jbHVkZXNWYWx1ZSh2YWx1ZSwgYm9yZGVycykge1xyXG4gICAgaWYgKHR5cGVvZiB2YWx1ZSAhPT0gJ251bWJlcicpIHRocm93IG5ldyBUeXBlRXJyb3IoJ1ZhbHVlIHNob3VsZCBiZSBpbnRlZ2VyJyk7XHJcbiAgICByZXR1cm4gKHZhbHVlID49IGJvcmRlcnNbMF0pICYmICh2YWx1ZSA8PSBib3JkZXJzWzFdKTtcclxuICB9XHJcblxyXG4gIHJpZ2h0VGltZSh0aW1lKSB7XHJcbiAgICBpZiAodHlwZW9mIHRpbWUgIT09ICdudW1iZXInKSB0aHJvdyBuZXcgVHlwZUVycm9yKCdUaW1lIHNob3VsZCBiZSBpbnRlZ2VyIChtcyknKTtcclxuICAgIHJldHVybiAodGltZSA+PSB0aGlzLm1pblRpbWUpICYmICh0aW1lIDw9IHRoaXMubWF4VGltZSk7XHJcbiAgfVxyXG5cclxuICBpbml0VG9vbHModG9vbHMpIHtcclxuICAgIHJldHVybiB0b29scy5tYXAodG9vbCA9PiB7XHJcbiAgICAgIHJldHVybiB7XHJcbiAgICAgICAgaWQ6IHRvb2wuaWQsXHJcbiAgICAgICAgdHlwZTogdG9vbC50eXBlLFxyXG4gICAgICAgIG1pblZhbHVlOiB0b29sLkFjdGlvblRvb2wubWluVmFsdWUsXHJcbiAgICAgICAgbWF4VmFsdWU6IHRvb2wuQWN0aW9uVG9vbC5tYXhWYWx1ZSxcclxuICAgICAgICBib29sVmFsdWU6IHRvb2wuQWN0aW9uVG9vbC5ib29sVmFsdWVcclxuICAgICAgfVxyXG4gICAgfSk7XHJcbiAgfVxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBBY3Rpb247XHJcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2xlYXJuaW5nL21vZGVsX2NvbXBvbmVudHMvYWN0aW9uLmpzIiwiY2xhc3MgRXZlbnQge1xyXG4gIGNvbnN0cnVjdG9yKGRhdGEpIHtcclxuICAgIHRoaXMuaWQgPSBkYXRhLmlkO1xyXG4gICAgdGhpcy5uYW1lID0gZGF0YS5uYW1lO1xyXG4gICAgdGhpcy5kZXNjcmlwdGlvbiA9IGRhdGEuZGVzY3JpcHRpb247XHJcbiAgfVxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBFdmVudDtcclxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vbGVhcm5pbmcvbW9kZWxfY29tcG9uZW50cy9ldmVudC5qcyIsImltcG9ydCBFdmVudCBmcm9tICcuL2V2ZW50JyA7XHJcbmltcG9ydCBBY3Rpb24gZnJvbSAnLi9hY3Rpb24nO1xyXG5cclxuY2xhc3MgU3RhdGUge1xyXG4gIGNvbnN0cnVjdG9yKGRhdGEpIHtcclxuICAgIHRoaXMuaWQgPSBkYXRhLmlkO1xyXG4gICAgdGhpcy5uYW1lID0gZGF0YS5uYW1lO1xyXG4gICAgdGhpcy5pbWcgPSBkYXRhLmltZztcclxuICAgIHRoaXMucGFyYW1zID0gZGF0YS5wYXJhbXM7XHJcblxyXG4gICAgaWYoZGF0YS5sYXN0KSB7XHJcbiAgICAgIHRoaXMubGFzdCA9IHRydWU7XHJcbiAgICAgIHRoaXMuZXZlbnQgPSBudWxsO1xyXG4gICAgICB0aGlzLmFjdGlvbnMgPSBudWxsO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdGhpcy5ldmVudCA9IG5ldyBFdmVudChkYXRhLmV2ZW50KTtcclxuICAgICAgdGhpcy5hY3Rpb25zID0gZGF0YS5hY3Rpb25zLm1hcChhY3Rpb24gPT4gbmV3IEFjdGlvbihhY3Rpb24pKTtcclxuICAgICAgdGhpcy5sYXN0ID0gZmFsc2U7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBnZXRJbmFjdGl2ZVRpbWUoKSB7XHJcbiAgICBjb25zdCB0aW1lcyA9IHRoaXMuZ2V0QWxsQWN0aW9uVGltZXMoKTtcclxuICAgIHJldHVybiBNYXRoLm1heCguLi50aW1lcyk7XHJcbiAgfVxyXG5cclxuICBnZXRJbmFjdGl2ZUFjdGlvbigpIHtcclxuICAgIHJldHVybiB0aGlzLmFjdGlvbnMuZmluZChhY3Rpb24gPT4gYWN0aW9uLmluYWN0aXZlID09PSB0cnVlKTtcclxuICB9XHJcblxyXG4gIGdldEFsbEFjdGlvblRpbWVzKCkge1xyXG4gICAgcmV0dXJuIHRoaXMuYWN0aW9ucy5tYXAoYWN0aW9uID0+IGFjdGlvbi5tYXhUaW1lIHx8IDApO1xyXG4gIH1cclxuXHJcbiAgaGFuZGxlSW5wdXQoZGF0YSwgdGltZSkge1xyXG4gICAgY29uc3Qgc3VpdGVkQWN0aW9ucyA9IHRoaXMuYWN0aW9ucy5maWx0ZXIoYWN0aW9uID0+IGFjdGlvbi5pc1N1aXRhYmxlKGRhdGEsIHRpbWUpKTtcclxuICAgIGlmIChzdWl0ZWRBY3Rpb25zLmxlbmd0aCA+IDApIHtcclxuICAgICAgcmV0dXJuIHN1aXRlZEFjdGlvbnNbMF0ubmV4dFN0YXRlO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIG51bGw7XHJcbiAgfVxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBTdGF0ZTtcclxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vbGVhcm5pbmcvbW9kZWxfY29tcG9uZW50cy9zdGF0ZS5qcyIsImltcG9ydCBub2RlRmFjdG9yeSBmcm9tICcuLi8uLi91dGlscy9ub2RlRmFjdG9yeSc7XHJcbmltcG9ydCB0aW1lciBmcm9tICcuLi8uLi91dGlscy90aW1lcic7XHJcblxyXG5jb25zdCAkbmFtZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5tb2RlbC1zdGF0ZS1uYW1lJyk7XHJcbmNvbnN0ICRpbWcgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcubW9kZWwtc3RhdGUtaW1nJyk7XHJcbmNvbnN0ICRwYXJhbXMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcubW9kZWwtcGFyYW1zLXZhbHVlcycpO1xyXG5cclxuY29uc3QgJGV2ZW50ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLm1vZGVsLWV2ZW50Jyk7XHJcbmNvbnN0ICRldmVudEhlYWRlciA9ICRldmVudC5xdWVyeVNlbGVjdG9yKCcubW9kZWwtZXZlbnQtbmFtZSBzcGFuJyk7XHJcbmNvbnN0ICRldmVudEJvZHkgPSAkZXZlbnQucXVlcnlTZWxlY3RvcignLm1vZGVsLWV2ZW50LWluZm8nKTtcclxuXHJcbmNvbnN0ICR0aW1lckNvbnRhaW5lciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5tb2RlbC10aW1lcicpO1xyXG4kdGltZXJDb250YWluZXIuYXBwZW5kQ2hpbGQodGltZXIubm9kZSk7XHJcblxyXG5mdW5jdGlvbiBzZXQoeyBuYW1lLCBpbWcsIHBhcmFtcyB9KSB7XHJcbiAgJG5hbWUudGV4dENvbnRlbnQgPSBuYW1lO1xyXG4gICRpbWcuc2V0QXR0cmlidXRlKCdzcmMnLCBpbWcpO1xyXG4gIHNldFBhcmFtZXRlcnMocGFyYW1zKTtcclxufVxyXG5cclxuZnVuY3Rpb24gc2V0UGFyYW1ldGVycyhwYXJhbXMgPSBbXSkge1xyXG4gIGNvbnN0IGZyYWcgPSBkb2N1bWVudC5jcmVhdGVEb2N1bWVudEZyYWdtZW50KCk7XHJcbiAgcGFyYW1zLmZvckVhY2gocGFyYW0gPT4gZnJhZy5hcHBlbmRDaGlsZChjcmVhdGVQYXJhbWV0ZU5vZGUocGFyYW0ubmFtZSwgcGFyYW0udmFsdWUpKSk7XHJcblxyXG4gICRwYXJhbXMuaW5uZXJIVE1MID0gXCJcIjtcclxuICAkcGFyYW1zLmFwcGVuZENoaWxkKGZyYWcpO1xyXG59XHJcblxyXG5mdW5jdGlvbiBjcmVhdGVQYXJhbWV0ZU5vZGUoa2V5LCB2YWx1ZSkge1xyXG4gIGNvbnN0IGRpdiA9IG5vZGVGYWN0b3J5KCdkaXYnLCB7IGNsYXNzTGlzdDogWydwYXJhbWV0ZXInXSB9KTtcclxuXHJcbiAgY29uc3Qga2V5U3BhbiA9IG5vZGVGYWN0b3J5KCdzcGFuJywgeyB0ZXh0Q29udGVudDoga2V5IH0pO1xyXG4gIGRpdi5hcHBlbmRDaGlsZChrZXlTcGFuKTtcclxuXHJcbiAgY29uc3QgdmFsdWVTcGFuID0gbm9kZUZhY3RvcnkoJ3NwYW4nLCB7IHRleHRDb250ZW50OiB2YWx1ZSB9KTtcclxuICBkaXYuYXBwZW5kQ2hpbGQodmFsdWVTcGFuKTtcclxuXHJcbiAgcmV0dXJuIGRpdjtcclxufVxyXG5cclxuXHJcbi8qKiBTZXRzIGV2ZW50IGRhdGEgdG8gVUkgKi9cclxuZnVuY3Rpb24gc2hvd0V2ZW50KGV2ZW50KSB7XHJcbiAgJGV2ZW50SGVhZGVyLnRleHRDb250ZW50ID0gZXZlbnQubmFtZTtcclxuICAkZXZlbnRCb2R5LnRleHRDb250ZW50ID0gZXZlbnQuZGVzY3JpcHRpb247XHJcbiAgJGV2ZW50LmNsYXNzTGlzdC5yZW1vdmUoJ2lzLWhpZGRlbicsICdzbGlkZS10b3AnKTtcclxuICBzaG93VGltZXIoKTtcclxufVxyXG5mdW5jdGlvbiBoaWRlRXZlbnQoKSB7XHJcbiAgJGV2ZW50LmNsYXNzTGlzdC5hZGQoJ2lzLWhpZGRlbicsICdzbGlkZS10b3AnKTtcclxuICBoaWRlVGltZXIoKTtcclxufVxyXG5cclxuZnVuY3Rpb24gc2hvd1RpbWVyKCkge1xyXG4gICR0aW1lckNvbnRhaW5lci5jbGFzc0xpc3QucmVtb3ZlKCdpcy1oaWRkZW4nKTtcclxuICB0aW1lci5zdGFydCgpO1xyXG59XHJcbmZ1bmN0aW9uIGhpZGVUaW1lcigpIHtcclxuICAkdGltZXJDb250YWluZXIuY2xhc3NMaXN0LmFkZCgnaXMtaGlkZGVuJyk7XHJcbiAgdGltZXIuc3RvcCgpO1xyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCB7XHJcbiAgc2V0LFxyXG4gIHNob3dFdmVudCxcclxuICBoaWRlRXZlbnRcclxufVxyXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9sZWFybmluZy9zY2VuZV9jb21wb25lbnRzL3N0YXRlLmpzIiwiaW1wb3J0IG5vZGVGYWN0b3J5IGZyb20gJy4uLy4uL3V0aWxzL25vZGVGYWN0b3J5JztcclxuXHJcbmNvbnN0IHRvb2xUeXBlcyA9IHtcclxuICBSQU5HRTogJ3JhbmdlJyxcclxuICBTV0lUQ0g6ICdzd2l0Y2gnXHJcbn1cclxuY29uc3QgJHRvb2xzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnRvb2xzLWxpc3QnKTtcclxuXHJcbmZ1bmN0aW9uIGluaXQodG9vbHMpIHtcclxuICBjb25zdCBmcmFnbWVudCA9IGRvY3VtZW50LmNyZWF0ZURvY3VtZW50RnJhZ21lbnQoKTtcclxuXHJcbiAgdG9vbHMuZm9yRWFjaCh0b29sID0+IHtcclxuICAgIC8vIGNyZWF0ZSB0b29sIHdyYXBwZXJcclxuICAgIGNvbnN0IGRpdiA9IG5vZGVGYWN0b3J5KCdkaXYnLCB7IGNsYXNzTGlzdDogWyd0b29sJ10gfSk7XHJcblxyXG4gICAgY29uc3QgbGFiZWwgPSBub2RlRmFjdG9yeSgnbGFiZWwnLCB7XHJcbiAgICAgIGNsYXNzTGlzdDogWyd0b29sLW5hbWUnXSxcclxuICAgICAgYXR0cnM6IHsgXCJmb3JcIjogdG9vbC5uYW1lIH0sXHJcbiAgICAgIHRleHRDb250ZW50OiB0b29sLm5hbWVcclxuICAgIH0pO1xyXG4gICAgZGl2LmFwcGVuZENoaWxkKGxhYmVsKTtcclxuXHJcbiAgICBjb25zdCB0b29sTm9kZSA9IGNyZWF0ZVRvb2xOb2RlKHRvb2wpO1xyXG4gICAgZGl2LmFwcGVuZENoaWxkKHRvb2xOb2RlKTtcclxuXHJcbiAgICBmcmFnbWVudC5hcHBlbmRDaGlsZChkaXYpO1xyXG4gIH0pO1xyXG5cclxuICAkdG9vbHMuaW5uZXJIVE1MID0gXCJcIjtcclxuICAkdG9vbHMuYXBwZW5kQ2hpbGQoZnJhZ21lbnQpO1xyXG59XHJcblxyXG5mdW5jdGlvbiBjcmVhdGVUb29sTm9kZSh0b29sKSB7XHJcbiAgc3dpdGNoKHRvb2wudHlwZSkge1xyXG4gICAgY2FzZSB0b29sVHlwZXMuUkFOR0U6ICAgcmV0dXJuIGNyZWF0ZVJhbmdlVG9vbCh0b29sKTtcclxuICAgIGNhc2UgdG9vbFR5cGVzLlNXSVRDSDogIHJldHVybiBjcmVhdGVTd2l0Y2hUb29sKHRvb2wpO1xyXG4gICAgZGVmYXVsdDogICAgICAgICAgICAgICAgcmV0dXJuICfQndC10LjQt9Cy0LXRgdGC0L3Ri9C5INC/0YDQuNCx0L7RgCc7XHJcbiAgfVxyXG59XHJcblxyXG5mdW5jdGlvbiBjcmVhdGVSYW5nZVRvb2wodG9vbCkge1xyXG4gIGNvbnN0IGRpdklucHV0ID0gbm9kZUZhY3RvcnkoJ2RpdicsIHsgY2xhc3NMaXN0OiBbJ3JhbmdlJ10gfSk7XHJcblxyXG4gIGNvbnN0IHNwYW5NaW4gPSBub2RlRmFjdG9yeSgnc3BhbicsIHsgdGV4dENvbnRlbnQ6IHRvb2wubWluIH0pO1xyXG4gIGRpdklucHV0LmFwcGVuZENoaWxkKHNwYW5NaW4pXHJcblxyXG4gIGNvbnN0IGlucHV0ID0gbm9kZUZhY3RvcnkoJ2lucHV0Jywge1xyXG4gICAgYXR0cnM6IHtcclxuICAgICAgJ2RhdGEtaWQnOiB0b29sLmlkLFxyXG4gICAgICAnZGF0YS10eXBlJzogJ3JhbmdlJyxcclxuICAgICAgJ25hbWUnOiB0b29sLm5hbWUsXHJcbiAgICAgICd0eXBlJzogJ3JhbmdlJyxcclxuICAgICAgJ21pbic6IHRvb2wubWluLFxyXG4gICAgICAnbWF4JzogdG9vbC5tYXhcclxuICAgIH1cclxuICB9KTtcclxuICBkaXZJbnB1dC5hcHBlbmRDaGlsZChpbnB1dCk7XHJcblxyXG4gIGNvbnN0IHNwYW5NYXggPSBub2RlRmFjdG9yeSgnc3BhbicsIHsgdGV4dENvbnRlbnQ6IHRvb2wubWF4IH0pO1xyXG4gIGRpdklucHV0LmFwcGVuZENoaWxkKHNwYW5NYXgpO1xyXG5cclxuICBjb25zdCBkaXZDdXJyZW50ID0gbm9kZUZhY3RvcnkoJ2RpdicsIHsgY2xhc3NMaXN0OiBbJ3JhbmdlLWN1cnJlbnQtdmFsdWUnXSB9KTtcclxuICBjb25zdCBzcGFuQ3VycmVudCA9IG5vZGVGYWN0b3J5KCdzcGFuJywgeyB0ZXh0Q29udGVudDogaW5wdXQudmFsdWUgfSk7XHJcbiAgZGl2Q3VycmVudC5hcHBlbmRDaGlsZChzcGFuQ3VycmVudCk7XHJcblxyXG4gIGlucHV0LmFkZEV2ZW50TGlzdGVuZXIoJ2lucHV0JywgKGV2dCkgPT4ge1xyXG4gICAgc3BhbkN1cnJlbnQudGV4dENvbnRlbnQgPSBldnQudGFyZ2V0LnZhbHVlO1xyXG4gIH0pO1xyXG5cclxuICBjb25zdCBmcmFnbWVudCA9IGRvY3VtZW50LmNyZWF0ZURvY3VtZW50RnJhZ21lbnQoKTtcclxuICBmcmFnbWVudC5hcHBlbmRDaGlsZChkaXZJbnB1dCk7XHJcbiAgZnJhZ21lbnQuYXBwZW5kQ2hpbGQoZGl2Q3VycmVudCk7XHJcblxyXG4gIHJldHVybiBmcmFnbWVudDtcclxufVxyXG5cclxuZnVuY3Rpb24gY3JlYXRlU3dpdGNoVG9vbCh0b29sKSB7XHJcbiAgY29uc3QgbGFiZWwgPSBub2RlRmFjdG9yeSgnbGFiZWwnLCB7IGNsYXNzTGlzdDogWydzd2l0Y2gnXSB9KTtcclxuXHJcbiAgY29uc3QgaW5wdXQgPSBub2RlRmFjdG9yeSgnaW5wdXQnLCB7XHJcbiAgICBhdHRyczoge1xyXG4gICAgICAnZGF0YS1pZCc6IHRvb2wuaWQsXHJcbiAgICAgICdkYXRhLXR5cGUnOiAnc3dpdGNoJyxcclxuICAgICAgJ3R5cGUnOiAnY2hlY2tib3gnXHJcbiAgICB9XHJcbiAgfSk7XHJcbiAgbGFiZWwuYXBwZW5kQ2hpbGQoaW5wdXQpO1xyXG5cclxuICBjb25zdCBkaXYgPSBub2RlRmFjdG9yeSgnZGl2JywgeyBjbGFzc0xpc3Q6IFsnc2xpZGVyJ10gfSk7XHJcbiAgbGFiZWwuYXBwZW5kQ2hpbGQoZGl2KTtcclxuXHJcbiAgcmV0dXJuIGxhYmVsO1xyXG59XHJcblxyXG5mdW5jdGlvbiBnZXRUb29sc0RhdGEoKSB7XHJcbiAgY29uc3QgdG9vbHNEYXRhID0gW107XHJcbiAgY29uc3QgaW5wdXRzID0gJHRvb2xzLnF1ZXJ5U2VsZWN0b3JBbGwoJ2lucHV0W2RhdGEtaWRdJyk7XHJcbiAgaW5wdXRzLmZvckVhY2goaW5wdXQgPT4ge1xyXG4gICAgY29uc3QgeyBpZCwgdHlwZSB9ID0gaW5wdXQuZGF0YXNldDtcclxuICAgIGxldCB2YWx1ZTtcclxuICAgIHN3aXRjaCh0eXBlKSB7XHJcbiAgICAgIGNhc2UgdG9vbFR5cGVzLlJBTkdFOiB2YWx1ZSA9IHBhcnNlSW50KGlucHV0LnZhbHVlKTsgYnJlYWs7XHJcbiAgICAgIGNhc2UgdG9vbFR5cGVzLlNXSVRDSDogdmFsdWUgPSBpbnB1dC5jaGVja2VkOyBicmVhaztcclxuICAgICAgZGVmYXVsdDogdGhyb3cgbmV3IEVycm9yKGDQndC10LrQvtGA0YDQtdC60YLQvdGL0Lkg0YLQuNC/INC/0YDQuNCx0L7RgNCwLiBJRDogJHtpZH1gKTtcclxuICAgIH1cclxuICAgIHRvb2xzRGF0YS5wdXNoKHsgaWQsIHZhbHVlIH0pO1xyXG4gIH0pO1xyXG4gIHJldHVybiB0b29sc0RhdGE7XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IHtcclxuICBpbml0LFxyXG4gIGdldFRvb2xzRGF0YVxyXG59O1xyXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9sZWFybmluZy9zY2VuZV9jb21wb25lbnRzL3Rvb2xzLmpzIiwiY29uc3QgcHVic3ViID0gKGZ1bmN0aW9uKCkge1xyXG5cclxuICBjb25zdCB0b3BpY3MgPSB7fTtcclxuXHJcbiAgcmV0dXJuIHtcclxuICAgIHN1YnNjcmliZTogZnVuY3Rpb24odG9waWMsIGxpc3RlbmVyKSB7XHJcbiAgICAgIGlmICghdG9waWNzW3RvcGljXSkgdG9waWNzW3RvcGljXSA9IHsgcXVldWU6IFtdIH07XHJcblxyXG4gICAgICBjb25zdCBpbmRleCA9IHRvcGljc1t0b3BpY10ucXVldWUucHVzaChsaXN0ZW5lcikgLSAxO1xyXG4gICAgICAvLyBmdW5jdGlvbiB0byBkZWxldGUgdG9waWNcclxuICAgICAgcmV0dXJuIHtcclxuICAgICAgICByZW1vdmU6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgZGVsZXRlIHRvcGljc1t0b3BpY10ucXVldWVbaW5kZXhdO1xyXG4gICAgICAgIH1cclxuICAgICAgfTtcclxuICAgIH0sXHJcblxyXG4gICAgcHVibGlzaDogZnVuY3Rpb24odG9waWMsIGluZm8pIHtcclxuICAgICAgLy8gbm8gdGhlbWUgb3Igbm8gbGlzdGVuZXJzXHJcbiAgICAgIGlmICghdG9waWNzW3RvcGljXSB8fCAhdG9waWNzW3RvcGljXS5xdWV1ZS5sZW5ndGgpIHJldHVybjtcclxuXHJcbiAgICAgIGNvbnN0IGl0ZW1zID0gdG9waWNzW3RvcGljXS5xdWV1ZTtcclxuICAgICAgaXRlbXMuZm9yRWFjaChpdGVtID0+IHtcclxuICAgICAgICBpdGVtKGluZm8gfHwge30pO1xyXG4gICAgICB9KTtcclxuICAgIH1cclxuICB9O1xyXG59KSgpO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgcHVic3ViO1xyXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi91dGlscy9wdWJzdWIuanMiLCJpbXBvcnQgbm9kZUZhY3RvcnkgZnJvbSAnLi9ub2RlRmFjdG9yeSc7XHJcblxyXG5mdW5jdGlvbiBtc1RvQ29udGVudChtcykge1xyXG4gIGNvbnN0IHNlY29uZHMgPSBNYXRoLnJvdW5kKG1zIC8gMTAwMCk7XHJcbiAgY29uc3QgbWlucyA9IE1hdGguZmxvb3Ioc2Vjb25kcyAvIDYwKTtcclxuICBjb25zdCBzZWNvbmRzTGVmdCA9IHNlY29uZHMgLSAobWlucyAqIDYwKTtcclxuXHJcbiAgcmV0dXJuIGAke21pbnN9OiR7c2Vjb25kc0xlZnQgPj0gMTAgPyAnJyA6ICcwJ30ke3NlY29uZHNMZWZ0fWA7XHJcbn1cclxuXHJcbmNvbnN0IHRpbWVyID0ge1xyXG4gIHN0YXJ0VGltZTogbnVsbCxcclxuICBpbnRlcnZhbDogbnVsbCxcclxuICBub2RlOiBub2RlRmFjdG9yeSgnc3BhbicsIHsgY2xhc3NMaXN0OiBbJ3RpbWVyJ10sIHRleHRDb250ZW50OiAnMDowMCcgfSksXHJcbiAgc3RhcnQ6IGZ1bmN0aW9uKCkge1xyXG4gICAgdGhpcy5zdGFydFRpbWUgPSBEYXRlLm5vdygpO1xyXG4gICAgdGhpcy5pbnRlcnZhbCA9IHNldEludGVydmFsKCgpID0+IHtcclxuICAgICAgY29uc3QgZWxhcHNlZCA9IERhdGUubm93KCkgLSB0aGlzLnN0YXJ0VGltZTtcclxuICAgICAgdGhpcy5ub2RlLnRleHRDb250ZW50ID0gbXNUb0NvbnRlbnQoZWxhcHNlZCk7XHJcbiAgICB9LCAxMDAwKTtcclxuICB9LFxyXG4gIHN0b3A6IGZ1bmN0aW9uKCkge1xyXG4gICAgaWYgKCF0aGlzLnN0YXJ0VGltZSkgeyByZXR1cm47IH1cclxuICAgIHRoaXMuc3RhcnRUaW1lID0gbnVsbDtcclxuICAgIGNsZWFySW50ZXJ2YWwodGhpcy5pbnRlcnZhbCk7XHJcbiAgICB0aGlzLm5vZGUudGV4dENvbnRlbnQgPSAnMDowMCc7XHJcbiAgfVxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCB0aW1lcjtcclxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vdXRpbHMvdGltZXIuanMiLCJpbXBvcnQgJy4uLy4uL3Nhc3MvbGVhcm5pbmcuc2Nzcyc7XHJcblxyXG5pbXBvcnQgcHVic3ViIGZyb20gJy4uL3V0aWxzL3B1YnN1Yic7XHJcbmltcG9ydCBhamF4IGZyb20gJy4uL3V0aWxzL2FqYXgnO1xyXG5pbXBvcnQgc2NlbmUgZnJvbSAnLi9zY2VuZSc7XHJcbmltcG9ydCBNb2RlbCBmcm9tICcuL21vZGVsJztcclxuXHJcbi8qKlxyXG4gKiBMb2FkIG1vZGVsIHdpdGggZ2l2ZW4gaWRcclxuICovXHJcbmZ1bmN0aW9uIGxvYWRNb2RlbChpZCkge1xyXG4gIHJldHVybiBhamF4KGAvbW9kZWxzLyR7aWR9YCkudGhlbihyZXNwb25zZSA9PiBKU09OLnBhcnNlKHJlc3BvbnNlKSk7XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBVSSBidXR0b24ncyBoYW5kbGVyc1xyXG4gKi9cclxuY29uc3QgJHNlbGVjdCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjbW9kZWwtc2VsZWN0XCIpO1xyXG5jb25zdCAkbG9hZEJ1dHRvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNsb2FkLW1vZGVsLWJ0bicpO1xyXG5cclxubGV0IG1vZGVsID0gbnVsbDtcclxuXHJcbiRsb2FkQnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xyXG4gIGlmICggbW9kZWwgKSB7IG1vZGVsLnN0b3AoKTsgfVxyXG4gIGNvbnN0IG1vZGVsSWQgPSAkc2VsZWN0LnZhbHVlO1xyXG4gIGxvYWRNb2RlbChtb2RlbElkKVxyXG4gICAgLnRoZW4ocmVzcG9uc2UgPT4ge1xyXG4gICAgICBtb2RlbCA9IG5ldyBNb2RlbChyZXNwb25zZSk7XHJcbiAgICAgIHNjZW5lLmluaXQobW9kZWwsIHJlc3BvbnNlKVxyXG4gICAgICAgIC5zaG93Q29udGVudCgpXHJcbiAgICAgICAgLmVuYWJsZUJ1dHRvbnMoJHN0YXJ0QnV0dG9uKVxyXG4gICAgICAgIC5kaXNhYmxlQnV0dG9ucygkc3RvcEJ1dHRvbiwgJHJ1bkJ1dHRvbik7XHJcbiAgICB9KVxyXG4gICAgLmNhdGNoKGVyciA9PiB7IGNvbnNvbGUuZXJyb3IoZXJyKSB9KTtcclxufSk7XHJcbi8vXHJcbmNvbnN0ICRzdGFydEJ1dHRvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNzdGFydC1idG4nKTtcclxuJHN0YXJ0QnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xyXG4gIG1vZGVsLnN0YXJ0KCk7XHJcbiAgc2NlbmUuZGlzYWJsZUJ1dHRvbnMoJHN0YXJ0QnV0dG9uKTtcclxuICBzY2VuZS5lbmFibGVCdXR0b25zKCRzdG9wQnV0dG9uLCAkcnVuQnV0dG9uKTtcclxufSk7XHJcblxyXG5jb25zdCAkc3RvcEJ1dHRvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNzdG9wLWJ0bicpO1xyXG4kc3RvcEJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcclxuICBwdWJzdWIucHVibGlzaCgnbW9kZWxfc3RvcCcpO1xyXG4gIHNjZW5lLmVuYWJsZUJ1dHRvbnMoJHN0YXJ0QnV0dG9uKTtcclxuICBzY2VuZS5kaXNhYmxlQnV0dG9ucygkc3RvcEJ1dHRvbiwgJHJ1bkJ1dHRvbik7XHJcbn0pO1xyXG5cclxuY29uc3QgJHJ1bkJ1dHRvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNydW4tYnRuJyk7XHJcbiRydW5CdXR0b24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XHJcbiAgY29uc3QgdG9vbHNEYXRhID0gc2NlbmUuZ2V0VG9vbHNEYXRhKCk7XHJcbiAgcHVic3ViLnB1Ymxpc2goJ3VzZXJfaW5wdXQnLCB0b29sc0RhdGEpO1xyXG59KTtcclxuXHJcbi8qKlxyXG4gKiBIYW5kbGUgY3VzdG9tIGV2ZW50cyBoZXJlICh1c2VyIGlucHV0LCBwcm9ncmFtbSBtZXNzYWdlcyBldGMuKVxyXG4gKi9cclxucHVic3ViLnN1YnNjcmliZSgnbmV3X3N0YXRlJywgc3RhdGUgPT4ge1xyXG4gIHNjZW5lLmhpZGVFdmVudCgpO1xyXG4gIHNjZW5lLnNldFN0YXRlKHN0YXRlKTtcclxufSk7XHJcbnB1YnN1Yi5zdWJzY3JpYmUoJ2V2ZW50JywgZXZlbnQgPT4gc2NlbmUuc2hvd0V2ZW50KGV2ZW50KSk7XHJcblxyXG4vLyAvKipcclxuLy8gKiBUaW1lciAoY3VycmVudGx5IGZvciBkZXYgbW9kZSBvbmx5KVxyXG4vLyAqL1xyXG4vLyBpbXBvcnQgdGltZXIgZnJvbSAnLi4vdXRpbHMvdGltZXInO1xyXG4vLyBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuaGVhZGVyJykuYXBwZW5kQ2hpbGQodGltZXIubm9kZSk7XHJcbi8vIHB1YnN1Yi5zdWJzY3JpYmUoJ25ld19zdGF0ZScsIHN0YXRlID0+IHRpbWVyLnN0b3AoKSk7XHJcbi8vIHB1YnN1Yi5zdWJzY3JpYmUoJ2V2ZW50JywgZXZlbnQgPT4gdGltZXIuc3RhcnQoKSk7XHJcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2xlYXJuaW5nL2luZGV4LmpzIiwiaW1wb3J0IGFqYXggZnJvbSAnLi4vdXRpbHMvYWpheCc7XHJcblxyXG5jb25zdCBSRVBPUlRfVVJMID0gJy9sZWFybmluZy9yZXBvcnQnO1xyXG5jb25zdCBhamF4Q29uZmlnID0ge1xyXG4gIG1ldGhvZDogJ1BPU1QnLFxyXG4gIGhlYWRlcnM6IHtcclxuICAgICdDb250ZW50LXR5cGUnOiAnYXBwbGljYXRpb24vanNvbidcclxuICB9XHJcbn1cclxuXHJcbmNsYXNzIFJlcG9ydCB7XHJcbiAgY29uc3RydWN0b3IobmFtZSwgc3RlcHMpIHtcclxuICAgIHRoaXMubW9kZWxOYW1lID0gbmFtZTtcclxuICAgIHRoaXMuc3RlcHMgPSBzdGVwcztcclxuICAgIHRoaXMuc3RhdGVzID0gW107XHJcbiAgICB0aGlzLmN1cnJlbnRTdGF0ZSA9IG51bGw7XHJcbiAgfVxyXG5cclxuICBwdXNoU3RhdGUoc3RhdGUpIHtcclxuICAgIGNvbnN0IHsgbmFtZSB9ID0gc3RhdGU7XHJcbiAgICBjb25zdCBtYXhUaW1lID0gc3RhdGUubGFzdCA/IC0xIDogc3RhdGUuZ2V0SW5hY3RpdmVUaW1lKCk7XHJcbiAgICBjb25zdCBpbmFjdGl2ZSA9IHRydWU7XHJcbiAgICBjb25zdCBhY3Rpb25zTnVtYmVyID0gMDtcclxuICAgIHRoaXMuc3RhdGVzLnB1c2goeyBuYW1lLCBtYXhUaW1lLCBpbmFjdGl2ZSwgYWN0aW9uc051bWJlciB9KTtcclxuICAgIHRoaXMuY3VycmVudFN0YXRlID0gdGhpcy5zdGF0ZXNbdGhpcy5zdGF0ZXMubGVuZ3RoIC0gMV07XHJcbiAgfVxyXG5cclxuICBpbmNyZWFzZUFjdGlvbnNOdW1iZXIoKSB7XHJcbiAgICB0aGlzLmN1cnJlbnRTdGF0ZS5hY3Rpb25zTnVtYmVyKys7XHJcbiAgfVxyXG5cclxuICBzZXRTcGVudFRpbWUodGltZSkge1xyXG4gICAgdGhpcy5jdXJyZW50U3RhdGUuc3BlbnRUaW1lID0gdGltZTtcclxuICAgIHRoaXMuc2V0SW5hY3RpdmUoZmFsc2UpO1xyXG4gIH1cclxuXHJcbiAgc2V0SW5hY3RpdmUodmFsdWUpIHtcclxuICAgIHRoaXMuY3VycmVudFN0YXRlLmluYWN0aXZlID0gdmFsdWU7XHJcbiAgfVxyXG5cclxuICBzZW5kKCkge1xyXG4gICAgaWYgKHRoaXMuc3RhdGVzLmxlbmd0aCA+IDEpIHtcclxuICAgICAgLy8gcmVtb3ZlIGxhc3Qgc3RhdGUgLSB1c2VyIGNhbid0IG1ha2UgYW55IGFjdGlvblxyXG4gICAgICB0aGlzLnN0YXRlcyA9IHRoaXMuc3RhdGVzLnNsaWNlKDAsIC0xKTtcclxuICAgIH1cclxuICAgIGFqYXhDb25maWcuZGF0YSA9IEpTT04uc3RyaW5naWZ5KHtcclxuICAgICAgbW9kZWxOYW1lOiB0aGlzLm1vZGVsTmFtZSxcclxuICAgICAgc3RlcHM6IHRoaXMuc3RlcHMsXHJcbiAgICAgIHN0YXRlczogdGhpcy5zdGF0ZXNcclxuICAgIH0pO1xyXG4gICAgYWpheChSRVBPUlRfVVJMLCBhamF4Q29uZmlnKTtcclxuICB9XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IFJlcG9ydDtcclxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vbGVhcm5pbmcvcmVwb3J0LmpzIiwiaW1wb3J0IFN0YXRlIGZyb20gJy4vbW9kZWxfY29tcG9uZW50cy9zdGF0ZSc7XHJcbmltcG9ydCBwdWJzdWIgZnJvbSAnLi4vdXRpbHMvcHVic3ViJztcclxuaW1wb3J0IFJlcG9ydCBmcm9tICcuL3JlcG9ydCc7XHJcblxyXG5jb25zdCBJTklUSUFMX1NUQVRFX05BTUUgPSAn0KHQvtGB0YLQvtGP0L3QuNC1INC80L7QtNC10LvQuCc7XHJcbmNvbnN0IFNUT1BfU1RBVEVfTkFNRSA9ICfQntCx0YPRh9C10L3QuNC1INC+0YHRgtCw0L3QvtCy0LvQtdC90L4nO1xyXG5cclxuY2xhc3MgTW9kZWwge1xyXG4gIGNvbnN0cnVjdG9yKGRhdGEpIHtcclxuICAgIHRoaXMuaWQgPSBkYXRhLmlkO1xyXG4gICAgdGhpcy5uYW1lID0gZGF0YS5uYW1lO1xyXG4gICAgdGhpcy5icmVha1RpbWUgPSBkYXRhLmJyZWFrVGltZTtcclxuICAgIHRoaXMuc3RlcHMgPSBkYXRhLnN0ZXBzO1xyXG5cclxuICAgIHRoaXMuc3RhdGVzID0gZGF0YS5zdGF0ZXMubWFwKHN0YXRlID0+IG5ldyBTdGF0ZShzdGF0ZSkpO1xyXG4gICAgdGhpcy5jdXJyZW50U3RhdGUgPSB0aGlzLmdldFN0YXRlKGRhdGEuaW5pdGlhbFN0YXRlKTtcclxuXHJcbiAgICB0aGlzLnRpbWVvdXQgPSBudWxsO1xyXG4gICAgdGhpcy5zdWJJbnB1dCA9IG51bGw7XHJcbiAgICB0aGlzLnN1YlN0b3AgPSBudWxsO1xyXG4gICAgdGhpcy5zdGFydFN0YXRlID0gbmV3IFN0YXRlKHsgaWQ6IDAsIG5hbWU6IElOSVRJQUxfU1RBVEVfTkFNRSwgaW1nOiAnaW1nL3N0YXJ0LnBuZycsIGxhc3Q6IHRydWUgfSk7XHJcbiAgICB0aGlzLnN0b3BTdGF0ZSA9IG5ldyBTdGF0ZSh7IGlkOiAtMSwgbmFtZTogU1RPUF9TVEFURV9OQU1FLCBpbWc6ICdpbWcvc3RvcC5wbmcnLCBsYXN0OiB0cnVlIH0pO1xyXG4gIH1cclxuXHJcbiAgZ2V0U3RhdGUoaWQpIHtcclxuICAgIHJldHVybiB0aGlzLnN0YXRlcy5maW5kKHN0YXRlID0+IHN0YXRlLmlkID09IGlkKTtcclxuICB9XHJcblxyXG4gIHN0YXJ0KCkge1xyXG4gICAgdGhpcy5yZXBvcnQgPSBuZXcgUmVwb3J0KHRoaXMubmFtZSwgdGhpcy5zdGVwcyk7XHJcbiAgICB0aGlzLmhhbmRsZU5ld1N0YXRlKHRoaXMuY3VycmVudFN0YXRlKTsgLy8gc2V0IGluaXRpYWwgc3RhdGVcclxuICAgIGxldCBpbnRlcnZhbHMgPSBQcm9taXNlLnJlc29sdmUoKTsgLy8gaW5pdCBwcm9taXNlIGNoYWluXHJcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMuc3RlcHM7IGkrKykge1xyXG4gICAgICBpbnRlcnZhbHMgPSBpbnRlcnZhbHNcclxuICAgICAgIC50aGVuKCgpID0+IHsgcmV0dXJuIHRoaXMubWFrZUJyZWFrKCkgfSlcclxuICAgICAgIC50aGVuKCgpID0+IHsgcmV0dXJuIHRoaXMuaGFuZGxlRXZlbnQoKSB9KVxyXG4gICAgICAgLnRoZW4oc3RhdGUgPT4geyB0aGlzLmhhbmRsZU5ld1N0YXRlKHN0YXRlKSB9KVxyXG4gICAgfVxyXG4gICAgaW50ZXJ2YWxzXHJcbiAgICAgIC5jYXRjaChzdGF0ZSA9PiB0aGlzLmhhbmRsZU5ld1N0YXRlKHN0YXRlKSlcclxuICAgICAgLnRoZW4oKCkgPT4ge1xyXG4gICAgICAgIGlmICh0aGlzLmN1cnJlbnRTdGF0ZS5uYW1lICE9PSBTVE9QX1NUQVRFX05BTUUpIHtcclxuICAgICAgICAgIHRoaXMucmVwb3J0LnNlbmQoKTtcclxuICAgICAgICB9XHJcbiAgICAgIH0pO1xyXG4gICAgcmV0dXJuIGludGVydmFscztcclxuICB9XHJcblxyXG4gIG1ha2VCcmVhaygpIHtcclxuICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XHJcbiAgICAgIHRoaXMuc3ViU3RvcCA9IHB1YnN1Yi5zdWJzY3JpYmUoJ21vZGVsX3N0b3AnLCAoKSA9PiB7IHJlamVjdCh0aGlzLnN0b3BTdGF0ZSk7IH0pXHJcbiAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgIHRoaXMuY2xlYXJTdWJzKCk7XHJcbiAgICAgICAgcmVzb2x2ZSgpXHJcbiAgICAgIH0sIHRoaXMuYnJlYWtUaW1lKTtcclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgaGFuZGxlRXZlbnQoKSB7XHJcbiAgICBjb25zdCBldmVudCA9IHRoaXMuY3VycmVudFN0YXRlLmV2ZW50O1xyXG4gICAgY29uc3QgZXZlbnRTdGFydFRpbWUgPSBEYXRlLm5vdygpO1xyXG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcclxuICAgICAgLy8gc2VuZCBkYXRhIGFib3V0IG5ldyBldmVudCB0byBvdGhlciBtb2R1bGVzXHJcbiAgICAgIHB1YnN1Yi5wdWJsaXNoKCdldmVudCcsIGV2ZW50KTtcclxuXHJcbiAgICAgIC8vIGxpc3RlbiB0byB1c2VyIGFjdGlvblxyXG4gICAgICAvLyBhbmQgaWYgdXNlciBpbnB1dCBjb3JyZWN0IGdvIHRvIG5leHQgc3RhdGVcclxuICAgICAgdGhpcy5zdWJJbnB1dCA9IHB1YnN1Yi5zdWJzY3JpYmUoJ3VzZXJfaW5wdXQnLCBkYXRhID0+IHtcclxuICAgICAgICB0aGlzLnJlcG9ydC5pbmNyZWFzZUFjdGlvbnNOdW1iZXIoKTtcclxuICAgICAgICBjb25zdCB0aW1lU3BlbnQgPSBEYXRlLm5vdygpIC0gZXZlbnRTdGFydFRpbWU7XHJcbiAgICAgICAgY29uc3QgbmV4dFN0YXRlSWQgPSB0aGlzLmN1cnJlbnRTdGF0ZS5oYW5kbGVJbnB1dChkYXRhLCB0aW1lU3BlbnQpO1xyXG4gICAgICAgIGNvbnN0IG5leHRTdGF0ZSA9IHRoaXMuZ2V0U3RhdGUobmV4dFN0YXRlSWQpO1xyXG4gICAgICAgIGlmICggbmV4dFN0YXRlICkge1xyXG4gICAgICAgICAgdGhpcy5yZXBvcnQuc2V0U3BlbnRUaW1lKHRpbWVTcGVudCk7XHJcbiAgICAgICAgICBuZXh0U3RhdGUubGFzdCA/IHJlamVjdChuZXh0U3RhdGUpIDogcmVzb2x2ZShuZXh0U3RhdGUpO1xyXG4gICAgICAgIH1cclxuICAgICAgfSk7XHJcblxyXG4gICAgICAvLyBoYW5kbGUgdXNlciBzdG9wIGJ1dHRvbiBjbGlja1xyXG4gICAgICB0aGlzLnN1YlN0b3AgPSBwdWJzdWIuc3Vic2NyaWJlKCdtb2RlbF9zdG9wJywgKCkgPT4ge1xyXG4gICAgICAgIHJlamVjdCh0aGlzLnN0b3BTdGF0ZSk7XHJcbiAgICAgIH0pO1xyXG5cclxuICAgICAgLy8gaGFuZGxlIGluYWN0aXZlXHJcbiAgICAgIGNvbnN0IGluYWN0aXZlVGltZSA9IHRoaXMuY3VycmVudFN0YXRlLmdldEluYWN0aXZlVGltZSgpO1xyXG4gICAgICB0aGlzLnRpbWVvdXQgPSBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgICBjb25zdCBuZXh0U3RhdGVJZCA9IHRoaXMuY3VycmVudFN0YXRlLmdldEluYWN0aXZlQWN0aW9uKCkubmV4dFN0YXRlO1xyXG4gICAgICAgIGNvbnN0IG5leHRTdGF0ZSA9IHRoaXMuZ2V0U3RhdGUobmV4dFN0YXRlSWQpO1xyXG4gICAgICAgIG5leHRTdGF0ZS5sYXN0ID8gcmVqZWN0KG5leHRTdGF0ZSkgOiByZXNvbHZlKG5leHRTdGF0ZSk7XHJcbiAgICAgIH0sIGluYWN0aXZlVGltZSk7XHJcbiAgICB9KVxyXG4gIH1cclxuXHJcbiAgaGFuZGxlTmV3U3RhdGUoc3RhdGUpIHtcclxuICAgIHRoaXMucmVwb3J0LnB1c2hTdGF0ZShzdGF0ZSk7XHJcbiAgICB0aGlzLmN1cnJlbnRTdGF0ZSA9IHN0YXRlO1xyXG4gICAgY2xlYXJUaW1lb3V0KHRoaXMudGltZW91dCk7XHJcbiAgICB0aGlzLmNsZWFyU3VicygpO1xyXG4gICAgcHVic3ViLnB1Ymxpc2goJ25ld19zdGF0ZScsIHN0YXRlKTtcclxuICB9XHJcblxyXG4gIGNsZWFyU3VicygpIHtcclxuICAgIGlmICh0aGlzLnN1YklucHV0KSB7XHJcbiAgICAgIHRoaXMuc3ViSW5wdXQucmVtb3ZlKCk7XHJcbiAgICB9XHJcbiAgICBpZiAodGhpcy5zdWJTdG9wKSB7XHJcbiAgICAgIHRoaXMuc3ViU3RvcC5yZW1vdmUoKTtcclxuICAgIH1cclxuICB9XHJcblxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBNb2RlbDtcclxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vbGVhcm5pbmcvbW9kZWwuanMiLCJpbXBvcnQgc3RhdGUgZnJvbSAnLi9zY2VuZV9jb21wb25lbnRzL3N0YXRlJztcclxuaW1wb3J0IHRvb2xzIGZyb20gJy4vc2NlbmVfY29tcG9uZW50cy90b29scyc7XHJcblxyXG5jb25zdCBleHBvcnRzID0ge307XHJcblxyXG4vLyBTY2VuZSBtZXRhZGF0YVxyXG5jb25zdCAkbW9kZWxOYW1lID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLm1vZGVsLW5hbWUnKTtcclxuZXhwb3J0cy5pbml0ID0gZnVuY3Rpb24obW9kZWwsIHJlc3BvbnNlKSB7XHJcbiAgJG1vZGVsTmFtZS50ZXh0Q29udGVudCA9IG1vZGVsLm5hbWU7XHJcbiAgc3RhdGUuc2V0KG1vZGVsLnN0YXJ0U3RhdGUpO1xyXG4gIHRvb2xzLmluaXQocmVzcG9uc2UudG9vbHMpO1xyXG4gIHJldHVybiB0aGlzO1xyXG59XHJcblxyXG4vLyBNYW5hZ2UgY29udGVudCB2aXNpYmlsaXR5XHJcbmNvbnN0ICRjb250ZW50ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmNvbnRlbnQnKTtcclxuZXhwb3J0cy5zaG93Q29udGVudCA9IGZ1bmN0aW9uKCkge1xyXG4gIHNldENvbnRlbnREaXNwbGF5KCdmbGV4Jyk7XHJcbiAgcmV0dXJuIHRoaXM7XHJcbn1cclxuZXhwb3J0cy5oaWRlQ29udGVudCA9IGZ1bmN0aW9uKCkge1xyXG4gIHNldENvbnRlbnREaXNwbGF5KCdub25lJyk7XHJcbiAgcmV0dXJuIHRoaXM7XHJcbn1cclxuZnVuY3Rpb24gc2V0Q29udGVudERpc3BsYXkoZGlzcGxheSkge1xyXG4gICRjb250ZW50LnN0eWxlLmRpc3BsYXkgPSBkaXNwbGF5O1xyXG59XHJcblxyXG4vLyBNYW5hZ2UgYnV0dG9ucyBzdGF0ZVxyXG5leHBvcnRzLmVuYWJsZUJ1dHRvbnMgPSBmdW5jdGlvbiguLi5idXR0b25zKSB7XHJcbiAgc2V0QnV0dG9uc1N0YXRlKGJ1dHRvbnMsIGZhbHNlKTtcclxuICByZXR1cm4gdGhpcztcclxufVxyXG5leHBvcnRzLmRpc2FibGVCdXR0b25zID0gZnVuY3Rpb24oLi4uYnV0dG9ucykge1xyXG4gIHNldEJ1dHRvbnNTdGF0ZShidXR0b25zLCB0cnVlKTtcclxuICByZXR1cm4gdGhpcztcclxufVxyXG5mdW5jdGlvbiBzZXRCdXR0b25zU3RhdGUoYnV0dG9ucywgdmFsdWUpIHtcclxuICBidXR0b25zLmZvckVhY2goYnV0dG9uID0+IGJ1dHRvbi5kaXNhYmxlZCA9IHZhbHVlKTtcclxufVxyXG5cclxuLy8gRGVsZWdhdGUgcHVibGljIG1ldGhvZHMgdG8gY29tcG9uZW50c1xyXG5leHBvcnRzLmdldFRvb2xzRGF0YSA9ICgpID0+XHJcbiAgdG9vbHMuZ2V0VG9vbHNEYXRhKCk7XHJcblxyXG5leHBvcnRzLnNldFN0YXRlID0gc3RhdGVEYXRhID0+XHJcbiAgc3RhdGUuc2V0KHN0YXRlRGF0YSk7XHJcblxyXG5leHBvcnRzLnNob3dFdmVudCA9IGV2ZW50RGF0YSA9PlxyXG4gIHN0YXRlLnNob3dFdmVudChldmVudERhdGEpO1xyXG5cclxuZXhwb3J0cy5oaWRlRXZlbnQgPSAoKSA9PlxyXG4gIHN0YXRlLmhpZGVFdmVudCgpO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgZXhwb3J0cztcclxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vbGVhcm5pbmcvc2NlbmUuanMiLCIvLyByZW1vdmVkIGJ5IGV4dHJhY3QtdGV4dC13ZWJwYWNrLXBsdWdpblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4uL3Nhc3MvbGVhcm5pbmcuc2Nzc1xuLy8gbW9kdWxlIGlkID0gOVxuLy8gbW9kdWxlIGNodW5rcyA9IDAiXSwic291cmNlUm9vdCI6IiJ9