export const config = {
  templateCard: ".template-card",
  formInputErrorActiveClass: "popup__input-error_active",
  formInputInvalidClass: "popup__input-item_invalid",
  formSaveButtonDsblClass: "popup__save-button_disabled",
  formElements: ".popup__container",
  formSaveButton: ".popup__save-button",
  formInputItem: ".popup__input-item",
  formTypeAdd: ".popup_type_add",
  formTypeProfile: ".popup_type_profile",
  formTypeAvatar: ".popup_type_avatar",
  formTypeImage: ".popup_image_wrapper",
  formTypeDelete: ".popup__delete-confirm",
  profileName: ".profile__name",
  profileStatus: ".profile__status",
  profileAvatar: ".profile__avatar",
};
export const popupProfile = document.querySelector(".popup_type_profile");
export const editButton = document.querySelector(".profile__edit-button");
export const addButton = document.querySelector(".profile__add-button");
export const ulCards = document.querySelector(".cards");
export const inputName = document.querySelector(
  ".popup__input-item_change_name"
);
export const inputStatus = document.querySelector(
  ".popup__input-item_change_status"
);
export const avatarButton = document.querySelector(".profile__avatar-edit");
