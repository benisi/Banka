import transaction from '../database/transaction';
import account from '../database/account';

class TransactionController {
  static credit(req, res) {
    let { accountNumber } = req.params;
    const { amount } = req.body;
    const accountData = account.getAccount(parseInt(accountNumber, 10));
    const type = 'credit';

    if (!accountData) {
      return res.status(404).json({
        status: 404,
        error: `Account ${accountNumber} does not exist`
      });
    }

    const { balance } = accountData;
    accountNumber = parseInt(accountNumber, 10);
    const cashierId = parseInt(req.body.id, 10);
    const oldBalance = parseFloat(balance);
    accountData.balance += parseFloat(amount);
    const transactionData = {
      createdOn: new Date(),
      type,
      accountNumber,
      cashier: cashierId,
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

    const {
      cashier, id: transactionId, type: transactionType, newBalance: accountBalance
    } = transac;

    const data = {
      transactionId,
      accountNumber: accountNumber.toString(),
      amount,
      cashier,
      transactionType,
      accountBalance: accountBalance.toFixed(2).toString()
    };

    return res.status(200).json({
      status: 200,
      data
    });
  }

  static debit(req, res) {
    let { accountNumber } = req.params;
    const { amount } = req.body;
    const accountData = account.getAccount(parseInt(accountNumber, 10));
    const type = 'debit';

    if (!accountData) {
      return res.status(404).json({
        status: 404,
        error: `Account ${accountNumber} does not exist`
      });
    }

    if (accountData.status === 'dormant') {
      return res.status(400).json({
        status: 400,
        error: 'Cant withdraw from a dormant account, please activate account'
      });
    }

    accountNumber = parseInt(accountData.accountNumber, 10);
    const cashierId = parseInt(req.body.id, 10);
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
      type,
      accountNumber,
      cashier: cashierId,
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

    const {
      cashier, id: transactionId, type: transactionType
    } = transac;

    const data = {
      transactionId,
      accountNumber: accountNumber.toString(),
      amount,
      cashier,
      transactionType,
      accountBalance: transac.newBalance.toFixed(2).toString()
    };

    return res.status(200).json({
      status: 200,
      data
    });
  }
}

export default TransactionController;
