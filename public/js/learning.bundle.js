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
    this.currentState = this.getState(data.id);

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
        _pubsub2.default.publish('event', { event: event });

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
        var inactiveTime = event.getInactiveTime();
        _this3.timeout = setTimeout(function () {
          var nextStateId = event.getInactiveAction().nextState;
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
          return obj.id === tool.id;
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
  var toolsData = {};
  var inputs = this.$toolsBox.querySelectorAll('input[data-id]');
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
    toolsData[id] = value;
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
// $runButton.addEventListener('click', () => {
//   const toolsData = scene.getToolsData();
//   pubsub.publish('user_input', toolsData);
// });
//
// /**
//  * Handle custom events here (user input, programm messages etc.)
//  */
// pubsub.subscribe('new_state', state => scene.setState(state));
// pubsub.subscribe('event', data => scene.setEvent(data.event));

/***/ })
/******/ ]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgODNkZmFlOWIxNzYxYzY0NWI4NGMiLCJ3ZWJwYWNrOi8vLy4vdXRpbHMvcHVic3ViLmpzIiwid2VicGFjazovLy8uL3V0aWxzL25vZGVGYWN0b3J5LmpzIiwid2VicGFjazovLy8uL2xlYXJuaW5nL21vZGVsLmpzIiwid2VicGFjazovLy8uL2xlYXJuaW5nL3NjZW5lLmpzIiwid2VicGFjazovLy8uL3V0aWxzL2FqYXguanMiLCJ3ZWJwYWNrOi8vLy4uL3Nhc3MvbGVhcm5pbmcuc2NzcyIsIndlYnBhY2s6Ly8vLi9sZWFybmluZy9tb2RlbF9jb21wb25lbnRzL2FjdGlvbi5qcyIsIndlYnBhY2s6Ly8vLi9sZWFybmluZy9tb2RlbF9jb21wb25lbnRzL2V2ZW50LmpzIiwid2VicGFjazovLy8uL2xlYXJuaW5nL21vZGVsX2NvbXBvbmVudHMvc3RhdGUuanMiLCJ3ZWJwYWNrOi8vLy4vbGVhcm5pbmcvc2NlbmVfY29tcG9uZW50cy9zdGF0ZS5qcyIsIndlYnBhY2s6Ly8vLi9sZWFybmluZy9zY2VuZV9jb21wb25lbnRzL3Rvb2xzLmpzIiwid2VicGFjazovLy8uL2xlYXJuaW5nL2luZGV4LmpzIl0sIm5hbWVzIjpbInB1YnN1YiIsInRvcGljcyIsInN1YnNjcmliZSIsInRvcGljIiwibGlzdGVuZXIiLCJxdWV1ZSIsImluZGV4IiwicHVzaCIsInJlbW92ZSIsInB1Ymxpc2giLCJpbmZvIiwibGVuZ3RoIiwiaXRlbXMiLCJmb3JFYWNoIiwiaXRlbSIsIm5vZGVGYWN0b3J5IiwidHlwZSIsInBhcmFtcyIsIm5vZGUiLCJkb2N1bWVudCIsImNyZWF0ZUVsZW1lbnQiLCJhcHBlbmRDbGFzc2VzIiwiYXBwZW5kQXR0cnMiLCJpbnNlcnRUZXh0Q29udGVudCIsImNsYXNzTGlzdCIsImFkZCIsImNsYXNzTmFtZSIsImF0dHJzIiwiYXR0ck5hbWVzIiwiT2JqZWN0Iiwia2V5cyIsInNldEF0dHJpYnV0ZSIsImF0dHJOYW1lIiwidGV4dENvbnRlbnQiLCJNb2RlbCIsImRhdGEiLCJpZCIsIm5hbWUiLCJicmVha1RpbWUiLCJzdGVwcyIsInN0YXRlcyIsIm1hcCIsInN0YXRlIiwiY3VycmVudFN0YXRlIiwiZ2V0U3RhdGUiLCJ0aW1lb3V0Iiwic3Vic2NyaWJ0aW9uIiwiZmluZCIsImludGVydmFscyIsIlByb21pc2UiLCJyZXNvbHZlIiwiaSIsInRoZW4iLCJtYWtlQnJlYWsiLCJoYW5kbGVFdmVudCIsImhhbmRsZU5ld1N0YXRlIiwiY2F0Y2giLCJyZWplY3QiLCJzZXRUaW1lb3V0IiwiZXZlbnQiLCJldmVudFN0YXJ0VGltZSIsIkRhdGUiLCJub3ciLCJ0aW1lU3BlbnQiLCJuZXh0U3RhdGVJZCIsImhhbmRsZUlucHV0IiwibmV4dFN0YXRlIiwibGFzdCIsImluYWN0aXZlVGltZSIsImdldEluYWN0aXZlVGltZSIsImdldEluYWN0aXZlQWN0aW9uIiwiY2xlYXJUaW1lb3V0Iiwic3Vic2NyaXB0aW9uIiwiZXhwb3J0cyIsIiRtb2RlbE5hbWUiLCJxdWVyeVNlbGVjdG9yIiwiaW5pdCIsIm1vZGVsIiwicmVzcG9uc2UiLCJzZXQiLCJ0b29scyIsIiRjb250ZW50Iiwic2hvd0NvbnRlbnQiLCJzZXRDb250ZW50RGlzcGxheSIsImhpZGVDb250ZW50IiwiZGlzcGxheSIsInN0eWxlIiwiZW5hYmxlQnV0dG9ucyIsImJ1dHRvbnMiLCJzZXRCdXR0b25zU3RhdGUiLCJkaXNhYmxlQnV0dG9ucyIsInZhbHVlIiwiYnV0dG9uIiwiZGlzYWJsZWQiLCJhamF4IiwicGF0aCIsIm9wdGlvbnMiLCJ4aHIiLCJYTUxIdHRwUmVxdWVzdCIsIm9wZW4iLCJtZXRob2QiLCJoZWFkZXJzIiwic2V0WEhSSGVhZGVycyIsInNlbmQiLCJvbnJlYWR5c3RhdGVjaGFuZ2UiLCJyZWFkeVN0YXRlIiwic3RhdHVzIiwicmVzcG9uc2VUZXh0Iiwic3RhdHVzVGV4dCIsImhlYWRlciIsInNldFJlcXVlc3RIZWFkZXIiLCJBY3Rpb24iLCJtaW5UaW1lIiwibWF4VGltZSIsImluYWN0aXZlIiwidGltZSIsInJpZ2h0VGltZSIsInJpZ2h0RGF0YSIsIkFycmF5IiwiaXNBcnJheSIsIlR5cGVFcnJvciIsImV2ZXJ5IiwiY2hlY2tUb29sIiwib2JqIiwidG9vbCIsImluY2x1ZGVzVmFsdWUiLCJib3JkZXJzIiwiRXZlbnQiLCJkZXNjcmlwdGlvbiIsIlN0YXRlIiwiaW1nIiwiYWN0aW9ucyIsImFjdGlvbiIsInRpbWVzIiwiZ2V0QWxsQWN0aW9uVGltZXMiLCJNYXRoIiwibWF4Iiwic3VpdGVkQWN0aW9ucyIsImZpbHRlciIsImlzU3VpdGFibGUiLCIkbmFtZSIsIiRpbWciLCIkcGFyYW1zIiwiJGV2ZW50IiwiJGV2ZW50SGVhZGVyIiwiJGV2ZW50Qm9keSIsIiRyZXNwb25zZSIsInNldFBhcmFtZXRlcnMiLCJmcmFnIiwiY3JlYXRlRG9jdW1lbnRGcmFnbWVudCIsImtleSIsImFwcGVuZENoaWxkIiwiY3JlYXRlUGFyYW1ldGVOb2RlIiwiaW5uZXJIVE1MIiwiZGl2Iiwia2V5U3BhbiIsInZhbHVlU3BhbiIsInNob3dFdmVudCIsImhpZGVFdmVudCIsInRvb2xUeXBlcyIsIlJBTkdFIiwiU1dJVENIIiwiJHRvb2xzIiwiZnJhZ21lbnQiLCJsYWJlbCIsInRvb2xOb2RlIiwiY3JlYXRlVG9vbE5vZGUiLCJjcmVhdGVSYW5nZVRvb2wiLCJjcmVhdGVTd2l0Y2hUb29sIiwiZGl2SW5wdXQiLCJzcGFuTWluIiwibWluIiwiaW5wdXQiLCJzcGFuTWF4IiwiZGl2Q3VycmVudCIsInNwYW5DdXJyZW50IiwiYWRkRXZlbnRMaXN0ZW5lciIsImV2dCIsInRhcmdldCIsImdldFRvb2xzRGF0YSIsInRvb2xzRGF0YSIsImlucHV0cyIsIiR0b29sc0JveCIsInF1ZXJ5U2VsZWN0b3JBbGwiLCJkYXRhc2V0IiwicGFyc2VJbnQiLCJjaGVja2VkIiwiRXJyb3IiLCJsb2FkTW9kZWwiLCJKU09OIiwicGFyc2UiLCIkc2VsZWN0IiwiJGxvYWRCdXR0b24iLCJtb2RlbElkIiwiJHN0YXJ0QnV0dG9uIiwiY29uc29sZSIsImVycm9yIiwiZXJyIiwic3RhcnQiLCIkc3RvcEJ1dHRvbiIsIiRydW5CdXR0b24iLCJzdG9wIl0sIm1hcHBpbmdzIjoiO0FBQUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0EsbURBQTJDLGNBQWM7O0FBRXpEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBSztBQUNMO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsbUNBQTJCLDBCQUEwQixFQUFFO0FBQ3ZELHlDQUFpQyxlQUFlO0FBQ2hEO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLDhEQUFzRCwrREFBK0Q7O0FBRXJIO0FBQ0E7O0FBRUE7QUFDQTs7Ozs7Ozs7Ozs7OztBQ2hFQSxJQUFNQSxTQUFVLFlBQVc7O0FBRXpCLE1BQU1DLFNBQVMsRUFBZjs7QUFFQSxTQUFPO0FBQ0xDLGVBQVcsbUJBQVNDLEtBQVQsRUFBZ0JDLFFBQWhCLEVBQTBCO0FBQ25DLFVBQUksQ0FBQ0gsT0FBT0UsS0FBUCxDQUFMLEVBQW9CRixPQUFPRSxLQUFQLElBQWdCLEVBQUVFLE9BQU8sRUFBVCxFQUFoQjs7QUFFcEIsVUFBTUMsUUFBUUwsT0FBT0UsS0FBUCxFQUFjRSxLQUFkLENBQW9CRSxJQUFwQixDQUF5QkgsUUFBekIsSUFBcUMsQ0FBbkQ7QUFDQTtBQUNBLGFBQU87QUFDTEksZ0JBQVEsa0JBQVc7QUFDakIsaUJBQU9QLE9BQU9FLEtBQVAsRUFBY0UsS0FBZCxDQUFvQkMsS0FBcEIsQ0FBUDtBQUNEO0FBSEksT0FBUDtBQUtELEtBWEk7O0FBYUxHLGFBQVMsaUJBQVNOLEtBQVQsRUFBZ0JPLElBQWhCLEVBQXNCO0FBQzdCO0FBQ0EsVUFBSSxDQUFDVCxPQUFPRSxLQUFQLENBQUQsSUFBa0IsQ0FBQ0YsT0FB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RDs7QUFNQSxJQUFNRCxjQUFjcEwsU0FBU3dELGFBQVQsQ0FBdUIsV0FBdkIsQ0FBcEI7QUFDQTRILFlBQVl2QixnQkFBWixDQUE2QixPQUE3QixFQUFzQyxZQUFNO0FBQzFDbkcsUUFBTTRILElBQU4sR0FEMEMsQ0FDNUI7QUFDZCxrQkFBTWxILGFBQU4sQ0FBb0IyRyxZQUFwQjtBQUNBLGtCQUFNeEcsY0FBTixDQUFxQjZHLFdBQXJCLEVBQWtDQyxVQUFsQztBQUNELENBSkQ7O0FBTUEsSUFBTUEsYUFBYXJMLFNBQVN3RCxhQUFULENBQXVCLFVBQXZCLENBQW5CO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUUiLCJmaWxlIjoibGVhcm5pbmcuYnVuZGxlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pXG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG5cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGlkZW50aXR5IGZ1bmN0aW9uIGZvciBjYWxsaW5nIGhhcm1vbnkgaW1wb3J0cyB3aXRoIHRoZSBjb3JyZWN0IGNvbnRleHRcbiBcdF9fd2VicGFja19yZXF1aXJlX18uaSA9IGZ1bmN0aW9uKHZhbHVlKSB7IHJldHVybiB2YWx1ZTsgfTtcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7XG4gXHRcdFx0XHRjb25maWd1cmFibGU6IGZhbHNlLFxuIFx0XHRcdFx0ZW51bWVyYWJsZTogdHJ1ZSxcbiBcdFx0XHRcdGdldDogZ2V0dGVyXG4gXHRcdFx0fSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gMTEpO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIHdlYnBhY2svYm9vdHN0cmFwIDgzZGZhZTliMTc2MWM2NDViODRjIiwiY29uc3QgcHVic3ViID0gKGZ1bmN0aW9uKCkge1xyXG5cclxuICBjb25zdCB0b3BpY3MgPSB7fTtcclxuXHJcbiAgcmV0dXJuIHtcclxuICAgIHN1YnNjcmliZTogZnVuY3Rpb24odG9waWMsIGxpc3RlbmVyKSB7XHJcbiAgICAgIGlmICghdG9waWNzW3RvcGljXSkgdG9waWNzW3RvcGljXSA9IHsgcXVldWU6IFtdIH07XHJcblxyXG4gICAgICBjb25zdCBpbmRleCA9IHRvcGljc1t0b3BpY10ucXVldWUucHVzaChsaXN0ZW5lcikgLSAxO1xyXG4gICAgICAvLyBmdW5jdGlvbiB0byBkZWxldGUgdG9waWNcclxuICAgICAgcmV0dXJuIHtcclxuICAgICAgICByZW1vdmU6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgZGVsZXRlIHRvcGljc1t0b3BpY10ucXVldWVbaW5kZXhdO1xyXG4gICAgICAgIH1cclxuICAgICAgfTtcclxuICAgIH0sXHJcblxyXG4gICAgcHVibGlzaDogZnVuY3Rpb24odG9waWMsIGluZm8pIHtcclxuICAgICAgLy8gbm8gdGhlbWUgb3Igbm8gbGlzdGVuZXJzXHJcbiAgICAgIGlmICghdG9waWNzW3RvcGljXSB8fCAhdG9waWNzW3RvcGljXS5xdWV1ZS5sZW5ndGgpIHJldHVybjtcclxuXHJcbiAgICAgIGNvbnN0IGl0ZW1zID0gdG9waWNzW3RvcGljXS5xdWV1ZTtcclxuICAgICAgaXRlbXMuZm9yRWFjaChpdGVtID0+IHtcclxuICAgICAgICBpdGVtKGluZm8gfHwge30pO1xyXG4gICAgICB9KTtcclxuICAgIH1cclxuICB9O1xyXG59KSgpO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgcHVic3ViO1xyXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi91dGlscy9wdWJzdWIuanMiLCJjb25zdCBub2RlRmFjdG9yeSA9IGZ1bmN0aW9uKHR5cGUgPSAnZGl2JywgcGFyYW1zKSB7XHJcbiAgY29uc3Qgbm9kZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQodHlwZSk7XHJcblxyXG4gIGFwcGVuZENsYXNzZXMobm9kZSwgcGFyYW1zKTtcclxuICBhcHBlbmRBdHRycyhub2RlLCBwYXJhbXMpO1xyXG4gIGluc2VydFRleHRDb250ZW50KG5vZGUsIHBhcmFtcyk7XHJcblxyXG4gIHJldHVybiBub2RlO1xyXG59XHJcblxyXG5mdW5jdGlvbiBhcHBlbmRDbGFzc2VzKG5vZGUsIHsgY2xhc3NMaXN0IH0pIHtcclxuICBpZiAoY2xhc3NMaXN0ICYmIGNsYXNzTGlzdC5mb3JFYWNoKSB7XHJcbiAgICBjbGFzc0xpc3QuZm9yRWFjaChjbGFzc05hbWUgPT4gbm9kZS5jbGFzc0xpc3QuYWRkKGNsYXNzTmFtZSkpO1xyXG4gIH1cclxufVxyXG5cclxuZnVuY3Rpb24gYXBwZW5kQXR0cnMobm9kZSwgeyBhdHRycyB9KSB7XHJcbiAgaWYgKGF0dHJzKSB7XHJcbiAgICBjb25zdCBhdHRyTmFtZXMgPSBPYmplY3Qua2V5cyhhdHRycyk7XHJcbiAgICBhdHRyTmFtZXMuZm9yRWFjaChhdHRyTmFtZSA9PiBub2RlLnNldEF0dHJpYnV0ZShhdHRyTmFtZSwgYXR0cnNbYXR0ck5hbWVdKSk7XHJcbiAgfVxyXG59XHJcblxyXG5mdW5jdGlvbiBpbnNlcnRUZXh0Q29udGVudChub2RlLCB7IHRleHRDb250ZW50ID0gXCJcIiB9KSB7XHJcbiAgbm9kZS50ZXh0Q29udGVudCA9IHRleHRDb250ZW50O1xyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBub2RlRmFjdG9yeTtcclxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vdXRpbHMvbm9kZUZhY3RvcnkuanMiLCJpbXBvcnQgU3RhdGUgZnJvbSAnLi9tb2RlbF9jb21wb25lbnRzL3N0YXRlJztcclxuaW1wb3J0IHB1YnN1YiBmcm9tICcuLi91dGlscy9wdWJzdWInO1xyXG5cclxuY2xhc3MgTW9kZWwge1xyXG4gIGNvbnN0cnVjdG9yKGRhdGEpIHtcclxuICAgIHRoaXMuaWQgPSBkYXRhLmlkO1xyXG4gICAgdGhpcy5uYW1lID0gZGF0YS5uYW1lO1xyXG4gICAgdGhpcy5icmVha1RpbWUgPSBkYXRhLmJyZWFrVGltZTtcclxuICAgIHRoaXMuc3RlcHMgPSBkYXRhLnN0ZXBzO1xyXG5cclxuICAgIHRoaXMuc3RhdGVzID0gZGF0YS5zdGF0ZXMubWFwKHN0YXRlID0+IG5ldyBTdGF0ZShzdGF0ZSkpO1xyXG4gICAgdGhpcy5jdXJyZW50U3RhdGUgPSB0aGlzLmdldFN0YXRlKGRhdGEuaWQpO1xyXG5cclxuICAgIHRoaXMudGltZW91dCA9IG51bGw7XHJcbiAgICB0aGlzLnN1YnNjcmlidGlvbiA9IG51bGw7XHJcbiAgfVxyXG5cclxuICBnZXRTdGF0ZShpZCkge1xyXG4gICAgcmV0dXJuIHRoaXMuc3RhdGVzLmZpbmQoc3RhdGUgPT4gc3RhdGUuaWQgPT0gaWQpO1xyXG4gIH1cclxuXHJcbiAgc3RhcnQoKSB7XHJcbiAgICBsZXQgaW50ZXJ2YWxzID0gUHJvbWlzZS5yZXNvbHZlKCk7IC8vIGluaXQgcHJvbWlzZSBjaGFpblxyXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLnN0ZXBzOyBpKyspIHtcclxuICAgICAgaW50ZXJ2YWxzID0gaW50ZXJ2YWxzXHJcbiAgICAgICAudGhlbigoKSA9PiB7IHJldHVybiB0aGlzLm1ha2VCcmVhaygpIH0pXHJcbiAgICAgICAudGhlbigoKSA9PiB7IHJldHVybiB0aGlzLmhhbmRsZUV2ZW50KCkgfSlcclxuICAgICAgIC50aGVuKHN0YXRlID0+IHsgdGhpcy5oYW5kbGVOZXdTdGF0ZShzdGF0ZSkgfSlcclxuICAgIH1cclxuICAgIGludGVydmFscy5jYXRjaChzdGF0ZSA9PiB7IHB1YnN1Yi5wdWJsaXNoKCduZXdfc3RhdGUnLCAgc3RhdGUpIH0pO1xyXG4gICAgcmV0dXJuIGludGVydmFscztcclxuICB9XHJcblxyXG4gIG1ha2VCcmVhaygpIHtcclxuICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XHJcbiAgICAgIHNldFRpbWVvdXQoKCkgPT4geyByZXNvbHZlKCkgfSwgdGhpcy5icmVha1RpbWUpO1xyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICBoYW5kbGVFdmVudCgpIHtcclxuICAgIGNvbnN0IGV2ZW50ID0gdGhpcy5jdXJyZW50U3RhdGUuZXZlbnQ7XHJcbiAgICBjb25zdCBldmVudFN0YXJ0VGltZSA9IERhdGUubm93KCk7XHJcbiAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xyXG4gICAgICAvLyBzZW5kIGRhdGEgYWJvdXQgbmV3IGV2ZW50IHRvIG90aGVyIG1vZHVsZXNcclxuICAgICAgcHVic3ViLnB1Ymxpc2goJ2V2ZW50JywgeyBldmVudCB9KTtcclxuXHJcbiAgICAgIC8vIGxpc3RlbiB0byB1c2VyIGFjdGlvblxyXG4gICAgICAvLyBhbmQgaWYgdXNlciBpbnB1dCBjb3JyZWN0IGdvIHRvIG5leHQgc3RhdGVcclxuICAgICAgdGhpcy5zdWJzY3JpYnRpb24gPSBwdWJzdWIuc3Vic2NyaWJlKCd1c2VyX2lucHV0JywgZGF0YSA9PiB7XHJcbiAgICAgICAgY29uc3QgdGltZVNwZW50ID0gRGF0ZS5ub3coKSAtIGV2ZW50U3RhcnRUaW1lO1xyXG4gICAgICAgIGNvbnN0IG5leHRTdGF0ZUlkID0gdGhpcy5jdXJyZW50U3RhdGUuaGFuZGxlSW5wdXQoZGF0YSwgdGltZVNwZW50KTtcclxuICAgICAgICBjb25zdCBuZXh0U3RhdGUgPSB0aGlzLmdldFN0YXRlKG5leHRTdGF0ZUlkKTtcclxuICAgICAgICBpZiAobmV4dFN0YXRlKSB7XHJcbiAgICAgICAgICBuZXh0U3RhdGUubGFzdCA/IHJlamVjdChuZXh0U3RhdGUpIDogcmVzb2x2ZShuZXh0U3RhdGUpO1xyXG4gICAgICAgIH1cclxuICAgICAgfSlcclxuXHJcbiAgICAgIC8vIGhhbmRsZSBpbmFjdGl2ZVxyXG4gICAgICBjb25zdCBpbmFjdGl2ZVRpbWUgPSBldmVudC5nZXRJbmFjdGl2ZVRpbWUoKTtcclxuICAgICAgdGhpcy50aW1lb3V0ID0gc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgY29uc3QgbmV4dFN0YXRlSWQgPSBldmVudC5nZXRJbmFjdGl2ZUFjdGlvbigpLm5leHRTdGF0ZTtcclxuICAgICAgICBjb25zdCBuZXh0U3RhdGUgPSB0aGlzLmdldFN0YXRlKG5leHRTdGF0ZUlkKTtcclxuICAgICAgICBuZXh0U3RhdGUubGFzdCA/IHJlamVjdChuZXh0U3RhdGUpIDogcmVzb2x2ZShuZXh0U3RhdGUpO1xyXG4gICAgICB9LCBpbmFjdGl2ZVRpbWUpO1xyXG4gICAgfSlcclxuICB9XHJcblxyXG4gIGhhbmRsZU5ld1N0YXRlKHN0YXRlKSB7XHJcbiAgICB0aGlzLmN1cnJlbnRTdGF0ZSA9IHN0YXRlO1xyXG4gICAgY2xlYXJUaW1lb3V0KHRoaXMudGltZW91dCk7XHJcbiAgICBpZiAodGhpcy5zdWJzY3JpcHRpb24pIHtcclxuICAgICAgdGhpcy5zdWJzY3JpYnRpb24ucmVtb3ZlKCk7XHJcbiAgICB9XHJcbiAgICBwdWJzdWIucHVibGlzaCgnbmV3X3N0YXRlJywgc3RhdGUpO1xyXG4gIH1cclxuXHJcbiAgLy8gVE9ET1xyXG4gIHN0b3AoKSB7XHJcblxyXG4gIH1cclxuXHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IE1vZGVsO1xyXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9sZWFybmluZy9tb2RlbC5qcyIsImltcG9ydCBzdGF0ZSBmcm9tICcuL3NjZW5lX2NvbXBvbmVudHMvc3RhdGUnO1xyXG5pbXBvcnQgdG9vbHMgZnJvbSAnLi9zY2VuZV9jb21wb25lbnRzL3Rvb2xzJztcclxuXHJcbmNvbnN0IGV4cG9ydHMgPSB7fTtcclxuXHJcbi8vIFNjZW5lIG1ldGFkYXRhXHJcbmNvbnN0ICRtb2RlbE5hbWUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcubW9kZWwtbmFtZScpO1xyXG5leHBvcnRzLmluaXQgPSBmdW5jdGlvbihtb2RlbCwgcmVzcG9uc2UpIHtcclxuICAkbW9kZWxOYW1lLnRleHRDb250ZW50ID0gbW9kZWwubmFtZTtcclxuICBzdGF0ZS5zZXQobW9kZWwuY3VycmVudFN0YXRlKTtcclxuICB0b29scy5pbml0KHJlc3BvbnNlLnRvb2xzKTtcclxuICByZXR1cm4gdGhpcztcclxufVxyXG5cclxuLy8gTWFuYWdlIGNvbnRlbnQgdmlzaWJpbGl0eVxyXG5jb25zdCAkY29udGVudCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5jb250ZW50Jyk7XHJcbmV4cG9ydHMuc2hvd0NvbnRlbnQgPSBmdW5jdGlvbigpIHtcclxuICBzZXRDb250ZW50RGlzcGxheSgnZmxleCcpO1xyXG4gIHJldHVybiB0aGlzO1xyXG59XHJcbmV4cG9ydHMuaGlkZUNvbnRlbnQgPSBmdW5jdGlvbigpIHtcclxuICBzZXRDb250ZW50RGlzcGxheSgnbm9uZScpO1xyXG4gIHJldHVybiB0aGlzO1xyXG59XHJcbmZ1bmN0aW9uIHNldENvbnRlbnREaXNwbGF5KGRpc3BsYXkpIHtcclxuICAkY29udGVudC5zdHlsZS5kaXNwbGF5ID0gZGlzcGxheTtcclxufVxyXG5cclxuLy8gTWFuYWdlIGJ1dHRvbnMgc3RhdGVcclxuZXhwb3J0cy5lbmFibGVCdXR0b25zID0gZnVuY3Rpb24oLi4uYnV0dG9ucykge1xyXG4gIHNldEJ1dHRvbnNTdGF0ZShidXR0b25zLCBmYWxzZSk7XHJcbn1cclxuZXhwb3J0cy5kaXNhYmxlQnV0dG9ucyA9IGZ1bmN0aW9uKC4uLmJ1dHRvbnMpIHtcclxuICBzZXRCdXR0b25zU3RhdGUoYnV0dG9ucywgdHJ1ZSk7XHJcbn1cclxuZnVuY3Rpb24gc2V0QnV0dG9uc1N0YXRlKGJ1dHRvbnMsIHZhbHVlKSB7XHJcbiAgYnV0dG9ucy5mb3JFYWNoKGJ1dHRvbiA9PiBidXR0b24uZGlzYWJsZWQgPSB2YWx1ZSk7XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IGV4cG9ydHM7XHJcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2xlYXJuaW5nL3NjZW5lLmpzIiwiZnVuY3Rpb24gYWpheChwYXRoID0gJycsIG9wdGlvbnMgPSB7fSkge1xyXG4gIGNvbnN0IHhociA9IG5ldyBYTUxIdHRwUmVxdWVzdCgpO1xyXG4gIHhoci5vcGVuKG9wdGlvbnMubWV0aG9kIHx8ICdHRVQnLCBwYXRoLCB0cnVlKTtcclxuICBpZiAob3B0aW9ucy5oZWFkZXJzKSB7IHNldFhIUkhlYWRlcnMoeGhyLCBvcHRpb25zLmhlYWRlcnMpOyB9XHJcbiAgeGhyLnNlbmQob3B0aW9ucy5kYXRhKTtcclxuXHJcbiAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcclxuICAgIHhoci5vbnJlYWR5c3RhdGVjaGFuZ2UgPSBmdW5jdGlvbigpIHtcclxuICAgICAgaWYoeGhyLnJlYWR5U3RhdGUgPT0gNCkge1xyXG4gICAgICAgIGlmKHhoci5zdGF0dXMgPT0gMjAwKSB7XHJcbiAgICAgICAgICByZXNvbHZlKHhoci5yZXNwb25zZVRleHQpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICByZWplY3QoeGhyLnN0YXR1c1RleHQpO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH0pXHJcbn1cclxuXHJcbmZ1bmN0aW9uIHNldFhIUkhlYWRlcnMoeGhyLCBoZWFkZXJzKSB7XHJcbiAgZm9yIChsZXQgaGVhZGVyIGluIGhlYWRlcnMpIHtcclxuICAgIHhoci5zZXRSZXF1ZXN0SGVhZGVyKGhlYWRlciwgaGVhZGVyc1toZWFkZXJzXSk7XHJcbiAgfVxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBhamF4O1xyXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi91dGlscy9hamF4LmpzIiwiLy8gcmVtb3ZlZCBieSBleHRyYWN0LXRleHQtd2VicGFjay1wbHVnaW5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuLi9zYXNzL2xlYXJuaW5nLnNjc3Ncbi8vIG1vZHVsZSBpZCA9IDVcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiY2xhc3MgQWN0aW9uIHtcclxuICBjb25zdHJ1Y3RvcihkYXRhKSB7XHJcbiAgICB0aGlzLm1pblRpbWUgPSBkYXRhLm1pblRpbWU7XHJcbiAgICB0aGlzLm1heFRpbWUgPSBkYXRhLm1heFRpbWU7XHJcbiAgICB0aGlzLm5leHRTdGF0ZSA9IGRhdGEubmV4dFN0YXRlO1xyXG4gICAgaWYgKGRhdGEuaW5hY3RpdmUpIHtcclxuICAgICAgdGhpcy5pbmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgIHRoaXMudG9vbHMgPSBbXTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHRoaXMuaW5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgdGhpcy50b29scyA9IGRhdGEudG9vbHM7XHJcbiAgICB9XHJcblxyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogQHBhcmFtIFt7IGlkOiBOdW1iZXIsIHZhbHVlOiBOdW1iZXIvQm9vbGVhbiB9LCB7Li4ufV1cclxuICAgKiBAcGFyYW0gTnVtYmVyXHJcbiAgICogQHJldHVybiBCb29sZWFuXHJcbiAgICovXHJcbiAgaXNTdWl0YWJsZShkYXRhLCB0aW1lKSB7XHJcbiAgICByZXR1cm4gdGhpcy5yaWdodFRpbWUodGltZSkgJiYgdGhpcy5yaWdodERhdGEoZGF0YSk7XHJcbiAgfVxyXG5cclxuICByaWdodERhdGEoZGF0YSA9IFtdKSB7XHJcbiAgICBpZighQXJyYXkuaXNBcnJheShkYXRhKSkgeyB0aHJvdyBuZXcgVHlwZUVycm9yKGBJbnZhbGlkIHR5cGUgb2YgZGF0YSBmcm9tIHRvb2xzLiBFeHBlY3RlZCBhcnJheSwgZ290ICR7dHlwZW9mIGRhdGF9YCk7IH1cclxuICAgIHJldHVybiB0aGlzLnRvb2xzLmV2ZXJ5KHRvb2wgPT4ge1xyXG4gICAgICAvLyDQldGB0LvQuCDRgdGA0LXQtNC4INC/0L7Qu9GD0YfQtdC90L3Ri9GFINC40YLQtdC80L7QsiDQvdC10YIsINGC0L7Qs9C+INC60L7RgtC+0YDRi9C5INC10YHRgtGMINCyINC00LDQvdC90L7QvCDRjdC60YjQtdC90LVcclxuICAgICAgY29uc3QgY2hlY2tUb29sID0gZGF0YS5maW5kKG9iaiA9PiBvYmouaWQgPT09IHRvb2wuaWQpO1xyXG4gICAgICBpZiAoIWNoZWNrVG9vbCkgeyByZXR1cm4gZmFsc2U7IH1cclxuXHJcbiAgICAgIC8vINCU0LvRjyDQv9C10YDQtdC60LvRjtGH0LDRgtC10LvRj1xyXG4gICAgICBpZiAodHlwZW9mIHRvb2wudmFsdWUgPT09ICdib29sZWFuJykgeyByZXR1cm4gY2hlY2tUb29sLnZhbHVlID09PSB0b29sLnZhbHVlOyB9XHJcblxyXG4gICAgICAvLyDQlNC70Y8g0YDQtdC90LTQttCwXHJcbiAgICAgIGlmIChBcnJheS5pc0FycmF5KHRvb2wudmFsdWUpKSB7IHJldHVybiB0aGlzLmluY2x1ZGVzVmFsdWUoY2hlY2tUb29sLnZhbHVlLCB0b29sLnZhbHVlKSB9XHJcblxyXG4gICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIGluY2x1ZGVzVmFsdWUodmFsdWUsIGJvcmRlcnMpIHtcclxuICAgIGlmICh0eXBlb2YgdmFsdWUgIT09ICdudW1iZXInKSB0aHJvdyBuZXcgVHlwZUVycm9yKCdWYWx1ZSBzaG91bGQgYmUgaW50ZWdlcicpO1xyXG4gICAgcmV0dXJuICh2YWx1ZSA+PSBib3JkZXJzWzBdKSAmJiAodmFsdWUgPD0gYm9yZGVyc1sxXSk7XHJcbiAgfVxyXG5cclxuICByaWdodFRpbWUodGltZSkge1xyXG4gICAgaWYgKHR5cGVvZiB0aW1lICE9PSAnbnVtYmVyJykgdGhyb3cgbmV3IFR5cGVFcnJvcignVGltZSBzaG91bGQgYmUgaW50ZWdlciAobXMpJyk7XHJcbiAgICByZXR1cm4gKHRpbWUgPj0gdGhpcy5taW5UaW1lKSAmJiAodGltZSA8PSB0aGlzLm1heFRpbWUpO1xyXG4gIH1cclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgQWN0aW9uO1xyXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9sZWFybmluZy9tb2RlbF9jb21wb25lbnRzL2FjdGlvbi5qcyIsImNsYXNzIEV2ZW50IHtcclxuICBjb25zdHJ1Y3RvcihkYXRhKSB7XHJcbiAgICB0aGlzLmlkID0gZGF0YS5pZDtcclxuICAgIHRoaXMubmFtZSA9IGRhdGEubmFtZTtcclxuICAgIHRoaXMuZGVzY3JpcHRpb24gPSBkYXRhLmRlc2NyaXB0aW9uO1xyXG4gIH1cclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgRXZlbnQ7XHJcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2xlYXJuaW5nL21vZGVsX2NvbXBvbmVudHMvZXZlbnQuanMiLCJpbXBvcnQgRXZlbnQgZnJvbSAnLi9ldmVudCcgO1xyXG5pbXBvcnQgQWN0aW9uIGZyb20gJy4vYWN0aW9uJztcclxuXHJcbmNsYXNzIFN0YXRlIHtcclxuICBjb25zdHJ1Y3RvcihkYXRhKSB7XHJcbiAgICB0aGlzLmlkID0gZGF0YS5pZDtcclxuICAgIHRoaXMubmFtZSA9IGRhdGEubmFtZTtcclxuICAgIHRoaXMuaW1nID0gZGF0YS5pbWc7XHJcbiAgICB0aGlzLnBhcmFtcyA9IGRhdGEucGFyYW1zO1xyXG5cclxuICAgIGlmKGRhdGEubGFzdCkge1xyXG4gICAgICB0aGlzLmxhc3QgPSB0cnVlO1xyXG4gICAgICB0aGlzLmV2ZW50ID0gbnVsbDtcclxuICAgICAgdGhpcy5hY3Rpb25zID0gbnVsbDtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHRoaXMuZXZlbnQgPSBuZXcgRXZlbnQoZGF0YS5ldmVudCk7XHJcbiAgICAgIHRoaXMuYWN0aW9ucyA9IGRhdGEuYWN0aW9ucy5tYXAoYWN0aW9uID0+IG5ldyBBY3Rpb24oYWN0aW9uKSk7XHJcbiAgICAgIHRoaXMubGFzdCA9IGZhbHNlO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgZ2V0SW5hY3RpdmVUaW1lKCkge1xyXG4gICAgY29uc3QgdGltZXMgPSB0aGlzLmdldEFsbEFjdGlvblRpbWVzKCk7XHJcbiAgICByZXR1cm4gTWF0aC5tYXgoLi4udGltZXMpO1xyXG4gIH1cclxuXHJcbiAgZ2V0SW5hY3RpdmVBY3Rpb24oKSB7XHJcbiAgICByZXR1cm4gdGhpcy5hY3Rpb25zLmZpbmQoYWN0aW9uID0+IGFjdGlvbi5pbmFjdGl2ZSA9PT0gdHJ1ZSk7XHJcbiAgfVxyXG5cclxuICBnZXRBbGxBY3Rpb25UaW1lcygpIHtcclxuICAgIHJldHVybiB0aGlzLmFjdGlvbnMubWFwKGFjdGlvbiA9PiBhY3Rpb24ubWF4VGltZSB8fCAwKTtcclxuICB9XHJcblxyXG4gIGhhbmRsZUlucHV0KGRhdGEsIHRpbWUpIHtcclxuICAgIGNvbnN0IHN1aXRlZEFjdGlvbnMgPSB0aGlzLmFjdGlvbnMuZmlsdGVyKGFjdGlvbiA9PiBhY3Rpb24uaXNTdWl0YWJsZShkYXRhLCB0aW1lKSk7XHJcbiAgICBpZiAoc3VpdGVkQWN0aW9ucy5sZW5ndGggPiAwKSB7XHJcbiAgICAgIHJldHVybiBzdWl0ZWRBY3Rpb25zWzBdLm5leHRTdGF0ZTtcclxuICAgIH1cclxuICAgIHJldHVybiBudWxsO1xyXG4gIH1cclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgU3RhdGU7XHJcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2xlYXJuaW5nL21vZGVsX2NvbXBvbmVudHMvc3RhdGUuanMiLCJpbXBvcnQgbm9kZUZhY3RvcnkgZnJvbSAnLi4vLi4vdXRpbHMvbm9kZUZhY3RvcnknO1xyXG5cclxuY29uc3QgJG5hbWUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcubW9kZWwtc3RhdGUtbmFtZScpO1xyXG5jb25zdCAkaW1nID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLm1vZGVsLXN0YXRlLWltZycpO1xyXG5jb25zdCAkcGFyYW1zID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLm1vZGVsLXBhcmFtcy12YWx1ZXMnKTtcclxuXHJcbmNvbnN0ICRldmVudCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5tb2RlbC1ldmVudCcpO1xyXG5jb25zdCAkZXZlbnRIZWFkZXIgPSAkZXZlbnQucXVlcnlTZWxlY3RvcignLm1vZGVsLWV2ZW50LW5hbWUgc3BhbicpO1xyXG5jb25zdCAkZXZlbnRCb2R5ID0gJGV2ZW50LnF1ZXJ5U2VsZWN0b3IoJy5tb2RlbC1ldmVudC1pbmZvJyk7XHJcblxyXG5jb25zdCAkcmVzcG9uc2UgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcubW9kZWwtcmVzcG9uc2UnKTtcclxuXHJcbmZ1bmN0aW9uIHNldCh7IG5hbWUsIGltZywgcGFyYW1zIH0pIHtcclxuICAkbmFtZS50ZXh0Q29udGVudCA9IG5hbWU7XHJcbiAgJGltZy5zZXRBdHRyaWJ1dGUoJ3NyYycsIGltZyk7XHJcbiAgc2V0UGFyYW1ldGVycyhwYXJhbXMpO1xyXG59XHJcblxyXG5mdW5jdGlvbiBzZXRQYXJhbWV0ZXJzKHBhcmFtcykge1xyXG4gIGNvbnN0IGZyYWcgPSBkb2N1bWVudC5jcmVhdGVEb2N1bWVudEZyYWdtZW50KCk7XHJcbiAgZm9yIChsZXQga2V5IGluIHBhcmFtcykge1xyXG4gICAgZnJhZy5hcHBlbmRDaGlsZChjcmVhdGVQYXJhbWV0ZU5vZGUoa2V5LCBwYXJhbXNba2V5XSkpO1xyXG4gIH1cclxuICAkcGFyYW1zLmlubmVySFRNTCA9IFwiXCI7XHJcbiAgJHBhcmFtcy5hcHBlbmRDaGlsZChmcmFnKTtcclxufVxyXG5cclxuZnVuY3Rpb24gY3JlYXRlUGFyYW1ldGVOb2RlKGtleSwgdmFsdWUpIHtcclxuICBjb25zdCBkaXYgPSBub2RlRmFjdG9yeSgnZGl2JywgeyBjbGFzc0xpc3Q6IFsncGFyYW1ldGVyJ10gfSk7XHJcblxyXG4gIGNvbnN0IGtleVNwYW4gPSBub2RlRmFjdG9yeSgnc3BhbicsIHsgdGV4dENvbnRlbnQ6IGtleSB9KTtcclxuICBkaXYuYXBwZW5kQ2hpbGQoa2V5U3Bhbik7XHJcblxyXG4gIGNvbnN0IHZhbHVlU3BhbiA9IG5vZGVGYWN0b3J5KCdzcGFuJywgeyB0ZXh0Q29udGVudDogdmFsdWUgfSk7XHJcbiAgZGl2LmFwcGVuZENoaWxkKHZhbHVlU3Bhbik7XHJcblxyXG4gIHJldHVybiBkaXY7XHJcbn1cclxuXHJcblxyXG4vKiogU2V0cyBldmVudCBkYXRhIHRvIFVJICovXHJcbmZ1bmN0aW9uIHNob3dFdmVudChldmVudCkge1xyXG4gICRldmVudEhlYWRlci50ZXh0Q29udGVudCA9IGV2ZW50Lm5hbWU7XHJcbiAgJGV2ZW50Qm9keS50ZXh0Q29udGVudCA9IGV2ZW50LmRlc2NyaXB0aW9uO1xyXG4gICRldmVudC5jbGFzc0xpc3QucmVtb3ZlKCdpcy1oaWRkZW4nKTtcclxufVxyXG5mdW5jdGlvbiBoaWRlRXZlbnQoKSB7XHJcbiAgJGV2ZW50LmNsYXNzTGlzdC5hZGQoJ2lzLWhpZGRlbicpO1xyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCB7XHJcbiAgc2V0LFxyXG4gIHNob3dFdmVudCxcclxuICBoaWRlRXZlbnRcclxufVxyXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9sZWFybmluZy9zY2VuZV9jb21wb25lbnRzL3N0YXRlLmpzIiwiaW1wb3J0IG5vZGVGYWN0b3J5IGZyb20gJy4uLy4uL3V0aWxzL25vZGVGYWN0b3J5JztcclxuXHJcbmNvbnN0IHRvb2xUeXBlcyA9IHtcclxuICBSQU5HRTogJ3JhbmdlJyxcclxuICBTV0lUQ0g6ICdzd2l0Y2gnXHJcbn1cclxuY29uc3QgJHRvb2xzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnRvb2xzLWxpc3QnKTtcclxuXHJcbmZ1bmN0aW9uIGluaXQodG9vbHMpIHtcclxuICBjb25zdCBmcmFnbWVudCA9IGRvY3VtZW50LmNyZWF0ZURvY3VtZW50RnJhZ21lbnQoKTtcclxuXHJcbiAgdG9vbHMuZm9yRWFjaCh0b29sID0+IHtcclxuICAgIC8vIGNyZWF0ZSB0b29sIHdyYXBwZXJcclxuICAgIGNvbnN0IGRpdiA9IG5vZGVGYWN0b3J5KCdkaXYnLCB7IGNsYXNzTGlzdDogWyd0b29sJ10gfSk7XHJcblxyXG4gICAgY29uc3QgbGFiZWwgPSBub2RlRmFjdG9yeSgnbGFiZWwnLCB7XHJcbiAgICAgIGNsYXNzTGlzdDogWyd0b29sLW5hbWUnXSxcclxuICAgICAgYXR0cnM6IHsgXCJmb3JcIjogdG9vbC5uYW1lIH0sXHJcbiAgICAgIHRleHRDb250ZW50OiB0b29sLm5hbWVcclxuICAgIH0pO1xyXG4gICAgZGl2LmFwcGVuZENoaWxkKGxhYmVsKTtcclxuXHJcbiAgICBjb25zdCB0b29sTm9kZSA9IGNyZWF0ZVRvb2xOb2RlKHRvb2wpO1xyXG4gICAgZGl2LmFwcGVuZENoaWxkKHRvb2xOb2RlKTtcclxuXHJcbiAgICBmcmFnbWVudC5hcHBlbmRDaGlsZChkaXYpO1xyXG4gIH0pO1xyXG5cclxuICAkdG9vbHMuaW5uZXJIVE1MID0gXCJcIjtcclxuICAkdG9vbHMuYXBwZW5kQ2hpbGQoZnJhZ21lbnQpO1xyXG59XHJcblxyXG5mdW5jdGlvbiBjcmVhdGVUb29sTm9kZSh0b29sKSB7XHJcbiAgc3dpdGNoKHRvb2wudHlwZSkge1xyXG4gICAgY2FzZSB0b29sVHlwZXMuUkFOR0U6ICAgcmV0dXJuIGNyZWF0ZVJhbmdlVG9vbCh0b29sKTtcclxuICAgIGNhc2UgdG9vbFR5cGVzLlNXSVRDSDogIHJldHVybiBjcmVhdGVTd2l0Y2hUb29sKHRvb2wpO1xyXG4gICAgZGVmYXVsdDogICAgICAgICAgICAgICAgcmV0dXJuICfQndC10LjQt9Cy0LXRgdGC0L3Ri9C5INC/0YDQuNCx0L7RgCc7XHJcbiAgfVxyXG59XHJcblxyXG5mdW5jdGlvbiBjcmVhdGVSYW5nZVRvb2wodG9vbCkge1xyXG4gIGNvbnN0IGRpdklucHV0ID0gbm9kZUZhY3RvcnkoJ2RpdicsIHsgY2xhc3NMaXN0OiBbJ3JhbmdlJ10gfSk7XHJcblxyXG4gIGNvbnN0IHNwYW5NaW4gPSBub2RlRmFjdG9yeSgnc3BhbicsIHsgdGV4dENvbnRlbnQ6IHRvb2wubWluIH0pO1xyXG4gIGRpdklucHV0LmFwcGVuZENoaWxkKHNwYW5NaW4pXHJcblxyXG4gIGNvbnN0IGlucHV0ID0gbm9kZUZhY3RvcnkoJ2lucHV0Jywge1xyXG4gICAgYXR0cnM6IHtcclxuICAgICAgJ2RhdGEtaWQnOiB0b29sLmlkLFxyXG4gICAgICAnZGF0YS10eXBlJzogJ3JhbmdlJyxcclxuICAgICAgJ25hbWUnOiB0b29sLm5hbWUsXHJcbiAgICAgICd0eXBlJzogJ3JhbmdlJyxcclxuICAgICAgJ21pbic6IHRvb2wubWluLFxyXG4gICAgICAnbWF4JzogdG9vbC5tYXhcclxuICAgIH1cclxuICB9KTtcclxuICBkaXZJbnB1dC5hcHBlbmRDaGlsZChpbnB1dCk7XHJcblxyXG4gIGNvbnN0IHNwYW5NYXggPSBub2RlRmFjdG9yeSgnc3BhbicsIHsgdGV4dENvbnRlbnQ6IHRvb2wubWF4IH0pO1xyXG4gIGRpdklucHV0LmFwcGVuZENoaWxkKHNwYW5NYXgpO1xyXG5cclxuICBjb25zdCBkaXZDdXJyZW50ID0gbm9kZUZhY3RvcnkoJ2RpdicsIHsgY2xhc3NMaXN0OiBbJ3JhbmdlLWN1cnJlbnQtdmFsdWUnXSB9KTtcclxuICBjb25zdCBzcGFuQ3VycmVudCA9IG5vZGVGYWN0b3J5KCdzcGFuJywgeyB0ZXh0Q29udGVudDogaW5wdXQudmFsdWUgfSk7XHJcbiAgZGl2Q3VycmVudC5hcHBlbmRDaGlsZChzcGFuQ3VycmVudCk7XHJcblxyXG4gIGlucHV0LmFkZEV2ZW50TGlzdGVuZXIoJ2lucHV0JywgKGV2dCkgPT4ge1xyXG4gICAgc3BhbkN1cnJlbnQudGV4dENvbnRlbnQgPSBldnQudGFyZ2V0LnZhbHVlO1xyXG4gIH0pO1xyXG5cclxuICBjb25zdCBmcmFnbWVudCA9IGRvY3VtZW50LmNyZWF0ZURvY3VtZW50RnJhZ21lbnQoKTtcclxuICBmcmFnbWVudC5hcHBlbmRDaGlsZChkaXZJbnB1dCk7XHJcbiAgZnJhZ21lbnQuYXBwZW5kQ2hpbGQoZGl2Q3VycmVudCk7XHJcblxyXG4gIHJldHVybiBmcmFnbWVudDtcclxufVxyXG5cclxuZnVuY3Rpb24gY3JlYXRlU3dpdGNoVG9vbCh0b29sKSB7XHJcbiAgY29uc3QgbGFiZWwgPSBub2RlRmFjdG9yeSgnbGFiZWwnLCB7IGNsYXNzTGlzdDogWydzd2l0Y2gnXSB9KTtcclxuXHJcbiAgY29uc3QgaW5wdXQgPSBub2RlRmFjdG9yeSgnaW5wdXQnLCB7XHJcbiAgICBhdHRyczoge1xyXG4gICAgICAnZGF0YS1pZCc6IHRvb2wuaWQsXHJcbiAgICAgICdkYXRhLXR5cGUnOiAnc3dpdGNoJyxcclxuICAgICAgJ3R5cGUnOiAnY2hlY2tib3gnXHJcbiAgICB9XHJcbiAgfSk7XHJcbiAgbGFiZWwuYXBwZW5kQ2hpbGQoaW5wdXQpO1xyXG5cclxuICBjb25zdCBkaXYgPSBub2RlRmFjdG9yeSgnZGl2JywgeyBjbGFzc0xpc3Q6IFsnc2xpZGVyJ10gfSk7XHJcbiAgbGFiZWwuYXBwZW5kQ2hpbGQoZGl2KTtcclxuXHJcbiAgcmV0dXJuIGxhYmVsO1xyXG59XHJcblxyXG5mdW5jdGlvbiBnZXRUb29sc0RhdGEoKSB7XHJcbiAgY29uc3QgdG9vbHNEYXRhID0ge307XHJcbiAgY29uc3QgaW5wdXRzID0gdGhpcy4kdG9vbHNCb3gucXVlcnlTZWxlY3RvckFsbCgnaW5wdXRbZGF0YS1pZF0nKTtcclxuICBpbnB1dHMuZm9yRWFjaChpbnB1dCA9PiB7XHJcbiAgICBjb25zdCB7IGlkLCB0eXBlIH0gPSBpbnB1dC5kYXRhc2V0O1xyXG4gICAgbGV0IHZhbHVlO1xyXG4gICAgc3dpdGNoKHR5cGUpIHtcclxuICAgICAgY2FzZSB0b29sVHlwZXMuUkFOR0U6IHZhbHVlID0gcGFyc2VJbnQoaW5wdXQudmFsdWUpOyBicmVhaztcclxuICAgICAgY2FzZSB0b29sVHlwZXMuU1dJVENIOiB2YWx1ZSA9IGlucHV0LmNoZWNrZWQ7IGJyZWFrO1xyXG4gICAgICBkZWZhdWx0OiB0aHJvdyBuZXcgRXJyb3IoYNCd0LXQutC+0YDRgNC10LrRgtC90YvQuSDRgtC40L8g0L/RgNC40LHQvtGA0LAuIElEOiAke2lkfWApO1xyXG4gICAgfVxyXG4gICAgdG9vbHNEYXRhW2lkXSA9IHZhbHVlO1xyXG4gIH0pO1xyXG4gIHJldHVybiB0b29sc0RhdGE7XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IHtcclxuICBpbml0LFxyXG4gIGdldFRvb2xzRGF0YVxyXG59O1xyXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9sZWFybmluZy9zY2VuZV9jb21wb25lbnRzL3Rvb2xzLmpzIiwiaW1wb3J0ICcuLi8uLi9zYXNzL2xlYXJuaW5nLnNjc3MnO1xyXG5cclxuaW1wb3J0IHB1YnN1YiBmcm9tICcuLi91dGlscy9wdWJzdWInO1xyXG5pbXBvcnQgYWpheCBmcm9tICcuLi91dGlscy9hamF4JztcclxuaW1wb3J0IHNjZW5lIGZyb20gJy4vc2NlbmUnO1xyXG5pbXBvcnQgTW9kZWwgZnJvbSAnLi9tb2RlbCc7XHJcblxyXG4vKipcclxuICogTG9hZCBtb2RlbCB3aXRoIGdpdmVuIGlkXHJcbiAqL1xyXG5mdW5jdGlvbiBsb2FkTW9kZWwoaWQpIHtcclxuICByZXR1cm4gYWpheChgL21vZGVscy8ke2lkfWApLnRoZW4ocmVzcG9uc2UgPT4gSlNPTi5wYXJzZShyZXNwb25zZSkpO1xyXG59XHJcblxyXG4vKipcclxuICogVUkgYnV0dG9uJ3MgaGFuZGxlcnNcclxuICovXHJcbmNvbnN0ICRzZWxlY3QgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI21vZGVsLXNlbGVjdFwiKTtcclxuY29uc3QgJGxvYWRCdXR0b24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjbG9hZC1tb2RlbC1idG4nKTtcclxubGV0IG1vZGVsID0gbnVsbDtcclxuJGxvYWRCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XHJcbiAgY29uc3QgbW9kZWxJZCA9ICRzZWxlY3QudmFsdWU7XHJcbiAgbG9hZE1vZGVsKG1vZGVsSWQpXHJcbiAgICAudGhlbihyZXNwb25zZSA9PiB7XHJcbiAgICAgIG1vZGVsID0gbmV3IE1vZGVsKHJlc3BvbnNlKTtcclxuICAgICAgc2NlbmUuaW5pdChtb2RlbCwgcmVzcG9uc2UpLnNob3dDb250ZW50KCkuZW5hYmxlQnV0dG9ucygkc3RhcnRCdXR0b24pO1xyXG4gICAgfSlcclxuICAgIC5jYXRjaChlcnIgPT4geyBjb25zb2xlLmVycm9yKGVycikgfSk7XHJcbn0pO1xyXG4vL1xyXG5jb25zdCAkc3RhcnRCdXR0b24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjc3RhcnQtYnRuJyk7XHJcbiRzdGFydEJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcclxuICBtb2RlbC5zdGFydCgpO1xyXG4gIHNjZW5lLmRpc2FibGVCdXR0b25zKCRzdGFydEJ1dHRvbik7XHJcbiAgc2NlbmUuZW5hYmxlQnV0dG9ucygkc3RvcEJ1dHRvbiwgJHJ1bkJ1dHRvbik7XHJcbn0pO1xyXG5cclxuY29uc3QgJHN0b3BCdXR0b24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjc3RvcC1idG4nKTtcclxuJHN0b3BCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XHJcbiAgbW9kZWwuc3RvcCgpOyAvLyBUT0RPXHJcbiAgc2NlbmUuZW5hYmxlQnV0dG9ucygkc3RhcnRCdXR0b24pO1xyXG4gIHNjZW5lLmRpc2FibGVCdXR0b25zKCRzdG9wQnV0dG9uLCAkcnVuQnV0dG9uKTtcclxufSk7XHJcblxyXG5jb25zdCAkcnVuQnV0dG9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3J1bi1idG4nKTtcclxuLy8gJHJ1bkJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcclxuLy8gICBjb25zdCB0b29sc0RhdGEgPSBzY2VuZS5nZXRUb29sc0RhdGEoKTtcclxuLy8gICBwdWJzdWIucHVibGlzaCgndXNlcl9pbnB1dCcsIHRvb2xzRGF0YSk7XHJcbi8vIH0pO1xyXG4vL1xyXG4vLyAvKipcclxuLy8gICogSGFuZGxlIGN1c3RvbSBldmVudHMgaGVyZSAodXNlciBpbnB1dCwgcHJvZ3JhbW0gbWVzc2FnZXMgZXRjLilcclxuLy8gICovXHJcbi8vIHB1YnN1Yi5zdWJzY3JpYmUoJ25ld19zdGF0ZScsIHN0YXRlID0+IHNjZW5lLnNldFN0YXRlKHN0YXRlKSk7XHJcbi8vIHB1YnN1Yi5zdWJzY3JpYmUoJ2V2ZW50JywgZGF0YSA9PiBzY2VuZS5zZXRFdmVudChkYXRhLmV2ZW50KSk7XHJcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2xlYXJuaW5nL2luZGV4LmpzIl0sInNvdXJjZVJvb3QiOiIifQ==