import Model from './model';

class Transaction extends Model {

}

const structure = {
  createdOn: Object,
  type: String,
  accountNumber: Number,
  cashier: Number,
  amount: Number,
  oldBalance: Number,
  newNumber: Number
};
const transaction = new Transaction(structure);

export default transaction;
