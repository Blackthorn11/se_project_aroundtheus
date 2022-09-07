import { openModalWindow } from "./utils.js";

class Card {
  constructor(data, cardSelector) {
    this._name = data.name;
    this._link = data.link;

    this._cardSelector = cardSelector;
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
    this._element.remove();
    this._element = null;
  };

  _handlePreview = () => {
    const previewModal = document.querySelector("#image-preview");
    const previewImage = previewModal.querySelector(".modal__preview-image");
    const previewTitle = previewModal.querySelector(".modal__preview-title");

    previewImage.src = this._link;
    previewImage.alt = this._name;
    previewTitle.textContent = this._name;
    openModalWindow(previewModal);
  };

  _setEventListeners() {
    this._cardLikeButton = this._element.querySelector(".card__like-button");
    this._cardLikeButton.addEventListener("click", this._handleLike);

    this._cardDeleteButton = this._element.querySelector(
      ".card__delete-button"
    );
    this._cardDeleteButton.addEventListener("click", this._handleDelete);

    const cardImage = this._element.querySelector(".card__image");
    cardImage.addEventListener("click", this._handlePreview);
  }

  generateCard() {
    this._element = this._getTemplate();
    this._setEventListeners();

    const cardImage = this._element.querySelector(".card__image");
    const cardTitle = this._element.querySelector(".card__title");

    cardImage.src = this._link;
    cardImage.alt = this._name;
    cardTitle.textContent = this._name;

    return this._element;
  }
}

export default Card;
