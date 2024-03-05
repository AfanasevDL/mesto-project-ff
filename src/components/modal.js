export function openModal(popup) {
  popup.classList.add("popup_is-animated");
  setTimeout(() => {
    popup.classList.add("popup_is-opened");
  }, 1);
  window.addEventListener("keydown", handleEscape);
}

export function closeModal() {
  if (document.querySelector(".popup_is-opened")) {
    const openedPopup = document.querySelector(".popup_is-opened");
    openedPopup.classList.remove("popup_is-opened");
  }
  window.removeEventListener("keydown", handleEscape);
}

function handleEscape(evt) {
  if (evt.key === "Escape") {
    const openedPopup = document.querySelector(".popup_is-opened");
    closeModal(openedPopup);
  }
}
