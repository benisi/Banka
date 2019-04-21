import SqlModel from './sqlModel';

class Transaction extends SqlModel {
  static init() {
    const structure = [
      'type',
      'accountNumber',
      'cashier',
      'amount',
      'owner',
      'oldBalance',
      'newBalance',
    ];
    const transactionInstance = new Transaction(structure);
    return transactionInstance;
  }
}

export default Transaction;
