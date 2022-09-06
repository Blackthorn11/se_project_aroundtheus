import FormValidator from "./FormValidator.js";
import Card from "./Card.js";
import {
  openModalWindow,
  closeModalWindow,
  closeModalWithOverlay,
  closeByEscape,
} from "./utils.js";

//cards array
const initialCards = [
  {
    name: "Yosemite Valley",
    link: "https://code.s3.yandex.net/web-code/yosemite.jpg",
  },
  {
    name: "Lake Louise",
    link: "https://code.s3.yandex.net/web-code/lake-louise.jpg",
  },
  {
    name: "Bald Mountains",
    link: "https://code.s3.yandex.net/web-code/bald-mountains.jpg",
  },
  {
    name: "Latemar",
    link: "https://code.s3.yandex.net/web-code/latemar.jpg",
  },
  {
    name: "Vanoise National Park",
    link: "https://code.s3.yandex.net/web-code/vanoise.jpg",
  },
  {
    name: "Lago di Braies",
    link: "https://code.s3.yandex.net/web-code/lago.jpg",
  },
];

//popups and buttons
const profileEditPopup = document.querySelector("#profileEdit");
const addCardPopup = document.querySelector("#cardAdd");
const previewModal = document.querySelector("#image-preview");
const editProfileButton = document.querySelector("#openModal");
const addCardButton = document.querySelector("#openModal2");
const profileCloseBtn = document.querySelector("#profileExitBtn");
const addCloseBtn = document.querySelector("#addExitBtn");
const previewClose = document.querySelector("#image-preview_close");
const addCardSubmit = addCardPopup.querySelector("#addcard_submit");

//forms
const profileFormElement = document.querySelector("#edit-form");
const addFormElement = document.querySelector("#add-form");

const nameInput = document.querySelector("#nameInput");
const jobInput = document.querySelector("#jobInput");

const profileName = document.querySelector(".profile__title");
const profileJob = document.querySelector(".profile__description");

//event listeners
editProfileButton.addEventListener("click", () =>
  openModalWindow(profileEditPopup)
);
profileCloseBtn.addEventListener("click", () =>
  closeModalWindow(profileEditPopup)
);
addCardButton.addEventListener("click", () => openModalWindow(addCardPopup));
addCloseBtn.addEventListener("click", () => closeModalWindow(addCardPopup));
previewClose.addEventListener("click", () => closeModalWindow(previewModal));

function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;
  closeModalWindow(profileEditPopup);
}

profileFormElement.addEventListener("submit", handleProfileFormSubmit);

//render card

const cardTitle = document.querySelector("#modal-add-title");
const cardLink = document.querySelector("#modal-add-link");

addFormElement.addEventListener("submit", (evt) => {
  evt.preventDefault();
  const cardObj = {
    name: cardTitle.value,
    link: cardLink.value,
  };
  renderCard(createCard(cardObj));
  addFormElement.reset();
  addCardSubmit.classList.add("modal__form-button_disabled");
  addCardSubmit.disabled = true;
  closeModalWindow(addCardPopup);
});

function createCard(data) {
  const card = new Card(data, "#cardTemplate");
  const cardElement = card.generateCard();
  return cardElement;
}

const cardList = document.querySelector(".cards__list");

function renderCard(card) {
  cardList.prepend(card);
}

initialCards.forEach((element) => renderCard(createCard(element)));

// Validation

const validationConfig = {
  inputSelector: ".modal__form-input",
  submitButtonSelector: ".modal__form-button",
  inactiveButtonClass: "modal__form-button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "modal__error_visible",
};

const addFormValidator = new FormValidator(validationConfig, addFormElement);
addFormValidator.enableValidation();

const editFormValidator = new FormValidator(
  validationConfig,
  profileFormElement
);
editFormValidator.enableValidation();
