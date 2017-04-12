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
var INPUT_NAMES = ['id', 'username', 'password', 'password-verify', 'firstname', 'lastname', 'email', 'level'];

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

  showError('password-verify', res);
}

$rows['username'].input.addEventListener('change', function () {
  _userValidator2.default.unique('username', $rows['username'].input.value).then(function (res) {
    showError('username', res);
  }).catch(function (err) {
    return console.error(err);
  });
});

function showError(fieldName, response) {
  $rows[fieldName].error.textContent = response.valid ? "" : response.message;
}

/**
 * Saving data on server
 */
var $form = document.querySelector("#user-form");
var $saveButton = document.querySelector('#save-btn');
var $response = document.querySelector('#server-response');

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

  (0, _ajax2.default)(url, options).then(function (res) {
    res = JSON.parse(res);
    if (res.created) {
      showSuccessRes('Пользователь успешно создан');
      clearForm();
    } else if (res.updated) {
      showSuccessRes('Данные обновлены');
    } else {
      showFailureRes('\u041D\u0435 \u0443\u0434\u0430\u043B\u043E\u0441\u044C \u0432\u044B\u043F\u043E\u043B\u043D\u0438\u0442\u044C \u043E\u043F\u0435\u0440\u0430\u0446\u0438\u044E: ' + res.message);
    }
  }).catch(function (err) {
    return console.error(err);
  });
});

function showSuccessRes(msg) {
  swapClasses($response, 'success', 'error');
  $response.textContent = msg;
}

function showFailureRes(msg) {
  swapClasses($response, 'error', 'success');
  $response.textContent = msg;
}

function swapClasses($el, on, off) {
  $el.classList.add(on);
  $el.classList.remove(off);
}

function clearForm() {
  var keys = Object.keys($rows);
  keys.forEach(function (key) {
    $rows[key].input.value = "";
  });
}

/***/ }),

/***/ 6:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _ajax = __webpack_require__(1);

var _ajax2 = _interopRequireDefault(_ajax);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var validator = {};

validator.verify = function (first, second) {
  return first === second ? response(true) : response(false, "Пароли не совпадают");
};

