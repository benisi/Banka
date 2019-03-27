// toggle button class

document.querySelector(".toggle-btn").addEventListener("click", ( event ) => {
    event.preventDefault();
    const toggleIcon = document.querySelector(".toggle-btn").children[0];
    const sideBar = document.querySelector(".side-bar");
    sideBar.classList.toggle("remove-sidebar");
    const containBarsIcon = toggleIcon.classList.contains("fa-bars");
    if (containBarsIcon) {
        toggleIcon.classList.remove("fa-bars");
        toggleIcon.classList.add("fa-times", "turn");
    } else {
        toggleIcon.classList.remove("fa-times", "turn");
        toggleIcon.classList.add("fa-bars");
    }
});

window.addEventListener("scroll", () => {
    const topBar = document.querySelector(".top-bar");
    if (window.scrollY > 10) {
        topBar.classList.add("floating-nav");
    } else {
        topBar.classList.remove("floating-nav");
    }
});
// modal
document.querySelectorAll(".modal-action").forEach((element) => {
    element.addEventListener("click", (event) => {
       const id = event.target.parentNode.dataset.modalid;
       document.querySelector("#"+id).style.display = "block";
    });
});

document.querySelectorAll(".modal").forEach((element) => {
    element.addEventListener("click", (event) => {
        if (event.currentTarget !== event.target) {
            return;
          }
            event.target.style.display = "none";
    });
});

document.querySelectorAll(".close").forEach((element) => {
    element.addEventListener("click", (event) => {
            event.target.parentNode.style.display = "none";
    });
});


document.querySelector("#confirm-no").addEventListener( "click", () => {
    document.querySelector(".modal").style.display = "none";
});

function alert(time = 1000, backgroundClass = "success", message = "hello"){
    let alertContainer = document.querySelector(".alert-container");
    const alertElement = document.createElement("div");
    alertElement.className = ["alert", backgroundClass].join(" ");
    const body = document.createElement("p");
    body.textContent = message;
    alertElement.appendChild(body);
    if(!alertContainer){
        alertContainer = document.createElement("div");
        alertContainer.className = "alert-container";
        alertContainer.appendChild(alertElement);
        document.querySelector("body").appendChild(alertContainer);
    }else{
        alertContainer.appendChild(alertElement);
    }
    setTimeout(() => {
        alertContainer.removeChild(alertElement);
    }, time)

}
document.querySelector("#confirm-yes").addEventListener( "click", () => {
    document.querySelector(".modal").style.display = "none";
    alert(2000, "success", "Account transaction was successfully");
});
