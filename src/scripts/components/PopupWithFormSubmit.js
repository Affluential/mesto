import Popup from "./Popup.js";
class PopupWithFormSubmit extends Popup {
  constructor(popupSelector, handleDeleteCard) {
    super(popupSelector);
    this._handleDeleteCard = handleDeleteCard;
    this._formElement = this._popup.querySelector(".popup__container");
  }
  open(cardData) {
    super.open();
    const handlerDelete = (e) => {
      e.preventDefault();
      this._handleDeleteCard(cardData);
      this._formElement.removeEventListener("submit", handlerDelete);
    };
    this._formElement.addEventListener("submit", handlerDelete);
  }
}

export default PopupWithFormSubmit;