validator.unique = function (fieldName, value) {
  return (0, _ajax2.default)("/admin/users/exists?" + fieldName + "=" + value).then(function (res) {
    res = JSON.parse(res);
    return res.exists ? response(false, "Пользователь с данным логином уже существует") : response(true);
  });
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgZTIyMDQwNWJiYWIxNjZhZWU2ZDkiLCJ3ZWJwYWNrOi8vLy4vdXRpbHMvYWpheC5qcyIsIndlYnBhY2s6Ly8vLi4vc2Fzcy91c2VyRm9ybS5zY3NzIiwid2VicGFjazovLy8uL3VzZXJGb3JtL2luZGV4LmpzIiwid2VicGFjazovLy8uL3VzZXJGb3JtL3VzZXJWYWxpZGF0b3IuanMiXSwibmFtZXMiOlsiYWpheCIsInBhdGgiLCJvcHRpb25zIiwiZnVsbFJlc3BvbnNlIiwieGhyIiwiWE1MSHR0cFJlcXVlc3QiLCJvcGVuIiwibWV0aG9kIiwiaGVhZGVycyIsInNldFhIUkhlYWRlcnMiLCJzZW5kIiwiZGF0YSIsIlByb21pc2UiLCJyZXNvbHZlIiwicmVqZWN0Iiwib25yZWFkeXN0YXRlY2hhbmdlIiwicmVhZHlTdGF0ZSIsInN0YXR1cyIsInJlc3BvbnNlVGV4dCIsInN0YXR1c1RleHQiLCJoZWFkZXIiLCJzZXRSZXF1ZXN0SGVhZGVyIiwiSU5QVVRfTkFNRVMiLCIkcm93cyIsIm1hcCIsImRvY3VtZW50IiwicXVlcnlTZWxlY3RvciIsIm5hbWUiLCJpbnB1dCIsIiRmaWVsZCIsImVycm9yIiwicGFyZW50Tm9kZSIsInJlZHVjZSIsInJlcyIsIiRyb3ciLCJnZXRBdHRyaWJ1dGUiLCJmb3JFYWNoIiwiJHBhc3MiLCJhZGRFdmVudExpc3RlbmVyIiwiaGFuZGxlUGFzc3dvcmRDaGFuZ2UiLCJ2ZXJpZnkiLCJ2YWx1ZSIsInNob3dFcnJvciIsInVuaXF1ZSIsInRoZW4iLCJjYXRjaCIsImNvbnNvbGUiLCJlcnIiLCJmaWVsZE5hbWUiLCJyZXNwb25zZSIsInRleHRDb250ZW50IiwidmFsaWQiLCJtZXNzYWdlIiwiJGZvcm0iLCIkc2F2ZUJ1dHRvbiIsIiRyZXNwb25zZSIsImUiLCJwcmV2ZW50RGVmYXVsdCIsIk9iamVjdCIsImtleXMiLCJhY2MiLCJyb3ciLCJ1cmwiLCJhY3Rpb24iLCJKU09OIiwic3RyaW5naWZ5IiwicGFyc2UiLCJjcmVhdGVkIiwic2hvd1N1Y2Nlc3NSZXMiLCJjbGVhckZvcm0iLCJ1cGRhdGVkIiwic2hvd0ZhaWx1cmVSZXMiLCJtc2ciLCJzd2FwQ2xhc3NlcyIsIiRlbCIsIm9uIiwib2ZmIiwiY2xhc3NMaXN0IiwiYWRkIiwicmVtb3ZlIiwia2V5IiwidmFsaWRhdG9yIiwiZmlyc3QiLCJzZWNvbmQiLCJleGlzdHMiXSwibWFwcGluZ3MiOiI7QUFBQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQSxtREFBMkMsY0FBYzs7QUFFekQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFLO0FBQ0w7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxtQ0FBMkIsMEJBQTBCLEVBQUU7QUFDdkQseUNBQWlDLGVBQWU7QUFDaEQ7QUFDQTtBQUNBOztBQUVBO0FBQ0EsOERBQXNELCtEQUErRDs7QUFFckg7QUFDQTs7QUFFQTtBQUNBOzs7Ozs7Ozs7Ozs7OztBQ2hFQSxTQUFTQSxJQUFULEdBQTZEO0FBQUEsTUFBL0NDLElBQStDLHVFQUF4QyxFQUF3QztBQUFBLE1BQXBDQyxPQUFvQyx1RUFBMUIsRUFBMEI7QUFBQSxNQUF0QkMsWUFBc0IsdUVBQVAsS0FBTzs7QUFDM0QsTUFBTUMsTUFBTSxJQUFJQyxjQUFKLEVBQVo7QUFDQUQsTUFBSUUsSUFBSixDQUFTSixRQUFRSyxNQUFSLElBQWtCLEtBQTNCLEVBQWtDTixJQUFsQyxFQUF3QyxJQUF4QztBQUNBLE1BQUlDLFFBQVFNLE9BQVosRUFBcUI7QUFBRUMsa0JBQWNMLEdBQWQsRUFBbUJGLFFBQVFNLE9BQTNCO0FBQXNDO0FBQzdESixNQUFJTSxJQUFKLENBQVNSLFFBQVFTLElBQWpCOztBQUVBLFNBQU8sSUFBSUMsT0FBSixDQUFZ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QWdCLDhDQUFoQixDQURBLEdBRUFBLFNBQVMsSUFBVCxDQUhGO0FBS0QsR0FSTSxDQUFQO0FBU0QsQ0FWRDs7QUFZQSxTQUFTQSxRQUFULENBQWtCRSxLQUFsQixFQUF5QkMsT0FBekIsRUFBa0M7QUFDaEMsU0FBTztBQUNMRCxnQkFESztBQUVMQztBQUZLLEdBQVA7QUFJRDs7a0JBRWM2QixTIiwiZmlsZSI6InVzZXJGb3JtLmJ1bmRsZS5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKVxuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuXG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBpZGVudGl0eSBmdW5jdGlvbiBmb3IgY2FsbGluZyBoYXJtb255IGltcG9ydHMgd2l0aCB0aGUgY29ycmVjdCBjb250ZXh0XG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmkgPSBmdW5jdGlvbih2YWx1ZSkgeyByZXR1cm4gdmFsdWU7IH07XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwge1xuIFx0XHRcdFx0Y29uZmlndXJhYmxlOiBmYWxzZSxcbiBcdFx0XHRcdGVudW1lcmFibGU6IHRydWUsXG4gXHRcdFx0XHRnZXQ6IGdldHRlclxuIFx0XHRcdH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IDI2KTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyB3ZWJwYWNrL2Jvb3RzdHJhcCBlMjIwNDA1YmJhYjE2NmFlZTZkOSIsImZ1bmN0aW9uIGFqYXgocGF0aCA9ICcnLCBvcHRpb25zID0ge30sIGZ1bGxSZXNwb25zZSA9IGZhbHNlKSB7XHJcbiAgY29uc3QgeGhyID0gbmV3IFhNTEh0dHBSZXF1ZXN0KCk7XHJcbiAgeGhyLm9wZW4ob3B0aW9ucy5tZXRob2QgfHwgJ0dFVCcsIHBhdGgsIHRydWUpO1xyXG4gIGlmIChvcHRpb25zLmhlYWRlcnMpIHsgc2V0WEhSSGVhZGVycyh4aHIsIG9wdGlvbnMuaGVhZGVycyk7IH1cclxuICB4aHIuc2VuZChvcHRpb25zLmRhdGEpO1xyXG5cclxuICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xyXG4gICAgeGhyLm9ucmVhZHlzdGF0ZWNoYW5nZSA9IGZ1bmN0aW9uKCkge1xyXG4gICAgICBpZih4aHIucmVhZHlTdGF0ZSA9PSA0KSB7XHJcbiAgICAgICAgaWYoeGhyLnN0YXR1cyA9PSAyMDApIHtcclxuICAgICAgICAgIGlmIChmdWxsUmVzcG9uc2UpIHtcclxuICAgICAgICAgICAgcmVzb2x2ZSh4aHIpO1xyXG4gICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgcmVzb2x2ZSh4aHIucmVzcG9uc2VUZXh0KTtcclxuICAgICAgICAgIH1cclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgcmVqZWN0KHhoci5zdGF0dXNUZXh0KTtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9KVxyXG59XHJcblxyXG5mdW5jdGlvbiBzZXRYSFJIZWFkZXJzKHhociwgaGVhZGVycykge1xyXG4gIGZvciAobGV0IGhlYWRlciBpbiBoZWFkZXJzKSB7XHJcbiAgICB4aHIuc2V0UmVxdWVzdEhlYWRlcihoZWFkZXIsIGhlYWRlcnNbaGVhZGVyXSk7XHJcbiAgfVxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBhamF4O1xyXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi91dGlscy9hamF4LmpzIiwiLy8gcmVtb3ZlZCBieSBleHRyYWN0LXRleHQtd2VicGFjay1wbHVnaW5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuLi9zYXNzL3VzZXJGb3JtLnNjc3Ncbi8vIG1vZHVsZSBpZCA9IDExXG4vLyBtb2R1bGUgY2h1bmtzID0gMiIsImltcG9ydCAnLi4vLi4vc2Fzcy91c2VyRm9ybS5zY3NzJztcclxuXHJcbmltcG9ydCB2YWxpZGF0b3IgZnJvbSAnLi91c2VyVmFsaWRhdG9yJztcclxuaW1wb3J0IGFqYXggZnJvbSAnLi4vdXRpbHMvYWpheCc7XHJcbi8qKlxyXG4gKiBGb3JtIHZhbGlkYXRpb25cclxuICovXHJcbmNvbnN0IElOUFVUX05BTUVTID0gWydpZCcsICd1c2VybmFtZScsICdwYXNzd29yZCcsICdwYXNzd29yZC12ZXJpZnknLFxyXG4gICdmaXJzdG5hbWUnLCAnbGFzdG5hbWUnLCAnZW1haWwnLCAnbGV2ZWwnXTtcclxuXHJcbmNvbnN0ICRyb3dzID0gSU5QVVRfTkFNRVMubWFwKG5hbWUgPT4ge1xyXG4gIHJldHVybiBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGBbbmFtZT0ke25hbWV9XWApO1xyXG59KS5tYXAoJGZpZWxkID0+IHtcclxuICByZXR1cm4ge1xyXG4gICAgaW5wdXQ6ICRmaWVsZCxcclxuICAgIGVycm9yOiAkZmllbGQucGFyZW50Tm9kZS5xdWVyeVNlbGVjdG9yKCcuZXJyb3ItZmllbGQnKVxyXG4gIH1cclxufSkucmVkdWNlKChyZXMsICRyb3cpID0+IHtcclxuICByZXNbJHJvdy5pbnB1dC5nZXRBdHRyaWJ1dGUoJ25hbWUnKV0gPSAkcm93O1xyXG4gIHJldHVybiByZXM7XHJcbn0sIHt9KTtcclxuXHJcblskcm93c1sncGFzc3dvcmQnXS5pbnB1dCwgJHJvd3NbJ3Bhc3N3b3JkLXZlcmlmeSddLmlucHV0XVxyXG4gIC5mb3JFYWNoKCRwYXNzID0+IHtcclxuICAgICRwYXNzLmFkZEV2ZW50TGlzdGVuZXIoJ2NoYW5nZScsIGhhbmRsZVBhc3N3b3JkQ2hhbmdlKTtcclxuICB9KTtcclxuXHJcbmZ1bmN0aW9uIGhhbmRsZVBhc3N3b3JkQ2hhbmdlKCkge1xyXG4gIGNvbnN0IHJlcyA9IHZhbGlkYXRvci52ZXJpZnkoXHJcbiAgICAkcm93c1sncGFzc3dvcmQnXS5pbnB1dC52YWx1ZSxcclxuICAgICRyb3dzWydwYXNzd29yZC12ZXJpZnknXS5pbnB1dC52YWx1ZVxyXG4gICk7XHJcblxyXG4gIHNob3dFcnJvcigncGFzc3dvcmQtdmVyaWZ5JywgcmVzKTtcclxufVxyXG5cclxuJHJvd3NbJ3VzZXJuYW1lJ10uaW5wdXQuYWRkRXZlbnRMaXN0ZW5lcignY2hhbmdlJywgKCkgPT4ge1xyXG4gIHZhbGlkYXRvci51bmlxdWUoJ3VzZXJuYW1lJywgJHJvd3NbJ3VzZXJuYW1lJ10uaW5wdXQudmFsdWUpXHJcbiAgLnRoZW4ocmVzID0+IHtcclxuICAgIHNob3dFcnJvcigndXNlcm5hbWUnLCByZXMpO1xyXG4gIH0pXHJcbiAgLmNhdGNoKGVyciA9PiBjb25zb2xlLmVycm9yKGVycikpO1xyXG59KTtcclxuXHJcbmZ1bmN0aW9uIHNob3dFcnJvcihmaWVsZE5hbWUsIHJlc3BvbnNlKSB7XHJcbiAgJHJvd3NbZmllbGROYW1lXS5lcnJvci50ZXh0Q29udGVudCA9IHJlc3BvbnNlLnZhbGlkID8gXCJcIiA6IHJlc3BvbnNlLm1lc3NhZ2U7XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBTYXZpbmcgZGF0YSBvbiBzZXJ2ZXJcclxuICovXHJcbmNvbnN0ICRmb3JtID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiN1c2VyLWZvcm1cIik7XHJcbmNvbnN0ICRzYXZlQnV0dG9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3NhdmUtYnRuJyk7XHJcbmNvbnN0ICRyZXNwb25zZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNzZXJ2ZXItcmVzcG9uc2UnKTtcclxuXHJcbiRzYXZlQnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGUpID0+IHtcclxuICBlLnByZXZlbnREZWZhdWx0KCk7XHJcblxyXG4gIGNvbnN0IGRhdGEgPSBPYmplY3Qua2V5cygkcm93cykucmVkdWNlKChhY2MsIHJvdykgPT4ge1xyXG4gICAgYWNjW3Jvd10gPSAkcm93c1tyb3ddLmlucHV0LnZhbHVlO1xyXG4gICAgcmV0dXJuIGFjYztcclxuICB9LCB7fSk7XHJcblxyXG4gIGNvbnN0IHVybCA9ICRmb3JtLmFjdGlvbjtcclxuICBjb25zdCBvcHRpb25zID0ge1xyXG4gICAgbWV0aG9kOiAkZm9ybS5tZXRob2QsXHJcbiAgICBkYXRhOiBKU09OLnN0cmluZ2lmeShkYXRhKSxcclxuICAgIGhlYWRlcnM6IHtcclxuICAgICAgJ0NvbnRlbnQtdHlwZSc6ICdhcHBsaWNhdGlvbi9qc29uJ1xyXG4gICAgfVxyXG4gIH07XHJcblxyXG4gIGFqYXgodXJsLCBvcHRpb25zKVxyXG4gIC50aGVuKHJlcyA9PiB7XHJcbiAgICByZXMgPSBKU09OLnBhcnNlKHJlcyk7XHJcbiAgICBpZiAocmVzLmNyZWF0ZWQpIHtcclxuICAgICAgc2hvd1N1Y2Nlc3NSZXMoJ9Cf0L7Qu9GM0LfQvtCy0LDRgtC10LvRjCDRg9GB0L/QtdGI0L3QviDRgdC+0LfQtNCw0L0nKTtcclxuICAgICAgY2xlYXJGb3JtKCk7XHJcbiAgICB9IGVsc2UgaWYgKHJlcy51cGRhdGVkKSB7XHJcbiAgICAgIHNob3dTdWNjZXNzUmVzKCfQlNCw0L3QvdGL0LUg0L7QsdC90L7QstC70LXQvdGLJylcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHNob3dGYWlsdXJlUmVzKGDQndC1INGD0LTQsNC70L7RgdGMINCy0YvQv9C+0LvQvdC40YLRjCDQvtC/0LXRgNCw0YbQuNGOOiAke3Jlcy5tZXNzYWdlfWApO1xyXG4gICAgfVxyXG4gIH0pXHJcbiAgLmNhdGNoKGVyciA9PiBjb25zb2xlLmVycm9yKGVycikpO1xyXG59KTtcclxuXHJcbmZ1bmN0aW9uIHNob3dTdWNjZXNzUmVzKG1zZykge1xyXG4gIHN3YXBDbGFzc2VzKCRyZXNwb25zZSwgJ3N1Y2Nlc3MnLCAnZXJyb3InKTtcclxuICAkcmVzcG9uc2UudGV4dENvbnRlbnQgPSBtc2c7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIHNob3dGYWlsdXJlUmVzKG1zZykge1xyXG4gIHN3YXBDbGFzc2VzKCRyZXNwb25zZSwgJ2Vycm9yJywgJ3N1Y2Nlc3MnKTtcclxuICAkcmVzcG9uc2UudGV4dENvbnRlbnQgPSBtc2c7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIHN3YXBDbGFzc2VzKCRlbCwgb24sIG9mZikge1xyXG4gICRlbC5jbGFzc0xpc3QuYWRkKG9uKTtcclxuICAkZWwuY2xhc3NMaXN0LnJlbW92ZShvZmYpO1xyXG59XHJcblxyXG5mdW5jdGlvbiBjbGVhckZvcm0oKSB7XHJcbiAgY29uc3Qga2V5cyA9IE9iamVjdC5rZXlzKCRyb3dzKTtcclxuICBrZXlzLmZvckVhY2goa2V5ID0+IHtcclxuICAgICRyb3dzW2tleV0uaW5wdXQudmFsdWUgPSBcIlwiO1xyXG4gIH0pXHJcbn1cclxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vdXNlckZvcm0vaW5kZXguanMiLCJpbXBvcnQgYWpheCBmcm9tICcuLi91dGlscy9hamF4JztcclxuXHJcbmNvbnN0IHZhbGlkYXRvciA9IHt9O1xyXG5cclxudmFsaWRhdG9yLnZlcmlmeSA9IChmaXJzdCwgc2Vjb25kKSA9PiB7XHJcbiAgcmV0dXJuIChcclxuICAgIGZpcnN0ID09PSBzZWNvbmQgP1xyXG4gICAgICByZXNwb25zZSh0cnVlKSA6XHJcbiAgICAgIHJlc3BvbnNlKGZhbHNlLCBcItCf0LDRgNC+0LvQuCDQvdC1INGB0L7QstC/0LDQtNCw0Y7RglwiKVxyXG4gIClcclxufVxyXG5cclxudmFsaWRhdG9yLnVuaXF1ZSA9IChmaWVsZE5hbWUsIHZhbHVlKSA9PiB7XHJcbiAgcmV0dXJuIGFqYXgoYC9hZG1pbi91c2Vycy9leGlzdHM/JHtmaWVsZE5hbWV9PSR7dmFsdWV9YClcclxuICAudGhlbihyZXMgPT4ge1xyXG4gICAgcmVzID0gSlNPTi5wYXJzZShyZXMpO1xyXG4gICAgcmV0dXJuIChcclxuICAgICAgcmVzLmV4aXN0cyA/XHJcbiAgICAgIHJlc3BvbnNlKGZhbHNlLCBcItCf0L7Qu9GM0LfQvtCy0LDRgtC10LvRjCDRgSDQtNCw0L3QvdGL0Lwg0LvQvtCz0LjQvdC+0Lwg0YPQttC1INGB0YPRidC10YHRgtCy0YPQtdGCXCIpIDpcclxuICAgICAgcmVzcG9uc2UodHJ1ZSlcclxuICAgICk7XHJcbiAgfSk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIHJlc3BvbnNlKHZhbGlkLCBtZXNzYWdlKSB7XHJcbiAgcmV0dXJuIHtcclxuICAgIHZhbGlkLFxyXG4gICAgbWVzc2FnZVxyXG4gIH1cclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgdmFsaWRhdG9yO1xyXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi91c2VyRm9ybS91c2VyVmFsaWRhdG9yLmpzIl0sInNvdXJjZVJvb3QiOiIifQ==