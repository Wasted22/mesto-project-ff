export function clearValidation(profileForm, validationConfig){
    const inputList = profileForm.querySelectorAll(validationConfig.inputSelector);
    inputList.forEach((inputElement) => {
    const errorElement = profileForm.querySelector(`.${inputElement.id}_error`)
    if (errorElement){
        errorElement.classList.remove(validationConfig.errorClass);
        inputElement.classList.remove(validationConfig.inputErrorClass);
        errorElement.textContent= "";
    }
    const submitButton = profileForm.querySelector(validationConfig.submitButtonSelector);
    submitButton.classList.add(validationConfig.inactiveButtonClass)
    submitButton.disabled = true;
    })
}
export function enableValidation(validationConfig){
    const formList = Array.from(document.querySelectorAll(validationConfig.formSelector));
    formList.forEach((formElement)=>{
        setEventListener(formElement);
    })
    function showInputError(formElement, inputElement, errorMessage){
        const errorElement = formElement.querySelector(`.${inputElement.id}_error`);
        inputElement.classList.add(validationConfig.inputErrorClass);
        errorElement.textContent = errorMessage;
        errorElement.classList.add(validationConfig.errorClass)
    }

    function hasInvalidInput(inputList){
        return inputList.some((inputElement)=>{
            return !inputElement.validity.valid;
        })
    }
    function toggleButtonState(inputList, buttonElement){
        if (hasInvalidInput(inputList)){
            buttonElement.classList.add(validationConfig.inactiveButtonClass);
            buttonElement.disabled = true;
        }
        else{
            buttonElement.classList.remove(validationConfig.inactiveButtonClass);
            buttonElement.disabled = false;
        }
    }
    function isValid(formElement, inputElement){
        if (inputElement.validity.patternMismatch){
            inputElement.setCustomValidity(inputElement.dataset.errorMessage);
        }
        else{
            inputElement.setCustomValidity("");
        }

        if (!inputElement.validity.valid){
            showInputError(formElement, inputElement, inputElement.validationMessage);
        }
        else{
            hideInputError(formElement, inputElement);
        }
    }

    function hideInputError(formElement, inputElement){
        const errorElement = formElement.querySelector(`.${inputElement.id}_error`);
        inputElement.classList.remove(validationConfig.inputErrorClass);
        errorElement.textContent= "";
        errorElement.classList.remove(validationConfig.errorClass)
    }

    function setEventListener(formElement){
        const inputList = Array.from(formElement.querySelectorAll(validationConfig.inputSelector));
        const buttonElement = formElement.querySelector(validationConfig.submitButtonSelector);
        toggleButtonState(inputList, buttonElement)
        inputList.forEach((inputElement)=>{
            inputElement.addEventListener('input', ()=>{
                console.log('a');
                isValid(formElement, inputElement)
                toggleButtonState(inputList, buttonElement)
            })
        })

    }
}


export const validationConfig = {formSelector:'.popup__form',
    inputSelector:'.popup__input',
    submitButtonSelector:'.popup__button',
    inactiveButtonClass:'popup__button_disabled',
    inputErrorClass:'popup__input_type_error',
    errorClass:'popup__error_visible'}






