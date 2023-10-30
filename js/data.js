import {getRandomInteger, getRandomArrayElement, createIdGenerator} from 'utils.js';
import {COUNT_PHOTO, COUNT_AVATAR, COUNT_LIKE_MIN, COUNT_LIKE_MAX, COUNT_COMMENTS, MESSAGE, DESCRIPTION, NAMES} from './const,js';

const generateCommentId = createIdGenerator();

const createMessage = () => Array.from(
  { length: getRandomInteger(1, 2) },
  () => getRandomArrayElement(MESSAGE),
).join('');

const createComment = () => ({
  id: generateCommentId(),
  avatar: `img/avatar-${getRandomInteger(1, COUNT_AVATAR)}.svg`,
  message: createMessage(),
  name: getRandomArrayElement(NAMES),
});

const createPhotos = (index) => ({
  id: index,
  url: `photo/${index}.jpg`,
  description: getRandomArrayElement(DESCRIPTION),
  likes: getRandomInteger(COUNT_LIKE_MIN, COUNT_LIKE_MAX),
  comments: Array.from(
    { length: getRandomInteger(0, COUNT_COMMENTS) },
    createComment
  ),
});

const getPhotos = () => Array.from(
  { length: COUNT_PHOTO },
  (_, photoIndex) => createPhotos(photoIndex + 1),
);

export {getPhotos};
