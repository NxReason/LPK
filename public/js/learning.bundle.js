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
/******/ 	return __webpack_require__(__webpack_require__.s = 11);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
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
/* 1 */
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
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _state = __webpack_require__(8);

var _state2 = _interopRequireDefault(_state);

var _pubsub = __webpack_require__(0);

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

var _state = __webpack_require__(9);

var _state2 = _interopRequireDefault(_state);

var _tools = __webpack_require__(10);

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
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 6 */
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
/* 7 */
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
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _event = __webpack_require__(7);

var _event2 = _interopRequireDefault(_event);

var _action = __webpack_require__(6);

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
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _nodeFactory = __webpack_require__(1);

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
/* 10 */
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
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


__webpack_require__(5);

var _pubsub = __webpack_require__(0);

var _pubsub2 = _interopRequireDefault(_pubsub);

var _ajax = __webpack_require__(4);

var _ajax2 = _interopRequireDefault(_ajax);

var _scene = __webpack_require__(3);

var _scene2 = _interopRequireDefault(_scene);

var _model = __webpack_require__(2);

var _model2 = _interopRequireDefault(_model);

var _timer = __webpack_require__(18);

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

/***/ }),
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgMWJhM2NjODJmMjc1Mjc0YjQwNGEiLCJ3ZWJwYWNrOi8vLy4vdXRpbHMvcHVic3ViLmpzIiwid2VicGFjazovLy8uL3V0aWxzL25vZGVGYWN0b3J5LmpzIiwid2VicGFjazovLy8uL2xlYXJuaW5nL21vZGVsLmpzIiwid2VicGFjazovLy8uL2xlYXJuaW5nL3NjZW5lLmpzIiwid2VicGFjazovLy8uL3V0aWxzL2FqYXguanMiLCJ3ZWJwYWNrOi8vLy4uL3Nhc3MvbGVhcm5pbmcuc2NzcyIsIndlYnBhY2s6Ly8vLi9sZWFybmluZy9tb2RlbF9jb21wb25lbnRzL2FjdGlvbi5qcyIsIndlYnBhY2s6Ly8vLi9sZWFybmluZy9tb2RlbF9jb21wb25lbnRzL2V2ZW50LmpzIiwid2VicGFjazovLy8uL2xlYXJuaW5nL21vZGVsX2NvbXBvbmVudHMvc3RhdGUuanMiLCJ3ZWJwYWNrOi8vLy4vbGVhcm5pbmcvc2NlbmVfY29tcG9uZW50cy9zdGF0ZS5qcyIsIndlYnBhY2s6Ly8vLi9sZWFybmluZy9zY2VuZV9jb21wb25lbnRzL3Rvb2xzLmpzIiwid2VicGFjazovLy8uL2xlYXJuaW5nL2luZGV4LmpzIiwid2VicGFjazovLy8uL3V0aWxzL3RpbWVyLmpzIl0sIm5hbWVzIjpbInB1YnN1YiIsInRvcGljcyIsInN1YnNjcmliZSIsInRvcGljIiwibGlzdGVuZXIiLCJxdWV1ZSIsImluZGV4IiwicHVzaCIsInJlbW92ZSIsInB1Ymxpc2giLCJpbmZvIiwibGVuZ3RoIiwiaXRlbXMiLCJmb3JFYWNoIiwiaXRlbSIsIm5vZGVGYWN0b3J5IiwidHlwZSIsInBhcmFtcyIsIm5vZGUiLCJkb2N1bWVudCIsImNyZWF0ZUVsZW1lbnQiLCJhcHBlbmRDbGFzc2VzIiwiYXBwZW5kQXR0cnMiLCJpbnNlcnRUZXh0Q29udGVudCIsImNsYXNzTGlzdCIsImFkZCIsImNsYXNzTmFtZSIsImF0dHJzIiwiYXR0ck5hbWVzIiwiT2JqZWN0Iiwia2V5cyIsInNldEF0dHJpYnV0ZSIsImF0dHJOYW1lIiwidGV4dENvbnRlbnQiLCJNb2RlbCIsImRhdGEiLCJpZCIsIm5hbWUiLCJicmVha1RpbWUiLCJzdGVwcyIsInN0YXRlcyIsIm1hcCIsInN0YXRlIiwiY3VycmVudFN0YXRlIiwiZ2V0U3RhdGUiLCJpbml0aWFsU3RhdGUiLCJ0aW1lb3V0Iiwic3Vic2NyaWJ0aW9uIiwiZmluZCIsImludGVydmFscyIsIlByb21pc2UiLCJyZXNvbHZlIiwiaSIsInRoZW4iLCJtYWtlQnJlYWsiLCJoYW5kbGVFdmVudCIsImhhbmRsZU5ld1N0YXRlIiwiY2F0Y2giLCJyZWplY3QiLCJzZXRUaW1lb3V0IiwiZXZlbnQiLCJldmVudFN0YXJ0VGltZSIsIkRhdGUiLCJub3ciLCJ0aW1lU3BlbnQiLCJuZXh0U3RhdGVJZCIsImhhbmRsZUlucHV0IiwibmV4dFN0YXRlIiwibGFzdCIsImluYWN0aXZlVGltZSIsImdldEluYWN0aXZlVGltZSIsImdldEluYWN0aXZlQWN0aW9uIiwiY2xlYXJUaW1lb3V0Iiwic3Vic2NyaXB0aW9uIiwiZXhwb3J0cyIsIiRtb2RlbE5hbWUiLCJxdWVyeVNlbGVjdG9yIiwiaW5pdCIsIm1vZGVsIiwicmVzcG9uc2UiLCJzZXQiLCJ0b29scyIsIiRjb250ZW50Iiwic2hvd0NvbnRlbnQiLCJzZXRDb250ZW50RGlzcGxheSIsImhpZGVDb250ZW50IiwiZGlzcGxheSIsInN0eWxlIiwiZW5hYmxlQnV0dG9ucyIsImJ1dHRvbnMiLCJzZXRCdXR0b25zU3RhdGUiLCJkaXNhYmxlQnV0dG9ucyIsInZhbHVlIiwiYnV0dG9uIiwiZGlzYWJsZWQiLCJnZXRUb29sc0RhdGEiLCJzZXRTdGF0ZSIsInN0YXRlRGF0YSIsInNob3dFdmVudCIsImV2ZW50RGF0YSIsImhpZGVFdmVudCIsImFqYXgiLCJwYXRoIiwib3B0aW9ucyIsInhociIsIlhNTEh0dHBSZXF1ZXN0Iiwib3BlbiIsIm1ldGhvZCIsImhlYWRlcnMiLCJzZXRYSFJIZWFkZXJzIiwic2VuZCIsIm9ucmVhZHlzdGF0ZWNoYW5nZSIsInJlYWR5U3RhdGUiLCJzdGF0dXMiLCJyZXNwb25zZVRleHQiLCJzdGF0dXNUZXh0IiwiaGVhZGVyIiwic2V0UmVxdWVzdEhlYWRlciIsIkFjdGlvbiIsIm1pblRpbWUiLCJtYXhUaW1lIiwiaW5hY3RpdmUiLCJ0aW1lIiwicmlnaHRUaW1lIiwicmlnaHREYXRhIiwiQXJyYXkiLCJpc0FycmF5IiwiVHlwZUVycm9yIiwiZXZlcnkiLCJjaGVja1Rvb2wiLCJvYmoiLCJ0b29sIiwiaW5jbHVkZXNWYWx1ZSIsImJvcmRlcnMiLCJFdmVudCIsImRlc2NyaXB0aW9uIiwiU3RhdGUiLCJpbWciLCJhY3Rpb25zIiwiYWN0aW9uIiwidGltZXMiLCJnZXRBbGxBY3Rpb25UaW1lcyIsIk1hdGgiLCJtYXgiLCJzdWl0ZWRBY3Rpb25zIiwiZmlsdGVyIiwiaXNTdWl0YWJsZSIsIiRuYW1lIiwiJGltZyIsIiRwYXJhbXMiLCIkZXZlbnQiLCIkZXZlbnRIZWFkZXIiLCIkZXZlbnRCb2R5IiwiJHJlc3BvbnNlIiwic2V0UGFyYW1ldGVycyIsImZyYWciLCJjcmVhdGVEb2N1bWVudEZyYWdtZW50Iiwia2V5IiwiYXBwZW5kQ2hpbGQiLCJjcmVhdGVQYXJhbWV0ZU5vZGUiLCJpbm5lckhUTUwiLCJkaXYiLCJrZXlTcGFuIiwidmFsdWVTcGFuIiwidG9vbFR5cGVzIiwiUkFOR0UiLCJTV0lUQ0giLCIkdG9vbHMiLCJmcmFnbWVudCIsImxhYmVsIiwidG9vbE5vZGUiLCJjcmVhdGVUb29sTm9kZSIsImNyZWF0ZVJhbmdlVG9vbCIsImNyZWF0ZVN3aXRjaFRvb2wiLCJkaXZJbnB1dCIsInNwYW5NaW4iLCJtaW4iLCJpbnB1dCIsInNwYW5NYXgiLCJkaXZDdXJyZW50Iiwic3BhbkN1cnJlbnQiLCJhZGRFdmVudExpc3RlbmVyIiwiZXZ0IiwidGFyZ2V0IiwidG9vbHNEYXRhIiwiaW5wdXRzIiwicXVlcnlTZWxlY3RvckFsbCIsImRhdGFzZXQiLCJwYXJzZUludCIsImNoZWNrZWQiLCJFcnJvciIsImxvYWRNb2RlbCIsIkpTT04iLCJwYXJzZSIsIiRzZWxlY3QiLCIkbG9hZEJ1dHRvbiIsIm1vZGVsSWQiLCIkc3RhcnRCdXR0b24iLCJjb25zb2xlIiwiZXJyb3IiLCJlcnIiLCJzdGFydCIsIiRzdG9wQnV0dG9uIiwiJHJ1bkJ1dHRvbiIsInN0b3AiLCJtc1RvQ29udGVudCIsIm1zIiwic2Vjb25kcyIsInJvdW5kIiwibWlucyIsImZsb29yIiwic2Vjb25kc0xlZnQiLCJ0aW1lciIsInN0YXJ0VGltZSIsImludGVydmFsIiwic2V0SW50ZXJ2YWwiLCJlbGFwc2VkIiwiY2xlYXJJbnRlcnZhbCJdLCJtYXBwaW5ncyI6IjtBQUFBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBLG1EQUEyQyxjQUFjOztBQUV6RDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQUs7QUFDTDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLG1DQUEyQiwwQkFBMEIsRUFBRTtBQUN2RCx5Q0FBaUMsZUFBZTtBQUNoRDtBQUNBO0FBQ0E7O0FBRUE7QUFDQSw4REFBc0QsK0RBQStEOztBQUVySDtBQUNBOztBQUVBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7QUNoRUEsSUFBTUEsU0FBVSxZQUFXOztBQUV6QixNQUFNQyxTQUFTLEVBQWY7O0FBRUEsU0FBTztBQUNMQyxlQUFXLG1CQUFTQyxLQUFULEVBQWdCQyxRQUFoQixFQUEwQjtBQUNuQyxVQUFJLENBQUNILE9BQU9FLEtBQVAsQ0FBTCxFQUFvQkYsT0FBT0UsS0FBUCxJQUFnQixFQUFFRSxPQUFPLEVBQVQsRUFBaEI7O0FBRXBCLFVBQU1DLFFBQVFMLE9BQU9FLEtBQVAsRUFBY0UsS0FBZCxDQUFvQkUsSUFBcEIsQ0FBeUJILFFBQXpCLElBQXFDLENBQW5EO0FB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aEIsU0FBS1ksU0FBTCxHQUFpQnZKLEtBQUtDLEdBQUwsRUFBakI7QUFDQSxTQUFLdUosUUFBTCxHQUFnQkMsWUFBWSxZQUFNO0FBQ2hDLFVBQU1DLFVBQVUxSixLQUFLQyxHQUFMLEtBQWEsTUFBS3NKLFNBQWxDO0FBQ0EsWUFBS25NLElBQUwsQ0FBVWUsV0FBVixHQUF3QjRLLFlBQVlXLE9BQVosQ0FBeEI7QUFDRCxLQUhlLEVBR2IsSUFIYSxDQUFoQjtBQUlELEdBVlc7QUFXWlosUUFBTSxnQkFBVztBQUNmLFFBQUksQ0FBQyxLQUFLUyxTQUFWLEVBQXFCO0FBQUU7QUFBUztBQUNoQyxTQUFLQSxTQUFMLEdBQWlCLElBQWpCO0FBQ0FJLGtCQUFjLEtBQUtILFFBQW5CO0FBQ0EsU0FBS3BNLElBQUwsQ0FBVWUsV0FBVixHQUF3QixNQUF4QjtBQUNEO0FBaEJXLENBQWQ7O2tCQW1CZW1MLEsiLCJmaWxlIjoibGVhcm5pbmcuYnVuZGxlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pXG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG5cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGlkZW50aXR5IGZ1bmN0aW9uIGZvciBjYWxsaW5nIGhhcm1vbnkgaW1wb3J0cyB3aXRoIHRoZSBjb3JyZWN0IGNvbnRleHRcbiBcdF9fd2VicGFja19yZXF1aXJlX18uaSA9IGZ1bmN0aW9uKHZhbHVlKSB7IHJldHVybiB2YWx1ZTsgfTtcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7XG4gXHRcdFx0XHRjb25maWd1cmFibGU6IGZhbHNlLFxuIFx0XHRcdFx0ZW51bWVyYWJsZTogdHJ1ZSxcbiBcdFx0XHRcdGdldDogZ2V0dGVyXG4gXHRcdFx0fSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gMTEpO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIHdlYnBhY2svYm9vdHN0cmFwIDFiYTNjYzgyZjI3NTI3NGI0MDRhIiwiY29uc3QgcHVic3ViID0gKGZ1bmN0aW9uKCkge1xyXG5cclxuICBjb25zdCB0b3BpY3MgPSB7fTtcclxuXHJcbiAgcmV0dXJuIHtcclxuICAgIHN1YnNjcmliZTogZnVuY3Rpb24odG9waWMsIGxpc3RlbmVyKSB7XHJcbiAgICAgIGlmICghdG9waWNzW3RvcGljXSkgdG9waWNzW3RvcGljXSA9IHsgcXVldWU6IFtdIH07XHJcblxyXG4gICAgICBjb25zdCBpbmRleCA9IHRvcGljc1t0b3BpY10ucXVldWUucHVzaChsaXN0ZW5lcikgLSAxO1xyXG4gICAgICAvLyBmdW5jdGlvbiB0byBkZWxldGUgdG9waWNcclxuICAgICAgcmV0dXJuIHtcclxuICAgICAgICByZW1vdmU6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgZGVsZXRlIHRvcGljc1t0b3BpY10ucXVldWVbaW5kZXhdO1xyXG4gICAgICAgIH1cclxuICAgICAgfTtcclxuICAgIH0sXHJcblxyXG4gICAgcHVibGlzaDogZnVuY3Rpb24odG9waWMsIGluZm8pIHtcclxuICAgICAgLy8gbm8gdGhlbWUgb3Igbm8gbGlzdGVuZXJzXHJcbiAgICAgIGlmICghdG9waWNzW3RvcGljXSB8fCAhdG9waWNzW3RvcGljXS5xdWV1ZS5sZW5ndGgpIHJldHVybjtcclxuXHJcbiAgICAgIGNvbnN0IGl0ZW1zID0gdG9waWNzW3RvcGljXS5xdWV1ZTtcclxuICAgICAgaXRlbXMuZm9yRWFjaChpdGVtID0+IHtcclxuICAgICAgICBpdGVtKGluZm8gfHwge30pO1xyXG4gICAgICB9KTtcclxuICAgIH1cclxuICB9O1xyXG59KSgpO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgcHVic3ViO1xyXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi91dGlscy9wdWJzdWIuanMiLCJjb25zdCBub2RlRmFjdG9yeSA9IGZ1bmN0aW9uKHR5cGUgPSAnZGl2JywgcGFyYW1zKSB7XHJcbiAgY29uc3Qgbm9kZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQodHlwZSk7XHJcblxyXG4gIGFwcGVuZENsYXNzZXMobm9kZSwgcGFyYW1zKTtcclxuICBhcHBlbmRBdHRycyhub2RlLCBwYXJhbXMpO1xyXG4gIGluc2VydFRleHRDb250ZW50KG5vZGUsIHBhcmFtcyk7XHJcblxyXG4gIHJldHVybiBub2RlO1xyXG59XHJcblxyXG5mdW5jdGlvbiBhcHBlbmRDbGFzc2VzKG5vZGUsIHsgY2xhc3NMaXN0IH0pIHtcclxuICBpZiAoY2xhc3NMaXN0ICYmIGNsYXNzTGlzdC5mb3JFYWNoKSB7XHJcbiAgICBjbGFzc0xpc3QuZm9yRWFjaChjbGFzc05hbWUgPT4gbm9kZS5jbGFzc0xpc3QuYWRkKGNsYXNzTmFtZSkpO1xyXG4gIH1cclxufVxyXG5cclxuZnVuY3Rpb24gYXBwZW5kQXR0cnMobm9kZSwgeyBhdHRycyB9KSB7XHJcbiAgaWYgKGF0dHJzKSB7XHJcbiAgICBjb25zdCBhdHRyTmFtZXMgPSBPYmplY3Qua2V5cyhhdHRycyk7XHJcbiAgICBhdHRyTmFtZXMuZm9yRWFjaChhdHRyTmFtZSA9PiBub2RlLnNldEF0dHJpYnV0ZShhdHRyTmFtZSwgYXR0cnNbYXR0ck5hbWVdKSk7XHJcbiAgfVxyXG59XHJcblxyXG5mdW5jdGlvbiBpbnNlcnRUZXh0Q29udGVudChub2RlLCB7IHRleHRDb250ZW50ID0gXCJcIiB9KSB7XHJcbiAgbm9kZS50ZXh0Q29udGVudCA9IHRleHRDb250ZW50O1xyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBub2RlRmFjdG9yeTtcclxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vdXRpbHMvbm9kZUZhY3RvcnkuanMiLCJpbXBvcnQgU3RhdGUgZnJvbSAnLi9tb2RlbF9jb21wb25lbnRzL3N0YXRlJztcclxuaW1wb3J0IHB1YnN1YiBmcm9tICcuLi91dGlscy9wdWJzdWInO1xyXG5cclxuY2xhc3MgTW9kZWwge1xyXG4gIGNvbnN0cnVjdG9yKGRhdGEpIHtcclxuICAgIHRoaXMuaWQgPSBkYXRhLmlkO1xyXG4gICAgdGhpcy5uYW1lID0gZGF0YS5uYW1lO1xyXG4gICAgdGhpcy5icmVha1RpbWUgPSBkYXRhLmJyZWFrVGltZTtcclxuICAgIHRoaXMuc3RlcHMgPSBkYXRhLnN0ZXBzO1xyXG5cclxuICAgIHRoaXMuc3RhdGVzID0gZGF0YS5zdGF0ZXMubWFwKHN0YXRlID0+IG5ldyBTdGF0ZShzdGF0ZSkpO1xyXG4gICAgdGhpcy5jdXJyZW50U3RhdGUgPSB0aGlzLmdldFN0YXRlKGRhdGEuaW5pdGlhbFN0YXRlKTtcclxuXHJcbiAgICB0aGlzLnRpbWVvdXQgPSBudWxsO1xyXG4gICAgdGhpcy5zdWJzY3JpYnRpb24gPSBudWxsO1xyXG4gIH1cclxuXHJcbiAgZ2V0U3RhdGUoaWQpIHtcclxuICAgIHJldHVybiB0aGlzLnN0YXRlcy5maW5kKHN0YXRlID0+IHN0YXRlLmlkID09IGlkKTtcclxuICB9XHJcblxyXG4gIHN0YXJ0KCkge1xyXG4gICAgbGV0IGludGVydmFscyA9IFByb21pc2UucmVzb2x2ZSgpOyAvLyBpbml0IHByb21pc2UgY2hhaW5cclxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5zdGVwczsgaSsrKSB7XHJcbiAgICAgIGludGVydmFscyA9IGludGVydmFsc1xyXG4gICAgICAgLnRoZW4oKCkgPT4geyByZXR1cm4gdGhpcy5tYWtlQnJlYWsoKSB9KVxyXG4gICAgICAgLnRoZW4oKCkgPT4geyByZXR1cm4gdGhpcy5oYW5kbGVFdmVudCgpIH0pXHJcbiAgICAgICAudGhlbihzdGF0ZSA9PiB7IHRoaXMuaGFuZGxlTmV3U3RhdGUoc3RhdGUpIH0pXHJcbiAgICB9XHJcbiAgICBpbnRlcnZhbHMuY2F0Y2goc3RhdGUgPT4geyBwdWJzdWIucHVibGlzaCgnbmV3X3N0YXRlJywgIHN0YXRlKSB9KTtcclxuICAgIHJldHVybiBpbnRlcnZhbHM7XHJcbiAgfVxyXG5cclxuICBtYWtlQnJlYWsoKSB7XHJcbiAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xyXG4gICAgICBzZXRUaW1lb3V0KCgpID0+IHsgcmVzb2x2ZSgpIH0sIHRoaXMuYnJlYWtUaW1lKTtcclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgaGFuZGxlRXZlbnQoKSB7XHJcbiAgICBjb25zdCBldmVudCA9IHRoaXMuY3VycmVudFN0YXRlLmV2ZW50O1xyXG4gICAgY29uc3QgZXZlbnRTdGFydFRpbWUgPSBEYXRlLm5vdygpO1xyXG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcclxuICAgICAgLy8gc2VuZCBkYXRhIGFib3V0IG5ldyBldmVudCB0byBvdGhlciBtb2R1bGVzXHJcbiAgICAgIHB1YnN1Yi5wdWJsaXNoKCdldmVudCcsIGV2ZW50KTtcclxuXHJcbiAgICAgIC8vIGxpc3RlbiB0byB1c2VyIGFjdGlvblxyXG4gICAgICAvLyBhbmQgaWYgdXNlciBpbnB1dCBjb3JyZWN0IGdvIHRvIG5leHQgc3RhdGVcclxuICAgICAgdGhpcy5zdWJzY3JpYnRpb24gPSBwdWJzdWIuc3Vic2NyaWJlKCd1c2VyX2lucHV0JywgZGF0YSA9PiB7XHJcbiAgICAgICAgY29uc3QgdGltZVNwZW50ID0gRGF0ZS5ub3coKSAtIGV2ZW50U3RhcnRUaW1lO1xyXG4gICAgICAgIGNvbnN0IG5leHRTdGF0ZUlkID0gdGhpcy5jdXJyZW50U3RhdGUuaGFuZGxlSW5wdXQoZGF0YSwgdGltZVNwZW50KTtcclxuICAgICAgICBjb25zdCBuZXh0U3RhdGUgPSB0aGlzLmdldFN0YXRlKG5leHRTdGF0ZUlkKTtcclxuICAgICAgICBpZiAobmV4dFN0YXRlKSB7XHJcbiAgICAgICAgICBuZXh0U3RhdGUubGFzdCA/IHJlamVjdChuZXh0U3RhdGUpIDogcmVzb2x2ZShuZXh0U3RhdGUpO1xyXG4gICAgICAgIH1cclxuICAgICAgfSlcclxuXHJcbiAgICAgIC8vIGhhbmRsZSBpbmFjdGl2ZVxyXG4gICAgICBjb25zdCBpbmFjdGl2ZVRpbWUgPSB0aGlzLmN1cnJlbnRTdGF0ZS5nZXRJbmFjdGl2ZVRpbWUoKTtcclxuICAgICAgdGhpcy50aW1lb3V0ID0gc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgY29uc3QgbmV4dFN0YXRlSWQgPSB0aGlzLmN1cnJlbnRTdGF0ZS5nZXRJbmFjdGl2ZUFjdGlvbigpLm5leHRTdGF0ZTtcclxuICAgICAgICBjb25zdCBuZXh0U3RhdGUgPSB0aGlzLmdldFN0YXRlKG5leHRTdGF0ZUlkKTtcclxuICAgICAgICBuZXh0U3RhdGUubGFzdCA/IHJlamVjdChuZXh0U3RhdGUpIDogcmVzb2x2ZShuZXh0U3RhdGUpO1xyXG4gICAgICB9LCBpbmFjdGl2ZVRpbWUpO1xyXG4gICAgfSlcclxuICB9XHJcblxyXG4gIGhhbmRsZU5ld1N0YXRlKHN0YXRlKSB7XHJcbiAgICB0aGlzLmN1cnJlbnRTdGF0ZSA9IHN0YXRlO1xyXG4gICAgY2xlYXJUaW1lb3V0KHRoaXMudGltZW91dCk7XHJcbiAgICBpZiAodGhpcy5zdWJzY3JpcHRpb24pIHtcclxuICAgICAgdGhpcy5zdWJzY3JpYnRpb24ucmVtb3ZlKCk7XHJcbiAgICB9XHJcbiAgICBwdWJzdWIucHVibGlzaCgnbmV3X3N0YXRlJywgc3RhdGUpO1xyXG4gIH1cclxuXHJcbiAgLy8gVE9ET1xyXG4gIHN0b3AoKSB7XHJcblxyXG4gIH1cclxuXHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IE1vZGVsO1xyXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9sZWFybmluZy9tb2RlbC5qcyIsImltcG9ydCBzdGF0ZSBmcm9tICcuL3NjZW5lX2NvbXBvbmVudHMvc3RhdGUnO1xyXG5pbXBvcnQgdG9vbHMgZnJvbSAnLi9zY2VuZV9jb21wb25lbnRzL3Rvb2xzJztcclxuXHJcbmNvbnN0IGV4cG9ydHMgPSB7fTtcclxuXHJcbi8vIFNjZW5lIG1ldGFkYXRhXHJcbmNvbnN0ICRtb2RlbE5hbWUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcubW9kZWwtbmFtZScpO1xyXG5leHBvcnRzLmluaXQgPSBmdW5jdGlvbihtb2RlbCwgcmVzcG9uc2UpIHtcclxuICAkbW9kZWxOYW1lLnRleHRDb250ZW50ID0gbW9kZWwubmFtZTtcclxuICBzdGF0ZS5zZXQobW9kZWwuY3VycmVudFN0YXRlKTtcclxuICB0b29scy5pbml0KHJlc3BvbnNlLnRvb2xzKTtcclxuICByZXR1cm4gdGhpcztcclxufVxyXG5cclxuLy8gTWFuYWdlIGNvbnRlbnQgdmlzaWJpbGl0eVxyXG5jb25zdCAkY29udGVudCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5jb250ZW50Jyk7XHJcbmV4cG9ydHMuc2hvd0NvbnRlbnQgPSBmdW5jdGlvbigpIHtcclxuICBzZXRDb250ZW50RGlzcGxheSgnZmxleCcpO1xyXG4gIHJldHVybiB0aGlzO1xyXG59XHJcbmV4cG9ydHMuaGlkZUNvbnRlbnQgPSBmdW5jdGlvbigpIHtcclxuICBzZXRDb250ZW50RGlzcGxheSgnbm9uZScpO1xyXG4gIHJldHVybiB0aGlzO1xyXG59XHJcbmZ1bmN0aW9uIHNldENvbnRlbnREaXNwbGF5KGRpc3BsYXkpIHtcclxuICAkY29udGVudC5zdHlsZS5kaXNwbGF5ID0gZGlzcGxheTtcclxufVxyXG5cclxuLy8gTWFuYWdlIGJ1dHRvbnMgc3RhdGVcclxuZXhwb3J0cy5lbmFibGVCdXR0b25zID0gZnVuY3Rpb24oLi4uYnV0dG9ucykge1xyXG4gIHNldEJ1dHRvbnNTdGF0ZShidXR0b25zLCBmYWxzZSk7XHJcbn1cclxuZXhwb3J0cy5kaXNhYmxlQnV0dG9ucyA9IGZ1bmN0aW9uKC4uLmJ1dHRvbnMpIHtcclxuICBzZXRCdXR0b25zU3RhdGUoYnV0dG9ucywgdHJ1ZSk7XHJcbn1cclxuZnVuY3Rpb24gc2V0QnV0dG9uc1N0YXRlKGJ1dHRvbnMsIHZhbHVlKSB7XHJcbiAgYnV0dG9ucy5mb3JFYWNoKGJ1dHRvbiA9PiBidXR0b24uZGlzYWJsZWQgPSB2YWx1ZSk7XHJcbn1cclxuXHJcbi8vIERlbGVnYXRlIHB1YmxpYyBtZXRob2RzIHRvIGNvbXBvbmVudHNcclxuZXhwb3J0cy5nZXRUb29sc0RhdGEgPSAoKSA9PlxyXG4gIHRvb2xzLmdldFRvb2xzRGF0YSgpO1xyXG5cclxuZXhwb3J0cy5zZXRTdGF0ZSA9IHN0YXRlRGF0YSA9PlxyXG4gIHN0YXRlLnNldChzdGF0ZURhdGEpO1xyXG5cclxuZXhwb3J0cy5zaG93RXZlbnQgPSBldmVudERhdGEgPT5cclxuICBzdGF0ZS5zaG93RXZlbnQoZXZlbnREYXRhKTtcclxuXHJcbmV4cG9ydHMuaGlkZUV2ZW50ID0gKCkgPT5cclxuICBzdGF0ZS5oaWRlRXZlbnQoKTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGV4cG9ydHM7XHJcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2xlYXJuaW5nL3NjZW5lLmpzIiwiZnVuY3Rpb24gYWpheChwYXRoID0gJycsIG9wdGlvbnMgPSB7fSkge1xyXG4gIGNvbnN0IHhociA9IG5ldyBYTUxIdHRwUmVxdWVzdCgpO1xyXG4gIHhoci5vcGVuKG9wdGlvbnMubWV0aG9kIHx8ICdHRVQnLCBwYXRoLCB0cnVlKTtcclxuICBpZiAob3B0aW9ucy5oZWFkZXJzKSB7IHNldFhIUkhlYWRlcnMoeGhyLCBvcHRpb25zLmhlYWRlcnMpOyB9XHJcbiAgeGhyLnNlbmQob3B0aW9ucy5kYXRhKTtcclxuXHJcbiAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcclxuICAgIHhoci5vbnJlYWR5c3RhdGVjaGFuZ2UgPSBmdW5jdGlvbigpIHtcclxuICAgICAgaWYoeGhyLnJlYWR5U3RhdGUgPT0gNCkge1xyXG4gICAgICAgIGlmKHhoci5zdGF0dXMgPT0gMjAwKSB7XHJcbiAgICAgICAgICByZXNvbHZlKHhoci5yZXNwb25zZVRleHQpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICByZWplY3QoeGhyLnN0YXR1c1RleHQpO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH0pXHJcbn1cclxuXHJcbmZ1bmN0aW9uIHNldFhIUkhlYWRlcnMoeGhyLCBoZWFkZXJzKSB7XHJcbiAgZm9yIChsZXQgaGVhZGVyIGluIGhlYWRlcnMpIHtcclxuICAgIHhoci5zZXRSZXF1ZXN0SGVhZGVyKGhlYWRlciwgaGVhZGVyc1toZWFkZXJzXSk7XHJcbiAgfVxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBhamF4O1xyXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi91dGlscy9hamF4LmpzIiwiLy8gcmVtb3ZlZCBieSBleHRyYWN0LXRleHQtd2VicGFjay1wbHVnaW5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuLi9zYXNzL2xlYXJuaW5nLnNjc3Ncbi8vIG1vZHVsZSBpZCA9IDVcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiY2xhc3MgQWN0aW9uIHtcclxuICBjb25zdHJ1Y3RvcihkYXRhKSB7XHJcbiAgICB0aGlzLm1pblRpbWUgPSBkYXRhLm1pblRpbWU7XHJcbiAgICB0aGlzLm1heFRpbWUgPSBkYXRhLm1heFRpbWU7XHJcbiAgICB0aGlzLm5leHRTdGF0ZSA9IGRhdGEubmV4dFN0YXRlO1xyXG4gICAgaWYgKGRhdGEuaW5hY3RpdmUpIHtcclxuICAgICAgdGhpcy5pbmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgIHRoaXMudG9vbHMgPSBbXTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHRoaXMuaW5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgdGhpcy50b29scyA9IGRhdGEudG9vbHM7XHJcbiAgICB9XHJcblxyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogQHBhcmFtIFt7IGlkOiBOdW1iZXIsIHZhbHVlOiBOdW1iZXIvQm9vbGVhbiB9LCB7Li4ufV1cclxuICAgKiBAcGFyYW0gTnVtYmVyXHJcbiAgICogQHJldHVybiBCb29sZWFuXHJcbiAgICovXHJcbiAgaXNTdWl0YWJsZShkYXRhLCB0aW1lKSB7XHJcbiAgICByZXR1cm4gdGhpcy5yaWdodFRpbWUodGltZSkgJiYgdGhpcy5yaWdodERhdGEoZGF0YSk7XHJcbiAgfVxyXG5cclxuICByaWdodERhdGEoZGF0YSA9IFtdKSB7XHJcbiAgICBpZighQXJyYXkuaXNBcnJheShkYXRhKSkgeyB0aHJvdyBuZXcgVHlwZUVycm9yKGBJbnZhbGlkIHR5cGUgb2YgZGF0YSBmcm9tIHRvb2xzLiBFeHBlY3RlZCBhcnJheSwgZ290ICR7dHlwZW9mIGRhdGF9YCk7IH1cclxuICAgIHJldHVybiB0aGlzLnRvb2xzLmV2ZXJ5KHRvb2wgPT4ge1xyXG4gICAgICAvLyDQldGB0LvQuCDRgdGA0LXQtNC4INC/0L7Qu9GD0YfQtdC90L3Ri9GFINC40YLQtdC80L7QsiDQvdC10YIsINGC0L7Qs9C+INC60L7RgtC+0YDRi9C5INC10YHRgtGMINCyINC00LDQvdC90L7QvCDRjdC60YjQtdC90LVcclxuICAgICAgY29uc3QgY2hlY2tUb29sID0gZGF0YS5maW5kKG9iaiA9PiBvYmouaWQgPT0gdG9vbC5pZCk7XHJcbiAgICAgIGlmICghY2hlY2tUb29sKSB7IHJldHVybiBmYWxzZTsgfVxyXG5cclxuICAgICAgLy8g0JTQu9GPINC/0LXRgNC10LrQu9GO0YfQsNGC0LXQu9GPXHJcbiAgICAgIGlmICh0eXBlb2YgdG9vbC52YWx1ZSA9PT0gJ2Jvb2xlYW4nKSB7IHJldHVybiBjaGVja1Rvb2wudmFsdWUgPT09IHRvb2wudmFsdWU7IH1cclxuXHJcbiAgICAgIC8vINCU0LvRjyDRgNC10L3QtNC20LBcclxuICAgICAgaWYgKEFycmF5LmlzQXJyYXkodG9vbC52YWx1ZSkpIHsgcmV0dXJuIHRoaXMuaW5jbHVkZXNWYWx1ZShjaGVja1Rvb2wudmFsdWUsIHRvb2wudmFsdWUpIH1cclxuXHJcbiAgICAgIHJldHVybiBmYWxzZTtcclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgaW5jbHVkZXNWYWx1ZSh2YWx1ZSwgYm9yZGVycykge1xyXG4gICAgaWYgKHR5cGVvZiB2YWx1ZSAhPT0gJ251bWJlcicpIHRocm93IG5ldyBUeXBlRXJyb3IoJ1ZhbHVlIHNob3VsZCBiZSBpbnRlZ2VyJyk7XHJcbiAgICByZXR1cm4gKHZhbHVlID49IGJvcmRlcnNbMF0pICYmICh2YWx1ZSA8PSBib3JkZXJzWzFdKTtcclxuICB9XHJcblxyXG4gIHJpZ2h0VGltZSh0aW1lKSB7XHJcbiAgICBpZiAodHlwZW9mIHRpbWUgIT09ICdudW1iZXInKSB0aHJvdyBuZXcgVHlwZUVycm9yKCdUaW1lIHNob3VsZCBiZSBpbnRlZ2VyIChtcyknKTtcclxuICAgIHJldHVybiAodGltZSA+PSB0aGlzLm1pblRpbWUpICYmICh0aW1lIDw9IHRoaXMubWF4VGltZSk7XHJcbiAgfVxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBBY3Rpb247XHJcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2xlYXJuaW5nL21vZGVsX2NvbXBvbmVudHMvYWN0aW9uLmpzIiwiY2xhc3MgRXZlbnQge1xyXG4gIGNvbnN0cnVjdG9yKGRhdGEpIHtcclxuICAgIHRoaXMuaWQgPSBkYXRhLmlkO1xyXG4gICAgdGhpcy5uYW1lID0gZGF0YS5uYW1lO1xyXG4gICAgdGhpcy5kZXNjcmlwdGlvbiA9IGRhdGEuZGVzY3JpcHRpb247XHJcbiAgfVxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBFdmVudDtcclxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vbGVhcm5pbmcvbW9kZWxfY29tcG9uZW50cy9ldmVudC5qcyIsImltcG9ydCBFdmVudCBmcm9tICcuL2V2ZW50JyA7XHJcbmltcG9ydCBBY3Rpb24gZnJvbSAnLi9hY3Rpb24nO1xyXG5cclxuY2xhc3MgU3RhdGUge1xyXG4gIGNvbnN0cnVjdG9yKGRhdGEpIHtcclxuICAgIHRoaXMuaWQgPSBkYXRhLmlkO1xyXG4gICAgdGhpcy5uYW1lID0gZGF0YS5uYW1lO1xyXG4gICAgdGhpcy5pbWcgPSBkYXRhLmltZztcclxuICAgIHRoaXMucGFyYW1zID0gZGF0YS5wYXJhbXM7XHJcblxyXG4gICAgaWYoZGF0YS5sYXN0KSB7XHJcbiAgICAgIHRoaXMubGFzdCA9IHRydWU7XHJcbiAgICAgIHRoaXMuZXZlbnQgPSBudWxsO1xyXG4gICAgICB0aGlzLmFjdGlvbnMgPSBudWxsO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdGhpcy5ldmVudCA9IG5ldyBFdmVudChkYXRhLmV2ZW50KTtcclxuICAgICAgdGhpcy5hY3Rpb25zID0gZGF0YS5hY3Rpb25zLm1hcChhY3Rpb24gPT4gbmV3IEFjdGlvbihhY3Rpb24pKTtcclxuICAgICAgdGhpcy5sYXN0ID0gZmFsc2U7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBnZXRJbmFjdGl2ZVRpbWUoKSB7XHJcbiAgICBjb25zdCB0aW1lcyA9IHRoaXMuZ2V0QWxsQWN0aW9uVGltZXMoKTtcclxuICAgIHJldHVybiBNYXRoLm1heCguLi50aW1lcyk7XHJcbiAgfVxyXG5cclxuICBnZXRJbmFjdGl2ZUFjdGlvbigpIHtcclxuICAgIHJldHVybiB0aGlzLmFjdGlvbnMuZmluZChhY3Rpb24gPT4gYWN0aW9uLmluYWN0aXZlID09PSB0cnVlKTtcclxuICB9XHJcblxyXG4gIGdldEFsbEFjdGlvblRpbWVzKCkge1xyXG4gICAgcmV0dXJuIHRoaXMuYWN0aW9ucy5tYXAoYWN0aW9uID0+IGFjdGlvbi5tYXhUaW1lIHx8IDApO1xyXG4gIH1cclxuXHJcbiAgaGFuZGxlSW5wdXQoZGF0YSwgdGltZSkge1xyXG4gICAgY29uc3Qgc3VpdGVkQWN0aW9ucyA9IHRoaXMuYWN0aW9ucy5maWx0ZXIoYWN0aW9uID0+IGFjdGlvbi5pc1N1aXRhYmxlKGRhdGEsIHRpbWUpKTtcclxuICAgIGlmIChzdWl0ZWRBY3Rpb25zLmxlbmd0aCA+IDApIHtcclxuICAgICAgcmV0dXJuIHN1aXRlZEFjdGlvbnNbMF0ubmV4dFN0YXRlO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIG51bGw7XHJcbiAgfVxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBTdGF0ZTtcclxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vbGVhcm5pbmcvbW9kZWxfY29tcG9uZW50cy9zdGF0ZS5qcyIsImltcG9ydCBub2RlRmFjdG9yeSBmcm9tICcuLi8uLi91dGlscy9ub2RlRmFjdG9yeSc7XHJcblxyXG5jb25zdCAkbmFtZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5tb2RlbC1zdGF0ZS1uYW1lJyk7XHJcbmNvbnN0ICRpbWcgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcubW9kZWwtc3RhdGUtaW1nJyk7XHJcbmNvbnN0ICRwYXJhbXMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcubW9kZWwtcGFyYW1zLXZhbHVlcycpO1xyXG5cclxuY29uc3QgJGV2ZW50ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLm1vZGVsLWV2ZW50Jyk7XHJcbmNvbnN0ICRldmVudEhlYWRlciA9ICRldmVudC5xdWVyeVNlbGVjdG9yKCcubW9kZWwtZXZlbnQtbmFtZSBzcGFuJyk7XHJcbmNvbnN0ICRldmVudEJvZHkgPSAkZXZlbnQucXVlcnlTZWxlY3RvcignLm1vZGVsLWV2ZW50LWluZm8nKTtcclxuXHJcbmNvbnN0ICRyZXNwb25zZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5tb2RlbC1yZXNwb25zZScpO1xyXG5cclxuZnVuY3Rpb24gc2V0KHsgbmFtZSwgaW1nLCBwYXJhbXMgfSkge1xyXG4gICRuYW1lLnRleHRDb250ZW50ID0gbmFtZTtcclxuICAkaW1nLnNldEF0dHJpYnV0ZSgnc3JjJywgaW1nKTtcclxuICBzZXRQYXJhbWV0ZXJzKHBhcmFtcyk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIHNldFBhcmFtZXRlcnMocGFyYW1zKSB7XHJcbiAgY29uc3QgZnJhZyA9IGRvY3VtZW50LmNyZWF0ZURvY3VtZW50RnJhZ21lbnQoKTtcclxuICBmb3IgKGxldCBrZXkgaW4gcGFyYW1zKSB7XHJcbiAgICBmcmFnLmFwcGVuZENoaWxkKGNyZWF0ZVBhcmFtZXRlTm9kZShrZXksIHBhcmFtc1trZXldKSk7XHJcbiAgfVxyXG4gICRwYXJhbXMuaW5uZXJIVE1MID0gXCJcIjtcclxuICAkcGFyYW1zLmFwcGVuZENoaWxkKGZyYWcpO1xyXG59XHJcblxyXG5mdW5jdGlvbiBjcmVhdGVQYXJhbWV0ZU5vZGUoa2V5LCB2YWx1ZSkge1xyXG4gIGNvbnN0IGRpdiA9IG5vZGVGYWN0b3J5KCdkaXYnLCB7IGNsYXNzTGlzdDogWydwYXJhbWV0ZXInXSB9KTtcclxuXHJcbiAgY29uc3Qga2V5U3BhbiA9IG5vZGVGYWN0b3J5KCdzcGFuJywgeyB0ZXh0Q29udGVudDoga2V5IH0pO1xyXG4gIGRpdi5hcHBlbmRDaGlsZChrZXlTcGFuKTtcclxuXHJcbiAgY29uc3QgdmFsdWVTcGFuID0gbm9kZUZhY3RvcnkoJ3NwYW4nLCB7IHRleHRDb250ZW50OiB2YWx1ZSB9KTtcclxuICBkaXYuYXBwZW5kQ2hpbGQodmFsdWVTcGFuKTtcclxuXHJcbiAgcmV0dXJuIGRpdjtcclxufVxyXG5cclxuXHJcbi8qKiBTZXRzIGV2ZW50IGRhdGEgdG8gVUkgKi9cclxuZnVuY3Rpb24gc2hvd0V2ZW50KGV2ZW50KSB7XHJcbiAgJGV2ZW50SGVhZGVyLnRleHRDb250ZW50ID0gZXZlbnQubmFtZTtcclxuICAkZXZlbnRCb2R5LnRleHRDb250ZW50ID0gZXZlbnQuZGVzY3JpcHRpb247XHJcbiAgJGV2ZW50LmNsYXNzTGlzdC5yZW1vdmUoJ2lzLWhpZGRlbicpO1xyXG59XHJcbmZ1bmN0aW9uIGhpZGVFdmVudCgpIHtcclxuICAkZXZlbnQuY2xhc3NMaXN0LmFkZCgnaXMtaGlkZGVuJyk7XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IHtcclxuICBzZXQsXHJcbiAgc2hvd0V2ZW50LFxyXG4gIGhpZGVFdmVudFxyXG59XHJcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2xlYXJuaW5nL3NjZW5lX2NvbXBvbmVudHMvc3RhdGUuanMiLCJpbXBvcnQgbm9kZUZhY3RvcnkgZnJvbSAnLi4vLi4vdXRpbHMvbm9kZUZhY3RvcnknO1xyXG5cclxuY29uc3QgdG9vbFR5cGVzID0ge1xyXG4gIFJBTkdFOiAncmFuZ2UnLFxyXG4gIFNXSVRDSDogJ3N3aXRjaCdcclxufVxyXG5jb25zdCAkdG9vbHMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcudG9vbHMtbGlzdCcpO1xyXG5cclxuZnVuY3Rpb24gaW5pdCh0b29scykge1xyXG4gIGNvbnN0IGZyYWdtZW50ID0gZG9jdW1lbnQuY3JlYXRlRG9jdW1lbnRGcmFnbWVudCgpO1xyXG5cclxuICB0b29scy5mb3JFYWNoKHRvb2wgPT4ge1xyXG4gICAgLy8gY3JlYXRlIHRvb2wgd3JhcHBlclxyXG4gICAgY29uc3QgZGl2ID0gbm9kZUZhY3RvcnkoJ2RpdicsIHsgY2xhc3NMaXN0OiBbJ3Rvb2wnXSB9KTtcclxuXHJcbiAgICBjb25zdCBsYWJlbCA9IG5vZGVGYWN0b3J5KCdsYWJlbCcsIHtcclxuICAgICAgY2xhc3NMaXN0OiBbJ3Rvb2wtbmFtZSddLFxyXG4gICAgICBhdHRyczogeyBcImZvclwiOiB0b29sLm5hbWUgfSxcclxuICAgICAgdGV4dENvbnRlbnQ6IHRvb2wubmFtZVxyXG4gICAgfSk7XHJcbiAgICBkaXYuYXBwZW5kQ2hpbGQobGFiZWwpO1xyXG5cclxuICAgIGNvbnN0IHRvb2xOb2RlID0gY3JlYXRlVG9vbE5vZGUodG9vbCk7XHJcbiAgICBkaXYuYXBwZW5kQ2hpbGQodG9vbE5vZGUpO1xyXG5cclxuICAgIGZyYWdtZW50LmFwcGVuZENoaWxkKGRpdik7XHJcbiAgfSk7XHJcblxyXG4gICR0b29scy5pbm5lckhUTUwgPSBcIlwiO1xyXG4gICR0b29scy5hcHBlbmRDaGlsZChmcmFnbWVudCk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGNyZWF0ZVRvb2xOb2RlKHRvb2wpIHtcclxuICBzd2l0Y2godG9vbC50eXBlKSB7XHJcbiAgICBjYXNlIHRvb2xUeXBlcy5SQU5HRTogICByZXR1cm4gY3JlYXRlUmFuZ2VUb29sKHRvb2wpO1xyXG4gICAgY2FzZSB0b29sVHlwZXMuU1dJVENIOiAgcmV0dXJuIGNyZWF0ZVN3aXRjaFRvb2wodG9vbCk7XHJcbiAgICBkZWZhdWx0OiAgICAgICAgICAgICAgICByZXR1cm4gJ9Cd0LXQuNC30LLQtdGB0YLQvdGL0Lkg0L/RgNC40LHQvtGAJztcclxuICB9XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGNyZWF0ZVJhbmdlVG9vbCh0b29sKSB7XHJcbiAgY29uc3QgZGl2SW5wdXQgPSBub2RlRmFjdG9yeSgnZGl2JywgeyBjbGFzc0xpc3Q6IFsncmFuZ2UnXSB9KTtcclxuXHJcbiAgY29uc3Qgc3Bhbk1pbiA9IG5vZGVGYWN0b3J5KCdzcGFuJywgeyB0ZXh0Q29udGVudDogdG9vbC5taW4gfSk7XHJcbiAgZGl2SW5wdXQuYXBwZW5kQ2hpbGQoc3Bhbk1pbilcclxuXHJcbiAgY29uc3QgaW5wdXQgPSBub2RlRmFjdG9yeSgnaW5wdXQnLCB7XHJcbiAgICBhdHRyczoge1xyXG4gICAgICAnZGF0YS1pZCc6IHRvb2wuaWQsXHJcbiAgICAgICdkYXRhLXR5cGUnOiAncmFuZ2UnLFxyXG4gICAgICAnbmFtZSc6IHRvb2wubmFtZSxcclxuICAgICAgJ3R5cGUnOiAncmFuZ2UnLFxyXG4gICAgICAnbWluJzogdG9vbC5taW4sXHJcbiAgICAgICdtYXgnOiB0b29sLm1heFxyXG4gICAgfVxyXG4gIH0pO1xyXG4gIGRpdklucHV0LmFwcGVuZENoaWxkKGlucHV0KTtcclxuXHJcbiAgY29uc3Qgc3Bhbk1heCA9IG5vZGVGYWN0b3J5KCdzcGFuJywgeyB0ZXh0Q29udGVudDogdG9vbC5tYXggfSk7XHJcbiAgZGl2SW5wdXQuYXBwZW5kQ2hpbGQoc3Bhbk1heCk7XHJcblxyXG4gIGNvbnN0IGRpdkN1cnJlbnQgPSBub2RlRmFjdG9yeSgnZGl2JywgeyBjbGFzc0xpc3Q6IFsncmFuZ2UtY3VycmVudC12YWx1ZSddIH0pO1xyXG4gIGNvbnN0IHNwYW5DdXJyZW50ID0gbm9kZUZhY3RvcnkoJ3NwYW4nLCB7IHRleHRDb250ZW50OiBpbnB1dC52YWx1ZSB9KTtcclxuICBkaXZDdXJyZW50LmFwcGVuZENoaWxkKHNwYW5DdXJyZW50KTtcclxuXHJcbiAgaW5wdXQuYWRkRXZlbnRMaXN0ZW5lcignaW5wdXQnLCAoZXZ0KSA9PiB7XHJcbiAgICBzcGFuQ3VycmVudC50ZXh0Q29udGVudCA9IGV2dC50YXJnZXQudmFsdWU7XHJcbiAgfSk7XHJcblxyXG4gIGNvbnN0IGZyYWdtZW50ID0gZG9jdW1lbnQuY3JlYXRlRG9jdW1lbnRGcmFnbWVudCgpO1xyXG4gIGZyYWdtZW50LmFwcGVuZENoaWxkKGRpdklucHV0KTtcclxuICBmcmFnbWVudC5hcHBlbmRDaGlsZChkaXZDdXJyZW50KTtcclxuXHJcbiAgcmV0dXJuIGZyYWdtZW50O1xyXG59XHJcblxyXG5mdW5jdGlvbiBjcmVhdGVTd2l0Y2hUb29sKHRvb2wpIHtcclxuICBjb25zdCBsYWJlbCA9IG5vZGVGYWN0b3J5KCdsYWJlbCcsIHsgY2xhc3NMaXN0OiBbJ3N3aXRjaCddIH0pO1xyXG5cclxuICBjb25zdCBpbnB1dCA9IG5vZGVGYWN0b3J5KCdpbnB1dCcsIHtcclxuICAgIGF0dHJzOiB7XHJcbiAgICAgICdkYXRhLWlkJzogdG9vbC5pZCxcclxuICAgICAgJ2RhdGEtdHlwZSc6ICdzd2l0Y2gnLFxyXG4gICAgICAndHlwZSc6ICdjaGVja2JveCdcclxuICAgIH1cclxuICB9KTtcclxuICBsYWJlbC5hcHBlbmRDaGlsZChpbnB1dCk7XHJcblxyXG4gIGNvbnN0IGRpdiA9IG5vZGVGYWN0b3J5KCdkaXYnLCB7IGNsYXNzTGlzdDogWydzbGlkZXInXSB9KTtcclxuICBsYWJlbC5hcHBlbmRDaGlsZChkaXYpO1xyXG5cclxuICByZXR1cm4gbGFiZWw7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGdldFRvb2xzRGF0YSgpIHtcclxuICBjb25zdCB0b29sc0RhdGEgPSBbXTtcclxuICBjb25zdCBpbnB1dHMgPSAkdG9vbHMucXVlcnlTZWxlY3RvckFsbCgnaW5wdXRbZGF0YS1pZF0nKTtcclxuICBpbnB1dHMuZm9yRWFjaChpbnB1dCA9PiB7XHJcbiAgICBjb25zdCB7IGlkLCB0eXBlIH0gPSBpbnB1dC5kYXRhc2V0O1xyXG4gICAgbGV0IHZhbHVlO1xyXG4gICAgc3dpdGNoKHR5cGUpIHtcclxuICAgICAgY2FzZSB0b29sVHlwZXMuUkFOR0U6IHZhbHVlID0gcGFyc2VJbnQoaW5wdXQudmFsdWUpOyBicmVhaztcclxuICAgICAgY2FzZSB0b29sVHlwZXMuU1dJVENIOiB2YWx1ZSA9IGlucHV0LmNoZWNrZWQ7IGJyZWFrO1xyXG4gICAgICBkZWZhdWx0OiB0aHJvdyBuZXcgRXJyb3IoYNCd0LXQutC+0YDRgNC10LrRgtC90YvQuSDRgtC40L8g0L/RgNC40LHQvtGA0LAuIElEOiAke2lkfWApO1xyXG4gICAgfVxyXG4gICAgdG9vbHNEYXRhLnB1c2goeyBpZCwgdmFsdWUgfSk7XHJcbiAgfSk7XHJcbiAgcmV0dXJuIHRvb2xzRGF0YTtcclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQge1xyXG4gIGluaXQsXHJcbiAgZ2V0VG9vbHNEYXRhXHJcbn07XHJcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2xlYXJuaW5nL3NjZW5lX2NvbXBvbmVudHMvdG9vbHMuanMiLCJpbXBvcnQgJy4uLy4uL3Nhc3MvbGVhcm5pbmcuc2Nzcyc7XHJcblxyXG5pbXBvcnQgcHVic3ViIGZyb20gJy4uL3V0aWxzL3B1YnN1Yic7XHJcbmltcG9ydCBhamF4IGZyb20gJy4uL3V0aWxzL2FqYXgnO1xyXG5pbXBvcnQgc2NlbmUgZnJvbSAnLi9zY2VuZSc7XHJcbmltcG9ydCBNb2RlbCBmcm9tICcuL21vZGVsJztcclxuXHJcbi8qKlxyXG4gKiBMb2FkIG1vZGVsIHdpdGggZ2l2ZW4gaWRcclxuICovXHJcbmZ1bmN0aW9uIGxvYWRNb2RlbChpZCkge1xyXG4gIHJldHVybiBhamF4KGAvbW9kZWxzLyR7aWR9YCkudGhlbihyZXNwb25zZSA9PiBKU09OLnBhcnNlKHJlc3BvbnNlKSk7XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBVSSBidXR0b24ncyBoYW5kbGVyc1xyXG4gKi9cclxuY29uc3QgJHNlbGVjdCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjbW9kZWwtc2VsZWN0XCIpO1xyXG5jb25zdCAkbG9hZEJ1dHRvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNsb2FkLW1vZGVsLWJ0bicpO1xyXG5sZXQgbW9kZWwgPSBudWxsO1xyXG4kbG9hZEJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcclxuICBjb25zdCBtb2RlbElkID0gJHNlbGVjdC52YWx1ZTtcclxuICBsb2FkTW9kZWwobW9kZWxJZClcclxuICAgIC50aGVuKHJlc3BvbnNlID0+IHtcclxuICAgICAgbW9kZWwgPSBuZXcgTW9kZWwocmVzcG9uc2UpO1xyXG4gICAgICBzY2VuZS5pbml0KG1vZGVsLCByZXNwb25zZSkuc2hvd0NvbnRlbnQoKS5lbmFibGVCdXR0b25zKCRzdGFydEJ1dHRvbik7XHJcbiAgICB9KVxyXG4gICAgLmNhdGNoKGVyciA9PiB7IGNvbnNvbGUuZXJyb3IoZXJyKSB9KTtcclxufSk7XHJcbi8vXHJcbmNvbnN0ICRzdGFydEJ1dHRvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNzdGFydC1idG4nKTtcclxuJHN0YXJ0QnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xyXG4gIG1vZGVsLnN0YXJ0KCk7XHJcbiAgc2NlbmUuZGlzYWJsZUJ1dHRvbnMoJHN0YXJ0QnV0dG9uKTtcclxuICBzY2VuZS5lbmFibGVCdXR0b25zKCRzdG9wQnV0dG9uLCAkcnVuQnV0dG9uKTtcclxufSk7XHJcblxyXG5jb25zdCAkc3RvcEJ1dHRvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNzdG9wLWJ0bicpO1xyXG4kc3RvcEJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcclxuICBtb2RlbC5zdG9wKCk7IC8vIFRPRE9cclxuICBzY2VuZS5lbmFibGVCdXR0b25zKCRzdGFydEJ1dHRvbik7XHJcbiAgc2NlbmUuZGlzYWJsZUJ1dHRvbnMoJHN0b3BCdXR0b24sICRydW5CdXR0b24pO1xyXG59KTtcclxuXHJcbmNvbnN0ICRydW5CdXR0b24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjcnVuLWJ0bicpO1xyXG4kcnVuQnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xyXG4gIGNvbnN0IHRvb2xzRGF0YSA9IHNjZW5lLmdldFRvb2xzRGF0YSgpO1xyXG4gIHB1YnN1Yi5wdWJsaXNoKCd1c2VyX2lucHV0JywgdG9vbHNEYXRhKTtcclxufSk7XHJcblxyXG4vKipcclxuICogSGFuZGxlIGN1c3RvbSBldmVudHMgaGVyZSAodXNlciBpbnB1dCwgcHJvZ3JhbW0gbWVzc2FnZXMgZXRjLilcclxuICovXHJcbnB1YnN1Yi5zdWJzY3JpYmUoJ25ld19zdGF0ZScsIHN0YXRlID0+IHtcclxuICBzY2VuZS5oaWRlRXZlbnQoKTtcclxuICBzY2VuZS5zZXRTdGF0ZShzdGF0ZSk7XHJcbn0pO1xyXG5wdWJzdWIuc3Vic2NyaWJlKCdldmVudCcsIGV2ZW50ID0+IHNjZW5lLnNob3dFdmVudChldmVudCkpO1xyXG5cclxuLyoqXHJcbiogVGltZXIgKGN1cnJlbnRseSBmb3IgZGV2IG1vZGUgb25seSlcclxuKi9cclxuaW1wb3J0IHRpbWVyIGZyb20gJy4uL3V0aWxzL3RpbWVyJztcclxuZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmhlYWRlcicpLmFwcGVuZENoaWxkKHRpbWVyLm5vZGUpO1xyXG5wdWJzdWIuc3Vic2NyaWJlKCduZXdfc3RhdGUnLCBzdGF0ZSA9PiB0aW1lci5zdG9wKCkpO1xyXG5wdWJzdWIuc3Vic2NyaWJlKCdldmVudCcsIGV2ZW50ID0+IHRpbWVyLnN0YXJ0KCkpO1xyXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9sZWFybmluZy9pbmRleC5qcyIsImltcG9ydCBub2RlRmFjdG9yeSBmcm9tICcuL25vZGVGYWN0b3J5JztcclxuXHJcbmZ1bmN0aW9uIG1zVG9Db250ZW50KG1zKSB7XHJcbiAgY29uc3Qgc2Vjb25kcyA9IE1hdGgucm91bmQobXMgLyAxMDAwKTtcclxuICBjb25zdCBtaW5zID0gTWF0aC5mbG9vcihzZWNvbmRzIC8gNjApO1xyXG4gIGNvbnN0IHNlY29uZHNMZWZ0ID0gc2Vjb25kcyAtIChtaW5zICogNjApO1xyXG5cclxuICByZXR1cm4gYCR7bWluc306JHtzZWNvbmRzTGVmdCA+PSAxMCA/ICcnIDogJzAnfSR7c2Vjb25kc0xlZnR9YDtcclxufVxyXG5cclxuY29uc3QgdGltZXIgPSB7XHJcbiAgc3RhcnRUaW1lOiBudWxsLFxyXG4gIGludGVydmFsOiBudWxsLFxyXG4gIG5vZGU6IG5vZGVGYWN0b3J5KCdzcGFuJywgeyBjbGFzc0xpc3Q6IFsndGltZXInXSwgdGV4dENvbnRlbnQ6ICcwOjAwJyB9KSxcclxuICBzdGFydDogZnVuY3Rpb24oKSB7XHJcbiAgICB0aGlzLnN0YXJ0VGltZSA9IERhdGUubm93KCk7XHJcbiAgICB0aGlzLmludGVydmFsID0gc2V0SW50ZXJ2YWwoKCkgPT4ge1xyXG4gICAgICBjb25zdCBlbGFwc2VkID0gRGF0ZS5ub3coKSAtIHRoaXMuc3RhcnRUaW1lO1xyXG4gICAgICB0aGlzLm5vZGUudGV4dENvbnRlbnQgPSBtc1RvQ29udGVudChlbGFwc2VkKTtcclxuICAgIH0sIDEwMDApO1xyXG4gIH0sXHJcbiAgc3RvcDogZnVuY3Rpb24oKSB7XHJcbiAgICBpZiAoIXRoaXMuc3RhcnRUaW1lKSB7IHJldHVybjsgfVxyXG4gICAgdGhpcy5zdGFydFRpbWUgPSBudWxsO1xyXG4gICAgY2xlYXJJbnRlcnZhbCh0aGlzLmludGVydmFsKTtcclxuICAgIHRoaXMubm9kZS50ZXh0Q29udGVudCA9ICcwOjAwJztcclxuICB9XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IHRpbWVyO1xyXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi91dGlscy90aW1lci5qcyJdLCJzb3VyY2VSb290IjoiIn0=