import "./pages/index.css";
import {
  createCard,
  likeButtonClick,
  handleDeleteClick,
} from "./components/card.js";
import {
  openModal,
  closeModal,
  handleOverlayClose,
} from "./components/modal.js";
import {
  enableValidation,
  clearValidationErrors,
} from "./components/formValidation.js";
import logoPath from "./images/logo.svg";
import avatar from "./images/avatar.jpg";
import { resetFormState } from "./components/formValidation.js";
import {
  getUserInfo,
  updateUserInfo,
  getInitialCards,
  addCard,
  deleteCard,
  likeCard,
  unlikeCard,
  updateAvatar,
} from "./components/api.js";

document.querySelector(".header__logo").src = logoPath;
document.querySelector(
  ".profile__image"
).style.backgroundImage = `url(${avatar})`;

const config = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__input-error_visible",
};

// Получаем контейнер для карточек
const cardContainer = document.querySelector(".places__list");

// Получаем попапы
const modals = {
  addCard: document.querySelector(".popup_type_new-card"),
  editProfile: document.querySelector(".popup_type_edit"),
  image: document.querySelector(".popup_type_image"),
  avatar: document.querySelector(".popup_type_avatar"),
};

// Получаем кнопки
const editProfileButton = document.querySelector(".profile__edit-button");
const addCardButton = document.querySelector(".profile__add-button");
const avatarButton = document.querySelector(".profile__image");

// Кнопка-аватар
const avatarBtn = document.querySelector(".profile__image");

// Спан для иконки
if (!avatarBtn.querySelector(".profile__edit-icon")) {
  const icon = document.createElement("span");
  icon.classList.add("profile__edit-icon");
  avatarBtn.append(icon);
}

// Ставим фон (URL аватара из сборки)
avatarBtn.style.backgroundImage = `url(${avatar})`;

// Элементы профиля
const profileName = document.querySelector(".profile__title");
const profileAbout = document.querySelector(".profile__description");

let currentUserId;

// Общая функция для переключения текста кнопки
function toggleButtonText(button, isLoading, defaultText) {
  button.textContent = isLoading ? "Сохранение..." : defaultText;
}

// Открытие попапа с изображением
function openImageModal(link, name) {
  const image = modals.image.querySelector(".popup__image");
  const caption = modals.image.querySelector(".popup__caption");

  image.src = link;
  image.alt = name;
  caption.textContent = name;

  openModal(modals.image);
}

// Отображение карточек
function renderCards(cards) {
  cards.forEach((cardData) => {
    const cardElement = createCard(
      { ...cardData, currentUserId },
      openImageModal,
      likeButtonClick,
      handleDeleteClick
    );
    cardContainer.append(cardElement);
  });
}

// Обработчик отправки формы редактирования профиля
function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  const submitBtn = evt.target.querySelector(config.submitButtonSelector);
  const defaultText = submitBtn.textContent;
  toggleButtonText(submitBtn, true, defaultText);

  const form = evt.target;
  const nameInput = form.querySelector(".popup__input_type_name");
  const aboutInput = form.querySelector(".popup__input_type_description");

  updateUserInfo(nameInput.value, aboutInput.value)
    .then((userData) => {
      profileName.textContent = userData.name;
      profileAbout.textContent = userData.about;
      closeModal(modals.editProfile);
    })
    .catch((err) => {
      console.error("Ошибка при обновлении профиля:", err);
    })
    .finally(() => toggleButtonText(submitBtn, false, defaultText));
}

