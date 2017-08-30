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
/******/ 	return __webpack_require__(__webpack_require__.s = 17);
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

/***/ 1:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
var nodeFactory = function nodeFactory() {
  var type = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'div';
  var params = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

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

/***/ }),

/***/ 10:
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ 17:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


__webpack_require__(10);

var _ajax = __webpack_require__(0);

var _ajax2 = _interopRequireDefault(_ajax);

var _nodeFactory = __webpack_require__(1);

var _nodeFactory2 = _interopRequireDefault(_nodeFactory);

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
    var img = JSON.parse(res);
    addImageNode(img);
  }).catch(function (err) {
    console.warn(err);
  });
}

function isFiles($input) {
  return $input.files.length >= 1;
}

var $imagesList = document.querySelector('.images-list-ul');
function addImageNode(img) {
  var $li = (0, _nodeFactory2.default)('li', { classList: ['image-item'] });

  var $span = (0, _nodeFactory2.default)('span', { classList: ['image-item-name'], textContent: img.name });
  var $a = (0, _nodeFactory2.default)('a', {
    attrs: { href: '/uploads/' + img.url, target: '_blank' }
  });
  var $iconWrapper = (0, _nodeFactory2.default)('span', { classList: ['icon-wrapper'] });
  var $icon = (0, _nodeFactory2.default)('i', { classList: ['icon', 'icon-image'] });

  $iconWrapper.appendChild($icon);
  $a.appendChild($iconWrapper);
  $li.appendChild($span);
  $li.appendChild($a);

  $imagesList.appendChild($li);
}

