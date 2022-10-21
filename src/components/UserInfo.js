export default class UserInfo {
  constructor({ nameElement, jobElement, avatar }) {
    this._name = nameElement;
    this._job = jobElement;
    this._avatarElement = avatar;
  }

  getUserInfo() {
    return {
      userName: this._name.textContent,
      userJob: this._job.textContent,
    };
  }

  setUserInfo(data) {
    this._name.textContent = data.name;
    this._job.textContent = data.description;
  }

  setUserAvatar(avatar) {
    this._avatarElement.src = avatar;
  }
}
