import jwt from 'jsonwebtoken';

class Auth {
  static createToken(payload) {
    return jwt.sign(payload, 'key');
  }
}

export default Auth;
