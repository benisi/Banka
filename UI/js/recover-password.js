/* eslint-disable no-undef */
const createAccount = document.querySelector('#form');
// event listener for form submission
createAccount.addEventListener('submit', (event) => {
  event.preventDefault();
  alertUser(2000, 'success', 'Please check your email for recovery link');
  window.location.href = 'change-password.html';
  return true;
});
