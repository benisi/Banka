import account from '../../database/account';

class AccountController {
  static create(req, res) {
    const accountData = req.body;
    accountData.accountNumber = account.generateAccountNumber();
    accountData.balance = parseFloat('0.10');
    accountData.status = 'active';
    accountData.createdOn = new Date();
    const createdAccount = account.create(accountData);
    const { balance, ...responseData } = createdAccount;
    responseData.openingBalance = balance;
    const {
      firstName, lastName, email, title
    } = accountData.ownerData;
    const data = {
      firstName, lastName, email, title, ...responseData
    };
    res.status(201).json({
      status: 201,
      data
    });
  }

  static status(req, res) {
    const { status, accountRef, accountNumber } = req.body;
    if (account.changeStatus(accountRef, status)) {
      const newStatus = status === 'activate' ? 'active' : 'dormant';
      return res.status(200).json({
        status: 200,
        data: {
          accountNumber,
          status: newStatus
        }
      });
    }
    return res.status(500).json({
      status: 500,
      error: `failed to ${status} account`
    });
  }

  static delete(req, res) {
    return res.status(200).json({
      status: 200,
      message: 'Account successfully deleted'
    });
  }
}

export default AccountController;
