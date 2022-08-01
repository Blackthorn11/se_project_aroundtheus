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

const profilePopup = document.querySelector("#profileEdit");
const addPopup = document.querySelector("#cardAdd");
const editButton = document.querySelector("#openModal");
const editButton2 = document.querySelector("#openModal2");
const profileCloseBtn = document.querySelector("#profileExitBtn");
const addCloseBtn = document.querySelector("#addExitBtn");

function openModal() {
  profilePopup.classList.add("modal_opened");
}

function closeModal() {
  profilePopup.classList.remove("modal_opened");
}

function openModal2() {
  addPopup.classList.add("modal_opened");
}

function closeModal2() {
  addPopup.classList.remove("modal_opened");
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

  return cardElement;
}

editButton.addEventListener("click", openModal);
profileCloseBtn.addEventListener("click", closeModal);
editButton2.addEventListener("click", openModal2);
addCloseBtn.addEventListener("click", closeModal2);

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
  closeModal();
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
  closeModal2();
});

const cardTemplate =
  document.querySelector("#cardTemplate").content.firstElementChild;

const cardList = document.querySelector(".cards__list");

initialCards.forEach(function (data) {
  const cardView = getCard(data);
  renderCards(cardView, cardList);
});
