import jwt from 'jsonwebtoken';
import Response from './Response';

class Auth {
  static createToken(payload) {
    const key = process.env.SECRET || 'key';
    return jwt.sign(payload, key, { expiresIn: '1d' });
  }

  static verifyToken(req, res, next) {
    const token = req.headers.authorization || req.body.token;
    if (!token) {
      return Response.error(res, 400, 'No token supplied');
    }

    const key = process.env.SECRET || 'key';

    jwt.verify(token, key, (err, decoded) => {
      if (err) {
        return Response.error(res, 401, 'Invalid token');
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
      return Response.error403(res);
    }
    return next();
  }

  static allowOnlyStaff(req, res, next) {
    const { role: type } = req.body;
    if (type !== 'staff') {
      return Response.error403(res);
    }
    return next();
  }

  static allowOnlyAdmin(req, res, next) {
    const { isAdmin } = req.body;
    if (!isAdmin) {
      return Response.error403(res);
    }
    return next();
  }

  static allowOnlySuperAdmin(req, res, next) {
    const { isSuperAdmin } = req.body;
    if (isSuperAdmin === undefined) {
      return Response.error(res, 400, 'No admin secret');
    }
    if (typeof isSuperAdmin !== 'boolean') {
      return Response.error(res, 400, 'invalid admin secret');
    }
    return next();
  }
}

export default Auth;
