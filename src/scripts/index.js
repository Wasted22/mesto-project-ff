import '../pages/index.css';
import { initialCards } from './cards';
import { openModal, closeModal, handlerCardModal } from './modal';
import {addCard, clickDeleteCard} from './card';
import { clearValidation, enableValidation, validationConfig } from './validation';
import { check, getCards, getUser, editProfileInfo, addNewCard, editAvatar } from './api.js'

const cardBlock = document.querySelector('.places__list');

const popupEditProfile = document.querySelector('.popup_type_edit');
const buttonEditProfile = document.querySelector('.profile__edit-button');

const popupEditAvatar = document.querySelector('.popup_type_edit-avatar');

const formEditAvatar = popupEditAvatar.querySelector('.popup__form');
const avatarInput = formEditAvatar.querySelector('.popup__input_type_url');


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
const profileImage = document.querySelector('.profile__image');


enableValidation(validationConfig);

Promise.all([getCards(), getUser()])
  .then(([cardsInfo, userInfo]) => {
    renderUserInfo(userInfo)
    cardsInfo.reverse().forEach(data => {
      cardBlock.prepend(addCard(data, handlerCardModal, userInfo.name));
    });
    })
  .catch((err) => {
    console.log(`Ошибка ${err}`);
    })

let userData;

 function renderUserInfo(userInfo) {
  profileImage.src = userInfo.avatar;
  profileTitle.textContent = userInfo.name;
  profileJob.textContent = userInfo.about;
  userData = userInfo;
}

function renderLoading(evt, text) {
  const btn = evt.target.querySelector('.popup__button')
  btn.textContent = text
}

allPopup.forEach((popup) => {
    popup.classList.add('popup_is-animated')
})

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
    openModal(popupNewCard)
  });

  profileImage.addEventListener('click', ()=>{

    const profileForm = popupEditAvatar.querySelector('.popup__form');
    clearForm();
    clearValidation(profileForm, validationConfig);
    openModal(popupEditAvatar);
  })
    
function fillingForm(){
    nameInput.value = profileTitle.textContent;
    jobInput.value = profileJob.textContent;
}
function clearForm(){
    linkInput.value = '';
    titleInput.value = '';
    avatarInput.value = '';
}

formElementProfile.addEventListener('submit', (evt)=>{
  evt.preventDefault();
  renderLoading(evt, 'Сохранение...')
  editProfileInfo(`${nameInput.value}`, `${jobInput.value}`, evt)
    .then((res) => {
      renderUserInfo(res, evt);
    })
    .then(() => {
      formAddCard.reset();
    })
    .catch((res) => {
      console.log(`Ошибка при обновлении информации о пользователе: ${res.status}`)
    })
    .finally(() => {
      renderLoading(evt, 'Сохранить')
    })
    closeModal();
}
);
    
formAddCard.addEventListener('submit', (evt)=>{
    evt.preventDefault();
    renderLoading(evt, 'Создание...');
    addNewCard(titleInput.value, linkInput.value)
    .then((data) => {
      cardBlock.prepend(addCard(data, handlerCardModal, data.owner.name));
      console.log(data)
    })
    .then(() => {
      closeModal();
      formAddCard.reset();
    })
    .catch(res => console.log(res))
    .finally(() => {
      renderLoading(evt, 'Создать')
    })
    clearForm();
    clearValidation(formAddCard, validationConfig);
});

formEditAvatar.addEventListener('submit', (evt)=>{
  evt.preventDefault();
  renderLoading(evt, 'Сохранение...')
  editAvatar(avatarInput.value, evt)
    .then((res) => {
      renderUserInfo(res)
      closeModal();
      formEditAvatar.reset();
      evt.submitter.classList.add('popup__submit_inactive');
      evt.submitter.disabled = true;
    })
    .catch(() => console.log('Ошибка при обновлении аватара'))
    .finally(() => {
      renderLoading(evt, 'Сохранить')
    }) 
})

