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
/******/ 	return __webpack_require__(__webpack_require__.s = 12);
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
  var params = arguments[1];

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
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _state = __webpack_require__(9);

var _state2 = _interopRequireDefault(_state);

var _pubsub = __webpack_require__(1);

var _pubsub2 = _interopRequireDefault(_pubsub);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

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
    this.subscribtion = null;
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
        _pubsub2.default.publish('new_state', state);
      });
      return intervals;
    }
  }, {
    key: 'makeBreak',
    value: function makeBreak() {
      var _this2 = this;

      return new Promise(function (resolve, reject) {
        setTimeout(function () {
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
        _this3.subscribtion = _pubsub2.default.subscribe('user_input', function (data) {
          var timeSpent = Date.now() - eventStartTime;
          var nextStateId = _this3.currentState.handleInput(data, timeSpent);
          var nextState = _this3.getState(nextStateId);
          if (nextState) {
            nextState.last ? reject(nextState) : resolve(nextState);
          }
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
      this.currentState = state;
      clearTimeout(this.timeout);
      if (this.subscription) {
        this.subscribtion.remove();
      }
      _pubsub2.default.publish('new_state', state);
    }

    // TODO

  }, {
    key: 'stop',
    value: function stop() {}
  }]);

  return Model;
}();

exports.default = Model;

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _state = __webpack_require__(10);

var _state2 = _interopRequireDefault(_state);

var _tools = __webpack_require__(11);

var _tools2 = _interopRequireDefault(_tools);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _exports = {};

// Scene metadata
var $modelName = document.querySelector('.model-name');
_exports.init = function (model, response) {
  $modelName.textContent = model.name;
  _state2.default.set(model.currentState);
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
};
_exports.disableButtons = function () {
  for (var _len2 = arguments.length, buttons = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
    buttons[_key2] = arguments[_key2];
  }

  setButtonsState(buttons, true);
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
/* 4 */
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
/* 5 */
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
/* 6 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

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
      this.tools = data.tools;
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

      if (!Array.isArray(data)) {
        throw new TypeError('Invalid type of data from tools. Expected array, got ' + (typeof data === 'undefined' ? 'undefined' : _typeof(data)));
      }
      return this.tools.every(function (tool) {
        // Если среди полученных итемов нет, того который есть в данном экшене
        var checkTool = data.find(function (obj) {
          return obj.id == tool.id;
        });
        if (!checkTool) {
          return false;
        }

        // Для переключателя
        if (typeof tool.value === 'boolean') {
          return checkTool.value === tool.value;
        }

        // Для ренджа
        if (Array.isArray(tool.value)) {
          return _this.includesValue(checkTool.value, tool.value);
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
  }]);

  return Action;
}();

exports.default = Action;

/***/ }),
/* 8 */
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
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _event = __webpack_require__(8);

var _event2 = _interopRequireDefault(_event);

var _action = __webpack_require__(7);

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
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _nodeFactory = __webpack_require__(0);

var _nodeFactory2 = _interopRequireDefault(_nodeFactory);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var $name = document.querySelector('.model-state-name');
var $img = document.querySelector('.model-state-img');
var $params = document.querySelector('.model-params-values');

var $event = document.querySelector('.model-event');
var $eventHeader = $event.querySelector('.model-event-name span');
var $eventBody = $event.querySelector('.model-event-info');

var $response = document.querySelector('.model-response');

function set(_ref) {
  var name = _ref.name,
      img = _ref.img,
      params = _ref.params;

  $name.textContent = name;
  $img.setAttribute('src', img);
  setParameters(params);
}

function setParameters(params) {
  var frag = document.createDocumentFragment();
  for (var key in params) {
    frag.appendChild(createParameteNode(key, params[key]));
  }
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
  $event.classList.remove('is-hidden');
}
function hideEvent() {
  $event.classList.add('is-hidden');
}

exports.default = {
  set: set,
  showEvent: showEvent,
  hideEvent: hideEvent
};

/***/ }),
/* 11 */
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
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


__webpack_require__(6);

var _pubsub = __webpack_require__(1);

var _pubsub2 = _interopRequireDefault(_pubsub);

var _ajax = __webpack_require__(4);

var _ajax2 = _interopRequireDefault(_ajax);

var _scene = __webpack_require__(3);

var _scene2 = _interopRequireDefault(_scene);

var _model = __webpack_require__(2);

var _model2 = _interopRequireDefault(_model);

var _timer = __webpack_require__(5);

