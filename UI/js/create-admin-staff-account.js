/* eslint-disable no-undef */
const createAccount = document.querySelector('#form');
// event listener for form submission
createAccount.addEventListener('submit', (event) => {
  event.preventDefault();
  const formData = convertFormDataToJson(event.target, 'submit');
  if (formData.password !== formData.verifyPassword) {
    // check if verify password and password match
    popUpAlert('Validation Error', 'Password and verify Password don\'t match');
    document.querySelector('#password').focus();
    return false;
  }
  alertUser(2000, 'success', 'Account was created successfully');
  return true;
});
