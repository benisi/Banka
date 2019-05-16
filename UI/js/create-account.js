/* eslint-disable no-undef */
const createAccount = document.querySelector('#form');
// event listener for form submission
createAccount.addEventListener('submit', (event) => {
  document.querySelector('#spin').style.visibility = 'visible';
  event.preventDefault();
  const formData = convertFormDataToJson(event.target, 'submit');
  const spinner = document.querySelector('#spin');
  // consuming api - sending create account data to server
  const bankaData = JSON.parse(localStorage.getItem('BankaData'));
  const token = bankaData ? bankaData.token : null;
  fetch(`${apiBaseUrl}accounts`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: token,
    },
    body: JSON.stringify(formData),
  })
    .then(data => data.json())
    .then((data) => {
      spinner.style.visibility = 'hidden';
      if (data.error) {
        if (data.status === 401) {
          window.location = 'signin.html';
        }
        popUpAlert('Validation error', data.error.toLowerCase());
      } else {
        popUpAlert('Success', 'Account was created successful');
        // redirect user to dashboard on successful sign up
        window.location.href = 'select-account.html';
      }
    });
});
