import "./index.css";

//import all classes
import FormValidator from "../components/FormValidator.js";
import Card from "../components/Card.js";
import Section from "../components/Section.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import UserInfo from "../components/UserInfo.js";
import Api from "../utils/Api.js";

//import constants
import {
  selectors,
  editProfileButton,
  addCardButton,
  profileName,
  profileDescription,
  validationConfig,
  nameInput,
  jobInput,
  profileAvatar,
  avatarEditButton,
  apiConfig,
} from "../utils/constants";

const api = new Api(apiConfig);
let userId;

//create instances of the classes and init.
const createCard = (cardObj) => {
  const card = new Card(
    {
      data: { ...cardObj, userId },
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

api.getInitialCards().then((result) => {
  const cardSection = new Section(
    {
      items: result,
      renderer: (data) => {
        const cardEl = createCard(data);
        cardSection.addItems(cardEl);
      },
    },
    ".cards__list"
  );
  cardSection.renderItems();
  const addForm = new PopupWithForm("#cardAdd", (data) => {
    const newCard = { name: data.title, link: data.link };
    addForm.renderLoading(true);
    api.addNewCard(newCard).then((result) => {
      const newCardEl = createCard(result);
      cardSection.prependItem(newCardEl);
      addForm.close();
      addForm.renderLoading(false);
    });
  });
  addForm.setEventListeners();
  addCardButton.addEventListener("click", () => {
    addFormValidator.toggleButtonState();
    addForm.open();
  });
});

// const cardSection = new Section(
//   {
//     items: initialCards,
//     renderer: (data) => {
//       const cardEl = createCard(data);
//       cardSection.addItems(cardEl);
//     },
//   },
//   ".cards__list"
// );
// cardSection.renderItems();

// const addForm = new PopupWithForm("#cardAdd", (data) => {
//   const newCard = { name: data.title, link: data.link };
//   api.addNewCard(newCard).then((result) => {
//     const newCardEl = createCard(result);
//     cardSection.addItems(newCardEl);
//     addForm.close();
//   });
// });
// addForm.setEventListeners();

const addFormValidator = new FormValidator(
  validationConfig,
  selectors.cardAddForm
);
addFormValidator.enableValidation();

// addCardButton.addEventListener("click", () => {
//   addFormValidator.toggleButtonState();
//   addForm.open();
// });

const newUserInfo = new UserInfo({
  nameElement: profileName,
  jobElement: profileDescription,
});

const profileForm = new PopupWithForm(selectors.profilePopup, (data) => {
  profileForm.renderLoading(true);
  api.updateProfileData(data.name, data.description).then(() => {
    newUserInfo.setUserInfo(data);
    profileForm.close();
    profileForm.renderLoading(false);
  });
});

profileForm.setEventListeners();

editProfileButton.addEventListener("click", () => {
  const { userName, userJob } = newUserInfo.getUserInfo();
  nameInput.value = userName;
  jobInput.value = userJob;
  profileForm.open();
});

const editFormValidator = new FormValidator(
  validationConfig,
  selectors.profileForm
);
editFormValidator.enableValidation();

api.getProfileData().then((result) => {
  userId = result._id;
  profileName.textContent = result.name;
  profileDescription.textContent = result.about;
  profileAvatar.src = result.avatar;
});

// const updateAvatarForm = new PopupWithForm(selectors.avatarPopup, (data) => {
//   updateAvatarForm.renderLoading(true);
//   api.setUserAvatar(data.avatar).then(() => {
//     newUserInfo.setUserInfo(data);
//     updateAvatarForm.close();
//     updateAvatarForm.renderLoading(false);
//   });
// });

// const avatarFormValidator = new FormValidator(
//   validationConfig,
//   selectors.avatarForm
// );
// avatarFormValidator.enableValidation();
// avatarEditButton.addEventListener("click", () => {
//   avatarFormValidator.toggleButtonState();
//   updateAvatarForm.open();
// });

// updateAvatarForm.setEventListeners();
