export { addNewCard, deleteCard, likeCard, deleteLikeCard, editAvatar }

const config = {
  baseUrl: 'https://nomoreparties.co/v1/web-magistracy-2',
  headers: {
    authorization: 'f44209d7-b859-4830-9076-c56718fc7fda',
    'Content-Type': 'application/json'
  }
}

const getResponseData = (res) => {
  if (!res.ok) {
    return Promise.reject(`Ошибка: ${res.status}`);
  }
  return res.json();
}

export function getUser() {
  return fetch('https://nomoreparties.co/v1/web-magistracy-2/users/me', {
    headers: config.headers
  })
    .then(getResponseData)
}

export function editProfileInfo(userName, userJob,) {
  return fetch('https://nomoreparties.co/v1/web-magistracy-2/users/me', {
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify({
      name: `${userName}`,
      about: `${userJob}`
    })
  })
    .then(getResponseData)
}

export function getCards() {
  return fetch('https://nomoreparties.co/v1/web-magistracy-2/cards', {
    headers: config.headers
  })
    .then(getResponseData)
}

function addNewCard(cardName, cardLink) {
  return fetch('https://nomoreparties.co/v1/web-magistracy-2/cards', {
    method: 'POST',
    headers: config.headers,
    body: JSON.stringify({
      name: `${cardName}`,
      link: `${cardLink}`
    })
  }).then(getResponseData)
}

function deleteCard(cardId) {
  return fetch(`https://nomoreparties.co/v1/web-magistracy-2/cards/${cardId}`, {
    method: "DELETE",
    headers: config.headers
  })
    .then(getResponseData)
}

function likeCard(cardId) {
  return fetch(`https://nomoreparties.co/v1/web-magistracy-2/cards/likes/${cardId}`, {
    method: 'PUT',
    headers: config.headers
  })
    .then(getResponseData)
}

function deleteLikeCard(cardId) {
  return fetch(`https://nomoreparties.co/v1/web-magistracy-2/cards/likes/${cardId}`, {
    method: 'DELETE',
    headers: config.headers
  })
    .then(getResponseData)
}

function editAvatar(avatarLink) {
  return fetch('https://nomoreparties.co/v1/web-magistracy-2/users/me/avatar', {
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify({
      avatar: `${avatarLink}`
    })
  })
    .then(getResponseData)

}