import { getRandomInteger, getRandomArrayElement, createIdGenerator } from './utils.js';

const COUNT_PICTURE = 25;
const COUNT_AVATAR = 6;
const COUNT_LIKE_MIN = 15;
const COUNT_LIKE_MAX = 200;
const COUNT_COMMENTS = 10;
const MESSAGE = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!',
];
const DESCRIPTION = [
  'Все на пляж! #summer #beach #rest',
  'Только посмотрите на эту красоту! #summer #photo #отдых #природа',
  'Нашлись места, где можно тихо посидеть... Без суеты, без шумного пространства, на блеск бегущих волн воды смотреть!',
  'Природа учит понимать прекрасное... #nature #water #beautifulphoto',
  'С радостью встречаю каждый свой день, когда он обещает быть таким, как этот.',
  'Тишина, покой и вдохновение.',
  'Ну что, погнали? #car #speed',
  'Как же вкусно тут кормят... #food',
  'Пост милоты!',
  'Отдых... #relax #photo #chill',
  'Хорошие времена + лучшие друзья = отличные воспоминания.',
  'Природе фильтры не нужны... #nature #photo',
  'Хорошая еда = хорошее настроение!',
];
const NAMES = [
  'Мария',
  'Виктор',
  'Светлана',
  'Наталья',
  'Анна',
  'Владимир',
];

const generateCommentId = createIdGenerator();

const createMessage = () => Array.from(
  { length: getRandomInteger(1, 2) },
  () => getRandomArrayElement(MESSAGE),
).join(' ');

const createComment = () => ({
  id: generateCommentId(),
  avatar: `img/avatar-${getRandomInteger(1, COUNT_AVATAR)}.svg`,
  message: createMessage(),
  name: getRandomArrayElement(NAMES),
});

const createPicture = (index) => ({
  id: index,
  url: `photos/${index}.jpg`,
  description: getRandomArrayElement(DESCRIPTION),
  likes: getRandomInteger(COUNT_LIKE_MIN, COUNT_LIKE_MAX),
  comments: Array.from(
    { length: getRandomInteger(0, COUNT_COMMENTS) },
    createComment,
  ),
});

const getPictures = () => Array.from(
  { length: COUNT_PICTURE },
  (_, pictureIndex) => createPicture(pictureIndex + 1),
);

export { getPictures };
