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

//
//   /** Creates input elements in 'tools' box */
//   initTools(tools) {
//     const toolsFragment = document.createDocumentFragment();
//
//     tools.forEach(tool => {
//       // Wrap every tool for proper display and add label
//       const div = document.createElement('div');
//       div.classList.add('tool');
//
//       const label = document.createElement('label');
//       label.setAttribute('for', tool.name);
//       label.classList.add('tool-name');
//       label.textContent = tool.name;
//       div.appendChild(label);
//
//       const toolNode = this.createToolNode(tool);
//       div.appendChild(toolNode);
//
//       // Append to fragment
//       toolsFragment.appendChild(div);
//     });
//
//     this.$toolsBox.innerHTML = '';
//     this.$toolsBox.appendChild(toolsFragment);
//     return this;
//   }
//
//   createToolNode(tool) {
//     switch(tool.type) {
//       case 'range':
//         return this.createRangeTool(tool);
//       case 'switch':
//         return this.createSwitchTool(tool);
//       default:
//         return 'Unknown tool type';
//     }
//   }
//
//   createRangeTool(tool) {
//     const divInput = document.createElement('div');
//     divInput.classList.add('range');
//
//     const spanMin = document.createElement('span');
//     spanMin.textContent = tool.min;
//     divInput.appendChild(spanMin)
//
//     const input = document.createElement('input');
//     input.setAttribute('data-id', tool.id);
//     input.setAttribute('data-type', 'range');
//     input.setAttribute('name', tool.name);
//     input.setAttribute('type', 'range');
//     input.setAttribute('min', tool.min);
//     input.setAttribute('max', tool.max);
//     divInput.appendChild(input);
//
//     const spanMax = document.createElement('span');
//     spanMax.textContent = tool.max;
//     divInput.appendChild(spanMax);
//
//     const divCurrent = document.createElement('div');
//     divCurrent.classList.add('range-current-value');
//     const spanCurrent = document.createElement('span');
//     spanCurrent.textContent = input.value;
//     divCurrent.appendChild(spanCurrent);
//
//     input.addEventListener('input', (evt) => {
//       this.updateCurrentRangeValue(spanCurrent, evt.target.value);
//     });
//
//     const fragment = document.createDocumentFragment();
//     fragment.appendChild(divInput);
//     fragment.appendChild(divCurrent);
//
//     return fragment;
//   }
//
//   updateCurrentRangeValue(node, value) {
//     node.textContent = value;
//   }
//
//   createSwitchTool(tool) {
//     const label = document.createElement('label');
//     label.classList.add('switch');
//
//     const input = document.createElement('input');
//     input.setAttribute('data-id', tool.id);
//     input.setAttribute('data-type', 'switch');
//     input.setAttribute('type', 'checkbox');
//     label.appendChild(input);
//
//     const div = document.createElement('div');
//     div.classList.add('slider');
//     label.appendChild(div);
//
//     return label;
//   }
//
//   /** Sets img and parameters of current state to UI */

//
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
var $tools = document.querySelector('.tools-list');

