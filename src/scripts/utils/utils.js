import { config } from "./constants.js";
//Функция сброса ошибок
export const errorReset = (popup) => {
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
