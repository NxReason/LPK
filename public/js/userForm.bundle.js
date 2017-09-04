/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
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
/******/ 	return __webpack_require__(__webpack_require__.s = 21);
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

/***/ 19:
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ 21:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


__webpack_require__(19);

var _userValidator = __webpack_require__(7);

var _userValidator2 = _interopRequireDefault(_userValidator);

var _ajax = __webpack_require__(0);

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

/***/ 7:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _ajax = __webpack_require__(0);

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgYmQ3MzcwZGRhN2Q3MWQwNjU3OGM/NDNlZCoqIiwid2VicGFjazovLy8uL3V0aWxzL2FqYXguanM/ZWI5MCoiLCJ3ZWJwYWNrOi8vLy4uL3Nhc3MvdXNlckZvcm0uc2NzcyIsIndlYnBhY2s6Ly8vLi9hZG1pbi91c2VyRm9ybS5qcyIsIndlYnBhY2s6Ly8vLi9hZG1pbi91c2VyVmFsaWRhdG9yLmpzIl0sIm5hbWVzIjpbImFqYXgiLCJwYXRoIiwib3B0aW9ucyIsImZ1bGxSZXNwb25zZSIsInhociIsIlhNTEh0dHBSZXF1ZXN0Iiwib3BlbiIsIm1ldGhvZCIsImhlYWRlcnMiLCJzZXRYSFJIZWFkZXJzIiwic2VuZCIsImRhdGEiLCJQcm9taXNlIiwicmVzb2x2ZSIsInJlamVjdCIsIm9ucmVhZHlzdGF0ZWNoYW5nZSIsInJlYWR5U3RhdGUiLCJzdGF0dXMiLCJyZXNwb25zZVRleHQiLCJzdGF0dXNUZXh0IiwiaGVhZGVyIiwic2V0UmVxdWVzdEhlYWRlciIsIklOUFVUX05BTUVTIiwiJHJvd3MiLCJtYXAiLCJkb2N1bWVudCIsInF1ZXJ5U2VsZWN0b3IiLCJuYW1lIiwiaW5wdXQiLCIkZmllbGQiLCJlcnJvciIsInBhcmVudE5vZGUiLCJyZWR1Y2UiLCJyZXMiLCIkcm93IiwiZ2V0QXR0cmlidXRlIiwiZm9yRWFjaCIsIiRwYXNzIiwiYWRkRXZlbnRMaXN0ZW5lciIsImhhbmRsZVBhc3N3b3JkQ2hhbmdlIiwidmVyaWZ5IiwidmFsdWUiLCJzaG93RXJyb3IiLCJ1bmlxdWUiLCJ0aGVuIiwiY2F0Y2giLCJjb25zb2xlIiwiZXJyIiwiZmllbGROYW1lIiwicmVzcG9uc2UiLCJ0ZXh0Q29udGVudCIsInZhbGlkIiwibWVzc2FnZSIsIiRmb3JtIiwiJHNhdmVCdXR0b24iLCIkcmVzcG9uc2UiLCJlIiwicHJldmVudERlZmF1bHQiLCJPYmplY3QiLCJrZXlzIiwiYWNjIiwicm93IiwidXJsIiwiYWN0aW9uIiwiSlNPTiIsInN0cmluZ2lmeSIsInBhcnNlIiwiY3JlYXRlZCIsInNob3dTdWNjZXNzUmVzIiwiY2xlYXJGb3JtIiwidXBkYXRlZCIsInNob3dGYWlsdXJlUmVzIiwibXNnIiwic3dhcENsYXNzZXMiLCIkZWwiLCJvbiIsIm9mZiIsImNsYXNzTGlzdCIsImFkZCIsInJlbW92ZSIsImtleSIsInZhbGlkYXRvciIsImZpcnN0Iiwic2Vjb25kIiwiZXhpc3RzIl0sIm1hcHBpbmdzIjoiO0FBQUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBLG1EQUEyQyxjQUFjOztBQUV6RDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQUs7QUFDTDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLG1DQUEyQiwwQkFBMEIsRUFBRTtBQUN2RCx5Q0FBaUMsZUFBZTtBQUNoRDtBQUNBO0FBQ0E7O0FBRUE7QUFDQSw4REFBc0QsK0RBQStEOztBQUVySDtBQUNBOztBQUVBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7O0FDaEVBLFNBQVNBLElBQVQsR0FBNkQ7QUFBQSxNQUEvQ0MsSUFBK0MsdUVBQXhDLEVBQXdDO0FBQUEsTUFBcENDLE9BQW9DLHVFQUExQixFQUEwQjtBQUFBLE1BQXRCQyxZQUFzQix1RUFBUCxLQUFPOztBQUMzRCxNQUFNQyxNQUFNLElBQUlDLGNBQUosRUFBWjtBQUNBRCxNQUFJRSxJQUFKLENBQVNKLFFBQVFLLE1BQVIsSUFBa0IsS0FBM0IsRUFBa0NOLElBQWxDLEVBQXdDLElBQXhDO0FBQ0EsTUFBSUMsUUFBUU0sT0FBWixFQUFxQjtBQUFFQyxrQkFBY0wsR0FBZCxFQUFtQkYsUUFBUU0sT0FBM0I7QUFBc0M7QUFDN0RKLE1BQUlNLElBQUosQ0FBU1IsUUFBUVMsSUFBakI7O0FBRUEsU0FBTyxJ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QyxTQUFTLEtBQVQsRUFBZ0IsOENBQWhCLENBREEsR0FFQUEsU0FBUyxJQUFULENBSEY7QUFLRCxHQVJNLENBQVA7QUFTRCxDQVZEOztBQVlBLFNBQVNBLFFBQVQsQ0FBa0JFLEtBQWxCLEVBQXlCQyxPQUF6QixFQUFrQztBQUNoQyxTQUFPO0FBQ0xELGdCQURLO0FBRUxDO0FBRkssR0FBUDtBQUlEOztrQkFFYzZCLFMiLCJmaWxlIjoidXNlckZvcm0uYnVuZGxlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gaWRlbnRpdHkgZnVuY3Rpb24gZm9yIGNhbGxpbmcgaGFybW9ueSBpbXBvcnRzIHdpdGggdGhlIGNvcnJlY3QgY29udGV4dFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5pID0gZnVuY3Rpb24odmFsdWUpIHsgcmV0dXJuIHZhbHVlOyB9O1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHtcbiBcdFx0XHRcdGNvbmZpZ3VyYWJsZTogZmFsc2UsXG4gXHRcdFx0XHRlbnVtZXJhYmxlOiB0cnVlLFxuIFx0XHRcdFx0Z2V0OiBnZXR0ZXJcbiBcdFx0XHR9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSAyMSk7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gd2VicGFjay9ib290c3RyYXAgYmQ3MzcwZGRhN2Q3MWQwNjU3OGMiLCJmdW5jdGlvbiBhamF4KHBhdGggPSAnJywgb3B0aW9ucyA9IHt9LCBmdWxsUmVzcG9uc2UgPSBmYWxzZSkge1xyXG4gIGNvbnN0IHhociA9IG5ldyBYTUxIdHRwUmVxdWVzdCgpO1xyXG4gIHhoci5vcGVuKG9wdGlvbnMubWV0aG9kIHx8ICdHRVQnLCBwYXRoLCB0cnVlKTtcclxuICBpZiAob3B0aW9ucy5oZWFkZXJzKSB7IHNldFhIUkhlYWRlcnMoeGhyLCBvcHRpb25zLmhlYWRlcnMpOyB9XHJcbiAgeGhyLnNlbmQob3B0aW9ucy5kYXRhKTtcclxuXHJcbiAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcclxuICAgIHhoci5vbnJlYWR5c3RhdGVjaGFuZ2UgPSBmdW5jdGlvbigpIHtcclxuICAgICAgaWYoeGhyLnJlYWR5U3RhdGUgPT0gNCkge1xyXG4gICAgICAgIGlmKHhoci5zdGF0dXMgPT0gMjAwKSB7XHJcbiAgICAgICAgICBpZiAoZnVsbFJlc3BvbnNlKSB7XHJcbiAgICAgICAgICAgIHJlc29sdmUoeGhyKTtcclxuICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHJlc29sdmUoeGhyLnJlc3BvbnNlVGV4dCk7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIHJlamVjdCh4aHIuc3RhdHVzVGV4dCk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfSlcclxufVxyXG5cclxuZnVuY3Rpb24gc2V0WEhSSGVhZGVycyh4aHIsIGhlYWRlcnMpIHtcclxuICBmb3IgKGxldCBoZWFkZXIgaW4gaGVhZGVycykge1xyXG4gICAgeGhyLnNldFJlcXVlc3RIZWFkZXIoaGVhZGVyLCBoZWFkZXJzW2hlYWRlcl0pO1xyXG4gIH1cclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgYWpheDtcclxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vdXRpbHMvYWpheC5qcyIsIi8vIHJlbW92ZWQgYnkgZXh0cmFjdC10ZXh0LXdlYnBhY2stcGx1Z2luXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi4vc2Fzcy91c2VyRm9ybS5zY3NzXG4vLyBtb2R1bGUgaWQgPSAxOVxuLy8gbW9kdWxlIGNodW5rcyA9IDMiLCJpbXBvcnQgJy4uLy4uL3Nhc3MvdXNlckZvcm0uc2Nzcyc7XHJcblxyXG5pbXBvcnQgdmFsaWRhdG9yIGZyb20gJy4vdXNlclZhbGlkYXRvcic7XHJcbmltcG9ydCBhamF4IGZyb20gJy4uL3V0aWxzL2FqYXgnO1xyXG4vKipcclxuICogRm9ybSB2YWxpZGF0aW9uXHJcbiAqL1xyXG5jb25zdCBJTlBVVF9OQU1FUyA9IFsnaWQnLCAndXNlcm5hbWUnLCAncGFzc3dvcmQnLCAncGFzc3dvcmQtdmVyaWZ5JyxcclxuICAnZmlyc3RuYW1lJywgJ2xhc3RuYW1lJywgJ2VtYWlsJywgJ2xldmVsJ107XHJcblxyXG5jb25zdCAkcm93cyA9IElOUFVUX05BTUVTLm1hcChuYW1lID0+IHtcclxuICByZXR1cm4gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihgW25hbWU9JHtuYW1lfV1gKTtcclxufSkubWFwKCRmaWVsZCA9PiB7XHJcbiAgcmV0dXJuIHtcclxuICAgIGlucHV0OiAkZmllbGQsXHJcbiAgICBlcnJvcjogJGZpZWxkLnBhcmVudE5vZGUucXVlcnlTZWxlY3RvcignLmVycm9yLWZpZWxkJylcclxuICB9XHJcbn0pLnJlZHVjZSgocmVzLCAkcm93KSA9PiB7XHJcbiAgcmVzWyRyb3cuaW5wdXQuZ2V0QXR0cmlidXRlKCduYW1lJyldID0gJHJvdztcclxuICByZXR1cm4gcmVzO1xyXG59LCB7fSk7XHJcblxyXG5bJHJvd3NbJ3Bhc3N3b3JkJ10uaW5wdXQsICRyb3dzWydwYXNzd29yZC12ZXJpZnknXS5pbnB1dF1cclxuICAuZm9yRWFjaCgkcGFzcyA9PiB7XHJcbiAgICAkcGFzcy5hZGRFdmVudExpc3RlbmVyKCdjaGFuZ2UnLCBoYW5kbGVQYXNzd29yZENoYW5nZSk7XHJcbiAgfSk7XHJcblxyXG5mdW5jdGlvbiBoYW5kbGVQYXNzd29yZENoYW5nZSgpIHtcclxuICBjb25zdCByZXMgPSB2YWxpZGF0b3IudmVyaWZ5KFxyXG4gICAgJHJvd3NbJ3Bhc3N3b3JkJ10uaW5wdXQudmFsdWUsXHJcbiAgICAkcm93c1sncGFzc3dvcmQtdmVyaWZ5J10uaW5wdXQudmFsdWVcclxuICApO1xyXG5cclxuICBzaG93RXJyb3IoJ3Bhc3N3b3JkLXZlcmlmeScsIHJlcyk7XHJcbn1cclxuXHJcbiRyb3dzWyd1c2VybmFtZSddLmlucHV0LmFkZEV2ZW50TGlzdGVuZXIoJ2NoYW5nZScsICgpID0+IHtcclxuICB2YWxpZGF0b3IudW5pcXVlKCd1c2VybmFtZScsICRyb3dzWyd1c2VybmFtZSddLmlucHV0LnZhbHVlKVxyXG4gIC50aGVuKHJlcyA9PiB7XHJcbiAgICBzaG93RXJyb3IoJ3VzZXJuYW1lJywgcmVzKTtcclxuICB9KVxyXG4gIC5jYXRjaChlcnIgPT4gY29uc29sZS5lcnJvcihlcnIpKTtcclxufSk7XHJcblxyXG5mdW5jdGlvbiBzaG93RXJyb3IoZmllbGROYW1lLCByZXNwb25zZSkge1xyXG4gICRyb3dzW2ZpZWxkTmFtZV0uZXJyb3IudGV4dENvbnRlbnQgPSByZXNwb25zZS52YWxpZCA/IFwiXCIgOiByZXNwb25zZS5tZXNzYWdlO1xyXG59XHJcblxyXG4vKipcclxuICogU2F2aW5nIGRhdGEgb24gc2VydmVyXHJcbiAqL1xyXG5jb25zdCAkZm9ybSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjdXNlci1mb3JtXCIpO1xyXG5jb25zdCAkc2F2ZUJ1dHRvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNzYXZlLWJ0bicpO1xyXG5jb25zdCAkcmVzcG9uc2UgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjc2VydmVyLXJlc3BvbnNlJyk7XHJcblxyXG4kc2F2ZUJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIChlKSA9PiB7XHJcbiAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG5cclxuICBjb25zdCBkYXRhID0gT2JqZWN0LmtleXMoJHJvd3MpLnJlZHVjZSgoYWNjLCByb3cpID0+IHtcclxuICAgIGFjY1tyb3ddID0gJHJvd3Nbcm93XS5pbnB1dC52YWx1ZTtcclxuICAgIHJldHVybiBhY2M7XHJcbiAgfSwge30pO1xyXG5cclxuICBjb25zdCB1cmwgPSAkZm9ybS5hY3Rpb247XHJcbiAgY29uc3Qgb3B0aW9ucyA9IHtcclxuICAgIG1ldGhvZDogJGZvcm0ubWV0aG9kLFxyXG4gICAgZGF0YTogSlNPTi5zdHJpbmdpZnkoZGF0YSksXHJcbiAgICBoZWFkZXJzOiB7XHJcbiAgICAgICdDb250ZW50LXR5cGUnOiAnYXBwbGljYXRpb24vanNvbidcclxuICAgIH1cclxuICB9O1xyXG5cclxuICBhamF4KHVybCwgb3B0aW9ucylcclxuICAudGhlbihyZXMgPT4ge1xyXG4gICAgcmVzID0gSlNPTi5wYXJzZShyZXMpO1xyXG4gICAgaWYgKHJlcy5jcmVhdGVkKSB7XHJcbiAgICAgIHNob3dTdWNjZXNzUmVzKCfQn9C+0LvRjNC30L7QstCw0YLQtdC70Ywg0YPRgdC/0LXRiNC90L4g0YHQvtC30LTQsNC9Jyk7XHJcbiAgICAgIGNsZWFyRm9ybSgpO1xyXG4gICAgfSBlbHNlIGlmIChyZXMudXBkYXRlZCkge1xyXG4gICAgICBzaG93U3VjY2Vzc1Jlcygn0JTQsNC90L3Ri9C1INC+0LHQvdC+0LLQu9C10L3RiycpXHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBzaG93RmFpbHVyZVJlcyhg0J3QtSDRg9C00LDQu9C+0YHRjCDQstGL0L/QvtC70L3QuNGC0Ywg0L7Qv9C10YDQsNGG0LjRjjogJHtyZXMubWVzc2FnZX1gKTtcclxuICAgIH1cclxuICB9KVxyXG4gIC5jYXRjaChlcnIgPT4gY29uc29sZS5lcnJvcihlcnIpKTtcclxufSk7XHJcblxyXG5mdW5jdGlvbiBzaG93U3VjY2Vzc1Jlcyhtc2cpIHtcclxuICBzd2FwQ2xhc3NlcygkcmVzcG9uc2UsICdzdWNjZXNzJywgJ2Vycm9yJyk7XHJcbiAgJHJlc3BvbnNlLnRleHRDb250ZW50ID0gbXNnO1xyXG59XHJcblxyXG5mdW5jdGlvbiBzaG93RmFpbHVyZVJlcyhtc2cpIHtcclxuICBzd2FwQ2xhc3NlcygkcmVzcG9uc2UsICdlcnJvcicsICdzdWNjZXNzJyk7XHJcbiAgJHJlc3BvbnNlLnRleHRDb250ZW50ID0gbXNnO1xyXG59XHJcblxyXG5mdW5jdGlvbiBzd2FwQ2xhc3NlcygkZWwsIG9uLCBvZmYpIHtcclxuICAkZWwuY2xhc3NMaXN0LmFkZChvbik7XHJcbiAgJGVsLmNsYXNzTGlzdC5yZW1vdmUob2ZmKTtcclxufVxyXG5cclxuZnVuY3Rpb24gY2xlYXJGb3JtKCkge1xyXG4gIGNvbnN0IGtleXMgPSBPYmplY3Qua2V5cygkcm93cyk7XHJcbiAga2V5cy5mb3JFYWNoKGtleSA9PiB7XHJcbiAgICAkcm93c1trZXldLmlucHV0LnZhbHVlID0gXCJcIjtcclxuICB9KVxyXG59XHJcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2FkbWluL3VzZXJGb3JtLmpzIiwiaW1wb3J0IGFqYXggZnJvbSAnLi4vdXRpbHMvYWpheCc7XHJcblxyXG5jb25zdCB2YWxpZGF0b3IgPSB7fTtcclxuXHJcbnZhbGlkYXRvci52ZXJpZnkgPSAoZmlyc3QsIHNlY29uZCkgPT4ge1xyXG4gIHJldHVybiAoXHJcbiAgICBmaXJzdCA9PT0gc2Vjb25kID9cclxuICAgICAgcmVzcG9uc2UodHJ1ZSkgOlxyXG4gICAgICByZXNwb25zZShmYWxzZSwgXCLQn9Cw0YDQvtC70Lgg0L3QtSDRgdC+0LLQv9Cw0LTQsNGO0YJcIilcclxuICApXHJcbn1cclxuXHJcbnZhbGlkYXRvci51bmlxdWUgPSAoZmllbGROYW1lLCB2YWx1ZSkgPT4ge1xyXG4gIHJldHVybiBhamF4KGAvYWRtaW4vdXNlcnMvZXhpc3RzPyR7ZmllbGROYW1lfT0ke3ZhbHVlfWApXHJcbiAgLnRoZW4ocmVzID0+IHtcclxuICAgIHJlcyA9IEpTT04ucGFyc2UocmVzKTtcclxuICAgIHJldHVybiAoXHJcbiAgICAgIHJlcy5leGlzdHMgP1xyXG4gICAgICByZXNwb25zZShmYWxzZSwgXCLQn9C+0LvRjNC30L7QstCw0YLQtdC70Ywg0YEg0LTQsNC90L3Ri9C8INC70L7Qs9C40L3QvtC8INGD0LbQtSDRgdGD0YnQtdGB0YLQstGD0LXRglwiKSA6XHJcbiAgICAgIHJlc3BvbnNlKHRydWUpXHJcbiAgICApO1xyXG4gIH0pO1xyXG59XHJcblxyXG5mdW5jdGlvbiByZXNwb25zZSh2YWxpZCwgbWVzc2FnZSkge1xyXG4gIHJldHVybiB7XHJcbiAgICB2YWxpZCxcclxuICAgIG1lc3NhZ2VcclxuICB9XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IHZhbGlkYXRvcjtcclxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vYWRtaW4vdXNlclZhbGlkYXRvci5qcyJdLCJzb3VyY2VSb290IjoiIn0=