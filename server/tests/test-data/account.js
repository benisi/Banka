const validAccountData = {
  type: 'savings',
  category: 'individual'
};
const invalidAccountType = {
  type: 'error',
  category: 'individual'
};
const invalidAccountCategory = {
  type: 'savings',
  category: 'cooperate'
};
const activateAccountData = {
  status: 'active'
};

export {
  validAccountData, invalidAccountType, invalidAccountCategory, activateAccountData
};
