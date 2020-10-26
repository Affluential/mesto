class FormValidator {
  constructor(formSelector, config) {
    this._formSelector = formSelector;
    this._formImputErrorActiveCls = config.formImputErrorActiveCls;
    this._formElement = document.querySelector(formSelector);
    this._formImputInvalidCls = config.formImputInvalidCls;
    this._formSaveButtonDsblCls = config.formSaveButtonDsblCls;
    this._formElements = config.formElements;
    this._formSaveButton = config.formSaveButton;
    this._formInputItem = config.formInputItem;
    this._button = this._formElement.querySelector(this._formSaveButton);
  }

  _showInputError(inputElement, errorMessage) {
    const errorElement = this._formElement.querySelector(
      `#${inputElement.id}-error`
    );
    errorElement.textContent = errorMessage;
    errorElement.classList.add(this._formImputErrorActiveCls);
    inputElement.classList.add(this._formImputInvalid);
  }

  _hideInputError(inputElement) {
    const errorElement = this._formElement.querySelector(
      `#${inputElement.id}-error`
    );
    errorElement.textContent = "";
    errorElement.classList.remove(this._formImputErrorActiveCls);
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

  _hasInvalidInput(inputArray) {
    return inputArray.some((inputElement) => !inputElement.validity.valid);
  }

  _toggleButton(inputArray, button) {
    if (this._hasInvalidInput(inputArray)) {
      button.classList.add(this._formSaveButtonDsblCls);
      button.setAttribute("disabled", true);
    } else {
      button.classList.remove(this._formSaveButtonDsblCls);
      button.removeAttribute("disabled");
    }
  }
  _buttonDisabled() {
    this._button.classList.add(this._formSaveButtonDsblCls);
    this._button.setAttribute("disabled", true);
  }
  _setEventListeners() {
    const inputArray = Array.from(
      this._formElement.querySelectorAll(this._formInputItem)
    );
    inputArray.forEach((inputElement) => {
      inputElement.addEventListener("input", () => {
        this._checkInputValidity(inputElement);
        this._toggleButton(inputArray, this._button);
      });
    });
    this._toggleButton(inputArray, this._button);
  }

  enableValidation = () => {
    const submitFormHandler = (event) => {
      event.preventDefault();
      this._buttonDisabled();
    };

    this._formElement.addEventListener("submit", submitFormHandler);
    this._setEventListeners();
  };
}

export default FormValidator;
