const validAccountData = {
  type: 'savings',
  category: 'individual',
};
const invalidAccountType = {
  type: 'error',
  category: 'individual',
};
const invalidAccountCategory = {
  type: 'savings',
  category: 'cooperate',
};
const undefinedAccountType = {
  type: undefined,
  category: 'cooperate',
};
const undefinedAccountCategory = {
  type: 'savings',
  category: undefined,
};

const activateAccountData = {
  status: 'deactivate',
};
const undefinedAccountStatus = {
  status: undefined,
};
const invalidAccountStatus = {
  status: 'error',
};

export {
  validAccountData, invalidAccountType, invalidAccountCategory, activateAccountData,
  undefinedAccountType, undefinedAccountCategory, undefinedAccountStatus, invalidAccountStatus,
};
