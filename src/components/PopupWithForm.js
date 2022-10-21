import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor(popupSelector, handleFormSubmit) {
    super(popupSelector);
    this._handleSubmit = handleFormSubmit;
    this._formEl = this._popupElement.querySelector(".modal__form");
    this._saveButton = this._formEl.querySelector(".modal__form-button");
    this._inputEls = Array.from(
      this._formEl.querySelectorAll(".modal__form-input")
    );
  }

  _getInputValues() {
    const inputValues = {};
    this._inputEls.forEach((input) => {
      inputValues[input.name] = input.value;
    });
    return inputValues;
  }

  close() {
    this._formEl.reset();
    super.close();
  }

  renderLoading(isLoading) {
    if (isLoading) {
      this._saveButton.textContent = "Saving...";
    } else {
      this._saveButton.textContent = "Save";
    }
  }

  setEventListeners() {
    super.setEventListeners();
    this._formEl.addEventListener("submit", (evt) => {
      evt.preventDefault();
      const inputValue = this._getInputValues();
      this._handleSubmit(inputValue);
    });
  }
}