function init() {}

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgNzZmZWZkMzNlYjJjMWE1NTZjM2QiLCJ3ZWJwYWNrOi8vLy4vdXRpbHMvcHVic3ViLmpzIiwid2VicGFjazovLy8uL2xlYXJuaW5nL21vZGVsLmpzIiwid2VicGFjazovLy8uL2xlYXJuaW5nL3NjZW5lLmpzIiwid2VicGFjazovLy8uL3V0aWxzL2FqYXguanMiLCJ3ZWJwYWNrOi8vLy4uL3Nhc3MvbGVhcm5pbmcuc2NzcyIsIndlYnBhY2s6Ly8vLi9sZWFybmluZy9tb2RlbF9jb21wb25lbnRzL2FjdGlvbi5qcyIsIndlYnBhY2s6Ly8vLi9sZWFybmluZy9tb2RlbF9jb21wb25lbnRzL2V2ZW50LmpzIiwid2VicGFjazovLy8uL2xlYXJuaW5nL21vZGVsX2NvbXBvbmVudHMvc3RhdGUuanMiLCJ3ZWJwYWNrOi8vLy4vbGVhcm5pbmcvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vbGVhcm5pbmcvc2NlbmVfY29tcG9uZW50cy9zdGF0ZS5qcyIsIndlYnBhY2s6Ly8vLi9sZWFybmluZy9zY2VuZV9jb21wb25lbnRzL3Rvb2xzLmpzIiwid2VicGFjazovLy8uL3V0aWxzL25vZGVGYWN0b3J5LmpzIl0sIm5hbWVzIjpbInB1YnN1YiIsInRvcGljcyIsInN1YnNjcmliZSIsInRvcGljIiwibGlzdGVuZXIiLCJxdWV1ZSIsImluZGV4IiwicHVzaCIsInJlbW92ZSIsInB1Ymxpc2giLCJpbmZvIiwibGVuZ3RoIiwiaXRlbXMiLCJmb3JFYWNoIiwiaXRlbSIsIk1vZGVsIiwiZGF0YSIsImlkIiwibmFtZSIsImJyZWFrVGltZSIsInN0ZXBzIiwic3RhdGVzIiwibWFwIiwic3RhdGUiLCJjdXJyZW50U3RhdGUiLCJnZXRTdGF0ZSIsInRpbWVvdXQiLCJzdWJzY3JpYnRpb24iLCJmaW5kIiwiaW50ZXJ2YWxzIiwiUHJvbWlzZSIsInJlc29sdmUiLCJpIiwidGhlbiIsIm1ha2VCcmVhayIsImhhbmRsZUV2ZW50IiwiaGFuZGxlTmV3U3RhdGUiLCJjYXRjaCIsInJlamVjdCIsInNldFRpbWVvdXQiLCJldmVudCIsImV2ZW50U3RhcnRUaW1lIiwiRGF0ZSIsIm5vdyIsInRpbWVTcGVudCIsIm5leHRTdGF0ZUlkIiwiaGFuZGxlSW5wdXQiLCJuZXh0U3RhdGUiLCJsYXN0IiwiaW5hY3RpdmVUaW1lIiwiZ2V0SW5hY3RpdmVUaW1lIiwiZ2V0SW5hY3RpdmVBY3Rpb24iLCJjbGVhclRpbWVvdXQiLCJleHBvcnRzIiwiJG1vZGVsTmFtZSIsImRvY3VtZW50IiwicXVlcnlTZWxlY3RvciIsImluaXQiLCJtb2RlbCIsInJlc3BvbnNlIiwidGV4dENvbnRlbnQiLCJzZXQiLCJ0b29scyIsIiRjb250ZW50Iiwic2hvd0NvbnRlbnQiLCJzZXRDb250ZW50RGlzcGxheSIsImhpZGVDb250ZW50IiwiZGlzcGxheSIsInN0eWxlIiwiZW5hYmxlQnV0dG9ucyIsImJ1dHRvbnMiLCJzZXRCdXR0b25zU3RhdGUiLCJkaXNhYmxlQnV0dG9ucyIsInZhbHVlIiwiYnV0dG9uIiwiZGlzYWJsZWQiLCJhamF4IiwicGF0aCIsIm9wdGlvbnMiLCJ4aHIiLCJYTUxIdHRwUmVxdWVzdCIsIm9wZW4iLCJtZXRob2QiLCJoZWFkZXJzIiwic2V0WEhSSGVhZGVycyIsInNlbmQiLCJvbnJlYWR5c3RhdGVjaGFuZ2UiLCJyZWFkeVN0YXRlIiwic3RhdHVzIiwicmVzcG9uc2VUZXh0Iiwic3RhdHVzVGV4dCIsImhlYWRlciIsInNldFJlcXVlc3RIZWFkZXIiLCJBY3Rpb24iLCJtaW5UaW1lIiwibWF4VGltZSIsImluYWN0aXZlIiwidGltZSIsInJpZ2h0VGltZSIsInJpZ2h0RGF0YSIsIkFycmF5IiwiaXNBcnJheSIsIlR5cGVFcnJvciIsImV2ZXJ5IiwiY2hlY2tUb29sIiwib2JqIiwidG9vbCIsImluY2x1ZGVzVmFsdWUiLCJib3JkZXJzIiwiRXZlbnQiLCJkZXNjcmlwdGlvbiIsIlN0YXRlIiwiaW1nIiwicGFyYW1zIiwiYWN0aW9uIiwiYWN0aW9ucyIsInRpbWVzIiwiZ2V0QWxsQWN0aW9uVGltZXMiLCJNYXRoIiwibWF4Iiwic3VpdGVkQWN0aW9ucyIsImZpbHRlciIsImlzU3VpdGFibGUiLCJsb2FkTW9kZWwiLCJKU09OIiwicGFyc2UiLCIkc2VsZWN0IiwiJGxvYWRCdXR0b24iLCJhZGRFdmVudExpc3RlbmVyIiwibW9kZWxJZCIsIiRzdGFydEJ1dHRvbiIsImNvbnNvbGUiLCJlcnJvciIsImVyciIsIiRzdG9wQnV0dG9uIiwiJHJ1bkJ1dHRvbiIsIiRuYW1lIiwiJGltZyIsIiRwYXJhbXMiLCIkZXZlbnQiLCIkcmVzcG9uc2UiLCJzZXRBdHRyaWJ1dGUiLCJzZXRQYXJhbWV0ZXJzIiwiZnJhZyIsImNyZWF0ZURvY3VtZW50RnJhZ21lbnQiLCJrZXkiLCJhcHBlbmRDaGlsZCIsImNyZWF0ZVBhcmFtZXRlTm9kZSIsImlubmVySFRNTCIsImRpdiIsImNsYXNzTGlzdCIsImtleVNwYW4iLCJ2YWx1ZVNwYW4iLCIkdG9vbHMiLCJub2RlRmFjdG9yeSIsInR5cGUiLCJub2RlIiwiY3JlYXRlRWxlbWVudCIsImFwcGVuZENsYXNzZXMiLCJhcHBlbmRBdHRycyIsImluc2VydFRleHRDb250ZW50IiwiYWRkIiwiY2xhc3NOYW1lIiwiYXR0cnMiLCJhdHRyTmFtZXMiLCJPYmplY3QiLCJrZXlzIiwiYXR0ck5hbWUiXSwibWFwcGluZ3MiOiI7QUFBQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQSxtREFBMkMsY0FBYzs7QUFFekQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFLO0FBQ0w7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxtQ0FBMkIsMEJBQTBCLEVBQUU7QUFDdkQseUNBQWlDLGVBQWU7QUFDaEQ7QUFDQTtBQUNBOztBQUVBO0FBQ0Es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QUErQjtBQUFBLE1BQXRCQyxJQUFzQix1RUFBZixLQUFlO0FBQUEsTUFBUjFDLE1BQVE7O0FBQ2pELE1BQU0yQyxPQUFPckcsU0FBU3NHLGFBQVQsQ0FBdUJGLElBQXZCLENBQWI7O0FBRUFHLGdCQUFjRixJQUFkLEVBQW9CM0MsTUFBcEI7QUFDQThDLGNBQVlILElBQVosRUFBa0IzQyxNQUFsQjtBQUNBK0Msb0JBQWtCSixJQUFsQixFQUF3QjNDLE1BQXhCOztBQUVBLFNBQU8yQyxJQUFQO0FBQ0QsQ0FSRDs7QUFVQSxTQUFTRSxhQUFULENBQXVCRixJQUF2QixRQUE0QztBQUFBLE1BQWJOLFNBQWEsUUFBYkEsU0FBYTs7QUFDMUMsTUFBSUEsYUFBYUEsVUFBVXpJLE9BQTNCLEVBQW9DO0FBQ2xDeUksY0FBVXpJLE9BQVYsQ0FBa0I7QUFBQSxhQUFhK0ksS0FBS04sU0FBTCxDQUFlVyxHQUFmLENBQW1CQyxTQUFuQixDQUFiO0FBQUEsS0FBbEI7QUFDRDtBQUNGOztBQUVELFNBQVNILFdBQVQsQ0FBcUJILElBQXJCLFNBQXNDO0FBQUEsTUFBVE8sS0FBUyxTQUFUQSxLQUFTOztBQUNwQyxNQUFJQSxLQUFKLEVBQVc7QUFDVCxRQUFNQyxZQUFZQyxPQUFPQyxJQUFQLENBQVlILEtBQVosQ0FBbEI7QUFDQUMsY0FBVXZKLE9BQVYsQ0FBa0I7QUFBQSxhQUFZK0ksS0FBS2YsWUFBTCxDQUFrQjBCLFFBQWxCLEVBQTRCSixNQUFNSSxRQUFOLENBQTVCLENBQVo7QUFBQSxLQUFsQjtBQUNEO0FBQ0Y7O0FBRUQsU0FBU1AsaUJBQVQsQ0FBMkJKLElBQTNCLFNBQXVEO0FBQUEsZ0NBQXBCaEcsV0FBb0I7QUFBQSxNQUFwQkEsV0FBb0IscUNBQU4sRUFBTTs7QUFDckRnRyxPQUFLaEcsV0FBTCxHQUFtQkEsV0FBbkI7QUFDRDs7a0JBRWM4RixXIiwiZmlsZSI6ImxlYXJuaW5nLmJ1bmRsZS5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKVxuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuXG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBpZGVudGl0eSBmdW5jdGlvbiBmb3IgY2FsbGluZyBoYXJtb255IGltcG9ydHMgd2l0aCB0aGUgY29ycmVjdCBjb250ZXh0XG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmkgPSBmdW5jdGlvbih2YWx1ZSkgeyByZXR1cm4gdmFsdWU7IH07XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwge1xuIFx0XHRcdFx0Y29uZmlndXJhYmxlOiBmYWxzZSxcbiBcdFx0XHRcdGVudW1lcmFibGU6IHRydWUsXG4gXHRcdFx0XHRnZXQ6IGdldHRlclxuIFx0XHRcdH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IDgpO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIHdlYnBhY2svYm9vdHN0cmFwIDc2ZmVmZDMzZWIyYzFhNTU2YzNkIiwiY29uc3QgcHVic3ViID0gKGZ1bmN0aW9uKCkge1xyXG5cclxuICBjb25zdCB0b3BpY3MgPSB7fTtcclxuXHJcbiAgcmV0dXJuIHtcclxuICAgIHN1YnNjcmliZTogZnVuY3Rpb24odG9waWMsIGxpc3RlbmVyKSB7XHJcbiAgICAgIGlmICghdG9waWNzW3RvcGljXSkgdG9waWNzW3RvcGljXSA9IHsgcXVldWU6IFtdIH07XHJcblxyXG4gICAgICBjb25zdCBpbmRleCA9IHRvcGljc1t0b3BpY10ucXVldWUucHVzaChsaXN0ZW5lcikgLSAxO1xyXG4gICAgICAvLyBmdW5jdGlvbiB0byBkZWxldGUgdG9waWNcclxuICAgICAgcmV0dXJuIHtcclxuICAgICAgICByZW1vdmU6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgZGVsZXRlIHRvcGljc1t0b3BpY10ucXVldWVbaW5kZXhdO1xyXG4gICAgICAgIH1cclxuICAgICAgfTtcclxuICAgIH0sXHJcblxyXG4gICAgcHVibGlzaDogZnVuY3Rpb24odG9waWMsIGluZm8pIHtcclxuICAgICAgLy8gbm8gdGhlbWUgb3Igbm8gbGlzdGVuZXJzXHJcbiAgICAgIGlmICghdG9waWNzW3RvcGljXSB8fCAhdG9waWNzW3RvcGljXS5xdWV1ZS5sZW5ndGgpIHJldHVybjtcclxuXHJcbiAgICAgIGNvbnN0IGl0ZW1zID0gdG9waWNzW3RvcGljXS5xdWV1ZTtcclxuICAgICAgaXRlbXMuZm9yRWFjaChpdGVtID0+IHtcclxuICAgICAgICBpdGVtKGluZm8gfHwge30pO1xyXG4gICAgICB9KTtcclxuICAgIH1cclxuICB9O1xyXG59KSgpO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgcHVic3ViO1xyXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi91dGlscy9wdWJzdWIuanMiLCJpbXBvcnQgU3RhdGUgZnJvbSAnLi9tb2RlbF9jb21wb25lbnRzL3N0YXRlJztcclxuaW1wb3J0IHB1YnN1YiBmcm9tICcuLi91dGlscy9wdWJzdWInO1xyXG5cclxuY2xhc3MgTW9kZWwge1xyXG4gIGNvbnN0cnVjdG9yKGRhdGEpIHtcclxuICAgIHRoaXMuaWQgPSBkYXRhLmlkO1xyXG4gICAgdGhpcy5uYW1lID0gZGF0YS5uYW1lO1xyXG4gICAgdGhpcy5icmVha1RpbWUgPSBkYXRhLmJyZWFrVGltZTtcclxuICAgIHRoaXMuc3RlcHMgPSBkYXRhLnN0ZXBzO1xyXG5cclxuICAgIHRoaXMuc3RhdGVzID0gZGF0YS5zdGF0ZXMubWFwKHN0YXRlID0+IG5ldyBTdGF0ZShzdGF0ZSkpO1xyXG4gICAgdGhpcy5jdXJyZW50U3RhdGUgPSB0aGlzLmdldFN0YXRlKGRhdGEuaWQpO1xyXG5cclxuICAgIHRoaXMudGltZW91dCA9IG51bGw7XHJcbiAgICB0aGlzLnN1YnNjcmlidGlvbiA9IG51bGw7XHJcbiAgfVxyXG5cclxuICBnZXRTdGF0ZShpZCkge1xyXG4gICAgcmV0dXJuIHRoaXMuc3RhdGVzLmZpbmQoc3RhdGUgPT4gc3RhdGUuaWQgPT0gaWQpO1xyXG4gIH1cclxuXHJcbiAgc3RhcnQoKSB7XHJcbiAgICBsZXQgaW50ZXJ2YWxzID0gUHJvbWlzZS5yZXNvbHZlKCk7IC8vIGluaXQgcHJvbWlzZSBjaGFpblxyXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLnN0ZXBzOyBpKyspIHtcclxuICAgICAgaW50ZXJ2YWxzID0gaW50ZXJ2YWxzXHJcbiAgICAgICAudGhlbigoKSA9PiB7IHJldHVybiB0aGlzLm1ha2VCcmVhaygpIH0pXHJcbiAgICAgICAudGhlbigoKSA9PiB7IHJldHVybiB0aGlzLmhhbmRsZUV2ZW50KCkgfSlcclxuICAgICAgIC50aGVuKHN0YXRlID0+IHsgdGhpcy5oYW5kbGVOZXdTdGF0ZShzdGF0ZSkgfSlcclxuICAgIH1cclxuICAgIGludGVydmFscy5jYXRjaChzdGF0ZSA9PiB7IHB1YnN1Yi5wdWJsaXNoKCduZXdfc3RhdGUnLCAgc3RhdGUpIH0pO1xyXG4gIH1cclxuXHJcbiAgbWFrZUJyZWFrKCkge1xyXG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcclxuICAgICAgc2V0VGltZW91dCgoKSA9PiB7IHJlc29sdmUoKSB9LCB0aGlzLmJyZWFrVGltZSk7XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIGhhbmRsZUV2ZW50KCkge1xyXG4gICAgY29uc3QgZXZlbnQgPSB0aGlzLmN1cnJlbnRTdGF0ZS5ldmVudDtcclxuICAgIGNvbnN0IGV2ZW50U3RhcnRUaW1lID0gRGF0ZS5ub3coKTtcclxuICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XHJcbiAgICAgIC8vIHNlbmQgZGF0YSBhYm91dCBuZXcgZXZlbnQgdG8gb3RoZXIgbW9kdWxlc1xyXG4gICAgICBwdWJzdWIucHVibGlzaCgnZXZlbnQnLCB7IGV2ZW50IH0pO1xyXG5cclxuICAgICAgLy8gbGlzdGVuIHRvIHVzZXIgYWN0aW9uXHJcbiAgICAgIC8vIGFuZCBpZiB1c2VyIGlucHV0IGNvcnJlY3QgZ28gdG8gbmV4dCBzdGF0ZVxyXG4gICAgICB0aGlzLnN1YnNjcmlidGlvbiA9IHB1YnN1Yi5zdWJzY3JpYmUoJ3VzZXJfaW5wdXQnLCBkYXRhID0+IHtcclxuICAgICAgICBjb25zdCB0aW1lU3BlbnQgPSBEYXRlLm5vdygpIC0gZXZlbnRTdGFydFRpbWU7XHJcbiAgICAgICAgY29uc3QgbmV4dFN0YXRlSWQgPSB0aGlzLmN1cnJlbnRTdGF0ZS5oYW5kbGVJbnB1dChkYXRhLCB0aW1lU3BlbnQpO1xyXG4gICAgICAgIGNvbnN0IG5leHRTdGF0ZSA9IHRoaXMuZ2V0U3RhdGUobmV4dFN0YXRlSWQpO1xyXG4gICAgICAgIGlmIChuZXh0U3RhdGUpIHtcclxuICAgICAgICAgIG5leHRTdGF0ZS5sYXN0ID8gcmVqZWN0KG5leHRTdGF0ZSkgOiByZXNvbHZlKG5leHRTdGF0ZSk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9KVxyXG5cclxuICAgICAgLy8gaGFuZGxlIGluYWN0aXZlXHJcbiAgICAgIGNvbnN0IGluYWN0aXZlVGltZSA9IGV2ZW50LmdldEluYWN0aXZlVGltZSgpO1xyXG4gICAgICB0aGlzLnRpbWVvdXQgPSBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgICBjb25zdCBuZXh0U3RhdGVJZCA9IGV2ZW50LmdldEluYWN0aXZlQWN0aW9uKCkubmV4dFN0YXRlO1xyXG4gICAgICAgIGNvbnN0IG5leHRTdGF0ZSA9IHRoaXMuZ2V0U3RhdGUobmV4dFN0YXRlSWQpO1xyXG4gICAgICAgIG5leHRTdGF0ZS5sYXN0ID8gcmVqZWN0KG5leHRTdGF0ZSkgOiByZXNvbHZlKG5leHRTdGF0ZSk7XHJcbiAgICAgIH0sIGluYWN0aXZlVGltZSk7XHJcbiAgICB9KVxyXG4gIH1cclxuXHJcbiAgaGFuZGxlTmV3U3RhdGUoc3RhdGUpIHtcclxuICAgIHRoaXMuY3VycmVudFN0YXRlID0gc3RhdGU7XHJcbiAgICBjbGVhclRpbWVvdXQodGhpcy50aW1lb3V0KTtcclxuICAgIHRoaXMuc3Vic2NyaWJ0aW9uLnJlbW92ZSgpO1xyXG4gICAgcHVic3ViLnB1Ymxpc2goJ25ld19zdGF0ZScsIHN0YXRlKTtcclxuICB9XHJcblxyXG4gIC8vIFRPRE9cclxuICBzdG9wKCkge1xyXG5cclxuICB9XHJcblxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBNb2RlbDtcclxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vbGVhcm5pbmcvbW9kZWwuanMiLCJpbXBvcnQgc3RhdGUgZnJvbSAnLi9zY2VuZV9jb21wb25lbnRzL3N0YXRlJztcclxuaW1wb3J0IHRvb2xzIGZyb20gJy4vc2NlbmVfY29tcG9uZW50cy90b29scyc7XHJcblxyXG5jb25zdCBleHBvcnRzID0ge307XHJcblxyXG4vLyBTY2VuZSBtZXRhZGF0YVxyXG5jb25zdCAkbW9kZWxOYW1lID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLm1vZGVsLW5hbWUnKTtcclxuZXhwb3J0cy5pbml0ID0gZnVuY3Rpb24obW9kZWwsIHJlc3BvbnNlKSB7XHJcbiAgJG1vZGVsTmFtZS50ZXh0Q29udGVudCA9IG1vZGVsLm5hbWU7XHJcbiAgc3RhdGUuc2V0KG1vZGVsLmN1cnJlbnRTdGF0ZSk7XHJcbiAgdG9vbHMuaW5pdChyZXNwb25zZS50b29scyk7XHJcbiAgcmV0dXJuIHRoaXM7XHJcbn1cclxuXHJcbi8vIE1hbmFnZSBjb250ZW50IHZpc2liaWxpdHlcclxuY29uc3QgJGNvbnRlbnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuY29udGVudCcpO1xyXG5leHBvcnRzLnNob3dDb250ZW50ID0gZnVuY3Rpb24oKSB7XHJcbiAgc2V0Q29udGVudERpc3BsYXkoJ2ZsZXgnKTtcclxuICByZXR1cm4gdGhpcztcclxufVxyXG5leHBvcnRzLmhpZGVDb250ZW50ID0gZnVuY3Rpb24oKSB7XHJcbiAgc2V0Q29udGVudERpc3BsYXkoJ25vbmUnKTtcclxuICByZXR1cm4gdGhpcztcclxufVxyXG5mdW5jdGlvbiBzZXRDb250ZW50RGlzcGxheShkaXNwbGF5KSB7XHJcbiAgJGNvbnRlbnQuc3R5bGUuZGlzcGxheSA9IGRpc3BsYXk7XHJcbn1cclxuXHJcbi8vIE1hbmFnZSBidXR0b25zIHN0YXRlXHJcbmV4cG9ydHMuZW5hYmxlQnV0dG9ucyA9IGZ1bmN0aW9uKC4uLmJ1dHRvbnMpIHtcclxuICBzZXRCdXR0b25zU3RhdGUoYnV0dG9ucywgZmFsc2UpO1xyXG59XHJcbmV4cG9ydHMuZGlzYWJsZUJ1dHRvbnMgPSBmdW5jdGlvbiguLi5idXR0b25zKSB7XHJcbiAgc2V0QnV0dG9uc1N0YXRlKGJ1dHRvbnMsIHRydWUpO1xyXG59XHJcbmZ1bmN0aW9uIHNldEJ1dHRvbnNTdGF0ZShidXR0b25zLCB2YWx1ZSkge1xyXG4gIGJ1dHRvbnMuZm9yRWFjaChidXR0b24gPT4gYnV0dG9uLmRpc2FibGVkID0gdmFsdWUpO1xyXG59XHJcblxyXG4vL1xyXG4vLyAgIC8qKiBDcmVhdGVzIGlucHV0IGVsZW1lbnRzIGluICd0b29scycgYm94ICovXHJcbi8vICAgaW5pdFRvb2xzKHRvb2xzKSB7XHJcbi8vICAgICBjb25zdCB0b29sc0ZyYWdtZW50ID0gZG9jdW1lbnQuY3JlYXRlRG9jdW1lbnRGcmFnbWVudCgpO1xyXG4vL1xyXG4vLyAgICAgdG9vbHMuZm9yRWFjaCh0b29sID0+IHtcclxuLy8gICAgICAgLy8gV3JhcCBldmVyeSB0b29sIGZvciBwcm9wZXIgZGlzcGxheSBhbmQgYWRkIGxhYmVsXHJcbi8vICAgICAgIGNvbnN0IGRpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xyXG4vLyAgICAgICBkaXYuY2xhc3NMaXN0LmFkZCgndG9vbCcpO1xyXG4vL1xyXG4vLyAgICAgICBjb25zdCBsYWJlbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2xhYmVsJyk7XHJcbi8vICAgICAgIGxhYmVsLnNldEF0dHJpYnV0ZSgnZm9yJywgdG9vbC5uYW1lKTtcclxuLy8gICAgICAgbGFiZWwuY2xhc3NMaXN0LmFkZCgndG9vbC1uYW1lJyk7XHJcbi8vICAgICAgIGxhYmVsLnRleHRDb250ZW50ID0gdG9vbC5uYW1lO1xyXG4vLyAgICAgICBkaXYuYXBwZW5kQ2hpbGQobGFiZWwpO1xyXG4vL1xyXG4vLyAgICAgICBjb25zdCB0b29sTm9kZSA9IHRoaXMuY3JlYXRlVG9vbE5vZGUodG9vbCk7XHJcbi8vICAgICAgIGRpdi5hcHBlbmRDaGlsZCh0b29sTm9kZSk7XHJcbi8vXHJcbi8vICAgICAgIC8vIEFwcGVuZCB0byBmcmFnbWVudFxyXG4vLyAgICAgICB0b29sc0ZyYWdtZW50LmFwcGVuZENoaWxkKGRpdik7XHJcbi8vICAgICB9KTtcclxuLy9cclxuLy8gICAgIHRoaXMuJHRvb2xzQm94LmlubmVySFRNTCA9ICcnO1xyXG4vLyAgICAgdGhpcy4kdG9vbHNCb3guYXBwZW5kQ2hpbGQodG9vbHNGcmFnbWVudCk7XHJcbi8vICAgICByZXR1cm4gdGhpcztcclxuLy8gICB9XHJcbi8vXHJcbi8vICAgY3JlYXRlVG9vbE5vZGUodG9vbCkge1xyXG4vLyAgICAgc3dpdGNoKHRvb2wudHlwZSkge1xyXG4vLyAgICAgICBjYXNlICdyYW5nZSc6XHJcbi8vICAgICAgICAgcmV0dXJuIHRoaXMuY3JlYXRlUmFuZ2VUb29sKHRvb2wpO1xyXG4vLyAgICAgICBjYXNlICdzd2l0Y2gnOlxyXG4vLyAgICAgICAgIHJldHVybiB0aGlzLmNyZWF0ZVN3aXRjaFRvb2wodG9vbCk7XHJcbi8vICAgICAgIGRlZmF1bHQ6XHJcbi8vICAgICAgICAgcmV0dXJuICdVbmtub3duIHRvb2wgdHlwZSc7XHJcbi8vICAgICB9XHJcbi8vICAgfVxyXG4vL1xyXG4vLyAgIGNyZWF0ZVJhbmdlVG9vbCh0b29sKSB7XHJcbi8vICAgICBjb25zdCBkaXZJbnB1dCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xyXG4vLyAgICAgZGl2SW5wdXQuY2xhc3NMaXN0LmFkZCgncmFuZ2UnKTtcclxuLy9cclxuLy8gICAgIGNvbnN0IHNwYW5NaW4gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzcGFuJyk7XHJcbi8vICAgICBzcGFuTWluLnRleHRDb250ZW50ID0gdG9vbC5taW47XHJcbi8vICAgICBkaXZJbnB1dC5hcHBlbmRDaGlsZChzcGFuTWluKVxyXG4vL1xyXG4vLyAgICAgY29uc3QgaW5wdXQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpbnB1dCcpO1xyXG4vLyAgICAgaW5wdXQuc2V0QXR0cmlidXRlKCdkYXRhLWlkJywgdG9vbC5pZCk7XHJcbi8vICAgICBpbnB1dC5zZXRBdHRyaWJ1dGUoJ2RhdGEtdHlwZScsICdyYW5nZScpO1xyXG4vLyAgICAgaW5wdXQuc2V0QXR0cmlidXRlKCduYW1lJywgdG9vbC5uYW1lKTtcclxuLy8gICAgIGlucHV0LnNldEF0dHJpYnV0ZSgndHlwZScsICdyYW5nZScpO1xyXG4vLyAgICAgaW5wdXQuc2V0QXR0cmlidXRlKCdtaW4nLCB0b29sLm1pbik7XHJcbi8vICAgICBpbnB1dC5zZXRBdHRyaWJ1dGUoJ21heCcsIHRvb2wubWF4KTtcclxuLy8gICAgIGRpdklucHV0LmFwcGVuZENoaWxkKGlucHV0KTtcclxuLy9cclxuLy8gICAgIGNvbnN0IHNwYW5NYXggPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzcGFuJyk7XHJcbi8vICAgICBzcGFuTWF4LnRleHRDb250ZW50ID0gdG9vbC5tYXg7XHJcbi8vICAgICBkaXZJbnB1dC5hcHBlbmRDaGlsZChzcGFuTWF4KTtcclxuLy9cclxuLy8gICAgIGNvbnN0IGRpdkN1cnJlbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcclxuLy8gICAgIGRpdkN1cnJlbnQuY2xhc3NMaXN0LmFkZCgncmFuZ2UtY3VycmVudC12YWx1ZScpO1xyXG4vLyAgICAgY29uc3Qgc3BhbkN1cnJlbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzcGFuJyk7XHJcbi8vICAgICBzcGFuQ3VycmVudC50ZXh0Q29udGVudCA9IGlucHV0LnZhbHVlO1xyXG4vLyAgICAgZGl2Q3VycmVudC5hcHBlbmRDaGlsZChzcGFuQ3VycmVudCk7XHJcbi8vXHJcbi8vICAgICBpbnB1dC5hZGRFdmVudExpc3RlbmVyKCdpbnB1dCcsIChldnQpID0+IHtcclxuLy8gICAgICAgdGhpcy51cGRhdGVDdXJyZW50UmFuZ2VWYWx1ZShzcGFuQ3VycmVudCwgZXZ0LnRhcmdldC52YWx1ZSk7XHJcbi8vICAgICB9KTtcclxuLy9cclxuLy8gICAgIGNvbnN0IGZyYWdtZW50ID0gZG9jdW1lbnQuY3JlYXRlRG9jdW1lbnRGcmFnbWVudCgpO1xyXG4vLyAgICAgZnJhZ21lbnQuYXBwZW5kQ2hpbGQoZGl2SW5wdXQpO1xyXG4vLyAgICAgZnJhZ21lbnQuYXBwZW5kQ2hpbGQoZGl2Q3VycmVudCk7XHJcbi8vXHJcbi8vICAgICByZXR1cm4gZnJhZ21lbnQ7XHJcbi8vICAgfVxyXG4vL1xyXG4vLyAgIHVwZGF0ZUN1cnJlbnRSYW5nZVZhbHVlKG5vZGUsIHZhbHVlKSB7XHJcbi8vICAgICBub2RlLnRleHRDb250ZW50ID0gdmFsdWU7XHJcbi8vICAgfVxyXG4vL1xyXG4vLyAgIGNyZWF0ZVN3aXRjaFRvb2wodG9vbCkge1xyXG4vLyAgICAgY29uc3QgbGFiZWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdsYWJlbCcpO1xyXG4vLyAgICAgbGFiZWwuY2xhc3NMaXN0LmFkZCgnc3dpdGNoJyk7XHJcbi8vXHJcbi8vICAgICBjb25zdCBpbnB1dCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2lucHV0Jyk7XHJcbi8vICAgICBpbnB1dC5zZXRBdHRyaWJ1dGUoJ2RhdGEtaWQnLCB0b29sLmlkKTtcclxuLy8gICAgIGlucHV0LnNldEF0dHJpYnV0ZSgnZGF0YS10eXBlJywgJ3N3aXRjaCcpO1xyXG4vLyAgICAgaW5wdXQuc2V0QXR0cmlidXRlKCd0eXBlJywgJ2NoZWNrYm94Jyk7XHJcbi8vICAgICBsYWJlbC5hcHBlbmRDaGlsZChpbnB1dCk7XHJcbi8vXHJcbi8vICAgICBjb25zdCBkaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcclxuLy8gICAgIGRpdi5jbGFzc0xpc3QuYWRkKCdzbGlkZXInKTtcclxuLy8gICAgIGxhYmVsLmFwcGVuZENoaWxkKGRpdik7XHJcbi8vXHJcbi8vICAgICByZXR1cm4gbGFiZWw7XHJcbi8vICAgfVxyXG4vL1xyXG4vLyAgIC8qKiBTZXRzIGltZyBhbmQgcGFyYW1ldGVycyBvZiBjdXJyZW50IHN0YXRlIHRvIFVJICovXHJcblxyXG4vL1xyXG4vLyAgIC8qKiBTZXRzIGV2ZW50IGRhdGEgdG8gVUkgKi9cclxuLy8gICBzZXRFdmVudChldmVudCkge1xyXG4vLyAgICAgY29uc29sZS5sb2coZXZlbnQpO1xyXG4vLyAgICAgdGhpcy4kZXZlbnQucXVlcnlTZWxlY3RvcignLm1vZGVsLWV2ZW50LW5hbWUgc3BhbicpLnRleHRDb250ZW50ID0gZXZlbnQubmFtZTtcclxuLy8gICAgIHRoaXMuJGV2ZW50LnF1ZXJ5U2VsZWN0b3IoJy5tb2RlbC1ldmVudC1pbmZvJykudGV4dENvbnRlbnQgPSBldmVudC5kZXNjcmlwdGlvbjtcclxuLy8gICAgIHRoaXMuJGV2ZW50LmNsYXNzTGlzdC5yZW1vdmUoJ2lzLWhpZGRlbicpO1xyXG4vLyAgIH1cclxuLy8gICBoaWRlRXZlbnQoKSB7XHJcbi8vICAgICB0aGlzLiRldmVudC5jbGFzc0xpc3QuYWRkKCdpcy1oaWRkZW4nKTtcclxuLy8gICB9XHJcbi8vXHJcbi8vICAgLyoqIEdldCBkYXRhIGZyb20gdG9vbCBub2RlcyAqL1xyXG4vLyAgIGdldFRvb2xzRGF0YSgpIHtcclxuLy8gICAgIGNvbnN0IHRvb2xzRGF0YSA9IHt9O1xyXG4vLyAgICAgY29uc3QgaW5wdXRzID0gdGhpcy4kdG9vbHNCb3gucXVlcnlTZWxlY3RvckFsbCgnaW5wdXRbZGF0YS1pZF0nKTtcclxuLy8gICAgIGlucHV0cy5mb3JFYWNoKGlucHV0ID0+IHtcclxuLy8gICAgICAgY29uc3QgeyBpZCwgdHlwZSB9ID0gaW5wdXQuZGF0YXNldDtcclxuLy8gICAgICAgbGV0IHZhbHVlO1xyXG4vLyAgICAgICBzd2l0Y2godHlwZSkge1xyXG4vLyAgICAgICAgIGNhc2UgJ3JhbmdlJzogdmFsdWUgPSBwYXJzZUludChpbnB1dC52YWx1ZSk7IGJyZWFrO1xyXG4vLyAgICAgICAgIGNhc2UgJ3N3aXRjaCc6IHZhbHVlID0gaW5wdXQuY2hlY2tlZDsgYnJlYWs7XHJcbi8vICAgICAgICAgZGVmYXVsdDogdGhyb3cgbmV3IEVycm9yKCdJbnZhbGlkIHRvb2wgdHlwZScpO1xyXG4vLyAgICAgICB9XHJcbi8vICAgICAgIHRvb2xzRGF0YVtpZF0gPSB2YWx1ZTtcclxuLy8gICAgIH0pO1xyXG4vLyAgICAgcmV0dXJuIHRvb2xzRGF0YTtcclxuLy8gICB9XHJcbi8vIH1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IGV4cG9ydHM7XHJcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2xlYXJuaW5nL3NjZW5lLmpzIiwiZnVuY3Rpb24gYWpheChwYXRoID0gJycsIG9wdGlvbnMgPSB7fSkge1xyXG4gIGNvbnN0IHhociA9IG5ldyBYTUxIdHRwUmVxdWVzdCgpO1xyXG4gIHhoci5vcGVuKG9wdGlvbnMubWV0aG9kIHx8ICdHRVQnLCBwYXRoLCB0cnVlKTtcclxuICBpZiAob3B0aW9ucy5oZWFkZXJzKSB7IHNldFhIUkhlYWRlcnMoeGhyLCBvcHRpb25zLmhlYWRlcnMpOyB9XHJcbiAgeGhyLnNlbmQob3B0aW9ucy5kYXRhKTtcclxuXHJcbiAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcclxuICAgIHhoci5vbnJlYWR5c3RhdGVjaGFuZ2UgPSBmdW5jdGlvbigpIHtcclxuICAgICAgaWYoeGhyLnJlYWR5U3RhdGUgPT0gNCkge1xyXG4gICAgICAgIGlmKHhoci5zdGF0dXMgPT0gMjAwKSB7XHJcbiAgICAgICAgICByZXNvbHZlKHhoci5yZXNwb25zZVRleHQpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICByZWplY3QoeGhyLnN0YXR1c1RleHQpO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH0pXHJcbn1cclxuXHJcbmZ1bmN0aW9uIHNldFhIUkhlYWRlcnMoeGhyLCBoZWFkZXJzKSB7XHJcbiAgZm9yIChsZXQgaGVhZGVyIGluIGhlYWRlcnMpIHtcclxuICAgIHhoci5zZXRSZXF1ZXN0SGVhZGVyKGhlYWRlciwgaGVhZGVyc1toZWFkZXJzXSk7XHJcbiAgfVxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBhamF4O1xyXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi91dGlscy9hamF4LmpzIiwiLy8gcmVtb3ZlZCBieSBleHRyYWN0LXRleHQtd2VicGFjay1wbHVnaW5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuLi9zYXNzL2xlYXJuaW5nLnNjc3Ncbi8vIG1vZHVsZSBpZCA9IDRcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiY2xhc3MgQWN0aW9uIHtcclxuICBjb25zdHJ1Y3RvcihkYXRhKSB7XHJcbiAgICB0aGlzLm1pblRpbWUgPSBkYXRhLm1pblRpbWU7XHJcbiAgICB0aGlzLm1heFRpbWUgPSBkYXRhLm1heFRpbWU7XHJcbiAgICB0aGlzLm5leHRTdGF0ZSA9IGRhdGEubmV4dFN0YXRlO1xyXG4gICAgaWYgKGRhdGEuaW5hY3RpdmUpIHtcclxuICAgICAgdGhpcy5pbmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgIHRoaXMudG9vbHMgPSBbXTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHRoaXMuaW5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgdGhpcy50b29scyA9IGRhdGEudG9vbHM7XHJcbiAgICB9XHJcblxyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogQHBhcmFtIFt7IGlkOiBOdW1iZXIsIHZhbHVlOiBOdW1iZXIvQm9vbGVhbiB9LCB7Li4ufV1cclxuICAgKiBAcGFyYW0gTnVtYmVyXHJcbiAgICogQHJldHVybiBCb29sZWFuXHJcbiAgICovXHJcbiAgaXNTdWl0YWJsZShkYXRhLCB0aW1lKSB7XHJcbiAgICByZXR1cm4gdGhpcy5yaWdodFRpbWUodGltZSkgJiYgdGhpcy5yaWdodERhdGEoZGF0YSk7XHJcbiAgfVxyXG5cclxuICByaWdodERhdGEoZGF0YSA9IFtdKSB7XHJcbiAgICBpZighQXJyYXkuaXNBcnJheShkYXRhKSkgeyB0aHJvdyBuZXcgVHlwZUVycm9yKGBJbnZhbGlkIHR5cGUgb2YgZGF0YSBmcm9tIHRvb2xzLiBFeHBlY3RlZCBhcnJheSwgZ290ICR7dHlwZW9mIGRhdGF9YCk7IH1cclxuICAgIHJldHVybiB0aGlzLnRvb2xzLmV2ZXJ5KHRvb2wgPT4ge1xyXG4gICAgICAvLyDQldGB0LvQuCDRgdGA0LXQtNC4INC/0L7Qu9GD0YfQtdC90L3Ri9GFINC40YLQtdC80L7QsiDQvdC10YIsINGC0L7Qs9C+INC60L7RgtC+0YDRi9C5INC10YHRgtGMINCyINC00LDQvdC90L7QvCDRjdC60YjQtdC90LVcclxuICAgICAgY29uc3QgY2hlY2tUb29sID0gZGF0YS5maW5kKG9iaiA9PiBvYmouaWQgPT09IHRvb2wuaWQpO1xyXG4gICAgICBpZiAoIWNoZWNrVG9vbCkgeyByZXR1cm4gZmFsc2U7IH1cclxuXHJcbiAgICAgIC8vINCU0LvRjyDQv9C10YDQtdC60LvRjtGH0LDRgtC10LvRj1xyXG4gICAgICBpZiAodHlwZW9mIHRvb2wudmFsdWUgPT09ICdib29sZWFuJykgeyByZXR1cm4gY2hlY2tUb29sLnZhbHVlID09PSB0b29sLnZhbHVlOyB9XHJcblxyXG4gICAgICAvLyDQlNC70Y8g0YDQtdC90LTQttCwXHJcbiAgICAgIGlmIChBcnJheS5pc0FycmF5KHRvb2wudmFsdWUpKSB7IHJldHVybiB0aGlzLmluY2x1ZGVzVmFsdWUoY2hlY2tUb29sLnZhbHVlLCB0b29sLnZhbHVlKSB9XHJcblxyXG4gICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIGluY2x1ZGVzVmFsdWUodmFsdWUsIGJvcmRlcnMpIHtcclxuICAgIGlmICh0eXBlb2YgdmFsdWUgIT09ICdudW1iZXInKSB0aHJvdyBuZXcgVHlwZUVycm9yKCdWYWx1ZSBzaG91bGQgYmUgaW50ZWdlcicpO1xyXG4gICAgcmV0dXJuICh2YWx1ZSA+PSBib3JkZXJzWzBdKSAmJiAodmFsdWUgPD0gYm9yZGVyc1sxXSk7XHJcbiAgfVxyXG5cclxuICByaWdodFRpbWUodGltZSkge1xyXG4gICAgaWYgKHR5cGVvZiB0aW1lICE9PSAnbnVtYmVyJykgdGhyb3cgbmV3IFR5cGVFcnJvcignVGltZSBzaG91bGQgYmUgaW50ZWdlciAobXMpJyk7XHJcbiAgICByZXR1cm4gKHRpbWUgPj0gdGhpcy5taW5UaW1lKSAmJiAodGltZSA8PSB0aGlzLm1heFRpbWUpO1xyXG4gIH1cclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgQWN0aW9uO1xyXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9sZWFybmluZy9tb2RlbF9jb21wb25lbnRzL2FjdGlvbi5qcyIsImNsYXNzIEV2ZW50IHtcclxuICBjb25zdHJ1Y3RvcihkYXRhKSB7XHJcbiAgICB0aGlzLmlkID0gZGF0YS5pZDtcclxuICAgIHRoaXMubmFtZSA9IGRhdGEubmFtZTtcclxuICAgIHRoaXMuZGVzY3JpcHRpb24gPSBkYXRhLmRlc2NyaXB0aW9uO1xyXG4gIH1cclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgRXZlbnQ7XHJcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2xlYXJuaW5nL21vZGVsX2NvbXBvbmVudHMvZXZlbnQuanMiLCJpbXBvcnQgRXZlbnQgZnJvbSAnLi9ldmVudCcgO1xyXG5pbXBvcnQgQWN0aW9uIGZyb20gJy4vYWN0aW9uJztcclxuXHJcbmNsYXNzIFN0YXRlIHtcclxuICBjb25zdHJ1Y3RvcihkYXRhKSB7XHJcbiAgICB0aGlzLmlkID0gZGF0YS5pZDtcclxuICAgIHRoaXMubmFtZSA9IGRhdGEubmFtZTtcclxuICAgIHRoaXMuaW1nID0gZGF0YS5pbWc7XHJcbiAgICB0aGlzLnBhcmFtcyA9IGRhdGEucGFyYW1zO1xyXG5cclxuICAgIGlmKGRhdGEubGFzdCkge1xyXG4gICAgICB0aGlzLmxhc3QgPSB0cnVlO1xyXG4gICAgICB0aGlzLmV2ZW50ID0gbnVsbDtcclxuICAgICAgdGhpcy5hY3Rpb24gPSBudWxsO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdGhpcy5ldmVudCA9IG5ldyBFdmVudChkYXRhLmV2ZW50KTtcclxuICAgICAgdGhpcy5hY3Rpb25zID0gZGF0YS5hY3Rpb25zLm1hcChhY3Rpb24gPT4gbmV3IEFjdGlvbihhY3Rpb24pKTtcclxuICAgICAgdGhpcy5sYXN0ID0gZmFsc2U7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBnZXRJbmFjdGl2ZVRpbWUoKSB7XHJcbiAgICBjb25zdCB0aW1lcyA9IHRoaXMuZ2V0QWxsQWN0aW9uVGltZXMoKTtcclxuICAgIHJldHVybiBNYXRoLm1heCguLi50aW1lcyk7XHJcbiAgfVxyXG5cclxuICBnZXRJbmFjdGl2ZUFjdGlvbigpIHtcclxuICAgIHJldHVybiB0aGlzLmFjdGlvbnMuZmluZChhY3Rpb24gPT4gYWN0aW9uLmluYWN0aXZlID09PSB0cnVlKTtcclxuICB9XHJcblxyXG4gIGdldEFsbEFjdGlvblRpbWVzKCkge1xyXG4gICAgcmV0dXJuIHRoaXMuYWN0aW9ucy5tYXAoYWN0aW9uID0+IGFjdGlvbi5tYXhUaW1lIHx8IDApO1xyXG4gIH1cclxuXHJcbiAgaGFuZGxlSW5wdXQoZGF0YSwgdGltZSkge1xyXG4gICAgY29uc3Qgc3VpdGVkQWN0aW9ucyA9IHRoaXMuYWN0aW9ucy5maWx0ZXIoYWN0aW9uID0+IGFjdGlvbi5pc1N1aXRhYmxlKGRhdGEsIHRpbWUpKTtcclxuICAgIGlmIChzdWl0ZWRBY3Rpb25zKSB7XHJcbiAgICAgIHJldHVybiBzdWl0ZWRBY3Rpb25zWzBdLm5leHRTdGF0ZTtcclxuICAgIH1cclxuICB9XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IFN0YXRlO1xyXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9sZWFybmluZy9tb2RlbF9jb21wb25lbnRzL3N0YXRlLmpzIiwiaW1wb3J0ICcuLi8uLi9zYXNzL2xlYXJuaW5nLnNjc3MnO1xyXG5cclxuaW1wb3J0IHB1YnN1YiBmcm9tICcuLi91dGlscy9wdWJzdWInO1xyXG5pbXBvcnQgYWpheCBmcm9tICcuLi91dGlscy9hamF4JztcclxuaW1wb3J0IHNjZW5lIGZyb20gJy4vc2NlbmUnO1xyXG5pbXBvcnQgTW9kZWwgZnJvbSAnLi9tb2RlbCc7XHJcblxyXG4vKipcclxuICogTG9hZCBtb2RlbCB3aXRoIGdpdmVuIGlkXHJcbiAqL1xyXG5mdW5jdGlvbiBsb2FkTW9kZWwoaWQpIHtcclxuICByZXR1cm4gYWpheChgL21vZGVscy8ke2lkfWApLnRoZW4ocmVzcG9uc2UgPT4gSlNPTi5wYXJzZShyZXNwb25zZSkpO1xyXG59XHJcblxyXG4vKipcclxuICogVUkgYnV0dG9uJ3MgaGFuZGxlcnNcclxuICovXHJcbmNvbnN0ICRzZWxlY3QgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI21vZGVsLXNlbGVjdFwiKTtcclxuY29uc3QgJGxvYWRCdXR0b24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjbG9hZC1tb2RlbC1idG4nKTtcclxubGV0IG1vZGVsID0gbnVsbDtcclxuJGxvYWRCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XHJcbiAgY29uc3QgbW9kZWxJZCA9ICRzZWxlY3QudmFsdWU7XHJcbiAgbG9hZE1vZGVsKG1vZGVsSWQpXHJcbiAgICAudGhlbihyZXNwb25zZSA9PiB7XHJcbiAgICAgIG1vZGVsID0gbmV3IE1vZGVsKHJlc3BvbnNlKTtcclxuICAgICAgc2NlbmUuaW5pdChtb2RlbCwgcmVzcG9uc2UpLnNob3dDb250ZW50KCkuZW5hYmxlQnV0dG9ucygkc3RhcnRCdXR0b24pO1xyXG4gICAgfSlcclxuICAgIC5jYXRjaChlcnIgPT4geyBjb25zb2xlLmVycm9yKGVycikgfSk7XHJcbn0pO1xyXG4vL1xyXG5jb25zdCAkc3RhcnRCdXR0b24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjc3RhcnQtYnRuJyk7XHJcbi8vICRzdGFydEJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcclxuLy8gICBtb2RlbC5zdGFydCgpO1xyXG4vLyB9KTtcclxuLy9cclxuY29uc3QgJHN0b3BCdXR0b24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjc3RvcC1idG4nKTtcclxuLy8gJHN0b3BCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XHJcbi8vICAgbW9kZWwuc3RvcCgpOyAvLyBUT0RPXHJcbi8vIH0pO1xyXG4vL1xyXG5jb25zdCAkcnVuQnV0dG9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3J1bi1idG4nKTtcclxuLy8gJHJ1bkJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcclxuLy8gICBjb25zdCB0b29sc0RhdGEgPSBzY2VuZS5nZXRUb29sc0RhdGEoKTtcclxuLy8gICBwdWJzdWIucHVibGlzaCgndXNlcl9pbnB1dCcsIHRvb2xzRGF0YSk7XHJcbi8vIH0pO1xyXG4vL1xyXG4vLyAvKipcclxuLy8gICogSGFuZGxlIGN1c3RvbSBldmVudHMgaGVyZSAodXNlciBpbnB1dCwgcHJvZ3JhbW0gbWVzc2FnZXMgZXRjLilcclxuLy8gICovXHJcbi8vIHB1YnN1Yi5zdWJzY3JpYmUoJ25ld19zdGF0ZScsIHN0YXRlID0+IHNjZW5lLnNldFN0YXRlKHN0YXRlKSk7XHJcbi8vIHB1YnN1Yi5zdWJzY3JpYmUoJ2V2ZW50JywgZGF0YSA9PiBzY2VuZS5zZXRFdmVudChkYXRhLmV2ZW50KSk7XHJcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2xlYXJuaW5nL2luZGV4LmpzIiwiaW1wb3J0IG5vZGVGYWN0b3J5IGZyb20gJy4uLy4uL3V0aWxzL25vZGVGYWN0b3J5JztcclxuXHJcbmNvbnN0ICRuYW1lID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLm1vZGVsLXN0YXRlLW5hbWUnKTtcclxuY29uc3QgJGltZyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5tb2RlbC1zdGF0ZS1pbWcnKTtcclxuY29uc3QgJHBhcmFtcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5tb2RlbC1wYXJhbXMtdmFsdWVzJyk7XHJcbmNvbnN0ICRldmVudCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5tb2RlbC1ldmVudCcpO1xyXG5jb25zdCAkcmVzcG9uc2UgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcubW9kZWwtcmVzcG9uc2UnKTtcclxuXHJcbmZ1bmN0aW9uIHNldCh7IG5hbWUsIGltZywgcGFyYW1zIH0pIHtcclxuICAkbmFtZS50ZXh0Q29udGVudCA9IG5hbWU7XHJcbiAgJGltZy5zZXRBdHRyaWJ1dGUoJ3NyYycsIGltZyk7XHJcbiAgc2V0UGFyYW1ldGVycyhwYXJhbXMpO1xyXG59XHJcblxyXG5mdW5jdGlvbiBzZXRQYXJhbWV0ZXJzKHBhcmFtcykge1xyXG4gIGNvbnN0IGZyYWcgPSBkb2N1bWVudC5jcmVhdGVEb2N1bWVudEZyYWdtZW50KCk7XHJcbiAgZm9yIChsZXQga2V5IGluIHBhcmFtcykge1xyXG4gICAgZnJhZy5hcHBlbmRDaGlsZChjcmVhdGVQYXJhbWV0ZU5vZGUoa2V5LCBwYXJhbXNba2V5XSkpO1xyXG4gIH1cclxuICAkcGFyYW1zLmlubmVySFRNTCA9IFwiXCI7XHJcbiAgJHBhcmFtcy5hcHBlbmRDaGlsZChmcmFnKTtcclxufVxyXG5cclxuZnVuY3Rpb24gY3JlYXRlUGFyYW1ldGVOb2RlKGtleSwgdmFsdWUpIHtcclxuICBjb25zdCBkaXYgPSBub2RlRmFjdG9yeSgnZGl2JywgeyBjbGFzc0xpc3Q6IFsncGFyYW1ldGVyJ10gfSk7XHJcblxyXG4gIGNvbnN0IGtleVNwYW4gPSBub2RlRmFjdG9yeSgnc3BhbicsIHsgdGV4dENvbnRlbnQ6IGtleSB9KTtcclxuICBkaXYuYXBwZW5kQ2hpbGQoa2V5U3Bhbik7XHJcblxyXG4gIGNvbnN0IHZhbHVlU3BhbiA9IG5vZGVGYWN0b3J5KCdzcGFuJywgeyB0ZXh0Q29udGVudDogdmFsdWUgfSk7XHJcbiAgZGl2LmFwcGVuZENoaWxkKHZhbHVlU3Bhbik7XHJcblxyXG4gIHJldHVybiBkaXY7XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IHtcclxuICBzZXRcclxufVxyXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9sZWFybmluZy9zY2VuZV9jb21wb25lbnRzL3N0YXRlLmpzIiwiY29uc3QgJHRvb2xzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnRvb2xzLWxpc3QnKTtcclxuXHJcbmZ1bmN0aW9uIGluaXQoKSB7fVxyXG5cclxuZXhwb3J0IGRlZmF1bHQge1xyXG4gIGluaXQsXHJcbn07XHJcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2xlYXJuaW5nL3NjZW5lX2NvbXBvbmVudHMvdG9vbHMuanMiLCJjb25zdCBub2RlRmFjdG9yeSA9IGZ1bmN0aW9uKHR5cGUgPSAnZGl2JywgcGFyYW1zKSB7XHJcbiAgY29uc3Qgbm9kZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQodHlwZSk7XHJcblxyXG4gIGFwcGVuZENsYXNzZXMobm9kZSwgcGFyYW1zKTtcclxuICBhcHBlbmRBdHRycyhub2RlLCBwYXJhbXMpO1xyXG4gIGluc2VydFRleHRDb250ZW50KG5vZGUsIHBhcmFtcyk7XHJcblxyXG4gIHJldHVybiBub2RlO1xyXG59XHJcblxyXG5mdW5jdGlvbiBhcHBlbmRDbGFzc2VzKG5vZGUsIHsgY2xhc3NMaXN0IH0pIHtcclxuICBpZiAoY2xhc3NMaXN0ICYmIGNsYXNzTGlzdC5mb3JFYWNoKSB7XHJcbiAgICBjbGFzc0xpc3QuZm9yRWFjaChjbGFzc05hbWUgPT4gbm9kZS5jbGFzc0xpc3QuYWRkKGNsYXNzTmFtZSkpO1xyXG4gIH1cclxufVxyXG5cclxuZnVuY3Rpb24gYXBwZW5kQXR0cnMobm9kZSwgeyBhdHRycyB9KSB7XHJcbiAgaWYgKGF0dHJzKSB7XHJcbiAgICBjb25zdCBhdHRyTmFtZXMgPSBPYmplY3Qua2V5cyhhdHRycyk7XHJcbiAgICBhdHRyTmFtZXMuZm9yRWFjaChhdHRyTmFtZSA9PiBub2RlLnNldEF0dHJpYnV0ZShhdHRyTmFtZSwgYXR0cnNbYXR0ck5hbWVdKSk7XHJcbiAgfVxyXG59XHJcblxyXG5mdW5jdGlvbiBpbnNlcnRUZXh0Q29udGVudChub2RlLCB7IHRleHRDb250ZW50ID0gXCJcIiB9KSB7XHJcbiAgbm9kZS50ZXh0Q29udGVudCA9IHRleHRDb250ZW50O1xyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBub2RlRmFjdG9yeTtcclxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vdXRpbHMvbm9kZUZhY3RvcnkuanMiXSwic291cmNlUm9vdCI6IiJ9