"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _humanizeDuration = _interopRequireDefault(require("humanize-duration"));

var _momentTimezone = _interopRequireDefault(require("moment-timezone"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var DateHelper = /*#__PURE__*/function () {
  function DateHelper() {
    _classCallCheck(this, DateHelper);
  }

  _createClass(DateHelper, null, [{
    key: "formatMap",
    value: function formatMap() {
      return {
        "short": 'YYYY-MM-DD',
        "long": 'dddd, D MMMM YYYY'
      };
    }
  }, {
    key: "closingTime",
    value: function closingTime() {
      return (0, _momentTimezone["default"])().add(1, 'days').tz('Europe/London').startOf('day').valueOf();
    }
  }, {
    key: "currentDate",
    value: function currentDate() {
      var format = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'short';
      return DateHelper.formatDate(Date.now(), format);
    }
  }, {
    key: "formatDate",
    value: function formatDate(date, format) {
      return (0, _momentTimezone["default"])(date).tz('Europe/London').format(DateHelper.formatMap()[format]);
    }
  }, {
    key: "localDateWithTime",
    value: function localDateWithTime(date) {
      return (0, _momentTimezone["default"])(date).tz(_momentTimezone["default"].tz.guess()).format('h:mm:ss A z, YYYY-MM-DD');
    }
  }, {
    key: "monthName",
    value: function monthName(index) {
      return ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'][index - 1];
    }
  }, {
    key: "roundedDuration",
    value: function roundedDuration(durationMillis) {
      return (0, _humanizeDuration["default"])(durationMillis, {
        round: true,
        units: ['m', 's']
      });
    }
  }]);

  return DateHelper;
}();

var _default = DateHelper;
exports["default"] = _default;
module.exports = DateHelper;