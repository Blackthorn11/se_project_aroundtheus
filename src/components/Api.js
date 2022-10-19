// TOKEN = "f0f5b035-9e61-4cc2-926f-83804fb546a7"; group-12
import { apiConfig } from "../utils/constants.js";

class Api {
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
        .then(() => {
          resolve();
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
        .then(() => {
          resolve();
        })
        .catch((err) => {
          reject(err);
        });
    });
  };
  addLike(id) {
    return new Promise((resolve, reject) => {
      fetch(`${this.url}/cards/likes/${id}`, {
        method: "PUT",
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
  removeLike(id) {
    return new Promise((resolve, reject) => {
      fetch(`${this.url}/cards/likes/${id}`, {
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
  updateProfilePic(url) {
    return new Promise((resolve, reject) => {
      fetch(`${this.url}/users/me/avatar`, {
        method: "PATCH",
        headers: this.headers,
        body: JSON.stringify({
          avatar: url,
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

const api = new Api(apiConfig);
export default api;
