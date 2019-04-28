import validator from '../helpers/validator';
import Response from '../helpers/Response';

const transactionValidator = (req, res, next) => {
  const { amount } = req.body;
  if (validator.isUndefined(amount)) {
    return Response.error(res, 400, 'Amount is requires');
  }

  if (amount < 0) {
    return Response.error(res, 400, 'Amount should not be a negative number');
  }

  if (typeof amount !== 'number') {
    return Response.error(res, 400, 'Amount must be a number');
  }

  return next();
};

export default transactionValidator;
