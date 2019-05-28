
const bankaData = JSON.parse(localStorage.getItem('BankaData'));
const handlePagination = (page) => {
  let transactions = '';
  let transactionDetails = '';
  const { transactionData } = bankaData;
  bankaData.currentPage = page;
  const startingIndex = page * 10 - 10;
  const paginatedData = transactionData.slice(startingIndex);
  const count = paginatedData.length < 10 ? paginatedData.length : 10;
  for (let i = startingIndex; i < (startingIndex + count); i += 1) {
    transactions += `<tr>
        <td>${i + 1}</td>
        <td>${transactionData[i].id}</td>
        <td>${transactionData[i].type}</td>
        <td>&#8358;${transactionData[i].amount}</td>
        <td>${transactionData[i].createdOn.split('T')[0]}</td>
        <td><a href="#" class="modal-action" data-modalId="modal${transactionData[i].id}"><i class="action-icon fa fa-eye"></i></a></td>
      </tr>`;
    transactionDetails += `
      <div id="modal${transactionData[i].id}" class="modal backdrop">
      <div class="modal-card paper-card">
          <div class="modal-head">
              <i class="close fa fa-times"></i>
              <h3>Transaction details</h3>
          </div>
          <div class="modal-content">
              <p>Transaction id : ${transactionData[i].id}</p>
              <p>Transaction type : ${transactionData[i].type}</p>
              <p>Amount : &#8358;${transactionData[i].amount}</p>
              <p>Transaction Date : ${transactionData[i].createdOn.split('T')[0]}</p>
          </div>
      </div>
      </div>
      `;
  }
  const pages = transactionData.length / 10;
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
  document.querySelector('.data-container').innerHTML = transactions;
  document.querySelector('.modal-container').innerHTML = transactionDetails;
  const paginationLinks = document.querySelectorAll('.pagination-link');
  paginationLinks.forEach((element) => {
    element.classList.remove('active');
  });
  if (paginationLinks.length > 0) {
    paginationLinks[page - 1].classList.add('active');
  }

  // eslint-disable-next-line no-undef
  modal();
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

const { token } = bankaData || null;
const { accountNumber } = bankaData.selectedAccount;
// eslint-disable-next-line no-undef
fetch(`${apiBaseUrl}accounts/${accountNumber}/transactions`, {
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
    bankaData.transactionData = data.data;
    localStorage.setItem('BankaData', JSON.stringify(bankaData));
    handlePagination(1);
  });
if (bankaData.transactionData) {
  handlePagination(1);
}
