// @todo: Темплейт карточки
const placesList = document.querySelector(".places__list");

// @todo: Функция создания карточки
function createCard(card, deleteCard) {
  const cardTemplate = document.querySelector("#card-template").content;
  const cardElement = cardTemplate.cloneNode(true).firstElementChild;

  cardElement.querySelector(".card__title").textContent = card.name;
  cardElement.querySelector(".card__image").src = card.link;
  const resetButton = cardElement.querySelector(".card__delete-button");

  resetButton.addEventListener("click", () => {
    deleteCard(cardElement);
  });

  return cardElement;
}

// @todo: Функция удаления карточки
function deleteCard(cardElement) {
  cardElement.remove();
}

// @todo: Вывести карточки на страницу
function addCard(cards, container, deleting) {
  cards.forEach((card) => {
    const cardElement = createCard(card, deleting);
    container.append(cardElement);
  });
}

addCard(initialCards, placesList, deleteCard);
