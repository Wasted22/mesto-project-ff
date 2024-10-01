
const cardTemplate = document.querySelector('#card-template').content;
const cardBlock = document.querySelector('.places__list');

function addCard (data, DeleteCard){
    const card = cardTemplate.querySelector('.card').cloneNode(true);
    const cardImage = card.querySelector('.card__image');
    const cardTitle = card.querySelector('.card__title');
    const deleteButton = card.querySelector('.card__delete-button');
    deleteButton.addEventListener('click', DeleteCard)
    cardImage.src = data.link;
    cardTitle.textContent = data.name;
    return card;
};

function DeleteCard(evt){
    evt.target.parentElement.remove();
}

initialCards.forEach((data)=>{
    cardBlock.append(addCard(data, DeleteCard));
});
