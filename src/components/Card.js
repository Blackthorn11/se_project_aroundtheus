class Card {
  constructor(
    { data, handlePreview, handleDeleteClick, handleCardLike },
    cardSelector
  ) {
    this._name = data.name;
    this._link = data.link;

    this._id = data._id;
    this._likes = data.likes;
    this._userId = data.userId;
    this._ownerId = data.owner._id;

    this._cardSelector = cardSelector;
    this._data = data;

    this._handlePreview = handlePreview;
    this._handleDeleteClick = handleDeleteClick;
    this._handleCardLike = handleCardLike;
  }

  getId() {
    return this._id;
  }

  _getTemplate() {
    const cardElement = document
      .querySelector(this._cardSelector)
      .content.querySelector(".card")
      .cloneNode(true);
    return cardElement;
  }

  handleDelete() {
    this._element.remove();
    this._element = null;
  }

  cardLiked() {
    return this._likes.some((item) => item._id === this._userId);
  }

  _renderLikes() {
    this._likesCount.textContent = this._likes.length;
    if (this.cardLiked()) {
      this._cardLikeButton.classList.add("card__like-button_on");
    } else {
      this._cardLikeButton.classList.remove("card__like-button_on");
    }
  }

  updateLikes(likes) {
    this._likes = likes;
    this._renderLikes();
  }

  _hideDeleteButton() {
    if (this._userId !== this._ownerId) {
      this._cardDeleteButton.remove();
    } else {
      return;
    }
  }

  _setEventListeners() {
    this._cardLikeButton.addEventListener("click", this._handleCardLike);
    this._cardDeleteButton.addEventListener("click", (evt) => {
      evt.stopPropagation();
      this._handleDeleteClick(evt);
    });
    this._cardImage.addEventListener("click", () =>
      this._handlePreview(this._data)
    );
  }

  generateCard() {
    this._element = this._getTemplate();
    this._likesCount = this._element.querySelector(".card__like-count");
    this._cardLikeButton = this._element.querySelector(".card__like-button");
    this._cardDeleteButton = this._element.querySelector(
      ".card__delete-button"
    );
    this._cardImage = this._element.querySelector(".card__image");
    this._cardTitle = this._element.querySelector(".card__title");

    this._cardImage.src = this._link;
    this._cardImage.alt = this._name;
    this._cardTitle.textContent = this._name;

    this._hideDeleteButton();
    this._renderLikes();
    this._setEventListeners();
    return this._element;
  }
}

export default Card;
