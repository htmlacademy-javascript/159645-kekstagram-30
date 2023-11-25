import { isEscapeKey } from './utils.js';
import { init as initEffect, reset as resetEffect } from './effect.js';
import { resetScale } from './scale.js';
import { sendPicture } from './api.js';
import { showSuccessMessage, showErrorMessage } from './message.js';

const COUNT_MAX_HASHTAG = 5;
const VALID_SYMBOLS = /^#[a-zа-яё0-9]{1,19}$/i;
const FILES_TYPES = ['jpg', 'jpeg', 'png'];
const MAX_LENGTH = 140;

const ERROR_TEXT = {
  INVALID_COUNT: `Максимум ${COUNT_MAX_HASHTAG} хэштэгов`,
  NOT_UNIQUE: 'Хэштэги должны быть уникальными',
  INVALID_PATTERN: 'Неправельный хэштэг',
  INVALID_LENGTH: 'Комментарий не может быть длиннее 140 символов!',
};

const SubmitButtonText = {
  IDLE: 'Опубликовать',
  SENDING: 'Отправляю...'
};

const bodyElement = document.querySelector('body');
const formElement = document.querySelector('.img-upload__form');
const uploadInput = formElement.querySelector('.img-upload__input');
const uploadOverlay = formElement.querySelector('.img-upload__overlay');
const cancelButton = formElement.querySelector('.img-upload__cancel');
const textHashtagsElement = formElement.querySelector('.text__hashtags');
const textDescriptionElement = formElement.querySelector('.text__description');
const submitButton = formElement.querySelector('.img-upload__submit');
const photoPreview = formElement.querySelector('.img-upload__preview img');
const effectsPreview = formElement.querySelectorAll('.effects__preview');

const pristine = new Pristine(formElement, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextClass: 'img-upload__field-wrapper--error'
});

const toggleSubmitButton = (isDisabled) => {
  submitButton.disabled = isDisabled;
  if (isDisabled) {
    submitButton.textContent = SubmitButtonText.SENDING;
  } else {
    submitButton.textContent = SubmitButtonText.IDLE;
  }
};

const openForm = () => {
  uploadOverlay.classList.remove('hidden');
  bodyElement.classList.add('modal-open');
  const file = uploadInput.files[0];
  const fileName = file.name.toLowerCase();
  const matches = FILES_TYPES.some((it) => fileName.endsWith(it));
  if (file && matches) {
    photoPreview.src = URL.createObjectURL(file);
    effectsPreview.forEach((element) => {
      element.style.backgroundImage = `url('${URL.createObjectURL(file)}')`;
    });
  }
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

const sendForm = async (form) => {
  if (! pristine.validate()) {
    return;
  }
  try {
    toggleSubmitButton(true);
    await sendPicture(new FormData(form));
    toggleSubmitButton(false);
    closeForm();
    showSuccessMessage();
  } catch {
    showErrorMessage();
    toggleSubmitButton(false);
  }
};

const onFormElementSubmit = (evt) => {
  evt.preventDefault();
  sendForm(evt.target);
};

const onCancelButtonClick = () => {
  closeForm();
};

const isTextFiledFocused = () =>
  document.activeElement === textHashtagsElement ||
  document.activeElement === textDescriptionElement;

function onDocumentKeydown(evt) {
  const isErrorMessageExists = Boolean(document.querySelector('.error'));
  if (isEscapeKey(evt) && !isTextFiledFocused() && !isErrorMessageExists) {
    evt.preventDefault();
    closeForm();
  }
}

const normalizeTags = (tagString) => tagString
  .trim()
  .split(' ')
  .filter((tag) => Boolean(tag.length));

const validateHashtags = (value) => normalizeTags(value)
  .every((tag) => VALID_SYMBOLS.test(tag));

const validateHashtagsCount = (value) => normalizeTags(value)
  .length <= COUNT_MAX_HASHTAG;

const validateHashtagsRepeate = (value) => {
  const lowerCaseTags = normalizeTags(value).map((tag) => tag.toLowerCase());
  const uniqueHashtags = Array.from(new Set(lowerCaseTags));
  return lowerCaseTags.length === uniqueHashtags.length;
};

const validateTextCommentLength = () => textDescriptionElement.value.length <= MAX_LENGTH;

pristine.addValidator(textHashtagsElement, validateHashtags, ERROR_TEXT.INVALID_PATTERN, 1, true);
pristine.addValidator(textHashtagsElement, validateHashtagsRepeate, ERROR_TEXT.NOT_UNIQUE, 2, true);
pristine.addValidator(textHashtagsElement, validateHashtagsCount, ERROR_TEXT.INVALID_COUNT, 3, true);
pristine.addValidator(textDescriptionElement, validateTextCommentLength, ERROR_TEXT.INVALID_LENGTH, true);

uploadInput.addEventListener('change', onUploadInputChange);
cancelButton.addEventListener('click', onCancelButtonClick);
formElement.addEventListener('submit', onFormElementSubmit);
initEffect();
