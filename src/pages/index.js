/* import "./index.css"; */
import Api from "../scripts/components/Api.js";
import Card from "../scripts/components/Card.js";
import PopupWithForm from "../scripts/components/PopupWithForm.js";
import PopupWithImage from "../scripts/components/PopupWithImage.js";
import UserInfo from "../scripts/components/UserInfo.js";
import FormValidator from "../scripts/components/FormValidator.js";
import Section from "../scripts/components/Section.js";
import PopupWithDelete from "../scripts/components/PopupWithDelete.js";
import {
  config,
  editButton,
  addButton,
  inputName,
  inputStatus,
  avatarButton,
} from "../scripts/utils/constants.js";
//////////////////
//Создаём апи и загружаем данные профайла на страницу.
const api = new Api({
  baseUrl: "https://mesto.nomoreparties.co/v1/cohort-17",
  headers: {
    authorization: "d842ff54-d107-474c-9b49-51f3c32bc27b",
    "Content-Type": "application/json",
  },
});

///////////////////
/////////////////////////////////////////////////////////
//Добавляем на страницу карточки из стандартного списка
/////////////////////////////////////////////////////////
const popupDelete = (object) => {
  popupWithDelete.open(object);
};
const createCard = (item, myId) => {
  const card = new Card(
    { item },
    config.templateCard,
    openImagePopup,
    popupDelete,
    myId,
    api
  );
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
    renderer: (item, myId) => {
      cardsSection.addItem(createCard(item, myId));
    },
  },
  ".cards"
);
Promise.all([api.getInitialCards(), api.getUserName()])
  .then(([res, userData]) => {
    cardsSection.renderItems(res, userData._id);
    userInfo.setUserInfo(userData.name, userData.about, userData.avatar);
  })
  .catch((err) => {
    console.log(`Ошибка: ${err}`);
  });
/////////////////////////////////////////////////////////
//Попап с с добавлением картинок
/////////////////////////////////////////////////////////
//Функция принимающая данные из инпутов и вставляющая карточки в DOM
/* const addCard = ({ nameChange, statusChange }) => {
  const valueItem = { name: nameChange, link: statusChange };
  api
    .addCard(valueItem)
    .then((data) => {
      cardsSection.addItem(createCard(data));
    })
    .catch((err) => {
      console.log(`Ошибка:${err}`);
    });
}; */
const addCard = ({ nameChange, statusChange }) => {
  renderLoading(true, config.formTypeAdd);
  const valueItem = { name: nameChange, link: statusChange };
  Promise.all([api.addCard(valueItem), api.getUserName()])
    .then(([res, userData]) => {
      cardsSection.addItem(createCard(res, userData._id));
    })
    .catch((err) => {
      console.log(`Ошибка:${err}`);
    })
    .finally(renderLoading(false, config.formTypeAdd), popupAddClass.close());
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
const userInfo = new UserInfo(
  ".profile__name",
  ".profile__status",
  ".profile__avatar"
);

//Вставляем данные из инпутов в DOM
const handleSubmitProfile = ({ nameChange, statusChange }) => {
  renderLoading(true, config.formTypeProfile);
  const userApiInfo = { name: nameChange, about: statusChange };
  api
    .setUserInfo(userApiInfo)
    .then((data) => {
      userInfo.setUserInfo(data.name, data.about, data.avatar);
    })
    .catch((err) => console.log(`Ошибка:${err}`))
    .finally(
      renderLoading(false, config.formTypeProfile),
      popupProfileClass.close()
    );
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
/////////////
const avatarOpen = () => {
  formAvatarValidator.clearErrors();
  avatarPopup.open();
};
const handleSubmitAvatar = (avatarUrl) => {
  renderLoading(true, config.formTypeAvatar);
  api
    .avatarChange(avatarUrl.statusChange)
    .then((data) => userInfo.setAvatar(data.avatar))
    .catch((err) => console.log(`Ошибка:${err}`))
    .finally(renderLoading(false, config.formTypeAvatar), avatarPopup.close());
};
const avatarPopup = new PopupWithForm(
  config.formTypeAvatar,
  handleSubmitAvatar
);
avatarPopup.setEventListeners();
avatarButton.addEventListener("click", avatarOpen);
/////////////
const formAddValidator = new FormValidator(config.formTypeAdd, config);
formAddValidator.enableValidation();
const formProfileValidator = new FormValidator(config.formTypeProfile, config);
formProfileValidator.enableValidation();
const formAvatarValidator = new FormValidator(config.formTypeAvatar, config);
formAvatarValidator.enableValidation();
const popupWithDelete = new PopupWithDelete(".popup__delete-confirm", api);
popupWithDelete.setEventListeners();

/////////////////
const renderLoading = (isLoading, popupWindow) => {
  const popup = document.querySelector(popupWindow);
  const saveButton = popup.querySelector(".popup__save-button");
  isLoading
    ? (saveButton.textContent = "Сохранение...")
    : (saveButton.textContent = "Сохранить");
};
