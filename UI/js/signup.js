/* eslint-disable no-undef */
const apiBaseUrl = 'https://benisi-banka.herokuapp.com/api/v1/';
const signUp = document.querySelector('#signUp');
// event listener for form submission
signUp.addEventListener('submit', (event) => {
  document.querySelector('#spin').style.visibility = 'visible';
  event.preventDefault();
  // converts form input fields to json equavalent
  const formData = convertFormDataToJson(event.target, 'submit');
  const spinner = document.querySelector('#spin');
  if (formData.password !== formData.verifyPassword) {
    // check if verify password and password match
    spinner.style.visibility = 'hidden';
    popUpAlert('Validation Error', 'Password and verify Password don\'t match');
    document.querySelector('#password').focus();
    return false;
  }
  // consuming api - sending sign up data to server
  fetch(`${apiBaseUrl}auth/signup`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(formData),
  })
    .then(data => data.json())
    .then((data) => {
      spinner.style.visibility = 'hidden';
      if (data.error) {
        popUpAlert('Validation error', data.error);
      } else {
        localStorage.setItem('BankaData', JSON.stringify(data.data[0]));
        popUpAlert('Success', `${data.data[0].firstName} your registration was successful, redirecting to dashboard`);
        // redirect user to dashboard on successful sign up
        window.location.href = 'bank-account-profile.html';
      }
    });
  return true;
});
