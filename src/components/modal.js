import { nameInput,jobInput, profileTitle, profileDescription } from "../constants";

export function openModal(formElement) {
  formElement.classList.add("popup_is-animated");
  formElement.classList.add("popup_is-opened");
  window.addEventListener("keydown", keyHandlerEsc);
}

export function closeModal(formElement) {
  formElement.classList.remove("popup_is-opened");
  window.removeEventListener("keydown", keyHandlerEsc);
}

function keyHandlerEsc(evt) {
  if (evt.key === "Escape") {
    const formIsOpened = document.querySelector(".popup_is-opened");
    formIsOpened.classList.remove("popup_is-opened");
  }
}

export function closePopupOnCross() {
  const openedModal = document.querySelector(".popup_is-opened");
  openedModal.classList.remove("popup_is-opened");
  window.removeEventListener("keydown", keyHandlerEsc);
}

export function closeModalOver(evt) {
  if (evt.target.classList.contains("popup")) {
    closeModal(evt.target);
  }
}

export function handleFormSubmit(evt) {
  const popupEditElement = document.querySelector(".popup_type_edit");
  evt.preventDefault();
  profileTitle.textContent = nameInput.value.trim();
  profileDescription.textContent = jobInput.value.trim();
  closeModal(popupEditElement);
}
