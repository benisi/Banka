/* eslint-disable no-undef */
const form = document.querySelector('#form');
// event listener for form submission
form.addEventListener('submit', (event) => {
  event.preventDefault();
  // converts form input fields to json equavalent
  const formData = convertFormDataToJson(event.target, 'submit');
  if (formData.password !== formData.verifyPassword) {
    // check if verify password and password match
    popUpAlert('Validation Error', 'Password and verify Password don\'t match');
    document.querySelector('#password').focus();
    return false;
  }
  // consuming api - sending sign up data to server
  window.location.href = 'select-account.html';

  return true;
});
