"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _model = _interopRequireDefault(require("./model"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var Account =
/*#__PURE__*/
function (_Model) {
  _inherits(Account, _Model);

  function Account(structure) {
    var _this;

    _classCallCheck(this, Account);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(Account).call(this, structure));
    _this._baseAccount = 8900001;
    return _this;
  }

  _createClass(Account, [{
    key: "getAccount",
    value: function getAccount(number) {
      return this._data.find(function (entry) {
        return entry.accountNumber === number;
      });
    } // eslint-disable-next-line class-methods-use-this

  }, {
    key: "activate",
    value: function activate(account) {
      if (_typeof(account) === 'object') {
        account.status = 'active';
        return true;
      }

      return false;
    } // eslint-disable-next-line class-methods-use-this

  }, {
    key: "changeStatus",
    value: function changeStatus(ref, status) {
      var state;

      if (status === 'activate') {
        state = this.activate(ref);
      }

      if (status === 'deactivate') {
        state = this.deactivate(ref);
      }

      if (state) {
        return true;
      }

      return false;
    } // eslint-disable-next-line class-methods-use-this

  }, {
    key: "deactivate",
    value: function deactivate(account) {
      if (_typeof(account) === 'object') {
        account.status = 'dormant';
        return true;
      }

      return false;
    }
  }, {
    key: "generateAccountNumber",
    value: function generateAccountNumber() {
      this._baseAccount = this._baseAccount + 1;
      return this._baseAccount;
    }
  }]);

  return Account;
}(_model["default"]);

var structure = {
  accountNumber: Number,
  createdOn: Object,
  owner: Number,
  type: String,
  status: String,
  balance: Number,
  category: String
};
var account = new Account(structure);
var _default = account;
exports["default"] = _default;