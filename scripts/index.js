import Card from "./Card.js";
import FormValidator from "./validate.js";
import { initialCards, config } from "./initialCards.js";
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
const ulCards = document.querySelector(".cards");
const addInputValue = document.querySelector(".popup__input-item_change_value");
const addInputImage = document.querySelector(".popup__input-item_change_image");
const addSaveForm = document.querySelector(".popup_type_container");
const imagePopup = document.querySelector(".popup_image_wrapper");
const inputText = document.querySelector(".popup__text");
const imageP = document.querySelector(".popup__image");
const imageCloseButton = document.querySelector(".popup__close-button_image");
const escButton = "Escape";
//////////////////////////////////////////////////////////
//Закрытие попапа по нажатию esc
function closePopupByEscButton(e) {
  const popupOpened = document.querySelector(".popup_is-opened");
  if (e.key === escButton) {
    popupClose(popupOpened);
  }
}
//////////////////////////////////////////////////////////
//Функции открытия и закрытия попапов
function popupOpen(popup) {
  popup.classList.add("popup_is-opened");
  document.addEventListener("keyup", closePopupByEscButton);
  if (popup === popupProfile || popup === popupAdd) {
    errorReset(popup);
  }
}
//////////////////////////////////////////////////////////
//Закрытие попапа
function popupClose(popup) {
  popup.classList.remove("popup_is-opened");
  document.removeEventListener("keyup", closePopupByEscButton);
}
//////////////////////////////////////////////////////////
//Попап с картинкой
const openPopupImage = (name, link) => {
  const inputImage = link;
  const valueText = name;
  inputText.innerText = valueText;
  imageP.src = inputImage /* inputImage.slice(5, -2) */;
  imageP.alt = valueText;
  popupOpen(imagePopup);
};
imageCloseButton.addEventListener("click", () => {
  popupClose(imagePopup);
});
//////////////////////////////////////////////////////////
//Попап с редактированием профайла
const openPopupProfile = () => {
  popupOpen(popupProfile);
  inputPopupProfile();
  inputName.value = profileName.textContent;
  inputStatus.value = profileStatus.textContent;
};
editButton.addEventListener("click", openPopupProfile);
//////////////////////////////////////////////////////////
//Сохранение информации из попапа редактирования
const saveInput = (e) => {
  e.preventDefault();
  profileName.textContent = inputName.value;
  profileStatus.textContent = inputStatus.value;
  popupClose(popupProfile);
};
//////////////////////////////////////////////////////////
//Заполнение профайла
const inputPopupProfile = () => {
  inputName.value = profileName.textContent;
  inputStatus.value = profileStatus.textContent;
};
//////////////////////////////////////////////////////////
//Очищение полей форм в попапе добавления картинок
function resetValue() {
  addSaveForm.reset();
}
//////////////////////////////////////////////////////////
//Создаём карточки из библиотеки с помощью класса Card
const prepend = (element) => {
  return ulCards.prepend(element);
};
initialCards.forEach(({ name, link }) => {
  const card = new Card(name, link, config.templateCard, openPopupImage);
  const element = card.getElement();
  prepend(element);
});
//////////////////////////////////////////////////////////
//Создаем карточку при сохранении из попапа добавления карточек.
const addCard = (e) => {
  e.preventDefault();
  const card = new Card(
    addInputValue.value,
    addInputImage.value,
    config.templateCard,
    openPopupImage
  );
  const element = card.getElement();
  prepend(element);
  popupClose(popupAdd);
};
//////////////////////////////////////////////////////////
/////Сброс ошибок
const errorReset = (popup) => {
  const formElement = popup.querySelector(".popup__container");
  const inputItem = formElement.querySelectorAll(".popup__input-item");
  const inputArray = Array.from(inputItem);
  inputArray.forEach((inputElement) => {
    hideInputError(formElement, inputElement);
  });
};

const hideInputError = (formElement, inputElement) => {
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
  errorElement.textContent = "";
  errorElement.classList.remove(config.formImputErrorActiveCls);
  inputElement.classList.remove(config.formImputInvalid);
};
//////////////////////////////////////////////////////////
//Слушатели на кнопки
editButton.addEventListener("click", openPopupProfile);
submitFormProfile.addEventListener("submit", saveInput);
closeButton.addEventListener("click", () => {
  popupClose(popupProfile);
});
addButton.addEventListener("click", () => {
  popupOpen(popupAdd);
  resetValue();
});
closeAddButton.addEventListener("click", () => {
  popupClose(popupAdd);
});
addSaveForm.addEventListener("submit", addCard);

//////////////////////////////////////////////////////////
//Закрытие попапа по клику на оверлее вместе со слушателями
const popupCloseByClickOnShadow = (e) => {
  if (e.target != e.currentTarget) {
    return;
  }
  popupClose(e.target);
};
popupProfile.addEventListener("mousedown", popupCloseByClickOnShadow);
popupAdd.addEventListener("mousedown", popupCloseByClickOnShadow);
imagePopup.addEventListener("mousedown", popupCloseByClickOnShadow);
//////////////////////////////////////////////////////////
//Запуск валидации.
const formAddValidator = new FormValidator(config.formTypeAdd, config);
formAddValidator.enableValidation();
const formProfileValidator = new FormValidator(config.formTypeProfile, config);
formProfileValidator.enableValidation();

export { openPopupImage };
