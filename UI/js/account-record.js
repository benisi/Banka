/* eslint-disable no-undef */
confirmAction('.modal-action', 'Confirm Transaction', 'Are you sure you want to deactivate this account', () => {
  alertUser(2000, 'success', 'Account was deactivated successfully');
});
