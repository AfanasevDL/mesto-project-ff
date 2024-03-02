import "./pages/index.css";
import {
  cardsList,
  popupProfileEditElement,
  popupNewCardElement,
  nameInput,
  jobInput,
  profileTitle,
  profileDescription,
  formProfileEditElement,
  formNewCardElement,
  popups,
  profileAddNewCardButton,
  profileEditButton,
} from "./constants.js";
import {
  createCard,
  deleteCard,
  likeCard,
  handleCardClick,
  handleAddNewCard,
} from "./components/card.js";
import { initialCards } from "./components/cards.js";
import {
  openModal,
  closeModal,
} from "./components/modal.js";
import { validationConfig, enableValidation, clearValidation } from "./components/validation.js";

initialCards.forEach(function (cardData) {
  cardsList.append(
    createCard(cardData, { deleteCard, likeCard, handleCardClick })
  );
});

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

function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  profileTitle.textContent = nameInput.value.trim();
  profileDescription.textContent = jobInput.value.trim();
  closeModal(popupProfileEditElement);
}

formProfileEditElement.addEventListener("submit", handleProfileFormSubmit);
formNewCardElement.addEventListener("submit", handleAddNewCard);

popups.forEach((popup) => {
  popup.addEventListener("mousedown", (evt) => {
    if (evt.target.classList.contains("popup_is-opened")) {
      closeModal(popup);
    }
    if (evt.target.classList.contains("popup__close")) {
      closeModal(popup);
    }
  });
});

enableValidation(validationConfig);
