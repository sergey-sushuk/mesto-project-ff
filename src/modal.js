import { createCard } from './card.js';

//открытие профиля
export function openProfileModal(modal, nameInput, jobInput, ProfilName, ProfilDesc) {
    nameInput.value = ProfilName.textContent;
    jobInput.value = ProfilDesc.textContent;
    modal.classList.add('popup_is-opened');
}

//открытие добавление карточек
export function AddImage(addPupup) {
    addPupup.classList.add('popup_is-opened');
}

// закрытие popup
export function closeModal(modal) {
    modal.classList.remove('popup_is-opened');
}

export const handleCloseButtonClick = (evt) => {
    const modal = evt.target.closest(".popup");
    if (modal) {
        closeModal(modal);
    }
};

//сохранение
export function handleFormSubmitEditProfile(evt, nameInput, jobInput, ProfilName, ProfilDesc) {
    evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.

    // Так мы можем определить свою логику отправки.
    const nameInputValue = nameInput.value;
    const jobInputValue = jobInput.value;

    ProfilName.textContent = nameInputValue;
    ProfilDesc.textContent = jobInputValue;
}

export function handleFormSubmitAddImage(evt, imgName, imgUrl, deleteCard, placesList) {
    evt.preventDefault();

    const newImg = imgName.value;
    const newUrl = imgUrl.value;
    const newCard = { name: newImg, link: newUrl };
    const cardElement = createCard(newCard, deleteCard);

    placesList.prepend(cardElement);
}
