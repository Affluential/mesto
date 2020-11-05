class FormValidator {
  constructor(formSelector, config) {
    this._formSelector = formSelector;
    this._formInputErrorActiveClass = config.formInputErrorActiveClass;
    this._formElement = document.querySelector(formSelector);
    this._formInputInvalidClass = config.formInputInvalidClass;
    this._formSaveButtonDsblClass = config.formSaveButtonDsblClass;
    this._formElements = config.formElements;
    this._formSaveButton = config.formSaveButton;
    this._formInputItem = config.formInputItem;
    this._button = this._formElement.querySelector(this._formSaveButton);
    this._inputArray = Array.from(
      this._formElement.querySelectorAll(config.formInputItem)
    );
  }
  clearErrors() {
    this._inputArray.forEach((inputElement) => {
      this._hideInputError(inputElement);
    });
    this._toggleButton(this._button);
  }
  _showInputError(inputElement, errorMessage) {
    const errorElement = this._formElement.querySelector(
      `#${inputElement.id}-error`
    );
    errorElement.textContent = errorMessage;
    errorElement.classList.add(this._formInputErrorActiveClass);
    inputElement.classList.add(this._formImputInvalid);
  }

  _hideInputError(inputElement) {
    const errorElement = this._formElement.querySelector(
      `#${inputElement.id}-error`
    );
    errorElement.textContent = "";
    errorElement.classList.remove(this._formInputErrorActiveClass);
    inputElement.classList.remove(this._formImputInvalid);
  }

  _checkInputValidity(inputElement) {
    const isInputNotValid = !inputElement.validity.valid;
    if (isInputNotValid) {
      const errorMessage = inputElement.validationMessage;
      this._showInputError(inputElement, errorMessage);
    } else {
      this._hideInputError(inputElement);
    }
  }

  _hasInvalidInput() {
    return this._inputArray.some(
      (inputElement) => !inputElement.validity.valid
    );
  }
  _buttonDisabled() {
    this._button.classList.add(this._formSaveButtonDsblClass);
    this._button.setAttribute("disabled", true);
  }
  _toggleButton(button) {
    if (this._hasInvalidInput()) {
      this._buttonDisabled();
    } else {
      button.classList.remove(this._formSaveButtonDsblClass);
      button.removeAttribute("disabled");
    }
  }
  _setEventListeners() {
    this._inputArray.forEach((inputElement) => {
      inputElement.addEventListener("input", () => {
        this._checkInputValidity(inputElement);
        this._toggleButton(this._button);
      });
    });
    this._toggleButton(this._button);
  }

  enableValidation() {
    const submitFormHandler = (event) => {
      event.preventDefault();
      this._buttonDisabled();
    };
    this._formElement.addEventListener("submit", submitFormHandler);
    this._setEventListeners();
  }
}

export default FormValidator;
