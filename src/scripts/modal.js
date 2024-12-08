
export function openModal(modalWindow){
    modalWindow.classList.add('popup_is-opened')
    const closeButton = modalWindow.querySelector('.popup__close');
    closeButton.addEventListener('click', closeModal)
    modalWindow.addEventListener('mousedown', closeModalOverlay)
    document.addEventListener('keyup', closeModalEsc)
}

export function closeModal(){
    const activePopup = document.querySelector('.popup_is-opened');
    activePopup.classList.remove('popup_is-opened');
    document.removeEventListener('keyup', closeModalEsc);
}

export function closeModalOverlay(evt){
    if (evt.target.classList.contains('popup')){
        closeModal();
    } 
}

export function closeModalEsc(evt){
    if (evt.key === 'Escape'){
         closeModal();
     }
}

export function handlerCardModal(data){
    const popupCard = document.querySelector('.popup_type_image');
    const popupCardImage = popupCard.querySelector('.popup__image');
    const popupCardTitle = popupCard.querySelector('.popup__caption');
    popupCardImage.src = data.link;
    popupCardImage.alt = data.name;
    popupCardTitle.textContent = data.name;
    openModal(popupCard);
}