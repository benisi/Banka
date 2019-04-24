import User from '../database/sqlUser';
import Account from '../database/sqlAccount';
import AccountNumberTracker from '../database/sqlAccountTracking';
import Utility from '../helpers/utility';

class AccountController {
  static async create(req, res) {
    const ownerId = parseInt(req.body.id, 10);
    const { type, category } = req.body;
    let ownerData;
    let trackedData;
    try {
      ownerData = await User.init().find(ownerId);
      if (ownerData.rowCount < 1) {
        return res.status(404).json({
          status: 404,
          error: 'Invalid account owner',
        });
      }
    } catch (error) {
      return res.status(500).json({
        status: 500,
        error: 'Something went wrong',
      });
    }
    try {
      trackedData = await AccountNumberTracker.init().insert(type);
    } catch (error) {
      res.status(500).json({
        status: 500,
        error: 'Something went wrong',
      });
    }
    const {
      id: owner, firstName, lastName, email,
    } = ownerData.rows[0];
    const status = 'active';
    const balance = parseFloat(0.10).toFixed(2);
    const accountNumber = Utility.generateAccountNumber(type, trackedData.rows[0].id);
    const accountData = [
      accountNumber, owner, type, status, balance, category,
    ];
    try {
      await Account.init().insert(accountData);
    } catch (error) {
      res.status(500).json({
        status: 500,
        error: 'Something went wrong',
      });
    }
    const data = {
      accountNumber,
      firstName,
      lastName,
      email,
      type,
      openingBalance: balance,
      status,
      category,
    };
    return res.status(201).json({
      status: 201,
      data: [data],
    });
  }

  static async status(req, res) {
    const { accountNumber } = req.params;
    const accountInstance = Account.init();
    try {
      const accountData = await accountInstance.findWhere(['accountNumber'], accountNumber);
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
    const { status } = req.body;
    const newStatus = status === 'activate' ? 'active' : 'dormant';
    try {
      accountInstance.changeStatus(accountNumber, newStatus);
      return res.status(200).json({
        status: 200,
        data: [{
          accountNumber,
          status: newStatus,
        }],
      });
    } catch (error) {
      return res.status(500).json({
        status: 500,
        error: 'Something went wrong',
      });
    }
  }

  static async delete(req, res) {
    const { accountNumber } = req.params;
    const accountReference = parseInt(accountNumber, 10);
    try {
      const accountResponse = await Account.init().delete(['accountNumber'], accountReference);
      if (accountResponse.rowCount < 1) {
        return res.status(404).json({
          status: 404,
          error: `Account ${accountReference} is not on our database`,
        });
      }
      return res.status(200).json({
        status: 200,
        message: `Account ${accountReference} was successfully deleted`,
      });
    } catch (error) {
      return res.status(500).json({
        status: 500,
        error: 'Something went wrong',
      });
    }
  }

  static async accountDetails(req, res) {
    const { accountNumber } = req.params;
    let accountResponse;
    try {
      accountResponse = await Account.getAccountWithOwnerEmail(accountNumber);
      if (accountResponse.rowCount < 1) {
        return res.status(404).json({
          status: 404,
          error: `Account ${accountNumber} is not on our database`,
        });
      }
    } catch (error) {
      return res.status(500).json({
        status: 500,
        error: 'Something went wrong',
      });
    }
    const {
      createdon: createdOn, owner, category,
      id, email: ownerEmail, ...otherData
    } = accountResponse.rows[0];
    const data = [{
      createdOn,
      accountNumber,
      ownerEmail,
      ...otherData,
    }];
    return res.status(200).json({
      status: 200,
      data,
    });
  }

  static async getAllAccounts(req, res) {
    let data;
    const accountInstance = Account.init();
    if (req.query.status) {
      const { status } = req.query;
      if (!['active', 'dormant'].includes(status)) {
        return res.status(400).json({
          status: 400,
          error: 'only active and dormant allow in query parameter',
        });
      }
      data = await accountInstance.findWhere(['status'], status);
    } else {
      data = await accountInstance.findAll();
    }
    return res.status(200).json({
      status: 200,
      data: data.rows,
    });
  }
}

export default AccountController;
