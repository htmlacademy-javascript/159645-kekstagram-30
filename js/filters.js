import { renderGallery } from './gallery.js';
import { debounce } from './utils.js';

const FilterEnum = {
  DEFAULT: 'default',
  RANDOM: 'random',
  DISCUSSED: 'discussed'
};

const MAX_RANDOM_FILTER = 10;

const filtersElement = document.querySelector('.img-filters');
const filtersFormElement = document.querySelector('.img-filters__form');
const defaultButton = filtersFormElement.querySelector('#filter-default');
const randomButton = filtersFormElement.querySelector('#filter-random');
const discussedButton = filtersFormElement.querySelector('#filter-discussed');

const getRandomIndex = (min, max) => Math.floor(Math.random() * (max - min));

const compareNumbers = (pictureA, pictureB) => {
  const a = pictureA.comments.length;
  const b = pictureB.comments.length;
  return b - a;
};

const sortsPictures = (pictures) => {
  return pictures.slice().sort(compareNumbers);
};

const randomPictures = (data) => {
  const randomIndexList = [];
  const max = Math.min(MAX_RANDOM_FILTER, data.length);
  while (randomIndexList.length < max) {
    const index = getRandomIndex(0, data.length);
    if (!randomIndexList.includes(index)) {
      randomIndexList.push(index);
    }
  }
  return randomIndexList.map((index) => data[index]);
};

const filterHandlers = {
  [FilterEnum.DEFAULT]: (data) => data,
  [FilterEnum.RANDOM]: (data) => randomPictures(data),
  [FilterEnum.DISCUSSED]: (data) => sortsPictures(data)
};

const onFiltersButtonClick = (evt) => {
  const filtersButtonElement = filtersFormElement.querySelectorAll('.img-filters__button');
  filtersButtonElement.forEach((item) => {
    item.classList.remove('img-filters__button--active');
  });
  if (evt.target.matches('.img-filters__button')) {
    evt.target.classList.add('img-filters__button--active');
  }
};

const repaint = (evt, filter, data) => {
  const filteredData = filterHandlers[filter](data);
  const pictures = document.querySelectorAll('.picture');
  pictures.forEach((item) => item.remove());
  renderGallery(filteredData);
  const currentActivElement = filtersFormElement.querySelector('.img-filters__button--active');
  currentActivElement.classList.remove('img-filters__button--active');
  evt.target.classList.add('img-filters__button--active');
};

const debouncedRepaint = debounce(repaint);

const initFilter = (data) => {
  filtersElement.classList.remove('img-filters--inactive');
  filtersFormElement.addEventListener('click', onFiltersButtonClick);

  defaultButton.addEventListener('click', (evt) => {
    debouncedRepaint(evt, FilterEnum.DEFAULT, data);
  });

  randomButton.addEventListener('click', (evt) => {
    debouncedRepaint(evt, FilterEnum.RANDOM, data);
  });

  discussedButton.addEventListener('click', (evt) => {
    debouncedRepaint(evt, FilterEnum.DISCUSSED, data);
  });
};

export { initFilter };
