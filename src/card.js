
//создание карточки
export function createCard() {
  const template = document.querySelector('#card-template');
  const cardElement = template.content.cloneNode(true).children[0]; 
  const deleteButton = cardElement.querySelector('.card__delete-button');
  const likeBtn = cardElement.querySelector('.card__like-button');
  
  deleteButton.addEventListener('click', () => {
    deleteCard(cardElement);
  });



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
