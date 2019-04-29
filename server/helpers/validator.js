import bcrypt from 'bcrypt-nodejs';

class Validator {
  static isUndefined(data) {
    if (data === undefined || data === '') {
      return true;
    }
    return false;
  }

  static isInteger(data) {
    if (/^\d+$/.test(data)) {
      return true;
    }
    return false;
  }

  static isNumber(data) {
    if (/^([0-9]*\.([0-9]+)?|[0-9]+)$/.test(data)) {
      return true;
    }
    return false;
  }

  static isString(data) {
    if (typeof data === 'string') {
      return true;
    }
    return false;
  }

  static isAName(data) {
    // regex from stackoverflow
    // eslint-disable-next-line no-useless-escape
    const trimmedName = data.trim();
    const nameRegex = /(^[a-z,.'-]{2,60}$)/i;
    if (nameRegex.test(trimmedName) && !/\s/.test(trimmedName)) {
      return true;
    }
    return false;
  }

  static isAnEmail(data) {
    // regex from emailregex.com
    // eslint-disable-next-line no-useless-escape
    const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (emailRegex.test(data)) {
      return true;
    }
    return false;
  }

  static isBoolean(data) {
    if (typeof data === 'boolean') {
      return true;
    }
    return false;
  }

  static isPassword(data) {
    // from regexlib.com
    const passwordRegex = /^(?=[^\d_].*?\d)\w(\w|[!@#$%]){7,20}/;
    if (passwordRegex.test(data)) {
      return true;
    }
    return false;
  }

  static checkPassword(myPlaintextPassword, hash) {
    return bcrypt.compareSync(myPlaintextPassword, hash);
  }

  static isPhoneNumber(data) {
    // eslint-disable-next-line no-useless-escape
    const phoneRegEx = /^[+]?[0-9]{11,14}$/;
    if (phoneRegEx.test(data)) {
      return true;
    }
    return false;
  }

  static isDateOfBirth(data) {
    // stack overflow https://www.oreilly.com/library/view/regular-expressions-cookbook/9781449327453/ch04s04.html
    const dateRegex = /^\d{4}-\d{1,2}-\d{1,2}$/;
    if (dateRegex.test(data)) {
      return true;
    }
    return false;
  }
}

export default Validator;
