export function openModalWindow(modalWindow) {
  modalWindow.classList.add("modal_opened");
  document.addEventListener("keydown", closeByEscape);
  document.addEventListener("mousedown", closeModalWithOverlay);
}
export function closeModalWindow(modalWindow) {
  modalWindow.classList.remove("modal_opened");
  document.removeEventListener("keydown", closeByEscape);
  document.removeEventListener("mousedown", closeModalWithOverlay);
}

export function closeModalWithOverlay(evt) {
  if (evt.target.classList.contains("modal_opened")) {
    closeModalWindow(evt.target);
  }
}
export function closeByEscape(evt) {
  if (evt.key === "Escape") {
    const openedModal = document.querySelector(".modal_opened");
    closeModalWindow(openedModal);
  }
}