/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgMDJjMTk4MWExMDgxNDg2ZjlmNjYiLCJ3ZWJwYWNrOi8vLy4vdXRpbHMvYWpheC5qcyIsIndlYnBhY2s6Ly8vLi91dGlscy9ub2RlRmFjdG9yeS5qcyIsIndlYnBhY2s6Ly8vLi4vc2Fzcy9nYWxlcnkuc2NzcyIsIndlYnBhY2s6Ly8vLi9jYWQvZ2FsZXJ5LmpzIl0sIm5hbWVzIjpbImFqYXgiLCJwYXRoIiwib3B0aW9ucyIsImZ1bGxSZXNwb25zZSIsInhociIsIlhNTEh0dHBSZXF1ZXN0Iiwib3BlbiIsIm1ldGhvZCIsImhlYWRlcnMiLCJzZXRYSFJIZWFkZXJzIiwic2VuZCIsImRhdGEiLCJQcm9taXNlIiwicmVzb2x2ZSIsInJlamVjdCIsIm9ucmVhZHlzdGF0ZWNoYW5nZSIsInJlYWR5U3RhdGUiLCJzdGF0dXMiLCJyZXNwb25zZVRleHQiLCJzdGF0dXNUZXh0IiwiaGVhZGVyIiwic2V0UmVxdWVzdEhlYWRlciIsIm5vZGVGYWN0b3J5IiwidHlwZSIsInBhcmFtcyIsIm5vZGUiLCJkb2N1bWVudCIsImNyZWF0ZUVsZW1lbnQiLCJhcHBlbmRDbGFzc2VzIiwiYXBwZW5kQXR0cnMiLCJpbnNlcnRUZXh0Q29udGVudCIsImNsYXNzTGlzdCIsImZvckVhY2giLCJhZGQiLCJjbGFzc05hbWUiLCJhdHRycyIsImF0dHJOYW1lcyIsIk9iamVjdCIsImtleXMiLCJzZXRBdHRyaWJ1dGUiLCJhdHRyTmFtZSIsInRleHRDb250ZW50IiwiJGltZ0xhYmVsIiwicXVlcnlTZWxlY3RvciIsIiRpbWdJbnB1dCIsImFkZEV2ZW50TGlzdGVuZXIiLCJlIiwiY29udGVudCIsInRhcmdldCIsImZpbGVzIiwidmFsdWUiLCJzcGxpdCIsInBvcCIsIiRpbWdOYW1lIiwiJG5ld0ltYWdlQnV0dG9uIiwic2VuZEltYWdlIiwibmFtZSIsImlzRmlsZXMiLCJjb25zb2xlIiwid2FybiIsImZvcm1kYXRhIiwiRm9ybURhdGEiLCJhcHBlbmQiLCJ0aGVuIiwicmVzIiwiaW1nIiwiSlNPTiIsInBhcnNlIiwiYWRkSW1hZ2VOb2RlIiwiY2F0Y2giLCJlcnIiLCIkaW5wdXQiLCJsZW5ndGgiLCIkaW1hZ2VzTGlzdCIsIiRsaSIsIiRzcGFuIiwiJGEiLCJocmVmIiwidXJsIiwiJGljb25XcmFwcGVyIiwiJGljb24iLCJhcHBlbmRDaGlsZCJdLCJtYXBwaW5ncyI6IjtBQUFBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQSxtREFBMkMsY0FBYzs7QUFFekQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFLO0FBQ0w7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxtQ0FBMkIsMEJBQTBCLEVBQUU7QUFDdkQseUNBQWlDLGVBQWU7QUFDaEQ7QUFDQTtBQUNBOztBQUVBO0FBQ0EsOERBQXNELCtEQUErRDs7QUFFckg7QUFDQTs7QUFFQTtBQUNBOzs7Ozs7Ozs7Ozs7OztBQ2hFQSxTQUFTQSxJQUFULEdBQTZEO0FBQUEsTUFBL0NDLElBQStDLHVFQUF4QyxFQUF3QztBQUFBLE1BQXBDQyxPQUFvQyx1RUFBMUIsRUFBMEI7QUFBQSxNQUF0QkMsWUFBc0IsdUVBQVAsS0FBTzs7QUFDM0QsTUFBTUMsTUFBTSxJQUFJQyxjQUFKLEVBQVo7QUFDQUQsTUFBSUUsSUFBSixDQUFTSixRQUFRSyxNQUFSLElBQWtCLEtBQTNCLEVBQWtDTixJQUFsQyxFQUF3QyxJQUF4QztBQUNBLE1BQUlDLFFBQVFNLE9BQVosRUFBcUI7QUFBRUMsa0JBQWNMLEdBQWQsRUFBbUJGLFFBQVFNLE9BQTNCO0FBQXNDO0FBQzdESixNQUFJTSxJQUFKLENBQVNSLFFBQVFTLElBQWpCOztBQUVBLFNBQU8sSUFBSUMsT0FBSixDQUFZLFVBQUNDLE9BQUQsRUFB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LENBQWIsRUFBbEIsQ0FBWjs7QUFFQSxNQUFNNEMsUUFBUSwyQkFBWSxNQUFaLEVBQW9CLEVBQUU1QyxXQUFXLENBQUMsaUJBQUQsQ0FBYixFQUFrQ1UsYUFBYXdCLElBQUlULElBQW5ELEVBQXBCLENBQWQ7QUFDQSxNQUFNb0IsS0FBSywyQkFBWSxHQUFaLEVBQWdCO0FBQ3pCekMsV0FBTyxFQUFFMEMsb0JBQWtCWixJQUFJYSxHQUF4QixFQUErQjlCLFFBQVEsUUFBdkM7QUFEa0IsR0FBaEIsQ0FBWDtBQUdBLE1BQU0rQixlQUFlLDJCQUFZLE1BQVosRUFBb0IsRUFBRWhELFdBQVcsQ0FBQyxjQUFELENBQWIsRUFBcEIsQ0FBckI7QUFDQSxNQUFNaUQsUUFBUSwyQkFBWSxHQUFaLEVBQWlCLEVBQUVqRCxXQUFXLENBQUUsTUFBRixFQUFVLFlBQVYsQ0FBYixFQUFqQixDQUFkOztBQUVBZ0QsZUFBYUUsV0FBYixDQUF5QkQsS0FBekI7QUFDQUosS0FBR0ssV0FBSCxDQUFlRixZQUFmO0FBQ0FMLE1BQUlPLFdBQUosQ0FBZ0JOLEtBQWhCO0FBQ0FELE1BQUlPLFdBQUosQ0FBZ0JMLEVBQWhCOztBQUVBSCxjQUFZUSxXQUFaLENBQXdCUCxHQUF4QjtBQUNELEMiLCJmaWxlIjoiZ2FsZXJ5LmJ1bmRsZS5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGlkZW50aXR5IGZ1bmN0aW9uIGZvciBjYWxsaW5nIGhhcm1vbnkgaW1wb3J0cyB3aXRoIHRoZSBjb3JyZWN0IGNvbnRleHRcbiBcdF9fd2VicGFja19yZXF1aXJlX18uaSA9IGZ1bmN0aW9uKHZhbHVlKSB7IHJldHVybiB2YWx1ZTsgfTtcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7XG4gXHRcdFx0XHRjb25maWd1cmFibGU6IGZhbHNlLFxuIFx0XHRcdFx0ZW51bWVyYWJsZTogdHJ1ZSxcbiBcdFx0XHRcdGdldDogZ2V0dGVyXG4gXHRcdFx0fSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gMTcpO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIHdlYnBhY2svYm9vdHN0cmFwIDAyYzE5ODFhMTA4MTQ4NmY5ZjY2IiwiZnVuY3Rpb24gYWpheChwYXRoID0gJycsIG9wdGlvbnMgPSB7fSwgZnVsbFJlc3BvbnNlID0gZmFsc2UpIHtcclxuICBjb25zdCB4aHIgPSBuZXcgWE1MSHR0cFJlcXVlc3QoKTtcclxuICB4aHIub3BlbihvcHRpb25zLm1ldGhvZCB8fCAnR0VUJywgcGF0aCwgdHJ1ZSk7XHJcbiAgaWYgKG9wdGlvbnMuaGVhZGVycykgeyBzZXRYSFJIZWFkZXJzKHhociwgb3B0aW9ucy5oZWFkZXJzKTsgfVxyXG4gIHhoci5zZW5kKG9wdGlvbnMuZGF0YSk7XHJcblxyXG4gIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XHJcbiAgICB4aHIub25yZWFkeXN0YXRlY2hhbmdlID0gZnVuY3Rpb24oKSB7XHJcbiAgICAgIGlmKHhoci5yZWFkeVN0YXRlID09IDQpIHtcclxuICAgICAgICBpZih4aHIuc3RhdHVzID09IDIwMCkge1xyXG4gICAgICAgICAgaWYgKGZ1bGxSZXNwb25zZSkge1xyXG4gICAgICAgICAgICByZXNvbHZlKHhocik7XHJcbiAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICByZXNvbHZlKHhoci5yZXNwb25zZVRleHQpO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICByZWplY3QoeGhyLnN0YXR1c1RleHQpO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH0pXHJcbn1cclxuXHJcbmZ1bmN0aW9uIHNldFhIUkhlYWRlcnMoeGhyLCBoZWFkZXJzKSB7XHJcbiAgZm9yIChsZXQgaGVhZGVyIGluIGhlYWRlcnMpIHtcclxuICAgIHhoci5zZXRSZXF1ZXN0SGVhZGVyKGhlYWRlciwgaGVhZGVyc1toZWFkZXJdKTtcclxuICB9XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IGFqYXg7XHJcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3V0aWxzL2FqYXguanMiLCJjb25zdCBub2RlRmFjdG9yeSA9IGZ1bmN0aW9uKHR5cGUgPSAnZGl2JywgcGFyYW1zID0ge30pIHtcclxuICBjb25zdCBub2RlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCh0eXBlKTtcclxuXHJcbiAgYXBwZW5kQ2xhc3Nlcyhub2RlLCBwYXJhbXMpO1xyXG4gIGFwcGVuZEF0dHJzKG5vZGUsIHBhcmFtcyk7XHJcbiAgaW5zZXJ0VGV4dENvbnRlbnQobm9kZSwgcGFyYW1zKTtcclxuXHJcbiAgcmV0dXJuIG5vZGU7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGFwcGVuZENsYXNzZXMobm9kZSwgeyBjbGFzc0xpc3QgfSkge1xyXG4gIGlmIChjbGFzc0xpc3QgJiYgY2xhc3NMaXN0LmZvckVhY2gpIHtcclxuICAgIGNsYXNzTGlzdC5mb3JFYWNoKGNsYXNzTmFtZSA9PiBub2RlLmNsYXNzTGlzdC5hZGQoY2xhc3NOYW1lKSk7XHJcbiAgfVxyXG59XHJcblxyXG5mdW5jdGlvbiBhcHBlbmRBdHRycyhub2RlLCB7IGF0dHJzIH0pIHtcclxuICBpZiAoYXR0cnMpIHtcclxuICAgIGNvbnN0IGF0dHJOYW1lcyA9IE9iamVjdC5rZXlzKGF0dHJzKTtcclxuICAgIGF0dHJOYW1lcy5mb3JFYWNoKGF0dHJOYW1lID0+IG5vZGUuc2V0QXR0cmlidXRlKGF0dHJOYW1lLCBhdHRyc1thdHRyTmFtZV0pKTtcclxuICB9XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGluc2VydFRleHRDb250ZW50KG5vZGUsIHsgdGV4dENvbnRlbnQgPSBcIlwiIH0pIHtcclxuICBub2RlLnRleHRDb250ZW50ID0gdGV4dENvbnRlbnQ7XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IG5vZGVGYWN0b3J5O1xyXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi91dGlscy9ub2RlRmFjdG9yeS5qcyIsIi8vIHJlbW92ZWQgYnkgZXh0cmFjdC10ZXh0LXdlYnBhY2stcGx1Z2luXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi4vc2Fzcy9nYWxlcnkuc2Nzc1xuLy8gbW9kdWxlIGlkID0gMTBcbi8vIG1vZHVsZSBjaHVua3MgPSAyIiwiaW1wb3J0ICcuLi8uLi9zYXNzL2dhbGVyeS5zY3NzJztcclxuaW1wb3J0IGFqYXggZnJvbSAnLi4vdXRpbHMvYWpheCc7XHJcbmltcG9ydCBub2RlRmFjdG9yeSBmcm9tICcuLi91dGlscy9ub2RlRmFjdG9yeSc7XHJcblxyXG5jb25zdCAkaW1nTGFiZWwgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjbmV3LWltYWdlLWxhYmVsJyk7XHJcbmNvbnN0ICRpbWdJbnB1dCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNuZXctaW1hZ2UtaW5wdXQnKTtcclxuXHJcbiRpbWdJbnB1dC5hZGRFdmVudExpc3RlbmVyKCdjaGFuZ2UnLCAoZSkgPT4ge1xyXG4gIGxldCBjb250ZW50ID0gJyc7XHJcbiAgaWYgKGUudGFyZ2V0LmZpbGVzKSB7XHJcbiAgICBjb250ZW50ID0gZS50YXJnZXQudmFsdWUuc3BsaXQoJ1xcXFwnKS5wb3AoKTtcclxuICB9IGVsc2Uge1xyXG4gICAgY29udGVudCA9ICfQmNC30L7QsdGA0LDQttC10L3QuNC1JztcclxuICB9XHJcbiAgJGltZ0xhYmVsLnF1ZXJ5U2VsZWN0b3IoJ3NwYW4nKS50ZXh0Q29udGVudCA9IGNvbnRlbnQ7XHJcbn0pO1xyXG5cclxuY29uc3QgJGltZ05hbWUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcubmV3LWltYWdlLW5hbWUnKTtcclxuY29uc3QgJG5ld0ltYWdlQnV0dG9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLm5ldy1pbWFnZS1zYXZlJyk7XHJcbiRuZXdJbWFnZUJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIHNlbmRJbWFnZSk7XHJcblxyXG5mdW5jdGlvbiBzZW5kSW1hZ2UoKSB7XHJcbiAgY29uc3QgbmFtZSA9ICRpbWdOYW1lLnZhbHVlO1xyXG4gIGlmICghaXNGaWxlcygkaW1nSW5wdXQpIHx8ICFuYW1lKSB7XHJcbiAgICBjb25zb2xlLndhcm4oJ0FsbCBmaWVsZHMgYXJlIHJlcXVpcmVkJyk7XHJcbiAgICByZXR1cm47XHJcbiAgfVxyXG4gIGNvbnN0IGZvcm1kYXRhID0gbmV3IEZvcm1EYXRhKCk7XHJcbiAgZm9ybWRhdGEuYXBwZW5kKCduYW1lJywgbmFtZSk7XHJcbiAgZm9ybWRhdGEuYXBwZW5kKCdpbWcnLCAkaW1nSW5wdXQuZmlsZXNbMF0pO1xyXG5cclxuICBhamF4KCcvZ2FsZXJ5L2ltYWdlcycsIHtcclxuICAgIG1ldGhvZDogJ1BPU1QnLFxyXG4gICAgaGVhZGVyczogW3sgJ0NvbnRlbnQtdHlwZSc6ICdtdWx0aXBhcnQvZm9ybS1kYXRhJyB9XSxcclxuICAgIGRhdGE6IGZvcm1kYXRhLFxyXG4gIH0pXHJcbiAgLnRoZW4oKHJlcykgPT4ge1xyXG4gICAgY29uc3QgaW1nID0gSlNPTi5wYXJzZShyZXMpO1xyXG4gICAgYWRkSW1hZ2VOb2RlKGltZyk7XHJcbiAgfSlcclxuICAuY2F0Y2goKGVycikgPT4ge1xyXG4gICAgY29uc29sZS53YXJuKGVycik7XHJcbiAgfSk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGlzRmlsZXMoJGlucHV0KSB7IFxyXG4gIHJldHVybiAoJGlucHV0LmZpbGVzLmxlbmd0aCA+PSAxKTtcclxufVxyXG5cclxuY29uc3QgJGltYWdlc0xpc3QgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuaW1hZ2VzLWxpc3QtdWwnKTtcclxuZnVuY3Rpb24gYWRkSW1hZ2VOb2RlKGltZykge1xyXG4gIGNvbnN0ICRsaSA9IG5vZGVGYWN0b3J5KCdsaScsIHsgY2xhc3NMaXN0OiBbJ2ltYWdlLWl0ZW0nXSB9KTtcclxuXHJcbiAgY29uc3QgJHNwYW4gPSBub2RlRmFjdG9yeSgnc3BhbicsIHsgY2xhc3NMaXN0OiBbJ2ltYWdlLWl0ZW0tbmFtZSddLCB0ZXh0Q29udGVudDogaW1nLm5hbWUgfSk7XHJcbiAgY29uc3QgJGEgPSBub2RlRmFjdG9yeSgnYScse1xyXG4gICAgYXR0cnM6IHsgaHJlZjogYC91cGxvYWRzLyR7aW1nLnVybH1gLCB0YXJnZXQ6ICdfYmxhbmsnIH0sXHJcbiAgfSk7XHJcbiAgY29uc3QgJGljb25XcmFwcGVyID0gbm9kZUZhY3RvcnkoJ3NwYW4nLCB7IGNsYXNzTGlzdDogWydpY29uLXdyYXBwZXInXSB9KTtcclxuICBjb25zdCAkaWNvbiA9IG5vZGVGYWN0b3J5KCdpJywgeyBjbGFzc0xpc3Q6IFsgJ2ljb24nLCAnaWNvbi1pbWFnZScgXSB9KTtcclxuXHJcbiAgJGljb25XcmFwcGVyLmFwcGVuZENoaWxkKCRpY29uKTtcclxuICAkYS5hcHBlbmRDaGlsZCgkaWNvbldyYXBwZXIpO1xyXG4gICRsaS5hcHBlbmRDaGlsZCgkc3Bhbik7XHJcbiAgJGxpLmFwcGVuZENoaWxkKCRhKTtcclxuXHJcbiAgJGltYWdlc0xpc3QuYXBwZW5kQ2hpbGQoJGxpKTtcclxufVxyXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9jYWQvZ2FsZXJ5LmpzIl0sInNvdXJjZVJvb3QiOiIifQ==