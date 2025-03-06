// Найдём список, куда будем добавлять карточки
const cardContainer = document.querySelector(".places__list");
// Получаем шаблон карточки
const cardTemplate = document.querySelector("#card-template").content;
// Функция создания карточки
function createCard(cardData, onDelete) {
// Клонируем шаблон
const cardElement = cardTemplate.cloneNode(true).querySelector(".card");
// Находим элементы внутри карточки
const cardImage = cardElement.querySelector(".card__image");
const cardTitle = cardElement.querySelector(".card__title");
const deleteButton = cardElement.querySelector(".card__delete-button");
// Устанавливаем данные карточки
cardImage.src = cardData.link;
cardImage.alt = cardData.name;
cardTitle.textContent = cardData.name;
// Функция удаления карточки
deleteButton.addEventListener("click", function() {
    onDelete(cardElement);
});
return cardElement;
}
function deleteCard(cardElement) {
    cardElement.remove();
}
// Выводим карточки на страницу
function renderCards(cards) {
    cards.forEach((cardData) => {
    const card = createCard(cardData, deleteCard);
    cardContainer.appendChild(card);
    });
}
// Вызываем функцию для отображения карточек из массива initialCards
renderCards(initialCards);
