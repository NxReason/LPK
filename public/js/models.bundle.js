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
/******/ 	return __webpack_require__(__webpack_require__.s = 14);
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

/***/ 14:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _ajax = __webpack_require__(0);

var _ajax2 = _interopRequireDefault(_ajax);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var $modelsList = document.querySelector('.models-list'); // import '../../sass/common.scss';

$modelsList.addEventListener('click', removeModel);

function removeModel(e) {
  if (e.target.classList.contains('model__control-delete')) {
    var $btn = e.target;
    var id = $btn.dataset.id;

    (0, _ajax2.default)('/admin/models/' + id, {
      method: 'DELETE',
      headers: [{ 'Content-type': 'application/json' }]
    }).then(function (res) {
      var data = JSON.parse(res);
      removeModelNode(id);
    }).catch(function (err) {
      console.warn(err);
    });
  }
}

function removeModelNode(id) {
  var $node = document.getElementById('model-' + id);
  $modelsList.removeChild($node);
}

/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgZmEwN2Y2YTAzYjgzYzVjOTJmM2M/MTcwMioqKioqKiIsIndlYnBhY2s6Ly8vLi91dGlscy9hamF4LmpzP2ViOTAqKioiLCJ3ZWJwYWNrOi8vLy4vYWRtaW4vbW9kZWxzLmpzIl0sIm5hbWVzIjpbImFqYXgiLCJwYXRoIiwib3B0aW9ucyIsImZ1bGxSZXNwb25zZSIsInhociIsIlhNTEh0dHBSZXF1ZXN0Iiwib3BlbiIsIm1ldGhvZCIsImhlYWRlcnMiLCJzZXRYSFJIZWFkZXJzIiwic2VuZCIsImRhdGEiLCJQcm9taXNlIiwicmVzb2x2ZSIsInJlamVjdCIsIm9ucmVhZHlzdGF0ZWNoYW5nZSIsInJlYWR5U3RhdGUiLCJzdGF0dXMiLCJyZXNwb25zZVRleHQiLCJzdGF0dXNUZXh0IiwiaGVhZGVyIiwic2V0UmVxdWVzdEhlYWRlciIsIiRtb2RlbHNMaXN0IiwiZG9jdW1lbnQiLCJxdWVyeVNlbGVjdG9yIiwiYWRkRXZlbnRMaXN0ZW5lciIsInJlbW92ZU1vZGVsIiwiZSIsInRhcmdldCIsImNsYXNzTGlzdCIsImNvbnRhaW5zIiwiJGJ0biIsImlkIiwiZGF0YXNldCIsInRoZW4iLCJyZXMiLCJKU09OIiwicGFyc2UiLCJyZW1vdmVNb2RlbE5vZGUiLCJjYXRjaCIsImVyciIsImNvbnNvbGUiLCJ3YXJuIiwiJG5vZGUiLCJnZXRFbGVtZW50QnlJZCIsInJlbW92ZUNoaWxkIl0sIm1hcHBpbmdzIjoiO0FBQUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBLG1EQUEyQyxjQUFjOztBQUV6RDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQUs7QUFDTDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLG1DQUEyQiwwQkFBMEIsRUFBRTtBQUN2RCx5Q0FBaUMsZUFBZTtBQUNoRDtBQUNBO0FBQ0E7O0FBRUE7QUFDQSw4REFBc0QsK0RBQStEOztBQUVySDtBQUNBOztBQUVBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7O0FDaEVBLFNBQVNBLElBQVQsR0FBNkQ7QUFBQSxNQUEvQ0MsSUFBK0MsdUVBQXhDLEVBQXdDO0FBQUEsTUFBcENDLE9BQW9DLHVFQUExQixFQUEwQjtBQUFBLE1BQXRCQyxZQUFzQix1RUFBUCxLQUFPOztBQUMzRCxNQUFNQyxNQUFNLElBQUlDLGNBQUosRUFBWjtBQUNBRCxNQUFJRSxJQUFKLENBQVNKLFFBQVFLLE1BQVIsSUFBa0IsS0FBM0IsRUFBa0NOLElBQWxDLEVBQXdDLElBQXhDO0FBQ0EsTUFBSUMsUUFBUU0sT0FBWixFQUFxQjtBQUFFQyxrQkFBY0wsR0FBZCxFQUFtQkYsUUFBUU0sT0FBM0I7QUFBc0M7QUFDN0RKLE1BQUlNLElBQUosQ0FBU1IsUUFBUVMsSUFBakI7O0FBRUEsU0FBTyxJQUFJQyxPQUFKLENBQVksVUFBQ0MsT0FBRCxFQUFVQyxNQUFWLEVBQXFCO0FBQ3RDVixRQUFJVyxrQkFBSixHQUF5QixZQUFXO0FBQ2xDLFVBQUdYLElBQUlZLFVBQUosSUFBa0IsQ0FBckIsRUFBd0I7QUFDdEIsWUFBR1osSUFBSWEsTUFBSixJQUFjLEdBQWpCLEVBQXNCO0FBQ3BCLGNBQUlkLFlBQUosRUFBa0I7QUFDaEJVLG9CQUFRVCxHQUFSO0FBQ0QsV0FGRCxNQUVPO0FBQ0xTLG9CQUFRVCxJQUFJYyxZQUFaO0FBQ0Q7QUFDRixTQU5ELE1BTU87QUFDTEosaUJBQU9WLElBQUllLFVBQVg7QUFDRDtBQUNGO0FBQ0YsS0FaRDtBQWFELEdBZE0sQ0FBUDtBQWVEOztBQUVELFNBQVNWLGFBQVQsQ0FBdUJMLEdBQXZCLEVBQTRCSSxPQUE1QixFQUFxQztBQUNuQyxPQUFLLElBQUlZLE1BQVQsSUFBbUJaLE9BQW5CLEVBQTRCO0FBQzFCSixRQUFJaUIsZ0JBQUosQ0FBcUJELE1BQXJCLEVBQTZCWixRQUFRWSxNQUFSLENBQTdCO0FBQ0Q7QUFDRjs7a0JBRWNwQixJOzs7Ozs7Ozs7O0FDM0JmOzs7Ozs7QUFFQSxJQUFNc0IsY0FBY0MsU0FBU0MsYUFBVCxDQUF1QixjQUF2QixDQUFwQixDLENBSkE7O0FBS0FGLFlBQVlHLGdCQUFaLENBQTZCLE9BQTdCLEVBQXNDQyxXQUF0Qzs7QUFFQSxTQUFTQSxXQUFULENBQXFCQyxDQUFyQixFQUF3QjtBQUN0QixNQUFJQSxFQUFFQyxNQUFGLENBQVNDLFNBQVQsQ0FBbUJDLFFBQW5CLENBQTRCLHVCQUE1QixDQUFKLEVBQTBEO0FBQ3hELFFBQU1DLE9BQU9KLEVBQUVDLE1BQWY7QUFDQSxRQUFNSSxLQUFLRCxLQUFLRSxPQUFMLENBQWFELEVBQXhCOztBQUVBLDJDQUFzQkEsRUFBdEIsRUFBNEI7QUFDMUJ6QixjQUFRLFFBRGtCO0FBRTFCQyxlQUFTLENBQUMsRUFBRSxnQkFBZ0Isa0JBQWxCLEVBQUQ7QUFGaUIsS0FBNUIsRUFJQzBCLElBSkQsQ0FJTSxVQUFDQyxHQUFELEVBQVM7QUFDYixVQUFNeEIsT0FBT3lCLEtBQUtDLEtBQUwsQ0FBV0YsR0FBWCxDQUFiO0FBQ0FHLHNCQUFnQk4sRUFBaEI7QUFDRCxLQVBELEVBUUNPLEtBUkQsQ0FRTyxVQUFDQyxHQUFELEVBQVM7QUFDZEMsY0FBUUMsSUFBUixDQUFhRixHQUFiO0FBQ0QsS0FWRDtBQVdEO0FBQ0Y7O0FBRUQsU0FBU0YsZUFBVCxDQUF5Qk4sRUFBekIsRUFBNkI7QUFDM0IsTUFBTVcsUUFBUXBCLFNBQVNxQixjQUFULFlBQWlDWixFQUFqQyxDQUFkO0FBQ0FWLGNBQVl1QixXQUFaLENBQXdCRixLQUF4QjtBQUNELEMiLCJmaWxlIjoibW9kZWxzLmJ1bmRsZS5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGlkZW50aXR5IGZ1bmN0aW9uIGZvciBjYWxsaW5nIGhhcm1vbnkgaW1wb3J0cyB3aXRoIHRoZSBjb3JyZWN0IGNvbnRleHRcbiBcdF9fd2VicGFja19yZXF1aXJlX18uaSA9IGZ1bmN0aW9uKHZhbHVlKSB7IHJldHVybiB2YWx1ZTsgfTtcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7XG4gXHRcdFx0XHRjb25maWd1cmFibGU6IGZhbHNlLFxuIFx0XHRcdFx0ZW51bWVyYWJsZTogdHJ1ZSxcbiBcdFx0XHRcdGdldDogZ2V0dGVyXG4gXHRcdFx0fSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gMTQpO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIHdlYnBhY2svYm9vdHN0cmFwIGZhMDdmNmEwM2I4M2M1YzkyZjNjIiwiZnVuY3Rpb24gYWpheChwYXRoID0gJycsIG9wdGlvbnMgPSB7fSwgZnVsbFJlc3BvbnNlID0gZmFsc2UpIHtcclxuICBjb25zdCB4aHIgPSBuZXcgWE1MSHR0cFJlcXVlc3QoKTtcclxuICB4aHIub3BlbihvcHRpb25zLm1ldGhvZCB8fCAnR0VUJywgcGF0aCwgdHJ1ZSk7XHJcbiAgaWYgKG9wdGlvbnMuaGVhZGVycykgeyBzZXRYSFJIZWFkZXJzKHhociwgb3B0aW9ucy5oZWFkZXJzKTsgfVxyXG4gIHhoci5zZW5kKG9wdGlvbnMuZGF0YSk7XHJcblxyXG4gIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XHJcbiAgICB4aHIub25yZWFkeXN0YXRlY2hhbmdlID0gZnVuY3Rpb24oKSB7XHJcbiAgICAgIGlmKHhoci5yZWFkeVN0YXRlID09IDQpIHtcclxuICAgICAgICBpZih4aHIuc3RhdHVzID09IDIwMCkge1xyXG4gICAgICAgICAgaWYgKGZ1bGxSZXNwb25zZSkge1xyXG4gICAgICAgICAgICByZXNvbHZlKHhocik7XHJcbiAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICByZXNvbHZlKHhoci5yZXNwb25zZVRleHQpO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICByZWplY3QoeGhyLnN0YXR1c1RleHQpO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH0pXHJcbn1cclxuXHJcbmZ1bmN0aW9uIHNldFhIUkhlYWRlcnMoeGhyLCBoZWFkZXJzKSB7XHJcbiAgZm9yIChsZXQgaGVhZGVyIGluIGhlYWRlcnMpIHtcclxuICAgIHhoci5zZXRSZXF1ZXN0SGVhZGVyKGhlYWRlciwgaGVhZGVyc1toZWFkZXJdKTtcclxuICB9XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IGFqYXg7XHJcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3V0aWxzL2FqYXguanMiLCIvLyBpbXBvcnQgJy4uLy4uL3Nhc3MvY29tbW9uLnNjc3MnO1xyXG5cclxuaW1wb3J0IGFqYXggZnJvbSAnLi4vdXRpbHMvYWpheC5qcyc7XHJcblxyXG5jb25zdCAkbW9kZWxzTGlzdCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5tb2RlbHMtbGlzdCcpO1xyXG4kbW9kZWxzTGlzdC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIHJlbW92ZU1vZGVsKTtcclxuXHJcbmZ1bmN0aW9uIHJlbW92ZU1vZGVsKGUpIHtcclxuICBpZiAoZS50YXJnZXQuY2xhc3NMaXN0LmNvbnRhaW5zKCdtb2RlbF9fY29udHJvbC1kZWxldGUnKSkge1xyXG4gICAgY29uc3QgJGJ0biA9IGUudGFyZ2V0O1xyXG4gICAgY29uc3QgaWQgPSAkYnRuLmRhdGFzZXQuaWQ7XHJcblxyXG4gICAgYWpheChgL2FkbWluL21vZGVscy8ke2lkfWAsIHtcclxuICAgICAgbWV0aG9kOiAnREVMRVRFJyxcclxuICAgICAgaGVhZGVyczogW3sgJ0NvbnRlbnQtdHlwZSc6ICdhcHBsaWNhdGlvbi9qc29uJyB9XSxcclxuICAgIH0pXHJcbiAgICAudGhlbigocmVzKSA9PiB7XHJcbiAgICAgIGNvbnN0IGRhdGEgPSBKU09OLnBhcnNlKHJlcyk7XHJcbiAgICAgIHJlbW92ZU1vZGVsTm9kZShpZCk7XHJcbiAgICB9KVxyXG4gICAgLmNhdGNoKChlcnIpID0+IHtcclxuICAgICAgY29uc29sZS53YXJuKGVycik7XHJcbiAgICB9KTtcclxuICB9XHJcbn1cclxuXHJcbmZ1bmN0aW9uIHJlbW92ZU1vZGVsTm9kZShpZCkge1xyXG4gIGNvbnN0ICRub2RlID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoYG1vZGVsLSR7aWR9YCk7XHJcbiAgJG1vZGVsc0xpc3QucmVtb3ZlQ2hpbGQoJG5vZGUpO1xyXG59XHJcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2FkbWluL21vZGVscy5qcyJdLCJzb3VyY2VSb290IjoiIn0=