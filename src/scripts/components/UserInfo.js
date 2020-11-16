class UserInfo {
  constructor(userName, userStatus, avatar) {
    this._userName = document.querySelector(userName);
    this._userStatus = document.querySelector(userStatus);
    this._avatar = document.querySelector(avatar);
  }
  getUserInfo() {
    const userData = {
      name: this._userName.textContent,
      info: this._userStatus.textContent,
    }; //Возвращает имя и статус со страницы
    return userData;
  }
  setUserInfo(name, status, avatar) {
    this._userName.textContent = name; //Вставляет имя и статус на станицу.
    this._userStatus.textContent = status;
    avatar && (this._avatar.style.backgroundImage = `url(${avatar})`);
  }
  setAvatar(avatar) {
    this._avatar.style.backgroundImage = `url(${avatar})`;
  }
}
export default UserInfo;
