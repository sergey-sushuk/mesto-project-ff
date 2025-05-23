  import { openImagePopup} from './index.js';
//создание карточки
export function createCard(card, deleteCard) {
  const template = document.querySelector('#card-template');
  const cardElement = template.content.cloneNode(true).children[0]; 
  const cardTitle = cardElement.querySelector('.card__title'); 
  const cardImage = cardElement.querySelector('.card__image');
  const deleteButton = cardElement.querySelector('.card__delete-button');
  const likeBtn = cardElement.querySelector('.card__like-button');
  cardTitle.textContent = card.name;
  cardImage.src = card.link;
  cardImage.alt = card.name;
  deleteButton.addEventListener('click', () => {
    deleteCard(cardElement);
  });

  cardImage.addEventListener("click", () => { openImagePopup(cardImage.src, cardImage.alt, cardTitle.textContent) });

  likeBtn.addEventListener('click', () => {
    handleLikeClick(likeBtn);
  });

  return cardElement;
}

//удаление карточки 
export function deleteCard(cardElement) {
  cardElement.remove();
}

//like
export const handleLikeClick = (button) => {
  button.classList.toggle("card__like-button_is-active");
};
