/* eslint-disable no-underscore-dangle */
import Model from './model';

class Account extends Model {
  constructor(structure) {
    super(structure);
    this._baseAccount = 8900001;
  }

  getAccount(number) {
    return this._data.find(entry => entry.accountNumber === number);
  }

  // eslint-disable-next-line class-methods-use-this
  activate(account) {
    if (typeof account === 'object') {
      // eslint-disable-next-line no-param-reassign
      account.status = 'active';
      return true;
    }
    return false;
  }

  // eslint-disable-next-line class-methods-use-this
  changeStatus(ref, status) {
    let state;

    if (status === 'activate') {
      state = this.activate(ref);
    }
    if (status === 'deactivate') {
      state = this.deactivate(ref);
    }
    if (state) {
      return true;
    }
    return false;
  }

  // eslint-disable-next-line class-methods-use-this
  deactivate(account) {
    if (typeof account === 'object') {
      // eslint-disable-next-line no-param-reassign
      account.status = 'dormant';
      return true;
    }
    return false;
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
