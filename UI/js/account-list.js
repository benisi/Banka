const bankaData = JSON.parse(localStorage.getItem('BankaData'));
const { token } = bankaData || null;
const handlePagination = (page) => {
  let customerAccountDataDetails = '';
  const { customerAccountData } = bankaData;
  bankaData.currentPage = page;
  const startingIndex = page * 10 - 10;
  const paginatedData = customerAccountData.slice(startingIndex);
  const count = paginatedData.length < 10 ? paginatedData.length : 10;
  for (let i = startingIndex; i < (startingIndex + count); i += 1) {
    customerAccountDataDetails += `<tr>
        <td>${i + 1}</td>
        <td>${customerAccountData[i].firstName} ${customerAccountData[i].lastName}</td>
        <td>${customerAccountData[i].accountNumber}</td> 
        <td>${customerAccountData[i].type}</td>                        
        <td>&#8358;${customerAccountData[i].balance}</td>
        <td>${customerAccountData[i].status} <i class="fa fa-circle ${customerAccountData[i].status}"></i></td>
        <td>
            <a href="account-record.html" title="view account"><i class="action-icon fa fa-eye"></i></a>
            <a href="#" class="modal-action" title="delete account"><i class="action-icon delete-action fa fa-trash" data-confirmdata="${customerAccountData[i].accountNumber}"></i></a>
        </td>
      </tr>`;
  }
  const pages = customerAccountData.length / 10;
  let paginationData = '';
  for (let i = 0; i < pages < 1 ? 0 : pages; i += 1) {
    paginationData += `<a class="${i === 0 ? 'active' : ''} pagination-link" onclick="handlePagination(${i + 1}, event)" href="#">${i + 1}</a>`;
    bankaData.paginationCount = i + 1;
  }
  const pagination = `
    <a onclick="handleRlPagination('lf')" href="#">&laquo;</a>
      ${paginationData}
    <a onclick="handleRlPagination('rt')" href="#">&raquo;</a>`;
  document.querySelector('.pagination').innerHTML = pages > 1 ? pagination : '';
  document.querySelector('.data-container').innerHTML = customerAccountDataDetails;
  const paginationLinks = document.querySelectorAll('.pagination-link');
  paginationLinks.forEach((element) => {
    element.classList.remove('active');
  });
  if (paginationLinks.length > 0) {
    paginationLinks[page - 1].classList.add('active');
  }
  /* eslint-disable no-undef */
  confirmAction('.delete-action', 'Confirm Transaction', 'Are you sure you want to delete this account', (accountNumber, callerEvent) => {
    fetch(`${apiBaseUrl}accounts/${accountNumber}`, {
      method: 'DELETE',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: token,
      },
    })
      .then(data => data.json())
      .then((data) => {
        if (data.status === 401) {
          window.location.href = 'signin.html';
        }
        alertUser(2000, 'success', `account ${accountNumber} was deleted successful`);
        callerEvent.target.parentNode.parentNode.parentNode.remove();
      });
  });
};

// eslint-disable-next-line no-unused-vars
const handleRlPagination = (direction) => {
  const page = direction === 'rt' ? bankaData.currentPage + 1 : bankaData.currentPage - 1;
  let newPage = null;
  if (page < 1) {
    newPage = 1;
  } else if (page > bankaData.paginationCount) {
    newPage = bankaData.paginationCount;
  } else {
    newPage = page;
  }
  handlePagination(newPage);
};

// eslint-disable-next-line no-undef
fetch(`${apiBaseUrl}accounts`, {
  method: 'GET',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    Authorization: token,
  },
})
  .then(data => data.json())
  .then((data) => {
    if (data.status === 401) {
      window.location.href = 'signin.html';
    }
    bankaData.customerAccountData = data.data;
    localStorage.setItem('BankaData', JSON.stringify(bankaData));
    handlePagination(1);
  });
if (bankaData.customerAccountData) {
  handlePagination(1);
}