var _timer2 = _interopRequireDefault(_timer);

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
  var modelId = $select.value;
  loadModel(modelId).then(function (response) {
    model = new _model2.default(response);
    _scene2.default.init(model, response).showContent().enableButtons($startButton);
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
  model.stop(); // TODO
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

/**
* Timer (currently for dev mode only)
*/

document.querySelector('.header').appendChild(_timer2.default.node);
_pubsub2.default.subscribe('new_state', function (state) {
  return _timer2.default.stop();
});
_pubsub2.default.subscribe('event', function (event) {
  return _timer2.default.start();
});

/***/ })
/******/ ]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgMDE2MTIwMzY3NTE4YjA5NTg1MzEiLCJ3ZWJwYWNrOi8vLy4vdXRpbHMvbm9kZUZhY3RvcnkuanMiLCJ3ZWJwYWNrOi8vLy4vdXRpbHMvcHVic3ViLmpzIiwid2VicGFjazovLy8uL2xlYXJuaW5nL21vZGVsLmpzIiwid2VicGFjazovLy8uL2xlYXJuaW5nL3NjZW5lLmpzIiwid2VicGFjazovLy8uL3V0aWxzL2FqYXguanMiLCJ3ZWJwYWNrOi8vLy4vdXRpbHMvdGltZXIuanMiLCJ3ZWJwYWNrOi8vLy4uL3Nhc3MvbGVhcm5pbmcuc2NzcyIsIndlYnBhY2s6Ly8vLi9sZWFybmluZy9tb2RlbF9jb21wb25lbnRzL2FjdGlvbi5qcyIsIndlYnBhY2s6Ly8vLi9sZWFybmluZy9tb2RlbF9jb21wb25lbnRzL2V2ZW50LmpzIiwid2VicGFjazovLy8uL2xlYXJuaW5nL21vZGVsX2NvbXBvbmVudHMvc3RhdGUuanMiLCJ3ZWJwYWNrOi8vLy4vbGVhcm5pbmcvc2NlbmVfY29tcG9uZW50cy9zdGF0ZS5qcyIsIndlYnBhY2s6Ly8vLi9sZWFybmluZy9zY2VuZV9jb21wb25lbnRzL3Rvb2xzLmpzIiwid2VicGFjazovLy8uL2xlYXJuaW5nL2luZGV4LmpzIl0sIm5hbWVzIjpbIm5vZGVGYWN0b3J5IiwidHlwZSIsInBhcmFtcyIsIm5vZGUiLCJkb2N1bWVudCIsImNyZWF0ZUVsZW1lbnQiLCJhcHBlbmRDbGFzc2VzIiwiYXBwZW5kQXR0cnMiLCJpbnNlcnRUZXh0Q29udGVudCIsImNsYXNzTGlzdCIsImZvckVhY2giLCJhZGQiLCJjbGFzc05hbWUiLCJhdHRycyIsImF0dHJOYW1lcyIsIk9iamVjdCIsImtleXMiLCJzZXRBdHRyaWJ1dGUiLCJhdHRyTmFtZSIsInRleHRDb250ZW50IiwicHVic3ViIiwidG9waWNzIiwic3Vic2NyaWJlIiwidG9waWMiLCJsaXN0ZW5lciIsInF1ZXVlIiwiaW5kZXgiLCJwdXNoIiwicmVtb3ZlIiwicHVibGlzaCIsImluZm8iLCJsZW5ndGgiLCJpdGVtcyIsIml0ZW0iLCJNb2RlbCIsImRhdGEiLCJpZCIsIm5hbWUiLCJicmVha1RpbWUiLCJzdGVwcyIsInN0YXRlcyIsIm1hcCIsInN0YXRlIiwiY3VycmVudFN0YXRlIiwiZ2V0U3RhdGUiLCJpbml0aWFsU3RhdGUiLCJ0aW1lb3V0Iiwic3Vic2NyaWJ0aW9uIiwiZmluZCIsImludGVydmFscyIsIlByb21pc2UiLCJyZXNvbHZlIiwiaSIsInRoZW4iLCJtYWtlQnJlYWsiLCJoYW5kbGVFdmVudCIsImhhbmRsZU5ld1N0YXRlIiwiY2F0Y2giLCJyZWplY3QiLCJzZXRUaW1lb3V0IiwiZXZlbnQiLCJldmVudFN0YXJ0VGltZSIsIkRhdGUiLCJub3ciLCJ0aW1lU3BlbnQiLCJuZXh0U3RhdGVJZCIsImhhbmRsZUlucHV0IiwibmV4dFN0YXRlIiwibGFzdCIsImluYWN0aXZlVGltZSIsImdldEluYWN0aXZlVGltZSIsImdldEluYWN0aXZlQWN0aW9uIiwiY2xlYXJUaW1lb3V0Iiwic3Vic2NyaXB0aW9uIiwiZXhwb3J0cyIsIiRtb2RlbE5hbWUiLCJxdWVyeVNlbGVjdG9yIiwiaW5pdCIsIm1vZGVsIiwicmVzcG9uc2UiLCJzZXQiLCJ0b29scyIsIiRjb250ZW50Iiwic2hvd0NvbnRlbnQiLCJzZXRDb250ZW50RGlzcGxheSIsImhpZGVDb250ZW50IiwiZGlzcGxheSIsInN0eWxlIiwiZW5hYmxlQnV0dG9ucyIsImJ1dHRvbnMiLCJzZXRCdXR0b25zU3RhdGUiLCJkaXNhYmxlQnV0dG9ucyIsInZhbHVlIiwiYnV0dG9uIiwiZGlzYWJsZWQiLCJnZXRUb29sc0RhdGEiLCJzZXRTdGF0ZSIsInN0YXRlRGF0YSIsInNob3dFdmVudCIsImV2ZW50RGF0YSIsImhpZGVFdmVudCIsImFqYXgiLCJwYXRoIiwib3B0aW9ucyIsInhociIsIlhNTEh0dHBSZXF1ZXN0Iiwib3BlbiIsIm1ldGhvZCIsImhlYWRlcnMiLCJzZXRYSFJIZWFkZXJzIiwic2VuZCIsIm9ucmVhZHlzdGF0ZWNoYW5nZSIsInJlYWR5U3RhdGUiLCJzdGF0dXMiLCJyZXNwb25zZVRleHQiLCJzdGF0dXNUZXh0IiwiaGVhZGVyIiwic2V0UmVxdWVzdEhlYWRlciIsIm1zVG9Db250ZW50IiwibXMiLCJzZWNvbmRzIiwiTWF0aCIsInJvdW5kIiwibWlucyIsImZsb29yIiwic2Vjb25kc0xlZnQiLCJ0aW1lciIsInN0YXJ0VGltZSIsImludGVydmFsIiwic3RhcnQiLCJzZXRJbnRlcnZhbCIsImVsYXBzZWQiLCJzdG9wIiwiY2xlYXJJbnRlcnZhbCIsIkFjdGlvbiIsIm1pblRpbWUiLCJtYXhUaW1lIiwiaW5hY3RpdmUiLCJ0aW1lIiwicmlnaHRUaW1lIiwicmlnaHREYXRhIiwiQXJyYXkiLCJpc0FycmF5IiwiVHlwZUVycm9yIiwiZXZlcnkiLCJjaGVja1Rvb2wiLCJvYmoiLCJ0b29sIiwiaW5jbHVkZXNWYWx1ZSIsImJvcmRlcnMiLCJFdmVudCIsImRlc2NyaXB0aW9uIiwiU3RhdGUiLCJpbWciLCJhY3Rpb25zIiwiYWN0aW9uIiwidGltZXMiLCJnZXRBbGxBY3Rpb25UaW1lcyIsIm1heCIsInN1aXRlZEFjdGlvbnMiLCJmaWx0ZXIiLCJpc1N1aXRhYmxlIiwiJG5hbWUiLCIkaW1nIiwiJHBhcmFtcyIsIiRldmVudCIsIiRldmVudEhlYWRlciIsIiRldmVudEJvZHkiLCIkcmVzcG9uc2UiLCJzZXRQYXJhbWV0ZXJzIiwiZnJhZyIsImNyZWF0ZURvY3VtZW50RnJhZ21lbnQiLCJrZXkiLCJhcHBlbmRDaGlsZCIsImNyZWF0ZVBhcmFtZXRlTm9kZSIsImlubmVySFRNTCIsImRpdiIsImtleVNwYW4iLCJ2YWx1ZVNwYW4iLCJ0b29sVHlwZXMiLCJSQU5HRSIsIlNXSVRDSCIsIiR0b29scyIsImZyYWdtZW50IiwibGFiZWwiLCJ0b29sTm9kZSIsImNyZWF0ZVRvb2xOb2RlIiwiY3JlYXRlUmFuZ2VUb29sIiwiY3JlYXRlU3dpdGNoVG9vbCIsImRpdklucHV0Iiwic3Bhbk1pbiIsIm1pbiIsImlucHV0Iiwic3Bhbk1heCIsImRpdkN1cnJlbnQiLCJzcGFuQ3VycmVudCIsImFkZEV2ZW50TGlzdGVuZXIiLCJldnQiLCJ0YXJnZXQiLCJ0b29sc0RhdGEiLCJpbnB1dHMiLCJxdWVyeVNlbGVjdG9yQWxsIiwiZGF0YXNldCIsInBhcnNlSW50IiwiY2hlY2tlZCIsIkVycm9yIiwibG9hZE1vZGVsIiwiSlNPTiIsInBhcnNlIiwiJHNlbGVjdCIsIiRsb2FkQnV0dG9uIiwibW9kZWxJZCIsIiRzdGFydEJ1dHRvbiIsImNvbnNvbGUiLCJlcnJvciIsImVyciIsIiRzdG9wQnV0dG9uIiwiJHJ1bkJ1dHRvbiJdLCJtYXBwaW5ncyI6IjtBQUFBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBLG1EQUEyQyxjQUFjOztBQUV6RDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQUs7QUFDTDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLG1DQUEyQiwwQkFBMEIsRUFBRTtBQUN2RCx5Q0FBaUMsZUFBZTtBQUNoRDtBQUNBO0FBQ0E7O0FBRUE7QUFDQSw4REFBc0QsK0RBQStEOztBQUVySDtBQUNBOztBQUVBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7QUNoRUEsSUFBTUEsY0FBYyxTQUFkQSxXQUFjLEdBQStCO0FBQUEsTUFBdEJDLElBQXNCLHVFQUFmLEtBQWU7QUFBQSxNQUFSQyxNQUFROztBQUNqRCxNQUFNQyxPQUFPQyxTQUFTQyxhQUFULENBQXVCSixJQUF2QixDQUFiOztBQUVBSyxnQkFBY0gsSUFBZCxFQUFvQkQsTUFBcEI7QUFDQUssY0FBWUosSUFBWixFQUFrQkQsTUFBbEI7QUFDQU0sb0JBQWtCTCxJQUFsQixFQUF3QkQsTUFBeEI7O0FBRUEsU0FBT0MsSUFBUDtBQUNELENBUkQ7O0FBVUEsU0FB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akIsRUFBOEIsaUJBQVM7QUFDckMsa0JBQU04RSxTQUFOO0FBQ0Esa0JBQU1KLFFBQU4sQ0FBZXRELEtBQWY7QUFDRCxDQUhEO0FBSUEsaUJBQU9wQixTQUFQLENBQWlCLE9BQWpCLEVBQTBCO0FBQUEsU0FBUyxnQkFBTTRFLFNBQU4sQ0FBZ0J0QyxLQUFoQixDQUFUO0FBQUEsQ0FBMUI7O0FBRUE7Ozs7QUFJQXhELFNBQVN3RSxhQUFULENBQXVCLFNBQXZCLEVBQWtDaUcsV0FBbEMsQ0FBOEMsZ0JBQU0xSyxJQUFwRDtBQUNBLGlCQUFPbUIsU0FBUCxDQUFpQixXQUFqQixFQUE4QjtBQUFBLFNBQVMsZ0JBQU04RyxJQUFOLEVBQVQ7QUFBQSxDQUE5QjtBQUNBLGlCQUFPOUcsU0FBUCxDQUFpQixPQUFqQixFQUEwQjtBQUFBLFNBQVMsZ0JBQU0yRyxLQUFOLEVBQVQ7QUFBQSxDQUExQixFIiwiZmlsZSI6ImxlYXJuaW5nLmJ1bmRsZS5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKVxuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuXG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBpZGVudGl0eSBmdW5jdGlvbiBmb3IgY2FsbGluZyBoYXJtb255IGltcG9ydHMgd2l0aCB0aGUgY29ycmVjdCBjb250ZXh0XG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmkgPSBmdW5jdGlvbih2YWx1ZSkgeyByZXR1cm4gdmFsdWU7IH07XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwge1xuIFx0XHRcdFx0Y29uZmlndXJhYmxlOiBmYWxzZSxcbiBcdFx0XHRcdGVudW1lcmFibGU6IHRydWUsXG4gXHRcdFx0XHRnZXQ6IGdldHRlclxuIFx0XHRcdH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IDEyKTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyB3ZWJwYWNrL2Jvb3RzdHJhcCAwMTYxMjAzNjc1MThiMDk1ODUzMSIsImNvbnN0IG5vZGVGYWN0b3J5ID0gZnVuY3Rpb24odHlwZSA9ICdkaXYnLCBwYXJhbXMpIHtcclxuICBjb25zdCBub2RlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCh0eXBlKTtcclxuXHJcbiAgYXBwZW5kQ2xhc3Nlcyhub2RlLCBwYXJhbXMpO1xyXG4gIGFwcGVuZEF0dHJzKG5vZGUsIHBhcmFtcyk7XHJcbiAgaW5zZXJ0VGV4dENvbnRlbnQobm9kZSwgcGFyYW1zKTtcclxuXHJcbiAgcmV0dXJuIG5vZGU7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGFwcGVuZENsYXNzZXMobm9kZSwgeyBjbGFzc0xpc3QgfSkge1xyXG4gIGlmIChjbGFzc0xpc3QgJiYgY2xhc3NMaXN0LmZvckVhY2gpIHtcclxuICAgIGNsYXNzTGlzdC5mb3JFYWNoKGNsYXNzTmFtZSA9PiBub2RlLmNsYXNzTGlzdC5hZGQoY2xhc3NOYW1lKSk7XHJcbiAgfVxyXG59XHJcblxyXG5mdW5jdGlvbiBhcHBlbmRBdHRycyhub2RlLCB7IGF0dHJzIH0pIHtcclxuICBpZiAoYXR0cnMpIHtcclxuICAgIGNvbnN0IGF0dHJOYW1lcyA9IE9iamVjdC5rZXlzKGF0dHJzKTtcclxuICAgIGF0dHJOYW1lcy5mb3JFYWNoKGF0dHJOYW1lID0+IG5vZGUuc2V0QXR0cmlidXRlKGF0dHJOYW1lLCBhdHRyc1thdHRyTmFtZV0pKTtcclxuICB9XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGluc2VydFRleHRDb250ZW50KG5vZGUsIHsgdGV4dENvbnRlbnQgPSBcIlwiIH0pIHtcclxuICBub2RlLnRleHRDb250ZW50ID0gdGV4dENvbnRlbnQ7XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IG5vZGVGYWN0b3J5O1xyXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi91dGlscy9ub2RlRmFjdG9yeS5qcyIsImNvbnN0IHB1YnN1YiA9IChmdW5jdGlvbigpIHtcclxuXHJcbiAgY29uc3QgdG9waWNzID0ge307XHJcblxyXG4gIHJldHVybiB7XHJcbiAgICBzdWJzY3JpYmU6IGZ1bmN0aW9uKHRvcGljLCBsaXN0ZW5lcikge1xyXG4gICAgICBpZiAoIXRvcGljc1t0b3BpY10pIHRvcGljc1t0b3BpY10gPSB7IHF1ZXVlOiBbXSB9O1xyXG5cclxuICAgICAgY29uc3QgaW5kZXggPSB0b3BpY3NbdG9waWNdLnF1ZXVlLnB1c2gobGlzdGVuZXIpIC0gMTtcclxuICAgICAgLy8gZnVuY3Rpb24gdG8gZGVsZXRlIHRvcGljXHJcbiAgICAgIHJldHVybiB7XHJcbiAgICAgICAgcmVtb3ZlOiBmdW5jdGlvbigpIHtcclxuICAgICAgICAgIGRlbGV0ZSB0b3BpY3NbdG9waWNdLnF1ZXVlW2luZGV4XTtcclxuICAgICAgICB9XHJcbiAgICAgIH07XHJcbiAgICB9LFxyXG5cclxuICAgIHB1Ymxpc2g6IGZ1bmN0aW9uKHRvcGljLCBpbmZvKSB7XHJcbiAgICAgIC8vIG5vIHRoZW1lIG9yIG5vIGxpc3RlbmVyc1xyXG4gICAgICBpZiAoIXRvcGljc1t0b3BpY10gfHwgIXRvcGljc1t0b3BpY10ucXVldWUubGVuZ3RoKSByZXR1cm47XHJcblxyXG4gICAgICBjb25zdCBpdGVtcyA9IHRvcGljc1t0b3BpY10ucXVldWU7XHJcbiAgICAgIGl0ZW1zLmZvckVhY2goaXRlbSA9PiB7XHJcbiAgICAgICAgaXRlbShpbmZvIHx8IHt9KTtcclxuICAgICAgfSk7XHJcbiAgICB9XHJcbiAgfTtcclxufSkoKTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IHB1YnN1YjtcclxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vdXRpbHMvcHVic3ViLmpzIiwiaW1wb3J0IFN0YXRlIGZyb20gJy4vbW9kZWxfY29tcG9uZW50cy9zdGF0ZSc7XHJcbmltcG9ydCBwdWJzdWIgZnJvbSAnLi4vdXRpbHMvcHVic3ViJztcclxuXHJcbmNsYXNzIE1vZGVsIHtcclxuICBjb25zdHJ1Y3RvcihkYXRhKSB7XHJcbiAgICB0aGlzLmlkID0gZGF0YS5pZDtcclxuICAgIHRoaXMubmFtZSA9IGRhdGEubmFtZTtcclxuICAgIHRoaXMuYnJlYWtUaW1lID0gZGF0YS5icmVha1RpbWU7XHJcbiAgICB0aGlzLnN0ZXBzID0gZGF0YS5zdGVwcztcclxuXHJcbiAgICB0aGlzLnN0YXRlcyA9IGRhdGEuc3RhdGVzLm1hcChzdGF0ZSA9PiBuZXcgU3RhdGUoc3RhdGUpKTtcclxuICAgIHRoaXMuY3VycmVudFN0YXRlID0gdGhpcy5nZXRTdGF0ZShkYXRhLmluaXRpYWxTdGF0ZSk7XHJcblxyXG4gICAgdGhpcy50aW1lb3V0ID0gbnVsbDtcclxuICAgIHRoaXMuc3Vic2NyaWJ0aW9uID0gbnVsbDtcclxuICB9XHJcblxyXG4gIGdldFN0YXRlKGlkKSB7XHJcbiAgICByZXR1cm4gdGhpcy5zdGF0ZXMuZmluZChzdGF0ZSA9PiBzdGF0ZS5pZCA9PSBpZCk7XHJcbiAgfVxyXG5cclxuICBzdGFydCgpIHtcclxuICAgIGxldCBpbnRlcnZhbHMgPSBQcm9taXNlLnJlc29sdmUoKTsgLy8gaW5pdCBwcm9taXNlIGNoYWluXHJcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMuc3RlcHM7IGkrKykge1xyXG4gICAgICBpbnRlcnZhbHMgPSBpbnRlcnZhbHNcclxuICAgICAgIC50aGVuKCgpID0+IHsgcmV0dXJuIHRoaXMubWFrZUJyZWFrKCkgfSlcclxuICAgICAgIC50aGVuKCgpID0+IHsgcmV0dXJuIHRoaXMuaGFuZGxlRXZlbnQoKSB9KVxyXG4gICAgICAgLnRoZW4oc3RhdGUgPT4geyB0aGlzLmhhbmRsZU5ld1N0YXRlKHN0YXRlKSB9KVxyXG4gICAgfVxyXG4gICAgaW50ZXJ2YWxzLmNhdGNoKHN0YXRlID0+IHsgcHVic3ViLnB1Ymxpc2goJ25ld19zdGF0ZScsICBzdGF0ZSkgfSk7XHJcbiAgICByZXR1cm4gaW50ZXJ2YWxzO1xyXG4gIH1cclxuXHJcbiAgbWFrZUJyZWFrKCkge1xyXG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcclxuICAgICAgc2V0VGltZW91dCgoKSA9PiB7IHJlc29sdmUoKSB9LCB0aGlzLmJyZWFrVGltZSk7XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIGhhbmRsZUV2ZW50KCkge1xyXG4gICAgY29uc3QgZXZlbnQgPSB0aGlzLmN1cnJlbnRTdGF0ZS5ldmVudDtcclxuICAgIGNvbnN0IGV2ZW50U3RhcnRUaW1lID0gRGF0ZS5ub3coKTtcclxuICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XHJcbiAgICAgIC8vIHNlbmQgZGF0YSBhYm91dCBuZXcgZXZlbnQgdG8gb3RoZXIgbW9kdWxlc1xyXG4gICAgICBwdWJzdWIucHVibGlzaCgnZXZlbnQnLCBldmVudCk7XHJcblxyXG4gICAgICAvLyBsaXN0ZW4gdG8gdXNlciBhY3Rpb25cclxuICAgICAgLy8gYW5kIGlmIHVzZXIgaW5wdXQgY29ycmVjdCBnbyB0byBuZXh0IHN0YXRlXHJcbiAgICAgIHRoaXMuc3Vic2NyaWJ0aW9uID0gcHVic3ViLnN1YnNjcmliZSgndXNlcl9pbnB1dCcsIGRhdGEgPT4ge1xyXG4gICAgICAgIGNvbnN0IHRpbWVTcGVudCA9IERhdGUubm93KCkgLSBldmVudFN0YXJ0VGltZTtcclxuICAgICAgICBjb25zdCBuZXh0U3RhdGVJZCA9IHRoaXMuY3VycmVudFN0YXRlLmhhbmRsZUlucHV0KGRhdGEsIHRpbWVTcGVudCk7XHJcbiAgICAgICAgY29uc3QgbmV4dFN0YXRlID0gdGhpcy5nZXRTdGF0ZShuZXh0U3RhdGVJZCk7XHJcbiAgICAgICAgaWYgKG5leHRTdGF0ZSkge1xyXG4gICAgICAgICAgbmV4dFN0YXRlLmxhc3QgPyByZWplY3QobmV4dFN0YXRlKSA6IHJlc29sdmUobmV4dFN0YXRlKTtcclxuICAgICAgICB9XHJcbiAgICAgIH0pXHJcblxyXG4gICAgICAvLyBoYW5kbGUgaW5hY3RpdmVcclxuICAgICAgY29uc3QgaW5hY3RpdmVUaW1lID0gdGhpcy5jdXJyZW50U3RhdGUuZ2V0SW5hY3RpdmVUaW1lKCk7XHJcbiAgICAgIHRoaXMudGltZW91dCA9IHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgIGNvbnN0IG5leHRTdGF0ZUlkID0gdGhpcy5jdXJyZW50U3RhdGUuZ2V0SW5hY3RpdmVBY3Rpb24oKS5uZXh0U3RhdGU7XHJcbiAgICAgICAgY29uc3QgbmV4dFN0YXRlID0gdGhpcy5nZXRTdGF0ZShuZXh0U3RhdGVJZCk7XHJcbiAgICAgICAgbmV4dFN0YXRlLmxhc3QgPyByZWplY3QobmV4dFN0YXRlKSA6IHJlc29sdmUobmV4dFN0YXRlKTtcclxuICAgICAgfSwgaW5hY3RpdmVUaW1lKTtcclxuICAgIH0pXHJcbiAgfVxyXG5cclxuICBoYW5kbGVOZXdTdGF0ZShzdGF0ZSkge1xyXG4gICAgdGhpcy5jdXJyZW50U3RhdGUgPSBzdGF0ZTtcclxuICAgIGNsZWFyVGltZW91dCh0aGlzLnRpbWVvdXQpO1xyXG4gICAgaWYgKHRoaXMuc3Vic2NyaXB0aW9uKSB7XHJcbiAgICAgIHRoaXMuc3Vic2NyaWJ0aW9uLnJlbW92ZSgpO1xyXG4gICAgfVxyXG4gICAgcHVic3ViLnB1Ymxpc2goJ25ld19zdGF0ZScsIHN0YXRlKTtcclxuICB9XHJcblxyXG4gIC8vIFRPRE9cclxuICBzdG9wKCkge1xyXG5cclxuICB9XHJcblxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBNb2RlbDtcclxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vbGVhcm5pbmcvbW9kZWwuanMiLCJpbXBvcnQgc3RhdGUgZnJvbSAnLi9zY2VuZV9jb21wb25lbnRzL3N0YXRlJztcclxuaW1wb3J0IHRvb2xzIGZyb20gJy4vc2NlbmVfY29tcG9uZW50cy90b29scyc7XHJcblxyXG5jb25zdCBleHBvcnRzID0ge307XHJcblxyXG4vLyBTY2VuZSBtZXRhZGF0YVxyXG5jb25zdCAkbW9kZWxOYW1lID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLm1vZGVsLW5hbWUnKTtcclxuZXhwb3J0cy5pbml0ID0gZnVuY3Rpb24obW9kZWwsIHJlc3BvbnNlKSB7XHJcbiAgJG1vZGVsTmFtZS50ZXh0Q29udGVudCA9IG1vZGVsLm5hbWU7XHJcbiAgc3RhdGUuc2V0KG1vZGVsLmN1cnJlbnRTdGF0ZSk7XHJcbiAgdG9vbHMuaW5pdChyZXNwb25zZS50b29scyk7XHJcbiAgcmV0dXJuIHRoaXM7XHJcbn1cclxuXHJcbi8vIE1hbmFnZSBjb250ZW50IHZpc2liaWxpdHlcclxuY29uc3QgJGNvbnRlbnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuY29udGVudCcpO1xyXG5leHBvcnRzLnNob3dDb250ZW50ID0gZnVuY3Rpb24oKSB7XHJcbiAgc2V0Q29udGVudERpc3BsYXkoJ2ZsZXgnKTtcclxuICByZXR1cm4gdGhpcztcclxufVxyXG5leHBvcnRzLmhpZGVDb250ZW50ID0gZnVuY3Rpb24oKSB7XHJcbiAgc2V0Q29udGVudERpc3BsYXkoJ25vbmUnKTtcclxuICByZXR1cm4gdGhpcztcclxufVxyXG5mdW5jdGlvbiBzZXRDb250ZW50RGlzcGxheShkaXNwbGF5KSB7XHJcbiAgJGNvbnRlbnQuc3R5bGUuZGlzcGxheSA9IGRpc3BsYXk7XHJcbn1cclxuXHJcbi8vIE1hbmFnZSBidXR0b25zIHN0YXRlXHJcbmV4cG9ydHMuZW5hYmxlQnV0dG9ucyA9IGZ1bmN0aW9uKC4uLmJ1dHRvbnMpIHtcclxuICBzZXRCdXR0b25zU3RhdGUoYnV0dG9ucywgZmFsc2UpO1xyXG59XHJcbmV4cG9ydHMuZGlzYWJsZUJ1dHRvbnMgPSBmdW5jdGlvbiguLi5idXR0b25zKSB7XHJcbiAgc2V0QnV0dG9uc1N0YXRlKGJ1dHRvbnMsIHRydWUpO1xyXG59XHJcbmZ1bmN0aW9uIHNldEJ1dHRvbnNTdGF0ZShidXR0b25zLCB2YWx1ZSkge1xyXG4gIGJ1dHRvbnMuZm9yRWFjaChidXR0b24gPT4gYnV0dG9uLmRpc2FibGVkID0gdmFsdWUpO1xyXG59XHJcblxyXG4vLyBEZWxlZ2F0ZSBwdWJsaWMgbWV0aG9kcyB0byBjb21wb25lbnRzXHJcbmV4cG9ydHMuZ2V0VG9vbHNEYXRhID0gKCkgPT5cclxuICB0b29scy5nZXRUb29sc0RhdGEoKTtcclxuXHJcbmV4cG9ydHMuc2V0U3RhdGUgPSBzdGF0ZURhdGEgPT5cclxuICBzdGF0ZS5zZXQoc3RhdGVEYXRhKTtcclxuXHJcbmV4cG9ydHMuc2hvd0V2ZW50ID0gZXZlbnREYXRhID0+XHJcbiAgc3RhdGUuc2hvd0V2ZW50KGV2ZW50RGF0YSk7XHJcblxyXG5leHBvcnRzLmhpZGVFdmVudCA9ICgpID0+XHJcbiAgc3RhdGUuaGlkZUV2ZW50KCk7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBleHBvcnRzO1xyXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9sZWFybmluZy9zY2VuZS5qcyIsImZ1bmN0aW9uIGFqYXgocGF0aCA9ICcnLCBvcHRpb25zID0ge30pIHtcclxuICBjb25zdCB4aHIgPSBuZXcgWE1MSHR0cFJlcXVlc3QoKTtcclxuICB4aHIub3BlbihvcHRpb25zLm1ldGhvZCB8fCAnR0VUJywgcGF0aCwgdHJ1ZSk7XHJcbiAgaWYgKG9wdGlvbnMuaGVhZGVycykgeyBzZXRYSFJIZWFkZXJzKHhociwgb3B0aW9ucy5oZWFkZXJzKTsgfVxyXG4gIHhoci5zZW5kKG9wdGlvbnMuZGF0YSk7XHJcblxyXG4gIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XHJcbiAgICB4aHIub25yZWFkeXN0YXRlY2hhbmdlID0gZnVuY3Rpb24oKSB7XHJcbiAgICAgIGlmKHhoci5yZWFkeVN0YXRlID09IDQpIHtcclxuICAgICAgICBpZih4aHIuc3RhdHVzID09IDIwMCkge1xyXG4gICAgICAgICAgcmVzb2x2ZSh4aHIucmVzcG9uc2VUZXh0KTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgcmVqZWN0KHhoci5zdGF0dXNUZXh0KTtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9KVxyXG59XHJcblxyXG5mdW5jdGlvbiBzZXRYSFJIZWFkZXJzKHhociwgaGVhZGVycykge1xyXG4gIGZvciAobGV0IGhlYWRlciBpbiBoZWFkZXJzKSB7XHJcbiAgICB4aHIuc2V0UmVxdWVzdEhlYWRlcihoZWFkZXIsIGhlYWRlcnNbaGVhZGVyc10pO1xyXG4gIH1cclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgYWpheDtcclxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vdXRpbHMvYWpheC5qcyIsImltcG9ydCBub2RlRmFjdG9yeSBmcm9tICcuL25vZGVGYWN0b3J5JztcclxuXHJcbmZ1bmN0aW9uIG1zVG9Db250ZW50KG1zKSB7XHJcbiAgY29uc3Qgc2Vjb25kcyA9IE1hdGgucm91bmQobXMgLyAxMDAwKTtcclxuICBjb25zdCBtaW5zID0gTWF0aC5mbG9vcihzZWNvbmRzIC8gNjApO1xyXG4gIGNvbnN0IHNlY29uZHNMZWZ0ID0gc2Vjb25kcyAtIChtaW5zICogNjApO1xyXG5cclxuICByZXR1cm4gYCR7bWluc306JHtzZWNvbmRzTGVmdCA+PSAxMCA/ICcnIDogJzAnfSR7c2Vjb25kc0xlZnR9YDtcclxufVxyXG5cclxuY29uc3QgdGltZXIgPSB7XHJcbiAgc3RhcnRUaW1lOiBudWxsLFxyXG4gIGludGVydmFsOiBudWxsLFxyXG4gIG5vZGU6IG5vZGVGYWN0b3J5KCdzcGFuJywgeyBjbGFzc0xpc3Q6IFsndGltZXInXSwgdGV4dENvbnRlbnQ6ICcwOjAwJyB9KSxcclxuICBzdGFydDogZnVuY3Rpb24oKSB7XHJcbiAgICB0aGlzLnN0YXJ0VGltZSA9IERhdGUubm93KCk7XHJcbiAgICB0aGlzLmludGVydmFsID0gc2V0SW50ZXJ2YWwoKCkgPT4ge1xyXG4gICAgICBjb25zdCBlbGFwc2VkID0gRGF0ZS5ub3coKSAtIHRoaXMuc3RhcnRUaW1lO1xyXG4gICAgICB0aGlzLm5vZGUudGV4dENvbnRlbnQgPSBtc1RvQ29udGVudChlbGFwc2VkKTtcclxuICAgIH0sIDEwMDApO1xyXG4gIH0sXHJcbiAgc3RvcDogZnVuY3Rpb24oKSB7XHJcbiAgICBpZiAoIXRoaXMuc3RhcnRUaW1lKSB7IHJldHVybjsgfVxyXG4gICAgdGhpcy5zdGFydFRpbWUgPSBudWxsO1xyXG4gICAgY2xlYXJJbnRlcnZhbCh0aGlzLmludGVydmFsKTtcclxuICAgIHRoaXMubm9kZS50ZXh0Q29udGVudCA9ICcwOjAwJztcclxuICB9XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IHRpbWVyO1xyXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi91dGlscy90aW1lci5qcyIsIi8vIHJlbW92ZWQgYnkgZXh0cmFjdC10ZXh0LXdlYnBhY2stcGx1Z2luXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi4vc2Fzcy9sZWFybmluZy5zY3NzXG4vLyBtb2R1bGUgaWQgPSA2XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsImNsYXNzIEFjdGlvbiB7XHJcbiAgY29uc3RydWN0b3IoZGF0YSkge1xyXG4gICAgdGhpcy5taW5UaW1lID0gZGF0YS5taW5UaW1lO1xyXG4gICAgdGhpcy5tYXhUaW1lID0gZGF0YS5tYXhUaW1lO1xyXG4gICAgdGhpcy5uZXh0U3RhdGUgPSBkYXRhLm5leHRTdGF0ZTtcclxuICAgIGlmIChkYXRhLmluYWN0aXZlKSB7XHJcbiAgICAgIHRoaXMuaW5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICB0aGlzLnRvb2xzID0gW107XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB0aGlzLmluYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgIHRoaXMudG9vbHMgPSBkYXRhLnRvb2xzO1xyXG4gICAgfVxyXG5cclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIEBwYXJhbSBbeyBpZDogTnVtYmVyLCB2YWx1ZTogTnVtYmVyL0Jvb2xlYW4gfSwgey4uLn1dXHJcbiAgICogQHBhcmFtIE51bWJlclxyXG4gICAqIEByZXR1cm4gQm9vbGVhblxyXG4gICAqL1xyXG4gIGlzU3VpdGFibGUoZGF0YSwgdGltZSkge1xyXG4gICAgcmV0dXJuIHRoaXMucmlnaHRUaW1lKHRpbWUpICYmIHRoaXMucmlnaHREYXRhKGRhdGEpO1xyXG4gIH1cclxuXHJcbiAgcmlnaHREYXRhKGRhdGEgPSBbXSkge1xyXG4gICAgaWYoIUFycmF5LmlzQXJyYXkoZGF0YSkpIHsgdGhyb3cgbmV3IFR5cGVFcnJvcihgSW52YWxpZCB0eXBlIG9mIGRhdGEgZnJvbSB0b29scy4gRXhwZWN0ZWQgYXJyYXksIGdvdCAke3R5cGVvZiBkYXRhfWApOyB9XHJcbiAgICByZXR1cm4gdGhpcy50b29scy5ldmVyeSh0b29sID0+IHtcclxuICAgICAgLy8g0JXRgdC70Lgg0YHRgNC10LTQuCDQv9C+0LvRg9GH0LXQvdC90YvRhSDQuNGC0LXQvNC+0LIg0L3QtdGCLCDRgtC+0LPQviDQutC+0YLQvtGA0YvQuSDQtdGB0YLRjCDQsiDQtNCw0L3QvdC+0Lwg0Y3QutGI0LXQvdC1XHJcbiAgICAgIGNvbnN0IGNoZWNrVG9vbCA9IGRhdGEuZmluZChvYmogPT4gb2JqLmlkID09IHRvb2wuaWQpO1xyXG4gICAgICBpZiAoIWNoZWNrVG9vbCkgeyByZXR1cm4gZmFsc2U7IH1cclxuXHJcbiAgICAgIC8vINCU0LvRjyDQv9C10YDQtdC60LvRjtGH0LDRgtC10LvRj1xyXG4gICAgICBpZiAodHlwZW9mIHRvb2wudmFsdWUgPT09ICdib29sZWFuJykgeyByZXR1cm4gY2hlY2tUb29sLnZhbHVlID09PSB0b29sLnZhbHVlOyB9XHJcblxyXG4gICAgICAvLyDQlNC70Y8g0YDQtdC90LTQttCwXHJcbiAgICAgIGlmIChBcnJheS5pc0FycmF5KHRvb2wudmFsdWUpKSB7IHJldHVybiB0aGlzLmluY2x1ZGVzVmFsdWUoY2hlY2tUb29sLnZhbHVlLCB0b29sLnZhbHVlKSB9XHJcblxyXG4gICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIGluY2x1ZGVzVmFsdWUodmFsdWUsIGJvcmRlcnMpIHtcclxuICAgIGlmICh0eXBlb2YgdmFsdWUgIT09ICdudW1iZXInKSB0aHJvdyBuZXcgVHlwZUVycm9yKCdWYWx1ZSBzaG91bGQgYmUgaW50ZWdlcicpO1xyXG4gICAgcmV0dXJuICh2YWx1ZSA+PSBib3JkZXJzWzBdKSAmJiAodmFsdWUgPD0gYm9yZGVyc1sxXSk7XHJcbiAgfVxyXG5cclxuICByaWdodFRpbWUodGltZSkge1xyXG4gICAgaWYgKHR5cGVvZiB0aW1lICE9PSAnbnVtYmVyJykgdGhyb3cgbmV3IFR5cGVFcnJvcignVGltZSBzaG91bGQgYmUgaW50ZWdlciAobXMpJyk7XHJcbiAgICByZXR1cm4gKHRpbWUgPj0gdGhpcy5taW5UaW1lKSAmJiAodGltZSA8PSB0aGlzLm1heFRpbWUpO1xyXG4gIH1cclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgQWN0aW9uO1xyXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9sZWFybmluZy9tb2RlbF9jb21wb25lbnRzL2FjdGlvbi5qcyIsImNsYXNzIEV2ZW50IHtcclxuICBjb25zdHJ1Y3RvcihkYXRhKSB7XHJcbiAgICB0aGlzLmlkID0gZGF0YS5pZDtcclxuICAgIHRoaXMubmFtZSA9IGRhdGEubmFtZTtcclxuICAgIHRoaXMuZGVzY3JpcHRpb24gPSBkYXRhLmRlc2NyaXB0aW9uO1xyXG4gIH1cclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgRXZlbnQ7XHJcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2xlYXJuaW5nL21vZGVsX2NvbXBvbmVudHMvZXZlbnQuanMiLCJpbXBvcnQgRXZlbnQgZnJvbSAnLi9ldmVudCcgO1xyXG5pbXBvcnQgQWN0aW9uIGZyb20gJy4vYWN0aW9uJztcclxuXHJcbmNsYXNzIFN0YXRlIHtcclxuICBjb25zdHJ1Y3RvcihkYXRhKSB7XHJcbiAgICB0aGlzLmlkID0gZGF0YS5pZDtcclxuICAgIHRoaXMubmFtZSA9IGRhdGEubmFtZTtcclxuICAgIHRoaXMuaW1nID0gZGF0YS5pbWc7XHJcbiAgICB0aGlzLnBhcmFtcyA9IGRhdGEucGFyYW1zO1xyXG5cclxuICAgIGlmKGRhdGEubGFzdCkge1xyXG4gICAgICB0aGlzLmxhc3QgPSB0cnVlO1xyXG4gICAgICB0aGlzLmV2ZW50ID0gbnVsbDtcclxuICAgICAgdGhpcy5hY3Rpb25zID0gbnVsbDtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHRoaXMuZXZlbnQgPSBuZXcgRXZlbnQoZGF0YS5ldmVudCk7XHJcbiAgICAgIHRoaXMuYWN0aW9ucyA9IGRhdGEuYWN0aW9ucy5tYXAoYWN0aW9uID0+IG5ldyBBY3Rpb24oYWN0aW9uKSk7XHJcbiAgICAgIHRoaXMubGFzdCA9IGZhbHNlO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgZ2V0SW5hY3RpdmVUaW1lKCkge1xyXG4gICAgY29uc3QgdGltZXMgPSB0aGlzLmdldEFsbEFjdGlvblRpbWVzKCk7XHJcbiAgICByZXR1cm4gTWF0aC5tYXgoLi4udGltZXMpO1xyXG4gIH1cclxuXHJcbiAgZ2V0SW5hY3RpdmVBY3Rpb24oKSB7XHJcbiAgICByZXR1cm4gdGhpcy5hY3Rpb25zLmZpbmQoYWN0aW9uID0+IGFjdGlvbi5pbmFjdGl2ZSA9PT0gdHJ1ZSk7XHJcbiAgfVxyXG5cclxuICBnZXRBbGxBY3Rpb25UaW1lcygpIHtcclxuICAgIHJldHVybiB0aGlzLmFjdGlvbnMubWFwKGFjdGlvbiA9PiBhY3Rpb24ubWF4VGltZSB8fCAwKTtcclxuICB9XHJcblxyXG4gIGhhbmRsZUlucHV0KGRhdGEsIHRpbWUpIHtcclxuICAgIGNvbnN0IHN1aXRlZEFjdGlvbnMgPSB0aGlzLmFjdGlvbnMuZmlsdGVyKGFjdGlvbiA9PiBhY3Rpb24uaXNTdWl0YWJsZShkYXRhLCB0aW1lKSk7XHJcbiAgICBpZiAoc3VpdGVkQWN0aW9ucy5sZW5ndGggPiAwKSB7XHJcbiAgICAgIHJldHVybiBzdWl0ZWRBY3Rpb25zWzBdLm5leHRTdGF0ZTtcclxuICAgIH1cclxuICAgIHJldHVybiBudWxsO1xyXG4gIH1cclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgU3RhdGU7XHJcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2xlYXJuaW5nL21vZGVsX2NvbXBvbmVudHMvc3RhdGUuanMiLCJpbXBvcnQgbm9kZUZhY3RvcnkgZnJvbSAnLi4vLi4vdXRpbHMvbm9kZUZhY3RvcnknO1xyXG5cclxuY29uc3QgJG5hbWUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcubW9kZWwtc3RhdGUtbmFtZScpO1xyXG5jb25zdCAkaW1nID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLm1vZGVsLXN0YXRlLWltZycpO1xyXG5jb25zdCAkcGFyYW1zID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLm1vZGVsLXBhcmFtcy12YWx1ZXMnKTtcclxuXHJcbmNvbnN0ICRldmVudCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5tb2RlbC1ldmVudCcpO1xyXG5jb25zdCAkZXZlbnRIZWFkZXIgPSAkZXZlbnQucXVlcnlTZWxlY3RvcignLm1vZGVsLWV2ZW50LW5hbWUgc3BhbicpO1xyXG5jb25zdCAkZXZlbnRCb2R5ID0gJGV2ZW50LnF1ZXJ5U2VsZWN0b3IoJy5tb2RlbC1ldmVudC1pbmZvJyk7XHJcblxyXG5jb25zdCAkcmVzcG9uc2UgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcubW9kZWwtcmVzcG9uc2UnKTtcclxuXHJcbmZ1bmN0aW9uIHNldCh7IG5hbWUsIGltZywgcGFyYW1zIH0pIHtcclxuICAkbmFtZS50ZXh0Q29udGVudCA9IG5hbWU7XHJcbiAgJGltZy5zZXRBdHRyaWJ1dGUoJ3NyYycsIGltZyk7XHJcbiAgc2V0UGFyYW1ldGVycyhwYXJhbXMpO1xyXG59XHJcblxyXG5mdW5jdGlvbiBzZXRQYXJhbWV0ZXJzKHBhcmFtcykge1xyXG4gIGNvbnN0IGZyYWcgPSBkb2N1bWVudC5jcmVhdGVEb2N1bWVudEZyYWdtZW50KCk7XHJcbiAgZm9yIChsZXQga2V5IGluIHBhcmFtcykge1xyXG4gICAgZnJhZy5hcHBlbmRDaGlsZChjcmVhdGVQYXJhbWV0ZU5vZGUoa2V5LCBwYXJhbXNba2V5XSkpO1xyXG4gIH1cclxuICAkcGFyYW1zLmlubmVySFRNTCA9IFwiXCI7XHJcbiAgJHBhcmFtcy5hcHBlbmRDaGlsZChmcmFnKTtcclxufVxyXG5cclxuZnVuY3Rpb24gY3JlYXRlUGFyYW1ldGVOb2RlKGtleSwgdmFsdWUpIHtcclxuICBjb25zdCBkaXYgPSBub2RlRmFjdG9yeSgnZGl2JywgeyBjbGFzc0xpc3Q6IFsncGFyYW1ldGVyJ10gfSk7XHJcblxyXG4gIGNvbnN0IGtleVNwYW4gPSBub2RlRmFjdG9yeSgnc3BhbicsIHsgdGV4dENvbnRlbnQ6IGtleSB9KTtcclxuICBkaXYuYXBwZW5kQ2hpbGQoa2V5U3Bhbik7XHJcblxyXG4gIGNvbnN0IHZhbHVlU3BhbiA9IG5vZGVGYWN0b3J5KCdzcGFuJywgeyB0ZXh0Q29udGVudDogdmFsdWUgfSk7XHJcbiAgZGl2LmFwcGVuZENoaWxkKHZhbHVlU3Bhbik7XHJcblxyXG4gIHJldHVybiBkaXY7XHJcbn1cclxuXHJcblxyXG4vKiogU2V0cyBldmVudCBkYXRhIHRvIFVJICovXHJcbmZ1bmN0aW9uIHNob3dFdmVudChldmVudCkge1xyXG4gICRldmVudEhlYWRlci50ZXh0Q29udGVudCA9IGV2ZW50Lm5hbWU7XHJcbiAgJGV2ZW50Qm9keS50ZXh0Q29udGVudCA9IGV2ZW50LmRlc2NyaXB0aW9uO1xyXG4gICRldmVudC5jbGFzc0xpc3QucmVtb3ZlKCdpcy1oaWRkZW4nKTtcclxufVxyXG5mdW5jdGlvbiBoaWRlRXZlbnQoKSB7XHJcbiAgJGV2ZW50LmNsYXNzTGlzdC5hZGQoJ2lzLWhpZGRlbicpO1xyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCB7XHJcbiAgc2V0LFxyXG4gIHNob3dFdmVudCxcclxuICBoaWRlRXZlbnRcclxufVxyXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9sZWFybmluZy9zY2VuZV9jb21wb25lbnRzL3N0YXRlLmpzIiwiaW1wb3J0IG5vZGVGYWN0b3J5IGZyb20gJy4uLy4uL3V0aWxzL25vZGVGYWN0b3J5JztcclxuXHJcbmNvbnN0IHRvb2xUeXBlcyA9IHtcclxuICBSQU5HRTogJ3JhbmdlJyxcclxuICBTV0lUQ0g6ICdzd2l0Y2gnXHJcbn1cclxuY29uc3QgJHRvb2xzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnRvb2xzLWxpc3QnKTtcclxuXHJcbmZ1bmN0aW9uIGluaXQodG9vbHMpIHtcclxuICBjb25zdCBmcmFnbWVudCA9IGRvY3VtZW50LmNyZWF0ZURvY3VtZW50RnJhZ21lbnQoKTtcclxuXHJcbiAgdG9vbHMuZm9yRWFjaCh0b29sID0+IHtcclxuICAgIC8vIGNyZWF0ZSB0b29sIHdyYXBwZXJcclxuICAgIGNvbnN0IGRpdiA9IG5vZGVGYWN0b3J5KCdkaXYnLCB7IGNsYXNzTGlzdDogWyd0b29sJ10gfSk7XHJcblxyXG4gICAgY29uc3QgbGFiZWwgPSBub2RlRmFjdG9yeSgnbGFiZWwnLCB7XHJcbiAgICAgIGNsYXNzTGlzdDogWyd0b29sLW5hbWUnXSxcclxuICAgICAgYXR0cnM6IHsgXCJmb3JcIjogdG9vbC5uYW1lIH0sXHJcbiAgICAgIHRleHRDb250ZW50OiB0b29sLm5hbWVcclxuICAgIH0pO1xyXG4gICAgZGl2LmFwcGVuZENoaWxkKGxhYmVsKTtcclxuXHJcbiAgICBjb25zdCB0b29sTm9kZSA9IGNyZWF0ZVRvb2xOb2RlKHRvb2wpO1xyXG4gICAgZGl2LmFwcGVuZENoaWxkKHRvb2xOb2RlKTtcclxuXHJcbiAgICBmcmFnbWVudC5hcHBlbmRDaGlsZChkaXYpO1xyXG4gIH0pO1xyXG5cclxuICAkdG9vbHMuaW5uZXJIVE1MID0gXCJcIjtcclxuICAkdG9vbHMuYXBwZW5kQ2hpbGQoZnJhZ21lbnQpO1xyXG59XHJcblxyXG5mdW5jdGlvbiBjcmVhdGVUb29sTm9kZSh0b29sKSB7XHJcbiAgc3dpdGNoKHRvb2wudHlwZSkge1xyXG4gICAgY2FzZSB0b29sVHlwZXMuUkFOR0U6ICAgcmV0dXJuIGNyZWF0ZVJhbmdlVG9vbCh0b29sKTtcclxuICAgIGNhc2UgdG9vbFR5cGVzLlNXSVRDSDogIHJldHVybiBjcmVhdGVTd2l0Y2hUb29sKHRvb2wpO1xyXG4gICAgZGVmYXVsdDogICAgICAgICAgICAgICAgcmV0dXJuICfQndC10LjQt9Cy0LXRgdGC0L3Ri9C5INC/0YDQuNCx0L7RgCc7XHJcbiAgfVxyXG59XHJcblxyXG5mdW5jdGlvbiBjcmVhdGVSYW5nZVRvb2wodG9vbCkge1xyXG4gIGNvbnN0IGRpdklucHV0ID0gbm9kZUZhY3RvcnkoJ2RpdicsIHsgY2xhc3NMaXN0OiBbJ3JhbmdlJ10gfSk7XHJcblxyXG4gIGNvbnN0IHNwYW5NaW4gPSBub2RlRmFjdG9yeSgnc3BhbicsIHsgdGV4dENvbnRlbnQ6IHRvb2wubWluIH0pO1xyXG4gIGRpdklucHV0LmFwcGVuZENoaWxkKHNwYW5NaW4pXHJcblxyXG4gIGNvbnN0IGlucHV0ID0gbm9kZUZhY3RvcnkoJ2lucHV0Jywge1xyXG4gICAgYXR0cnM6IHtcclxuICAgICAgJ2RhdGEtaWQnOiB0b29sLmlkLFxyXG4gICAgICAnZGF0YS10eXBlJzogJ3JhbmdlJyxcclxuICAgICAgJ25hbWUnOiB0b29sLm5hbWUsXHJcbiAgICAgICd0eXBlJzogJ3JhbmdlJyxcclxuICAgICAgJ21pbic6IHRvb2wubWluLFxyXG4gICAgICAnbWF4JzogdG9vbC5tYXhcclxuICAgIH1cclxuICB9KTtcclxuICBkaXZJbnB1dC5hcHBlbmRDaGlsZChpbnB1dCk7XHJcblxyXG4gIGNvbnN0IHNwYW5NYXggPSBub2RlRmFjdG9yeSgnc3BhbicsIHsgdGV4dENvbnRlbnQ6IHRvb2wubWF4IH0pO1xyXG4gIGRpdklucHV0LmFwcGVuZENoaWxkKHNwYW5NYXgpO1xyXG5cclxuICBjb25zdCBkaXZDdXJyZW50ID0gbm9kZUZhY3RvcnkoJ2RpdicsIHsgY2xhc3NMaXN0OiBbJ3JhbmdlLWN1cnJlbnQtdmFsdWUnXSB9KTtcclxuICBjb25zdCBzcGFuQ3VycmVudCA9IG5vZGVGYWN0b3J5KCdzcGFuJywgeyB0ZXh0Q29udGVudDogaW5wdXQudmFsdWUgfSk7XHJcbiAgZGl2Q3VycmVudC5hcHBlbmRDaGlsZChzcGFuQ3VycmVudCk7XHJcblxyXG4gIGlucHV0LmFkZEV2ZW50TGlzdGVuZXIoJ2lucHV0JywgKGV2dCkgPT4ge1xyXG4gICAgc3BhbkN1cnJlbnQudGV4dENvbnRlbnQgPSBldnQudGFyZ2V0LnZhbHVlO1xyXG4gIH0pO1xyXG5cclxuICBjb25zdCBmcmFnbWVudCA9IGRvY3VtZW50LmNyZWF0ZURvY3VtZW50RnJhZ21lbnQoKTtcclxuICBmcmFnbWVudC5hcHBlbmRDaGlsZChkaXZJbnB1dCk7XHJcbiAgZnJhZ21lbnQuYXBwZW5kQ2hpbGQoZGl2Q3VycmVudCk7XHJcblxyXG4gIHJldHVybiBmcmFnbWVudDtcclxufVxyXG5cclxuZnVuY3Rpb24gY3JlYXRlU3dpdGNoVG9vbCh0b29sKSB7XHJcbiAgY29uc3QgbGFiZWwgPSBub2RlRmFjdG9yeSgnbGFiZWwnLCB7IGNsYXNzTGlzdDogWydzd2l0Y2gnXSB9KTtcclxuXHJcbiAgY29uc3QgaW5wdXQgPSBub2RlRmFjdG9yeSgnaW5wdXQnLCB7XHJcbiAgICBhdHRyczoge1xyXG4gICAgICAnZGF0YS1pZCc6IHRvb2wuaWQsXHJcbiAgICAgICdkYXRhLXR5cGUnOiAnc3dpdGNoJyxcclxuICAgICAgJ3R5cGUnOiAnY2hlY2tib3gnXHJcbiAgICB9XHJcbiAgfSk7XHJcbiAgbGFiZWwuYXBwZW5kQ2hpbGQoaW5wdXQpO1xyXG5cclxuICBjb25zdCBkaXYgPSBub2RlRmFjdG9yeSgnZGl2JywgeyBjbGFzc0xpc3Q6IFsnc2xpZGVyJ10gfSk7XHJcbiAgbGFiZWwuYXBwZW5kQ2hpbGQoZGl2KTtcclxuXHJcbiAgcmV0dXJuIGxhYmVsO1xyXG59XHJcblxyXG5mdW5jdGlvbiBnZXRUb29sc0RhdGEoKSB7XHJcbiAgY29uc3QgdG9vbHNEYXRhID0gW107XHJcbiAgY29uc3QgaW5wdXRzID0gJHRvb2xzLnF1ZXJ5U2VsZWN0b3JBbGwoJ2lucHV0W2RhdGEtaWRdJyk7XHJcbiAgaW5wdXRzLmZvckVhY2goaW5wdXQgPT4ge1xyXG4gICAgY29uc3QgeyBpZCwgdHlwZSB9ID0gaW5wdXQuZGF0YXNldDtcclxuICAgIGxldCB2YWx1ZTtcclxuICAgIHN3aXRjaCh0eXBlKSB7XHJcbiAgICAgIGNhc2UgdG9vbFR5cGVzLlJBTkdFOiB2YWx1ZSA9IHBhcnNlSW50KGlucHV0LnZhbHVlKTsgYnJlYWs7XHJcbiAgICAgIGNhc2UgdG9vbFR5cGVzLlNXSVRDSDogdmFsdWUgPSBpbnB1dC5jaGVja2VkOyBicmVhaztcclxuICAgICAgZGVmYXVsdDogdGhyb3cgbmV3IEVycm9yKGDQndC10LrQvtGA0YDQtdC60YLQvdGL0Lkg0YLQuNC/INC/0YDQuNCx0L7RgNCwLiBJRDogJHtpZH1gKTtcclxuICAgIH1cclxuICAgIHRvb2xzRGF0YS5wdXNoKHsgaWQsIHZhbHVlIH0pO1xyXG4gIH0pO1xyXG4gIHJldHVybiB0b29sc0RhdGE7XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IHtcclxuICBpbml0LFxyXG4gIGdldFRvb2xzRGF0YVxyXG59O1xyXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9sZWFybmluZy9zY2VuZV9jb21wb25lbnRzL3Rvb2xzLmpzIiwiaW1wb3J0ICcuLi8uLi9zYXNzL2xlYXJuaW5nLnNjc3MnO1xyXG5cclxuaW1wb3J0IHB1YnN1YiBmcm9tICcuLi91dGlscy9wdWJzdWInO1xyXG5pbXBvcnQgYWpheCBmcm9tICcuLi91dGlscy9hamF4JztcclxuaW1wb3J0IHNjZW5lIGZyb20gJy4vc2NlbmUnO1xyXG5pbXBvcnQgTW9kZWwgZnJvbSAnLi9tb2RlbCc7XHJcblxyXG4vKipcclxuICogTG9hZCBtb2RlbCB3aXRoIGdpdmVuIGlkXHJcbiAqL1xyXG5mdW5jdGlvbiBsb2FkTW9kZWwoaWQpIHtcclxuICByZXR1cm4gYWpheChgL21vZGVscy8ke2lkfWApLnRoZW4ocmVzcG9uc2UgPT4gSlNPTi5wYXJzZShyZXNwb25zZSkpO1xyXG59XHJcblxyXG4vKipcclxuICogVUkgYnV0dG9uJ3MgaGFuZGxlcnNcclxuICovXHJcbmNvbnN0ICRzZWxlY3QgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI21vZGVsLXNlbGVjdFwiKTtcclxuY29uc3QgJGxvYWRCdXR0b24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjbG9hZC1tb2RlbC1idG4nKTtcclxubGV0IG1vZGVsID0gbnVsbDtcclxuJGxvYWRCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XHJcbiAgY29uc3QgbW9kZWxJZCA9ICRzZWxlY3QudmFsdWU7XHJcbiAgbG9hZE1vZGVsKG1vZGVsSWQpXHJcbiAgICAudGhlbihyZXNwb25zZSA9PiB7XHJcbiAgICAgIG1vZGVsID0gbmV3IE1vZGVsKHJlc3BvbnNlKTtcclxuICAgICAgc2NlbmUuaW5pdChtb2RlbCwgcmVzcG9uc2UpLnNob3dDb250ZW50KCkuZW5hYmxlQnV0dG9ucygkc3RhcnRCdXR0b24pO1xyXG4gICAgfSlcclxuICAgIC5jYXRjaChlcnIgPT4geyBjb25zb2xlLmVycm9yKGVycikgfSk7XHJcbn0pO1xyXG4vL1xyXG5jb25zdCAkc3RhcnRCdXR0b24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjc3RhcnQtYnRuJyk7XHJcbiRzdGFydEJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcclxuICBtb2RlbC5zdGFydCgpO1xyXG4gIHNjZW5lLmRpc2FibGVCdXR0b25zKCRzdGFydEJ1dHRvbik7XHJcbiAgc2NlbmUuZW5hYmxlQnV0dG9ucygkc3RvcEJ1dHRvbiwgJHJ1bkJ1dHRvbik7XHJcbn0pO1xyXG5cclxuY29uc3QgJHN0b3BCdXR0b24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjc3RvcC1idG4nKTtcclxuJHN0b3BCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XHJcbiAgbW9kZWwuc3RvcCgpOyAvLyBUT0RPXHJcbiAgc2NlbmUuZW5hYmxlQnV0dG9ucygkc3RhcnRCdXR0b24pO1xyXG4gIHNjZW5lLmRpc2FibGVCdXR0b25zKCRzdG9wQnV0dG9uLCAkcnVuQnV0dG9uKTtcclxufSk7XHJcblxyXG5jb25zdCAkcnVuQnV0dG9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3J1bi1idG4nKTtcclxuJHJ1bkJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcclxuICBjb25zdCB0b29sc0RhdGEgPSBzY2VuZS5nZXRUb29sc0RhdGEoKTtcclxuICBwdWJzdWIucHVibGlzaCgndXNlcl9pbnB1dCcsIHRvb2xzRGF0YSk7XHJcbn0pO1xyXG5cclxuLyoqXHJcbiAqIEhhbmRsZSBjdXN0b20gZXZlbnRzIGhlcmUgKHVzZXIgaW5wdXQsIHByb2dyYW1tIG1lc3NhZ2VzIGV0Yy4pXHJcbiAqL1xyXG5wdWJzdWIuc3Vic2NyaWJlKCduZXdfc3RhdGUnLCBzdGF0ZSA9PiB7XHJcbiAgc2NlbmUuaGlkZUV2ZW50KCk7XHJcbiAgc2NlbmUuc2V0U3RhdGUoc3RhdGUpO1xyXG59KTtcclxucHVic3ViLnN1YnNjcmliZSgnZXZlbnQnLCBldmVudCA9PiBzY2VuZS5zaG93RXZlbnQoZXZlbnQpKTtcclxuXHJcbi8qKlxyXG4qIFRpbWVyIChjdXJyZW50bHkgZm9yIGRldiBtb2RlIG9ubHkpXHJcbiovXHJcbmltcG9ydCB0aW1lciBmcm9tICcuLi91dGlscy90aW1lcic7XHJcbmRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5oZWFkZXInKS5hcHBlbmRDaGlsZCh0aW1lci5ub2RlKTtcclxucHVic3ViLnN1YnNjcmliZSgnbmV3X3N0YXRlJywgc3RhdGUgPT4gdGltZXIuc3RvcCgpKTtcclxucHVic3ViLnN1YnNjcmliZSgnZXZlbnQnLCBldmVudCA9PiB0aW1lci5zdGFydCgpKTtcclxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vbGVhcm5pbmcvaW5kZXguanMiXSwic291cmNlUm9vdCI6IiJ9