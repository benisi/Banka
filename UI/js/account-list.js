/* eslint-disable no-undef */
confirmAction('.delete-action', 'Confirm Transaction', 'Are you sure you want to delete this account', (data) => {
  alertUser(2000, 'success', `${data} account was deleted successful`);
});
