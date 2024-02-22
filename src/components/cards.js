import { cardsList, cardTemplate, popupImageElement, imageElement, imageTitle, popupNewCardElement, newCardNameInput, newCardUrlInput } from "../constants.js";
import { openModal, closeModal } from "./modal.js"

export const initialCards = [
    {
      name: "Архыз",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg",
    },
    {
      name: "Челябинская область",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg",
    },
    {
      name: "Иваново",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg",
    },
    {
      name: "Камчатка",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg",
    },
    {
      name: "Холмогорский район",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg",
    },
    {
      name: "Байкал",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg",
    }
];

export function createCard(cardData, deleteCard) {
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
  const cardTitle = cardElement.querySelector('.card__title')
  const cardImage = cardElement.querySelector(".card__image");
  const likeButton= cardElement.querySelector(".card__like-button");
  const deleteButton = cardElement.querySelector(".card__delete-button");

  cardTitle.textContent = cardData.name;
  cardImage.src = cardData.link;
  cardImage.alt = cardData.alt;

  cardImage.addEventListener("click", (evt) => showImage(evt));
  likeButton.addEventListener("click", (evt) => likeCard(evt));
  deleteButton.addEventListener("click", () =>  deleteCard(cardElement))

  return cardElement;
}

export function deleteCard(card) {
  card.remove();
}

function likeCard(evt) {
  const card = evt.target;
  card.classList.toggle("card__like-button_is-active");
}

function showImage(evt) {
  openModal(popupImageElement);

  imageElement.setAttribute("src", evt.target.src);
  imageElement.setAttribute("alt", evt.target.alt);
  imageTitle.textContent = evt.target.alt;
}

export function handleAddNewCard(evt, cardsList) {
  evt.preventDefault();

  const newCard = {
    name: newCardNameInput.value,
    link: newCardUrlInput.value,
    alt: "",
  };
  renderCard(newCard)
  closeModal(popupNewCardElement);
  newCardNameInput.value = "";
  newCardUrlInput.value = "";
}

function prependCard(card, cardsList) {
  cardsList.prepend(card);
}

function renderCard(cardData) {
  const card = createCard(cardData, deleteCard)
  prependCard(card, cardsList)
}
