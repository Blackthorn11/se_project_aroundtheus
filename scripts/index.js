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
const profilePopup = document.querySelector("#profileEdit");
const addPopup = document.querySelector("#cardAdd");
const previewModal = document.querySelector("#image-preview");
const editButton = document.querySelector("#openModal");
const editButton2 = document.querySelector("#openModal2");
const profileCloseBtn = document.querySelector("#profileExitBtn");
const addCloseBtn = document.querySelector("#addExitBtn");
const previewClose = document.querySelector("#image-preview_close");

//functions
function openModalWindow(modalWindow) {
  modalWindow.classList.add("modal_opened");
}
function closeModalWindow(modalWindow) {
  modalWindow.classList.remove("modal_opened");
}

function renderCards(cardElement, container) {
  cardList.prepend(cardElement);
}

function getCard(data) {
  const cardElement = cardTemplate.cloneNode(true);
  const cardImage = cardElement.querySelector(".card__image");
  const cardTitle = cardElement.querySelector(".card__title");

  cardImage.src = data.link;
  cardImage.alt = data.name;
  cardTitle.textContent = data.name;

  const cardLikeButton = cardElement.querySelector(".card__like-button");
  cardLikeButton.addEventListener("click", () => {
    cardLikeButton.classList.toggle("card__like-button_on");
  });

  const cardDeleteButton = cardElement.querySelector(".card__delete-button");
  cardDeleteButton.addEventListener("click", () => {
    cardElement.remove();
  });

  cardImage.addEventListener("click", () => {
    const previewImage = previewModal.querySelector(".modal__preview-image");
    const previewTitle = previewModal.querySelector(".modal__preview-title");
    previewImage.src = data.link;
    previewTitle.textContent = data.name;
    openModalWindow(previewModal);
  });

  return cardElement;
}
//event listeners
editButton.addEventListener("click", () => openModalWindow(profilePopup));
profileCloseBtn.addEventListener("click", () => closeModalWindow(profilePopup));
editButton2.addEventListener("click", () => openModalWindow(addPopup));
addCloseBtn.addEventListener("click", () => closeModalWindow(addPopup));
previewClose.addEventListener("click", () => closeModalWindow(previewModal));

//forms
const profileFormElement = document.querySelector("#edit-form");
const addFormElement = document.querySelector("#add-form");

const nameInput = document.querySelector("#nameInput");
const jobInput = document.querySelector("#jobInput");

const profileName = document.querySelector(".profile__title");
const profileJob = document.querySelector(".profile__description");

function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;
  closeModalWindow(profilePopup);
}

profileFormElement.addEventListener("submit", handleProfileFormSubmit);

addFormElement.addEventListener("submit", (evt) => {
  evt.preventDefault();
  const name = evt.target.title.value;
  const link = evt.target.link.value;
  const cardView = getCard({
    name,
    link,
  });
  renderCards(cardView, cardList);
  addFormElement.reset();
  closeModalWindow(addPopup);
});

const cardTemplate =
  document.querySelector("#cardTemplate").content.firstElementChild;

const cardList = document.querySelector(".cards__list");

initialCards.forEach(function (data) {
  const cardView = getCard(data);
  renderCards(cardView, cardList);
});
