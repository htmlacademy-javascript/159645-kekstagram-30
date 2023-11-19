import { renderGallery } from './gallery.js';
import './form.js';
import { loadPictures } from './api.js';
import { showErrorMessage } from './utils.js';

const bootstrap = async () => {
  try {
    const pictures = loadPictures();
    renderGallery(pictures);
  } catch (error) {
    showErrorMessage();
  }
};

bootstrap();
