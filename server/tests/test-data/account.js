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

export {
  validAccountData, invalidAccountType, invalidAccountCategory
};
