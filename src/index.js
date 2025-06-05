import '/pages/index.css';
import { initialCards } from './cards.js';
import { createCard, deleteCard, handleLikeClick } from './card.js';
import {
  closeModal,
  handleCloseButtonClick,
  openModal
} from './modal.js';

const popups = document.querySelectorAll('.popup');
const placesList = document.querySelector('.places__list') || document.body;
const modal = document.querySelector('.popup_type_edit');
const editBtn = document.querySelector('.profile__edit-button');
const closeBtns = document.querySelectorAll('.popup__close');
const profilName = document.querySelector('.profile__title');
const profilDesc = document.querySelector('.profile__description');
const nameInput = document.querySelector('.popup__input_type_name')
const jobInput = document.querySelector('.popup__input_type_description')
const addBtn = document.querySelector('.profile__add-button');
const addPupup = document.querySelector('.popup_type_new-card');
const imgName = document.querySelector('.popup__input_type_card-name');
const imgUrl = document.querySelector('.popup__input_type_url');
const imgForm = document.forms["new-place"];
const editForm = document.forms["edit-profile"];
const popup = document.querySelector('.popup_type_image');

renderCards(initialCards, placesList);

popups.forEach(item => item.classList.add('popup_is-animated'));

editForm.addEventListener('submit', (evt) => {
  evt.preventDefault();
  handleFormSubmitEditProfile(evt, nameInput, jobInput, profilName, profilDesc);
  closeModal(modal);
});

//обработчик профиля
editBtn.addEventListener('click', () => openProfileModal(modal, nameInput, jobInput, profilName, profilDesc));

closeBtns.forEach((btn) => {
  btn.addEventListener('click', (evt) => {
    handleCloseButtonClick(evt);
  });
});

// обработчик имг
addBtn.addEventListener('click', () => openModal(addPupup));

//закрытие по оверлей
document.querySelectorAll('.popup').forEach(modal => {
  modal.addEventListener('click', (evt) => {
    if (evt.target === modal) {
      closeModal(modal);
    }
  });
});

// Можно добавить обработчик для закрытия по кнопке или клику вне содержимого
document.querySelectorAll('.popup__close').forEach(btn => {
  btn.addEventListener('click', () => {
    btn.closest('.popup').classList.remove('popup_opened');
  });
});

imgForm.addEventListener('submit', (evt) => {
  evt.preventDefault();
  handleFormSubmitAddImage(evt, imgName, imgUrl, placesList);
  imgName.value = '';
  imgUrl.value = '';
  closeModal(addPupup);
});

// рендер 
function renderCards(cards, container) {
  cards.forEach((card) => {
    const cardElem = createCard(card, {
      deleteCard: deleteCard,
      handleLikeClick: handleLikeClick,
      handleImageClick: () => openImagePopup(card.link, card.name, card.name)
    });

    container.append(cardElem);

  });
}

//открытие профиля
function openProfileModal(modal, nameInput, jobInput, profilName, profilDesc) {
  nameInput.value = profilName.textContent;
  jobInput.value = profilDesc.textContent;
  openModal(modal);
}

//открыть картинку
const openImagePopup = (src, alt, caption) => {
  const popupImage = popup.querySelector('.popup__image');
  const popupCaption = popup.querySelector('.popup__caption');
  popupImage.src = src;
  popupImage.alt = alt;
  popupCaption.textContent = caption;
  openModal(popup);
}

//сохранение
function handleFormSubmitEditProfile(evt, nameInput, jobInput, profilName, profilDesc) {
  evt.preventDefault();

  const nameInputValue = nameInput.value;
  const jobInputValue = jobInput.value;

  profilName.textContent = nameInputValue;
  profilDesc.textContent = jobInputValue;
}


function handleFormSubmitAddImage(evt, imgName, imgUrl, placesList) {
  evt.preventDefault();

  const newImg = imgName.value;
  const newUrl = imgUrl.value;
  const card = { name: newImg, link: newUrl };
  const cardElem = createCard(card, {
    deleteCard: deleteCard,
    handleLikeClick: handleLikeClick,
    handleImageClick: () => openImagePopup(card.link, card.name, card.name)
  });
  placesList.prepend(cardElem);

}




import { enableValidation, clearValidation } from './validation.js';

const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled', 
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
};

// Включение валидации
enableValidation(validationConfig);