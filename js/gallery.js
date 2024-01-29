import { renderThumbnails } from './thumbnail.js';
import { showPicture } from './picture.js';

const containerElement = document.querySelector('.pictures');

const renderGallery = (pictures) => {
  containerElement.addEventListener('click', (evt) => {
    const thumbnail = evt.target.closest('[data-thumbnail-id]');

    if (! thumbnail) {
      return;
    }

    evt.preventDefault();
    const thumbnailId = + thumbnail.dataset.thumbnailId;
    const pictureData = pictures.find(({ id }) => id === thumbnailId);

    showPicture(pictureData);
  });

  renderThumbnails(pictures, containerElement);
};

export { renderGallery };
