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
const imageCloseButton = document.querySelector(".popup__close-button_image");
const pageListener = document.querySelector(".page");

//Создаем карточки
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

//Закрытие попапа по нажатию esc
function closePopupByEscButton(e) {
  const popupOpened = document.querySelector(".popup_is-opened");
  if (e.key === "Escape" && popupOpened) {
    popupClose(popupOpened);
    if ((e.path[3] = "div.popup.popup__type_add")) {
      reset();
    }
  }
}

//Функции открытия и закрытия попапов
function popupOpen(popup) {
  popup.classList.add("popup_is-opened");
  document.addEventListener("keydown", closePopupByEscButton);
  if (popup == popupAdd) {
    reset();
  }
  if (popup === popupProfile) {
    inputPopupProfile();
  }
  if (popup === popupProfile || popup === popupAdd) {
    errorReset(popup);
  }
}

//Закрытие попапа
function popupClose(popup) {
  popup.classList.remove("popup_is-opened");
  document.removeEventListener("keydown", closePopupByEscButton);
}

//Вызовы открытия и закрытия
const openAddPopup = () => {
  popupOpen(popupAdd);
};
const closeAddPopup = () => {
  popupClose(popupAdd);
};
const imageOpenPopup = () => {
  popupOpen(imagePopup);
};
const imageClosePopup = () => {
  popupClose(imagePopup);
};
const closeProfilePopup = () => {
  popupClose(popupProfile);
};

//Попап с картинкой
const openPopupImage = (event) => {
  const inputImage = event.target.style.backgroundImage;
  const card = event.target.closest(".card");
  const valueText = card.querySelector(".card__title").textContent;
  inputText.innerText = valueText;
  imageP.src = inputImage.slice(5, -2);
  imageP.alt = valueText;
  popupOpen(imagePopup);
};
imageCloseButton.addEventListener("click", imageClosePopup);

//Попап с редактированием профайла
const openPopupProfile = () => {
  popupOpen(popupProfile);
  inputName.value = profileName.textContent;
  inputStatus.value = profileStatus.textContent;
};
editButton.addEventListener("click", openPopupProfile);

//Сохранение информации из попапа редактирования
const saveInput = (e) => {
  profileName.textContent = inputName.value;
  profileStatus.textContent = inputStatus.value;
  popupClose(popupProfile);
};

//Кнопка лайка
const likeClicked = (e) => {
  e.target.classList.toggle("card__like_clicked");
};

//Удаление карточки
const deleteCard = (e) => {
  e.target.closest(".card").remove();
};

//Сохранение картинки
const submitSaveForm = (e) => {
  const newCard = {
    name: addInputValue.value,
    link: addInputImage.value,
  };
  addCard(newCard);
  popupClose(popupAdd);
};

//Заполнение профайла
const inputPopupProfile = () => {
  inputName.value = profileName.textContent;
  inputStatus.value = profileStatus.textContent;
};
//Очищение полей форм в попапе добавления картинок
function reset() {
  addInputValue.value = "";
  addInputImage.value = "";
}

initialCards.forEach(addCard);

/////Сброс ошибок
const errorReset = (popup) => {
  const formElement = popup.querySelector(".popup__container");
  const button = formElement.querySelector(".popup__save-button");
  const inputItem = formElement.querySelectorAll(".popup__input-item");
  const inputArray = Array.from(inputItem);
  inputArray.forEach((inputElement) => {
    toggleButton(inputArray, button);
    hideInputError(formElement, inputElement);
  });
  toggleButton(inputArray, button);
};

//Слушатели на кнопки
editButton.addEventListener("click", openPopupProfile);
closeButton.addEventListener("click", closeProfilePopup);
submitFormProfile.addEventListener("submit", saveInput);
addButton.addEventListener("click", openAddPopup);
closeAddButton.addEventListener("click", closeAddPopup);
addSaveForm.addEventListener("submit", submitSaveForm);

//Закрытие попапа по клику на оверлее
const popupCloseByClickOnShadow = (e) => {
  if (e.target != e.currentTarget) {
    return;
  }
  popupClose(e.target);
};
popupProfile.addEventListener("mousedown", popupCloseByClickOnShadow);
popupAdd.addEventListener("mousedown", popupCloseByClickOnShadow);
imagePopup.addEventListener("mousedown", popupCloseByClickOnShadow);
