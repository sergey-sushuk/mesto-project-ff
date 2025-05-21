
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

// рендер 
export function renderCards(cards, container, deleting) {
  cards.forEach((card) => {
    const cardElement = createCard(card, deleting);
    container.append(cardElement);
  });
}

//like
export const handleLikeClick = (button) => {
  button.classList.toggle("card__like-button_is-active");
};

//открыть картинку
export const openImagePopup = (src, alt, caption) => {
  const popup = document.querySelector('.popup_type_image');
  const popupImage = popup.querySelector('.popup__image');
  const popupCaption = popup.querySelector('.popup__caption');
  popupImage.src = src;
  popupImage.alt = alt;
  popupCaption.textContent = caption;
  popup.classList.add('popup_is-opened');
  document.addEventListener('keydown', (evt) => {
    if (evt.key === 'Escape') {
      popup.classList.remove('popup_is-opened');
    }
  });
}

