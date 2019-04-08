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
}

export default AccountController;