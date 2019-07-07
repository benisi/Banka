import User from '../database/sqlUser';
import Account from '../database/sqlAccount';
import AccountNumberTracker from '../database/sqlAccountTracking';
import Utility from '../helpers/utility';
import Response from '../helpers/Response';

class AccountController {
  static async create(req, res) {
    const ownerId = parseInt(req.body.id, 10);
    const { type, category } = req.body;
    let ownerData;
    let trackedData;
    try {
      ownerData = await User.init().find(ownerId);
      if (ownerData.rowCount < 1) {
        return Response.error(res, 404, 'Invalid account owner');
      }
      trackedData = await AccountNumberTracker.init().insert(type.trim());
      const {
        id: owner, firstName, lastName, email,
      } = ownerData.rows[0];
      const status = 'active';
      const balance = parseFloat(0.00).toFixed(2);
      const accountNumber = Utility.generateAccountNumber(type, trackedData.rows[0].id);
      const accountData = [
        accountNumber, owner, type, status, balance, category,
      ];
      const createdAccount = await Account.init().insert(accountData);
      const data = {
        accountNumber,
        firstName,
        lastName,
        email,
        type: createdAccount.rows[0].type,
        openingBalance: balance,
        status,
        category: createdAccount.rows[0].category,
      };
      return Response.success(res, 201, [data]);
    } catch (error) {
      return Response.error500(res);
    }
  }

  static async status(req, res) {
    const { accountNumber } = req.params;
    const accountInstance = Account.init();
    try {
      const accountData = await accountInstance.findWhere(['accountNumber'], accountNumber);
      if (accountData.rowCount < 1) {
        return Response.error(res, 404, `Account ${accountNumber} does not exist`);
      }
      const { status } = req.body;
      const newStatus = status === 'activate' ? 'active' : 'dormant';
      accountInstance.changeStatus(accountNumber, newStatus);
      const data = [{
        accountNumber,
        status: newStatus,
      }];
      return Response.success(res, 200, data);
    } catch (error) {
      return Response.error500(res);
    }
  }

  static async delete(req, res) {
    const { accountNumber } = req.params;
    const accountReference = parseInt(accountNumber, 10);
    try {
      const accountResponse = await Account.init().delete(['accountNumber'], accountReference);
      if (accountResponse.rowCount < 1) {
        return Response.error(res, 404, `Account ${accountReference} is not on our database`);
      }
      return Response.successMessage(res, 200, `Account ${accountReference} was successfully deleted`);
    } catch (error) {
      return Response.error500(res);
    }
  }

  static async accountDetails(req, res) {
    const { accountNumber } = req.params;
    let accountResponse;
    try {
      accountResponse = await Account.getAccountWithOwnerEmail(accountNumber);
      if (accountResponse.rowCount < 1) {
        return Response.error(res, 404, `Account ${accountNumber} is not on our database`);
      }
      const {
        createdOn, owner, category,
        id, email: ownerEmail, ...otherData
      } = accountResponse.rows[0];
      const data = [{
        createdOn,
        accountNumber,
        ownerEmail,
        ...otherData,
      }];
      return Response.success(res, 200, data);
    } catch (error) {
      return Response.error500(res);
    }
  }

  static async getAllAccounts(req, res) {
    let data;
    if (req.query.status) {
      const { status } = req.query;
      if (!['active', 'dormant'].includes(status)) {
        return Response.error(res, 400, 'only active and dormant allow in query parameter');
      }
      data = await Account.getAllAccountWithOwner(status);
    } else {
      data = await Account.getAllAccountWithOwner();
    }
    return Response.success(res, 200, data.rows);
  }
}

export default AccountController;
