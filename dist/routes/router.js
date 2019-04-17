"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _userController = _interopRequireDefault(require("../controllers/userController"));

var _accountController = _interopRequireDefault(require("../controllers/accountController"));

var _transactionController = _interopRequireDefault(require("../controllers/transactionController"));

var _userValidator = _interopRequireDefault(require("../middlewares/userValidator"));

var _accountValidator = _interopRequireDefault(require("../middlewares/accountValidator"));

var _auth = _interopRequireDefault(require("../helpers/auth"));

var _transactionValidator = _interopRequireDefault(require("../middlewares/transactionValidator"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

// Router middleware
var router = _express["default"].Router();

router.get('/', function (req, resp) {
  return resp.status(200).json({
    message: 'Hello there, Welcome to Banka'
  });
}); // User Auth Routes

router.post('/api/v1/auth/signup', _userValidator["default"].signUp, _userController["default"].create);
router.post('/api/v1/auth/signin', _userValidator["default"].signIn, _userController["default"].signIn); // Bank account route

router.post('/api/v1/accounts', [_auth["default"].verifyToken, _accountValidator["default"].createAccountValidator], _accountController["default"].create);
router.patch('/api/v1/account/:accountNumber', [_auth["default"].verifyToken, _auth["default"].allowOnlyAdminStaff, _accountValidator["default"].accountStatusValidator], _accountController["default"].status);
router["delete"]('/api/v1/accounts/:accountNumber', [_auth["default"].verifyToken, _auth["default"].allowOnlyAdminStaff], _accountController["default"]["delete"]); // Transaction route

router.post('/api/v1/transactions/:accountNumber/credit', [_auth["default"].verifyToken, _auth["default"].allowOnlyStaff, _transactionValidator["default"]], _transactionController["default"].credit);
router.post('/api/v1/transactions/:accountNumber/debit', [_auth["default"].verifyToken, _auth["default"].allowOnlyStaff, _transactionValidator["default"]], _transactionController["default"].debit);
router.all('*', function (req, res) {
  return res.status(404).json({
    status: 404,
    error: 'The end point you are looking for cannot be found, kindly contact webmaster if you think this is an error'
  });
});
var _default = router;
exports["default"] = _default;