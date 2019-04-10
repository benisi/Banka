import transaction from '../../database/transaction';

class TransactionController {
  static credit(req, res) {
    const { accountData, amount } = req.body;
    const accNumber = parseInt(accountData.accountNumber, 10);
    const id = parseInt(req.body.decoded, 10);
    const oldBalance = parseFloat(accountData.balance);
    accountData.balance += parseFloat(amount);
    const transactionData = {
      createdOn: new Date(),
      type: 'credit',
      accountNumber: accNumber,
      cashier: id,
      amount,
      oldBalance,
      newBalance: accountData.balance
    };

    const transac = transaction.create(transactionData);
    if (!transac) {
      return res.status(500).json({
        status: 500,
        error: 'Failed to credit account'
      });
    }

    const { cashier } = transac;

    const data = {
      transactionId: transac.id,
      accountNumber: transac.accountNumber.toString(),
      amount: transac.amount,
      cashier,
      transactionType: transac.type,
      accountBalance: transac.newBalance.toFixed(2).toString()
    };

    return res.status(200).json({
      status: 200,
      data
    });
  }

  static debit(req, res) {
    const { accountData, amount } = req.body;
    const accNumber = parseInt(accountData.accountNumber, 10);
    const id = parseInt(req.body.decoded, 10);
    const oldBalance = parseFloat(accountData.balance);
    if (oldBalance < parseFloat(amount)) {
      return res.status(400).json({
        status: 400,
        error: 'Insufficient fund'
      });
    }
    accountData.balance -= parseFloat(amount);
    const transactionData = {
      createdOn: new Date(),
      type: 'debit',
      accountNumber: accNumber,
      cashier: id,
      amount,
      oldBalance,
      newBalance: accountData.balance
    };

    const transac = transaction.create(transactionData);
    if (!transac) {
      return res.status(500).json({
        status: 500,
        error: 'Failed to credit account'
      });
    }

    const { cashier } = transac;

    const data = {
      transactionId: transac.id,
      accountNumber: transac.accountNumber.toString(),
      amount: transac.amount,
      cashier,
      transactionType: transac.type,
      accountBalance: transac.newBalance.toFixed(2).toString()
    };

    return res.status(200).json({
      status: 200,
      data
    });
  }
}

export default TransactionController;
