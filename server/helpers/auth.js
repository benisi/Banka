import jwt from 'jsonwebtoken';

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
        error: 'No token supplied',
      });
    }

    const key = process.env.SECRET || 'key';

    jwt.verify(token, key, (err, decoded) => {
      if (err) {
        return res.status(401).json({
          status: 401,
          error: 'Invalid token',
        });
      }
      req.body.id = decoded.id;
      req.body.isAdmin = decoded.isAdmin;
      req.body.role = decoded.type;
      return next();
    });
    return true;
  }

  static allowOnlyAdminStaff(req, res, next) {
    const { role: type, isAdmin } = req.body;
    if ((!isAdmin && type !== 'staff')) {
      return res.status(403).json({
        status: 403,
        error: 'You are not Authorize to perform this operation',
      });
    }
    return next();
  }

  static allowOnlyStaff(req, res, next) {
    const { role: type } = req.body;
    if (type !== 'staff') {
      return res.status(403).json({
        status: 403,
        error: 'You are not Authorize to perform this operation',
      });
    }
    return next();
  }
}

export default Auth;
