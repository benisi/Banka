"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _user = _interopRequireDefault(require("../database/user"));

var _account = _interopRequireDefault(require("../database/account"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var AccountValidator =
/*#__PURE__*/
function () {
  function AccountValidator() {
    _classCallCheck(this, AccountValidator);
  }

  _createClass(AccountValidator, null, [{
    key: "create",
    value: function create(req, res, next) {
      var _req$body = req.body,
          type = _req$body.type,
          category = _req$body.category;

      if (type === undefined) {
        return res.status(400).json({
          status: 400,
          error: 'Type is a required field'
        });
      }

      if (category === undefined) {
        return res.status(400).json({
          status: 400,
          error: 'category is a required field'
        });
      }

      if (!['current', 'savings'].includes(type)) {
        return res.status(400).json({
          status: 400,
          error: 'Invalid type, only accept [ current, savings ]'
        });
      }

      if (!['individual', 'organization'].includes(category)) {
        return res.status(400).json({
          status: 400,
          error: 'Invalid category, only accept [ individual, organization ]'
        });
      }

      var ownerId = parseInt(req.body.decoded, 10);

      var ownerData = _user["default"].find(ownerId);

      if (!ownerData) {
        res.status(400).json({
          status: 400,
          error: 'Invalid account owner'
        });
      }

      req.body.ownerData = ownerData;
      req.body.owner = ownerId;
      return next();
    }
  }, {
    key: "status",
    value: function status(req, res, next) {
      var status = req.body.status;

      if (status === undefined) {
        return res.status(400).json({
          status: 400,
          error: 'status is a required field'
        });
      }

      if (!['activate', 'deactivate'].includes(status)) {
        return res.status(400).json({
          status: 400,
          error: 'Invalid status, only accept [ activate, deactivate ]'
        });
      }

      var accountNumber = req.params.accountNumber;

      var accountRef = _account["default"].getAccount(parseInt(accountNumber, 10));

      if (!accountRef) {
        return res.status(404).json({
          status: 404,
          error: "Account ".concat(accountNumber, " does not exist")
        });
      }

      req.body.accountRef = accountRef;
      req.body.accountNumber = accountNumber;
      next();
    }
  }, {
    key: "delete",
    value: function _delete(req, res, next) {
      var accountNumber = req.params.accountNumber;

      var accountRef = _account["default"].getAccount(parseInt(accountNumber, 10));

      if (!accountRef) {
        return res.status(404).json({
          status: 404,
          error: "Account ".concat(accountNumber, " does not exist")
        });
      }

      var id = accountRef.id;
      req.body.accountId = id;
      return next();
    }
  }]);

  return AccountValidator;
}();

var _default = AccountValidator;
exports["default"] = _default;