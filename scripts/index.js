// Темплейт карточки
const cardTemplate = document.querySelector('#card-template').content;

// DOM узлы
const pageContent = document.querySelector('.page__content');
const cardsList = pageContent.querySelector('.places__list');

// Функция создания карточки
function createCard(cardData, deleteCard) {
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);

  cardElement.querySelector('.card__title').textContent = cardData.name;
  const cardImage = cardElement.querySelector(".card__image");
  cardImage.src = cardData.link;
  cardImage.alt = cardData.alt;
  
  const deleteButton = cardElement.querySelector(".card__delete-button");
  deleteButton.addEventListener("click", () =>  deleteCard(cardElement))

  return cardElement;
}

// Функция удаления карточки
function deleteCard(card) {
  card.remove();
}

// Вывести карточки на страницу
initialCards.forEach(function (cardData) {
  cardsList.append(createCard(cardData, deleteCard));
});
