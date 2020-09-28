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
    name: "Швейцария",
    link:
      "https://cdn.pixabay.com/photo/2018/07/26/07/45/valais-3562988_960_720.jpg",
  },
  {
    name: "Япония",
    link:
      "https://cdn.pixabay.com/photo/2020/09/15/09/27/woman-5573135_960_720.jpg",
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
const popupProfile = document.querySelector(".popup_type_profile");
const popupAdd = document.querySelector(".popup_type_add");
const editButton = document.querySelector(".profile__edit-button");
const closeButton = document.querySelector(".popup__close-button");
const closeAddButton = document.querySelector(".popup__close-button_add");
const submitFormProfile = document.querySelector(
  ".popup__container_type_profile"
);
const profileName = document.querySelector(".profile__name");
const profileStatus = document.querySelector(".profile__status");
const inputName = document.querySelector(".popup__input-item_change_name");
const inputStatus = document.querySelector(".popup__input-item_change_status");
const addButton = document.querySelector(".profile__add-button");
const templateCard = document.querySelector(".template-card").content;
const ulCards = document.querySelector(".cards");
const addInputValue = document.querySelector(".popup__input-item_change_value");
const addInputImage = document.querySelector(".popup__input-item_change_image");
const addSaveForm = document.querySelector(".popup_type_container");
const imagePopup = document.querySelector(".popup_image_wrapper");
const inputText = document.querySelector(".popup__text");
const imageP = document.querySelector(".popup__image");

///////////////////////////////
/* function popupOpen(popup) {
  popup.classList.add("popup_opened");
}

function popupClose(popup) {
  popup.classList.remove("popup_opened");
} */
//////////////////////////////

const toggleImagePopup = () => {
  imagePopup.classList.toggle("popup__image-open");
};
const openPopupImage = (event) => {
  const inputImage = event.target.style.backgroundImage;
  const card = event.target.closest(".card");
  const valueText = card.querySelector(".card__title").textContent;
  toggleImagePopup();
  inputText.innerText = valueText;
  imageP.src = inputImage.slice(5, -2);
};
const imageCloseButton = document.querySelector(".popup__close-button_image");
imageCloseButton.addEventListener("click", toggleImagePopup);
const openPopup = () => {
  popupProfile.classList.toggle("popup_is-opened");
  inputName.value = profileName.textContent;
  inputStatus.value = profileStatus.textContent;
};

const closePopup = () => {
  popupProfile.classList.toggle("popup_is-opened");
};

const toggleAddPopup = () => {
  popupAdd.classList.toggle("popup_is-opened");
};

const saveInput = () => {
  event.preventDefault();
  profileName.textContent = inputName.value;
  profileStatus.textContent = inputStatus.value;
  popupProfile.classList.toggle("popup_is-opened");
};

const likeClicked = () => {
  event.target.classList.toggle("card__like_clicked");
};

const deleteCard = () => {
  event.target.closest(".card").remove();
};

const addCard = (cardObject) => {
  const htmlElement = templateCard.cloneNode(true);
  htmlElement.querySelector(
    ".card__image"
  ).style.backgroundImage = `url(${cardObject.link})`;
  htmlElement.querySelector(".card__title").innerText = cardObject.name;
  htmlElement
    .querySelector(".card__like")
    .addEventListener("click", likeClicked);
  htmlElement
    .querySelector(".card__image")
    .addEventListener("click", openPopupImage);
  htmlElement
    .querySelector(".card__delete")
    .addEventListener("click", deleteCard);
  ulCards.prepend(htmlElement);
};

const submitSaveForm = (e) => {
  e.preventDefault();
  const newCard = {
    name: addInputValue.value,
    link: addInputImage.value,
  };
  addCard(newCard);
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
submitFormProfile.addEventListener("submit", saveInput);
addButton.addEventListener("click", toggleAddPopup);
closeAddButton.addEventListener("click", toggleAddPopup);
addSaveForm.addEventListener("submit", submitSaveForm);

//feature
/* const popupCloseByClickOnShadow = (e) => {
  if (e.target != e.currentTarget) {
    return;
  }
  closePopup();
};
popupProfile.addEventListener("click", popupCloseByClickOnShadow); */
