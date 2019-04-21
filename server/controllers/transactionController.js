import Account from '../database/sqlAccount';
import Transaction from '../database/sqlTransaction';

class TransactionController {
  static async credit(req, res) {
    const { accountNumber } = req.params;
    const cashier = parseInt(req.body.id, 10);
    const { amount } = req.body;
    const accountInstance = Account.init();
    let accountData;
    let updatedAccount;
    let transactionResult;
    try {
      accountData = await accountInstance.findWhere(['accountnumber'], accountNumber);
      if (accountData.rowCount < 1) {
        return res.status(404).json({
          status: 404,
          message: `Account ${accountNumber} does not exist`,
        });
      }
    } catch (error) {
      return res.status(500).json({
        status: 500,
        message: 'Something went wrong',
      });
    }
    const { balance: oldBalance } = accountData.rows[0];
    const updatedAmount = parseFloat(amount + oldBalance);
    try {
      updatedAccount = await accountInstance.updateWhere(['balance'], ['accountnumber'], [accountNumber, updatedAmount]);
    } catch (error) {
      return res.status(500).json({
        status: 500,
        error: 'Failed to credit account',
      });
    }

    const params = ['credit', accountNumber, cashier, amount, oldBalance,
      updatedAccount.rows[0].balance,
    ];
    try {
      transactionResult = await Transaction.init().insert(params);
    } catch (error) {
      return res.status(500)
        .json({
          status: 500,
          error: 'Failed to credit account',
        });
    }

    const {
      id: transactionId, newbalance: accountBalance, type: transactionType,
    } = transactionResult.rows[0];
    const data = {
      transactionId,
      accountNumber,
      amount,
      cashier,
      transactionType,
      accountBalance,
    };
    return res.status(200).json({
      status: 200,
      data: [data],
    });
  }

  static async debit(req, res) {
    const { accountNumber } = req.params;
    const cashier = parseInt(req.body.id, 10);
    const { amount } = req.body;
    let accountData;
    let updatedAccount;
    let transactionResult;
    const accountInstance = Account.init();
    try {
      accountData = await accountInstance.findWhere(['accountnumber'], accountNumber);
      if (accountData.rowCount < 1) {
        return res.status(404).json({
          status: 404,
          message: `Account ${accountNumber} does not exist`,
        });
      }
    } catch (error) {
      return res.status(500).json({
        status: 500,
        message: 'Something went wrong',
      });
    }
    const { balance: oldBalance, status } = accountData.rows[0];
    if (status === 'dormant') {
      return res.status(400).json({
        status: 400,
        error: 'Can\'t withdraw from a dormant account, please activate account',
      });
    }
    if (oldBalance < parseFloat(amount)) {
      return res.status(400).json({
        status: 400,
        error: 'Insufficient fund',
      });
    }
    const updatedAmount = parseFloat(oldBalance - amount);
    try {
      updatedAccount = await accountInstance.updateWhere(['balance'], ['accountnumber'], [accountNumber, updatedAmount]);
    } catch (error) {
      return res.status(500)
        .json({
          status: 500,
          error: 'Failed to debit account',
        });
    }
    const params = ['debit', accountNumber, cashier, amount, oldBalance,
      updatedAccount.rows[0].balance,
    ];
    try {
      transactionResult = await Transaction.init().insert(params);
    } catch (error) {
      return res.status(500)
        .json({
          status: 500,
          error: 'Failed to debit account',
        });
    }
    const {
      id: transactionId, newbalance: accountBalance, type: transactionType,
    } = transactionResult.rows[0];
    const data = {
      transactionId,
      accountNumber,
      amount,
      cashier,
      transactionType,
      accountBalance,
    };
    return res.status(200).json({
      status: 200,
      data: [data],
    });
  }

  static async getUserTransactions(req, res) {
    const { accountNumber } = req.params;
    const requesterId = req.body.id;
    const accountData = await Account.init().findWhere(['accountnumber'], accountNumber);
    if (accountData.rowCount < 1) {
      return res.status(404).json({
        status: 404,
        message: `Account ${accountNumber} is not in our database`,
      });
    }
    if (parseInt(accountData.rows[0].owner, 10) !== parseInt(requesterId, 10)) {
      return res.status(403).json({
        status: 403,
        message: 'You dont have the permission to view this data',
      });
    }
    const transactionRecords = await Transaction.init().findWhere(['accountnumber'], accountNumber);
    const data = transactionRecords.rows;
    return res.status(200).json({
      status: 200,
      data,
    });
  }
}

export default TransactionController;
