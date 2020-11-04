export const initialCards = [
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

export const config = {
  templateCard: ".template-card",
  formImputErrorActiveCls: "popup__input-error_active",
  formImputInvalidCls: "popup__input-item_invalid",
  formSaveButtonDsblCls: "popup__save-button_disabled",
  formElements: ".popup__container",
  formSaveButton: ".popup__save-button",
  formInputItem: ".popup__input-item",
  formTypeAdd: ".popup_type_add",
  formTypeProfile: ".popup_type_profile",
};
export const popupProfile = document.querySelector(".popup_type_profile");
export const popupAdd = document.querySelector(".popup_type_add");
export const editButton = document.querySelector(".profile__edit-button");
export const addButton = document.querySelector(".profile__add-button");
export const ulCards = document.querySelector(".cards");
export const profileName = document.querySelector(".profile__name");
export const profileStatus = document.querySelector(".profile__status");
export const inputName = document.querySelector(
  ".popup__input-item_change_name"
);
export const inputStatus = document.querySelector(
  ".popup__input-item_change_status"
);
export const imagePopup = document.querySelector(".popup_image_wrapper");
