"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _UserController = _interopRequireDefault(require("../controllers/v1/UserController"));

var _AccountController = _interopRequireDefault(require("../controllers/v1/AccountController"));

var _TransactionController = _interopRequireDefault(require("../controllers/v1/TransactionController"));

var _userValidator = _interopRequireDefault(require("../middleware/userValidator"));

var _accountValidator = _interopRequireDefault(require("../middleware/accountValidator"));

var _auth = _interopRequireDefault(require("../helper/auth"));

var _transactionValidator = _interopRequireDefault(require("../middleware/transactionValidator"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

// Router middleware
var router = _express["default"].Router();

router.get('/', function (req, resp) {
  return resp.status(200).json({
    message: 'Hello there, Welcome to Banka'
  });
}); // User Auth Routes

router.post('/api/v1/auth/signup', _userValidator["default"].signUp, _UserController["default"].create);
router.post('/api/v1/auth/signin', _userValidator["default"].signIn, _UserController["default"].signIn); // Bank account route

router.post('/api/v1/accounts', [_auth["default"].verifyToken, _accountValidator["default"].create], _AccountController["default"].create);
router.patch('/api/v1/account/:accountNumber', [_auth["default"].verifyToken, _auth["default"].allowOnlyAdminStaff, _accountValidator["default"].status], _AccountController["default"].status);
router["delete"]('/api/v1/accounts/:accountNumber', [_auth["default"].verifyToken, _auth["default"].allowOnlyAdminStaff, _accountValidator["default"]["delete"]], _AccountController["default"]["delete"]); // Transaction route

router.post('/api/v1/transactions/:accountNumber/credit', [_auth["default"].verifyToken, _auth["default"].allowOnlyStaff, _transactionValidator["default"]], _TransactionController["default"].credit);
router.post('/api/v1/transactions/:accountNumber/debit', [_auth["default"].verifyToken, _auth["default"].allowOnlyStaff, _transactionValidator["default"]], _TransactionController["default"].debit);
router.all('*', function (req, res) {
  return res.status(404).json({
    status: 404,
    error: 'The end point you are looking for cannot be found, kindly contact webmaster if you think this is an error'
  });
});
var _default = router;
exports["default"] = _default;