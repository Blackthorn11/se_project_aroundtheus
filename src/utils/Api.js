// TOKEN = "7fc5c4b5-810f-422d-8040-d6c41ae3f41e"; group-12

export default class Api {
  constructor(config) {
    this.url = config.baseUrl;
    this.headers = config.headers;
  }

  _checkServerResponse(res) {
    return res.ok ? res.json() : Promise.reject(`Error: ${res.statusText}`);
  }

  getInitialCards = () => {
    return fetch(`${this.url}/cards`, {
      headers: this.headers,
    }).then(this._checkServerResponse);
  };

  getProfileData = () => {
    return fetch(`${this.url}/users/me`, {
      headers: this.headers,
    }).then(this._checkServerResponse);
  };

  getWebpageInfo() {
    return Promise.all([this.getInitialCards(), this.getProfileData()]);
  }

  updateProfileData = (name, about) => {
    return fetch(`${this.url}/users/me`, {
      method: "PATCH",
      headers: this.headers,
      body: JSON.stringify({
        name,
        about,
      }),
    }).then(this._checkServerResponse);
  };

  addNewCard = (data) => {
    return fetch(`${this.url}/cards`, {
      method: "POST",
      headers: this.headers,
      body: JSON.stringify({
        name: data.name,
        link: data.link,
      }),
    }).then(this._checkServerResponse);
  };

  deleteCard(id) {
    return fetch(`${this.url}/cards/${id}`, {
      method: "DELETE",
      headers: this.headers,
    }).then(this._checkServerResponse);
  }

  addLike(id) {
    return fetch(`${this.url}/cards/likes/${id}`, {
      headers: this.headers,
      method: "PUT",
    }).then(this._checkServerResponse);
  }

  removeLike(id) {
    return fetch(`${this.url}/cards/likes/${id}`, {
      headers: this.headers,
      method: "DELETE",
    }).then(this._checkServerResponse);
  }

  setUserAvatar(avatar) {
    return fetch(`${this.url}/users/me/avatar/`, {
      method: "PATCH",
      headers: this.headers,
      body: JSON.stringify({
        avatar,
      }),
    }).then(this._checkServerResponse);
  }
}
