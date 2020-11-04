class UserInfo {
  constructor(userName, userStatus) {
    this._userName = userName;
    this._userStatus = userStatus;
  }
  getUserInfo() {
    const userData = {
      name: this._userName.textContent,
      info: this._userStatus.textContent,
    }; //Возвращает имя и статус со страницы
    return userData;
  }
  setUserInfo(name, status) {
    this._userName.textContent = name; //Вставляет имя и статус на станицу.
    this._userStatus.textContent = status;
  }
}
export default UserInfo;