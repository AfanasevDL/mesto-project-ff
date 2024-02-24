import {
  popupProfileEditElement,
  nameInput,
  jobInput,
  profileTitle,
  profileDescription,
} from "../constants";

export function openModal(popup) {
  popup.classList.add("popup_is-animated");
  setTimeout(() => {
    popup.classList.add("popup_is-opened");
  }, 1);
  window.addEventListener("keydown", handleEscape);
}

export function closeModal(popup) {
  setTimeout(() => {
    popup.classList.remove("popup_is-opened");
  }, 1);
  window.removeEventListener("keydown", handleEscape);
}

function handleEscape(evt) {
  if (evt.key === "Escape") {
    const openedPopup = document.querySelector(".popup_is-opened");
    closeModal(openedPopup);
  }
}

export function closeModalOver(evt) {
  if (evt.target.classList.contains("popup")) {
    closeModal(evt.target);
  }
}

export function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  profileTitle.textContent = nameInput.value.trim();
  profileDescription.textContent = jobInput.value.trim();
  closeModal(popupProfileEditElement);
}
