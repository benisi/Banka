/* eslint-disable no-undef */
const apiBaseUrl = 'https://benisi-banka.herokuapp.com/api/v1/';
const signIn = document.querySelector('#signin');
// event listener for form submission
signIn.addEventListener('submit', (event) => {
  document.querySelector('#spin').style.visibility = 'visible';
  event.preventDefault();
  // converts form input fields to json equavalent
  const formData = convertFormDataToJson(event.target, 'submit');
  const spinner = document.querySelector('#spin');
  // consuming api - sending sign up data to server
  fetch(`${apiBaseUrl}auth/signin`, {
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
        popUpAlert('Validation error', data.error.toLowerCase());
      } else {
        popUpAlert('Success', 'Login was successful');
        localStorage.setItem('BankaData', JSON.stringify(data.data[0]));
        // redirect user to dashboard on successful sign up
        window.location.href = 'bank-account-profile.html';
      }
    });
  return true;
});
