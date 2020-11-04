class Popup {
  constructor(popupSelector) {
    this._popupSelector = popupSelector;
    this._handleEscClose = this._handleEscClose.bind(this);
    this.close = this.close.bind(this);
    this._popupCloseByClickOnShadow = this._popupCloseByClickOnShadow.bind(
      this
    );
  }
  _handleEscClose(e) {
    if (e.key === "Escape") {
      this.close();
    }
  }
  open() {
    this._popupSelector.classList.add("popup_is-opened");
    document.addEventListener("keyup", this._handleEscClose);
  }
  close() {
    this._popupSelector.classList.remove("popup_is-opened");
    document.removeEventListener("keyup", this._handleEscClose);
  }
  _popupCloseByClickOnShadow(e) {
    if (e.target != e.currentTarget) {
      return;
    }
    this.close();
  }
  setEventListeners() {
    const closeButton = this._popupSelector.querySelector(
      ".popup__close-button"
    );
    closeButton.addEventListener("click", this.close);
    this._popupSelector.addEventListener(
      "mousedown",
      this._popupCloseByClickOnShadow
    );
  }
}
export default Popup;
