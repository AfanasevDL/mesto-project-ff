export const cardTemplate = document.querySelector("#card-template").content;

export const pageContent = document.querySelector(".page__content");
export const cardsList = pageContent.querySelector(".places__list");
export const profileTitle = document.querySelector(".profile__title");
export const profileDescription = document.querySelector(
  ".profile__description"
);
export const profileImage = document.querySelector(".profile__image");

export const popups = document.querySelectorAll(".popup");
export const profileAddNewCardButton = document.querySelector(
  ".profile__add-button"
);
export const profileEditButton = document.querySelector(
  ".profile__edit-button"
);
export const popupAvatarForm = document.forms["avatar_edit"];
export const avatarEditBtn = document.querySelector(".profile__image_cover");
export const popupAvatar = document.querySelector(".popup_type_avatar");

export const popupProfileEditElement =
  document.querySelector(".popup_type_edit");
export const formProfileEditElement = document.forms["edit-profile"];
export const nameInput = formProfileEditElement.querySelector(
  ".popup__input_type_name"
);
export const jobInput = formProfileEditElement.querySelector(
  ".popup__input_type_description"
);

export const popupNewCardElement = document.querySelector(
  ".popup_type_new-card"
);
export const formNewCardElement = document.forms["new-place"];
export const newCardNameInput = formNewCardElement.querySelector(
  ".popup__input_type_card-name"
);
export const newCardUrlInput = formNewCardElement.querySelector(
  ".popup__input_type_url"
);

export const popupImageElement = document.querySelector(".popup_type_image");
export const popupImage = popupImageElement.querySelector(".popup__image");
export const popupImageTitle =
  popupImageElement.querySelector(".popup__caption");
