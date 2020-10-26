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

const config = {
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
export { initialCards, config };
