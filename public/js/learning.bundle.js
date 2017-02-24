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
/******/ 	return __webpack_require__(__webpack_require__.s = 8);
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

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _state = __webpack_require__(7);

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
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _state = __webpack_require__(14);

var _state2 = _interopRequireDefault(_state);

var _tools = __webpack_require__(15);

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

//   /** Sets event data to UI */
//   setEvent(event) {
//     console.log(event);
//     this.$event.querySelector('.model-event-name span').textContent = event.name;
//     this.$event.querySelector('.model-event-info').textContent = event.description;
//     this.$event.classList.remove('is-hidden');
//   }
//   hideEvent() {
//     this.$event.classList.add('is-hidden');
//   }
//
//   /** Get data from tool nodes */
//   getToolsData() {
//     const toolsData = {};
//     const inputs = this.$toolsBox.querySelectorAll('input[data-id]');
//     inputs.forEach(input => {
//       const { id, type } = input.dataset;
//       let value;
//       switch(type) {
//         case 'range': value = parseInt(input.value); break;
//         case 'switch': value = input.checked; break;
//         default: throw new Error('Invalid tool type');
//       }
//       toolsData[id] = value;
//     });
//     return toolsData;
//   }
// }

exports.default = _exports;

/***/ }),
/* 3 */
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
/* 4 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 5 */
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
/* 6 */
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
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _event = __webpack_require__(6);

var _event2 = _interopRequireDefault(_event);

var _action = __webpack_require__(5);

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
      this.action = null;
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
      if (suitedActions) {
        return suitedActions[0].nextState;
      }
    }
  }]);

  return State;
}();

exports.default = State;

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


__webpack_require__(4);

var _pubsub = __webpack_require__(0);

var _pubsub2 = _interopRequireDefault(_pubsub);

var _ajax = __webpack_require__(3);

var _ajax2 = _interopRequireDefault(_ajax);

var _scene = __webpack_require__(2);

var _scene2 = _interopRequireDefault(_scene);

var _model = __webpack_require__(1);

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
// $startButton.addEventListener('click', () => {
//   model.start();
// });
//
var $stopButton = document.querySelector('#stop-btn');
// $stopButton.addEventListener('click', () => {
//   model.stop(); // TODO
// });
//
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

/***/ }),
/* 9 */,
/* 10 */,
/* 11 */,
/* 12 */,
/* 13 */,
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _nodeFactory = __webpack_require__(16);

var _nodeFactory2 = _interopRequireDefault(_nodeFactory);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var $name = document.querySelector('.model-state-name');
var $img = document.querySelector('.model-state-img');
var $params = document.querySelector('.model-params-values');
var $event = document.querySelector('.model-event');
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

exports.default = {
  set: set
};

/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _nodeFactory = __webpack_require__(16);

var _nodeFactory2 = _interopRequireDefault(_nodeFactory);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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
    case 'range':
      return createRangeTool(tool);
    case 'switch':
      return createSwitchTool(tool);
    default:
      return 'Unknown tool type';
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

exports.default = {
  init: init
};

/***/ }),
/* 16 */
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

