import jwt from 'jsonwebtoken';
import user from '../database/user';

class Auth {
  static createToken(payload) {
    const key = process.env.SECRET || 'key';
    return jwt.sign(payload, key, { expiresIn: '2d' });
  }

  static verifyToken(req, res, next) {
    const token = req.headers.authorization || req.body.token;
    if (!token) {
      return res.status(400).json({
        status: 400,
        error: 'No token supplied'
      });
    }

    const key = process.env.SECRET || 'key';

    jwt.verify(token, key, (err, decoded) => {
      if (err) {
        return res.status(401).json({
          status: 401,
          error: 'Invalid token'
        });
      }

      req.body.decoded = decoded.id;
      return next();
    });
  }

  static allowOnlyAdminStaff(req, res, next) {
    const userId = parseInt(req.body.decoded, 10);
    const userData = user.find(userId);
    const { type, isAdmin } = userData;
    if ((!isAdmin && type !== 'staff')) {
      return res.status(403).json({
        status: 403,
        error: 'You are not Authorize to perform this operation'
      });
    }
    return next();
  }

  static allowOnlyStaff(req, res, next) {
    const userId = parseInt(req.body.decoded, 10);
    const userData = user.find(userId);
    const { type } = userData;
    if (type !== 'staff') {
      return res.status(403).json({
        status: 403,
        error: 'You are not Authorize to perform this operation'
      });
    }
    return next();
  }
}

export default Auth;
