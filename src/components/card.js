const cardTemplate = document.querySelector("#card-template")?.content;

export function createCard(
  cardData,
  openImageModal,
  handleLikeClick,
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

  // Проверяем наличие основных элементов
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

  // Устанавливаем данные карточки
  cardImage.src = cardData.link || "";
  cardImage.alt = cardData.name || "";
  cardTitle.textContent = cardData.name || "";

  // Устанавливаем количество лайков
  likeCounter.textContent = cardData.likes ? cardData.likes.length : 0;

  // Проверяем, есть ли наш лайк на карточке
  if (cardData.likes && cardData.currentUserId) {
    const isLiked = cardData.likes.some(
      (user) => user._id === cardData.currentUserId
    );
    if (isLiked) {
      likeButton.classList.add("card__like-button_is-active");
    }
  }

  // Добавляем обработчики событий
  likeButton.addEventListener("click", () => {
    const isLiked = likeButton.classList.contains(
      "card__like-button_is-active"
    );
    handleLikeClick(cardData._id, isLiked);
  });

  // Показываем кнопку удаления только для своих карточек
  if (cardData.owner._id !== cardData.currentUserId) {
    deleteButton.remove();
  } else {
    deleteButton.addEventListener("click", () =>
      handleDeleteClick(cardData._id)
    );
  }

  cardImage.addEventListener("click", () =>
    openImageModal(cardData.link, cardData.name)
  );

  return cardElement;
}
