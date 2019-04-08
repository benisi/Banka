/* eslint-disable no-underscore-dangle */
import Model from './model';

class Account extends Model {
  constructor(structure) {
    super(structure);
    this._baseAccount = 8900001;
  }

  generateAccountNumber() {
    this._baseAccount = this._baseAccount + 1;
    return this._baseAccount;
  }
}

const structure = {
  accountNumber: Number,
  createdOn: Object,
  owner: Number,
  type: String,
  status: String,
  balance: Number,
  category: String,
};

const account = new Account(structure);

export default account;
