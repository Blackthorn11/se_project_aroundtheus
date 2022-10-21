import "./index.css";

//import all classes
import FormValidator from "../components/FormValidator.js";
import Card from "../components/Card.js";
import Section from "../components/Section.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupConfirm from "../components/PopupConfirm.js";
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
let cardSection;

const deleteForm = new PopupConfirm(selectors.deletePopup);
deleteForm.setEventListeners();

//create instances of the classes and init.
const createCard = (data) => {
  const card = new Card(
    {
      data: { ...data, userId },
      handlePreview: (imgData) => {
        previewPopup.open(imgData);
      },
      handleDeleteClick: () => {
        deleteForm.open(() => {
          deleteForm.renderLoading(true);
          api
            .deleteCard(data._id)
            .then(() => {
              card.handleDelete();
              deleteForm.close();
            })
            .catch((err) =>
              console.log(`An error occurred when deleting card: ${err}`)
            )
            .finally(() => deleteForm.renderLoading(false));
        });
      },
      handleCardLike: () => {
        if (card.cardLiked()) {
          api
            .removeLike(data._id)
            .then((res) => {
              card.updateLikes(res.likes);
            })
            .catch((err) =>
              console.log(`An error occurred when removing a like: ${err}`)
            );
        } else {
          api
            .addLike(data._id)
            .then((res) => {
              card.updateLikes(res.likes);
            })
            .catch((err) =>
              console.log(`An error occurred when adding a like: ${err}`)
            );
        }
      },
    },
    selectors.cardTemplate
  );
  return card.generateCard();
};

const previewPopup = new PopupWithImage(selectors.previewPopup);
previewPopup.setEventListeners();

// get web server info, cards and user data.
api
  .getWebpageInfo()
  .then(([cardData, userData]) => {
    userId = userData._id;
    cardSection = new Section(
      {
        items: cardData,
        renderer: (data) => {
          const cardEl = createCard(data);
          cardSection.addItems(cardEl);
        },
      },
      ".cards__list"
    );
    cardSection.renderItems();
    newUserInfo.setUserInfo({
      name: userData.name,
      description: userData.about,
    });
    newUserInfo.setUserAvatar(userData.avatar);
  })
  .catch((err) =>
    console.log(
      `An error occurred when loading initial user and card data: ${err}`
    )
  );

const addForm = new PopupWithForm("#cardAdd", (data) => {
  const newCard = { name: data.title, link: data.link };
  addForm.renderLoading(true);
  api
    .addNewCard(newCard)
    .then((result) => {
      const newCardEl = createCard(result);
      cardSection.prependItem(newCardEl);
      addForm.close();
    })
    .catch((err) =>
      console.log(`An error occurred when loading new card data: ${err}`)
    )
    .finally(() => addForm.renderLoading(false));
});
addForm.setEventListeners();
addCardButton.addEventListener("click", () => {
  addFormValidator.toggleButtonState();
  addForm.open();
});

const addFormValidator = new FormValidator(
  validationConfig,
  selectors.cardAddForm
);
addFormValidator.enableValidation();

const newUserInfo = new UserInfo({
  nameElement: profileName,
  jobElement: profileDescription,
  avatar: profileAvatar,
});

const profileForm = new PopupWithForm(selectors.profilePopup, (data) => {
  profileForm.renderLoading(true);
  api
    .updateProfileData(data.name, data.description)
    .then(() => {
      newUserInfo.setUserInfo(data);
      profileForm.close();
    })
    .catch((err) =>
      console.log(`An error occurred when loading user profile data: ${err}`)
    )
    .finally(() => profileForm.renderLoading(false));
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

const updateAvatarForm = new PopupWithForm(selectors.avatarPopup, (data) => {
  const avatarLink = data.avatar;
  updateAvatarForm.renderLoading(true);
  api
    .setUserAvatar(avatarLink)
    .then((data) => {
      newUserInfo.setUserAvatar(avatarLink);
      updateAvatarForm.close();
    })
    .catch((err) =>
      console.log(`An error occured when loading avatar data: ${err}`)
    )
    .finally(() => updateAvatarForm.renderLoading(false));
});

const avatarFormValidator = new FormValidator(
  validationConfig,
  selectors.avatarForm
);
avatarFormValidator.enableValidation();
avatarEditButton.addEventListener("click", () => {
  avatarFormValidator.toggleButtonState();
  updateAvatarForm.open();
});

updateAvatarForm.setEventListeners();
