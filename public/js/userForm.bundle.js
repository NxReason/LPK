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
    } else {
      showFailureRes('\u041D\u0435 \u0443\u0434\u0430\u043B\u043E\u0441\u044C \u0441\u043E\u0437\u0434\u0430\u0442\u044C \u043F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u0442\u0435\u043B\u044F: ' + res.message);
    }
  }).catch(function (err) {
    return console.error(err);
  });
});

function showSuccessRes(msg) {
  swapClasses($response, 'success', 'error');
  $response.textContent = msg;
  clearForm();
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgNjE5YTQ4YzJmNjc5OGJkYzA1ODUiLCJ3ZWJwYWNrOi8vLy4vdXRpbHMvYWpheC5qcyIsIndlYnBhY2s6Ly8vLi4vc2Fzcy91c2VyRm9ybS5zY3NzIiwid2VicGFjazovLy8uL3VzZXJGb3JtL2luZGV4LmpzIiwid2VicGFjazovLy8uL3VzZXJGb3JtL3VzZXJWYWxpZGF0b3IuanMiXSwibmFtZXMiOlsiYWpheCIsInBhdGgiLCJvcHRpb25zIiwiZnVsbFJlc3BvbnNlIiwieGhyIiwiWE1MSHR0cFJlcXVlc3QiLCJvcGVuIiwibWV0aG9kIiwiaGVhZGVycyIsInNldFhIUkhlYWRlcnMiLCJzZW5kIiwiZGF0YSIsIlByb21pc2UiLCJyZXNvbHZlIiwicmVqZWN0Iiwib25yZWFkeXN0YXRlY2hhbmdlIiwicmVhZHlTdGF0ZSIsInN0YXR1cyIsInJlc3BvbnNlVGV4dCIsInN0YXR1c1RleHQiLCJoZWFkZXIiLCJzZXRSZXF1ZXN0SGVhZGVyIiwiSU5QVVRfTkFNRVMiLCIkcm93cyIsIm1hcCIsImRvY3VtZW50IiwicXVlcnlTZWxlY3RvciIsIm5hbWUiLCJpbnB1dCIsIiRmaWVsZCIsImVycm9yIiwicGFyZW50Tm9kZSIsInJlZHVjZSIsInJlcyIsIiRyb3ciLCJnZXRBdHRyaWJ1dGUiLCJmb3JFYWNoIiwiJHBhc3MiLCJhZGRFdmVudExpc3RlbmVyIiwiaGFuZGxlUGFzc3dvcmRDaGFuZ2UiLCJ2ZXJpZnkiLCJ2YWx1ZSIsInNob3dFcnJvciIsInVuaXF1ZSIsInRoZW4iLCJjYXRjaCIsImNvbnNvbGUiLCJlcnIiLCJmaWVsZE5hbWUiLCJyZXNwb25zZSIsInRleHRDb250ZW50IiwidmFsaWQiLCJtZXNzYWdlIiwiJGZvcm0iLCIkc2F2ZUJ1dHRvbiIsIiRyZXNwb25zZSIsImUiLCJwcmV2ZW50RGVmYXVsdCIsIk9iamVjdCIsImtleXMiLCJhY2MiLCJyb3ciLCJ1cmwiLCJhY3Rpb24iLCJKU09OIiwic3RyaW5naWZ5IiwicGFyc2UiLCJjcmVhdGVkIiwic2hvd1N1Y2Nlc3NSZXMiLCJzaG93RmFpbHVyZVJlcyIsIm1zZyIsInN3YXBDbGFzc2VzIiwiY2xlYXJGb3JtIiwiJGVsIiwib24iLCJvZmYiLCJjbGFzc0xpc3QiLCJhZGQiLCJyZW1vdmUiLCJrZXkiLCJ2YWxpZGF0b3IiLCJmaXJzdCIsInNlY29uZCIsImV4aXN0cyJdLCJtYXBwaW5ncyI6IjtBQUFBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBLG1EQUEyQyxjQUFjOztBQUV6RDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQUs7QUFDTDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLG1DQUEyQiwwQkFBMEIsRUFBRTtBQUN2RCx5Q0FBaUMsZUFBZTtBQUNoRDtBQUNBO0FBQ0E7O0FBRUE7QUFDQSw4REFBc0QsK0RBQStEOztBQUVySDtBQUNBOztBQUVBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7O0FDaEVBLFNBQVNBLElBQVQsR0FBNkQ7QUFBQSxNQUEvQ0MsSUFBK0MsdUVBQXhDLEVBQXdDO0FBQUEsTUFBcENDLE9BQW9DLHVFQUExQixFQUEwQjtBQUFBLE1BQXRCQyxZQUFzQix1RUFBUCxLQUFPOztBQUMzRCxNQUFNQyxNQUFNLElBQUlDLGNBQUosRUFBWjtBQUNBRCxNQUFJRSxJQUFKLENBQVNKLFFBQVFLLE1BQVIsSUFBa0IsS0FBM0IsRUFBa0NOLElBQWxDLEVBQXdDLElBQXhDO0FBQ0EsTUFBSUMsUUFBUU0sT0FBWixFQUFxQjtBQUFFQyxrQkFBY0wsR0FBZCxFQUFtQkYsUUFBUU0sT0FBM0I7QUFBc0M7QUFDN0RKLE1BQUlNLElBQUosQ0FBU1IsUUFBUVMsSUFBakI7O0FBRUEsU0FBTyxJQUFJQyxPQUFKLENBQVksVUFBQ0MsT0FB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LEVBQXlCQyxPQUF6QixFQUFrQztBQUNoQyxTQUFPO0FBQ0xELGdCQURLO0FBRUxDO0FBRkssR0FBUDtBQUlEOztrQkFFYzRCLFMiLCJmaWxlIjoidXNlckZvcm0uYnVuZGxlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pXG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG5cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGlkZW50aXR5IGZ1bmN0aW9uIGZvciBjYWxsaW5nIGhhcm1vbnkgaW1wb3J0cyB3aXRoIHRoZSBjb3JyZWN0IGNvbnRleHRcbiBcdF9fd2VicGFja19yZXF1aXJlX18uaSA9IGZ1bmN0aW9uKHZhbHVlKSB7IHJldHVybiB2YWx1ZTsgfTtcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7XG4gXHRcdFx0XHRjb25maWd1cmFibGU6IGZhbHNlLFxuIFx0XHRcdFx0ZW51bWVyYWJsZTogdHJ1ZSxcbiBcdFx0XHRcdGdldDogZ2V0dGVyXG4gXHRcdFx0fSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gMjYpO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIHdlYnBhY2svYm9vdHN0cmFwIDYxOWE0OGMyZjY3OThiZGMwNTg1IiwiZnVuY3Rpb24gYWpheChwYXRoID0gJycsIG9wdGlvbnMgPSB7fSwgZnVsbFJlc3BvbnNlID0gZmFsc2UpIHtcclxuICBjb25zdCB4aHIgPSBuZXcgWE1MSHR0cFJlcXVlc3QoKTtcclxuICB4aHIub3BlbihvcHRpb25zLm1ldGhvZCB8fCAnR0VUJywgcGF0aCwgdHJ1ZSk7XHJcbiAgaWYgKG9wdGlvbnMuaGVhZGVycykgeyBzZXRYSFJIZWFkZXJzKHhociwgb3B0aW9ucy5oZWFkZXJzKTsgfVxyXG4gIHhoci5zZW5kKG9wdGlvbnMuZGF0YSk7XHJcblxyXG4gIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XHJcbiAgICB4aHIub25yZWFkeXN0YXRlY2hhbmdlID0gZnVuY3Rpb24oKSB7XHJcbiAgICAgIGlmKHhoci5yZWFkeVN0YXRlID09IDQpIHtcclxuICAgICAgICBpZih4aHIuc3RhdHVzID09IDIwMCkge1xyXG4gICAgICAgICAgaWYgKGZ1bGxSZXNwb25zZSkge1xyXG4gICAgICAgICAgICByZXNvbHZlKHhocik7XHJcbiAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICByZXNvbHZlKHhoci5yZXNwb25zZVRleHQpO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICByZWplY3QoeGhyLnN0YXR1c1RleHQpO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH0pXHJcbn1cclxuXHJcbmZ1bmN0aW9uIHNldFhIUkhlYWRlcnMoeGhyLCBoZWFkZXJzKSB7XHJcbiAgZm9yIChsZXQgaGVhZGVyIGluIGhlYWRlcnMpIHtcclxuICAgIHhoci5zZXRSZXF1ZXN0SGVhZGVyKGhlYWRlciwgaGVhZGVyc1toZWFkZXJdKTtcclxuICB9XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IGFqYXg7XHJcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3V0aWxzL2FqYXguanMiLCIvLyByZW1vdmVkIGJ5IGV4dHJhY3QtdGV4dC13ZWJwYWNrLXBsdWdpblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4uL3Nhc3MvdXNlckZvcm0uc2Nzc1xuLy8gbW9kdWxlIGlkID0gMTFcbi8vIG1vZHVsZSBjaHVua3MgPSAyIiwiaW1wb3J0ICcuLi8uLi9zYXNzL3VzZXJGb3JtLnNjc3MnO1xyXG5cclxuaW1wb3J0IHZhbGlkYXRvciBmcm9tICcuL3VzZXJWYWxpZGF0b3InO1xyXG5pbXBvcnQgYWpheCBmcm9tICcuLi91dGlscy9hamF4JztcclxuLyoqXHJcbiAqIEZvcm0gdmFsaWRhdGlvblxyXG4gKi9cclxuY29uc3QgSU5QVVRfTkFNRVMgPSBbJ3VzZXJuYW1lJywgJ3Bhc3N3b3JkJywgJ3Bhc3N3b3JkLXZlcmlmeScsICdmaXJzdG5hbWUnLFxyXG4gICdsYXN0bmFtZScsICdlbWFpbCddO1xyXG5cclxuY29uc3QgJHJvd3MgPSBJTlBVVF9OQU1FUy5tYXAobmFtZSA9PiB7XHJcbiAgcmV0dXJuIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoYFtuYW1lPSR7bmFtZX1dYCk7XHJcbn0pLm1hcCgkZmllbGQgPT4ge1xyXG4gIHJldHVybiB7XHJcbiAgICBpbnB1dDogJGZpZWxkLFxyXG4gICAgZXJyb3I6ICRmaWVsZC5wYXJlbnROb2RlLnF1ZXJ5U2VsZWN0b3IoJy5lcnJvci1maWVsZCcpXHJcbiAgfVxyXG59KS5yZWR1Y2UoKHJlcywgJHJvdykgPT4ge1xyXG4gIHJlc1skcm93LmlucHV0LmdldEF0dHJpYnV0ZSgnbmFtZScpXSA9ICRyb3c7XHJcbiAgcmV0dXJuIHJlcztcclxufSwge30pO1xyXG5cclxuWyRyb3dzWydwYXNzd29yZCddLmlucHV0LCAkcm93c1sncGFzc3dvcmQtdmVyaWZ5J10uaW5wdXRdXHJcbiAgLmZvckVhY2goJHBhc3MgPT4ge1xyXG4gICAgJHBhc3MuYWRkRXZlbnRMaXN0ZW5lcignY2hhbmdlJywgaGFuZGxlUGFzc3dvcmRDaGFuZ2UpO1xyXG4gIH0pO1xyXG5cclxuZnVuY3Rpb24gaGFuZGxlUGFzc3dvcmRDaGFuZ2UoKSB7XHJcbiAgY29uc3QgcmVzID0gdmFsaWRhdG9yLnZlcmlmeShcclxuICAgICRyb3dzWydwYXNzd29yZCddLmlucHV0LnZhbHVlLFxyXG4gICAgJHJvd3NbJ3Bhc3N3b3JkLXZlcmlmeSddLmlucHV0LnZhbHVlXHJcbiAgKTtcclxuXHJcbiAgc2hvd0Vycm9yKCdwYXNzd29yZC12ZXJpZnknLCByZXMpO1xyXG59XHJcblxyXG4kcm93c1sndXNlcm5hbWUnXS5pbnB1dC5hZGRFdmVudExpc3RlbmVyKCdjaGFuZ2UnLCAoKSA9PiB7XHJcbiAgdmFsaWRhdG9yLnVuaXF1ZSgndXNlcm5hbWUnLCAkcm93c1sndXNlcm5hbWUnXS5pbnB1dC52YWx1ZSlcclxuICAudGhlbihyZXMgPT4ge1xyXG4gICAgc2hvd0Vycm9yKCd1c2VybmFtZScsIHJlcyk7XHJcbiAgfSlcclxuICAuY2F0Y2goZXJyID0+IGNvbnNvbGUuZXJyb3IoZXJyKSk7XHJcbn0pO1xyXG5cclxuZnVuY3Rpb24gc2hvd0Vycm9yKGZpZWxkTmFtZSwgcmVzcG9uc2UpIHtcclxuICAkcm93c1tmaWVsZE5hbWVdLmVycm9yLnRleHRDb250ZW50ID0gcmVzcG9uc2UudmFsaWQgPyBcIlwiIDogcmVzcG9uc2UubWVzc2FnZTtcclxufVxyXG5cclxuLyoqXHJcbiAqIFNhdmluZyBkYXRhIG9uIHNlcnZlclxyXG4gKi9cclxuY29uc3QgJGZvcm0gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI3VzZXItZm9ybVwiKTtcclxuY29uc3QgJHNhdmVCdXR0b24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjc2F2ZS1idG4nKTtcclxuY29uc3QgJHJlc3BvbnNlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3NlcnZlci1yZXNwb25zZScpO1xyXG5cclxuJHNhdmVCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZSkgPT4ge1xyXG4gIGUucHJldmVudERlZmF1bHQoKTtcclxuXHJcbiAgY29uc3QgZGF0YSA9IE9iamVjdC5rZXlzKCRyb3dzKS5yZWR1Y2UoKGFjYywgcm93KSA9PiB7XHJcbiAgICBhY2Nbcm93XSA9ICRyb3dzW3Jvd10uaW5wdXQudmFsdWU7XHJcbiAgICByZXR1cm4gYWNjO1xyXG4gIH0sIHt9KTtcclxuXHJcbiAgY29uc3QgdXJsID0gJGZvcm0uYWN0aW9uO1xyXG4gIGNvbnN0IG9wdGlvbnMgPSB7XHJcbiAgICBtZXRob2Q6ICRmb3JtLm1ldGhvZCxcclxuICAgIGRhdGE6IEpTT04uc3RyaW5naWZ5KGRhdGEpLFxyXG4gICAgaGVhZGVyczoge1xyXG4gICAgICAnQ29udGVudC10eXBlJzogJ2FwcGxpY2F0aW9uL2pzb24nXHJcbiAgICB9XHJcbiAgfTtcclxuXHJcbiAgYWpheCh1cmwsIG9wdGlvbnMpXHJcbiAgLnRoZW4ocmVzID0+IHtcclxuICAgIHJlcyA9IEpTT04ucGFyc2UocmVzKTtcclxuICAgIGlmIChyZXMuY3JlYXRlZCkge1xyXG4gICAgICBzaG93U3VjY2Vzc1Jlcygn0J/QvtC70YzQt9C+0LLQsNGC0LXQu9GMINGD0YHQv9C10YjQvdC+INGB0L7Qt9C00LDQvScpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgc2hvd0ZhaWx1cmVSZXMoYNCd0LUg0YPQtNCw0LvQvtGB0Ywg0YHQvtC30LTQsNGC0Ywg0L/QvtC70YzQt9C+0LLQsNGC0LXQu9GPOiAke3Jlcy5tZXNzYWdlfWApO1xyXG4gICAgfVxyXG4gIH0pXHJcbiAgLmNhdGNoKGVyciA9PiBjb25zb2xlLmVycm9yKGVycikpO1xyXG59KTtcclxuXHJcbmZ1bmN0aW9uIHNob3dTdWNjZXNzUmVzKG1zZykge1xyXG4gIHN3YXBDbGFzc2VzKCRyZXNwb25zZSwgJ3N1Y2Nlc3MnLCAnZXJyb3InKTtcclxuICAkcmVzcG9uc2UudGV4dENvbnRlbnQgPSBtc2c7XHJcbiAgY2xlYXJGb3JtKCk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIHNob3dGYWlsdXJlUmVzKG1zZykge1xyXG4gIHN3YXBDbGFzc2VzKCRyZXNwb25zZSwgJ2Vycm9yJywgJ3N1Y2Nlc3MnKTtcclxuICAkcmVzcG9uc2UudGV4dENvbnRlbnQgPSBtc2c7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIHN3YXBDbGFzc2VzKCRlbCwgb24sIG9mZikge1xyXG4gICRlbC5jbGFzc0xpc3QuYWRkKG9uKTtcclxuICAkZWwuY2xhc3NMaXN0LnJlbW92ZShvZmYpO1xyXG59XHJcblxyXG5mdW5jdGlvbiBjbGVhckZvcm0oKSB7XHJcbiAgY29uc3Qga2V5cyA9IE9iamVjdC5rZXlzKCRyb3dzKTtcclxuICBrZXlzLmZvckVhY2goa2V5ID0+IHtcclxuICAgICRyb3dzW2tleV0uaW5wdXQudmFsdWUgPSBcIlwiO1xyXG4gIH0pXHJcbn1cclxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vdXNlckZvcm0vaW5kZXguanMiLCJpbXBvcnQgYWpheCBmcm9tICcuLi91dGlscy9hamF4JztcclxuXHJcbmNvbnN0IHZhbGlkYXRvciA9IHt9O1xyXG5cclxudmFsaWRhdG9yLnZlcmlmeSA9IChmaXJzdCwgc2Vjb25kKSA9PiB7XHJcbiAgcmV0dXJuIChcclxuICAgIGZpcnN0ID09PSBzZWNvbmQgP1xyXG4gICAgICByZXNwb25zZSh0cnVlKSA6XHJcbiAgICAgIHJlc3BvbnNlKGZhbHNlLCBcItCf0LDRgNC+0LvQuCDQvdC1INGB0L7QstC/0LDQtNCw0Y7RglwiKVxyXG4gIClcclxufVxyXG5cclxudmFsaWRhdG9yLnVuaXF1ZSA9IChmaWVsZE5hbWUsIHZhbHVlKSA9PiB7XHJcbiAgcmV0dXJuIGFqYXgoYC9hZG1pbi91c2Vycy9leGlzdHM/JHtmaWVsZE5hbWV9PSR7dmFsdWV9YClcclxuICAudGhlbihyZXMgPT4ge1xyXG4gICAgcmVzID0gSlNPTi5wYXJzZShyZXMpO1xyXG4gICAgcmV0dXJuIChcclxuICAgICAgcmVzLmV4aXN0cyA/XHJcbiAgICAgIHJlc3BvbnNlKGZhbHNlLCBcItCf0L7Qu9GM0LfQvtCy0LDRgtC10LvRjCDRgSDQtNCw0L3QvdGL0Lwg0LvQvtCz0LjQvdC+0Lwg0YPQttC1INGB0YPRidC10YHRgtCy0YPQtdGCXCIpIDpcclxuICAgICAgcmVzcG9uc2UodHJ1ZSlcclxuICAgICk7XHJcbiAgfSk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIHJlc3BvbnNlKHZhbGlkLCBtZXNzYWdlKSB7XHJcbiAgcmV0dXJuIHtcclxuICAgIHZhbGlkLFxyXG4gICAgbWVzc2FnZVxyXG4gIH1cclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgdmFsaWRhdG9yO1xyXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi91c2VyRm9ybS91c2VyVmFsaWRhdG9yLmpzIl0sInNvdXJjZVJvb3QiOiIifQ==