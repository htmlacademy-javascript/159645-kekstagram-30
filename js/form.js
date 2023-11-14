import { isEscapeKey } from './utils.js';
import { init as initEffect, reset as resetEffect } from './effect.js';
import { resetScale } from './scale.js';

const COUNT_MAX_HASHTAG = 5;
const VALID_SIMBOLS = /^#[a-zа-яё0-9]{1,19}$/i;

const ERROR_TEXT = {
  INVALID_COUNT: `Максимум ${COUNT_MAX_HASHTAG} хэштэгов`,
  NOT_UNIQUE: 'Хэштэги должны быть уникальными',
  INVALID_PATTERN: 'Неправельный хэштэг',
};

const bodyElement = document.querySelector('body');
const formElement = document.querySelector('.img-upload__form');
const uploadInput = formElement.querySelector('.img-upload__input');
const uploadOverlay = formElement.querySelector('.img-upload__overlay');
const cancelButton = formElement.querySelector('.img-upload__cancel');
const textHashtagsElement = formElement.querySelector('.text__hashtags');
const textDescriptionElement = formElement.querySelector('.text__description');

const pristine = new Pristine(formElement, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextClass: 'img-upload__field-wrapper--error',
});

const openForm = () => {
  uploadOverlay.classList.remove('hidden');
  bodyElement.classList.add('modal-open');
  document.addEventListener('keydown', onDocumentKeydown);
};

const closeForm = () => {
  formElement.reset();
  resetEffect();
  resetScale();
  pristine.reset();
  uploadOverlay.classList.add('hidden');
  bodyElement.classList.remove('modal-open');
  document.removeEventListener('keydown', onDocumentKeydown);
};

const onUploadInputChange = () => {
  openForm();
};

const onFormElementSubmit = (evt) => {
  evt.preventDefault();
  pristine.validate();
};

const onCancelButtonClick = () => {
  closeForm();
};

const isTextFiledFocused = () =>
  document.activeElement === textHashtagsElement ||
  document.activeElement === textDescriptionElement;

function onDocumentKeydown(evt) {
  if (isEscapeKey(evt) && !isTextFiledFocused()) {
    evt.preventDefault();
    closeForm();
  }
}

const normalizeTags = (tagString) => tagString
  .trim()
  .split(' ')
  .filter((tag) => Boolean(tag.length));

const validateHashtags = (value) => normalizeTags(value)
  .every((tag) => VALID_SIMBOLS.test(tag));

const validateHashtagsCount = (value) => normalizeTags(value)
  .length <= COUNT_MAX_HASHTAG;

const validateHashtagsRepeate = (value) => {
  const lowerCaseTags = normalizeTags(value).map((tag) => tag.toLowerCase());
  const uniqueHashtags = Array.from(new Set(lowerCaseTags));
  return lowerCaseTags.length === uniqueHashtags.length;
};

pristine.addValidator(textHashtagsElement, validateHashtags, ERROR_TEXT.INVALID_PATTERN, 1, true);
pristine.addValidator(textHashtagsElement, validateHashtagsRepeate, ERROR_TEXT.NOT_UNIQUE, 2, true);
pristine.addValidator(textHashtagsElement, validateHashtagsCount, ERROR_TEXT.INVALID_COUNT, 3, true);

uploadInput. addEventListener('change', onUploadInputChange);
cancelButton.addEventListener('click', onCancelButtonClick);
formElement.addEventListener('submit', onFormElementSubmit);
initEffect();
