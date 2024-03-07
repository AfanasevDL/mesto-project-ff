import "./pages/index.css";
import {
  cardsList,
  popupProfileEditElement,
  popupNewCardElement,
  popupImageElement,
  popupImageTitle,
  popupImage,
  nameInput,
  jobInput,
  profileTitle,
  profileDescription,
  profileImage,
  formProfileEditElement,
  popups,
  profileAddNewCardButton,
  profileEditButton,
  avatarEditButton,
  popupAvatar,
  popupAvatarForm,
} from "./elements.js";
import { createCard, likeCard, deleteCard } from "./components/card.js";
import { openModal, closeModal } from "./components/modal.js";
import { enableValidation, clearValidation } from "./components/validation.js";
import {
  getInitialInfo,
  getUserInfo,
  getInitialCards,
  editProfile,
  updateNewAvatar,
  postNewCard,
} from "./components/api.js";

// Получение данных пользователя

let userId;

getInitialInfo();
Promise.all([getUserInfo(), getInitialCards()])
  .then((array) => {
    const [userList, initialCards] = array;
    userId = userList._id;
    profileTitle.textContent = userList.name;
    profileDescription.textContent = userList.about;
    profileImage.style.backgroundImage = `url(${userList.avatar})`;
    renderCards(initialCards);
  })
  .catch((error) => {
    console.log(error);
  });

function prependCard(card, cardsList) {
  cardsList.prepend(card);
}

function renderCard(cardData) {
  const card = createCard(userId, cardData, {
    deleteCard,
    likeCard,
    handleCardClick,
  });
  prependCard(card, cardsList);
}

export function renderCards(array) {
  array.forEach(renderCard);
}

profileEditButton.addEventListener("click", () => {
  openModal(popupProfileEditElement);
  clearValidation(popupProfileEditElement, validationConfig);
  jobInput.value = profileDescription.textContent;
  nameInput.value = profileTitle.textContent;
});

function handleCardClick(cardData) {
  openModal(popupImageElement);
  popupImageTitle.textContent = cardData.name;
  popupImage.src = cardData.link;
  popupImage.alt = cardData.alt;
}
const formNewCardElement = document.forms["new-place"];
const newCardNameInput = formNewCardElement.querySelector(
  ".popup__input_type_card-name"
);
const newCardUrlInput = formNewCardElement.querySelector(
  ".popup__input_type_url"
);

// Добавление новой карточки

const handleAddNewCard = async (evt) => {
  evt.preventDefault();
  renderLoading(true, formProfileEditElement.querySelector(".popup__button"));
  const newCard = {
    name: newCardNameInput.value,
    link: newCardUrlInput.value,
    alt: newCardNameInput.value,
  };

  postNewCard(newCard)
    .then((newCardData) => {
      const newCard = createCard(userId, newCardData, {
        deleteCard,
        likeCard,
        handleCardClick,
      });
      cardsList.prepend(newCard);
      closeModal();
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

profileAddNewCardButton.addEventListener("click", () => {
  openModal(popupNewCardElement);
  clearValidation(popupNewCardElement, validationConfig);
});

formNewCardElement.addEventListener("submit", handleAddNewCard);

// Редактирование профиля

const handleProfileFormSubmit = async (evt) => {
  evt.preventDefault();
  renderLoading(true, formProfileEditElement.querySelector(".popup__button"));
  editProfile({
    name: formProfileEditElement.name.value,
    about: formProfileEditElement.description.value,
  })
    .then((newProfileInfo) => {
      profileTitle.textContent = newProfileInfo.name;
      profileDescription.textContent = newProfileInfo.about;
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

// Изменение аватара

const handleAvatarFormSubmit = async (evt) => {
  evt.preventDefault();
  renderLoading(true, popupAvatarForm.querySelector(".popup__button"));

  updateNewAvatar(popupAvatarForm.link.value)
    .then((res) => {
      profileImage.style.backgroundImage = `url('${res.avatar}')`;
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

avatarEditButton.addEventListener("click", () => {
  openModal(popupAvatar);
  clearValidation(popupAvatarForm, validationConfig);
  popupAvatarForm.reset();
});

popupAvatarForm.addEventListener("submit", handleAvatarFormSubmit);

// Дополнительные функции

const renderLoading = (isLoading, button) => {
  button.textContent = isLoading ? "Сохранение..." : "Сохранить";
};

// Закрытие попапов

popups.forEach((popup) => {
  popup.addEventListener("mousedown", (evt) => {
    if (
      evt.target.classList.contains("popup_is-opened") ||
      evt.target.classList.contains("popup__close")
    ) {
      closeModal();
    }
  });
});

// Валидация

const validationConfig = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible",
};

enableValidation(validationConfig);
