import SqlModel from './sqlModel';
import pool from './dbConnection';

class Account extends SqlModel {
  async changeStatus(accountNumber, newStatus) {
    return this.updateWhere(['status'], ['accountNumber'], [accountNumber, newStatus]);
  }

  static async getAccountWithOwnerEmail(accountNumber) {
    const query = 'SELECT A.*,U.email, U.id FROM accounts A INNER JOIN users U ON A.owner = U.id WHERE "accountNumber"=$1;';
    return pool.query(query, [accountNumber]);
  }

  static async getAllAccountWithOwner(status = null) {
    const query = `SELECT A.*,U.email, U."firstName", U."lastName", U.sex FROM accounts A INNER JOIN users U ON A.owner = U.id ${status !== null ? 'WHERE status =$1' : ' '};`;
    return status ? pool.query(query, [status]) : pool.query(query);
  }

  static init() {
    const structure = [
      '"accountNumber"',
      'owner',
      'type',
      'status',
      'balance',
      'category',
    ];
    const account = new Account(structure);
    return account;
  }
}

export default Account;
