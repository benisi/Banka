import user from '../database/user';
import account from '../database/account';

class AccountValidator {
  static create(req, res, next) {
    const { type, category } = req.body;

    if (type === undefined) {
      return res.status(400).json({
        status: 400,
        error: 'Type is a required field'
      });
    }

    if (category === undefined) {
      return res.status(400).json({
        status: 400,
        error: 'cayegory is a required field'
      });
    }

    if (!['current', 'savings'].includes(type)) {
      return res.status(400).json({
        status: 400,
        error: 'Invalid type, only accept [ current, savings ]'
      });
    }

    if (!['individual', 'organization'].includes(category)) {
      return res.status(400).json({
        status: 400,
        error: 'Invalid category, only accept [ individual, organization ]'
      });
    }

    const ownerId = parseInt(req.body.decoded, 10);
    const ownerData = user.find(ownerId);
    if (!ownerData) {
      res.status(400).json({
        status: 400,
        error: 'Invalid account owner'
      });
    }
    req.body.ownerData = ownerData;
    req.body.owner = ownerId;
    return next();
  }

  static status(req, res, next) {
    const { status } = req.body;

    if (status === undefined) {
      return res.status(400).json({
        status: 400,
        error: 'status is a required field'
      });
    }
    if (!['activate', 'deactivate'].includes(status)) {
      return res.status(400).json({
        status: 400,
        error: 'Invalid status, only accept [ activate, deactivate ]'
      });
    }
    const { accountNumber } = req.params;
    const accountRef = account.getAccount(parseInt(accountNumber, 10));

    if (!accountRef) {
      return res.status(400).json({
        status: 400,
        error: `Account ${accountNumber} does not exist`
      });
    }

    req.body.accountRef = accountRef;
    req.body.accountNumber = accountNumber;

    next();
  }

  static delete(req, res, next) {
    const { accountNumber } = req.params;
    const accountRef = account.getAccount(parseInt(accountNumber, 10));

    if (!accountRef) {
      return res.status(400).json({
        status: 400,
        error: `Account ${accountNumber} does not exist`
      });
    }
    const { id } = accountRef;
    req.body.accountId = id;
    return next();
  }
}

export default AccountValidator;
