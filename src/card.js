import { deleteCard, addLike, removeLike } from './api.js';
//создание карточки
export function createCard(item, { handleLikeClick, handleImageClick },userId) {
  const template = document.querySelector('#card-template');
  const cardElement = template.content.cloneNode(true).children[0];
  const deleteButton = cardElement.querySelector('.card__delete-button');
  const likeBtn = cardElement.querySelector('.card__like-button');
  const cardTitle = cardElement.querySelector('.card__title');
  const cardImage = cardElement.querySelector('.card__image');
 const isOwner = item.owner && item.owner._id === userId;
 const likeCounter = cardElement.querySelector('.card__like-counter');
 likeCounter.textContent = item.likes ? item.likes.length : 0;
  if (!isOwner) {
    deleteButton.style.display = 'none';
  }
  if (item.likes && item.likes.find(like => like._id === userId)) {
    likeBtn.classList.add('card__like-button_is-active');
  }

  cardTitle.textContent = item.name;
  cardImage.src = item.link;
  cardImage.alt = item.name;

   
  deleteButton.addEventListener('click', () => {
   deleteCard(item._id)
      .then(() => {
        cardElement.remove();
      })
      .catch((err) => {
        console.error(`Ошибка: ${err}`);
      });
  });



  cardImage.addEventListener('click', () => {
    handleImageClick(item.link, item.name, cardTitle.textContent)
  });


  likeBtn.addEventListener('click', (event) => {
    likeBtnClick(event, item, likeCounter, likeBtn);
  });

  return cardElement;
}

export const likeBtnClick = (event, cardData, likeCounter, likeButton) => {
   if (likeButton) {
    const isLiked = likeButton.classList.contains('card__like-button_is-active');

    if (isLiked) {
      removeLike(cardData._id)
        .then((updatedCard) => {
          likeButton.classList.remove('card__like-button_is-active');
          likeCounter.textContent = updatedCard.likes.length;
        })
        .catch((err) => {
          console.error(`Ошибка: ${err}`);
        });
    } else {
      addLike(cardData._id)
        .then((updatedCard) => {
          likeButton.classList.add('card__like-button_is-active');
          likeCounter.textContent = updatedCard.likes.length;
        })
        .catch((err) => {
          console.error(`Ошибка: ${err}`);
        });
    }
  }
};
