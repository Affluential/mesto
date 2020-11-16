class Card {
  constructor(
    { item },
    cardSelector,
    openPopupImage,
    openPopupDelete,
    myId,
    api
  ) {
    this._name = item.name;
    this._link = item.link;
    this._id = item._id;
    this._owner = item.owner;
    this._likes = item.likes;
    this._api = api;
    this._myId = myId;
    this._cardSelector = cardSelector;
    this._openPopupImage = openPopupImage;
    this._openPopupDelete = openPopupDelete;
  }

  _getTemplate() {
    return document.querySelector(this._cardSelector).content.cloneNode(true)
      .children[0];
  }
  _handleLikeButton() {
    const likeButton = this._element.querySelector(".card__like");
    const likeCounter = this._element.querySelector(".card__like-counter");
    !likeButton.classList.contains("card__like_clicked")
      ? this._api.like(this._id).then((data) => {
          likeButton.classList.add("card__like_clicked");
          likeCounter.textContent = `${data.likes.length}`;
        })
      : this._api.dislike(this._id).then((data) => {
          likeButton.classList.remove("card__like_clicked");
          likeCounter.textContent = `${data.likes.length}`;
        });
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
      .addEventListener("click", () => this._openPopupDelete(this));
    this._element
      .querySelector(".card__like")
      .addEventListener("click", () => this._handleLikeButton());
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
    this._element.id = this._id;
    this._element.querySelector(
      ".card__like-counter"
    ).textContent = `${this._likes.length}`;
    this._myId === this._owner._id &&
      (this._element.querySelector(".card__delete").style.display = "block");
    this._likes.find((like) => like._id === this._myId) &&
      this._element
        .querySelector(".card__like")
        .classList.add("card__like_clicked");
    this._setListeners();
    return this._element;
  }
}

export default Card;
