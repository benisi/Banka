class AccountValidator {
  static createAccountValidator(req, res, next) {
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
        error: 'category is a required field'
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
    return next();
  }

  static accountStatusValidator(req, res, next) {
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

    next();
  }
}

export default AccountValidator;
