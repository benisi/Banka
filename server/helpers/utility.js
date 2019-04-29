import mailgun from 'mailgun-js';
import dotenv from 'dotenv';

dotenv.config();

class Utility {
  static convertToArray(data) {
    const outputData = [];
    if ((typeof data === 'object')) {
      data.forEach((element) => {
        outputData.push(typeof element === 'string' ? element.trim() : element);
      });
      return outputData;
    }
    return [data];
  }

  static trimString(data) {
    if (typeof data === 'string') {
      return data.trim();
    }
    return data;
  }

  static generateAccountNumber(type, trackId) {
    const accountCode = type === 'current' ? 300 : 120;
    const branchCode = 115;
    const accountId = trackId;
    return `${branchCode}${accountCode}${accountId}`;
  }

  static sendMail(accountNumber, price, email, type) {
    const apiKey = process.env.APIKEY;
    const domain = process.env.DOMAIN;
    const mailgunInstance = mailgun({ apiKey, domain });

    const data = {
      from: 'Banka <postmaster@sandbox1beeb80c724a4e5abf75638c32199ed4.mailgun.org>',
      to: `Customer <${email}>`,
      subject: 'Transaction successful',
      html: `
            <h3>BANKA ALERT</h3>
            <p>NGN${price} have been ${type}ed ${type === 'credit' ? 'to' : 'from'} your account ${accountNumber}</p>`,
    };

    mailgunInstance.messages().send(data, (error, body) => {
      console.log(body, 'test');
    });
  }
}


export default Utility;
