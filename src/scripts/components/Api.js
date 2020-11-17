class Api {
  constructor(options) {
    this._url = options.baseUrl;
    this._headers = options.headers;
  }
  _obtainData(way, method) {
    return fetch(`${this._url}${way}`, method).then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    });
  }
  getUserName() {
    return this._obtainData("/users/me", { headers: this._headers });
  }
  getInitialCards() {
    return this._obtainData("/cards", { headers: this._headers });
  }
  setUserInfo(userInfo) {
    return this._obtainData("/users/me", {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        name: userInfo.name,
        about: userInfo.about,
      }),
    });
  }
  addCard(newCard) {
    return this._obtainData("/cards", {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({
        name: newCard.name,
        link: newCard.link,
      }),
    });
  }
  deleteCard(id) {
    return this._obtainData(`/cards/${id}`, {
      method: "DELETE",
      headers: this._headers,
    });
  }
  like(id) {
    return this._obtainData(`/cards/likes/${id}`, {
      method: "PUT",
      headers: this._headers,
    });
  }
  dislike(id) {
    return this._obtainData(`/cards/likes/${id}`, {
      method: "DELETE",
      headers: this._headers,
    });
  }
  changeAvatar(avatarUrl) {
    return this._obtainData(`/users/me/avatar`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({ avatar: avatarUrl }),
    });
  }
}
export default Api;
