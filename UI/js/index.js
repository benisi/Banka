/* eslint-disable no-unused-vars */
// Activates side menu
const sideBarInit = () => {
  document.querySelector('.toggle-btn').addEventListener('click', (event) => {
    event.preventDefault();
    const toggleIcon = document.querySelector('.toggle-btn').children[0];
    const sideBar = document.querySelector('.side-bar');
    sideBar.classList.toggle('remove-sidebar');
    const containBarsIcon = toggleIcon.classList.contains('fa-bars');

    if (containBarsIcon) {
      toggleIcon.classList.remove('fa-bars');
      toggleIcon.classList.add('fa-times', 'turn');
    } else {
      toggleIcon.classList.remove('fa-times', 'turn');
      toggleIcon.classList.add('fa-bars');
    }
  });
};

// creates floating navs for nav bar
const floatingNavInit = () => {
  window.addEventListener('scroll', () => {
    const topBar = document.querySelector('.top-bar');
    if (window.scrollY > 10) {
      topBar.classList.add('floating-nav');
    } else {
      topBar.classList.remove('floating-nav');
    }
  });
};

const populateSidebar = () => {
  const bankaData = JSON.parse(localStorage.getItem('BankaData'));
  document.querySelectorAll('.name').forEach((element) => {
    const nameElement = element;
    nameElement.innerText = `${bankaData.firstName} ${bankaData.lastName}`;
  });
  document.querySelectorAll('.account-type').forEach((element) => {
    const nameElement = element;
    nameElement.innerText = `${bankaData.selectedAccount.type}`;
  });
  document.querySelectorAll('.account-number').forEach((element) => {
    const nameElement = element;
    nameElement.innerText = `${bankaData.selectedAccount.accountNumber}`;
  });
};


sideBarInit();
floatingNavInit();
populateSidebar();
