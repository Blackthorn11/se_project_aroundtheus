// TOKEN = "7fc5c4b5-810f-422d-8040-d6c41ae3f41e"; group-12

export default class Api {
  constructor(config) {
    this.url = config.baseUrl;
    this.headers = config.headers;
  }

  getProfileData = () => {
    return new Promise((resolve, reject) => {
      fetch(`${this.url}/users/me`, {
        headers: this.headers,
      })
        .then((res) => res.json())
        .then((result) => {
          resolve(result);
        })
        .catch((err) => {
          reject(err);
        });
    });
  };

  updateProfileData = (name, about) => {
    return new Promise((resolve, reject) => {
      fetch(`${this.url}/users/me`, {
        method: "PATCH",
        headers: this.headers,
        body: JSON.stringify({
          name,
          about,
        }),
      })
        .then((res) => res.json())
        .then((res) => {
          resolve(res);
        })
        .catch((err) => {
          reject(err);
        });
    });
  };

  getInitialCards = () => {
    return new Promise((resolve, reject) => {
      fetch(`${this.url}/cards`, {
        headers: this.headers,
      })
        .then((res) => res.json())
        .then((result) => {
          resolve(result);
        })
        .catch((err) => {
          reject(err);
        });
    });
  };

  addNewCard = (data) => {
    return new Promise((resolve, reject) => {
      fetch(`${this.url}/cards`, {
        method: "POST",
        headers: this.headers,
        body: JSON.stringify({
          name: data.name,
          link: data.link,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          resolve(data);
        })
        .catch((err) => {
          reject(err);
        });
    });
  };
  deleteCard(id) {
    return new Promise((resolve, reject) => {
      fetch(`${this.url}/cards/${id}`, {
        method: "DELETE",
        headers: this.headers,
      })
        .then((res) => res.json())
        .then(() => {
          resolve();
        })
        .catch((err) => {
          reject(err);
        });
    });
  }
  changeLikeStatus(id, like) {
    return new Promise((resolve, reject) => {
      fetch(`${this.url}/cards/likes/${id}`, {
        method: like ? "PUT" : "DELETE",
        headers: this.headers,
      })
        .then((res) => res.json())
        .then((res) => {
          resolve(res);
        })
        .catch((err) => {
          reject(err);
        });
    });
  }

  setUserAvatar(avatar) {
    return new Promise((resolve, reject) => {
      fetch(`${this.url}/users/me/avatar`, {
        method: "PATCH",
        headers: this.headers,
        body: JSON.stringify({
          avatar,
        }),
      })
        .then((res) => res.json())
        .then(() => {
          resolve();
        })
        .catch((err) => {
          reject(err);
        });
    });
  }
}
