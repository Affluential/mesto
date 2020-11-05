import Popup from "./Popup.js";
class PopupWithForm extends Popup {
  constructor(popupSelector, handleSubmit) {
    super(popupSelector);
    this._handleSubmit = handleSubmit;
    this._handleSubmitListener = this._handleSubmitListener.bind(this);
    this._formElement = this._popupSelector.querySelector(".popup__container");
  }
  _getInputValues() {
    const inputItems = this._formElement.querySelectorAll(".popup__input-item");
    const inputValues = {};
    inputItems.forEach((input) => {
      inputValues[input.name] = input.value;
    });
    return inputValues;
  }
  _handleSubmitListener(e) {
    e.preventDefault();
    this._handleSubmit(this._getInputValues());
    this.close();
  }
  close() {
    this._formElement.reset();
    super.close();
  }
  setEventListeners() {
    super.setEventListeners();
    this._formElement.addEventListener("submit", this._handleSubmitListener); //При сабмите выполняет функцию handleSubmit подставляя в неё введённые данные.
  }
}
export default PopupWithForm;
