import "./index.css";
import Api from "../scripts/components/Api.js";
import Card from "../scripts/components/Card.js";
import PopupWithForm from "../scripts/components/PopupWithForm.js";
import PopupWithImage from "../scripts/components/PopupWithImage.js";
import UserInfo from "../scripts/components/UserInfo.js";
import FormValidator from "../scripts/components/FormValidator.js";
import Section from "../scripts/components/Section.js";
import PopupWithFormSubmit from "../scripts/components/PopupWithFormSubmit.js";
import {
  config,
  editButton,
  addButton,
  inputName,
  inputStatus,
  avatarButton,
  ulCards,
} from "../scripts/utils/constants.js";
import { renderLoading } from "../scripts/utils/utils.js";
//////////////////
//Создаём апи, задаём наши данные.
const api = new Api({
  baseUrl: "https://mesto.nomoreparties.co/v1/cohort-17",
  headers: {
    authorization: "d842ff54-d107-474c-9b49-51f3c32bc27b",
    "Content-Type": "application/json",
  },
});
//Класс попапа картинок
const popupImage = new PopupWithImage(config.formTypeImage);
popupImage.setEventListeners();
//Класс обработчика информации о пользователе
const userInfo = new UserInfo(
  config.profileName,
  config.profileStatus,
  config.profileAvatar
);
/////////////////////////////
//Попап с удалением карточки
/////////////////////////////
//Обработчик удаления
const handleDeleteCard = (cardData) => {
  api.deleteCard(cardData._id).catch((err) => {
    console.log(`Ошибка:${err}`);
  });
  cardData._deleteCard();
  popupWithDelete.close();
};
//Создаем класс, вешаем обработчик
const popupWithDelete = new PopupWithFormSubmit(
  config.formTypeDelete,
  handleDeleteCard
);
popupWithDelete.setEventListeners();
/////////////////////////////////////////////////////////
//Попап с профайлом
/////////////////////////////////////////////////////////
//Функция добавления данных из инпутов в DOM
const handleSubmitProfile = ({ nameChange, statusChange }) => {
  renderLoading(true, config.formTypeProfile);
  const userApiInfo = { name: nameChange, about: statusChange };
  api
    .setUserInfo(userApiInfo)
    .then((data) => {
      userInfo.setUserInfo(data.name, data.about, false);
    })
    .finally(
      popupProfileClass.close(),
      renderLoading(false, config.formTypeProfile)
    )
    .catch((err) => console.log(`Ошибка:${err}`));
};

//Создаем попап с профайлом.
const popupProfileClass = new PopupWithForm(
  config.formTypeProfile,
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
//Попап с с добавлением картинок
/////////////////////////////////////////////////////////
//Функция принимающая данные из инпутов и вставляющая карточки в DOM
/* const addCard = ({ nameChange, statusChange }) => {
  renderLoading(true, config.formTypeAdd);
  const cardData = { name: nameChange, link: statusChange };
  Promise.all([api.addCard(cardData), api.getUserName()])
    .then(([res, userData]) => {
      cardsSection.addItem(createCard(res, userData._id));
    })
    .finally(popupAddCard.close(), renderLoading(false, config.formTypeAdd))
    .catch((err) => {
      console.log(`Ошибка:${err}`);
    });
}; */
////////////////

/////////////////
//Попап с добавлением картинок. Запускает функцию addCard подставляя введённые пользователем данные.
/* const popupAddCard = new PopupWithForm(config.formTypeAdd, addCard);
popupAddCard.setEventListeners();

const openPopupAdd = () => {
  popupAddCard.open();
  formAddValidator.clearErrors();
};
addButton.addEventListener("click", openPopupAdd); */
/////////////////////////////////////////////////////////
//Попап с аватаром
/////////////////////////////////////////////////////////
//Функция открытия попапа
const openAvatar = () => {
  formAvatarValidator.clearErrors();
  avatarPopup.open();
};
//Обработчик сабмита
const handleSubmitAvatar = (avatarUrl) => {
  renderLoading(true, config.formTypeAvatar);
  api
    .changeAvatar(avatarUrl.statusChange)
    .then((data) => userInfo.setUserInfo(false, false, data.avatar))
    .catch((err) => console.log(`Ошибка:${err}`))
    .finally(avatarPopup.close(), renderLoading(false, config.formTypeAvatar));
};
//Создаем сам класс передаём в него обработчик
const avatarPopup = new PopupWithForm(
  config.formTypeAvatar,
  handleSubmitAvatar
);
avatarPopup.setEventListeners();
avatarButton.addEventListener("click", openAvatar);
///////////////////////////////////////////////////////
//Добавляем на страницу карточки из стандартного списка
///////////////////////////////////////////////////////
//Функция создания карточки
const createCard = (item, myId) => {
  const card = new Card(
    { item },
    config.templateCard,
    popupImage,
    popupWithDelete,
    myId,
    handleLikeButton
  );
  const element = card.getElement();
  return element;
};

//Создаём секции из стандартного списка и добавляем их в DOM
Promise.all([api.getInitialCards(), api.getUserName()])
  .then(([res, userData]) => {
    const cardsSection = new Section(
      {
        renderer: (item) => {
          cardsSection.addItem(createCard(item, userData._id));
        },
      },
      ulCards
    );
    cardsSection.renderItems(res);
    userInfo.setUserInfo(userData.name, userData.about, userData.avatar);
    const addCard = ({ nameChange, statusChange }) => {
      renderLoading(true, config.formTypeAdd);
      const cardData = { name: nameChange, link: statusChange };
      api
        .addCard(cardData)
        .then((res) => {
          cardsSection.addItem(createCard(res, userData._id));
        })
        .finally(popupAddCard.close(), renderLoading(false, config.formTypeAdd))
        .catch((err) => {
          console.log(`Ошибка:${err}`);
        });
    };
    const popupAddCard = new PopupWithForm(config.formTypeAdd, addCard);
    popupAddCard.setEventListeners();
    const openPopupAdd = () => {
      popupAddCard.open();
      formAddValidator.clearErrors();
    };
    addButton.addEventListener("click", openPopupAdd);
  })
  .catch((err) => {
    console.log(`Ошибка: ${err}`);
  });
////////////////

//////////////////
/////////////////////////////////////////////////////////
//Запуск валидации
/////////////////
const formAddValidator = new FormValidator(config.formTypeAdd, config);
formAddValidator.enableValidation();
const formProfileValidator = new FormValidator(config.formTypeProfile, config);
formProfileValidator.enableValidation();
const formAvatarValidator = new FormValidator(config.formTypeAvatar, config);
formAvatarValidator.enableValidation();

/////////////////
//Обработчик лайков
const handleLikeButton = (likeButton, likeCounter, cardId) => {
  !likeButton.classList.contains("card__like_clicked")
    ? api
        .like(cardId)
        .then((data) => {
          likeButton.classList.add("card__like_clicked");
          likeCounter.textContent = `${data.likes.length}`;
        })
        .catch((err) => console.log(`Ошибка:${err}`))
    : api
        .dislike(cardId)
        .then((data) => {
          likeButton.classList.remove("card__like_clicked");
          likeCounter.textContent = `${data.likes.length}`;
        })
        .catch((err) => console.log(`Ошибка:${err}`));
};
/////////////////
