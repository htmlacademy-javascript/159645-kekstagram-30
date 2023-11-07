import {getPictures} from './data.js';
import {renderThumbnails} from './thumbnail.js';

const picture = getPictures();
renderThumbnails(picture);
