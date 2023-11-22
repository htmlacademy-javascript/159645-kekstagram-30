//Функция для проверки нажатой клавиши ESC
const isEscapeKey = (evt) => evt.key === 'Escape';

//Функция для показа ошибки при загрузке данных
const REMOVE_MESSAGE_TIMEOUT = 5000;

const errorMessageElement = document.querySelector('#data-error')
  .content.querySelector('.data-error');

const showErrorMessage = () => {
  const errorElement = errorMessageElement.cloneNode(true);
  document.body.append(errorElement);

  setTimeout (() => {
    errorElement.remove();
  }, REMOVE_MESSAGE_TIMEOUT);
};

function debounce (callback, timeoutDelay = 500) {
  let timeoutId;

  return (...rest) => {
    clearTimeout(timeoutId);

    timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);
  };
}

export { isEscapeKey, showErrorMessage, debounce };
