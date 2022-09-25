class Card {
  constructor({ data, handlePreview }, cardSelector) {
    this._name = data.name;
    this._link = data.link;

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
    this._element.remove();
    this._element = null;
  };

  _setEventListeners() {
    this._cardLikeButton.addEventListener("click", this._handleLike);
    this._cardDeleteButton.addEventListener("click", this._handleDelete);
    this._cardImage.addEventListener("click", () =>
      this._handlePreview(this._data)
    );
  }

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
}

export default Card;
