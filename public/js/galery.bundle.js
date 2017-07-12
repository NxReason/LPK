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
/******/ 	return __webpack_require__(__webpack_require__.s = 30);
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

/***/ 30:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


__webpack_require__(56);

var _ajax = __webpack_require__(0);

var _ajax2 = _interopRequireDefault(_ajax);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var $imgLabel = document.querySelector('#new-image-label');
var $imgInput = document.querySelector('#new-image-input');

$imgInput.addEventListener('change', function (e) {
  var content = '';
  if (e.target.files) {
    content = e.target.value.split('\\').pop();
  } else {
    content = 'Изображение';
  }
  $imgLabel.querySelector('span').textContent = content;
});

var $imgName = document.querySelector('.new-image-name');
var $newImageButton = document.querySelector('.new-image-save');
$newImageButton.addEventListener('click', sendImage);

function sendImage() {
  var name = $imgName.value;
  if (!isFiles($imgInput) || !name) {
    console.warn('All fields are required');
    return;
  }
  var formdata = new FormData();
  formdata.append('name', name);
  formdata.append('img', $imgInput.files[0]);

  (0, _ajax2.default)('/galery/images', {
    method: 'POST',
    headers: [{ 'Content-type': 'multipart/form-data' }],
    data: formdata
  }).then(function (res) {
    console.log(res);
  }).catch(function (err) {
    console.warn(err);
  });
}

function isFiles($input) {
  return $input.files.length >= 1;
}

/***/ }),

