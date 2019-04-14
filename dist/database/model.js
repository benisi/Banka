"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

/* eslint-disable no-underscore-dangle */
var Model =
/*#__PURE__*/
function () {
  function Model(dataType) {
    _classCallCheck(this, Model);

    this._data = [];
    this._nextId = 1;
    this._dataType = dataType;
  }

  _createClass(Model, [{
    key: "create",
    value: function create(obj) {
      var data = this._validateData(obj);

      if (!data) {
        console.log('Fail to create data entry, validation failed');
        return false;
      }

      data.id = this._nextId;

      this._data.push(data);

      this._nextId = this._nextId + 1;
      return data;
    }
  }, {
    key: "_validateData",
    value: function _validateData(obj) {
      var _this = this;

      var keys = Object.keys(this._dataType);
      var data = {};
      var valid = true;
      keys.forEach(function (key) {
        if (_typeof(obj[key]) === _typeof(_this._dataType[key]())) {
          data[key] = typeof obj[key] === 'string' ? obj[key].trim() : obj[key];
        } else {
          console.error("".concat(_this.constructor.name, " model says that ").concat(key, " is not a valid type of ").concat(_typeof(_this._dataType[key]())));
          valid = false;
        }
      });

      if (!valid) {
        return false;
      }

      return data;
    }
  }, {
    key: "find",
    value: function find(elementId) {
      return this._data.find(function (element) {
        return element.id === elementId;
      });
    }
  }, {
    key: "findAll",
    value: function findAll() {
      return this._data;
    }
  }, {
    key: "_findIndex",
    value: function _findIndex(elementId) {
      var index = this._data.findIndex(function (element) {
        return element.id === elementId;
      });

      if (index === -1) {
        return false;
      }

      return index;
    }
  }, {
    key: "delete",
    value: function _delete(elementId) {
      var index = this._findIndex(elementId);

      if (!index && index !== 0) {
        return false;
      }

      this._data.splice(index, 1);

      return true;
    }
  }]);

  return Model;
}();

var _default = Model;
exports["default"] = _default;