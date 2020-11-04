class Card {
  constructor({ item }, cardSelector, openPopupImage) {
    this._name = item.name;
    this._link = item.link;
    this._cardSelector = cardSelector;
    this._openPopupImage = openPopupImage;
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
    this._openPopupImage(this._name, this._link);
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
