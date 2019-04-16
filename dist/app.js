"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _bodyParser = _interopRequireDefault(require("body-parser"));

var _cors = _interopRequireDefault(require("cors"));

var _dotenv = _interopRequireDefault(require("dotenv"));

var _morgan = _interopRequireDefault(require("morgan"));

var _router = _interopRequireDefault(require("./routes/router"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

/* jslint es6 */
var app = (0, _express["default"])();

_dotenv["default"].config(); // logger middleware


app.use((0, _morgan["default"])('dev'));
var PORT = process.env.PORT || 3000;
var corsOptions = {
  origin: '*',
  credentials: true
}; // adding cors middleware

app.use((0, _cors["default"])(corsOptions)); // body parser middleware

app.use(_bodyParser["default"].json());
app.use(_bodyParser["default"].urlencoded({
  extended: true
}));
app.listen(PORT, function () {
  console.log("Your server is running on port ".concat(PORT));
});
app.use(_router["default"]);
var _default = app;
exports["default"] = _default;