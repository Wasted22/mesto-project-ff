import { getCards, deleteCard, likeCard, deleteLikeCard } from './api.js'
const cardTemplate = document.querySelector('#card-template').content;
export function addCard (data, cardModal, name){
    const card = cardTemplate.querySelector('.card').cloneNode(true);
    const cardImage = card.querySelector('.card__image');
    const cardTitle = card.querySelector('.card__title');
    const deleteButton = card.querySelector('.card__delete-button');
    const likeButton = card.querySelector('.card__like-button');
    const likeCounter = card.querySelector('.card__like-counter');
    if (data.owner.name == name){
    deleteButton.addEventListener('click', (evt) => { 
        deleteCard(data._id)
        .then(() => {
            evt.target.parentElement.remove();
            console.log('Карточка успешно удалена.');
        })
        .catch((error) => {
            console.error('Ошибка при удалении карточки:', error)})
        })
    }
    else{
        deleteButton.remove();
    }
    cardImage.src = data.link;
    cardImage.alt = data.name;
    console.log(data.likes);
    if (data.likes.length > 0) {
        likeCounter.textContent = data.likes.length; 
        const hasLikeByCurrentUser = data.likes.some(likeOwner => likeOwner.name === name);
        if (hasLikeByCurrentUser == true){
            likeButton.classList.add('card__like-button_is-active');   
        }
    }
    cardTitle.textContent = data.name;
    cardImage.addEventListener('click', ()=> cardModal(data))
    likeButton.addEventListener('click', (evt) => {
        const isCurrentlyLiked = evt.target.classList.contains('card__like-button_is-active');
        if (isCurrentlyLiked) {
            deleteLikeCard(data._id)
                .then((res) => { 
                    evt.target.classList.remove('card__like-button_is-active');
                    likeCounter.textContent = res.likes.length;
                    console.log('Лайк удален:', res);
                })
                .catch((error) => {
                    console.error('Ошибка при удалении лайка:', error);
                });
        } else {
            likeCard(data._id)
                .then((res) => { 
                    evt.target.classList.add('card__like-button_is-active');
                    likeCounter.textContent = res.likes.length; 
                    console.log('Лайк добавлен:', res);
                })
                .catch((error) => {
                    console.error('Ошибка при добавлении лайка:', error);
                });
        }
    });
    return card;
};

