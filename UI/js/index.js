function Ui(){
    // Activates side menu 
    this.sideBarInit = () => {
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
    };
    // creates floating navs for nav bar
    this.floatingNavInit = () => {
        window.addEventListener("scroll", () => {
            const topBar = document.querySelector(".top-bar");
            if (window.scrollY > 10) {
                topBar.classList.add("floating-nav");
            } else {
                topBar.classList.remove("floating-nav");
            }
        });
    };
    // create a modal
    this.modal = () => {
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
    };

    this.alert = ( time = 1000, backgroundClass = "success", message = "hello" ) => {
        let alertContainer = document.querySelector(".alert-container");
        const alertElement = document.createElement("div");
        alertElement.className = ["alert", backgroundClass].join(" ");
        const body = document.createElement("p");
        body.textContent = message;
        alertElement.appendChild(body);
        if (!alertContainer) {
            alertContainer = document.createElement("div");
            alertContainer.className = "alert-container";
            alertContainer.appendChild(alertElement);
            document.querySelector("body").appendChild(alertContainer);
        } else {
            alertContainer.appendChild(alertElement);
        }

        setTimeout(() => {
            alertContainer.removeChild(alertElement);
        }, time );
    };

    this.confirm = ( elementIdentifier, headmsg , body , yesCallback ) => {
        document.querySelectorAll(elementIdentifier).forEach( (element) => {
            element.addEventListener("click", (event) => {
                const data = event.target.dataset.confirmdata;
                const backDrop = document.createElement("div");
                backDrop.className = "backdrop";
                const card = document.createElement("div");
                card.className = "modal-card paper-card";
                const cardHead = document.createElement("div");
                cardHead.className = "modal-head";
                const cardBody = document.createElement("div");
                cardBody.className = "modal-content";
                const confirmButton = document.createElement("div");
                confirmButton.className = "confirm-btn";
                const yesBtn = document.createElement("button");
                yesBtn.className = "form-submit btn-success";
                const noBtn = document.createElement("button");
                noBtn.className = "form-submit btn-danger";
                const header = document.createElement("h3");
                header.textContent = headmsg;
                const paragraph = document.createElement("p");
                paragraph.textContent = body;
                yesBtn.textContent = "Yes";
                noBtn.textContent = "No";
                cardHead.appendChild(header);
                confirmButton.appendChild(yesBtn);
                confirmButton.appendChild(noBtn);
                cardBody.appendChild(paragraph);
                cardBody.appendChild(confirmButton);
                card.appendChild(cardHead);
                card.appendChild(cardBody);
                backDrop.appendChild(card);
                backDrop.style.display = "block";
                document.querySelector("body").appendChild(backDrop);
                yesBtn.addEventListener("click", (event) => {
                    if(event.currentTarget != event.target){
                        return;
                    }
                    this.removeFromDom(backDrop);
                    yesCallback(data);
                });
                noBtn.addEventListener("click", (event) => {
                    if(event.currentTarget !== event.target){
                        return;
                    }
                    this.removeFromDom(backDrop);
                });
             });
        });
    };
    this.removeFromDom = (elementIdentifier) => {
        elementIdentifier.remove();
    };
}

const ui = new Ui();
ui.sideBarInit();
ui.floatingNavInit();

