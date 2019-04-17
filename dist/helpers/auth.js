"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Auth =
/*#__PURE__*/
function () {
  function Auth() {
    _classCallCheck(this, Auth);
  }

  _createClass(Auth, null, [{
    key: "createToken",
    value: function createToken(payload) {
      var key = process.env.SECRET || 'key';
      return _jsonwebtoken["default"].sign(payload, key, {
        expiresIn: '2d'
      });
    }
  }, {
    key: "verifyToken",
    value: function verifyToken(req, res, next) {
      var token = req.headers.authorization || req.body.token;

      if (!token) {
        return res.status(400).json({
          status: 400,
          error: 'No token supplied'
        });
      }

      var key = process.env.SECRET || 'key';

      _jsonwebtoken["default"].verify(token, key, function (err, decoded) {
        if (err) {
          return res.status(401).json({
            status: 401,
            error: 'Invalid token'
          });
        }

        req.body.id = decoded.id;
        req.body.isAdmin = decoded.isAdmin;
        req.body.role = decoded.type;
        return next();
      });
    }
  }, {
    key: "allowOnlyAdminStaff",
    value: function allowOnlyAdminStaff(req, res, next) {
      var _req$body = req.body,
          type = _req$body.role,
          isAdmin = _req$body.isAdmin;

      if (!isAdmin && type !== 'staff') {
        return res.status(403).json({
          status: 403,
          error: 'You are not Authorize to perform this operation'
        });
      }

      return next();
    }
  }, {
    key: "allowOnlyStaff",
    value: function allowOnlyStaff(req, res, next) {
      var type = req.body.role;

      if (type !== 'staff') {
        return res.status(403).json({
          status: 403,
          error: 'You are not Authorize to perform this operation'
        });
      }

      return next();
    }
  }]);

  return Auth;
}();

var _default = Auth;
exports["default"] = _default;