// Регулярное выражения для проверки текста
const nameRegex = /^[a-zA-Zа-яА-ЯёЁ\- ]+$/;

// Добавляем класс с ошибкой
const showInputError = (formElement, inputElement, errorMessage, config) => {
  const errorElement = formElement.querySelector(`#${inputElement.name}-error`);
  if (errorElement) {
    inputElement.classList.add(config.inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(config.errorClass);
  }
};

// Удаляем класс с ошибкой
const hideInputError = (formElement, inputElement, config) => {
  const errorElement = formElement.querySelector(`#${inputElement.name}-error`);
  if (errorElement) {
    inputElement.classList.remove(config.inputErrorClass);
    errorElement.classList.remove(config.errorClass);
    errorElement.textContent = "";
  }
};

//  Проверяем валидность поля
const isValid = (formElement, inputElement, config) => {
  inputElement.setCustomValidity("");

  // 1) Пустое поле
  if (inputElement.validity.valueMissing) {
    const message = inputElement.dataset.errorRequired || "Поле обязательное";
    inputElement.setCustomValidity(message);
  }
  // 2) Неправильный формат URL
  else if (inputElement.validity.typeMismatch) {
    const message = inputElement.dataset.errorUrl || "Поле содержит именно URL в корректном формате";
    inputElement.setCustomValidity(message);
  }
  // 3) Несоответствие паттерну
  else if (inputElement.validity.patternMismatch && inputElement.dataset.errorMessage) {
    inputElement.setCustomValidity(inputElement.dataset.errorMessage);
  }

  // Кастомная валидация (показываем/скрываем ошибку)
  if (!inputElement.checkValidity()) {
    showInputError(formElement, inputElement, inputElement.validationMessage, config);
  } else {
    hideInputError(formElement, inputElement, config);
  }
};

// Принимаем массив полей
const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
};

// Массив полей ввода и элемент кнопки
const toggleButtonState = (inputList, buttonElement, config) => {
  if (hasInvalidInput(inputList)) {
    buttonElement.disabled = true;
    buttonElement.classList.add(config.inactiveButtonClass);
  } else {
    buttonElement.disabled = false;
    buttonElement.classList.remove(config.inactiveButtonClass);
  }
};

const setEventListeners = (formElement, config) => {
  const inputList = Array.from(
    formElement.querySelectorAll(config.inputSelector)
  );
  const buttonElement = formElement.querySelector(config.submitButtonSelector);

  // Проверяем состояние кнопки в самом начале
  toggleButtonState(inputList, buttonElement, config);

  inputList.forEach((inputElement) => {
    inputElement.addEventListener("input", () => {
      isValid(formElement, inputElement, config);
      toggleButtonState(inputList, buttonElement, config);
    });
  });
};

export const enableValidation = (config) => {
  const formList = Array.from(document.querySelectorAll(config.formSelector));
  formList.forEach((formElement) => {
    formElement.addEventListener("submit", (evt) => {
      evt.preventDefault();
    });
    setEventListeners(formElement, config);
  });
};

// Очистка ошибок валидации
export const clearValidationErrors = (formElement) => {
  const inputList = Array.from(formElement.querySelectorAll(".popup__input"));
  const buttonElement = formElement.querySelector(".popup__button");

  inputList.forEach((inputElement) => {
    hideInputError(formElement, inputElement, {
      inputErrorClass: "popup__input_type_error",
      errorClass: "popup__input-error_active",
    });
  });

  buttonElement.classList.add("popup__button_disabled");
  buttonElement.disabled = true;
};

// Сброс состояния формы
export const resetFormState = (formElement, config) => {
  formElement.reset();
  clearValidationErrors(formElement);
};
