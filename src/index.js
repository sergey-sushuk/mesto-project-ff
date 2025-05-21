import '/pages/index.css';
import { initialCards } from './cards.js';
import { deleteCard, renderCards } from './card.js';
import {
  openProfileModal,
  closeModal,
  handleCloseButtonClick,
  AddImage,
  handleFormSubmitEditProfile,
  handleFormSubmitAddImage

} from './modal.js';

const popups = document.querySelectorAll('.popup');
const placesList = document.querySelector('.places__list') || document.body;
const modal = document.querySelector('.popup_type_edit');
const editBtn = document.querySelector('.profile__edit-button');
const closeBtn = document.querySelectorAll('.popup__close');
const saveBtn = document.querySelector('.popup__button');
let ProfilName = document.querySelector('.profile__title');
let ProfilDesc = document.querySelector('.profile__description');
let nameInput = document.querySelector('.popup__input_type_name')
let jobInput = document.querySelector('.popup__input_type_description')
const addBtn = document.querySelector('.profile__add-button');
const addPupup = document.querySelector('.popup_type_new-card');
const imgName = document.querySelector('.popup__input_type_card-name');
const imgUrl = document.querySelector('.popup__input_type_url');
const imgForm = document.forms["new-place"];
const formSaveBtn = imgForm.querySelector('.popup__button')


renderCards(initialCards, placesList, deleteCard);

popups.forEach(item => item.classList.add('popup_is-animated'));

saveBtn.addEventListener('click', (evt) => {
  handleFormSubmitEditProfile(evt, nameInput, jobInput, ProfilName, ProfilDesc);
  closeModal(modal);
});

//обработчик профиля
editBtn.addEventListener('click', () => openProfileModal(modal, nameInput, jobInput, ProfilName, ProfilDesc));

closeBtn.forEach((btn) => {
  btn.addEventListener('click', (evt) => {
    handleCloseButtonClick(evt);
  });
});

// обработчик имг
addBtn.addEventListener('click', () => AddImage(addPupup));

//закрытие по оверлей
document.querySelectorAll('.popup').forEach(modal => {
  modal.addEventListener('click', (evt) => {
    if (evt.target === modal) {
      closeModal(modal);
    }
  });
});

//закрытие по esc
document.addEventListener('keydown', (evt) => {
  if (evt.key === 'Escape') {
    closeModal(modal);
  }
});

document.addEventListener('keydown', (evt) => {
  if (evt.key === 'Escape') {
    closeModal(addPupup);
  }
});

// Можно добавить обработчик для закрытия по кнопке или клику вне содержимого
document.querySelectorAll('.popup__close').forEach(btn => {
  btn.addEventListener('click', () => {
    btn.closest('.popup').classList.remove('popup_opened');
  });
});

formSaveBtn.addEventListener('click', (evt) => {
  handleFormSubmitAddImage(evt, imgName, imgUrl, deleteCard, placesList);
  imgName.value = '';
  imgUrl.value = '';
  closeModal(addPupup);
});



