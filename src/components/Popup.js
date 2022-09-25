export default class Popup {
  constructor(popupSelector) {
    this._popupElement = document.querySelector(popupSelector);
    this._exitButton = this._popupElement.querySelector(".modal__exit-button");
    this._handleEscUp = this._handleEscUp.bind(this);
  }

  _handleEscUp(evt) {
    if (evt.key === "Escape") {
      this.close();
    }
  }

  setEventListeners() {
    this._popupElement.addEventListener("mousedown", (evt) =>
      this._closePopupWithOverlay(evt)
    );
    this._exitButton.addEventListener("click", () => this.close());
  }

  open() {
    this._popupElement.classList.add("modal_opened");
    document.addEventListener("keydown", this._handleEscUp);
  }

  close() {
    this._popupElement.classList.remove("modal_opened");
    document.removeEventListener("keydown", this._handleEscUp);
  }

  _closePopupWithOverlay(evt) {
    if (evt.target.classList.contains("modal_opened")) {
      this.close(evt.target);
    }
  }
}
