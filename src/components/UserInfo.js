export default class UserInfo {
  constructor({ nameElement, jobElement }) {
    this._name = nameElement;
    this._job = jobElement;
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
}
