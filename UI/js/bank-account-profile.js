/* eslint-disable no-undef */
const bankaData = JSON.parse(localStorage.getItem('BankaData'));
const template = `
<div class="paper-card paper-double">
<div>
    <img src="asset/user.jpeg" alt="user photo">
</div>
<p>Name : <span>${bankaData.firstName} ${bankaData.lastName}</span></p>
<p>Sex : <span>${bankaData.sex}</span></p>
<p>Phone : <span>${bankaData.phoneNumber}</span></p>
<p>Email : <span class="lower-case">${bankaData.email}</span></p>
</div>
<div class="paper-card paper-double">
<div>
    <h3 class="accent">Available Balance</h3>
    <span class="acc-bal">&#8358;${bankaData.selectedAccount.balance}</span>
</div>
<div>
    <p>Account Number : <span>${bankaData.selectedAccount.accountNumber}</span></p>
    <p>Account Type : <span>${bankaData.selectedAccount.type}</span></p>
    <p>Account Category : <span>${bankaData.selectedAccount.category}</span></p>
    <p><span><i class="fa fa-circle ${bankaData.selectedAccount.status}"></i></span>${bankaData.selectedAccount.status}</p>
</div>
</div>`;

document.querySelector('.content-container').innerHTML = template;
