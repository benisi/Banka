"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _transaction = _interopRequireDefault(require("../../database/transaction"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var TransactionController =
/*#__PURE__*/
function () {
  function TransactionController() {
    _classCallCheck(this, TransactionController);
  }

  _createClass(TransactionController, null, [{
    key: "credit",
    value: function credit(req, res) {
      var _req$body = req.body,
          accountData = _req$body.accountData,
          amount = _req$body.amount;
      var accountNumber = accountData.accountNumber,
          balance = accountData.balance;
      var accNumber = parseInt(accountNumber, 10);
      var id = parseInt(req.body.decoded, 10);
      var oldBalance = parseFloat(balance);
      accountData.balance += parseFloat(amount);
      var transactionData = {
        createdOn: new Date(),
        type: 'credit',
        accountNumber: accNumber,
        cashier: id,
        amount: amount,
        oldBalance: oldBalance,
        newBalance: accountData.balance
      };

      var transac = _transaction["default"].create(transactionData);

      if (!transac) {
        return res.status(500).json({
          status: 500,
          error: 'Failed to credit account'
        });
      }

      var cashier = transac.cashier,
          transactionId = transac.id,
          transactionType = transac.type,
          accountBalance = transac.newBalance;
      var data = {
        transactionId: transactionId,
        accountNumber: accountNumber.toString(),
        amount: amount,
        cashier: cashier,
        transactionType: transactionType,
        accountBalance: accountBalance.toFixed(2).toString()
      };
      return res.status(200).json({
        status: 200,
        data: data
      });
    }
  }, {
    key: "debit",
    value: function debit(req, res) {
      var _req$body2 = req.body,
          accountData = _req$body2.accountData,
          amount = _req$body2.amount;

      if (accountData.status === 'dormant') {
        return res.status(400).json({
          status: 400,
          error: 'Cant withdraw from a dormant account, please activate account'
        });
      }

      var accNumber = parseInt(accountData.accountNumber, 10);
      var id = parseInt(req.body.decoded, 10);
      var oldBalance = parseFloat(accountData.balance);

      if (oldBalance < parseFloat(amount)) {
        return res.status(400).json({
          status: 400,
          error: 'Insufficient fund'
        });
      }

      accountData.balance -= parseFloat(amount);
      var transactionData = {
        createdOn: new Date(),
        type: 'debit',
        accountNumber: accNumber,
        cashier: id,
        amount: amount,
        oldBalance: oldBalance,
        newBalance: accountData.balance
      };

      var transac = _transaction["default"].create(transactionData);

      if (!transac) {
        return res.status(500).json({
          status: 500,
          error: 'Failed to credit account'
        });
      }

      var cashier = transac.cashier,
          transactionId = transac.id,
          accountNumber = transac.accountNumber,
          transactionType = transac.type;
      var data = {
        transactionId: transactionId,
        accountNumber: accountNumber.toString(),
        amount: amount,
        cashier: cashier,
        transactionType: transactionType,
        accountBalance: transac.newBalance.toFixed(2).toString()
      };
      return res.status(200).json({
        status: 200,
        data: data
      });
    }
  }]);

  return TransactionController;
}();

var _default = TransactionController;
exports["default"] = _default;