// Обработчик отправки формы добавления карточки
function handleAddCardFormSubmit(evt) {
  evt.preventDefault();
  const submitBtn = evt.target.querySelector(config.submitButtonSelector);
  const defaultText = submitBtn.textContent;
  toggleButtonText(submitBtn, true, defaultText);

  const form = evt.target;
  const nameInput = form.querySelector(".popup__input_type_card-name");
  const linkInput = form.querySelector(".popup__input_type_url");

  addCard(nameInput.value, linkInput.value)
    .then((cardData) => {
      const newCard = createCard(
        { ...cardData, currentUserId },
        openImageModal,
        likeButtonClick,
        handleDeleteClick
      );
      cardContainer.prepend(newCard);
      resetFormState(form, config);
      closeModal(modals.addCard);
    })
    .catch((err) => {
      console.error("Ошибка при добавлении карточки:", err);
    })
    .finally(() => toggleButtonText(submitBtn, false, defaultText));
}

// Обработчик отправки формы обновления аватара
function handleAvatarFormSubmit(evt) {
  evt.preventDefault();
  const submitBtn = evt.target.querySelector(config.submitButtonSelector);
  const defaultText = submitBtn.textContent;
  toggleButtonText(submitBtn, true, defaultText);

  const form = evt.target;
  const urlInput = form.querySelector(".popup__input_type_avatar-url");

  updateAvatar(urlInput.value)
    .then((userData) => {
      document.querySelector(
        ".profile__image"
      ).style.backgroundImage = `url(${userData.avatar})`;
      closeModal(modals.avatar);
    })
    .catch((err) => {
      console.error("Ошибка при обновлении аватара:", err);
    })
    .finally(() => toggleButtonText(submitBtn, false, defaultText));
}

// Функция для удаления карточки по ID
export function deleteCardById(cardId) {
  return deleteCard(cardId)
    .then((res) => {
      console.log(`Карточка с ID ${cardId} удалена`, res);
    })
    .catch((err) => {
      console.error(`Ошибка при удалении карточки: ${err}`);
    });
}

// Функция для обновления профиля
export function updateProfile(name, about) {
  return updateUserInfo(name, about)
    .then((res) => {
      console.log("Профиль обновлен", res);
    })
    .catch((err) => {
      console.error(`Ошибка при обновлении профиля: ${err}`);
    });
}

// Функция для добавления новой карточки
export function addNewCard(name, link) {
  return addCard(name, link)
    .then((res) => {
      console.log("Новая карточка добавлена", res);
    })
    .catch((err) => {
      console.error(`Ошибка при добавлении карточки: ${err}`);
    });
}
// === Слушатели ===

// Открытие формы редактирования профиля
editProfileButton?.addEventListener("click", () => {
  const form = modals.editProfile.querySelector(".popup__form");
  const nameInput = form.querySelector(".popup__input_type_name");
  const aboutInput = form.querySelector(".popup__input_type_description");

  nameInput.value = profileName.textContent.trim();
  aboutInput.value = profileAbout.textContent.trim();

  clearValidationErrors(form, config);
  openModal(modals.editProfile);
});

// Открытие формы добавления карточки
addCardButton?.addEventListener("click", () => {
  const form = modals.addCard.querySelector(".popup__form");
  form.reset();
  clearValidationErrors(form, config);
  openModal(modals.addCard);
});

// Открытие формы обновления аватара
avatarButton?.addEventListener("click", () => {
  const form = modals.avatar.querySelector(".popup__form");
  form.reset();
  clearValidationErrors(form, config);
  openModal(modals.avatar);
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
modals.editProfile
  .querySelector(".popup__form")
  .addEventListener("submit", handleProfileFormSubmit);
modals.addCard
  .querySelector(".popup__form")
  .addEventListener("submit", handleAddCardFormSubmit);
modals.avatar
  .querySelector(".popup__form")
  .addEventListener("submit", handleAvatarFormSubmit);

// Включение валидации
enableValidation(config);

// Загрузка данных при старте
Promise.all([getUserInfo(), getInitialCards()])
  .then(([userData, cards]) => {
    currentUserId = userData._id;

    profileName.textContent = userData.name;
    profileAbout.textContent = userData.about;
    document.querySelector(
      ".profile__image"
    ).style.backgroundImage = `url(${userData.avatar})`;

    renderCards(cards);
  })
  .catch((err) => {
    console.error("Ошибка при загрузке данных:", err);
  });
