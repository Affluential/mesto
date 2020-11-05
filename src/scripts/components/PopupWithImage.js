import Popup from "./Popup.js";
class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._popupImage = this._popupSelector.querySelector(".popup__image");
    this._popupText = this._popupSelector.querySelector(".popup__text");
  }
  open(name, link) {
    this._popupText.innerText = name;
    this._popupImage.src = link;
    this._popupImage.alt = name;
    super.open();
  }
}
export default PopupWithImage;
