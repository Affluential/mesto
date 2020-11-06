class Popup {
  constructor(popupSelector) {
    this._popup = document.querySelector(popupSelector);
    this._handleEscClose = this._handleEscClose.bind(this);
    this.close = this.close.bind(this);
    this._closeByClickOnOverlay = this._closeByClickOnOverlay.bind(this);
  }
  _handleEscClose(e) {
    if (e.key === "Escape") {
      this.close();
    }
  }
  open() {
    this._popup.classList.add("popup_is-opened");
    document.addEventListener("keyup", this._handleEscClose);
  }
  close() {
    this._popup.classList.remove("popup_is-opened");
    document.removeEventListener("keyup", this._handleEscClose);
  }
  _closeByClickOnOverlay(e) {
    if (e.target != e.currentTarget) {
      return;
    }
    this.close();
  }
  setEventListeners() {
    const closeButton = this._popup.querySelector(".popup__close-button");
    closeButton.addEventListener("click", this.close);
    this._popup.addEventListener("mousedown", this._closeByClickOnOverlay);
  }
}
export default Popup;
