import SqlModel from './sqlModel';

class Account extends SqlModel {
  async changeStatus(accountNumber, newStatus) {
    return this.updateWhere(['status'], ['accountnumber'], [accountNumber, newStatus]);
  }

  static init() {
    const structure = [
      'accountNumber',
      'owner',
      'type',
      'status',
      'balance',
      'category',
    ];
    const account = new Account(structure);
    return account;
  }
}

export default Account;
