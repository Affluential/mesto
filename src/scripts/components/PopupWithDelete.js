import Popup from "./Popup.js";
class PopupWithDelete extends Popup {
  constructor(popupSelector, api) {
    super(popupSelector);
    this._api = api;
    this._formElement = this._popup.querySelector(".popup__container");
  }
  open(object) {
    super.open();
    const handleDeleteCard = (e) => {
      e.preventDefault();
      this._api.deleteCard(object._id);
      object._deleteCard();
      this._formElement.removeEventListener("submit", handleDeleteCard);
      super.close();
    };
    this._formElement.addEventListener("submit", handleDeleteCard);
  }
}

export default PopupWithDelete;
