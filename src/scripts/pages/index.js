import "../../pages/index.css";
import Card from "../components/Card.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithImage from "../components/PopupWithImage.js";
import UserInfo from "../components/UserInfo.js";
import FormValidator from "../components/validate.js";
import Section from "../components/Section.js";
import { errorReset } from "../utils/utils.js";
import {
  initialCards,
  config,
  popupProfile,
  popupAdd,
  editButton,
  addButton,
  ulCards,
  profileName,
  profileStatus,
  inputName,
  inputStatus,
  imagePopup,
} from "../utils/constants.js";

/////////////////////////////////////////////////////////
//Добавляем на страницу карточки из стандартного списка
/////////////////////////////////////////////////////////

//Создаем класс попапа картинок
const openedPopupImage = new PopupWithImage(imagePopup);

//Создаем функцию открывающую попап с картинкой
const openImagePopup = (name, link) => {
  openedPopupImage.setEventListeners();
  openedPopupImage.open(name, link);
};

//Создаём секции из стандартного списка и добавляем их в DOM
const defaultPageCard = new Section(
  {
    items: initialCards,
    renderer: (item) => {
      const card = new Card({ item }, config.templateCard, openImagePopup);
      const element = card.getElement();
      defaultPageCard.setItems(element);
    },
  },
  ulCards
);

//Запускаем для items функцию renderer
defaultPageCard.renderItems();

/////////////////////////////////////////////////////////
//Попап с с добавлением картинок
/////////////////////////////////////////////////////////
//Функция принимающая данные из инпутов и вставляющая карточки в DOM
const addCard = ({ nameChange, statusChange }) => {
  const valueItem = [{ name: nameChange, link: statusChange }];
  const newSection = new Section(
    {
      items: valueItem,
      renderer: (item) => {
        const card = new Card({ item }, config.templateCard, openImagePopup);
        const element = card.getElement();
        newSection.setItems(element);
      },
    },
    ulCards
  );
  newSection.renderItems();
};

//Попап с добавлением картинок. Запускает функцию addCard подставляя введённые пользователем данные.
const popupAddClass = new PopupWithForm(popupAdd, addCard);

const openPopupAdd = () => {
  popupAddClass.open();
  popupAddClass.setEventListeners();
  errorReset(popupAdd);
};

addButton.addEventListener("click", openPopupAdd);

/////////////////////////////////////////////////////////
//Попап с профайлом
/////////////////////////////////////////////////////////

//UserInfo вставляет информацию в DOM и забирает её оттуда.
const userInfo = new UserInfo(profileName, profileStatus);

//Вставляем данные из инпутов в DOM
const handleSubmitProfile = ({ nameChange, statusChange }) => {
  userInfo.setUserInfo(nameChange, statusChange);
};

//Создаем попап с профайлом.
const popupProfileClass = new PopupWithForm(popupProfile, handleSubmitProfile);

//Функция открытия попапа Профайла при клике на кнопку редактирования профайла.
const openPopupProfile = () => {
  const profileTextContent = userInfo.getUserInfo();
  inputName.value = profileTextContent.name;
  inputStatus.value = profileTextContent.info;
  popupProfile.querySelector(".popup__save-button_disabled") &&
    popupProfile
      .querySelector(config.formSaveButton)
      .classList.remove(config.formSaveButtonDsblCls);
  document.querySelector(config.formSaveButton).removeAttribute("disabled");
  errorReset(popupProfile);
  popupProfileClass.open();
  popupProfileClass.setEventListeners();
};

editButton.addEventListener("click", openPopupProfile);

/////////////////////////////////////////////////////////
//Запуск валидации
/////////////////////////////////////////////////////////
const formAddValidator = new FormValidator(config.formTypeAdd, config);
formAddValidator.enableValidation();
const formProfileValidator = new FormValidator(config.formTypeProfile, config);
formProfileValidator.enableValidation();
