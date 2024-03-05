import {
  cardsList,
  cardTemplate,
  popupImageElement,
  newCardNameInput,
  newCardUrlInput,
  popupImageTitle,
  popupImage,
  formProfileEditElement,
} from "../constants.js";
import { openModal, closeModal } from "./modal.js";
import {
  deleteLike,
  putLike,
  getUserIn,
  deleteCardAPI,
  config,
  postNewCard,
} from "./api.js";

export function createCard(
  cardData,
  { deleteCard, likeCard, handleCardClick }
) {
  const cardElement = cardTemplate.querySelector(".card").cloneNode(true);
  const cardTitle = cardElement.querySelector(".card__title");
  const cardImage = cardElement.querySelector(".card__image");
  const likeButton = cardElement.querySelector(".card__like-button");
  const cardLikesCount = cardElement.querySelector(".card__like-count");
  const deleteButton = cardElement.querySelector(".card__delete-button");

  cardTitle.textContent = cardData.name;
  cardImage.src = cardData.link;
  cardImage.alt = cardData.alt;
  cardLikesCount.textContent = cardData.likes.length;
  cardElement.dataset.cardId = cardData._id;
  cardElement.dataset.ownerId = cardData.owner._id;
  cardImage.addEventListener("click", () => handleCardClick(cardData));
  likeButton.addEventListener("click", (evt) => likeCard(evt, cardData._id));
  deleteButton.addEventListener("click", (evt) => deleteCard(evt));
  getUserIn().then((data) => {
    const cardsLikeArr = cardData.likes;
    for (let i = 0; i < cardsLikeArr.length; i++) {
      if (cardsLikeArr[i]._id == data._id) {
        likeButton.classList.add("card__like-button_is-active");
      }
    }
  });
  fetch(config.baseUrl + "/users/me", {
    headers: config.headers,
  })
    .then((res) => res.json())
    .then((data) => {
      if (data._id === cardData.owner._id) {
        deleteButton.classList.remove("card__delete-button-disabled");
      }
    });
  return cardElement;
}

export function deleteCard(evt) {
  const card = evt.target.closest(".card");
  const cardId = card.dataset.cardId;
  deleteCardAPI(cardId);
  card.remove();
}

export function likeCard(evt, cardId) {
  const target = evt.target;
  let currentLikes = target.parentNode.querySelector(".card__like-count");
  if (evt.target.classList.contains("card__like-button_is-active")) {
    deleteLike(cardId)
      .then((updatedCard) => {
        evt.target.classList.remove("card__like-button_is-active");
        currentLikes.textContent = updatedCard.likes.length;
      })
      .catch((err) => {
        console.log(err);
      });
  } else {
    putLike(cardId)
      .then((updatedCard) => {
        evt.target.classList.add("card__like-button_is-active");
        currentLikes.textContent = updatedCard.likes.length;
      })
      .catch((err) => {
        console.log(err);
      });
  }
}

export function handleCardClick(cardData) {
  openModal(popupImageElement);
  popupImageTitle.textContent = cardData.name;
  popupImage.src = cardData.link;
  popupImage.alt = cardData.alt;
}

export const handleAddNewCard = async (evt) => {
  evt.preventDefault();
  renderLoading(true, formProfileEditElement.querySelector(".popup__button"));
  const newCard = {
    name: newCardNameInput.value,
    link: newCardUrlInput.value,
    alt: newCardNameInput.value,
  };

  postNewCard(newCard)
    .then((newCard) => {
      renderCard(newCard);
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

function prependCard(card, cardsList) {
  cardsList.prepend(card);
}

function renderCard(cardData) {
  const card = createCard(cardData, { deleteCard, likeCard, handleCardClick });
  prependCard(card, cardsList);
}

export function renderCards(array) {
  array.forEach(renderCard);
}

export const renderLoading = (isLoading, button) => {
  button.textContent = isLoading ? "Сохранение..." : "Сохранить";
};
