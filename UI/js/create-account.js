/* eslint-disable no-undef */
const createAccount = document.querySelector('#form');
// event listener for form submission
createAccount.addEventListener('submit', (event) => {
  event.preventDefault();
  alertUser(2000, 'success', 'Account was created successfully');
  window.location.href = 'select-account.html';
  return true;
});
