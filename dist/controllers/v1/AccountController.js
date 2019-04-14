"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _account = _interopRequireDefault(require("../../database/account"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var AccountController =
/*#__PURE__*/
function () {
  function AccountController() {
    _classCallCheck(this, AccountController);
  }

  _createClass(AccountController, null, [{
    key: "create",
    value: function create(req, res) {
      var accountData = req.body;
      accountData.accountNumber = _account["default"].generateAccountNumber();
      accountData.balance = parseFloat('0.10');
      accountData.status = 'active';
      accountData.createdOn = new Date();

      var createdAccount = _account["default"].create(accountData);

      var balance = createdAccount.balance,
          responseData = _objectWithoutProperties(createdAccount, ["balance"]);

      responseData.openingBalance = balance;
      var _accountData$ownerDat = accountData.ownerData,
          firstName = _accountData$ownerDat.firstName,
          lastName = _accountData$ownerDat.lastName,
          email = _accountData$ownerDat.email,
          title = _accountData$ownerDat.title;

      var data = _objectSpread({
        firstName: firstName,
        lastName: lastName,
        email: email,
        title: title
      }, responseData);

      res.status(201).json({
        status: 201,
        data: data
      });
    }
  }, {
    key: "status",
    value: function status(req, res) {
      var _req$body = req.body,
          status = _req$body.status,
          accountRef = _req$body.accountRef,
          accountNumber = _req$body.accountNumber;

      if (_account["default"].changeStatus(accountRef, status)) {
        var newStatus = status === 'activate' ? 'active' : 'dormant';
        return res.status(200).json({
          status: 200,
          data: {
            accountNumber: accountNumber,
            status: newStatus
          }
        });
      }

      return res.status(500).json({
        status: 500,
        error: "failed to ".concat(status, " account")
      });
    }
  }, {
    key: "delete",
    value: function _delete(req, res) {
      var accountId = req.body.accountId;

      if (!_account["default"]["delete"](accountId)) {
        return res.status(500).json({
          status: 500,
          error: 'failed to delete account'
        });
      }

      return res.status(200).json({
        status: 200,
        message: 'Account successfully deleted'
      });
    }
  }]);

  return AccountController;
}();

var _default = AccountController;
exports["default"] = _default;