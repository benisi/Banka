import validator from '../helpers/validator';

const transactionValidator = (req, res, next) => {
  const { amount } = req.body;
  if (validator.isUndefined(amount)) {
    return res.status(400).json({
      status: 400,
      error: 'Amount is required',
    });
  }

  if (amount < 0) {
    return res.status(400).json({
      status: 400,
      error: 'Amount should not be a negative number',
    });
  }

  if (typeof amount !== 'number') {
    return res.status(400).json({
      status: 400,
      error: 'Amount must be a number',
    });
  }

  return next();
};

export default transactionValidator;