/***/ })
/******/ ]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgNGFjMTgzZjcyZTVmM2Y2MWM5ZjAiLCJ3ZWJwYWNrOi8vLy4vdXRpbHMvcHVic3ViLmpzIiwid2VicGFjazovLy8uL2xlYXJuaW5nL21vZGVsLmpzIiwid2VicGFjazovLy8uL2xlYXJuaW5nL3NjZW5lLmpzIiwid2VicGFjazovLy8uL3V0aWxzL2FqYXguanMiLCJ3ZWJwYWNrOi8vLy4uL3Nhc3MvbGVhcm5pbmcuc2NzcyIsIndlYnBhY2s6Ly8vLi9sZWFybmluZy9tb2RlbF9jb21wb25lbnRzL2FjdGlvbi5qcyIsIndlYnBhY2s6Ly8vLi9sZWFybmluZy9tb2RlbF9jb21wb25lbnRzL2V2ZW50LmpzIiwid2VicGFjazovLy8uL2xlYXJuaW5nL21vZGVsX2NvbXBvbmVudHMvc3RhdGUuanMiLCJ3ZWJwYWNrOi8vLy4vbGVhcm5pbmcvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vbGVhcm5pbmcvc2NlbmVfY29tcG9uZW50cy9zdGF0ZS5qcyIsIndlYnBhY2s6Ly8vLi9sZWFybmluZy9zY2VuZV9jb21wb25lbnRzL3Rvb2xzLmpzIiwid2VicGFjazovLy8uL3V0aWxzL25vZGVGYWN0b3J5LmpzIl0sIm5hbWVzIjpbInB1YnN1YiIsInRvcGljcyIsInN1YnNjcmliZSIsInRvcGljIiwibGlzdGVuZXIiLCJxdWV1ZSIsImluZGV4IiwicHVzaCIsInJlbW92ZSIsInB1Ymxpc2giLCJpbmZvIiwibGVuZ3RoIiwiaXRlbXMiLCJmb3JFYWNoIiwiaXRlbSIsIk1vZGVsIiwiZGF0YSIsImlkIiwibmFtZSIsImJyZWFrVGltZSIsInN0ZXBzIiwic3RhdGVzIiwibWFwIiwic3RhdGUiLCJjdXJyZW50U3RhdGUiLCJnZXRTdGF0ZSIsInRpbWVvdXQiLCJzdWJzY3JpYnRpb24iLCJmaW5kIiwiaW50ZXJ2YWxzIiwiUHJvbWlzZSIsInJlc29sdmUiLCJpIiwidGhlbiIsIm1ha2VCcmVhayIsImhhbmRsZUV2ZW50IiwiaGFuZGxlTmV3U3RhdGUiLCJjYXRjaCIsInJlamVjdCIsInNldFRpbWVvdXQiLCJldmVudCIsImV2ZW50U3RhcnRUaW1lIiwiRGF0ZSIsIm5vdyIsInRpbWVTcGVudCIsIm5leHRTdGF0ZUlkIiwiaGFuZGxlSW5wdXQiLCJuZXh0U3RhdGUiLCJsYXN0IiwiaW5hY3RpdmVUaW1lIiwiZ2V0SW5hY3RpdmVUaW1lIiwiZ2V0SW5hY3RpdmVBY3Rpb24iLCJjbGVhclRpbWVvdXQiLCJleHBvcnRzIiwiJG1vZGVsTmFtZSIsImRvY3VtZW50IiwicXVlcnlTZWxlY3RvciIsImluaXQiLCJtb2RlbCIsInJlc3BvbnNlIiwidGV4dENvbnRlbnQiLCJzZXQiLCJ0b29scyIsIiRjb250ZW50Iiwic2hvd0NvbnRlbnQiLCJzZXRDb250ZW50RGlzcGxheSIsImhpZGVDb250ZW50IiwiZGlzcGxheSIsInN0eWxlIiwiZW5hYmxlQnV0dG9ucyIsImJ1dHRvbnMiLCJzZXRCdXR0b25zU3RhdGUiLCJkaXNhYmxlQnV0dG9ucyIsInZhbHVlIiwiYnV0dG9uIiwiZGlzYWJsZWQiLCJhamF4IiwicGF0aCIsIm9wdGlvbnMiLCJ4aHIiLCJYTUxIdHRwUmVxdWVzdCIsIm9wZW4iLCJtZXRob2QiLCJoZWFkZXJzIiwic2V0WEhSSGVhZGVycyIsInNlbmQiLCJvbnJlYWR5c3RhdGVjaGFuZ2UiLCJyZWFkeVN0YXRlIiwic3RhdHVzIiwicmVzcG9uc2VUZXh0Iiwic3RhdHVzVGV4dCIsImhlYWRlciIsInNldFJlcXVlc3RIZWFkZXIiLCJBY3Rpb24iLCJtaW5UaW1lIiwibWF4VGltZSIsImluYWN0aXZlIiwidGltZSIsInJpZ2h0VGltZSIsInJpZ2h0RGF0YSIsIkFycmF5IiwiaXNBcnJheSIsIlR5cGVFcnJvciIsImV2ZXJ5IiwiY2hlY2tUb29sIiwib2JqIiwidG9vbCIsImluY2x1ZGVzVmFsdWUiLCJib3JkZXJzIiwiRXZlbnQiLCJkZXNjcmlwdGlvbiIsIlN0YXRlIiwiaW1nIiwicGFyYW1zIiwiYWN0aW9uIiwiYWN0aW9ucyIsInRpbWVzIiwiZ2V0QWxsQWN0aW9uVGltZXMiLCJNYXRoIiwibWF4Iiwic3VpdGVkQWN0aW9ucyIsImZpbHRlciIsImlzU3VpdGFibGUiLCJsb2FkTW9kZWwiLCJKU09OIiwicGFyc2UiLCIkc2VsZWN0IiwiJGxvYWRCdXR0b24iLCJhZGRFdmVudExpc3RlbmVyIiwibW9kZWxJZCIsIiRzdGFydEJ1dHRvbiIsImNvbnNvbGUiLCJlcnJvciIsImVyciIsIiRzdG9wQnV0dG9uIiwiJHJ1bkJ1dHRvbiIsIiRuYW1lIiwiJGltZyIsIiRwYXJhbXMiLCIkZXZlbnQiLCIkcmVzcG9uc2UiLCJzZXRBdHRyaWJ1dGUiLCJzZXRQYXJhbWV0ZXJzIiwiZnJhZyIsImNyZWF0ZURvY3VtZW50RnJhZ21lbnQiLCJrZXkiLCJhcHBlbmRDaGlsZCIsImNyZWF0ZVBhcmFtZXRlTm9kZSIsImlubmVySFRNTCIsImRpdiIsImNsYXNzTGlzdCIsImtleVNwYW4iLCJ2YWx1ZVNwYW4iLCIkdG9vbHMiLCJmcmFnbWVudCIsImxhYmVsIiwiYXR0cnMiLCJ0b29sTm9kZSIsImNyZWF0ZVRvb2xOb2RlIiwidHlwZSIsImNyZWF0ZVJhbmdlVG9vbCIsImNyZWF0ZVN3aXRjaFRvb2wiLCJkaXZJbnB1dCIsInNwYW5NaW4iLCJtaW4iLCJpbnB1dCIsInNwYW5NYXgiLCJkaXZDdXJyZW50Iiwic3BhbkN1cnJlbnQiLCJldnQiLCJ0YXJnZXQiLCJub2RlRmFjdG9yeSIsIm5vZGUiLCJjcmVhdGVFbGVtZW50IiwiYXBwZW5kQ2xhc3NlcyIsImFwcGVuZEF0dHJzIiwiaW5zZXJ0VGV4dENvbnRlbnQiLCJhZGQiLCJjbGFzc05hbWUiLCJhdHRyTmFtZXMiLCJPYmplY3QiLCJrZXlzIiwiYXR0ck5hbWUiXSwibWFwcGluZ3MiOiI7QUFBQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7QUFHQTtBQUNBOztBQUVB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QVQsQ0FBdUJkLElBQXZCLENBQWI7O0FBRUFlLGdCQUFjRixJQUFkLEVBQW9CM0QsTUFBcEI7QUFDQThELGNBQVlILElBQVosRUFBa0IzRCxNQUFsQjtBQUNBK0Qsb0JBQWtCSixJQUFsQixFQUF3QjNELE1BQXhCOztBQUVBLFNBQU8yRCxJQUFQO0FBQ0QsQ0FSRDs7QUFVQSxTQUFTRSxhQUFULENBQXVCRixJQUF2QixRQUE0QztBQUFBLE1BQWJ0QixTQUFhLFFBQWJBLFNBQWE7O0FBQzFDLE1BQUlBLGFBQWFBLFVBQVV6SSxPQUEzQixFQUFvQztBQUNsQ3lJLGNBQVV6SSxPQUFWLENBQWtCO0FBQUEsYUFBYStKLEtBQUt0QixTQUFMLENBQWUyQixHQUFmLENBQW1CQyxTQUFuQixDQUFiO0FBQUEsS0FBbEI7QUFDRDtBQUNGOztBQUVELFNBQVNILFdBQVQsQ0FBcUJILElBQXJCLFNBQXNDO0FBQUEsTUFBVGhCLEtBQVMsU0FBVEEsS0FBUzs7QUFDcEMsTUFBSUEsS0FBSixFQUFXO0FBQ1QsUUFBTXVCLFlBQVlDLE9BQU9DLElBQVAsQ0FBWXpCLEtBQVosQ0FBbEI7QUFDQXVCLGNBQVV0SyxPQUFWLENBQWtCO0FBQUEsYUFBWStKLEtBQUsvQixZQUFMLENBQWtCeUMsUUFBbEIsRUFBNEIxQixNQUFNMEIsUUFBTixDQUE1QixDQUFaO0FBQUEsS0FBbEI7QUFDRDtBQUNGOztBQUVELFNBQVNOLGlCQUFULENBQTJCSixJQUEzQixTQUF1RDtBQUFBLGdDQUFwQmhILFdBQW9CO0FBQUEsTUFBcEJBLFdBQW9CLHFDQUFOLEVBQU07O0FBQ3JEZ0gsT0FBS2hILFdBQUwsR0FBbUJBLFdBQW5CO0FBQ0Q7O2tCQUVjK0csVyIsImZpbGUiOiJsZWFybmluZy5idW5kbGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSlcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcblxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gaWRlbnRpdHkgZnVuY3Rpb24gZm9yIGNhbGxpbmcgaGFybW9ueSBpbXBvcnRzIHdpdGggdGhlIGNvcnJlY3QgY29udGV4dFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5pID0gZnVuY3Rpb24odmFsdWUpIHsgcmV0dXJuIHZhbHVlOyB9O1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHtcbiBcdFx0XHRcdGNvbmZpZ3VyYWJsZTogZmFsc2UsXG4gXHRcdFx0XHRlbnVtZXJhYmxlOiB0cnVlLFxuIFx0XHRcdFx0Z2V0OiBnZXR0ZXJcbiBcdFx0XHR9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSA4KTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyB3ZWJwYWNrL2Jvb3RzdHJhcCA0YWMxODNmNzJlNWYzZjYxYzlmMCIsImNvbnN0IHB1YnN1YiA9IChmdW5jdGlvbigpIHtcclxuXHJcbiAgY29uc3QgdG9waWNzID0ge307XHJcblxyXG4gIHJldHVybiB7XHJcbiAgICBzdWJzY3JpYmU6IGZ1bmN0aW9uKHRvcGljLCBsaXN0ZW5lcikge1xyXG4gICAgICBpZiAoIXRvcGljc1t0b3BpY10pIHRvcGljc1t0b3BpY10gPSB7IHF1ZXVlOiBbXSB9O1xyXG5cclxuICAgICAgY29uc3QgaW5kZXggPSB0b3BpY3NbdG9waWNdLnF1ZXVlLnB1c2gobGlzdGVuZXIpIC0gMTtcclxuICAgICAgLy8gZnVuY3Rpb24gdG8gZGVsZXRlIHRvcGljXHJcbiAgICAgIHJldHVybiB7XHJcbiAgICAgICAgcmVtb3ZlOiBmdW5jdGlvbigpIHtcclxuICAgICAgICAgIGRlbGV0ZSB0b3BpY3NbdG9waWNdLnF1ZXVlW2luZGV4XTtcclxuICAgICAgICB9XHJcbiAgICAgIH07XHJcbiAgICB9LFxyXG5cclxuICAgIHB1Ymxpc2g6IGZ1bmN0aW9uKHRvcGljLCBpbmZvKSB7XHJcbiAgICAgIC8vIG5vIHRoZW1lIG9yIG5vIGxpc3RlbmVyc1xyXG4gICAgICBpZiAoIXRvcGljc1t0b3BpY10gfHwgIXRvcGljc1t0b3BpY10ucXVldWUubGVuZ3RoKSByZXR1cm47XHJcblxyXG4gICAgICBjb25zdCBpdGVtcyA9IHRvcGljc1t0b3BpY10ucXVldWU7XHJcbiAgICAgIGl0ZW1zLmZvckVhY2goaXRlbSA9PiB7XHJcbiAgICAgICAgaXRlbShpbmZvIHx8IHt9KTtcclxuICAgICAgfSk7XHJcbiAgICB9XHJcbiAgfTtcclxufSkoKTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IHB1YnN1YjtcclxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vdXRpbHMvcHVic3ViLmpzIiwiaW1wb3J0IFN0YXRlIGZyb20gJy4vbW9kZWxfY29tcG9uZW50cy9zdGF0ZSc7XHJcbmltcG9ydCBwdWJzdWIgZnJvbSAnLi4vdXRpbHMvcHVic3ViJztcclxuXHJcbmNsYXNzIE1vZGVsIHtcclxuICBjb25zdHJ1Y3RvcihkYXRhKSB7XHJcbiAgICB0aGlzLmlkID0gZGF0YS5pZDtcclxuICAgIHRoaXMubmFtZSA9IGRhdGEubmFtZTtcclxuICAgIHRoaXMuYnJlYWtUaW1lID0gZGF0YS5icmVha1RpbWU7XHJcbiAgICB0aGlzLnN0ZXBzID0gZGF0YS5zdGVwcztcclxuXHJcbiAgICB0aGlzLnN0YXRlcyA9IGRhdGEuc3RhdGVzLm1hcChzdGF0ZSA9PiBuZXcgU3RhdGUoc3RhdGUpKTtcclxuICAgIHRoaXMuY3VycmVudFN0YXRlID0gdGhpcy5nZXRTdGF0ZShkYXRhLmlkKTtcclxuXHJcbiAgICB0aGlzLnRpbWVvdXQgPSBudWxsO1xyXG4gICAgdGhpcy5zdWJzY3JpYnRpb24gPSBudWxsO1xyXG4gIH1cclxuXHJcbiAgZ2V0U3RhdGUoaWQpIHtcclxuICAgIHJldHVybiB0aGlzLnN0YXRlcy5maW5kKHN0YXRlID0+IHN0YXRlLmlkID09IGlkKTtcclxuICB9XHJcblxyXG4gIHN0YXJ0KCkge1xyXG4gICAgbGV0IGludGVydmFscyA9IFByb21pc2UucmVzb2x2ZSgpOyAvLyBpbml0IHByb21pc2UgY2hhaW5cclxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5zdGVwczsgaSsrKSB7XHJcbiAgICAgIGludGVydmFscyA9IGludGVydmFsc1xyXG4gICAgICAgLnRoZW4oKCkgPT4geyByZXR1cm4gdGhpcy5tYWtlQnJlYWsoKSB9KVxyXG4gICAgICAgLnRoZW4oKCkgPT4geyByZXR1cm4gdGhpcy5oYW5kbGVFdmVudCgpIH0pXHJcbiAgICAgICAudGhlbihzdGF0ZSA9PiB7IHRoaXMuaGFuZGxlTmV3U3RhdGUoc3RhdGUpIH0pXHJcbiAgICB9XHJcbiAgICBpbnRlcnZhbHMuY2F0Y2goc3RhdGUgPT4geyBwdWJzdWIucHVibGlzaCgnbmV3X3N0YXRlJywgIHN0YXRlKSB9KTtcclxuICB9XHJcblxyXG4gIG1ha2VCcmVhaygpIHtcclxuICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XHJcbiAgICAgIHNldFRpbWVvdXQoKCkgPT4geyByZXNvbHZlKCkgfSwgdGhpcy5icmVha1RpbWUpO1xyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICBoYW5kbGVFdmVudCgpIHtcclxuICAgIGNvbnN0IGV2ZW50ID0gdGhpcy5jdXJyZW50U3RhdGUuZXZlbnQ7XHJcbiAgICBjb25zdCBldmVudFN0YXJ0VGltZSA9IERhdGUubm93KCk7XHJcbiAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xyXG4gICAgICAvLyBzZW5kIGRhdGEgYWJvdXQgbmV3IGV2ZW50IHRvIG90aGVyIG1vZHVsZXNcclxuICAgICAgcHVic3ViLnB1Ymxpc2goJ2V2ZW50JywgeyBldmVudCB9KTtcclxuXHJcbiAgICAgIC8vIGxpc3RlbiB0byB1c2VyIGFjdGlvblxyXG4gICAgICAvLyBhbmQgaWYgdXNlciBpbnB1dCBjb3JyZWN0IGdvIHRvIG5leHQgc3RhdGVcclxuICAgICAgdGhpcy5zdWJzY3JpYnRpb24gPSBwdWJzdWIuc3Vic2NyaWJlKCd1c2VyX2lucHV0JywgZGF0YSA9PiB7XHJcbiAgICAgICAgY29uc3QgdGltZVNwZW50ID0gRGF0ZS5ub3coKSAtIGV2ZW50U3RhcnRUaW1lO1xyXG4gICAgICAgIGNvbnN0IG5leHRTdGF0ZUlkID0gdGhpcy5jdXJyZW50U3RhdGUuaGFuZGxlSW5wdXQoZGF0YSwgdGltZVNwZW50KTtcclxuICAgICAgICBjb25zdCBuZXh0U3RhdGUgPSB0aGlzLmdldFN0YXRlKG5leHRTdGF0ZUlkKTtcclxuICAgICAgICBpZiAobmV4dFN0YXRlKSB7XHJcbiAgICAgICAgICBuZXh0U3RhdGUubGFzdCA/IHJlamVjdChuZXh0U3RhdGUpIDogcmVzb2x2ZShuZXh0U3RhdGUpO1xyXG4gICAgICAgIH1cclxuICAgICAgfSlcclxuXHJcbiAgICAgIC8vIGhhbmRsZSBpbmFjdGl2ZVxyXG4gICAgICBjb25zdCBpbmFjdGl2ZVRpbWUgPSBldmVudC5nZXRJbmFjdGl2ZVRpbWUoKTtcclxuICAgICAgdGhpcy50aW1lb3V0ID0gc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgY29uc3QgbmV4dFN0YXRlSWQgPSBldmVudC5nZXRJbmFjdGl2ZUFjdGlvbigpLm5leHRTdGF0ZTtcclxuICAgICAgICBjb25zdCBuZXh0U3RhdGUgPSB0aGlzLmdldFN0YXRlKG5leHRTdGF0ZUlkKTtcclxuICAgICAgICBuZXh0U3RhdGUubGFzdCA/IHJlamVjdChuZXh0U3RhdGUpIDogcmVzb2x2ZShuZXh0U3RhdGUpO1xyXG4gICAgICB9LCBpbmFjdGl2ZVRpbWUpO1xyXG4gICAgfSlcclxuICB9XHJcblxyXG4gIGhhbmRsZU5ld1N0YXRlKHN0YXRlKSB7XHJcbiAgICB0aGlzLmN1cnJlbnRTdGF0ZSA9IHN0YXRlO1xyXG4gICAgY2xlYXJUaW1lb3V0KHRoaXMudGltZW91dCk7XHJcbiAgICB0aGlzLnN1YnNjcmlidGlvbi5yZW1vdmUoKTtcclxuICAgIHB1YnN1Yi5wdWJsaXNoKCduZXdfc3RhdGUnLCBzdGF0ZSk7XHJcbiAgfVxyXG5cclxuICAvLyBUT0RPXHJcbiAgc3RvcCgpIHtcclxuXHJcbiAgfVxyXG5cclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgTW9kZWw7XHJcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2xlYXJuaW5nL21vZGVsLmpzIiwiaW1wb3J0IHN0YXRlIGZyb20gJy4vc2NlbmVfY29tcG9uZW50cy9zdGF0ZSc7XHJcbmltcG9ydCB0b29scyBmcm9tICcuL3NjZW5lX2NvbXBvbmVudHMvdG9vbHMnO1xyXG5cclxuY29uc3QgZXhwb3J0cyA9IHt9O1xyXG5cclxuLy8gU2NlbmUgbWV0YWRhdGFcclxuY29uc3QgJG1vZGVsTmFtZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5tb2RlbC1uYW1lJyk7XHJcbmV4cG9ydHMuaW5pdCA9IGZ1bmN0aW9uKG1vZGVsLCByZXNwb25zZSkge1xyXG4gICRtb2RlbE5hbWUudGV4dENvbnRlbnQgPSBtb2RlbC5uYW1lO1xyXG4gIHN0YXRlLnNldChtb2RlbC5jdXJyZW50U3RhdGUpO1xyXG4gIHRvb2xzLmluaXQocmVzcG9uc2UudG9vbHMpO1xyXG4gIHJldHVybiB0aGlzO1xyXG59XHJcblxyXG4vLyBNYW5hZ2UgY29udGVudCB2aXNpYmlsaXR5XHJcbmNvbnN0ICRjb250ZW50ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmNvbnRlbnQnKTtcclxuZXhwb3J0cy5zaG93Q29udGVudCA9IGZ1bmN0aW9uKCkge1xyXG4gIHNldENvbnRlbnREaXNwbGF5KCdmbGV4Jyk7XHJcbiAgcmV0dXJuIHRoaXM7XHJcbn1cclxuZXhwb3J0cy5oaWRlQ29udGVudCA9IGZ1bmN0aW9uKCkge1xyXG4gIHNldENvbnRlbnREaXNwbGF5KCdub25lJyk7XHJcbiAgcmV0dXJuIHRoaXM7XHJcbn1cclxuZnVuY3Rpb24gc2V0Q29udGVudERpc3BsYXkoZGlzcGxheSkge1xyXG4gICRjb250ZW50LnN0eWxlLmRpc3BsYXkgPSBkaXNwbGF5O1xyXG59XHJcblxyXG4vLyBNYW5hZ2UgYnV0dG9ucyBzdGF0ZVxyXG5leHBvcnRzLmVuYWJsZUJ1dHRvbnMgPSBmdW5jdGlvbiguLi5idXR0b25zKSB7XHJcbiAgc2V0QnV0dG9uc1N0YXRlKGJ1dHRvbnMsIGZhbHNlKTtcclxufVxyXG5leHBvcnRzLmRpc2FibGVCdXR0b25zID0gZnVuY3Rpb24oLi4uYnV0dG9ucykge1xyXG4gIHNldEJ1dHRvbnNTdGF0ZShidXR0b25zLCB0cnVlKTtcclxufVxyXG5mdW5jdGlvbiBzZXRCdXR0b25zU3RhdGUoYnV0dG9ucywgdmFsdWUpIHtcclxuICBidXR0b25zLmZvckVhY2goYnV0dG9uID0+IGJ1dHRvbi5kaXNhYmxlZCA9IHZhbHVlKTtcclxufVxyXG5cclxuLy8gICAvKiogU2V0cyBldmVudCBkYXRhIHRvIFVJICovXHJcbi8vICAgc2V0RXZlbnQoZXZlbnQpIHtcclxuLy8gICAgIGNvbnNvbGUubG9nKGV2ZW50KTtcclxuLy8gICAgIHRoaXMuJGV2ZW50LnF1ZXJ5U2VsZWN0b3IoJy5tb2RlbC1ldmVudC1uYW1lIHNwYW4nKS50ZXh0Q29udGVudCA9IGV2ZW50Lm5hbWU7XHJcbi8vICAgICB0aGlzLiRldmVudC5xdWVyeVNlbGVjdG9yKCcubW9kZWwtZXZlbnQtaW5mbycpLnRleHRDb250ZW50ID0gZXZlbnQuZGVzY3JpcHRpb247XHJcbi8vICAgICB0aGlzLiRldmVudC5jbGFzc0xpc3QucmVtb3ZlKCdpcy1oaWRkZW4nKTtcclxuLy8gICB9XHJcbi8vICAgaGlkZUV2ZW50KCkge1xyXG4vLyAgICAgdGhpcy4kZXZlbnQuY2xhc3NMaXN0LmFkZCgnaXMtaGlkZGVuJyk7XHJcbi8vICAgfVxyXG4vL1xyXG4vLyAgIC8qKiBHZXQgZGF0YSBmcm9tIHRvb2wgbm9kZXMgKi9cclxuLy8gICBnZXRUb29sc0RhdGEoKSB7XHJcbi8vICAgICBjb25zdCB0b29sc0RhdGEgPSB7fTtcclxuLy8gICAgIGNvbnN0IGlucHV0cyA9IHRoaXMuJHRvb2xzQm94LnF1ZXJ5U2VsZWN0b3JBbGwoJ2lucHV0W2RhdGEtaWRdJyk7XHJcbi8vICAgICBpbnB1dHMuZm9yRWFjaChpbnB1dCA9PiB7XHJcbi8vICAgICAgIGNvbnN0IHsgaWQsIHR5cGUgfSA9IGlucHV0LmRhdGFzZXQ7XHJcbi8vICAgICAgIGxldCB2YWx1ZTtcclxuLy8gICAgICAgc3dpdGNoKHR5cGUpIHtcclxuLy8gICAgICAgICBjYXNlICdyYW5nZSc6IHZhbHVlID0gcGFyc2VJbnQoaW5wdXQudmFsdWUpOyBicmVhaztcclxuLy8gICAgICAgICBjYXNlICdzd2l0Y2gnOiB2YWx1ZSA9IGlucHV0LmNoZWNrZWQ7IGJyZWFrO1xyXG4vLyAgICAgICAgIGRlZmF1bHQ6IHRocm93IG5ldyBFcnJvcignSW52YWxpZCB0b29sIHR5cGUnKTtcclxuLy8gICAgICAgfVxyXG4vLyAgICAgICB0b29sc0RhdGFbaWRdID0gdmFsdWU7XHJcbi8vICAgICB9KTtcclxuLy8gICAgIHJldHVybiB0b29sc0RhdGE7XHJcbi8vICAgfVxyXG4vLyB9XHJcblxyXG5leHBvcnQgZGVmYXVsdCBleHBvcnRzO1xyXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9sZWFybmluZy9zY2VuZS5qcyIsImZ1bmN0aW9uIGFqYXgocGF0aCA9ICcnLCBvcHRpb25zID0ge30pIHtcclxuICBjb25zdCB4aHIgPSBuZXcgWE1MSHR0cFJlcXVlc3QoKTtcclxuICB4aHIub3BlbihvcHRpb25zLm1ldGhvZCB8fCAnR0VUJywgcGF0aCwgdHJ1ZSk7XHJcbiAgaWYgKG9wdGlvbnMuaGVhZGVycykgeyBzZXRYSFJIZWFkZXJzKHhociwgb3B0aW9ucy5oZWFkZXJzKTsgfVxyXG4gIHhoci5zZW5kKG9wdGlvbnMuZGF0YSk7XHJcblxyXG4gIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XHJcbiAgICB4aHIub25yZWFkeXN0YXRlY2hhbmdlID0gZnVuY3Rpb24oKSB7XHJcbiAgICAgIGlmKHhoci5yZWFkeVN0YXRlID09IDQpIHtcclxuICAgICAgICBpZih4aHIuc3RhdHVzID09IDIwMCkge1xyXG4gICAgICAgICAgcmVzb2x2ZSh4aHIucmVzcG9uc2VUZXh0KTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgcmVqZWN0KHhoci5zdGF0dXNUZXh0KTtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9KVxyXG59XHJcblxyXG5mdW5jdGlvbiBzZXRYSFJIZWFkZXJzKHhociwgaGVhZGVycykge1xyXG4gIGZvciAobGV0IGhlYWRlciBpbiBoZWFkZXJzKSB7XHJcbiAgICB4aHIuc2V0UmVxdWVzdEhlYWRlcihoZWFkZXIsIGhlYWRlcnNbaGVhZGVyc10pO1xyXG4gIH1cclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgYWpheDtcclxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vdXRpbHMvYWpheC5qcyIsIi8vIHJlbW92ZWQgYnkgZXh0cmFjdC10ZXh0LXdlYnBhY2stcGx1Z2luXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi4vc2Fzcy9sZWFybmluZy5zY3NzXG4vLyBtb2R1bGUgaWQgPSA0XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsImNsYXNzIEFjdGlvbiB7XHJcbiAgY29uc3RydWN0b3IoZGF0YSkge1xyXG4gICAgdGhpcy5taW5UaW1lID0gZGF0YS5taW5UaW1lO1xyXG4gICAgdGhpcy5tYXhUaW1lID0gZGF0YS5tYXhUaW1lO1xyXG4gICAgdGhpcy5uZXh0U3RhdGUgPSBkYXRhLm5leHRTdGF0ZTtcclxuICAgIGlmIChkYXRhLmluYWN0aXZlKSB7XHJcbiAgICAgIHRoaXMuaW5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICB0aGlzLnRvb2xzID0gW107XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB0aGlzLmluYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgIHRoaXMudG9vbHMgPSBkYXRhLnRvb2xzO1xyXG4gICAgfVxyXG5cclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIEBwYXJhbSBbeyBpZDogTnVtYmVyLCB2YWx1ZTogTnVtYmVyL0Jvb2xlYW4gfSwgey4uLn1dXHJcbiAgICogQHBhcmFtIE51bWJlclxyXG4gICAqIEByZXR1cm4gQm9vbGVhblxyXG4gICAqL1xyXG4gIGlzU3VpdGFibGUoZGF0YSwgdGltZSkge1xyXG4gICAgcmV0dXJuIHRoaXMucmlnaHRUaW1lKHRpbWUpICYmIHRoaXMucmlnaHREYXRhKGRhdGEpO1xyXG4gIH1cclxuXHJcbiAgcmlnaHREYXRhKGRhdGEgPSBbXSkge1xyXG4gICAgaWYoIUFycmF5LmlzQXJyYXkoZGF0YSkpIHsgdGhyb3cgbmV3IFR5cGVFcnJvcihgSW52YWxpZCB0eXBlIG9mIGRhdGEgZnJvbSB0b29scy4gRXhwZWN0ZWQgYXJyYXksIGdvdCAke3R5cGVvZiBkYXRhfWApOyB9XHJcbiAgICByZXR1cm4gdGhpcy50b29scy5ldmVyeSh0b29sID0+IHtcclxuICAgICAgLy8g0JXRgdC70Lgg0YHRgNC10LTQuCDQv9C+0LvRg9GH0LXQvdC90YvRhSDQuNGC0LXQvNC+0LIg0L3QtdGCLCDRgtC+0LPQviDQutC+0YLQvtGA0YvQuSDQtdGB0YLRjCDQsiDQtNCw0L3QvdC+0Lwg0Y3QutGI0LXQvdC1XHJcbiAgICAgIGNvbnN0IGNoZWNrVG9vbCA9IGRhdGEuZmluZChvYmogPT4gb2JqLmlkID09PSB0b29sLmlkKTtcclxuICAgICAgaWYgKCFjaGVja1Rvb2wpIHsgcmV0dXJuIGZhbHNlOyB9XHJcblxyXG4gICAgICAvLyDQlNC70Y8g0L/QtdGA0LXQutC70Y7Rh9Cw0YLQtdC70Y9cclxuICAgICAgaWYgKHR5cGVvZiB0b29sLnZhbHVlID09PSAnYm9vbGVhbicpIHsgcmV0dXJuIGNoZWNrVG9vbC52YWx1ZSA9PT0gdG9vbC52YWx1ZTsgfVxyXG5cclxuICAgICAgLy8g0JTQu9GPINGA0LXQvdC00LbQsFxyXG4gICAgICBpZiAoQXJyYXkuaXNBcnJheSh0b29sLnZhbHVlKSkgeyByZXR1cm4gdGhpcy5pbmNsdWRlc1ZhbHVlKGNoZWNrVG9vbC52YWx1ZSwgdG9vbC52YWx1ZSkgfVxyXG5cclxuICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICBpbmNsdWRlc1ZhbHVlKHZhbHVlLCBib3JkZXJzKSB7XHJcbiAgICBpZiAodHlwZW9mIHZhbHVlICE9PSAnbnVtYmVyJykgdGhyb3cgbmV3IFR5cGVFcnJvcignVmFsdWUgc2hvdWxkIGJlIGludGVnZXInKTtcclxuICAgIHJldHVybiAodmFsdWUgPj0gYm9yZGVyc1swXSkgJiYgKHZhbHVlIDw9IGJvcmRlcnNbMV0pO1xyXG4gIH1cclxuXHJcbiAgcmlnaHRUaW1lKHRpbWUpIHtcclxuICAgIGlmICh0eXBlb2YgdGltZSAhPT0gJ251bWJlcicpIHRocm93IG5ldyBUeXBlRXJyb3IoJ1RpbWUgc2hvdWxkIGJlIGludGVnZXIgKG1zKScpO1xyXG4gICAgcmV0dXJuICh0aW1lID49IHRoaXMubWluVGltZSkgJiYgKHRpbWUgPD0gdGhpcy5tYXhUaW1lKTtcclxuICB9XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IEFjdGlvbjtcclxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vbGVhcm5pbmcvbW9kZWxfY29tcG9uZW50cy9hY3Rpb24uanMiLCJjbGFzcyBFdmVudCB7XHJcbiAgY29uc3RydWN0b3IoZGF0YSkge1xyXG4gICAgdGhpcy5pZCA9IGRhdGEuaWQ7XHJcbiAgICB0aGlzLm5hbWUgPSBkYXRhLm5hbWU7XHJcbiAgICB0aGlzLmRlc2NyaXB0aW9uID0gZGF0YS5kZXNjcmlwdGlvbjtcclxuICB9XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IEV2ZW50O1xyXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9sZWFybmluZy9tb2RlbF9jb21wb25lbnRzL2V2ZW50LmpzIiwiaW1wb3J0IEV2ZW50IGZyb20gJy4vZXZlbnQnIDtcclxuaW1wb3J0IEFjdGlvbiBmcm9tICcuL2FjdGlvbic7XHJcblxyXG5jbGFzcyBTdGF0ZSB7XHJcbiAgY29uc3RydWN0b3IoZGF0YSkge1xyXG4gICAgdGhpcy5pZCA9IGRhdGEuaWQ7XHJcbiAgICB0aGlzLm5hbWUgPSBkYXRhLm5hbWU7XHJcbiAgICB0aGlzLmltZyA9IGRhdGEuaW1nO1xyXG4gICAgdGhpcy5wYXJhbXMgPSBkYXRhLnBhcmFtcztcclxuXHJcbiAgICBpZihkYXRhLmxhc3QpIHtcclxuICAgICAgdGhpcy5sYXN0ID0gdHJ1ZTtcclxuICAgICAgdGhpcy5ldmVudCA9IG51bGw7XHJcbiAgICAgIHRoaXMuYWN0aW9uID0gbnVsbDtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHRoaXMuZXZlbnQgPSBuZXcgRXZlbnQoZGF0YS5ldmVudCk7XHJcbiAgICAgIHRoaXMuYWN0aW9ucyA9IGRhdGEuYWN0aW9ucy5tYXAoYWN0aW9uID0+IG5ldyBBY3Rpb24oYWN0aW9uKSk7XHJcbiAgICAgIHRoaXMubGFzdCA9IGZhbHNlO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgZ2V0SW5hY3RpdmVUaW1lKCkge1xyXG4gICAgY29uc3QgdGltZXMgPSB0aGlzLmdldEFsbEFjdGlvblRpbWVzKCk7XHJcbiAgICByZXR1cm4gTWF0aC5tYXgoLi4udGltZXMpO1xyXG4gIH1cclxuXHJcbiAgZ2V0SW5hY3RpdmVBY3Rpb24oKSB7XHJcbiAgICByZXR1cm4gdGhpcy5hY3Rpb25zLmZpbmQoYWN0aW9uID0+IGFjdGlvbi5pbmFjdGl2ZSA9PT0gdHJ1ZSk7XHJcbiAgfVxyXG5cclxuICBnZXRBbGxBY3Rpb25UaW1lcygpIHtcclxuICAgIHJldHVybiB0aGlzLmFjdGlvbnMubWFwKGFjdGlvbiA9PiBhY3Rpb24ubWF4VGltZSB8fCAwKTtcclxuICB9XHJcblxyXG4gIGhhbmRsZUlucHV0KGRhdGEsIHRpbWUpIHtcclxuICAgIGNvbnN0IHN1aXRlZEFjdGlvbnMgPSB0aGlzLmFjdGlvbnMuZmlsdGVyKGFjdGlvbiA9PiBhY3Rpb24uaXNTdWl0YWJsZShkYXRhLCB0aW1lKSk7XHJcbiAgICBpZiAoc3VpdGVkQWN0aW9ucykge1xyXG4gICAgICByZXR1cm4gc3VpdGVkQWN0aW9uc1swXS5uZXh0U3RhdGU7XHJcbiAgICB9XHJcbiAgfVxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBTdGF0ZTtcclxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vbGVhcm5pbmcvbW9kZWxfY29tcG9uZW50cy9zdGF0ZS5qcyIsImltcG9ydCAnLi4vLi4vc2Fzcy9sZWFybmluZy5zY3NzJztcclxuXHJcbmltcG9ydCBwdWJzdWIgZnJvbSAnLi4vdXRpbHMvcHVic3ViJztcclxuaW1wb3J0IGFqYXggZnJvbSAnLi4vdXRpbHMvYWpheCc7XHJcbmltcG9ydCBzY2VuZSBmcm9tICcuL3NjZW5lJztcclxuaW1wb3J0IE1vZGVsIGZyb20gJy4vbW9kZWwnO1xyXG5cclxuLyoqXHJcbiAqIExvYWQgbW9kZWwgd2l0aCBnaXZlbiBpZFxyXG4gKi9cclxuZnVuY3Rpb24gbG9hZE1vZGVsKGlkKSB7XHJcbiAgcmV0dXJuIGFqYXgoYC9tb2RlbHMvJHtpZH1gKS50aGVuKHJlc3BvbnNlID0+IEpTT04ucGFyc2UocmVzcG9uc2UpKTtcclxufVxyXG5cclxuLyoqXHJcbiAqIFVJIGJ1dHRvbidzIGhhbmRsZXJzXHJcbiAqL1xyXG5jb25zdCAkc2VsZWN0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNtb2RlbC1zZWxlY3RcIik7XHJcbmNvbnN0ICRsb2FkQnV0dG9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2xvYWQtbW9kZWwtYnRuJyk7XHJcbmxldCBtb2RlbCA9IG51bGw7XHJcbiRsb2FkQnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xyXG4gIGNvbnN0IG1vZGVsSWQgPSAkc2VsZWN0LnZhbHVlO1xyXG4gIGxvYWRNb2RlbChtb2RlbElkKVxyXG4gICAgLnRoZW4ocmVzcG9uc2UgPT4ge1xyXG4gICAgICBtb2RlbCA9IG5ldyBNb2RlbChyZXNwb25zZSk7XHJcbiAgICAgIHNjZW5lLmluaXQobW9kZWwsIHJlc3BvbnNlKS5zaG93Q29udGVudCgpLmVuYWJsZUJ1dHRvbnMoJHN0YXJ0QnV0dG9uKTtcclxuICAgIH0pXHJcbiAgICAuY2F0Y2goZXJyID0+IHsgY29uc29sZS5lcnJvcihlcnIpIH0pO1xyXG59KTtcclxuLy9cclxuY29uc3QgJHN0YXJ0QnV0dG9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3N0YXJ0LWJ0bicpO1xyXG4vLyAkc3RhcnRCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XHJcbi8vICAgbW9kZWwuc3RhcnQoKTtcclxuLy8gfSk7XHJcbi8vXHJcbmNvbnN0ICRzdG9wQnV0dG9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3N0b3AtYnRuJyk7XHJcbi8vICRzdG9wQnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xyXG4vLyAgIG1vZGVsLnN0b3AoKTsgLy8gVE9ET1xyXG4vLyB9KTtcclxuLy9cclxuY29uc3QgJHJ1bkJ1dHRvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNydW4tYnRuJyk7XHJcbi8vICRydW5CdXR0b24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XHJcbi8vICAgY29uc3QgdG9vbHNEYXRhID0gc2NlbmUuZ2V0VG9vbHNEYXRhKCk7XHJcbi8vICAgcHVic3ViLnB1Ymxpc2goJ3VzZXJfaW5wdXQnLCB0b29sc0RhdGEpO1xyXG4vLyB9KTtcclxuLy9cclxuLy8gLyoqXHJcbi8vICAqIEhhbmRsZSBjdXN0b20gZXZlbnRzIGhlcmUgKHVzZXIgaW5wdXQsIHByb2dyYW1tIG1lc3NhZ2VzIGV0Yy4pXHJcbi8vICAqL1xyXG4vLyBwdWJzdWIuc3Vic2NyaWJlKCduZXdfc3RhdGUnLCBzdGF0ZSA9PiBzY2VuZS5zZXRTdGF0ZShzdGF0ZSkpO1xyXG4vLyBwdWJzdWIuc3Vic2NyaWJlKCdldmVudCcsIGRhdGEgPT4gc2NlbmUuc2V0RXZlbnQoZGF0YS5ldmVudCkpO1xyXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9sZWFybmluZy9pbmRleC5qcyIsImltcG9ydCBub2RlRmFjdG9yeSBmcm9tICcuLi8uLi91dGlscy9ub2RlRmFjdG9yeSc7XHJcblxyXG5jb25zdCAkbmFtZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5tb2RlbC1zdGF0ZS1uYW1lJyk7XHJcbmNvbnN0ICRpbWcgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcubW9kZWwtc3RhdGUtaW1nJyk7XHJcbmNvbnN0ICRwYXJhbXMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcubW9kZWwtcGFyYW1zLXZhbHVlcycpO1xyXG5jb25zdCAkZXZlbnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcubW9kZWwtZXZlbnQnKTtcclxuY29uc3QgJHJlc3BvbnNlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLm1vZGVsLXJlc3BvbnNlJyk7XHJcblxyXG5mdW5jdGlvbiBzZXQoeyBuYW1lLCBpbWcsIHBhcmFtcyB9KSB7XHJcbiAgJG5hbWUudGV4dENvbnRlbnQgPSBuYW1lO1xyXG4gICRpbWcuc2V0QXR0cmlidXRlKCdzcmMnLCBpbWcpO1xyXG4gIHNldFBhcmFtZXRlcnMocGFyYW1zKTtcclxufVxyXG5cclxuZnVuY3Rpb24gc2V0UGFyYW1ldGVycyhwYXJhbXMpIHtcclxuICBjb25zdCBmcmFnID0gZG9jdW1lbnQuY3JlYXRlRG9jdW1lbnRGcmFnbWVudCgpO1xyXG4gIGZvciAobGV0IGtleSBpbiBwYXJhbXMpIHtcclxuICAgIGZyYWcuYXBwZW5kQ2hpbGQoY3JlYXRlUGFyYW1ldGVOb2RlKGtleSwgcGFyYW1zW2tleV0pKTtcclxuICB9XHJcbiAgJHBhcmFtcy5pbm5lckhUTUwgPSBcIlwiO1xyXG4gICRwYXJhbXMuYXBwZW5kQ2hpbGQoZnJhZyk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGNyZWF0ZVBhcmFtZXRlTm9kZShrZXksIHZhbHVlKSB7XHJcbiAgY29uc3QgZGl2ID0gbm9kZUZhY3RvcnkoJ2RpdicsIHsgY2xhc3NMaXN0OiBbJ3BhcmFtZXRlciddIH0pO1xyXG5cclxuICBjb25zdCBrZXlTcGFuID0gbm9kZUZhY3RvcnkoJ3NwYW4nLCB7IHRleHRDb250ZW50OiBrZXkgfSk7XHJcbiAgZGl2LmFwcGVuZENoaWxkKGtleVNwYW4pO1xyXG5cclxuICBjb25zdCB2YWx1ZVNwYW4gPSBub2RlRmFjdG9yeSgnc3BhbicsIHsgdGV4dENvbnRlbnQ6IHZhbHVlIH0pO1xyXG4gIGRpdi5hcHBlbmRDaGlsZCh2YWx1ZVNwYW4pO1xyXG5cclxuICByZXR1cm4gZGl2O1xyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCB7XHJcbiAgc2V0XHJcbn1cclxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vbGVhcm5pbmcvc2NlbmVfY29tcG9uZW50cy9zdGF0ZS5qcyIsImltcG9ydCBub2RlRmFjdG9yeSBmcm9tICcuLi8uLi91dGlscy9ub2RlRmFjdG9yeSc7XHJcblxyXG5jb25zdCAkdG9vbHMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcudG9vbHMtbGlzdCcpO1xyXG5cclxuZnVuY3Rpb24gaW5pdCh0b29scykge1xyXG4gIGNvbnN0IGZyYWdtZW50ID0gZG9jdW1lbnQuY3JlYXRlRG9jdW1lbnRGcmFnbWVudCgpO1xyXG5cclxuICB0b29scy5mb3JFYWNoKHRvb2wgPT4ge1xyXG4gICAgLy8gY3JlYXRlIHRvb2wgd3JhcHBlclxyXG4gICAgY29uc3QgZGl2ID0gbm9kZUZhY3RvcnkoJ2RpdicsIHsgY2xhc3NMaXN0OiBbJ3Rvb2wnXSB9KTtcclxuXHJcbiAgICBjb25zdCBsYWJlbCA9IG5vZGVGYWN0b3J5KCdsYWJlbCcsIHtcclxuICAgICAgY2xhc3NMaXN0OiBbJ3Rvb2wtbmFtZSddLFxyXG4gICAgICBhdHRyczogeyBcImZvclwiOiB0b29sLm5hbWUgfSxcclxuICAgICAgdGV4dENvbnRlbnQ6IHRvb2wubmFtZVxyXG4gICAgfSk7XHJcbiAgICBkaXYuYXBwZW5kQ2hpbGQobGFiZWwpO1xyXG5cclxuICAgIGNvbnN0IHRvb2xOb2RlID0gY3JlYXRlVG9vbE5vZGUodG9vbCk7XHJcbiAgICBkaXYuYXBwZW5kQ2hpbGQodG9vbE5vZGUpO1xyXG5cclxuICAgIGZyYWdtZW50LmFwcGVuZENoaWxkKGRpdik7XHJcbiAgfSk7XHJcblxyXG4gICR0b29scy5pbm5lckhUTUwgPSBcIlwiO1xyXG4gICR0b29scy5hcHBlbmRDaGlsZChmcmFnbWVudCk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGNyZWF0ZVRvb2xOb2RlKHRvb2wpIHtcclxuICBzd2l0Y2godG9vbC50eXBlKSB7XHJcbiAgICBjYXNlICdyYW5nZSc6XHJcbiAgICAgIHJldHVybiBjcmVhdGVSYW5nZVRvb2wodG9vbCk7XHJcbiAgICBjYXNlICdzd2l0Y2gnOlxyXG4gICAgICByZXR1cm4gY3JlYXRlU3dpdGNoVG9vbCh0b29sKTtcclxuICAgIGRlZmF1bHQ6XHJcbiAgICAgIHJldHVybiAnVW5rbm93biB0b29sIHR5cGUnO1xyXG4gIH1cclxufVxyXG5cclxuZnVuY3Rpb24gY3JlYXRlUmFuZ2VUb29sKHRvb2wpIHtcclxuICBjb25zdCBkaXZJbnB1dCA9IG5vZGVGYWN0b3J5KCdkaXYnLCB7IGNsYXNzTGlzdDogWydyYW5nZSddIH0pO1xyXG5cclxuICBjb25zdCBzcGFuTWluID0gbm9kZUZhY3RvcnkoJ3NwYW4nLCB7IHRleHRDb250ZW50OiB0b29sLm1pbiB9KTtcclxuICBkaXZJbnB1dC5hcHBlbmRDaGlsZChzcGFuTWluKVxyXG5cclxuICBjb25zdCBpbnB1dCA9IG5vZGVGYWN0b3J5KCdpbnB1dCcsIHtcclxuICAgIGF0dHJzOiB7XHJcbiAgICAgICdkYXRhLWlkJzogdG9vbC5pZCxcclxuICAgICAgJ2RhdGEtdHlwZSc6ICdyYW5nZScsXHJcbiAgICAgICduYW1lJzogdG9vbC5uYW1lLFxyXG4gICAgICAndHlwZSc6ICdyYW5nZScsXHJcbiAgICAgICdtaW4nOiB0b29sLm1pbixcclxuICAgICAgJ21heCc6IHRvb2wubWF4XHJcbiAgICB9XHJcbiAgfSk7XHJcbiAgZGl2SW5wdXQuYXBwZW5kQ2hpbGQoaW5wdXQpO1xyXG5cclxuICBjb25zdCBzcGFuTWF4ID0gbm9kZUZhY3RvcnkoJ3NwYW4nLCB7IHRleHRDb250ZW50OiB0b29sLm1heCB9KTtcclxuICBkaXZJbnB1dC5hcHBlbmRDaGlsZChzcGFuTWF4KTtcclxuXHJcbiAgY29uc3QgZGl2Q3VycmVudCA9IG5vZGVGYWN0b3J5KCdkaXYnLCB7IGNsYXNzTGlzdDogWydyYW5nZS1jdXJyZW50LXZhbHVlJ10gfSk7XHJcbiAgY29uc3Qgc3BhbkN1cnJlbnQgPSBub2RlRmFjdG9yeSgnc3BhbicsIHsgdGV4dENvbnRlbnQ6IGlucHV0LnZhbHVlIH0pO1xyXG4gIGRpdkN1cnJlbnQuYXBwZW5kQ2hpbGQoc3BhbkN1cnJlbnQpO1xyXG5cclxuICBpbnB1dC5hZGRFdmVudExpc3RlbmVyKCdpbnB1dCcsIChldnQpID0+IHtcclxuICAgIHNwYW5DdXJyZW50LnRleHRDb250ZW50ID0gZXZ0LnRhcmdldC52YWx1ZTtcclxuICB9KTtcclxuXHJcbiAgY29uc3QgZnJhZ21lbnQgPSBkb2N1bWVudC5jcmVhdGVEb2N1bWVudEZyYWdtZW50KCk7XHJcbiAgZnJhZ21lbnQuYXBwZW5kQ2hpbGQoZGl2SW5wdXQpO1xyXG4gIGZyYWdtZW50LmFwcGVuZENoaWxkKGRpdkN1cnJlbnQpO1xyXG5cclxuICByZXR1cm4gZnJhZ21lbnQ7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGNyZWF0ZVN3aXRjaFRvb2wodG9vbCkge1xyXG4gIGNvbnN0IGxhYmVsID0gbm9kZUZhY3RvcnkoJ2xhYmVsJywgeyBjbGFzc0xpc3Q6IFsnc3dpdGNoJ10gfSk7XHJcblxyXG4gIGNvbnN0IGlucHV0ID0gbm9kZUZhY3RvcnkoJ2lucHV0Jywge1xyXG4gICAgYXR0cnM6IHtcclxuICAgICAgJ2RhdGEtaWQnOiB0b29sLmlkLFxyXG4gICAgICAnZGF0YS10eXBlJzogJ3N3aXRjaCcsXHJcbiAgICAgICd0eXBlJzogJ2NoZWNrYm94J1xyXG4gICAgfVxyXG4gIH0pO1xyXG4gIGxhYmVsLmFwcGVuZENoaWxkKGlucHV0KTtcclxuXHJcbiAgY29uc3QgZGl2ID0gbm9kZUZhY3RvcnkoJ2RpdicsIHsgY2xhc3NMaXN0OiBbJ3NsaWRlciddIH0pO1xyXG4gIGxhYmVsLmFwcGVuZENoaWxkKGRpdik7XHJcblxyXG4gIHJldHVybiBsYWJlbDtcclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQge1xyXG4gIGluaXQsXHJcbn07XHJcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2xlYXJuaW5nL3NjZW5lX2NvbXBvbmVudHMvdG9vbHMuanMiLCJjb25zdCBub2RlRmFjdG9yeSA9IGZ1bmN0aW9uKHR5cGUgPSAnZGl2JywgcGFyYW1zKSB7XHJcbiAgY29uc3Qgbm9kZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQodHlwZSk7XHJcblxyXG4gIGFwcGVuZENsYXNzZXMobm9kZSwgcGFyYW1zKTtcclxuICBhcHBlbmRBdHRycyhub2RlLCBwYXJhbXMpO1xyXG4gIGluc2VydFRleHRDb250ZW50KG5vZGUsIHBhcmFtcyk7XHJcblxyXG4gIHJldHVybiBub2RlO1xyXG59XHJcblxyXG5mdW5jdGlvbiBhcHBlbmRDbGFzc2VzKG5vZGUsIHsgY2xhc3NMaXN0IH0pIHtcclxuICBpZiAoY2xhc3NMaXN0ICYmIGNsYXNzTGlzdC5mb3JFYWNoKSB7XHJcbiAgICBjbGFzc0xpc3QuZm9yRWFjaChjbGFzc05hbWUgPT4gbm9kZS5jbGFzc0xpc3QuYWRkKGNsYXNzTmFtZSkpO1xyXG4gIH1cclxufVxyXG5cclxuZnVuY3Rpb24gYXBwZW5kQXR0cnMobm9kZSwgeyBhdHRycyB9KSB7XHJcbiAgaWYgKGF0dHJzKSB7XHJcbiAgICBjb25zdCBhdHRyTmFtZXMgPSBPYmplY3Qua2V5cyhhdHRycyk7XHJcbiAgICBhdHRyTmFtZXMuZm9yRWFjaChhdHRyTmFtZSA9PiBub2RlLnNldEF0dHJpYnV0ZShhdHRyTmFtZSwgYXR0cnNbYXR0ck5hbWVdKSk7XHJcbiAgfVxyXG59XHJcblxyXG5mdW5jdGlvbiBpbnNlcnRUZXh0Q29udGVudChub2RlLCB7IHRleHRDb250ZW50ID0gXCJcIiB9KSB7XHJcbiAgbm9kZS50ZXh0Q29udGVudCA9IHRleHRDb250ZW50O1xyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBub2RlRmFjdG9yeTtcclxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vdXRpbHMvbm9kZUZhY3RvcnkuanMiXSwic291cmNlUm9vdCI6IiJ9