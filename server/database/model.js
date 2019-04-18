/* eslint-disable no-underscore-dangle */

class Model {
  constructor(dataType) {
    this._data = [];
    this._nextId = 1;
    this._dataType = dataType;
  }

  create(obj) {
    const data = this._validateData(obj);
    if (!data) {
      return false;
    }
    data.id = this._nextId;
    this._data.push(data);
    this._nextId = this._nextId + 1;
    return data;
  }

  _validateData(obj) {
    const keys = Object.keys(this._dataType);
    const data = {};
    let valid = true;
    keys.forEach((key) => {
      if (typeof obj[key] === typeof this._dataType[key]()) {
        data[key] = typeof obj[key] === 'string' ? obj[key].trim() : obj[key];
      } else {
        valid = false;
      }
    });

    if (!valid) {
      return false;
    }
    return data;
  }

  find(elementId) {
    return this._data.find(element => element.id === elementId);
  }

  findAll() {
    return this._data;
  }

  _findIndex(elementId) {
    const index = this._data.findIndex(element => element.id === elementId);
    if (index === -1) {
      return false;
    }
    return index;
  }

  delete(elementId) {
    const index = this._findIndex(elementId);

    if (!index && index !== 0) {
      return false;
    }

    this._data.splice(index, 1);
    return true;
  }
}


export default Model;
