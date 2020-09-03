const pageOverflow = document.querySelector('.JS-scroll')
const popup = document.querySelector('.popup');
const editButton = document.querySelector('.profile__edit-button ');
const closeButton = document.querySelector('.popup__close-button');
const addButton = document.querySelector('.profile__add-button');
const saveButton = document.querySelector('.popup__save-button');
const profileName = document.querySelector('.profile__name');
const profileStatus = document.querySelector('.profile__status');
const inputName = document.querySelector('.popup__input-name');
const inputStatus = document.querySelector('.popup__input-status');

const popupToggle = () => {
  popup.classList.toggle('popup_is-opened');
  pageOverflow.classList.toggle('page_overflow_hidden');
  inputName.value = profileName.textContent;
  inputStatus.value = profileStatus.textContent;
}

const popupCloseByClickOnShadow = () => {
  console.log(event.target, event.currentTarget)
  if (event.target != event.currentTarget) {
    return
  }
  popupToggle()
}

editButton.addEventListener('click', popupToggle);
closeButton.addEventListener('click', popupToggle);

const save = () => {
profileName.textContent = inputName.value;
profileStatus.textContent = inputStatus.value;
popupToggle();
}

saveButton.addEventListener('click', save);
popup.addEventListener('click', popupCloseByClickOnShadow);