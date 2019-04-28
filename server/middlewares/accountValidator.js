import validator from '../helpers/validator';
import Response from '../helpers/Response';
import utility from '../helpers/utility';

class AccountValidator {
  static createAccountValidator(req, res, next) {
    const { type, category } = req.body;

    if (type === undefined) {
      return Response.error(res, 400, 'Type is a required field');
    }

    if (category === undefined) {
      return Response.error(res, 400, 'category is a required field');
    }

    if (!['current', 'savings'].includes(utility.trimString(type))) {
      return Response.error(res, 400, 'Invalid type, only accept [ current, savings ]');
    }

    if (!['individual', 'organization'].includes(utility.trimString(category))) {
      return Response.error(res, 400, 'Invalid category, only accept [ individual, organization ]');
    }
    return next();
  }

  static accountStatusValidator(req, res, next) {
    const { status } = req.body;

    if (status === undefined) {
      return Response.error(res, 400, 'status is a required field');
    }
    if (!['activate', 'deactivate'].includes(utility.trimString(status))) {
      return Response.error(res, 400, 'Invalid status, only accept [ activate, deactivate ]');
    }

    return next();
  }

  static getAccountValidtor(req, res, next) {
    const { accountNumber } = req.params;
    if (!validator.isInteger(accountNumber)) {
      return Response.error(res, 400, 'account number must be an integer');
    }
    return next();
  }

  static checkForValidId(req, res, next) {
    const { transactionId } = req.params;
    if (!validator.isInteger(transactionId)) {
      return Response.error(res, 400, 'Transaction id must be an integer');
    }
    return next();
  }

  static checkForValidEmail(req, res, next) {
    const { userEmail } = req.params;
    if (!validator.isAnEmail(utility.trimString(userEmail))) {
      return Response.error(res, 400, 'Invalid email');
    }
    return next();
  }
}

export default AccountValidator;
