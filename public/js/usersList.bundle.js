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
/******/ 	return __webpack_require__(__webpack_require__.s = 23);
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

/***/ 23:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _ajax = __webpack_require__(1);

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgZjM2NjQ2YjYwYmJjMTAxODM5NzQiLCJ3ZWJwYWNrOi8vLy4vdXRpbHMvYWpheC5qcyIsIndlYnBhY2s6Ly8vLi9hZG1pbi91c2Vyc0xpc3QuanMiXSwibmFtZXMiOlsiYWpheCIsInBhdGgiLCJvcHRpb25zIiwiZnVsbFJlc3BvbnNlIiwieGhyIiwiWE1MSHR0cFJlcXVlc3QiLCJvcGVuIiwibWV0aG9kIiwiaGVhZGVycyIsInNldFhIUkhlYWRlcnMiLCJzZW5kIiwiZGF0YSIsIlByb21pc2UiLCJyZXNvbHZlIiwicmVqZWN0Iiwib25yZWFkeXN0YXRlY2hhbmdlIiwicmVhZHlTdGF0ZSIsInN0YXR1cyIsInJlc3BvbnNlVGV4dCIsInN0YXR1c1RleHQiLCJoZWFkZXIiLCJzZXRSZXF1ZXN0SGVhZGVyIiwiJHRhYmxlQm9keSIsImRvY3VtZW50IiwicXVlcnlTZWxlY3RvciIsIiRkZWxCdXR0b25zIiwicXVlcnlTZWxlY3RvckFsbCIsImRlbGV0ZVVybEJhc2UiLCJmb3JFYWNoIiwiJGJ0biIsImFkZEV2ZW50TGlzdGVuZXIiLCJoYW5kbGVVc2VyRGVsZXRlIiwiZSIsInRhcmdldCIsImlkIiwiZGF0YXNldCIsInVzZXJJZCIsInVybCIsInRoZW4iLCJyZXMiLCJKU09OIiwicGFyc2UiLCJkZWxldGVkIiwiaGlkZVVzZXJSb3ciLCJjb25zb2xlIiwibG9nIiwibWVzc2FnZSIsImNhdGNoIiwiZXJyb3IiLCJlcnIiLCIkcm93IiwicmVtb3ZlQ2hpbGQiXSwibWFwcGluZ3MiOiI7QUFBQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQSxtREFBMkMsY0FBYzs7QUFFekQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFLO0FBQ0w7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxtQ0FBMkIsMEJBQTBCLEVBQUU7QUFDdkQseUNBQWlDLGVBQWU7QUFDaEQ7QUFDQTtBQUNBOztBQUVBO0FBQ0EsOERBQXNELCtEQUErRDs7QUFFckg7QUFDQTs7QUFFQTtBQUNBOzs7Ozs7Ozs7Ozs7OztBQ2hFQSxTQUFTQSxJQUFULEdBQTZEO0FBQUEsTUFBL0NDLElBQStDLHVFQUF4QyxFQUF3QztBQUFBLE1BQXBDQyxPQUFvQyx1RUFBMUIsRUFBMEI7QUFBQSxNQUF0QkMsWUFBc0IsdUVBQVAsS0FBTzs7QUFDM0QsTUFBTUMsTUFBTSxJQUFJQyxjQUFKLEVBQVo7QUFDQUQsTUFBSUUsSUFBSixDQUFTSixRQUFRSyxNQUFSLElBQWtCLEtBQTNCLEVBQWtDTixJQUFsQyxFQUF3QyxJQUF4QztBQUNBLE1BQUlDLFFBQVFNLE9BQVosRUFBcUI7QUFBRUMsa0JBQWNMLEdBQWQsRUFBbUJGLFFBQVFNLE9BQTNCO0FBQXNDO0FBQzdESixNQUFJTSxJQUFKLENBQVNSLFFBQVFTLElBQWpCOztBQUVBLFNBQU8sSUFBSUMsT0FBSixDQUFZLFVBQUNDLE9BQUQsRUFBVUMsTUFBVixFQUFxQjtBQUN0Q1YsUUFBSVcsa0JBQUosR0FBeUIsWUFBVztBQUNsQyxVQUFHWCxJQUFJWSxVQUFKLElBQWtCLENBQXJCLEVBQXdCO0FBQ3RCLFlBQUdaLElBQUlhLE1BQUosSUFBYyxHQUFqQixFQUFzQjtBQUNwQixjQUFJZCxZQUFKLEVBQWtCO0FBQ2hCVSxvQkFBUVQsR0FBUjtBQUNELFdBRkQsTUFFTztBQUNMUyxvQkFBUVQsSUFBSWMsWUFBWjtBQUNEO0FBQ0YsU0FORCxNQU1PO0FBQ0xKLGlCQUFPVixJQUFJZSxVQUFYO0FBQ0Q7QUFDRjtBQUNGLEtBWkQ7QUFhRCxHQWRNLENBQVA7QUFlRDs7QUFFRCxTQUFTVixhQUFULENBQXVCTCxHQUF2QixFQUE0QkksT0FBNUIsRUFBcUM7QUFDbkMsT0FBSyxJQUFJWSxNQUFULElBQW1CWixPQUFuQixFQUE0QjtBQUMxQkosUUFBSWlCLGdCQUFKLENBQXFCRCxNQUFyQixFQUE2QlosUUFBUVksTUFBUixDQUE3QjtBQUNEO0FBQ0Y7O2tCQUVjcEIsSTs7Ozs7Ozs7OztBQzdCZjs7Ozs7O0FBRUEsSUFBTXNCLGFBQWFDLFNBQVNDLGFBQVQsQ0FBdUIsb0JBQXZCLENBQW5CO0FBQ0EsSUFBTUMsY0FBY0YsU0FBU0csZ0JBQVQsQ0FBMEIsbUJBQTFCLENBQXBCO0FBQ0EsSUFBTUMsZ0JBQWdCLHNCQUF0QjtBQUNBRixZQUFZRyxPQUFaLENBQW9CLGdCQUFRO0FBQzFCQyxPQUFLQyxnQkFBTCxDQUFzQixPQUF0QixFQUErQkMsZ0JBQS9CO0FBQ0QsQ0FGRDs7QUFJQSxTQUFTQSxnQkFBVCxDQUEwQkMsQ0FBMUIsRUFBNkI7QUFDM0IsTUFBTUgsT0FBT0csRUFBRUMsTUFBZjtBQUNBLE1BQU1DLEtBQUtMLEtBQUtNLE9BQUwsQ0FBYUMsTUFBeEI7QUFDQSxNQUFNQyxNQUFNVixnQkFBZ0JPLEVBQTVCOztBQUVBLHNCQUFLRyxHQUFMLEVBQVU7QUFDUjlCLFlBQVEsUUFEQTtBQUVSQyxhQUFTO0FBQ1Asc0JBQWdCO0FBRFQ7QUFGRCxHQUFWLEVBTUM4QixJQU5ELENBTU0sZUFBTztBQUNYQyxVQUFNQyxLQUFLQyxLQUFMLENBQVdGLEdBQVgsQ0FBTjtBQUNBLFFBQUlBLElBQUlHLE9BQVIsRUFBaUI7QUFDZkMsa0JBQVlULEVBQVo7QUFDRCxLQUZELE1BRU87QUFDTFUsY0FBUUMsR0FBUixDQUFZTixJQUFJTyxPQUFoQjtBQUNEO0FBQ0YsR0FiRCxFQWNDQyxLQWRELENBY087QUFBQSxXQUFPSCxRQUFRSSxLQUFSLENBQWNDLEdBQWQsQ0FBUDtBQUFBLEdBZFA7QUFlRDs7QUFFRCxTQUFTTixXQUFULENBQXFCVCxFQUFyQixFQUF5QjtBQUN2QixNQUFNZ0IsT0FBTzNCLFNBQVNDLGFBQVQsdUJBQTJDVSxFQUEzQyxRQUFiO0FBQ0FaLGFBQVc2QixXQUFYLENBQXVCRCxJQUF2QjtBQUNELEMiLCJmaWxlIjoidXNlcnNMaXN0LmJ1bmRsZS5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKVxuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuXG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBpZGVudGl0eSBmdW5jdGlvbiBmb3IgY2FsbGluZyBoYXJtb255IGltcG9ydHMgd2l0aCB0aGUgY29ycmVjdCBjb250ZXh0XG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmkgPSBmdW5jdGlvbih2YWx1ZSkgeyByZXR1cm4gdmFsdWU7IH07XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwge1xuIFx0XHRcdFx0Y29uZmlndXJhYmxlOiBmYWxzZSxcbiBcdFx0XHRcdGVudW1lcmFibGU6IHRydWUsXG4gXHRcdFx0XHRnZXQ6IGdldHRlclxuIFx0XHRcdH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IDIzKTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyB3ZWJwYWNrL2Jvb3RzdHJhcCBmMzY2NDZiNjBiYmMxMDE4Mzk3NCIsImZ1bmN0aW9uIGFqYXgocGF0aCA9ICcnLCBvcHRpb25zID0ge30sIGZ1bGxSZXNwb25zZSA9IGZhbHNlKSB7XHJcbiAgY29uc3QgeGhyID0gbmV3IFhNTEh0dHBSZXF1ZXN0KCk7XHJcbiAgeGhyLm9wZW4ob3B0aW9ucy5tZXRob2QgfHwgJ0dFVCcsIHBhdGgsIHRydWUpO1xyXG4gIGlmIChvcHRpb25zLmhlYWRlcnMpIHsgc2V0WEhSSGVhZGVycyh4aHIsIG9wdGlvbnMuaGVhZGVycyk7IH1cclxuICB4aHIuc2VuZChvcHRpb25zLmRhdGEpO1xyXG5cclxuICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xyXG4gICAgeGhyLm9ucmVhZHlzdGF0ZWNoYW5nZSA9IGZ1bmN0aW9uKCkge1xyXG4gICAgICBpZih4aHIucmVhZHlTdGF0ZSA9PSA0KSB7XHJcbiAgICAgICAgaWYoeGhyLnN0YXR1cyA9PSAyMDApIHtcclxuICAgICAgICAgIGlmIChmdWxsUmVzcG9uc2UpIHtcclxuICAgICAgICAgICAgcmVzb2x2ZSh4aHIpO1xyXG4gICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgcmVzb2x2ZSh4aHIucmVzcG9uc2VUZXh0KTtcclxuICAgICAgICAgIH1cclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgcmVqZWN0KHhoci5zdGF0dXNUZXh0KTtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9KVxyXG59XHJcblxyXG5mdW5jdGlvbiBzZXRYSFJIZWFkZXJzKHhociwgaGVhZGVycykge1xyXG4gIGZvciAobGV0IGhlYWRlciBpbiBoZWFkZXJzKSB7XHJcbiAgICB4aHIuc2V0UmVxdWVzdEhlYWRlcihoZWFkZXIsIGhlYWRlcnNbaGVhZGVyXSk7XHJcbiAgfVxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBhamF4O1xyXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi91dGlscy9hamF4LmpzIiwiaW1wb3J0IGFqYXggZnJvbSAnLi4vdXRpbHMvYWpheCc7XHJcblxyXG5jb25zdCAkdGFibGVCb2R5ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnVzZXJzLXRhYmxlIHRib2R5Jyk7XHJcbmNvbnN0ICRkZWxCdXR0b25zID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLnVzZXJzLWJ0bi1kZWxldGUnKTtcclxuY29uc3QgZGVsZXRlVXJsQmFzZSA9ICcvYWRtaW4vdXNlcnMvZGVsZXRlLyc7XHJcbiRkZWxCdXR0b25zLmZvckVhY2goJGJ0biA9PiB7XHJcbiAgJGJ0bi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGhhbmRsZVVzZXJEZWxldGUpO1xyXG59KTtcclxuXHJcbmZ1bmN0aW9uIGhhbmRsZVVzZXJEZWxldGUoZSkge1xyXG4gIGNvbnN0ICRidG4gPSBlLnRhcmdldDtcclxuICBjb25zdCBpZCA9ICRidG4uZGF0YXNldC51c2VySWQ7XHJcbiAgY29uc3QgdXJsID0gZGVsZXRlVXJsQmFzZSArIGlkO1xyXG5cclxuICBhamF4KHVybCwge1xyXG4gICAgbWV0aG9kOiAnREVMRVRFJyxcclxuICAgIGhlYWRlcnM6IHtcclxuICAgICAgJ0NvbnRlbnQtdHlwZSc6ICdhcHBsaWNhdGlvbi9qc29uJ1xyXG4gICAgfVxyXG4gIH0pXHJcbiAgLnRoZW4ocmVzID0+IHtcclxuICAgIHJlcyA9IEpTT04ucGFyc2UocmVzKTtcclxuICAgIGlmIChyZXMuZGVsZXRlZCkge1xyXG4gICAgICBoaWRlVXNlclJvdyhpZCk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBjb25zb2xlLmxvZyhyZXMubWVzc2FnZSk7XHJcbiAgICB9XHJcbiAgfSlcclxuICAuY2F0Y2goZXJyID0+IGNvbnNvbGUuZXJyb3IoZXJyKSk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGhpZGVVc2VyUm93KGlkKSB7XHJcbiAgY29uc3QgJHJvdyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoYHRyW2RhdGEtdXNlci1pZD1cIiR7aWR9XCJdYCk7XHJcbiAgJHRhYmxlQm9keS5yZW1vdmVDaGlsZCgkcm93KTtcclxufVxyXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9hZG1pbi91c2Vyc0xpc3QuanMiXSwic291cmNlUm9vdCI6IiJ9