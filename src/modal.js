import { createCard } from './card.js';

//открытие добавление карточек


export function openModal(modal) {
    modal.classList.add('popup_is-opened');
    document.addEventListener('keydown', handleEscape );
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

//сохранение
export function handleFormSubmitEditProfile(evt, nameInput, jobInput, profilName, profilDesc) {
    evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.

    // Так мы можем определить свою логику отправки.
    const nameInputValue = nameInput.value;
    const jobInputValue = jobInput.value;

    profilName.textContent = nameInputValue;
    profilDesc.textContent = jobInputValue;
}

export function handleFormSubmitAddImage(evt, imgName, imgUrl, deleteCard, placesList) {
    evt.preventDefault();

    const newImg = imgName.value;
    const newUrl = imgUrl.value;
    const newCard = { name: newImg, link: newUrl };
    const cardElement = createCard(newCard, deleteCard);

    placesList.prepend(cardElement);
}

//закрытие по esc
export const  handleEscape = (evt) => {
  if (evt.key === "Escape") {
    const openedModal = document.querySelector(".popup_is-opened");
    if (openedModal) closeModal(openedModal);
  }
};
