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
/******/ 	return __webpack_require__(__webpack_require__.s = 23);
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

/***/ 16:
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ 2:
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

/***/ 23:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


__webpack_require__(16);

var _ajax = __webpack_require__(0);

var _ajax2 = _interopRequireDefault(_ajax);

var _nodeFactory = __webpack_require__(2);

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgYmQ3MzcwZGRhN2Q3MWQwNjU3OGM/NDNlZCoiLCJ3ZWJwYWNrOi8vLy4vdXRpbHMvYWpheC5qcz9lYjkwIiwid2VicGFjazovLy8uLi9zYXNzL2dhbGVyeS5zY3NzIiwid2VicGFjazovLy8uL3V0aWxzL25vZGVGYWN0b3J5LmpzP2MxNWUqIiwid2VicGFjazovLy8uL2NhZC9nYWxlcnkuanMiXSwibmFtZXMiOlsiYWpheCIsInBhdGgiLCJvcHRpb25zIiwiZnVsbFJlc3BvbnNlIiwieGhyIiwiWE1MSHR0cFJlcXVlc3QiLCJvcGVuIiwibWV0aG9kIiwiaGVhZGVycyIsInNldFhIUkhlYWRlcnMiLCJzZW5kIiwiZGF0YSIsIlByb21pc2UiLCJyZXNvbHZlIiwicmVqZWN0Iiwib25yZWFkeXN0YXRlY2hhbmdlIiwicmVhZHlTdGF0ZSIsInN0YXR1cyIsInJlc3BvbnNlVGV4dCIsInN0YXR1c1RleHQiLCJoZWFkZXIiLCJzZXRSZXF1ZXN0SGVhZGVyIiwibm9kZUZhY3RvcnkiLCJ0eXBlIiwicGFyYW1zIiwibm9kZSIsImRvY3VtZW50IiwiY3JlYXRlRWxlbWVudCIsImFwcGVuZENsYXNzZXMiLCJhcHBlbmRBdHRycyIsImluc2VydFRleHRDb250ZW50IiwiY2xhc3NMaXN0IiwiZm9yRWFjaCIsImFkZCIsImNsYXNzTmFtZSIsImF0dHJzIiwiYXR0ck5hbWVzIiwiT2JqZWN0Iiwia2V5cyIsInNldEF0dHJpYnV0ZSIsImF0dHJOYW1lIiwidGV4dENvbnRlbnQiLCIkaW1nTGFiZWwiLCJxdWVyeVNlbGVjdG9yIiwiJGltZ0lucHV0IiwiYWRkRXZlbnRMaXN0ZW5lciIsImUiLCJjb250ZW50IiwidGFyZ2V0IiwiZmlsZXMiLCJ2YWx1ZSIsInNwbGl0IiwicG9wIiwiJGltZ05hbWUiLCIkbmV3SW1hZ2VCdXR0b24iLCJzZW5kSW1hZ2UiLCJuYW1lIiwiaXNGaWxlcyIsImNvbnNvbGUiLCJ3YXJuIiwiZm9ybWRhdGEiLCJGb3JtRGF0YSIsImFwcGVuZCIsInRoZW4iLCJyZXMiLCJpbWciLCJKU09OIiwicGFyc2UiLCJhZGRJbWFnZU5vZGUiLCJjYXRjaCIsImVyciIsIiRpbnB1dCIsImxlbmd0aCIsIiRpbWFnZXNMaXN0IiwiJGxpIiwiJHNwYW4iLCIkYSIsImhyZWYiLCJ1cmwiLCIkaWNvbldyYXBwZXIiLCIkaWNvbiIsImFwcGVuZENoaWxkIl0sIm1hcHBpbmdzIjoiO0FBQUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBLG1EQUEyQyxjQUFjOztBQUV6RDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQUs7QUFDTDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLG1DQUEyQiwwQkFBMEIsRUFBRTtBQUN2RCx5Q0FBaUMsZUFBZTtBQUNoRDtBQUNBO0FBQ0E7O0FBRUE7QUFDQSw4REFBc0QsK0RBQStEOztBQUVySDtBQUNBOztBQUVBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7O0FDaEVBLFNBQVNBLElBQVQsR0FBNkQ7QUFBQSxNQUEvQ0MsSUFBK0MsdUVBQXhDLEVBQXdDO0FBQUEsTUFBcENDLE9BQW9DLHVFQUExQixFQUEwQjtBQUFBLE1BQXRCQyxZQUFzQix1RUFBUCxLQUFPOztBQUMzRCxNQUFNQyxNQUFNLElBQUlDLGNBQUosRUFBWjtBQUNBRCxNQUFJRSxJQUFKLENBQVNKLFFBQVFLLE1BQVIsSUFBa0IsS0FBM0IsRUFBa0NOLElBQWxDLEVBQXdDLElBQXhDO0FBQ0EsTUFBSUMsUUFBUU0sT0FBWixFQUFxQjtBQUFFQyxrQkFBY0wsR0FBZCxFQUFtQkYsUUFBUU0sT0FBM0I7QUFBc0M7QUFDN0RKLE1BQUlNLElBQUosQ0FBU1IsUUFBUVMsSUFBakI7O0FBRUEsU0FBTyxJQUFJQyxPQUFKLENBQVksVUFBQ0MsT0FBRCxFQUFVQyxNQUFWLEVBQXFCO0FBQ3RDVixRQUFJVyxrQkFBSixHQUF5QixZQUFXO0FBQ2xDLFVBQUdYLElBQUlZLFVBQUosSUFBa0IsQ0FBckIsRUFBd0I7QUFDdEIsWUFBR1osSUFBSWEsTUFBSixJQUFjLEdBQWpCLEVBQXNCO0FBQ3BCLGNBQUlkLFlBQUosRUFBa0I7QUFDaEJVLG9CQUFRVCxHQUFSO0FBQ0QsV0FGRCxNQUVPO0FBQ0xTLG9CQUFRVCxJQUFJYyxZQUFaO0FBQ0Q7QUFDRixTQU5ELE1BTU87QUFDTEosaUJBQU9WLElBQUllLFVBQVg7QUFDRDtBQUNGO0FBQ0YsS0FaRDtBQWFELEdBZE0sQ0FBUDtBQWVEOztBQUVELFNBQVNWLGFBQVQsQ0FBdUJMLEdBQXZCLEVBQTRCSSxPQUE1QixFQUFxQztBQUNuQyxPQUFLLElBQUlZLE1BQVQsSUFBbUJaLE9BQW5CLEVBQTRCO0FBQzFCSixRQUFJaUIsZ0JBQUosQ0FBcUJELE1BQXJCLEVBQTZCWixRQUFRWSxNQUFSLENBQTdCO0FBQ0Q7QUFDRjs7a0JBRWNwQixJOzs7Ozs7O0FDN0JmLHlDOzs7Ozs7Ozs7Ozs7O0FDQUEsSUFBTXNCLGNBQWMsU0FBZEEsV0FBYyxHQUFvQztBQUFBLE1BQTNCQyxJQUEyQix1RUFBcEIsS0FBb0I7QUFBQSxNQUFiQyxNQUFhLHVFQUFKLEVBQUk7O0FBQ3RELE1BQU1DLE9BQU9DLFNBQVNDLGFBQVQsQ0FBdUJKLElBQXZCLENBQWI7O0FBRUFLLGdCQUFjSCxJQUFkLEVBQW9CRCxNQUFwQjtBQUNBSyxjQUFZSixJQUFaLEVBQWtCRCxNQUFsQjtBQUNBTSxvQkFBa0JMLElBQWxCLEVBQXdCRCxNQUF4Qjs7QUFFQSxTQUFPQyxJQUFQO0FBQ0QsQ0FSRDs7QUFVQSxTQUFTRyxhQUFULENBQXVCSCxJQUF2QixRQUE0QztBQUFBLE1BQWJNLFNBQWEsUUFBYkEsU0FBYTs7QUFDMUMsTUFBSUEsYUFBYUEsVUFBVUMsT0FBM0IsRUFBb0M7QUFDbENELGNBQVVDLE9BQVYsQ0FBa0I7QUFBQSxhQUFhUCxLQUFLTSxTQUFMLENBQWVFLEdBQWYsQ0FBbUJDLFNBQW5CLENBQWI7QUFBQSxLQUFsQjtBQUNEO0FBQ0Y7O0FBRUQsU0FBU0wsV0FBVCxDQUFxQkosSUFBckIsU0FBc0M7QUFBQSxNQUFUVSxLQUFTLFNBQVRBLEtBQVM7O0FBQ3BDLE1BQUlBLEtBQUosRUFBVztBQUNULFFBQU1DLFlBQVlDLE9BQU9DLElBQVAsQ0FBWUgsS0FBWixDQUFsQjtBQUNBQyxjQUFVSixPQUFWLENBQWtCO0FBQUEsYUFBWVAsS0FBS2MsWUFBTCxDQUFrQkMsUUFBbEIsRUFBNEJMLE1BQU1LLFFBQU4sQ0FBNUIsQ0FBWjtBQUFBLEtBQWxCO0FBQ0Q7QUFDRjs7QUFFRCxTQUFTVixpQkFBVCxDQUEyQkwsSUFBM0IsU0FBdUQ7QUFBQSxnQ0FBcEJnQixXQUFvQjtBQUFBLE1BQXBCQSxXQUFvQixxQ0FBTixFQUFNOztBQUNyRGhCLE9BQUtnQixXQUFMLEdBQW1CQSxXQUFuQjtBQUNEOztrQkFFY25CLFc7Ozs7Ozs7Ozs7QUMzQmY7O0FBQ0E7Ozs7QUFDQTs7Ozs7O0FBRUEsSUFBTW9CLFlBQVloQixTQUFTaUIsYUFBVCxDQUF1QixrQkFBdkIsQ0FBbEI7QUFDQSxJQUFNQyxZQUFZbEIsU0FBU2lCLGFBQVQsQ0FBdUIsa0JBQXZCLENBQWxCOztBQUVBQyxVQUFVQyxnQkFBVixDQUEyQixRQUEzQixFQUFxQyxVQUFDQyxDQUFELEVBQU87QUFDMUMsTUFBSUMsVUFBVSxFQUFkO0FBQ0EsTUFBSUQsRUFBRUUsTUFBRixDQUFTQyxLQUFiLEVBQW9CO0FBQ2xCRixjQUFVRCxFQUFFRSxNQUFGLENBQVNFLEtBQVQsQ0FBZUMsS0FBZixDQUFxQixJQUFyQixFQUEyQkMsR0FBM0IsRUFBVjtBQUNELEdBRkQsTUFFTztBQUNMTCxjQUFVLGFBQVY7QUFDRDtBQUNETCxZQUFVQyxhQUFWLENBQXdCLE1BQXhCLEVBQWdDRixXQUFoQyxHQUE4Q00sT0FBOUM7QUFDRCxDQVJEOztBQVVBLElBQU1NLFdBQVczQixTQUFTaUIsYUFBVCxDQUF1QixpQkFBdkIsQ0FBakI7QUFDQSxJQUFNVyxrQkFBa0I1QixTQUFTaUIsYUFBVCxDQUF1QixpQkFBdkIsQ0FBeEI7QUFDQVcsZ0JBQWdCVCxnQkFBaEIsQ0FBaUMsT0FBakMsRUFBMENVLFNBQTFDOztBQUVBLFNBQVNBLFNBQVQsR0FBcUI7QUFDbkIsTUFBTUMsT0FBT0gsU0FBU0gsS0FBdEI7QUFDQSxNQUFJLENBQUNPLFFBQVFiLFNBQVIsQ0FBRCxJQUF1QixDQUFDWSxJQUE1QixFQUFrQztBQUNoQ0UsWUFBUUMsSUFBUixDQUFhLHlCQUFiO0FBQ0E7QUFDRDtBQUNELE1BQU1DLFdBQVcsSUFBSUMsUUFBSixFQUFqQjtBQUNBRCxXQUFTRSxNQUFULENBQWdCLE1BQWhCLEVBQXdCTixJQUF4QjtBQUNBSSxXQUFTRSxNQUFULENBQWdCLEtBQWhCLEVBQXVCbEIsVUFBVUssS0FBVixDQUFnQixDQUFoQixDQUF2Qjs7QUFFQSxzQkFBSyxnQkFBTCxFQUF1QjtBQUNyQjFDLFlBQVEsTUFEYTtBQUVyQkMsYUFBUyxDQUFDLEVBQUUsZ0JBQWdCLHFCQUFsQixFQUFELENBRlk7QUFHckJHLFVBQU1pRDtBQUhlLEdBQXZCLEVBS0NHLElBTEQsQ0FLTSxVQUFDQyxHQUFELEVBQVM7QUFDYixRQUFNQyxNQUFNQyxLQUFLQyxLQUFMLENBQVdILEdBQVgsQ0FBWjtBQUNBSSxpQkFBYUgsR0FBYjtBQUNELEdBUkQsRUFTQ0ksS0FURCxDQVNPLFVBQUNDLEdBQUQsRUFBUztBQUNkWixZQUFRQyxJQUFSLENBQWFXLEdBQWI7QUFDRCxHQVhEO0FBWUQ7O0FBRUQsU0FBU2IsT0FBVCxDQUFpQmMsTUFBakIsRUFBeUI7QUFDdkIsU0FBUUEsT0FBT3RCLEtBQVAsQ0FBYXVCLE1BQWIsSUFBdUIsQ0FBL0I7QUFDRDs7QUFFRCxJQUFNQyxjQUFjL0MsU0FBU2lCLGFBQVQsQ0FBdUIsaUJBQXZCLENBQXBCO0FBQ0EsU0FBU3lCLFlBQVQsQ0FBc0JILEdBQXRCLEVBQTJCO0FBQ3pCLE1BQU1TLE1BQU0sMkJBQVksSUFBWixFQUFrQixFQUFFM0MsV0FBVyxDQUFDLFlBQUQsQ0FBYixFQUFsQixDQUFaOztBQUVBLE1BQU00QyxRQUFRLDJCQUFZLE1BQVosRUFBb0IsRUFBRTVDLFdBQVcsQ0FBQyxpQkFBRCxDQUFiLEVBQWtDVSxhQUFhd0IsSUFBSVQsSUFBbkQsRUFBcEIsQ0FBZDtBQUNBLE1BQU1vQixLQUFLLDJCQUFZLEdBQVosRUFBZ0I7QUFDekJ6QyxXQUFPLEVBQUUwQyxvQkFBa0JaLElBQUlhLEdBQXhCLEVBQStCOUIsUUFBUSxRQUF2QztBQURrQixHQUFoQixDQUFYO0FBR0EsTUFBTStCLGVBQWUsMkJBQVksTUFBWixFQUFvQixFQUFFaEQsV0FBVyxDQUFDLGNBQUQsQ0FBYixFQUFwQixDQUFyQjtBQUNBLE1BQU1pRCxRQUFRLDJCQUFZLEdBQVosRUFBaUIsRUFBRWpELFdBQVcsQ0FBRSxNQUFGLEVBQVUsWUFBVixDQUFiLEVBQWpCLENBQWQ7O0FBRUFnRCxlQUFhRSxXQUFiLENBQXlCRCxLQUF6QjtBQUNBSixLQUFHSyxXQUFILENBQWVGLFlBQWY7QUFDQUwsTUFBSU8sV0FBSixDQUFnQk4sS0FBaEI7QUFDQUQsTUFBSU8sV0FBSixDQUFnQkwsRUFBaEI7O0FBRUFILGNBQVlRLFdBQVosQ0FBd0JQLEdBQXhCO0FBQ0QsQyIsImZpbGUiOiJnYWxlcnkuYnVuZGxlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gaWRlbnRpdHkgZnVuY3Rpb24gZm9yIGNhbGxpbmcgaGFybW9ueSBpbXBvcnRzIHdpdGggdGhlIGNvcnJlY3QgY29udGV4dFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5pID0gZnVuY3Rpb24odmFsdWUpIHsgcmV0dXJuIHZhbHVlOyB9O1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHtcbiBcdFx0XHRcdGNvbmZpZ3VyYWJsZTogZmFsc2UsXG4gXHRcdFx0XHRlbnVtZXJhYmxlOiB0cnVlLFxuIFx0XHRcdFx0Z2V0OiBnZXR0ZXJcbiBcdFx0XHR9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSAyMyk7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gd2VicGFjay9ib290c3RyYXAgYmQ3MzcwZGRhN2Q3MWQwNjU3OGMiLCJmdW5jdGlvbiBhamF4KHBhdGggPSAnJywgb3B0aW9ucyA9IHt9LCBmdWxsUmVzcG9uc2UgPSBmYWxzZSkge1xyXG4gIGNvbnN0IHhociA9IG5ldyBYTUxIdHRwUmVxdWVzdCgpO1xyXG4gIHhoci5vcGVuKG9wdGlvbnMubWV0aG9kIHx8ICdHRVQnLCBwYXRoLCB0cnVlKTtcclxuICBpZiAob3B0aW9ucy5oZWFkZXJzKSB7IHNldFhIUkhlYWRlcnMoeGhyLCBvcHRpb25zLmhlYWRlcnMpOyB9XHJcbiAgeGhyLnNlbmQob3B0aW9ucy5kYXRhKTtcclxuXHJcbiAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcclxuICAgIHhoci5vbnJlYWR5c3RhdGVjaGFuZ2UgPSBmdW5jdGlvbigpIHtcclxuICAgICAgaWYoeGhyLnJlYWR5U3RhdGUgPT0gNCkge1xyXG4gICAgICAgIGlmKHhoci5zdGF0dXMgPT0gMjAwKSB7XHJcbiAgICAgICAgICBpZiAoZnVsbFJlc3BvbnNlKSB7XHJcbiAgICAgICAgICAgIHJlc29sdmUoeGhyKTtcclxuICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHJlc29sdmUoeGhyLnJlc3BvbnNlVGV4dCk7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIHJlamVjdCh4aHIuc3RhdHVzVGV4dCk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfSlcclxufVxyXG5cclxuZnVuY3Rpb24gc2V0WEhSSGVhZGVycyh4aHIsIGhlYWRlcnMpIHtcclxuICBmb3IgKGxldCBoZWFkZXIgaW4gaGVhZGVycykge1xyXG4gICAgeGhyLnNldFJlcXVlc3RIZWFkZXIoaGVhZGVyLCBoZWFkZXJzW2hlYWRlcl0pO1xyXG4gIH1cclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgYWpheDtcclxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vdXRpbHMvYWpheC5qcyIsIi8vIHJlbW92ZWQgYnkgZXh0cmFjdC10ZXh0LXdlYnBhY2stcGx1Z2luXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi4vc2Fzcy9nYWxlcnkuc2Nzc1xuLy8gbW9kdWxlIGlkID0gMTZcbi8vIG1vZHVsZSBjaHVua3MgPSAyIiwiY29uc3Qgbm9kZUZhY3RvcnkgPSBmdW5jdGlvbih0eXBlID0gJ2RpdicsIHBhcmFtcyA9IHt9KSB7XHJcbiAgY29uc3Qgbm9kZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQodHlwZSk7XHJcblxyXG4gIGFwcGVuZENsYXNzZXMobm9kZSwgcGFyYW1zKTtcclxuICBhcHBlbmRBdHRycyhub2RlLCBwYXJhbXMpO1xyXG4gIGluc2VydFRleHRDb250ZW50KG5vZGUsIHBhcmFtcyk7XHJcblxyXG4gIHJldHVybiBub2RlO1xyXG59XHJcblxyXG5mdW5jdGlvbiBhcHBlbmRDbGFzc2VzKG5vZGUsIHsgY2xhc3NMaXN0IH0pIHtcclxuICBpZiAoY2xhc3NMaXN0ICYmIGNsYXNzTGlzdC5mb3JFYWNoKSB7XHJcbiAgICBjbGFzc0xpc3QuZm9yRWFjaChjbGFzc05hbWUgPT4gbm9kZS5jbGFzc0xpc3QuYWRkKGNsYXNzTmFtZSkpO1xyXG4gIH1cclxufVxyXG5cclxuZnVuY3Rpb24gYXBwZW5kQXR0cnMobm9kZSwgeyBhdHRycyB9KSB7XHJcbiAgaWYgKGF0dHJzKSB7XHJcbiAgICBjb25zdCBhdHRyTmFtZXMgPSBPYmplY3Qua2V5cyhhdHRycyk7XHJcbiAgICBhdHRyTmFtZXMuZm9yRWFjaChhdHRyTmFtZSA9PiBub2RlLnNldEF0dHJpYnV0ZShhdHRyTmFtZSwgYXR0cnNbYXR0ck5hbWVdKSk7XHJcbiAgfVxyXG59XHJcblxyXG5mdW5jdGlvbiBpbnNlcnRUZXh0Q29udGVudChub2RlLCB7IHRleHRDb250ZW50ID0gXCJcIiB9KSB7XHJcbiAgbm9kZS50ZXh0Q29udGVudCA9IHRleHRDb250ZW50O1xyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBub2RlRmFjdG9yeTtcclxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vdXRpbHMvbm9kZUZhY3RvcnkuanMiLCJpbXBvcnQgJy4uLy4uL3Nhc3MvZ2FsZXJ5LnNjc3MnO1xyXG5pbXBvcnQgYWpheCBmcm9tICcuLi91dGlscy9hamF4JztcclxuaW1wb3J0IG5vZGVGYWN0b3J5IGZyb20gJy4uL3V0aWxzL25vZGVGYWN0b3J5JztcclxuXHJcbmNvbnN0ICRpbWdMYWJlbCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNuZXctaW1hZ2UtbGFiZWwnKTtcclxuY29uc3QgJGltZ0lucHV0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI25ldy1pbWFnZS1pbnB1dCcpO1xyXG5cclxuJGltZ0lucHV0LmFkZEV2ZW50TGlzdGVuZXIoJ2NoYW5nZScsIChlKSA9PiB7XHJcbiAgbGV0IGNvbnRlbnQgPSAnJztcclxuICBpZiAoZS50YXJnZXQuZmlsZXMpIHtcclxuICAgIGNvbnRlbnQgPSBlLnRhcmdldC52YWx1ZS5zcGxpdCgnXFxcXCcpLnBvcCgpO1xyXG4gIH0gZWxzZSB7XHJcbiAgICBjb250ZW50ID0gJ9CY0LfQvtCx0YDQsNC20LXQvdC40LUnO1xyXG4gIH1cclxuICAkaW1nTGFiZWwucXVlcnlTZWxlY3Rvcignc3BhbicpLnRleHRDb250ZW50ID0gY29udGVudDtcclxufSk7XHJcblxyXG5jb25zdCAkaW1nTmFtZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5uZXctaW1hZ2UtbmFtZScpO1xyXG5jb25zdCAkbmV3SW1hZ2VCdXR0b24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcubmV3LWltYWdlLXNhdmUnKTtcclxuJG5ld0ltYWdlQnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgc2VuZEltYWdlKTtcclxuXHJcbmZ1bmN0aW9uIHNlbmRJbWFnZSgpIHtcclxuICBjb25zdCBuYW1lID0gJGltZ05hbWUudmFsdWU7XHJcbiAgaWYgKCFpc0ZpbGVzKCRpbWdJbnB1dCkgfHwgIW5hbWUpIHtcclxuICAgIGNvbnNvbGUud2FybignQWxsIGZpZWxkcyBhcmUgcmVxdWlyZWQnKTtcclxuICAgIHJldHVybjtcclxuICB9XHJcbiAgY29uc3QgZm9ybWRhdGEgPSBuZXcgRm9ybURhdGEoKTtcclxuICBmb3JtZGF0YS5hcHBlbmQoJ25hbWUnLCBuYW1lKTtcclxuICBmb3JtZGF0YS5hcHBlbmQoJ2ltZycsICRpbWdJbnB1dC5maWxlc1swXSk7XHJcblxyXG4gIGFqYXgoJy9nYWxlcnkvaW1hZ2VzJywge1xyXG4gICAgbWV0aG9kOiAnUE9TVCcsXHJcbiAgICBoZWFkZXJzOiBbeyAnQ29udGVudC10eXBlJzogJ211bHRpcGFydC9mb3JtLWRhdGEnIH1dLFxyXG4gICAgZGF0YTogZm9ybWRhdGEsXHJcbiAgfSlcclxuICAudGhlbigocmVzKSA9PiB7XHJcbiAgICBjb25zdCBpbWcgPSBKU09OLnBhcnNlKHJlcyk7XHJcbiAgICBhZGRJbWFnZU5vZGUoaW1nKTtcclxuICB9KVxyXG4gIC5jYXRjaCgoZXJyKSA9PiB7XHJcbiAgICBjb25zb2xlLndhcm4oZXJyKTtcclxuICB9KTtcclxufVxyXG5cclxuZnVuY3Rpb24gaXNGaWxlcygkaW5wdXQpIHsgXHJcbiAgcmV0dXJuICgkaW5wdXQuZmlsZXMubGVuZ3RoID49IDEpO1xyXG59XHJcblxyXG5jb25zdCAkaW1hZ2VzTGlzdCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5pbWFnZXMtbGlzdC11bCcpO1xyXG5mdW5jdGlvbiBhZGRJbWFnZU5vZGUoaW1nKSB7XHJcbiAgY29uc3QgJGxpID0gbm9kZUZhY3RvcnkoJ2xpJywgeyBjbGFzc0xpc3Q6IFsnaW1hZ2UtaXRlbSddIH0pO1xyXG5cclxuICBjb25zdCAkc3BhbiA9IG5vZGVGYWN0b3J5KCdzcGFuJywgeyBjbGFzc0xpc3Q6IFsnaW1hZ2UtaXRlbS1uYW1lJ10sIHRleHRDb250ZW50OiBpbWcubmFtZSB9KTtcclxuICBjb25zdCAkYSA9IG5vZGVGYWN0b3J5KCdhJyx7XHJcbiAgICBhdHRyczogeyBocmVmOiBgL3VwbG9hZHMvJHtpbWcudXJsfWAsIHRhcmdldDogJ19ibGFuaycgfSxcclxuICB9KTtcclxuICBjb25zdCAkaWNvbldyYXBwZXIgPSBub2RlRmFjdG9yeSgnc3BhbicsIHsgY2xhc3NMaXN0OiBbJ2ljb24td3JhcHBlciddIH0pO1xyXG4gIGNvbnN0ICRpY29uID0gbm9kZUZhY3RvcnkoJ2knLCB7IGNsYXNzTGlzdDogWyAnaWNvbicsICdpY29uLWltYWdlJyBdIH0pO1xyXG5cclxuICAkaWNvbldyYXBwZXIuYXBwZW5kQ2hpbGQoJGljb24pO1xyXG4gICRhLmFwcGVuZENoaWxkKCRpY29uV3JhcHBlcik7XHJcbiAgJGxpLmFwcGVuZENoaWxkKCRzcGFuKTtcclxuICAkbGkuYXBwZW5kQ2hpbGQoJGEpO1xyXG5cclxuICAkaW1hZ2VzTGlzdC5hcHBlbmRDaGlsZCgkbGkpO1xyXG59XHJcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2NhZC9nYWxlcnkuanMiXSwic291cmNlUm9vdCI6IiJ9