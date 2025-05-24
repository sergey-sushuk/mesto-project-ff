
export function openModal(modal) {
    modal.classList.add('popup_is-opened');
    document.addEventListener('keydown', handleEscape);
}

// закрытие popup
export function closeModal(modal) {
    modal.classList.remove('popup_is-opened');
    document.removeEventListener('keydown', handleEscape);
}

export const handleCloseButtonClick = (evt) => {
    const modal = evt.target.closest(".popup");
    if (modal) {
        closeModal(modal);
    }
};


//закрытие по esc
export const handleEscape = (evt) => {
    if (evt.key === "Escape") {
        const openedModal = document.querySelector(".popup_is-opened");
        if (openedModal) closeModal(openedModal);
    }
};
