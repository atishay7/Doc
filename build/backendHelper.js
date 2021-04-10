"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

/* eslint-disable no-console */
var BackendHelper = /*#__PURE__*/function () {
  function BackendHelper() {
    _classCallCheck(this, BackendHelper);
  }

  _createClass(BackendHelper, null, [{
    key: "getPage",
    value: function getPage() {
      var date = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
      var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
      return BackendHelper.getInfo('page', date, options);
    }
  }, {
    key: "getPageDatesByYearAndMonth",
    value: function getPageDatesByYearAndMonth(year, month) {
      return BackendHelper.getInfo('pageDates', "".concat(year, "/").concat(month));
    }
  }, {
    key: "getPageMonthYearCombos",
    value: function getPageMonthYearCombos() {
      return BackendHelper.getInfo('pageDates');
    }
  }, {
    key: "syncPage",
    value: function syncPage(content) {
      return new Promise(function (resolve, reject) {
        var request = new XMLHttpRequest();
        var url = "".concat(backendURL, "/page/").concat(room);
        request.open('POST', url);
        request.setRequestHeader('Content-Type', 'application/json');
        BackendHelper.setAuthorization(request);
        BackendHelper.setHandlersForPromise(request, resolve, reject);
        request.send(JSON.stringify({
          content: content
        }));
      });
    }
  }, {
    key: "addPeer",
    value: function addPeer(id) {
      BackendHelper.modifyPeer(id, 'POST');
    }
  }, {
    key: "getPeers",
    value: function getPeers() {
      return BackendHelper.getInfo('peers');
    }
  }, {
    key: "getInfo",
    value: function getInfo(type, param) {
      var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
      return new Promise(function (resolve, reject) {
        var request = new XMLHttpRequest();
        var url = "".concat(backendURL, "/").concat(type).concat(room ? "/".concat(room) : '').concat(param ? "/".concat(param) : '').concat(BackendHelper.serialize(options));
        request.open('GET', url);
        BackendHelper.setAuthorization(request);
        BackendHelper.setHandlersForPromise(request, resolve, reject);
        request.send();
      });
    }
  }, {
    key: "removePeer",
    value: function removePeer(id) {
      BackendHelper.modifyPeer(id, 'DELETE');
    }
  }, {
    key: "modifyPeer",
    value: function modifyPeer(id, method) {
      var request = new XMLHttpRequest();
      var url = "".concat(backendURL, "/peers/").concat(room, "/").concat(id);
      request.open(method, url);
      BackendHelper.setAuthorization(request);
      BackendHelper.setHandlers(request);
      request.send();
    }
  }, {
    key: "setAuthorization",
    value: function setAuthorization(request) {
      request.setRequestHeader('Authorization', sessionID);
    }
  }, {
    key: "setHandlers",
    value: function setHandlers(request) {
      var successHandler = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : BackendHelper.handleSuccess;
      var failHandler = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : BackendHelper.handleError;

      request.onload = function () {
        return BackendHelper.handleLoadedRequest(request, function () {
          return successHandler(request);
        }, function () {
          return failHandler(request);
        });
      };

      request.onerror = function () {
        return BackendHelper.handleError(request);
      };
    }
  }, {
    key: "setHandlersForPromise",
    value: function setHandlersForPromise(request, resolve, reject) {
      BackendHelper.setHandlers(request, function () {
        return resolve(JSON.parse(request.response));
      }, function () {
        return reject(new Error(request.response));
      });
    }
  }, {
    key: "serialize",
    value: function serialize(obj) {
      if (!obj) {
        return '';
      }

      var str = [];
      Object.keys(obj).forEach(function (key) {
        str.push("".concat(encodeURIComponent(key), "=").concat(encodeURIComponent(obj[key])));
      });
      return "?".concat(str.join('&'));
    }
  }, {
    key: "handleSuccess",
    value: function handleSuccess(request) {
      console.log(request.statusText);
    }
  }, {
    key: "handleError",
    value: function handleError(request) {
      console.error(request.statusText);
    }
  }, {
    key: "handleLoadedRequest",
    value: function handleLoadedRequest(request, successHandler, failHandler) {
      if (request.readyState === 4) {
        if (request.status === 200) {
          successHandler(request);
        } else {
          failHandler(request);
        }
      }
    }
  }]);

  return BackendHelper;
}();

var _default = BackendHelper;
exports["default"] = _default;