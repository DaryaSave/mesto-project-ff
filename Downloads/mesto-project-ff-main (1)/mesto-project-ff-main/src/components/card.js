const cardTemplate = document.querySelector("#card-template")?.content;

export function createCard(cardData, handleImageClick, handleLikeClick, handleDeleteClick) {
    if (!cardTemplate) {
        return;
    }

    const cardElement = cardTemplate.cloneNode(true).querySelector(".card");
    const cardImage = cardElement.querySelector(".card__image");
    const cardTitle = cardElement.querySelector(".card__title");
    const deleteButton = cardElement.querySelector(".card__delete-button");
    const likeButton = cardElement.querySelector(".card__like-button");

    cardImage.src = cardData.link;
    cardImage.alt = cardData.name;
    cardTitle.textContent = cardData.name;

    likeButton.addEventListener("click", () => handleLikeClick(likeButton));
    deleteButton.addEventListener("click", () => handleDeleteClick(cardElement));
    cardImage.addEventListener("click", () => handleImageClick(cardData));

    return cardElement;
}