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


sideBarInit();
floatingNavInit();
