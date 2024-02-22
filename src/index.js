import './pages/index.css';
import { cardsList, popupEditElement, popupImageElement, popupCloseButtons, popupNewCardElement, nameInput, jobInput, profileTitle, profileDescription, formProfileEditElement, formNewCardElement } from './constants.js';
import { initialCards, createCard, deleteCard, handleAddNewCard} from './components/cards.js';
import { openModal, closePopupOnCross, closeModalOver, handleFormSubmit} from './components/modal.js';

const profileAddButton = document.querySelector(".profile__add-button");
const profileEditButton = document.querySelector(".profile__edit-button");

initialCards.forEach(function (cardData) {
  cardsList.append(createCard(cardData, deleteCard));
});

profileEditButton.addEventListener("click", () => {
  openModal(popupEditElement);
  jobInput.value = profileDescription.textContent;
  nameInput.value = profileTitle.textContent;
});

profileAddButton.addEventListener("click", () => openModal(popupNewCardElement));

popupCloseButtons.forEach((element) => {
  element.addEventListener("click", () => closePopupOnCross());
});

popupEditElement.addEventListener("mousedown", closeModalOver);
popupNewCardElement.addEventListener("mousedown", closeModalOver);
popupImageElement.addEventListener("mousedown", closeModalOver);

formProfileEditElement.addEventListener("submit", handleFormSubmit);
formNewCardElement.addEventListener("submit", handleAddNewCard);
