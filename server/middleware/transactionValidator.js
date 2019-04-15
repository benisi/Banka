import account from '../database/account';
import validator from '../helper/validator';

const transactionValidator = (req, res, next) => {
  const { accountNumber } = req.params;
  const { amount } = req.body;
  const accountRef = account.getAccount(parseInt(accountNumber, 10));

  if (!accountRef) {
    return res.status(404).json({
      status: 404,
      error: `Account ${accountNumber} does not exist`
    });
  }

  if (validator.isUndefined(amount)) {
    return res.status(400).json({
      status: 400,
      error: 'Amount is required'
    });
  }

  if (typeof amount !== 'number') {
    return res.status(400).json({
      status: 400,
      error: 'Amount must be a number'
    });
  }

  req.body.accountData = accountRef;

  return next();
};

export default transactionValidator;
