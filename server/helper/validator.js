import bcrypt from 'bcrypt';

class Validator {
  static isUndefined(data) {
    if (data === undefined) {
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

  static isEmpty(data) {
    if (data === '') {
      return true;
    }
    return false;
  }

  static itIsAName(data) {
    // regex from stackoverflow
    // eslint-disable-next-line no-useless-escape
    const nameRegex = /(^[a-z ,.'-]{2,60}$)/i;
    if (nameRegex.test(data)) {
      return true;
    }
    return false;
  }

  static itIsAnEmail(data) {
    // regex from emailregex.com
    // eslint-disable-next-line no-useless-escape
    const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (emailRegex.test(data)) {
      return true;
    }
    return false;
  }

  static itIsBoolean(data) {
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
    const dateRegex = /^[0-3]?[0-9]\/[0-3]?[0-9]\/(?:[0-9]{2})?[0-9]{2}$/;
    if (dateRegex.test(data)) {
      return true;
    }
    return false;
  }
}

export default Validator;
