import "./pages/index.css";
import {
  popupProfileEditElement,
  popupNewCardElement,
  nameInput,
  jobInput,
  profileTitle,
  profileDescription,
  profileImage,
  formProfileEditElement,
  formNewCardElement,
  popups,
  profileAddNewCardButton,
  profileEditButton,
  avatarEditBtn,
  popupAvatar,
  popupAvatarForm,
} from "./constants.js";
import {
  handleAddNewCard,
  renderCards,
  renderLoading,
} from "./components/card.js";
import { openModal, closeModal } from "./components/modal.js";
import {
  validationConfig,
  enableValidation,
  clearValidation,
} from "./components/validation.js";
import {
  getInitialIn,
  reNewUserProfile,
  updateNewAvatar,
} from "./components/api.js";

profileEditButton.addEventListener("click", () => {
  openModal(popupProfileEditElement);
  clearValidation(popupProfileEditElement, validationConfig);
  jobInput.value = profileDescription.textContent;
  nameInput.value = profileTitle.textContent;
});

profileAddNewCardButton.addEventListener("click", () => {
  openModal(popupNewCardElement);
  clearValidation(popupNewCardElement, validationConfig);
});

const handleProfileFormSubmit = async (evt) => {
  evt.preventDefault();
  reNewUserProfile({
    name: formProfileEditElement.name.value,
    about: formProfileEditElement.description.value,
  })
    .then((newProfile) => {
      fillProfileInfo(newProfile);
      closeModal();
      clearValidation(formProfileEditElement, validationConfig);
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      renderLoading(
        false,
        formProfileEditElement.querySelector(".popup__button")
      );
    });
};

formProfileEditElement.addEventListener("submit", handleProfileFormSubmit);
formNewCardElement.addEventListener("submit", handleAddNewCard);
avatarEditBtn.addEventListener("click", () => {
  openModal(popupAvatar);
  clearValidation(popupAvatarForm, validationConfig);
  popupAvatarForm.reset();
});

popups.forEach((popup) => {
  popup.addEventListener("mousedown", (evt) => {
    if (evt.target.classList.contains("popup_is-opened")) {
      closeModal();
    }
    if (evt.target.classList.contains("popup__close")) {
      closeModal();
    }
  });
});

avatarEditBtn.addEventListener("click", () => {
  openModal(popupAvatar);
  clearValidation(popupAvatarForm, validationConfig);
  popupAvatarForm.reset();
});

const handleAvatarFormSubmit = async (evt) => {
  evt.preventDefault();

  renderLoading(true, popupAvatarForm.querySelector(".popup__button"));

  updateNewAvatar(popupAvatarForm.link.value)
    .then((newProfile) => {
      fillProfileInfo(newProfile);
      closeModal();
      clearValidation(popupAvatarForm, validationConfig);
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      renderLoading(false, popupAvatarForm.querySelector(".popup__button"));
    });
};

popupAvatarForm.addEventListener("submit", handleAvatarFormSubmit);

const fillProfileInfo = (userInfo) => {
  profileTitle.textContent = userInfo.name;
  profileDescription.textContent = userInfo.about;
  profileImage.style.backgroundImage = `url(${userInfo.avatar})`;
};

getInitialIn()
  .then((result) => {
    const userInfo = result[0];
    const initialCardsArr = result[1];

    fillProfileInfo(userInfo);
    renderCards(initialCardsArr);
  })
  .catch((err) => {
    console.log(err);
  });

enableValidation(validationConfig);
