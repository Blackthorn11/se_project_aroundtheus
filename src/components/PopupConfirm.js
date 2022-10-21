import Popup from "./Popup.js";

export default class PopupConfirm extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._saveButton = this._popupElement.querySelector(".modal__form-button");
    this._saveButtonText = this._saveButton.textContent;
  }

  open(popupClick) {
    super.open();
    this._popupClick = popupClick;
  }

  renderLoading(isLoading) {
    if (isLoading) {
      this._saveButton.textContent = "Deleting...";
    } else {
      this._saveButton.textContent = "Yes";
    }
  }

  setEventListeners() {
    this._saveButton.addEventListener("click", (evt) => {
      evt.preventDefault();
      this._popupClick();
    });
    super.setEventListeners();
  }
}