/***/ 56:
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgMmEzMDY4NDJjNjkxNDQwNDY1MjYiLCJ3ZWJwYWNrOi8vLy4vdXRpbHMvYWpheC5qcyIsIndlYnBhY2s6Ly8vLi9jYWQvZ2FsZXJ5LmpzIiwid2VicGFjazovLy8uLi9zYXNzL2dhbGVyeS5zY3NzIl0sIm5hbWVzIjpbImFqYXgiLCJwYXRoIiwib3B0aW9ucyIsImZ1bGxSZXNwb25zZSIsInhociIsIlhNTEh0dHBSZXF1ZXN0Iiwib3BlbiIsIm1ldGhvZCIsImhlYWRlcnMiLCJzZXRYSFJIZWFkZXJzIiwic2VuZCIsImRhdGEiLCJQcm9taXNlIiwicmVzb2x2ZSIsInJlamVjdCIsIm9ucmVhZHlzdGF0ZWNoYW5nZSIsInJlYWR5U3RhdGUiLCJzdGF0dXMiLCJyZXNwb25zZVRleHQiLCJzdGF0dXNUZXh0IiwiaGVhZGVyIiwic2V0UmVxdWVzdEhlYWRlciIsIiRpbWdMYWJlbCIsImRvY3VtZW50IiwicXVlcnlTZWxlY3RvciIsIiRpbWdJbnB1dCIsImFkZEV2ZW50TGlzdGVuZXIiLCJlIiwiY29udGVudCIsInRhcmdldCIsImZpbGVzIiwidmFsdWUiLCJzcGxpdCIsInBvcCIsInRleHRDb250ZW50IiwiJGltZ05hbWUiLCIkbmV3SW1hZ2VCdXR0b24iLCJzZW5kSW1hZ2UiLCJuYW1lIiwiaXNGaWxlcyIsImNvbnNvbGUiLCJ3YXJuIiwiZm9ybWRhdGEiLCJGb3JtRGF0YSIsImFwcGVuZCIsInRoZW4iLCJyZXMiLCJsb2ciLCJjYXRjaCIsImVyciIsIiRpbnB1dCIsImxlbmd0aCJdLCJtYXBwaW5ncyI6IjtBQUFBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBLG1EQUEyQyxjQUFjOztBQUV6RDtBQUNBO0FBQ0E7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LEtBQWhCLEVBQXVCbkIsVUFBVUssS0FBVixDQUFnQixDQUFoQixDQUF2Qjs7QUFFQSxzQkFBSyxnQkFBTCxFQUF1QjtBQUNyQnZCLFlBQVEsTUFEYTtBQUVyQkMsYUFBUyxDQUFDLEVBQUUsZ0JBQWdCLHFCQUFsQixFQUFELENBRlk7QUFHckJHLFVBQU0rQjtBQUhlLEdBQXZCLEVBS0NHLElBTEQsQ0FLTSxVQUFDQyxHQUFELEVBQVM7QUFDYk4sWUFBUU8sR0FBUixDQUFZRCxHQUFaO0FBQ0QsR0FQRCxFQVFDRSxLQVJELENBUU8sVUFBQ0MsR0FBRCxFQUFTO0FBQ2RULFlBQVFDLElBQVIsQ0FBYVEsR0FBYjtBQUNELEdBVkQ7QUFXRDs7QUFFRCxTQUFTVixPQUFULENBQWlCVyxNQUFqQixFQUF5QjtBQUN2QixTQUFRQSxPQUFPcEIsS0FBUCxDQUFhcUIsTUFBYixJQUF1QixDQUEvQjtBQUNELEM7Ozs7Ozs7QUM3Q0QseUMiLCJmaWxlIjoiZ2FsZXJ5LmJ1bmRsZS5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKVxuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuXG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBpZGVudGl0eSBmdW5jdGlvbiBmb3IgY2FsbGluZyBoYXJtb255IGltcG9ydHMgd2l0aCB0aGUgY29ycmVjdCBjb250ZXh0XG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmkgPSBmdW5jdGlvbih2YWx1ZSkgeyByZXR1cm4gdmFsdWU7IH07XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwge1xuIFx0XHRcdFx0Y29uZmlndXJhYmxlOiBmYWxzZSxcbiBcdFx0XHRcdGVudW1lcmFibGU6IHRydWUsXG4gXHRcdFx0XHRnZXQ6IGdldHRlclxuIFx0XHRcdH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IDMwKTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyB3ZWJwYWNrL2Jvb3RzdHJhcCAyYTMwNjg0MmM2OTE0NDA0NjUyNiIsImZ1bmN0aW9uIGFqYXgocGF0aCA9ICcnLCBvcHRpb25zID0ge30sIGZ1bGxSZXNwb25zZSA9IGZhbHNlKSB7XHJcbiAgY29uc3QgeGhyID0gbmV3IFhNTEh0dHBSZXF1ZXN0KCk7XHJcbiAgeGhyLm9wZW4ob3B0aW9ucy5tZXRob2QgfHwgJ0dFVCcsIHBhdGgsIHRydWUpO1xyXG4gIGlmIChvcHRpb25zLmhlYWRlcnMpIHsgc2V0WEhSSGVhZGVycyh4aHIsIG9wdGlvbnMuaGVhZGVycyk7IH1cclxuICB4aHIuc2VuZChvcHRpb25zLmRhdGEpO1xyXG5cclxuICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xyXG4gICAgeGhyLm9ucmVhZHlzdGF0ZWNoYW5nZSA9IGZ1bmN0aW9uKCkge1xyXG4gICAgICBpZih4aHIucmVhZHlTdGF0ZSA9PSA0KSB7XHJcbiAgICAgICAgaWYoeGhyLnN0YXR1cyA9PSAyMDApIHtcclxuICAgICAgICAgIGlmIChmdWxsUmVzcG9uc2UpIHtcclxuICAgICAgICAgICAgcmVzb2x2ZSh4aHIpO1xyXG4gICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgcmVzb2x2ZSh4aHIucmVzcG9uc2VUZXh0KTtcclxuICAgICAgICAgIH1cclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgcmVqZWN0KHhoci5zdGF0dXNUZXh0KTtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9KVxyXG59XHJcblxyXG5mdW5jdGlvbiBzZXRYSFJIZWFkZXJzKHhociwgaGVhZGVycykge1xyXG4gIGZvciAobGV0IGhlYWRlciBpbiBoZWFkZXJzKSB7XHJcbiAgICB4aHIuc2V0UmVxdWVzdEhlYWRlcihoZWFkZXIsIGhlYWRlcnNbaGVhZGVyXSk7XHJcbiAgfVxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBhamF4O1xyXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi91dGlscy9hamF4LmpzIiwiaW1wb3J0ICcuLi8uLi9zYXNzL2dhbGVyeS5zY3NzJztcclxuaW1wb3J0IGFqYXggZnJvbSAnLi4vdXRpbHMvYWpheC5qcyc7XHJcblxyXG5jb25zdCAkaW1nTGFiZWwgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjbmV3LWltYWdlLWxhYmVsJyk7XHJcbmNvbnN0ICRpbWdJbnB1dCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNuZXctaW1hZ2UtaW5wdXQnKTtcclxuXHJcbiRpbWdJbnB1dC5hZGRFdmVudExpc3RlbmVyKCdjaGFuZ2UnLCAoZSkgPT4ge1xyXG4gIGxldCBjb250ZW50ID0gJyc7XHJcbiAgaWYgKGUudGFyZ2V0LmZpbGVzKSB7XHJcbiAgICBjb250ZW50ID0gZS50YXJnZXQudmFsdWUuc3BsaXQoJ1xcXFwnKS5wb3AoKTtcclxuICB9IGVsc2Uge1xyXG4gICAgY29udGVudCA9ICfQmNC30L7QsdGA0LDQttC10L3QuNC1JztcclxuICB9XHJcbiAgJGltZ0xhYmVsLnF1ZXJ5U2VsZWN0b3IoJ3NwYW4nKS50ZXh0Q29udGVudCA9IGNvbnRlbnQ7XHJcbn0pO1xyXG5cclxuY29uc3QgJGltZ05hbWUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcubmV3LWltYWdlLW5hbWUnKTtcclxuY29uc3QgJG5ld0ltYWdlQnV0dG9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLm5ldy1pbWFnZS1zYXZlJyk7XHJcbiRuZXdJbWFnZUJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIHNlbmRJbWFnZSk7XHJcblxyXG5mdW5jdGlvbiBzZW5kSW1hZ2UoKSB7XHJcbiAgY29uc3QgbmFtZSA9ICRpbWdOYW1lLnZhbHVlO1xyXG4gIGlmICghaXNGaWxlcygkaW1nSW5wdXQpIHx8ICFuYW1lKSB7XHJcbiAgICBjb25zb2xlLndhcm4oJ0FsbCBmaWVsZHMgYXJlIHJlcXVpcmVkJyk7XHJcbiAgICByZXR1cm47XHJcbiAgfVxyXG4gIGNvbnN0IGZvcm1kYXRhID0gbmV3IEZvcm1EYXRhKCk7XHJcbiAgZm9ybWRhdGEuYXBwZW5kKCduYW1lJywgbmFtZSk7XHJcbiAgZm9ybWRhdGEuYXBwZW5kKCdpbWcnLCAkaW1nSW5wdXQuZmlsZXNbMF0pO1xyXG5cclxuICBhamF4KCcvZ2FsZXJ5L2ltYWdlcycsIHtcclxuICAgIG1ldGhvZDogJ1BPU1QnLFxyXG4gICAgaGVhZGVyczogW3sgJ0NvbnRlbnQtdHlwZSc6ICdtdWx0aXBhcnQvZm9ybS1kYXRhJyB9XSxcclxuICAgIGRhdGE6IGZvcm1kYXRhLFxyXG4gIH0pXHJcbiAgLnRoZW4oKHJlcykgPT4ge1xyXG4gICAgY29uc29sZS5sb2cocmVzKTtcclxuICB9KVxyXG4gIC5jYXRjaCgoZXJyKSA9PiB7XHJcbiAgICBjb25zb2xlLndhcm4oZXJyKTtcclxuICB9KTtcclxufVxyXG5cclxuZnVuY3Rpb24gaXNGaWxlcygkaW5wdXQpIHsgXHJcbiAgcmV0dXJuICgkaW5wdXQuZmlsZXMubGVuZ3RoID49IDEpO1xyXG59XHJcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2NhZC9nYWxlcnkuanMiLCIvLyByZW1vdmVkIGJ5IGV4dHJhY3QtdGV4dC13ZWJwYWNrLXBsdWdpblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4uL3Nhc3MvZ2FsZXJ5LnNjc3Ncbi8vIG1vZHVsZSBpZCA9IDU2XG4vLyBtb2R1bGUgY2h1bmtzID0gNyJdLCJzb3VyY2VSb290IjoiIn0=