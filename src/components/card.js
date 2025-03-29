const cardTemplate = document.querySelector("#card-template")?.content;

export function createCard(cardData, handleImageClick) {
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

    function toggleLike() {
        likeButton.classList.toggle("card__like-button_is-active");
    }

    function removeCard() {
        likeButton.removeEventListener("click", toggleLike);
        cardImage.removeEventListener("click", () => handleImageClick(cardData));
        deleteButton.removeEventListener("click", removeCard);
        cardElement.remove();
    }

    deleteButton.addEventListener("click", removeCard);
    likeButton.addEventListener("click", toggleLike);
    cardImage.addEventListener("click", () => handleImageClick(cardData));

    return cardElement;
}
