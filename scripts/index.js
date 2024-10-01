
const cardTemplate = document.querySelector('#card-template').content;
const cardBlock = document.querySelector('.places__list');

function addCard (data, deleteCard){
    const card = cardTemplate.querySelector('.card').cloneNode(true);
    const cardImage = card.querySelector('.card__image');
    const cardTitle = card.querySelector('.card__title');
    const deleteButton = card.querySelector('.card__delete-button');
    deleteButton.addEventListener('click', deleteCard)
    cardImage.src = data.link;
    cardImage.alt = data.name;
    cardTitle.textContent = data.name;
    return card;
};

function deleteCard(evt){
    evt.target.parentElement.remove();
}

initialCards.forEach((data)=>{
    cardBlock.append(addCard(data, deleteCard));
});
