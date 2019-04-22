import validator from '../helpers/validator';

class AccountValidator {
  static createAccountValidator(req, res, next) {
    const { type, category } = req.body;

    if (type === undefined) {
      return res.status(400).json({
        status: 400,
        error: 'Type is a required field',
      });
    }

    if (category === undefined) {
      return res.status(400).json({
        status: 400,
        error: 'category is a required field',
      });
    }

    if (!['current', 'savings'].includes(type)) {
      return res.status(400).json({
        status: 400,
        error: 'Invalid type, only accept [ current, savings ]',
      });
    }

    if (!['individual', 'organization'].includes(category)) {
      return res.status(400).json({
        status: 400,
        error: 'Invalid category, only accept [ individual, organization ]',
      });
    }
    return next();
  }

  static accountStatusValidator(req, res, next) {
    const { status } = req.body;

    if (status === undefined) {
      return res.status(400).json({
        status: 400,
        error: 'status is a required field',
      });
    }
    if (!['activate', 'deactivate'].includes(status)) {
      return res.status(400).json({
        status: 400,
        error: 'Invalid status, only accept [ activate, deactivate ]',
      });
    }

    return next();
  }

  static getAccountValidtor(req, res, next) {
    const { accountNumber } = req.params;
    const validAccountNumber = parseInt(accountNumber, 10);
    if (!Number.isInteger(validAccountNumber)) {
      return res.status(400).json({
        status: 400,
        error: 'account number must be an integer',
      });
    }
    return next();
  }

  static checkForValidId(req, res, next) {
    const { transactionId } = req.params;
    const validTransactionId = parseInt(transactionId, 10);
    if (Number.isInteger(validTransactionId) !== true) {
      return res.status(400).json({
        status: 400,
        error: 'Transaction id must be an integer',
      });
    }
    return next();
  }

  static checkForValidEmail(req, res, next) {
    const { userEmail } = req.params;
    if (!validator.itIsAnEmail(userEmail)) {
      return res.status(400).json({
        status: 400,
        error: 'Invalid email',
      });
    }
    return next();
  }
}

export default AccountValidator;
