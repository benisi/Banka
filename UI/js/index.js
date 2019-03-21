// toggle button class

document.querySelector(".toggle-btn").addEventListener('click', (e) => {
    e.preventDefault();
    const toggleIcon = document.querySelector(".toggle-btn").children[0];
    document.querySelector(".side-bar").classList.toggle("hidden");
    const containBarsIcon = toggleIcon.classList.contains("fa-bars");
    if(containBarsIcon){
        toggleIcon.classList.remove("fa-bars");
        toggleIcon.classList.add("fa-times");
        toggleIcon.classList.add("turn");
    }else{
        toggleIcon.classList.remove("fa-times");
        toggleIcon.classList.remove("turn");
        toggleIcon.classList.add("fa-bars");
    }
})