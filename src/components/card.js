import { likeCard, unlikeCard, deleteCard } from "./api.js";

const cardTemplate = document.querySelector("#card-template")?.content;

// Обработчик лайка
export function likeButtonClick(cardId, isLiked, likeButton, likeCounter) {
  const likeFunction = isLiked ? unlikeCard : likeCard;

  return likeFunction(cardId)
    .then((updatedCard) => {
      likeButton.classList.toggle("card__like-button_is-active");
      likeCounter.textContent = updatedCard.likes.length;
      return updatedCard;
    })
    .catch((err) => {
      console.error("Ошибка при обработке лайка:", err);
      throw err;
    });
}

// Обработчик удаления
export function handleDeleteClick(cardId, cardElement) {
  return deleteCard(cardId)
    .then(() => {
      cardElement.remove();
    })
    .catch((err) => {
      console.error("Ошибка при удалении карточки:", err);
      throw err;
    });
}

export function createCard(
  cardData,
  openImageModal,
  likeButtonClick,
  handleDeleteClick
) {
  if (!cardTemplate) {
    console.error("Шаблон карточки не найден");
    return null;
  }

  const cardElement = cardTemplate.cloneNode(true).querySelector(".card");
  cardElement.dataset.cardId = cardData._id;

  if (!cardElement) {
    console.error("Элемент карточки не найден в шаблоне");
    return null;
  }

  const cardImage = cardElement.querySelector(".card__image");
  const cardTitle = cardElement.querySelector(".card__title");
  const deleteButton = cardElement.querySelector(".card__delete-button");
  const likeButton = cardElement.querySelector(".card__like-button");
  const likeCounter = cardElement.querySelector(
    ".card__like-container .card__like-count"
  );

  // Основные элементы
  if (
    !cardImage ||
    !cardTitle ||
    !deleteButton ||
    !likeButton ||
    !likeCounter
  ) {
    console.error("Не найдены основные элементы карточки");
    return null;
  }

  // Данные карточки
  cardImage.src = cardData.link || "";
  cardImage.alt = cardData.name || "";
  cardTitle.textContent = cardData.name || "";

  // Количество лайков
  likeCounter.textContent = cardData.likes ? cardData.likes.length : 0;

  // Проверяем, есть ли лайк на карточке
  if (cardData.likes && cardData.currentUserId) {
    const isLiked = cardData.likes.some(
      (user) => user._id === cardData.currentUserId
    );
    if (isLiked) {
      likeButton.classList.add("card__like-button_is-active");
    }
  }

  // Обработчик событий лайка
  likeButton.addEventListener("click", () => {
    const isLiked = likeButton.classList.contains(
      "card__like-button_is-active"
    );
    likeButtonClick(cardData._id, isLiked, likeButton, likeCounter);
  });

  // Кнопку удаления только для своих карточек
  if (cardData.owner._id !== cardData.currentUserId) {
    deleteButton.remove();
  } else {
    deleteButton.addEventListener("click", () =>
      handleDeleteClick(cardData._id, cardElement)
    );
  }

  cardImage.addEventListener("click", () =>
    openImageModal(cardData.link, cardData.name)
  );

  return cardElement;
}
