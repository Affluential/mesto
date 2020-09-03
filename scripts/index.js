const popup = document.querySelector('.popup');
const editButton = document.querySelector('.profile__edit-button');
const closeButton = document.querySelector('.popup__close-button');
const addButton = document.querySelector('.profile__add-button');
const saveButton = document.querySelector('.popup__save-button');
const profileName = document.querySelector('.profile__name');
const profileStatus = document.querySelector('.profile__status');
const inputName = document.querySelector('.popup__input-item_name_change');
const inputStatus = document.querySelector('.popup__input-item_status_change');


const popupToggle = () => {
  popup.classList.toggle('popup_is-opened');
  inputName.value = profileName.textContent;
  inputStatus.value = profileStatus.textContent;
}


const popupToggleClose = () => {
  popup.classList.toggle('popup_is-opened');
}


const popupCloseByClickOnShadow = () => {
  if (event.target != event.currentTarget) {
    return
  }
  popupToggleClose()
}


const saveInput = () => {
  profileName.textContent = inputName.value;
  profileStatus.textContent = inputStatus.value;
  popupToggle();
  }


editButton.addEventListener('click', popupToggle);
closeButton.addEventListener('click', popupToggleClose);
saveButton.addEventListener('click', saveInput);
popup.addEventListener('click', popupCloseByClickOnShadow);