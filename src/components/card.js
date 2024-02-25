import {
  cardsList,
  cardTemplate,
  popupImageElement,
  popupNewCardElement,
  newCardNameInput,
  newCardUrlInput,
  popupImageTitle,
  popupImage,
} from "../constants.js";
import { openModal, closeModal } from "./modal.js";

export function createCard(
  cardData,
  { deleteCard, likeCard, handleCardClick }
) {
  const cardElement = cardTemplate.querySelector(".card").cloneNode(true);
  const cardTitle = cardElement.querySelector(".card__title");
  const cardImage = cardElement.querySelector(".card__image");
  const likeButton = cardElement.querySelector(".card__like-button");
  const deleteButton = cardElement.querySelector(".card__delete-button");

  cardTitle.textContent = cardData.name;
  cardImage.src = cardData.link;
  cardImage.alt = cardData.alt;

  cardImage.addEventListener("click", () => handleCardClick(cardData));
  likeButton.addEventListener("click", likeCard);
  deleteButton.addEventListener("click", () => deleteCard(cardElement));

  return cardElement;
}

export function deleteCard(card) {
  card.remove();
}

export function likeCard(evt) {
  const card = evt.target;
  card.classList.toggle("card__like-button_is-active");
}

export function handleCardClick(cardData) {
  openModal(popupImageElement);
  popupImageTitle.textContent = cardData.name;
  popupImage.src = cardData.link;
  popupImage.alt = cardData.alt;
}

export function handleAddNewCard(evt) {
  evt.preventDefault();

  const newCard = {
    name: newCardNameInput.value,
    link: newCardUrlInput.value,
    alt: "",
  };
  renderCard(newCard);
  closeModal(popupNewCardElement);
  evt.target.reset();
}

function prependCard(card, cardsList) {
  cardsList.prepend(card);
}

function renderCard(cardData) {
  const card = createCard(cardData, { deleteCard, likeCard, handleCardClick });
  prependCard(card, cardsList);
}
