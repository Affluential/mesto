const showInputError = (formElement, inputElement, errorMessage) => {
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
  console.log(formElement);
  errorElement.textContent = errorMessage;
  errorElement.classList.add("popup__input-error_active");
};

const hideInputError = (formElement, inputElement) => {
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);

  errorElement.textContent = "";
  errorElement.classList.remove("popup__input-error_active");
};

const checkInputValidity = (formElement, inputElement) => {
  const isInputNotValid = !inputElement.validity.valid;

  if (isInputNotValid) {
    console.log(inputElement.validationMessage);
    let errorMessage = inputElement.validationMessage;
    showInputError(formElement, inputElement, errorMessage);
  } else {
    hideInputError(formElement, inputElement);
  }
};

const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => !inputElement.validity.valid);
};
const toggleButtonState = (inputList, buttonElement) => {
  if (hasInvalidInput(inputList)) {
    buttonElement.classList.add("popup__save-button_disabled");
    buttonElement.setAttribute("disabled", true);
  } else {
    buttonElement.classList.remove("popup__save-button_disabled");
    buttonElement.removeAttribute("disabled");
  }
};

const setEventListeners = (formElement) => {
  const inputList = Array.from(
    formElement.querySelectorAll(".popup__input-item")
  );
  const buttonElement = formElement.querySelector(".popup__save-button");
  inputList.forEach((inputElement) => {
    inputElement.addEventListener("input", () => {
      checkInputValidity(formElement, inputElement);
      toggleButtonState(inputList, buttonElement);
    });
  });
  toggleButtonState(inputList, buttonElement);
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
