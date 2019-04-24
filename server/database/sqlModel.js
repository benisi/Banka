/* eslint-disable no-underscore-dangle */
import pool from './dbConnection';
import Utility from '../helpers/utility';

class SqlModel {
  constructor(fields) {
    this._fields = fields;
    this._table = `${this.constructor.name.toLowerCase()}s`;
    this._lastPlaceholder = 0;
  }

  insert(data) {
    const sanitizedData = Utility.convertToArray(data);
    const fieldsPlaceholder = this.getPlaceholders();
    const insertQuery = `INSERT INTO ${this._table} (${this._fields.join(',')}) VALUES (${fieldsPlaceholder.join(',')}) RETURNING *`;
    return pool.query(insertQuery, sanitizedData);
  }

  findWhere(selections, data, constraint = '*') {
    const constraintValues = SqlModel.generateConstraint(selections);
    const sanitizedData = Utility.convertToArray(data);
    const selectQuery = `SELECT ${constraint} FROM ${this._table} WHERE ${constraintValues}`;
    return pool.query(selectQuery, sanitizedData);
  }

  findAll() {
    const selectQuery = `SELECT * FROM ${this._table}`;
    return pool.query(selectQuery);
  }

  updateWhere(setValues, selections, data) {
    const constraintValues = SqlModel.generateConstraint(selections);
    const valuesToUpdate = SqlModel.generateSetValues(setValues);
    const sanitizedData = Utility.convertToArray(data);
    const updateQuery = `UPDATE ${this._table} SET ${valuesToUpdate} WHERE ${constraintValues} RETURNING *`;
    return pool.query(updateQuery, sanitizedData);
  }

  delete(constraint, data) {
    const sanitizedData = Utility.convertToArray(data);
    const constraintValues = SqlModel.generateConstraint(constraint);
    const deleteQuery = `DELETE FROM ${this._table} WHERE ${constraintValues}`;
    return pool.query(deleteQuery, sanitizedData);
  }

  static generateConstraint(selections) {
    let constraintValues = '';
    selections.forEach((selection, index) => {
      constraintValues += `"${selection}"=$${index + 1}`;
      SqlModel._lastPlaceholder = index + 1;
      if (index < selections.length - 1) {
        constraintValues += ' AND ';
      }
    });
    return constraintValues;
  }

  static generateSetValues(selections) {
    let setValues = '';
    let index = SqlModel._lastPlaceholder;
    selections.forEach((key) => {
      setValues += `"${key}"=$${index + 1}`;
      index += 1;
      if (index < selections.length + SqlModel._lastPlaceholder) {
        setValues += ', ';
      }
    });
    SqlModel._lastPlaceholder = 1;
    return setValues;
  }

  getPlaceholders() {
    const fieldsPlaceholder = [];
    this._fields.forEach((field, index) => {
      fieldsPlaceholder.push(`$${index + 1}`);
    });
    return fieldsPlaceholder;
  }

  find(id) {
    return this.findWhere(['id'], id);
  }
}


export default SqlModel;
