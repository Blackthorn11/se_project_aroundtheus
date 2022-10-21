//popups
const profileEditPopup = document.querySelector("#profileEdit");
const addCardPopup = document.querySelector("#cardAdd");

//buttons
export const editProfileButton = document.querySelector("#openModal");
export const addCardButton = document.querySelector("#openModal2");
export const avatarEditButton = document.querySelector(".profile__image-edit");
const profileCloseBtn = document.querySelector("#profileExitBtn");
const addCloseBtn = document.querySelector("#addExitBtn");

//forms and inputs
const profileFormElement = document.querySelector("#edit-form");
const addFormElement = document.querySelector("#add-form");
export const nameInput = document.querySelector("#nameInput");
export const jobInput = document.querySelector("#jobInput");

//user info
export const profileName = document.querySelector(".profile__title");
export const profileDescription = document.querySelector(
  ".profile__description"
);
export const profileAvatar = document.querySelector(".profile__image");

// // initial data
// export const initialCards = [
//   {
//     name: "Yosemite Valley",
//     link: "https://code.s3.yandex.net/web-code/yosemite.jpg",
//   },
//   {
//     name: "Lake Louise",
//     link: "https://code.s3.yandex.net/web-code/lake-louise.jpg",
//   },
//   {
//     name: "Bald Mountains",
//     link: "https://code.s3.yandex.net/web-code/bald-mountains.jpg",
//   },
//   {
//     name: "Latemar",
//     link: "https://code.s3.yandex.net/web-code/latemar.jpg",
//   },
//   {
//     name: "Vanoise National Park",
//     link: "https://code.s3.yandex.net/web-code/vanoise.jpg",
//   },
//   {
//     name: "Lago di Braies",
//     link: "https://code.s3.yandex.net/web-code/lago.jpg",
//   },
// ];

//selectors
export const selectors = {
  previewPopup: "#image-preview",
  cardAddForm: "#add-form",
  profilePopup: "#profileEdit",
  profileForm: "#edit-form",
  cardTemplate: "#cardTemplate",
  userNameSelector: ".profile__title",
  userJobSelector: ".profile__description",
  avatarPopup: "#edit-avatar",
  avatarForm: "#edit-avatar-form",
  deletePopup: "#delete-card",
};

//validation config
export const validationConfig = {
  inputSelector: ".modal__form-input",
  submitButtonSelector: ".modal__form-button",
  inactiveButtonClass: "modal__form-button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "modal__error_visible",
};

// Api config
export const apiConfig = {
  baseUrl: "https://around.nomoreparties.co/v1/group-12",
  headers: {
    authorization: "7fc5c4b5-810f-422d-8040-d6c41ae3f41e",
    "Content-Type": "application/json",
  },
};
