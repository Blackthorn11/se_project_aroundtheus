import api from "../utils/Api.js";
import { selectors } from "../utils/constants.js";
import PopupWithForm from "./PopupWithForm.js";

class Card {
  constructor({ data, handlePreview }, cardSelector) {
    this._name = data.name;
    this._link = data.link;
    this._isLiked = false;
    this._userId = data.userId;
    this._ownerId = data.owner._id;

    this._cardSelector = cardSelector;

    this._data = data;
    this._handlePreview = handlePreview;
  }

  _getTemplate() {
    const cardElement = document
      .querySelector(this._cardSelector)
      .content.querySelector(".card")
      .cloneNode(true);
    return cardElement;
  }

  _handleLike = () => {
    this._cardLikeButton.classList.toggle("card__like-button_on");
  };

  _handleDelete = () => {
    const deleteForm = new PopupWithForm(selectors.deletePopup, () => {
      api.deleteCard(this._data._id);
      this._element.remove();
      this._element = null;
      deleteForm.close();
    });
    deleteForm.open();
    deleteForm.setEventListeners();
  };

  generateCard() {
    this._element = this._getTemplate();

    this._cardLikeButton = this._element.querySelector(".card__like-button");
    this._cardDeleteButton = this._element.querySelector(
      ".card__delete-button"
    );
    this._cardImage = this._element.querySelector(".card__image");
    this._cardTitle = this._element.querySelector(".card__title");

    this._cardImage.src = this._link;
    this._cardImage.alt = this._name;
    this._cardTitle.textContent = this._name;

    this._setEventListeners();
    return this._element;
  }

  _hideDelete() {
    if (this._userId !== this._ownerId) {
      this._cardDeleteButton.remove();
    } else {
      return;
    }
  }
  _setEventListeners() {
    this._cardLikeButton.addEventListener("click", this._handleLike);
    this._cardDeleteButton.addEventListener("click", this._handleDelete);
    this._cardImage.addEventListener("click", () =>
      this._handlePreview(this._data)
    );
    this._hideDelete();
  }
}

export default Card;
