import user from '../database/user';

class AccountValidator {
  static create(req, res, next) {
    const { type, category } = req.body;

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
    const userId = parseInt(req.body.decoded, 10);
    const userData = user.find(userId);
    const { type, isAdmin } = userData;
    if ((!isAdmin && type !== 'staff')) {
      return res.status(401).json({
        status: 401,
        error: 'You are not Authorize to perform this operation'
      });
    }
    next();
  }
}

export default AccountValidator;
