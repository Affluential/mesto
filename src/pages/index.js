import "./index.css";
import Card from "../scripts/components/Card.js";
import PopupWithForm from "../scripts/components/PopupWithForm.js";
import PopupWithImage from "../scripts/components/PopupWithImage.js";
import UserInfo from "../scripts/components/UserInfo.js";
import FormValidator from "../scripts/components/FormValidator.js";
import Section from "../scripts/components/Section.js";
import {
  initialCards,
  config,
  editButton,
  addButton,
  inputName,
  inputStatus,
} from "../scripts/utils/constants.js";

/////////////////////////////////////////////////////////
//Добавляем на страницу карточки из стандартного списка
/////////////////////////////////////////////////////////
const createCard = (item) => {
  const card = new Card({ item }, config.templateCard, openImagePopup);
  const element = card.getElement();
  return element;
};

//Создаем класс попапа картинок
const openedPopupImage = new PopupWithImage(".popup_image_wrapper");
openedPopupImage.setEventListeners();

//Создаем функцию открывающую попап с картинкой
const openImagePopup = (name, link) => {
  openedPopupImage.open(name, link);
};

//Создаём секции из стандартного списка и добавляем их в DOM
const cardsSection = new Section(
  {
    items: initialCards,
    renderer: (item) => {
      cardsSection.addItem(createCard(item));
    },
  },
  ".cards"
);
cardsSection.renderItems();
/////////////////////////////////////////////////////////
//Попап с с добавлением картинок
/////////////////////////////////////////////////////////
//Функция принимающая данные из инпутов и вставляющая карточки в DOM
const addCard = ({ nameChange, statusChange }) => {
  const valueItem = { name: nameChange, link: statusChange };
  cardsSection.addItem(createCard(valueItem));
};

//Попап с добавлением картинок. Запускает функцию addCard подставляя введённые пользователем данные.
const popupAddClass = new PopupWithForm(".popup_type_add", addCard);
popupAddClass.setEventListeners();

const openPopupAdd = () => {
  popupAddClass.open();
  formAddValidator.clearErrors();
};
addButton.addEventListener("click", openPopupAdd);
/////////////////////////////////////////////////////////
//Попап с профайлом
/////////////////////////////////////////////////////////
//UserInfo вставляет информацию в DOM и забирает её оттуда.
const userInfo = new UserInfo(".profile__name", ".profile__status");

//Вставляем данные из инпутов в DOM
const handleSubmitProfile = ({ nameChange, statusChange }) => {
  userInfo.setUserInfo(nameChange, statusChange);
};

//Создаем попап с профайлом.
const popupProfileClass = new PopupWithForm(
  ".popup_type_profile",
  handleSubmitProfile
);
popupProfileClass.setEventListeners();

//Функция открытия попапа Профайла при клике на кнопку редактирования профайла.
const openPopupProfile = () => {
  const profileTextContent = userInfo.getUserInfo();
  inputName.value = profileTextContent.name;
  inputStatus.value = profileTextContent.info;
  formProfileValidator.clearErrors();
  popupProfileClass.open();
};
editButton.addEventListener("click", openPopupProfile);
/////////////////////////////////////////////////////////
//Запуск валидации
/////////////////////////////////////////////////////////
const formAddValidator = new FormValidator(config.formTypeAdd, config);
formAddValidator.enableValidation();
const formProfileValidator = new FormValidator(config.formTypeProfile, config);
formProfileValidator.enableValidation();
