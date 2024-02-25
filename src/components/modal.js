export function openModal(popup) {
  popup.classList.add("popup_is-animated");
  setTimeout(() => {
    popup.classList.add("popup_is-opened");
  }, 1);
  window.addEventListener("keydown", handleEscape);
}

export function closeModal(popup) {
  popup.classList.remove("popup_is-opened");
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
