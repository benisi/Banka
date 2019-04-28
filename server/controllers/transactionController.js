import Account from '../database/sqlAccount';
import Transaction from '../database/sqlTransaction';
import Response from '../helpers/Response';

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
        return Response.error(res, 404, `Account ${accountNumber} does not exist`);
      }
      const { balance: oldBalance, owner } = accountData.rows[0];
      const updatedAmount = parseFloat(amount + oldBalance);

      updatedAccount = await accountInstance.updateWhere(['balance'], ['accountNumber'], [accountNumber, updatedAmount]);

      const newBalance = updatedAccount.rows[0].balance;
      const params = ['credit', accountNumber, cashier, amount, owner, oldBalance,
        newBalance,
      ];

      transactionResult = await Transaction.init().insert(params);

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
      return Response.success(res, 200, [data]);
    } catch (error) {
      return Response.error500(res);
    }
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
        return Response.error(res, 404, `Account ${accountNumber} does not exist`);
      }

      const { balance: oldBalance, status, owner } = accountData.rows[0];
      if (status === 'dormant') {
        return Response.error(res, 400, 'Can\'t withdraw from a dormant account, please activate account');
      }
      if (oldBalance < parseFloat(amount)) {
        return Response(res, 400, 'Insufficient fund');
      }
      const updatedAmount = parseFloat(oldBalance - amount);
      updatedAccount = await accountInstance.updateWhere(['balance'], ['accountNumber'], [accountNumber, updatedAmount]);
      const newBalance = updatedAccount.rows[0].balance;
      const params = ['debit', accountNumber, cashier, amount, owner, oldBalance,
        newBalance,
      ];
      transactionResult = await Transaction.init().insert(params);
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
      return Response.success(res, 200, [data]);
    } catch (error) {
      return Response.error500(res);
    }
  }

  static async getUserTransactions(req, res) {
    const { accountNumber } = req.params;
    const requesterId = req.body.id;
    let accountData;
    let transactionRecords;
    try {
      accountData = await Account.init().findWhere(['accountNumber'], accountNumber);

      if (accountData.rowCount < 1) {
        return Response.error(res, 404, `Account ${accountNumber} is not in our database`);
      }
      if (parseInt(accountData.rows[0].owner, 10) !== parseInt(requesterId, 10)) {
        return Response.error(res, 403, 'You dont have the permission to view this data');
      }
      transactionRecords = await Transaction.init().findWhere(['accountNumber'], accountNumber);
    } catch (error) {
      return Response.error500(res);
    }

    const data = transactionRecords.rows;
    return Response.success(res, 200, data);
  }

  static async getSingleTransaction(req, res) {
    const { transactionId } = req.params;
    const requesterId = req.body.id;
    let transactionRow;
    try {
      transactionRow = await Transaction.init().findWhere(['id'], transactionId);

      if (transactionRow.rowCount > 0) {
        const transactionRecord = transactionRow.rows[0];
        if (parseInt(transactionRecord.owner, 10) !== parseInt(requesterId, 10)) {
          return Response.error(res, 403, 'You dont have the permission to view this data');
        }
        const {
          createdOn, type, accountNumber,
          amount, oldBalance, newBalance,
        } = transactionRecord;

        const data = [
          {
            transactionId, createdOn, type, accountNumber, amount, oldBalance, newBalance,
          },
        ];
        return Response.success(res, 200, data);
      }
      return Response.error(res, 404, 'Transaction don\'t exist');
    } catch (error) {
      return Response.error500(res);
    }
  }
}

export default TransactionController;
