// Регулярные выражения для проверки текста
const nameRegex = /^[a-zA-Zа-яА-ЯёЁ\- ]+$/;
const aboutRegex = /^[a-zA-Zа-яА-ЯёЁ\- ]+$/;

export function showInputError(formElement, inputElement, errorMessage, config) {
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
  inputElement.classList.add(config.inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(config.errorClass);
}

export function hideInputError(formElement, inputElement, config) {
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
  inputElement.classList.remove(config.inputErrorClass);
  errorElement.classList.remove(config.errorClass);
  errorElement.textContent = '';
}

export function checkInputValidity(formElement, inputElement, config) {
  const valueLength = inputElement.value.length;
  const minLength = inputElement.hasAttribute("minlength") ? inputElement.minLength : 0;
  const maxLength = inputElement.hasAttribute("maxlength") ? inputElement.maxLength : 1000;

  // Проверка на пустое поле
  if (!inputElement.value) {
    showInputError(formElement, inputElement, "Вы пропустили это поле", config);
    return;
  }

  // Проверка длины (minlength и maxlength)
  if (valueLength < minLength) {
    showInputError(formElement, inputElement, `Минимум ${minLength} символов. Сейчас ${valueLength} символов.`, config);
    return;
  }

  if (valueLength > maxLength) {
    showInputError(formElement, inputElement, `Максимум ${maxLength} символов`, config);
    return;
  }

  // Стандартная валидация браузера
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage, config);
    return;
  }

  // Если все проверки прошли, скрываем ошибки
  hideInputError(formElement, inputElement, config);
}

export function resetFormState(formElement, config) {
  const inputList = Array.from(formElement.querySelectorAll(config.inputSelector));
  const buttonElement = formElement.querySelector(config.submitButtonSelector);

  formElement.reset(); // очистка всех полей

  inputList.forEach((inputElement) => {
    hideInputError(formElement, inputElement, config); // скрыть ошибки
  });

  buttonElement.disabled = true; // сделать кнопку неактивной
  buttonElement.classList.add(config.inactiveButtonClass);
}


export function toggleButtonState(inputList, buttonElement, config) {
  const hasInvalidInput = inputList.some(
    (inputElement) =>
      !inputElement.validity.valid || inputElement.classList.contains(config.inputErrorClass)
  );

  if (hasInvalidInput) {
    buttonElement.classList.add(config.inactiveButtonClass);
    buttonElement.disabled = true;
  } else {
    buttonElement.classList.remove(config.inactiveButtonClass);
    buttonElement.disabled = false;
  }
}

export function setEventListeners(formElement, config) {
  const inputList = Array.from(formElement.querySelectorAll(config.inputSelector));
  const buttonElement = formElement.querySelector(config.submitButtonSelector);

  toggleButtonState(inputList, buttonElement, config);

  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', () => {
      checkInputValidity(formElement, inputElement, config);
      toggleButtonState(inputList, buttonElement, config);
    });
  });
}

export function enableValidation(config) {
  const formList = Array.from(document.querySelectorAll(config.formSelector));
  formList.forEach((formElement) => {
    setEventListeners(formElement, config);
  });
}

export function clearValidationErrors(formElement) {
  const errorElements = formElement.querySelectorAll(".popup__input-error");
  errorElements.forEach((errorElement) => {
    errorElement.textContent = ''; // Очищаем текст ошибки
  });

  const inputElements = formElement.querySelectorAll(".popup__input");
  inputElements.forEach((inputElement) => {
    inputElement.classList.remove("popup__input_type_error"); // Убираем стиль ошибки
  });
}
