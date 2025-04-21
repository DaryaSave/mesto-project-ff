import './pages/index.css';
import { initialCards } from './cards.js';
import { createCard } from './components/card.js';
import { openModal, closeModal, handleOverlayClose } from './components/modal.js';
import { enableValidation, clearValidationErrors } from './components/formValidation.js';
import logoPath from './images/logo.svg';
import avatar from './images/avatar.jpg';
import { resetFormState } from './components/formValidation.js';



document.querySelector('.header__logo').src = logoPath;
document.querySelector('.profile__image').style.backgroundImage = `url(${avatar})`;

const config = {
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__input-error_active"
};


// Получаем контейнер для карточек
const cardContainer = document.querySelector(".places__list");

// Получаем попапы
const modals = {
  addCard: document.querySelector(".popup_type_new-card"),
  editProfile: document.querySelector(".popup_type_edit"),
  image: document.querySelector(".popup_type_image"),
};

// Получаем кнопки
const editProfileButton = document.querySelector(".profile__edit-button");
const addCardButton = document.querySelector(".profile__add-button");

// Элементы профиля
const profileName = document.querySelector(".profile__title");
const profileAbout = document.querySelector(".profile__description");

// Обработчик лайка
function handleLikeClick(likeButton) {
  likeButton.classList.toggle("card__like-button_is-active");
}

// Обработчик удаления
function handleDeleteClick(cardElement) {
  cardElement.remove();
}

// Открытие попапа с изображением
function openImageModal(cardData) {
  const image = modals.image.querySelector(".popup__image");
  const caption = modals.image.querySelector(".popup__caption");

  image.src = cardData.link;
  image.alt = cardData.name;
  caption.textContent = cardData.name;

  openModal(modals.image);
}

// Отображение карточек
function renderCards(cards) {
  cards.forEach((cardData) => {
    const cardElement = createCard(cardData, openImageModal, handleLikeClick, handleDeleteClick);
    cardContainer.append(cardElement);
  });
}

// Обработчик отправки формы редактирования профиля
function handleProfileFormSubmit(evt) {
  evt.preventDefault();

  const form = evt.target;
  const nameInput = form.querySelector(".popup__input_type_name");
  const aboutInput = form.querySelector(".popup__input_type_description");

  profileName.textContent = nameInput.value;
  profileAbout.textContent = aboutInput.value;

  closeModal(modals.editProfile);
}

// Обработчик отправки формы добавления карточки
function handleAddCardFormSubmit(evt) {
  evt.preventDefault();

  const form = evt.target;
  const nameInput = form.querySelector(".popup__input_type_card-name");
  const linkInput = form.querySelector(".popup__input_type_url");

  const newCard = createCard(
    { name: nameInput.value, link: linkInput.value },
    openImageModal,
    handleLikeClick,
    handleDeleteClick
  );

  cardContainer.prepend(newCard);
  form.reset();
  resetFormState(form, config);
  closeModal(modals.addCard);
}

// === Слушатели ===

// Открытие формы редактирования профиля
editProfileButton?.addEventListener("click", () => {
  const form = modals.editProfile.querySelector(".popup__form");
  const nameInput = form.querySelector(".popup__input_type_name");
  const aboutInput = form.querySelector(".popup__input_type_description");

  nameInput.value = profileName.textContent;
  aboutInput.value = profileAbout.textContent;

  // Очистка предыдущих ошибок валидации перед открытием формы
  clearValidationErrors(form);
  openModal(modals.editProfile);
});

// Открытие формы добавления карточки
addCardButton?.addEventListener("click", () => {
  const form = modals.addCard.querySelector(".popup__form");
  form.reset();
  clearValidationErrors(form);
  openModal(modals.addCard);
});

// Закрытие по клику на оверлей
document.querySelectorAll(".popup").forEach((popup) => {
  popup.addEventListener("click", handleOverlayClose);
});

// Кнопки закрытия
document.querySelectorAll(".popup__close").forEach((button) => {
  button.addEventListener("click", (evt) => {
    closeModal(evt.target.closest(".popup"));
  });
});

// Отправка форм
modals.editProfile.querySelector(".popup__form").addEventListener("submit", handleProfileFormSubmit);
modals.addCard.querySelector(".popup__form").addEventListener("submit", handleAddCardFormSubmit);

// Включение валидации
enableValidation({
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__input-error_visible'
});

// Отрисовка стартовых карточек
renderCards(initialCards);
