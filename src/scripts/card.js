import { getCards, deleteCard, likeCard, deleteLikeCard } from './api.js'
const cardTemplate = document.querySelector('#card-template').content;
function handleDeleteCard(cardId, cardElement) {
    deleteCard(cardId)
        .then(() => {
            cardElement.remove();
            console.log('Карточка успешно удалена.');
        })
        .catch((error) => {
            console.error('Ошибка при удалении карточки:', error);
    });
}

function handleLikeCard(cardId, likeButtonElement, likeCounterElement) {
    const isCurrentlyLiked = likeButtonElement.classList.contains('card__like-button_is-active');
    const apiCall = isCurrentlyLiked ? deleteLikeCard : likeCard;

    apiCall(cardId)
        .then((res) => {
            if (isCurrentlyLiked) {
                likeButtonElement.classList.remove('card__like-button_is-active');
            } else {
                likeButtonElement.classList.add('card__like-button_is-active');
            }
            likeCounterElement.textContent = res.likes.length > 0 ? res.likes.length : '';
            console.log(isCurrentlyLiked ? 'Лайк удален:' : 'Лайк добавлен:', res);
        })
        .catch((error) => {
            console.error(isCurrentlyLiked ? 'Ошибка при удалении лайка:' : 'Ошибка при добавлении лайка:', error);
        });
}

export function addCard(data, cardModal, currentUserName) {
    const card = cardTemplate.querySelector('.card').cloneNode(true);
    const cardImage = card.querySelector('.card__image');
    const cardTitle = card.querySelector('.card__title');
    const deleteButton = card.querySelector('.card__delete-button');
    const likeButton = card.querySelector('.card__like-button');
    const likeCounter = card.querySelector('.card__like-counter');

    if (data.owner.name === currentUserName) {
        deleteButton.addEventListener('click', () => {

            handleDeleteCard(data._id, card);
        });
    } else {
        deleteButton.remove();
    }

    cardImage.src = data.link;
    cardImage.alt = data.name;
    cardTitle.textContent = data.name;

    if (data.likes && data.likes.length > 0) {
        likeCounter.textContent = data.likes.length;
        const hasLikeByCurrentUser = data.likes.some(likeOwner => likeOwner.name === currentUserName);
        if (hasLikeByCurrentUser) {
            likeButton.classList.add('card__like-button_is-active');
        }
    } else {
        likeCounter.textContent = ''; 
    }

    cardImage.addEventListener('click', () => cardModal(data));

    likeButton.addEventListener('click', () => {
        handleLikeCard(data._id, likeButton, likeCounter);
    });

    return card;
}