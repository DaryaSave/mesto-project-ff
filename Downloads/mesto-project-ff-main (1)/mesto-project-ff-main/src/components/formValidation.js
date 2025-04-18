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
  // Проверка длины (minlength и maxlength)
  const valueLength = inputElement.value.length;
  const minLength = inputElement.minLength;
  const maxLength = inputElement.maxLength;

  // Проверка на минимальную длину
  if (valueLength < minLength) {
    showInputError(formElement, inputElement, `Минимум ${minLength} символов`, config);
    return;
  }

  // Проверка на максимальную длину
  if (valueLength > maxLength) {
    showInputError(formElement, inputElement, `Максимум ${maxLength} символов`, config);
    return;
  }

  // Стандартная валидация браузера
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage, config);
    return;
  }

  // Дополнительная валидация с регулярными выражениями
  if (inputElement.name === "name" && !nameRegex.test(inputElement.value)) {
    showInputError(
      formElement,
      inputElement,
      "Имя может содержать только буквы, дефисы и пробелы.",
      config
    );
    return;
  }

  if (
    (inputElement.name === "about" || inputElement.name === "description") &&
    !aboutRegex.test(inputElement.value)
  ) {
    showInputError(
      formElement,
      inputElement,
      "Описание может содержать только буквы, дефисы и пробелы.",
      config
    );
    return;
  }

  // Если все проверки прошли, скрываем ошибки
  hideInputError(formElement, inputElement, config);
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
