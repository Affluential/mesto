class UserInfo {
  constructor(userNameSelector, userStatusSelector, avatarSelector) {
    this._userName = document.querySelector(userNameSelector);
    this._userStatus = document.querySelector(userStatusSelector);
    this._avatar = document.querySelector(avatarSelector);
  }
  //Получаем данные из вёрстки.
  getUserInfo() {
    const userData = {
      name: this._userName.textContent,
      info: this._userStatus.textContent,
      avatar: this._avatar.style.backgroundImage,
    };
    return userData;
  }
  //Вставляет данные из сервера в вёрстку.
  setUserInfo(name, status, avatar) {
    name && (this._userName.textContent = name);
    status && (this._userStatus.textContent = status);
    avatar && (this._avatar.style.backgroundImage = `url(${avatar})`);
  }
}
export default UserInfo;
