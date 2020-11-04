import Popup from "./Popup.js";
class PopupWithForm extends Popup {
  constructor(popupSelector, handleSubmit) {
    super(popupSelector);
    this._handleSubmit = handleSubmit;
    this._handleSubmitListener = this._handleSubmitListener.bind(this);
    this._formElement = this._popupSelector.querySelector(".popup__container");
  }
  _getInputValues() {
    const inputItem = this._formElement.querySelectorAll(".popup__input-item");
    const inputArray = {};
    inputItem.forEach((input) => {
      inputArray[input.name] = input.value;
    });
    this._formElement.removeEventListener("submit", this._handleSubmitListener);
    this.close();
    return inputArray;
  }
  _handleSubmitListener(e) {
    e.preventDefault();
    this._handleSubmit(this._getInputValues());
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
