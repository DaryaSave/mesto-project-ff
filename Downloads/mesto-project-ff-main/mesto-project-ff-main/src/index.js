import './pages/index.css';
import { initialCards } from './cards.js';
import { createCard } from './components/card.js';
import { openModal, closeModal, handleOverlayClose } from './components/modal.js';
import logoPath from './images/logo.svg';
import avatar from './images/avatar.jpg';

document.querySelector('.header__logo').src = logoPath;
document.querySelector('.profile__image').style.backgroundImage = `url(${avatar})`;

const cardContainer = document.querySelector(".places__list");

function handleLikeClick(likeButton) {
  likeButton.classList.toggle("card__like-button_is-active");
}

function handleDeleteClick(cardElement) {
  cardElement.remove();
}

function openImageModal(cardData) {
  const imageModalImage = document.querySelector(".popup_type_image .popup__image");
  const imageModalCaption = document.querySelector(".popup_type_image .popup__caption");

  if (!imageModalImage || !imageModalCaption) return;

  imageModalImage.src = cardData.link;
  imageModalImage.alt = cardData.name;
  imageModalCaption.textContent = cardData.name;
  openModal(document.querySelector(".popup_type_image"));
}

function renderCards(cards) {
  cards.forEach((cardData) => {
    cardContainer.append(createCard(cardData, openImageModal, handleLikeClick, handleDeleteClick));
  });
}

renderCards(initialCards);

const modals = {
  addCard: document.querySelector(".popup_type_new-card"),
  editProfile: document.querySelector(".popup_type_edit"),
};

document.querySelectorAll(".popup").forEach((popup) => {
  popup.addEventListener("click", handleOverlayClose);
});

document.querySelectorAll(".popup__close").forEach((button) => {
  button.addEventListener("click", (evt) => closeModal(evt.target.closest(".popup")));
});

const editProfileButton = document.querySelector(".profile__edit-button");
const addCardButton = document.querySelector(".profile__add-button");
const profileName = document.querySelector(".profile__title");
const profileAbout = document.querySelector(".profile__description");

editProfileButton?.addEventListener("click", () => {
  const nameInput = modals.editProfile?.querySelector(".popup__input_type_name");
  const aboutInput = modals.editProfile?.querySelector(".popup__input_type_description");

  if (nameInput && aboutInput) {
    nameInput.value = profileName.textContent;
    aboutInput.value = profileAbout.textContent;
  }

  openModal(modals.editProfile);
});

addCardButton?.addEventListener("click", () => openModal(modals.addCard));

function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  const nameInput = modals.editProfile?.querySelector(".popup__input_type_name");
  const aboutInput = modals.editProfile?.querySelector(".popup__input_type_description");

  if (nameInput && aboutInput) {
    profileName.textContent = nameInput.value;
    profileAbout.textContent = aboutInput.value;
  }

  closeModal(modals.editProfile);
}

function handleAddCardFormSubmit(evt) {
  evt.preventDefault();
  const nameInput = modals.addCard?.querySelector(".popup__input_type_card-name");
  const linkInput = modals.addCard?.querySelector(".popup__input_type_url");

  if (!nameInput || !linkInput) return;

  const newCard = createCard({ name: nameInput.value, link: linkInput.value }, openImageModal, handleLikeClick, handleDeleteClick);
  cardContainer.prepend(newCard);
  modals.addCard.querySelector(".popup__form").reset();
  closeModal(modals.addCard);
}

modals.editProfile?.querySelector(".popup__form")?.addEventListener("submit", handleProfileFormSubmit);
modals.addCard?.querySelector(".popup__form")?.addEventListener("submit", handleAddCardFormSubmit);
