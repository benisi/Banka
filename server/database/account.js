import Model from './model';

class Account extends Model {

}

const structure = {
  accountNumber: Number,
  createdOn: Object,
  owner: Number,
  type: String,
  status: String,
  balance: Number,
};

const account = new Account(structure);

export default account;
