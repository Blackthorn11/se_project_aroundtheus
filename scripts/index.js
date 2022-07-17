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

const profilePopup = document.querySelector(".modal");
const editButton = document.querySelector("#openModal");
const profileCloseBtn = document.querySelector("#closeModal");

function openModal() {
  profilePopup.classList.add("modal_opened");
}

function closeModal() {
  profilePopup.classList.remove("modal_opened");
}

editButton.addEventListener("click", openModal);
profileCloseBtn.addEventListener("click", closeModal);

const profileFormElement = document.querySelector(".modal__form");

const nameInput = document.querySelector("#nameInput");
const jobInput = document.querySelector("#jobInput");

const profileName = document.querySelector(".profile__title");
const profileJob = document.querySelector(".profile__description");

function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;
  closeModal();
}

profileFormElement.addEventListener("submit", handleProfileFormSubmit);

const cardTemplate =
  document.querySelector("#cardTemplate").content.firstElementChild;

const cardList = document.querySelector(".cards__list");

initialCards.forEach(function getCardElement(data) {
  const cardElement = cardTemplate.cloneNode(true);
  const cardImage = cardElement.querySelector(".card__image");
  const cardTitle = cardElement.querySelector(".card__title");

  cardImage.src = data.link;
  cardImage.alt = data.name;
  cardTitle.textContent = data.name;

  cardList.appendChild(cardElement);
});
