class Card {
  constructor(name, link, cardSelector, imagePopup) {
    (this._name = name),
      (this._link = link),
      (this._cardSelector = cardSelector),
      (this._imagePopup = imagePopup);
  }
  _getTemplate() {
    return document.querySelector(this._cardSelector).content.cloneNode(true)
      .children[0];
  }
  _like() {
    this._element
      .querySelector(".card__like")
      .classList.toggle("card__like_clicked");
  }
  _deleteCard() {
    this._element.remove();
  }
  _openImage() {
    this._imagePopup(this._name, this._link);
  }
  _setListeners() {
    this._element
      .querySelector(".card__delete")
      .addEventListener("click", () => this._deleteCard());
    this._element
      .querySelector(".card__like")
      .addEventListener("click", () => this._like());
    this._element
      .querySelector(".card__image")
      .addEventListener("click", () => this._openImage());
  }
  getElement() {
    this._element = this._getTemplate();
    this._element.querySelector(".card__title").textContent = this._name;
    this._element.querySelector(
      ".card__image"
    ).style.backgroundImage = `url(${this._link})`;
    this._setListeners();
    return this._element;
  }
}

export default Card;
