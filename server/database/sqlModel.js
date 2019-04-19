/* eslint-disable no-underscore-dangle */

class sqlModel {
  constructor(fields) {
    this._fields = fields;
    this._table = `${this.constructor.name.toLowerCase()}s`;
  }

  insert() {
    const fieldsPlaceholder = this.getPlaceholders();
    const insertQuery = `INSERT INTO ${this._table} (${this._fields.join(',')}) VALUES (${fieldsPlaceholder.join(',')}) RETURNING *`;
    return insertQuery;
  }

  selectWhere(selections, constraint = '*') {
    let constraintValues = '';
    selections.forEach((selection, index) => {
      constraintValues += `${selection}=$${index + 1}`;
      if (index < selections.length - 1) {
        constraintValues += ' AND ';
      }
    });
    const selectQuery = `SELECT ${constraint} FROM ${this._table} WHERE ${constraintValues}`;
    return selectQuery;
  }

  getPlaceholders() {
    const fieldsPlaceholder = [];
    this._fields.forEach((field, index) => {
      fieldsPlaceholder.push(`$${index + 1}`);
    });
    return fieldsPlaceholder;
  }
}


export default sqlModel;
