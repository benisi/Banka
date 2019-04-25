/* eslint-disable no-unused-vars */

// converts for data to jsons format
const convertFormDataToJson = (formData, exclude) => {
  const jsonData = {};
  [].forEach.call(formData.elements, (element) => {
    if (element.type !== exclude) {
      jsonData[element.name] = element.value;
    }
  });
  return jsonData;
};

// remove element from dom
const removeFromDom = (elementIdentifier) => {
  elementIdentifier.remove();
};

// alert user, is remove from dom after some time
const alertUser = (time = 1000, backgroundClass = 'success', message = 'hello') => {
  let alertContainer = document.querySelector('.alert-container');
  const alertElement = document.createElement('div');
  alertElement.className = ['alert', backgroundClass].join(' ');
  const body = document.createElement('p');
  body.textContent = message;
  alertElement.appendChild(body);
  if (!alertContainer) {
    alertContainer = document.createElement('div');
    alertContainer.className = 'alert-container';
    alertContainer.appendChild(alertElement);
    document.querySelector('body').appendChild(alertContainer);
  } else {
    alertContainer.appendChild(alertElement);
  }

  setTimeout(() => {
    alertContainer.removeChild(alertElement);
  }, time);
};

// a customize confirm modal for user interaction
const confirmAction = (elementIdentifier, headmsg, body, yesCallback) => {
  document.querySelectorAll(elementIdentifier).forEach((element) => {
    element.addEventListener('click', (event) => {
      // create confirm html mockup
      const data = event.target.dataset.confirmdata;
      const backDrop = document.createElement('div');
      backDrop.className = 'backdrop';
      const card = document.createElement('div');
      card.className = 'modal-card paper-card';
      const cardHead = document.createElement('div');
      cardHead.className = 'modal-head';
      const cardBody = document.createElement('div');
      cardBody.className = 'modal-content';
      const confirmButton = document.createElement('div');
      confirmButton.className = 'confirm-btn';
      const yesBtn = document.createElement('button');
      yesBtn.className = 'form-submit btn-success';
      const noBtn = document.createElement('button');
      noBtn.className = 'form-submit btn-danger';
      const header = document.createElement('h3');
      header.textContent = headmsg;
      const paragraph = document.createElement('p');
      paragraph.textContent = body;
      yesBtn.textContent = 'Yes';
      noBtn.textContent = 'No';
      cardHead.appendChild(header);
      confirmButton.appendChild(yesBtn);
      confirmButton.appendChild(noBtn);
      cardBody.appendChild(paragraph);
      cardBody.appendChild(confirmButton);
      card.appendChild(cardHead);
      card.appendChild(cardBody);
      backDrop.appendChild(card);
      backDrop.style.display = 'block';
      document.querySelector('body').appendChild(backDrop);
      yesBtn.addEventListener('click', (clickEvent) => {
        if (clickEvent.currentTarget !== clickEvent.target) {
          return;
        }
        removeFromDom(backDrop);
        yesCallback(data);
      });
      noBtn.addEventListener('click', (clickEvent) => {
        if (clickEvent.currentTarget !== clickEvent.target) {
          return;
        }
        removeFromDom(backDrop);
      });
    });
  });
};

// popup alert just to convey information
const popUpAlert = (headmsg, body) => {
  const backDrop = document.createElement('div');
  backDrop.className = 'backdrop';
  const card = document.createElement('div');
  card.className = 'modal-card paper-card';
  const cardHead = document.createElement('div');
  cardHead.className = 'modal-head';
  const cardBody = document.createElement('div');
  cardBody.className = 'modal-content';
  const confirmButton = document.createElement('div');
  confirmButton.className = 'confirm-btn';
  const okBtn = document.createElement('button');
  okBtn.className = 'form-submit btn-success';
  const header = document.createElement('h3');
  header.textContent = headmsg;
  const paragraph = document.createElement('p');
  paragraph.textContent = body;
  okBtn.textContent = 'Ok';
  cardHead.appendChild(header);
  confirmButton.appendChild(okBtn);
  cardBody.appendChild(paragraph);
  cardBody.appendChild(confirmButton);
  card.appendChild(cardHead);
  card.appendChild(cardBody);
  backDrop.appendChild(card);
  backDrop.style.display = 'block';
  document.querySelector('body').appendChild(backDrop);
  okBtn.addEventListener('click', (clickEvent) => {
    if (clickEvent.currentTarget !== clickEvent.target) {
      return;
    }
    removeFromDom(backDrop);
  });
};

// create a modal
const modal = () => {
  document.querySelectorAll('.modal-action').forEach((element) => {
    element.addEventListener('click', (event) => {
      const id = event.target.parentNode.dataset.modalid;
      document.querySelector(`#${id}`).style.display = 'block';
    });
  });
  document.querySelectorAll('.modal').forEach((element) => {
    element.addEventListener('click', (event) => {
      const modalTarget = event.target;
      if (event.currentTarget !== event.target) {
        return;
      }
      modalTarget.target.style.display = 'none';
    });
  });

  document.querySelectorAll('.close').forEach((element) => {
    element.addEventListener('click', (event) => {
      const closeButtonTarget = event.target;
      if (event.currentTarget !== event.target) {
        return;
      }
      closeButtonTarget.parentNode.parentNode.parentNode.style.display = 'none';
    });
  });
};
