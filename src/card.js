
//создание карточки
export function createCard(item, { deleteCard, handleLikeClick, handleImageClick }) {
  const template = document.querySelector('#card-template');
  const cardElement = template.content.cloneNode(true).children[0];
  const deleteButton = cardElement.querySelector('.card__delete-button');
  const likeBtn = cardElement.querySelector('.card__like-button');
  const cardTitle = cardElement.querySelector('.card__title');
  const cardImage = cardElement.querySelector('.card__image');

  cardTitle.textContent = item.name;
  cardImage.src = item.link;
  cardImage.alt = item.name;

  deleteButton.addEventListener('click', () => {
    deleteCard(cardElement);
  });

  cardImage.addEventListener('click', () => {
    handleImageClick(item.link, item.name, cardTitle.textContent)
  });


  likeBtn.addEventListener('click', () => {
    handleLikeClick(cardElement);
  });

  return cardElement;
}

//удаление карточки 
export function deleteCard(cardElement) {
  cardElement.remove();
}

//like
export const handleLikeClick = (cardElement) => {
  cardElement.querySelector('.card__like-button').classList.toggle('card__like-button_is-active');

};
