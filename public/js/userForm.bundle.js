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

/***/ 1:
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

/***/ 11:
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ 26:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


__webpack_require__(11);

var _userValidator = __webpack_require__(6);

var _userValidator2 = _interopRequireDefault(_userValidator);

var _ajax = __webpack_require__(1);

var _ajax2 = _interopRequireDefault(_ajax);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Form validation
 */
var INPUT_NAMES = ['username', 'password', 'password-verify', 'firstname', 'lastname', 'email'];

var $rows = INPUT_NAMES.map(function (name) {
  return document.querySelector('[name=' + name + ']');
}).map(function ($field) {
  return {
    input: $field,
    error: $field.parentNode.querySelector('.error-field')
  };
}).reduce(function (res, $row) {
  res[$row.input.getAttribute('name')] = $row;
  return res;
}, {});

[$rows['password'].input, $rows['password-verify'].input].forEach(function ($pass) {
  $pass.addEventListener('change', handlePasswordChange);
});

function handlePasswordChange() {
  var res = _userValidator2.default.verify($rows['password'].input.value, $rows['password-verify'].input.value);

  $rows['password-verify'].error.textContent = res.valid ? "" : res.message;
}

/**
 * Saving data on server
 */
var $form = document.querySelector("#user-form");
var $saveButton = document.querySelector('#save-btn');
$saveButton.addEventListener('click', function (e) {
  e.preventDefault();

  var data = Object.keys($rows).reduce(function (acc, row) {
    acc[row] = $rows[row].input.value;
    return acc;
  }, {});

  var url = $form.action;
  var options = {
    method: $form.method,
    data: JSON.stringify(data),
    headers: {
      'Content-type': 'application/json'
    }
  };

  (0, _ajax2.default)(url, options, true).then(function (data) {
    return console.log(data);
  }).catch(function (err) {
    return console.err(err);
  });
});

/***/ }),

/***/ 6:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
var validator = {};

validator.verify = function (first, second) {
  return first === second ? response(true) : response(false, "Пароли не совпадают");
};

function response(valid, message) {
  return {
    valid: valid,
    message: message
  };
}

exports.default = validator;

