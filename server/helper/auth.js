import jwt from 'jsonwebtoken';

class Auth {
  static createToken(payload) {
    return jwt.sign(payload, 'key');
  }

  static verifyToken(req, res, next) {
    const token = req.headers.authorization;
    if (!token) {
      return res.status(400).json({
        status: 400,
        error: 'No token supplied'
      });
    }

    jwt.verify(token, 'key', (err, decoded) => {
      if (err) {
        return res.status(400).json({
          status: 400,
          error: 'Invalid token'
        });
      }

      req.body.decoded = decoded;
      return next();
    });
  }
}

export default Auth;
