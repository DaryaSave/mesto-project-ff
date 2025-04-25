const BASE_URL = "https://mesto.nomoreparties.co/v1/wff-cohort-36"; 
const TOKEN = "1edbed4a-9f7a-4d96-b1b9-f5fbaa1e4e60"; 
const GROUP_ID = "wff-cohort-36"; 

// Функция для обработки ошибок ответа сервера
function handleResponse(res) {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(new Error(`Ошибка: ${res.status}`));

}

// Получаем информацию о пользователе
export function getUserInfo() {
    return fetch(`${BASE_URL}/users/me`, {
    method: "GET",
    headers: {
      Authorization: TOKEN,
      "Content-Type": "application/json",
    },
  }).then(handleResponse);
}

// Обновляем информацию о пользователе
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

// Получаем все карточки
export function getInitialCards() {
  return fetch(`${BASE_URL}/cards`, {
    method: "GET",
    headers: {
      Authorization: TOKEN,
      "Content-Type": "application/json",
    },
  }).then(handleResponse);
}

// Добавляем новую карточку
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

// Удаляем карточку по ID
export function deleteCard(cardId) {
  return fetch(`${BASE_URL}/cards/${cardId}`, {
    method: "DELETE",
    headers: {
      Authorization: TOKEN,
      "Content-Type": "application/json",
    },
  }).then(handleResponse);
}

// Лайк карточки
export function likeCard(cardId) {
  return fetch(`${BASE_URL}/cards/${cardId}/likes`, {
    method: "PUT",
    headers: {
      Authorization: TOKEN,
      "Content-Type": "application/json",
    },
  }).then(handleResponse);
}

// Убраем лайк с карточки
export function unlikeCard(cardId) {
  return fetch(`${BASE_URL}/cards/${cardId}/likes`, {
    method: "DELETE",
    headers: {
      Authorization: TOKEN,
      "Content-Type": "application/json",
    },
  }).then(handleResponse);
}

// Обновдяем аватар пользователя
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
