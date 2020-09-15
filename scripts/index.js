const popup = document.querySelector(".popup");
const editButton = document.querySelector(".profile__edit-button");
const closeButton = document.querySelector(".popup__close-button");
const addButton = document.querySelector(".profile__add-button");
const saveForm = document.querySelector(".popup__container");
const profileName = document.querySelector(".profile__name");
const profileStatus = document.querySelector(".profile__status");
const inputName = document.querySelector(".popup__input-item_change_name");
const inputStatus = document.querySelector(".popup__input-item_change_status");

const openPopup = () => {
  popup.classList.toggle("popup_is-opened");
  inputName.value = profileName.textContent;
  inputStatus.value = profileStatus.textContent;
};

const closePopup = () => {
  popup.classList.toggle("popup_is-opened");
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
console.log(initialCards);
function addCard(cardObject, index) {
  const templateCard = document.querySelector(".template-card").content;
  const ulCards = document.querySelector(".cards");
  const htmlElement = templateCard.cloneNode(true);
  htmlElement.querySelector(
    ".card__image"
  ).style.backgroundImage = `url(${cardObject.link})`;
  htmlElement.querySelector(".card__title").innerText = cardObject.name;
  ulCards.appendChild(htmlElement);
}

initialCards.forEach(addCard);

editButton.addEventListener("click", openPopup);
closeButton.addEventListener("click", closePopup);
saveForm.addEventListener("submit", saveInput);
popup.addEventListener("click", popupCloseByClickOnShadow);
