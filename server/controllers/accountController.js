import account from '../database/account';
import user from '../database/user';

class AccountController {
  static create(req, res) {
    const ownerId = parseInt(req.body.id, 10);
    const ownerData = user.find(ownerId);
    if (!ownerData) {
      res.status(404).json({
        status: 404,
        error: 'Invalid account owner',
      });
    }
    const accountData = req.body;
    accountData.accountNumber = account.generateAccountNumber();
    accountData.owner = ownerId;
    accountData.balance = parseFloat('0.10');
    accountData.status = 'active';
    accountData.createdOn = new Date();
    const createdAccount = account.create(accountData);
    const { balance, ...responseData } = createdAccount;
    responseData.openingBalance = balance;
    const {
      firstName, lastName, email, title,
    } = ownerData;
    const data = {
      firstName, lastName, email, title, ...responseData,
    };
    return res.status(201).json({
      status: 201,
      data,
    });
  }


  static status(req, res) {
    const { accountNumber } = req.params;
    const accountRef = account.getAccount(parseInt(accountNumber, 10));

    if (!accountRef) {
      return res.status(404).json({
        status: 404,
        error: `Account ${accountNumber} does not exist`,
      });
    }

    const { status } = req.body;
    if (account.changeStatus(accountRef, status)) {
      const newStatus = status === 'activate' ? 'active' : 'dormant';
      return res.status(200).json({
        status: 200,
        data: {
          accountNumber,
          status: newStatus,
        },
      });
    }
    return res.status(500).json({
      status: 500,
      error: `failed to ${status} account`,
    });
  }

  static delete(req, res) {
    const { accountNumber } = req.params;
    const accountRef = account.getAccount(parseInt(accountNumber, 10));

    if (!accountRef) {
      return res.status(404).json({
        status: 404,
        error: `Account ${accountNumber} does not exist`,
      });
    }
    const { id: accountId } = accountRef;
    if (!account.delete(accountId)) {
      return res.status(500).json({
        status: 500,
        error: 'failed to delete account',
      });
    }
    return res.status(200).json({
      status: 200,
      message: 'Account successfully deleted',
    });
  }
}

export default AccountController;
