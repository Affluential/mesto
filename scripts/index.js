const popup = document.querySelector(".js__popup-input");
const popupAdd = document.querySelector(".js__popup-add");
const editButton = document.querySelector(".profile__edit-button");
const closeButton = document.querySelector(".popup__close-button");
const closeAddButton = document.querySelector(".js__add_close");
const saveForm = document.querySelector(".popup__container");
const profileName = document.querySelector(".profile__name");
const profileStatus = document.querySelector(".profile__status");
const inputName = document.querySelector(".popup__input-item_change_name");
const inputStatus = document.querySelector(".popup__input-item_change_status");
const addButton = document.querySelector(".profile__add-button");
const templateCard = document.querySelector(".template-card").content;
const ulCards = document.querySelector(".cards");

const addInputValue = document.querySelector(".popup__input-item_change_value");
const addInputImage = document.querySelector(".popup__input-item_change_image");
const addSaveForm = document.querySelector(".js__popup__container");

const addSave = (e) => {
  e.preventDefault();
};

const openPopup = () => {
  popup.classList.toggle("popup_is-opened");
  inputName.value = profileName.textContent;
  inputStatus.value = profileStatus.textContent;
};

const closePopup = () => {
  popup.classList.toggle("popup_is-opened");
};

const toggleAddPopup = () => {
  popupAdd.classList.toggle("popup_is-opened");
};

const popupCloseByClickOnShadow = () => {
  if (event.target != event.currentTarget) {
    return;
  }
  closePopup();
};

const saveInput = (e) => {
  e.preventDefault();
  profileName.textContent = inputName.value;
  profileStatus.textContent = inputStatus.value;
  popup.classList.toggle("popup_is-opened");
};

const initialCards = [
  {
    name: "Архыз",
    link:
      "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg",
  },
  {
    name: "Челябинская область",
    link:
      "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg",
  },
  {
    name: "Иваново",
    link:
      "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg",
  },
  {
    name: "Камчатка",
    link:
      "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg",
  },
  {
    name: "Холмогорский район",
    link:
      "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg",
  },
  {
    name: "Байкал",
    link:
      "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg",
  },
];

function addCard(cardObject, index) {
  const htmlElement = templateCard.cloneNode(true);
  htmlElement.querySelector(
    ".card__image"
  ).style.backgroundImage = `url(${cardObject.link})`;
  htmlElement.querySelector(".card__title").innerText = cardObject.name;
  ulCards.appendChild(htmlElement);
}

const submitSaveForm = (e) => {
  e.preventDefault();
  const newCard = {
    name: addInputValue.value,
    link: addInputImage.value,
  };
  const htmlElement = templateCard.cloneNode(true);
  htmlElement.querySelector(
    ".card__image"
  ).style.backgroundImage = `url(${newCard.link})`;
  htmlElement.querySelector(".card__title").innerText = newCard.name;
  ulCards.prepend(htmlElement);
  reset();
  toggleAddPopup();
};

function reset() {
  addInputValue.value = "";
  addInputImage.value = "";
}

initialCards.forEach(addCard);

editButton.addEventListener("click", openPopup);
closeButton.addEventListener("click", closePopup);
saveForm.addEventListener("submit", saveInput);
popup.addEventListener("click", popupCloseByClickOnShadow);
addButton.addEventListener("click", toggleAddPopup);
closeAddButton.addEventListener("click", toggleAddPopup);
addSaveForm.addEventListener("submit", submitSaveForm);
