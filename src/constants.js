export const cardTemplate = document.querySelector('#card-template').content;

export const pageContent = document.querySelector('.page__content');
export const cardsList = pageContent.querySelector('.places__list');
export const formProfileEditElement = document.querySelector('form[name="edit-profile"]');
export const nameInput = formProfileEditElement.querySelector(".popup__input_type_name");
export const jobInput = formProfileEditElement.querySelector(".popup__input_type_description");
export const profileTitle = document.querySelector(".profile__title");
export const profileDescription = document.querySelector(
  ".profile__description"
);
export const popupEditElement = document.querySelector(".popup_type_edit");
export const popupImageElement = document.querySelector(".popup_type_image");
export const popupCloseButtons = document.querySelectorAll(".popup__close");
export const imageElement = document.querySelector(".popup__image");
export const imageTitle = document.querySelector(".popup__caption");

export const formNewCardElement = document.querySelector(".popup__content__new-card");
export const newCardNameInput = formNewCardElement.querySelector(".popup__input_type_card-name");
export const newCardUrlInput = formNewCardElement.querySelector(".popup__input_type_url");
export const popupNewCardElement = document.querySelector(".popup_type_new-card");
