// validation.js

export function enableValidation(config) {
  const { formSelector, inputSelector, submitButtonSelector, inactiveButtonClass, inputErrorClass, errorClass } = config;

  const forms = Array.from(document.querySelectorAll(formSelector));
  forms.forEach((form) => {
    const inputs = Array.from(form.querySelectorAll(inputSelector));
    const submitButton = form.querySelector(submitButtonSelector);

    // Обработчик для каждого инпута
    inputs.forEach((input) => {
      input.addEventListener('input', () => {
        validateInput(form, input, config);
        toggleButtonState(inputs, submitButton, inactiveButtonClass);
      });
    });

    // Первичная установка состояния кнопки
    toggleButtonState(inputs, submitButton, inactiveButtonClass);
  });
}

export function clearValidation(form, config) {
  const { inputSelector, submitButtonSelector, inactiveButtonClass } = config;
  const inputs = Array.from(form.querySelectorAll(inputSelector));
  const button = form.querySelector(submitButtonSelector);

  inputs.forEach((input) => {
    // Очистка ошибок
    hideInputError(form, input, config);
    input.value = ''; // Очистка поля
  });
  toggleButtonState(inputs, button, inactiveButtonClass);
}

// Валидация отдельного поля
function validateInput(form, input, config) {
  const { inputErrorClass, errorClass } = config;
  const errorElement = getErrorElement(form, input);
  let isValid = true;

  // Обязательное поле
  if (!input.value.trim()) {
    showInputError(input, 'Это обязательное поле', errorElement, input, config);
    isValid = false;
  } else {
    // Специальная проверка для имени и названия
    if (input.name === 'name' || input.name === 'place-name') {
      // Проверка длины
      if (input.name === 'name' && (input.value.length < 2 || input.value.length > 40)) {
        showInputError(input, 'Должно быть от 2 до 40 символов', errorElement, input, config);
        isValid = false;
      } else if (input.name === 'place-name' && (input.value.length < 2 || input.value.length > 30)) {
        showInputError(input, 'Должно быть от 2 до 30 символов', errorElement, input, config);
        isValid = false;
      } else {
        // Проверка с помощью регулярного выражения
        const namePattern = /^[A-Za-zА-Яа-яЁёЇїІіЄєҐґ\s-]+$/;
        if (!namePattern.test(input.value)) {
          showInputError(input, 'Разрешены только латинские, кириллические буквы, знаки дефиса и пробелы', errorElement, input, config);
          isValid = false;
        }
      }
    }

    // Проверка URL для ссылки
    if (input.type === 'url') {
      if (!isValidUrl(input.value)) {
        showInputError(input, 'Пожалуйста, введите валидную ссылку', errorElement, input, config);
        isValid = false;
      }
    }

    // Проверка длины для description
    if (input.name === 'description') {
      if (input.value.length < 2 || input.value.length > 200) {
        showInputError(input, 'Должно быть от 2 до 200 символов', errorElement, input, config);
        isValid = false;
      }
    }
  }

  if (isValid) {
    hideInputError(form, input, config);
  }

  return isValid;
}

// Вспомогательные функции
function showInputError(input, message, errorElement, formInput, config) {
  input.classList.add(config.inputErrorClass);
  setCustomValidationMessage(input, message);
  if (errorElement) {
    errorElement.textContent = message;
    errorElement.classList.add(config.errorClass);
  }
}

function hideInputError(form, input, config) {
  input.classList.remove(config.inputErrorClass);
  setCustomValidationMessage(input, '');
  const errorElement = getErrorElement(form, input);
  if (errorElement) {
    errorElement.textContent = '';
    errorElement.classList.remove(config.errorClass);
  }
}

function getErrorElement(form, input) {
  // Предположим, что у каждого input есть соответствующий элемент для ошибок с id вида 'error-{input.name}'
  const errorId = `error-${input.name}`;
  return form.querySelector(`#${errorId}`);
}

function setCustomValidationMessage(input, message) {
  // Можно использовать встроенное свойство validationMessage или data-атрибут
  input.setCustomValidity(message);
  input.reportValidity();
}

function toggleButtonState(inputs, button, inactiveClass) {
  if (inputs.some((input) => !input.validity.valid)) {
    button.classList.add(inactiveClass);
    button.setAttribute('disabled', true);
  } else {
    button.classList.remove(inactiveClass);
    button.removeAttribute('disabled');
  }
}

function isValidUrl(string) {
  try {
    new URL(string);
    return true;
  } catch (_) {
    return false;
  }
}