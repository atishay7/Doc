"use strict";

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function triggerMouseEvent(node, eventType) {
  var clickEvent = document.createEvent('MouseEvents');
  clickEvent.initEvent(eventType, true, true);
  node.dispatchEvent(clickEvent);
}

function selectionMade(lines) {
  var initialMatcher = '<span class=" CodeMirror-selectedtext">';
  return _toConsumableArray(lines).map(function (line) {
    return line.innerHTML.includes(initialMatcher);
  }).includes(true);
}

$(document).ready(function () {
  var callback = function callback(mutationsList) {
    mutationsList.forEach(function (mutation) {
      if (mutation.type === 'childList') {
        var lines = document.getElementsByClassName('CodeMirror-line');

        if (selectionMade(lines)) {
          var _targetNode = lines[0];
          triggerMouseEvent(_targetNode, 'mouseover');
          triggerMouseEvent(_targetNode, 'mousedown');
          triggerMouseEvent(_targetNode, 'mouseup');
        }
      }
    });
  };

  var observer = new MutationObserver(callback);
  var config = {
    attributes: true,
    childList: true,
    subtree: true
  };
  var targetNode = document.getElementsByClassName('CodeMirror')[0];
  observer.observe(targetNode, config);
});