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
    name: "Космос",
    link: "http://img0.joyreactor.cc/pics/post/котэ-космос-6181760.png",
  },
  {
    name: "Камчатка",
    link:
      "http://img1.joyreactor.cc/pics/post/full/Том-и-Джерри-Мультфильмы-MOSSA-artist-6183737.jpeg",
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

///////////////////////////////////
const ImagePopup = document.querySelector(".js__image");
const toggleImagePopup = () => {
  ImagePopup.classList.toggle("popup__image-open");
};
const openPopupImage = () => {
  const inputImage = event.target.style.backgroundImage;
  toggleImagePopup();
  const imageP = document.querySelector(".popup__image");
  imageP.style.backgroundImage = inputImage;
};
const imageCloseButton = document.querySelector(".js__image_close");
imageCloseButton.addEventListener("click", toggleImagePopup);

/////////////////////////////////
const openPopup = () => {
  popup.classList.toggle("popup_is-opened");
  inputName.value = profileName.textContent;
  inputStatus.value = profileStatus.textContent;
};

const closePopup = () => {
  popup.classList.toggle("popup_is-opened");
};

const popupCloseByClickOnShadow = (e) => {
  if (e.target != e.currentTarget) {
    return;
  }
  closePopup();
};

const toggleAddPopup = () => {
  popupAdd.classList.toggle("popup_is-opened");
};

const saveInput = () => {
  event.preventDefault();
  profileName.textContent = inputName.value;
  profileStatus.textContent = inputStatus.value;
  popup.classList.toggle("popup_is-opened");
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
saveForm.addEventListener("submit", saveInput);
popup.addEventListener("click", popupCloseByClickOnShadow);
addButton.addEventListener("click", toggleAddPopup);
closeAddButton.addEventListener("click", toggleAddPopup);
addSaveForm.addEventListener("submit", submitSaveForm);

/*   let likeButton = document.querySelectorAll(".card__like");
  for (let i = 0; i < likeButton.length; i++) {
    likeButton[i].addEventListener("click", likeClicked);
    break;
  } */
/*   let deleteButton = document.querySelectorAll(".card__delete");
  for (let i = 0; i < deleteButton.length; i++) {
    deleteButton[i].addEventListener("click", deleteCard);
    break;
  } */
//

//
/* const render = () => {
  let likeButton = document.querySelectorAll(".card__like");
  for (let i = 0; i < likeButton.length; i++) {
    likeButton[i].addEventListener("click", likeClicked);
  }
}; */

/* render(); */
//
/* const submitSaveForm = (e) => {
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
  render();
  reset();
  toggleAddPopup();
}; */
