import { deleteLike, putLike, deleteCardAPI, config } from "./api.js";

export function createCard(
  userId,
  cardData,
  { deleteCard, likeCard, handleCardClick }
) {
  const cardTemplate = document.querySelector("#card-template").content;
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

  if (cardData.likes.some((element) => element._id === userId)) {
    likeButton.classList.add("card__like-button_is-active");
  }

  if (userId === cardData.owner._id) {
    deleteButton.classList.remove("card__delete-button-disabled");
    deleteButton.addEventListener("click", deleteCard);
  }
  
  return cardElement;
}

export function deleteCard(evt) {
  const card = evt.target.closest(".card");
  const cardId = card.dataset.cardId;
  deleteCardAPI(cardId)
    .then((card) => {
      card.remove();
    })
    .catch((err) => {
      console.log(err);
    });
}

export function likeCard(evt, cardId) {
  const currentLikes = evt.target.parentNode.querySelector(".card__like-count");
  const likeMethod = evt.target.classList.contains(
    "card__like-button_is-active"
  )
    ? deleteLike
    : putLike;
  likeMethod(cardId)
    .then((updatedCard) => {
      evt.target.classList.toggle("card__like-button_is-active");
      currentLikes.textContent = updatedCard.likes.length;
    })
    .catch((err) => {
      console.log(err);
    });
}
