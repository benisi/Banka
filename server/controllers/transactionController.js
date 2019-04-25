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
      accountData = await accountInstance.findWhere(['accountNumber'], accountNumber);
      if (accountData.rowCount < 1) {
        return res.status(404).json({
          status: 404,
          error: `Account ${accountNumber} does not exist`,
        });
      }
    } catch (error) {
      return res.status(500).json({
        status: 500,
        error: 'Something went wrong',
      });
    }
    const { balance: oldBalance, owner } = accountData.rows[0];
    const updatedAmount = parseFloat(amount + oldBalance);
    try {
      updatedAccount = await accountInstance.updateWhere(['balance'], ['accountNumber'], [accountNumber, updatedAmount]);
    } catch (error) {
      return res.status(500).json({
        status: 500,
        error: 'Failed to credit account',
      });
    }
    const newBalance = updatedAccount.rows[0].balance;
    const params = ['credit', accountNumber, cashier, amount, owner, oldBalance,
      newBalance,
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
      oldBalance,
      newBalance,
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
      accountData = await accountInstance.findWhere(['accountNumber'], accountNumber);
      if (accountData.rowCount < 1) {
        return res.status(404).json({
          status: 404,
          error: `Account ${accountNumber} does not exist`,
        });
      }
    } catch (error) {
      return res.status(500).json({
        status: 500,
        error: 'Something went wrong',
      });
    }
    const { balance: oldBalance, status, owner } = accountData.rows[0];
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
      updatedAccount = await accountInstance.updateWhere(['balance'], ['accountNumber'], [accountNumber, updatedAmount]);
    } catch (error) {
      return res.status(500)
        .json({
          status: 500,
          error: 'Failed to debit account',
        });
    }
    const newBalance = updatedAccount.rows[0].balance;
    const params = ['debit', accountNumber, cashier, amount, owner, oldBalance,
      newBalance,
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
      oldBalance,
      newBalance,
    };
    return res.status(200).json({
      status: 200,
      data: [data],
    });
  }

  static async getUserTransactions(req, res) {
    const { accountNumber } = req.params;
    const requesterId = req.body.id;
    let accountData;
    let transactionRecords;
    try {
      accountData = await Account.init().findWhere(['accountNumber'], accountNumber);
    } catch (error) {
      return res.status(500).json({
        status: 500,
        error: 'Something went wrong',
      });
    }

    if (accountData.rowCount < 1) {
      return res.status(404).json({
        status: 404,
        error: `Account ${accountNumber} is not in our database`,
      });
    }
    if (parseInt(accountData.rows[0].owner, 10) !== parseInt(requesterId, 10)) {
      return res.status(403).json({
        status: 403,
        error: 'You dont have the permission to view this data',
      });
    }
    try {
      transactionRecords = await Transaction.init().findWhere(['accountNumber'], accountNumber);
    } catch (error) {
      return res.status(500).json({
        status: 500,
        error: 'Something went wrong',
      });
    }

    const data = transactionRecords.rows;
    return res.status(200).json({
      status: 200,
      data,
    });
  }

  static async getSingleTransaction(req, res) {
    const { transactionId } = req.params;
    const requesterId = req.body.id;
    let transactionRow;
    try {
      transactionRow = await Transaction.init().findWhere(['id'], transactionId);
    } catch (error) {
      return res.status(500).json({
        status: 500,
        error: 'Something went wrong',
      });
    }

    if (transactionRow.rowCount > 0) {
      const transactionRecord = transactionRow.rows[0];
      if (parseInt(transactionRecord.owner, 10) !== parseInt(requesterId, 10)) {
        return res.status(403).json({
          status: 403,
          error: 'You dont have the permission to view this data',
        });
      }
      const {
        createdOn, type, accountNumber,
        amount, oldBalance, newBalance,
      } = transactionRecord;
      return res.status(200).json({
        status: 200,
        data: [
          {
            transactionId, createdOn, type, accountNumber, amount, oldBalance, newBalance,
          },
        ],
      });
    }
    return res.status(404).json({
      status: 404,
      error: 'Transaction don\'t exist',
    });
  }
}

export default TransactionController;
