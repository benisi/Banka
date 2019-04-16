"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _bcrypt = _interopRequireDefault(require("bcrypt"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Validator =
/*#__PURE__*/
function () {
  function Validator() {
    _classCallCheck(this, Validator);
  }

  _createClass(Validator, null, [{
    key: "isUndefined",
    value: function isUndefined(data) {
      if (data === undefined) {
        return true;
      }

      return false;
    }
  }, {
    key: "isString",
    value: function isString(data) {
      if (typeof data === 'string') {
        return true;
      }

      return false;
    }
  }, {
    key: "isEmpty",
    value: function isEmpty(data) {
      if (data === '') {
        return true;
      }

      return false;
    }
  }, {
    key: "itIsAName",
    value: function itIsAName(data) {
      // regex from stackoverflow
      // eslint-disable-next-line no-useless-escape
      var nameRegex = /(^[a-z ,.'-]{2,60}$)/i;

      if (nameRegex.test(data)) {
        return true;
      }

      return false;
    }
  }, {
    key: "itIsAnEmail",
    value: function itIsAnEmail(data) {
      // regex from emailregex.com
      // eslint-disable-next-line no-useless-escape
      var emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

      if (emailRegex.test(data)) {
        return true;
      }

      return false;
    }
  }, {
    key: "itIsBoolean",
    value: function itIsBoolean(data) {
      if (typeof data === 'boolean') {
        return true;
      }

      return false;
    }
  }, {
    key: "isPassword",
    value: function isPassword(data) {
      // from regexlib.com
      var passwordRegex = /^(?=[^\d_].*?\d)\w(\w|[!@#$%]){7,20}/;

      if (passwordRegex.test(data)) {
        return true;
      }

      return false;
    }
  }, {
    key: "checkPassword",
    value: function checkPassword(myPlaintextPassword, hash) {
      return _bcrypt["default"].compareSync(myPlaintextPassword, hash);
    }
  }, {
    key: "isPhoneNumber",
    value: function isPhoneNumber(data) {
      // eslint-disable-next-line no-useless-escape
      var phoneRegEx = /^[+]?[0-9]{11,14}$/;

      if (phoneRegEx.test(data)) {
        return true;
      }

      return false;
    }
  }, {
    key: "isDateOfBirth",
    value: function isDateOfBirth(data) {
      // stack overflow https://www.oreilly.com/library/view/regular-expressions-cookbook/9781449327453/ch04s04.html
      var dateRegex = /^[0-3]?[0-9]\/[0-3]?[0-9]\/(?:[0-9]{2})?[0-9]{2}$/;

      if (dateRegex.test(data)) {
        return true;
      }

      return false;
    }
  }]);

  return Validator;
}();

var _default = Validator;
exports["default"] = _default;