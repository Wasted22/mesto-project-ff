const cardTemplate = document.querySelector('#card-template').content;
export function addCard (data, deleteCard, cardModal, onLike){
    const card = cardTemplate.querySelector('.card').cloneNode(true);
    const cardImage = card.querySelector('.card__image');
    const cardTitle = card.querySelector('.card__title');
    const deleteButton = card.querySelector('.card__delete-button');
    const likeButton = card.querySelector('.card__like-button')
    deleteButton.addEventListener('click', deleteCard)
    cardImage.src = data.link;
    cardImage.alt = data.name;
    cardTitle.textContent = data.name;
    cardImage.addEventListener('click', ()=> cardModal(data))
    likeButton.addEventListener('click', onLike);
    return card;
};

export function deleteCard(evt){
    evt.target.parentElement.remove();
}