const BASE_URL = "https://mesto.nomoreparties.co/v1/wff-cohort-36"; // Добавляем GROUP_ID в базовый URL
const TOKEN = "1edbed4a-9f7a-4d96-b1b9-f5fbaa1e4e60"; // Ваш токен
const GROUP_ID = "wff-cohort-36"; // Возвращаем правильный формат

// Функция для обработки ошибок ответа сервера
function handleResponse(res) {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(new Error(`Ошибка: ${res.status}`));

}

// Получить информацию о пользователе
export function getUserInfo() {
    return fetch(`${BASE_URL}/users/me`, {
    method: "GET",
    headers: {
      Authorization: TOKEN,
      "Content-Type": "application/json",
    },
  }).then(handleResponse);
}

// Обновить информацию о пользователе
export function updateUserInfo(name, about) {
    return fetch(`${BASE_URL}/users/me`, {
    method: "PATCH",
    headers: {
      Authorization: TOKEN,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name,
      about,
    }),
  }).then(handleResponse);
}

// Получить все карточки
export function getInitialCards() {
  return fetch(`${BASE_URL}/cards`, {
    method: "GET",
    headers: {
      Authorization: TOKEN,
      "Content-Type": "application/json",
    },
  }).then(handleResponse);
}

// Добавить новую карточку
export function addCard(name, link) {
  return fetch(`${BASE_URL}/cards`, {
    method: "POST",
    headers: {
      Authorization: TOKEN,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name,
      link,
    }),
  }).then(handleResponse);
}

// Удалить карточку по ID
export function deleteCard(cardId) {
  return fetch(`${BASE_URL}/cards/${cardId}`, {
    method: "DELETE",
    headers: {
      Authorization: TOKEN,
      "Content-Type": "application/json",
    },
  }).then(handleResponse);
}

// Лайкнуть карточку
export function likeCard(cardId) {
  return fetch(`${BASE_URL}/cards/${cardId}/likes`, {
    method: "PUT",
    headers: {
      Authorization: TOKEN,
      "Content-Type": "application/json",
    },
  }).then(handleResponse);
}

// Убрать лайк с карточки
export function unlikeCard(cardId) {
  return fetch(`${BASE_URL}/cards/${cardId}/likes`, {
    method: "DELETE",
    headers: {
      Authorization: TOKEN,
      "Content-Type": "application/json",
    },
  }).then(handleResponse);
}

// Обновить аватар пользователя
export function updateAvatar(avatarUrl) {
  return fetch(`${BASE_URL}/users/me/avatar`, {
    method: "PATCH",
    headers: {
      Authorization: TOKEN,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      avatar: avatarUrl,
    }),
  }).then(handleResponse);
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