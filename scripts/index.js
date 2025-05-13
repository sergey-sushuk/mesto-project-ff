// @todo: Темплейт карточки
const placesList = document.querySelector(".places__list");

// @todo: Функция создания карточки
function createCard(card, deleteCard) {
  const cardTemplate = document.querySelector("#card-template").content;
  const cardElement = cardTemplate.cloneNode(true).firstElementChild;
  const cardImage =  cardElement.querySelector(".card__image");
  const deleteButtonElement = cardElement.querySelector(".card__delete-button");

  cardElement.querySelector(".card__title").textContent = card.name;
  cardImage.src = card.link;
  cardImage.alt = card.name;

  deleteButtonElement.addEventListener("click", () => {
    deleteCard(cardElement);
  });

  return cardElement;
}

// @todo: Функция удаления карточки
function deleteCard(cardElement) {
  cardElement.remove();
}

// @todo: Вывести карточки на страницу
function renderCards(cards, container, deleting) {
  cards.forEach((card) => {
    const cardElement = createCard(card, deleting);
    container.append(cardElement);
  });
}

renderCards(initialCards, placesList, deleteCard);

//6 спринт. комит
