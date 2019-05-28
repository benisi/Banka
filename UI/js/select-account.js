/* eslint-disable no-undef */
const bankaData = JSON.parse(localStorage.getItem('BankaData'));
let accounts = null;
const { token, email } = bankaData || null;
fetch(`${apiBaseUrl}user/${email}/accounts`, {
  method: 'GET',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    Authorization: token,
  },
})
  .then(data => data.json())
  .then((data) => {
    const container = document.querySelector('.content-container');
    if (data.status === 401) {
      window.location.href = 'signin.html';
    }
    if (data.status === 404) {
      container.innerHTML = `
            <div class="paper-card pd-2">
                <h3>You don't have an account yet</h3>
                <p>Kindly create one now by clicking <a href="create-account.html">here</a></p>
            </div>`;
    } else {
      let template = '';
      accounts = data.data;
      data.data.forEach((accountDetails, index) => {
        template += `
            <div class="paper-card bank-accounts ms-2">
                <div class="paper-head">
                    ${accountDetails.accountNumber}
                </div>
                <div class="paper-body">
                    <p>Type: ${accountDetails.type}</p>
                    <p>Status: ${accountDetails.status} <i class="fa fa-circle ${accountDetails.status}"></i></p>
                    <p><a class="footer-link account-selector" onclick="accountSelectionHandler(event)" data-accountId=${index} href="bank-account-profile.html">Go to dashboard</a></p>
                </div>
            </div> `;
      });

      if (template !== '') {
        container.innerHTML = template;
      }
    }
  });

// eslint-disable-next-line no-unused-vars
const accountSelectionHandler = (accountReference) => {
  accountReference.preventDefault();
  const selectedAccountIndex = accountReference.target.dataset.accountid;
  bankaData.selectedAccount = accounts[selectedAccountIndex];
  bankaData.transactionData = null;
  localStorage.setItem('BankaData', JSON.stringify(bankaData));
  window.location.href = 'bank-account-profile.html';
};