/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgNGU5Y2RmYTM0YjA5Yzc2YTc2MjY/MTk1MSoiLCJ3ZWJwYWNrOi8vLy4vdXRpbHMvYWpheC5qcz9lYjkwIiwid2VicGFjazovLy8uLi9zYXNzL3VzZXJGb3JtLnNjc3MiLCJ3ZWJwYWNrOi8vLy4vdXNlckZvcm0vaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vdXNlckZvcm0vdXNlclZhbGlkYXRvci5qcyJdLCJuYW1lcyI6WyJhamF4IiwicGF0aCIsIm9wdGlvbnMiLCJmdWxsUmVzcG9uc2UiLCJ4aHIiLCJYTUxIdHRwUmVxdWVzdCIsIm9wZW4iLCJtZXRob2QiLCJoZWFkZXJzIiwic2V0WEhSSGVhZGVycyIsInNlbmQiLCJkYXRhIiwiUHJvbWlzZSIsInJlc29sdmUiLCJyZWplY3QiLCJvbnJlYWR5c3RhdGVjaGFuZ2UiLCJyZWFkeVN0YXRlIiwic3RhdHVzIiwicmVzcG9uc2VUZXh0Iiwic3RhdHVzVGV4dCIsImhlYWRlciIsInNldFJlcXVlc3RIZWFkZXIiLCJJTlBVVF9OQU1FUyIsIiRyb3dzIiwibWFwIiwiZG9jdW1lbnQiLCJxdWVyeVNlbGVjdG9yIiwibmFtZSIsImlucHV0IiwiJGZpZWxkIiwiZXJyb3IiLCJwYXJlbnROb2RlIiwicmVkdWNlIiwicmVzIiwiJHJvdyIsImdldEF0dHJpYnV0ZSIsImZvckVhY2giLCIkcGFzcyIsImFkZEV2ZW50TGlzdGVuZXIiLCJoYW5kbGVQYXNzd29yZENoYW5nZSIsInZlcmlmeSIsInZhbHVlIiwidGV4dENvbnRlbnQiLCJ2YWxpZCIsIm1lc3NhZ2UiLCIkZm9ybSIsIiRzYXZlQnV0dG9uIiwiZSIsInByZXZlbnREZWZhdWx0IiwiT2JqZWN0Iiwia2V5cyIsImFjYyIsInJvdyIsInVybCIsImFjdGlvbiIsIkpTT04iLCJzdHJpbmdpZnkiLCJ0aGVuIiwiY29uc29sZSIsImxvZyIsImNhdGNoIiwiZXJyIiwidmFsaWRhdG9yIiwiZmlyc3QiLCJzZWNvbmQiLCJy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LEdBRE4sRUFFQ2lELEtBRkQsQ0FFTztBQUFBLFdBQU9GLFFBQVFHLEdBQVIsQ0FBWUEsR0FBWixDQUFQO0FBQUEsR0FGUDtBQUdELENBcEJELEU7Ozs7Ozs7Ozs7Ozs7QUN6Q0EsSUFBTUMsWUFBWSxFQUFsQjs7QUFFQUEsVUFBVXRCLE1BQVYsR0FBbUIsVUFBQ3VCLEtBQUQsRUFBUUMsTUFBUixFQUFtQjtBQUNwQyxTQUNFRCxVQUFVQyxNQUFWLEdBQ0VDLFNBQVMsSUFBVCxDQURGLEdBRUVBLFNBQVMsS0FBVCxFQUFnQixxQkFBaEIsQ0FISjtBQUtELENBTkQ7O0FBUUEsU0FBU0EsUUFBVCxDQUFrQnRCLEtBQWxCLEVBQXlCQyxPQUF6QixFQUFrQztBQUNoQyxTQUFPO0FBQ0xELGdCQURLO0FBRUxDO0FBRkssR0FBUDtBQUlEOztrQkFFY2tCLFMiLCJmaWxlIjoidXNlckZvcm0uYnVuZGxlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pXG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG5cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGlkZW50aXR5IGZ1bmN0aW9uIGZvciBjYWxsaW5nIGhhcm1vbnkgaW1wb3J0cyB3aXRoIHRoZSBjb3JyZWN0IGNvbnRleHRcbiBcdF9fd2VicGFja19yZXF1aXJlX18uaSA9IGZ1bmN0aW9uKHZhbHVlKSB7IHJldHVybiB2YWx1ZTsgfTtcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7XG4gXHRcdFx0XHRjb25maWd1cmFibGU6IGZhbHNlLFxuIFx0XHRcdFx0ZW51bWVyYWJsZTogdHJ1ZSxcbiBcdFx0XHRcdGdldDogZ2V0dGVyXG4gXHRcdFx0fSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gMjYpO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIHdlYnBhY2svYm9vdHN0cmFwIDRlOWNkZmEzNGIwOWM3NmE3NjI2IiwiZnVuY3Rpb24gYWpheChwYXRoID0gJycsIG9wdGlvbnMgPSB7fSwgZnVsbFJlc3BvbnNlID0gZmFsc2UpIHtcclxuICBjb25zdCB4aHIgPSBuZXcgWE1MSHR0cFJlcXVlc3QoKTtcclxuICB4aHIub3BlbihvcHRpb25zLm1ldGhvZCB8fCAnR0VUJywgcGF0aCwgdHJ1ZSk7XHJcbiAgaWYgKG9wdGlvbnMuaGVhZGVycykgeyBzZXRYSFJIZWFkZXJzKHhociwgb3B0aW9ucy5oZWFkZXJzKTsgfVxyXG4gIHhoci5zZW5kKG9wdGlvbnMuZGF0YSk7XHJcblxyXG4gIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XHJcbiAgICB4aHIub25yZWFkeXN0YXRlY2hhbmdlID0gZnVuY3Rpb24oKSB7XHJcbiAgICAgIGlmKHhoci5yZWFkeVN0YXRlID09IDQpIHtcclxuICAgICAgICBpZih4aHIuc3RhdHVzID09IDIwMCkge1xyXG4gICAgICAgICAgaWYgKGZ1bGxSZXNwb25zZSkge1xyXG4gICAgICAgICAgICByZXNvbHZlKHhocik7XHJcbiAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICByZXNvbHZlKHhoci5yZXNwb25zZVRleHQpO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICByZWplY3QoeGhyLnN0YXR1c1RleHQpO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH0pXHJcbn1cclxuXHJcbmZ1bmN0aW9uIHNldFhIUkhlYWRlcnMoeGhyLCBoZWFkZXJzKSB7XHJcbiAgZm9yIChsZXQgaGVhZGVyIGluIGhlYWRlcnMpIHtcclxuICAgIHhoci5zZXRSZXF1ZXN0SGVhZGVyKGhlYWRlciwgaGVhZGVyc1toZWFkZXJdKTtcclxuICB9XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IGFqYXg7XHJcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3V0aWxzL2FqYXguanMiLCIvLyByZW1vdmVkIGJ5IGV4dHJhY3QtdGV4dC13ZWJwYWNrLXBsdWdpblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4uL3Nhc3MvdXNlckZvcm0uc2Nzc1xuLy8gbW9kdWxlIGlkID0gMTFcbi8vIG1vZHVsZSBjaHVua3MgPSAyIiwiaW1wb3J0ICcuLi8uLi9zYXNzL3VzZXJGb3JtLnNjc3MnO1xyXG5cclxuaW1wb3J0IHZhbGlkYXRvciBmcm9tICcuL3VzZXJWYWxpZGF0b3InO1xyXG5pbXBvcnQgYWpheCBmcm9tICcuLi91dGlscy9hamF4JztcclxuLyoqXHJcbiAqIEZvcm0gdmFsaWRhdGlvblxyXG4gKi9cclxuY29uc3QgSU5QVVRfTkFNRVMgPSBbJ3VzZXJuYW1lJywgJ3Bhc3N3b3JkJywgJ3Bhc3N3b3JkLXZlcmlmeScsICdmaXJzdG5hbWUnLFxyXG4gICdsYXN0bmFtZScsICdlbWFpbCddO1xyXG5cclxuY29uc3QgJHJvd3MgPSBJTlBVVF9OQU1FUy5tYXAobmFtZSA9PiB7XHJcbiAgcmV0dXJuIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoYFtuYW1lPSR7bmFtZX1dYCk7XHJcbn0pLm1hcCgkZmllbGQgPT4ge1xyXG4gIHJldHVybiB7XHJcbiAgICBpbnB1dDogJGZpZWxkLFxyXG4gICAgZXJyb3I6ICRmaWVsZC5wYXJlbnROb2RlLnF1ZXJ5U2VsZWN0b3IoJy5lcnJvci1maWVsZCcpXHJcbiAgfVxyXG59KS5yZWR1Y2UoKHJlcywgJHJvdykgPT4ge1xyXG4gIHJlc1skcm93LmlucHV0LmdldEF0dHJpYnV0ZSgnbmFtZScpXSA9ICRyb3c7XHJcbiAgcmV0dXJuIHJlcztcclxufSwge30pO1xyXG5cclxuWyRyb3dzWydwYXNzd29yZCddLmlucHV0LCAkcm93c1sncGFzc3dvcmQtdmVyaWZ5J10uaW5wdXRdXHJcbiAgLmZvckVhY2goJHBhc3MgPT4ge1xyXG4gICAgJHBhc3MuYWRkRXZlbnRMaXN0ZW5lcignY2hhbmdlJywgaGFuZGxlUGFzc3dvcmRDaGFuZ2UpO1xyXG4gIH0pO1xyXG5cclxuZnVuY3Rpb24gaGFuZGxlUGFzc3dvcmRDaGFuZ2UoKSB7XHJcbiAgY29uc3QgcmVzID0gdmFsaWRhdG9yLnZlcmlmeShcclxuICAgICRyb3dzWydwYXNzd29yZCddLmlucHV0LnZhbHVlLFxyXG4gICAgJHJvd3NbJ3Bhc3N3b3JkLXZlcmlmeSddLmlucHV0LnZhbHVlXHJcbiAgKTtcclxuXHJcbiAgJHJvd3NbJ3Bhc3N3b3JkLXZlcmlmeSddLmVycm9yLnRleHRDb250ZW50ID0gcmVzLnZhbGlkID8gXCJcIiA6IHJlcy5tZXNzYWdlO1xyXG59XHJcblxyXG4vKipcclxuICogU2F2aW5nIGRhdGEgb24gc2VydmVyXHJcbiAqL1xyXG5jb25zdCAkZm9ybSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjdXNlci1mb3JtXCIpO1xyXG5jb25zdCAkc2F2ZUJ1dHRvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNzYXZlLWJ0bicpO1xyXG4kc2F2ZUJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIChlKSA9PiB7XHJcbiAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG5cclxuICBjb25zdCBkYXRhID0gT2JqZWN0LmtleXMoJHJvd3MpLnJlZHVjZSgoYWNjLCByb3cpID0+IHtcclxuICAgIGFjY1tyb3ddID0gJHJvd3Nbcm93XS5pbnB1dC52YWx1ZTtcclxuICAgIHJldHVybiBhY2M7XHJcbiAgfSwge30pO1xyXG5cclxuICBjb25zdCB1cmwgPSAkZm9ybS5hY3Rpb247XHJcbiAgY29uc3Qgb3B0aW9ucyA9IHtcclxuICAgIG1ldGhvZDogJGZvcm0ubWV0aG9kLFxyXG4gICAgZGF0YTogSlNPTi5zdHJpbmdpZnkoZGF0YSksXHJcbiAgICBoZWFkZXJzOiB7XHJcbiAgICAgICdDb250ZW50LXR5cGUnOiAnYXBwbGljYXRpb24vanNvbidcclxuICAgIH1cclxuICB9O1xyXG5cclxuICBhamF4KHVybCwgb3B0aW9ucywgdHJ1ZSlcclxuICAudGhlbihkYXRhID0+IGNvbnNvbGUubG9nKGRhdGEpKVxyXG4gIC5jYXRjaChlcnIgPT4gY29uc29sZS5lcnIoZXJyKSk7XHJcbn0pO1xyXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi91c2VyRm9ybS9pbmRleC5qcyIsImNvbnN0IHZhbGlkYXRvciA9IHt9O1xyXG5cclxudmFsaWRhdG9yLnZlcmlmeSA9IChmaXJzdCwgc2Vjb25kKSA9PiB7XHJcbiAgcmV0dXJuIChcclxuICAgIGZpcnN0ID09PSBzZWNvbmQgP1xyXG4gICAgICByZXNwb25zZSh0cnVlKSA6XHJcbiAgICAgIHJlc3BvbnNlKGZhbHNlLCBcItCf0LDRgNC+0LvQuCDQvdC1INGB0L7QstC/0LDQtNCw0Y7RglwiKVxyXG4gIClcclxufVxyXG5cclxuZnVuY3Rpb24gcmVzcG9uc2UodmFsaWQsIG1lc3NhZ2UpIHtcclxuICByZXR1cm4ge1xyXG4gICAgdmFsaWQsXHJcbiAgICBtZXNzYWdlXHJcbiAgfVxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCB2YWxpZGF0b3I7XHJcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3VzZXJGb3JtL3VzZXJWYWxpZGF0b3IuanMiXSwic291cmNlUm9vdCI6IiJ9