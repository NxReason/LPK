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
      console.log(intervals);
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
      this.subscribtion.remove();
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgNmViYzAyNzM3YjI3YjkxMmEwYTkiLCJ3ZWJwYWNrOi8vLy4vdXRpbHMvcHVic3ViLmpzIiwid2VicGFjazovLy8uL3V0aWxzL25vZGVGYWN0b3J5LmpzIiwid2VicGFjazovLy8uL2xlYXJuaW5nL21vZGVsLmpzIiwid2VicGFjazovLy8uL2xlYXJuaW5nL3NjZW5lLmpzIiwid2VicGFjazovLy8uL3V0aWxzL2FqYXguanMiLCJ3ZWJwYWNrOi8vLy4uL3Nhc3MvbGVhcm5pbmcuc2NzcyIsIndlYnBhY2s6Ly8vLi9sZWFybmluZy9tb2RlbF9jb21wb25lbnRzL2FjdGlvbi5qcyIsIndlYnBhY2s6Ly8vLi9sZWFybmluZy9tb2RlbF9jb21wb25lbnRzL2V2ZW50LmpzIiwid2VicGFjazovLy8uL2xlYXJuaW5nL21vZGVsX2NvbXBvbmVudHMvc3RhdGUuanMiLCJ3ZWJwYWNrOi8vLy4vbGVhcm5pbmcvc2NlbmVfY29tcG9uZW50cy9zdGF0ZS5qcyIsIndlYnBhY2s6Ly8vLi9sZWFybmluZy9zY2VuZV9jb21wb25lbnRzL3Rvb2xzLmpzIiwid2VicGFjazovLy8uL2xlYXJuaW5nL2luZGV4LmpzIl0sIm5hbWVzIjpbInB1YnN1YiIsInRvcGljcyIsInN1YnNjcmliZSIsInRvcGljIiwibGlzdGVuZXIiLCJxdWV1ZSIsImluZGV4IiwicHVzaCIsInJlbW92ZSIsInB1Ymxpc2giLCJpbmZvIiwibGVuZ3RoIiwiaXRlbXMiLCJmb3JFYWNoIiwiaXRlbSIsIm5vZGVGYWN0b3J5IiwidHlwZSIsInBhcmFtcyIsIm5vZGUiLCJkb2N1bWVudCIsImNyZWF0ZUVsZW1lbnQiLCJhcHBlbmRDbGFzc2VzIiwiYXBwZW5kQXR0cnMiLCJpbnNlcnRUZXh0Q29udGVudCIsImNsYXNzTGlzdCIsImFkZCIsImNsYXNzTmFtZSIsImF0dHJzIiwiYXR0ck5hbWVzIiwiT2JqZWN0Iiwia2V5cyIsInNldEF0dHJpYnV0ZSIsImF0dHJOYW1lIiwidGV4dENvbnRlbnQiLCJNb2RlbCIsImRhdGEiLCJpZCIsIm5hbWUiLCJicmVha1RpbWUiLCJzdGVwcyIsInN0YXRlcyIsIm1hcCIsInN0YXRlIiwiY3VycmVudFN0YXRlIiwiZ2V0U3RhdGUiLCJ0aW1lb3V0Iiwic3Vic2NyaWJ0aW9uIiwiZmluZCIsImludGVydmFscyIsIlByb21pc2UiLCJyZXNvbHZlIiwiaSIsInRoZW4iLCJtYWtlQnJlYWsiLCJoYW5kbGVFdmVudCIsImhhbmRsZU5ld1N0YXRlIiwiY2F0Y2giLCJjb25zb2xlIiwibG9nIiwicmVqZWN0Iiwic2V0VGltZW91dCIsImV2ZW50IiwiZXZlbnRTdGFydFRpbWUiLCJEYXRlIiwibm93IiwidGltZVNwZW50IiwibmV4dFN0YXRlSWQiLCJoYW5kbGVJbnB1dCIsIm5leHRTdGF0ZSIsImxhc3QiLCJpbmFjdGl2ZVRpbWUiLCJnZXRJbmFjdGl2ZVRpbWUiLCJnZXRJbmFjdGl2ZUFjdGlvbiIsImNsZWFyVGltZW91dCIsImV4cG9ydHMiLCIkbW9kZWxOYW1lIiwicXVlcnlTZWxlY3RvciIsImluaXQiLCJtb2RlbCIsInJlc3BvbnNlIiwic2V0IiwidG9vbHMiLCIkY29udGVudCIsInNob3dDb250ZW50Iiwic2V0Q29udGVudERpc3BsYXkiLCJoaWRlQ29udGVudCIsImRpc3BsYXkiLCJzdHlsZSIsImVuYWJsZUJ1dHRvbnMiLCJidXR0b25zIiwic2V0QnV0dG9uc1N0YXRlIiwiZGlzYWJsZUJ1dHRvbnMiLCJ2YWx1ZSIsImJ1dHRvbiIsImRpc2FibGVkIiwiYWpheCIsInBhdGgiLCJvcHRpb25zIiwieGhyIiwiWE1MSHR0cFJlcXVlc3QiLCJvcGVuIiwibWV0aG9kIiwiaGVhZGVycyIsInNldFhIUkhlYWRlcnMiLCJzZW5kIiwib25yZWFkeXN0YXRlY2hhbmdlIiwicmVhZHlTdGF0ZSIsInN0YXR1cyIsInJlc3BvbnNlVGV4dCIsInN0YXR1c1RleHQiLCJoZWFkZXIiLCJzZXRSZXF1ZXN0SGVhZGVyIiwiQWN0aW9uIiwibWluVGltZSIsIm1heFRpbWUiLCJpbmFjdGl2ZSIsInRpbWUiLCJyaWdodFRpbWUiLCJyaWdodERhdGEiLCJBcnJheSIsImlzQXJyYXkiLCJUeXBlRXJyb3IiLCJldmVyeSIsImNoZWNrVG9vbCIsIm9iaiIsInRvb2wiLCJpbmNsdWRlc1ZhbHVlIiwiYm9yZGVycyIsIkV2ZW50IiwiZGVzY3JpcHRpb24iLCJTdGF0ZSIsImltZyIsImFjdGlvbnMiLCJhY3Rpb24iLCJ0aW1lcyIsImdldEFsbEFjdGlvblRpbWVzIiwiTWF0aCIsIm1heCIsInN1aXRlZEFjdGlvbnMiLCJmaWx0ZXIiLCJpc1N1aXRhYmxlIiwiJG5hbWUiLCIkaW1nIiwiJHBhcmFtcyIsIiRldmVudCIsIiRldmVudEhlYWRlciIsIiRldmVudEJvZHkiLCIkcmVzcG9uc2UiLCJzZXRQYXJhbWV0ZXJzIiwiZnJhZyIsImNyZWF0ZURvY3VtZW50RnJhZ21lbnQiLCJrZXkiLCJhcHBlbmRDaGlsZCIsImNyZWF0ZVBhcmFtZXRlTm9kZSIsImlubmVySFRNTCIsImRpdiIsImtleVNwYW4iLCJ2YWx1ZVNwYW4iLCJzaG93RXZlbnQiLCJoaWRlRXZlbnQiLCJ0b29sVHlwZXMiLCJSQU5HRSIsIlNXSVRDSCIsIiR0b29scyIsImZyYWdtZW50IiwibGFiZWwiLCJ0b29sTm9kZSIsImNyZWF0ZVRvb2xOb2RlIiwiY3JlYXRlUmFuZ2VUb29sIiwiY3JlYXRlU3dpdGNoVG9vbCIsImRpdklucHV0Iiwic3Bhbk1pbiIsIm1pbiIsImlucHV0Iiwic3Bhbk1heCIsImRpdkN1cnJlbnQiLCJzcGFuQ3VycmVudCIsImFkZEV2ZW50TGlzdGVuZXIiLCJldnQiLCJ0YXJnZXQiLCJnZXRUb29sc0RhdGEiLCJ0b29sc0RhdGEiLCJpbnB1dHMiLCIkdG9vbHNCb3giLCJxdWVyeVNlbGVjdG9yQWxsIiwiZGF0YXNldCIsInBhcnNlSW50IiwiY2hlY2tlZCIsIkVycm9yIiwibG9hZE1vZGVsIiwiSlNPTiIsInBhcnNlIiwiJHNlbGVjdCIsIiRsb2FkQnV0dG9uIiwibW9kZWxJZCIsIiRzdGFydEJ1dHRvbiIsImVycm9yIiwiZXJyIiwic3RhcnQiLCIkc3RvcEJ1dHRvbiIsIiRydW5CdXR0b24iLCJzdG9wIl0sIm1hcHBpbmdzIjoiO0FBQUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0EsbURBQTJDLGNBQWM7O0FBRXpEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBSztBQUNMO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsbUNBQTJCLDBCQUEwQixFQUFFO0FBQ3ZELHlDQUFpQyxlQUFlO0FBQ2hEO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLDhEQUFzRCwrREFBK0Q7O0FBRXJIO0FBQ0E7O0FBRUE7QUFDQTs7Ozs7Ozs7Ozs7OztBQ2hFQSxJQUFNQSxTQUFVLFlBQVc7O0FBRXpCLE1BQU1DLFNBQVMsRUFBZjs7QUFFQSxTQUFPO0FBQ0xDLGVBQVcsbUJBQVNDLEtBQVQsRUFBZ0JDLFFBQWhCLEVBQTBCO0FBQ25DLFVBQUksQ0FBQ0gsT0FBT0UsS0FBUCxDQUFMLEVBQW9CRixPQUFPRSxLQUFQLElBQWdCLEVBQUVFLE9BQU8sRUFBVCxFQUFoQjs7QUFFcEIsVUFBTUMsUUFBUUwsT0FBT0UsS0FBUCxFQUFjRSxLQUFkLENBQW9CRSxJQUFwQixDQUF5QkgsUUFBekIsSUFBcUMsQ0FBbkQ7QUFDQTtBQUNBLGFBQU87QUFDTEksZ0JBQVEsa0JBQVc7QUFDakIsaUJBQU9QLE9BQU9FLEtBQVAsRUFBY0UsS0FBZCxDQUFvQkMsS0FBcEIsQ0FBUDtBQUNEO0FBSEksT0FBUDtBQUtELEtBWEk7O0FBYUxHLGFBQVMsaUJBQVNOLEtBQVQsRUFBZ0JPLElBQWhCLEVBQXNCO0FBQzdCO0FBQ0EsVUFBSSxDQUFDVCxPQUFPRSxLQUFQLENBQUQsSUFBa0IsQ0FBQ0YsT0FBT0UsS0FBUCxF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LENBQXVCLFdBQXZCLENBQXBCO0FBQ0EySCxZQUFZdEIsZ0JBQVosQ0FBNkIsT0FBN0IsRUFBc0MsWUFBTTtBQUMxQ25HLFFBQU0ySCxJQUFOLEdBRDBDLENBQzVCO0FBQ2Qsa0JBQU1qSCxhQUFOLENBQW9CMkcsWUFBcEI7QUFDQSxrQkFBTXhHLGNBQU4sQ0FBcUI0RyxXQUFyQixFQUFrQ0MsVUFBbEM7QUFDRCxDQUpEOztBQU1BLElBQU1BLGFBQWFyTCxTQUFTeUQsYUFBVCxDQUF1QixVQUF2QixDQUFuQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlFIiwiZmlsZSI6ImxlYXJuaW5nLmJ1bmRsZS5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKVxuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuXG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBpZGVudGl0eSBmdW5jdGlvbiBmb3IgY2FsbGluZyBoYXJtb255IGltcG9ydHMgd2l0aCB0aGUgY29ycmVjdCBjb250ZXh0XG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmkgPSBmdW5jdGlvbih2YWx1ZSkgeyByZXR1cm4gdmFsdWU7IH07XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwge1xuIFx0XHRcdFx0Y29uZmlndXJhYmxlOiBmYWxzZSxcbiBcdFx0XHRcdGVudW1lcmFibGU6IHRydWUsXG4gXHRcdFx0XHRnZXQ6IGdldHRlclxuIFx0XHRcdH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IDExKTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyB3ZWJwYWNrL2Jvb3RzdHJhcCA2ZWJjMDI3MzdiMjdiOTEyYTBhOSIsImNvbnN0IHB1YnN1YiA9IChmdW5jdGlvbigpIHtcclxuXHJcbiAgY29uc3QgdG9waWNzID0ge307XHJcblxyXG4gIHJldHVybiB7XHJcbiAgICBzdWJzY3JpYmU6IGZ1bmN0aW9uKHRvcGljLCBsaXN0ZW5lcikge1xyXG4gICAgICBpZiAoIXRvcGljc1t0b3BpY10pIHRvcGljc1t0b3BpY10gPSB7IHF1ZXVlOiBbXSB9O1xyXG5cclxuICAgICAgY29uc3QgaW5kZXggPSB0b3BpY3NbdG9waWNdLnF1ZXVlLnB1c2gobGlzdGVuZXIpIC0gMTtcclxuICAgICAgLy8gZnVuY3Rpb24gdG8gZGVsZXRlIHRvcGljXHJcbiAgICAgIHJldHVybiB7XHJcbiAgICAgICAgcmVtb3ZlOiBmdW5jdGlvbigpIHtcclxuICAgICAgICAgIGRlbGV0ZSB0b3BpY3NbdG9waWNdLnF1ZXVlW2luZGV4XTtcclxuICAgICAgICB9XHJcbiAgICAgIH07XHJcbiAgICB9LFxyXG5cclxuICAgIHB1Ymxpc2g6IGZ1bmN0aW9uKHRvcGljLCBpbmZvKSB7XHJcbiAgICAgIC8vIG5vIHRoZW1lIG9yIG5vIGxpc3RlbmVyc1xyXG4gICAgICBpZiAoIXRvcGljc1t0b3BpY10gfHwgIXRvcGljc1t0b3BpY10ucXVldWUubGVuZ3RoKSByZXR1cm47XHJcblxyXG4gICAgICBjb25zdCBpdGVtcyA9IHRvcGljc1t0b3BpY10ucXVldWU7XHJcbiAgICAgIGl0ZW1zLmZvckVhY2goaXRlbSA9PiB7XHJcbiAgICAgICAgaXRlbShpbmZvIHx8IHt9KTtcclxuICAgICAgfSk7XHJcbiAgICB9XHJcbiAgfTtcclxufSkoKTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IHB1YnN1YjtcclxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vdXRpbHMvcHVic3ViLmpzIiwiY29uc3Qgbm9kZUZhY3RvcnkgPSBmdW5jdGlvbih0eXBlID0gJ2RpdicsIHBhcmFtcykge1xyXG4gIGNvbnN0IG5vZGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KHR5cGUpO1xyXG5cclxuICBhcHBlbmRDbGFzc2VzKG5vZGUsIHBhcmFtcyk7XHJcbiAgYXBwZW5kQXR0cnMobm9kZSwgcGFyYW1zKTtcclxuICBpbnNlcnRUZXh0Q29udGVudChub2RlLCBwYXJhbXMpO1xyXG5cclxuICByZXR1cm4gbm9kZTtcclxufVxyXG5cclxuZnVuY3Rpb24gYXBwZW5kQ2xhc3Nlcyhub2RlLCB7IGNsYXNzTGlzdCB9KSB7XHJcbiAgaWYgKGNsYXNzTGlzdCAmJiBjbGFzc0xpc3QuZm9yRWFjaCkge1xyXG4gICAgY2xhc3NMaXN0LmZvckVhY2goY2xhc3NOYW1lID0+IG5vZGUuY2xhc3NMaXN0LmFkZChjbGFzc05hbWUpKTtcclxuICB9XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGFwcGVuZEF0dHJzKG5vZGUsIHsgYXR0cnMgfSkge1xyXG4gIGlmIChhdHRycykge1xyXG4gICAgY29uc3QgYXR0ck5hbWVzID0gT2JqZWN0LmtleXMoYXR0cnMpO1xyXG4gICAgYXR0ck5hbWVzLmZvckVhY2goYXR0ck5hbWUgPT4gbm9kZS5zZXRBdHRyaWJ1dGUoYXR0ck5hbWUsIGF0dHJzW2F0dHJOYW1lXSkpO1xyXG4gIH1cclxufVxyXG5cclxuZnVuY3Rpb24gaW5zZXJ0VGV4dENvbnRlbnQobm9kZSwgeyB0ZXh0Q29udGVudCA9IFwiXCIgfSkge1xyXG4gIG5vZGUudGV4dENvbnRlbnQgPSB0ZXh0Q29udGVudDtcclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgbm9kZUZhY3Rvcnk7XHJcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3V0aWxzL25vZGVGYWN0b3J5LmpzIiwiaW1wb3J0IFN0YXRlIGZyb20gJy4vbW9kZWxfY29tcG9uZW50cy9zdGF0ZSc7XHJcbmltcG9ydCBwdWJzdWIgZnJvbSAnLi4vdXRpbHMvcHVic3ViJztcclxuXHJcbmNsYXNzIE1vZGVsIHtcclxuICBjb25zdHJ1Y3RvcihkYXRhKSB7XHJcbiAgICB0aGlzLmlkID0gZGF0YS5pZDtcclxuICAgIHRoaXMubmFtZSA9IGRhdGEubmFtZTtcclxuICAgIHRoaXMuYnJlYWtUaW1lID0gZGF0YS5icmVha1RpbWU7XHJcbiAgICB0aGlzLnN0ZXBzID0gZGF0YS5zdGVwcztcclxuXHJcbiAgICB0aGlzLnN0YXRlcyA9IGRhdGEuc3RhdGVzLm1hcChzdGF0ZSA9PiBuZXcgU3RhdGUoc3RhdGUpKTtcclxuICAgIHRoaXMuY3VycmVudFN0YXRlID0gdGhpcy5nZXRTdGF0ZShkYXRhLmlkKTtcclxuXHJcbiAgICB0aGlzLnRpbWVvdXQgPSBudWxsO1xyXG4gICAgdGhpcy5zdWJzY3JpYnRpb24gPSBudWxsO1xyXG4gIH1cclxuXHJcbiAgZ2V0U3RhdGUoaWQpIHtcclxuICAgIHJldHVybiB0aGlzLnN0YXRlcy5maW5kKHN0YXRlID0+IHN0YXRlLmlkID09IGlkKTtcclxuICB9XHJcblxyXG4gIHN0YXJ0KCkge1xyXG4gICAgbGV0IGludGVydmFscyA9IFByb21pc2UucmVzb2x2ZSgpOyAvLyBpbml0IHByb21pc2UgY2hhaW5cclxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5zdGVwczsgaSsrKSB7XHJcbiAgICAgIGludGVydmFscyA9IGludGVydmFsc1xyXG4gICAgICAgLnRoZW4oKCkgPT4geyByZXR1cm4gdGhpcy5tYWtlQnJlYWsoKSB9KVxyXG4gICAgICAgLnRoZW4oKCkgPT4geyByZXR1cm4gdGhpcy5oYW5kbGVFdmVudCgpIH0pXHJcbiAgICAgICAudGhlbihzdGF0ZSA9PiB7IHRoaXMuaGFuZGxlTmV3U3RhdGUoc3RhdGUpIH0pXHJcbiAgICB9XHJcbiAgICBpbnRlcnZhbHMuY2F0Y2goc3RhdGUgPT4geyBwdWJzdWIucHVibGlzaCgnbmV3X3N0YXRlJywgIHN0YXRlKSB9KTtcclxuICAgIGNvbnNvbGUubG9nKGludGVydmFscyk7XHJcbiAgfVxyXG5cclxuICBtYWtlQnJlYWsoKSB7XHJcbiAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xyXG4gICAgICBzZXRUaW1lb3V0KCgpID0+IHsgcmVzb2x2ZSgpIH0sIHRoaXMuYnJlYWtUaW1lKTtcclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgaGFuZGxlRXZlbnQoKSB7XHJcbiAgICBjb25zdCBldmVudCA9IHRoaXMuY3VycmVudFN0YXRlLmV2ZW50O1xyXG4gICAgY29uc3QgZXZlbnRTdGFydFRpbWUgPSBEYXRlLm5vdygpO1xyXG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcclxuICAgICAgLy8gc2VuZCBkYXRhIGFib3V0IG5ldyBldmVudCB0byBvdGhlciBtb2R1bGVzXHJcbiAgICAgIHB1YnN1Yi5wdWJsaXNoKCdldmVudCcsIHsgZXZlbnQgfSk7XHJcblxyXG4gICAgICAvLyBsaXN0ZW4gdG8gdXNlciBhY3Rpb25cclxuICAgICAgLy8gYW5kIGlmIHVzZXIgaW5wdXQgY29ycmVjdCBnbyB0byBuZXh0IHN0YXRlXHJcbiAgICAgIHRoaXMuc3Vic2NyaWJ0aW9uID0gcHVic3ViLnN1YnNjcmliZSgndXNlcl9pbnB1dCcsIGRhdGEgPT4ge1xyXG4gICAgICAgIGNvbnN0IHRpbWVTcGVudCA9IERhdGUubm93KCkgLSBldmVudFN0YXJ0VGltZTtcclxuICAgICAgICBjb25zdCBuZXh0U3RhdGVJZCA9IHRoaXMuY3VycmVudFN0YXRlLmhhbmRsZUlucHV0KGRhdGEsIHRpbWVTcGVudCk7XHJcbiAgICAgICAgY29uc3QgbmV4dFN0YXRlID0gdGhpcy5nZXRTdGF0ZShuZXh0U3RhdGVJZCk7XHJcbiAgICAgICAgaWYgKG5leHRTdGF0ZSkge1xyXG4gICAgICAgICAgbmV4dFN0YXRlLmxhc3QgPyByZWplY3QobmV4dFN0YXRlKSA6IHJlc29sdmUobmV4dFN0YXRlKTtcclxuICAgICAgICB9XHJcbiAgICAgIH0pXHJcblxyXG4gICAgICAvLyBoYW5kbGUgaW5hY3RpdmVcclxuICAgICAgY29uc3QgaW5hY3RpdmVUaW1lID0gZXZlbnQuZ2V0SW5hY3RpdmVUaW1lKCk7XHJcbiAgICAgIHRoaXMudGltZW91dCA9IHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgIGNvbnN0IG5leHRTdGF0ZUlkID0gZXZlbnQuZ2V0SW5hY3RpdmVBY3Rpb24oKS5uZXh0U3RhdGU7XHJcbiAgICAgICAgY29uc3QgbmV4dFN0YXRlID0gdGhpcy5nZXRTdGF0ZShuZXh0U3RhdGVJZCk7XHJcbiAgICAgICAgbmV4dFN0YXRlLmxhc3QgPyByZWplY3QobmV4dFN0YXRlKSA6IHJlc29sdmUobmV4dFN0YXRlKTtcclxuICAgICAgfSwgaW5hY3RpdmVUaW1lKTtcclxuICAgIH0pXHJcbiAgfVxyXG5cclxuICBoYW5kbGVOZXdTdGF0ZShzdGF0ZSkge1xyXG4gICAgdGhpcy5jdXJyZW50U3RhdGUgPSBzdGF0ZTtcclxuICAgIGNsZWFyVGltZW91dCh0aGlzLnRpbWVvdXQpO1xyXG4gICAgdGhpcy5zdWJzY3JpYnRpb24ucmVtb3ZlKCk7XHJcbiAgICBwdWJzdWIucHVibGlzaCgnbmV3X3N0YXRlJywgc3RhdGUpO1xyXG4gIH1cclxuXHJcbiAgLy8gVE9ET1xyXG4gIHN0b3AoKSB7XHJcblxyXG4gIH1cclxuXHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IE1vZGVsO1xyXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9sZWFybmluZy9tb2RlbC5qcyIsImltcG9ydCBzdGF0ZSBmcm9tICcuL3NjZW5lX2NvbXBvbmVudHMvc3RhdGUnO1xyXG5pbXBvcnQgdG9vbHMgZnJvbSAnLi9zY2VuZV9jb21wb25lbnRzL3Rvb2xzJztcclxuXHJcbmNvbnN0IGV4cG9ydHMgPSB7fTtcclxuXHJcbi8vIFNjZW5lIG1ldGFkYXRhXHJcbmNvbnN0ICRtb2RlbE5hbWUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcubW9kZWwtbmFtZScpO1xyXG5leHBvcnRzLmluaXQgPSBmdW5jdGlvbihtb2RlbCwgcmVzcG9uc2UpIHtcclxuICAkbW9kZWxOYW1lLnRleHRDb250ZW50ID0gbW9kZWwubmFtZTtcclxuICBzdGF0ZS5zZXQobW9kZWwuY3VycmVudFN0YXRlKTtcclxuICB0b29scy5pbml0KHJlc3BvbnNlLnRvb2xzKTtcclxuICByZXR1cm4gdGhpcztcclxufVxyXG5cclxuLy8gTWFuYWdlIGNvbnRlbnQgdmlzaWJpbGl0eVxyXG5jb25zdCAkY29udGVudCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5jb250ZW50Jyk7XHJcbmV4cG9ydHMuc2hvd0NvbnRlbnQgPSBmdW5jdGlvbigpIHtcclxuICBzZXRDb250ZW50RGlzcGxheSgnZmxleCcpO1xyXG4gIHJldHVybiB0aGlzO1xyXG59XHJcbmV4cG9ydHMuaGlkZUNvbnRlbnQgPSBmdW5jdGlvbigpIHtcclxuICBzZXRDb250ZW50RGlzcGxheSgnbm9uZScpO1xyXG4gIHJldHVybiB0aGlzO1xyXG59XHJcbmZ1bmN0aW9uIHNldENvbnRlbnREaXNwbGF5KGRpc3BsYXkpIHtcclxuICAkY29udGVudC5zdHlsZS5kaXNwbGF5ID0gZGlzcGxheTtcclxufVxyXG5cclxuLy8gTWFuYWdlIGJ1dHRvbnMgc3RhdGVcclxuZXhwb3J0cy5lbmFibGVCdXR0b25zID0gZnVuY3Rpb24oLi4uYnV0dG9ucykge1xyXG4gIHNldEJ1dHRvbnNTdGF0ZShidXR0b25zLCBmYWxzZSk7XHJcbn1cclxuZXhwb3J0cy5kaXNhYmxlQnV0dG9ucyA9IGZ1bmN0aW9uKC4uLmJ1dHRvbnMpIHtcclxuICBzZXRCdXR0b25zU3RhdGUoYnV0dG9ucywgdHJ1ZSk7XHJcbn1cclxuZnVuY3Rpb24gc2V0QnV0dG9uc1N0YXRlKGJ1dHRvbnMsIHZhbHVlKSB7XHJcbiAgYnV0dG9ucy5mb3JFYWNoKGJ1dHRvbiA9PiBidXR0b24uZGlzYWJsZWQgPSB2YWx1ZSk7XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IGV4cG9ydHM7XHJcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2xlYXJuaW5nL3NjZW5lLmpzIiwiZnVuY3Rpb24gYWpheChwYXRoID0gJycsIG9wdGlvbnMgPSB7fSkge1xyXG4gIGNvbnN0IHhociA9IG5ldyBYTUxIdHRwUmVxdWVzdCgpO1xyXG4gIHhoci5vcGVuKG9wdGlvbnMubWV0aG9kIHx8ICdHRVQnLCBwYXRoLCB0cnVlKTtcclxuICBpZiAob3B0aW9ucy5oZWFkZXJzKSB7IHNldFhIUkhlYWRlcnMoeGhyLCBvcHRpb25zLmhlYWRlcnMpOyB9XHJcbiAgeGhyLnNlbmQob3B0aW9ucy5kYXRhKTtcclxuXHJcbiAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcclxuICAgIHhoci5vbnJlYWR5c3RhdGVjaGFuZ2UgPSBmdW5jdGlvbigpIHtcclxuICAgICAgaWYoeGhyLnJlYWR5U3RhdGUgPT0gNCkge1xyXG4gICAgICAgIGlmKHhoci5zdGF0dXMgPT0gMjAwKSB7XHJcbiAgICAgICAgICByZXNvbHZlKHhoci5yZXNwb25zZVRleHQpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICByZWplY3QoeGhyLnN0YXR1c1RleHQpO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH0pXHJcbn1cclxuXHJcbmZ1bmN0aW9uIHNldFhIUkhlYWRlcnMoeGhyLCBoZWFkZXJzKSB7XHJcbiAgZm9yIChsZXQgaGVhZGVyIGluIGhlYWRlcnMpIHtcclxuICAgIHhoci5zZXRSZXF1ZXN0SGVhZGVyKGhlYWRlciwgaGVhZGVyc1toZWFkZXJzXSk7XHJcbiAgfVxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBhamF4O1xyXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi91dGlscy9hamF4LmpzIiwiLy8gcmVtb3ZlZCBieSBleHRyYWN0LXRleHQtd2VicGFjay1wbHVnaW5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuLi9zYXNzL2xlYXJuaW5nLnNjc3Ncbi8vIG1vZHVsZSBpZCA9IDVcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiY2xhc3MgQWN0aW9uIHtcclxuICBjb25zdHJ1Y3RvcihkYXRhKSB7XHJcbiAgICB0aGlzLm1pblRpbWUgPSBkYXRhLm1pblRpbWU7XHJcbiAgICB0aGlzLm1heFRpbWUgPSBkYXRhLm1heFRpbWU7XHJcbiAgICB0aGlzLm5leHRTdGF0ZSA9IGRhdGEubmV4dFN0YXRlO1xyXG4gICAgaWYgKGRhdGEuaW5hY3RpdmUpIHtcclxuICAgICAgdGhpcy5pbmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgIHRoaXMudG9vbHMgPSBbXTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHRoaXMuaW5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgdGhpcy50b29scyA9IGRhdGEudG9vbHM7XHJcbiAgICB9XHJcblxyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogQHBhcmFtIFt7IGlkOiBOdW1iZXIsIHZhbHVlOiBOdW1iZXIvQm9vbGVhbiB9LCB7Li4ufV1cclxuICAgKiBAcGFyYW0gTnVtYmVyXHJcbiAgICogQHJldHVybiBCb29sZWFuXHJcbiAgICovXHJcbiAgaXNTdWl0YWJsZShkYXRhLCB0aW1lKSB7XHJcbiAgICByZXR1cm4gdGhpcy5yaWdodFRpbWUodGltZSkgJiYgdGhpcy5yaWdodERhdGEoZGF0YSk7XHJcbiAgfVxyXG5cclxuICByaWdodERhdGEoZGF0YSA9IFtdKSB7XHJcbiAgICBpZighQXJyYXkuaXNBcnJheShkYXRhKSkgeyB0aHJvdyBuZXcgVHlwZUVycm9yKGBJbnZhbGlkIHR5cGUgb2YgZGF0YSBmcm9tIHRvb2xzLiBFeHBlY3RlZCBhcnJheSwgZ290ICR7dHlwZW9mIGRhdGF9YCk7IH1cclxuICAgIHJldHVybiB0aGlzLnRvb2xzLmV2ZXJ5KHRvb2wgPT4ge1xyXG4gICAgICAvLyDQldGB0LvQuCDRgdGA0LXQtNC4INC/0L7Qu9GD0YfQtdC90L3Ri9GFINC40YLQtdC80L7QsiDQvdC10YIsINGC0L7Qs9C+INC60L7RgtC+0YDRi9C5INC10YHRgtGMINCyINC00LDQvdC90L7QvCDRjdC60YjQtdC90LVcclxuICAgICAgY29uc3QgY2hlY2tUb29sID0gZGF0YS5maW5kKG9iaiA9PiBvYmouaWQgPT09IHRvb2wuaWQpO1xyXG4gICAgICBpZiAoIWNoZWNrVG9vbCkgeyByZXR1cm4gZmFsc2U7IH1cclxuXHJcbiAgICAgIC8vINCU0LvRjyDQv9C10YDQtdC60LvRjtGH0LDRgtC10LvRj1xyXG4gICAgICBpZiAodHlwZW9mIHRvb2wudmFsdWUgPT09ICdib29sZWFuJykgeyByZXR1cm4gY2hlY2tUb29sLnZhbHVlID09PSB0b29sLnZhbHVlOyB9XHJcblxyXG4gICAgICAvLyDQlNC70Y8g0YDQtdC90LTQttCwXHJcbiAgICAgIGlmIChBcnJheS5pc0FycmF5KHRvb2wudmFsdWUpKSB7IHJldHVybiB0aGlzLmluY2x1ZGVzVmFsdWUoY2hlY2tUb29sLnZhbHVlLCB0b29sLnZhbHVlKSB9XHJcblxyXG4gICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIGluY2x1ZGVzVmFsdWUodmFsdWUsIGJvcmRlcnMpIHtcclxuICAgIGlmICh0eXBlb2YgdmFsdWUgIT09ICdudW1iZXInKSB0aHJvdyBuZXcgVHlwZUVycm9yKCdWYWx1ZSBzaG91bGQgYmUgaW50ZWdlcicpO1xyXG4gICAgcmV0dXJuICh2YWx1ZSA+PSBib3JkZXJzWzBdKSAmJiAodmFsdWUgPD0gYm9yZGVyc1sxXSk7XHJcbiAgfVxyXG5cclxuICByaWdodFRpbWUodGltZSkge1xyXG4gICAgaWYgKHR5cGVvZiB0aW1lICE9PSAnbnVtYmVyJykgdGhyb3cgbmV3IFR5cGVFcnJvcignVGltZSBzaG91bGQgYmUgaW50ZWdlciAobXMpJyk7XHJcbiAgICByZXR1cm4gKHRpbWUgPj0gdGhpcy5taW5UaW1lKSAmJiAodGltZSA8PSB0aGlzLm1heFRpbWUpO1xyXG4gIH1cclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgQWN0aW9uO1xyXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9sZWFybmluZy9tb2RlbF9jb21wb25lbnRzL2FjdGlvbi5qcyIsImNsYXNzIEV2ZW50IHtcclxuICBjb25zdHJ1Y3RvcihkYXRhKSB7XHJcbiAgICB0aGlzLmlkID0gZGF0YS5pZDtcclxuICAgIHRoaXMubmFtZSA9IGRhdGEubmFtZTtcclxuICAgIHRoaXMuZGVzY3JpcHRpb24gPSBkYXRhLmRlc2NyaXB0aW9uO1xyXG4gIH1cclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgRXZlbnQ7XHJcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2xlYXJuaW5nL21vZGVsX2NvbXBvbmVudHMvZXZlbnQuanMiLCJpbXBvcnQgRXZlbnQgZnJvbSAnLi9ldmVudCcgO1xyXG5pbXBvcnQgQWN0aW9uIGZyb20gJy4vYWN0aW9uJztcclxuXHJcbmNsYXNzIFN0YXRlIHtcclxuICBjb25zdHJ1Y3RvcihkYXRhKSB7XHJcbiAgICB0aGlzLmlkID0gZGF0YS5pZDtcclxuICAgIHRoaXMubmFtZSA9IGRhdGEubmFtZTtcclxuICAgIHRoaXMuaW1nID0gZGF0YS5pbWc7XHJcbiAgICB0aGlzLnBhcmFtcyA9IGRhdGEucGFyYW1zO1xyXG5cclxuICAgIGlmKGRhdGEubGFzdCkge1xyXG4gICAgICB0aGlzLmxhc3QgPSB0cnVlO1xyXG4gICAgICB0aGlzLmV2ZW50ID0gbnVsbDtcclxuICAgICAgdGhpcy5hY3Rpb25zID0gbnVsbDtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHRoaXMuZXZlbnQgPSBuZXcgRXZlbnQoZGF0YS5ldmVudCk7XHJcbiAgICAgIHRoaXMuYWN0aW9ucyA9IGRhdGEuYWN0aW9ucy5tYXAoYWN0aW9uID0+IG5ldyBBY3Rpb24oYWN0aW9uKSk7XHJcbiAgICAgIHRoaXMubGFzdCA9IGZhbHNlO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgZ2V0SW5hY3RpdmVUaW1lKCkge1xyXG4gICAgY29uc3QgdGltZXMgPSB0aGlzLmdldEFsbEFjdGlvblRpbWVzKCk7XHJcbiAgICByZXR1cm4gTWF0aC5tYXgoLi4udGltZXMpO1xyXG4gIH1cclxuXHJcbiAgZ2V0SW5hY3RpdmVBY3Rpb24oKSB7XHJcbiAgICByZXR1cm4gdGhpcy5hY3Rpb25zLmZpbmQoYWN0aW9uID0+IGFjdGlvbi5pbmFjdGl2ZSA9PT0gdHJ1ZSk7XHJcbiAgfVxyXG5cclxuICBnZXRBbGxBY3Rpb25UaW1lcygpIHtcclxuICAgIHJldHVybiB0aGlzLmFjdGlvbnMubWFwKGFjdGlvbiA9PiBhY3Rpb24ubWF4VGltZSB8fCAwKTtcclxuICB9XHJcblxyXG4gIGhhbmRsZUlucHV0KGRhdGEsIHRpbWUpIHtcclxuICAgIGNvbnN0IHN1aXRlZEFjdGlvbnMgPSB0aGlzLmFjdGlvbnMuZmlsdGVyKGFjdGlvbiA9PiBhY3Rpb24uaXNTdWl0YWJsZShkYXRhLCB0aW1lKSk7XHJcbiAgICBpZiAoc3VpdGVkQWN0aW9ucy5sZW5ndGggPiAwKSB7XHJcbiAgICAgIHJldHVybiBzdWl0ZWRBY3Rpb25zWzBdLm5leHRTdGF0ZTtcclxuICAgIH1cclxuICAgIHJldHVybiBudWxsO1xyXG4gIH1cclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgU3RhdGU7XHJcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2xlYXJuaW5nL21vZGVsX2NvbXBvbmVudHMvc3RhdGUuanMiLCJpbXBvcnQgbm9kZUZhY3RvcnkgZnJvbSAnLi4vLi4vdXRpbHMvbm9kZUZhY3RvcnknO1xyXG5cclxuY29uc3QgJG5hbWUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcubW9kZWwtc3RhdGUtbmFtZScpO1xyXG5jb25zdCAkaW1nID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLm1vZGVsLXN0YXRlLWltZycpO1xyXG5jb25zdCAkcGFyYW1zID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLm1vZGVsLXBhcmFtcy12YWx1ZXMnKTtcclxuXHJcbmNvbnN0ICRldmVudCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5tb2RlbC1ldmVudCcpO1xyXG5jb25zdCAkZXZlbnRIZWFkZXIgPSAkZXZlbnQucXVlcnlTZWxlY3RvcignLm1vZGVsLWV2ZW50LW5hbWUgc3BhbicpO1xyXG5jb25zdCAkZXZlbnRCb2R5ID0gJGV2ZW50LnF1ZXJ5U2VsZWN0b3IoJy5tb2RlbC1ldmVudC1pbmZvJyk7XHJcblxyXG5jb25zdCAkcmVzcG9uc2UgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcubW9kZWwtcmVzcG9uc2UnKTtcclxuXHJcbmZ1bmN0aW9uIHNldCh7IG5hbWUsIGltZywgcGFyYW1zIH0pIHtcclxuICAkbmFtZS50ZXh0Q29udGVudCA9IG5hbWU7XHJcbiAgJGltZy5zZXRBdHRyaWJ1dGUoJ3NyYycsIGltZyk7XHJcbiAgc2V0UGFyYW1ldGVycyhwYXJhbXMpO1xyXG59XHJcblxyXG5mdW5jdGlvbiBzZXRQYXJhbWV0ZXJzKHBhcmFtcykge1xyXG4gIGNvbnN0IGZyYWcgPSBkb2N1bWVudC5jcmVhdGVEb2N1bWVudEZyYWdtZW50KCk7XHJcbiAgZm9yIChsZXQga2V5IGluIHBhcmFtcykge1xyXG4gICAgZnJhZy5hcHBlbmRDaGlsZChjcmVhdGVQYXJhbWV0ZU5vZGUoa2V5LCBwYXJhbXNba2V5XSkpO1xyXG4gIH1cclxuICAkcGFyYW1zLmlubmVySFRNTCA9IFwiXCI7XHJcbiAgJHBhcmFtcy5hcHBlbmRDaGlsZChmcmFnKTtcclxufVxyXG5cclxuZnVuY3Rpb24gY3JlYXRlUGFyYW1ldGVOb2RlKGtleSwgdmFsdWUpIHtcclxuICBjb25zdCBkaXYgPSBub2RlRmFjdG9yeSgnZGl2JywgeyBjbGFzc0xpc3Q6IFsncGFyYW1ldGVyJ10gfSk7XHJcblxyXG4gIGNvbnN0IGtleVNwYW4gPSBub2RlRmFjdG9yeSgnc3BhbicsIHsgdGV4dENvbnRlbnQ6IGtleSB9KTtcclxuICBkaXYuYXBwZW5kQ2hpbGQoa2V5U3Bhbik7XHJcblxyXG4gIGNvbnN0IHZhbHVlU3BhbiA9IG5vZGVGYWN0b3J5KCdzcGFuJywgeyB0ZXh0Q29udGVudDogdmFsdWUgfSk7XHJcbiAgZGl2LmFwcGVuZENoaWxkKHZhbHVlU3Bhbik7XHJcblxyXG4gIHJldHVybiBkaXY7XHJcbn1cclxuXHJcblxyXG4vKiogU2V0cyBldmVudCBkYXRhIHRvIFVJICovXHJcbmZ1bmN0aW9uIHNob3dFdmVudChldmVudCkge1xyXG4gICRldmVudEhlYWRlci50ZXh0Q29udGVudCA9IGV2ZW50Lm5hbWU7XHJcbiAgJGV2ZW50Qm9keS50ZXh0Q29udGVudCA9IGV2ZW50LmRlc2NyaXB0aW9uO1xyXG4gICRldmVudC5jbGFzc0xpc3QucmVtb3ZlKCdpcy1oaWRkZW4nKTtcclxufVxyXG5mdW5jdGlvbiBoaWRlRXZlbnQoKSB7XHJcbiAgJGV2ZW50LmNsYXNzTGlzdC5hZGQoJ2lzLWhpZGRlbicpO1xyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCB7XHJcbiAgc2V0LFxyXG4gIHNob3dFdmVudCxcclxuICBoaWRlRXZlbnRcclxufVxyXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9sZWFybmluZy9zY2VuZV9jb21wb25lbnRzL3N0YXRlLmpzIiwiaW1wb3J0IG5vZGVGYWN0b3J5IGZyb20gJy4uLy4uL3V0aWxzL25vZGVGYWN0b3J5JztcclxuXHJcbmNvbnN0IHRvb2xUeXBlcyA9IHtcclxuICBSQU5HRTogJ3JhbmdlJyxcclxuICBTV0lUQ0g6ICdzd2l0Y2gnXHJcbn1cclxuY29uc3QgJHRvb2xzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnRvb2xzLWxpc3QnKTtcclxuXHJcbmZ1bmN0aW9uIGluaXQodG9vbHMpIHtcclxuICBjb25zdCBmcmFnbWVudCA9IGRvY3VtZW50LmNyZWF0ZURvY3VtZW50RnJhZ21lbnQoKTtcclxuXHJcbiAgdG9vbHMuZm9yRWFjaCh0b29sID0+IHtcclxuICAgIC8vIGNyZWF0ZSB0b29sIHdyYXBwZXJcclxuICAgIGNvbnN0IGRpdiA9IG5vZGVGYWN0b3J5KCdkaXYnLCB7IGNsYXNzTGlzdDogWyd0b29sJ10gfSk7XHJcblxyXG4gICAgY29uc3QgbGFiZWwgPSBub2RlRmFjdG9yeSgnbGFiZWwnLCB7XHJcbiAgICAgIGNsYXNzTGlzdDogWyd0b29sLW5hbWUnXSxcclxuICAgICAgYXR0cnM6IHsgXCJmb3JcIjogdG9vbC5uYW1lIH0sXHJcbiAgICAgIHRleHRDb250ZW50OiB0b29sLm5hbWVcclxuICAgIH0pO1xyXG4gICAgZGl2LmFwcGVuZENoaWxkKGxhYmVsKTtcclxuXHJcbiAgICBjb25zdCB0b29sTm9kZSA9IGNyZWF0ZVRvb2xOb2RlKHRvb2wpO1xyXG4gICAgZGl2LmFwcGVuZENoaWxkKHRvb2xOb2RlKTtcclxuXHJcbiAgICBmcmFnbWVudC5hcHBlbmRDaGlsZChkaXYpO1xyXG4gIH0pO1xyXG5cclxuICAkdG9vbHMuaW5uZXJIVE1MID0gXCJcIjtcclxuICAkdG9vbHMuYXBwZW5kQ2hpbGQoZnJhZ21lbnQpO1xyXG59XHJcblxyXG5mdW5jdGlvbiBjcmVhdGVUb29sTm9kZSh0b29sKSB7XHJcbiAgc3dpdGNoKHRvb2wudHlwZSkge1xyXG4gICAgY2FzZSB0b29sVHlwZXMuUkFOR0U6ICAgcmV0dXJuIGNyZWF0ZVJhbmdlVG9vbCh0b29sKTtcclxuICAgIGNhc2UgdG9vbFR5cGVzLlNXSVRDSDogIHJldHVybiBjcmVhdGVTd2l0Y2hUb29sKHRvb2wpO1xyXG4gICAgZGVmYXVsdDogICAgICAgICAgICAgICAgcmV0dXJuICfQndC10LjQt9Cy0LXRgdGC0L3Ri9C5INC/0YDQuNCx0L7RgCc7XHJcbiAgfVxyXG59XHJcblxyXG5mdW5jdGlvbiBjcmVhdGVSYW5nZVRvb2wodG9vbCkge1xyXG4gIGNvbnN0IGRpdklucHV0ID0gbm9kZUZhY3RvcnkoJ2RpdicsIHsgY2xhc3NMaXN0OiBbJ3JhbmdlJ10gfSk7XHJcblxyXG4gIGNvbnN0IHNwYW5NaW4gPSBub2RlRmFjdG9yeSgnc3BhbicsIHsgdGV4dENvbnRlbnQ6IHRvb2wubWluIH0pO1xyXG4gIGRpdklucHV0LmFwcGVuZENoaWxkKHNwYW5NaW4pXHJcblxyXG4gIGNvbnN0IGlucHV0ID0gbm9kZUZhY3RvcnkoJ2lucHV0Jywge1xyXG4gICAgYXR0cnM6IHtcclxuICAgICAgJ2RhdGEtaWQnOiB0b29sLmlkLFxyXG4gICAgICAnZGF0YS10eXBlJzogJ3JhbmdlJyxcclxuICAgICAgJ25hbWUnOiB0b29sLm5hbWUsXHJcbiAgICAgICd0eXBlJzogJ3JhbmdlJyxcclxuICAgICAgJ21pbic6IHRvb2wubWluLFxyXG4gICAgICAnbWF4JzogdG9vbC5tYXhcclxuICAgIH1cclxuICB9KTtcclxuICBkaXZJbnB1dC5hcHBlbmRDaGlsZChpbnB1dCk7XHJcblxyXG4gIGNvbnN0IHNwYW5NYXggPSBub2RlRmFjdG9yeSgnc3BhbicsIHsgdGV4dENvbnRlbnQ6IHRvb2wubWF4IH0pO1xyXG4gIGRpdklucHV0LmFwcGVuZENoaWxkKHNwYW5NYXgpO1xyXG5cclxuICBjb25zdCBkaXZDdXJyZW50ID0gbm9kZUZhY3RvcnkoJ2RpdicsIHsgY2xhc3NMaXN0OiBbJ3JhbmdlLWN1cnJlbnQtdmFsdWUnXSB9KTtcclxuICBjb25zdCBzcGFuQ3VycmVudCA9IG5vZGVGYWN0b3J5KCdzcGFuJywgeyB0ZXh0Q29udGVudDogaW5wdXQudmFsdWUgfSk7XHJcbiAgZGl2Q3VycmVudC5hcHBlbmRDaGlsZChzcGFuQ3VycmVudCk7XHJcblxyXG4gIGlucHV0LmFkZEV2ZW50TGlzdGVuZXIoJ2lucHV0JywgKGV2dCkgPT4ge1xyXG4gICAgc3BhbkN1cnJlbnQudGV4dENvbnRlbnQgPSBldnQudGFyZ2V0LnZhbHVlO1xyXG4gIH0pO1xyXG5cclxuICBjb25zdCBmcmFnbWVudCA9IGRvY3VtZW50LmNyZWF0ZURvY3VtZW50RnJhZ21lbnQoKTtcclxuICBmcmFnbWVudC5hcHBlbmRDaGlsZChkaXZJbnB1dCk7XHJcbiAgZnJhZ21lbnQuYXBwZW5kQ2hpbGQoZGl2Q3VycmVudCk7XHJcblxyXG4gIHJldHVybiBmcmFnbWVudDtcclxufVxyXG5cclxuZnVuY3Rpb24gY3JlYXRlU3dpdGNoVG9vbCh0b29sKSB7XHJcbiAgY29uc3QgbGFiZWwgPSBub2RlRmFjdG9yeSgnbGFiZWwnLCB7IGNsYXNzTGlzdDogWydzd2l0Y2gnXSB9KTtcclxuXHJcbiAgY29uc3QgaW5wdXQgPSBub2RlRmFjdG9yeSgnaW5wdXQnLCB7XHJcbiAgICBhdHRyczoge1xyXG4gICAgICAnZGF0YS1pZCc6IHRvb2wuaWQsXHJcbiAgICAgICdkYXRhLXR5cGUnOiAnc3dpdGNoJyxcclxuICAgICAgJ3R5cGUnOiAnY2hlY2tib3gnXHJcbiAgICB9XHJcbiAgfSk7XHJcbiAgbGFiZWwuYXBwZW5kQ2hpbGQoaW5wdXQpO1xyXG5cclxuICBjb25zdCBkaXYgPSBub2RlRmFjdG9yeSgnZGl2JywgeyBjbGFzc0xpc3Q6IFsnc2xpZGVyJ10gfSk7XHJcbiAgbGFiZWwuYXBwZW5kQ2hpbGQoZGl2KTtcclxuXHJcbiAgcmV0dXJuIGxhYmVsO1xyXG59XHJcblxyXG5mdW5jdGlvbiBnZXRUb29sc0RhdGEoKSB7XHJcbiAgY29uc3QgdG9vbHNEYXRhID0ge307XHJcbiAgY29uc3QgaW5wdXRzID0gdGhpcy4kdG9vbHNCb3gucXVlcnlTZWxlY3RvckFsbCgnaW5wdXRbZGF0YS1pZF0nKTtcclxuICBpbnB1dHMuZm9yRWFjaChpbnB1dCA9PiB7XHJcbiAgICBjb25zdCB7IGlkLCB0eXBlIH0gPSBpbnB1dC5kYXRhc2V0O1xyXG4gICAgbGV0IHZhbHVlO1xyXG4gICAgc3dpdGNoKHR5cGUpIHtcclxuICAgICAgY2FzZSB0b29sVHlwZXMuUkFOR0U6IHZhbHVlID0gcGFyc2VJbnQoaW5wdXQudmFsdWUpOyBicmVhaztcclxuICAgICAgY2FzZSB0b29sVHlwZXMuU1dJVENIOiB2YWx1ZSA9IGlucHV0LmNoZWNrZWQ7IGJyZWFrO1xyXG4gICAgICBkZWZhdWx0OiB0aHJvdyBuZXcgRXJyb3IoYNCd0LXQutC+0YDRgNC10LrRgtC90YvQuSDRgtC40L8g0L/RgNC40LHQvtGA0LAuIElEOiAke2lkfWApO1xyXG4gICAgfVxyXG4gICAgdG9vbHNEYXRhW2lkXSA9IHZhbHVlO1xyXG4gIH0pO1xyXG4gIHJldHVybiB0b29sc0RhdGE7XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IHtcclxuICBpbml0LFxyXG4gIGdldFRvb2xzRGF0YVxyXG59O1xyXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9sZWFybmluZy9zY2VuZV9jb21wb25lbnRzL3Rvb2xzLmpzIiwiaW1wb3J0ICcuLi8uLi9zYXNzL2xlYXJuaW5nLnNjc3MnO1xyXG5cclxuaW1wb3J0IHB1YnN1YiBmcm9tICcuLi91dGlscy9wdWJzdWInO1xyXG5pbXBvcnQgYWpheCBmcm9tICcuLi91dGlscy9hamF4JztcclxuaW1wb3J0IHNjZW5lIGZyb20gJy4vc2NlbmUnO1xyXG5pbXBvcnQgTW9kZWwgZnJvbSAnLi9tb2RlbCc7XHJcblxyXG4vKipcclxuICogTG9hZCBtb2RlbCB3aXRoIGdpdmVuIGlkXHJcbiAqL1xyXG5mdW5jdGlvbiBsb2FkTW9kZWwoaWQpIHtcclxuICByZXR1cm4gYWpheChgL21vZGVscy8ke2lkfWApLnRoZW4ocmVzcG9uc2UgPT4gSlNPTi5wYXJzZShyZXNwb25zZSkpO1xyXG59XHJcblxyXG4vKipcclxuICogVUkgYnV0dG9uJ3MgaGFuZGxlcnNcclxuICovXHJcbmNvbnN0ICRzZWxlY3QgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI21vZGVsLXNlbGVjdFwiKTtcclxuY29uc3QgJGxvYWRCdXR0b24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjbG9hZC1tb2RlbC1idG4nKTtcclxubGV0IG1vZGVsID0gbnVsbDtcclxuJGxvYWRCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XHJcbiAgY29uc3QgbW9kZWxJZCA9ICRzZWxlY3QudmFsdWU7XHJcbiAgbG9hZE1vZGVsKG1vZGVsSWQpXHJcbiAgICAudGhlbihyZXNwb25zZSA9PiB7XHJcbiAgICAgIG1vZGVsID0gbmV3IE1vZGVsKHJlc3BvbnNlKTtcclxuICAgICAgc2NlbmUuaW5pdChtb2RlbCwgcmVzcG9uc2UpLnNob3dDb250ZW50KCkuZW5hYmxlQnV0dG9ucygkc3RhcnRCdXR0b24pO1xyXG4gICAgfSlcclxuICAgIC5jYXRjaChlcnIgPT4geyBjb25zb2xlLmVycm9yKGVycikgfSk7XHJcbn0pO1xyXG4vL1xyXG5jb25zdCAkc3RhcnRCdXR0b24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjc3RhcnQtYnRuJyk7XHJcbiRzdGFydEJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcclxuICBtb2RlbC5zdGFydCgpO1xyXG4gIHNjZW5lLmRpc2FibGVCdXR0b25zKCRzdGFydEJ1dHRvbik7XHJcbiAgc2NlbmUuZW5hYmxlQnV0dG9ucygkc3RvcEJ1dHRvbiwgJHJ1bkJ1dHRvbik7XHJcbn0pO1xyXG5cclxuY29uc3QgJHN0b3BCdXR0b24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjc3RvcC1idG4nKTtcclxuJHN0b3BCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XHJcbiAgbW9kZWwuc3RvcCgpOyAvLyBUT0RPXHJcbiAgc2NlbmUuZW5hYmxlQnV0dG9ucygkc3RhcnRCdXR0b24pO1xyXG4gIHNjZW5lLmRpc2FibGVCdXR0b25zKCRzdG9wQnV0dG9uLCAkcnVuQnV0dG9uKTtcclxufSk7XHJcblxyXG5jb25zdCAkcnVuQnV0dG9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3J1bi1idG4nKTtcclxuLy8gJHJ1bkJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcclxuLy8gICBjb25zdCB0b29sc0RhdGEgPSBzY2VuZS5nZXRUb29sc0RhdGEoKTtcclxuLy8gICBwdWJzdWIucHVibGlzaCgndXNlcl9pbnB1dCcsIHRvb2xzRGF0YSk7XHJcbi8vIH0pO1xyXG4vL1xyXG4vLyAvKipcclxuLy8gICogSGFuZGxlIGN1c3RvbSBldmVudHMgaGVyZSAodXNlciBpbnB1dCwgcHJvZ3JhbW0gbWVzc2FnZXMgZXRjLilcclxuLy8gICovXHJcbi8vIHB1YnN1Yi5zdWJzY3JpYmUoJ25ld19zdGF0ZScsIHN0YXRlID0+IHNjZW5lLnNldFN0YXRlKHN0YXRlKSk7XHJcbi8vIHB1YnN1Yi5zdWJzY3JpYmUoJ2V2ZW50JywgZGF0YSA9PiBzY2VuZS5zZXRFdmVudChkYXRhLmV2ZW50KSk7XHJcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2xlYXJuaW5nL2luZGV4LmpzIl0sInNvdXJjZVJvb3QiOiIifQ==