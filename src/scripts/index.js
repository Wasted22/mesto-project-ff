import '../pages/index.css';
import { initialCards } from './cards';
import { openModal, closeModal, handlerCardModal } from './modal';
import {addCard, deleteCard} from './card';
import { clearValidation, enableValidation, validationConfig } from './validation';

const cardBlock = document.querySelector('.places__list');

const popupEditProfile = document.querySelector('.popup_type_edit');
const buttonEditProfile= document.querySelector('.profile__edit-button');

const popupNewCard = document.querySelector('.popup_type_new-card');
const buttonNewCard = document.querySelector('.profile__add-button');

const formElementProfile = popupEditProfile.querySelector('.popup__form');
const nameInput = formElementProfile.querySelector('.popup__input_type_name');
const jobInput = formElementProfile.querySelector('.popup__input_type_description');

const formAddCard = popupNewCard.querySelector('.popup__form');
const titleInput = formAddCard.querySelector('.popup__input_type_card-name');
const linkInput = formAddCard.querySelector('.popup__input_type_url');
const allPopup = document.querySelectorAll('.popup');

const profileTitle = document.querySelector('.profile__title');
const profileJob = document.querySelector('.profile__description');

enableValidation(validationConfig);

allPopup.forEach((popup) => {
    popup.classList.add('popup_is-animated')
})

initialCards.forEach((data)=>{
    cardBlock.append(addCard(data, deleteCard, handlerCardModal, onLike));
});

buttonEditProfile.addEventListener('click', ()=>{
    openModal(popupEditProfile);

    fillingForm();
    const profileForm = popupEditProfile.querySelector('.popup__form');
    clearValidation(profileForm, validationConfig);
});

buttonNewCard.addEventListener('click', ()=>{
    clearForm();
    const profileForm = popupNewCard.querySelector('.popup__form');
    clearValidation(profileForm, validationConfig);
    openModal(popupNewCard)});
    
function fillingForm(){
    nameInput.value = profileTitle.textContent;
    jobInput.value = profileJob.textContent;
}
function clearForm(){
    linkInput.value = '';
    titleInput.value = '';
}
formElementProfile.addEventListener('submit', (evt)=>{
    evt.preventDefault();
    profileTitle.textContent = nameInput.value;
    profileJob.textContent = jobInput.value;
    closeModal();
});
    
formAddCard.addEventListener('submit', (evt)=>{
    evt.preventDefault();
    cardBlock.prepend(addCard({
        link: linkInput.value,
        name: titleInput.value
        },
        deleteCard,
        handlerCardModal,
        onLike
    ))
    closeModal();
    clearForm();
    clearValidation(formAddCard, validationConfig);
});

function onLike(evt){
    evt.target.classList.toggle('card__like-button_is-active');
}
 