import "./index.css";

//import all classes
import FormValidator from "../components/FormValidator.js";
import Card from "../components/Card.js";
import Section from "../components/Section.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import UserInfo from "../components/UserInfo.js";

//import constants
import {
  initialCards,
  selectors,
  editProfileButton,
  addCardButton,
  profileName,
  profileDescription,
  validationConfig,
} from "../components/constants.js";

//create instances of the classes and init.
const createCard = (cardObj) => {
  const card = new Card(
    {
      data: cardObj,
      handlePreview: (imgData) => {
        previewPopup.open(imgData);
      },
    },
    selectors.cardTemplate
  );
  return card.generateCard();
};

const previewPopup = new PopupWithImage(selectors.previewPopup);
previewPopup.setEventListeners();

const cardSection = new Section(
  {
    items: initialCards,
    renderer: (data) => {
      const CardEl = createCard(data);
      cardSection.addItems(CardEl);
    },
  },
  ".cards__list"
);
cardSection.renderItems();

const addForm = new PopupWithForm("#cardAdd", (data) => {
  const newCard = { name: data.title, link: data[""] };
  const newCardEl = createCard(newCard);
  cardSection.addItems(newCardEl);
  addForm.close();
});
addForm.setEventListeners();

const addFormValidator = new FormValidator(
  validationConfig,
  selectors.cardAddForm
);
addFormValidator.enableValidation();

addCardButton.addEventListener("click", () => {
  addFormValidator.toggleButtonState();
  addForm.open();
});

function fillProfileForm() {
  const { userName, userJob } = UserInfo.getUserInfo();
  profileName.value = userName;
  profileDescription.value = userJob;
}
const newUserInfo = new UserInfo({
  nameSelector: profileName,
  jobSelector: profileDescription,
});

const profileForm = new PopupWithForm(selectors.profilePopup, (data) => {
  userInfo.setUserInfo({
    userName: data.name,
    userJob: data.description,
  });
  profileForm.close();
});
profileForm.setEventListeners();

editProfileButton.addEventListener("click", () => {
  fillProfileForm();
  profileForm.open();
});

const editFormValidator = new FormValidator(
  validationConfig,
  selectors.profileForm
);
editFormValidator.enableValidation();
