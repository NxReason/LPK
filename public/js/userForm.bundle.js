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
/******/ 	return __webpack_require__(__webpack_require__.s = 22);
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

/***/ 11:
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ 22:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


__webpack_require__(11);

var _userValidator = __webpack_require__(3);

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

/***/ 3:
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgNGM0NTgzNzQ1OTc3NmI0ZTM5YTk/MjVlMSIsIndlYnBhY2s6Ly8vLi91dGlscy9hamF4LmpzP2ViOTAiLCJ3ZWJwYWNrOi8vLy4uL3Nhc3MvdXNlckZvcm0uc2NzcyIsIndlYnBhY2s6Ly8vLi9hZG1pbi91c2VyRm9ybS5qcyIsIndlYnBhY2s6Ly8vLi9hZG1pbi91c2VyVmFsaWRhdG9yLmpzIl0sIm5hbWVzIjpbImFqYXgiLCJwYXRoIiwib3B0aW9ucyIsImZ1bGxSZXNwb25zZSIsInhociIsIlhNTEh0dHBSZXF1ZXN0Iiwib3BlbiIsIm1ldGhvZCIsImhlYWRlcnMiLCJzZXRYSFJIZWFkZXJzIiwic2VuZCIsImRhdGEiLCJQcm9taXNlIiwicmVzb2x2ZSIsInJlamVjdCIsIm9ucmVhZHlzdGF0ZWNoYW5nZSIsInJlYWR5U3RhdGUiLCJzdGF0dXMiLCJyZXNwb25zZVRleHQiLCJzdGF0dXNUZXh0IiwiaGVhZGVyIiwic2V0UmVxdWVzdEhlYWRlciIsIklOUFVUX05BTUVTIiwiJHJvd3MiLCJtYXAiLCJkb2N1bWVudCIsInF1ZXJ5U2VsZWN0b3IiLCJuYW1lIiwiaW5wdXQiLCIkZmllbGQiLCJlcnJvciIsInBhcmVudE5vZGUiLCJyZWR1Y2UiLCJyZXMiLCIkcm93IiwiZ2V0QXR0cmlidXRlIiwiZm9yRWFjaCIsIiRwYXNzIiwiYWRkRXZlbnRMaXN0ZW5lciIsImhhbmRsZVBhc3N3b3JkQ2hhbmdlIiwidmVyaWZ5IiwidmFsdWUiLCJzaG93RXJyb3IiLCJ1bmlxdWUiLCJ0aGVuIiwiY2F0Y2giLCJjb25zb2xlIiwiZXJyIiwiZmllbGROYW1lIiwicmVzcG9uc2UiLCJ0ZXh0Q29udGVudCIsInZhbGlkIiwibWVzc2FnZSIsIiRmb3JtIiwiJHNhdmVCdXR0b24iLCIkcmVzcG9uc2UiLCJlIiwicHJldmVudERlZmF1bHQiLCJPYmplY3QiLCJrZXlzIiwiYWNjIiwicm93IiwidXJsIiwiYWN0aW9uIiwiSlNPTiIsInN0cmluZ2lmeSIsInBhcnNlIiwiY3JlYXRlZCIsInNob3dTdWNjZXNzUmVzIiwiY2xlYXJGb3JtIiwidXBkYXRlZCIsInNob3dGYWlsdXJlUmVzIiwibXNnIiwic3dhcENsYXNzZXMiLCIkZWwiLCJvbiIsIm9mZiIsImNsYXNzTGlzdCIsImFkZCIsInJlbW92ZSIsImtleSIsInZhbGlkYXRvciIsImZpcnN0Iiwic2Vjb25kIiwiZXhpc3RzIl0sIm1hcHBpbmdzIjoiO0FBQUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0EsbURBQTJDLGNBQWM7O0FBRXpEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBSztBQUNMO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsbUNBQTJCLDBCQUEwQixFQUFFO0FBQ3ZELHlDQUFpQyxlQUFlO0FBQ2hEO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLDhEQUFzRCwrREFBK0Q7O0FBRXJIO0FBQ0E7O0FBRUE7QUFDQTs7Ozs7Ozs7Ozs7Ozs7QUNoRUEsU0FBU0EsSUFBVCxHQUE2RDtBQUFBLE1BQS9DQyxJQUErQyx1RUFBeEMsRUFBd0M7QUFBQSxNQUFwQ0MsT0FBb0MsdUVBQTFCLEVBQTBCO0FBQUEsTUFBdEJDLFlBQXNCLHVFQUFQLEtBQU87O0FBQzNELE1BQU1DLE1BQU0sSUFBSUMsY0FBSixFQUFaO0FBQ0FELE1BQUlFLElBQUosQ0FBU0osUUFBUUssTUFBUixJQUFrQixLQUEzQixFQUFrQ04sSUFBbEMsRUFBd0MsSUFBeEM7QUFDQSxNQUFJQyxRQUFRTSxPQUFaLEVBQXFCO0FBQUVDLGtCQUFjTCxHQUFkLEVBQW1CRixRQUFRTSxPQUEzQjtBQUFzQztBQUM3REosTUFBSU0sSUFBSixDQUFTUixRQUFRUyxJQUFqQjs7QUFFQSxTQUFPLElBQUlDLE9B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S0FBVCxFQUFnQiw4Q0FBaEIsQ0FEQSxHQUVBQSxTQUFTLElBQVQsQ0FIRjtBQUtELEdBUk0sQ0FBUDtBQVNELENBVkQ7O0FBWUEsU0FBU0EsUUFBVCxDQUFrQkUsS0FBbEIsRUFBeUJDLE9BQXpCLEVBQWtDO0FBQ2hDLFNBQU87QUFDTEQsZ0JBREs7QUFFTEM7QUFGSyxHQUFQO0FBSUQ7O2tCQUVjNkIsUyIsImZpbGUiOiJ1c2VyRm9ybS5idW5kbGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSlcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcblxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gaWRlbnRpdHkgZnVuY3Rpb24gZm9yIGNhbGxpbmcgaGFybW9ueSBpbXBvcnRzIHdpdGggdGhlIGNvcnJlY3QgY29udGV4dFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5pID0gZnVuY3Rpb24odmFsdWUpIHsgcmV0dXJuIHZhbHVlOyB9O1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHtcbiBcdFx0XHRcdGNvbmZpZ3VyYWJsZTogZmFsc2UsXG4gXHRcdFx0XHRlbnVtZXJhYmxlOiB0cnVlLFxuIFx0XHRcdFx0Z2V0OiBnZXR0ZXJcbiBcdFx0XHR9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSAyMik7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gd2VicGFjay9ib290c3RyYXAgNGM0NTgzNzQ1OTc3NmI0ZTM5YTkiLCJmdW5jdGlvbiBhamF4KHBhdGggPSAnJywgb3B0aW9ucyA9IHt9LCBmdWxsUmVzcG9uc2UgPSBmYWxzZSkge1xyXG4gIGNvbnN0IHhociA9IG5ldyBYTUxIdHRwUmVxdWVzdCgpO1xyXG4gIHhoci5vcGVuKG9wdGlvbnMubWV0aG9kIHx8ICdHRVQnLCBwYXRoLCB0cnVlKTtcclxuICBpZiAob3B0aW9ucy5oZWFkZXJzKSB7IHNldFhIUkhlYWRlcnMoeGhyLCBvcHRpb25zLmhlYWRlcnMpOyB9XHJcbiAgeGhyLnNlbmQob3B0aW9ucy5kYXRhKTtcclxuXHJcbiAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcclxuICAgIHhoci5vbnJlYWR5c3RhdGVjaGFuZ2UgPSBmdW5jdGlvbigpIHtcclxuICAgICAgaWYoeGhyLnJlYWR5U3RhdGUgPT0gNCkge1xyXG4gICAgICAgIGlmKHhoci5zdGF0dXMgPT0gMjAwKSB7XHJcbiAgICAgICAgICBpZiAoZnVsbFJlc3BvbnNlKSB7XHJcbiAgICAgICAgICAgIHJlc29sdmUoeGhyKTtcclxuICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHJlc29sdmUoeGhyLnJlc3BvbnNlVGV4dCk7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIHJlamVjdCh4aHIuc3RhdHVzVGV4dCk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfSlcclxufVxyXG5cclxuZnVuY3Rpb24gc2V0WEhSSGVhZGVycyh4aHIsIGhlYWRlcnMpIHtcclxuICBmb3IgKGxldCBoZWFkZXIgaW4gaGVhZGVycykge1xyXG4gICAgeGhyLnNldFJlcXVlc3RIZWFkZXIoaGVhZGVyLCBoZWFkZXJzW2hlYWRlcl0pO1xyXG4gIH1cclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgYWpheDtcclxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vdXRpbHMvYWpheC5qcyIsIi8vIHJlbW92ZWQgYnkgZXh0cmFjdC10ZXh0LXdlYnBhY2stcGx1Z2luXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi4vc2Fzcy91c2VyRm9ybS5zY3NzXG4vLyBtb2R1bGUgaWQgPSAxMVxuLy8gbW9kdWxlIGNodW5rcyA9IDIiLCJpbXBvcnQgJy4uLy4uL3Nhc3MvdXNlckZvcm0uc2Nzcyc7XHJcblxyXG5pbXBvcnQgdmFsaWRhdG9yIGZyb20gJy4vdXNlclZhbGlkYXRvcic7XHJcbmltcG9ydCBhamF4IGZyb20gJy4uL3V0aWxzL2FqYXgnO1xyXG4vKipcclxuICogRm9ybSB2YWxpZGF0aW9uXHJcbiAqL1xyXG5jb25zdCBJTlBVVF9OQU1FUyA9IFsnaWQnLCAndXNlcm5hbWUnLCAncGFzc3dvcmQnLCAncGFzc3dvcmQtdmVyaWZ5JyxcclxuICAnZmlyc3RuYW1lJywgJ2xhc3RuYW1lJywgJ2VtYWlsJywgJ2xldmVsJ107XHJcblxyXG5jb25zdCAkcm93cyA9IElOUFVUX05BTUVTLm1hcChuYW1lID0+IHtcclxuICByZXR1cm4gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihgW25hbWU9JHtuYW1lfV1gKTtcclxufSkubWFwKCRmaWVsZCA9PiB7XHJcbiAgcmV0dXJuIHtcclxuICAgIGlucHV0OiAkZmllbGQsXHJcbiAgICBlcnJvcjogJGZpZWxkLnBhcmVudE5vZGUucXVlcnlTZWxlY3RvcignLmVycm9yLWZpZWxkJylcclxuICB9XHJcbn0pLnJlZHVjZSgocmVzLCAkcm93KSA9PiB7XHJcbiAgcmVzWyRyb3cuaW5wdXQuZ2V0QXR0cmlidXRlKCduYW1lJyldID0gJHJvdztcclxuICByZXR1cm4gcmVzO1xyXG59LCB7fSk7XHJcblxyXG5bJHJvd3NbJ3Bhc3N3b3JkJ10uaW5wdXQsICRyb3dzWydwYXNzd29yZC12ZXJpZnknXS5pbnB1dF1cclxuICAuZm9yRWFjaCgkcGFzcyA9PiB7XHJcbiAgICAkcGFzcy5hZGRFdmVudExpc3RlbmVyKCdjaGFuZ2UnLCBoYW5kbGVQYXNzd29yZENoYW5nZSk7XHJcbiAgfSk7XHJcblxyXG5mdW5jdGlvbiBoYW5kbGVQYXNzd29yZENoYW5nZSgpIHtcclxuICBjb25zdCByZXMgPSB2YWxpZGF0b3IudmVyaWZ5KFxyXG4gICAgJHJvd3NbJ3Bhc3N3b3JkJ10uaW5wdXQudmFsdWUsXHJcbiAgICAkcm93c1sncGFzc3dvcmQtdmVyaWZ5J10uaW5wdXQudmFsdWVcclxuICApO1xyXG5cclxuICBzaG93RXJyb3IoJ3Bhc3N3b3JkLXZlcmlmeScsIHJlcyk7XHJcbn1cclxuXHJcbiRyb3dzWyd1c2VybmFtZSddLmlucHV0LmFkZEV2ZW50TGlzdGVuZXIoJ2NoYW5nZScsICgpID0+IHtcclxuICB2YWxpZGF0b3IudW5pcXVlKCd1c2VybmFtZScsICRyb3dzWyd1c2VybmFtZSddLmlucHV0LnZhbHVlKVxyXG4gIC50aGVuKHJlcyA9PiB7XHJcbiAgICBzaG93RXJyb3IoJ3VzZXJuYW1lJywgcmVzKTtcclxuICB9KVxyXG4gIC5jYXRjaChlcnIgPT4gY29uc29sZS5lcnJvcihlcnIpKTtcclxufSk7XHJcblxyXG5mdW5jdGlvbiBzaG93RXJyb3IoZmllbGROYW1lLCByZXNwb25zZSkge1xyXG4gICRyb3dzW2ZpZWxkTmFtZV0uZXJyb3IudGV4dENvbnRlbnQgPSByZXNwb25zZS52YWxpZCA/IFwiXCIgOiByZXNwb25zZS5tZXNzYWdlO1xyXG59XHJcblxyXG4vKipcclxuICogU2F2aW5nIGRhdGEgb24gc2VydmVyXHJcbiAqL1xyXG5jb25zdCAkZm9ybSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjdXNlci1mb3JtXCIpO1xyXG5jb25zdCAkc2F2ZUJ1dHRvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNzYXZlLWJ0bicpO1xyXG5jb25zdCAkcmVzcG9uc2UgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjc2VydmVyLXJlc3BvbnNlJyk7XHJcblxyXG4kc2F2ZUJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIChlKSA9PiB7XHJcbiAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG5cclxuICBjb25zdCBkYXRhID0gT2JqZWN0LmtleXMoJHJvd3MpLnJlZHVjZSgoYWNjLCByb3cpID0+IHtcclxuICAgIGFjY1tyb3ddID0gJHJvd3Nbcm93XS5pbnB1dC52YWx1ZTtcclxuICAgIHJldHVybiBhY2M7XHJcbiAgfSwge30pO1xyXG5cclxuICBjb25zdCB1cmwgPSAkZm9ybS5hY3Rpb247XHJcbiAgY29uc3Qgb3B0aW9ucyA9IHtcclxuICAgIG1ldGhvZDogJGZvcm0ubWV0aG9kLFxyXG4gICAgZGF0YTogSlNPTi5zdHJpbmdpZnkoZGF0YSksXHJcbiAgICBoZWFkZXJzOiB7XHJcbiAgICAgICdDb250ZW50LXR5cGUnOiAnYXBwbGljYXRpb24vanNvbidcclxuICAgIH1cclxuICB9O1xyXG5cclxuICBhamF4KHVybCwgb3B0aW9ucylcclxuICAudGhlbihyZXMgPT4ge1xyXG4gICAgcmVzID0gSlNPTi5wYXJzZShyZXMpO1xyXG4gICAgaWYgKHJlcy5jcmVhdGVkKSB7XHJcbiAgICAgIHNob3dTdWNjZXNzUmVzKCfQn9C+0LvRjNC30L7QstCw0YLQtdC70Ywg0YPRgdC/0LXRiNC90L4g0YHQvtC30LTQsNC9Jyk7XHJcbiAgICAgIGNsZWFyRm9ybSgpO1xyXG4gICAgfSBlbHNlIGlmIChyZXMudXBkYXRlZCkge1xyXG4gICAgICBzaG93U3VjY2Vzc1Jlcygn0JTQsNC90L3Ri9C1INC+0LHQvdC+0LLQu9C10L3RiycpXHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBzaG93RmFpbHVyZVJlcyhg0J3QtSDRg9C00LDQu9C+0YHRjCDQstGL0L/QvtC70L3QuNGC0Ywg0L7Qv9C10YDQsNGG0LjRjjogJHtyZXMubWVzc2FnZX1gKTtcclxuICAgIH1cclxuICB9KVxyXG4gIC5jYXRjaChlcnIgPT4gY29uc29sZS5lcnJvcihlcnIpKTtcclxufSk7XHJcblxyXG5mdW5jdGlvbiBzaG93U3VjY2Vzc1Jlcyhtc2cpIHtcclxuICBzd2FwQ2xhc3NlcygkcmVzcG9uc2UsICdzdWNjZXNzJywgJ2Vycm9yJyk7XHJcbiAgJHJlc3BvbnNlLnRleHRDb250ZW50ID0gbXNnO1xyXG59XHJcblxyXG5mdW5jdGlvbiBzaG93RmFpbHVyZVJlcyhtc2cpIHtcclxuICBzd2FwQ2xhc3NlcygkcmVzcG9uc2UsICdlcnJvcicsICdzdWNjZXNzJyk7XHJcbiAgJHJlc3BvbnNlLnRleHRDb250ZW50ID0gbXNnO1xyXG59XHJcblxyXG5mdW5jdGlvbiBzd2FwQ2xhc3NlcygkZWwsIG9uLCBvZmYpIHtcclxuICAkZWwuY2xhc3NMaXN0LmFkZChvbik7XHJcbiAgJGVsLmNsYXNzTGlzdC5yZW1vdmUob2ZmKTtcclxufVxyXG5cclxuZnVuY3Rpb24gY2xlYXJGb3JtKCkge1xyXG4gIGNvbnN0IGtleXMgPSBPYmplY3Qua2V5cygkcm93cyk7XHJcbiAga2V5cy5mb3JFYWNoKGtleSA9PiB7XHJcbiAgICAkcm93c1trZXldLmlucHV0LnZhbHVlID0gXCJcIjtcclxuICB9KVxyXG59XHJcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2FkbWluL3VzZXJGb3JtLmpzIiwiaW1wb3J0IGFqYXggZnJvbSAnLi4vdXRpbHMvYWpheCc7XHJcblxyXG5jb25zdCB2YWxpZGF0b3IgPSB7fTtcclxuXHJcbnZhbGlkYXRvci52ZXJpZnkgPSAoZmlyc3QsIHNlY29uZCkgPT4ge1xyXG4gIHJldHVybiAoXHJcbiAgICBmaXJzdCA9PT0gc2Vjb25kID9cclxuICAgICAgcmVzcG9uc2UodHJ1ZSkgOlxyXG4gICAgICByZXNwb25zZShmYWxzZSwgXCLQn9Cw0YDQvtC70Lgg0L3QtSDRgdC+0LLQv9Cw0LTQsNGO0YJcIilcclxuICApXHJcbn1cclxuXHJcbnZhbGlkYXRvci51bmlxdWUgPSAoZmllbGROYW1lLCB2YWx1ZSkgPT4ge1xyXG4gIHJldHVybiBhamF4KGAvYWRtaW4vdXNlcnMvZXhpc3RzPyR7ZmllbGROYW1lfT0ke3ZhbHVlfWApXHJcbiAgLnRoZW4ocmVzID0+IHtcclxuICAgIHJlcyA9IEpTT04ucGFyc2UocmVzKTtcclxuICAgIHJldHVybiAoXHJcbiAgICAgIHJlcy5leGlzdHMgP1xyXG4gICAgICByZXNwb25zZShmYWxzZSwgXCLQn9C+0LvRjNC30L7QstCw0YLQtdC70Ywg0YEg0LTQsNC90L3Ri9C8INC70L7Qs9C40L3QvtC8INGD0LbQtSDRgdGD0YnQtdGB0YLQstGD0LXRglwiKSA6XHJcbiAgICAgIHJlc3BvbnNlKHRydWUpXHJcbiAgICApO1xyXG4gIH0pO1xyXG59XHJcblxyXG5mdW5jdGlvbiByZXNwb25zZSh2YWxpZCwgbWVzc2FnZSkge1xyXG4gIHJldHVybiB7XHJcbiAgICB2YWxpZCxcclxuICAgIG1lc3NhZ2VcclxuICB9XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IHZhbGlkYXRvcjtcclxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vYWRtaW4vdXNlclZhbGlkYXRvci5qcyJdLCJzb3VyY2VSb290IjoiIn0=