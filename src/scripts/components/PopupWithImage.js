import Popup from "./Popup.js";
class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
  }
  open(name, link) {
    const imageP = this._popupSelector.querySelector(".popup__image");
    const inputText = this._popupSelector.querySelector(".popup__text");
    inputText.innerText = name;
    imageP.src = link;
    imageP.alt = name;
    super.open();
  }
}
export default PopupWithImage;
