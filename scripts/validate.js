const showInputError = (formElement, inputElement, errorMessage) => {
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
  errorElement.textContent = errorMessage;
  errorElement.classList.add("popup__input-error_active");
  inputElement.classList.add("popup__input-item_invalid");
};

const hideInputError = (formElement, inputElement) => {
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
  errorElement.textContent = "";
  errorElement.classList.remove("popup__input-error_active");
  inputElement.classList.remove("popup__input-item_invalid");
};

const checkInputValidity = (formElement, inputElement) => {
  const isInputNotValid = !inputElement.validity.valid;
  if (isInputNotValid) {
    const errorMessage = inputElement.validationMessage;
    showInputError(formElement, inputElement, errorMessage);
  } else {
    hideInputError(formElement, inputElement);
  }
};

const hasInvalidInput = (inputArray) => {
  return inputArray.some((inputElement) => !inputElement.validity.valid);
};

const toggleButton = (inputArray, button) => {
  if (hasInvalidInput(inputArray)) {
    button.classList.add("popup__save-button_disabled");
    button.setAttribute("disabled", true);
  } else {
    button.classList.remove("popup__save-button_disabled");
    button.removeAttribute("disabled");
  }
};

const setEventListeners = (formElement) => {
  const inputArray = Array.from(
    formElement.querySelectorAll(".popup__input-item")
  );
  const button = formElement.querySelector(".popup__save-button");
  inputArray.forEach((inputElement) => {
    inputElement.addEventListener("input", () => {
      checkInputValidity(formElement, inputElement);
      toggleButton(inputArray, button);
    });
  });
  toggleButton(inputArray, button);
};

const enableValidation = () => {
  const formElements = document.querySelectorAll(".popup__container");
  const formList = Array.from(formElements);
  const formListIterator = (formElement) => {
    const submitFormHandler = (event) => {
      event.preventDefault();
    };
    formElement.addEventListener("submit", submitFormHandler);
    setEventListeners(formElement);
  };
  formList.forEach(formListIterator);
};

enableValidation();
