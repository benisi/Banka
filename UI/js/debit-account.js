/* eslint-disable no-undef */

document.querySelector('#amount').addEventListener('keyup', (event) => {
  const amountSelector = event.target;
  const amountSubmitButton = document.querySelector('#amountAction');
  const data = amountSelector.value;
  if (Number.isNaN(parseInt(data, 10))) {
    amountSubmitButton.disabled = true;
    const text = document.createElement('p');
    text.innerText = 'Please enter a number';
    text.style.color = 'red';
    text.className = 'errorText';
    const errorText = document.querySelector('.errorText');
    if (!errorText) {
      amountSelector.parentNode.appendChild(text);
    }
    amountSelector.focus();
    amountSelector.parentNode.style.border = '1px solid red';
  } else {
    amountSubmitButton.disabled = false;
    amountSelector.parentNode.style.border = '1px solid #e3e5e9';
    const errorText = document.querySelector('.errorText');
    if (errorText) {
      errorText.remove();
    }
  }
});
confirmAction('.modal-action', 'Confirm Transaction', 'Are you sure you want to debit this account', () => {
  alertUser(2000, 'success', 'Account debit was successful');
});
