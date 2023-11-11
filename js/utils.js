// Функция-генератор для получения случайного идентификатора
const getRandomInteger = (a, b) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
};

// Выбор рандомного элемента из массива данных
const getRandomArrayElement = (items) =>
  items[getRandomInteger(0, items.length - 1)];

// Функция генерирует уникальный Id
const createIdGenerator = () => {
  let lastGeneratedId = 0;

  return () => {
    lastGeneratedId += 1;
    return lastGeneratedId;
  };
};

//Функция для проверки нажатой клавиши ESC
const isEscapeKey = (evt) => evt.key === 'Escape';

export { getRandomInteger, getRandomArrayElement, createIdGenerator, isEscapeKey };
