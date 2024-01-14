// Темплейт карточки
const cardTemplate = document.querySelector('#card-template').content;

// DOM узлы
const pageContent = document.querySelector('.page__content');
const cardsList = pageContent.querySelector('.places__list');

// Функция создания карточки
function addCard(card, deleteCard) {
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);

  cardElement.querySelector('.card__title').textContent = card.name;
  cardElement.querySelector('.card__image').src = card.link;
  cardElement.querySelector('.card__image').alt = card.alt;

  cardsList.append(cardElement);

  const deleteButton = cardElement.querySelector(".card__delete-button");
  deleteButton.addEventListener("click", deleteCard);
}

// Функция удаления карточки
function deleteCard(event) {
  const deleteItem = event.target.closest(".card");
  deleteItem.remove();
}

// Вывести карточки на страницу
initialCards.forEach(function (card) {
  addCard(card, deleteCard);
});
