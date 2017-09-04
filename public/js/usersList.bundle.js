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

/***/ 22:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _ajax = __webpack_require__(0);

var _ajax2 = _interopRequireDefault(_ajax);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var $tableBody = document.querySelector('.users-table tbody');
var $delButtons = document.querySelectorAll('.users-btn-delete');
var deleteUrlBase = '/admin/users/delete/';
$delButtons.forEach(function ($btn) {
  $btn.addEventListener('click', handleUserDelete);
});

function handleUserDelete(e) {
  var $btn = e.target;
  var id = $btn.dataset.userId;
  var url = deleteUrlBase + id;

  (0, _ajax2.default)(url, {
    method: 'DELETE',
    headers: {
      'Content-type': 'application/json'
    }
  }).then(function (res) {
    res = JSON.parse(res);
    if (res.deleted) {
      hideUserRow(id);
    } else {
      console.log(res.message);
    }
  }).catch(function (err) {
    return console.error(err);
  });
}

function hideUserRow(id) {
  var $row = document.querySelector('tr[data-user-id="' + id + '"]');
  $tableBody.removeChild($row);
}

/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgYmQ3MzcwZGRhN2Q3MWQwNjU3OGM/NDNlZCoqKioqIiwid2VicGFjazovLy8uL3V0aWxzL2FqYXguanM/ZWI5MCoqIiwid2VicGFjazovLy8uL2FkbWluL3VzZXJzTGlzdC5qcyJdLCJuYW1lcyI6WyJhamF4IiwicGF0aCIsIm9wdGlvbnMiLCJmdWxsUmVzcG9uc2UiLCJ4aHIiLCJYTUxIdHRwUmVxdWVzdCIsIm9wZW4iLCJtZXRob2QiLCJoZWFkZXJzIiwic2V0WEhSSGVhZGVycyIsInNlbmQiLCJkYXRhIiwiUHJvbWlzZSIsInJlc29sdmUiLCJyZWplY3QiLCJvbnJlYWR5c3RhdGVjaGFuZ2UiLCJyZWFkeVN0YXRlIiwic3RhdHVzIiwicmVzcG9uc2VUZXh0Iiwic3RhdHVzVGV4dCIsImhlYWRlciIsInNldFJlcXVlc3RIZWFkZXIiLCIkdGFibGVCb2R5IiwiZG9jdW1lbnQiLCJxdWVyeVNlbGVjdG9yIiwiJGRlbEJ1dHRvbnMiLCJxdWVyeVNlbGVjdG9yQWxsIiwiZGVsZXRlVXJsQmFzZSIsImZvckVhY2giLCIkYnRuIiwiYWRkRXZlbnRMaXN0ZW5lciIsImhhbmRsZVVzZXJEZWxldGUiLCJlIiwidGFyZ2V0IiwiaWQiLCJkYXRhc2V0IiwidXNlcklkIiwidXJsIiwidGhlbiIsInJlcyIsIkpTT04iLCJwYXJzZSIsImRlbGV0ZWQiLCJoaWRlVXNlclJvdyIsImNvbnNvbGUiLCJsb2ciLCJtZXNzYWdlIiwiY2F0Y2giLCJlcnJvciIsImVyciIsIiRyb3ciLCJyZW1vdmVDaGlsZCJdLCJtYXBwaW5ncyI6IjtBQUFBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQSxtREFBMkMsY0FBYzs7QUFFekQ7QUFD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QUF2QjtBQUNELEMiLCJmaWxlIjoidXNlcnNMaXN0LmJ1bmRsZS5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGlkZW50aXR5IGZ1bmN0aW9uIGZvciBjYWxsaW5nIGhhcm1vbnkgaW1wb3J0cyB3aXRoIHRoZSBjb3JyZWN0IGNvbnRleHRcbiBcdF9fd2VicGFja19yZXF1aXJlX18uaSA9IGZ1bmN0aW9uKHZhbHVlKSB7IHJldHVybiB2YWx1ZTsgfTtcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7XG4gXHRcdFx0XHRjb25maWd1cmFibGU6IGZhbHNlLFxuIFx0XHRcdFx0ZW51bWVyYWJsZTogdHJ1ZSxcbiBcdFx0XHRcdGdldDogZ2V0dGVyXG4gXHRcdFx0fSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gMjIpO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIHdlYnBhY2svYm9vdHN0cmFwIGJkNzM3MGRkYTdkNzFkMDY1NzhjIiwiZnVuY3Rpb24gYWpheChwYXRoID0gJycsIG9wdGlvbnMgPSB7fSwgZnVsbFJlc3BvbnNlID0gZmFsc2UpIHtcclxuICBjb25zdCB4aHIgPSBuZXcgWE1MSHR0cFJlcXVlc3QoKTtcclxuICB4aHIub3BlbihvcHRpb25zLm1ldGhvZCB8fCAnR0VUJywgcGF0aCwgdHJ1ZSk7XHJcbiAgaWYgKG9wdGlvbnMuaGVhZGVycykgeyBzZXRYSFJIZWFkZXJzKHhociwgb3B0aW9ucy5oZWFkZXJzKTsgfVxyXG4gIHhoci5zZW5kKG9wdGlvbnMuZGF0YSk7XHJcblxyXG4gIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XHJcbiAgICB4aHIub25yZWFkeXN0YXRlY2hhbmdlID0gZnVuY3Rpb24oKSB7XHJcbiAgICAgIGlmKHhoci5yZWFkeVN0YXRlID09IDQpIHtcclxuICAgICAgICBpZih4aHIuc3RhdHVzID09IDIwMCkge1xyXG4gICAgICAgICAgaWYgKGZ1bGxSZXNwb25zZSkge1xyXG4gICAgICAgICAgICByZXNvbHZlKHhocik7XHJcbiAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICByZXNvbHZlKHhoci5yZXNwb25zZVRleHQpO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICByZWplY3QoeGhyLnN0YXR1c1RleHQpO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH0pXHJcbn1cclxuXHJcbmZ1bmN0aW9uIHNldFhIUkhlYWRlcnMoeGhyLCBoZWFkZXJzKSB7XHJcbiAgZm9yIChsZXQgaGVhZGVyIGluIGhlYWRlcnMpIHtcclxuICAgIHhoci5zZXRSZXF1ZXN0SGVhZGVyKGhlYWRlciwgaGVhZGVyc1toZWFkZXJdKTtcclxuICB9XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IGFqYXg7XHJcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3V0aWxzL2FqYXguanMiLCJpbXBvcnQgYWpheCBmcm9tICcuLi91dGlscy9hamF4JztcclxuXHJcbmNvbnN0ICR0YWJsZUJvZHkgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcudXNlcnMtdGFibGUgdGJvZHknKTtcclxuY29uc3QgJGRlbEJ1dHRvbnMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcudXNlcnMtYnRuLWRlbGV0ZScpO1xyXG5jb25zdCBkZWxldGVVcmxCYXNlID0gJy9hZG1pbi91c2Vycy9kZWxldGUvJztcclxuJGRlbEJ1dHRvbnMuZm9yRWFjaCgkYnRuID0+IHtcclxuICAkYnRuLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgaGFuZGxlVXNlckRlbGV0ZSk7XHJcbn0pO1xyXG5cclxuZnVuY3Rpb24gaGFuZGxlVXNlckRlbGV0ZShlKSB7XHJcbiAgY29uc3QgJGJ0biA9IGUudGFyZ2V0O1xyXG4gIGNvbnN0IGlkID0gJGJ0bi5kYXRhc2V0LnVzZXJJZDtcclxuICBjb25zdCB1cmwgPSBkZWxldGVVcmxCYXNlICsgaWQ7XHJcblxyXG4gIGFqYXgodXJsLCB7XHJcbiAgICBtZXRob2Q6ICdERUxFVEUnLFxyXG4gICAgaGVhZGVyczoge1xyXG4gICAgICAnQ29udGVudC10eXBlJzogJ2FwcGxpY2F0aW9uL2pzb24nXHJcbiAgICB9XHJcbiAgfSlcclxuICAudGhlbihyZXMgPT4ge1xyXG4gICAgcmVzID0gSlNPTi5wYXJzZShyZXMpO1xyXG4gICAgaWYgKHJlcy5kZWxldGVkKSB7XHJcbiAgICAgIGhpZGVVc2VyUm93KGlkKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIGNvbnNvbGUubG9nKHJlcy5tZXNzYWdlKTtcclxuICAgIH1cclxuICB9KVxyXG4gIC5jYXRjaChlcnIgPT4gY29uc29sZS5lcnJvcihlcnIpKTtcclxufVxyXG5cclxuZnVuY3Rpb24gaGlkZVVzZXJSb3coaWQpIHtcclxuICBjb25zdCAkcm93ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihgdHJbZGF0YS11c2VyLWlkPVwiJHtpZH1cIl1gKTtcclxuICAkdGFibGVCb2R5LnJlbW92ZUNoaWxkKCRyb3cpO1xyXG59XHJcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2FkbWluL3VzZXJzTGlzdC5qcyJdLCJzb3VyY2VSb290IjoiIn0=